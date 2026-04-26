import Message from "../models/message.js";

export const setupSocket = (io) => {
  const onlineUsers = {};

  io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);

    // 🟢 USER ONLINE
    socket.on("joinUser", (userId) => {
      onlineUsers[userId] = socket.id;
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });

    // 📩 JOIN ROOM
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    // 💬 SEND MESSAGE
    socket.on("sendMessage", async (data) => {
      const saved = await Message.create({
        room: data.room,
        sender: data.sender,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        time: new Date().toLocaleTimeString(),
      });

      io.to(data.room).emit("receiveMessage", saved);
    });

    // 👀 MARK AS SEEN
    socket.on("markSeen", async ({ room, userId }) => {
      await Message.updateMany(
        { room, receiverId: userId, seen: false },
        { seen: true }
      );

      io.to(room).emit("seenUpdate");
    });

    // 🔴 DISCONNECT
    socket.on("disconnect", () => {
      for (let id in onlineUsers) {
        if (onlineUsers[id] === socket.id) {
          delete onlineUsers[id];
        }
      }
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });
};
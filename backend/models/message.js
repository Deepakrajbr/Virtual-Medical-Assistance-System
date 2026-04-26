import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: String,
    sender: String,
    senderId: String,
    receiverId: String,
    message: String,
    seen: { type: Boolean, default: false },
    time: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
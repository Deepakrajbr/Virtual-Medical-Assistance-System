import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ragRoutes from "./routes/ragRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket.js";
import messageRoutes from "./routes/message.js"; 
import chatUploadRoutes from "./routes/chatUploadRoutes.js";
import adminRoutes from "./routes/admin.js";
import blogRoutes from "./routes/blogRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import path from "path";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ routes
app.use("/api/chat-upload", chatUploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rag", ragRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reports", reportRoutes);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// ✅ socket setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

setupSocket(io);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ START SERVER (IMPORTANT FIX)
const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
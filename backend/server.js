require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const assistantRoutes = require("./Routes/assistRoute");
const projectRoutes = require("./Routes/projectRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const conversationRoutes = require("./Routes/conversationRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const Message = require("./models/message");
const jwt = require("jsonwebtoken");
const conversation = require("./models/conversation");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware(ye bkl har jagah aa jata h )
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/convo", conversationRoutes);
app.use("/api", assistantRoutes);
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.user = decoded; // Attach user data to socket
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user._id}`);

  socket.join(socket.user._id);

  socket.on("sendMessage", async (messageData) => {
    const { conversationId, text } = messageData;

    const newMessage = new Message({
      senderId: socket.user._id,
      conversationId,
      message: text,
    });
    await newMessage.save();

    const conversation = await Conversation.findById(conversationId);
    conversation.participants.forEach((participant) => {
      io.to(participant).emit("messageReceived", {
        conversationId,
        text,
        sender: socket.user._id,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.user._id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

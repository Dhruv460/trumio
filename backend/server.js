require("dotenv").config();
const express = require("express");
const http = require("http");
// const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const assistantRoutes = require("./Routes/assistRoute");
const projectRoutes = require("./Routes/projectRoutes");
// const messageRoutes = require("./Routes/messageRoutes");
const feedbackRoute = require("./Routes/feedbackRoute");
const conversationRoutes = require("./Routes/conversationRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const Message = require("./models/message");
const jwt = require("jsonwebtoken");
const conversation = require("./models/conversation");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);
const server = app.listen(
  PORT,
  console.log(`Server started on PORT ${PORT}!!`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

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
app.use("/api", feedbackRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("Connected to Socket.io !!");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("Room joined: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not found !!");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message received", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED !");
    socket.leave(userData._id);
  });
});

// io.use((socket, next) => {
//   const token = socket.handshake.query.token;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return next(new Error("Authentication error"));
//       }
//       socket.user = decoded; // Attach user data to socket
//       next();
//     });
//   } else {
//     next(new Error("Authentication error"));
//   }
// });

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.user._id}`);

//   socket.join(socket.user._id);

//   socket.on("sendMessage", async (messageData) => {
//     const { conversationId, text } = messageData;

//     const newMessage = new Message({
//       senderId: socket.user._id,
//       conversationId,
//       message: text,
//     });
//     await newMessage.save();

//     const conversation = await Conversation.findById(conversationId);
//     conversation.participants.forEach((participant) => {
//       io.to(participant).emit("messageReceived", {
//         conversationId,
//         text,
//         sender: socket.user._id,
//       });
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.user._id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

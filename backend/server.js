const express=require('express');
const dotenv = require("dotenv");
const { chats } = require('./data/data');
const colors = require("colors");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


dotenv.config();
connectDB(); // Ensure the database connection is established

const app=express();
app.use(express.json()); // Middleware to parse JSON requests

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);

  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000,console.log(`Server started on Port ${PORT}`.yellow.bold)); 
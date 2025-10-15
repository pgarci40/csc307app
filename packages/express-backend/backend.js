//runs express and connects routes 
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js"

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/csc307app")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", usersRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api/users`);
});
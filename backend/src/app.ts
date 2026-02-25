import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(taskRoutes);
app.use(authRoutes);


export default app;
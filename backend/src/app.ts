import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors({
  origin: "https://taskmaster-seven-nu.vercel.app",
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use(taskRoutes);
app.use(authRoutes);


export default app;
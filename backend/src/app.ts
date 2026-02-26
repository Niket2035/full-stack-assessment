import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/{*any}", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(taskRoutes);
app.use(authRoutes);

export default app;

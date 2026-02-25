import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5001;
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
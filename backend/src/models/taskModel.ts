import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

const taskSchema = new Schema<ITask>((
{
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
}));

export default mongoose.model<ITask>("Task", taskSchema);

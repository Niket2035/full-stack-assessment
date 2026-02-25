import express, { RequestHandler } from "express";
import { createTask, getAllTasks,updateTask,deleteTask} from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/api/tasks",authMiddleware,createTask as unknown as RequestHandler);
router.get("/api/tasks",authMiddleware,getAllTasks as unknown as RequestHandler);
router.put("/api/tasks/:id",authMiddleware,updateTask as unknown as RequestHandler);
router.delete("/api/tasks/:id",authMiddleware,deleteTask as unknown as RequestHandler);

export default router;
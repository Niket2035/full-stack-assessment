import { Request, Response } from "express";
import Task from "../models/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, description } = req.body;
    const userId = req.user._id;
    const task = await Task.create({
      user: userId,
      title,
      description,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(
      1,
      Math.min(100, parseInt(req.query.limit as string) || 10),
    );
    const skip = (page - 1) * limit;

    const status = req.query.status as string;
    const search = req.query.search as string;

    const query: any = {
      user: req.user._id,
    };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip),

      Task.countDocuments(query),
    ]);

    return res.status(200).json({
      items: tasks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasMore: skip + limit < total,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching tasks",
      details: (error as any).message,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true },
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

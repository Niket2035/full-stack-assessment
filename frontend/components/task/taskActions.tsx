"use client";

import { Task } from "@/types";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskActions({ task, onDelete, onEdit }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(task)}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(task._id)}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
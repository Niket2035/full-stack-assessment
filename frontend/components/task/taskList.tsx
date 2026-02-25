"use client";

import { Task } from "@/types";
import TaskCard from "./taskCard";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

export default function TaskList({ tasks, onDelete, onToggleStatus }: Props) {
  if (!tasks.length) {
    return (
      <div className="relative py-20 px-4 text-center border-2 border-dashed border-border/50 rounded-3xl bg-secondary/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-background shadow-sm flex items-center justify-center border border-border/50 rotate-3">
            <Clock className="h-8 w-8 text-primary/40 -rotate-3" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">All clear for now!</h3>
            <p className="text-muted-foreground text-sm max-w-[240px] mx-auto">
              Your task list is empty. Take a breath, then add something you want to achieve today.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
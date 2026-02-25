"use client";

import { Task } from "@/types";
import { Trash2, CheckCircle, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

export default function TaskCard({ task, onDelete, onToggleStatus }: Props) {
  const isCompleted = task.status === "completed";

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50",
      isCompleted ? "bg-secondary/30" : "bg-card shadow-sm"
    )}>
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        isCompleted ? "bg-muted-foreground/30" : "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
      )} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                isCompleted
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
              )}>
                {task.status}
              </span>
            </div>
            <h3 className={cn(
              "font-bold text-lg leading-tight truncate transition-all",
              isCompleted ? "text-muted-foreground/70 line-through" : "text-foreground"
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "text-sm mt-2 line-clamp-2 leading-relaxed",
                isCompleted ? "text-muted-foreground/50" : "text-muted-foreground"
              )}>
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleStatus(task._id, task.status)}
              className={cn(
                "h-9 w-9 rounded-full transition-all shrink-0",
                isCompleted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary border border-transparent"
              )}
            >
              {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task._id)}
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
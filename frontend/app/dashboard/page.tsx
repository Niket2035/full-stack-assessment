"use client";

import { useEffect, useState, useCallback } from "react";
import { Task } from "@/types";
import TaskList from "@/components/task/taskList";
import AddTask from "@/components/task/addTask";
import { ListTodo, Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}api/tasks?`;
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (status !== "all") params.append("status", status);
      url += params.toString();

      const res = await fetch(url, {
        headers: {
          "Accept": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data.items || data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updatedTask = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-black text-foreground tracking-tight sm:text-5xl">
              Workspace
            </h1>
            <p className="text-muted-foreground font-medium text-lg max-w-lg">
              Maximize your productivity with a professional view of your strategic tasks.
            </p>
          </div>
          <div className="flex items-center gap-4 self-center md:self-auto">
            <div className="bg-card px-6 py-4 rounded-3xl border border-border/50 shadow-sm flex items-center gap-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none mb-1">Status Report</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary leading-none">{tasks.length}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Total</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10">
                <ListTodo className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          <div className="xl:col-span-4 sticky top-24">
            <AddTask onTaskAdded={fetchTasks} />
          </div>

          <div className="xl:col-span-8 space-y-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  Focus Objectives
                </h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary/20" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{tasks.filter(t => t.status === 'completed').length} Accomplished</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-10 h-11 bg-card border-border/50 rounded-2xl focus:ring-primary/20"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-secondary/20 p-1 rounded-2xl border border-border/50 w-full sm:w-auto overflow-x-auto no-scrollbar">
                  {['all', 'pending', 'completed'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={cn(
                        "px-6 py-2 text-[10px] font-bold uppercase tracking-[0.1em] rounded-xl transition-all whitespace-nowrap",
                        status === s
                          ? "bg-background text-primary shadow-sm border border-border/50"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6 bg-card/50 rounded-3xl border border-dashed border-border/50">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Synchronizing Data...</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

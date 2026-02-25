"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface AddTaskProps {
    onTaskAdded: () => void;
}

export default function AddTask({ onTaskAdded }: AddTaskProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title, description }),
            });

            if (response.status === 401) {
                alert("You are not authorized to add tasks.");
                router.push("/account/login");
            }
            if (response.ok) {
                setTitle("");
                setDescription("");
                onTaskAdded();
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Card className="border border-border/50 shadow-sm bg-card relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 to-accent/50 opacity-50 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Plus className="h-4 w-4 text-primary" />
                    </div>
                    New Task
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Title</Label>
                        <Input
                            id="title"
                            placeholder="What's the objective?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="h-10 border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-secondary/20 transition-all rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Add strategic details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px] resize-none border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-secondary/20 transition-all rounded-xl py-3"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting || !title.trim()}
                        className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(var(--primary),0.2)] active:scale-[0.98]"
                    >
                        {isSubmitting ? "Processing..." : "Create Task"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

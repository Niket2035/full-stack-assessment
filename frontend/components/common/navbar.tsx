"use client";

import { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/account/login");
  };

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                TaskMaster
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <Link href="/account/login">
                <Button variant="default" size="sm" className="rounded-full px-5">
                  Sign In
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-semibold text-foreground leading-none">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                    Pro Member
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-accent flex items-center justify-center text-white ring-2 ring-background shadow-md">
                  <span className="font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

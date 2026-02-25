"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: pass,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.user, data.token);
      alert("Login successful!");
      router.push("/");
    } catch (err) {
      alert("Login failed: " + (err instanceof Error ? err.message : "Unknown error"));
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white  shadow-xl rounded-2xl p-8 border ">
        <h2 className="text-2xl font-bold text-center text-black">
          Login to your account
        </h2>

        <p className="text-sm text-center mt-2 text-gray-800">
          Enter your email below to login
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="xxxxxx"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-black text-white font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/account/register"
            className="font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

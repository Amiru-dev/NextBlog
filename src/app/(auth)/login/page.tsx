"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full p-2 border rounded hover:bg-gray-50"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
            className="w-full p-2 border rounded hover:bg-gray-50"
          >
            Sign in with GitHub
          </button>
        </div>

        <p className="mt-4">
          Don't have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </div>
    </div>
  );
}

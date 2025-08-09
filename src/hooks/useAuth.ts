"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormData } from "@/lib/validation";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const json = await res.json();
      localStorage.setItem("user", JSON.stringify(json.results[0]));
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  const getUser = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  };

  return { login, logout, getUser, loading };
}

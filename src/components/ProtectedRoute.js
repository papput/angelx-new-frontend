"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import useMounted from "@/hooks/useMounted";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();
  const router = useRouter();
  const mounted = useMounted();

  useEffect(() => {
    if (mounted && !loggedIn) {
      router.replace("/profile");
    }
  }, [mounted, loggedIn, router]);

  if (!mounted || !loggedIn) {
    return null;
  }

  return children;
}

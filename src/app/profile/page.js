"use client";

import { useAuth } from "@/context/AuthContext";
import useMounted from "@/hooks/useMounted";
import Profile from "@/components/Profile";
import LoginUI from "@/components/LoginUI";

export default function ProfilePage() {
  const { loggedIn } = useAuth();
  const mounted = useMounted();

  if (!mounted) {
    return <LoginUI />;
  }

  return loggedIn ? <Profile /> : <LoginUI />;
}

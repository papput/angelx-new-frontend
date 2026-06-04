"use client";

import InviteFriends from "@/components/InviteFriends";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><InviteFriends /></ProtectedRoute>
  );
}

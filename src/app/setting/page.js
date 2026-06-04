"use client";

import Settings from "@/components/Settings";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><Settings /></ProtectedRoute>
  );
}

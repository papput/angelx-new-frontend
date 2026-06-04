"use client";

import DepositHistory from "@/components/DepositHistory";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><DepositHistory /></ProtectedRoute>
  );
}

"use client";

import WithdrawHistory from "@/components/WithdrawHistory";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><WithdrawHistory /></ProtectedRoute>
  );
}

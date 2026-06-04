"use client";

import WithdrawUSDT from "@/components/WithdrawUSDT";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><WithdrawUSDT /></ProtectedRoute>
  );
}

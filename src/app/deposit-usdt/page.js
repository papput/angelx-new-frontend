"use client";

import DepositUSDT from "@/components/DepositUSDT";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><DepositUSDT /></ProtectedRoute>
  );
}

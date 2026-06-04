"use client";

import WithdrawWalletAddress from "@/components/WithdrawWalletAddress";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><WithdrawWalletAddress /></ProtectedRoute>
  );
}

"use client";

import SelectWalletAddress from "@/components/SelectWalletAddress";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><SelectWalletAddress /></ProtectedRoute>
  );
}

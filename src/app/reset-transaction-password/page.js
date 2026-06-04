"use client";

import ResetTransactionPassword from "@/components/ResetTransactionPassword";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><ResetTransactionPassword /></ProtectedRoute>
  );
}

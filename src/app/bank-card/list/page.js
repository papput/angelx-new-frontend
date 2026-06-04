"use client";

import BankList from "@/components/BankList";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><BankList /></ProtectedRoute>
  );
}

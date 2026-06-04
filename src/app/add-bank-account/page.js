"use client";

import BankForm from "@/components/BankForm";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><BankForm /></ProtectedRoute>
  );
}

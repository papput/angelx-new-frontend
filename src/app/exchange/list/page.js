"use client";

import ExchangeHistory from "@/components/ExchangeHistory";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><ExchangeHistory /></ProtectedRoute>
  );
}

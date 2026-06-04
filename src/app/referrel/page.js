"use client";

import ReferralsPage from "@/components/ReferralsPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute><ReferralsPage /></ProtectedRoute>
  );
}

"use client";

import TransactionDetails from "@/components/TransactionDetails";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}><ProtectedRoute><TransactionDetails /></ProtectedRoute></Suspense>
  );
}

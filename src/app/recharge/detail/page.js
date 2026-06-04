"use client";

import DepositRecharge from "@/components/DepositRecharge";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}><ProtectedRoute><DepositRecharge /></ProtectedRoute></Suspense>
  );
}

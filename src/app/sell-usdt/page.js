"use client";

import SellUSDT from "@/components/SellUSDT";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}><ProtectedRoute><SellUSDT /></ProtectedRoute></Suspense>
  );
}

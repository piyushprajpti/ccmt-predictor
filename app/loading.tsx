"use client";

import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh]">
      <LoadingScreen />
    </div>
  );
}

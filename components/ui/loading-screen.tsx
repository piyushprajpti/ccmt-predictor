"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <Loader2 className="relative size-12 text-primary animate-spin" />
      </div>
      <p className="mt-8 text-xl font-display font-black text-foreground tracking-tight animate-pulse text-center px-6">
        Analyzing admission signals...
      </p>
      <p className="mt-3 text-sm text-on-surface-variant font-bold uppercase tracking-widest text-center px-6">
        Curating personalized historical data
      </p>
    </div>
  );
}

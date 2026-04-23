"use client";

import React from "react";
import Image from "next/image";

export function LoadingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative size-20 md:size-24">
        <div className="absolute inset-[-20%] rounded-full bg-primary/10 animate-pulse blur-xl" />
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="relative size-full p-3">
          <Image 
            src="/ccmt_logo.png" 
            alt="CCMT Logo" 
            fill
            className="object-contain p-2"
          />
        </div>
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

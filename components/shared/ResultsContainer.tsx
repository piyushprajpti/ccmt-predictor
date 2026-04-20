"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ResultsContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResultsContainer({ children, className }: ResultsContainerProps) {
  return (
    <div className={cn(
      "bg-surface-container rounded-[2.5rem] border border-outline-variant/40 overflow-hidden shadow-2xl shadow-primary/5",
      className
    )}>
      {children}
    </div>
  );
}

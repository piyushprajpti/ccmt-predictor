"use client";

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Pill {
  label: string;
  value: string;
  onRemove?: () => void;
}

interface ResultsPillsProps {
  title: string;
  pills: Pill[];
  onClearAll?: () => void;
}

export function ResultsPills({ title, pills, onClearAll }: ResultsPillsProps) {
  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-normal mr-2">
        {title}:
      </span>
      {pills.map((pill, idx) => (
        <div
          key={`${pill.label}-${pill.value}-${idx}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-base font-semibold text-primary border border-outline-variant/30 shadow-sm transition-colors group",
            pill.onRemove && "hover:bg-surface-tint/20"
          )}
        >
          <span className="text-on-surface font-medium capitalize">{pill.label}:</span>
          <span className="text-primary">{pill.value}</span>
          {pill.onRemove && (
            <button
              onClick={pill.onRemove}
              className="p-0.5 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="size-4 text-on-surface group-hover:text-primary transition-colors" />
            </button>
          )}
        </div>
      ))}
      
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm font-semibold text-primary hover:underline ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

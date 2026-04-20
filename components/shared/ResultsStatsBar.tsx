"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

import { CustomSelect } from '@/components/ui/custom-select';

interface StatsBarProps {
  startIndex: number;
  endIndex: number;
  totalCount: number;
  search?: string;
  onSearch?: (val: string) => void;
  sortBy: string;
  onSort: (val: string) => void;
  sortOptions: { id: string; label: string }[];
  extraControls?: React.ReactNode;
}

export function ResultsStatsBar({
  startIndex,
  endIndex,
  totalCount,
  search,
  onSearch,
  sortBy,
  onSort,
  sortOptions,
  extraControls
}: StatsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 bg-surface-container p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-sm">
      <p className="text-sm sm:text-base text-on-surface font-medium text-center sm:text-left">
        Showing <span className="font-bold text-primary">{Math.min(startIndex + 1, totalCount)}-{Math.min(endIndex, totalCount)}</span> of <span className="font-bold text-primary">{totalCount.toLocaleString()}</span> programs
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {onSearch && (
          <div className="relative flex-1 w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant/50" />
            <input
              type="text"
              placeholder="Filter results..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl pl-11 pr-4 py-2 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        )}

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <CustomSelect
            value={sortOptions.find(o => o.id === sortBy)?.label || "Sort"}
            onChange={(label) => onSort(sortOptions.find(o => o.label === label)?.id || sortOptions[0].id)}
            options={sortOptions.map(o => o.label)}
            className="w-full sm:w-44"
          />
        </div>

        {extraControls}
      </div>
    </div>
  );
}

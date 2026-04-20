"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  variant?: 'explorer' | 'predictor';
}

export function ResultsPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-full hover:bg-surface-container border border-outline-variant/10 disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div className="flex items-center gap-1 mx-2">
        {pages.map((page, idx) => (
          typeof page === 'number' ? (
            <button
              key={idx}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "size-9 rounded-full text-sm font-bold transition-all flex items-center justify-center",
                currentPage === page
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-1 text-on-surface-variant">...</span>
          )
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-full hover:bg-surface-container border border-outline-variant/10 disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

function generatePagination(current: number, total: number) {
  // Show max 5 pages around the current page
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | string)[] = [];
  pages.push(1);

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }

  if (current < total - 2) pages.push('...');

  pages.push(total);

  return pages;
}

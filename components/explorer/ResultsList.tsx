"use client";

import React from 'react';
import { X, ChevronLeft, ChevronRight, ListFilter, SortAsc, SortDesc, MapPin, BookOpen, ChevronDown, Calendar, ArrowUpNarrowWide, ArrowDownWideNarrow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { CustomSelect } from '@/components/ui/custom-select';

interface ResultItem {
  year: number;
  round: string;
  institute: string;
  program: string;
  group: string;
  category: string;
  openingRank: number;
  closingRank: number;
}

interface ResultsListProps {
  results: ResultItem[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalCount: number;
  filters: {
    rounds: string[];
    institutes: string[];
    programs: string[];
    categories: string[];
  };
  onRemoveFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  onClearFilters: () => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

const ITEMS_PER_PAGE = 20;

const SORT_OPTIONS = [
  { id: 'max-desc', label: 'Max Score ↓' },
  { id: 'max-asc', label: 'Max Score ↑' },
  { id: 'min-desc', label: 'Min Score ↓' },
  { id: 'min-asc', label: 'Min Score ↑' },
  { id: 'inst-asc', label: 'Institution' },
  { id: 'prog-asc', label: 'Program' },
];

export function ResultsList({
  results,
  currentPage,
  setCurrentPage,
  totalCount,
  filters,
  onRemoveFilter,
  onClearFilters,
  selectedYear,
  setSelectedYear,
}: ResultsListProps) {
  const [sortBy, setSortBy] = React.useState<string>("max-desc");

  const sortedResults = React.useMemo(() => {
    const sorted = [...results];
    return sorted.sort((a, b) => {
      switch (sortBy) {
        case "max-desc": return b.openingRank - a.openingRank;
        case "max-asc": return a.openingRank - b.openingRank;
        case "min-desc": return b.closingRank - a.closingRank;
        case "min-asc": return a.closingRank - b.closingRank;
        case "inst-asc": return a.institute.localeCompare(b.institute);
        case "prog-asc": return a.program.localeCompare(b.program);
        default: return 0;
      }
    });
  }, [results, sortBy]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div className="flex-1 flex flex-col min-w-0 max-w-full">
      {/* Active Filters Bar */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-normal mr-2">
            Selected Filters:
          </span>
          {Object.entries(filters).map(([key, values]) =>
            values.map(value => (
              <button
                key={`${key}-${value}`}
                onClick={() => onRemoveFilter(key, value)}
                className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-base font-semibold text-primary border border-outline-variant/30 hover:bg-surface-tint/20 transition-colors group shadow-sm"
              >
                <span className="capitalize text-on-surface font-medium">{key.slice(0, -1)}:</span>
                {value}
                <X className="size-4 text-on-surface group-hover:text-primary transition-colors" />
              </button>
            ))
          )}
          <button
            onClick={onClearFilters}
            className="text-sm font-semibold text-primary hover:underline ml-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Stats and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 bg-surface-container p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-sm">
        <p className="text-sm sm:text-base text-on-surface font-medium text-center sm:text-left">
          Showing <span className="font-bold text-primary">{Math.min(startIndex + 1, totalCount)}-{Math.min(startIndex + ITEMS_PER_PAGE, totalCount)}</span> of <span className="font-bold text-primary">{totalCount.toLocaleString()}</span> programs
        </p>
        <div className="grid grid-cols-1 sm:flex sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary shrink-0" />
            <CustomSelect
              value={selectedYear}
              onChange={setSelectedYear}
              options={['2025', '2024', '2023', '2022', '2021']}
              className="w-28"
            />
          </div>

          <div className="flex items-center gap-2">
            <ListFilter className="size-4 text-primary shrink-0" />
            <CustomSelect
              value={SORT_OPTIONS.find(o => o.id === sortBy)?.label || "Sort"}
              onChange={(label) => setSortBy(SORT_OPTIONS.find(o => o.label === label)?.id || "max-desc")}
              options={SORT_OPTIONS.map(o => o.label)}
              className="w-44"
            />
          </div>
        </div>
      </div>

      {/* Table Container - Scrollable on Mobile */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar max-w-full">
        <div className="min-w-[850px]">
          {/* Table Header */}
          <div className="grid grid-cols-[minmax(50px,5%)_minmax(250px,40%)_minmax(180px,25%)_minmax(90px,10%)_minmax(90px,10%)_minmax(90px,10%)] gap-4 px-6 py-4 text-sm font-bold uppercase tracking-tight text-on-surface border-b border-outline-variant/5">
            <div className="text-center">SR. No.</div>
            <div className="text-left">Institution</div>
            <div className="text-left">Program</div>
            <div className="text-left">Category</div>
            <div className="whitespace-nowrap text-center">Max Score</div>
            <div className="whitespace-nowrap text-center">Min Score</div>
          </div>

          {/* Results List */}
          <div className="flex flex-col gap-px bg-outline-variant/10 rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm">
            <AnimatePresence mode="popLayout">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((item, idx) => (
                  <motion.div
                    key={`${item.institute}-${item.program}-${item.category}-${item.round}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className="grid grid-cols-[minmax(50px,5%)_minmax(250px,40%)_minmax(180px,25%)_minmax(90px,10%)_minmax(90px,10%)_minmax(90px,10%)] gap-4 bg-surface-container-low hover:bg-surface-container transition-colors px-6 py-4 group"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-bold text-on-surface-variant/50 tabular-nums">
                        {startIndex + idx + 1}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-hidden">
                      <span className="text-base font-semibold text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2 text-left">
                        {item.institute}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <MapPin className="size-3.5" />
                        <span className="truncate">{item.round}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 overflow-hidden">
                      <span className="text-base font-medium text-on-surface leading-tight line-clamp-2 text-left">
                        {item.program}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <BookOpen className="size-3.5" />
                        <span>{item.group}</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-normal text-left">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-base font-medium text-on-surface tabular-nums whitespace-nowrap">
                        {item.openingRank}
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-base font-medium text-on-surface-variant tabular-nums whitespace-nowrap">
                        {item.closingRank}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-surface-container-lowest text-center px-6">
                  <div className="size-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                    <ListFilter className="size-8 text-on-surface-variant/40" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface">No results found</h3>
                  <p className="text-on-surface-variant mt-2 max-w-xs">
                    Try adjusting your filters to find the programs you are looking for.
                  </p>
                  <Button onClick={onClearFilters} variant="secondary" className="mt-6 border border-outline-variant/20">
                    Reset all filters
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
            {generatePagination(currentPage, totalPages).map((page, idx) => (
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
      )}
    </div>
  );
}

function generatePagination(current: number, total: number) {
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

function getSortLabel(id: string) {
  switch (id) {
    case "max-desc": return "Max Score ↓";
    case "max-asc": return "Max Score ↑";
    case "min-desc": return "Min Score ↓";
    case "min-asc": return "Min Score ↑";
    case "inst-asc": return "Institution";
    case "prog-asc": return "Program";
    default: return "Default";
  }
}

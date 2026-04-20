"use client";

import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/components/ui/custom-select';
import { ResultsTable, ResultItem } from '@/components/shared/results-table';
import { ResultsPagination } from '@/components/shared/ResultsPagination';
import { ResultsStatsBar } from '@/components/shared/ResultsStatsBar';
import { ResultsPills } from '@/components/shared/ResultsPills';
import { ResultsContainer } from '@/components/shared/ResultsContainer';

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
  onClearFilters: () => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

const SORT_OPTIONS = [
  { id: 'openingRank-desc', label: 'Max Score ↓' },
  { id: 'openingRank-asc', label: 'Max Score ↑' },
  { id: 'closingRank-desc', label: 'Min Score ↓' },
  { id: 'closingRank-asc', label: 'Min Score ↑' },
  { id: 'institute-asc', label: 'Institution (A-Z)' },
  { id: 'institute-desc', label: 'Institution (Z-A)' },
  { id: 'program-asc', label: 'Program (A-Z)' },
  { id: 'program-desc', label: 'Program (Z-A)' },
];

const ITEMS_PER_PAGE = 20;

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
  const [sortBy, setSortBy] = React.useState<string>("closingRank-desc");

  const sortedResults = React.useMemo(() => {
    const sorted = [...results];
    const [key, direction] = sortBy.split('-');
    
    sorted.sort((a, b) => {
      const aVal = a[key as keyof ResultItem];
      const bVal = b[key as keyof ResultItem];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const strA = aVal.trim();
        const strB = bVal.trim();
        return direction === 'asc' 
          ? strA.localeCompare(strB, undefined, { sensitivity: 'base', numeric: true }) 
          : strB.localeCompare(strA, undefined, { sensitivity: 'base', numeric: true });
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return sorted;
  }, [results, sortBy]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const pills = React.useMemo(() => {
    const p: { label: string; value: string; onRemove: () => void }[] = [];
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach(value => {
        p.push({
          label: key.slice(0, -1),
          value,
          onRemove: () => onRemoveFilter(key, value)
        });
      });
    });
    return p;
  }, [filters, onRemoveFilter]);

  return (
    <div className="flex-1 flex flex-col min-w-0 max-w-full">
      <ResultsPills 
        title="Selected Filters"
        pills={pills}
        onClearAll={onClearFilters}
      />

      <ResultsStatsBar
        startIndex={startIndex}
        endIndex={startIndex + ITEMS_PER_PAGE}
        totalCount={totalCount}
        sortBy={sortBy}
        onSort={(val) => { setSortBy(val); setCurrentPage(1); }}
        sortOptions={SORT_OPTIONS}
        extraControls={
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary shrink-0" />
            <CustomSelect
              value={selectedYear}
              onChange={(val) => { setSelectedYear(val); setCurrentPage(1); }}
              options={['2025', '2024', '2023', '2022', '2021']}
              className="w-28"
            />
          </div>
        }
      />

      <ResultsContainer>
        <ResultsTable 
          results={paginatedResults}
          startIndex={startIndex}
          type="explorer"
        />

        {paginatedResults.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-surface-container-lowest text-center px-6">
            <div className="size-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
              <Search className="size-8 text-on-surface-variant/40" />
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
      </ResultsContainer>

      <ResultsPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

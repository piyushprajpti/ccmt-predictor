"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { checkEligibility } from "@/lib/eligibility";
import { ResultsTable, ResultItem } from "@/components/shared/results-table";
import { ResultsPagination } from "@/components/shared/ResultsPagination";
import { ResultsStatsBar } from "@/components/shared/ResultsStatsBar";
import { ResultsPills } from "@/components/shared/ResultsPills";
import { ResultsContainer } from "@/components/shared/ResultsContainer";

interface PredictorResultsProps {
  results: ResultItem[];
  userScores: { code: string; score: number }[];
  category: string;
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

export function PredictorResults({ results, userScores, category }: PredictorResultsProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("closingRank-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const sortedResults = useMemo(() => {
    let sortableItems = [...results];

    if (search) {
      sortableItems = sortableItems.filter(item =>
        item.institute.toLowerCase().includes(search.toLowerCase()) ||
        item.program.toLowerCase().includes(search.toLowerCase())
      );
    }

    const [key, direction] = sortBy.split('-');
    sortableItems.sort((a, b) => {
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
    
    return sortableItems;
  }, [results, sortBy, search]);

  const totalCount = sortedResults.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + itemsPerPage);

  const pills = useMemo(() => {
    const p: { label: string; value: string }[] = [
      { label: 'Year', value: results[0]?.year?.toString() || 'Selected' },
      { label: 'Category', value: category }
    ];
    userScores.forEach(s => p.push({ label: s.code, value: s.score.toString() }));
    return p;
  }, [results, category, userScores]);

  return (
    <div className="space-y-6">
      <ResultsPills 
        title="Your Parameters"
        pills={pills}
      />

      <ResultsStatsBar
        startIndex={startIndex}
        endIndex={startIndex + itemsPerPage}
        totalCount={totalCount}
        search={search}
        onSearch={(val) => { setSearch(val); setCurrentPage(1); }}
        sortBy={sortBy}
        onSort={(val) => { setSortBy(val); setCurrentPage(1); }}
        sortOptions={SORT_OPTIONS}
      />

      <ResultsContainer>
        <ResultsTable 
          results={paginatedResults}
          startIndex={startIndex}
          type="predictor"
          userScores={userScores}
          checkEligibility={checkEligibility}
        />

        {paginatedResults.length === 0 && (
          <div className="px-8 py-32 text-center bg-surface-container-lowest/50">
            <div className="flex flex-col items-center gap-4 opacity-40">
              <Search className="size-12" />
              <p className="text-sm font-bold uppercase tracking-widest italic">No matching programs found</p>
            </div>
          </div>
        )}
      </ResultsContainer>

      <ResultsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        variant="predictor"
      />
    </div>
  );
}

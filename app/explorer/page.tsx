"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ExplorerHeader } from '@/components/explorer/ExplorerHeader';
import { FilterSidebar } from '@/components/explorer/FilterSidebar';
import { ResultsList } from '@/components/explorer/ResultsList';
import { Loader2 } from 'lucide-react';

export default function ExplorerPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    rounds: [] as string[],
    institutes: [] as string[],
    programs: [] as string[],
    categories: [] as string[],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedYear, setSelectedYear] = useState("2025");

  // Load data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/ccmt_${selectedYear}.json`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [selectedYear]);

  // Compute unique values for filters (interdependent)
  const availableValues = useMemo(() => {
    if (data.length === 0) return { rounds: [], institutes: [], programs: [], categories: [] };

    const getFilteredValues = (excludeKey: string) => {
      return data.filter(item => {
        const matchRound = excludeKey === 'rounds' || filters.rounds.length === 0 || filters.rounds.includes(item.round);
        const matchInstitute = excludeKey === 'institutes' || filters.institutes.length === 0 || filters.institutes.includes(item.institute);
        const matchProgram = excludeKey === 'programs' || filters.programs.length === 0 || filters.programs.includes(item.program);
        const matchCategory = excludeKey === 'categories' || filters.categories.length === 0 || filters.categories.includes(item.category);
        return matchRound && matchInstitute && matchProgram && matchCategory;
      });
    };

    return {
      rounds: Array.from(new Set(data.map(item => item.round))).sort((a, b) => {
        if (a === "National Spot Round") return 1;
        if (b === "National Spot Round") return -1;
        return a.localeCompare(b);
      }),
      institutes: Array.from(new Set(getFilteredValues('institutes').map(item => item.institute))).sort(),
      programs: Array.from(new Set(getFilteredValues('programs').map(item => item.program))).sort(),
      categories: Array.from(new Set(getFilteredValues('categories').map(item => item.category))).sort(),
    };
  }, [data, filters]);

  // Filtering logic
  const filteredData = useMemo(() => {
    if (data.length === 0) return [];

    return data.filter(item => {
      const matchRound = filters.rounds.length === 0 || filters.rounds.includes(item.round);
      const matchInstitute = filters.institutes.length === 0 || filters.institutes.includes(item.institute);
      const matchProgram = filters.programs.length === 0 || filters.programs.includes(item.program);
      const matchCategory = filters.categories.length === 0 || filters.categories.includes(item.category);

      return matchRound && matchInstitute && matchProgram && matchCategory;
    });
  }, [data, filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, selectedYear]);

  const removeFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key as keyof typeof prev].filter(v => v !== value)
    }));
  };

  const clearFilters = () => {
    setFilters({
      rounds: [],
      institutes: [],
      programs: [],
      categories: [],
    });
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div className="max-w-md bg-destructive/10 p-8 rounded-3xl border border-destructive/20">
          <h2 className="text-xl font-bold text-destructive">Error Loading Data</h2>
          <p className="mt-2 text-on-surface-variant">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <Loader2 className="relative size-12 text-primary animate-spin" />
        </div>
        <p className="mt-6 text-lg font-bold text-on-surface tracking-tight animate-pulse text-center px-6">
          Analyzing admission signals...
        </p>
        <p className="mt-2 text-sm text-on-surface-variant font-medium text-center px-6">
          Curating personalized historical cutoffs for you
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 max-w-full overflow-hidden">
        <ExplorerHeader />

        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start w-full overflow-hidden">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            availableValues={availableValues}
          />

          <ResultsList
            results={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={filteredData.length}
            filters={filters}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </main>
    </div>
  );
}

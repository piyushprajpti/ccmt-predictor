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

  // Load data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Compute unique values for filters (interdependent)
  const availableValues = useMemo(() => {
    if (data.length === 0) return { rounds: [], institutes: [], programs: [], categories: [] };
    
    const getFilteredValues = (excludeKey: string) => {
      return data.filter(item => {
        const matchRound = excludeKey === 'rounds' || filters.rounds.length === 0 || filters.rounds.includes(item.Round);
        const matchInstitute = excludeKey === 'institutes' || filters.institutes.length === 0 || filters.institutes.includes(item.Institute);
        const matchProgram = excludeKey === 'programs' || filters.programs.length === 0 || filters.programs.includes(item['PG Program']);
        const matchCategory = excludeKey === 'categories' || filters.categories.length === 0 || filters.categories.includes(item.Category);
        return matchRound && matchInstitute && matchProgram && matchCategory;
      });
    };

    return {
      rounds: Array.from(new Set(data.map(item => item.Round))).sort((a, b) => {
        if (a === "National Spot Round") return 1;
        if (b === "National Spot Round") return -1;
        return a.localeCompare(b);
      }), // Rounds usually don't depend on others for selection ease
      institutes: Array.from(new Set(getFilteredValues('institutes').map(item => item.Institute))).sort(),
      programs: Array.from(new Set(getFilteredValues('programs').map(item => item['PG Program']))).sort(),
      categories: Array.from(new Set(getFilteredValues('categories').map(item => item.Category))).sort(),
    };
  }, [data, filters]);

  // Filtering logic
  const filteredData = useMemo(() => {
    if (data.length === 0) return [];

    return data.filter(item => {
      const matchRound = filters.rounds.length === 0 || filters.rounds.includes(item.Round);
      const matchInstitute = filters.institutes.length === 0 || filters.institutes.includes(item.Institute);
      const matchProgram = filters.programs.length === 0 || filters.programs.includes(item['PG Program']);
      const matchCategory = filters.categories.length === 0 || filters.categories.includes(item.Category);
      
      return matchRound && matchInstitute && matchProgram && matchCategory;
    });
  }, [data, filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-16">
        <ExplorerHeader />

        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="size-10 text-primary animate-spin" />
              <p className="text-sm font-medium text-on-surface-variant animate-pulse">
                Analyzing admission signals...
              </p>
            </div>
          ) : (
            <>
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
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { FilterSidebar } from '@/components/explorer/FilterSidebar';
import { ResultsList } from '@/components/explorer/ResultsList';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { HeroSection } from '@/components/shared/HeroSection';
import { fetchJsonData, validateCCMTData } from '@/lib/data-handlers';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  // Load data with error handling
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchJsonData(`/ccmt_${selectedYear}.json`);
        if (result.error) {
          setError(result.error);
          setData([]);
        } else if (result.data) {
          setData(result.data);
          setError(null);
        } else {
          setError('No data received');
          setData([]);
        }
      } catch (err: any) {
        setError(err.message || 'Unexpected error loading data');
        setData([]);
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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-destructive/10 border border-destructive/20 rounded-3xl p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="size-16 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <AlertCircle className="size-8 text-destructive" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Unable to Load Data</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">{error}</p>
            </div>
            <div className="flex gap-3 justify-center pt-4">
              <Button
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground"
              >
                Retry
              </Button>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 max-w-full overflow-hidden">
        <HeroSection 
          title={<>Explore <span className="text-primary">Cutoff</span> <br className="hidden md:block" /> Trends & Patterns.</>}
          description={<>Comprehensive historical GATE cutoff data across <span className="text-on-surface font-bold">NITs, IIITs, and GFTIs</span>. Curated for precision analysis and strategic planning.</>}
        />

        <div className="mt-0 flex flex-col lg:flex-row gap-8 items-start w-full overflow-hidden">
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

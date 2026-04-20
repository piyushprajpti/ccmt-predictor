"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { HeroSection } from '@/components/shared/HeroSection';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, School, GraduationCap, LayoutGrid, List } from 'lucide-react';
import { InstitutesTab } from '@/components/institutes-and-programs/InstitutesTab';
import { ProgramsTab } from '@/components/institutes-and-programs/ProgramsTab';
import { cn } from '@/lib/utils';
import { Institute, Program } from '@/lib/types';



export default function InstitutesAndProgramsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'institutes' | 'programs'>('institutes');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/ccmt_2025.json');
        if (!response.ok) throw new Error('Failed to fetch 2025 data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const { institutes, programs } = useMemo(() => {
    if (data.length === 0) return { institutes: [], programs: [] };

    const instituteMap = new Map<string, Set<string>>();
    const programMap = new Map<string, Set<string>>();

    data.forEach(item => {
      // Process Institutes
      if (!instituteMap.has(item.institute)) {
        instituteMap.set(item.institute, new Set());
      }
      instituteMap.get(item.institute)?.add(item.program);

      // Process Programs
      if (!programMap.has(item.program)) {
        programMap.set(item.program, new Set());
      }
      programMap.get(item.program)?.add(item.institute);
    });

    const categorizedInstitutes: Institute[] = Array.from(instituteMap.entries()).map(([name, programSet]) => {
      let category: Institute['category'] = "Other";
      const upperName = name.toUpperCase();

      if (upperName.includes("NATIONAL INSTITUTE OF TECHNOLOGY") || upperName.startsWith("NIT ")) {
        category = "NIT";
      } else if (upperName.includes("INDIAN INSTITUTE OF INFORMATION TECHNOLOGY") || upperName.includes("(IIIT)")) {
        category = "IIIT";
      } else if (upperName.includes("UNIVERSITY") || upperName.includes("VISHWAVIDYALAYA")) {
        category = "State University";
      }

      return {
        name,
        category,
        programs: Array.from(programSet).sort((a, b) => a.localeCompare(b))
      };
    }).sort((a, b) => a.name.localeCompare(b.name));

    const programList: Program[] = Array.from(programMap.entries()).map(([name, instituteSet]) => ({
      name,
      institutes: Array.from(instituteSet).sort((a, b) => a.localeCompare(b))
    })).sort((a, b) => a.name.localeCompare(b.name));

    return { institutes: categorizedInstitutes, programs: programList };
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-16">
        <HeroSection
          title={<>Institutions & <span className="text-primary">Programs</span></>}
          description={<>Discover and explore all participating <span className="text-on-surface font-bold">NITs, IIITs, and GFTIs</span>. Browse by institute category or search by specific academic programs.</>}
          hideInfoBox={true}
        />

        {/* Tab Navigation & Search */}
        <div className="mt-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex p-1 bg-surface-container rounded-2xl border border-outline-variant/20 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('institutes')}
              className={cn(
                "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                activeTab === 'institutes'
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              )}
            >
              <School className="size-4" />
              Institutions
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={cn(
                "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                activeTab === 'programs'
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              )}
            >
              <GraduationCap className="size-4" />
              Programs
            </button>
          </div>

          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'institutes' ? 'institutions' : 'programs'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-3xl text-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm md:py-3.5 md:text-sm"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {activeTab === 'institutes' ? (
              <motion.div
                key="institutes-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <InstitutesTab institutes={institutes} searchQuery={searchQuery} />
              </motion.div>
            ) : (
              <motion.div
                key="programs-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProgramsTab programs={programs} searchQuery={searchQuery} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

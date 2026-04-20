"use client";

import React, { useState } from 'react';
import { Institute } from '@/app/institutes_and_programs/page';
import { InstituteCard } from './InstituteCard';
import { motion } from 'framer-motion';
import { LayoutGrid, AlertCircle } from 'lucide-react';

interface InstitutesTabProps {
  institutes: Institute[];
  searchQuery: string;
}

const CATEGORIES = ["NIT", "IIIT", "State University", "Other"] as const;

export function InstitutesTab({ institutes, searchQuery }: InstitutesTabProps) {
  const filteredInstitutes = institutes.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedInstitutes = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = filteredInstitutes.filter(inst => inst.category === cat);
    return acc;
  }, {} as Record<typeof CATEGORIES[number], Institute[]>);

  const hasResults = filteredInstitutes.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="size-16 rounded-3xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center mb-4">
          <AlertCircle className="size-8 text-on-surface-variant" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No institutions found</h3>
        <p className="text-on-surface-variant mt-2 max-w-xs">
          Try adjusting your search to find the institute you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="md:hidden mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-primary/60 px-1">Browse by Category</p>
      </div>
      
      {CATEGORIES.map((category) => {
        const categoryInstitutes = groupedInstitutes[category];
        if (categoryInstitutes.length === 0) return null;

        return (
          <section key={category} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 rounded-full bg-primary" />
              <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                {category === "Other" ? "Other Participating Institutes (GFTIs)" : 
                 category === "State University" ? "State Universities" : `${category}s`}
                <span className="text-sm font-medium text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-md">
                  {categoryInstitutes.length}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {categoryInstitutes.map((institute, index) => (
                <motion.div
                  key={institute.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <InstituteCard institute={institute} />
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

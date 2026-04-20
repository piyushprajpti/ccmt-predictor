"use client";

import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, X, RotateCcw, Filter, Building2, BookOpen, Users, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { sanitizeSearchInput } from '@/lib/data-handlers';

interface FilterSidebarProps {
  filters: {
    rounds: string[];
    institutes: string[];
    programs: string[];
    categories: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  availableValues: {
    rounds: string[];
    institutes: string[];
    programs: string[];
    categories: string[];
  };
}

export function FilterSidebar({ filters, setFilters, availableValues }: FilterSidebarProps) {
  const clearAll = () => {
    setFilters({
      rounds: [],
      institutes: [],
      programs: [],
      categories: [],
    });
  };

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-6 lg:border-r border-outline-variant/10 lg:pr-8 lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24 overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Filter className="size-5" />
            Filters
          </h2>
          <p className="text-sm text-on-surface-variant mt-1 tracking-tight">Multi-select parameters</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearAll}
          className="text-primary hover:text-primary/80 h-8 px-2"
        >
          <RotateCcw className="size-3.5 mr-1.5" />
          Clear All
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <FilterSection
          title="Admission Rounds"
          icon={<Hash className="size-5" />}
          items={availableValues.rounds}
          selectedItems={filters.rounds}
          onToggle={(item) => toggleFilter('rounds', item, filters, setFilters)}
        />
        
        <FilterSection
          title="Institutions"
          icon={<Building2 className="size-5" />}
          items={availableValues.institutes}
          selectedItems={filters.institutes}
          onToggle={(item) => toggleFilter('institutes', item, filters, setFilters)}
          showSearch
        />

        <FilterSection
          title="Programs"
          icon={<BookOpen className="size-5" />}
          items={availableValues.programs}
          selectedItems={filters.programs}
          onToggle={(item) => toggleFilter('programs', item, filters, setFilters)}
          showSearch
        />

        <FilterSection
          title="Categories"
          icon={<Users className="size-5" />}
          items={availableValues.categories}
          selectedItems={filters.categories}
          onToggle={(item) => toggleFilter('categories', item, filters, setFilters)}
        />
      </div>

    </aside>
  );
}

function toggleFilter(key: string, value: string, filters: any, setFilters: any) {
  setFilters((prev: any) => {
    const current = prev[key];
    const next = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    return { ...prev, [key]: next };
  });
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  showSearch?: boolean;
}

function FilterSection({ title, icon, items, selectedItems, onToggle, showSearch }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const sanitized = sanitizeSearchInput(search);
    return items.filter(item => item.toLowerCase().includes(sanitized.toLowerCase()));
  }, [items, search]);

  return (
    <div className="border-b border-outline-variant/10 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-xl font-semibold text-on-surface hover:text-primary transition-colors tracking-tight"
      >
        <div className="flex items-center gap-3">
          <span className="text-on-surface">{icon}</span>
          {title}
          {selectedItems.length > 0 && (
            <span className="ml-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-semibold">
              {selectedItems.length}
            </span>
          )}
        </div>
        <ChevronDown className={cn("size-6 text-on-surface transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1 flex flex-col gap-1">
              {showSearch && (
                <div className="relative mb-3 mt-1">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder={`Search ${title.toLowerCase()}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl bg-surface-container border border-outline-variant/60 pl-10 pr-3 py-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>
              )}

              <div className={cn(
                "flex flex-col gap-0.5",
                (showSearch || items.length > 8) && "max-h-60 overflow-y-auto pr-1 custom-scrollbar"
              )}>
                {filteredItems.length === 0 ? (
                  <p className="text-[11px] text-on-surface-variant py-2 italic">No results found</p>
                ) : (
                  filteredItems.map((item) => {
                    const isSelected = selectedItems.includes(item);
                    return (
                      <label
                        key={item}
                        className={cn(
                          "group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-base transition-all hover:bg-surface-container tracking-tight",
                          isSelected ? "text-primary font-semibold" : "text-on-surface font-medium hover:text-primary"
                        )}
                      >
                        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggle(item)}
                            className="peer size-5 cursor-pointer appearance-none rounded border border-outline-variant/80 bg-surface-container-lowest checked:border-primary checked:bg-primary transition-all group-hover:border-primary"
                          />
                          <svg
                            className="pointer-events-none absolute h-2.5 w-2.5 fill-none stroke-primary-foreground stroke-[3] opacity-0 transition-opacity peer-checked:opacity-100"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="truncate">{item}</span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

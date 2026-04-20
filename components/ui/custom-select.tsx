"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3.5 text-sm font-bold text-on-surface flex items-center justify-between gap-2 hover:border-primary/40 transition-all outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={cn("size-4 text-on-surface-variant transition-transform shrink-0", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[999] w-full mt-2 bg-popover border border-outline-variant/40 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] max-h-60 overflow-y-auto custom-scrollbar overflow-x-hidden backdrop-blur-xl"
          >
            <div className="p-1.5 bg-popover">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg text-xs font-bold text-left flex items-center justify-between transition-all mb-0.5 last:mb-0",
                    value === opt
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-on-surface hover:bg-surface-container-low hover:text-primary"
                  )}
                >
                  {opt}
                  {value === opt && <Check className="size-3.5" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export const CCMT_LINKS = [
  { year: "2021", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012121" },
  { year: "2022", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012221" },
  { year: "2023", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012321" },
  { year: "2024", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012421" },
  { year: "2025", url: "https://admissions.nic.in/CCMT/Applicant/Report/orcrreport.aspx?enc=Nm7QwHILXclJQSv2YVS+7oyfr3QTMnD485kebzU4RQjHPShCZV1JNhAqXFSs1WVi" },
];

interface CcmtPortalsCardProps {
  isOpen: boolean;
  side?: "top" | "bottom";
  align?: "left" | "right";
  className?: string;
}

export function CcmtPortalsCard({ 
  isOpen, 
  side = "top", 
  align = "right",
  className 
}: CcmtPortalsCardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: side === "top" ? 10 : -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: side === "top" ? 10 : -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute z-50 w-64 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface shadow-2xl",
            side === "top" ? "top-full mt-3" : "bottom-full mb-4",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          <div className="p-4 bg-surface-container-low border-b border-outline-variant/10">
            <h3 className="text-sm font-bold text-foreground">CCMT Portals</h3>
            <p className="text-xs text-on-surface-variant">Access official links for each year</p>
          </div>
          <div className="p-2">
            {CCMT_LINKS.map((link) => (
              <a
                key={link.year}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
              >
                CCMT {link.year}
                <ExternalLink className="size-3.5 text-on-surface-variant" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

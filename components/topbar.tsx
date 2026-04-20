"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const TABS = [
  { name: "Explorer", href: "/" },
  { name: "Predictor", href: "/predictor" },
  { name: "Comparison", href: "/comparison" },
  { name: "Institutes", href: "/institutes" },
];

const CCMT_LINKS = [
  { year: "2021", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012121" },
  { year: "2022", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012221" },
  { year: "2023", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012321" },
  { year: "2024", url: "https://admissions.nic.in/admiss/admissions/orcrjacd/105012421" },
  { year: "2025", url: "https://admissions.nic.in/CCMT/Applicant/Report/orcrreport.aspx?enc=Nm7QwHILXclJQSv2YVS+7oyfr3QTMnD485kebzU4RQjHPShCZV1JNhAqXFSs1WVi" },
];

export function Topbar() {
  const pathname = usePathname();
  const [isCcmtCardOpen, setIsCcmtCardOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const activeTab = TABS.find(tab => pathname === tab.href)?.name || "Explorer";
  
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Close card when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsCcmtCardOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            CCMT<span className="text-on-surface-variant group-hover:text-primary/80"> College Finder</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {TABS.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                activeTab === tab.name ? "text-primary" : "text-on-surface-variant"
              )}
            >
              {tab.name}
              {activeTab === tab.name && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-2"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="relative" ref={cardRef}>
            <Button
              variant="secondary"
              size="sm"
              className="hidden sm:flex items-center gap-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsCcmtCardOpen(!isCcmtCardOpen)}
            >
              Official CCMT Site
              <ChevronDown className={cn("size-4 transition-transform", isCcmtCardOpen && "rotate-180")} />
            </Button>
            
            {/* Mobile Official Link Button */}
            <Button
              variant="secondary"
              size="icon-sm"
              className="flex sm:hidden bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsCcmtCardOpen(!isCcmtCardOpen)}
            >
              <ExternalLink className="size-4" />
            </Button>

            {/* Official Site Card/Popover */}
            <AnimatePresence>
              {isCcmtCardOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface shadow-2xl"
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
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-outline-variant/10 bg-background overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {TABS.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    activeTab === tab.name 
                      ? "bg-primary/10 text-primary" 
                      : "text-on-surface-variant hover:bg-surface-container"
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

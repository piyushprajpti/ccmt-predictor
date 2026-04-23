"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useTransform } from "framer-motion";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { CcmtPortalsCard } from "./ccmt-portals-card";

const TABS = [
  { name: "Home", href: "/" },
  { name: "Explorer", href: "/explorer" },
  { name: "Predictor", href: "/predictor" },
  { name: "Institutions & Programs", href: "/institutes_and_programs" },
];

export function Topbar() {
  const pathname = usePathname();
  const [isCcmtCardOpen, setIsCcmtCardOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const lastScrollYRef = React.useRef(0);

  // Use refs to avoid stale closures in scroll event
  const isMobileMenuOpenRef = React.useRef(false);
  const isCcmtCardOpenRef = React.useRef(false);

  // MotionValue-driven y: bypasses React renders entirely — no forced reflow
  const headerY = useMotionValue(0);

  // Keep refs in sync with state
  React.useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    isCcmtCardOpenRef.current = isCcmtCardOpen;
  }, [isCcmtCardOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current;
    lastScrollYRef.current = latest;

    // If mobile menu is open, always keep topbar visible
    if (isMobileMenuOpenRef.current) {
      headerY.set(0);
      return;
    }

    // Always show at top of page
    if (latest < 20) {
      headerY.set(0);
    }
    // Hide when scrolling down past threshold
    else if (latest > previous && latest > 30) {
      headerY.set(-100);
      // Close card when hiding (state update — intentional, not scroll-driven)
      if (isCcmtCardOpenRef.current) {
        setIsCcmtCardOpen(false);
      }
    }
    // Show when scrolling up
    else if (latest < previous) {
      headerY.set(0);
    }
  });

  const activeTab = TABS.find(tab => pathname === tab.href)?.name || "Home";

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

  // Reset topbar on route change
  React.useEffect(() => {
    headerY.set(0);
    lastScrollYRef.current = 0;
    isMobileMenuOpenRef.current = false;
    isCcmtCardOpenRef.current = false;
    setIsMobileMenuOpen(false);
    setIsCcmtCardOpen(false);
  }, [pathname, headerY]);

  return (
    <motion.header
      style={{ y: headerY }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative size-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/ccmt_logo.png"
              alt="CCMT Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors hidden sm:inline-block">
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
              <motion.span
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                {tab.name}
              </motion.span>
              <span
                className={cn(
                  "absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full transition-all duration-300 origin-center",
                  activeTab === tab.name ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="relative" ref={cardRef}>
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex items-center gap-2 font-bold px-5 h-10 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10"
              onClick={() => setIsCcmtCardOpen(!isCcmtCardOpen)}
            >
              Official CCMT Min Max Site
              <ChevronDown className={cn("size-4 transition-transform duration-300", isCcmtCardOpen && "rotate-180")} />
            </Button>

            {/* Mobile Official Link Button */}
            <Button
              variant="default"
              size="icon-sm"
              className="flex sm:hidden rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10"
              onClick={() => setIsCcmtCardOpen(!isCcmtCardOpen)}
            >
              <ExternalLink className="size-4" />
            </Button>

            {/* Official Site Card/Popover */}
            <CcmtPortalsCard isOpen={isCcmtCardOpen} side="top" align="right" />
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
    </motion.header>
  );
}

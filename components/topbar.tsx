"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
  const [isVisible, setIsVisible] = React.useState(true);
  const { scrollY } = useScroll();
  const cardRef = React.useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (isMobileMenuOpen) {
      setIsVisible(true);
      return;
    }

    if (latest < 50) {
      setIsVisible(true);
    } else if (latest > previous && latest > 100) {
      setIsVisible(false);
      setIsCcmtCardOpen(false);
    } else if (latest < previous) {
      setIsVisible(true);
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

  // Reset topbar visibility and mobile menu on route change
  React.useEffect(() => {
    setIsVisible(true);
    setIsMobileMenuOpen(false);
    setIsCcmtCardOpen(false);
  }, [pathname]);

  return (
    <motion.header 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl"
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

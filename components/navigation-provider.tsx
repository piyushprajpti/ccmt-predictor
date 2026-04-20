"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const TABS = ["/", "/explorer", "/predictor", "/comparison", "/institutes_and_programs"];

interface NavigationContextType {
  direction: number;
}

const NavigationContext = createContext<NavigationContextType>({ direction: 0 });

export const useNavigation = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (pathname !== prevPathname) {
      const prevIndex = TABS.indexOf(prevPathname);
      const currentIndex = TABS.indexOf(pathname);

      if (prevIndex !== -1 && currentIndex !== -1) {
        setDirection(currentIndex > prevIndex ? 1 : -1);
      } else {
        setDirection(0);
      }
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname]);

  return (
    <NavigationContext.Provider value={{ direction }}>
      {children}
    </NavigationContext.Provider>
  );
}

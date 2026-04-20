import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CCMT College Finder | NIT/IIIT Predictor",
  description:
    "An editorial-grade academic portal for reviewing predictive signals with clarity and depth.",
  icons: {
    icon: "/ccmt_logo.png",
    shortcut: "/ccmt_logo.png",
    apple: "/ccmt_logo.png",
  },
};

import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { NavigationProvider } from "@/components/navigation-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme) {
                    theme = supportDarkMode ? 'dark' : 'light';
                    localStorage.setItem('theme', theme);
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NavigationProvider>
          <Topbar />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}

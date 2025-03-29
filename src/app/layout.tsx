"use client";
import { useEffect, useState } from "react";

import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { GlobalLoadingContextProvider } from "@/utils/globalLoadingContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const toggleDark = (!Boolean(localStorage.getItem('theme')) && window.matchMedia('(prefers-color-scheme: dark)').matches) || (
        localStorage.getItem('theme') === 'dark' && 
        Boolean(localStorage.getItem('theme')) && 
        localStorage.getItem('theme') !== 'light'
      );
    
    if(toggleDark) setTheme('dark');
    document.documentElement.classList.toggle('dark', toggleDark);
    document.documentElement.classList.toggle('dark-scrollbar', toggleDark);
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <title>Rober Orji</title>
      </head>
      <body
        style={{ '--max-width': '2048px' } as React.CSSProperties } 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-200 dark:bg-[#202020] transition-[background-color] ease-expo duration-300`}
      >
        <GlobalLoadingContextProvider>
          <Header theme={theme} toggleTheme={toggleTheme} />
          {children}
          <Footer />
        </GlobalLoadingContextProvider>
      </body>
    </html>
  );
}

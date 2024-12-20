"use client";

import { Geist, Geist_Mono } from "next/font/google";

import { ApolloProvider } from "@apollo/client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";
import client from "@/apolloClient";
import { GlobalLoadingContextProvider } from "@/utils/globalLoadingContext";

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

  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <head>
          <title>Rober Orji</title>
        </head>
        <body
          style={{ '--max-width': '2048px' } as React.CSSProperties } 
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-200`}
        >
          <GlobalLoadingContextProvider>
            <Header />
            {children}
            <Footer />
          </GlobalLoadingContextProvider>
        </body>
      </html>
    </ApolloProvider>
  );
}

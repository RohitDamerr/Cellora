// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar"; // Import the Navbar component
import Footer from "@/components/layout/Footer"; // Import the Footer component
import AuthProvider from "@/components/providers/AuthProvider";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard Builder",
    default: "Dashboard Builder",
  },
  description: "A customizable dashboard builder application built with Next.js and ShadCN UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          // Use flexbox to ensure footer sticks to the bottom
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable
        )}
      >
        {/* Render the Navbar at the top */}
       <AuthProvider>
          <Navbar />
          <main className="flex-grow container px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </AuthProvider>


        {/*
          Reminder: ThemeProvider for dark/light mode would typically wrap everything
          inside the body if you were implementing it now. E.g.:
          <ThemeProvider ...>
            <Navbar />
            <main ...>{children}</main>
            <Footer />
          </ThemeProvider>
        */}
      </body>
    </html>
  );
}

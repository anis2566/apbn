import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ClerkProvider,} from '@clerk/nextjs'

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APBN | Scout Group",
  description: "Armed Police Scout Batallion Scout group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
              <Toaster />
              <ModalProvider />
            </QueryProvider>
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}

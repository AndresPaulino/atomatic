import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme.css"
import { ThemeProvider } from "@/providers/theme-provider";
import MountedProvider from "@/providers/mounted.provider";
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import AuthProvider from "@/providers/auth.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atomatic - Autonamous Algo Trading",
  description: "A no-code trading platform for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} dashcode-app`}>
        <AuthProvider>
          <ThemeProvider 
            attribute="class"
            defaultTheme="light"
          >
            <MountedProvider>
              {children}
            </MountedProvider>
            <Toaster />
            <SonnerToaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
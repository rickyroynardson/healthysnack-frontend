import { HydrationZustand } from "@/components/meta/HydrationZustand";
import { queryClient } from "@/lib/react-query";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        jsx
        global
      >{`:root {--font-inter: ${inter.style.fontFamily};}}`}</style>
      <QueryClientProvider client={queryClient}>
        <HydrationZustand>
          <main className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
            <Toaster richColors closeButton />
          </main>
        </HydrationZustand>
      </QueryClientProvider>
    </>
  );
}

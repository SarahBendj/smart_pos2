"use client";

import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();
export function Provider({ children }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>

        <SessionProvider>{children}</SessionProvider>
    
    </QueryClientProvider>
  );
}
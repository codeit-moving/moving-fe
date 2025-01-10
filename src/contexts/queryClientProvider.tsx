"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";

export default function TanstackQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

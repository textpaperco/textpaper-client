import type React from "react";
import { AuthProvider } from "@/context/auth";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="app-layout">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}

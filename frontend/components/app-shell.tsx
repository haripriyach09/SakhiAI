"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#fff8fb]">
      <Sidebar />

      <main className="ml-64 min-h-screen max-md:ml-0">
        {children}
      </main>
    </div>
  );
}
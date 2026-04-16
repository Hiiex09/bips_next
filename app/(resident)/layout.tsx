"use client";

import ResidentSidebar from "@/components/ResidentSidebar";
import { Bell, Menu, Search } from "lucide-react";
import Link from "next/link";

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="portal-dark" className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open h-screen">
        <input id="resident-drawer" type="checkbox" className="drawer-toggle" />

        {/* Page content */}
        <div className="drawer-content flex flex-col h-screen overflow-hidden">
          {/* Mobile top bar */}
          <div className="navbar bg-base-200 border-b border-white/5 lg:hidden px-4 gap-3">
            <label
              htmlFor="resident-drawer"
              className="btn btn-ghost btn-circle drawer-button"
            >
              <Menu size={20} />
            </label>
            <Link href="/residentDashboard" className="flex items-center gap-2 flex-1">
              <span className="font-bold text-base-content">Sovereign Pulse</span>
            </Link>
            <button className="btn btn-ghost btn-circle">
              <Bell size={18} />
            </button>
          </div>

          {/* Main scrollable area */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-50">
          <label htmlFor="resident-drawer" aria-label="close sidebar" className="drawer-overlay" />
          <div className="h-full">
            <ResidentSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

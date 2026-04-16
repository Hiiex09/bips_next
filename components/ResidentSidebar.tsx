"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Newspaper,
  HeartPulse,
  ScrollText,
  TriangleAlert,
  FileText,
  Settings,
  MessageSquareWarning,
  LogOut,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

const mainNav = [
  { href: "/residentDashboard", label: "Home", icon: <Home size={18} /> },
  { href: "/residentAnnouncements", label: "Community News", icon: <Newspaper size={18} /> },
  { href: "/health-center", label: "Health Center", icon: <HeartPulse size={18} /> },
  { href: "/local-ordinances", label: "Local Ordinances", icon: <ScrollText size={18} /> },
  { href: "/emergency", label: "Emergency", icon: <TriangleAlert size={18} /> },
];

const bottomNav = [
  { href: "/documents", label: "Documents", icon: <FileText size={18} /> },
  { href: "/submit-concern", label: "Submit Concern", icon: <MessageSquareWarning size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  return (
    (parts[0]?.charAt(0) ?? "") +
    (parts[parts.length - 1]?.charAt(0) ?? "")
  ).toUpperCase();
};

const ResidentSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/auth/checkAuth")
      .then((r) => r.json())
      .then((d) => d.authenticated && setUser(d.user))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", { method: "POST" });
      if (res.ok) router.push("/");
    } catch {}
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <aside className="w-64 bg-base-200 flex flex-col h-full border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
          <Shield size={18} className="text-primary-content" />
        </div>
        <div>
          <p className="font-bold text-sm text-base-content leading-tight">Sovereign Pulse</p>
          <p className="text-xs text-base-content/50 leading-tight">Resident Portal</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider px-3 mb-3">
          Navigation
        </p>
        {mainNav.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(href)
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
            }`}
          >
            <span className={isActive(href) ? "text-primary" : "text-base-content/50"}>
              {icon}
            </span>
            {label}
          </Link>
        ))}

        <div className="divider my-3 opacity-20" />

        <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider px-3 mb-3">
          Services
        </p>
        {bottomNav.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(href)
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
            }`}
          >
            <span className={isActive(href) ? "text-primary" : "text-base-content/50"}>
              {icon}
            </span>
            {label}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-4 pt-3 border-t border-white/5 space-y-3">
        {user && (
          <div className="flex items-center gap-3 bg-base-300/50 rounded-xl px-3 py-2.5">
            <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {getInitials(user.fullName)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-base-content truncate">{user.fullName}</p>
              <p className="text-xs text-base-content/50 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm w-full justify-start gap-2 text-error/80 hover:text-error hover:bg-error/10"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default ResidentSidebar;

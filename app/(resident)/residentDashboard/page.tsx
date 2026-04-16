"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  Users,
  Thermometer,
  HandHeart,
  ChevronRight,
  Clock,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

const newsItems = [
  {
    id: 1,
    tag: "ENERGY",
    title: "District 7 Solar Grid Now Fully Operational",
    desc: "Providing clean energy to over 45,000 households in the district.",
    img: "https://images.pexels.com/photos/12923395/pexels-photo-12923395.jpeg",
    date: "3 days ago",
    href: "/residentAnnouncements",
  },
  {
    id: 2,
    tag: "EDUCATION",
    title: "Registration Open for Summer Tech Camps",
    desc: "Empowering the next generation of digital architects and innovators.",
    img: "https://images.unsplash.com/photo-1758270705290-62b6294dd044?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    date: "5 days ago",
    href: "/residentAnnouncements",
  },
];

const appointments = [
  { name: "General Practice", time: "09:00 – 14:00", status: "AVAILABLE", color: "text-success" },
  { name: "Neural Diagnostics", time: "10:00 – 12:00", status: "FULLY BOOKED", color: "text-error" },
  { name: "Emergency Triage", time: "24 / 7", status: "24/7", color: "text-warning" },
];

const statutes = [
  {
    code: "QUIET HOURS: SECTOR 4",
    title: "Quiet Hours: Sector 4",
    desc: "No loud activities from 22:00 to 07:00 daily in residential zones.",
    updated: "Updated: 6 months ago",
  },
  {
    code: "RECYCLE MANDATE V2.1",
    title: "Recycling Mandate v2.1",
    desc: "New guidelines for the disposal and recycling requirements.",
    updated: "Updated: 8 months ago",
  },
];

export default function ResidentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/auth/checkAuth")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) setUser(d.user);
        else router.push("/");
      })
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const firstName = user?.fullName?.split(" ")[0] ?? "Resident";

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar (desktop) */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="input input-sm bg-base-200 border-white/10 flex items-center gap-2 w-52">
            <Search size={14} className="text-base-content/40" />
            <input type="text" placeholder="Search services…" className="grow text-sm" />
          </label>
          <button className="btn btn-ghost btn-circle btn-sm relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
          </button>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden min-h-56 flex items-end">
        <img
          src="https://pixabay.com/get/g3dab5e242712d4d1ba94fc6dac6c7bb4fc80196e365e2c5157115c8a995596c8c53d3a8b6452e1e82a0a31c03908d50f.jpg"
          alt="City skyline by Vilkasss on Pixabay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/70 to-transparent" />
        <div className="relative z-10 px-6 lg:px-8 pb-6 pt-20 w-full">
          <p className="text-base-content/60 text-sm mb-1">
            {new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-base-content">
            Welcome back,{" "}
            <span className="text-secondary">{firstName}.</span>
          </h2>
          <p className="text-base-content/60 mt-1 text-sm">
            Your municipal ecosystem is operating at peak efficiency.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 px-6 lg:px-8 py-4">
        {[
          { icon: <Users size={16} />, value: "1.2M", label: "Active Residents" },
          { icon: <Thermometer size={16} />, value: "24°C", label: "Feels Like 26°" },
          { icon: <HandHeart size={16} />, value: "8.4k", label: "Volunteers Active" },
        ].map(({ icon, value, label }) => (
          <div key={label} className="bg-base-200 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/5">
            <span className="text-primary hidden sm:block">{icon}</span>
            <div>
              <p className="font-bold text-base-content text-lg leading-tight">{value}</p>
              <p className="text-xs text-base-content/50 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-5 gap-6 px-6 lg:px-8 py-4 flex-1">
        {/* Left: Community News */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base-content">Community News</h3>
            <Link href="/residentAnnouncements" className="text-xs text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {newsItems.map((item) => (
              <Link key={item.id} href={item.href} className="card overflow-hidden bg-base-200 border border-white/5 hover:border-primary/30 transition-all group">
                <figure className="h-36 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body p-4">
                  <span className="badge badge-xs badge-primary text-[10px] font-bold tracking-wider">
                    {item.tag}
                  </span>
                  <h4 className="font-bold text-sm text-base-content leading-snug mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-base-content/50 line-clamp-2">{item.desc}</p>
                  <p className="text-xs text-base-content/40 mt-1">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Statutes */}
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base-content">📜 Statutes</h3>
              <Link href="/local-ordinances" className="text-xs text-primary flex items-center gap-1 hover:underline">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            {statutes.map((s) => (
              <div key={s.code} className="bg-base-200 border border-white/5 rounded-xl p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-base-content/40 tracking-widest uppercase mb-1">
                    {s.code}
                  </p>
                  <p className="text-sm font-semibold text-base-content">{s.title}</p>
                  <p className="text-xs text-base-content/50 mt-1">{s.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-base-content/30">{s.updated}</p>
                  <ChevronRight size={14} className="text-base-content/30 mt-2 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Medical Center */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-base-content">🏥 Medical Center</h3>
          <div className="bg-base-200 border border-white/5 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <p className="text-xs text-base-content/40 uppercase tracking-wider">OFFICIAL CIVIC APPOINTMENTS</p>
              <p className="font-semibold text-base-content mt-1">General Practice Center</p>
            </div>
            <div className="divide-y divide-white/5">
              {appointments.map((a) => (
                <div key={a.name} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-base-content">{a.name}</p>
                    <p className="text-xs text-base-content/50 flex items-center gap-1 mt-0.5">
                      <Clock size={11} />{a.time}
                    </p>
                  </div>
                  <span className={`text-xs font-bold ${a.color}`}>{a.status}</span>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Link
                href="/health-center"
                className="btn w-full text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
              >
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-base-200 border border-white/5 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-primary" />
              <h4 className="font-bold text-sm text-base-content">Upcoming Events</h4>
            </div>
            <div className="space-y-2">
              {[
                { title: "Quarterly Assembly", date: "Aug 12, 09:00 AM", loc: "Digital Governance Hub" },
                { title: "Immunization Drive", date: "Aug 15, 08:00 AM", loc: "Community Health Center" },
              ].map((e) => (
                <div key={e.title} className="bg-base-300/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-base-content">{e.title}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">{e.date}</p>
                  <p className="text-xs text-base-content/40">{e.loc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

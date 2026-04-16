"use client";

import {
  Bell,
  Search,
  PhoneCall,
  Flame,
  ShieldAlert,
  MapPin,
  Building,
  Droplets,
  Zap,
  TriangleAlert,
  ChevronRight,
} from "lucide-react";

const facilities = [
  { name: "Metropolitan General Hospital", type: "Medical", dist: "0.8 km", dir: "Get Directions" },
  { name: "District 4 Police Station", type: "Law Enforcement", dist: "1.2 km", dir: "Get Directions" },
  { name: "Fire Station Sector 7", type: "Fire Department", dist: "0.5 km", dir: "Get Directions" },
  { name: "Community Emergency Shelter", type: "Evacuation Center", dist: "1.5 km", dir: "Get Directions" },
];

const utilities = [
  { icon: <Zap size={20} />, name: "311 Services", desc: "City info and non-urgent matters", action: "Call 311", color: "text-warning" },
  { icon: <Droplets size={20} />, name: "Gas & Water", desc: "Report gas/water main issues", action: "Report Issue", color: "text-info" },
  { icon: <Building size={20} />, name: "Building Safety", desc: "Structural emergencies and code violations", action: "Report Issue", color: "text-accent" },
];

export default function EmergencyPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Emergency Services</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="input input-sm bg-base-200 border-white/10 flex items-center gap-2 w-52">
            <Search size={14} className="text-base-content/40" />
            <input type="text" placeholder="Search…" className="grow text-sm" />
          </label>
          <button className="btn btn-ghost btn-circle btn-sm relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Severe Weather Alert Banner */}
        <div className="bg-error/15 border border-error/40 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-2 rounded-full bg-error/20 text-error shrink-0 mt-0.5">
            <TriangleAlert size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="badge badge-error text-[10px] font-bold tracking-wider">SEVERE WEATHER WARNING</span>
            </div>
            <h3 className="font-bold text-base-content text-lg">Flash Flood Emergency in Sector 7</h3>
            <p className="text-sm text-base-content/70 mt-1">
              Residents are advised to move to higher ground immediately. Evacuation shelters are open at
              the Central Community Center. Avoid streets and drainage channels.
            </p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h3 className="font-bold text-base-content mb-4">Emergency Contacts</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-base-200 border border-white/5 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-info/10 text-info">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <p className="font-bold text-base-content">Police Dispatch</p>
                  <p className="text-xs text-base-content/50">Security and public safety</p>
                </div>
              </div>
              <a
                href="tel:911"
                className="btn w-full btn-info text-white font-bold gap-2"
              >
                <PhoneCall size={16} /> Call 911-P
              </a>
            </div>
            <div className="bg-base-200 border border-white/5 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-error/10 text-error">
                  <Flame size={22} />
                </div>
                <div>
                  <p className="font-bold text-base-content">Fire Department</p>
                  <p className="text-xs text-base-content/50">Access fire and rescue</p>
                </div>
              </div>
              <a
                href="tel:911"
                className="btn w-full btn-error text-white font-bold gap-2"
              >
                <PhoneCall size={16} /> Call 911-F
              </a>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative bg-base-200 border border-white/5 rounded-2xl overflow-hidden h-52 flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/28447800/pexels-photo-28447800.jpeg"
            alt="Emergency response by Helena Jankovičová Kováčová on Pexels"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 text-center">
            <MapPin size={32} className="text-error mx-auto mb-2" />
            <p className="font-bold text-base-content">Live Emergency Map</p>
            <p className="text-xs text-base-content/60 mt-1">Sector 7 — Active Incident Zone</p>
            <button
              className="btn btn-sm mt-3 text-white font-semibold"
              style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
            >
              Open Full Map
            </button>
          </div>
        </div>

        {/* Nearest Facilities */}
        <div>
          <h3 className="font-bold text-base-content mb-4">Nearest Facilities</h3>
          <div className="space-y-3">
            {facilities.map((f) => (
              <div
                key={f.name}
                className="bg-base-200 border border-white/5 rounded-xl px-5 py-3.5 flex items-center justify-between hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-base-content">{f.name}</p>
                    <p className="text-xs text-base-content/50">{f.type} · {f.dist}</p>
                  </div>
                </div>
                <button className="btn btn-xs btn-outline border-primary/40 text-primary hover:bg-primary/10 gap-1">
                  Directions <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Utility Services */}
        <div>
          <h3 className="font-bold text-base-content mb-4">Utility & City Services</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {utilities.map((u) => (
              <div key={u.name} className="bg-base-200 border border-white/5 rounded-xl p-4 space-y-3">
                <div className={`${u.color}`}>{u.icon}</div>
                <div>
                  <p className="font-bold text-sm text-base-content">{u.name}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">{u.desc}</p>
                </div>
                <button className="btn btn-xs btn-outline border-white/20 text-base-content/60 hover:text-base-content w-full">
                  {u.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

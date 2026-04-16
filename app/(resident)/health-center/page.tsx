"use client";

import {
  Bell,
  Search,
  Clock,
  PhoneCall,
  HeartPulse,
  Stethoscope,
  Baby,
  Eye,
  Brain,
  Bone,
  AlertTriangle,
} from "lucide-react";

const doctors = [
  { name: "Dr. Ana Reyes", specialty: "General Practice", status: "AVAILABLE", time: "09:00 – 14:00", avatar: "AR" },
  { name: "Dr. Marco Dela Cruz", specialty: "Neural Diagnostics", status: "FULLY BOOKED", time: "10:00 – 12:00", avatar: "MD" },
  { name: "Dr. Liz Santos", specialty: "Pediatrics", status: "AVAILABLE", time: "08:00 – 16:00", avatar: "LS" },
  { name: "Emergency Triage", specialty: "Emergency Unit", status: "24/7", time: "Always Open", avatar: "ET" },
];

const services = [
  { icon: <Stethoscope size={20} />, name: "General Consultation", desc: "Primary care checkups and diagnosis" },
  { icon: <HeartPulse size={20} />, name: "Cardiac Monitoring", desc: "Heart health assessments and ECG" },
  { icon: <Baby size={20} />, name: "Pediatrics", desc: "Child health services, 0–18 years" },
  { icon: <Eye size={20} />, name: "Ophthalmology", desc: "Vision testing and eye care services" },
  { icon: <Brain size={20} />, name: "Neural Diagnostics", desc: "Neurological assessments and scans" },
  { icon: <Bone size={20} />, name: "Orthopedics", desc: "Bone, joint, and muscle care" },
];

const statusColor: Record<string, string> = {
  AVAILABLE: "text-success",
  "FULLY BOOKED": "text-error",
  "24/7": "text-warning",
};

export default function HealthCenterPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Health Center</h1>
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

      <div className="px-6 lg:px-8 py-6 space-y-8">
        {/* Header hero */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg"
            alt="Health center by Pavel Danilyuk on Pexels"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span className="badge badge-primary mb-2 w-fit">OFFICIAL CIVIC CENTER</span>
            <h2 className="text-2xl lg:text-3xl font-black text-base-content">Health Center</h2>
            <p className="text-base-content/60 text-sm mt-1 max-w-md">
              Access district medical services, schedule appointments, and connect with healthcare professionals.
            </p>
          </div>
        </div>

        {/* Appointment Slots */}
        <div>
          <h3 className="font-bold text-base-content mb-4">Today's Appointment Slots</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctors.map((d) => (
              <div
                key={d.name}
                className="bg-base-200 border border-white/5 rounded-xl p-4 flex flex-col gap-3 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {d.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-base-content truncate">{d.name}</p>
                    <p className="text-xs text-base-content/50 truncate">{d.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-base-content/50 flex items-center gap-1">
                    <Clock size={11} /> {d.time}
                  </span>
                  <span className={`text-xs font-bold ${statusColor[d.status]}`}>{d.status}</span>
                </div>
                <button
                  className="btn btn-sm w-full text-white font-semibold"
                  style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
                  disabled={d.status === "FULLY BOOKED"}
                >
                  {d.status === "FULLY BOOKED" ? "Join Waitlist" : "Book Slot"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h3 className="font-bold text-base-content mb-4">Available Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.name}
                className="bg-base-200 border border-white/5 rounded-xl p-4 flex items-start gap-4 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {s.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-base-content">{s.name}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Hotline */}
        <div className="bg-error/10 border border-error/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 rounded-full bg-error/20 text-error">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base-content text-lg">Emergency Hotline</p>
            <p className="text-base-content/60 text-sm mt-1">
              24/7 emergency response. Do not use for non-emergencies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:911"
              className="btn btn-error font-bold flex items-center gap-2"
            >
              <PhoneCall size={16} /> Call 911
            </a>
            <a
              href="tel:300-4357"
              className="btn btn-outline border-error/40 text-error hover:bg-error/10 flex items-center gap-2"
            >
              <PhoneCall size={16} /> 300-HELP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

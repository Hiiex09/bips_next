"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  MessageSquareWarning,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
} from "lucide-react";

const categories = [
  "Road & Infrastructure",
  "Public Safety",
  "Garbage & Sanitation",
  "Noise Complaint",
  "Flooding & Drainage",
  "Illegal Structures",
  "Community Services",
  "Other",
];

const previousConcerns = [
  {
    id: "CSR-2025-0071",
    category: "Flooding & Drainage",
    title: "Clogged drainage near Sector 4 Street",
    date: "Jun 28, 2025",
    status: "In Review",
    statusColor: "badge-warning",
    icon: <Clock size={13} />,
  },
  {
    id: "CSR-2025-0049",
    category: "Road & Infrastructure",
    title: "Pothole on main road approaching intersection",
    date: "May 15, 2025",
    status: "Resolved",
    statusColor: "badge-success",
    icon: <CheckCircle size={13} />,
  },
  {
    id: "CSR-2025-0033",
    category: "Noise Complaint",
    title: "Excessive noise from nearby construction post 10 PM",
    date: "Apr 10, 2025",
    status: "Closed",
    statusColor: "badge-neutral",
    icon: <AlertCircle size={13} />,
  },
];

export default function SubmitConcernPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    urgency: "Normal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ category: "", title: "", description: "", location: "", urgency: "Normal" });
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Submit a Concern</h1>
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

      {submitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success">
            <CheckCircle size={16} />
            <span>Your concern has been submitted successfully.</span>
          </div>
        </div>
      )}

      <div className="px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <MessageSquareWarning size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-base-content">Submit a Concern</h2>
                  <p className="text-xs text-base-content/50">Help us improve our community</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset className="fieldset bg-base-200 border border-white/5 rounded-xl p-5 space-y-4">
                {/* Category */}
                <div>
                  <label className="label text-xs font-semibold text-base-content/60 mb-1.5">Category *</label>
                  <select
                    className="select select-bordered w-full bg-base-300 border-white/10 text-base-content"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="label text-xs font-semibold text-base-content/60 mb-1.5">Concern Title *</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-300 border-white/10 text-base-content"
                    placeholder="Brief title for your concern"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="label text-xs font-semibold text-base-content/60 mb-1.5">Description *</label>
                  <textarea
                    className="textarea textarea-bordered w-full bg-base-300 border-white/10 text-base-content min-h-32 resize-none"
                    placeholder="Provide detailed information about the concern, including when it started and how it affects the community…"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="label text-xs font-semibold text-base-content/60 mb-1.5">Location</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-300 border-white/10 text-base-content"
                    placeholder="Street address or landmark (e.g., near Sector 4 Junction)"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                {/* Urgency */}
                <div>
                  <label className="label text-xs font-semibold text-base-content/60 mb-1.5">Urgency Level</label>
                  <div className="flex gap-2 flex-wrap">
                    {["Normal", "Moderate", "Urgent"].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setForm({ ...form, urgency: u })}
                        className={`btn btn-sm rounded-full ${
                          form.urgency === u
                            ? u === "Urgent"
                              ? "btn-error text-white"
                              : u === "Moderate"
                              ? "btn-warning text-white"
                              : "btn-success text-white"
                            : "btn-ghost border border-white/10 text-base-content/60"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                className="btn w-full text-white font-bold text-base gap-2"
                style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
              >
                <Send size={16} /> Submit Concern
              </button>
            </form>
          </div>

          {/* History */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-base-content">Previous Submissions</h3>
            <div className="space-y-3">
              {previousConcerns.map((c) => (
                <div key={c.id} className="bg-base-200 border border-white/5 rounded-xl p-4 space-y-2 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-base-content/40">{c.id}</span>
                    <span className={`badge badge-xs ${c.statusColor} flex items-center gap-1`}>
                      {c.icon} {c.status}
                    </span>
                  </div>
                  <p className="font-semibold text-sm text-base-content leading-snug">{c.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary/80 font-medium">{c.category}</span>
                    <span className="text-xs text-base-content/40">{c.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="bg-info/10 border border-info/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-info mb-1">Response Times</p>
              <div className="space-y-1 text-xs text-base-content/60">
                <p>🟢 Normal — 5–7 business days</p>
                <p>🟡 Moderate — 2–3 business days</p>
                <p>🔴 Urgent — Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

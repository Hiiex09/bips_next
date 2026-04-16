"use client";

import { useState } from "react";
import { Bell, Search, FileDown, Filter, ScrollText } from "lucide-react";

const filterTabs = ["All Records", "Resolutions", "Zoning", "Public Safety", "Sustainability"];

const ordinances = [
  {
    id: 1,
    code: "ORD-2025-04",
    tag: "EFFECTIVE · ACTIVE",
    category: "Resolutions",
    title: "Digital Infrastructure & Privacy Act",
    desc: "Framework governing the deployment of community-wide fiber networks and data sovereignty protections for all residents.",
    tagColor: "badge-success",
  },
  {
    id: 2,
    code: "ORD-2025-42",
    tag: "ENVIRONMENT · ACTIVE",
    category: "Sustainability",
    title: "Net-Zero Urban Canopy Initiative",
    desc: "Mandating the preservation of local flora and integrated vertical gardens in all new commercial developments.",
    tagColor: "badge-info",
  },
  {
    id: 3,
    code: "ORD-2024-88",
    tag: "PUBLIC SAFETY · ACTIVE",
    category: "Public Safety",
    title: "Community Safety & Noise Control",
    desc: "Standardized decibel levels for residential zones to maintain the pulse of tranquility within the district.",
    tagColor: "badge-warning",
  },
  {
    id: 4,
    code: "ORD-2024-31",
    tag: "ECONOMIC · ACTIVE",
    category: "Resolutions",
    title: "Small Business Grant Resolution",
    desc: "Financial incentives for sustainable tech startups relocating to the Innovation Corridor.",
    tagColor: "badge-accent",
  },
  {
    id: 5,
    code: "ORD-2025-17",
    tag: "ZONING · ACTIVE",
    category: "Zoning",
    title: "Mixed-Use Development Standards",
    desc: "Updated guidelines for mixed residential and commercial zoning in Sector 4 and adjacent areas.",
    tagColor: "badge-primary",
  },
  {
    id: 6,
    code: "ORD-2024-60",
    tag: "SUSTAINABILITY · ACTIVE",
    category: "Sustainability",
    title: "Waste Segregation & Recycling Mandate",
    desc: "Comprehensive policy on household waste segregation and recycling compliance for all district residents.",
    tagColor: "badge-success",
  },
];

export default function LocalOrdinancesPage() {
  const [activeTab, setActiveTab] = useState("All Records");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = ordinances.filter((o) => {
    const matchTab = activeTab === "All Records" || o.category === activeTab;
    const matchSearch =
      !search ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.desc.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Local Ordinances</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="input input-sm bg-base-200 border-white/10 flex items-center gap-2 w-52">
            <Search size={14} className="text-base-content/40" />
            <input
              type="text"
              placeholder="Search ordinances…"
              className="grow text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button className="btn btn-ghost btn-circle btn-sm relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Hero */}
        <div className="bg-base-200 border border-white/5 rounded-2xl p-6 lg:p-8">
          <span className="badge badge-primary mb-3 w-fit">OFFICIAL LEGISLATION</span>
          <h2 className="text-2xl lg:text-3xl font-black text-base-content">
            Ordinances &{" "}
            <span className="text-primary">Legal Framework</span>
          </h2>
          <p className="text-base-content/60 text-sm mt-2 max-w-2xl">
            Access the complete digital library of community governance, legislative resolutions,
            and resident guidelines for the Sovereign district.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex gap-2 flex-wrap flex-1">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn btn-sm rounded-full ${
                  activeTab === tab
                    ? "text-white border-0"
                    : "btn-ghost border border-white/10 text-base-content/60 hover:text-base-content"
                }`}
                style={
                  activeTab === tab
                    ? { background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }
                    : undefined
                }
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-sm btn-outline border-white/20 text-base-content/60 hover:text-base-content gap-2 shrink-0"
          >
            <Filter size={14} /> Advanced Filtering
          </button>
        </div>

        {/* Ordinances List */}
        <div className="space-y-3">
          {filtered.map((ord) => (
            <div
              key={ord.id}
              className="bg-base-200 border border-white/5 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                <ScrollText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="text-xs font-bold text-base-content/40 font-mono">{ord.code}</span>
                  <span className={`badge badge-xs ${ord.tagColor} text-[10px] font-bold tracking-wider`}>
                    {ord.tag}
                  </span>
                </div>
                <h4 className="font-bold text-base-content text-sm lg:text-base">{ord.title}</h4>
                <p className="text-xs text-base-content/50 mt-1 line-clamp-2">{ord.desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="btn btn-xs btn-outline border-white/20 text-base-content/60 hover:text-base-content hover:border-primary/40 gap-1.5">
                  <FileDown size={12} /> PDF
                </button>
                <button className="btn btn-xs text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
                  View
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-base-content/40">
              <ScrollText size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No ordinances found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="text-center pt-2 pb-4">
          <button className="btn btn-outline border-white/20 text-base-content/60 hover:text-base-content hover:border-primary/40 rounded-full px-8">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

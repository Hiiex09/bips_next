"use client";

import { useState } from "react";
import { Search, Bell, ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";

const categories = ["All News", "Project Update", "Highlights", "Announcements"];

const newsItems = [
  {
    id: 1,
    category: "Highlights",
    tag: "FEATURED",
    title: "Harvest Moon Festival: Celebrating Our Local Heritage",
    desc: "Join us for the largest gathering of the season. Featuring local artisans, live music from the district ensemble, and the finest produce from community farms throughout the region.",
    img: "https://images.pexels.com/photos/30603258/pexels-photo-30603258.jpeg",
    date: "OCT 15",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 2,
    category: "Project Update",
    tag: "PROJECT UPDATE",
    title: "New Green Corridor Phase 2 Begins",
    desc: "Infrastructure improvements along cycling lanes and sustainable vertical gardens in all new commercial developments.",
    img: "https://images.pexels.com/photos/15291242/pexels-photo-15291242.jpeg",
    date: "3 days ago",
    readTime: "3 min read",
  },
  {
    id: 3,
    category: "Highlights",
    tag: "HIGHLIGHT",
    title: "Meet the Winners of the Civic Innovation Lab",
    desc: "Sovereign-grade security for your personal metadata and legal documentation. Teams recognized for outstanding digital service projects.",
    img: "https://images.unsplash.com/photo-1758270705290-62b6294dd044?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    date: "1 week ago",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "Announcements",
    tag: "ANNOUNCEMENT",
    title: "Urban Garden Initiative Expands to East District",
    desc: "Growing the success of the Central District, the Urban Garden Initiative now reaches east-side neighborhoods.",
    img: "https://images.pexels.com/photos/8783843/pexels-photo-8783843.jpeg",
    date: "2 weeks ago",
    readTime: "2 min read",
  },
  {
    id: 5,
    category: "Project Update",
    tag: "PROJECT UPDATE",
    title: "Smart Street Lighting Infrastructure Reaches 85%",
    desc: "The sovereign pride of our community grows brighter. Our new AI-managed efficient lighting project is nearly finished, covering all major residential corridors.",
    img: "https://images.pexels.com/photos/12923395/pexels-photo-12923395.jpeg",
    date: "3 weeks ago",
    readTime: "4 min read",
  },
];

export default function CommunityNewsPage() {
  const [active, setActive] = useState("All News");
  const [search, setSearch] = useState("");

  const filtered = newsItems.filter((n) => {
    const matchCat = active === "All News" || n.category === active;
    const matchSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Community News</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="input input-sm bg-base-200 border-white/10 flex items-center gap-2 w-52">
            <Search size={14} className="text-base-content/40" />
            <input
              type="text"
              placeholder="Search news…"
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
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-base-content">Community News</h2>
            <p className="text-base-content/50 text-sm mt-1">Stay informed with the latest district updates and highlights</p>
          </div>
          <span className="badge badge-primary badge-outline hidden sm:flex">Top Stories</span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`btn btn-sm rounded-full ${
                active === cat
                  ? "text-white border-0"
                  : "btn-ghost border border-white/10 text-base-content/60 hover:text-base-content"
              }`}
              style={
                active === cat
                  ? { background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {featured && (
          <div className="card lg:card-side overflow-hidden bg-base-200 border border-white/5 hover:border-primary/30 transition-all group">
            <figure className="lg:w-2/5 h-56 lg:h-auto overflow-hidden shrink-0">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="card-body p-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge badge-secondary text-[10px] font-bold tracking-wider">
                  {featured.tag}
                </span>
                <span className="text-xs text-base-content/40 flex items-center gap-1">
                  <Calendar size={11} /> {featured.date}
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-base-content mt-2 leading-snug">
                {featured.title}
              </h3>
              <p className="text-base-content/60 text-sm leading-relaxed">{featured.desc}</p>
              <div className="card-actions mt-4">
                <button
                  className="btn btn-sm text-white font-semibold"
                  style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
                >
                  Event Details <ArrowRight size={14} />
                </button>
                <span className="text-xs text-base-content/40 self-center ml-2">{featured.readTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((item) => (
            <article
              key={item.id}
              className="card overflow-hidden bg-base-200 border border-white/5 hover:border-primary/30 transition-all group"
            >
              <figure className="h-44 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="badge badge-xs badge-outline text-[10px] font-bold tracking-wider text-primary border-primary/40">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-base-content leading-snug">{item.title}</h4>
                <p className="text-xs text-base-content/50 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-base-content/40 flex items-center gap-1">
                    <Calendar size={11} /> {item.date}
                  </span>
                  <span className="text-xs text-base-content/40">{item.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="text-center pt-4">
            <button className="btn btn-outline border-white/20 text-base-content/60 hover:text-base-content hover:border-primary/40 rounded-full px-8">
              Load More Articles
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-base-content/40">
            <Tag size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No articles found</p>
            <p className="text-sm mt-1">Try a different category or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}

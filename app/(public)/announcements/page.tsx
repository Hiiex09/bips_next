import Link from "next/link";
import { ArrowRight, Calendar, MailOpen, ChevronRight } from "lucide-react";

const urgentNotices = [
  {
    id: 1,
    tag: "HEALTH",
    title: "Scheduled Water Interruption",
    desc: "Water supply will be interrupted on Friday 8AM–5PM for maintenance. Please store enough water for the day.",
    img: "https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg",
    date: "Oct 10",
    urgency: "badge-error",
  },
  {
    id: 2,
    tag: "HEALTH",
    title: "Dengue Awareness Vaccination Drive",
    desc: "Free dengue vaccination is available at the Central Community Hall. Residents are encouraged to participate.",
    img: "https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg",
    date: "Oct 09",
    urgency: "badge-warning",
  },
];

const recentUpdates = [
  {
    id: 1,
    tag: "EVENT",
    title: "Quarterly General Assembly & Digital Roadmap Launch",
    desc: "Community leaders met to discuss the digital roadmap for the next fiscal quarter.",
    img: "https://images.pexels.com/photos/30603258/pexels-photo-30603258.jpeg",
    date: "3 days ago",
  },
  {
    id: 2,
    tag: "SPORTS",
    title: "Inter-Barangay Basketball Tournament Finals",
    desc: "Teams from all sectors compete for the championship in the annual tournament.",
    img: "https://images.pexels.com/photos/33434097/pexels-photo-33434097.jpeg",
    date: "5 days ago",
  },
  {
    id: 3,
    tag: "HEALTH",
    title: "Free Medical Mission for Senior Citizens",
    desc: "A comprehensive health check program offered to all residents aged 60 and above.",
    img: "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg",
    date: "1 week ago",
  },
];

export default function AnnouncementsPage() {
  return (
    <div data-theme="portal-dark" className="min-h-screen bg-base-100">
      {/* Navbar */}
      <nav className="navbar bg-base-200 border-b border-white/5 px-4 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow border border-white/10">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/announcements">Announcements</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-base font-bold">
            BarangayConnect
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/announcements" className="text-primary font-semibold">Announcements</Link></li>
            <li><Link href="/">About</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link href="/login" className="btn btn-sm text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
            Resident Login
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 space-y-12">
        {/* Page header */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="badge badge-primary mb-2">COMMUNITY UPDATES</span>
            <h1 className="text-3xl lg:text-4xl font-black text-base-content">
              Community{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
                Announcements
              </span>
            </h1>
            <p className="text-base-content/50 text-sm mt-2">
              Updates from local authorities, health advisories, and community events.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-ghost border border-white/10 text-base-content/60">All</button>
            <button className="btn btn-sm btn-ghost border border-white/10 text-base-content/60">Health</button>
            <button className="btn btn-sm btn-ghost border border-white/10 text-base-content/60">Events</button>
            <button className="btn btn-sm btn-ghost border border-white/10 text-base-content/60">Projects</button>
          </div>
        </div>

        {/* Urgent Notices */}
        <section>
          <h2 className="font-bold text-base-content mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
            Urgent Notices
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {urgentNotices.map((n) => (
              <div key={n.id} className="card sm:card-side overflow-hidden bg-base-200 border border-error/20 hover:border-error/40 transition-all">
                <figure className="sm:w-44 h-36 sm:h-auto shrink-0">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body p-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`badge badge-xs ${n.urgency} text-[10px] font-bold`}>{n.tag}</span>
                    <span className="text-xs text-base-content/40 flex items-center gap-1">
                      <Calendar size={11} /> {n.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-base-content leading-snug">{n.title}</h3>
                  <p className="text-xs text-base-content/50 line-clamp-2">{n.desc}</p>
                  <button className="btn btn-xs btn-outline border-white/20 text-base-content/60 hover:text-base-content w-fit mt-1 gap-1">
                    Read More <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section>
          <h2 className="font-bold text-base-content mb-4">Recent Updates</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {recentUpdates.map((u) => (
              <article key={u.id} className="card overflow-hidden bg-base-200 border border-white/5 hover:border-primary/30 transition-all group">
                <figure className="h-44 overflow-hidden">
                  <img
                    src={u.img}
                    alt={u.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body p-4 space-y-2">
                  <span className="badge badge-xs badge-outline border-primary/40 text-primary text-[10px] font-bold">{u.tag}</span>
                  <h4 className="font-bold text-sm text-base-content leading-snug">{u.title}</h4>
                  <p className="text-xs text-base-content/50 line-clamp-2">{u.desc}</p>
                  <p className="text-xs text-base-content/40">{u.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Featured Project Article */}
        <section>
          <div className="bg-base-200 border border-white/5 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 lg:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="badge badge-success text-[10px] font-bold tracking-wider">PROJECT UPDATE</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-base-content">
                  Smart Street Lighting Infrastructure Reaches 85% Completion
                </h3>
                <p className="text-sm text-base-content/60 leading-relaxed">
                  The sovereign pride of our community grows brighter. Our new AI-managed efficient
                  lighting project is nearly finished, covering all major residential corridors by
                  the end of November. The energy-efficient system is expected to reduce utility
                  costs by 40%.
                </p>
                <button className="btn btn-sm text-white font-semibold gap-2"
                  style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
                  Read the Full Technical Report <ArrowRight size={14} />
                </button>
              </div>
              <figure className="h-56 lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/22032343/pexels-photo-22032343.jpeg"
                  alt="Solar panels by Vladimir Srajber on Pexels"
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Load More */}
        <div className="text-center">
          <button className="btn btn-outline border-white/20 text-base-content/60 hover:text-base-content hover:border-primary/40 rounded-full px-8">
            Load More Notices ↓
          </button>
        </div>

        {/* Newsletter */}
        <section className="bg-base-200 border border-white/5 rounded-2xl p-6 lg:p-8">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MailOpen size={20} className="text-primary" />
            </div>
            <h3 className="text-xl lg:text-2xl font-black text-base-content">
              Stay ahead of the pulse.
            </h3>
            <p className="text-sm text-base-content/60">
              Get critical neighborhood alerts, safety schedules, and community event notices directly
              to your inbox or via SMS.
            </p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.gov.ph"
                className="input input-bordered flex-1 bg-base-300 border-white/10 text-sm"
              />
              <button
                className="btn text-white font-semibold shrink-0"
                style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-base-content/30">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-base-200 border-t border-white/5 py-10 px-6 lg:px-8 mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              { title: "PLATFORM", links: ["Services", "Documents", "Reports", "About"] },
              { title: "RESOURCES", links: ["Help Center", "FAQ", "Status", "Privacy"] },
              { title: "LEGAL", links: ["Terms", "Privacy Policy", "Accessibility", "Cookie Policy"] },
              { title: "CONTACT", links: ["Support", "Feedback", "Emergency", "FOI Portal"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-sm text-base-content/60 hover:text-base-content transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-bold text-base-content">BarangayConnect</p>
            <p className="text-xs text-base-content/40">© 2025 Digital Governance Bureau · AUTHORITY THROUGH SOPHISTICATION</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

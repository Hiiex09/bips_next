import Link from "next/link";
import {
  FileText,
  Building2,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  CheckSquare,
  Clock,
  MessageCircle,
  ChevronRight,
  Home,
  Star,
  Hammer,
} from "lucide-react";

const mainServices = [
  {
    icon: <FileText size={28} />,
    name: "Barangay Clearance",
    desc: "Essential document for employment, transactions, and official identification.",
    href: "/residentDashboard",
  },
  {
    icon: <Building2 size={28} />,
    name: "Business Permit",
    desc: "For entrepreneurs and local business owners seeking operational licensing.",
    href: "/residentDashboard",
  },
  {
    icon: <ShieldCheck size={28} />,
    name: "Certificate of Indigency",
    desc: "Supporting documents for educational and medical assistance programs.",
    href: "/residentDashboard",
  },
  {
    icon: <AlertOctagon size={28} />,
    name: "Incident Report",
    desc: "Digital reporting system for documented safety and official records.",
    href: "/residentDashboard",
  },
];

const otherServices = [
  { icon: <Home size={18} />, name: "Certificate of Residency", desc: "Proof of address for local administrative needs." },
  { icon: <Star size={18} />, name: "Good Moral Certificate", desc: "Attestation of character for school or work." },
  { icon: <ShieldCheck size={18} />, name: "Barangay ID Application", desc: "Unified local identification card processing." },
  { icon: <Hammer size={18} />, name: "Building Permit Endorsement", desc: "Preliminary clearance for construction projects." },
];

const steps = [
  { num: "01", label: "Submit Requirements", desc: "Upload necessary documents through our secure portal." },
  { num: "02", label: "Verification", desc: "Our staff reviews and validates your submission." },
  { num: "03", label: "Processing", desc: "Official processing and document preparation." },
  { num: "04", label: "Ready for Pickup", desc: "Get notified when your document is ready." },
];

const requirements = [
  "Valid Government-issued ID",
  "Proof of Residency",
  "Filled-out Application Form",
  "1x1 or 2x2 Photo",
  "Community Tax Certificate",
];

const processingTimes = [
  { name: "Barangay Clearance", days: "1–2 days", pct: 30 },
  { name: "Business Permit", days: "3–5 days", pct: 60 },
  { name: "Certificate of Indigency", days: "Same day", pct: 10 },
  { name: "Incident Report", days: "1 day", pct: 20 },
];

export default function AllServicesPage() {
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
            <li><Link href="/services" className="text-primary font-semibold">Services</Link></li>
            <li><Link href="/announcements">Announcements</Link></li>
            <li><Link href="/announcements">About</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link href="/login" className="btn btn-sm text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
            Resident Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-6 lg:px-8 text-center">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #4F6BFF 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="badge badge-primary mb-4">ALL SERVICES</span>
          <h1 className="text-4xl lg:text-6xl font-black text-base-content leading-tight">
            All Services in{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
              One Place
            </span>
          </h1>
          <p className="mt-5 text-base-content/60 text-base lg:text-lg max-w-xl mx-auto">
            Access official barangay services online — skip the lines and manage your documents
            from anywhere, anytime, through our secure digital portal.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/login"
              className="btn text-white font-bold gap-2"
              style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
              Get Started <ArrowRight size={16} />
            </Link>
            <Link href="/announcements" className="btn btn-outline border-white/20 text-base-content/70 hover:text-base-content rounded-full">
              View Announcements
            </Link>
          </div>
        </div>
      </section>

      {/* Most Requested Services */}
      <section className="px-6 lg:px-8 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-black text-base-content">Most Requested Services</h2>
          <p className="text-base-content/50 text-sm mt-2">The top documents and services requested by our residents</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainServices.map((s) => (
            <Link key={s.name} href={s.href}
              className="bg-base-200 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all group">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:bg-primary/20 transition-colors">
                {s.icon}
              </div>
              <div>
                <h3 className="font-bold text-base-content">{s.name}</h3>
                <p className="text-xs text-base-content/50 mt-1 leading-relaxed">{s.desc}</p>
              </div>
              <span className="text-xs text-primary flex items-center gap-1 mt-auto font-semibold">
                Learn More <ChevronRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-8 py-12 bg-base-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-black text-base-content">How It Works</h2>
            <p className="text-base-content/50 text-sm mt-2">Four simple steps to access your digital freedoms</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-primary/20" />
                )}
                <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm mb-4"
                  style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
                  {step.num}
                </div>
                <h4 className="font-bold text-base-content text-sm">{step.label}</h4>
                <p className="text-xs text-base-content/50 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Essential Services */}
      <section className="px-6 lg:px-8 py-12 max-w-6xl mx-auto">
        <h2 className="text-xl lg:text-2xl font-black text-base-content mb-6">Other Essential Services</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {otherServices.map((s) => (
            <div key={s.name}
              className="bg-base-200 border border-white/5 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-base-content">{s.name}</p>
                <p className="text-xs text-base-content/50">{s.desc}</p>
              </div>
              <ChevronRight size={16} className="text-base-content/30 shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-6 lg:px-8 py-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* General Requirements */}
          <div className="bg-base-200 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckSquare size={20} className="text-success" />
              <h4 className="font-bold text-base-content">General Requirements</h4>
            </div>
            <ul className="space-y-2">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-base-content/70">
                  <span className="text-success mt-0.5">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Processing Time */}
          <div className="bg-base-200 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <h4 className="font-bold text-base-content">Processing Time</h4>
            </div>
            <div className="space-y-3">
              {processingTimes.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-base-content/70">{p.name}</span>
                    <span className="text-base-content/40">{p.days}</span>
                  </div>
                  <progress className="progress progress-primary w-full" value={p.pct} max={100} />
                </div>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="rounded-2xl p-6 space-y-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(79,107,255,0.25),rgba(255,61,154,0.2))" }}>
            <div className="absolute inset-0 bg-base-200 opacity-70" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} className="text-secondary" />
                <h4 className="font-bold text-base-content">Need Help?</h4>
              </div>
              <p className="text-sm text-base-content/60">
                Our digital agents are available 24/7 to assist you with any service inquiries.
              </p>
              <button className="btn w-full text-white font-bold"
                style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}>
                Connect with Agent
              </button>
              <p className="text-xs text-base-content/40 text-center">Mon–Fri 8AM–5PM · Priority Support</p>
            </div>
          </div>
        </div>
      </section>

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

"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  FileText,
  Shield,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";

const documents = [
  {
    id: 1,
    icon: <FileText size={24} />,
    name: "Barangay Clearance",
    desc: "Standard certification for legal transactions and local employment verification.",
    price: "PHP 32.20",
    free: false,
    status: "available",
  },
  {
    id: 2,
    icon: <Shield size={24} />,
    name: "Residency Certificate",
    desc: "Official proof of residency for utility applications and bank account verification.",
    price: "PHP 75.00",
    free: false,
    status: "available",
  },
  {
    id: 3,
    icon: <Star size={24} />,
    name: "Indigency Certificate",
    desc: "Certification for social service eligibility and medical assistance programs.",
    price: "FREE",
    free: true,
    status: "available",
  },
];

const activeRequests = [
  { id: "REQ-2025-0041", name: "Business Permit (Renewal)", status: "Processing", statusColor: "badge-warning" },
  { id: "REQ-2025-0028", name: "Certificate of Record", status: "Submitted", statusColor: "badge-info" },
];

const transcripts = [
  { id: "TRX-001", doc: "Barangay Clearance", filed: "Jun 10, 2025", fulfilled: "Jun 11, 2025", status: "Completed" },
  { id: "TRX-002", doc: "Residency Certificate", filed: "May 3, 2025", fulfilled: "May 4, 2025", status: "Completed" },
  { id: "TRX-003", doc: "Indigency Certificate", filed: "Mar 22, 2025", fulfilled: "Mar 24, 2025", status: "Completed" },
];

const statusIcon: Record<string, React.ReactNode> = {
  Completed: <CheckCircle size={14} className="text-success" />,
  Processing: <Clock size={14} className="text-warning" />,
  Submitted: <AlertCircle size={14} className="text-info" />,
};

export default function DocumentsPage() {
  const [requesting, setRequesting] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-base-100/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-widest">Resident Portal</p>
          <h1 className="text-lg font-bold text-base-content">Document Request Portal</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="input input-sm bg-base-200 border-white/10 flex items-center gap-2 w-52">
            <Search size={14} className="text-base-content/40" />
            <input type="text" placeholder="Search documents…" className="grow text-sm" />
          </label>
          <button className="btn btn-ghost btn-circle btn-sm relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Hero */}
        <div
          className="rounded-2xl p-6 lg:p-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(79,107,255,0.25),rgba(255,61,154,0.15))" }}
        >
          <div className="absolute inset-0 bg-base-200 opacity-80" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary text-[10px] font-bold tracking-wider">RESIDENT HUB</span>
              <span className="badge badge-outline border-success/40 text-success text-[10px]">VERIFIED CITIZEN</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-base-content">
              Document{" "}
              <span className="text-primary">Request Portal</span>
            </h2>
            <p className="text-base-content/60 text-sm mt-2 max-w-xl">
              Official sovereign credential management. Request, track, and manage your legal residency
              documents within the secure ecosystem.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Documents */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base-content">Available Documents</h3>
              <span className="text-xs text-base-content/40">Updated hourly</span>
            </div>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-base-200 border border-white/5 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-all"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">{doc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base-content">{doc.name}</h4>
                    <p className="text-xs text-base-content/50 mt-1">{doc.desc}</p>
                    <p className={`text-sm font-bold mt-2 ${doc.free ? "text-success" : "text-accent"}`}>
                      {doc.price}
                    </p>
                  </div>
                  <button
                    className="btn btn-sm text-white font-semibold shrink-0"
                    style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
                    onClick={() => setRequesting(doc.id)}
                  >
                    Request Document
                  </button>
                </div>
              ))}
            </div>

            {/* Digital Express Lane */}
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-start gap-3">
              <Star size={18} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-base-content">Digital Express Lane</p>
                <p className="text-xs text-base-content/60 mt-0.5">
                  Verified residents with <span className="text-accent font-semibold">"Gold Pulse"</span> status
                  receive priority processing within 24 hours for all applications and bank account verification.
                </p>
              </div>
            </div>

            {/* Recent Transcripts */}
            <div>
              <h3 className="font-bold text-base-content mb-3">Recent Transcripts</h3>
              <div className="bg-base-200 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr className="border-white/5">
                        <th className="text-base-content/50 text-xs font-semibold">Document</th>
                        <th className="text-base-content/50 text-xs font-semibold">Filed</th>
                        <th className="text-base-content/50 text-xs font-semibold">Fulfilled</th>
                        <th className="text-base-content/50 text-xs font-semibold">Status</th>
                        <th className="text-base-content/50 text-xs font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transcripts.map((t) => (
                        <tr key={t.id} className="border-white/5 hover:bg-base-300/30">
                          <td className="text-sm text-base-content font-medium">{t.doc}</td>
                          <td className="text-xs text-base-content/50">{t.filed}</td>
                          <td className="text-xs text-base-content/50">{t.fulfilled}</td>
                          <td>
                            <span className="flex items-center gap-1.5 text-xs text-success font-semibold">
                              {statusIcon[t.status]} {t.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-ghost btn-xs gap-1 text-primary">
                              <Download size={12} /> Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Active Requests Sidebar */}
          <div className="space-y-4">
            <h3 className="font-bold text-base-content">My Active Requests</h3>
            <div className="space-y-3">
              {activeRequests.map((r) => (
                <div key={r.id} className="bg-base-200 border border-white/5 rounded-xl p-4">
                  <p className="text-xs font-mono text-base-content/40 mb-1">{r.id}</p>
                  <p className="font-semibold text-sm text-base-content">{r.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge badge-xs ${r.statusColor} font-semibold`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline border-white/20 text-base-content/60 hover:text-base-content w-full text-sm">
              View Full Archive
            </button>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {requesting && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-base-200 border border-white/10">
            <h3 className="font-bold text-lg text-base-content">Confirm Document Request</h3>
            <p className="text-base-content/60 text-sm mt-2">
              You are about to request <span className="text-primary font-semibold">{documents.find((d) => d.id === requesting)?.name}</span>.
              Processing time is typically 1–3 business days.
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost text-base-content/60" onClick={() => setRequesting(null)}>
                Cancel
              </button>
              <button
                className="btn text-white font-bold"
                style={{ background: "linear-gradient(135deg,#FF3D9A,#4F6BFF)" }}
                onClick={() => setRequesting(null)}
              >
                Confirm Request
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setRequesting(null)}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

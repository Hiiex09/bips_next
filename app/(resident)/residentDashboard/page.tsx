"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  imageUrl?: string;
}

const colors = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-info",
  "bg-success",
  "bg-warning",
  "bg-error",
  "bg-primary-container",
  "bg-secondary-container",
  "bg-tertiary-container",
];

const ResidentDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/auth/checkAuth");
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setUser(data.user);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const getInitials = (fullName: string) => {
    const [first = "", ...rest] = fullName.trim().split(" ");
    const last = rest.length ? rest[rest.length - 1] : "";
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const getColor = (id: number) => colors[id % colors.length];

  const onLogout = async () => {
    setMenuOpen(false);
    try {
      const res = await fetch("/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-base-200">
      <aside className="w-72 bg-base-100 border-r">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary text-primary-content w-10 h-10 flex items-center justify-center rounded-lg">
            🏛️
          </div>
          <div>
            <h1 className="font-bold">Barangay Portal</h1>
            <p className="text-xs opacity-60">Local Governance System</p>
          </div>
        </div>
        <ul className="menu p-4 flex-1">
          <li>
            <a className="active">Dashboard</a>
          </li>
          <li>
            <a>Document Requests</a>
          </li>
          <li>
            <a>Incident Reporting</a>
          </li>
          <li>
            <a>Facility Bookings</a>
          </li>
          <li>
            <a>My Applications</a>
          </li>
        </ul>

        <div className="p-4 border-t mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${user ? getColor(user.id) : "bg-neutral"}`}
            >
              {user ? (
                <span className="text-white font-bold text-lg">
                  {getInitials(user.fullName)}
                </span>
              ) : (
                <span className="text-neutral-content">?</span>
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-xs">
                {user?.fullName || "Resident User"}
              </div>
              <div className="text-xs opacity-70">
                {user?.role || "Resident"}
              </div>
            </div>
            <button onClick={onLogout} className="btn btn-ghost btn-sm">
              Logout
            </button>
          </div>

          <ul className="menu mt-4">
            <li>
              <a>Help & Support</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="navbar bg-base-100 border-b px-6">
          <div className="flex-1">
            <h2 className="font-bold text-lg">Resident Services</h2>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered input-sm hidden md:block"
            />
            <button className="btn btn-ghost btn-circle">🔔</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.fullName.split(" ")[0] || "Resident"}!
              </h1>
              <p className="opacity-70">
                You have{" "}
                <span className="text-primary font-bold">3 pending</span>
              </p>
            </div>
            <button className="btn btn-primary">View History</button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <h2 className="text-xl font-bold">Quick Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card bg-base-100 shadow hover:shadow-xl cursor-pointer">
                  <div className="card-body">
                    <h3 className="card-title">Request Clearance</h3>
                    <p>Barangay documents online.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">
                        Request
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 shadow hover:shadow-xl cursor-pointer">
                  <div className="card-body">
                    <h3 className="card-title text-error">Report Incident</h3>
                    <p>Report community issues.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-error btn-sm">Report</button>
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 shadow hover:shadow-xl cursor-pointer">
                  <div className="card-body">
                    <h3 className="card-title">Facility Booking</h3>
                    <p>Reserve barangay facilities.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">Book</button>
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 shadow hover:shadow-xl cursor-pointer">
                  <div className="card-body">
                    <h3 className="card-title">My Applications</h3>
                    <p>Track your requests.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-sm">Track</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-64 bg-base-300 rounded-xl flex items-end p-4">
                <p className="font-bold">Barangay Community Hub</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <div className="card bg-base-100 shadow">
                <div className="card-body space-y-3">
                  <div className="alert alert-success">Document Ready</div>
                  <div className="alert">Request Processing</div>
                  <div className="alert alert-warning">Action Required</div>
                </div>
              </div>
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h3 className="font-bold">Barangay Assembly</h3>
                  <p className="text-sm">
                    Saturday 2:00 PM - Multi-purpose hall
                  </p>
                  <button className="btn btn-sm mt-2">Set Reminder</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResidentDashboard;

"use client";

import AdminNavbar from "@/components/AdminNavbar";
import {
  CircleAlert,
  ClipboardClock,
  SquareArrowOutUpRight,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const DashboardAdminPage = () => {
  const [totalResidents, setTotalResidents] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [activeIncidents, setActiveIncidents] = useState(0);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchTotalResidents = async () => {
      try {
        const response = await fetch("/residents");
        const data = await response.json();
        setTotalResidents(data.total);
      } catch (error) {
        console.error("Failed to fetch total residents:", error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch("/certificate-request/pending");
        const data = await response.json();
        setPendingRequests(data.total ?? 0);
      } catch (error) {
        console.error("Failed to fetch pending requests:", error);
      }
    };

    const fetchActiveIncidents = async () => {
      try {
        const response = await fetch("/incident/active");
        const data = await response.json();
        setActiveIncidents(data.total ?? 0);
      } catch (error) {
        console.error("Failed to fetch active incidents:", error);
      }
    };

    const fetchRecentRequests = async () => {
      try {
        const response = await fetch("/certificate-request/recent");
        const data = await response.json();
        setRecentRequests(data.certificateRequests ?? []);
      } catch (error) {
        console.error("Failed to fetch recent requests:", error);
      }
    };

    const fetchRecentAnnouncements = async () => {
      try {
        const response = await fetch("/announcement");
        const data = await response.json();
        setRecentAnnouncements(data.announcements?.slice(0, 2) ?? []);
      } catch (error) {
        console.error("Failed to fetch recent announcements:", error);
      }
    };

    fetchTotalResidents();
    fetchPendingRequests();
    fetchActiveIncidents();
    fetchRecentRequests();
    fetchRecentAnnouncements();
  }, []);

  const formatStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "badge badge-warning";
      case "APPROVED":
        return "badge badge-success";
      case "READY_FOR_PICKUP":
        return "badge badge-info";
      default:
        return "badge badge-neutral";
    }
  };

  const formatCertificateType = (type: string) => {
    switch (type) {
      case "BARANGAY_CLEARANCE":
        return "Barangay Clearance";
      case "BARANGAY_INDIGENCY":
        return "Certificate of Indigency";
      case "BARANGAY_RESIDENCY":
        return "Residency Certificate";
      default:
        return type.replaceAll("_", " ");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar />
      <div className="space-y-8">
        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <span className="bg-blue-100 w-10 h-10 rounded-sm flex items-center justify-center">
                <Users size={20} color="blue" />
              </span>
              <p className="text-sm opacity-60">Total Residents</p>
              <h2 className="text-3xl font-bold">{totalResidents}</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <span className="bg-yellow-100 w-10 h-10 rounded-sm flex items-center justify-center">
                <ClipboardClock size={20} color="orange" />
              </span>
              <p className="text-sm opacity-60">Pending Requests</p>
              <h2 className="text-3xl font-bold">{pendingRequests}</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <span className="bg-red-100 w-10 h-10 rounded-sm flex items-center justify-center">
                <TriangleAlert size={20} color="red" />
              </span>
              <p className="text-sm opacity-60">Active Incidents</p>
              <h2 className="text-3xl font-bold">{activeIncidents}</h2>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Recent Document Requests</h2>
              <button className="btn btn-link text-primary btn-sm">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Document</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {recentRequests.length > 0 ? (
                    recentRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.residentName}</td>
                        <td>
                          {formatCertificateType(request.certificateType)}
                        </td>
                        <td>{formatDate(request.dateRequested)}</td>
                        <td>
                          <span className={formatStatusBadge(request.status)}>
                            {request.status.replaceAll("_", " ")}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-xs">
                            View Details <SquareArrowOutUpRight size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-sm opacity-70"
                      >
                        No recent document requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* ANNOUNCEMENTS */}
          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <div className="flex justify-between">
                <h3 className="font-bold">Recent Announcements</h3>
                <button className="btn btn-primary btn-sm">Post</button>
              </div>

              <div className="space-y-3 mt-4">
                {recentAnnouncements.length > 0 ? (
                  recentAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="bg-base-200 p-3 rounded-lg"
                    >
                      <p className="text-xs text-primary font-bold">
                        {announcement.category}
                      </p>
                      <h4 className="font-bold text-sm">
                        {announcement.title}
                      </h4>
                      <p className="text-xs opacity-60">
                        {announcement.authorName || "Unknown Author"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="bg-base-200 p-3 rounded-lg text-center text-sm opacity-70">
                    No recent announcements available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <h3 className="font-bold mb-4">Activity Feed</h3>

              <ul className="timeline timeline-vertical">
                <li>
                  <div className="timeline-start text-xs">Approved Request</div>
                  <div className="timeline-middle">🟢</div>
                  <div className="timeline-end text-xs opacity-60">
                    2 mins ago
                  </div>
                </li>

                <li>
                  <div className="timeline-start text-xs">New Resident</div>
                  <div className="timeline-middle">🟢</div>
                  <div className="timeline-end text-xs opacity-60">
                    15 mins ago
                  </div>
                </li>

                <li>
                  <div className="timeline-start text-xs">Incident Report</div>
                  <div className="timeline-middle">🟡</div>
                  <div className="timeline-end text-xs opacity-60">
                    45 mins ago
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardAdminPage;

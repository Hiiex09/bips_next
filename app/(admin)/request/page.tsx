"use client";

import { useState, useMemo } from "react";
import { Bell, Settings, Check, X, Filter } from "lucide-react";
import {
  useFetchRequests,
  useFetchRequestStats,
  useUpdateRequestStatus,
} from "@/features/certificate-request/actions/certificate-request.hooks";

const RequestPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    dateFrom: "",
    dateTo: "",
  });

  const limit = 5;

  const params = useMemo(() => {
    const baseParams: any = {
      page: currentPage,
      limit,
      search: search || undefined,
    };

    if (activeTab === "urgent") {
      baseParams.urgency = "urgent";
    } else if (activeTab !== "all") {
      baseParams.status = activeTab;
    }

    if (filters.type !== "all") baseParams.type = filters.type;
    if (filters.dateFrom) baseParams.dateFrom = filters.dateFrom;
    if (filters.dateTo) baseParams.dateTo = filters.dateTo;

    return baseParams;
  }, [currentPage, search, activeTab, filters]);

  const { data: requestsData, isLoading: requestsLoading } =
    useFetchRequests(params);
  const { data: statsData, isLoading: statsLoading } = useFetchRequestStats();
  const updateStatusMutation = useUpdateRequestStatus();

  const requests = requestsData?.requests || [];
  const pagination = requestsData?.pagination || { total: 0, totalPages: 0 };

  const handleStatusUpdate = (requestId: string, status: string) => {
    // Assuming processedById is available, for now use null
    updateStatusMutation.mutate({ id: requestId, status });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="badge badge-warning">Pending</span>;
      case "APPROVED":
        return <span className="badge badge-success">Approved</span>;
      case "READY_FOR_PICKUP":
        return <span className="badge badge-info">Ready for Pickup</span>;
      case "REJECTED":
        return <span className="badge badge-error">Rejected</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === "URGENT") {
      return <span className="badge badge-error badge-sm">Urgent</span>;
    }
    return <span className="badge badge-neutral badge-sm">Normal</span>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      BARANGAY_CLEARANCE: "badge-info",
      BARANGAY_INDIGENCY: "badge-secondary",
      BARANGAY_RESIDENCY: "badge-accent",
    };
    const displayName = type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      <span
        className={`badge ${colors[type as keyof typeof colors] || ""} badge-outline`}
      >
        {displayName}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const tabs = [
    { id: "all", label: "All", count: null },
    { id: "pending", label: "Pending", count: statsData?.totalPending || 0 },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "urgent", label: "Urgent", count: statsData?.urgentRequests || 0 },
    { id: "transactions", label: "Transactions" },
  ];

  return (
    <main className="flex-1 flex flex-col min-w-0">
      {/* HEADER */}
      <header className="h-16 bg-base-100 border-b flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>Admin</li>
            <li className="font-semibold text-base">Document Requests</li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-circle relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>

          <button className="btn btn-ghost btn-circle">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="p-8 space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat bg-base-100 border rounded-xl shadow-sm">
            <div className="stat-title">Total Pending</div>
            <div className="stat-value">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                statsData?.totalPending || 0
              )}
            </div>
          </div>

          <div className="stat bg-base-100 border rounded-xl shadow-sm">
            <div className="stat-title flex items-center gap-2">
              Urgent Requests
              <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
            </div>
            <div className="stat-value text-error">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                statsData?.urgentRequests || 0
              )}
            </div>
          </div>

          <div className="stat bg-base-100 border rounded-xl shadow-sm">
            <div className="stat-title">Completed (Today)</div>
            <div className="stat-value text-success">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                statsData?.completedToday || 0
              )}
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="card bg-base-100 border shadow-sm">
          {/* FILTER HEADER */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between gap-4">
            {/* TABS */}
            <div className="tabs tabs-boxed">
              {tabs.map((tab) => (
                <a
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                >
                  {tab.label}
                  {tab.count !== undefined && tab.count !== null && (
                    <span className="badge badge-sm ml-2 badge-neutral">
                      {tab.count}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search resident..."
                className="input input-bordered input-sm w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* FILTERS PANEL */}
          {showFilters && (
            <div className="p-6 border-b bg-base-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className="select select-bordered select-sm"
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                >
                  <option value="all">All Types</option>
                  <option value="barangay_clearance">Barangay Clearance</option>
                  <option value="barangay_indigency">Barangay Indigency</option>
                  <option value="barangay_residency">Barangay Residency</option>
                </select>

                <input
                  type="date"
                  className="input input-bordered input-sm"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                />

                <input
                  type="date"
                  className="input input-bordered input-sm"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Document</th>
                  <th>Date</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>{activeTab === "transactions" ? "Transactions" : "Actions"}</th>
                </tr>
              </thead>

              <tbody>
                {requestsLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      <div className="loading loading-spinner loading-lg"></div>
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No requests found
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => {
                    const { date, time } = formatDate(request.createdAt);
                    return (
                      <tr key={request.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content w-9 rounded-full">
                                <span>
                                  {request.resident.firstName[0]}
                                  {request.resident.lastName[0]}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold">
                                {request.resident.firstName}{" "}
                                {request.resident.lastName}
                              </div>
                              <div className="text-xs opacity-60">
                                {request.resident.address}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>{getTypeBadge(request.type)}</td>

                        <td>
                          <div className="text-sm">{date}</div>
                          <div className="text-xs opacity-60">{time}</div>
                        </td>

                        <td>
                          <div className="flex flex-col items-start gap-1">
                            {getUrgencyBadge(request.urgency)}
                            {request.purpose && (
                              <div className="text-xs mt-1 max-w-[200px]">
                                <span className="font-medium opacity-60">Purpose: </span>
                                <span className="opacity-80">{request.purpose}</span>
                              </div>
                            )}
                            {request.remarks && (
                              <div className="text-xs max-w-[200px]">
                                <span className="font-medium text-error opacity-80">Remarks: </span>
                                <span className="opacity-80">{request.remarks}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        <td>{getStatusBadge(request.status)}</td>

                        <td>
                          {activeTab === "transactions" ? (
                            request.processedByName ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                  {request.processedByName}
                                </span>
                                {(request.dateApproved || request.updatedAt) && (
                                  <span className="text-xs opacity-60">
                                    {formatDate(request.dateApproved || request.updatedAt).date}{" "}
                                    {formatDate(request.dateApproved || request.updatedAt).time}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs opacity-50 italic">System</span>
                            )
                          ) : request.status === "PENDING" ? (
                            <div className="flex gap-2">
                              <button
                                className="btn btn-success btn-xs"
                                onClick={() =>
                                  handleStatusUpdate(request.id, "APPROVED")
                                }
                                disabled={updateStatusMutation.isPending}
                              >
                                <Check size={14} />
                                Approve
                              </button>
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() =>
                                  handleStatusUpdate(request.id, "REJECTED")
                                }
                                disabled={updateStatusMutation.isPending}
                              >
                                <X size={14} />
                                Reject
                              </button>
                            </div>
                          ) : (
                            getStatusBadge(request.status)
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {pagination.totalPages > 1 && (
            <div className="p-6 border-t flex justify-between items-center">
              <p className="text-sm opacity-60">
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, pagination.total)} of{" "}
                {pagination.total} entries
              </p>

              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  «
                </button>
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={`join-item btn btn-sm ${page === currentPage ? "btn-active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RequestPage;

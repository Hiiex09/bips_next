"use client";

import { useState, useMemo } from "react";
import { Check, Pencil, Trash2, UserPlus } from "lucide-react";
import {
  useFetchUsers,
  useFetchUserStats,
  useUpdateUserStatus,
  useDeleteUser,
} from "@/features/users/actions/user.actions";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const params = useMemo(
    () => ({
      page: currentPage,
      limit,
      search: search || undefined,
      role: roleFilter,
      status: statusFilter,
    }),
    [currentPage, search, roleFilter, statusFilter],
  );

  const { data: usersData, isLoading: usersLoading } = useFetchUsers(params);
  const { data: statsData, isLoading: statsLoading } = useFetchUserStats();
  const updateStatusMutation = useUpdateUserStatus();
  const deleteUserMutation = useDeleteUser();

  const users = usersData?.users || [];
  const pagination = usersData?.pagination || { total: 0, totalPages: 0 };

  const handleStatusToggle = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    updateStatusMutation.mutate({ id: userId, status: newStatus });
  };

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <span className="badge badge-success">Active</span>;
      case "SUSPENDED":
        return <span className="badge badge-warning">Suspended</span>;
      case "DEACTIVATED":
        return <span className="badge badge-neutral">Inactive</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: "badge-primary",
      STAFF: "badge-secondary",
      RESIDENT: "",
    };
    return (
      <span
        className={`badge ${colors[role as keyof typeof colors] || ""} badge-outline`}
      >
        {role.charAt(0) + role.slice(1).toLowerCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex items-center gap-4">
          <button className="btn btn-ghost">Support</button>
          <button className="btn btn-primary">
            <UserPlus size={18} />
            Add New User
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTERS */}
        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="select select-bordered"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="resident">Resident</option>
          </select>

          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="deactivated">Inactive</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="card bg-base-100 shadow border">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Joined</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {usersLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <div className="loading loading-spinner loading-lg"></div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content w-10 rounded-lg">
                            <span>
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>{getRoleBadge(user.role)}</td>

                    <td>{getStatusBadge(user.status)}</td>

                    <td>{formatDate(user.createdAt)}</td>

                    <td className="text-center">
                      <div className="flex justify-center gap-2">
                        <button className="btn btn-ghost btn-xs" title="Edit">
                          <Pencil size={18} />
                        </button>
                        <button
                          className="btn btn-ghost btn-xs text-success"
                          title="Toggle Status"
                          onClick={() =>
                            handleStatusToggle(user.id, user.status)
                          }
                          disabled={updateStatusMutation.isPending}
                        >
                          <Check size={18} />
                        </button>
                        <button
                          className="btn btn-ghost btn-xs text-error"
                          title="Delete"
                          onClick={() => handleDelete(user.id)}
                          disabled={deleteUserMutation.isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t">
            <span className="text-sm opacity-60">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, pagination.total)} of{" "}
              {pagination.total} users
            </span>

            <div className="join">
              <button
                className="join-item btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
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
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs opacity-60">Total Users</p>
            <h2 className="text-2xl font-bold">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                statsData?.totalUsers || 0
              )}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs text-success">Active Now</p>
            <h2 className="text-2xl font-bold">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                statsData?.activeUsers || 0
              )}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs text-primary">New this month</p>
            <h2 className="text-2xl font-bold">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                `+${statsData?.newThisMonth || 0}`
              )}
            </h2>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs text-error">Pending Approval</p>
            <h2 className="text-2xl font-bold">
              {statsLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                statsData?.pendingUsers || 0
              )}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

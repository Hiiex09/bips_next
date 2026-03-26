const UserManagement = () => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex items-center gap-4">
          <button className="btn btn-ghost">Support</button>
          <button className="btn btn-primary">+ Add New User</button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full md:w-80"
        />

        {/* FILTERS */}
        <div className="flex gap-2 w-full md:w-auto">
          <select className="select select-bordered">
            <option>All Roles</option>
            <option>Official</option>
            <option>Staff</option>
            <option>Resident</option>
          </select>

          <select className="select select-bordered">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button className="btn btn-outline">Filter</button>
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
              {/* ROW */}
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-lg">
                        <img src="https://i.pravatar.cc/100?1" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Ricardo Dalisay</div>
                      <div className="text-xs opacity-50">
                        carding.d@email.com
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge badge-primary badge-outline">
                    Official
                  </span>
                </td>

                <td>
                  <span className="badge badge-success">Active</span>
                </td>

                <td>Jan 12, 2023</td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-ghost btn-xs">✏️</button>
                    <button className="btn btn-ghost btn-xs text-error">
                      🚫
                    </button>
                  </div>
                </td>
              </tr>

              {/* ROW */}
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-lg">
                        <img src="https://i.pravatar.cc/100?2" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Anna Magkaisa</div>
                      <div className="text-xs opacity-50">anna.m@email.com</div>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge badge-secondary badge-outline">
                    Staff
                  </span>
                </td>

                <td>
                  <span className="badge badge-success">Active</span>
                </td>

                <td>Feb 05, 2023</td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-ghost btn-xs">✏️</button>
                    <button className="btn btn-ghost btn-xs text-error">
                      🚫
                    </button>
                  </div>
                </td>
              </tr>

              {/* ROW */}
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content w-10 rounded-lg">
                        <span>JD</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Juan Dela Cruz</div>
                      <div className="text-xs opacity-50">juan@email.com</div>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge">Resident</span>
                </td>

                <td>
                  <span className="badge badge-neutral">Inactive</span>
                </td>

                <td>Mar 15, 2023</td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-ghost btn-xs">✏️</button>
                    <button className="btn btn-ghost btn-xs text-success">
                      ✔️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 border-t">
          <span className="text-sm opacity-60">Showing 1-5 of 124 users</span>

          <div className="join">
            <button className="join-item btn btn-sm">Prev</button>
            <button className="join-item btn btn-sm btn-active">1</button>
            <button className="join-item btn btn-sm">2</button>
            <button className="join-item btn btn-sm">3</button>
            <button className="join-item btn btn-sm">Next</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs opacity-60">Total Users</p>
            <h2 className="text-2xl font-bold">1,240</h2>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs text-success">Active Now</p>
            <h2 className="text-2xl font-bold">45</h2>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs text-primary">New this month</p>
            <h2 className="text-2xl font-bold">+24</h2>
          </div>
        </div>

        <div className="card bg-base-100 border shadow">
          <div className="card-body">
            <p className="text-xs text-error">Pending Approval</p>
            <h2 className="text-2xl font-bold">8</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

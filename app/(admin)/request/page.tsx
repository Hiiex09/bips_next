const RequestPage = () => {
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
            <span className="material-icons">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>

          <button className="btn btn-ghost btn-circle">
            <span className="material-icons">settings</span>
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="p-8 space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat bg-base-100 border rounded-xl shadow-sm">
            <div className="stat-title">Total Pending</div>
            <div className="stat-value">24</div>
          </div>

          <div className="stat bg-base-100 border rounded-xl shadow-sm">
            <div className="stat-title flex items-center gap-2">
              Urgent Requests
              <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
            </div>
            <div className="stat-value text-error">08</div>
          </div>

          <div className="stat bg-base-100 border rounded-xl shadow-sm">
            <div className="stat-title">Completed (Today)</div>
            <div className="stat-value text-success">12</div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="card bg-base-100 border shadow-sm">
          {/* FILTER HEADER */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between gap-4">
            {/* TABS */}
            <div className="tabs tabs-boxed">
              <a className="tab tab-active">Pending</a>
              <a className="tab">Approved</a>
              <a className="tab">Rejected</a>
              <a className="tab">
                Urgent
                <span className="badge badge-error badge-sm ml-2">8</span>
              </a>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search resident..."
                className="input input-bordered input-sm w-64"
              />

              <button className="btn btn-outline btn-sm">
                <span className="material-icons text-sm">filter_list</span>
                Filters
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Document</th>
                  <th>Date</th>
                  <th>Urgency</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {/* ROW */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-9 rounded-full">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1HM5jqczr7WM8A3lnl_PSS5H1oSfF_3ZIzlIZtVlZ1x0KUaze-zFSJOXAovkvu8P5UvZxSKAT7BhMQAAWBZCb7v8OmEouLTyWrqjLINLDtScpHP68jSDBncB6LzowKbrMiH95gki-ascfEZpWi9EEBupOUGKdxdQ1hjY1p46BgO85N03BzonnuNJckMrI1SadW8O_r4qjoKZxkNqGrYs4-F4Vkxu3qKvYqIyYIC3iPw9uNhj5fVhm5NGCgUZXXx3-Jvp7W4jJc14" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">Ricardo Dalisay</div>
                        <div className="text-xs opacity-60">Purok 4</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-info badge-outline">
                      Barangay Clearance
                    </span>
                  </td>

                  <td>
                    <div className="text-sm">Oct 24, 2023</div>
                    <div className="text-xs opacity-60">09:45 AM</div>
                  </td>

                  <td>
                    <span className="badge badge-error">Urgent</span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-primary btn-xs">
                        Approve
                      </button>
                      <button className="btn btn-ghost btn-xs text-error">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ROW 2 */}
                <tr>
                  <td>
                    <div className="font-semibold">Liza Soberano</div>
                  </td>
                  <td>
                    <span className="badge badge-secondary">
                      Certificate of Indigency
                    </span>
                  </td>
                  <td>Oct 24, 2023</td>
                  <td>
                    <span className="badge">Normal</span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-xs">Approve</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-6 border-t flex justify-between items-center">
            <p className="text-sm opacity-60">Showing 1 to 4 of 24 entries</p>

            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="confirm_modal" className="modal">
        <div className="modal-box text-center space-y-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <span className="material-icons">help_outline</span>
          </div>

          <h3 className="font-bold text-lg">Approve Request?</h3>

          <p className="text-sm opacity-70">
            This will generate the document and notify the resident.
          </p>

          <div className="modal-action justify-center">
            <button className="btn">Cancel</button>
            <button className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default RequestPage;

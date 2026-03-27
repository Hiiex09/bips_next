const IncidentPage = () => {
  return (
    <main className="max-w-8xl mx-auto p-6">
      {/* HEADER + ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Incident Reports Management
            </h2>
            <p className="text-slate-500 text-sm">
              Review and resolve community issues submitted by residents.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm normal-case">
              <span className="material-icons text-sm">add</span>
              New Report
            </button>

            <button className="btn btn-outline btn-sm normal-case">
              <span className="material-icons text-sm">file_download</span>
              Export
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="stat bg-base-100 border rounded-xl shadow-sm">
          <div className="stat-title">Total Reports</div>
          <div className="stat-value">1,284</div>
          <div className="stat-desc text-success">+12% this month</div>
        </div>

        <div className="stat bg-base-100 border rounded-xl shadow-sm">
          <div className="stat-title">Open Cases</div>
          <div className="stat-value">42</div>
          <div className="stat-desc">Requires attention</div>
        </div>

        <div className="stat bg-base-100 border rounded-xl shadow-sm">
          <div className="stat-title">Urgent Priority</div>
          <div className="stat-value text-error">7</div>
          <div className="stat-desc text-error">Action required now</div>
        </div>

        <div className="stat bg-base-100 border rounded-xl shadow-sm">
          <div className="stat-title">Resolved</div>
          <div className="stat-value text-success">1,235</div>
          <div className="stat-desc">96.2% success rate</div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-base-100 p-4 rounded-xl border mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-75 relative">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search by ID, reporter, or keyword..."
            className="input input-bordered w-full pl-10"
          />
        </div>

        <select className="select select-bordered">
          <option>All Categories</option>
          <option>Noise Complaint</option>
          <option>Waste Management</option>
          <option>Infrastructure</option>
          <option>Security</option>
        </select>

        <select className="select select-bordered">
          <option>Priority: All</option>
          <option>Emergency</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select className="select select-bordered">
          <option>Status: All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* ACCORDION LIST */}
      <div className="space-y-3">
        {/* ITEM 1 */}
        <div className="collapse collapse-arrow bg-base-100 border rounded-xl">
          <input type="checkbox" />

          <div className="collapse-title flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="flex gap-2 mb-1 flex-wrap">
                <span className="text-xs text-gray-400 font-bold">
                  #INC-2023-442
                </span>
                <span className="badge badge-error badge-sm">Emergency</span>
                <span className="badge badge-primary badge-outline badge-sm">
                  Infrastructure
                </span>
              </div>

              <h3 className="font-bold">
                Main Water Pipe Burst - San Jose Ave
              </h3>
            </div>

            <div className="text-sm text-gray-500">
              <div>15 mins ago</div>
              <div className="text-xs">Juan Dela Cruz</div>
            </div>

            <span className="badge badge-warning">Open</span>
          </div>

          <div className="collapse-content">
            <p className="text-sm text-gray-500 mb-4">
              Large volume of water gushing from the main line...
            </p>

            <div className="flex gap-2 flex-wrap">
              <button className="btn btn-primary btn-sm">Assign Team</button>
              <button className="btn btn-outline btn-sm">Print</button>
            </div>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="collapse collapse-arrow bg-base-100 border rounded-xl">
          <input type="checkbox" />

          <div className="collapse-title flex justify-between items-center">
            <div>
              <h3 className="font-bold">Illegal Dumping - Greenfield Park</h3>
              <p className="text-xs text-gray-400">
                Maria Santos • 2 hours ago
              </p>
            </div>

            <span className="badge badge-info">In Progress</span>
          </div>

          <div className="collapse-content">
            <p className="text-sm text-gray-500">
              Expanded details for Waste Management incident...
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="collapse collapse-arrow bg-base-100 border rounded-xl opacity-70">
          <input type="checkbox" />

          <div className="collapse-title flex justify-between items-center">
            <div>
              <h3 className="font-bold">Loud Music - Magnolia Condos</h3>
              <p className="text-xs text-success">Resolved 1 hour ago</p>
            </div>

            <span className="badge badge-success">Resolved</span>
          </div>

          <div className="collapse-content">
            <p className="text-sm text-gray-500">
              Case closed. Barangay tanods visited the site...
            </p>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-8 flex justify-between items-center text-sm">
        <span className="text-gray-500">Showing 1 to 10 of 42 entries</span>

        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">»</button>
        </div>
      </div>

      {/* FLOATING BUTTON (MOBILE) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="btn btn-primary btn-circle shadow-xl">
          <span className="material-icons">menu</span>
        </button>
      </div>
    </main>
  );
};

export default IncidentPage;

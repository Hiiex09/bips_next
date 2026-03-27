const AnnouncementPage = () => {
  return (
    <>
      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <header className="bg-base-100 border-b px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold">Announcements Management</h1>
            <p className="text-sm opacity-60">
              Create, edit, and publish news for the community
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle relative">
              <span className="material-icons">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <label htmlFor="create-modal" className="btn btn-primary btn-sm">
              <span className="material-icons text-sm">add</span>
              Create Announcement
            </label>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat bg-base-100 border rounded-xl">
              <div className="stat-title">Published</div>
              <div className="stat-value">24</div>
            </div>

            <div className="stat bg-base-100 border rounded-xl">
              <div className="stat-title">Drafts</div>
              <div className="stat-value">8</div>
            </div>

            <div className="stat bg-base-100 border rounded-xl">
              <div className="stat-title">Archived</div>
              <div className="stat-value">156</div>
            </div>

            <div className="stat bg-base-100 border rounded-xl">
              <div className="stat-title">Total Views</div>
              <div className="stat-value">12.5k</div>
            </div>
          </div>

          {/* FEATURED */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              ⭐ Featured Announcements
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card image-full h-64">
                <figure>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0VBYwrx7NekWZe5md1dXcXQuaN7QiQG_wnDboQlH7qtg3aHqcN1KLY8yqWFwNr9sBu0rdKP5NxEACdL50PZKPWJxCMg2kuodLsROVCGc5Ahg-WKFIXhfgdc4eZoF7psP8tChnI_mUA7OZiDSqBTHYV0q-jloOZKlJFHwpu4oMQKZt1or02WGgQlwrM6zeajTBy1F5pPD2o_p1F5VcEqnXiI1p-Ih0Pkd3jlpaTbHaUWZMtwyM-uY2fbqIo_7UWR7J5gBZ9fB_LUk" />
                </figure>
                <div className="card-body justify-end">
                  <div className="badge badge-primary w-fit">Pinned</div>
                  <h3 className="card-title">
                    Community Assembly: Health Updates
                  </h3>
                </div>
              </div>

              <div className="card image-full h-64">
                <figure>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvYg5LFVDkIacx4PVCGb9SA3qQn33ibxpw5fFeDDDNpfFNy_muwP-WbjELcO_LgMt9yE1m7CFz-w7uL0ORyu72NAuH2LoZwaIsAYPE5wGkEh1JKz2__xUOcYxe08U-e4bd7GVfvaqnWVKGjZPRnXgOMC1_gBFcpLDDcPM6xwbD9gL0wMc_Qdm8DcTtjefqawyDuEPMAIkR1DnEr4YnD7VvDNTAgDKOPiASFaG_9iyPapamfo06hwLLXzsLqHJ6YF8CXGFDuWTMDQ" />
                </figure>
                <div className="card-body justify-end">
                  <div className="badge badge-error w-fit">Urgent</div>
                  <h3 className="card-title">Voter Registration Deadline</h3>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="card bg-base-100 border shadow-sm">
            {/* FILTER */}
            <div className="p-6 border-b flex justify-between gap-4 flex-wrap">
              <h2 className="font-semibold">Announcement Inventory</h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered input-sm"
                />

                <select className="select select-bordered select-sm">
                  <option>All Categories</option>
                  <option>Health</option>
                  <option>Events</option>
                </select>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Last Modified</th>
                    <th>Stats</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <div className="font-semibold">Free Medical Mission</div>
                      <div className="text-xs opacity-60">Health Advisory</div>
                    </td>

                    <td>
                      <span className="badge badge-success">Published</span>
                    </td>

                    <td>
                      <div className="text-sm">Oct 24, 2023</div>
                      <div className="text-xs opacity-60">by Maria</div>
                    </td>

                    <td className="text-xs">👁 1.2k • 🔗 84</td>

                    <td>
                      <button className="btn btn-ghost btn-xs">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="p-6 border-t flex justify-between">
              <p className="text-sm opacity-60">Showing 1 to 10 of 188</p>

              <div className="join">
                <button className="join-item btn btn-sm">Prev</button>
                <button className="join-item btn btn-sm btn-active">1</button>
                <button className="join-item btn btn-sm">2</button>
                <button className="join-item btn btn-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      <input type="checkbox" id="create-modal" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">New Announcement</h3>

          <input
            className="input input-bordered w-full mb-4"
            placeholder="Title"
          />

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Content..."
          ></textarea>

          <div className="modal-action">
            <label htmlFor="create-modal" className="btn">
              Cancel
            </label>
            <button className="btn btn-primary">Publish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementPage;

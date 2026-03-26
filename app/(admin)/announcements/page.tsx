const AnnouncementPage = () => {
  return (
    <>
      {/* HEADER */}
      <div className="navbar bg-base-100 border-b px-6 sticky top-0 z-20">
        <div className="flex-1">
          <div>
            <h1 className="text-xl font-bold">Announcements Management</h1>
            <p className="text-sm opacity-60">Create, edit, and publish news</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-ghost btn-circle">🔔</button>

          {/* MODAL TRIGGER */}
          <label htmlFor="create-modal" className="btn btn-primary">
            + Create
          </label>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6 overflow-y-auto">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Published</div>
            <div className="stat-value">24</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Drafts</div>
            <div className="stat-value">8</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Archived</div>
            <div className="stat-value">156</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Views</div>
            <div className="stat-value">12.5k</div>
          </div>
        </div>

        {/* FEATURED */}
        <div>
          <h2 className="font-bold mb-3">⭐ Featured</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card image-full">
              <figure>
                <img src="https://via.placeholder.com/600x300" />
              </figure>
              <div className="card-body justify-end">
                <span className="badge badge-primary">Pinned</span>
                <h2 className="card-title">Community Assembly</h2>
                <p className="text-sm">Health and safety updates...</p>
              </div>
            </div>

            <div className="card image-full">
              <figure>
                <img src="https://via.placeholder.com/600x300" />
              </figure>
              <div className="card-body justify-end">
                <span className="badge badge-error">Urgent</span>
                <h2 className="card-title">Voter Registration Deadline</h2>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card bg-base-100 shadow">
          <div className="p-4 border-b flex justify-between flex-wrap gap-2">
            <h2 className="font-bold">Inventory</h2>

            <div className="flex gap-2">
              <input
                className="input input-bordered input-sm"
                placeholder="Search..."
              />

              <select className="select select-bordered select-sm">
                <option>All</option>
                <option>Health</option>
                <option>Events</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Stats</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div className="font-bold">Medical Mission</div>
                    <div className="text-xs opacity-50">Health</div>
                  </td>

                  <td>
                    <span className="badge badge-success">Published</span>
                  </td>

                  <td>Oct 24</td>

                  <td>👁 1.2k</td>

                  <td className="flex gap-2">
                    <button className="btn btn-xs">Edit</button>
                    <button className="btn btn-xs btn-error">Archive</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 border-t flex justify-between">
            <span className="text-sm opacity-60">Showing 1–10</span>

            <div className="join">
              <button className="join-item btn btn-sm">Prev</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <input type="checkbox" id="create-modal" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">New Announcement</h3>

          <div className="space-y-4">
            <input
              className="input input-bordered w-full"
              placeholder="Title"
            />

            <select className="select select-bordered w-full">
              <option>Category</option>
              <option>Health</option>
              <option>Event</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Content..."
            />
          </div>

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

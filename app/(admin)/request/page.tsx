const RequestPage = () => {
  return (
    <>
      <div className="navbar bg-base-100 border-b px-6">
        <h1 className="text-lg font-bold">Document Requests</h1>
      </div>
      <div className="p-6">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Pending</div>
            <div className="stat-value">24</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Urgent</div>
            <div className="stat-value text-error">8</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">12</div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Resident</th>
                <th>Document</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ricardo Dalisay</td>
                <td>Barangay Clearance</td>
                <td>
                  <span className="badge badge-error">Urgent</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      ;
    </>
  );
};

export default RequestPage;

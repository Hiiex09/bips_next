import AdminNavbar from "@/components/AdminNavbar";
import {
  CircleAlert,
  ClipboardClock,
  SquareArrowOutUpRight,
  TriangleAlert,
  Users,
} from "lucide-react";

const DashboardAdminPage = () => {
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
              <h2 className="text-3xl font-bold">12,450</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <span className="bg-yellow-100 w-10 h-10 rounded-sm flex items-center justify-center">
                <ClipboardClock size={20} color="orange" />
              </span>
              <p className="text-sm opacity-60">Pending Requests</p>
              <h2 className="text-3xl font-bold">42</h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <span className="bg-red-100 w-10 h-10 rounded-sm flex items-center justify-center">
                <TriangleAlert size={20} color="red" />
              </span>
              <p className="text-sm opacity-60">Active Incidents</p>
              <h2 className="text-3xl font-bold">08</h2>
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
                  <tr>
                    <td>Juan Dela Cruz</td>
                    <td>Barangay Clearance</td>
                    <td>Oct 24, 2023</td>
                    <td>
                      <span className="badge badge-warning">Pending</span>
                    </td>
                    <td className="space-x-2">
                      <button className="btn btn-primary btn-xs">
                        Approve
                      </button>
                      <button className="btn btn-outline btn-xs">Reject</button>
                    </td>
                  </tr>

                  <tr>
                    <td>Maria Santos</td>
                    <td>Certificate of Indigency</td>
                    <td>Oct 23, 2023</td>
                    <td>
                      <span className="badge badge-warning">Pending</span>
                    </td>
                    <td className="space-x-2">
                      <button className="btn btn-primary btn-xs">
                        Approve
                      </button>
                      <button className="btn btn-outline btn-xs">Reject</button>
                    </td>
                  </tr>

                  <tr>
                    <td>Jose Rizal</td>
                    <td>Business Permit</td>
                    <td>Oct 23, 2023</td>
                    <td>
                      <span className="badge badge-success">Approved</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs">
                        View Details <SquareArrowOutUpRight size={15} />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>Elena Adarna</td>
                    <td>Residency Certificate</td>
                    <td>Oct 22, 2023</td>
                    <td>
                      <span className="badge badge-error">Rejected</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs">
                        View Reason <CircleAlert size={15} />
                      </button>
                    </td>
                  </tr>
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
                <div className="bg-base-200 p-3 rounded-lg">
                  <p className="text-xs text-primary font-bold">HEALTH</p>
                  <h4 className="font-bold text-sm">Vaccination Drive</h4>
                  <p className="text-xs opacity-60">Oct 30, Barangay Hall</p>
                </div>

                <div className="bg-base-200 p-3 rounded-lg">
                  <p className="text-xs text-primary font-bold">COMMUNITY</p>
                  <h4 className="font-bold text-sm">Clean-up Drive</h4>
                  <p className="text-xs opacity-60">Zone 4 residents</p>
                </div>
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

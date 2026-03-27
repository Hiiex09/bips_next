import { Bell, Calendar } from "lucide-react";

const AdminNavbar = () => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="h-16 flex items-center justify-between  bg-base-100">
      <h2 className="text-xl font-bold">Official Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Search"
        className="input flex-1 mx-6 h-8"
      />
      <div className="flex items-center gap-3">
        <span className="btn btn-ghost btn-circle">
          <Bell />
        </span>

        <span className="inline-flex gap-2">
          <Calendar /> {formattedDate}
        </span>
      </div>
    </header>
  );
};

export default AdminNavbar;

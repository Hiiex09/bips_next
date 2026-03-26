const AdminNavbar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-base-300 bg-base-100">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-circle">🔔</button>

        <button className="btn btn-ghost">📅 Oct 27, 2023</button>
      </div>
    </header>
  );
};

export default AdminNavbar;

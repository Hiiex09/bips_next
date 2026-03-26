import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-72 border-r border-base-300 bg-base-100 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-content p-2 rounded-lg">
            🏛️
          </div>
          <div>
            <h1 className="font-bold">Barangay Portal</h1>
            <p className="text-xs opacity-60">Admin Access</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="menu">
          <li>
            <Link className="active" href={"/dashboard"}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/users"}>User Management</Link>
          </li>
          <li>
            <Link href={"/request"}>Document Requests</Link>
          </li>
          <li>
            <Link href={"/incident"}>Incident Reports</Link>
          </li>
          <li>
            <Link href={"/announcements"}>Announcements</Link>
          </li>
          <div className="divider"></div>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Help Center</a>
          </li>
        </ul>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 bg-base-200 p-3 rounded-xl">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/100" />
          </div>
        </div>
        <div>
          <p className="font-bold text-sm">Capt. Jose Reyes</p>
          <p className="text-xs opacity-60">Chairman</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

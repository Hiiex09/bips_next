"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

const Sidebar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userColor, setUserColor] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/auth/checkAuth");
        const data = await res.json();

        if (data.authenticated) {
          setUser(data.user);
          // Generate a consistent color for this user
          const colors = [
            "bg-primary",
            "bg-secondary",
            "bg-accent",
            "bg-info",
            "bg-success",
            "bg-warning",
            "bg-error",
            "bg-primary-container",
            "bg-secondary-container",
            "bg-tertiary-container",
          ];
          // Use user ID to generate consistent color (not random)
          const colorIndex = data.user.id % colors.length;
          setUserColor(colors[colorIndex]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Generate initials from full name
  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    const firstName = names[0] || "";
    const lastName = names[names.length - 1] || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get role display name
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrator";
      case "STAFF":
        return "Staff";
      case "RESIDENT":
        return "Resident";
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <aside className="w-72 border-r border-base-300 bg-base-100 flex flex-col justify-between p-6">
        <div className="animate-pulse">
          <div className="h-12 bg-base-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-8 bg-base-200 rounded"></div>
            <div className="h-8 bg-base-200 rounded"></div>
            <div className="h-8 bg-base-200 rounded"></div>
          </div>
        </div>
        <div className="h-16 bg-base-200 rounded"></div>
      </aside>
    );
  }

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

      {/* Profile and Logout */}
      <div className="space-y-3">
        {/* Profile */}
        <div className="flex items-center bg-base-200 p-3 rounded-xl">
          {/* Avatar */}
          <div className={`avatar ${user ? "" : "placeholder"}`}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${user ? userColor : "bg-neutral"}`}
            >
              {user ? (
                <span className="text-white font-bold text-lg">
                  {getInitials(user.fullName)}
                </span>
              ) : (
                <span className="text-neutral-content">?</span>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="text-left ml-3">
            <p className="font-bold text-sm text-base-content">
              {user ? user.fullName : "Loading..."}
            </p>
            <p className="text-xs opacity-60 text-base-content">
              {user ? getRoleDisplay(user.role) : ""}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error w-full flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

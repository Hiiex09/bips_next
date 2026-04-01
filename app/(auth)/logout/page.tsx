"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Failed to logout:", error);
      } finally {
        router.push("/login");
        router.refresh(); // Refresh the router cache so navbar/states recognize logout
      }
    };

    logout();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 p-6">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body items-center text-center space-y-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <h2 className="text-xl font-bold">Logging out...</h2>
          <p className="text-sm text-gray-500">
            Please wait while we securely log you out.
          </p>
        </div>
      </div>
    </main>
  );
}

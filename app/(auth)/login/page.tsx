"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to login");
      }

      // Redirect based on role
      if (data.user?.role === "ADMIN" || data.user?.role === "STAFF") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-5/12 bg-primary text-white relative items-center justify-center p-20">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-black leading-tight">
            Digitalizing Barangay Services for a Better Community.
          </h1>

          <p className="text-white/80">
            Access permits, announcements, and connect with officials from home.
          </p>

          <div className="space-y-3">
            <p>✔ Official Government Records Access</p>
            <p>✔ Fast Document Processing</p>
            <p>✔ Secure Identity Verification</p>
          </div>

          <div className="mt-6 p-3 bg-white/10 rounded-lg text-sm">
            🔒 End-to-End Encrypted & Secure Database
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6 bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Tabs */}
            <div className="tabs tabs-boxed mb-4">
              <Link href={"/login"} className="tab tab-active">
                Login
              </Link>
              <Link href="/signup" className="tab">
                Register
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold">Secure Resident Login</h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to access the portal
            </p>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mt-4 p-3 text-sm flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4 mt-4" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan.delacruz@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input input-bordered w-full pr-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Login to Account"}
              </button>

              {/* Footer */}
              <div className="text-xs text-center text-gray-500 mt-4">
                By logging in, you agree to Terms & Privacy Policy.
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-5 text-xs text-gray-500">
          ✔ Official Barangay Portal • support@barangay.gov.ph
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

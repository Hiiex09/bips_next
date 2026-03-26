"use client";
import Link from "next/link";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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

            {/* Form */}
            <form className="space-y-4 mt-4">
              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text">Email or Mobile</span>
                </label>
                <input
                  type="text"
                  placeholder="juan.delacruz@example.com"
                  className="input input-bordered w-full"
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
                    placeholder="••••••••"
                    className="input input-bordered w-full pr-10"
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

              {/* Remember
              <div className="form-control">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div> */}

              {/* Button */}
              <button className="btn btn-primary w-full">
                Login to Account
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

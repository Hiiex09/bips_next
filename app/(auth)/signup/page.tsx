"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          mobile, 
          password, 
          address 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to register");
      }

      // The API automatically sets the auth cookies. Route to home directory.
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white items-center justify-center relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size[40px_40px]" />

        <div className="relative z-10 max-w-xl text-center px-10 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-4xl">🏛️</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold">Barangay Information Portal</h1>

          <p className="text-white/80">
            Empowering communities through digital governance. Access services,
            updates, and certifications anytime.
          </p>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-white/10 rounded-xl">
              <p className="font-semibold">Secure Access</p>
              <p className="text-sm text-white/70">
                Verified resident profiles ensure security.
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-xl">
              <p className="font-semibold">Fast Processing</p>
              <p className="text-sm text-white/70">
                Request documents in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex flex-1 items-center justify-center bg-base-200 p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold">Create Resident Account</h2>
              <p className="text-sm text-gray-500">
                Join your local community digital network
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error p-3 text-sm flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSignup}>
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Email + Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="tel"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Address */}
              <textarea
                placeholder="Home Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="textarea textarea-bordered w-full resize-none h-20"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-10"
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* File Upload (ID) */}
              {/* <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setFile(e.target.files?.[0])}
              /> */}

              {/* Terms */}
              <label className="flex items-start gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1"
                  required
                />
                <span>
                  I agree to <span className="text-primary">Terms</span> and{" "}
                  <span className="text-primary">Privacy Policy</span>
                </span>
              </label>

              {/* Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Complete Registration"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm border-t pt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold">
                Login here
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-4 text-xs text-gray-400">
          © 2024 Barangay Information Portal
        </div>
      </div>
    </main>
  );
}

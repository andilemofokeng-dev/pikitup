"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Recycle, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const DEMO_ACCOUNTS = [
  { label: "Call Centre Agent", email: "agent@pikitup.co.za",  password: "staff1234" },
  { label: "Depot Manager",     email: "depot@pikitup.co.za",  password: "staff1234" },
  { label: "Super Admin",       email: "admin@pikitup.co.za",  password: "admin1234" },
];

export default function StaffLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/staff-portal/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(acc: { email: string; password: string }) {
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-gradient-to-br from-green-900 via-green-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Recycle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="font-black text-white text-xl">Pikitup</div>
              <div className="text-green-400 text-xs font-medium">Staff Portal</div>
            </div>
          </div>

          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Operations<br />
            <span className="text-green-400">Command</span><br />
            Centre
          </h1>
          <p className="text-green-200/70 text-lg leading-relaxed max-w-sm">
            Manage service requests, assign field teams, track depots, and monitor
            citywide waste operations — all in one place.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { value: "1,247", label: "Cases this month" },
            { value: "87%",   label: "Resolution rate" },
            { value: "4",     label: "Active depots" },
            { value: "43",    label: "Resolved today" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-xs text-green-300/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-green-900 rounded-xl flex items-center justify-center">
              <Recycle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="font-black text-white">Pikitup</div>
              <div className="text-xs text-gray-400">Staff Portal</div>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">Staff Sign In</h2>
          <p className="text-gray-400 mb-8">Access your operational dashboard</p>

          {/* Demo accounts */}
          <div className="mb-8">
            <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">Demo accounts</p>
            <div className="flex flex-wrap gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-all"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-900/30 border border-red-700/40 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@pikitup.co.za"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPw ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl pl-10 pr-12 py-3 outline-none transition-all"
                />
                <button
                  type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-900/30"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-8">
            Pikitup Johannesburg — Restricted Access
          </p>
        </motion.div>
      </div>
    </div>
  );
}

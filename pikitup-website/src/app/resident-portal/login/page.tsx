"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, AlertCircle, Home, Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function ResidentLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail]       = useState("resident@demo.com");
  const [password, setPassword] = useState("demo1234");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/resident-portal/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071a09 0%, #0D3B14 60%, #1B5E20 100%)" }}>
        <div className="absolute inset-0 hero-dot-pattern opacity-15" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(76,175,80,0.18) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 right-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(249,168,37,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10">
          <div className="mb-12">
            <div className="bg-white rounded-2xl px-6 py-3 inline-flex shadow-xl shadow-black/30">
              <Image src="/pikitup-logo.png" alt="Pikitup" width={160} height={56} className="h-12 w-auto object-contain" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-5">
            Resident<br /><span className="text-green-400">Self-Service</span><br />Portal
          </h1>
          <p className="text-green-200/70 text-lg leading-relaxed max-w-sm">
            Track your waste collection schedule, report service issues, and follow up on your cases — all in one place.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { icon: Home,     label: "Collection schedule", value: "Personalised" },
            { icon: Bell,     label: "SMS reminders",       value: "Stay updated" },
            { icon: Calendar, label: "Case tracking",       value: "Real-time" },
          ].map((s) => {
            const SIcon = s.icon;
            return (
              <div key={s.label} className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                <SIcon className="w-5 h-5 text-green-400 mb-2" />
                <div className="text-sm font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-green-300/60 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="mb-10 lg:hidden">
            <div className="bg-white rounded-2xl px-5 py-2.5 inline-flex shadow-lg">
              <Image src="/pikitup-logo.png" alt="Pikitup" width={120} height={44} className="h-9 w-auto object-contain" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-1">Resident Sign In</h2>
          <p className="text-gray-400 mb-8">Access your personal Pikitup dashboard</p>

          <div className="mb-6 p-4 bg-green-900/20 border border-green-800/30 rounded-xl">
            <p className="text-xs text-green-400 font-semibold mb-1">Demo account</p>
            <p className="text-xs text-gray-400">Email: <span className="text-white">resident@demo.com</span> · Password: <span className="text-white">demo1234</span></p>
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
                  placeholder="you@example.com"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <button type="button" className="text-xs text-green-400 hover:text-green-300 transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPw ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl pl-10 pr-12 py-3 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-900/30"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/resident-portal/register" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Register here
            </Link>
          </p>
          <p className="text-center text-xs text-gray-600 mt-4">
            <Link href="/" className="hover:text-gray-400 transition-colors">← Back to Pikitup website</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

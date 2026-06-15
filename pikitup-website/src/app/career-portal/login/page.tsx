"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Briefcase, Mail, Lock, Eye, EyeOff, AlertCircle, UserCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

const DEMO_ACCOUNTS = [
  { label: "HR Officer",  email: "hr@pikitup.co.za",    password: "staff1234",  icon: Users },
  { label: "Applicant",   email: "applicant@demo.com",  password: "demo1234",   icon: UserCircle },
];

export default function CareerLoginPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/career-portal/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between p-12 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-black text-white text-xl">Pikitup</div>
              <div className="text-emerald-400 text-xs font-medium">Career Portal</div>
            </div>
          </div>

          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Build Your<br />
            <span className="text-emerald-400">Career</span><br />
            With Us
          </h1>
          <p className="text-emerald-200/70 text-lg leading-relaxed max-w-sm">
            Join Johannesburg's most impactful public service organisation. Browse current
            opportunities and track your applications in one place.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {[
            { value: "5", label: "Open positions" },
            { value: "72+", label: "Applications this month" },
            { value: "4", label: "Departments hiring" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 bg-white/5 rounded-2xl px-5 py-3 border border-white/10">
              <div className="text-3xl font-black text-white w-16">{s.value}</div>
              <div className="text-sm text-emerald-300/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-emerald-900 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-black text-white">Pikitup Career Portal</div>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">Sign In</h2>
          <p className="text-slate-400 mb-8">Access your career dashboard</p>

          {/* Demo accounts */}
          <div className="mb-8">
            <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Quick demo access</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button key={acc.email} type="button"
                    onClick={() => { setEmail(acc.email); setPassword(acc.password); setError(""); }}
                    className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-700 hover:border-slate-500 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    {acc.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-900/30 border border-red-700/40 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-white placeholder-slate-600 rounded-xl pl-10 pr-12 py-3 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/30"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              New applicant?{" "}
              <button type="button" onClick={() => router.push("/career-portal/register")} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Create account
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

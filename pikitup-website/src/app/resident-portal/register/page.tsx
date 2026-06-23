"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Eye, EyeOff, User, Phone, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const REGIONS = [
  "Region A — Johannesburg North",
  "Region B — Johannesburg East",
  "Region C — Johannesburg South",
  "Region D — Soweto",
  "Region E — Midrand",
  "Region F — Johannesburg West",
  "Region G — Orange Farm",
];

export default function ResidentRegisterPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", surname: "", email: "", mobile: "", address: "", suburb: "", region: "", password: "", confirm: "" });
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [done, setDone]       = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    setTimeout(async () => {
      try {
        await login("resident@demo.com", "demo1234");
        router.push("/resident-portal/dashboard");
      } catch { /* ignore */ }
    }, 1800);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Account Created!</h2>
          <p className="text-gray-400 text-sm">Redirecting you to your dashboard…</p>
        </motion.div>
      </div>
    );
  }

  const inputCls = "w-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500/30 text-white placeholder-gray-600 rounded-xl pl-10 pr-4 py-3 outline-none transition-all text-sm";

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-lg"
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="bg-white rounded-2xl px-5 py-2 inline-flex shadow-lg">
            <Image src="/pikitup-logo.png" alt="Pikitup" width={120} height={44} className="h-8 w-auto object-contain" />
          </div>
          <Link href="/resident-portal/login" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Already registered? Sign in</Link>
        </div>

        <h2 className="text-3xl font-black text-white mb-1">Create Resident Account</h2>
        <p className="text-gray-400 mb-8 text-sm">Register to track your collection schedule and report issues online.</p>

        {error && (
          <div className="flex items-center gap-3 bg-red-900/30 border border-red-700/40 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name</label>
              <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" required placeholder="Thabo" value={form.name} onChange={set("name")} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Surname</label>
              <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" required placeholder="Nkosi" value={form.surname} onChange={set("surname")} className={inputCls} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
            <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Mobile Number</label>
            <div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="tel" required placeholder="0821234567" value={form.mobile} onChange={set("mobile")} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Street Address</label>
            <div className="relative"><MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" required placeholder="14 Oak Avenue" value={form.address} onChange={set("address")} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Suburb</label>
              <div className="relative"><MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" required placeholder="Sandton" value={form.suburb} onChange={set("suburb")} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Region</label>
              <select required value={form.region} onChange={set("region")} className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white rounded-xl px-3 py-3 outline-none transition-all text-sm">
                <option value="">Select region…</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type={showPw ? "text" : "password"} required minLength={8} placeholder="••••••••" value={form.password} onChange={set("password")} className={inputCls} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm Password</label>
              <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="password" required placeholder="••••••••" value={form.confirm} onChange={set("confirm")} className={inputCls} />
              </div>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg mt-2"
          >
            {loading ? "Creating account…" : "Create My Account"}
          </button>
        </form>

        <p className="text-xs text-gray-600 text-center mt-6">
          By registering you agree to our{" "}
          <Link href="/terms" className="text-gray-500 hover:text-gray-300">Terms of Use</Link> and{" "}
          <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}

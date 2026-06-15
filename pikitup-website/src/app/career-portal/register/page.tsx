"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Briefcase, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CareerRegisterPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [form, setForm] = useState({
    name: "", surname: "", email: "", mobile: "", password: "", confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSuccess(true);
    setTimeout(async () => {
      try {
        // Log in with the demo applicant account to simulate registration flow
        await login("applicant@demo.com", "demo1234");
        router.push("/career-portal/dashboard");
      } catch { router.push("/career-portal/login"); }
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="font-black text-white">Create Account</div>
            <div className="text-xs text-slate-400">Pikitup Career Portal</div>
          </div>
        </div>

        {success ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Account Created!</h3>
            <p className="text-slate-400 text-sm">Signing you in…</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-2 bg-red-900/20 border border-red-800/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {(["name", "surname"] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider capitalize">{field}</label>
                    <input required value={form[field]} onChange={(e) => set(field, e.target.value)}
                      placeholder={field === "name" ? "First name" : "Last name"}
                      className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none text-sm transition-all"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Mobile Number</label>
                <input type="tel" required value={form.mobile} onChange={(e) => set("mobile", e.target.value)}
                  placeholder="0821234567"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none text-sm transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
                  <input type="password" required value={form.password} onChange={(e) => set("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Confirm Password</label>
                  <input type="password" required value={form.confirm} onChange={(e) => set("confirm", e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none text-sm transition-all"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By creating an account you agree to Pikitup's Privacy Policy and consent to your personal information being processed for recruitment purposes in line with POPIA.
              </p>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all"
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <button type="button" onClick={() => router.push("/career-portal/login")} className="text-emerald-400 hover:text-emerald-300 font-semibold">Sign in</button>
              </p>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

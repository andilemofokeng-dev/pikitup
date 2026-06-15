"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FileText, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CmsLoginPage() {
  const { login }  = useAuth();
  const router     = useRouter();
  const [email, setEmail]       = useState("admin@pikitup.co.za");
  const [password, setPassword] = useState("admin1234");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/cms-portal/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-violet-900/40">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Content Studio</h1>
          <p className="text-slate-500 text-sm mt-1">Pikitup CMS Portal</p>
        </div>

        <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl px-4 py-3 mb-6 text-xs text-violet-300">
          Demo: <strong>admin@pikitup.co.za</strong> / <strong>admin1234</strong>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-900/20 border border-red-800/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-violet-500 text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3 outline-none transition-all text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-violet-500 text-white placeholder-slate-600 rounded-xl pl-10 pr-12 py-3 outline-none transition-all text-sm"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-900/30"
          >
            {loading ? "Signing in…" : "Enter Content Studio"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

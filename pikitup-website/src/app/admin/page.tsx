"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cms_token")) {
      router.replace("/admin/leadership");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json() as { success: boolean; token?: string; error?: string };
      if (json.success && json.token) {
        localStorage.setItem("cms_token", json.token);
        router.push("/admin/leadership");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.08) 0%, transparent 60%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-black/60">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
              <Image src="/pikitup-logo.png" alt="Pikitup" width={160} height={50}
                className="h-10 w-auto object-contain" />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-900/40 border border-green-800/40 rounded-2xl mb-4">
              <Lock className="w-5 h-5 text-green-400" />
            </div>
            <h1 className="text-xl font-black text-white mb-1">Admin CMS</h1>
            <p className="text-sm text-gray-500">Enter your admin password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                autoFocus
                required
                className="w-full bg-gray-800 border border-gray-700 focus:border-green-600 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 pr-11"
              />
              <button type="button" onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-800/30 rounded-xl px-4 py-3">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </motion.div>
            )}

            <button type="submit" disabled={loading || !password}
              className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-700 mt-6">
            Pikitup Digital Platform · Admin CMS
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-700 mt-4">
          Change admin password in <code className="text-gray-600">.env.local</code> → <code className="text-gray-600">ADMIN_PASSWORD</code>
        </p>
      </motion.div>
    </div>
  );
}

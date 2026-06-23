"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Building2, ShieldCheck, FileText, HeadphonesIcon } from "lucide-react";

export default function BusinessLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail]     = useState("business@demo.com");
  const [password, setPassword] = useState("demo1234");
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/business-portal/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { icon: Building2,       title: "Account Overview",      desc: "View your service agreement and account details at a glance" },
    { icon: FileText,        title: "Invoice Management",    desc: "Access your full billing history and download statements" },
    { icon: ShieldCheck,     title: "Case Tracking",         desc: "Log and track service requests with real-time status updates" },
    { icon: HeadphonesIcon,  title: "Dedicated Support",     desc: "Priority business support with direct depot escalation" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[480px] shrink-0 flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-gray-950 relative overflow-hidden p-10">
        <div className="absolute inset-0 hero-dot-pattern opacity-10" />
        <div className="relative">
          <div className="bg-white rounded-2xl px-5 py-3 inline-block mb-10 shadow-xl">
            <Image src="/pikitup-logo.png" alt="Pikitup" width={120} height={42} className="h-9 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3 leading-tight">
            Business<br />Service Portal
          </h1>
          <p className="text-blue-200/70 text-sm leading-relaxed mb-10 max-w-sm">
            Manage your commercial waste collection service, track cases, and access invoices — all in one place.
          </p>
          <div className="space-y-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{title}</p>
                  <p className="text-xs text-blue-200/60 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <div className="bg-white rounded-xl px-4 py-2.5 inline-block mb-4">
              <Image src="/pikitup-logo.png" alt="Pikitup" width={100} height={35} className="h-8 w-auto object-contain" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-1">Sign in to your account</h2>
          <p className="text-sm text-gray-500 mb-8">Business accounts only — <Link href="/resident-portal/login" className="text-blue-400 hover:text-blue-300">Resident portal →</Link></p>

          {error && (
            <div className="bg-red-900/30 border border-red-800/40 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Business Email</label>
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 text-white rounded-xl px-4 py-3 outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} required autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 text-white rounded-xl px-4 py-3 pr-11 outline-none transition-all text-sm" />
                <button type="button" onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Demo: business@demo.com / demo1234</span>
              <Link href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Not registered yet?{" "}
            <Link href="/business-portal/register" className="text-blue-400 hover:text-blue-300 font-semibold">Create an account</Link>
          </p>
          <p className="text-xs text-gray-700 mt-4 text-center">
            Need help? Call <a href="tel:+27115000911" className="text-gray-500 hover:text-gray-300">011 500 0911</a> (Business line)
          </p>
        </div>
      </div>
    </div>
  );
}

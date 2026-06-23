"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const SERVICE_TYPES = [
  "Commercial Waste Collection (weekly)",
  "Commercial Waste Collection (3× per week)",
  "Commercial Waste Collection (daily)",
  "Bulk Waste Removal",
  "Recycling Collection",
  "Confidential Document Destruction",
  "Skip Bin Service",
  "Other",
];

export default function BusinessRegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [done, setDone]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "", regNumber: "", vatNumber: "",
    contactName: "", contactSurname: "", email: "", mobile: "",
    address: "", suburb: "", region: "",
    serviceType: "", password: "", confirm: "",
  });

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    setTimeout(async () => {
      await login("business@demo.com", "demo1234");
      router.push("/business-portal/dashboard");
    }, 1800);
  }

  const inputCls = "w-full bg-gray-900 border border-gray-800 focus:border-blue-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none transition-all text-sm";

  if (done) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-blue-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Registration Submitted</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Your business account is being set up. Redirecting you to your dashboard…
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-white rounded-xl px-4 py-2.5 inline-block">
            <Image src="/pikitup-logo.png" alt="Pikitup" width={100} height={35} className="h-8 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Business Account Registration</h1>
            <p className="text-xs text-gray-500 mt-0.5">Already have an account? <Link href="/business-portal/login" className="text-blue-400">Sign in →</Link></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business details */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="text-sm font-bold text-white mb-4">Business Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Registered Business Name <span className="text-red-400">*</span></label>
                <input type="text" required value={form.businessName} onChange={set("businessName")} placeholder="Dlamini & Sons Trading (Pty) Ltd" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Company Reg. Number <span className="text-red-400">*</span></label>
                <input type="text" required value={form.regNumber} onChange={set("regNumber")} placeholder="2019/123456/07" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">VAT Number (optional)</label>
                <input type="text" value={form.vatNumber} onChange={set("vatNumber")} placeholder="4123456789" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Service Required <span className="text-red-400">*</span></label>
                <select required value={form.serviceType} onChange={set("serviceType")} className={inputCls}>
                  <option value="">Select service type…</option>
                  {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Business Address <span className="text-red-400">*</span></label>
                <input type="text" required value={form.address} onChange={set("address")} placeholder="88 Commerce Street" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Suburb</label>
                <input type="text" required value={form.suburb} onChange={set("suburb")} placeholder="Randburg" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Region</label>
                <input type="text" required value={form.region} onChange={set("region")} placeholder="Region F — Johannesburg West" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Contact person */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="text-sm font-bold text-white mb-4">Contact Person</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">First Name <span className="text-red-400">*</span></label>
                <input type="text" required value={form.contactName} onChange={set("contactName")} placeholder="Sipho" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Surname <span className="text-red-400">*</span></label>
                <input type="text" required value={form.contactSurname} onChange={set("contactSurname")} placeholder="Dlamini" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Email <span className="text-red-400">*</span></label>
                <input type="email" required value={form.email} onChange={set("email")} placeholder="sipho@dlaminitrading.co.za" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Mobile <span className="text-red-400">*</span></label>
                <input type="tel" required value={form.mobile} onChange={set("mobile")} placeholder="071 987 6543" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Password <span className="text-red-400">*</span></label>
                <input type="password" required minLength={8} value={form.password} onChange={set("password")} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-medium mb-1.5">Confirm Password <span className="text-red-400">*</span></label>
                <input type="password" required value={form.confirm} onChange={set("confirm")}
                  className={`${inputCls} ${form.confirm && form.confirm !== form.password ? "border-red-600" : ""}`} />
                {form.confirm && form.confirm !== form.password && <p className="text-red-400 text-xs mt-1">Passwords do not match</p>}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading || (!!form.confirm && form.password !== form.confirm)}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
            {loading ? "Creating account…" : "Create Business Account"}
          </button>
          <p className="text-xs text-gray-600 text-center">
            By registering you agree to Pikitup&apos;s{" "}
            <Link href="/terms" className="text-gray-500 hover:text-gray-300">Terms of Service</Link> and{" "}
            <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

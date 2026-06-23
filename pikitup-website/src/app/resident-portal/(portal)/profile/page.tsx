"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Lock, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);

  const [form, setForm] = useState({
    name:    user?.name    ?? "",
    surname: user?.surname ?? "",
    mobile:  user?.mobile  ?? "",
    address: user?.address ?? "",
    suburb:  user?.suburb  ?? "",
    region:  user?.region  ?? "",
  });

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputCls = (disabled: boolean) =>
    `w-full bg-gray-800 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
      disabled
        ? "border-gray-800 text-gray-500 cursor-default"
        : "border-gray-700 focus:border-green-500 text-white"
    }`;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-black text-white mb-0.5">My Profile</h1>
          <p className="text-sm text-gray-500">Manage your personal details</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-green-400 text-sm font-semibold bg-green-900/30 border border-green-800/40 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" /> Profile updated
          </div>
        )}
      </div>

      {/* Avatar card */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-2xl font-black text-white">{user?.name?.[0]}{user?.surname?.[0]}</span>
        </div>
        <div>
          <p className="text-lg font-black text-white">{user?.name} {user?.surname}</p>
          <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
          <span className="mt-2 inline-block text-[10px] font-bold text-green-400 bg-green-900/30 border border-green-800/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Resident Account
          </span>
        </div>
      </div>

      {/* Personal details */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold text-white">Personal Details</h2>
          </div>
          {!editing ? (
            <button type="button" onClick={() => setEditing(true)}
              className="text-xs text-green-400 hover:text-green-300 font-semibold transition-colors border border-green-800/40 px-3 py-1.5 rounded-lg">
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button type="button" onClick={() => { setEditing(false); setForm({ name: user?.name ?? "", surname: user?.surname ?? "", mobile: user?.mobile ?? "", address: user?.address ?? "", suburb: user?.suburb ?? "", region: user?.region ?? "" }); }}
                className="text-xs text-gray-500 hover:text-gray-300 font-semibold transition-colors border border-gray-700 px-3 py-1.5 rounded-lg">
                Cancel
              </button>
              <button type="button" onClick={handleSave}
                className="text-xs text-white font-semibold bg-green-700 hover:bg-green-600 transition-colors px-3 py-1.5 rounded-lg">
                Save Changes
              </button>
            </div>
          )}
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">First Name</label>
            <input type="text" disabled={!editing} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Surname</label>
            <input type="text" disabled={!editing} value={form.surname} onChange={(e) => setForm((p) => ({ ...p, surname: e.target.value }))}
              className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">
              <Mail className="w-3 h-3 inline mr-1" />Email
            </label>
            <input type="email" disabled value={user?.email ?? ""} className={inputCls(true)} />
            <p className="text-[10px] text-gray-600 mt-1">Email cannot be changed. Contact support if needed.</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">
              <Phone className="w-3 h-3 inline mr-1" />Mobile Number
            </label>
            <input type="tel" disabled={!editing} value={form.mobile} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
              className={inputCls(!editing)} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 font-medium mb-1.5">
              <MapPin className="w-3 h-3 inline mr-1" />Street Address
            </label>
            <input type="text" disabled={!editing} value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Suburb</label>
            <input type="text" disabled={!editing} value={form.suburb} onChange={(e) => setForm((p) => ({ ...p, suburb: e.target.value }))}
              className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Region</label>
            <input type="text" disabled={!editing} value={form.region} onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
              className={inputCls(!editing)} />
          </div>
        </div>
      </div>

      {/* Account details */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-bold text-white">Account Details</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {[
            { label: "Account ID",    value: user?.id },
            { label: "Member Since",  value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" }) : "—" },
            { label: "Last Login",    value: user?.lastLogin  ? new Date(user.lastLogin).toLocaleString("en-ZA")  : "—" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-4 px-5 py-3.5">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider w-32 shrink-0">{row.label}</p>
              <p className="text-sm text-gray-400 font-mono">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Change password */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 flex items-start gap-4">
        <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white mb-0.5">Change Password</p>
          <p className="text-xs text-gray-500 mb-3">Password changes are handled via email reset link.</p>
          <button type="button"
            className="text-xs text-green-400 hover:text-green-300 font-semibold border border-green-800/40 hover:border-green-700/60 px-4 py-2 rounded-xl transition-colors">
            Send Reset Email
          </button>
        </div>
      </div>
    </div>
  );
}

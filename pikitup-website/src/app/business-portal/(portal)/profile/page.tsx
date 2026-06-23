"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Building2, Mail, Phone, MapPin, Lock, CheckCircle2, ShieldCheck } from "lucide-react";

export default function BusinessProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);

  const [form, setForm] = useState({
    contactName:    user?.name    ?? "",
    contactSurname: user?.surname ?? "",
    mobile:         user?.mobile  ?? "",
    address:        user?.address ?? "",
    suburb:         user?.suburb  ?? "",
    region:         user?.region  ?? "",
  });

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputCls = (disabled: boolean) =>
    `w-full bg-gray-800 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
      disabled ? "border-gray-800 text-gray-500 cursor-default" : "border-gray-700 focus:border-blue-500 text-white"
    }`;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-black text-white mb-0.5">Business Profile</h1>
          <p className="text-sm text-gray-500">Manage your business account details</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-green-400 text-sm font-semibold bg-green-900/30 border border-green-800/40 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" /> Profile updated
          </div>
        )}
      </div>

      {/* Business header */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center shrink-0">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-lg font-black text-white">{user?.businessName ?? "Business Account"}</p>
          <p className="text-sm text-gray-500 mt-0.5">Reg: {user?.businessReg ?? "—"}</p>
          <span className="mt-2 inline-block text-[10px] font-bold text-blue-400 bg-blue-900/30 border border-blue-800/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Business Account
          </span>
        </div>
      </div>

      {/* Business details (read-only) */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-bold text-white">Business Registration</h2>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Business Name</label>
            <input type="text" disabled value={user?.businessName ?? ""} className={inputCls(true)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Reg. Number</label>
            <input type="text" disabled value={user?.businessReg ?? ""} className={inputCls(true)} />
          </div>
        </div>
        <p className="px-5 pb-4 text-xs text-gray-600">To update business registration details, contact <a href="tel:+27115000911" className="text-blue-400">011 500 0911</a>.</p>
      </div>

      {/* Contact person */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold text-white">Contact Person</h2>
          </div>
          {!editing ? (
            <button type="button" onClick={() => setEditing(true)}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold border border-blue-800/40 px-3 py-1.5 rounded-lg transition-colors">
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button type="button" onClick={() => { setEditing(false); }}
                className="text-xs text-gray-500 hover:text-gray-300 border border-gray-700 px-3 py-1.5 rounded-lg">Cancel</button>
              <button type="button" onClick={handleSave}
                className="text-xs text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg">Save</button>
            </div>
          )}
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">First Name</label>
            <input type="text" disabled={!editing} value={form.contactName} onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))} className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Surname</label>
            <input type="text" disabled={!editing} value={form.contactSurname} onChange={(e) => setForm((p) => ({ ...p, contactSurname: e.target.value }))} className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5"><Mail className="w-3 h-3 inline mr-1" />Email</label>
            <input type="email" disabled value={user?.email ?? ""} className={inputCls(true)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5"><Phone className="w-3 h-3 inline mr-1" />Mobile</label>
            <input type="tel" disabled={!editing} value={form.mobile} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} className={inputCls(!editing)} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 font-medium mb-1.5"><MapPin className="w-3 h-3 inline mr-1" />Service Address</label>
            <input type="text" disabled={!editing} value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Suburb</label>
            <input type="text" disabled={!editing} value={form.suburb} onChange={(e) => setForm((p) => ({ ...p, suburb: e.target.value }))} className={inputCls(!editing)} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">Region</label>
            <input type="text" disabled={!editing} value={form.region} onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))} className={inputCls(!editing)} />
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 flex items-start gap-4">
        <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4 text-gray-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-0.5">Change Password</p>
          <p className="text-xs text-gray-500 mb-3">Password resets are sent by email.</p>
          <button type="button" className="text-xs text-blue-400 hover:text-blue-300 font-semibold border border-blue-800/40 hover:border-blue-700/60 px-4 py-2 rounded-xl transition-colors">
            Send Reset Email
          </button>
        </div>
      </div>
    </div>
  );
}

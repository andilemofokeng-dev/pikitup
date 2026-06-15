"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Save, CheckCircle } from "lucide-react";

export default function ApplicantProfilePage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name:       user?.name ?? "",
    surname:    user?.surname ?? "",
    email:      user?.email ?? "",
    mobile:     "",
    address:    "",
    idNumber:   "",
    education:  "",
    experience: "",
    skills:     "",
    linkedin:   "",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  function f(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar + name */}
        <div className="flex items-center gap-5 bg-slate-900 rounded-2xl border border-slate-800 p-5">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl flex items-center justify-center text-xl font-black text-white shrink-0">
            {form.name[0]}{form.surname[0]}
          </div>
          <div>
            <p className="font-bold text-white text-lg">{form.name} {form.surname}</p>
            <p className="text-sm text-slate-400">{form.email}</p>
            <p className="text-xs text-emerald-400 mt-0.5">Applicant Account</p>
          </div>
        </div>

        {/* Personal info */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><User className="w-3.5 h-3.5" />Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              { key: "name", label: "First Name" },
              { key: "surname", label: "Last Name" },
            ] as const).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
                <input value={form[key]} onChange={f(key)} className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-colors" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5"><Mail className="w-3 h-3" />Email Address</label>
            <input type="email" value={form.email} onChange={f("email")} className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-colors" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5"><Phone className="w-3 h-3" />Mobile Number</label>
              <input type="tel" value={form.mobile} onChange={f("mobile")} placeholder="0821234567" className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-colors placeholder-slate-600" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">ID / Passport Number</label>
              <input value={form.idNumber} onChange={f("idNumber")} placeholder="SA ID or passport" className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-colors placeholder-slate-600" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 flex items-center gap-1.5"><MapPin className="w-3 h-3" />Physical Address</label>
            <input value={form.address} onChange={f("address")} placeholder="Your residential address" className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-colors placeholder-slate-600" />
          </div>
        </section>

        {/* Education */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5" />Education</h3>
          <textarea value={form.education} onChange={f("education")} rows={4}
            placeholder="List your qualifications: degree/diploma, institution, year completed…"
            className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none resize-none transition-colors"
          />
        </section>

        {/* Experience */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" />Work Experience</h3>
          <textarea value={form.experience} onChange={f("experience")} rows={5}
            placeholder="List your work history: company, role, dates, key responsibilities…"
            className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none resize-none transition-colors"
          />
        </section>

        {/* Skills + LinkedIn */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skills &amp; Links</h3>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Key Skills</label>
            <input value={form.skills} onChange={f("skills")} placeholder="e.g. Fleet Management, SHEQ, MS Office, Report Writing…"
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">LinkedIn Profile URL</label>
            <input type="url" value={form.linkedin} onChange={f("linkedin")} placeholder="https://linkedin.com/in/…"
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 text-white text-sm placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none transition-colors"
            />
          </div>
        </section>

        <button type="submit" disabled={saving}
          className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
            saved  ? <><CheckCircle className="w-4 h-4" />Profile Saved!</> :
            <><Save className="w-4 h-4" />Save Profile</>
          }
        </button>
      </form>
    </div>
  );
}

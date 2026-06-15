"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MOCK_CAREER_VACANCIES, MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Briefcase, Calendar, CheckCircle, AlertCircle, Upload, Send } from "lucide-react";

export default function JobDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const { user }  = useAuth();
  const vacancy   = MOCK_CAREER_VACANCIES.find((v) => v.id === id);

  const alreadyApplied = MOCK_APPLICATIONS.some((a) => a.vacancyId === id && a.applicantId === user?.id);

  const [showForm, setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(alreadyApplied);
  const [form, setForm] = useState({
    education: "", experience: "", coverLetter: "", cvFileName: "",
  });

  if (!vacancy) return <div className="text-center text-slate-500 py-16">Position not found.</div>;

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    setShowForm(false);
  }

  return (
    <div className="max-w-4xl space-y-6">
      <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      {/* Main job card */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{vacancy.type} Position</p>
            <h1 className="text-2xl font-black text-white leading-tight">{vacancy.title}</h1>
          </div>
          {vacancy.status === "closing-soon" && (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800/30 shrink-0">Closing Soon</span>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-5">
          <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-600" />{vacancy.department}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-600" />{vacancy.region}</span>
          <span className="flex items-center gap-1.5">Grade {vacancy.grade}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-600" />Closes {vacancy.closingDate}</span>
          {vacancy.salary && <span className="font-medium text-emerald-400">{vacancy.salary}</span>}
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">{vacancy.description}</p>

        {vacancy.requirements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Requirements</h3>
            <ul className="space-y-2">
              {vacancy.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {vacancy.responsibilities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Responsibilities</h3>
            <ul className="space-y-2">
              {vacancy.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />{r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply button / submitted state */}
        {submitted ? (
          <div className="flex items-center gap-3 bg-emerald-900/20 border border-emerald-800/30 rounded-2xl px-5 py-4">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-400">Application Submitted</p>
              <p className="text-xs text-slate-400 mt-0.5">We&apos;ll be in touch. Track your application status in My Applications.</p>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />{showForm ? "Cancel Application" : "Apply for This Position"}
          </button>
        )}
      </div>

      {/* Application form */}
      {showForm && !submitted && (
        <div className="bg-slate-900 rounded-2xl border border-emerald-800/40 p-6">
          <h3 className="font-bold text-white mb-5">Your Application</h3>
          <form onSubmit={handleApply} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Education</label>
              <textarea required value={form.education} onChange={(e) => setForm({...form,education:e.target.value})} rows={3}
                placeholder="Your highest qualifications, institutions, and years completed…"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Work Experience</label>
              <textarea required value={form.experience} onChange={(e) => setForm({...form,experience:e.target.value})} rows={4}
                placeholder="Previous roles, responsibilities, and relevant experience…"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Cover Letter</label>
              <textarea required value={form.coverLetter} onChange={(e) => setForm({...form,coverLetter:e.target.value})} rows={5}
                placeholder="Why are you interested in this position and what makes you the right candidate?"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">CV / Resume</label>
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 border-dashed rounded-xl px-4 py-4">
                <Upload className="w-5 h-5 text-slate-500" />
                <div className="flex-1">
                  <p className="text-sm text-slate-400">{form.cvFileName || "Upload your CV (PDF, DOC)"}</p>
                  <p className="text-xs text-slate-600 mt-0.5">Max 5 MB</p>
                </div>
                <label className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                  Choose File
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => {
                    if (e.target.files?.[0]) setForm({...form, cvFileName: e.target.files[0].name});
                  }} />
                </label>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                By submitting this application you consent to Pikitup processing your personal information for recruitment purposes in line with POPIA.
                Your information will not be shared with third parties without your consent.
              </p>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</> : <><Send className="w-4 h-4" />Submit Application</>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

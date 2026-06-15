"use client";
import { useParams, useRouter } from "next/navigation";
import { MOCK_CAREER_VACANCIES, MOCK_APPLICATIONS } from "@/lib/mock-data";
import { APPLICATION_STATUS_LABELS } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Calendar, Users, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  submitted:"bg-slate-800 text-slate-300",
  screening:"bg-blue-900/40 text-blue-400",
  shortlisted:"bg-emerald-900/40 text-emerald-400",
  interview_scheduled:"bg-violet-900/40 text-violet-400",
  interviewed:"bg-teal-900/40 text-teal-400",
  offer_made:"bg-yellow-900/40 text-yellow-400",
  hired:"bg-green-900/40 text-green-400",
  rejected:"bg-red-900/40 text-red-400",
  withdrawn:"bg-slate-800 text-slate-500",
};

export default function VacancyDetailPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const vacancy  = MOCK_CAREER_VACANCIES.find((v) => v.id === id);
  const apps     = MOCK_APPLICATIONS.filter((a) => a.vacancyId === id);

  if (!vacancy) return <div className="text-center text-slate-500 py-16">Vacancy not found.</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Vacancy info */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{vacancy.type}</p>
            <h2 className="text-xl font-black text-white">{vacancy.title}</h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-800/30 shrink-0">
            {vacancy.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-5">
          <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-600" />{vacancy.department}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-600" />{vacancy.region}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-600" />Closes {vacancy.closingDate}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-600" />{apps.length} applicants</span>
          {vacancy.salary && <span className="text-emerald-400 font-medium">{vacancy.salary}</span>}
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">{vacancy.description}</p>
        {vacancy.requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Requirements</h4>
            <ul className="space-y-1.5">
              {vacancy.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Applications for this vacancy */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Applications ({apps.length})</h3>
          <Link href="/career-portal/applications" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">All applications <ArrowRight className="w-3 h-3" /></Link>
        </div>
        {apps.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">No applications yet.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {apps.map((a) => (
              <Link key={a.id} href={`/career-portal/applications/${a.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{a.applicantName.split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{a.applicantName}</p>
                    <p className="text-xs text-slate-500">{a.applicantEmail} · Applied {new Date(a.appliedAt).toLocaleDateString("en-ZA")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", STATUS_COLORS[a.status])}>
                    {APPLICATION_STATUS_LABELS[a.status]}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

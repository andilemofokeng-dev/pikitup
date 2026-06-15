"use client";
import { useAuth } from "@/context/AuthContext";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from "@/lib/types";
import Link from "next/link";
import { Briefcase, Calendar, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STEPS: ApplicationStatus[] = [
  "submitted","screening","shortlisted","interview_scheduled","interviewed","offer_made","hired"
];

const STATUS_COLORS: Record<string, string> = {
  submitted:           "bg-slate-800 text-slate-300",
  screening:           "bg-blue-900/40 text-blue-400",
  shortlisted:         "bg-emerald-900/40 text-emerald-400",
  interview_scheduled: "bg-violet-900/40 text-violet-400",
  interviewed:         "bg-teal-900/40 text-teal-400",
  offer_made:          "bg-yellow-900/40 text-yellow-400",
  hired:               "bg-green-900/40 text-green-400",
  rejected:            "bg-red-900/40 text-red-400",
  withdrawn:           "bg-slate-800 text-slate-500",
};

export default function MyApplicationsPage() {
  const { user }  = useAuth();
  const myApps    = MOCK_APPLICATIONS.filter((a) => a.applicantId === user?.id);

  return (
    <div className="space-y-5 max-w-4xl">
      {myApps.length === 0 ? (
        <div className="text-center py-20">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-700" />
          <h3 className="text-lg font-bold text-white mb-2">No Applications Yet</h3>
          <p className="text-slate-400 text-sm mb-6">Browse open positions and apply today.</p>
          <Link href="/career-portal/jobs" className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">Browse Jobs</Link>
        </div>
      ) : (
        myApps.map((a) => {
          const stepIdx    = STATUS_STEPS.indexOf(a.status as ApplicationStatus);
          const isTerminal = a.status === "rejected" || a.status === "withdrawn" || a.status === "hired";
          return (
            <div key={a.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-white">{a.vacancyTitle}</h3>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-slate-700" />{a.department}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-700" />Applied {new Date(a.appliedAt).toLocaleDateString("en-ZA")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", STATUS_COLORS[a.status])}>
                    {APPLICATION_STATUS_LABELS[a.status as ApplicationStatus]}
                  </span>
                  <Link href={`/career-portal/applications/${a.id}`} className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-400 hover:bg-emerald-900/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Interview date alert */}
              {a.interviewDate && (
                <div className="mb-4 flex items-center gap-2 bg-violet-900/20 border border-violet-800/30 rounded-xl px-4 py-2.5 text-sm text-violet-400">
                  <Clock className="w-4 h-4 shrink-0" />
                  Interview scheduled: {new Date(a.interviewDate).toLocaleString("en-ZA", { dateStyle:"full", timeStyle:"short" })}
                </div>
              )}

              {/* Progress tracker */}
              {!isTerminal && (
                <div className="relative flex items-start justify-between gap-1 mt-2">
                  <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-800" />
                  <div className="absolute top-3.5 left-0 h-0.5 bg-emerald-600 transition-all" style={{ inlineSize: `${Math.max(0, (stepIdx / (STATUS_STEPS.length - 1)) * 100)}%` }} />
                  {STATUS_STEPS.map((step, i) => {
                    const done    = i < stepIdx;
                    const current = i === stepIdx;
                    return (
                      <div key={step} className="flex flex-col items-center flex-1 relative z-10">
                        <div className={cn("w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all", done || current ? "bg-emerald-700 border-emerald-600" : "bg-slate-800 border-slate-700")}>
                          {done ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <div className={cn("w-2 h-2 rounded-full", current ? "bg-white" : "bg-slate-600")} />}
                        </div>
                        <span className={cn("text-[8px] mt-1 font-medium text-center leading-tight", current ? "text-emerald-400" : done ? "text-slate-400" : "text-slate-700")}>
                          {APPLICATION_STATUS_LABELS[step]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {a.status === "hired" && (
                <div className="mt-2 flex items-center gap-2 bg-green-900/20 border border-green-800/30 rounded-xl px-4 py-2.5 text-sm text-green-400">
                  <CheckCircle className="w-4 h-4 shrink-0" /> Congratulations! You have been offered this position.
                </div>
              )}
              {a.status === "rejected" && (
                <div className="mt-2 px-4 py-2.5 bg-slate-800 rounded-xl text-xs text-slate-400">
                  We regret to inform you that your application was not successful on this occasion. We appreciate your interest in Pikitup.
                </div>
              )}
            </div>
          );
        })
      )}

      {myApps.length > 0 && (
        <div className="text-center pt-2">
          <Link href="/career-portal/jobs" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">Browse more positions →</Link>
        </div>
      )}
    </div>
  );
}

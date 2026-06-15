"use client";
import { useAuth } from "@/context/AuthContext";
import { MOCK_CAREER_VACANCIES, MOCK_APPLICATIONS } from "@/lib/mock-data";
import Link from "next/link";
import { Briefcase, FileText, Clock, CheckCircle, TrendingUp, Users, ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { APPLICATION_STATUS_LABELS } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  submitted:           "bg-slate-800 text-slate-300",
  screening:           "bg-blue-900/40 text-blue-400",
  shortlisted:         "bg-emerald-900/40 text-emerald-400",
  interview_scheduled: "bg-violet-900/40 text-violet-400",
  interviewed:         "bg-teal-900/40 text-teal-400",
  offer_made:          "bg-yellow-900/40 text-yellow-400",
  hired:               "bg-green-900/40 text-green-400",
  rejected:            "bg-red-900/40 text-red-400",
  withdrawn:           "bg-gray-800 text-gray-500",
};

function HRDashboard() {
  const totalApps  = MOCK_APPLICATIONS.length;
  const shortlisted = MOCK_APPLICATIONS.filter((a) => a.status === "shortlisted").length;
  const interviews  = MOCK_APPLICATIONS.filter((a) => a.status === "interview_scheduled").length;
  const openVacs    = MOCK_CAREER_VACANCIES.filter((v) => v.status === "open" || v.status === "closing-soon").length;

  return (
    <div className="space-y-7">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Open Vacancies",    value: openVacs,    icon: Briefcase,    color: "border-emerald-800/30 text-emerald-400" },
          { label: "Total Applications",value: totalApps,   icon: FileText,     color: "border-blue-800/30 text-blue-400" },
          { label: "Shortlisted",       value: shortlisted, icon: CheckCircle,  color: "border-teal-800/30 text-teal-400" },
          { label: "Interviews Set",    value: interviews,  icon: Calendar,     color: "border-violet-800/30 text-violet-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`bg-slate-900 rounded-2xl border p-5 ${color.split(" ")[0]}`}>
            <Icon className={`w-5 h-5 mb-3 ${color.split(" ")[1]}`} />
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Vacancies overview */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-500" />Active Vacancies</h3>
            <Link href="/career-portal/vacancies" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-slate-800">
            {MOCK_CAREER_VACANCIES.filter((v) => v.status !== "filled").map((v) => (
              <Link key={v.id} href={`/career-portal/vacancies/${v.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/5 transition-colors group">
                <div>
                  <p className="text-sm font-medium text-white line-clamp-1">{v.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{v.department} · Closes {v.closingDate}</p>
                </div>
                <div className="ml-3 text-right shrink-0">
                  <p className="text-sm font-bold text-white">{v.applicationCount}</p>
                  <p className="text-[10px] text-slate-500">applicants</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent applications */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2"><Users className="w-4 h-4 text-slate-500" />Recent Applications</h3>
            <Link href="/career-portal/applications" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-slate-800">
            {MOCK_APPLICATIONS.slice(0,5).map((a) => (
              <Link key={a.id} href={`/career-portal/applications/${a.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">{a.applicantName.split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{a.applicantName}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{a.vacancyTitle}</p>
                  </div>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full ml-3 shrink-0", STATUS_COLORS[a.status])}>
                  {APPLICATION_STATUS_LABELS[a.status]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicantDashboard() {
  const { user } = useAuth();
  const myApps   = MOCK_APPLICATIONS.filter((a) => a.applicantId === user?.id);
  const openJobs = MOCK_CAREER_VACANCIES.filter((v) => v.status === "open" || v.status === "closing-soon");

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-slate-900 rounded-2xl border border-emerald-800/20 p-6">
        <p className="text-emerald-400 text-sm font-medium mb-1">Welcome back,</p>
        <h2 className="text-2xl font-black text-white">{user?.name} {user?.surname}</h2>
        <p className="text-slate-400 text-sm mt-2">You have <strong className="text-white">{myApps.length}</strong> active application{myApps.length !== 1 ? "s" : ""}. {openJobs.length} new positions are open.</p>
        <Link href="/career-portal/jobs" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">
          <Briefcase className="w-4 h-4" /> Browse Open Positions
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My applications */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">My Applications</h3>
            <Link href="/career-portal/my-applications" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {myApps.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">No applications yet.</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {myApps.map((a) => (
                <div key={a.id} className="px-6 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{a.vacancyTitle}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.department} · Applied {new Date(a.appliedAt).toLocaleDateString("en-ZA")}</p>
                    </div>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0", STATUS_COLORS[a.status])}>
                      {APPLICATION_STATUS_LABELS[a.status]}
                    </span>
                  </div>
                  {a.interviewDate && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-violet-400">
                      <Calendar className="w-3 h-3" />
                      Interview: {new Date(a.interviewDate).toLocaleString("en-ZA", { dateStyle:"medium", timeStyle:"short" })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Open jobs snippet */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Open Positions</h3>
            <Link href="/career-portal/jobs" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-slate-800">
            {openJobs.slice(0,4).map((v) => (
              <Link key={v.id} href={`/career-portal/jobs/${v.id}`} className="flex items-start justify-between px-6 py-3.5 hover:bg-white/5 transition-colors group">
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{v.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{v.department} · {v.type} · Closes {v.closingDate}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors ml-3 shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareerDashboardPage() {
  const { user } = useAuth();
  const isHR = user && ["hr","admin","super_admin"].includes(user.role);
  return isHR ? <HRDashboard /> : <ApplicantDashboard />;
}

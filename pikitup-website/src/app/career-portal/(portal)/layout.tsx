"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Briefcase, FileText, User,
  Users, BarChart2, LogOut, Menu, X, Bell, ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const HR_NAV = [
  { href: "/career-portal/dashboard",    label: "Dashboard",     icon: LayoutDashboard },
  { href: "/career-portal/vacancies",    label: "Vacancies",     icon: Briefcase },
  { href: "/career-portal/applications", label: "Applications",  icon: FileText },
  { href: "/career-portal/reports",      label: "Reports",       icon: BarChart2 },
];

const APPLICANT_NAV = [
  { href: "/career-portal/dashboard",    label: "My Dashboard",  icon: LayoutDashboard },
  { href: "/career-portal/jobs",         label: "Browse Jobs",   icon: Briefcase },
  { href: "/career-portal/my-applications", label: "My Applications", icon: FileText },
  { href: "/career-portal/profile",      label: "My Profile",    icon: User },
];

function CareerSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isHR = user?.role === "hr" || user?.role === "admin" || user?.role === "super_admin";
  const navItems = isHR ? HR_NAV : APPLICANT_NAV;

  return (
    <aside className="w-64 h-full flex flex-col bg-slate-950 border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <Link href="/career-portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-700 to-teal-800 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-white text-sm">Career Portal</div>
            <div className="text-[11px] text-emerald-400">{isHR ? "HR Management" : "Job Applications"}</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active ? "bg-emerald-900/30 text-emerald-400 border border-emerald-800/30" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", active ? "text-emerald-400" : "text-slate-600 group-hover:text-slate-300")} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-emerald-700" />}
            </Link>
          );
        })}
      </nav>

      {/* Role indicator */}
      <div className="mx-3 mb-3 px-3 py-2 bg-emerald-900/20 border border-emerald-800/20 rounded-xl">
        <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
          {isHR ? "HR Officer" : "Applicant Account"}
        </p>
        <p className="text-[10px] text-slate-500 mt-0.5">{isHR ? "Full recruitment access" : "Apply & track applications"}</p>
      </div>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-700 to-teal-800 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{user?.name?.[0]}{user?.surname?.[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name} {user?.surname}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button type="button" onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function CareerPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ALLOWED_ROLES = ["hr", "admin", "super_admin", "applicant"];

  useEffect(() => {
    if (!isLoading && (!user || !ALLOWED_ROLES.includes(user.role))) {
      router.replace("/career-portal/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isHR = ["hr","admin","super_admin"].includes(user.role);
  const allNav = isHR ? HR_NAV : APPLICANT_NAV;
  const title  = allNav.find((n) => pathname.startsWith(n.href))?.label ?? "Career Portal";

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex shrink-0"><CareerSidebar /></div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div key="ov" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={()=>setSidebarOpen(false)} />
            <motion.div key="sb" initial={{x:-256}} animate={{x:0}} exit={{x:-256}} transition={{type:"spring",stiffness:300,damping:30}} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <CareerSidebar onClose={()=>setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-slate-900 border-b border-white/5 flex items-center gap-4 px-4 shrink-0">
          <button type="button" onClick={()=>setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-bold text-white text-sm flex-1">{title}</h1>
          {isHR && (
            <div className="flex items-center gap-3">
              <Link href="/staff-portal/dashboard" className="text-xs text-slate-500 hover:text-slate-300 transition-colors hidden sm:block">Staff Portal</Link>
              <Link href="/cms-portal/vacancies" className="text-xs text-slate-500 hover:text-slate-300 transition-colors hidden sm:block">CMS Vacancies</Link>
            </div>
          )}
          <Bell className="w-5 h-5 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors" />
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-700 to-teal-800 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-white">{user.name?.[0]}{user.surname?.[0]}</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-5 md:p-7">{children}</main>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Newspaper, Bell, Briefcase, HelpCircle,
  MapPin, FileText, LogOut, ChevronRight, Menu, X, Users, BookOpen,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navSections = [
  {
    label: "Content",
    items: [
      { href: "/cms-portal/dashboard",      label: "Dashboard",      icon: LayoutDashboard },
      { href: "/cms-portal/articles",       label: "News & Articles", icon: Newspaper },
      { href: "/cms-portal/notices",        label: "Service Notices", icon: Bell },
      { href: "/cms-portal/leadership",     label: "Leadership",      icon: Users },
      { href: "/cms-portal/annual-reports", label: "Annual Reports",  icon: BookOpen },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/cms-portal/tenders",    label: "Tenders & RFQs", icon: Briefcase },
      { href: "/cms-portal/vacancies",  label: "Vacancies",      icon: FileText },
      { href: "/cms-portal/faqs",       label: "FAQs",           icon: HelpCircle },
      { href: "/cms-portal/facilities", label: "Facilities",     icon: MapPin },
    ],
  },
];

function CmsSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 h-full flex flex-col bg-slate-950 border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <Link href="/cms-portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-white text-sm">Content Studio</div>
            <div className="text-[11px] text-violet-400">CMS Portal</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] text-slate-600 uppercase font-semibold tracking-widest px-3 mb-2">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                      active ? "bg-violet-900/30 text-violet-400 border border-violet-800/30" : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 shrink-0", active ? "text-violet-400" : "text-slate-600 group-hover:text-slate-300")} />
                    {label}
                    {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-700" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-violet-800 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{user?.name?.[0]}{user?.surname?.[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name} {user?.surname}</p>
            <p className="text-[10px] text-slate-500 capitalize">{user?.role?.replace(/_/g," ")}</p>
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

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const CMS_ROLES = ["communications","admin","super_admin"];

  useEffect(() => {
    if (!isLoading && (!user || !CMS_ROLES.includes(user.role))) {
      router.replace("/cms-portal/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const flatItems = navSections.flatMap((s) => s.items);
  const title = flatItems.find((n) => pathname.startsWith(n.href))?.label ?? "CMS";

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex shrink-0"><CmsSidebar /></div>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div key="ov" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={()=>setSidebarOpen(false)} />
            <motion.div key="sb" initial={{x:-256}} animate={{x:0}} exit={{x:-256}} transition={{type:"spring",stiffness:300,damping:30}} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <CmsSidebar onClose={()=>setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-slate-900 border-b border-white/5 flex items-center gap-4 px-4">
          <button type="button" onClick={()=>setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-bold text-white text-sm flex-1">{title}</h1>
          <Link href="/staff-portal/dashboard" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Staff Portal</Link>
          <Link href="/admin-portal/dashboard" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Admin</Link>
        </header>
        <main className="flex-1 overflow-auto p-5 md:p-7">{children}</main>
      </div>
    </div>
  );
}

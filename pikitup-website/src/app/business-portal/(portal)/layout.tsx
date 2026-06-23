"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, ClipboardList, AlertTriangle, FileText,
  Briefcase, User, LogOut, Menu, X, ChevronRight, Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TopBar from "@/components/portal/TopBar";

const navItems = [
  { href: "/business-portal/dashboard",  label: "Dashboard",         icon: LayoutDashboard },
  { href: "/business-portal/cases",      label: "My Cases",          icon: ClipboardList },
  { href: "/business-portal/report",     label: "Report an Issue",   icon: AlertTriangle },
  { href: "/business-portal/services",   label: "My Service",        icon: Briefcase },
  { href: "/business-portal/invoices",   label: "Invoices",          icon: FileText },
  { href: "/business-portal/profile",    label: "Business Profile",  icon: User },
];

const PAGE_TITLES: Record<string, string> = {
  "/business-portal/dashboard":  "Dashboard",
  "/business-portal/cases":      "My Cases",
  "/business-portal/report":     "Report an Issue",
  "/business-portal/services":   "My Service Agreement",
  "/business-portal/invoices":   "Invoices",
  "/business-portal/profile":    "Business Profile",
};

function BusinessSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 h-full flex flex-col bg-gray-950 border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <Link href="/business-portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-md">
            <Image src="/pikitup-logo.png" alt="Pikitup" width={90} height={32} className="h-7 w-auto object-contain" />
          </div>
        </Link>
        <div className="mt-3 px-1">
          <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest">Business Portal</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-400 transition-colors mb-3"
          onClick={onClose}
        >
          <Home className="w-3.5 h-3.5" />
          Back to website
        </Link>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href} href={href} onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-blue-900/40 text-blue-400 border border-blue-800/40"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("w-4.5 h-4.5 shrink-0", active ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300")} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-blue-600" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{user?.name?.[0]}{user?.surname?.[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.businessName ?? `${user?.name} ${user?.surname}`}</p>
            <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          type="button" onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function BusinessPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "business")) {
      router.replace("/business-portal/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const title = Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] ?? "Business Portal";

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <div className="hidden lg:flex shrink-0">
        <BusinessSidebar />
      </div>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.div key="mobile-sidebar" initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <BusinessSidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-auto p-5 md:p-7">{children}</main>
      </div>
    </div>
  );
}

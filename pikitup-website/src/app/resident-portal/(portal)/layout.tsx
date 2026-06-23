"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth as useAuthCtx } from "@/context/AuthContext";
import {
  LayoutDashboard, ClipboardList, AlertTriangle, Calendar,
  Bell, User, LogOut, Menu, X, ChevronRight, Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TopBar from "@/components/portal/TopBar";

const navItems = [
  { href: "/resident-portal/dashboard",      label: "Dashboard",            icon: LayoutDashboard },
  { href: "/resident-portal/cases",           label: "My Cases",             icon: ClipboardList },
  { href: "/resident-portal/report",          label: "Report an Issue",      icon: AlertTriangle },
  { href: "/resident-portal/schedule",        label: "Collection Schedule",  icon: Calendar },
  { href: "/resident-portal/notifications",   label: "Notifications",        icon: Bell },
  { href: "/resident-portal/profile",         label: "My Profile",           icon: User },
];

const PAGE_TITLES: Record<string, string> = {
  "/resident-portal/dashboard":    "Dashboard",
  "/resident-portal/cases":        "My Cases",
  "/resident-portal/report":       "Report an Issue",
  "/resident-portal/schedule":     "Collection Schedule",
  "/resident-portal/notifications":"Notifications",
  "/resident-portal/profile":      "My Profile",
};

function ResidentSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuthCtx();

  return (
    <aside className="w-64 h-full flex flex-col bg-gray-950 border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <Link href="/resident-portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="bg-white rounded-xl px-3 py-1.5 shadow-md">
            <Image src="/pikitup-logo.png" alt="Pikitup" width={90} height={32} className="h-7 w-auto object-contain" />
          </div>
        </Link>
        <div className="mt-3 px-1">
          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-widest">Resident Portal</p>
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
                  ? "bg-green-900/40 text-green-400 border border-green-800/40"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("w-4.5 h-4.5 shrink-0", active ? "text-green-400" : "text-gray-500 group-hover:text-gray-300")} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-green-600" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{user?.name?.[0]}{user?.surname?.[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name} {user?.surname}</p>
            <p className="text-[10px] text-gray-500 truncate">{user?.suburb ?? "Resident"}</p>
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

export default function ResidentPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !["resident"].includes(user.role))) {
      router.replace("/resident-portal/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const title = Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] ?? "Resident Portal";

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <div className="hidden lg:flex shrink-0">
        <ResidentSidebar />
      </div>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.div key="mobile-sidebar" initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <ResidentSidebar onClose={() => setSidebarOpen(false)} />
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

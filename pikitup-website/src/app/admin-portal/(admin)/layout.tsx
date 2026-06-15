"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useAuth as _useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, FileText, Settings, Shield,
  Database, LogOut, Menu, X, Bell, Recycle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/admin-portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin-portal/users",     label: "User Management", icon: Users },
  { href: "/admin-portal/roles",     label: "Roles & Permissions", icon: Shield },
  { href: "/admin-portal/audit",     label: "Audit Log", icon: FileText },
  { href: "/admin-portal/system",    label: "System Health", icon: Database },
  { href: "/admin-portal/settings",  label: "Settings", icon: Settings },
];

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = _useAuth();
  return (
    <aside className="w-64 h-full flex flex-col bg-gray-950 border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <Link href="/admin-portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 bg-gradient-to-br from-red-700 to-red-900 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-white text-sm">Admin Portal</div>
            <div className="text-[11px] text-red-400">System Administration</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active ? "bg-red-900/30 text-red-400 border border-red-800/30" : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />{label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{user?.name?.[0]}{user?.surname?.[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name} {user?.surname}</p>
            <p className="text-[10px] text-gray-500 capitalize">Super Admin</p>
          </div>
        </div>
        <button type="button" onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !["admin","super_admin"].includes(user.role))) {
      router.replace("/admin-portal/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading || !user) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const title = navItems.find((n) => pathname.startsWith(n.href))?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <div className="hidden lg:flex shrink-0"><AdminSidebar /></div>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div key="ov" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={()=>setSidebarOpen(false)} />
            <motion.div key="sb" initial={{x:-256}} animate={{x:0}} exit={{x:-256}} transition={{type:"spring",stiffness:300,damping:30}} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              <AdminSidebar onClose={()=>setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-gray-900 border-b border-white/5 flex items-center gap-4 px-4">
          <button type="button" onClick={()=>setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-bold text-white text-sm flex-1">{title}</h1>
          <Link href="/staff-portal/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5">
            <Recycle className="w-3.5 h-3.5" />Staff Portal
          </Link>
          <Link href="/cms-portal/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />CMS Portal
          </Link>
          <Bell className="w-5 h-5 text-gray-500 hover:text-gray-300 cursor-pointer" />
        </header>
        <main className="flex-1 overflow-auto p-5 md:p-7">{children}</main>
      </div>
    </div>
  );
}

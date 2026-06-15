"use client";
import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { AnimatePresence, motion } from "framer-motion";

interface TopBarProps {
  onMenuClick: () => void;
  title?: string;
}

export default function TopBar({ onMenuClick, title = "Dashboard" }: TopBarProps) {
  const { user } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <header className="h-14 bg-gray-900 border-b border-white/5 flex items-center gap-4 px-4 shrink-0">
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="font-bold text-white text-sm flex-1 hidden sm:block">{title}</h1>

      {/* Search */}
      <div className="flex-1 sm:flex-none max-w-xs">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
          <input
            type="search"
            placeholder="Search…"
            className="w-full sm:w-52 bg-gray-800 border border-gray-700 text-xs text-gray-300 placeholder-gray-600 rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-green-600 transition-colors"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowNotif(!showNotif)}
          className="relative p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
        </button>
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700">
                <p className="font-bold text-white text-sm">Notifications</p>
              </div>
              <div className="divide-y divide-gray-700 max-h-72 overflow-y-auto">
                {MOCK_NOTIFICATIONS.map((n) => (
                  <div key={n.id} className={`px-4 py-3 ${!n.isRead ? "bg-green-900/10" : ""}`}>
                    <p className="text-xs font-semibold text-white">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar */}
      <div className="w-7 h-7 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-white">
          {user?.name?.[0]}{user?.surname?.[0]}
        </span>
      </div>
    </header>
  );
}

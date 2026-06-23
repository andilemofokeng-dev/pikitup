"use client";
import { useEffect, useState } from "react";
import { apiGetMyNotifications } from "@/lib/api-client";
import type { Notification } from "@/lib/types";
import Link from "next/link";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<Notification["type"], { icon: typeof Info; color: string; bg: string }> = {
  info:    { icon: Info,          color: "text-blue-400",   bg: "bg-blue-900/30 border-blue-800/40" },
  success: { icon: CheckCircle2,  color: "text-green-400",  bg: "bg-green-900/30 border-green-800/40" },
  warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-900/30 border-yellow-800/40" },
  error:   { icon: XCircle,       color: "text-red-400",    bg: "bg-red-900/30 border-red-800/40" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetMyNotifications().then((r) => setNotifications(r.data)).finally(() => setLoading(false));
  }, []);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  const unread = notifications.filter((n) => !n.isRead).length;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-black text-white mb-0.5">Notifications</h1>
          <p className="text-sm text-gray-500">{unread} unread message{unread !== 1 ? "s" : ""}</p>
        </div>
        {unread > 0 && (
          <button type="button" onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-600 px-4 py-2 rounded-xl">
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Bell className="w-12 h-12 text-gray-700 mb-4" />
          <p className="text-gray-400 font-semibold mb-1">All clear!</p>
          <p className="text-xs text-gray-600">You have no notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const style = TYPE_STYLES[n.type];
            const Icon = style.icon;
            return (
              <div key={n.id}
                className={cn(
                  "rounded-2xl border p-5 flex items-start gap-4 transition-all",
                  n.isRead ? "bg-gray-900 border-gray-800 opacity-70" : cn("border", style.bg)
                )}
              >
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-black/20")}>
                  <Icon className={cn("w-4.5 h-4.5", style.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className={cn("text-sm font-bold", n.isRead ? "text-gray-400" : "text-white")}>{n.title}</p>
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-green-400 shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <p className="text-[11px] text-gray-600">
                      {new Date(n.createdAt).toLocaleString("en-ZA", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {n.href && (
                      <Link href={n.href} className="text-[11px] text-green-400 hover:text-green-300 font-semibold transition-colors">
                        View →
                      </Link>
                    )}
                    {!n.isRead && (
                      <button
                        type="button"
                        onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, isRead: true } : x))}
                        className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { apiGetUsers } from "@/lib/api-client";
import type { User } from "@/lib/types";
import { Search, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLE_COLORS: Record<string, string> = {
  resident:"bg-blue-900/30 text-blue-400 border-blue-800/30",
  business:"bg-purple-900/30 text-purple-400 border-purple-800/30",
  call_centre:"bg-yellow-900/30 text-yellow-400 border-yellow-800/30",
  depot_manager:"bg-orange-900/30 text-orange-400 border-orange-800/30",
  regional_manager:"bg-teal-900/30 text-teal-400 border-teal-800/30",
  super_admin:"bg-red-900/30 text-red-400 border-red-800/30",
  admin:"bg-red-900/30 text-red-400 border-red-800/30",
};

export default function UsersPage() {
  const [users, setUsers]     = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");

  useEffect(() => {
    apiGetUsers().then((r) => setUsers(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    !search ||
    `${u.name} ${u.surname} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
          className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-green-600 transition-colors"
        />
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {["User","Email","Role","Region","Joined",""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-white">{u.name[0]}{u.surname[0]}</span>
                      </div>
                      <span className="font-medium text-white">{u.name} {u.surname}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize", ROLE_COLORS[u.role] ?? "bg-gray-800 text-gray-400 border-gray-700")}>
                      {u.role.replace(/_/g," ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{u.region ?? "—"}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString("en-ZA")}</td>
                  <td className="px-5 py-3.5">
                    <button type="button" className="text-xs text-green-500 hover:text-green-300 transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

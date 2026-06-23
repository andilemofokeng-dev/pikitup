"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Globe, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type ArticleStatus = "published" | "draft" | "scheduled";

interface Article {
  id: string; title: string; slug: string; category: string;
  status: ArticleStatus; author: string; publishedAt?: string | null;
  updatedAt: string; views: number;
}

const STATUS_STYLES: Record<ArticleStatus, string> = {
  published: "bg-green-900/30 text-green-400 border-green-800/30",
  draft:     "bg-yellow-900/30 text-yellow-400 border-yellow-800/30",
  scheduled: "bg-blue-900/30 text-blue-400 border-blue-800/30",
};
const STATUS_ICONS: Record<ArticleStatus, React.ElementType> = {
  published: Globe, draft: Edit2, scheduled: Clock,
};

const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN ?? "";

export default function ArticlesPage() {
  const [articles, setArticles]     = useState<Article[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState<ArticleStatus | "">("");
  const [deleting, setDeleting]     = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/cms/articles");
      const json = await res.json() as { articles: Article[] };
      setArticles(json.articles ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/cms/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${CMS_TOKEN}` },
    });
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  }

  const filtered = articles.filter((a) => {
    const s = !search || a.title.toLowerCase().includes(search.toLowerCase());
    const f = !statusFilter || a.status === statusFilter;
    return s && f;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatus(e.target.value as ArticleStatus | "")}
          aria-label="Filter by status"
          className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <button type="button" onClick={fetchArticles}
          className="p-2.5 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors" title="Refresh">
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>
        <Link href="/cms-portal/articles/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-violet-900/30"
        >
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-600 text-sm gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Loading articles…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-600 text-sm">
            {search || statusFilter ? "No articles match your filters." : "No articles yet. Create your first article."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  {["Title","Category","Status","Author","Published","Views",""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((a) => {
                  const Icon = STATUS_ICONS[a.status];
                  return (
                    <tr key={a.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-5 py-3.5 max-w-72">
                        <p className="font-medium text-white line-clamp-1">{a.title}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5 font-mono">/news/{a.slug}</p>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{a.category}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit capitalize", STATUS_STYLES[a.status])}>
                          <Icon className="w-2.5 h-2.5" />{a.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400 whitespace-nowrap">{a.author}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("en-ZA") : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{a.views > 0 ? a.views.toLocaleString() : "—"}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/cms-portal/articles/${a.id}`}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button type="button" onClick={() => handleDelete(a.id)} disabled={deleting === a.id}
                            className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-40" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 text-right">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}

"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Globe, Trash2, Eye } from "lucide-react";
import { apiUrl } from "@/lib/base-path";

const CATEGORIES = ["Initiative","Corporate","Infrastructure","Environment","Report","Operations","Education","Safety","Alert","News","Service Notice","Campaign"];
const REGIONS    = ["All","Region A","Region B","Region C","Region D","Region E","Region F","Region G"];
const CMS_TOKEN  = process.env.NEXT_PUBLIC_CMS_TOKEN ?? "";

interface ArticleForm {
  title: string; slug: string; category: string; excerpt: string;
  body: string; status: "draft" | "published" | "scheduled"; author: string;
  region: string; tags: string; imageUrl: string;
}

const EMPTY: ArticleForm = {
  title: "", slug: "", category: "News", excerpt: "", body: "",
  status: "draft", author: "Ayanda Mahlangu", region: "All", tags: "", imageUrl: "",
};

export default function ArticleEditorPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const isNew    = id === "new";

  const [form, setForm]     = useState<ArticleForm>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState("");
  const [notFound, setNotFound] = useState(false);

  // Load existing article
  useEffect(() => {
    if (isNew) return;
    fetch(apiUrl(`/api/cms/articles/${id}`))
      .then((r) => r.json())
      .then((json) => {
        if (!json.article) { setNotFound(true); return; }
        const a = json.article;
        setForm({
          title:    a.title,
          slug:     a.slug,
          category: a.category,
          excerpt:  a.excerpt,
          body:     a.body,
          status:   a.status,
          author:   a.author,
          region:   a.region ?? "All",
          tags:     a.tags ?? "",
          imageUrl: a.imageUrl ?? "",
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  function set(field: keyof ArticleForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleTitleChange(v: string) {
    setForm((f) => ({
      ...f,
      title: v,
      slug: isNew
        ? v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        : f.slug,
    }));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function save(publish = false) {
    if (!form.title.trim() || !form.slug.trim()) {
      showToast("Title and slug are required.");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      status: publish ? "published" : form.status,
    };

    try {
      const res = isNew
        ? await fetch(apiUrl("/api/cms/articles"), {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${CMS_TOKEN}` },
            body: JSON.stringify(payload),
          })
        : await fetch(apiUrl(`/api/cms/articles/${id}`), {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${CMS_TOKEN}` },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const err = await res.json() as { error?: string };
        showToast(err.error ?? "Save failed.");
        return;
      }
      const json = await res.json() as { article: { id: string } };
      showToast(publish ? "Published!" : "Saved.");
      if (isNew) router.replace(`/cms-portal/articles/${json.article.id}`);
      else setForm((f) => ({ ...f, status: publish ? "published" : f.status }));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this article permanently?")) return;
    await fetch(apiUrl(`/api/cms/articles/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${CMS_TOKEN}` },
    });
    router.push("/cms-portal/articles");
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-slate-600 text-sm">Loading…</div>
  );
  if (notFound) return (
    <div className="text-center py-20">
      <p className="text-slate-400 mb-4">Article not found.</p>
      <button type="button" onClick={() => router.push("/cms-portal/articles")} className="text-violet-400 hover:underline text-sm">
        ← Back to articles
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 border border-violet-700 text-violet-300 text-sm px-4 py-2.5 rounded-xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-lg font-black text-white">{isNew ? "New Article" : "Edit Article"}</h2>
        {!isNew && (
          <button type="button" onClick={handleDelete}
            className="ml-auto flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 border border-red-900/40 hover:bg-red-900/20 px-3 py-1.5 rounded-xl transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Title</label>
              <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Article title…"
                className="w-full bg-slate-800 border border-slate-700 text-white text-lg font-bold placeholder-slate-600 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Slug</label>
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus-within:border-violet-500 transition-colors">
                <span className="text-slate-600 text-sm shrink-0">/news/</span>
                <input value={form.slug} onChange={(e) => set("slug", e.target.value)}
                  aria-label="Slug" placeholder="article-slug"
                  className="flex-1 bg-transparent text-slate-300 text-sm outline-none font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Excerpt</label>
              <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3}
                placeholder="Brief summary shown on the news listing page…"
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Body Content</label>
              <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={14}
                placeholder="Write your article here (Markdown supported)…"
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none transition-colors font-mono leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">Publish</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Status</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                form.status === "published" ? "bg-green-900/30 text-green-400" :
                form.status === "scheduled" ? "bg-blue-900/30 text-blue-400" :
                "bg-yellow-900/30 text-yellow-400"
              }`}>
                {form.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => save(false)} disabled={saving}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl transition-colors disabled:opacity-50">
                <Save className="w-3.5 h-3.5" />{saving ? "Saving…" : "Save Draft"}
              </button>
              <button type="button" onClick={() => save(true)} disabled={saving}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold bg-violet-700 hover:bg-violet-600 text-white rounded-xl transition-colors disabled:opacity-50">
                <Globe className="w-3.5 h-3.5" />Publish
              </button>
            </div>
            {!isNew && (
              <a href={`/news/${form.slug}`} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                <Eye className="w-3.5 h-3.5" />View on website ↗
              </a>
            )}
          </div>

          {/* Meta */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">Metadata</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                aria-label="Category"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Region</label>
              <select value={form.region} onChange={(e) => set("region", e.target.value)}
                aria-label="Region"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Author</label>
              <input value={form.author} onChange={(e) => set("author", e.target.value)}
                aria-label="Author" placeholder="Author name"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Cover Image URL</label>
              <input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://…"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Tags</label>
              <input value={form.tags} onChange={(e) => set("tags", e.target.value)}
                placeholder="recycling, initiative, region-b…"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

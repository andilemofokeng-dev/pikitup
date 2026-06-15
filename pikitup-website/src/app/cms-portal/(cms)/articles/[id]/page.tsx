"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Globe, Eye } from "lucide-react";

const CATEGORIES = ["Initiative","Corporate","Infrastructure","Environment","Report","Operations","Education","Safety","Alert"];

export default function ArticleEditorPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const isNew   = id === "new";

  const [title, setTitle]     = useState(isNew ? "" : "Separation at Source Initiative Expanded to Region B");
  const [slug, setSlug]       = useState(isNew ? "" : "separation-source-region-b");
  const [category, setCat]    = useState("Initiative");
  const [excerpt, setExcerpt] = useState(isNew ? "" : "Pikitup is proud to announce the expansion of the Separation at Source programme into Region B — Johannesburg East, starting 1 July 2026.");
  const [body, setBody]       = useState(isNew ? "" : "Full article body goes here...");
  const [status, setStatus]   = useState<"draft"|"published">("draft");
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (isNew) setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""));
  }

  async function handleSave(publish = false) {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (publish) setStatus("published");
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-lg font-black text-white">{isNew ? "New Article" : "Edit Article"}</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Title</label>
              <input value={title} onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Article title…"
                className="w-full bg-slate-800 border border-slate-700 text-white text-lg font-bold placeholder-slate-600 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Slug</label>
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus-within:border-violet-500 transition-colors">
                <span className="text-slate-600 text-sm">/news/</span>
                <input value={slug} onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-transparent text-slate-300 text-sm outline-none font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
                placeholder="Brief summary shown on listing pages…"
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Body Content</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12}
                placeholder="Write your article here (Markdown supported)…"
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none transition-colors font-mono leading-relaxed"
              />
              <p className="text-[11px] text-slate-600 mt-1">Markdown is supported. Images can be uploaded via the media library.</p>
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
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status === "published" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}`}>
                {status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleSave(false)} disabled={saving}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl transition-colors disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />{saving ? "Saving…" : saved ? "Saved!" : "Save Draft"}
              </button>
              <button type="button" onClick={() => handleSave(true)} disabled={saving}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold bg-violet-700 hover:bg-violet-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                <Globe className="w-3.5 h-3.5" />Publish
              </button>
            </div>
            <button type="button" className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              <Eye className="w-3.5 h-3.5" />Preview
            </button>
          </div>

          {/* Meta */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">Metadata</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
              <select value={category} onChange={(e) => setCat(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Cover Image</label>
              <div className="bg-slate-800 border border-slate-700 border-dashed rounded-xl p-6 text-center text-xs text-slate-600 cursor-pointer hover:border-violet-600 hover:text-violet-400 transition-colors">
                Click to upload or drag & drop
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Tags</label>
              <input placeholder="recycling, initiative, region-b…"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

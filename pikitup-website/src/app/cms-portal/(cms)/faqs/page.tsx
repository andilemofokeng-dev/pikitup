"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ { id: string; question: string; answer: string; category: string; order: number; active: boolean; }

const MOCK_FAQS: FAQ[] = [
  { id:"f1", question:"What day is my rubbish collected?", answer:"Your collection day depends on your suburb. Use the Collection Schedule page on the Pikitup website, or check your area on our app.", category:"Collection", order:1, active:true },
  { id:"f2", question:"What should I do if my bins were not collected?", answer:"Report a missed collection online via our website or mobile app, or call 0800 00 7867. Please submit your report by 12:00 on your collection day.", category:"Collection", order:2, active:true },
  { id:"f3", question:"How do I register for the Separation at Source programme?", answer:"Contact your nearest Pikitup customer service centre or call 011 375 5455. You'll receive a kit with colour-coded bags.", category:"Recycling", order:1, active:true },
  { id:"f4", question:"Where can I report illegal dumping?", answer:"Use the 'Report a Problem' feature on our website or app, or call 0800 00 7867. Illegal dumping cases are prioritised.", category:"Reporting", order:1, active:true },
];

const CATEGORIES = ["Collection","Recycling","Reporting","Facilities","Business","General"];

export default function FaqsPage() {
  const [faqs, setFaqs]       = useState<FAQ[]>(MOCK_FAQS);
  const [expanded, setExp]    = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ question:"", answer:"", category:"Collection" });

  function addFaq() {
    if (!form.question || !form.answer) return;
    setFaqs([...faqs, { id:`f${Date.now()}`, ...form, order: faqs.length+1, active:true }]);
    setForm({ question:"", answer:"", category:"Collection" });
    setShowForm(false);
  }

  function toggleActive(id: string) {
    setFaqs(faqs.map((f) => f.id === id ? { ...f, active: !f.active } : f));
  }

  const grouped = CATEGORIES.reduce<Record<string, FAQ[]>>((acc, cat) => {
    const items = faqs.filter((f) => f.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button type="button" onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 rounded-2xl border border-violet-800/40 p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">New FAQ</h3>
          <input value={form.question} onChange={(e) => setForm({...form,question:e.target.value})} placeholder="Question…"
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
          <textarea value={form.answer} onChange={(e) => setForm({...form,answer:e.target.value})} rows={3} placeholder="Answer…"
            className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 resize-none transition-colors"
          />
          <select value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <div className="flex gap-3">
            <button type="button" onClick={addFaq} className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-800 bg-slate-800/50">
              <p className="font-semibold text-slate-300 text-sm">{cat}</p>
            </div>
            <div className="divide-y divide-slate-800">
              {items.map((f) => (
                <div key={f.id} className={f.active ? "" : "opacity-50"}>
                  <div className="flex items-center justify-between px-5 py-3.5 cursor-pointer" onClick={() => setExp(expanded === f.id ? null : f.id)}>
                    <p className="text-sm font-medium text-white flex-1 pr-4">{f.question}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <button type="button" onClick={(e) => { e.stopPropagation(); toggleActive(f.id); }}
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold border transition-colors"
                        style={{ background: f.active ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)", color: f.active ? "#4ade80" : "#6b7280", borderColor: f.active ? "rgba(74,222,128,0.3)" : "rgba(107,114,128,0.3)" }}
                      >
                        {f.active ? "Active" : "Hidden"}
                      </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); }} className="p-1 rounded hover:bg-slate-700 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setFaqs(faqs.filter((x) => x.id !== f.id)); }} className="p-1 rounded hover:bg-red-900/20 text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      {expanded === f.id ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </div>
                  </div>
                  {expanded === f.id && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-slate-400 leading-relaxed">{f.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

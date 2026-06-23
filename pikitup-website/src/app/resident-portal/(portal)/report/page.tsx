"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiSubmitComplaint } from "@/lib/api-client";
import type { Complaint } from "@/lib/types";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Camera, MapPin, ChevronRight } from "lucide-react";

const ISSUE_TYPES: { value: Complaint["type"]; label: string; icon: string; desc: string }[] = [
  { value: "missed-collection", label: "Missed Collection",  icon: "🚛", desc: "Your bin/bags were not collected on your scheduled day" },
  { value: "illegal-dumping",   label: "Illegal Dumping",    icon: "🚫", desc: "Waste has been dumped illegally in your area" },
  { value: "overflowing-bins",  label: "Overflowing Bins",   icon: "🗑️", desc: "Public bins are overflowing and need emptying" },
  { value: "street-not-swept",  label: "Street Not Swept",   icon: "🧹", desc: "Your street/pavement has not been cleaned" },
  { value: "waste-spillage",    label: "Waste Spillage",     icon: "⚠️", desc: "Waste has spilled from a collection vehicle" },
  { value: "general-complaint", label: "General Complaint",  icon: "💬", desc: "Any other waste-related issue" },
];

const STEP_LABELS = ["Select Issue", "Location & Details", "Review & Submit"];

export default function ReportIssuePage() {
  const { user } = useAuth();
  const [step, setStep]       = useState(0);
  const [type, setType]       = useState<Complaint["type"] | "">("");
  const [desc, setDesc]       = useState("");
  const [address, setAddress] = useState(user?.address ?? "");
  const [suburb, setSuburb]   = useState(user?.suburb ?? "");
  const [region, setRegion]   = useState(user?.region ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState<Complaint | null>(null);

  async function handleSubmit() {
    if (!user || !type) return;
    setSubmitting(true);
    try {
      const res = await apiSubmitComplaint({ type, description: desc, address, suburb, region, userId: user.id, priority: "medium" });
      setSubmitted(res.data);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return (
    <div className="max-w-lg mx-auto text-center py-12">
      <div className="w-20 h-20 bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-10 h-10 text-green-400" />
      </div>
      <h2 className="text-2xl font-black text-white mb-2">Case Submitted!</h2>
      <p className="text-gray-400 mb-2 text-sm">Your reference number is:</p>
      <p className="text-2xl font-black text-yellow-400 mb-6 font-mono">{submitted.referenceNumber}</p>
      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        Keep this reference number safe. You can track your case status in the portal. Our team will respond within 48 hours.
      </p>
      <div className="flex justify-center gap-3">
        <Link href={`/resident-portal/cases/${submitted.id}`}
          className="bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          Track This Case
        </Link>
        <Link href="/resident-portal/dashboard"
          className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-black text-white mb-1">Report a Waste Issue</h1>
        <p className="text-sm text-gray-500">Tell us about the problem and we&apos;ll dispatch a team.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                i < step ? "bg-green-500 border-green-500 text-white"
                  : i === step ? "bg-green-900/40 border-green-500 text-green-400"
                  : "bg-gray-800 border-gray-700 text-gray-600"
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-white" : "text-gray-600"}`}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-green-500" : "bg-gray-800"}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Issue type */}
      {step === 0 && (
        <div>
          <h2 className="text-sm font-bold text-white mb-4">What type of issue would you like to report?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {ISSUE_TYPES.map((t) => (
              <button
                key={t.value} type="button"
                onClick={() => { setType(t.value); setStep(1); }}
                className={`group text-left p-4 rounded-2xl border transition-all ${
                  type === t.value
                    ? "bg-green-900/30 border-green-600 text-white"
                    : "bg-gray-900 border-gray-800 hover:border-gray-600 text-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className="font-bold text-sm mb-1 group-hover:text-white transition-colors">{t.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setStep(0)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Change issue type</button>
            <span className="text-xs text-gray-700">|</span>
            <span className="text-xs text-green-400 font-semibold">
              {ISSUE_TYPES.find((t) => t.value === type)?.label}
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Describe the issue <span className="text-red-400">*</span>
            </label>
            <textarea
              required value={desc} onChange={(e) => setDesc(e.target.value)}
              rows={4} placeholder="Provide as much detail as possible — e.g. 'Bags were placed at kerb by 06:00 but not collected. This is the third week in a row.'"
              className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none transition-all text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Street Address <span className="text-gray-600">(pre-filled from your profile)</span>
            </label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
              placeholder="14 Oak Avenue" required
              className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none transition-all text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Suburb</label>
              <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} required
                className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Region</label>
              <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} required
                className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none transition-all text-sm" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
            <Camera className="w-5 h-5 text-gray-500 shrink-0" />
            <div>
              <p className="text-sm text-gray-300 font-medium">Add photos (optional)</p>
              <p className="text-xs text-gray-600">Photo uploads are available in the full release</p>
            </div>
          </div>

          <button
            type="button"
            disabled={!desc.trim() || !address || !suburb || !region}
            onClick={() => setStep(2)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Review & Submit <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Review */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-sm font-bold text-white">Review your report before submitting</h2>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 divide-y divide-gray-800">
            {[
              { label: "Issue Type",   value: ISSUE_TYPES.find((t) => t.value === type)?.label ?? type },
              { label: "Description", value: desc },
              { label: "Address",     value: address },
              { label: "Suburb",      value: suburb },
              { label: "Region",      value: region },
            ].map((row) => (
              <div key={row.label} className="px-5 py-3.5 flex gap-4">
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider w-28 shrink-0 pt-0.5">{row.label}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{row.value}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300/80 leading-relaxed">
              By submitting you confirm this is an accurate report. False reports may result in account suspension. Emergency: call <strong>0860 562874</strong>.
            </p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
              ← Edit
            </button>
            <button type="button" onClick={handleSubmit} disabled={submitting}
              className="flex-1 bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm">
              {submitting ? "Submitting…" : "Submit Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, Download, ExternalLink, FileText,
  Shield, BarChart3, TrendingUp, Award, BookOpen,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import AnnualReportCharts from "@/components/about/AnnualReportCharts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Annual Reports & Corporate Publications | Pikitup Johannesburg",
  description:
    "Access Pikitup Johannesburg's integrated annual reports, sustainability reports and corporate governance publications.",
};

const DOC_ICONS: Record<string, React.ElementType> = {
  Governance: Shield,
  Financial:  BarChart3,
  Strategic:  TrendingUp,
  Corporate:  FileText,
  default:    FileText,
};

const REPORT_ICONS = [Award, BarChart3, TrendingUp, FileText, BookOpen];

export default async function AnnualReportsPage() {
  let reports: Awaited<ReturnType<typeof prisma.annualReport.findMany>> = [];
  let docs:    Awaited<ReturnType<typeof prisma.corporateDocument.findMany>> = [];
  try {
    [reports, docs] = await Promise.all([
      prisma.annualReport.findMany({ orderBy: { order: "asc" } }),
      prisma.corporateDocument.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch (err) {
    console.error("[AnnualReports] DB error:", err);
  }

  const latest = reports.find(r => r.isLatest) ?? reports[0] ?? null;
  const older  = reports.filter(r => r.id !== latest?.id);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg,#0b2a18 0%,#0f3d22 50%,#0b2a18 100%)",
        position: "relative", overflow: "hidden",
      }} className="py-24 px-4">
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.024) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: -80, right: "10%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(240,180,41,0.06) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm mb-8" style={{ color: "rgba(255,255,255,0.38)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "rgba(255,255,255,0.75)" }}>Annual Reports</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div style={{
                  background: "rgba(240,180,41,0.12)", border: "1px solid rgba(240,180,41,0.3)",
                  borderRadius: 12, width: 48, height: 48,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <BookOpen className="w-6 h-6" style={{ color: "#f0b429" }} />
                </div>
                <span style={{ color: "#f0b429", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Corporate Publications
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Annual Reports &amp;<br />
                <span style={{ color: "#f0b429" }}>Publications</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }} className="text-base">
                Pikitup&apos;s integrated annual reports, corporate publications and governance
                documents — our commitment to transparency and accountability to the City of
                Johannesburg and the residents we serve.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: String(reports.length), label: "Annual Reports" },
                { value: String(docs.length),    label: "Corporate Docs" },
                { value: "25+",                  label: "Years of Service" },
              ].map(({ value, label }) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "20px 16px", textAlign: "center",
                }}>
                  <p style={{ color: "#f0b429", fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}>{value}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", marginTop: 6, textTransform: "uppercase" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Report (featured) ──────────────────────────────────────── */}
      {latest && (
        <section style={{ background: "#f8faf9" }} className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <div style={{ width: 24, height: 3, background: "#16a34a", borderRadius: 2 }} />
              <span style={{ color: "#16a34a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Integrated Annual Reports
              </span>
            </div>

            {/* Featured card */}
            <div style={{
              background: "linear-gradient(135deg,#0b2a18 0%,#0f3d22 60%,#0b2a18 100%)",
              border: "1px solid rgba(240,180,41,0.25)", borderRadius: 24,
              padding: "40px", position: "relative", overflow: "hidden",
            }} className="mb-8">
              <div aria-hidden="true" style={{
                position: "absolute", top: -60, right: -60,
                width: 280, height: 280,
                background: "radial-gradient(circle, rgba(240,180,41,0.08) 0%, transparent 65%)",
                borderRadius: "50%",
              }} />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{
                      background: "linear-gradient(90deg,#92680a,#f0b429,#92680a)",
                      color: "#0a0a00", fontSize: "10px", fontWeight: 900, letterSpacing: "0.12em",
                      padding: "4px 14px", borderRadius: 999,
                    }}>
                      LATEST
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{latest.type}</span>
                  </div>
                  <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(1.4rem,3vw,2rem)", lineHeight: 1.25, marginBottom: 12 }}>
                    {latest.title}
                  </h2>
                  {latest.description && (
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: 24 }}>
                      {latest.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {latest.pdfUrl ? (
                      <a href={latest.pdfUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          background: "#f0b429", color: "#0a0a00",
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "12px 22px", borderRadius: 12, fontWeight: 800, fontSize: "0.85rem",
                          textDecoration: "none", transition: "opacity 0.15s",
                        }}
                        className="hover:opacity-90">
                        <Download className="w-4 h-4" /> Download PDF
                      </a>
                    ) : (
                      <span style={{ background: "rgba(240,180,41,0.15)", color: "rgba(255,255,255,0.4)", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 12, fontWeight: 700, fontSize: "0.85rem" }}>
                        <Download className="w-4 h-4" /> PDF Coming Soon
                      </span>
                    )}
                    {latest.viewUrl && (
                      <a href={latest.viewUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          border: "1px solid rgba(255,255,255,0.25)", color: "#fff",
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "12px 22px", borderRadius: 12, fontWeight: 700, fontSize: "0.85rem",
                          textDecoration: "none", transition: "background 0.15s",
                        }}
                        className="hover:bg-white/10">
                        <ExternalLink className="w-4 h-4" /> View Online
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{
                    width: 160, height: 200,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(240,180,41,0.2)",
                    borderRadius: 12, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 12,
                  }}>
                    <BookOpen className="w-12 h-12" style={{ color: "#f0b429", opacity: 0.8 }} />
                    <div style={{ textAlign: "center" }}>
                      <p style={{ color: "#f0b429", fontWeight: 900, fontSize: "1.6rem" }}>{latest.year}</p>
                      {latest.pages && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{latest.pages} pages</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Older reports grid */}
            {older.length > 0 && (
              <div className="grid md:grid-cols-3 gap-5">
                {older.map((r, i) => {
                  const Icon = REPORT_ICONS[i % REPORT_ICONS.length];
                  return (
                    <div key={r.id} style={{
                      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18,
                      padding: "24px", display: "flex", flexDirection: "column", gap: 16,
                      boxShadow: "0 1px 8px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s",
                    }} className="hover:shadow-lg">
                      <div className="flex items-start justify-between gap-3">
                        <div style={{ width: 44, height: 44, background: "#f0fdf4", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon className="w-5 h-5 text-green-700" />
                        </div>
                        <span style={{ color: "#6b7280", fontSize: "12px", fontWeight: 600 }}>{r.pages ? `${r.pages} pages` : ""}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: "#374151", fontWeight: 800, fontSize: "0.95rem", marginBottom: 4 }}>{r.year}</p>
                        <p style={{ color: "#6b7280", fontSize: "0.78rem", lineHeight: 1.65 }} className="line-clamp-2">{r.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {r.pdfUrl ? (
                          <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer"
                            style={{
                              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                              border: "1px solid #d1d5db", color: "#374151", borderRadius: 10,
                              padding: "8px 0", fontSize: "12px", fontWeight: 700, textDecoration: "none", transition: "all 0.15s",
                            }} className="hover:border-green-600 hover:text-green-700">
                            <Download className="w-3.5 h-3.5" /> PDF
                          </a>
                        ) : (
                          <span style={{ flex: 1, textAlign: "center", padding: "8px 0", fontSize: "12px", color: "#9ca3af" }}>PDF soon</span>
                        )}
                        {r.viewUrl && (
                          <a href={r.viewUrl} target="_blank" rel="noopener noreferrer"
                            style={{
                              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                              background: "#f0fdf4", color: "#166534", borderRadius: 10,
                              padding: "8px 0", fontSize: "12px", fontWeight: 700, textDecoration: "none", transition: "background 0.15s",
                            }} className="hover:bg-green-100">
                            <ExternalLink className="w-3.5 h-3.5" /> View
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {reports.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-semibold">No reports published yet.</p>
                <p className="text-sm mt-1">Check back soon or contact us for earlier reports.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <AnnualReportCharts />

      {/* ── Corporate Documents ───────────────────────────────────────────── */}
      {docs.length > 0 && (
        <section style={{ background: "#fff", borderTop: "1px solid #f3f4f6" }} className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-10">
              <div style={{ width: 24, height: 3, background: "#16a34a", borderRadius: 2 }} />
              <span style={{ color: "#16a34a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Other Documents
              </span>
            </div>
            <h2 style={{ color: "#111827", fontWeight: 900, fontSize: "1.5rem", marginBottom: 32 }}>Corporate Documents</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {docs.map((doc) => {
                const Icon = DOC_ICONS[doc.category] ?? DOC_ICONS.default;
                return (
                  <div key={doc.id} style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 16,
                    padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12,
                    transition: "all 0.2s", cursor: doc.fileUrl ? "pointer" : "default",
                  }} className="hover:shadow-md hover:border-green-200">
                    <div style={{ width: 44, height: 44, background: "#f0fdf4", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon className="w-5 h-5 text-green-700" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#111827", fontWeight: 700, fontSize: "0.88rem", marginBottom: 6 }}>{doc.title}</p>
                      <p style={{ color: "#6b7280", fontSize: "0.78rem", lineHeight: 1.65 }}>{doc.description}</p>
                    </div>
                    {doc.fileUrl ? (
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          color: "#166534", fontSize: "12px", fontWeight: 700, textDecoration: "none",
                        }} className="hover:text-green-900">
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    ) : (
                      <span style={{ color: "#9ca3af", fontSize: "11px" }}>Available on request</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Commitment to transparency ────────────────────────────────────── */}
      <section style={{ background: "#071409" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div style={{
            width: 56, height: 56, background: "rgba(240,180,41,0.12)",
            border: "1px solid rgba(240,180,41,0.3)", borderRadius: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Shield className="w-7 h-7" style={{ color: "#f0b429" }} />
          </div>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "1.6rem", marginBottom: 12 }}>
            Commitment to Transparency
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontSize: "0.9rem", marginBottom: 28 }}>
            As a City-owned entity, Pikitup is committed to full transparency and accountability
            to the residents of Johannesburg. All reports are submitted to the Shareholder
            Representative and tabled in the City Council.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/about/governance"
              style={{ background: "#fff", color: "#14532d" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
              Corporate Governance
            </Link>
            <Link href="/contact"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
              PAIA Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

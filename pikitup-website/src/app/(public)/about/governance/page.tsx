"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight, Shield, Users, FileText, CheckCircle2,
  Scale, Eye, Briefcase, Building2, Globe2, Star,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BOARD = [
  { name: "Maxwell Nedzamba", title: "Chairperson",            initials: "MN", isChair: true,  img: "https://pikitup.co.za/wp-content/uploads/maxwell-Nedzamba-970x1449_c.jpg" },
  { name: "N.S. Marota",      title: "Non-Executive Director", initials: "NM", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/ntona-marota-970x1449_c.jpg" },
  { name: "M.M. Ndlhovu",     title: "Non-Executive Director", initials: "MN", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/marvelous-ndlhovu-970x1447_c.jpg" },
  { name: "S.P. Mkhonto",     title: "Non-Executive Director", initials: "SM", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/sebenzile-mkhonto-970x1451_c.jpg" },
  { name: "O. Maseng",        title: "Non-Executive Director", initials: "OM", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/otsile-maseng-970x1449_c.jpg" },
  { name: "N. Sekoba",        title: "Non-Executive Director", initials: "NS", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/ndivhuho-sekoba-970x1451_c.jpg" },
  { name: "S. Shi",           title: "Non-Executive Director", initials: "SS", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/simon-hai-shi-970x1453_c.jpg" },
  { name: "T.M. Mokwena",     title: "Non-Executive Director", initials: "TM", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/thabo-mokwena-970x1453_c.jpg" },
  { name: "M. Radebe",        title: "Non-Executive Director", initials: "MR", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/malewa-radebe-970x1453_c.jpg" },
  { name: "K. Mogagole",      title: "Non-Executive Director", initials: "KM", isChair: false, img: "https://pikitup.co.za/wp-content/uploads/khumo-mogagole-970x1452_c.jpg" },
];

const IAC = [
  { name: "Sipho Sibeko",     initials: "SS", role: "Independent Audit Committee Member" },
  { name: "Sajidah Gaffoor",  initials: "SG", role: "Independent Audit Committee Member" },
  { name: "Euginia Motloung", initials: "EM", role: "Independent Audit Committee Member" },
  { name: "Seshoka Muila",    initials: "SM", role: "Independent Audit Committee Member" },
];

const COMMITTEES = [
  { icon: Eye,        name: "Audit and Risk Committee",   role: "Oversight of financial reporting, internal controls, risk management and external audit." },
  { icon: Users,      name: "Social and Ethics Committee", role: "Monitors the company's social, ethical, transformation, safety and environmental performance." },
  { icon: Briefcase,  name: "Remuneration Committee",     role: "Reviews and recommends remuneration policies for executive management and the board." },
  { icon: Building2,  name: "Tender Committee",           role: "Provides oversight of supply chain management and ensures procurement compliance." },
];

const LEGISLATION = [
  "Companies Act 71 of 2008",
  "Municipal Systems Act 32 of 2000",
  "Municipal Finance Management Act 56 of 2003",
  "National Environmental Management: Waste Act 59 of 2008",
  "Occupational Health and Safety Act 85 of 1993",
  "Broad-Based Black Economic Empowerment Act 53 of 2003",
  "Promotion of Access to Information Act (PAIA)",
  "Protection of Personal Information Act (POPIA)",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DirectorCard({ name, title, initials, isChair, img }: typeof BOARD[0]) {
  return (
    <div style={{
      background: isChair ? "#12100a" : "#0c1a11",
      border: isChair ? "1px solid rgba(240,180,41,0.5)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      overflow: "hidden",
      position: "relative",
      boxShadow: isChair
        ? "0 0 0 1px rgba(240,180,41,0.12), 0 16px 48px rgba(0,0,0,0.6)"
        : "0 4px 24px rgba(0,0,0,0.4)",
      transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex", flexDirection: "column",
    }}
      className="hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Chairperson ribbon */}
      {isChair && (
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          zIndex: 10,
          background: "linear-gradient(90deg,#92680a,#f0b429,#92680a)",
          color: "#0a0a00", fontSize: "9px", fontWeight: 900,
          padding: "4px 20px", borderRadius: "0 0 10px 10px",
          letterSpacing: "0.14em", whiteSpace: "nowrap",
        }}>
          CHAIRPERSON
        </div>
      )}

      {/* Photo */}
      <div style={{ position: "relative", paddingTop: "115%", overflow: "hidden", background: "#1a2a1e" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top center",
            transition: "transform 0.4s ease",
          }}
          className="hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
          }}
        />
        {/* Fallback initials (hidden unless image fails) */}
        <div style={{
          display: "none", position: "absolute", inset: 0,
          alignItems: "center", justifyContent: "center",
          background: isChair ? "linear-gradient(135deg,#b8860b,#f0b429)" : "linear-gradient(135deg,#14402a,#1a5234)",
          fontSize: 32, fontWeight: 900,
          color: isChair ? "#0a0800" : "rgba(255,255,255,0.9)",
        }}>
          {initials}
        </div>
        {/* Gradient overlay at bottom of photo */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }} />
        {/* Gold border for chair */}
        {isChair && (
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: "inset 0 0 0 2px rgba(240,180,41,0.4)",
            borderRadius: 0, pointerEvents: "none",
          }} />
        )}
      </div>

      {/* Name / title */}
      <div style={{ padding: "14px 16px 16px", textAlign: "center" }}>
        <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4, lineHeight: 1.3 }}>
          {name}
        </p>
        <p style={{
          color: isChair ? "#f0b429" : "rgba(255,255,255,0.4)",
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}>
          {title}
        </p>
      </div>
    </div>
  );
}

function IacCard({ name, initials }: typeof IAC[0]) {
  return (
    <div style={{
      background: "linear-gradient(145deg,#0a1828,#070f1c)",
      border: "1px solid rgba(99,179,237,0.2)",
      borderRadius: 18, padding: "28px 20px 24px",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      transition: "transform 0.2s",
    }}
      className="hover:scale-[1.03]"
    >
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        background: "linear-gradient(135deg,#1e40af,#3b82f6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, fontWeight: 900, color: "rgba(255,255,255,0.95)",
        border: "2px solid rgba(99,179,237,0.35)",
        boxShadow: "0 0 20px rgba(59,130,246,0.2)",
        marginBottom: 16,
      }}>
        {initials}
      </div>
      <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.88rem", marginBottom: 8 }}>
        {name}
      </p>
      <span style={{
        background: "rgba(59,130,246,0.15)",
        border: "1px solid rgba(99,179,237,0.28)",
        color: "#93c5fd",
        fontSize: "9px", fontWeight: 800, letterSpacing: "0.1em",
        padding: "4px 12px", borderRadius: 999,
        textTransform: "uppercase",
      }}>
        IAC Member
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "governance" | "board" | "iac";

export default function GovernancePage() {
  const [tab, setTab] = useState<Tab>("governance");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg,#0b2a18 0%,#0f3d22 50%,#0b2a18 100%)",
        position: "relative", overflow: "hidden",
      }} className="py-20 px-4">
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.024) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 300,
          background: "radial-gradient(ellipse, rgba(240,180,41,0.07) 0%, transparent 70%)",
        }} />
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm mb-8" style={{ color: "rgba(255,255,255,0.38)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "rgba(255,255,255,0.75)" }}>Corporate Governance</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div style={{
                  background: "rgba(240,180,41,0.12)", border: "1px solid rgba(240,180,41,0.3)",
                  borderRadius: 12, width: 48, height: 48,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Shield className="w-6 h-6" style={{ color: "#f0b429" }} />
                </div>
                <span style={{ color: "#f0b429", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Corporate Governance
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Governed with<br />
                <span style={{ color: "#f0b429" }}>Integrity &amp; Purpose</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }} className="text-sm mb-6">
                Pikitup&apos;s governance framework ensures accountability, transparency and ethical
                conduct at every level — applying the King IV™ principles in the public sector context
                and answering to the City of Johannesburg as Shareholder.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/about/annual-reports"
                  style={{ background: "#fff", color: "#14532d" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                  <FileText className="w-4 h-4" /> Annual Reports
                </Link>
                <Link href="/contact"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                  PAIA Request
                </Link>
              </div>
            </div>

            {/* Vision card */}
            <div style={{
              background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(240,180,41,0.22)", borderRadius: 20, padding: "28px",
            }}>
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className="w-4 h-4" style={{ color: "#f0b429" }} />
                <span style={{ color: "#f0b429", fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Our Vision
                </span>
              </div>
              <blockquote style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", lineHeight: 1.55, marginBottom: 16 }}>
                &ldquo;To be the leading integrated waste management company in Africa and be
                considered amongst the best in the World.&rdquo;
              </blockquote>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.8rem", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14 }}>
                Pikitup is a wholly owned entity of the City of Johannesburg. Our vision is
                derived from the City&apos;s aspiration to be{" "}
                <em style={{ color: "rgba(255,255,255,0.75)" }}>&ldquo;a World Class African City&rdquo;</em>
                {" "}— committing Pikitup to achieving optimal performance through continuous
                improvement and being the best waste management company in Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Internal tab navigation ───────────────────────────────────────── */}
      <div style={{ background: "#0a1a0f", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 64, zIndex: 30 }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none">
            {([
              { key: "governance", label: "Governance",             icon: Shield },
              { key: "board",      label: "Board of Directors",     icon: Star  },
              { key: "iac",        label: "Independent Audit Committee", icon: Scale },
            ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                style={{
                  color: tab === key ? "#f0b429" : "rgba(255,255,255,0.42)",
                  borderBottom: tab === key ? "2px solid #f0b429" : "2px solid transparent",
                  background: "none", cursor: "pointer",
                  padding: "16px 20px", fontSize: "13px", fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 8,
                  whiteSpace: "nowrap", transition: "all 0.2s",
                }}
                className="hover:text-white shrink-0"
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: GOVERNANCE
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "governance" && (
        <>
          {/* Mandate text */}
          <section style={{ background: "#f8faf9" }} className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span style={{ color: "#16a34a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Strategic Mandate
                </span>
                <h2 style={{ color: "#111827", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: 8, marginBottom: 20 }}>
                  Delivering on Our Mandate
                </h2>
                <div style={{ color: "#4b5563", lineHeight: 1.85, fontSize: "0.95rem" }} className="space-y-4">
                  <p>
                    Pikitup will continue to deliver on its mandate to provide sustainable integrated
                    waste management services whilst introducing a shift towards addressing the
                    imperatives of the{" "}
                    <strong style={{ color: "#1f2937" }}>Growth and Development Strategy (GDS 2040)</strong>,
                    as part of changing course. The new model is being implemented incrementally, starting
                    in the Zondi depot area, with the Soweto area to be fully incorporated thereafter, and
                    additional areas across the city incorporated as the programme unfolds.
                  </p>
                  <p>
                    Pikitup&apos;s approach to changing course is informed by the GDS paradigm, which
                    responds to the global, national and regional challenges of{" "}
                    <strong style={{ color: "#1f2937" }}>climate change</strong>, resource constraints, and
                    the triple challenge of poverty, unemployment and inequality — as well as improving the
                    overall governance and compliance environment in the company.
                  </p>
                </div>
              </div>

              {/* GDS tags */}
              <div className="flex flex-wrap gap-2 mb-12">
                {["GDS 2040 Aligned", "Climate Action", "King IV™ Compliant", "MFMA Governed", "Circular Economy"].map((tag) => (
                  <span key={tag} style={{
                    background: "#dcfce7", color: "#166534",
                    border: "1px solid #bbf7d0",
                    padding: "5px 14px", borderRadius: 999, fontSize: "12px", fontWeight: 600,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Principles grid */}
              <div className="mb-4">
                <h3 style={{ color: "#111827", fontWeight: 800, fontSize: "1.3rem", marginBottom: 20 }}>
                  Governance Principles
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: Shield,       title: "Accountability",  desc: "Pikitup is accountable to the City of Johannesburg as Shareholder and to the residents it serves." },
                    { icon: Eye,          title: "Transparency",    desc: "We publish annual reports, performance scorecards and financial statements in the public interest." },
                    { icon: Scale,        title: "Compliance",      desc: "We comply with the Companies Act, Municipal Finance Management Act, PFMA and all sector legislation." },
                    { icon: CheckCircle2, title: "Ethics",          desc: "Our Code of Ethics governs conduct at all levels and is enforced by the Social and Ethics Committee." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} style={{
                      background: "#fff", border: "1px solid #e5e7eb",
                      borderRadius: 16, padding: "24px",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                    }}>
                      <div style={{
                        width: 44, height: 44, background: "#f0fdf4",
                        borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 14,
                      }}>
                        <Icon className="w-5 h-5 text-green-700" />
                      </div>
                      <h4 style={{ color: "#111827", fontWeight: 700, marginBottom: 6, fontSize: "0.95rem" }}>{title}</h4>
                      <p style={{ color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Board Committees */}
          <section style={{ background: "#fff" }} className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h3 style={{ color: "#111827", fontWeight: 800, fontSize: "1.3rem", marginBottom: 6 }}>Board Committees</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 20 }}>
                Specialised committees support the Board in discharging its governance responsibilities.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {COMMITTEES.map(({ icon: Icon, name, role }) => (
                  <div key={name} style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: 14, padding: "20px",
                    display: "flex", gap: 16,
                  }}>
                    <div style={{
                      width: 40, height: 40, background: "#f0fdf4",
                      borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p style={{ color: "#111827", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>{name}</p>
                      <p style={{ color: "#6b7280", fontSize: "0.78rem", lineHeight: 1.65 }}>{role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Legislation */}
          <section style={{ background: "#071409" }} className="py-16 px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span style={{ color: "#86efac", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Legal Framework
                </span>
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", margin: "10px 0 14px" }}>
                  Legislation &amp; Compliance
                </h3>
                <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  Pikitup operates within a robust legislative framework that governs waste management,
                  municipal entities, finance, employment and environmental protection.
                </p>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18, padding: "24px",
              }}>
                <ul className="space-y-3">
                  {LEGISLATION.map((law) => (
                    <li key={law} className="flex items-start gap-2.5" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
                      {law}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: BOARD OF DIRECTORS
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "board" && (
        <section style={{ background: "#070f0a" }} className="py-20 px-4 min-h-[60vh]">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-4 h-4" style={{ color: "#f0b429" }} />
                <span style={{ color: "#f0b429", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Board of Directors
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Our Board of Directors
              </h2>
              <p style={{ color: "rgba(255,255,255,0.42)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75, fontSize: "0.88rem" }}>
                Appointed by the City of Johannesburg as Shareholder, the Board is responsible
                for strategic direction, oversight of management, and ensuring Pikitup fulfils
                its mandate to Greater Johannesburg.
              </p>
            </div>

            {/* Chairperson featured */}
            <div className="flex justify-center mb-8">
              <div style={{ maxWidth: 220, width: "100%" }}>
                <DirectorCard {...BOARD[0]} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                NON-EXECUTIVE DIRECTORS
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* NEDs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {BOARD.slice(1).map((d) => (
                <DirectorCard key={d.name} {...d} />
              ))}
            </div>

            {/* Stats strip */}
            <div style={{
              marginTop: 48,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "20px 32px",
              display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center",
            }}>
              {[
                { label: "Total Directors", value: "10" },
                { label: "Non-Executive",   value: "9"  },
                { label: "Chairperson",     value: "1"  },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p style={{ color: "#f0b429", fontSize: "1.75rem", fontWeight: 900, lineHeight: 1 }}>{value}</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", marginTop: 4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: INDEPENDENT AUDIT COMMITTEE
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "iac" && (
        <section style={{ background: "#060d17" }} className="py-20 px-4 min-h-[60vh]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Scale className="w-4 h-4" style={{ color: "#93c5fd" }} />
                <span style={{ color: "#93c5fd", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Independent Oversight
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Independent Audit Committee
              </h2>
              <p style={{ color: "rgba(255,255,255,0.42)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75, fontSize: "0.88rem" }}>
                The IAC provides independent oversight of Pikitup&apos;s financial reporting, internal
                controls and audit functions — operating at arm&apos;s length from management to
                protect the integrity of financial governance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {IAC.map((m) => (
                <IacCard key={m.name} {...m} />
              ))}
            </div>

            {/* Mandate box */}
            <div style={{
              marginTop: 40,
              background: "rgba(59,130,246,0.07)",
              border: "1px solid rgba(99,179,237,0.18)",
              borderRadius: 16, padding: "24px",
            }}>
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4" style={{ color: "#93c5fd" }} />
                <p style={{ color: "#93c5fd", fontWeight: 700, fontSize: "0.85rem" }}>IAC Mandate</p>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Review and recommend approval of annual financial statements",
                  "Oversight of internal and external audit processes",
                  "Review of internal controls and risk management framework",
                  "Assess the independence and performance of external auditors",
                  "Report findings to the Board of Directors and Shareholder",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#60a5fa" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

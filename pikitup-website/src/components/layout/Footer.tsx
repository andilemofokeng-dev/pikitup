import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";

const SERVICES = [
  { label: "Household Waste",  href: "/services/household" },
  { label: "Business Waste",   href: "/services/business" },
  { label: "Street Sweeping",  href: "/services/street-sweeping" },
  { label: "Garden Refuse",    href: "/services/garden-refuse" },
  { label: "Recycling",        href: "/services/recycling" },
  { label: "Landfill Sites",   href: "/services/landfill" },
];

const QUICK_LINKS = [
  { label: "Collection Schedule", href: "/collection-schedule" },
  { label: "Find a Facility",     href: "/find-facility" },
  { label: "Report a Problem",    href: "/report" },
  { label: "News & Notices",      href: "/news" },
  { label: "Tenders & RFQs",      href: "/tenders" },
  { label: "Careers",             href: "/careers" },
];

const PORTALS = [
  { label: "Resident Portal",     href: "/resident-portal" },
  { label: "Business Portal",     href: "/business-portal" },
  { label: "Staff Portal",        href: "/staff-portal" },
  { label: "Recycling Education", href: "/recycling-education" },
  { label: "About Pikitup",       href: "/about" },
  { label: "Contact Us",          href: "/contact" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/pikitup",
    hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_4px_14px_#1877F255] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/CleanerJoburg",
    hoverClass: "hover:bg-black hover:border-black hover:shadow-[0_4px_14px_#00000055] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@pikitup",
    hoverClass: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_4px_14px_#FF000055] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/27827791361",
    hoverClass: "hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_4px_14px_#25D36655] hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
];

function FooterLinkGroup({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 style={{ color: "#f0b429", letterSpacing: "0.12em" }}
        className="text-[11px] font-bold uppercase mb-5 flex items-center gap-2">
        <span style={{ display: "block", width: 20, height: 2, background: "#f0b429", borderRadius: 1 }} />
        {heading}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}
              className="group flex items-center gap-1.5 text-sm transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200"
                style={{ color: "inherit" }}>
                {link.label}
              </span>
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                style={{ color: "#f0b429" }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#070f0a" }} aria-label="Site footer">

      {/* ── Emergency hotline band ─────────────────────────────────────────── */}
      <div style={{ background: "#0c1a10", borderBottom: "1px solid rgba(240,180,41,0.18)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span style={{
              background: "linear-gradient(135deg,#b91c1c,#7f1d1d)",
              boxShadow: "0 0 12px rgba(185,28,28,0.5)",
            }} className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shrink-0 animate-pulse">
              URGENT
            </span>
            <span className="text-white text-sm font-semibold">
              Report Illegal Dumping
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href="tel:0860562874"
              className="flex items-center gap-2 font-black transition-opacity hover:opacity-80"
              style={{ color: "#f0b429", fontSize: "1.15rem" }}>
              <Phone className="w-4 h-4" />
              0860&nbsp;562874
            </a>
            <span style={{ color: "rgba(255,255,255,0.25)" }} className="hidden sm:block">·</span>
            <a href="tel:0113755555"
              className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              <Phone className="w-3.5 h-3.5" />
              011 375 5555
            </a>
            <span style={{ color: "rgba(255,255,255,0.25)" }} className="hidden sm:block">·</span>
            <a href="https://wa.me/27827791361" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
              style={{ color: "#25D366" }}>
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main body ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(160deg, #0b1e14 0%, #081209 60%, #070f0a 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        {/* Subtle pattern overlay */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* ── Brand column (spans 2 on lg) ── */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <Link href="/" className="inline-block mb-5">
                <span style={{
                  background: "rgba(255,255,255,0.96)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.12)",
                }} className="rounded-2xl px-5 py-2.5 inline-flex items-center">
                  <Image src="/pikitup/pikitup-logo.png" alt="Pikitup Johannesburg" width={130} height={44}
                    className="object-contain" style={{ blockSize: "40px", inlineSize: "auto" }} />
                </span>
              </Link>

              {/* Tagline */}
              <p style={{ color: "#f0b429" }}
                className="text-base font-bold italic mb-4 tracking-wide">
                &ldquo;We Do Better Together&rdquo;
              </p>

              {/* Description */}
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}
                className="text-sm mb-7 max-w-sm">
                Pikitup Johannesburg (SOC) Ltd is the official integrated waste
                management service provider to the City of Johannesburg —
                keeping our city clean, healthy and green.
              </p>

              {/* Contact list */}
              <ul className="space-y-3 mb-8">
                {[
                  { Icon: Phone, label: "Illegal Dumping", value: "0860 562874", href: "tel:0860562874", highlight: true },
                  { Icon: Phone, label: "Switchboard", value: "011 375 5555", href: "tel:0113755555", highlight: false },
                  { Icon: MessageSquare, label: "WhatsApp", value: "082 779 1361", href: "https://wa.me/27827791361", highlight: false },
                  { Icon: Mail, label: null, value: "info@pikitup.co.za", href: "mailto:info@pikitup.co.za", highlight: false },
                  { Icon: MapPin, label: null, value: "66 President Street, Johannesburg, 2000", href: null, highlight: false },
                ].map(({ Icon, label, value, href, highlight }, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span style={{
                      background: highlight ? "rgba(240,180,41,0.15)" : "rgba(255,255,255,0.06)",
                      color: highlight ? "#f0b429" : "rgba(255,255,255,0.35)",
                    }} className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:opacity-90"
                        style={{ color: highlight ? "#f0b429" : "rgba(255,255,255,0.55)" }}>
                        {label && <span style={{ color: "rgba(255,255,255,0.4)" }}>{label}: </span>}
                        <span className={highlight ? "font-bold" : ""}>{value}</span>
                      </a>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.45)" }}>
                        {label && <span style={{ color: "rgba(255,255,255,0.35)" }}>{label}: </span>}
                        {value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Social icons */}
              <div className="flex gap-2">
                {SOCIAL.map(({ label, href, hoverClass, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${hoverClass}`}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Link columns ── */}
            <FooterLinkGroup heading="Our Services" links={SERVICES} />
            <FooterLinkGroup heading="Quick Links"  links={QUICK_LINKS} />
            <FooterLinkGroup heading="Portals & Info" links={PORTALS} />
          </div>

          {/* ── Horizontal rule ── */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(240,180,41,0.25) 30%, rgba(240,180,41,0.25) 70%, transparent)", margin: "3.5rem 0 3rem" }} />

          {/* ── Stats band ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1.2M+", label: "Households served" },
              { value: "12",    label: "Operational depots" },
              { value: "1 500t", label: "Waste processed daily" },
              { value: "25+",   label: "Years of service" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p style={{ color: "#f0b429" }} className="text-2xl font-black tracking-tight">{value}</p>
                <p style={{ color: "rgba(255,255,255,0.38)" }} className="text-[11px] font-medium mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div style={{ background: "#050d07", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left — CoJ partnership */}
          <div className="flex items-center gap-3">
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </span>
            <p style={{ color: "rgba(255,255,255,0.32)" }} className="text-xs leading-snug">
              An official entity of the
              <span style={{ color: "rgba(255,255,255,0.55)" }} className="font-semibold"> City of Johannesburg </span>
              Metropolitan Municipality
            </p>
          </div>

          {/* Centre — copyright */}
          <p style={{ color: "rgba(255,255,255,0.25)" }} className="text-xs text-center order-last md:order-none">
            © {year} Pikitup Johannesburg (SOC) Ltd. All rights reserved.
          </p>

          {/* Right — legal links */}
          <div className="flex items-center gap-1">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Use",   href: "/terms" },
              { label: "Accessibility",  href: "/accessibility" },
            ].map(({ label, href }, i) => (
              <React.Fragment key={href}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.15)" }} className="text-xs px-0.5">·</span>}
                <Link href={href} style={{ color: "rgba(255,255,255,0.32)" }}
                  className="text-xs transition-colors hover:text-white px-1.5 py-1">
                  {label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

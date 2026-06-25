"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Phone, Mail, MapPin, MessageSquare, ArrowUpRight,
  Home, Building2, Wind, Leaf, Recycle, Layers,
  Calendar, AlertTriangle, Newspaper, FileText, Briefcase,
  UserCircle, Users, Info, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Data ───────────────────────────────────────────────────────────────────────

const SERVICES = [
  { label: "Household Waste",  href: "/services/household",      icon: Home,         color: "text-green-400  bg-green-400/15" },
  { label: "Business Waste",   href: "/services/business",       icon: Building2,    color: "text-blue-400   bg-blue-400/15" },
  { label: "Street Sweeping",  href: "/services/street-sweeping",icon: Wind,         color: "text-sky-400    bg-sky-400/15" },
  { label: "Garden Refuse",    href: "/services/garden-refuse",  icon: Leaf,         color: "text-emerald-400 bg-emerald-400/15" },
  { label: "Recycling",        href: "/services/recycling",      icon: Recycle,      color: "text-teal-400   bg-teal-400/15" },
  { label: "Landfill Sites",   href: "/services/landfill",       icon: Layers,       color: "text-gray-400   bg-gray-400/15" },
];

const QUICK_LINKS = [
  { label: "Collection Schedule", href: "/collection-schedule",       icon: Calendar,      color: "text-green-400   bg-green-400/15" },
  { label: "Find a Facility",     href: "/find-facility",             icon: MapPin,        color: "text-violet-400  bg-violet-400/15" },
  { label: "Report a Problem",    href: "/report",                    icon: AlertTriangle, color: "text-red-400     bg-red-400/15" },
  { label: "News & Notices",      href: "/news",                      icon: Newspaper,     color: "text-orange-400  bg-orange-400/15" },
  { label: "Tenders & RFQs",     href: "/tenders",                   icon: FileText,      color: "text-amber-400   bg-amber-400/15" },
  { label: "Careers",             href: "/careers",                   icon: Briefcase,     color: "text-sky-400     bg-sky-400/15" },
];

const PORTALS = [
  { label: "Resident Portal",     href: "/resident-portal",     icon: UserCircle, color: "text-green-400   bg-green-400/15" },
  { label: "Business Portal",     href: "/business-portal",     icon: Building2,  color: "text-blue-400    bg-blue-400/15" },
  { label: "Staff Portal",        href: "/staff-portal",        icon: Users,      color: "text-orange-400  bg-orange-400/15" },
  { label: "Recycling Education", href: "/recycling-education", icon: Recycle,    color: "text-teal-400    bg-teal-400/15" },
  { label: "About Pikitup",       href: "/about",               icon: Info,       color: "text-violet-400  bg-violet-400/15" },
  { label: "Contact Us",          href: "/contact",             icon: Phone,      color: "text-rose-400    bg-rose-400/15" },
];

const SOCIAL = [
  {
    label: "Facebook", href: "https://www.facebook.com/pikitup",
    hoverBg: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/40",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "X / Twitter", href: "https://twitter.com/CleanerJoburg",
    hoverBg: "hover:bg-black hover:border-black hover:text-white hover:shadow-lg hover:shadow-black/40",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "YouTube", href: "https://www.youtube.com/@pikitup",
    hoverBg: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white hover:shadow-lg hover:shadow-[#FF0000]/40",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    label: "WhatsApp", href: "https://wa.me/27827791361",
    hoverBg: "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/40",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
  },
];

const STATS = [
  { value: "1.2M+", label: "Households Served" },
  { value: "12",    label: "Operational Depots" },
  { value: "1,500t",label: "Waste Processed Daily" },
  { value: "25+",   label: "Years of Service" },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const linkItem = {
  hidden:  { opacity: 0, x: -10 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.055, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function FooterColumn({
  heading,
  links,
  delay = 0,
}: {
  heading: string;
  links: { label: string; href: string; icon: React.ElementType; color: string }[];
  delay?: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
    >
      {/* Column heading */}
      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-400 mb-5 flex items-center gap-2">
        <span className="block w-5 h-0.5 bg-amber-400 rounded-full" />
        {heading}
      </h3>

      <ul className="space-y-2">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
            <motion.div
              variants={linkItem}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <Link
                href={link.href}
                className="group flex items-center gap-2.5 text-sm text-green-200/60 hover:text-white transition-all duration-200"
              >
                <span className={cn("w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110", link.color)}>
                  <Icon className="w-3 h-3" />
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                  {link.label}
                </span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 text-amber-400 ml-auto" />
              </Link>
            </motion.div>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.5}
      className="relative group text-center px-4 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-amber-400/30 transition-all duration-300"
    >
      <motion.p
        className="text-2xl font-black text-amber-400 tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.08, type: "spring", stiffness: 280, damping: 22 }}
      >
        {value}
      </motion.p>
      <p className="text-[11px] font-semibold text-green-300/50 mt-1 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────

export default function Footer() {
  const year       = new Date().getFullYear();
  const brandRef   = useRef(null);
  const brandInView = useInView(brandRef, { once: true, margin: "-60px" });

  return (
    <footer className="bg-gradient-to-b from-green-800 via-green-900 to-green-950" aria-label="Site footer">

      {/* ── Emergency hotline band ── */}
      <div className="bg-green-950/60 border-b border-amber-400/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shrink-0 shadow-lg shadow-red-600/40"
            >
              URGENT
            </motion.span>
            <span className="text-white text-sm font-semibold">Report Illegal Dumping</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href="tel:0860562874" className="flex items-center gap-2 font-black text-amber-400 text-base hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4" /> 0860&nbsp;562874
            </a>
            <span className="hidden sm:block text-white/20">·</span>
            <a href="tel:0113755555" className="flex items-center gap-2 font-semibold text-white/60 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" /> 011 375 5555
            </a>
            <span className="hidden sm:block text-white/20">·</span>
            <a href="https://wa.me/27827791361" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-[#25D366] hover:text-emerald-300 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="relative overflow-hidden">
        {/* Dot pattern overlay */}
        <div aria-hidden className="absolute inset-0 pointer-events-none [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Ambient glow top-right */}
        <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* ── Brand column ── */}
            <motion.div
              ref={brandRef}
              className="lg:col-span-2"
              variants={fadeUp}
              initial="hidden"
              animate={brandInView ? "visible" : "hidden"}
            >
              <Link href="/" className="inline-block mb-6">
                <span className="bg-white rounded-2xl px-5 py-3 inline-flex items-center shadow-xl shadow-black/30 ring-1 ring-white/20">
                  <Image src="/pikitup-logo.png" alt="Pikitup Johannesburg" width={130} height={44}
                    className="object-contain" style={{ blockSize: "38px", inlineSize: "auto" }} />
                </span>
              </Link>

              <p className="text-amber-400 text-base font-bold italic mb-3 tracking-wide">
                &ldquo;We Do Better Together&rdquo;
              </p>
              <p className="text-green-200/55 text-sm leading-relaxed mb-7 max-w-sm">
                Pikitup Johannesburg (SOC) Ltd is the official integrated waste management
                service provider to the City of Johannesburg — keeping our city clean,
                healthy and green.
              </p>

              {/* Contact list */}
              <ul className="space-y-3 mb-8">
                {[
                  { Icon: Phone,        label: "Illegal Dumping", value: "0860 562874",               href: "tel:0860562874",                accent: true,  iconColor: "text-amber-400 bg-amber-400/15" },
                  { Icon: Phone,        label: "Switchboard",     value: "011 375 5555",              href: "tel:0113755555",                accent: false, iconColor: "text-green-400 bg-green-400/10" },
                  { Icon: MessageSquare,label: "WhatsApp",        value: "082 779 1361",              href: "https://wa.me/27827791361",     accent: false, iconColor: "text-emerald-400 bg-emerald-400/10" },
                  { Icon: Mail,         label: null,              value: "info@pikitup.co.za",        href: "mailto:info@pikitup.co.za",     accent: false, iconColor: "text-sky-400 bg-sky-400/10" },
                  { Icon: MapPin,       label: null,              value: "66 President Street, JHB",  href: null,                           accent: false, iconColor: "text-rose-400 bg-rose-400/10" },
                ].map(({ Icon, label, value, href, accent, iconColor }, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", iconColor)}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={cn("transition-colors hover:text-white", accent ? "text-amber-400 font-bold" : "text-green-200/60")}>
                        {label && <span className="text-green-200/35 font-normal">{label}: </span>}
                        {value}
                      </a>
                    ) : (
                      <span className="text-green-200/50">
                        {label && <span className="text-green-200/35">{label}: </span>}
                        {value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Social */}
              <div className="flex gap-2">
                {SOCIAL.map(({ label, href, hoverBg, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-250",
                      "bg-white/8 border border-white/12 text-white/60",
                      hoverBg
                    )}>
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Link columns ── */}
            <FooterColumn heading="Our Services"  links={SERVICES}     delay={0} />
            <FooterColumn heading="Quick Links"   links={QUICK_LINKS}  delay={0.5} />
            <FooterColumn heading="Portals & Info" links={PORTALS}     delay={1} />
          </div>

          {/* ── Divider ── */}
          <div className="my-14 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label }, i) => (
              <StatCard key={label} value={value} label={label} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-green-950/70 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-white/35" />
            </span>
            <p className="text-xs text-white/35 leading-snug">
              An official entity of the{" "}
              <span className="text-white/55 font-semibold">City of Johannesburg</span>{" "}
              Metropolitan Municipality
            </p>
          </div>

          <p className="text-xs text-white/25 text-center order-last md:order-none">
            © {year} Pikitup Johannesburg (SOC) Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Use",   href: "/terms" },
              { label: "Accessibility",  href: "/accessibility" },
            ].map(({ label, href }, i) => (
              <React.Fragment key={href}>
                {i > 0 && <span className="text-white/15 text-xs px-0.5">·</span>}
                <Link href={href} className="text-xs text-white/30 hover:text-white/70 transition-colors px-1.5 py-1">
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

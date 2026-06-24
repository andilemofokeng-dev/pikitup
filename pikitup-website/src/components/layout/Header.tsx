"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu, X, ChevronDown, Phone,
  UserCircle, Building2, Users, Shield, FileText, Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About",               href: "/about" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "Household Waste Collection", href: "/services/household" },
      { label: "Business Waste Services",    href: "/services/business" },
      { label: "Street Sweeping",            href: "/services/street-sweeping" },
      { label: "Garden Refuse",              href: "/services/garden-refuse" },
      { label: "Recycling Services",         href: "/services/recycling" },
      { label: "Landfill Disposal",          href: "/services/landfill" },
    ],
  },
  { label: "Collection Schedule", href: "/collection-schedule" },
  { label: "Find a Facility",     href: "/find-facility" },
  { label: "Report a Problem",    href: "/report" },
  { label: "News & Notices",      href: "/news" },
  {
    label: "More", href: "#",
    children: [
      { label: "Recycling Education", href: "/recycling-education" },
      { label: "Tenders & RFQs",      href: "/tenders" },
      { label: "Careers",             href: "/careers" },
      { label: "Contact Us",          href: "/contact" },
    ],
  },
];

// Portal links shown in nav dropdown + mobile menu
const portalLinks = [
  {
    label: "Resident Portal",
    desc:  "Track collections & complaints",
    href:  "/resident-portal/login",
    icon:  UserCircle,
    color: "text-green-600 bg-green-50",
  },
  {
    label: "Business Portal",
    desc:  "Business waste services",
    href:  "/business-portal/login",
    icon:  Building2,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Staff Portal",
    desc:  "Operations & complaint management",
    href:  "/staff-portal/login",
    icon:  Users,
    color: "text-orange-600 bg-orange-50",
  },
  {
    label: "Admin Portal",
    desc:  "System administration",
    href:  "/admin-portal/login",
    icon:  Shield,
    color: "text-red-600 bg-red-50",
  },
  {
    label: "Content Studio (CMS)",
    desc:  "Manage news, notices & tenders",
    href:  "/cms-portal/login",
    icon:  FileText,
    color: "text-violet-600 bg-violet-50",
  },
  {
    label: "Career Portal",
    desc:  "Jobs, vacancies & applications",
    href:  "/career-portal/login",
    icon:  Briefcase,
    color: "text-emerald-600 bg-emerald-50",
  },
];

const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]       = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Top utility bar ── */}
      <div className="bg-green-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Hotline — always visible, label hidden on xs */}
          <span className="flex items-center gap-1.5 text-green-300">
            <Phone className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Illegal Dumping:</span>
            <strong className="text-white">0860 562874</strong>
          </span>

          {/* Portal quick-links — hidden on mobile, visible md+ */}
          <div className="hidden md:flex items-center gap-3">
            {[
              { label: "Resident Portal", href: "/resident-portal/login" },
              { label: "Business Portal", href: "/business-portal/login" },
              { label: "Staff Login",     href: "/staff-portal/login" },
              { label: "Admin",           href: "/admin-portal/login" },
              { label: "CMS",             href: "/cms-portal/login" },
              { label: "Careers",         href: "/career-portal/login" },
            ].map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && <span className="text-green-700">|</span>}
                <Link href={link.href} className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100/80"
            : "bg-white shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <Image
                src="/pikitup/pikitup-logo.png"
                alt="Pikitup Johannesburg"
                width={120}
                height={44}
                className="object-contain"
                style={{ blockSize: "40px", inlineSize: "auto" }}
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg transition-colors">
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === item.label ? "rotate-180 text-green-700" : "")} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: EASE }}
                          className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href} href={child.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors mx-1 rounded-xl"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={item.label} href={item.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg transition-colors">
                    {item.label}
                  </Link>
                )
              )}

              {/* Portals dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("Portals")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700 rounded-lg transition-colors">
                  Portals
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === "Portals" ? "rotate-180 text-green-700" : "")} />
                </button>
                <AnimatePresence>
                  {openDropdown === "Portals" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: EASE }}
                      className="absolute top-full right-0 mt-1.5 w-72 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50"
                    >
                      <p className="px-4 pt-1 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Portals & Admin</p>
                      {portalLinks.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.href} href={p.href}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors mx-1 rounded-xl group"
                          >
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", p.color)}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">{p.label}</p>
                              <p className="text-[11px] text-gray-400">{p.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link href="/report" className="hidden sm:block">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold hover:from-yellow-500 hover:to-yellow-600 shadow-md shadow-yellow-400/20 border-0"
                >
                  Report Issue
                </Button>
              </Link>
              <button
                type="button"
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href} href={child.href}
                            className="block px-4 py-2 text-sm text-gray-500 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Portals section in mobile */}
                <div className="pt-3 pb-1 border-t border-gray-100">
                  <p className="px-4 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Portals & Admin</p>
                  {portalLinks.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.href} href={p.href}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", p.color)}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{p.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <Link href="/report" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold border-0">
                      Report a Problem
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

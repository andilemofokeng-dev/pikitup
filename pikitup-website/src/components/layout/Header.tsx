"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown,
  UserCircle, Building2, Users, Shield, FileText, Briefcase, Phone,
  Info, Truck, CalendarDays, MapPin, Newspaper, LayoutGrid, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  pill: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "About", href: "/about", icon: Info,
    pill: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300",
  },
  {
    label: "Services", href: "/services", icon: Truck,
    pill: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300",
    children: [
      { label: "Household Waste Collection", href: "/services/household" },
      { label: "Business Waste Services",    href: "/services/business" },
      { label: "Street Sweeping",            href: "/services/street-sweeping" },
      { label: "Garden Refuse",              href: "/services/garden-refuse" },
      { label: "Recycling Services",         href: "/services/recycling" },
      { label: "Landfill Disposal",          href: "/services/landfill" },
      { label: "Recycling Education",        href: "/recycling-education" },
    ],
  },
  {
    label: "Schedule", href: "/collection-schedule", icon: CalendarDays,
    pill: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300",
  },
  {
    label: "Facilities", href: "/find-facility", icon: MapPin,
    pill: "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100 hover:border-violet-300",
  },
  {
    label: "Report a Problem", href: "/report", icon: AlertTriangle,
    pill: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300",
  },
  {
    label: "News & Notices", href: "/news", icon: Newspaper,
    pill: "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300",
  },
  {
    label: "Tenders & RFQs", href: "/tenders", icon: FileText,
    pill: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300",
  },
  {
    label: "Careers", href: "/careers", icon: Briefcase,
    pill: "bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 hover:border-sky-300",
  },
  {
    label: "Contact Us", href: "/contact", icon: Phone,
    pill: "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 hover:border-rose-300",
  },
];

const PORTALS_PILL =
  "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300";

const portalLinks = [
  { label: "Resident Portal",      desc: "Track collections & complaints", href: "/resident-portal/login", icon: UserCircle, color: "text-green-600 bg-green-50" },
  { label: "Business Portal",      desc: "Business waste services",        href: "/business-portal/login", icon: Building2,  color: "text-blue-600 bg-blue-50" },
  { label: "Staff Portal",         desc: "Operations & complaint mgmt",    href: "/staff-portal/login",    icon: Users,      color: "text-orange-600 bg-orange-50" },
  { label: "Admin Portal",         desc: "System administration",          href: "/admin-portal/login",    icon: Shield,     color: "text-red-600 bg-red-50" },
  { label: "Content Studio (CMS)", desc: "Manage news, notices & tenders", href: "/cms-portal/login",      icon: FileText,   color: "text-violet-600 bg-violet-50" },
  { label: "Career Portal",        desc: "Jobs, vacancies & applications",  href: "/career-portal/login",   icon: Briefcase,  color: "text-emerald-600 bg-emerald-50" },
];

// ── Animation variants ────────────────────────────────────────────────────────

// Pill: staggered drop-in on mount, spring lift+scale on hover, shrink on tap
const pillVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.82 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.06 + i * 0.055, type: "spring" as const, stiffness: 320, damping: 24 },
  }),
  hover: {
    scale: 1.1,
    y: -4,
    transition: { type: "spring" as const, stiffness: 450, damping: 15 },
  },
  tap: {
    scale: 0.93,
    y: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 26 },
  },
};

// Icon: rotates and grows when parent enters "hover" (Framer propagates variant names)
const iconVariants = {
  visible: { rotate: 0, scale: 1 },
  hover: {
    rotate: 16,
    scale: 1.35,
    transition: { type: "spring" as const, stiffness: 400, damping: 12 },
  },
  tap: {
    rotate: -10,
    scale: 1.1,
    transition: { type: "spring" as const, stiffness: 500, damping: 20 },
  },
};

// Mobile items: slide in from the left with stagger
const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.045, type: "spring" as const, stiffness: 300, damping: 24 },
  }),
};

const MotionLink = motion(Link);

const PILL_BASE =
  "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border rounded-xl";

const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
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
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src="/pikitup-logo.png"
                alt="Pikitup Johannesburg"
                width={120}
                height={44}
                className="object-contain"
                style={{ blockSize: "40px", inlineSize: "auto" }}
                priority
              />
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));

                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <motion.button
                        type="button"
                        className={cn(
                          PILL_BASE, item.pill,
                          isActive && "ring-2 ring-current/20 shadow-sm"
                        )}
                        variants={pillVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                      >
                        <motion.span variants={iconVariants} className="shrink-0 flex items-center">
                          <Icon className="w-3 h-3" />
                        </motion.span>
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-2.5 h-2.5 ml-0.5 transition-transform duration-200",
                            openDropdown === item.label ? "rotate-180" : ""
                          )}
                        />
                      </motion.button>

                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: EASE }}
                            className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors mx-1 rounded-xl"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <MotionLink
                    key={item.label}
                    href={item.href}
                    className={cn(
                      PILL_BASE, item.pill,
                      isActive && "ring-2 ring-current/20 shadow-sm"
                    )}
                    variants={pillVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                  >
                    <motion.span variants={iconVariants} className="shrink-0 flex items-center">
                      <Icon className="w-3.5 h-3.5" />
                    </motion.span>
                    {item.label}
                  </MotionLink>
                );
              })}

              {/* Portals dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("Portals")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <motion.button
                  type="button"
                  className={cn(PILL_BASE, PORTALS_PILL)}
                  variants={pillVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  custom={navItems.length}
                >
                  <motion.span variants={iconVariants} className="shrink-0 flex items-center">
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </motion.span>
                  Portals
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 ml-0.5 transition-transform duration-200",
                      openDropdown === "Portals" ? "rotate-180" : ""
                    )}
                  />
                </motion.button>

                <AnimatePresence>
                  {openDropdown === "Portals" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: EASE }}
                      className="absolute top-full right-0 mt-1.5 w-72 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50"
                    >
                      <p className="px-4 pt-1 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Portals & Admin
                      </p>
                      {portalLinks.map((p) => {
                        const PIcon = p.icon;
                        return (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors mx-1 rounded-xl group"
                          >
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", p.color)}>
                              <PIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                                {p.label}
                              </p>
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

            {/* Mobile hamburger */}
            <motion.button
              type="button"
              className="xl:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X    className="w-5 h-5" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu className="w-5 h-5" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, blockSize: 0 }}
              animate={{ opacity: 1, blockSize: "auto" }}
              exit={{ opacity: 0, blockSize: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="xl:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1.5">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold border rounded-xl transition-all",
                          item.pill
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-1 space-y-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-500 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Portals section */}
                <motion.div
                  className="pt-3 pb-1 border-t border-gray-100"
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navItems.length}
                >
                  <p className="px-4 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Portals & Admin
                  </p>
                  {portalLinks.map((p) => {
                    const PIcon = p.icon;
                    return (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", p.color)}>
                          <PIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{p.label}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

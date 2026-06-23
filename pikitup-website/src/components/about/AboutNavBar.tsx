"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const TABS = [
  { label: "Overview",       href: "/about" },
  { label: "Leadership",     href: "/about/leadership" },
  { label: "Governance",     href: "/about/governance" },
  { label: "Annual Reports", href: "/about/annual-reports" },
];

export default function AboutNavBar() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const active =
              tab.href === "/about"
                ? pathname === "/about" || pathname === "/about/"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors ${
                  active ? "text-green-700" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
                {active && (
                  <motion.span
                    layoutId="about-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

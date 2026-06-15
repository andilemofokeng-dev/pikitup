import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Household Waste", href: "/services/household" },
    { label: "Business Waste", href: "/services/business" },
    { label: "Street Sweeping", href: "/services/street-sweeping" },
    { label: "Garden Refuse", href: "/services/garden-refuse" },
    { label: "Recycling", href: "/services/recycling" },
    { label: "Landfill Sites", href: "/services/landfill" },
  ],
  quickLinks: [
    { label: "Collection Schedule", href: "/collection-schedule" },
    { label: "Find a Facility", href: "/find-facility" },
    { label: "Report a Problem", href: "/report" },
    { label: "News & Notices", href: "/news" },
    { label: "Tenders & RFQs", href: "/tenders" },
    { label: "Careers", href: "/careers" },
  ],
  portals: [
    { label: "Resident Portal", href: "/resident-portal" },
    { label: "Business Portal", href: "/business-portal" },
    { label: "Staff Portal", href: "/staff-portal" },
    { label: "Recycling Education", href: "/recycling-education" },
    { label: "About Pikitup", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center mb-3">
              <span className="bg-white rounded-2xl px-4 py-2 inline-flex items-center shadow-lg shadow-black/20">
                <Image
                  src="/pikitup-logo.png"
                  alt="Pikitup Johannesburg"
                  width={130}
                  height={48}
                  className="object-contain"
                  style={{ blockSize: "44px", inlineSize: "auto" }}
                />
              </span>
            </Link>
            <p className="text-yellow-300 text-sm font-semibold italic mb-3">
              "We Do Better Together"
            </p>
            <p className="text-green-200 text-sm leading-relaxed mb-5">
              Pikitup Johannesburg (SOC) Ltd is the official integrated waste management service provider to the City of Johannesburg — keeping our city clean, healthy and green.
            </p>
            <div className="space-y-2 text-sm text-green-200">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Illegal Dumping: <strong className="text-white">0860 562874</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Switchboard: <strong className="text-white">011 375 5555</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>WhatsApp: <strong className="text-white">082 779 1361</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>info@pikitup.co.za</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>66 President Street, Johannesburg, 2000</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com/pikitup" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com/CleanerJoburg" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X @CleanerJoburg" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-black transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@pikitup" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF0000] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://wa.me/27827791361" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 text-sm hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 text-sm hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals & more */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Portals & Info</h3>
            <ul className="space-y-2">
              {footerLinks.portals.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 text-sm hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <p className="text-xs text-green-200 mb-1 font-medium">Report Illegal Dumping</p>
              <p className="text-yellow-300 font-bold text-lg">0860 562874</p>
              <p className="text-xs text-green-300">Also: 011 375 5555 · 010 055 5990</p>
              <p className="text-xs text-green-300 mt-1">WhatsApp: 082 779 1361</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-green-300">
          <p>© {year} Pikitup Johannesburg (SOC) Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

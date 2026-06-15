import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Download,
  ChevronRight,
  AlertTriangle,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tenders & RFQs",
  description:
    "Current tenders, RFQs and procurement notices from Pikitup Johannesburg. All official tenders are published on this page.",
};

const tenders = [
  {
    id: "PKT-T-2026-001",
    type: "Tender",
    title: "Supply and Delivery of Refuse Collection Vehicles",
    description:
      "Pikitup invites tenders for the supply and delivery of 50 rear-loader refuse collection vehicles, including a 5-year maintenance agreement.",
    closing: "25 July 2026",
    status: "Open",
    badge: "secondary" as const,
    value: "R150M+",
  },
  {
    id: "PKT-T-2026-002",
    type: "Tender",
    title: "Provision of Portable Toilets — Regional Offices",
    description:
      "Tender for the rental and maintenance of portable toilet facilities at Pikitup regional offices and sites for a 3-year period.",
    closing: "15 July 2026",
    status: "Open",
    badge: "secondary" as const,
    value: "R5M–R10M",
  },
  {
    id: "PKT-RFQ-2026-015",
    type: "RFQ",
    title: "Supply of Personal Protective Equipment (PPE) — Q3 2026",
    description:
      "Request for quotation for the supply of standard PPE for Pikitup field and depot workers for Q3 2026.",
    closing: "20 June 2026",
    status: "Closing Soon",
    badge: "warning" as const,
    value: "R500K–R2M",
  },
  {
    id: "PKT-T-2025-044",
    type: "Tender",
    title: "Construction of New Alexandra Depot Facility",
    description:
      "Awarded to Masibambane Construction (Pty) Ltd. Contract value: R42.5 million.",
    closing: "Closed",
    status: "Awarded",
    badge: "default" as const,
    value: "R42.5M",
  },
  {
    id: "PKT-T-2025-039",
    type: "Tender",
    title: "Website and Digital Platform Development",
    description: "Cancelled due to revised scope and requirements.",
    closing: "Closed",
    status: "Cancelled",
    badge: "destructive" as const,
    value: "N/A",
  },
];

const statusBadge: Record<string, string> = {
  Open: "text-green-700 bg-green-100",
  "Closing Soon": "text-orange-700 bg-orange-100",
  Awarded: "text-blue-700 bg-blue-100",
  Cancelled: "text-gray-600 bg-gray-100",
};

export default function TendersPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Tenders & RFQs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Tenders & RFQs</h1>
          <p className="text-green-100 text-xl max-w-2xl">
            All Pikitup procurement opportunities are published on this page. Subscribe to receive
            updates when new tenders are published.
          </p>
        </div>
      </section>

      {/* Scam alert */}
      <div className="bg-red-50 border-b border-red-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">
              Procurement Fraud Warning
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              Pikitup will never request payment to participate in a tender or contact suppliers
              via personal WhatsApp or email accounts. All official tenders are published on this
              page only. Report suspicious communications to{" "}
              <strong>0800 00 7867</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Tenders */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Current &amp; Recent Tenders
            </h2>
            <div className="flex gap-2">
              {["All", "Open", "Awarded", "Cancelled"].map((status) => (
                <button
                  key={status}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    status === "All"
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {tenders.map((tender) => (
              <Card
                key={tender.id}
                className="hover:shadow-md hover:border-green-200 transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant={tender.badge}>{tender.type}</Badge>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            statusBadge[tender.status]
                          }`}
                        >
                          {tender.status}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{tender.id}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2">
                        {tender.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {tender.description}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 sm:justify-end">
                        <Calendar className="w-3.5 h-3.5" />
                        Closing: {tender.closing}
                      </div>
                      <div className="text-sm font-bold text-gray-700">{tender.value}</div>
                      {tender.status === "Open" || tender.status === "Closing Soon" ? (
                        <div className="flex gap-2 sm:justify-end">
                          <Button size="sm" variant="default">
                            <Download className="w-3.5 h-3.5" />
                            Download Docs
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2 sm:justify-end">
                          <Button size="sm" variant="outline">
                            <FileText className="w-3.5 h-3.5" />
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Get Tender Notifications
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            Subscribe to receive email alerts when new tenders and RFQs are published.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

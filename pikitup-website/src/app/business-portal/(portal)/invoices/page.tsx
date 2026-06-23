"use client";
import { useEffect, useState } from "react";
import { apiGetBusinessInvoices } from "@/lib/api-client";
import type { Invoice } from "@/lib/types";
import { FileText, Download, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Invoice["status"], { label: string; color: string; icon: typeof CheckCircle2 }> = {
  paid:        { label: "Paid",        color: "bg-green-900/40 text-green-400 border-green-800/40",   icon: CheckCircle2 },
  outstanding: { label: "Outstanding", color: "bg-yellow-900/40 text-yellow-400 border-yellow-800/40", icon: Clock },
  overdue:     { label: "Overdue",     color: "bg-red-900/40 text-red-400 border-red-800/40",         icon: AlertTriangle },
};

export default function BusinessInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    apiGetBusinessInvoices().then((r) => setInvoices(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const outstanding = invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0);
  const totalPaid   = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-black text-white mb-1">Invoices</h1>
        <p className="text-sm text-gray-500">Billing history for your account</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-2xl border border-yellow-800/30 p-5">
          <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1">Outstanding</p>
          <p className="text-2xl font-black text-yellow-400">
            R {outstanding.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-green-800/30 p-5">
          <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider mb-1">Total Paid (this year)</p>
          <p className="text-2xl font-black text-green-400">
            R {totalPaid.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Invoice list */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-bold text-white">Invoices</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {invoices.map((inv) => {
            const style = STATUS_STYLES[inv.status];
            const StatusIcon = style.icon;
            return (
              <div key={inv.id} className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">{inv.period}</p>
                    <p className="text-xs font-mono text-gray-600 mt-0.5">{inv.invoiceNumber}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Due: {new Date(inv.dueDate).toLocaleDateString("en-ZA", { day:"2-digit", month:"short", year:"numeric" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-black text-white">R {inv.amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</p>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide flex items-center gap-1 mt-1", style.color)}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {style.label}
                    </span>
                  </div>
                  <button type="button"
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
                    title="Download PDF">
                    <Download className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment info */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
        <h2 className="text-sm font-bold text-white mb-3">Payment Information</h2>
        <div className="space-y-2 text-sm text-gray-400">
          {[
            { label: "Bank",       value: "Nedbank" },
            { label: "Account",    value: "1234567890" },
            { label: "Branch",     value: "198765 (Sandton)" },
            { label: "Reference",  value: "BIZ-RBG-2026-00234 + invoice number" },
          ].map((row) => (
            <div key={row.label} className="flex gap-3">
              <p className="text-xs text-gray-600 w-24 shrink-0 font-medium uppercase tracking-wider pt-0.5">{row.label}</p>
              <p className="font-mono text-gray-300 text-xs">{row.value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
          For billing queries call <a href="tel:+27115000900" className="text-blue-400 hover:text-blue-300">011 500 0900</a> or email{" "}
          <a href="mailto:billing@pikitup.co.za" className="text-blue-400 hover:text-blue-300">billing@pikitup.co.za</a>
        </p>
      </div>
    </div>
  );
}

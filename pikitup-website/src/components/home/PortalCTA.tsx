import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animate";
import { UserCircle, Building2, ArrowRight, CheckCircle } from "lucide-react";

const residentPerks = [
  "Track your service requests in real time",
  "Get collection day reminders via SMS or WhatsApp",
  "Receive suburb-specific service notices",
  "Find your nearest facility instantly",
];

export default function PortalCTA() {
  return (
    <section className="relative py-24 px-4 bg-gray-900 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/city-night/1920/800"
          alt="Johannesburg at night"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-green-950/80" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <FadeIn>
            <span className="section-label text-green-400">Digital Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Manage Your Services<br />
              <span className="gradient-text">Online, Anytime</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Create a free Pikitup account to access personalised waste management
              services, track complaints, and stay informed — all from your phone or computer.
            </p>
            <div className="space-y-3 mb-10">
              {residentPerks.map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <p className="text-gray-300 text-sm">{perk}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/resident-portal/login">
                <Button size="lg" className="group shadow-xl shadow-green-900/30">
                  <UserCircle className="w-5 h-5" />
                  Resident Portal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/business-portal/login">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/5 hover:border-gray-400">
                  <Building2 className="w-5 h-5" />
                  Business Portal
                </Button>
              </Link>
              <Link href="/staff-portal/login">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/5 hover:border-gray-400">
                  Staff Login
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Portal preview card */}
          <FadeIn delay={0.2}>
            <div className="glass rounded-3xl p-6 border border-white/10 shadow-2xl">
              {/* Dashboard mockup */}
              <div className="bg-gray-950/60 rounded-2xl p-5 mb-4 border border-white/5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-gray-500">Welcome back</p>
                    <p className="text-white font-bold">Resident Dashboard</p>
                  </div>
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <UserCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Next Collection", value: "Tuesday 10 Jun", color: "bg-green-500/10 border-green-500/20 text-green-400" },
                    { label: "Open Cases",      value: "1 In Progress",  color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" },
                  ].map((card) => (
                    <div key={card.label} className={`rounded-xl p-3 border ${card.color}`}>
                      <p className="text-[10px] text-gray-500 mb-1">{card.label}</p>
                      <p className="text-xs font-bold">{card.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-gray-500 mb-1">Latest Notice — Region A</p>
                  <p className="text-xs text-gray-300 font-medium">Separation at source bags delivery: 12 June</p>
                </div>
              </div>
              {/* Case tracker */}
              <div className="glass-dark rounded-2xl p-4 border border-white/5">
                <p className="text-xs text-gray-400 mb-3 font-medium">Case Tracker</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-green-400">PKT-2026-000125</span>
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold">In Progress</span>
                </div>
                <p className="text-[11px] text-gray-500">Missed collection — Sandton, Region A</p>
                <div className="flex gap-1 mt-3">
                  {["Submitted", "Assigned", "In Progress", "Resolved"].map((step, i) => (
                    <div key={step} className={`flex-1 h-1 rounded-full ${i <= 2 ? "bg-green-500" : "bg-white/10"}`} />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

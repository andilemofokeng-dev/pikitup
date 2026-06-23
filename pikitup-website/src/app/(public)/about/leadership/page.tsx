import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, Users, MapPin, Shield, Star, Award, Building2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { readLeadership } from "@/lib/leadership-store";
import AboutNavBar from "@/components/about/AboutNavBar";
import LeadershipDirectory from "@/components/about/LeadershipDirectory";

export const metadata: Metadata = {
  title: "Leadership | Pikitup Johannesburg",
  description: "Meet the executive and management team driving Pikitup's mission across 12 depots and 7 regions of Greater Johannesburg.",
};

export const dynamic = "force-dynamic";

const EXEC_ACCENT: Record<string, { top: string; badge: string; dot: string }> = {
  md:  { top: "from-green-600 to-emerald-700",  badge: "text-green-700 bg-green-50 border-green-200",  dot: "bg-green-500" },
  cfo: { top: "from-yellow-500 to-amber-600",    badge: "text-yellow-700 bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
};

const GM_TOPS = [
  "from-blue-600 to-blue-700",
  "from-cyan-600 to-cyan-700",
  "from-sky-600 to-sky-700",
];

function initials(name: string) {
  const p = name.replace(/^(Ms|Mr|Dr)\.?\s/i, "").trim().split(" ");
  return (p[0]?.[0] ?? "") + (p[p.length - 1]?.[0] ?? "");
}

export default async function LeadershipPage() {
  const data        = await readLeadership();
  const executives  = [...data.executives].sort((a, b) => a.order - b.order);
  const generalMgrs = [...data.generalManagers].sort((a, b) => a.order - b.order);
  const depotMgrs   = [...data.depotManagers].sort((a, b) => a.order - b.order);
  const depots      = data.depots;

  return (
    <>
      {/* ── HERO (dark — standard for page heroes) ─────────── */}
      <section className="relative min-h-[42vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&h=700&q=85"
            alt="Pikitup Leadership"
            fill priority className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/98 via-green-900/80 to-green-800/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-14 sm:py-16 w-full">
          <div className="flex items-center gap-1.5 text-green-200/70 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 leading-tight">
            Our <span className="gradient-text">Leadership</span>
          </h1>
          <p className="text-green-100 text-base sm:text-lg max-w-2xl">
            The management team driving Pikitup&apos;s mission across{" "}
            <strong className="text-white">12 depots</strong> and{" "}
            <strong className="text-white">7 regions</strong> of Greater Johannesburg.
          </p>
        </div>
      </section>

      {/* Tab nav */}
      <AboutNavBar />

      {/* ── KEY STATS ───────────────────────────────────────── */}
      <section className="bg-green-700 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Users,    value: `${executives.length + generalMgrs.length + depotMgrs.length}+`, label: "Leaders" },
              { icon: Building2,value: `${depots.length}`,  label: "Sites" },
              { icon: Star,     value: "1.2M+",             label: "Households" },
              { icon: Award,    value: "25+",               label: "Yrs Experience" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-5 h-5 text-green-200 mx-auto mb-1.5" />
                <div className="text-2xl sm:text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs text-green-200/70 uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE COMMITTEE ─────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-label">Executive Committee</span>
            <h2 className="section-heading">Executive Leadership</h2>
            <p className="section-subheading mx-auto">
              Guiding Pikitup&apos;s integrated waste management mandate across Greater Johannesburg
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {executives.map((exec, i) => {
              const accent = EXEC_ACCENT[exec.id] ?? EXEC_ACCENT.md;
              return (
                <FadeIn key={exec.id} delay={i * 0.12}>
                  <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-1 transition-all duration-400">
                    {/* Coloured photo header */}
                    <div className={`relative h-52 bg-gradient-to-br ${accent.top} overflow-hidden`}>
                      {exec.imageUrl ? (
                        <Image src={exec.imageUrl} alt={exec.name} fill
                          className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width:640px) 100vw, 50vw" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/30">
                          {initials(exec.name)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                      {/* Role chip */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-green-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                          {exec.abbreviation}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-black text-gray-900 mb-0.5">{exec.name}</h3>
                      <p className="text-sm font-semibold text-green-700 mb-0.5">{exec.title}</p>
                      <p className="text-xs text-gray-500 mb-4">{exec.department}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5">{exec.bio}</p>
                      {exec.email && (
                        <a href={`mailto:${exec.email}`}
                          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-green-700 transition-colors font-medium group/link">
                          <Mail className="w-3.5 h-3.5 group-hover/link:text-green-600" />
                          {exec.email}
                        </a>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GENERAL MANAGERS ────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="section-label">Cluster Management</span>
            <h2 className="section-heading">General Managers</h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto" stagger={0.08}>
            {generalMgrs.map((gm, i) => (
              <StaggerItem key={gm.id}>
                <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  {/* Photo strip */}
                  <div className={`relative h-40 bg-gradient-to-br ${GM_TOPS[i % GM_TOPS.length]} overflow-hidden`}>
                    {gm.imageUrl ? (
                      <Image src={gm.imageUrl} alt={gm.name} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width:640px) 100vw, 33vw" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white/30">
                        {initials(gm.name)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 rounded-full">
                      General Manager
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="font-bold text-gray-900 text-sm">{gm.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                      <span className="text-xs text-blue-600 font-medium">{gm.cluster}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── MANAGEMENT DIRECTORY ────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="section-label">Depot Management</span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                  Regional &amp; Operations Managers
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {depotMgrs.length} managers across {depots.length} depots &amp; sites
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded bg-purple-200 border border-purple-300" />
                  Regional Manager
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded bg-indigo-200 border border-indigo-300" />
                  Operations Manager
                </div>
              </div>
            </div>
          </FadeIn>

          <LeadershipDirectory managers={depotMgrs} depots={depots} />
        </div>
      </section>

      {/* ── ETHICS FOOTER ───────────────────────────────────── */}
      <section className="py-14 px-4 bg-green-700">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-5">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Integrity &amp; Ethics</h3>
            <p className="text-green-100 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              Pikitup is committed to the highest standards of corporate governance and ethical conduct across all management levels.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-white rounded-2xl px-7 py-4 text-center shadow-lg">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Fraud Hotline</p>
                <a href="tel:0800002587" className="text-xl font-black text-gray-900 hover:text-green-700 transition-colors">0800 002 587</a>
                <p className="text-[10px] text-gray-400 mt-1">Toll free · 24/7</p>
              </div>
              <div className="bg-white rounded-2xl px-7 py-4 text-center shadow-lg">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Ethics Email</p>
                <a href="mailto:pikitupethics@pikitup.co.za" className="font-semibold text-sm text-gray-900 hover:text-green-700 transition-colors">
                  pikitupethics@pikitup.co.za
                </a>
                <p className="text-[10px] text-gray-400 mt-1">Confidential reporting</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

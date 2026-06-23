import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Recycle, Users, Target, Award, ChevronRight,
  FileText, Building2, TrendingUp, Globe2, Leaf, Zap,
} from "lucide-react";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/animate";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import AboutNavBar from "@/components/about/AboutNavBar";

export const metadata: Metadata = {
  title: "About Pikitup Johannesburg",
  description:
    "Pikitup Johannesburg (SOC) Ltd — the City of Johannesburg's official integrated waste management company. Our vision, mission, mandate, values and leadership.",
  openGraph: {
    title: "About Pikitup Johannesburg | Integrated Waste Management",
    description: "Learn about Pikitup — serving 1.2M+ households with refuse collection, recycling, landfill management and clean-up across Greater Johannesburg.",
    images: ["/og-image.jpg"],
  },
};

const leadership = [
  { name: "Executive Director", role: "Chief Executive Officer",           icon: Users },
  { name: "COO",                role: "Chief Operations Officer",           icon: Building2 },
  { name: "CFO",                role: "Chief Financial Officer",            icon: TrendingUp },
  { name: "CHRO",               role: "Chief Human Resources Officer",      icon: Users },
];

const milestones = [
  { year: "2001", event: "Pikitup Johannesburg established as a City-owned entity", color: "bg-green-700" },
  { year: "2007", event: "Introduction of formal recycling programmes across all regions", color: "bg-blue-600" },
  { year: "2013", event: "Separation at Source pilot launched in Johannesburg North", color: "bg-teal-600" },
  { year: "2018", event: "Fleet modernisation programme — 300+ new vehicles", color: "bg-yellow-600" },
  { year: "2022", event: "Digital complaint management system deployed", color: "bg-purple-600" },
  { year: "2026", event: "Launch of the Pikitup Digital Clean City Platform", color: "bg-green-600" },
];

const values = [
  { letter: "P", value: "People-Centric",  color: "bg-green-100 border-green-300 text-green-900" },
  { letter: "I", value: "Integrity",       color: "bg-blue-100 border-blue-300 text-blue-900" },
  { letter: "K", value: "Knowledgeable",   color: "bg-yellow-100 border-yellow-300 text-yellow-900" },
  { letter: "I", value: "Innovation",      color: "bg-purple-100 border-purple-300 text-purple-900" },
  { letter: "T", value: "Trustworthiness", color: "bg-orange-100 border-orange-300 text-orange-900" },
  { letter: "U", value: "Unity",           color: "bg-teal-100 border-teal-300 text-teal-900" },
  { letter: "P", value: "Passion",         color: "bg-red-100 border-red-300 text-red-900" },
];

const mandate = [
  { icon: "🗑️", title: "Refuse Collection",       desc: "Weekly kerbside collection from all residential and business properties." },
  { icon: "🧹", title: "Street Cleaning",           desc: "Regular mechanical and manual sweeping of public roads and spaces." },
  { icon: "🌿", title: "Garden Refuse",             desc: "Drop-off and collection services for garden waste at designated sites." },
  { icon: "♻️", title: "Recycling Programmes",     desc: "Separation at source, community recycling, and waste reduction initiatives." },
  { icon: "🏔️", title: "Landfill Management",      desc: "Operation and environmental management of Johannesburg landfill sites." },
  { icon: "🚫", title: "Illegal Dumping",           desc: "Rapid response to and removal of illegal dump sites across the city." },
];

const strategic = [
  { icon: Target, title: "Waste Reduction",       desc: "Reduce waste going to landfill by 50% by 2030 through recycling and composting programmes." },
  { icon: Users,  title: "Community Engagement",  desc: "Empower communities to participate in separation at source and clean-up campaigns." },
  { icon: Recycle,title: "Circular Economy",      desc: "Build partnerships with the recycling industry to create value from waste." },
  { icon: Award,  title: "Service Excellence",    desc: "Deliver reliable, responsive and professional waste services across all regions." },
];

const stats = [
  { icon: Users,   value: 4500, suffix: "+", label: "Employees",              color: "text-green-400" },
  { icon: Building2,value: 12,  suffix: "",  label: "Waste Depots",           color: "text-yellow-400" },
  { icon: Recycle, value: 44,   suffix: "",  label: "Garden Refuse Sites",    color: "text-teal-400" },
  { icon: Globe2,  value: 4,    suffix: "",  label: "Active Landfills",       color: "text-blue-400" },
  { icon: Zap,     value: 6000, suffix: "+", label: "Tonnes Collected Daily", color: "text-orange-400" },
  { icon: Leaf,    value: 9000, suffix: "+", label: "km Roads Cleaned/Month", color: "text-purple-400" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&h=700&q=85"
            alt="Pikitup Johannesburg operations"
            fill
            priority
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/98 via-green-900/85 to-green-800/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="flex items-center gap-1.5 text-green-200/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">About Pikitup</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            About <span className="gradient-text">Pikitup</span>
          </h1>
          <p className="text-green-100 text-xl max-w-2xl">
            Johannesburg&apos;s official integrated waste management service provider — serving over 1.2 million households across Greater Johannesburg since 2001.
          </p>
        </div>
      </section>

      {/* Tab nav */}
      <AboutNavBar />

      {/* Stats bar */}
      <section className="py-10 px-4 bg-green-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {stats.map((stat, i) => {
              const SIcon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center gap-1.5">
                  <SIcon className={`w-5 h-5 ${stat.color}`} />
                  <div className={`text-2xl font-black ${stat.color}`}>
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={2000 + i * 100} />
                  </div>
                  <div className="text-green-400/60 text-[10px] leading-tight">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <SlideIn direction="left">
            <span className="section-label">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Johannesburg&apos;s Official Waste Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pikitup Johannesburg (SOC) Ltd is the official integrated waste management service
              provider to the City of Johannesburg — a wholly City-owned entity mandated to provide
              refuse collection, street cleaning, landfill management, garden refuse services, and
              waste reduction programmes across Greater Johannesburg.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We operate across all seven regions through 12 waste depots, 44 garden refuse sites,
              four active landfill facilities, and sweep over 9,000 km of roads each month —
              collecting approximately 6,000 tonnes of waste daily.
            </p>
            <div className="p-5 bg-green-50 rounded-2xl border border-green-100 mb-6 space-y-3">
              <p className="text-sm text-gray-700">
                <strong className="text-green-800">Vision:</strong> To be the leading integrated waste management company in Africa and amongst the best in the world.
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-green-800">Mission:</strong> To deliver integrated, sustainable and innovative waste management services that ensure waste reduction, re-use, recycling and recovery — with disposal as the last resort.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href="/services">
                <Button>Our Services</Button>
              </Link>
              <Link href="/about/annual-reports">
                <Button variant="outline">
                  <FileText className="w-4 h-4" />
                  Annual Reports
                </Button>
              </Link>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users,     value: "4,500+", label: "Employees",           bg: "bg-green-50",  text: "text-green-700" },
                { icon: Building2, value: "12",     label: "Waste Depots",        bg: "bg-blue-50",   text: "text-blue-700" },
                { icon: Recycle,   value: "44",     label: "Garden Refuse Sites", bg: "bg-teal-50",   text: "text-teal-700" },
                { icon: Award,     value: "4",      label: "Active Landfills",    bg: "bg-yellow-50", text: "text-yellow-700" },
              ].map((s) => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} className={`premium-card p-6 text-center flex flex-col items-center gap-3`}>
                    <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <SIcon className={`w-6 h-6 ${s.text}`} />
                    </div>
                    <div className={`text-3xl font-black ${s.text}`}>{s.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </SlideIn>
        </div>
      </section>

      <VisionMissionSection />

      {/* Mandate */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-label">Our Mandate</span>
            <h2 className="section-heading">What We Are Responsible For</h2>
            <p className="section-subheading mx-auto">
              Pikitup&apos;s mandate covers the full spectrum of integrated waste management across Greater Johannesburg.
            </p>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {mandate.map((item) => (
              <StaggerItem key={item.title}>
                <div className="premium-card p-6 h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-10">
            <span className="section-label">Our Values</span>
            <h2 className="section-heading">The PIKITUP Values</h2>
            <p className="section-subheading mx-auto">The principles that guide everything we do</p>
          </FadeIn>
          <StaggerContainer className="flex flex-wrap justify-center gap-4" stagger={0.08}>
            {values.map((v) => (
              <StaggerItem key={v.value}>
                <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 ${v.color}`}>
                  <span className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center font-black text-xl shadow-sm">
                    {v.letter}
                  </span>
                  <span className="font-bold text-sm">{v.value}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Strategic focus + Journey */}
      <section className="py-20 px-4 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">
          <FadeIn>
            <span className="section-label">Strategic Focus</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Strategic Priorities</h2>
            <div className="space-y-6">
              {strategic.map((item, i) => {
                const SIcon = item.icon;
                return (
                  <ScaleIn key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                        <SIcon className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </ScaleIn>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <span className="section-label">Our Journey</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Milestones</h2>
            <div className="relative pl-7 border-l-2 border-green-100 space-y-7">
              {milestones.map((m, i) => (
                <ScaleIn key={m.year} delay={i * 0.07}>
                  <div className="relative">
                    <div className={`absolute -left-[31px] w-5 h-5 ${m.color} rounded-full border-4 border-white shadow-md`} />
                    <div className="text-xs font-bold text-green-700 mb-1 tracking-wider">{m.year}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.event}</p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Leadership teaser */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10">
            <div>
              <span className="section-label text-green-400">Leadership</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Executive Leadership</h2>
              <p className="text-gray-500 text-sm mt-1">Our executive team guiding Pikitup&apos;s mission</p>
            </div>
            <Link href="/about/leadership">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-500 shrink-0">
                Full Leadership Page
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.07}>
            {leadership.map((person) => {
              const LIcon = person.icon;
              return (
                <StaggerItem key={person.name}>
                  <Link href="/about/leadership">
                    <div className="group bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-6 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 cursor-pointer">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-green-950 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <LIcon className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm mb-0.5">{person.name}</h3>
                        <p className="text-xs text-gray-500">{person.role}</p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Corporate documents CTA */}
      <section className="py-16 px-4 bg-green-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-3">Corporate Documents</h2>
            <p className="text-green-100 mb-8 text-lg">
              Access Pikitup&apos;s annual reports, governance documents and corporate publications.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/about/annual-reports">
                <Button variant="white" size="lg">Annual Reports</Button>
              </Link>
              <Link href="/about/governance">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Corporate Governance
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

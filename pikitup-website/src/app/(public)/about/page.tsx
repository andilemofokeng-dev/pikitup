import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Recycle,
  Users,
  Target,
  Award,
  ChevronRight,
  FileText,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Pikitup",
  description:
    "Learn about Pikitup Johannesburg, the City of Johannesburg's official integrated waste management service provider.",
};

const leadership = [
  { name: "Executive Director", role: "Chief Executive Officer" },
  { name: "Chief Operations Officer", role: "Operations" },
  { name: "Chief Financial Officer", role: "Finance" },
  { name: "Chief Human Resources Officer", role: "People & Culture" },
];

const milestones = [
  { year: "2001", event: "Pikitup Johannesburg established as a City-owned entity" },
  { year: "2007", event: "Introduction of formal recycling programmes across all regions" },
  { year: "2013", event: "Separation at Source pilot launched in Johannesburg North" },
  { year: "2018", event: "Fleet modernisation programme — 300+ new vehicles" },
  { year: "2022", event: "Digital complaint management system deployed" },
  { year: "2026", event: "Launch of the Pikitup Digital Clean City Platform" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>About Pikitup</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Pikitup</h1>
          <p className="text-green-100 text-xl max-w-2xl">
            Johannesburg&apos;s official integrated waste management service provider — serving
            over 1.2 million households across Greater Johannesburg.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pikitup Johannesburg (SOC) Ltd is the official integrated waste management service
              provider to the City of Johannesburg. We are a wholly City-owned entity, mandated
              to provide refuse collection, street cleaning, landfill management, garden refuse
              services, and waste reduction programmes across Greater Johannesburg.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We operate across all seven regions of the City of Johannesburg through 12 waste depots,
              44 garden refuse sites, four active landfill facilities, and sweep over 9,000 km of roads
              each month — collecting approximately 6,000 tonnes of waste daily.
            </p>
            <p className="text-gray-600 leading-relaxed mb-2">
              <strong className="text-green-800">Our Vision:</strong> To be the leading integrated waste management company in Africa and amongst the best in the world.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong className="text-green-800">Our Mission:</strong> To deliver integrated, sustainable and innovative waste management services that ensure waste reduction, re-use, recycling and recovery — with disposal as the last resort.
            </p>
            <div className="flex gap-3">
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users,    value: "4,500+", label: "Employees" },
              { icon: Building2,value: "12",     label: "Waste Depots" },
              { icon: Recycle,  value: "44",     label: "Garden Refuse Sites" },
              { icon: Award,    value: "4",      label: "Active Landfills" },
            ].map((stat) => (
              <Card key={stat.label} className="text-center p-6">
                <stat.icon className="w-8 h-8 text-green-700 mx-auto mb-3" />
                <div className="text-3xl font-black text-green-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mandate */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">Our Mandate</h2>
            <p className="section-subheading">
              What Pikitup is responsible for across the City of Johannesburg
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "🗑️",
                title: "Refuse Collection",
                desc: "Weekly kerbside refuse collection from all residential and business properties.",
              },
              {
                icon: "🧹",
                title: "Street Cleaning",
                desc: "Regular mechanical and manual sweeping of public roads and spaces.",
              },
              {
                icon: "🌿",
                title: "Garden Refuse",
                desc: "Drop-off and collection services for garden waste at designated sites.",
              },
              {
                icon: "♻️",
                title: "Recycling Programmes",
                desc: "Separation at source, community recycling, and waste reduction initiatives.",
              },
              {
                icon: "🏔️",
                title: "Landfill Management",
                desc: "Operation and environmental management of Johannesburg landfill sites.",
              },
              {
                icon: "🚫",
                title: "Illegal Dumping",
                desc: "Rapid response to and removal of illegal dump sites across the city.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-5">
                <CardContent className="p-0">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">Our Values</h2>
            <p className="section-subheading">The principles that guide everything we do</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { letter: "P", value: "People-Centric",   color: "bg-green-50 border-green-200 text-green-800" },
              { letter: "I", value: "Integrity",        color: "bg-blue-50 border-blue-200 text-blue-800" },
              { letter: "K", value: "Knowledgeable",    color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
              { letter: "I", value: "Innovation",       color: "bg-purple-50 border-purple-200 text-purple-800" },
              { letter: "T", value: "Trustworthiness",  color: "bg-orange-50 border-orange-200 text-orange-800" },
              { letter: "U", value: "Unity",            color: "bg-teal-50 border-teal-200 text-teal-800" },
              { letter: "P", value: "Passion",          color: "bg-red-50 border-red-200 text-red-800" },
            ].map((v) => (
              <div key={v.value} className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${v.color}`}>
                <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center font-black text-lg">{v.letter}</span>
                <span className="font-semibold text-sm">{v.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic goals */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Focus</h2>
            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: "Waste Reduction",
                  desc: "Reduce waste going to landfill by 50% by 2030 through recycling and composting programmes.",
                },
                {
                  icon: Users,
                  title: "Community Engagement",
                  desc: "Empower communities to participate in separation at source and clean-up campaigns.",
                },
                {
                  icon: Recycle,
                  title: "Circular Economy",
                  desc: "Build partnerships with the recycling industry to create value from waste.",
                },
                {
                  icon: Award,
                  title: "Service Excellence",
                  desc: "Deliver reliable, responsive and professional waste services across all regions.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <div className="relative pl-6 border-l-2 border-green-200 space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <div className="absolute -left-[29px] w-5 h-5 bg-green-700 rounded-full border-4 border-white" />
                  <div className="text-xs font-bold text-green-700 mb-1">{m.year}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">Leadership</h2>
            <p className="section-subheading">Our executive team guiding Pikitup&apos;s mission</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadership.map((person) => (
              <Card key={person.name} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-green-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{person.name}</h3>
                  <p className="text-xs text-gray-500">{person.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents CTA */}
      <section className="py-12 px-4 bg-green-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Corporate Documents</h2>
          <p className="text-green-100 mb-6">
            Access Pikitup&apos;s annual reports, governance documents, and corporate publications.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/about/annual-reports">
              <Button variant="white">Annual Reports</Button>
            </Link>
            <Link href="/about/governance">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                Corporate Governance
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

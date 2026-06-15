import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  ChevronRight,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Pikitup team. Explore current vacancies, internship opportunities and graduate programmes.",
};

const vacancies = [
  {
    id: 1,
    title: "Fleet Maintenance Manager",
    department: "Operations",
    type: "Permanent",
    location: "Headquarters, Johannesburg",
    closing: "20 June 2026",
    ref: "PKT-HR-2026-001",
    badge: "default" as const,
  },
  {
    id: 2,
    title: "Senior Environmental Officer",
    department: "Environment & Compliance",
    type: "Permanent",
    location: "Various Depots, Johannesburg",
    closing: "25 June 2026",
    ref: "PKT-HR-2026-002",
    badge: "default" as const,
  },
  {
    id: 3,
    title: "Depot Administrator x4",
    department: "Operations",
    type: "Permanent",
    location: "Multiple Depots",
    closing: "30 June 2026",
    ref: "PKT-HR-2026-003",
    badge: "default" as const,
  },
  {
    id: 4,
    title: "ICT Business Analyst",
    department: "Information Technology",
    type: "Permanent",
    location: "Headquarters, Johannesburg",
    closing: "15 July 2026",
    ref: "PKT-HR-2026-004",
    badge: "default" as const,
  },
  {
    id: 5,
    title: "Graduate Internship Programme 2026/27",
    department: "Various",
    type: "Internship",
    location: "Greater Johannesburg",
    closing: "31 July 2026",
    ref: "PKT-INT-2026-001",
    badge: "secondary" as const,
  },
  {
    id: 6,
    title: "Learnership Programme — Waste Management NQF 3",
    department: "Human Resources",
    type: "Learnership",
    location: "Greater Johannesburg",
    closing: "31 July 2026",
    ref: "PKT-LEARN-2026-001",
    badge: "info" as const,
  },
];

const typeColours: Record<string, string> = {
  Permanent: "bg-green-100 text-green-700",
  Internship: "bg-blue-100 text-blue-700",
  Learnership: "bg-purple-100 text-purple-700",
  Contract: "bg-orange-100 text-orange-700",
};

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Careers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Build Your Career at Pikitup
          </h1>
          <p className="text-green-100 text-xl max-w-2xl mb-6">
            Join a team committed to keeping Johannesburg clean, green and sustainable.
            We offer rewarding careers across operations, engineering, environment, ICT and more.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { icon: Briefcase, label: "Permanent Positions" },
              { icon: GraduationCap, label: "Internship Programme" },
              { icon: GraduationCap, label: "Learnerships" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2"
              >
                <item.icon className="w-4 h-4 text-yellow-300" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Current Vacancies ({vacancies.length})
            </h2>
            <div className="flex gap-2">
              {["All", "Permanent", "Internship", "Learnership"].map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    type === "All"
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {vacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                className="hover:shadow-md hover:border-green-200 transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            typeColours[vacancy.type]
                          }`}
                        >
                          {vacancy.type}
                        </span>
                        <span className="text-xs text-gray-400">{vacancy.department}</span>
                        <span className="text-xs text-gray-400 font-mono">{vacancy.ref}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{vacancy.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-green-600" />
                          {vacancy.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-green-600" />
                          Closing: {vacancy.closing}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/careers/${vacancy.id}`}>
                        <Button size="sm" variant="outline">View Job</Button>
                      </Link>
                      <Link href={`/careers/${vacancy.id}/apply`}>
                        <Button size="sm">Apply Now</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Pikitup */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">Why Work at Pikitup?</h2>
            <p className="section-subheading">Make a real difference for Johannesburg</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "🌱", title: "Meaningful Impact", desc: "Contribute to a cleaner, greener Johannesburg every day." },
              { emoji: "🎓", title: "Learning & Development", desc: "Access to training, learnerships and career growth opportunities." },
              { emoji: "🏥", title: "Competitive Benefits", desc: "Medical aid, pension fund, performance bonuses and leave." },
              { emoji: "🤝", title: "Inclusive Culture", desc: "A diverse and inclusive team that values every employee." },
            ].map((item) => (
              <Card key={item.title} className="text-center p-6">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application info */}
      <section className="py-12 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Application Guidelines</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Pikitup is an equal-opportunity employer. We are committed to Employment Equity.
            Preference will be given to candidates from designated groups. No application fees
            will ever be charged. Beware of job scams.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            For enquiries contact the HR Department:{" "}
            <a href="mailto:careers@pikitup.co.za" className="text-green-400 hover:underline">
              careers@pikitup.co.za
            </a>
          </p>
          <Badge variant="warning" className="text-sm px-4 py-2">
            We will never ask for payment to process an application
          </Badge>
        </div>
      </section>
    </>
  );
}

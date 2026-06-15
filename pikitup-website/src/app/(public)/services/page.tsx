import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ArrowRight, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive waste management services for all residents and businesses across Greater Johannesburg.",
};

const services = [
  {
    slug: "household",
    icon: "🏠",
    title: "Household Waste Collection",
    description:
      "Weekly kerbside refuse collection for all residential properties. Pikitup collects household waste from over 1.2 million households across Greater Johannesburg.",
    details: [
      "Weekly collection from kerbside",
      "Black bag general waste",
      "Separation at source where applicable",
      "Public holiday rescheduling",
    ],
    frequency: "Weekly",
    contact: "0800 00 7867",
  },
  {
    slug: "business",
    icon: "🏢",
    title: "Business Waste Services",
    description:
      "Tailored waste collection solutions for businesses, retailers, offices and industrial properties of all sizes.",
    details: [
      "Flexible collection schedules",
      "Bulk waste containers available",
      "Recycling stream separation",
      "Compliance documentation",
    ],
    frequency: "Flexible",
    contact: "0800 00 7867",
  },
  {
    slug: "street-sweeping",
    icon: "🧹",
    title: "Street Sweeping",
    description:
      "Regular mechanical and manual sweeping of public roads, pavements and open spaces to maintain city cleanliness.",
    details: [
      "Mechanical road sweepers",
      "Manual litter picking teams",
      "Central business district focus",
      "Residential area coverage",
    ],
    frequency: "Regular schedules",
    contact: "0800 00 7867",
  },
  {
    slug: "garden-refuse",
    icon: "🌿",
    title: "Garden Refuse",
    description:
      "Drop-off services at designated garden refuse sites for prunings, grass clippings, leaves and organic garden material.",
    details: [
      "17 garden refuse drop-off sites",
      "Free for residential use",
      "Composting and green waste processing",
      "Seasonal bulk collection",
    ],
    frequency: "Drop-off: Mon–Sat",
    contact: "0800 00 7867",
  },
  {
    slug: "recycling",
    icon: "♻️",
    title: "Recycling Services",
    description:
      "Separation at source collection, community drop-off points and partnerships with recyclers to divert waste from landfill.",
    details: [
      "Separation at source in select areas",
      "Recycling drop-off points citywide",
      "Paper, plastic, glass, metal",
      "Community recycling education",
    ],
    frequency: "Varies by area",
    contact: "0800 00 7867",
  },
  {
    slug: "landfill",
    icon: "🏔️",
    title: "Landfill Disposal",
    description:
      "Regulated disposal at Pikitup-operated landfill sites for waste that cannot be recycled or composted.",
    details: [
      "Robinson Deep Landfill",
      "Goudkoppies Landfill",
      "Ennerdale Landfill",
      "Environmental compliance managed",
    ],
    frequency: "Mon–Sat 7am–5pm",
    contact: "0800 00 7867",
  },
  {
    slug: "illegal-dumping",
    icon: "🚫",
    title: "Illegal Dumping Removal",
    description:
      "Rapid response to illegal dump sites reported by residents. Report illegal dumping online or via our call centre.",
    details: [
      "Report via website or app",
      "Target 48-hour response",
      "Hotspot monitoring",
      "Anti-dumping enforcement support",
    ],
    frequency: "Report anytime",
    contact: "0800 00 7867",
  },
  {
    slug: "separation",
    icon: "🎯",
    title: "Separation at Source",
    description:
      "A programme supporting residents to separate recyclables, organics and general waste at home to reduce landfill waste.",
    details: [
      "Green bag: recycling",
      "Orange bag: organics",
      "Black bag: general waste",
      "Rollout across all regions by 2027",
    ],
    frequency: "Programme area",
    contact: "0800 00 7867",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Services</h1>
          <p className="text-green-100 text-xl max-w-2xl">
            Comprehensive waste management for every resident, business and community
            across Greater Johannesburg.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card
                key={service.slug}
                className="hover:shadow-md hover:border-green-200 transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl shrink-0">{service.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h2>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {service.details.map((d) => (
                          <li key={d} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-green-600" />
                          {service.frequency}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-green-600" />
                          {service.contact}
                        </span>
                      </div>
                      <Link href={`/services/${service.slug}`}>
                        <Button size="sm" variant="secondary">
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Need a Service?</h2>
          <p className="text-gray-600 mb-6">
            Report a missed collection, log a service issue, or contact our call centre for help.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/report">
              <Button size="lg">Report a Problem</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home, Building2, WindIcon, TreePine, Recycle, Layers, AlertTriangle, Leaf } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animate";

const services = [
  {
    slug: "household",
    icon: Home,
    title: "Household Waste Collection",
    desc: "Weekly kerbside collection for all residential properties across Greater Johannesburg.",
    image: "1651996378349-4b76df4a2dc6",
    category: "Residential",
    gradient: "from-green-900/0 via-green-900/60 to-green-950/98",
  },
  {
    slug: "business",
    icon: Building2,
    title: "Business Waste Services",
    desc: "Tailored commercial and industrial waste solutions for businesses of all sizes.",
    image: "1672839792786-88b2dddd57d9",
    category: "Commercial",
    gradient: "from-blue-900/0 via-blue-900/60 to-blue-950/98",
  },
  {
    slug: "street-sweeping",
    icon: WindIcon,
    title: "Street Sweeping",
    desc: "Regular mechanical and manual sweeping of roads, pavements and public spaces.",
    image: "1755795603389-235d0626a22a",
    category: "Infrastructure",
    gradient: "from-slate-900/0 via-slate-900/60 to-slate-950/98",
  },
  {
    slug: "garden-refuse",
    icon: TreePine,
    title: "Garden Refuse",
    desc: "Drop-off and collection services for garden waste at designated sites citywide.",
    image: "1715274036728-4385d95a5e9f",
    category: "Green Waste",
    gradient: "from-lime-900/0 via-lime-900/60 to-lime-950/98",
  },
  {
    slug: "recycling",
    icon: Recycle,
    title: "Recycling Services",
    desc: "Separation at source, community drop-off points and recycling education programmes.",
    image: "1720187079388-7bf103cbeade",
    category: "Recycling",
    gradient: "from-teal-900/0 via-teal-900/60 to-teal-950/98",
  },
  {
    slug: "landfill",
    icon: Layers,
    title: "Landfill Disposal",
    desc: "Regulated disposal at Pikitup-operated landfill sites for non-recyclable waste.",
    image: "1717667745836-145a38948ebf",
    category: "Disposal",
    gradient: "from-stone-900/0 via-stone-900/60 to-stone-950/98",
  },
  {
    slug: "illegal-dumping",
    icon: AlertTriangle,
    title: "Illegal Dumping Removal",
    desc: "Rapid response to illegal dump sites reported by residents — 48hr target.",
    image: "1602262442764-c14f8db98045",
    category: "Enforcement",
    gradient: "from-red-900/0 via-red-900/60 to-red-950/98",
  },
  {
    slug: "separation",
    icon: Leaf,
    title: "Separation at Source",
    desc: "Colour-coded bag system for separating recyclables, organics and general waste at home.",
    image: "1611284446314-60a58ac0deb9",
    category: "Sustainability",
    gradient: "from-emerald-900/0 via-emerald-900/60 to-emerald-950/98",
  },
];

const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function ServicesGrid() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <span className="section-label">What we do</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="section-heading">Comprehensive Waste Management</h2>
              <p className="section-subheading mb-0 max-w-xl">
                From household collection to landfill management — every service you need, professionally delivered.
              </p>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-2 text-green-700 font-bold text-sm hover:text-green-900 shrink-0 group"
            >
              View all services
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.07}>
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative rounded-2xl overflow-hidden h-64 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Background image */}
                  <Image
                    src={`https://images.unsplash.com/photo-${service.image}?auto=format&fit=crop&w=600&h=400&q=80`}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} transition-opacity duration-300`} />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="glass text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {service.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 border border-white/20">
                      <service.icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                    </div>
                    <h3 className="text-white font-bold text-sm leading-snug mb-1.5 group-hover:text-yellow-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0 transform">
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-yellow-300 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

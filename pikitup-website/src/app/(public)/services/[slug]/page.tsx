"use client";
import { useEffect, useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, CheckCircle2, ArrowRight, Phone,
  Home, Building2, Wind, TreePine, Recycle, Layers,
  Truck, Calendar, MapPin, Clock, ShieldCheck, Package,
  BarChart3, Trash2, Leaf, Heart, AlertTriangle, Zap,
  FlaskConical, Users, Star, Timer, Archive, HelpCircle,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const SERVICES: Record<string, {
  title: string; tagline: string; desc: string;
  heroImage: string; heroGradient: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string; accentBg: string; accentBorder: string;
  stats: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }[];
  features: string[];
  subServices: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string }[];
  howItWorks: { step: string; title: string; desc: string }[];
  cta: { label: string; href: string };
  relatedSlugs: string[];
}> = {

  household: {
    title: "Household Waste Collection",
    tagline: "Essential waste services for every resident in Johannesburg",
    desc: "Pikitup provides a comprehensive range of Council Services to all residents of Greater Johannesburg. From weekly kerbside collection to litter bin management, street cleaning and garden refuse sites — our mandate covers every corner of the city to ensure a clean, healthy environment for all 5.8 million residents.",
    heroImage: "https://images.unsplash.com/photo-1651996378349-4b76df4a2dc6?auto=format&fit=crop&w=1920&h=800&q=85",
    heroGradient: "linear-gradient(160deg, rgba(6,45,20,0.97) 0%, rgba(14,68,38,0.88) 50%, rgba(6,45,20,0.6) 100%)",
    icon: Home,
    accentColor: "#22c55e",
    accentBg: "rgba(34,197,94,0.1)",
    accentBorder: "rgba(34,197,94,0.3)",
    stats: [
      { icon: Home,     value: "1.2M+",     label: "Households Served" },
      { icon: Truck,    value: "Weekly",     label: "Collection Frequency" },
      { icon: MapPin,   value: "7 Regions",  label: "City Coverage" },
      { icon: TreePine, value: "42 Sites",   label: "Garden Refuse Sites" },
    ],
    features: [
      "Weekly kerbside refuse collection for all formal dwellings",
      "Business round collected refuse (85L, 120L, 240L bins)",
      "Dailies (putrescible) collection from high-density areas",
      "Litter bin procurement, placement and maintenance citywide",
      "Street sweeping, lane flushing and area cleaning",
      "Collection and disposal of animal carcasses from public places",
      "Rapid removal of illegally dumped waste from road reserves",
      "Separation at source — recyclable materials collection",
      "42 garden refuse sites across Greater Johannesburg",
    ],
    subServices: [
      {
        icon: Home,
        title: "Domestic Waste Collection (RCR)",
        tag: "Residential",
        desc: "Once-weekly kerbside collection for all residents in formal dwellings across Greater Johannesburg — covering all 7 regions, suburbs, townships and informal settlements.",
      },
      {
        icon: Building2,
        title: "Business Round Collected Refuse",
        tag: "BRCR",
        desc: "Dedicated collection for businesses using 85 litre, 120 litre and 240 litre bins. Collection schedules tailored to business operating patterns and waste volumes.",
      },
      {
        icon: Timer,
        title: "Dailies — Putrescible Waste",
        tag: "High Density",
        desc: "Frequent collection of organic/putrescible waste from high-density areas, markets and food service operations to prevent health hazards and odours.",
      },
      {
        icon: Trash2,
        title: "Litter Bin Management",
        tag: "Public Spaces",
        desc: "Procurement, placement, fixing, maintenance and replacement of litter bins in public spaces — parks, taxi ranks, CBDs and pedestrian areas across the city.",
      },
      {
        icon: Wind,
        title: "Street Cleaning & Lane Flushing",
        tag: "Roads & Verges",
        desc: "Comprehensive cleaning of all litter and waste from the entire road reserve including streets, verges and gutters. Lane flushing to clear debris from storm drains.",
      },
      {
        icon: Heart,
        title: "Animal Carcass Removal",
        tag: "Public Health",
        desc: "Rapid collection and hygienic disposal of animal kills and carcasses found in public places — protecting residents from disease and maintaining clean public spaces.",
      },
      {
        icon: AlertTriangle,
        title: "Illegal Dumping Removal",
        tag: "Enforcement",
        desc: "Collection and disposal of illegally dumped waste from road reserves and vacant land. Coordinated with JMPD for enforcement action against repeat offenders.",
      },
      {
        icon: Recycle,
        title: "Recycling Activities",
        tag: "Environment",
        desc: "Pikitup collects recyclable material from residents who separate their waste at source — glass, paper, plastics, and metals directed to Material Recovery Facilities.",
      },
      {
        icon: TreePine,
        title: "Garden Site Operations",
        tag: "Green Waste",
        desc: "42 garden refuse sites across the city where residents can drop off light garden waste for free. Sites include containers for organic matter plus recycling receptacles for glass, paper, cans and plastic.",
      },
    ],
    howItWorks: [
      { step: "01", title: "Find Your Schedule", desc: "Search your suburb on the collection schedule tool to find your exact day and public holiday adjustments." },
      { step: "02", title: "Put Bins Out at 06:00", desc: "Place bins or black bags at the kerbside before 06:00 on collection day. Ensure bags are tied and bins not overfilled." },
      { step: "03", title: "Collection Happens", desc: "Our crew collects between 06:00 and 18:00 using a dedicated fleet. Special streams (recycling, garden) are collected separately." },
      { step: "04", title: "Report Missed Collection", desc: "If your collection is missed, report it via WhatsApp (082 779 1361) or call 0860 562874 within 24 hours for resolution." },
    ],
    cta: { label: "View Collection Schedules", href: "/collection-schedule" },
    relatedSlugs: ["recycling", "garden-refuse", "street-sweeping"],
  },

  business: {
    title: "Business Waste Services",
    tagline: "Integrated commercial waste solutions for blue-chip to small business",
    desc: "Pikitup's Commercial Services division delivers comprehensive refuse collection and disposal services for commercial customers — from large blue-chip corporates and industrial facilities to small traders. We offer tailored, cost-effective solutions including special waste, bulk skip hire, consultancy, safe disposal and event cleaning — underpinned by Service Level Agreements and certified disposal certificates.",
    heroImage: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=1920&h=800&q=85",
    heroGradient: "linear-gradient(160deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.88) 50%, rgba(15,23,42,0.6) 100%)",
    icon: Building2,
    accentColor: "#3b82f6",
    accentBg: "rgba(59,130,246,0.1)",
    accentBorder: "rgba(59,130,246,0.3)",
    stats: [
      { icon: Building2,   value: "All Sectors",  label: "Business Types Served" },
      { icon: Package,     value: "5m³–18m³",     label: "Skip Bin Range" },
      { icon: ShieldCheck, value: "Certified",     label: "Safe Disposal Docs" },
      { icon: BarChart3,   value: "Tailored",      label: "Waste Consultancy" },
    ],
    features: [
      "Refuse collection for large corporates and industrial facilities",
      "Special waste — liquid, sludge, solid industrial/mining waste",
      "Comprehensive event cleaning for exhibitions, sports and trade fairs",
      "Safe disposal and destruction of condemned products with certificate",
      "Bulk skip bins from 5m³ to 18m³ — delivered and collected",
      "Dailies (putrescible) collection from commercial premises",
      "Waste management consultancy — integrated one-stop solutions",
      "Ad-hoc skip hire for building rubble and residual materials",
      "4 operational landfills: Robinson Deep, Goudkoppies, Marie Louise, Ennerdale",
    ],
    subServices: [
      {
        icon: FlaskConical,
        title: "Special Waste Services",
        tag: "Industrial",
        desc: "Liquid, sludge or solid waste from manufacturing or industrial processes that cannot enter drains or sewers. Also covers bulky items that fall outside normal collection services. Pikitup visits your premises and provides a quote.",
      },
      {
        icon: Star,
        title: "Special Events Cleaning",
        tag: "Events",
        desc: "Comprehensive cleaning services for event organisers — sporting events, exhibitions, trade fairs and more. Cost is agreed upfront based on event nature and scope, before commencement.",
      },
      {
        icon: ShieldCheck,
        title: "Safe Disposal — Condemned Waste",
        tag: "Certified",
        desc: "Safe disposal or destruction of condemned products including foodstuffs, cosmetics and confidential documents. Includes authority inspection, transportation and a certificate of safe disposal once destruction is complete.",
      },
      {
        icon: Package,
        title: "Bulk Services (Skip Bins)",
        tag: "Commercial",
        desc: "Collection and disposal of bulk (skips) and dailies (putrescible) waste from commercial customers billed per lift. Skip bins from 5m³ to 18m³ delivered and collected from your site. Tariffs circulated on request.",
      },
      {
        icon: BarChart3,
        title: "Waste Management Consultancy",
        tag: "Advisory",
        desc: "A one-stop, integrated approach to managing your organisation's waste. We develop cost-effective, tailor-made waste management solutions aligned to your business operations and sustainability goals.",
      },
      {
        icon: Truck,
        title: "Ad-hoc Skip Hire",
        tag: "On Demand",
        desc: "Convenient and reliable skip bin hire for removal of residual building materials and construction waste. Available on demand — contact us to arrange delivery and collection at a time that suits your project.",
      },
      {
        icon: Layers,
        title: "Landfill Disposal Services",
        tag: "4 Sites",
        desc: "Pikitup's Disposal Division manages 4 operational landfills: Robinson Deep, Goudkoppies, Marie Louise and Ennerdale Landfill — providing permitted, environmentally compliant disposal for non-recyclable residual waste.",
      },
    ],
    howItWorks: [
      { step: "01", title: "Enquire", desc: "Call 011 375 5555 or submit an enquiry. Our commercial team responds within one business day to discuss your requirements." },
      { step: "02", title: "Site Assessment", desc: "We assess your waste volume, type and collection frequency needs and recommend the right service package for your business." },
      { step: "03", title: "SLA Agreement", desc: "A Service Level Agreement is formalised covering schedule, container sizes, pricing, reporting and disposal certification." },
      { step: "04", title: "Delivery & Reporting", desc: "Our dedicated commercial fleet delivers the service per agreement, with disposal certificates and online reports available." },
    ],
    cta: { label: "Contact Commercial Services", href: "/contact" },
    relatedSlugs: ["landfill", "recycling", "household"],
  },

  "street-sweeping": {
    title: "Street Sweeping & Area Cleaning",
    tagline: "Keeping 9,000+ km of Johannesburg roads clean every month",
    desc: "Pikitup is responsible for the mechanical and manual sweeping of all public roads, pavements and public spaces across Greater Johannesburg. Our fleet of mechanical sweepers and dedicated manual teams operate around the clock covering every road reserve — streets, verges and gutters — as part of a comprehensive area cleaning mandate.",
    heroImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&h=800&q=85",
    heroGradient: "linear-gradient(160deg, rgba(15,23,42,0.97) 0%, rgba(30,58,92,0.88) 50%, rgba(15,23,42,0.6) 100%)",
    icon: Wind,
    accentColor: "#64748b",
    accentBg: "rgba(100,116,139,0.1)",
    accentBorder: "rgba(100,116,139,0.3)",
    stats: [
      { icon: MapPin,   value: "9,000+ km", label: "Roads Cleaned Monthly" },
      { icon: Truck,    value: "60+",        label: "Mechanical Sweepers" },
      { icon: Clock,    value: "24/7",       label: "Operating Hours" },
      { icon: Wind,     value: "All Areas",  label: "CBDs & Parks" },
    ],
    features: [
      "Mechanical road sweeping covering 9,000+ km monthly",
      "Manual sweeping for pavements, gutters and stormwater inlets",
      "Full road reserve cleaning — streets, verges and gutters",
      "CBD and high-footfall area prioritised cleaning",
      "Lane flushing to clear debris and storm drain inlets",
      "Public park and open space maintenance",
      "Post-event clean-up services for public events",
      "24/7 operations for critical and high-traffic routes",
    ],
    subServices: [
      {
        icon: Wind,
        title: "Street Cleaning",
        tag: "Roads",
        desc: "Systematic cleaning of all litter and waste from the entire road reserve including the street surface, verges and gutters — ensuring every road across the 7 regions meets cleanliness standards.",
      },
      {
        icon: Zap,
        title: "Lane Flushing",
        tag: "Storm Drains",
        desc: "High-pressure flushing of traffic lanes and stormwater inlets to remove compacted debris, prevent flooding and maintain clear drainage channels throughout the city road network.",
      },
      {
        icon: MapPin,
        title: "Area Cleaning",
        tag: "Public Spaces",
        desc: "Targeted cleaning of high-density public areas including taxi ranks, bus stops, markets, parks and CBDs — maintaining sanitation and cleanliness in the spaces residents use most.",
      },
      {
        icon: Heart,
        title: "Animal Carcass Collection",
        tag: "Public Health",
        desc: "Rapid collection and safe disposal of animal kills and carcasses found in public places — protecting residents from disease vectors and maintaining clean public roads and spaces.",
      },
      {
        icon: AlertTriangle,
        title: "Illegal Dump Clearing",
        tag: "Enforcement",
        desc: "Collection and disposal of illegally dumped waste from road reserves and vacant land. Working with JMPD to monitor hotspots and enforce penalties against offenders.",
      },
    ],
    howItWorks: [
      { step: "01", title: "Scheduled Routes", desc: "Every area has a dedicated sweeping schedule based on traffic volume, cleanliness priority and road type classification." },
      { step: "02", title: "Mechanical Sweep", desc: "Mechanical sweepers clear road surfaces and gutters using rotating brushes and vacuum systems — fast and efficient over large distances." },
      { step: "03", title: "Manual Follow-up", desc: "Manual cleaning teams follow up on pavements, bus stops, taxi ranks and areas inaccessible to machinery for thorough coverage." },
      { step: "04", title: "Report Dirty Areas", desc: "Residents can report persistently dirty streets via WhatsApp (082 779 1361) or by calling 0860 562874 for rapid dispatch." },
    ],
    cta: { label: "Report a Dirty Area", href: "/report" },
    relatedSlugs: ["household", "recycling", "landfill"],
  },

  "garden-refuse": {
    title: "Garden Refuse Services",
    tagline: "42 sites across Johannesburg for free green waste drop-off",
    desc: "Pikitup operates 42 Garden Refuse Sites (GRS) across Greater Johannesburg where residents can drop off light garden waste for free. Sites are open Monday to Saturday from 07:00 to 17:00 and accept grass cuttings, branches, leaves and garden trimmings. All green waste is processed into mulch and compost, diverting organic material from landfill.",
    heroImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&h=800&q=85",
    heroGradient: "linear-gradient(160deg, rgba(10,40,15,0.97) 0%, rgba(21,83,38,0.88) 50%, rgba(10,40,15,0.6) 100%)",
    icon: TreePine,
    accentColor: "#65a30d",
    accentBg: "rgba(101,163,13,0.1)",
    accentBorder: "rgba(101,163,13,0.3)",
    stats: [
      { icon: MapPin,   value: "42 Sites",     label: "Citywide Drop-offs" },
      { icon: Recycle,  value: "Mulch",        label: "Waste Processed Into" },
      { icon: Clock,    value: "Mon–Sat",      label: "Open Hours" },
      { icon: Leaf,     value: "Free",         label: "Cost to Residents" },
    ],
    features: [
      "42 Garden Refuse Sites with free entry for Johannesburg residents",
      "Accepts grass cuttings, branches, leaves and garden trimmings",
      "Processed into mulch and compost — diverted from landfill",
      "All sites have receptacles for recyclables: glass, paper, cans, plastic",
      "Some sites have e-waste recycling facilities",
      "Open Monday to Saturday, 07:00 to 17:00",
      "Large bulk loads accepted where vehicle access permits",
      "Containers for organic matter provided at each site",
      "Compost transferred to composting facilities or disposal sites",
    ],
    subServices: [
      {
        icon: TreePine,
        title: "Light Garden Waste Drop-off",
        tag: "Free",
        desc: "Residents can drop off light garden waste — grass, branches, leaves, garden trimmings — at any of the 42 Pikitup Garden Refuse Sites free of charge during operating hours.",
      },
      {
        icon: Recycle,
        title: "Mulch & Compost Processing",
        tag: "Circular",
        desc: "Organic garden waste deposited at GRS sites is transferred to composting facilities where it is processed into mulch and compost, returning nutrients to soil and keeping material out of landfill.",
      },
      {
        icon: Archive,
        title: "Recycling Receptacles On-site",
        tag: "Multi-stream",
        desc: "All 42 Garden Refuse Sites have receptacles for recyclable materials — glass, paper, cans and plastic — making each site a convenient one-stop drop-off for both green and dry recyclable waste.",
      },
      {
        icon: Zap,
        title: "E-Waste Recycling",
        tag: "Selected Sites",
        desc: "Selected Garden Refuse Sites also have e-waste recycling facilities for safe collection of old electronics, batteries and electrical equipment — preventing hazardous materials from entering general waste streams.",
      },
    ],
    howItWorks: [
      { step: "01", title: "Prepare Your Waste", desc: "Separate garden waste from household refuse. Load into bags or a trailer for larger volumes — no construction rubble or general household waste accepted." },
      { step: "02", title: "Find Your Nearest Site", desc: "Use the Pikitup Facility Finder to locate your nearest of the 42 Garden Refuse Sites — all open Mon–Sat, 07:00–17:00." },
      { step: "03", title: "Drop Off for Free", desc: "Bring garden waste to the site during operating hours. Entry is free for all Johannesburg residents. Staff on site to assist." },
      { step: "04", title: "Processed Green", desc: "Your waste is transferred to composting facilities, processed into mulch and compost, and returned to the organic economy — zero to landfill." },
    ],
    cta: { label: "Find Nearest Garden Site", href: "/find-facility" },
    relatedSlugs: ["recycling", "household", "landfill"],
  },

  recycling: {
    title: "Recycling Services",
    tagline: "Turning Johannesburg's waste into resources for a circular economy",
    desc: "Pikitup drives recycling across Johannesburg through a network of community drop-off points, separation at source programmes, Material Recovery Facilities and partnerships with the recycling industry. We collect recyclable materials from residents who separate their waste at source — with a citywide target of 67% waste diversion from landfill by 2030.",
    heroImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1920&h=800&q=85",
    heroGradient: "linear-gradient(160deg, rgba(5,46,40,0.97) 0%, rgba(13,73,64,0.88) 50%, rgba(5,46,40,0.6) 100%)",
    icon: Recycle,
    accentColor: "#14b8a6",
    accentBg: "rgba(20,184,166,0.1)",
    accentBorder: "rgba(20,184,166,0.3)",
    stats: [
      { icon: MapPin,    value: "400+",       label: "Drop-off Points" },
      { icon: Recycle,   value: "67%",        label: "2030 Diversion Target" },
      { icon: Users,     value: "Citywide",   label: "Community Programme" },
      { icon: Leaf,      value: "4 Streams",  label: "Materials Collected" },
    ],
    features: [
      "400+ community recycling drop-off points across the city",
      "Separation at source — colour-coded bag system",
      "Paper, plastic, glass and metal kerbside collection",
      "Material Recovery Facilities (MRFs) for sorting and baling",
      "E-waste and hazardous material referral services",
      "School and community recycling education programmes",
      "Garden site recycling receptacles at all 42 GRS locations",
      "Partnership with registered recyclers for material offtake",
      "Zero Waste 2030 — Johannesburg's circular economy strategy",
    ],
    subServices: [
      {
        icon: Home,
        title: "Separation at Source",
        tag: "Kerbside",
        desc: "Pikitup collects recyclable materials from residents who separate their waste at their properties using the colour-coded bag system — recyclables, organics and residual waste collected separately on the same day.",
      },
      {
        icon: MapPin,
        title: "Community Drop-off Points",
        tag: "400+ Sites",
        desc: "400+ strategically placed community recycling drop-off points across all 7 regions of Greater Johannesburg accept glass, paper, plastic and metal from residents at any time.",
      },
      {
        icon: Archive,
        title: "Material Recovery Facilities",
        tag: "Processing",
        desc: "Collected recyclables are transported to Pikitup's Material Recovery Facilities where they are sorted by material type, baled and dispatched to registered recycling industry partners for processing into new products.",
      },
      {
        icon: Zap,
        title: "E-Waste Collection",
        tag: "Hazardous",
        desc: "Selected drop-off sites and Garden Refuse Sites accept e-waste — old electronics, batteries, light bulbs and electrical equipment — for safe, compliant disposal through accredited e-waste recyclers.",
      },
      {
        icon: Users,
        title: "Recycling Education",
        tag: "Community",
        desc: "Pikitup drives recycling behaviour change through school programmes, community workshops and awareness campaigns — building a culture of responsible waste separation across all of Johannesburg's communities.",
      },
    ],
    howItWorks: [
      { step: "01", title: "Separate at Home", desc: "Use the Pikitup colour-coded system: green bag for recyclables, orange for organics, black for general waste. Sort as you go." },
      { step: "02", title: "Drop Off or Kerbside", desc: "Take recyclables to a drop-off point, or put them kerbside on your regular collection day if your area is in the separation at source programme." },
      { step: "03", title: "MRF Processing", desc: "Materials go to a Material Recovery Facility — sorted by type, baled, and sent to recycling industry partners for processing." },
      { step: "04", title: "New Life", desc: "Recycled materials re-enter the supply chain as raw material for new products, closing the loop and reducing demand for virgin resources." },
    ],
    cta: { label: "Find a Drop-off Point", href: "/find-facility" },
    relatedSlugs: ["garden-refuse", "household", "landfill"],
  },

  landfill: {
    title: "Landfill Disposal",
    tagline: "Four NEMWA-licensed sites for regulated waste disposal",
    desc: "Pikitup's Disposal Division manages 4 operational landfill sites — Robinson Deep, Goudkoppies, Marie Louise and Ennerdale Landfill — for the disposal of residual non-recyclable waste. All sites are managed to strict environmental standards under the National Environmental Management: Waste Act, including leachate collection, gas monitoring, daily cell cover and ongoing groundwater compliance.",
    heroImage: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=1920&h=800&q=85",
    heroGradient: "linear-gradient(160deg, rgba(28,20,10,0.97) 0%, rgba(45,35,15,0.88) 50%, rgba(28,20,10,0.6) 100%)",
    icon: Layers,
    accentColor: "#d97706",
    accentBg: "rgba(217,119,6,0.1)",
    accentBorder: "rgba(217,119,6,0.3)",
    stats: [
      { icon: MapPin,     value: "4 Sites",     label: "Active Landfills" },
      { icon: Truck,      value: "6,000+ t/d",  label: "Waste Received Daily" },
      { icon: ShieldCheck,value: "NEMWA",       label: "Licensed & Compliant" },
      { icon: Leaf,       value: "Methane",     label: "Gas Capture Active" },
    ],
    features: [
      "4 NEMWA-licensed landfill sites across Greater Johannesburg",
      "Robinson Deep, Goudkoppies, Marie Louise and Ennerdale sites",
      "Engineered lined cells with daily compaction and cover",
      "Leachate collection and management systems on all sites",
      "Landfill gas monitoring and methane capture infrastructure",
      "Weighbridge control and waste tracking at all entry points",
      "Environmental compliance reporting to GDARD",
      "Accepts permitted general and limited hazardous waste",
      "Post-closure monitoring programme for rehabilitated cells",
    ],
    subServices: [
      {
        icon: MapPin,
        title: "Robinson Deep Landfill",
        tag: "Johannesburg South",
        desc: "One of Pikitup's primary disposal facilities serving southern Johannesburg — receiving processed, non-recyclable general waste from residential and commercial collection routes.",
      },
      {
        icon: MapPin,
        title: "Goudkoppies Landfill",
        tag: "Soweto Area",
        desc: "Serving the Soweto and western Johannesburg area, Goudkoppies is a key regional disposal site equipped with leachate management and environmental monitoring systems.",
      },
      {
        icon: MapPin,
        title: "Marie Louise Landfill",
        tag: "Northern Region",
        desc: "Licensed disposal facility serving northern Johannesburg — accepting non-recyclable residual waste from residential, commercial and industrial collection routes with full compliance monitoring.",
      },
      {
        icon: MapPin,
        title: "Ennerdale Landfill",
        tag: "South West",
        desc: "Ennerdale serves the south-western regions of Greater Johannesburg, providing compliant general waste disposal with engineered liner, leachate collection and active gas management.",
      },
      {
        icon: Leaf,
        title: "Landfill Gas Recovery",
        tag: "Clean Energy",
        desc: "Methane gas generated by decomposing organic waste in Pikitup's landfills is captured and managed — preventing greenhouse gas emissions and creating potential for clean energy generation.",
      },
      {
        icon: HelpCircle,
        title: "Commercial Landfill Access",
        tag: "Direct Disposal",
        desc: "Businesses and commercial operators can access Pikitup landfill sites directly via the weighbridge for permitted waste disposal, billed according to the circulated tariff schedule per tonne.",
      },
    ],
    howItWorks: [
      { step: "01", title: "Waste Hierarchy First", desc: "Landfill is the last resort. Pikitup first prioritises waste reduction, reuse, recycling and recovery before any disposal to landfill." },
      { step: "02", title: "Permitted Waste Only", desc: "All vehicles pass through the weighbridge. Only non-recyclable residual waste with a valid permit is accepted for disposal at Pikitup sites." },
      { step: "03", title: "Engineered Cells", desc: "Waste is deposited into lined engineered cells, compacted by landfill compactors and covered daily — controlling litter, pests, odours and fire risk." },
      { step: "04", title: "Lifetime Monitoring", desc: "Groundwater, leachate and gas monitoring continues throughout the active life of each site and during post-closure rehabilitation phases." },
    ],
    cta: { label: "Find a Landfill Site", href: "/find-facility" },
    relatedSlugs: ["recycling", "business", "household"],
  },
};

/* ─── Animated counter ──────────────────────────────────────────────────── */
function AnimatedStat({ value, label, icon: Icon, accent }: {
  value: string; label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
        <span style={{ color: accent }} className="flex"><Icon className="w-5 h-5" /></span>
      </div>
      <div>
        <p className="text-white font-black text-xl leading-none">{value}</p>
        <p className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
      </div>
    </div>
  );
}

/* ─── Sub-service card ──────────────────────────────────────────────────── */
function SubServiceCard({ sub, accent, accentBg, accentBorder, index }: {
  sub: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string };
  accent: string; accentBg: string; accentBorder: string; index: number;
}) {
  const Icon = sub.icon;
  return (
    <div
      className="group relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
          <span style={{ color: accent }} className="flex"><Icon className="w-6 h-6" /></span>
        </div>
        {sub.tag && (
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: accentBg, color: accent, border: `1px solid ${accentBorder}` }}>
            {sub.tag}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-current transition-colors" style={{ "--accent": accent } as React.CSSProperties}>
          {sub.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{sub.desc}</p>
      </div>
      <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ background: accent }} />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const svc = SERVICES[slug];
  if (!svc) notFound();

  const Icon = svc.icon;
  const [headerVisible, setHeaderVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const RELATED = svc.relatedSlugs.map(s => SERVICES[s]).filter(Boolean);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={svc.heroImage} alt={svc.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: svc.heroGradient }} />
          {/* Dot grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 py-20 w-full transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{svc.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              {/* Icon badge */}
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full" style={{ background: svc.accentBg, border: `1px solid ${svc.accentBorder}` }}>
                <span style={{ color: svc.accentColor }} className="flex"><Icon className="w-5 h-5" /></span>
                <span className="text-sm font-bold" style={{ color: svc.accentColor }}>Pikitup Service</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-[1.05]">
                {svc.title}
              </h1>
              <p className="text-xl max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                {svc.tagline}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {svc.stats.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} icon={s.icon} accent={svc.accentColor} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, #f9fafb, transparent)" }} />
      </section>

      {/* ── Overview + Features ──────────────────────────────────────────── */}
      <section style={{ background: "#f9fafb" }} className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 rounded" style={{ background: svc.accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: svc.accentColor }}>Service Overview</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              About this service
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">{svc.desc}</p>
            <Link href={svc.cta.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:gap-3"
              style={{ background: svc.accentColor }}>
              {svc.cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 rounded" style={{ background: svc.accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: svc.accentColor }}>What&apos;s Included</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Key highlights
            </h2>
            <ul className="space-y-3">
              {svc.features.map((f) => (
                <li key={f} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white">
                  <span style={{ color: svc.accentColor }} className="flex mt-0.5 shrink-0"><CheckCircle2 className="w-5 h-5" /></span>
                  <span className="text-gray-700 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Sub-services grid ─────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 rounded" style={{ background: svc.accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: svc.accentColor }}>Service Breakdown</span>
              <div className="w-6 h-0.5 rounded" style={{ background: svc.accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Everything we offer</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              A detailed look at every component of the {svc.title.toLowerCase()} service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {svc.subServices.map((sub, i) => (
              <SubServiceCard
                key={sub.title} sub={sub} index={i}
                accent={svc.accentColor}
                accentBg={svc.accentBg}
                accentBorder={svc.accentBorder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 rounded" style={{ background: svc.accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: svc.accentColor }}>Process</span>
              <div className="w-6 h-0.5 rounded" style={{ background: svc.accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How it works</h2>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5" style={{ background: `linear-gradient(90deg, ${svc.accentColor}40, ${svc.accentColor}, ${svc.accentColor}40)` }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {svc.howItWorks.map((step, i) => (
                <div key={step.step} className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: i === 0 ? svc.accentColor : "#fff", border: `2px solid ${svc.accentColor}`, boxShadow: `0 0 0 4px ${svc.accentBg}` }}>
                    <span className="text-xl font-black" style={{ color: i === 0 ? "#fff" : svc.accentColor }}>{step.step}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact infographic band ───────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #071409 0%, #0f2a18 50%, #071409 100%)", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute" style={{ top: -80, right: "5%", width: 400, height: 400, background: `radial-gradient(circle, ${svc.accentColor}18 0%, transparent 65%)`, borderRadius: "50%" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-0.5 rounded" style={{ background: svc.accentColor }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: svc.accentColor }}>Why It Matters</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Service impact at a glance</h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Real-world impact of Pikitup&apos;s {svc.title.toLowerCase()} across Greater Johannesburg.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {svc.stats.map((s) => {
                const SI = s.icon;
                return (
                  <div key={s.label} className="text-center p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ color: svc.accentColor }} className="flex justify-center mb-3"><SI className="w-6 h-6" /></span>
                    <p className="text-white font-black text-xl leading-none">{s.value}</p>
                    <p className="text-xs mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: svc.accentColor }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Need {svc.title}?
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
            Our team is ready to help. Call <strong className="text-white">0860 562874</strong> or get in touch online.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href={svc.cta.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "#fff", color: svc.accentColor }}>
              {svc.cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm border transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}>
              <Phone className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related services ─────────────────────────────────────────────── */}
      {RELATED.length > 0 && (
        <section className="py-16 px-4" style={{ background: "#fff" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Related Services</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {RELATED.map((rel, i) => {
                const s = svc.relatedSlugs[i];
                const RIcon = rel!.icon;
                return (
                  <Link key={s} href={`/services/${s}`}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all bg-gray-50 hover:bg-white">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: rel!.accentBg, border: `1px solid ${rel!.accentBorder}` }}>
                      <span style={{ color: rel!.accentColor }} className="flex"><RIcon className="w-5 h-5" /></span>
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm mb-1 group-hover:text-current transition-colors">{rel!.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-2">{rel!.tagline}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto shrink-0 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

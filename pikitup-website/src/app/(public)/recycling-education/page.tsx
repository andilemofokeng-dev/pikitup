import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Recycling Education",
  description:
    "Learn about separation at source, composting, recycling guides and waste reduction tips from Pikitup Johannesburg.",
};

const wasteItems = [
  { item: "Glass bottle", action: "Glass recycling bin or drop-off", colour: "blue" },
  { item: "Plastic bottle", action: "Green bag / recycling drop-off", colour: "green" },
  { item: "Cardboard box", action: "Recycling drop-off — flatten first", colour: "green" },
  { item: "Food waste", action: "Orange bag / compost at home", colour: "orange" },
  { item: "Garden prunings", action: "Garden refuse site / compost", colour: "green" },
  { item: "Battery", action: "Battery recycling point at hardware stores", colour: "red" },
  { item: "Old tyres", action: "Tyre dealers or special waste drop-off", colour: "red" },
  { item: "Paint / chemicals", action: "Special waste facility — call first", colour: "red" },
  { item: "Building rubble", action: "Landfill site (limited acceptance)", colour: "gray" },
  { item: "Clothing", action: "Charity bins or fabric recycler", colour: "yellow" },
  { item: "Electronic waste", action: "e-Waste drop-off at retail stores", colour: "purple" },
  { item: "Cooking oil", action: "Oil recycling points — check facility finder", colour: "orange" },
];

const colourMap: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  gray: "bg-gray-100 text-gray-700",
  yellow: "bg-yellow-100 text-yellow-700",
  purple: "bg-purple-100 text-purple-700",
};

const tips = [
  {
    emoji: "🗑️",
    title: "Separate Your Waste",
    body: "Use separate bags or bins for recyclables, organic waste and general waste. Even small steps make a big difference.",
  },
  {
    emoji: "🌱",
    title: "Compost Food Waste",
    body: "Up to 40% of household waste is organic. Start a compost heap or worm farm and turn food scraps into garden gold.",
  },
  {
    emoji: "🛍️",
    title: "Reduce Single-Use Plastic",
    body: "Bring reusable bags, use a refillable water bottle, and choose products with less packaging.",
  },
  {
    emoji: "📦",
    title: "Crush, Rinse, Flatten",
    body: "Rinse containers before recycling. Crush cans and flatten cardboard to save space and improve recycling quality.",
  },
  {
    emoji: "🏭",
    title: "Buy Recycled Products",
    body: "Choose products made from recycled material to close the loop and support the recycling economy.",
  },
  {
    emoji: "📚",
    title: "Educate Your Household",
    body: "Teach children and household members about sorting waste correctly — habits formed early last a lifetime.",
  },
];

const programmes = [
  {
    title: "Schools Waste Education",
    desc: "Pikitup partners with Johannesburg schools to deliver age-appropriate waste education programmes.",
    action: "Contact your depot",
  },
  {
    title: "Community Clean-ups",
    desc: "Volunteer-led clean-up events supported by Pikitup with equipment and waste removal assistance.",
    action: "Register your event",
  },
  {
    title: "Separation at Source",
    desc: "Households in programme areas receive colour-coded bags and regular collection of separated waste.",
    action: "Check if your area qualifies",
  },
];

export default function RecyclingEducationPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Recycling Education</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Recycling &amp; Waste Reduction
          </h1>
          <p className="text-green-100 text-xl max-w-2xl mb-6">
            Learn how to reduce, reuse and recycle in Johannesburg. Small changes at home
            make a big difference for our city&apos;s environment.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#what-can-i-do">
              <Button variant="gold" size="lg">What can I do with this waste?</Button>
            </a>
            <a href="#tips">
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                Recycling Tips
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* What can I do with this */}
      <section id="what-can-i-do" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">What Can I Do With This Waste?</h2>
            <p className="section-subheading">
              Find out how to properly dispose of common household items in Johannesburg
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for a waste item (e.g. battery, glass)..."
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wasteItems.map((item) => (
              <div
                key={item.item}
                className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all"
              >
                <div className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${colourMap[item.colour]}`}>
                  {item.item}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.action}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Not listed?{" "}
            <Link href="/contact" className="text-green-700 hover:underline">
              Contact us
            </Link>{" "}
            and we will advise on correct disposal.
          </p>
        </div>
      </section>

      {/* Separation at source guide */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">Separation at Source — How It Works</h2>
            <p className="section-subheading">
              Pikitup&apos;s colour-coded bag system for participating households
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            {[
              { colour: "bg-green-500", name: "Green Bag", desc: "Dry Recyclables\nPaper, Plastic, Glass, Cans, Cardboard" },
              { colour: "bg-orange-500", name: "Orange Bag", desc: "Organic Waste\nFood scraps, peelings, garden clippings" },
              { colour: "bg-gray-800", name: "Black Bag", desc: "General Waste\nAnything that cannot be recycled or composted" },
            ].map((bag) => (
              <div key={bag.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className={`w-16 h-16 ${bag.colour} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl`}>
                  🛍️
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{bag.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">{bag.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Separation at source collection is rolling out across all 7 regions by 2027.{" "}
            <Link href="/collection-schedule" className="text-green-700 font-medium hover:underline">
              Check if your area is included →
            </Link>
          </p>
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading">Waste Reduction Tips</h2>
            <p className="section-subheading">
              Practical steps every Johannesburg household can take today
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips.map((tip) => (
              <Card key={tip.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="text-4xl mb-3">{tip.emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tip.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Community Programmes</h2>
            <p className="text-gray-400">
              Get involved in Pikitup&apos;s community waste reduction programmes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {programmes.map((prog) => (
              <div
                key={prog.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-white mb-3">{prog.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{prog.desc}</p>
                <Link href="/contact" className="text-green-400 text-sm font-medium hover:text-green-300">
                  {prog.action} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

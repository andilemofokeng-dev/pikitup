"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  MapPin,
  Truck,
  Bell,
  ChevronRight,
  AlertCircle,
  Info,
} from "lucide-react";

const RegionMap = dynamic(() => import("@/components/map/RegionMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
      <div className="text-center">
        <div className="w-7 h-7 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-gray-500">Loading map…</p>
      </div>
    </div>
  ),
});

const regions = [
  "Region A — Johannesburg North",
  "Region B — Johannesburg East",
  "Region C — Johannesburg South",
  "Region D — Soweto",
  "Region E — Midrand",
  "Region F — Johannesburg West",
  "Region G — Orange Farm",
];

const mockResult = {
  address: "123 Main Road, Sandton",
  suburb: "Sandton",
  region: "Region A — Johannesburg North",
  depot: "Halfway House Depot",
  collectionDay: "Tuesday",
  nextCollection: "Tuesday, 10 June 2026",
  serviceType: "Household Refuse",
  recyclingDay: "Thursday (every 2 weeks)",
  gardenRefuse: "Friday",
  disruptions: [
    {
      type: "warning",
      message: "Youth Day (16 June): Tuesday 17 June collection. Garden refuse suspended.",
    },
  ],
};

export default function CollectionSchedulePage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) setSearched(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Collection Schedule</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Find Your Collection Day
          </h1>
          <p className="text-green-100 text-xl max-w-2xl mb-8">
            Enter your suburb, street name, or ward number to find your refuse collection
            schedule and any upcoming changes.
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-2 flex gap-2 max-w-2xl shadow-lg"
          >
            <div className="flex items-center gap-2 flex-1 pl-3">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter suburb, street name or ward number..."
                className="flex-1 outline-none text-gray-800 text-sm bg-transparent placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" variant="gold" className="shrink-0">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Johannesburg regions map */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Johannesburg Collection Regions</h2>
              <p className="text-sm text-gray-500 mt-0.5">Click a region marker to see collection days and depot info</p>
            </div>
            <span className="text-xs text-gray-400 hidden sm:block">Powered by Google Maps</span>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-[460px]">
            <RegionMap />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {!searched ? (
            <div className="grid md:grid-cols-2 gap-10">
              {/* Browse by region */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Browse by Region</h2>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => { setQuery(region); setSearched(true); }}
                      className="w-full text-left flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                    >
                      <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                        {region}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-green-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Collection Tips</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Truck,
                      title: "Put your bins out the night before",
                      desc: "Place your refuse bags/bins at the kerbside by 06:00 on collection day.",
                    },
                    {
                      icon: Bell,
                      title: "Subscribe to reminders",
                      desc: "Register on the Resident Portal to receive collection day reminders via SMS, email or WhatsApp.",
                    },
                    {
                      icon: Calendar,
                      title: "Public holiday changes",
                      desc: "Collections on public holidays shift to the next working day. Check the notices section for updates.",
                    },
                    {
                      icon: AlertCircle,
                      title: "Missed your collection?",
                      desc: "Report missed collections online and we will reschedule or investigate within 48 hours.",
                    },
                  ].map((tip) => (
                    <div key={tip.title} className="flex gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                        <tip.icon className="w-4 h-4 text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{tip.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setSearched(false)}
                className="text-sm text-green-700 font-medium hover:underline mb-6 flex items-center gap-1"
              >
                ← Back to search
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Collection schedule for: <span className="text-green-700">{query}</span>
              </h2>

              {/* Disruption alert */}
              {mockResult.disruptions.map((d, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-5"
                >
                  <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">{d.message}</p>
                </div>
              ))}

              {/* Main result card */}
              <Card className="border-green-200 mb-5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Address</p>
                      <p className="text-sm font-semibold text-gray-900">{mockResult.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Region</p>
                      <p className="text-sm font-medium text-gray-800">{mockResult.region}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Depot</p>
                      <p className="text-sm font-medium text-gray-800">{mockResult.depot}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Collection Day</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{mockResult.collectionDay}</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Next Collection</p>
                      <p className="text-sm font-semibold text-green-700">
                        {mockResult.nextCollection}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Recycling Collection</p>
                      <p className="text-sm text-gray-700">{mockResult.recyclingDay}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Garden Refuse</p>
                      <p className="text-sm text-gray-700">{mockResult.gardenRefuse}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 flex-wrap">
                <Link href="/resident-portal/register">
                  <Button size="sm">
                    <Bell className="w-4 h-4" />
                    Get Reminders
                  </Button>
                </Link>
                <Link href="/report?type=missed-collection">
                  <Button size="sm" variant="outline">Report Missed Collection</Button>
                </Link>
              </div>

              <div className="mt-6 flex items-start gap-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700">
                  This schedule is based on available data and may change due to public holidays,
                  weather or operational requirements. Always check for notices before collection day.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Recycle, Leaf, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn } from "@/components/ui/animate";

const facts = [
  { icon: Recycle, stat: "50%", text: "of household waste can be recycled or composted today" },
  { icon: Zap,     stat: "R3.2bn", text: "worth of recyclables are sent to landfill in SA annually" },
  { icon: Leaf,    stat: "90 days", text: "is all it takes for food waste to become rich garden compost" },
];

export default function RecyclingCTA() {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-green-900/10 grid lg:grid-cols-2">
          {/* Left: content */}
          <SlideIn direction="left" className="bg-white p-10 md:p-14 flex flex-col justify-center">
            <span className="section-label">Sustainability</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
              Join Johannesburg&apos;s<br />
              <span className="gradient-text-green">Green Revolution</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every household can make a difference. Learn how to separate your waste,
              reduce what goes to landfill, and participate in Pikitup&apos;s community
              recycling and composting programmes.
            </p>
            <div className="space-y-4 mb-10">
              {[
                "Separation at source guides for every household",
                "Recycling drop-off points across all 7 regions",
                "Free composting education and garden refuse drop-offs",
                "School and community education programmes",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </div>
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/recycling-education">
                <Button size="lg" className="group shadow-lg shadow-green-900/20">
                  Recycling Guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/recycling-education#what-can-i-do">
                <Button size="lg" variant="outline">
                  What can I do with this waste?
                </Button>
              </Link>
            </div>
          </SlideIn>

          {/* Right: dark panel with image + facts */}
          <SlideIn direction="right" className="relative bg-green-950 p-10 md:p-14 flex flex-col justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="https://picsum.photos/seed/recycle-nature/800/600"
                alt="Recycling and sustainability"
                fill
                className="object-cover opacity-20"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 to-green-900/80" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-green-300 text-sm border border-white/10">
                <Recycle className="w-4 h-4 text-green-400" />
                Did you know?
              </div>
              <div className="space-y-7">
                {facts.map((fact) => (
                  <FadeIn key={fact.stat}>
                    <div className="flex items-start gap-5">
                      <div className="text-4xl font-black text-yellow-300 w-28 shrink-0 leading-none">
                        {fact.stat}
                      </div>
                      <div className="flex items-start gap-3 pt-1">
                        <fact.icon className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-green-200/80 text-sm leading-relaxed">{fact.text}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-green-300/60 text-xs">
                  Pikitup&apos;s waste diversion target:{" "}
                  <strong className="text-green-300">50% by 2030</strong>
                </p>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

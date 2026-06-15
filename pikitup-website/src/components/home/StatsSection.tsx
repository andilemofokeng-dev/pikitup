import { Trash2, Users, MapPin, Recycle, Truck, TreePine } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animate";

const stats = [
  { icon: Users,   value: 4500,   suffix: "+", label: "Employees",            sub: "serving Johannesburg every day",   color: "text-green-400" },
  { icon: Truck,   value: 200,    suffix: "+", label: "Trucks in Fleet",      sub: "collecting across all 7 regions",  color: "text-blue-400" },
  { icon: Trash2,  value: 6000,   suffix: "+", label: "Tonnes Collected Daily",sub: "from households & businesses",    color: "text-yellow-400" },
  { icon: MapPin,  value: 12,     suffix: "",  label: "Waste Depots",         sub: "across Greater Johannesburg",      color: "text-teal-400" },
  { icon: TreePine,value: 44,     suffix: "",  label: "Garden Refuse Sites",  sub: "with recycling receptacles",       color: "text-orange-400" },
  { icon: Recycle, value: 9000,   suffix: "+", label: "km Streets Cleaned",   sub: "across 7 regions every month",     color: "text-purple-400" },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-green-950">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern" />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-green-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <span className="section-label text-green-400">By the numbers</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Serving Johannesburg{" "}
            <span className="gradient-text">Every Day</span>
          </h2>
          <p className="text-green-300/70 text-lg max-w-xl mx-auto">
            Our commitment to a clean, healthy and sustainable city — in numbers
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-5" stagger={0.08}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors group">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-4xl md:text-5xl font-black mb-1 ${stat.color}`}>
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={2400} />
                </div>
                <div className="text-white font-bold text-sm mb-1">{stat.label}</div>
                <div className="text-green-400/60 text-xs leading-relaxed">{stat.sub}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

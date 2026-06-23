"use client";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";

const wasteData = [
  { year: "2020/21", tonnes: 1.42, recycling: 8.2, fleet: 72, resolved: 68 },
  { year: "2021/22", tonnes: 1.51, recycling: 9.1, fleet: 75, resolved: 74 },
  { year: "2022/23", tonnes: 1.58, recycling: 10.4, fleet: 79, resolved: 81 },
  { year: "2023/24", tonnes: 1.63, recycling: 11.8, fleet: 82, resolved: 85 },
];

const GOLD   = "#f0b429";
const GREEN  = "#22c55e";
const TEAL   = "#2dd4bf";
const VIOLET = "#a78bfa";

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 20, padding: "28px 24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    }}>
      <p style={{ color: "#111827", fontWeight: 800, fontSize: "1rem", marginBottom: 4 }}>{title}</p>
      <p style={{ color: "#6b7280", fontSize: "0.78rem", marginBottom: 20 }}>{subtitle}</p>
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload, label, unit }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string; unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12, padding: "10px 14px", fontSize: "12px",
    }}>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontWeight: 700 }}>
          {p.name}: {p.value}{unit ?? ""}
        </p>
      ))}
    </div>
  );
}

export default function AnnualReportCharts() {
  return (
    <section style={{ background: "#f8faf9", borderTop: "1px solid #e5e7eb" }} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <div style={{ width: 24, height: 3, background: "#16a34a", borderRadius: 2 }} />
          <span style={{ color: "#16a34a", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Performance Trends
          </span>
        </div>
        <h2 style={{ color: "#111827", fontWeight: 900, fontSize: "1.5rem", marginBottom: 8 }}>
          Key Metrics at a Glance
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: 36 }}>
          Four-year operational and environmental performance — 2020/21 through 2023/24.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Waste collected area chart */}
          <ChartCard
            title="Waste Collected (Million Tonnes)"
            subtitle="Total household & commercial waste collected annually"
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={wasteData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTonnes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={GREEN} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis domain={[1.3, 1.7]} tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `${v}M`} />
                <Tooltip content={(p) => <CustomTooltip {...p} unit="M t" />} />
                <Area
                  type="monotone" dataKey="tonnes" name="Waste Collected"
                  stroke={GREEN} strokeWidth={2.5}
                  fill="url(#gradTonnes)" dot={{ fill: GREEN, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Recycling rate bar chart */}
          <ChartCard
            title="Recycling Rate (%)"
            subtitle="Percentage of collected waste diverted from landfill"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={wasteData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis domain={[0, 15]} tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={(p) => <CustomTooltip {...p} unit="%" />} />
                <Bar dataKey="recycling" name="Recycling Rate" fill={GOLD} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Fleet availability line chart */}
          <ChartCard
            title="Fleet Availability (%)"
            subtitle="Percentage of vehicles operational and available for deployment"
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={wasteData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={(p) => <CustomTooltip {...p} unit="%" />} />
                <Line
                  type="monotone" dataKey="fleet" name="Fleet Availability"
                  stroke={TEAL} strokeWidth={2.5}
                  dot={{ fill: TEAL, r: 4 }} activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Complaints resolved bar chart */}
          <ChartCard
            title="Complaints Resolved (%)"
            subtitle="Percentage of service complaints resolved within SLA"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={wasteData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={(p) => <CustomTooltip {...p} unit="%" />} />
                <Bar dataKey="resolved" name="Resolved" fill={VIOLET} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

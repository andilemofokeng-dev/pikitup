import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import NoticesBanner from "@/components/home/NoticesBanner";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import ImpactInfographic from "@/components/home/ImpactInfographic";
import RecyclingCTA from "@/components/home/RecyclingCTA";

export const metadata: Metadata = {
  title: "Pikitup Johannesburg | Official Integrated Waste Management",
  description:
    "Pikitup is Johannesburg's official waste management company — 1.2M+ households served, 6,000 tonnes collected daily. Find your collection schedule, report illegal dumping, and access recycling services.",
  alternates: { canonical: "https://www.pikitup.co.za" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <NoticesBanner />
      <ServicesGrid />
      <StatsSection />
      <ImpactInfographic />
      <RecyclingCTA />
    </>
  );
}

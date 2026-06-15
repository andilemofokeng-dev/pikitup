import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import NoticesBanner from "@/components/home/NoticesBanner";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import RecyclingCTA from "@/components/home/RecyclingCTA";
import NewsSection from "@/components/home/NewsSection";
import PortalCTA from "@/components/home/PortalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <NoticesBanner />
      <ServicesGrid />
      <StatsSection />
      <RecyclingCTA />
      <NewsSection />
      <PortalCTA />
    </>
  );
}

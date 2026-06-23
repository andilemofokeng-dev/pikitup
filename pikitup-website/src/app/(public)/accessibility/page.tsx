import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Eye, Type, MousePointer2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Pikitup Johannesburg's commitment to web accessibility — WCAG 2.1 compliance, assistive technology support and how to get help.",
};

const features = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    items: [
      "Colour contrast ratios meet WCAG 2.1 AA standard (minimum 4.5:1)",
      "Text can be resized up to 200% without loss of functionality",
      "Images have descriptive alt text for screen readers",
      "Colour is never used as the sole means of conveying information",
    ],
  },
  {
    icon: Type,
    title: "Keyboard & Navigation",
    items: [
      "All interactive elements are accessible via keyboard",
      "Skip navigation links are available",
      "Focus indicators are clearly visible",
      "Logical heading structure (H1–H6) throughout",
    ],
  },
  {
    icon: MousePointer2,
    title: "Assistive Technology",
    items: [
      "Compatible with JAWS, NVDA and VoiceOver screen readers",
      "ARIA landmarks and labels are used throughout",
      "Form fields have visible labels and helpful error messages",
      "PDFs are tagged for screen reader compatibility",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 text-green-200/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Accessibility</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-2xl flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Accessibility Statement</h1>
              <p className="text-green-200">Pikitup is committed to making this website accessible to everyone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Pikitup Johannesburg is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for all users and apply relevant accessibility standards. This website aims to conform to the{" "}
            <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
          </p>

          <div className="space-y-10 mb-12">
            {features.map((feature) => {
              const FIcon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <FIcon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                    <ul className="space-y-2.5">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-7 bg-green-50 rounded-2xl border border-green-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Need help? Contact us.</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you experience any accessibility barriers on this website, or need information in an alternative format, please contact us. We are committed to providing a reasonable accommodation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+27113755555">
                    <Button size="sm">Call: 011 375 5555</Button>
                  </a>
                  <a href="mailto:accessibility@pikitup.co.za">
                    <Button size="sm" variant="outline">Email Us</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-8">
            This statement was prepared in June 2026. We review accessibility at least annually and update this statement accordingly.
          </p>
        </div>
      </section>
    </>
  );
}

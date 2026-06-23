import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions governing the use of the Pikitup Johannesburg website and digital services.",
};

const terms = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using the Pikitup Johannesburg website (www.pikitup.co.za), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the website. Pikitup reserves the right to update these terms at any time without prior notice.",
  },
  {
    title: "Use of the Website",
    content:
      "This website is provided for informational purposes and to enable residents to access Pikitup's services, including reporting complaints, finding collection schedules and locating facilities. You agree not to use the website for any unlawful purpose, to attempt to gain unauthorised access to any system, or to transmit harmful content.",
  },
  {
    title: "Service Information",
    content:
      "While Pikitup takes care to ensure the accuracy of information on this website, collection schedules, facility operating hours and contact details may change. Information on this website is provided in good faith but Pikitup does not warrant its completeness or accuracy. Always verify critical service information by contacting us directly.",
  },
  {
    title: "Complaints and Reports",
    content:
      "When you submit a complaint or report via this website, you agree to provide accurate information. False or malicious reports may be subject to legal action. Pikitup will use your contact information solely to respond to your report and follow up on service delivery.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website, including text, images, logos, and graphics, is the property of Pikitup Johannesburg (SOC) Ltd or its licensors and is protected by South African copyright law. You may not reproduce, distribute or republish any content without express written consent.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Pikitup will not be liable for any direct, indirect, incidental or consequential loss arising from your use of or inability to use this website, or from any inaccuracy in the information provided. This website may contain links to third-party websites for which Pikitup accepts no responsibility.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms of Use are governed by the laws of the Republic of South Africa. Any disputes arising from use of this website shall be subject to the jurisdiction of the South African courts.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 text-green-200/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Terms of Use</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-2xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Terms of Use</h1>
              <p className="text-green-200">Last updated: June 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {terms.map((section, i) => (
            <div key={section.title} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                {i + 1}. {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}

          <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-500">
              For questions about these Terms of Use, contact us at{" "}
              <a href="mailto:info@pikitup.co.za" className="text-green-700 hover:underline">
                info@pikitup.co.za
              </a>{" "}
              or call{" "}
              <a href="tel:+27113755555" className="text-green-700 hover:underline">
                011 375 5555
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

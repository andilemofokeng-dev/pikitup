import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, Lock, Eye, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pikitup Johannesburg's privacy policy — how we collect, use and protect your personal information in accordance with POPIA.",
};

const sections = [
  {
    id: "collection",
    icon: Eye,
    title: "Information We Collect",
    content: [
      "When you use our website or submit a complaint/enquiry, we may collect: your name, surname, email address, phone number, and physical address (suburb/street) for service requests.",
      "Technical information such as your IP address, browser type, and pages visited is collected automatically via cookies and server logs for analytics and security purposes.",
      "When you submit a complaint or report illegal dumping, we collect location information and a description of the issue to enable us to respond.",
    ],
  },
  {
    id: "use",
    icon: Shield,
    title: "How We Use Your Information",
    content: [
      "To process and respond to your waste management complaints, service requests and enquiries.",
      "To send you collection schedule reminders and service notifications if you opt in.",
      "To improve our website, services and user experience through aggregated analytics.",
      "To comply with our legal obligations under the MFMA, Municipal Systems Act and other applicable legislation.",
    ],
  },
  {
    id: "sharing",
    icon: Lock,
    title: "Sharing of Information",
    content: [
      "We do not sell your personal information to third parties.",
      "We may share information with City of Johannesburg departments, JMPD and other municipal entities where necessary to deliver services or enforce by-laws.",
      "Information may be shared with authorised service providers who assist us in operating our systems, under strict data processing agreements.",
    ],
  },
  {
    id: "rights",
    icon: Mail,
    title: "Your Rights (POPIA)",
    content: [
      "Under the Protection of Personal Information Act (POPIA), you have the right to access, correct and delete your personal information held by Pikitup.",
      "You have the right to object to the processing of your personal information for direct marketing purposes.",
      "To exercise your rights, contact our Information Officer at: privacy@pikitup.co.za or 011 375 5555.",
      "You may also lodge a complaint with the Information Regulator at www.inforegulator.org.za.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 text-green-200/70 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Privacy Policy</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
              <p className="text-green-200">Last updated: June 2026 — Effective immediately</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Pikitup Johannesburg (SOC) Ltd (&ldquo;Pikitup&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, store and protect your personal information in accordance with the
              Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable South African legislation.
            </p>

            <div className="space-y-10">
              {sections.map((section, i) => {
                const SIcon = section.icon;
                return (
                  <div key={section.id} className="flex gap-6">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                      <SIcon className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">{i + 1}. {section.title}</h2>
                      <ul className="space-y-3">
                        {section.content.map((text) => (
                          <li key={text} className="flex items-start gap-2 text-gray-600 leading-relaxed text-sm">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-6 bg-green-50 rounded-2xl border border-green-100">
              <h3 className="font-bold text-gray-900 mb-2">Contact Our Information Officer</h3>
              <p className="text-sm text-gray-600 mb-1">For any privacy-related enquiries or to exercise your POPIA rights:</p>
              <p className="text-sm text-gray-700"><strong>Email:</strong> privacy@pikitup.co.za</p>
              <p className="text-sm text-gray-700"><strong>Phone:</strong> 011 375 5555</p>
              <p className="text-sm text-gray-700"><strong>Post:</strong> Information Officer, Pikitup Johannesburg, 66 President Street, Johannesburg, 2000</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import SplashScreen from "@/components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pikitup.co.za"),
  title: {
    default: "Pikitup Johannesburg | Integrated Waste Management",
    template: "%s | Pikitup Johannesburg",
  },
  description:
    "Pikitup Johannesburg (SOC) Ltd is the official integrated waste management service provider to the City of Johannesburg — serving 1.2M+ households. Report illegal dumping, find collection schedules, access recycling services and more.",
  keywords: [
    "Pikitup",
    "Pikitup Johannesburg",
    "waste management Johannesburg",
    "refuse collection Johannesburg",
    "garbage collection JHB",
    "recycling Johannesburg",
    "illegal dumping report",
    "waste services City of Johannesburg",
    "CoJ waste",
    "garden refuse Johannesburg",
    "landfill Johannesburg",
    "street sweeping Johannesburg",
    "separation at source",
    "waste collection schedule",
    "Pikitup depot",
    "integrated waste management South Africa",
  ],
  authors: [{ name: "Pikitup Johannesburg (SOC) Ltd" }],
  creator: "Pikitup Johannesburg",
  publisher: "Pikitup Johannesburg (SOC) Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.pikitup.co.za",
    siteName: "Pikitup Johannesburg",
    title: "Pikitup Johannesburg | Integrated Waste Management",
    description:
      "Official integrated waste management for Johannesburg — collection schedules, recycling, illegal dumping reporting, garden refuse and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pikitup Johannesburg — Integrated Waste Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CleanerJoburg",
    creator: "@CleanerJoburg",
    title: "Pikitup Johannesburg | Integrated Waste Management",
    description:
      "Official integrated waste management for Johannesburg. Report illegal dumping, find collection schedules & recycling services.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.pikitup.co.za",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  category: "government",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pikitup.co.za/#organization",
      name: "Pikitup Johannesburg (SOC) Ltd",
      alternateName: "Pikitup",
      url: "https://www.pikitup.co.za",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pikitup.co.za/pikitup-logo.png",
        width: 420,
        height: 140,
      },
      description:
        "Pikitup Johannesburg is the official integrated waste management service provider to the City of Johannesburg, serving over 1.2 million households.",
      foundingDate: "2001",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 4500 },
      address: {
        "@type": "PostalAddress",
        streetAddress: "66 President Street",
        addressLocality: "Johannesburg",
        addressRegion: "Gauteng",
        postalCode: "2000",
        addressCountry: "ZA",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+27-860-562874",
          contactType: "customer service",
          areaServed: "ZA",
          availableLanguage: ["English", "Zulu", "Sotho"],
          contactOption: "TollFree",
        },
        {
          "@type": "ContactPoint",
          telephone: "+27-11-375-5555",
          contactType: "switchboard",
          areaServed: "ZA",
        },
      ],
      sameAs: [
        "https://www.facebook.com/pikitup",
        "https://twitter.com/CleanerJoburg",
        "https://www.youtube.com/@pikitup",
      ],
      parentOrganization: {
        "@type": "GovernmentOrganization",
        name: "City of Johannesburg Metropolitan Municipality",
        url: "https://www.joburg.org.za",
      },
      areaServed: {
        "@type": "City",
        name: "Johannesburg",
        containedInPlace: { "@type": "State", name: "Gauteng", containedInPlace: { "@type": "Country", name: "South Africa" } },
      },
      knowsAbout: [
        "Waste Management",
        "Recycling",
        "Refuse Collection",
        "Street Cleaning",
        "Landfill Management",
        "Illegal Dumping",
        "Garden Refuse",
        "Separation at Source",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.pikitup.co.za/#website",
      url: "https://www.pikitup.co.za",
      name: "Pikitup Johannesburg",
      description: "Official website of Pikitup Johannesburg — integrated waste management services for the City of Johannesburg",
      publisher: { "@id": "https://www.pikitup.co.za/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://www.pikitup.co.za/collection-schedule?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "GovernmentService",
      name: "Integrated Waste Management — City of Johannesburg",
      provider: { "@id": "https://www.pikitup.co.za/#organization" },
      serviceType: "Waste Management",
      areaServed: { "@type": "City", name: "Johannesburg" },
      description: "Household refuse collection, street sweeping, recycling, garden refuse, landfill management and illegal dumping removal across Greater Johannesburg.",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.pikitup.co.za",
        servicePhone: "+27-860-562874",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#1B5E20" />
        <meta name="geo.region" content="ZA-GT" />
        <meta name="geo.placename" content="Johannesburg" />
        <meta name="geo.position" content="-26.2041;28.0473" />
        <meta name="ICBM" content="-26.2041, 28.0473" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white text-gray-900">
        <AuthProvider>
          <SplashScreen />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

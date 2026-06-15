import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pikitup Johannesburg | Integrated Waste Management",
    template: "%s | Pikitup Johannesburg",
  },
  description:
    "Pikitup Johannesburg is the official integrated waste management service provider to the City of Johannesburg. Report problems, find collection schedules, and access waste management services.",
  keywords: [
    "Pikitup",
    "Johannesburg waste management",
    "refuse collection",
    "garbage collection Johannesburg",
    "recycling Johannesburg",
    "illegal dumping report",
    "waste services CoJ",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Pikitup Johannesburg",
  },
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
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

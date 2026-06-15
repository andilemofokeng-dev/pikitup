"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const LocationPicker = dynamic(() => import("@/components/map/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
      <div className="text-center">
        <div className="w-7 h-7 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-gray-500">Loading map…</p>
      </div>
    </div>
  ),
});
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Upload,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Trash2,
  WindIcon,
  Truck,
  MessageSquare,
} from "lucide-react";

const issueTypes = [
  { value: "missed-collection", label: "Missed Refuse Collection", icon: Trash2 },
  { value: "illegal-dumping", label: "Illegal Dumping", icon: AlertTriangle },
  { value: "overflowing-bins", label: "Overflowing Bins", icon: Trash2 },
  { value: "street-not-swept", label: "Street Not Swept", icon: WindIcon },
  { value: "waste-spillage", label: "Waste Spillage", icon: AlertTriangle },
  { value: "facility-issue", label: "Facility Issue", icon: MapPin },
  { value: "truck-issue", label: "Truck Related Issue", icon: Truck },
  { value: "general-complaint", label: "General Service Complaint", icon: MessageSquare },
];

interface FormData {
  name: string;
  surname: string;
  email: string;
  mobile: string;
  address: string;
  suburb: string;
  region: string;
  issueType: string;
  description: string;
  contactMethod: string;
}

export default function ReportPage() {
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [referenceNumber, setReferenceNumber] = useState("");
  useEffect(() => {
    setReferenceNumber(
      `PKT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(6, "0")}`
    );
  }, []);
  const [form, setForm] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    address: "",
    suburb: "",
    region: "",
    issueType: "",
    description: "",
    contactMethod: "email",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("submitted");
    window.scrollTo({ top: 0, behavior: "smooth" }); // eslint-disable-line
  }

  if (step === "submitted") {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-700" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Report Submitted</h1>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this issue. Your case has been logged and assigned to the
            relevant depot. You will receive updates via your selected notification method.
          </p>
          <Card className="border-green-200 mb-6">
            <CardContent className="p-6">
              <p className="text-xs text-gray-400 mb-2">Your Reference Number</p>
              <p className="text-2xl font-black text-green-700 mb-2">{referenceNumber}</p>
              <Badge variant="warning">In Progress</Badge>
              <p className="text-xs text-gray-500 mt-3">
                Save this reference number to track your case status online.
              </p>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/resident-portal?track=${referenceNumber}`}>
              <Button size="lg">Track My Case</Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => setStep("form")}>
              Report Another Issue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Report a Problem</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Report a Problem</h1>
          <p className="text-green-100 text-xl max-w-2xl">
            Report service issues directly to Pikitup. We target a 48-hour response on all
            logged cases, and you will receive a unique reference number to track your case.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue type */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  1. What is the problem?
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {issueTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, issueType: type.value }))}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-sm transition-all ${
                        form.issueType === type.value
                          ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700"
                      }`}
                    >
                      <type.icon className="w-4 h-4 shrink-0" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  2. Your Contact Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Surname *</label>
                    <input
                      required
                      name="surname"
                      value={form.surname}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      required
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="0XX XXX XXXX"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  3. Location of the Problem
                </h2>
                <div className="space-y-4">
                  {/* Map location picker */}
                  <LocationPicker
                    onLocationSelect={(address) =>
                      setForm((f) => ({ ...f, address }))
                    }
                  />
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Street Address *
                    </label>
                    <input
                      required
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="e.g. 14 Oak Avenue — or pin on map above"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Suburb *
                      </label>
                      <input
                        required
                        name="suburb"
                        value={form.suburb}
                        onChange={handleChange}
                        placeholder="e.g. Sandton"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Region
                      </label>
                      <select
                        name="region"
                        aria-label="Region"
                        value={form.region}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      >
                        <option value="">Select region</option>
                        <option>Region A — Johannesburg North</option>
                        <option>Region B — Johannesburg East</option>
                        <option>Region C — Johannesburg South</option>
                        <option>Region D — Soweto</option>
                        <option>Region E — Midrand</option>
                        <option>Region F — Johannesburg West</option>
                        <option>Region G — Orange Farm</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description + photo */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  4. Describe the Problem
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Please describe the problem in as much detail as possible..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>

                  {/* Photo upload */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Photo (optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-green-300 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG or HEIC · Max 5MB
                      </p>
                    </div>
                  </div>

                  {/* Preferred contact */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-3">
                      {["email", "sms", "whatsapp"].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={form.contactMethod === method}
                            onChange={handleChange}
                            className="text-green-700"
                          />
                          <span className="text-sm text-gray-700 capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GPS hint */}
            <div className="flex items-start gap-2 text-xs text-gray-500 px-1">
              <MapPin className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span>
                Your GPS location may be captured automatically to help us locate the problem
                faster. No personal location data is stored.
              </span>
            </div>

            <Button type="submit" size="xl" className="w-full">
              Submit Report
            </Button>

            <p className="text-xs text-gray-400 text-center">
              By submitting this form you agree to our{" "}
              <Link href="/privacy-policy" className="text-green-700 hover:underline">
                Privacy Policy
              </Link>
              . Your information is collected solely to process and respond to your service
              request.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

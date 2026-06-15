"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const ContactMap = dynamic(() => import("@/components/map/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-500">Loading map…</p>
      </div>
    </div>
  ),
});

const contacts = [
  {
    icon: Phone,
    title: "Illegal Dumping Hotline",
    value: "0860 562874",
    note: "Also: 011 375 5555 · 010 055 5990",
    colour: "bg-green-100 text-green-700",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "082 779 1361",
    note: "Send photos of illegal dumping",
    colour: "bg-teal-100 text-teal-700",
  },
  {
    icon: Mail,
    title: "General Enquiries",
    value: "info@pikitup.co.za",
    note: "Mon–Fri response within 2 business days",
    colour: "bg-blue-100 text-blue-700",
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "66 President Street, Johannesburg",
    note: "Mon–Fri: 07:30–16:30",
    colour: "bg-purple-100 text-purple-700",
  },
];

const departments = [
  { name: "Customer Service / Complaints", email: "complaints@pikitup.co.za", phone: "011 350 0000" },
  { name: "Media & Communications", email: "media@pikitup.co.za", phone: "011 350 0010" },
  { name: "Supply Chain / Tenders", email: "scm@pikitup.co.za", phone: "011 350 0020" },
  { name: "Human Resources / Careers", email: "careers@pikitup.co.za", phone: "011 350 0030" },
  { name: "Operations (Illegal Dumping)", email: "operations@pikitup.co.za", phone: "011 350 0040" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Pikitup</h1>
          <p className="text-green-100 text-xl max-w-2xl">
            We are here to help. Contact us via phone, email or the online form below.
            For urgent service issues, call our 24-hour hotline.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {contacts.map((contact) => (
              <Card key={contact.title} className="text-center">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${contact.colour}`}
                  >
                    <contact.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{contact.title}</h3>
                  <p className="text-sm font-semibold text-green-700 mb-1">{contact.value}</p>
                  <p className="text-xs text-gray-400">{contact.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent</h3>
                  <p className="text-gray-500 text-sm mb-5">
                    Thank you for contacting Pikitup. We will respond within 2 business days.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Subject *
                    </label>
                    <select
                      required
                      name="subject"
                      aria-label="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option>General Enquiry</option>
                      <option>Service Complaint</option>
                      <option>Media Enquiry</option>
                      <option>Tender / Supply Chain</option>
                      <option>Careers</option>
                      <option>Report Scam</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Please describe your enquiry in detail..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </Button>
                  <p className="text-xs text-gray-400">
                    For illegal dumping or urgent issues call{" "}
                    <strong>0860 562874</strong> / <strong>011 375 5555</strong> or{" "}
                    <Link href="/report" className="text-green-700 hover:underline">
                      report online
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>

            {/* Department contacts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="p-4 border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{dept.name}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-green-600" />
                        <a href={`mailto:${dept.email}`} className="hover:text-green-700">
                          {dept.email}
                        </a>
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-green-600" />
                        {dept.phone}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency box */}
              <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5">
                <h3 className="font-bold text-red-800 mb-2">Report Illegal Dumping / Emergency</h3>
                <p className="text-sm text-red-700 mb-3">
                  For illegal dumping, urgent waste spills or immediate health/safety risks:
                </p>
                <div className="text-3xl font-black text-red-700">0860 562874</div>
                <p className="text-xs text-red-500 mt-1">Also: 011 375 5555 · 010 055 5990</p>
                <p className="text-xs text-red-500">WhatsApp: 082 779 1361</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Head office map */}
      <section className="h-96">
        <ContactMap />
      </section>
    </>
  );
}

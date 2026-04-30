"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 px-8 md:px-20 pb-20 bg-warm-linen">

        {/* Header */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="flex-1">
            <span className="font-kr text-deep-pink font-bold tracking-widest text-sm uppercase block mb-4">
              문의하기 — Get In Touch
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-4">
              Contact.
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-korean-blue max-w-md">
              We&apos;d love to hear from you.
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <Image
              src="/img/contact.jpg"
              alt="Contact KayHangeul"
              width={600}
              height={500}
              className="max-h-[60vh] w-auto rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact info */}
          <div className="space-y-10">
            <div>
              <h2 className="font-sans font-black text-2xl tracking-tight mb-6">Reach Us</h2>
              <ul className="space-y-5">
                {[
                  { label: "Email",     value: "hello@kayhangeul.com", href: "mailto:hello@kayhangeul.com" },
                  { label: "Instagram", value: "@kayhangeul",          href: "#" },
                  { label: "WhatsApp",  value: "+60 12-345 6789",      href: "#" },
                  { label: "Kakao",     value: "kayhangeul",           href: "#" },
                ].map(({ label, value, href }) => (
                  <li key={label} className="flex flex-col gap-0.5">
                    <span className="font-sans text-xs uppercase tracking-widest font-bold text-crimson-pink">{label}</span>
                    <a href={href} className="font-sans text-base text-text-dark hover:text-crimson-pink transition-colors">
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-light-pink rounded-3xl p-8 border border-cherry-pink/30">
              <p className="font-serif italic text-xl text-text-dark leading-relaxed">
                &ldquo;Every question is a step closer to fluency. Don&apos;t hesitate.&rdquo;
              </p>
              <p className="font-sans text-xs text-text-light mt-4 uppercase tracking-widest">— Kay</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="font-sans font-black text-2xl tracking-tight mb-6">Send a Message</h2>

            {[
              { id: "name",  label: "Name",  type: "text",  placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "hello@example.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="font-sans text-xs uppercase tracking-widest font-bold text-text-dark">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  required
                  className="font-sans w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-crimson-pink transition-colors"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="font-sans text-xs uppercase tracking-widest font-bold text-text-dark">
                Subject
              </label>
              <select
                id="subject"
                required
                className="font-sans w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-crimson-pink transition-colors text-text-mid"
              >
                <option value="">Select a topic</option>
                <option>Product Enquiry</option>
                <option>Order Issue</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-sans text-xs uppercase tracking-widest font-bold text-text-dark">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                required
                className="font-sans w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-crimson-pink transition-colors resize-none"
              />
            </div>

            {status === "success" && (
              <p className="font-sans text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                ✓ Mesej dihantar! We&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="font-sans text-sm text-korean-red bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                ✕ Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-charcoal text-white py-4 rounded-xl font-sans font-bold text-sm uppercase tracking-widest hover:bg-cherry-pink hover:text-charcoal transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Send Message →"}
            </button>
          </form>

        </div>
      </main>
      <Footer />
    </>
  );
}

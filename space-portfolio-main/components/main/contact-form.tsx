"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

export const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          honeypot: honeypotRef.current?.value ?? "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.");
        setFormState("error");
        return;
      }

      setFormState("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("Network error. Please check your connection.");
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-20 px-4 w-full"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-2 text-center"
      >
        Contact{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Form
        </span>
      </motion.h2>
      <p className="text-gray-400 mb-10 text-center max-w-md">
        Have a project in mind or just want to say hi? Drop me a message and
        I&apos;ll never share your data with anyone else. Pinky promise!.
      </p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[rgba(3,0,20,0.6)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md rounded-2xl p-8 flex flex-col gap-5 shadow-lg shadow-[#2A0E61]/40"
      >
        {/* Honeypot — hidden from real users */}
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-gray-300 text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            value={fields.name}
            onChange={handleChange}
            placeholder="Enter your full name here"
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(112,66,248,0.3)] rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[rgb(112,66,248)] focus:ring-1 focus:ring-[rgba(112,66,248,0.5)] transition"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-300 text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange}
            placeholder="Enter your email address here"
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(112,66,248,0.3)] rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[rgb(112,66,248)] focus:ring-1 focus:ring-[rgba(112,66,248,0.5)] transition"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-gray-300 text-sm font-medium"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            value={fields.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(112,66,248,0.3)] rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[rgb(112,66,248)] focus:ring-1 focus:ring-[rgba(112,66,248,0.5)] transition resize-none"
          />
        </div>

        {/* Feedback messages */}
        {formState === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-sm text-center font-medium"
          >
            ✅ Message sent successfully! I&apos;ll get back to you soon.
          </motion.p>
        )}
        {formState === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center font-medium"
          >
            ❌ {errorMessage}
          </motion.p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === "loading"}
          className="button-primary py-3 rounded-lg text-white font-semibold text-center cursor-pointer transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState === "loading" ? "Sending..." : "Send Message"}
        </button>
      </motion.form>
    </section>
  );
};

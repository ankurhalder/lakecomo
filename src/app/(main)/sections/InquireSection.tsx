"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";

const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "AU" },
  { code: "+33", country: "FR" },
  { code: "+49", country: "DE" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+32", country: "BE" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+358", country: "FI" },
  { code: "+351", country: "PT" },
  { code: "+30", country: "GR" },
  { code: "+48", country: "PL" },
  { code: "+7", country: "RU" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+91", country: "IN" },
  { code: "+55", country: "BR" },
  { code: "+52", country: "MX" },
  { code: "+54", country: "AR" },
  { code: "+27", country: "ZA" },
  { code: "+20", country: "EG" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "SA" },
  { code: "+972", country: "IL" },
  { code: "+90", country: "TR" },
  { code: "+62", country: "ID" },
  { code: "+60", country: "MY" },
  { code: "+65", country: "SG" },
  { code: "+66", country: "TH" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  groupSize: string;
  eventDate: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  groupSize: "",
  eventDate: "",
  message: "",
};

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--surface-raised)",
  color: "var(--text-primary)",
  borderColor: "var(--border-color)",
};

const focusClass =
  "w-full px-4 py-3 rounded-sm border text-sm outline-none transition-colors focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] placeholder:text-[var(--text-muted)]";

export default function InquireSection({
  data,
}: {
  data: LandingPageData["inquire"];
}) {
  const { lenisRef } = useLenis();
  const { preHeading, mainHeading, description, form, success } = data;

  const f = form || {};
  const s = success || {};

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+1");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const emailValidation = useMemo(() => {
    const e = formData.email;
    if (!e) return { valid: false, message: "" };
    if (!e.includes("@")) return { valid: false, message: "Add @ and domain" };
    const parts = e.split("@");
    if (!parts[1] || !parts[1].includes("."))
      return { valid: false, message: "Complete the domain" };
    return { valid: true, message: "Valid email" };
  }, [formData.email]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, countryCode }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    const el = document.querySelector("#hero");
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8"
        >
          {preHeading && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
                {preHeading}
              </span>
              <span
                className="h-px w-8"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
          )}
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-limelight)",
              fontSize: "var(--fs-h2)",
              color: "var(--text-primary)",
            }}
          >
            {mainHeading}
          </h2>
          {description && (
            <p
              className="mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* Form card */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 space-y-6"
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto"
                style={{
                  backgroundColor: "rgba(201,168,76,0.12)",
                  color: "var(--accent)",
                }}
              >
                <Sparkles size={28} />
              </div>
              <h3
                className="font-bold"
                style={{
                  fontFamily: "var(--font-limelight)",
                  fontSize: "var(--fs-h3)",
                  color: "var(--text-primary)",
                }}
              >
                {s.title || "The Spotlight Awaits!"}
              </h3>
              <p
                className="text-sm sm:text-base max-w-md mx-auto leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.message ||
                  "Thank you for reaching out. We'll be in touch soon to help you create your unforgettable cinematic experience."}
              </p>
              <button
                onClick={scrollToTop}
                className="px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90"
                style={{
                  background: "var(--accent-gradient)",
                  color: "var(--accent-text)",
                }}
              >
                {s.buttonText || "Back to Top"}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {f.formTitle && (
                <h3
                  className="font-semibold mb-6 text-center"
                  style={{
                    fontFamily: "var(--font-limelight)",
                    fontSize: "var(--fs-label)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {f.formTitle}
                </h3>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-sm mb-6 text-sm"
                  style={{
                    backgroundColor: "var(--color-error-bg)",
                    color: "var(--color-error)",
                    border: "1px solid var(--color-error)",
                  }}
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 relative">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      className="text-xs uppercase tracking-widest font-light"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.firstNameLabel || "First Name"}
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      placeholder={f.firstNamePlaceholder || "John"}
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                      className={focusClass}
                      style={{
                        ...inputStyle,
                        borderColor:
                          focusedField === "firstName"
                            ? "var(--accent)"
                            : "var(--border-color)",
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      className="text-xs uppercase tracking-widest font-light"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.lastNameLabel || "Last Name"}
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      placeholder={f.lastNamePlaceholder || "Doe"}
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                      className={focusClass}
                      style={{
                        ...inputStyle,
                        borderColor:
                          focusedField === "lastName"
                            ? "var(--accent)"
                            : "var(--border-color)",
                      }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    className="text-xs uppercase tracking-widest font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {f.emailLabel || "Email"}
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={f.emailPlaceholder || "john@example.com"}
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={focusClass + " pr-10"}
                      style={{
                        ...inputStyle,
                        borderColor:
                          focusedField === "email"
                            ? "var(--accent)"
                            : "var(--border-color)",
                      }}
                    />
                    {formData.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {emailValidation.valid ? (
                          <CheckCircle2
                            size={16}
                            style={{ color: "var(--color-success)" }}
                          />
                        ) : (
                          <AlertCircle
                            size={16}
                            style={{ color: "var(--text-muted)" }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  {formData.email &&
                    !emailValidation.valid &&
                    emailValidation.message && (
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {emailValidation.message}
                      </p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    className="text-xs uppercase tracking-widest font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {f.phoneLabel || "Phone"}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="flex-shrink-0 px-2 py-3 rounded-sm border text-sm outline-none"
                      style={{
                        ...inputStyle,
                        borderColor: "var(--border-color)",
                        minWidth: "90px",
                      }}
                    >
                      {COUNTRY_CODES.map(({ code, country }) => (
                        <option key={code} value={code}>
                          {code} {country}
                        </option>
                      ))}
                    </select>
                    <input
                      name="phone"
                      type="tel"
                      placeholder={f.phonePlaceholder || "555 123-4567"}
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={focusClass + " flex-1"}
                      style={{
                        ...inputStyle,
                        borderColor:
                          focusedField === "phone"
                            ? "var(--accent)"
                            : "var(--border-color)",
                      }}
                    />
                  </div>
                </div>

                {/* Group size + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-50">
                  <div className="space-y-1.5 relative z-50">
                    <label
                      className="text-xs uppercase tracking-widest font-light"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.groupSizeLabel || "How many will you be?"}
                    </label>
                    <select
                      name="groupSize"
                      required
                      value={formData.groupSize}
                      onChange={handleChange}
                      className={focusClass}
                      style={{
                        ...inputStyle,
                        borderColor: "var(--border-color)",
                        appearance: "auto",
                      }}
                    >
                      <option value="">
                        {f.groupSizeDefaultOption || "Select group size"}
                      </option>
                      {(
                        f.groupSizeOptions || [
                          "2-5 people",
                          "6-10 people",
                          "11-20 people",
                          "21-50 people",
                          "50+ people",
                        ]
                      ).map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label
                      className="text-xs uppercase tracking-widest font-light"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.eventDateLabel || "Date of Event"}
                    </label>
                    <input
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("eventDate")}
                      onBlur={() => setFocusedField(null)}
                      className={focusClass}
                      style={{
                        ...inputStyle,
                        colorScheme: "dark",
                        borderColor:
                          focusedField === "eventDate"
                            ? "var(--accent)"
                            : "var(--border-color)",
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    className="text-xs uppercase tracking-widest font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {f.messageLabel || "Tell us about your vision"}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={
                      f.messagePlaceholder ||
                      "Describe your dream cinematic event..."
                    }
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={focusClass + " resize-none"}
                    style={{
                      ...inputStyle,
                      borderColor:
                        focusedField === "message"
                          ? "var(--accent)"
                          : "var(--border-color)",
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className="w-full py-3 text-[11px] font-bold uppercase tracking-widest rounded-full transition-opacity"
                  style={{
                    background: "var(--accent-gradient)",
                    color: "var(--accent-text)",
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
                      {f.submitButtonLoadingText || "Sending..."}
                    </span>
                  ) : (
                    f.submitButtonText || "Be A Star"
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

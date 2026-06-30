'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n-compat';
import { API_BASE_URL } from "../../config/api";

const Form = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    inquiryReason: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    // Clear error for field on change
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Check email mismatch in real-time
    if (name === "email" || name === "confirmEmail") {
      setErrors((prev) => ({
        ...prev,
        emailMismatch:
          name === "confirmEmail"
            ? value !== formData.email
            : formData.confirmEmail !== value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.inquiryReason) newErrors.inquiryReason = t("form.validation.required");
    if (!formData.firstName) newErrors.firstName = t("form.validation.required");
    if (!formData.lastName) newErrors.lastName = t("form.validation.required");
    if (!formData.email) newErrors.email = t("form.validation.required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("form.validation.invalidEmail");

    if (!formData.confirmEmail) newErrors.confirmEmail = t("form.validation.required");
    else if (formData.confirmEmail !== formData.email)
      newErrors.emailMismatch = t("form.validation.emailMismatch");

    if (!formData.phone) newErrors.phone = t("form.validation.required");
    else if (!/^\+?\d{7,15}$/.test(formData.phone))
      newErrors.phone = t("form.validation.invalidPhone");

    if (!formData.country) newErrors.country = t("form.validation.required");
    if (!formData.message) newErrors.message = t("form.validation.required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch(`${API_BASE_URL}/bookings/send-contact-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, success: t("form.success"), error: null });
        alert("We’ll get back to you shortly!");
        setFormData({
          inquiryReason: "",
          firstName: "",
          lastName: "",
          email: "",
          confirmEmail: "",
          phone: "",
          country: "",
          message: "",
        });
      } else {
        setStatus({ loading: false, success: null, error: t("form.error") });
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: t("form.error") });
    }
  };

  const reasons = t("form.select.options", { returnObjects: true });

  const inputClass = (hasError) =>
    `w-full px-4 py-3.5 border rounded-xl text-sm sm:text-base font-medium bg-white shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:shadow-md transition-all duration-300 text-gray-700 placeholder-gray-400 ${
      hasError ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-gray-200"
    }`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-5 pb-12 sm:pb-16">
      <motion.h2
        className="font-[montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {t("form.title")}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="mt-4 sm:mt-5 mb-8 sm:mb-10 flex justify-center"
      >
        <span className="block h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.5)]" />
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6 sm:p-8 md:p-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="w-full">
            <select
              name="inquiryReason"
              value={formData.inquiryReason}
              onChange={handleChange}
              className={`${inputClass(errors.inquiryReason)} appearance-none cursor-pointer`}
              required
              aria-label={t("form.select.placeholder")}
            >
              <option value="">{t("form.select.placeholder")}</option>
              {reasons.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.inquiryReason && (
              <p className="mt-1.5 text-xs text-red-600">{errors.inquiryReason}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-5 space-y-0">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("form.placeholders.firstName")}
                className={inputClass(errors.firstName)}
                required
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("form.placeholders.lastName")}
                className={inputClass(errors.lastName)}
                required
              />
              {errors.lastName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-5 space-y-0">
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.placeholders.email")}
                className={inputClass(errors.email || errors.emailMismatch)}
                required
                aria-invalid={errors.emailMismatch ? "true" : "false"}
                aria-describedby={errors.emailMismatch ? "email-mismatch" : undefined}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                placeholder={t("form.placeholders.confirmEmail")}
                className={inputClass(errors.confirmEmail || errors.emailMismatch)}
                required
                aria-invalid={errors.emailMismatch ? "true" : "false"}
                aria-describedby={errors.emailMismatch ? "email-mismatch" : undefined}
              />
              {errors.confirmEmail && (
                <p className="mt-1.5 text-xs text-red-600">{errors.confirmEmail}</p>
              )}
              {errors.emailMismatch && (
                <p id="email-mismatch" className="mt-1.5 text-xs text-red-600">
                  {errors.emailMismatch}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-5 space-y-0">
            <div className="flex-1">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("form.placeholders.phone")}
                className={inputClass(errors.phone)}
                required
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder={t("form.placeholders.country")}
                className={inputClass(errors.country)}
                required
              />
              {errors.country && (
                <p className="mt-1.5 text-xs text-red-600">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("form.placeholders.message")}
              className={`${inputClass(errors.message)} resize-y min-h-[140px] font-inherit`}
              rows="6"
              required
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={status.loading}
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#0a67b3]/30 hover:shadow-xl hover:shadow-[#0a67b3]/50 hover:scale-105 active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              aria-label={t("form.button")}
            >
              {status.loading ? t("form.sending") : t("form.button")}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>

        {status.success && (
          <p className="mt-5 text-green-600 text-sm text-center">{status.success}</p>
        )}
        {status.error && (
          <p className="mt-5 text-red-600 text-sm text-center">{status.error}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Form;

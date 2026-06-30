'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Waves,
  Heart,
  Sparkles,
  Camera,
  Calendar,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from '@/lib/i18n-compat';

type PositionItem = { key: string; title: string; body: string };

const POSITION_ICON: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  surfInstructor: Waves,
  socialHost: Heart,
  yogaTeacher: Sparkles,
  contentCreator: Camera,
};

export default function CareersClient() {
  const { t } = useTranslation();

  const positionItems =
    (t('careers.positions.items', { returnObjects: true }) as PositionItem[]) || [];

  // ---------------------------------------------------------------- form state
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    nationality: '',
    location: '',
    position: '',
    startDate: '',
    endDate: '',
    portfolio: '',
    about: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Server endpoint not yet wired up - keep the request shape ready for
      // when /api/careers (or a CRM webhook) is connected. Until then we
      // simulate a successful submission so the UX flow is testable.
      await new Promise((r) => setTimeout(r, 900));
      setStatus('success');
      setForm({
        fullName: '',
        email: '',
        whatsapp: '',
        nationality: '',
        location: '',
        position: '',
        startDate: '',
        endDate: '',
        portfolio: '',
        about: '',
      });
      setCvFile(null);
    } catch {
      setStatus('error');
    }
  };

  // ----------------------------------------------------------------- styles
  const inputBase =
    'w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 ring-1 ring-gray-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-200';
  const labelBase = 'block text-sm font-semibold text-gray-700 mb-1.5';

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section
        id="careers-hero"
        className="relative min-h-screen flex items-center w-full overflow-hidden mb-4"
        aria-label={t('careers.aria.section')}
      >
        <Image
          src="/b5.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center -z-10"
        />
        <Navbar />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/65 pointer-events-none"
        />

        <div className="container relative z-10 mx-auto w-full py-4 px-4 sm:px-6 md:px-10 text-white">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-200/95 backdrop-blur-sm bg-white/10 ring-1 ring-white/25 rounded-full px-3 py-1.5 shadow-md shadow-black/20">
              <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
              {t('careers.hero.eyebrow')}
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 font-[montserrat] text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-[0.98] tracking-tight max-w-5xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {t('careers.hero.title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="mt-6 flex justify-center"
          >
            <span className="block h-[3px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
          </motion.div>

          <motion.p
            className="mt-6 text-center text-base sm:text-lg md:text-xl text-white/95 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          >
            {t('careers.hero.subtitle')}
          </motion.p>

          <motion.p
            className="mt-4 text-center text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
          >
            {t('careers.hero.intro')}
          </motion.p>

          {/* Season pill + CTA */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-black/20">
              <Calendar className="w-4 h-4 text-cyan-200" strokeWidth={2.25} />
              {t('careers.hero.seasonLabel')}: {t('careers.hero.season')}
            </span>
          </motion.div>

          <motion.div
            className="mt-7 flex justify-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
          >
            <a
              href="#careers-apply"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#0a67b3]/35 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t('careers.hero.ctaApply')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------- JOIN THE VIBE ---------- */}
      <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <motion.span
            className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('careers.join.eyebrow')}
          </motion.span>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('careers.join.heading')}
          </motion.h2>
          <motion.div
            className="mt-4 mb-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-600">
            <p>{t('careers.join.p1')}</p>
            <p>{t('careers.join.p2')}</p>
            <p className="text-gray-800 font-semibold">{t('careers.join.p3')}</p>
          </div>
        </div>
      </section>

      {/* ---------- POSITIONS ---------- */}
      <section className="relative py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              {t('careers.positions.eyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {t('careers.positions.heading')}
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {positionItems.map((p, i) => {
              const Icon = POSITION_ICON[p.key] || Sparkles;
              return (
                <motion.div
                  key={p.key}
                  className="relative bg-white rounded-2xl shadow-md ring-1 ring-black/5 p-6 sm:p-7 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:ring-[#0a67b3]/25"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0a67b3] via-cyan-400 to-[#0a67b3]"
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] shadow-md shadow-[#0a67b3]/25">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-[15px] text-gray-600 leading-[1.75]">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- APPLY FORM ---------- */}
      <section
        id="careers-apply"
        className="relative scroll-mt-24 py-14 sm:py-16 md:py-20 bg-gradient-to-b from-cyan-50/40 via-white to-cyan-50/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            className="flex flex-col items-center mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a67b3] mb-3">
              {t('careers.apply.eyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {t('careers.apply.heading')}
            </h2>
            <div className="mt-4 mb-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#0a67b3] via-cyan-400 to-[#0a67b3]" />
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              {t('careers.apply.subtitle')}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl ring-1 ring-black/5 p-6 sm:p-8 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelBase}>
                  {t('careers.apply.form.fullName')} *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelBase}>
                  {t('careers.apply.form.email')} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className={labelBase}>
                  {t('careers.apply.form.whatsapp')} *
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="+49 …"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="nationality" className={labelBase}>
                  {t('careers.apply.form.nationality')} *
                </label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  required
                  value={form.nationality}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="location" className={labelBase}>
                  {t('careers.apply.form.location')} *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="position" className={labelBase}>
                  {t('careers.apply.form.position')} *
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={form.position}
                  onChange={handleChange}
                  className={inputBase}
                >
                  <option value="" disabled>
                    {t('careers.apply.form.positionPlaceholder')}
                  </option>
                  {positionItems.map((p) => (
                    <option key={p.key} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className={labelBase}>
                  {t('careers.apply.form.startDate')} *
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  value={form.startDate}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="endDate" className={labelBase}>
                  {t('careers.apply.form.endDate')} *
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  required
                  value={form.endDate}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="portfolio" className={labelBase}>
                  {t('careers.apply.form.portfolio')}
                </label>
                <input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://instagram.com/…"
                  value={form.portfolio}
                  onChange={handleChange}
                  className={inputBase}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="about" className={labelBase}>
                  {t('careers.apply.form.about')} *
                </label>
                <textarea
                  id="about"
                  name="about"
                  required
                  rows={5}
                  value={form.about}
                  onChange={handleChange}
                  placeholder={t('careers.apply.form.aboutPlaceholder')}
                  className={`${inputBase} resize-y leading-relaxed`}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cv" className={labelBase}>
                  {t('careers.apply.form.cv')} *
                </label>
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:bg-gradient-to-br file:from-[#0a67b3] file:to-[#0891b2] file:text-white file:font-semibold hover:file:scale-[1.02] file:cursor-pointer file:transition-transform"
                />
                <p className="mt-1.5 text-xs text-gray-500">{t('careers.apply.form.cvHint')}</p>
                {cvFile && (
                  <p className="mt-1.5 text-xs text-cyan-700 font-medium truncate">
                    ✓ {cvFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit + status */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-[#0a67b3] to-[#0891b2] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#0a67b3]/35 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === 'sending'
                  ? t('careers.apply.form.submitting')
                  : t('careers.apply.form.submit')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" strokeWidth={2.25} />
                  {t('careers.apply.form.success')}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 text-red-700 ring-1 ring-red-200 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4" strokeWidth={2.25} />
                  {t('careers.apply.form.error')}
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </section>

      {/* ---------- BOTTOM TAGLINE ---------- */}
      <section className="relative py-12 sm:py-14 bg-gradient-to-br from-[#0a67b3] via-[#0891b2] to-[#0e7490] text-white text-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t('careers.footer.tagline')}
          </motion.p>
          <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-white/80">
            {t('careers.footer.location')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

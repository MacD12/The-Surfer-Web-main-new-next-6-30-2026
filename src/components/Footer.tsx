'use client';
import React from 'react';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Whatsapp from './Whatsapp';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';

type FooterLink = { href: string; label: string };

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors"
          >
            <span className="w-0 h-px bg-cyan-300 group-hover:w-4 transition-all duration-300 ease-out" />
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">
              {l.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const Footer = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const year = new Date().getFullYear();

  const exploreLinks: FooterLink[] = [
    { href: `/${locale}/activities`, label: t('footer.explore.activities') },
    { href: `/${locale}/rates`, label: t('footer.explore.rates') },
    { href: `/${locale}/faq`, label: t('footer.explore.faq') },
    { href: `/${locale}/blogs`, label: t('footer.explore.blogs') },
    { href: `/${locale}/contact`, label: t('footer.explore.contact') },
  ];

  const supportLinks: FooterLink[] = [
    { href: `/${locale}/terms`, label: t('footer.support.terms') },
    { href: `/${locale}/imprint`, label: t('footer.support.imprint') },
    { href: `/${locale}/policy`, label: t('footer.support.privacy') },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#0a67b3] via-[#0a5d9f] to-[#072f56] text-white overflow-hidden">
      {/* Decorative wave silhouette at the very top */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-14 text-white/[0.04]"
        >
          <path
            fill="currentColor"
            d="M0 40 C 200 80, 400 0, 720 40 S 1200 80, 1440 40 L1440 80 L0 80 Z"
          />
        </svg>
      </div>

      {/* Soft cyan glow accent */}
      <div
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-32 w-96 h-96 bg-[#0a67b3]/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand - spans 5 cols at lg */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Image
              src="/logo1.png"
              alt="The Surfer Logo"
              width={714}
              height={350}
              className="h-16 w-auto mb-5"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm text-white/75 leading-relaxed max-w-md mb-6">
              {t('footer.about.desc')}
            </p>

            {/* Contact strip */}
            <ul className="space-y-2.5 mb-7">
              <li>
                <a
                  href={`mailto:${t('footer.contact.email')}`}
                  className="group inline-flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  {t('footer.contact.email')}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-sm text-white/80">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                {t('footer.contact.location')}
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Thesurferweligama/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/25 hover:bg-white hover:border-white hover:scale-110 transition-all duration-300"
              >
                <Facebook className="h-4 w-4 text-white group-hover:text-[#0a67b3] transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/thesurfer_srilanka/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/25 hover:bg-white hover:border-white hover:scale-110 transition-all duration-300"
              >
                <Instagram className="h-4 w-4 text-white group-hover:text-[#0a67b3] transition-colors" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav
            className="lg:col-span-3 lg:col-start-7"
            aria-label={t('footer.explore.title')}
          >
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-cyan-300 mb-5">
              {t('footer.explore.title')}
            </h3>
            <FooterLinkList links={exploreLinks} />
          </nav>

          {/* Support + CTA */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-cyan-300 mb-5">
              {t('footer.support.title')}
            </h3>
            <FooterLinkList links={supportLinks} />

            <a
              href="/book-now"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0a67b3] text-sm font-semibold shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-cyan-300/20 hover:scale-105 transition-all duration-300"
            >
              {t('navbar.bookNow')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-white/65 inline-flex items-center gap-2 flex-wrap">
            <span>© {year} The Surfer.</span>
            <span className="text-white/30">·</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('cookie-preferences:open'));
                }
              }}
              className="text-xs text-white/70 underline decoration-white/30 underline-offset-2 hover:text-white hover:decoration-cyan-300 transition-colors"
            >
              {t('footer.support.cookieSettings')}
            </button>
          </p>
          <p className="text-xs text-white/55 text-center md:text-right">
            Experience crafted by{' '}
            <span className="text-white/85 font-medium">StudioColart</span>
            <span className="mx-2 text-white/30">·</span>
            Platform powered by{' '}
            <span className="text-white/85 font-medium">BeddleHub</span>
          </p>
        </div>
      </div>

      <Whatsapp />
    </footer>
  );
};

export { Footer };

'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

/** ---- Inline SVG flags (always render, no emoji/fonts needed) ---- */
const UkFlag = ({ className = 'w-5 h-3 rounded-[2px]' }) => (
  <svg viewBox="0 0 60 30" className={className} aria-label="United Kingdom flag" role="img">
    <rect width="60" height="30" fill="#012169" />
    <polygon points="0,0 6,0 60,24 60,30 54,30 0,6" fill="#FFF" />
    <polygon points="60,0 60,6 6,30 0,30 0,24 54,0" fill="#FFF" />
    <polygon points="0,0 3,0 60,27 60,30 57,30 0,3" fill="#C8102E" />
    <polygon points="60,0 60,3 3,30 0,30 0,27 57,0" fill="#C8102E" />
    <rect x="0" y="12" width="60" height="6" fill="#FFF" />
    <rect x="27" y="0" width="6" height="30" fill="#FFF" />
    <rect x="0" y="13.5" width="60" height="3" fill="#C8102E" />
    <rect x="28.5" y="0" width="3" height="30" fill="#C8102E" />
  </svg>
);

const DeFlag = ({ className = 'w-5 h-3 rounded-[2px]' }) => (
  <svg viewBox="0 0 5 3" className={className} aria-label="German flag" role="img">
    <rect width="5" height="3" fill="#000" />
    <rect y="1" width="5" height="1" fill="#DD0000" />
    <rect y="2" width="5" height="1" fill="#FFCE00" />
  </svg>
);
/** ---- /Inline SVG flags ---- */

/** ---- LanguageSelect (uses inline SVG flags + names) ---- */
const LANGS = [
  { value: 'en', name: 'English', Icon: UkFlag },
  { value: 'de', name: 'Deutsch', Icon: DeFlag },
];

function LanguageSelect({ value, onChange, isScrolled, variant = 'desktop' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const current = LANGS.find((l) => (value || '').toLowerCase().startsWith(l.value)) || LANGS[0];
  const isMobile = variant === 'mobile';
  const baseText = isMobile ? 'text-gray-900' : (isScrolled ? 'text-gray-800' : 'text-white');
  const baseBg = isMobile ? 'bg-white' : 'bg-transparent';
  const baseBorder = isMobile ? (isScrolled ? 'border-gray-300' : 'border-white/60') : 'border-0';

  const CurrentIcon = current.Icon;

  return (
    <div className={`${isMobile ? 'w-full' : 'w-32 lg:w-36'} relative`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`h-9 w-full px-3 rounded-lg ${baseBg} ${baseText} border ${baseBorder}
                    flex items-center justify-between transition-colors`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <CurrentIcon />
          <span className="text-sm">{current.name}</span>
        </span>
        <span className="opacity-70">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-[60] mt-1 w-full rounded-lg border border-gray-200 bg-white text-gray-900 shadow-xl overflow-hidden"
        >
          {LANGS.map((l) => {
            const Icon = l.Icon;
            const selected = current.value === l.value;
            return (
              <li key={l.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { onChange(l.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-100
                              ${selected ? 'bg-gray-50 font-medium' : ''}`}
                >
                  <Icon />
                  <span className="text-sm">{l.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
/** ---- /LanguageSelect ---- */

const Navbar = () => {
  const router = useRouter();
  const rawPathname = usePathname() ?? '/';
  const locale = useLocale();

  // Strip locale prefix once so we can compare against bare paths like '/', '/activities'
  const localeRegex = useMemo(
    () => new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`),
    [],
  );
  const pathname = (rawPathname.replace(localeRegex, '') || '/');

  // Helper: build a locale-aware href
  const lp = (path: string) => `/${locale}${path === '/' ? '' : path}`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('srilanka');
  const [isMobileDestinationOpen, setIsMobileDestinationOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);
  const destBtnRef = useRef(null);
  const destPanelRef = useRef(null);

  const t = useTranslations();

  // next-intl: useTranslations() throws on missing keys. Wrap with a safe fallback.
  const tx = (key: string, fallback: string) => {
    try {
      const v = t(key);
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };

  const countries = [
    { id: 'srilanka', name: tx('navbar.countries.srilanka', 'Surf Camps Sri Lanka'), image: '/image.png', link: '/srilanka' },
    { id: 'morocco',  name: tx('navbar.countries.morocco', 'Surf Camps Morocco'),    image: '/morocco.jpg', link: '/morocco' },
  ];

  const surfCamps = {
    srilanka: {
      originals: [
        { name: tx('navbar.camps.beachCamp', 'The Surfer Beach Camp'), link: '/beach-camp' },
        { name: tx('navbar.camps.ts2Camp',   'The Surfer TS2 Camp'),    link: '/ts2-camp' },
        { name: tx('navbar.camps.soulSurfer', 'Soul Surfer Camp'),      link: '/soul-surfer', isNew: true },
      ],
      partner: [],
    },
    morocco: {
      originals: [],
      partner: [{ name: tx('navbar.camps.styleCamp', 'The Surfer SurfStyle Surf Camp'), link: '/style-camp' }],
    },
  };

  const changeLanguage = (next: string) => {
    // Replace the leading /<locale> segment with the new locale
    const stripped = rawPathname.replace(localeRegex, '') || '/';
    const target = `/${next}${stripped === '/' ? '' : stripped}`;
    router.push(target);
  };

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For desktop dropdown offset
  useEffect(() => {
    if (navRef.current) setNavHeight(navRef.current.offsetHeight);
  }, [isScrolled]);

  // Close desktop DESTINATION on outside click / Esc
  useEffect(() => {
    if (!isDestinationOpen) return;
    const handleClickOutside = (e) => {
      const btn = destBtnRef.current;
      const panel = destPanelRef.current;
      if (!btn || !panel) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      setIsDestinationOpen(false);
    };
    const handleEsc = (e) => { if (e.key === 'Escape') setIsDestinationOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isDestinationOpen]);

  // Always start new route at top (Next.js does this by default but the original site explicitly forced it)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [rawPathname]);

  // Active link helper - preserves the EXACT className expression used originally
  const linkCls = (path: string) =>
    `cursor-pointer transition-all duration-300 hover:-translate-y-1 ${pathname === path
      ? 'text-cyan-500 font-bold underline underline-offset-4'
      : isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'
    }`;

  const mobileLinkCls = (path: string) =>
    `py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${isScrolled
      ? 'text-gray-800 hover:text-cyan-600 hover:bg-gray-100'
      : 'text-white hover:text-cyan-300 hover:bg-white/20'
    } ${pathname === path ? ' text-cyan-500 font-bold underline underline-offset-4' : ''}`;

  // Animated Hamburger
  const HamburgerButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
      className={`
        lg:hidden relative h-10 w-10 rounded-xl flex items-center justify-center
        transition-colors duration-200
        ${isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 active:scale-95
      `}
    >
      <span className={`absolute block h-[2px] w-6 rounded-full ${isScrolled ? 'bg-gray-800' : 'bg-white'} transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2 rotate-0'}`} />
      <span className={`absolute block h-[2px] w-6 rounded-full ${isScrolled ? 'bg-gray-800' : 'bg-white'} transition-opacity duration-200 ease-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute block h-[2px] w-6 rounded-full ${isScrolled ? 'bg-gray-800' : 'bg-white'} transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2 rotate-0'}`} />
    </button>
  );

  return (
    <div
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center gap-3 py-3 sm:py-4 px-3 sm:px-6 md:px-6 lg:px-8 xl:px-16">
        {/* Logo */}
        <Link href={lp('/')}>
          <Image
            src="/logo.png"
            alt="The Surfer Logo"
            width={120}
            height={58}
            priority
            sizes="(max-width: 768px) 70px, 100px"
            quality={75}
            className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300"
          />
        </Link>

        {/* Center nav (desktop) - only at lg+ (1024px) where there's room for
            7 items without crowding the logo or wrapping the BOOK NOW button. */}
        <ul className="hidden lg:flex gap-4 xl:gap-6 text-sm xl:text-base relative whitespace-nowrap">
          <li><Link href={lp('/')} className={linkCls('/')}>{tx('navbar.home', 'HOME')}</Link></li>

          {/* DESTINATION (desktop click-to-open) */}
          <li>
            <button
              ref={destBtnRef}
              type="button"
              onClick={() => setIsDestinationOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={isDestinationOpen}
              className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isScrolled ? 'text-gray-800 hover:text-cyan-600' : 'text-white hover:text-cyan-300'}`}
            >
              {tx('navbar.destination', 'DESTINATION')}
            </button>
          </li>

          <li><Link href={lp('/activities')} className={linkCls('/activities')}>{tx('navbar.activities', 'ACTIVITIES')}</Link></li>
          <li><Link href={lp('/rates')}      className={linkCls('/rates')}>     {tx('navbar.rates', 'RATES')}</Link></li>
          <li><Link href={lp('/faq')}        className={linkCls('/faq')}>       {tx('navbar.faq', 'FAQ')}</Link></li>
          <li><Link href={lp('/blogs')}      className={linkCls('/blogs')}>     {tx('navbar.blogs', 'BLOGS')}</Link></li>
          <li><Link href={lp('/careers')}    className={linkCls('/careers')}>   {tx('navbar.careers', 'CAREERS')}</Link></li>
          <li><Link href={lp('/contact')}    className={linkCls('/contact')}>   {tx('navbar.contact', 'CONTACT')}</Link></li>
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {/* Desktop: language + book now - lg+ where the full nav shows */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <LanguageSelect
              value={locale}
              onChange={(lng) => changeLanguage(lng)}
              isScrolled={isScrolled}
            />

            <a
              href="/book-now"
              target="_blank"
              rel="noreferrer"
              className={`whitespace-nowrap px-4 xl:px-7 py-2 text-sm xl:text-base rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-800'}`}
            >
              {tx('navbar.bookNow', 'BOOK NOW')}
            </a>
          </div>

          {/* Mobile + tablet: Book Now moved to top bar (below lg) */}
          <a
            href="/book-now"
            target="_blank"
            rel="noreferrer"
            className={`lg:hidden whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-800'}`}
          >
            {tx('navbar.bookNow', 'BOOK NOW')}
          </a>

          <HamburgerButton />
        </div>
      </div>

      {/* ===== DESKTOP DESTINATION PANEL ===== */}
      {isDestinationOpen && (
        <div
          ref={destPanelRef}
          className={`hidden lg:block fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-t border-gray-200' : 'bg-white/10 backdrop-blur-xl border-t border-white/20'}`}
          style={{ top: `${navHeight}px` }}
        >
          <div className="h-1 w-full pointer-events-none" />
          <div className="flex h-96 shadow-2xl">
            {/* Countries */}
            <div className="w-1/3 px-8 py-8 border-r border-gray-200/20">
              <div className="mb-7 flex items-center gap-3">
                <span className={`block h-[2px] w-7 rounded-full ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`} />
                <h3 className={`text-[11px] font-bold tracking-[0.3em] uppercase ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  {tx('navbar.countriesTitle', 'COUNTRIES')}
                </h3>
              </div>
              <div className="space-y-2.5">
                {countries.map((country) => (
                  <div
                    key={country.id}
                    className={`group cursor-pointer rounded-2xl transition-all duration-300 hover:scale-[1.02] ${selectedCountry === country.id
                        ? isScrolled ? 'bg-cyan-50 border border-cyan-200 shadow-sm' : 'bg-white/20 border border-white/30 shadow-sm'
                        : isScrolled ? 'hover:bg-gray-50 border border-transparent' : 'hover:bg-white/10 border border-transparent'
                      }`}
                    onMouseEnter={() => setSelectedCountry(country.id)}
                  >
                    <Link
                      href={lp(country.link)}
                      className="block"
                      onClick={() => setIsDestinationOpen(false)}
                    >
                      <div className="flex items-center p-3 gap-4">
                        <Image
                          src={country.image}
                          alt={country.name}
                          width={52}
                          height={52}
                          className="rounded-xl object-cover ring-1 ring-black/5 shadow-md shrink-0"
                          style={{ width: 52, height: 52 }}
                        />
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <h4
                            className={`text-[15px] font-semibold tracking-tight leading-tight truncate transition-colors ${selectedCountry === country.id
                                ? isScrolled ? 'text-cyan-700' : 'text-cyan-200'
                                : isScrolled ? 'text-gray-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'
                              }`}
                          >
                            {country.name}
                          </h4>
                          <span
                            className={`ml-2 text-lg leading-none transform transition-all duration-300 group-hover:translate-x-1 ${selectedCountry === country.id
                                ? isScrolled ? 'text-cyan-600' : 'text-cyan-200'
                                : isScrolled ? 'text-gray-400 group-hover:text-cyan-600' : 'text-white/60 group-hover:text-cyan-300'
                              }`}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Camps */}
            <div className="w-2/3 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/country/I9.JPG')" }} />
              <div className={`absolute inset-0 ${isScrolled ? 'bg-gradient-to-r from-white/60 via-white/40 to-transparent' : 'bg-gradient-to-r from-black/20 via-black/10 to-transparent'}`} />
              <div className="relative z-10 px-10 py-8">
                {surfCamps[selectedCountry]?.originals.length > 0 && (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-md ring-1 ring-yellow-500/30">
                          <span className="text-[11px] font-bold text-black leading-none">★</span>
                        </div>
                        <h4 className={`text-[13px] font-bold tracking-[0.22em] uppercase ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                          {tx('navbar.originalsTitle', 'THE SURFER ORIGINAL CAMPS')}
                        </h4>
                      </div>
                      <div className={`h-[2px] w-10 rounded-full ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`} />
                    </div>

                    <ul className="space-y-1 mb-7">
                      {surfCamps[selectedCountry]?.originals.map((camp, index) => (
                        <li key={index}>
                          <Link
                            href={lp(camp.link)}
                            className="group/item flex items-baseline gap-5 py-2"
                            onClick={() => setIsDestinationOpen(false)}
                          >
                            <span
                              className={`text-[10px] font-semibold tabular-nums tracking-[0.2em] transition-colors ${isScrolled ? 'text-gray-400 group-hover/item:text-cyan-600' : 'text-white/50 group-hover/item:text-cyan-300'}`}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`relative text-[17px] font-medium tracking-tight transform transition-all duration-300 group-hover/item:translate-x-1 ${isScrolled ? 'text-gray-800 group-hover/item:text-cyan-600' : 'text-white/90 group-hover/item:text-cyan-200'}`}
                            >
                              {camp.name}
                              <span
                                className={`absolute left-0 -bottom-0.5 h-px w-0 group-hover/item:w-full transition-all duration-300 ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`}
                              />
                            </span>
                            {('isNew' in camp && camp.isNew) && (
                              <span className="self-center inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-sm whitespace-nowrap">
                                ★ Brand New
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {surfCamps[selectedCountry]?.partner.length > 0 && (
                  <div className={`${surfCamps[selectedCountry]?.originals.length > 0 ? 'border-t pt-5 mt-1' : ''} ${isScrolled ? 'border-gray-200' : 'border-white/20'}`}>
                    <div className="mb-5">
                      <h4 className={`text-[13px] font-bold tracking-[0.22em] uppercase mb-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                        {tx('navbar.partnersTitle', 'THE SURFER PARTNERED CAMP')}
                      </h4>
                      <div className={`h-[2px] w-10 rounded-full ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`} />
                    </div>

                    <ul className="space-y-1">
                      {surfCamps[selectedCountry]?.partner.map((camp, index) => (
                        <li key={index}>
                          <Link
                            href={lp(camp.link)}
                            className="group/item flex items-baseline gap-5 py-2"
                            onClick={() => setIsDestinationOpen(false)}
                          >
                            <span
                              className={`text-[10px] font-semibold tabular-nums tracking-[0.2em] transition-colors ${isScrolled ? 'text-gray-400 group-hover/item:text-cyan-600' : 'text-white/50 group-hover/item:text-cyan-300'}`}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`relative text-[17px] font-medium tracking-tight transform transition-all duration-300 group-hover/item:translate-x-1 ${isScrolled ? 'text-gray-800 group-hover/item:text-cyan-600' : 'text-white/90 group-hover/item:text-cyan-200'}`}
                            >
                              {camp.name}
                              <span
                                className={`absolute left-0 -bottom-0.5 h-px w-0 group-hover/item:w-full transition-all duration-300 ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`}
                              />
                            </span>
                            {('isNew' in camp && camp.isNew) && (
                              <span className="self-center inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-sm whitespace-nowrap">
                                ★ Brand New
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MOBILE MENU ===== */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`w-72 mx-auto rounded-3xl mt-0 transform transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl' : 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl'}`}>
          <div className="px-4 py-6 max-h-[75vh] overflow-y-auto">
            <ul className="flex flex-col gap-2 text-center">
              <li>
                <Link href={lp('/')} className={mobileLinkCls('/')} onClick={() => setIsMenuOpen(false)}>
                  {tx('navbar.home', 'HOME')}
                </Link>
              </li>

              {/* Destination (mobile accordion) */}
              <li className="w-full list-none">
                <button
                  className={`group/dest w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isScrolled ? 'text-gray-800 hover:text-cyan-600 hover:bg-gray-100' : 'text-white hover:text-cyan-300 hover:bg-white/20'}`}
                  onClick={() => setIsMobileDestinationOpen((v) => !v)}
                  aria-expanded={isMobileDestinationOpen}
                >
                  <span>{tx('navbar.destination', 'DESTINATION')}</span>
                  <span
                    className={`inline-block text-[11px] leading-none opacity-70 transition-transform duration-300 ${isMobileDestinationOpen ? 'rotate-180' : 'rotate-0'}`}
                  >
                    ▾
                  </span>
                </button>

                {isMobileDestinationOpen && (
                  <div
                    className={`mt-2 rounded-2xl p-4 text-left ${isScrolled ? 'bg-gray-50/80 border border-gray-200' : 'bg-white/5 border border-white/10'}`}
                  >
                    {countries.map((country, ci) => (
                      <div
                        key={country.id}
                        className={ci > 0 ? `mt-5 pt-5 border-t ${isScrolled ? 'border-gray-200' : 'border-white/10'}` : ''}
                      >
                        {/* Country header - name + arrow */}
                        <Link
                          href={lp(country.link)}
                          className={`flex items-center justify-between gap-2 py-1 px-1 rounded-lg transition-colors group/c ${pathname === country.link ? (isScrolled ? 'text-cyan-700' : 'text-cyan-300') : (isScrolled ? 'text-gray-900' : 'text-white')}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-[15px] font-semibold tracking-tight leading-tight">
                            {country.name}
                          </span>
                          <span
                            className={`text-base leading-none transform transition-transform duration-300 group-hover/c:translate-x-1 ${isScrolled ? 'text-gray-400' : 'text-white/60'}`}
                          >
                            →
                          </span>
                        </Link>

                        {/* Originals */}
                        {surfCamps[country.id]?.originals.length > 0 && (
                          <div className="mt-3.5">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm ring-1 ring-yellow-500/30 shrink-0">
                                <span className="text-[9px] font-bold text-black leading-none">★</span>
                              </div>
                              <span
                                className={`text-[10px] font-bold tracking-[0.18em] uppercase leading-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                              >
                                {tx('navbar.originalsTitle', 'THE SURFER ORIGINAL CAMPS')}
                              </span>
                            </div>
                            <div
                              className={`h-[2px] w-7 rounded-full ml-7 mb-1.5 ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`}
                            />
                            <ul className="ml-1 space-y-0.5">
                              {surfCamps[country.id]?.originals.map((camp, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={lp(camp.link)}
                                    className="group/item flex items-baseline gap-3 py-1.5 px-1 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <span
                                      className={`text-[10px] font-semibold tabular-nums tracking-[0.18em] transition-colors ${isScrolled ? 'text-gray-400 group-hover/item:text-cyan-600' : 'text-white/50 group-hover/item:text-cyan-300'}`}
                                    >
                                      {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                      className={`relative text-[13.5px] font-medium tracking-tight leading-tight transform transition-all duration-300 group-hover/item:translate-x-1 ${pathname === camp.link
                                          ? (isScrolled ? 'text-cyan-700 font-semibold' : 'text-cyan-300 font-semibold')
                                          : (isScrolled ? 'text-gray-700 group-hover/item:text-cyan-600' : 'text-white/85 group-hover/item:text-cyan-200')
                                        }`}
                                    >
                                      {camp.name}
                                    </span>
                                    {('isNew' in camp && camp.isNew) && (
                                      <span className="self-center inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white shadow-sm whitespace-nowrap">
                                        ★ New
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Partner */}
                        {surfCamps[country.id]?.partner.length > 0 && (
                          <div className={`${surfCamps[country.id]?.originals.length > 0 ? 'mt-4' : 'mt-3.5'}`}>
                            <span
                              className={`block text-[10px] font-bold tracking-[0.18em] uppercase leading-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                            >
                              {tx('navbar.partnersTitle', 'THE SURFER PARTNERED CAMP')}
                            </span>
                            <div
                              className={`h-[2px] w-7 rounded-full mt-1.5 mb-1.5 ${isScrolled ? 'bg-cyan-500' : 'bg-cyan-300'}`}
                            />
                            <ul className="ml-1 space-y-0.5">
                              {surfCamps[country.id]?.partner.map((camp, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={lp(camp.link)}
                                    className="group/item flex items-baseline gap-3 py-1.5 px-1 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <span
                                      className={`text-[10px] font-semibold tabular-nums tracking-[0.18em] transition-colors ${isScrolled ? 'text-gray-400 group-hover/item:text-cyan-600' : 'text-white/50 group-hover/item:text-cyan-300'}`}
                                    >
                                      {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                      className={`relative text-[13.5px] font-medium tracking-tight leading-tight transform transition-all duration-300 group-hover/item:translate-x-1 ${pathname === camp.link
                                          ? (isScrolled ? 'text-cyan-700 font-semibold' : 'text-cyan-300 font-semibold')
                                          : (isScrolled ? 'text-gray-700 group-hover/item:text-cyan-600' : 'text-white/85 group-hover/item:text-cyan-200')
                                        }`}
                                    >
                                      {camp.name}
                                    </span>
                                    {('isNew' in camp && camp.isNew) && (
                                      <span className="self-center inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white shadow-sm whitespace-nowrap">
                                        ★ New
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>

              {/* Other mobile links */}
              <li><Link href={lp('/activities')} className={mobileLinkCls('/activities')} onClick={() => setIsMenuOpen(false)}>{tx('navbar.activities', 'ACTIVITIES')}</Link></li>
              <li><Link href={lp('/rates')}      className={mobileLinkCls('/rates')}      onClick={() => setIsMenuOpen(false)}>{tx('navbar.rates',      'RATES')}</Link></li>
              <li><Link href={lp('/faq')}        className={mobileLinkCls('/faq')}        onClick={() => setIsMenuOpen(false)}>{tx('navbar.faq',        'FAQ')}</Link></li>
              <li><Link href={lp('/blogs')}      className={mobileLinkCls('/blogs')}      onClick={() => setIsMenuOpen(false)}>{tx('navbar.blogs',      'BLOGS')}</Link></li>
              <li><Link href={lp('/careers')}    className={mobileLinkCls('/careers')}    onClick={() => setIsMenuOpen(false)}>{tx('navbar.careers',    'CAREERS')}</Link></li>
              <li><Link href={lp('/contact')}    className={mobileLinkCls('/contact')}    onClick={() => setIsMenuOpen(false)}>{tx('navbar.contact',    'CONTACT')}</Link></li>

              {/* Translation (mobile) */}
              <li className={`mt-3 pt-4 border-t list-none ${isScrolled ? 'border-gray-200' : 'border-white/15'}`}>
                <LanguageSelect
                  value={locale}
                  onChange={(lng) => changeLanguage(lng)}
                  isScrolled={isScrolled}
                  variant="mobile"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {!isMenuOpen && !isScrolled && (
        <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16">
          <div className="w-full h-0.5 bg-white/80" />
        </div>
      )}
    </div>
  );
};

export default Navbar;

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-compat';
import { useLocale } from 'next-intl';
import { slugify } from '@/data/blogs';

function parseDateCategory(raw: string | undefined): { date: string; category: string } {
  const fallback = { date: '27 June 2023', category: 'Surfing' };
  if (!raw) return fallback;
  const [date, category] = raw.split('/').map((s) => s.trim());
  return { date: date || fallback.date, category: category || fallback.category };
}

export default function BlogsClient() {
  const { t } = useTranslation();
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const blogsData = (t('blog.items', { returnObjects: true }) as any[]) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const totalPages = Math.max(1, Math.ceil(blogsData.length / blogsPerPage));
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogsData.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (typeof window !== 'undefined') {
      const grid = document.getElementById('blog-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const headerImage = isMobile ? t('blog.headerImageMobile') : t('blog.headerImage');

  return (
    <div className="bg-gradient-to-b from-white via-cyan-50/30 to-white">
      {/* Hero */}
      <div
        className="relative min-h-screen mb-4 flex items-center w-full overflow-hidden bg-gray-900"
        id="Header"
      >
        <Image
          src={headerImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <Navbar />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/45 pointer-events-none" />
        <div className="container relative text-center mx-auto py-4 px-4 sm:px-6 md:px-20 lg:px-32 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-[montserrat] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[100px] inline-block max-w-full sm:max-w-3xl font-bold pt-18 mt-16 sm:mt-8 md:-mt-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
          >
            {t('blog.title')}
          </motion.h1>
        </div>
      </div>

      {/* Blog Grid */}
      <div id="blog-grid" className="max-w-6xl mx-auto px-4 my-20 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {currentBlogs.map((blog: any, idx: number) => {
            const isEven = idx % 2 === 0;
            const { date, category } = parseDateCategory(blog.date);
            const onLight = isEven; // white card
            const cardBg = onLight ? 'bg-white text-[#0a67b3]' : 'bg-[#0a67b3] text-white';

            return (
              <motion.article
                key={`${currentPage}-${idx}`}
                className="group relative h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <a
                  href={`/${locale}/blog/${slugify(blog.title)}`}
                  className={`relative flex flex-col h-full overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl ${cardBg}`}
                >
                  {/* Image with overlay + category pill */}
                  <div className="relative overflow-hidden h-56">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                    <span className="absolute top-3 left-3 inline-flex items-center text-[10px] uppercase tracking-[0.18em] font-semibold rounded-full px-3 py-1 bg-white/95 text-[#0a67b3] shadow-sm backdrop-blur-sm">
                      {category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div
                      className={`flex items-center gap-2 text-[11px] tracking-wide ${
                        onLight ? 'text-gray-500' : 'text-cyan-100/90'
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          onLight ? 'bg-[#0a67b3]/70' : 'bg-white/70'
                        }`}
                      />
                      {date}
                    </div>

                    <h3 className="font-bold text-lg leading-snug line-clamp-2 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed line-clamp-3 ${
                        onLight ? 'text-gray-600' : 'text-white/85'
                      }`}
                    >
                      {String(blog.description).split(' ').slice(0, 35).join(' ')}...
                    </p>

                    <span
                      className={`mt-auto pt-3 inline-flex items-center gap-2 text-sm font-semibold ${
                        onLight ? 'text-[#0a67b3]' : 'text-white'
                      }`}
                    >
                      <span className="relative">
                        {t('blog.readMore')}
                        <span
                          className={`absolute left-0 -bottom-0.5 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out ${
                            onLight ? 'bg-[#0a67b3]' : 'bg-white'
                          }`}
                        />
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="flex justify-center mt-14 gap-2.5"
          >
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const active = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  aria-label={`Page ${page}`}
                  aria-current={active ? 'page' : undefined}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ease-out ${
                    active
                      ? 'bg-[#0a67b3] text-white shadow-lg shadow-[#0a67b3]/30 scale-110'
                      : 'bg-white text-[#0a67b3] border border-[#0a67b3]/40 hover:bg-[#0a67b3] hover:text-white hover:shadow-md hover:scale-105'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      <Footer />
    </div>
  );
}

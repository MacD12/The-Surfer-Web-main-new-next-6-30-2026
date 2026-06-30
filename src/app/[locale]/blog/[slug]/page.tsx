import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { blogsData, findPostBySlug, getPostSlug } from '@/data/blogs';
import { routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import JsonLd, { type StructuredData } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data';
import BlogPostClient from './BlogPostClient';

type RouteParams = { slug: string; locale: string };

export async function generateStaticParams() {
  const params: RouteParams[] = [];
  for (const locale of routing.locales) {
    for (const post of blogsData) {
      params.push({ locale, slug: getPostSlug(post) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = findPostBySlug(slug);
  if (!post) {
    return { title: 'Blog post not found | The Surfer' };
  }
  return buildPageMetadata({
    slug: `/blog/${getPostSlug(post)}`,
    title: post.title,
    description: post.description,
    image: post.image,
    type: 'article',
    locale,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const blog = findPostBySlug(slug);
  if (!blog) notFound();

  const postSlug = getPostSlug(blog);

  const schemas: StructuredData[] = [
    articleSchema({
      locale,
      slug: postSlug,
      title: blog.title,
      description: blog.description,
      image: blog.image,
      contentText: blog.content,
      datePublished: blog.date,
    }),
    breadcrumbSchema(locale, [
      { name: 'Blog', slug: '/blogs' },
      { name: blog.title, slug: `/blog/${postSlug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <BlogPostClient blog={blog} allBlogs={blogsData} />
    </>
  );
}

// src/components/seo/JsonLd.tsx
// Server-rendered structured-data tag. Each page passes a typed object;
// we serialize it once and inject as <script type="application/ld+json">.
//
// Server component (no 'use client') - safest for SEO, the JSON ships in the
// initial HTML and crawlers see it without executing any JS.

export type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

export default function JsonLd({ data }: { data: StructuredData }) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML keeps Next from escaping the JSON
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

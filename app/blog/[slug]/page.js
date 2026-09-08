import BlogClient from "./BlogClient";

// SERVER — Fetch data here
async function getPost(slug) {
  const res = await fetch(
    `https://zmapi.zoikomobile.co.uk/api/v1/posts/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

// SERVER — SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post does not exist.",
    };
  }

  const seoTitle = post.meta_title || post.title;
  const seoDescription =
    post.meta_description ||
    post.content?.replace(/<[^>]+>/g, "").slice(0, 160);

  const imageFile = post.og_image || post.cover_image;
  const imageUrl = imageFile
    ? `https://zmapi.zoikomobile.co.uk/storage/${imageFile}`
    : "/no-image.jpg";

  const pageUrl = `https://zoikomobile.co.uk/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      url: pageUrl,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
  };
}

// SERVER — Return CLIENT component
// export default async function BlogPage({ params }) {
//   const post = await getPost(params.slug);

//   return <BlogClient post={post} />;
// }

// ─── SCHEMA DATA (per-slug) ─────────────────────────────────────────────────
const SCHEMA_BY_SLUG = {
  "top-9-telecom-trends-2027": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://zoikomobile.com/blog/top-9-telecom-trends-2027#article",
        "headline": "The Top 9 US Telecom Trends in 2027: A Definitive Guide to 5G SA, eSIM & AI Networks",
        "description": "An executive analysis of US telecommunications trends in 2027, evaluating 5G Standalone cores, eUICC eSIM provisioning, AI call security, and flexible mobile pricing.",
        "inLanguage": "en-US",
        "mainEntityOfPage": "https://zoikomobile.com/blog/top-9-telecom-trends-2027",
        "author": {
          "@type": "Person",
          "name": "Sneha",
          "jobTitle": "Senior Telecom Content Strategist",
          "worksFor": { "@type": "Organization", "name": "Zoiko Mobile US" }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Zoiko Mobile US",
          "url": "https://zoikomobile.com",
          "logo": { "@type": "ImageObject", "url": "https://zoikomobile.com/assets/logo.png" }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://zoikomobile.com/blog/top-9-telecom-trends-2027#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the primary telecom trend in the United States for 2027?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The major US telecom trend for 2027 is the transition to nationwide 5G Standalone (5G SA) networks combined with eUICC eSIM provisioning, delivering latency under 10ms alongside instant carrier switching."
            }
          },
          {
            "@type": "Question",
            "name": "How do US travelers avoid international roaming charges in 2027?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "US travelers can eliminate legacy daily roaming fees ($10–$15/day) by activating global travel eSIM profiles or utilizing transparent international data passes through carriers like Zoiko Mobile US."
            }
          }
        ]
      }
    ]
  },
  // Add more slugs here later if needed
};

// SERVER — Return CLIENT component
export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const schema = SCHEMA_BY_SLUG[slug] || null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <BlogClient post={post} />
    </>
  );
}


"use client";

import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";

export default function BlogDetails() {
  const { slug } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const generateAltText = (title) =>
    title ? `${title} - featured image` : "Blog featured image";

  useEffect(() => {
    if (!slug) return;

    fetch(`https://zmapi.zoikomobile.co.uk/api/v1/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data || null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  if (!post)
    return (
      <div className="text-center py-5">
        Post not found.
        <Button className="mt-3" onClick={() => router.push("/")}>
          Back Home
        </Button>
      </div>
    );

  // ----------- PRIORITIZE META DATA FIRST -----------
  const seoTitle = post.meta_title?.trim() || post.title;
  const seoDescription =
    post.meta_description?.trim() ||
    (post.content
      ? post.content.replace(/<[^>]+>/g, "").slice(0, 160)
      : post.title);

  const seoKeywords = post.meta_keywords
    ? Array.isArray(post.meta_keywords)
      ? post.meta_keywords.join(", ")
      : post.meta_keywords
    : "blog, article, mobile, zoiko";

  // ★★★ IMPORTANT: CLEAN URL (NO /blog/) ★★★
  const pageUrl = `https://zoikomobile.co.uk/${slug}`;

  const imageFile = post.og_image || post.cover_image;
  const imageUrl = imageFile
    ? `https://zmapi.zoikomobile.co.uk/storage/${imageFile}`
    : "/no-image.jpg";

  const imageAlt = post.alt_text || generateAltText(post.title);

  // ----------- SCHEMA.JSON-LD -----------
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seoTitle,
    description: seoDescription,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "Zoiko Mobile",
    },
    publisher: {
      "@type": "Organization",
      name: "Zoiko Mobile",
      logo: {
        "@type": "ImageObject",
        url: "https://zoikomobile.co.uk/logo.png",
      },
    },
    url: pageUrl,
    datePublished: post.published_at,
  };

  return (
    <>
      {/* SEO HEAD SECTION */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />
      <HeadBar text={<>{post.title}</>} />

      <Container className="py-5">
        <Row>
          <Col md={12}>
            <img
              src={imageUrl}
              alt={imageAlt}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h1 className="mt-4 mb-2">{post.title}</h1>

            <p className="text-muted" style={{ fontSize: "14px" }}>
              Published on:{" "}
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </p>

            <div
              className="blog-content mt-3"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            <div className="mt-5">
              <Button variant="dark" onClick={() => router.push("/")}>
                ← Back Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

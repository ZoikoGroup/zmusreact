"use client";

import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function BlogClient({ post }) {
  const router = useRouter();

  if (!post) {
    return (
      <div className="text-center py-5">
        Post not found.
        <Button className="mt-3" onClick={() => router.push("/")}>
          Back Home
        </Button>
      </div>
    );
  }

  // SEO LOGIC
  const metaTitle = post.meta_title?.trim() || post.title;
  const metaDescription =
    post.meta_description?.trim() ||
    post.short_description ||
    post.excerpt ||
    "";
  const metaKeywords = Array.isArray(post.meta_keywords)
    ? post.meta_keywords.join(", ")
    : post.meta_keywords?.toString() || "";
  const ogTitle = post.og_title?.trim() || metaTitle;
  const ogDescription = post.og_description?.trim() || metaDescription;

  const imageFile = post.og_image || post.cover_image;
  const imageUrl = imageFile
    ? `https://zmapi.zoikomobile.co.uk/storage/${imageFile}`
    : "/no-image.jpg";
  const imageAlt = post.alt_text || post.title;

  // --- MAKE ALL IMAGES RESPONSIVE WHILE KEEPING WIDTH/HEIGHT ---
  let contentHtml = post.content
    // Convert relative image src to absolute
    .replace(/src="\/(?!https?:\/\/)([^"]+)"/g, (_, path) => {
      return `src="https://zmapi.zoikomobile.co.uk/${path}"`;
    })
    // Inject responsive style into all <img> tags
    .replace(/<img([^>]+)>/g, (match, attrs) => {
      if (attrs.includes("style=")) {
        return `<img${attrs.replace(
          /style="([^"]*)"/,
          `style="$1;max-width:100%;height:auto"`
        )}>`;
      }
      return `<img ${attrs} style="max-width:100%;height:auto;">`;
    });

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}

        {/* OG Tags */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
      </Head>

      <Header />
      <HeadBar text={<>{post.title}</>} />

      <Container className="py-5">
        <Row>
          <Col md={12}>
            {/* Cover Image */}
            <img
              src={imageUrl}
              alt={imageAlt}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Title */}
            <h1 className="mt-4 mb-2">{post.title}</h1>

            {/* Published Date */}
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

            {/* Blog Content */}
            <div
              className="blog-content mt-3"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
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

      {/* Responsive blog content media */}
      <style jsx>{`
        .blog-content img,
        .blog-content iframe,
        .blog-content video {
          max-width: 100%;
          height: auto !important;
          display: block;
          margin: 1rem 0;
        }

        .blog-content table {
          width: 100% !important;
          border-collapse: collapse;
          display: block;
          overflow-x: auto;
        }

        .blog-content table th,
        .blog-content table td {
          padding: 0.5rem;
          border: 1px solid #ddd;
        }

        .blog-content p {
          margin-bottom: 1rem;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          word-wrap: break-word;
        }

        @media (max-width: 768px) {
          .blog-content h1,
          .blog-content h2,
          .blog-content h3,
          .blog-content h4,
          .blog-content h5,
          .blog-content h6 {
            font-size: 90%;
          }
        }
      `}</style>
    </>
  );
}

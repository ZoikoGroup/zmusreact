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

  // ————————————————
  // SEO LOGIC (fallback system)
  // ————————————————
  // ————————————————
// SEO LOGIC (fallback system)
// ————————————————
const metaTitle = post.meta_title?.trim() || post.title;

const metaDescription =
  post.meta_description?.trim() ||
  post.short_description ||
  post.excerpt ||
  "";

// FIXED — SAFE KEYWORDS HANDLING
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

  return (
    <>
      {/* ——— SEO TAGS ——— */}
      <Head>
        <title>{metaTitle}</title>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}

        
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

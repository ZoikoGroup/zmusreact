"use client";

import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

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

  const imageFile = post.og_image || post.cover_image;
  const imageUrl = imageFile
    ? `https://zmapi.zoikomobile.co.uk/storage/${imageFile}`
    : "/no-image.jpg";

  return (
    <>
      {/* 🔍 META DATA DEBUG BOX */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          border: "1px solid #ddd",
          marginBottom: "20px",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>🔍 META DATA DEBUG</h4>

        <p><strong>Meta Title:</strong> {post.meta_title || "(none)"} </p>
        <p><strong>Meta Description:</strong> {post.meta_description || "(none)"} </p>
        <p><strong>Meta Keywords:</strong> {post.meta_keywords || "(none)"} </p>

        <p><strong>OG Image:</strong> {post.og_image || post.cover_image || "(none)"}</p>

        <p>
          <strong>Slug URL:</strong> https://zoikomobile.co.uk/{post.slug}
        </p>

        <p>
          <strong>Published At:</strong> {post.published_at}
        </p>

        <p style={{ color: "red", marginTop: "10px" }}>
          ⚠ This is a temporary debug box. Remove after verification.
        </p>
      </div>

      <Header />
      <HeadBar text={<>{post.title}</>} />

      <Container className="py-5">
        <Row>
          <Col md={12}>
            <img
              src={imageUrl}
              alt={post.alt_text || post.title}
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

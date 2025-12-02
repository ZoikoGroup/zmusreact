"use client";

import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetails() {
  const { slug } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`https://zmapi.zoikomobile.co.uk/api/v1/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data || null); // API returns post directly
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return <div className="text-center py-5">Loading...</div>;

  if (!post)
    return (
      <div className="text-center py-5">
        Post not found.
        <Button className="mt-3" onClick={() => router.push("/blog")}>
          Back to Blog
        </Button>
      </div>
    );

  return (
    <>
      <Header />
      <HeadBar text={<>{post.title}</>} />

      <Container className="py-5">
        <Row>
          <Col md={12}>
            <img
              src={
                post.cover_image
                  ? `https://zmapi.zoikomobile.co.uk/storage/${post.cover_image}`
                  : "/no-image.jpg"
              }
              alt={post.title}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Title */}
            <h1 className="mt-4 mb-2">{post.title}</h1>

            {/* Publish Date */}
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

            {/* Content */}
            <div
              className="blog-content mt-3"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            {/* Back button */}
            <div className="mt-5">
              <Button variant="dark" onClick={() => router.push("/blog")}>
                ← Back to Blog
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

"use client";

import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogList() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date (e.g. "Dec 02, 2025")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  useEffect(() => {
    fetch("https://zmapi.zoikomobile.co.uk/api/v1/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data?.data || []);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />

      <HeadBar text={<>Latest Articles & Updates</>} />

      <Container className="py-5">
        <h2 className="mb-4">Our Blog</h2>

        {loading ? (
          <div className="text-center p-5">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center p-5">No blog posts found.</div>
        ) : (
          <Row>
            {posts.map((post, index) => (
              <Col md={6} className="mb-4" key={index}>
                <Card className="shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={
                      post.cover_image
                        ? `https://zmapi.zoikomobile.co.uk/storage/${post.cover_image}`
                        : "/no-image.jpg"
                    }
                    style={{ height: 220, objectFit: "cover" }}
                  />

                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>

                    {/* Published Date */}
                    <p className="text-muted small mb-2">
                      📅 {formatDate(post.published_at)}
                    </p>

                    <Card.Text className="text-muted small">
                      {post.content
                        ?.replace(/<[^>]+>/g, "")
                        .substring(0, 150)}
                      ...
                    </Card.Text>

                    <Button
                      variant="danger"
                      onClick={() => router.push(`/blog/${post.slug}`)}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
}

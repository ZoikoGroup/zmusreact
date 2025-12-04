"use client";

import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";

import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogList() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Change as you like

  // Format date
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

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // -----------------------------------------------------

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
          <>
            <Row>
              {currentPosts.map((post, index) => (
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

                      <p className="text-muted small mb-2">
                        📅 {formatDate(post.published_at)}
                      </p>

                      <Card.Text className="text-muted small">
                        {post.content?.replace(/<[^>]+>/g, "").substring(0, 150)}
                        ...
                      </Card.Text>

                      <Button
                        variant="danger"
                        onClick={() => router.push(`/${post.slug}`)}
                      >
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* PAGINATION UI */}
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />

                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </Pagination>
            </div>
          </>
        )}
      </Container>

      <Footer />
    </>
  );
}

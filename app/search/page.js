// SearchPage.jsx
"use client"; // if using App Router and this is a client component

import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: term }),
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      // customise based on your API’s response structure
      if (data && data.results && data.results.length > 0) {
        setResults(data.results);
        // update URL to reflect query (so user can reload/bookmark)
        router.push(`/search?query=${encodeURIComponent(term)}`, { scroll: false });
      } else {
        setResults([]);
        setError("No results found.");
      }
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    if (initialQuery && initialQuery !== searchTerm) {
      setSearchTerm(initialQuery);
      // optionally trigger immediate search
      // handleSearch();
    }
  }, [initialQuery]);

  return (
    <>
    <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
    <Container className="py-5">
      

      {loading && (
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center">Loading...</div>
          </Col>
        </Row>
      )}

      {error && (
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-danger text-center">{error}</div>
          </Col>
        </Row>
      )}

      {!loading && results.length > 0 && (
        <Row className="justify-content-center">
          <Col md={8}>
            <h5 className="mb-3">Search Results</h5>
            {results.map((item, idx) => (
              <Card key={idx} className="mb-3">
                <Card.Body>
                  {/* Adapt based on item properties */}
                  <Card.Title>{item.title || item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="link" href={item.url || "#"}>View Details</Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}
    </Container>
    <Footer />
    </>
  );
}

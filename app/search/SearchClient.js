"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form
} from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlQuery = searchParams?.get("query") || "";
const [loadedOnce, setLoadedOnce] = useState(false);

useEffect(() => {
  if (!loadedOnce && urlQuery) {
    setLoadedOnce(true);
    setSearchTerm(urlQuery);
    performSearch(urlQuery);
  }
}, [urlQuery, loadedOnce]);
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------
  // MAIN SEARCH FUNCTION
  // -------------------------
  const performSearch = async (term) => {
    const cleanedTerm = term.trim();
    if (!cleanedTerm) return;

    setLoading(true);
    setError("");
    setResults([]);
console.log(cleanedTerm);
    try {
      const searchUrl = "https://zmapi.zoikomobile.co.uk/api/v1/search?query="+cleanedTerm;
      
      const response = await fetch(
        searchUrl,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON returned from API");
      }

      if (data?.results?.length) {
        setResults(data.results);

        // Update URL without a page reload
        router.replace(`/search?query=${encodeURIComponent(cleanedTerm)}`, {
          scroll: false,
        });
      } else {
        setError("No results found.");
      }
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    }

    setLoading(false);
  };

  // -------------------------
  // AUTO LOAD WHEN URL PARAM CHANGES
  // -------------------------
  useEffect(() => {
    if (urlQuery && urlQuery !== searchTerm) {
      setSearchTerm(urlQuery);
      performSearch(urlQuery);
    }
  }, [urlQuery]);



  return (
    <>
      <Header />
      <HeadBar text={`Search : ${searchTerm}`} />

      <Container className="py-5">
        
       

        {/* LOADING */}
        {loading && (
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="text-center">Loading...</div>
            </Col>
          </Row>
        )}

        {/* ERROR MESSAGE */}
        {!loading && error && (
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="text-danger text-center">{error}</div>
            </Col>
          </Row>
        )}

        {/* RESULTS */}
        {!loading && results.length > 0 && (
          <Row className="justify-content-center">
            <Col md={8}>
              <h5 className="mb-3">Search Results</h5>

              {results.map((item, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Button
                      variant="link"
                      href={item.url || "#"}
                      target="_blank"
                       style={{textDecoration:"unset !important"}}
                    >
                    <Card.Title className="text-danger" style={{textDecoration:"unset !important"}}>{item.title || item.name}</Card.Title>
                    </Button>
                    {item.description?.trim() && (
                      <Card.Text style={{ padding: "1vw" }}>
                        {item.description}
                      </Card.Text>
                    )}
                    <Button
                      variant="link"
                      href={item.url || "#"}
                      target="_blank"
                       className="text-danger"
                        style={{textDecoration:"unset !important",}}
                    >
                      View Details
                    </Button>
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

"use client";

import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import React, { useState, useEffect } from "react";
import { Container, Table, Form, Row, Col, Pagination } from "react-bootstrap";

export default function FreeInternationalMinutes() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    { destination: "Afghanistan - Cellular", per_mb:"$ 0.00", rounding_mb:"10 KB", per_minutes: "$ 0.03", rounding_minute:"1 min", per_sms:"$ 0.01"},
    { destination: "Afghanistan - Cellular", per_mb:"$ 0.00", rounding_mb:"10 KB", per_minutes: "$ 0.03", rounding_minute:"1 min", per_sms:"$ 0.01"},
    { destination: "Afghanistan - Cellular", per_mb:"$ 0.00", rounding_mb:"10 KB", per_minutes: "$ 0.03", rounding_minute:"1 min", per_sms:"$ 0.01"},
    { destination: "Afghanistan - Cellular", per_mb:"$ 0.00", rounding_mb:"10 KB", per_minutes: "$ 0.03", rounding_minute:"1 min", per_sms:"$ 0.01"},

    // demo data
    ...Array(150)
      .fill(0)
      .map((_, i) => ({
        destination: `Country ${i + 1}`,
        per_mb: Math.floor(Math.random() * 200),
        rounding_mb: Math.floor(Math.random() * 200),
        per_minutes: Math.floor(Math.random() * 200),
        rounding_minute: Math.floor(Math.random() * 200),
        per_sms: Math.floor(Math.random() * 200),
      })),
  ];

  // filter
  const filteredData = data.filter((row) =>
    row.destination.toLowerCase().includes(search.toLowerCase())
  );

  // pagination setup
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  // helper to generate nice compact pagination
  const renderPaginationItems = () => {
    const items = [];
    const visiblePages = 3; // number of pages visible around current

    if (totalPages <= 7) {
      // small number of pages - show all
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // large number of pages
      items.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > visiblePages + 1) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }

      // middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - visiblePages) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="Zoiko Mobile SIM Activation" />

      <Container className="py-5">
        <h3 className="text-center text-danger fw-bold mb-3">
          Free International Minutes
        </h3>

        <p className="text-center fs-5">
          Find the best rates for your destination
        </p>

        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Form.Select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
              style={{ width: "80px" }}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <span>entries per page</span>
          </Col>
          <Col className="text-end">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "250px", display: "inline-block" }}
            />
          </Col>
        </Row>

        <Table bordered hover responsive className="align-middle">
          <thead style={{ backgroundColor: "#e72b63", color: "#fff" }}>
            <tr>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Country</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Per $ MB</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Rounding MB</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Per $ Minute</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Rounding Minute</th>
              <th style={{ backgroundColor: "#e91e63", color: "#fff",textAlign:"center" }}>Per $ SMS</th>
            </tr>
          </thead>
          <tbody  style={{textAlign:"center" }}>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={index} style={{ backgroundColor: "#f8f9fa" }}>


                  <td>{row.destination}</td>
                  <td>{row.per_mb}</td>
                  <td>{row.rounding_mb}</td>
                  <td>{row.per_minutes}</td>
                  <td>{row.rounding_minute}</td>
                  <td>{row.per_sms}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {renderPaginationItems()}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
}

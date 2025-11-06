"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import CarouselPlans from "../components/CarouselPlans";
import React, { useState, useEffect } from "react";
import { Container, Table, Form, Row, Col, Pagination } from "react-bootstrap";

export default function FreeInternationalMinutes() {
;

  return (
    <>
      <Header />
      <HeadBar text={<span style={{ fontSize: '2rem', fontWeight: 'bold' }}>We Are Expanding!</span>} />

      <section className="py-5 growing-section">
  <Container>
    <Row className="align-items-center text-center text-md-start">
      <Col md={6} className="mb-4 mb-md-0">
        <h1 className="fw-bold display-3">We're Growing <br /> Fast!</h1>
        <h2 className="fw-semibold mt-4" style={{ fontSize: "2rem" }}>
          We don't have physical stores <br />
          just yet, but we're expanding <br />
          rapidly!
        </h2>
        <p className="mt-4 fs-5 lh-base">
          In the meantime, enjoy the convenience of <br />
          shopping online and explore our full range of <br />
          plans and services — all just a click away. Stay <br />
          tuned for exciting updates as we bring Zoiko <br />
          Mobile to more locations soon!
        </p>
      </Col>

      <Col md={6}>
        <a href="https://www.google.com/maps/...">
          <img
            src="/img/bro.png"
            alt="Zoiko Mobile Expansion"
            className="img-fluid"
          />
        </a>
      </Col>
    </Row>
  </Container>
</section>
<CarouselPlans />
      <Footer />
    </>
  );
}

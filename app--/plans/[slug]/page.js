"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Modal,
  Card,
  CardBody,
  Image,
} from "react-bootstrap";

import TopHeader from "../../components/TopHeader";
import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import Testimonials from "../../components/Testimonials";

export default function PlanDetailsPage() {
  const { slug } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [simPreference, setSimPreference] = useState("pSIM");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const fetchPlan = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/plan/slug/${slug}`,
          { signal: controller.signal }
        );

        const result = await res.json();

        if (isMounted) {
          if (result.success) setPlan(result.data);
          else setPlan(null);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading plan:", error);
          setLoading(false);
        }
      } finally {
        clearTimeout(timeout);
      }
    };

    fetchPlan();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [slug, API_BASE_URL]);

  if (loading) {
    return (
      <>
        <TopHeader />
        <Header />
        <Container className="text-center mt-5 py-5">
          <Spinner animation="border" variant="danger" />
          <div className="pt-3">Loading plan...</div>
        </Container>
      </>
    );
  }

  if (!plan) {
    return (
      <>
        <TopHeader />
        <Header />
        <HeadBar text="Plan Details" />
        <Container className="text-center mt-5 py-5">
          <h2>Plan not found</h2>
          <p>Please check the plan link or try again later.</p>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text={plan.title} />

      <Container fluid className="bglite">
        <Container className="py-5 w-75">
          <Row className="align-items-start justify-content-between mb-4">
            <Col md="auto">
              <h2 className="mb-0">{plan.title}</h2>
            </Col>
            <Col md="auto" className="text-end">
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#d32f2f",
                }}
              >
                {plan.currency} {plan.price}
              </div>
              /{plan.duration_type}/line
            </Col>
          </Row>

          <h5 className="green">Features</h5>

          {plan.features?.length ? (
            plan.features.map((f, i) => (
              <div
                key={i}
                className="planbox d-flex flex-row p-2 gap-2 align-items-center"
              >
                {f.icon_url && (
                  <img
                    src={`${API_BASE_URL}/storage/${f.icon_url}`}
                    alt={f.text}
                    width="24"
                    height="24"
                  />
                )}
                <span>{f.text}</span>
              </div>
            ))
          ) : (
            <p>No features available.</p>
          )}

          <div className="text-center pt-4">
            <Button variant="danger" size="lg" onClick={() => setShowModal(true)}>
              Continue To Checkout
            </Button>
          </div>
        </Container>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your SIM Preference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sim-preference-inner-container">
            <h3>Choose Your SIM Preference</h3>
            <p>Do you need an eSIM or a physical SIM for your mobile plan?</p>

            <div className="d-flex justify-content-center gap-4 mt-3">
              {["pSIM", "eSIM"].map((type) => (
                <label
                  key={type}
                  style={{
                    cursor: "pointer",
                    color:
                      simPreference === type
                        ? "rgb(223,30,90)"
                        : "rgb(123,123,123)",
                  }}
                >
                  <input
                    type="radio"
                    name="sim_preference"
                    value={type}
                    checked={simPreference === type}
                    onChange={() => setSimPreference(type)}
                    className="me-2"
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className="mt-4 text-start small">
              ● Instant Activation – Get immediate email delivery.<br />
              ● Enhanced Security – Enjoy superior protection.<br />
              ● Effortless Multi-Line Management.<br />
              ● Wide Compatibility – Works with latest smartphones.
            </div>

            <div className="text-center mt-4">
              <Button
                variant="danger"
                onClick={() => {
                  alert(`You selected ${simPreference} for ${plan.title}`);
                  setShowModal(false);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Container fluid className="bglite p-5 whychoose">
        <h2 className="text-center pb-3">Zoiko Mobile Prepaid Plan Features</h2>
        <Row className="gx-3">
          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/rss_feed.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Unlimited Data"
                />
                <p>
                  <span className="txtred body22">Unlimited 5G and 4G LTE Data</span>
                  <br />
                  Enjoy reliable, ultra-fast data, even during peak hours. Stream, browse, and work with confidence.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/text.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Unlimited Talk"
                />
                <p>
                  <span className="txtred body22">Unlimited Talk &amp; Text</span>
                  <br />
                  Stay connected to family and colleagues across the U.S. with unlimited calls and text messages.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/5g-solid.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Nationwide Coverage"
                />
                <p>
                  <span className="txtred body22">Nationwide 5G & 4G Coverage</span>
                  <br />
                  Get dependable coverage from cities to rural areas with Zoiko Mobile’s seamless connectivity.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/hotspot.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Mobile Hotspot"
                />
                <p>
                  <span className="txtred body22">Mobile Hotspot Access</span>
                  <br />
                  Share your mobile data with laptops or tablets at no extra cost — stay connected anywhere.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <br />

        <Row className="gx-3">
          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/devices_other.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Device Protection"
                />
                <p>
                  <span className="txtred body22">Affordable Device Protection</span>
                  <br />
                  Protect your device from accidental damage, loss, or theft with affordable protection plans.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/finance_chip.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Transparent Pricing"
                />
                <p>
                  <span className="txtred body22">Simple and Transparent Pricing</span>
                  <br />
                  No hidden fees — just clear and competitive pricing for all Zoiko Mobile plans.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/phone.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Roaming"
                />
                <p>
                  <span className="txtred body22">Free International Roaming</span>
                  <br />
                  Call and roam freely in Canada and Mexico without extra charges.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <Card className="px-5 py-3">
              <CardBody className="text-center">
                <Image
                  src="/img/icons/customer-support.png"
                  fluid
                  className="icw10 mb-3"
                  alt="Customer Support"
                />
                <p>
                  <span className="txtred body22">Priority Customer Support</span>
                  <br />
                  Get faster, personalized service with Zoiko’s dedicated support team.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Testimonials />
      <Footer />
    </>
  );
}

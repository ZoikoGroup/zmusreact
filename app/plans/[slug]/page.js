"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Card,
  CardBody,
  Image,
} from "react-bootstrap";

import TopHeader from "../../components/TopHeader";
import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import Testimonials from "../../components/Testimonials";

// Import the global modal trigger
import { openPlanPurchaseModal } from "../../components/Header";

export default function PlanDetailsPage() {
  const { slug } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const fetchPlan = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/plan/slug/${slug}`, {
          signal: controller.signal,
        });
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
        {/* <TopHeader /> */}
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
        {/* <TopHeader /> */}
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
      {/* <TopHeader /> */}
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
                {plan.currency}{plan.price}
              </div>
              <div>/{plan.duration_type}/line</div>
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
            <Button
              variant="danger"
              size="lg"
              onClick={() =>
                openPlanPurchaseModal(
                  plan.title,
                  plan.slug,
                  plan.id,
                  plan.price,
                  plan.duration_type,
                  plan.bq_id,
                  plan.plan_type
                )
              }
            >
              Continue To Checkout
            </Button>
          </div>
        </Container>
      </Container>

      {/* Features section */}
      <Container fluid className="bglite p-5 whychoose">
        <h2 className="text-center pb-3">Zoiko Mobile Prepaid Plan Features</h2>
        <Row className="gx-3">
          {[
            {
              icon: "/img/icons/rss_feed.png",
              title: "Unlimited 5G and 4G LTE Data",
              desc: "Enjoy reliable, ultra-fast data, even during peak hours. Stream, browse, and work with confidence.",
            },
            {
              icon: "/img/icons/text.png",
              title: "Unlimited Talk & Text",
              desc: "Stay connected to family and colleagues across the U.S. with unlimited calls and text messages.",
            },
            {
              icon: "/img/icons/5g-solid.png",
              title: "Nationwide 5G & 4G Coverage",
              desc: "Get dependable coverage from cities to rural areas with Zoiko Mobile’s seamless connectivity.",
            },
            {
              icon: "/img/icons/hotspot.png",
              title: "Mobile Hotspot Access",
              desc: "Share your mobile data with laptops or tablets at no extra cost — stay connected anywhere.",
            },
          ].map((feature, index) => (
            <Col key={index} md={3} sm={12} xs={12}>
              <Card className="px-5 py-3">
                <CardBody className="text-center">
                  <Image
                    src={feature.icon}
                    fluid
                    className="icw10 mb-3"
                    alt={feature.title}
                  />
                  <p>
                    <span className="txtred body22">{feature.title}</span>
                    <br />
                    {feature.desc}
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Testimonials />
      <Footer />
    </>
  );
}

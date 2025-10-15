"use client";
import React, { useState, useEffect } from "react";
import { Button, Image, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { openPlanPurchaseModal } from "../components/Header"; // ✅ Import modal trigger

export default function CarouselSimPlan() {
  const [plans, setPlans] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchPlans() {
      try {
        let res = await fetch(`${API_BASE_URL}/api/v1/plans`);
        let data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setPlans(data.data);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    }
    fetchPlans();
  }, [API_BASE_URL]);

  if (!plans) return <div>Loading...</div>;

  const planTypes = [
    { type: "prepaid-plans", title: "Prepaid Plans", href: "/prepaid-plans" },
    { type: "postpaid-plans", title: "Postpaid Plans", href: "/postpaid-plans" },
    { type: "business-plans", title: "Business Plans", href: "/business-deals" },
    { type: "travel-plans", title: "Travel Plans", href: "/travel-plans" },
  ];

  return (
    <>
      <Container fluid className="py-4 bglite">
        <h2 className="text-center py-4">Choose Your Zoiko Mobile Preferred Plan</h2>
        <ul
          className="nav nav-tabs nav-justified tabhead p-1"
          role="tablist"
          style={{ border: "1px solid black", borderRadius: "12px" }}
        >
          {planTypes.map((p, idx) => (
            <li className="nav-item" role="presentation" key={p.type}>
              <Link
                className={`nav-link ${idx === 0 ? "active" : ""}`}
                id={`tab-${idx}`}
                data-bs-toggle="tab"
                href={`#${p.type}`}
                role="tab"
                aria-controls={`tabpanel-${idx}`}
                aria-selected={idx === 0 ? "true" : "false"}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container fluid className="px-4 bglite">
        <div className="tab-content">
          {planTypes.map((p, idx) => (
            <div
              id={p.type}
              className={`tab-pane fade ${idx === 0 ? "show active" : ""}`}
              key={p.type}
            >
              <Row>
                {plans
                  .filter((plan) => plan.plan_type === p.type)
                  .slice(0, 3)
                  .map((item) => (
                    <Col md={4} sm={12} xs={12} key={item.id}>
                      <div className="card p-2">
                        <Image
                          src={`${API_BASE_URL}/storage/${item.featured_image}`}
                          fluid
                          alt={item.title}
                        />
                        <div className="card-header">{item.title}</div>
                        <div className="card-body">
                          <Row>
                            <Col>
                              <div className="data">{item.sub_title}</div>
                            </Col>
                            <Col>
                              <p style={{ textAlign: "right" }}>
                                <span className="curprice">
                                  ${item.price}/{item.duration_type}
                                </span>
                                <br />
                                per line
                              </p>
                            </Col>
                          </Row>
                          <hr className="separator" />
                          <ul className="check-bullet">
                            {item.features.slice(0, 6).map((ftrs, index) => (
                              <li key={index}>{ftrs.text}</li>
                            ))}
                          </ul>
                          <hr className="separator" />
                          <div className="text-center">
                            <Link
                              href={`/plans/${item.slug}`}
                              className="btn btn-outline-danger px-4 me-2"
                            >
                              View plan
                            </Link>
                            <Button
                              variant="danger"
                              onClick={() =>
                                openPlanPurchaseModal(
                                  item.title,
                                  item.slug,
                                  item.id,
                                  item.price,
                                  item.duration_type,
                                  item.bq_id,
                                  item.plan_type
                                )
                              }
                            >
                              Buy this plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
              <div className="text-center py-4">
                <Button variant="outline-danger" size="lg" href={p.href}>
                  View All Plans <i className="bi bi-arrow-right"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

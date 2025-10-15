"use client";

import React, { useEffect, useState } from "react";
import { Container, Card, CardBody, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import { openPlanPurchaseModal } from "../components/Header"; // ✅ Modal trigger

const BusinessPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchBusinessPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/plans/business-plans`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setPlans(result.data);
        } else {
          setError("No business plans found.");
        }
      } catch (err) {
        console.error("Error fetching business plans:", err);
        setError("Failed to load business plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessPlans();
  }, [API_BASE_URL]);

  // Loading State
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
        <p>Loading business plans...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center text-danger py-5">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* BUSINESS PLANS SECTION */}
      <Container fluid className="py-5">
        <h2 className="text-center pt-3">Zoiko Mobile Postpaid Business Deals</h2>
        {plans.length === 0 ? (
          <p className="text-center mt-4">No business plans available.</p>
        ) : (
          <Row className="mt-4">
            {plans.map((plan) => (
              <Col key={plan.id} md={4} sm={12} xs={12} className="mb-4">
                <Card className="shadow-sm h-100">
                  <CardBody>
                    {/* IMAGE */}
                    <Image
                      src={
                        plan.featured_image
                          ? `${API_BASE_URL}/storage/${plan.featured_image}`
                          : "/images/plan-placeholder.png"
                      }
                      onError={(e) => (e.target.src = "/images/plan-placeholder.png")}
                      fluid
                      alt={plan.title}
                    />

                    {/* TITLE */}
                    <h4 className="pt-2 txtred">{plan.title}</h4>
                    <hr className="separator" />

                    {/* PRICE ROW */}
                    <Row>
                      <Col className="data">{plan.sub_title || "Unlimited Data"}</Col>
                      <Col className="text-end">
                        <span className="curprice">
                          {plan.currency} {plan.price}
                        </span>
                        <br />
                        /{plan.duration_type || "month"}/line
                      </Col>
                    </Row>

                    <hr className="separator" />

                    {/* FEATURES */}
                    <ul className="check-bullet">
                      {Array.isArray(plan.features) && plan.features.length > 0
                        ? plan.features.slice(0, 6).map((feature, idx) => (
                            <li key={idx}>{feature.text || feature}</li>
                          ))
                        : <li>No features listed</li>}
                    </ul>

                    <hr className="separator" />

                    {/* BUTTONS */}
                    <Button
                      variant="danger"
                      size="sm"
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
                      Buy This Plan
                    </Button>
                    &nbsp;
                    <Button variant="outline-danger" href={`/plans/${plan.slug}`} size="sm">
                      View Details
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* ADDITIONAL BUSINESS INFO SECTION */}
      <Container fluid className="redimgbg p-0">
        <Container className="p-5 text-white text-center">
          <h4>Climb your business&apos;s bottom line.</h4>
          <p>
            Pick among the best Unlimited Business Postpaid Plans and select the number of lines to see a
            big impact on your business&apos;s bottom line.
          </p>
          <h4>Reward your growing business with just one connection to climb to success.</h4>
          <p>
            Business phone plans are available with a pay monthly rolling easy agreement.
          </p>
        </Container>
      </Container>

      {/* IMAGE BANNER */}
      <Image src="/img/pinkbg-us.webp" fluid alt="Zoiko USA" />
    </>
  );
};

export default BusinessPlans;

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button, Image, Row, Col, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { openPlanPurchaseModal } from "../components/Header"; // ✅ Import modal trigger

const PostpaidSlider = ({ planType = "postpaid-plans" }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/plans/${planType}`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setPlans(result.data);
        } else {
          setError("No plans found.");
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [API_BASE_URL, planType]);

  // Slider settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: plans.length > 3, // Only infinite if more than 3 slides
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
        <p>Loading plans...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-danger py-5">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Container fluid className="py-5 bglite">
      <h2 className="text-center mb-4">
        Zoiko Mobile {planType.replace("-", " ").toUpperCase()}
      </h2>

      {plans.length === 0 ? (
        <p className="text-center">No plans available.</p>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {plans.map((item) => (
              <Card key={item.id} className="shadow-sm mx-2">
                <CardBody>
                  {/* IMAGE */}
                  <Image
                    src={
                      item.featured_image
                        ? `${API_BASE_URL}/storage/${item.featured_image}`
                        : "/images/plan-placeholder.png"
                    }
                    onError={(e) => (e.target.src = "/images/plan-placeholder.png")}
                    fluid
                    alt={item.title}
                  />

                  {/* TITLE */}
                  <h4 className="pt-2 txtred">{item.title}</h4>
                  <hr className="separator" />

                  {/* DATA ROW */}
                  <Row>
                    <Col className="data">{item.sub_title || "Unlimited Data"}</Col>
                    <Col className="text-end">
                      <span className="curprice">
                        {item.currency} {item.price}
                      </span>
                      <br />
                      /{item.duration_type || "month"}/line
                    </Col>
                  </Row>

                  <hr className="separator" />

                  {/* FEATURES */}
                  <ul className="check-bullet">
                    {Array.isArray(item.features) && item.features.length > 0
                      ? item.features.slice(0, 8).map((feature, idx) => (
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
                    Buy This Plan
                  </Button>
                  &nbsp;
                  <Button
                    variant="outline-danger"
                    href={`/plans/${item.slug}`}
                    size="sm"
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </Slider>
        </div>
      )}
    </Container>
  );
};

export default PostpaidSlider;

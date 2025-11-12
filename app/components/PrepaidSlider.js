"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button, Image, Row, Col, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { openPlanPurchaseModal } from "../components/Header"; // ✅ Import modal trigger

const PrepaidSlider = ({ planType = "prepaid-plans" }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/plans/${planType}`);
                const result = await res.json();
                if (result.success && Array.isArray(result.data)) {
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

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p>Loading plans...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger py-5">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <Container fluid className="py-5 bglite">
            <h2 className="text-center">Zoiko Mobile {planType.replace("-", " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {plans.map((item) => (
                        <Card key={item.id}>
                            <CardBody>
                                {/* IMAGE */}
                                <Image
                                    src={
                                        item.featured_image
                                            ? `${API_BASE_URL}/storage/${item.featured_image}`
                                            : "/images/plan-placeholder.png"
                                    }
                                    fluid
                                    alt={item.title}
                                    onError={(e) =>
                                        (e.target.src = "/images/plan-placeholder.png")
                                    }
                                />

                                {/* TITLE */}
                                <h4 className="pt-2 txtred">{item.title}</h4>

                                <hr className="separator" />

                                {/* DATA ROW */}
                                <Row>
                                    <Col className="data">{item.sub_title || "Unlimited Data"}</Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <span className="curprice">{item.currency}{item.price}</span>
                                        <br />
                                        /{item.duration_type || "month"}/line
                                    </Col>
                                </Row>

                                <hr className="separator" />

                                {/* FEATURES */}
                                <ul className="check-bullet">
                                {item.features.slice(0, 6).map((ftrs, index) => (
                                <li key={index}>
                                    {index === 1 ? "Unlimited Talk & Text" : ftrs.text}
                                </li>
                                ))}
                                <li>Discounted Device Protection</li>

                                </ul>

                                <hr className="separator" />

                                {/* BUTTONS */}
                                <div className="gap-3 d-flex justify-content-center">
                                <Button
                                    variant="danger"
                                    onClick={() => openPlanPurchaseModal(item.title, item.slug, item.id, item.price, item.duration_type, item.bq_id, item.plan_type)}
                                >
                                    Buy this plan
                                </Button>
                                <Button variant="outline-danger" href={`/plans/${item.slug}`}>
                                    View Details
                                </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </Slider>
            </div>
        </Container>
    );
};

export default PrepaidSlider;

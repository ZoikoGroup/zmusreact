"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button, Image, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlansSlider = ({ slug }) => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const url = `https://zmapi.zoikomobile.co.uk/api/v1/plans/${slug}`; // dynamic
                const res = await fetch(url);
                const result = await res.json();
                if (result.success) {
                    setPlans(result.data);
                }
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        if (slug) fetchPlans();
    }, [slug]);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Container fluid className="py-5 bglite">
            <h2 className="text-center">Zoiko Mobile {slug} Plans</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {plans.map((item) => (
                        <Card key={item.id}>
                            <CardBody>
                                <Image
                                    src={
                                        item.featured_image
                                            ? `https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`
                                            : "/static/images/plan-placeholder.png"
                                    }
                                    fluid
                                    alt={item.title}
                                />
                                <h4 className="pt-2 txtred">{item.title}</h4>
                                <hr className="separator" />
                                <Row>
                                    <Col className="data">{item.sub_title || "Unlimited Data"}</Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <span className="curprice">{item.currency} {item.price}</span>
                                        <br />
                                        {item.rate || "/mo/line"}
                                    </Col>
                                </Row>
                                <hr className="separator" />
                                 <ul className="check-bullet">
                                    {item.features.slice(0, 8).map((feature, idx) => (
                                        <li key={idx}>{feature.text}</li>
                                    ))}
                                </ul>
                                <hr className="separator" />
                                <Button variant="danger" href={`/plans/${item.slug}`} size="sm">
                                    Buy this plan
                                </Button>
                                &nbsp;
                                <Button variant="outline-danger" href={`/plans/${item.slug}`} size="sm">
                                    View details
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </Slider>
            </div>
        </Container>
    );
};

export default PlansSlider;

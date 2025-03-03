"use client"
import React from "react";
import { Card, CardBody, Container, Button, Image, Row, Col } from "react-bootstrap";
import data from '../products/travelplans.json';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TravelPlanSlider = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container fluid className="py-5 bglite">
            <h2 className="text-center">Stay Connected Globally - Simple, Affordable Travel Plans</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {data.map((item) => (
                        <Card key={item.id}>
                            <CardBody>
                                <Image src={`${item.image}`} fluid alt={`${item.name}`} />
                                <h4 className="pt-2 txtred">{item.name}</h4>
                                <hr className="separator" />
                                <Row>
                                    <Col className="data">{item.data}</Col>
                                    <Col style={{textAlign:'right'}}><span className="curprice">{item.price}</span><br />{item.rate}</Col>
                                </Row>
                                <hr className="separator" />
                                <ul className='check-bullet'>
                                    {item.features.map((index) => (
                                        <li key={index}>{index}</li>
                                    ))}
                                </ul>
                                <hr className="separator" />
                                <Button variant="danger" href={`/products/${item.slug}`}>Buy This Plan</Button>&nbsp;
                                <Button variant="outline-danger" href={`/products/${item.slug}`}>View Details</Button>
                            </CardBody>
                        </Card>
                    ))}
                </Slider>
            </div>
        </Container>
    );
}
export default TravelPlanSlider;
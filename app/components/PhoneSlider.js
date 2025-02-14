"use client"
import React from "react";
import { Card, CardBody, Container, Button } from "react-bootstrap";
import Image from "next/image";
import data from '../products/phonedata.json';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhoneSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
        <Container fluid className="p-5 my-5 bglite">
            <div className="slider-container">
                <Slider {...settings}>
                    {data.map((item) => (
                        <Card key={item.id} className="border-0">
                            <CardBody className="text-center">
                                <Image src={item.image} alt={item.name} width={220} height={300} className="mx-auto d-block" />
                                <h4 className="py-2">{item.name}</h4>
                                <div className="mb-3">Starting From: <span className="txtred body22">{item.price}</span><br />
                                Available colors: {item.color.map((index) => (
                                    <span key={index} style={{color:`${index}`}}><i className="bi bi-circle-fill"></i> </span>
                                ))}<br />
                                Storage: {item.storage.map((index) => (
                                    <span key={index}>{index} </span>
                                ))}</div>
                                <Button variant="outline-danger" href={`/products/${item.slug}`}>View Details</Button>&nbsp;
                                <Button variant="outline-danger" href={`/products/${item.slug}`}>Buy Now</Button>
                            </CardBody>
                        </Card>
                    ))}
                </Slider>
            </div>
        </Container>
    );
}
export default PhoneSlider;
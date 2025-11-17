"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PhoneSlider = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = "https://zmapi.zoikomobile.co.uk/api/v1/products/category/1";
                const res = await fetch(url);
                const result = await res.json();

                if (result.products?.products) {
                    setProducts(result.products.products);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Container fluid className="p-4 bglite">
            <div className="slider-container">
                <Slider {...settings}>

                    {products.map((item) => {
                        const variant = item.variants?.[0] || {};
                        return (
                            <Card key={item.id} className="border-0">
                                <CardBody className="text-center">

                                    {/* Using normal <img> so NO next.config.js required */}
                                    <img
                                        src={`https://zmapi.zoikomobile.co.uk/storage/${item.image_url}`}
                                        alt={item.name}
                                        width="220"
                                        height="260"
                                        style={{ objectFit: "contain" }}
                                        className="mx-auto d-block"
                                    />

                                    <h4 className="py-2">{item.name}</h4>

                                    <div className="mb-3">
                                        Starting From:
                                        <span className="txtred body22">
                                            ${variant.starting_price || "0.00"}
                                        </span>
                                        <br />

                                        {/* COLORS */}
                                        Available Colors:&nbsp;
                                        {variant.colors?.map((color, index) => (
                                            <span key={index}>
                                                <i className="bi bi-circle-fill" style={{ color }}></i>&nbsp;
                                            </span>
                                        ))}

                                        <br />

                                        {/* STORAGE */}
                                        Storage:&nbsp;
                                        {variant.storages?.map((storage, index) => (
                                            <span key={index}>{storage} </span>
                                        ))}
                                    </div>

                                    <Button variant="outline-danger" href={`/products/${item.slug}`}>
                                        View details
                                    </Button>
                                    &nbsp;
                                    <Button variant="outline-danger" href={`/products/${item.slug}`}>
                                        Buy Now
                                    </Button>
                                </CardBody>
                            </Card>
                        );
                    })}

                </Slider>
            </div>
        </Container>
    );
};

export default PhoneSlider;

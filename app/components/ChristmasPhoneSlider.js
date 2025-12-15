"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PhoneSlider = () => {
    const NextArrow = ({ onClick }) => (
  <i
    className="bi bi-chevron-right slick-arrow slick-next custom-arrow"
    onClick={onClick}
  ></i>
);

const PrevArrow = ({ onClick }) => (
  <i
    className="bi bi-chevron-left slick-arrow slick-prev custom-arrow"
    onClick={onClick}
  ></i>
);
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
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
<>
<style>{`

`}</style>

        <Container className="p-4">
            <div className="slider-container">
                <Slider {...settings}>

                    {products.map((item) => {
                        const variant = item.variants?.[0] || {};
                        return (
                            <Card key={item.id} className="border-0 christMobTab">
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
             {/* VIEW ALL BUTTON */}
        <div className="text-center mt-4 refubrishedMobileViewAllBtn">
          <Button href="/product-category/refurbished"
          className=" mt-4 "
            variant="light"
            style={{
              border: "1px solid #ff006f",
              color: "#ff006f",
              padding: "10px 25px",
              borderRadius: ".5vw",
              fontWeight: 600,
            }}
          >
            View All Smartphones →
          </Button>
        </div>
        </Container>
       </>
    );
};

export default PhoneSlider;

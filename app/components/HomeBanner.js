"use client"
import React from "react";
import { Button, Carousel } from "react-bootstrap";
import HeadBar from "./HeadBar";

const HomeBanner = () => {
    return (
        <>
        <HeadBar text={<>Affordable Plans | No Credit Checks | No Hidden Fees | Unlimited Everything | Reliable Nationwide Coverage</>} />
        <Carousel controls={false}>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Unbeatable-VALUE-banner.webp" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="text-center">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Switch &amp; Save</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Know More</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/smartphone-deals-banner.webp" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Buy Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Know More</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/multiple-plans-banner.webp" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Explore Plans</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Shop Devices</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Postal-Workers-banner.webp" alt="Postal Workers" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Military-Veterans-banner.webp" alt="Military Veterans" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/banner-student.webp" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Family-Plans-Banner.webp" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Animal-Charities-Banner.webp" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Music-Hub-banner.webp" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='#' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </>
    );
}
export default HomeBanner;
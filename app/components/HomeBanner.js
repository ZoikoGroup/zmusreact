"use client"
import React from "react";
import { Button, Carousel } from "react-bootstrap";
import HeadBar from "./HeadBar";

const HomeBanner = () => {
    return (
        <>
        <HeadBar text={<>Affordable Plans | No Credit Checks | No Hidden Fees | Unlimited Everything | Reliable Nationwide Coverage</>} />
        <Carousel controls={false} indicators={true}>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Unbeatable-VALUE-banner.png" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="bannertxt text-start">
                        <h1 className="verybig txtred">UNBEATABLE VALUE</h1>
                        <h2 className="py-4"><span className="txtred">ZOIKO MOBILE</span><span className="txtblack">: AMAZING BYOD DEALS | SUPPORTING<br />ANIMALS | ENJOYING MUSIC</span></h2>
                        <Button href='/zoiko-mobile-switch-save-form' variant="danger" size="lg" className="custom-button">Switch &amp; Save</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Know More</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/smartphone-deals-banner.png" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="bigblack">Fantstic Deals On<br />Refurbished Smartphones<span className="txtred">!</span></h1>
                        <h2 className="txtblack py-2">Expertly Tested <span className="txtred">|</span> Easy Payment Options</h2>
                        <h2 className="txtblack pb-3">Premium Quality <span className="txtred">|</span> Free Delivery</h2>
                        <Button href='#' variant="danger" size="lg" className="custom-button">Buy Now</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Know More</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/multiple-plans-banner.png" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="txtred bannerhead">Stay Connected Your Way:<br />Prepaid <span className="txtblack">|</span> Postpaid <span className="txtblack">|</span> Business</h1>
                        <h2 className="txtblack py-4">Plans built for every lifestyle with global<br />coverage and unbeatable flexibility</h2>
                        <Button href='#' variant="danger" size="lg" className="custom-button">Explore Plans</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Shop Devices</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Postal-Workers-banner.png" alt="Postal Workers" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="txtblack">A Special Thank You To<br />U.S. Postal Service Workers</h1>
                        <h2 className="verybig txtred">20% Discount</h2>
                        <h1 className="txtblack">On Any Of Our Plans</h1>
                        <Button href='/postal-service-workers-form' variant="danger" size="lg" className="custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Military-Veterans-banner.png" alt="Military Veterans" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='/military-veterans-form' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/banner-student.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='/college-student-discount-form' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/img/home-banner/Family-Plans-Banner.webp" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox">
                        <Button href='/family-plans' variant="danger" size="lg" className="mx-4 custom-button">Learn More</Button>
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
                        <Button href='/music-hub-registratrion-form' variant="danger" size="lg" className="mx-4 custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </>
    );
}
export default HomeBanner;
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
                <img className="d-none d-md-block w-100" src="/img/home-banner/multiple-plans-banner.png" alt="Unbeatable Value" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/multiple-plans-banner-mobile.png" alt="Unbeatable Value" />
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
                <img className="d-none d-md-block w-100" src="/img/home-banner/Postal-Workers-banner.png" alt="Postal Workers" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Postal-Workers-banner-mobile.png" alt="Postal Workers" />
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
                <img className="d-none d-md-block w-100" src="/img/home-banner/Military-Veterans-banner.png" alt="Military Veterans" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Military-Veterans-banner-mobile.png" alt="Military Veterans" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="bigred">Military &amp; Veterans&apos;</h1>
                        <h1 className="txtred verybig">Lifetime Deals</h1>
                        <ul className="redbullet-banner txtblack">
                            <li>20% Lifetime Discount</li>
                            <li>15% Discount For Family &amp; Friends</li>
                        </ul>
                        <Button href='/military-veterans-form' variant="danger" size="lg" className="custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/banner-student.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/banner-student-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="txtblack pb-3">Zoiko Mobile College<br />Student Discount Program</h1>
                        <h4 className="txtblack">Get Exclusive</h4>
                        <h1 className="txtred verybig">20% Discount</h1>
                        <h1 className="txtblack pb-3">On Any Of Our Plans</h1>
                        <Button href='/college-student-discount-form' variant="danger" size="lg" className="custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Family-Plans-Banner.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Family-Plans-Banner-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="txtred bannerhead">Stay Connected,</h1>
                        <h1 className="txtred bigred">Stay Together</h1>
                        <h2 className="txtblack py-3 midbig"><span style={{fontWeight:'800'}}>Get 20% off</span> your plan when you<br />activate 3 or more plans with Zoiko Mobile</h2>
                        <Button href='/family-plans' variant="danger" size="lg" className="custom-button">Learn More</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Animal-Charities-Banner.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Animal-Charities-Banner-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="txtred bigred">Your Connecton</h1>
                        <h1 className="txtred verybig">Saves Lives</h1>
                        <h2 className="txtblack midbig py-3">Join Zoiko Mobile - We are supporting animals<br />and animal charities whilst keep you connected!</h2>
                        <Button href='#' variant="danger" size="lg" className="custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Music-Hub-banner.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Music-Hub-banner-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start">
                        <h1 className="txtred bigred">Zoiko Music Hub:</h1>
                        <h1 className="txtred midbig">Empowering Music Creators and Lovers</h1>
                        <p className="txtblack body22" style={{fontWeight:'200'}}>At Zoiko Mobile, we know music isn&apos;t just entertainment<br />—it&apos;s a way of life. That&apos;s why we created the Zoiko Music<br />Hub, a dedicated space where music lovers and aspiring<br />musicians can find the tools, perks, and community to fuel<br />their passion. Whether you&apos;re producing your next big hit,<br />jamming with friends, or discovering fresh tunes, Zoiko<br />Mobile is here to keep you connected and inspired.</p>
                        <Button href='/music-hub-registratrion-form' variant="danger" size="lg" className="custom-button">Register Now</Button>
                        <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </>
    );
}
export default HomeBanner;
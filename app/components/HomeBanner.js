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
                <img className="d-none d-md-block w-100" src="/img/home-banner/Unbeatable-VALUE-banner.png" alt="Unbeatable Value" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Unbeatable-VALUE-mobile-banner.png" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="bannertxt text-start d-none d-sm-none d-md-block">
                        <h1 className="verybig txtred">UNBEATABLE VALUE</h1>
                        <h2 className="py-2"><span className="txtred">ZOIKO MOBILE</span><span className="txtblack">: AMAZING BYOD DEALS | SUPPORTING<br />ANIMALS | ENJOYING MUSIC</span></h2>
                        <div className="d-flex flex-nowrap gap-3">
                            <Button href='/all-plans' variant="danger" size="lg">Show plans</Button>
                            <Button href='/about' variant="outline-danger" size="lg">Know More</Button>
                        </div>
                    </div>
                    <div className="d-sm-block d-md-none" style={{marginTop:'-480px'}}>
                        <h1 className="verybig txtred">UNBEATABLE VALUE</h1>
                        <h2 className="py-2"><span className="txtred">ZOIKO MOBILE</span><span className="txtblack">: AMAZING BYOD DEALS | SUPPORTING<br />ANIMALS | ENJOYING MUSIC</span></h2>
                        <div className="d-flex flex-nowrap gap-1">
                            <Button href='/all-plans' variant="danger">Show plans</Button>
                            <Button href='/about' variant="outline-danger">Know More</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/smartphone-deals-banner.png" alt="Unbeatable Value" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/smartphone-deals-mobile-banner.png" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner2">
                        <h1 className="txtred bannerhead">Fantstic Deals On:<br />Refurbished Smartphones !</h1>
                        <h2 className="txtblack d-md-block">Expertly Tested <span className="txtred">|</span> Easy Payment Options<br />
                        Premium Quality <span className="txtred">|</span> Free Delivery</h2>
                        <div className="d-flex flex-nowrap gap-2">
                            <Button href='/prepaid-plans' variant="danger" >Buy Now</Button>
                            <Button href='/product-category/refurbished' variant="outline-danger">Know More</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/multiple-plans-banner.png" alt="Unbeatable Value" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/multiple-plans-banner-mobile.png" alt="Unbeatable Value" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner3">
                        <h1 className="txtred bannerhead">Stay Connected Your Way:<br />Prepaid <span className="txtblack">|</span> Postpaid <span className="txtblack">|</span> Business</h1>
                        <h2 className="txtblack d-none d-md-block">Plans built for every lifestyle with global<br />coverage and unbeatable flexibility</h2>
                        <h2 className="txtblack d-sm-block d-md-none">Plans built for every lifestyle with global coverage and unbeatable flexibility</h2>
                        <div className="d-flex flex-nowrap gap-2">
                            <Button href='/prepaid-plans' variant="danger">Show plans</Button>
                            <Button href='/product-category/refurbished' variant="outline-danger">Shop Devices</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Postal-Workers-banner.png" alt="Postal Workers" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Postal-Workers-banner-mobile.png" alt="Postal Workers" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner4">
                        <h2 className="txtblack">A Special Thank You To<br />U.S. Postal Service Workers</h2>
                        <p className="verybig txtred">20% Discount</p>
                        <h2 className="txtblack">On Any Of Our Plans</h2>
                        <div className="d-flex flex-nowrap gap-3">
                            <Button href='/postal-service-workers-form' variant="danger">Register Now</Button>
                            <Button href='/postal-service-workers' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Military-Veterans-banner.png" alt="Military Veterans" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Military-Veterans-banner-mobile.png" alt="Military Veterans" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner5">
                        <h1 className="txtred">Military &amp; Veterans&apos;<br />Lifetime Deals</h1>
                        <ul className="redbullet-banner txtblack">
                            <li>20% Lifetime Discount</li>
                            <li>15% Discount For Family &amp; Friends</li>
                        </ul>
                        <div className="d-flex flex-nowrap gap-3">
                            <Button href='/military-veterans-form' variant="danger">Register Now</Button>
                            <Button href='/military-veterans/' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/banner-student.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/banner-student-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner6">
                        <h2 className="txtred pt-4">Zoiko Mobile Student Discount Program</h2>
                        <h4 className="txtblack">Get Exclusive</h4>
                        <h1 className="txtred verybig">20% Discount</h1>
                        <h1 className="txtblack pb-3">On Any Of Our Plans</h1>
                        <div className="d-flex flex-nowrap gap-3">
                            <Button href='/college-student-discount-form' variant="danger">Register Now</Button>
                            <Button href='/college-student/' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Family-Plans-Banner.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Family-Plans-Banner-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner7">
                        <h1 className="txtred bannerhead">Stay Connected,</h1>
                        <h1 className="txtred bigred">Stay Together</h1>
                        <h2 className="txtblack py-3 midbig"><span style={{fontWeight:'800'}}>Get 20% off</span> your plan when you<br />activate 3 or more plans with Zoiko Mobile</h2>
                        <Button href='/family-plans' variant="danger" >Learn more</Button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Animal-Charities-Banner.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Animal-Charities-Banner-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start banner8" style={{bottom: "200px"}}>
                        <h1 className="txtred bannerhead d-none d-sm-none d-md-block">Your Connecton</h1>
                        <h1 className="txtred bigred d-none d-sm-none d-md-block">Saves Lives</h1>
                        <h1 className="txtred bigred d-block d-sm-block d-md-none">Your Connecton Saves Lives</h1>
                        <h2 className="txtblack py-3 midbig"><span style={{fontWeight:'800'}}>Join Zoiko Mobile - We are supporting animals<br />and animal charities whilst keep you connected!</span></h2>
                        <div className="d-flex flex-nowrap gap-3">
                            {/* <Button href='/postal-service-workers-form' variant="danger">Register Now</Button> */}
                            <Button href='/animal-charities' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-none d-md-block w-100" src="/img/home-banner/Music-Hub-banner.png" alt="Student Banner" />
                <img className="d-sm-block d-md-none" src="/img/home-banner/Music-Hub-banner-mobile.png" alt="Student Banner" />
                <Carousel.Caption>
                    <div className="btnbox text-start musicbanner banner9">
                        <h1 className="txtred">Zoiko Music Hub:</h1>
                        <h2 className="txtred">Empowering Music Creators and Lovers</h2>
                        <p className="txtblack body22" style={{fontWeight:'200'}}>At Zoiko Mobile, we know music isn&apos;t just entertainment<br />—it&apos;s a way of life. That&apos;s why we created the Zoiko Music Hub, a dedicated space where music lovers and aspiring musicians can find the tools, perks, and community to fuel their passion. Whether you&apos;re producing your next big hit, jamming with friends, or discovering fresh tunes, Zoiko Mobile is here to keep you connected and inspired.</p>
                        <div className="d-flex flex-nowrap gap-3">
                            <Button href='/music-hub-registratrion-form' variant="danger">Register Now</Button>
                            <Button href='/music-hub' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </>
    );
}
export default HomeBanner;
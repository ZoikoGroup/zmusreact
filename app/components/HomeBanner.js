"use client"
import { useEffect } from "react";
import { Button, Carousel,Container, Row, Col, Image } from "react-bootstrap";
  import { IoMdCheckmark  } from "react-icons/io";

import HeadBar from "./HeadBar";
import "bootstrap/dist/css/bootstrap.min.css";
const HomeBanner = () => {
    useEffect(() => {
    // Load Bootstrap JS safely on client only
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <>
        <style>{`
        .christmasBanner{
        height: auto !important;
        padding:unset !important;
        }
    .banner-wrapper{
        background-size: cover !important;
        background-position: center;
        background: url(/img/Banner_image_1.jpg);
        background-repeat: no-repeat;
    }
        @media (max-width: 768px) {
            .banner-wrapper{
        text-align: center;
      }
      .banner-wrapper h1{
        font-size: 5.5vw;
        padding: 0 1vw;
      }
      .banner-wrapper p{
        line-height: 8vw;
        font-size: 3.5vw;
        padding: 0 6vw;
      }
      .bannerButtons{
        display: block !important;
        padding: 0 10vw;
      }
      .bannerButtons a{
        margin-bottom: 3vw;
        width: 100%;
        font-size: 4vw;
      }
        }
      /* 🎄 Snow Container */
.christmasBanner {
  position: relative;
  overflow: hidden;
}

/* Snow overlay */
.snow-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

/* Snow layers */
.snow {
  position: absolute;
  inset: -100%;
  background-image: radial-gradient(
      2px 2px at 20px 30px,
      #fff,
      transparent
    ),
    radial-gradient(2px 2px at 40px 70px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 90px 40px, #fff, transparent),
    radial-gradient(2px 2px at 130px 80px, #fff, transparent),
    radial-gradient(1.5px 1.5px at 160px 30px, #fff, transparent);
  background-size: 200px 200px;
  animation: snowFall 15s linear infinite;
  opacity: 0.8;
}

/* Different speeds for depth */
.snow:nth-child(2) {
  animation-duration: 22s;
  opacity: 0.5;
}

.snow:nth-child(3) {
  animation-duration: 30s;
  opacity: 0.3;
}

@keyframes snowFall {
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(110%);
  }
}

        `}</style>
        <HeadBar text={<>Affordable Plans | No Credit Checks | No Hidden Fees | Unlimited Everything | Reliable Nationwide Coverage</>} />
        <Carousel controls={false} indicators={true}  className="homeBanner">
             
            <Carousel.Item className="bannerItem christmasBanner">
                {/* ❄️ Snow Effect Layer */}
                <div className="snow-container">
                  <span className="snow"></span>
                  <span className="snow"></span>
                  <span className="snow"></span>
                </div>
                <div className="banner-wrapper py-5">
                      <Container>
                        <Row className="align-items-center">
                          {/* LEFT CONTENT */}
                          <Col md={7} className="text-white">
                            <span
                              className="px-3 py-1 rounded-pill fw-bold"
                              style={{ background: "#FFD700", color: "#097e2eff", fontSize: "10px" }}
                            >
                              CHRISTMAS SALE 2025
                            </span>
                
                            <h1 className="fw-bold mt-3">
                              Christmas Phone Plan Deals 2025 <br />
                              30% OFF for 3 Months + FREE Activation
                            </h1>
                
                            <p className="mt-3">
                              Holiday Smartphone Sale USA: refurbished iPhones, eSIM discounts,
                              eco-friendly SIM offers, device protection plans.
                            </p>
                
                            {/* Feature Boxes */}
                            <Row className="mt-4 featuresBoxes">
                              <Col xs={12} md={6} className="mb-3">
                                <div className="p-3 rounded text-white" style={{ background: "#c33838ab" }}>
                                  <IoMdCheckmark  style={{ color: "#FFD43B", fontSize: "20px" }} /> FREE Activation (SIM + eSIM)
                                </div>
                              </Col>
                
                              <Col xs={12} md={6} className="mb-3">
                                <div className="p-3 rounded text-white" style={{ background: "#c33838ab" }}>
                                  <IoMdCheckmark  style={{ color: "#FFD43B", fontSize: "20px" }} /> Christmas refurbished phone deals USA
                                </div>
                              </Col>
                
                              <Col xs={12} md={6} className="mb-3">
                                <div className="p-3 rounded text-white" style={{ background: "#c33838ab" }}>
                                  <IoMdCheckmark  style={{ color: "#FFD43B", fontSize: "20px" }} /> Holiday unlimited data deals
                                </div>
                              </Col>
                
                              <Col xs={12} md={6} className="mb-3">
                                <div className="p-3 rounded text-white" style={{ background: "#c33838ab" }}>
                                  <IoMdCheckmark  style={{ color: "#FFD43B", fontSize: "20px" }} /> Eco-conscious phone plan offers
                                </div>
                              </Col>
                            </Row>
                
                            {/* CTA BUTTONS */}
                            <div className="mt-4 d-flex gap-3 bannerButtons">
                              <Button variant="light" size="lg" href="/all-plans" >
                                Shop Christmas Deals
                              </Button>
                              <Button
                                variant="outline-light"
                                size="lg"
                                style={{ borderWidth: "2px" }}
                                href="/product-category/refurbished"
                              >
                                Shop Refurbished Phones
                              </Button>
                            </div>
                          </Col>
                
                          {/* RIGHT IMAGE SECTION */}
                          <Col md={5} className="text-center">
                            
                
                 {/* RIGHT SIDE — ONLY ONE MOBILE IMAGE */}
                          
                            <Image
                              src="img/phone_image.png"
                              alt="Phone Image"
                              width={380}
                              height={600}
                              className="img-fluid w-100"
                            />
                          
                            
                          </Col>
                        </Row>
                      </Container>
                    </div>
            </Carousel.Item>
           

            <Carousel.Item className="bannerItem banner1">
                            
                            <Carousel.Caption className="bannerContent">
                                <div className="text-start">
                                    <h1 className="verybig txtred">UNBEATABLE VALUE</h1>
                                    <h2 className="py-2"><span className="txtred">ZOIKO MOBILE</span><span className="txtblack">: AMAZING BYOD DEALS | SUPPORTING<br />ANIMALS | ENJOYING MUSIC</span></h2>
                                    <div className="d-flex flex-nowrap gap-3">
                                        <Button href='/all-plans' variant="danger" size="lg">Show plans</Button>
                                        <Button href='/about' variant="outline-danger" size="lg">Know More</Button>
                                    </div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>

            <Carousel.Item className="bannerItem banner2">
                
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
                        <h1 className="txtred bannerhead">Fantstic Deals On:<br />Refurbished Smartphones !</h1>
                        <h2 className="txtblack">Expertly Tested <span className="txtred">|</span> Easy Payment Options<br />
                        Premium Quality <span className="txtred">|</span> Free Delivery</h2>
                        <div className="d-flex flex-nowrap gap-2 homeBannerBtn">
                            <Button href='/prepaid-plans' variant="danger" >Buy Now</Button>
                            <Button href='/product-category/refurbished' variant="outline-danger">Know More</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item className="bannerItem banner3">
                
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
                        <h1 className="txtred bannerhead">Stay Connected Your Way:<br />Prepaid <span className="txtblack">|</span> Postpaid <span className="txtblack">|</span> Business</h1>

                        <h2 className="txtblack">Plans built for every lifestyle with global coverage and unbeatable flexibility</h2>
                        <div className="d-flex flex-nowrap gap-2 homeBannerBtn">
                            <Button href='/prepaid-plans' variant="danger">Show plans</Button>
                            <Button href='/product-category/refurbished' variant="outline-danger">Shop Devices</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="bannerItem banner4">
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
                        <h2 className="txtblack">A Special Thank You To<br />U.S. Postal Service Workers</h2>
                        <p className="verybig txtred">20% Discount</p>
                        <h2 className="txtblack">On Any Of Our Plans</h2>
                        <div className="d-flex flex-nowrap gap-3 homeBannerBtn">
                            <Button href='/postal-service-workers-form' variant="danger">Register Now</Button>
                            <Button href='/postal-service-workers' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="bannerItem banner5">
                
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
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
            <Carousel.Item className="bannerItem banner6">
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
                        <h2 className="txtred">Zoiko Mobile Student Discount Program</h2>
                        <h4 className="txtblack">Get Exclusive</h4>
                        <h1 className="txtred">20% Discount</h1>
                        <h1 className="txtblack">On Any Of Our Plans</h1>
                        <div className="d-flex flex-nowrap gap-3">
                            <Button href='/college-student-discount-form' variant="danger">Register Now</Button>
                            <Button href='/college-student/' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="bannerItem banner7">
                
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
                        <h1 className="txtred">Stay Connected, Stay Together</h1>
                        <h2 className="txtblack py-3 midbig"><span style={{fontWeight:'800'}}>Get 20% off</span> your plan when you<br />activate 3 or more plans with Zoiko Mobile</h2>
                        <div className="d-flex flex-nowrap gap-3 homeBannerBtn">
                            <Button href='/family-plans' variant="danger" >Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="bannerItem banner8">
                
                <Carousel.Caption className="bannerContent">
                    <div className="text-start">
                        <h1 className="txtred bigred">Your Connecton Saves Lives</h1>
                        <h2 className="txtblack py-3 midbig"><span style={{fontWeight:'800'}}>Join Zoiko Mobile - We are supporting animals<br />and animal charities whilst keep you connected!</span></h2>
                        <div className="d-flex flex-nowrap gap-3 homeBannerBtn">
                            <Button href='/animal-charities' variant="outline-danger">Learn more</Button>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="bannerItem banner9">
                
                <Carousel.Caption className="bannerContent" >
                    <div className="text-start">
                        <h1 className="txtred">Zoiko Music Hub:</h1>
                        <h2 className="txtred">Empowering Music Creators and Lovers</h2>
                        <p className="txtblack" style={{fontWeight:'200'}}>At Zoiko Mobile, we know music isn&apos;t just entertainment<br />—it&apos;s a way of life. That&apos;s why we created the Zoiko Music Hub, a dedicated space where music lovers and aspiring musicians can find the tools, perks, and community to fuel their passion. Whether you&apos;re producing your next big hit, jamming with friends, or discovering fresh tunes, Zoiko Mobile is here to keep you connected and inspired.</p>
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
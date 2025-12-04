"use client"
import { useEffect } from "react";
import { Button, Carousel,Container, Row, Col } from "react-bootstrap";


  import { QuestionCircleFill,BarChartFill,  LightningFill,  LaptopFill,  CreditCardFill,  HeartFill  } from "react-bootstrap-icons";
  import { FaSitemap, FaQrcode,FaPercentage,FaSimCard, FaPaw,FaCheck,FaSignal, FaHeart, FaBolt, FaShieldAlt, FaGift, FaLeaf} from "react-icons/fa";
import HeadBar from "./HeadBar";
import "bootstrap/dist/css/bootstrap.min.css";
const HomeBanner = () => {
    useEffect(() => {
    // Load Bootstrap JS safely on client only
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <>
        <HeadBar text={<>Affordable Plans | No Credit Checks | No Hidden Fees | Unlimited Everything | Reliable Nationwide Coverage</>} />
        <Carousel controls={false} indicators={true}  className="homeBanner">

            <Carousel.Item className="bannerItem blkFriHomBnr">
                <style>{`


/* Coupon wrapper for positioning */
.coupon-card-wrapper {
  position: absolute;
  bottom: -50px;
  right: 255px;
}

/* Coupon card design */
.coupon-card {
transform: rotate(3deg);
  display: flex;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 250px;
  font-family: Inter, sans-serif;
  position: relative;
}

/* Green left strip */
.coupon-left {
  background: #35A753;
  color: white;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 14px 8px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1px;
}

/* Right content */
.coupon-right {
  padding: 14px;
  flex: 1;
}

.coupon-small {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.coupon-code {
  margin: 4px 0 6px;
  font-size: 22px;
  font-weight: 700;
  color: #000;
}

.coupon-desc {
  margin-top: 12px;
  font-size: 13px;
  color: #444;
}

.coupon-terms {
  margin: 4px 0 0;
  font-size: 11px;
  color: #999;
}

/* Ticket notches */
.coupon-card::before,
.coupon-card::after {
  content: "";
  width: 20px;
  height: 20px;
  background: #fff;
  position: absolute;
  left: 50px;
  border-radius: 50%;
}

.coupon-card::before {
  top: -10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.coupon-card::after {
  bottom: -10px;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

/* Responsive: center under images */
@media (max-width: 768px) {
  .coupon-card-wrapper {
    position: static;
    margin-top: 20px;
  }

}
   .blkFriHomBnr{
    padding:0 !important;}
@media (max-width: 991.98px) {
    .blkFriHomBnr{
    height:240vw !important;}

                }

      .blkFrdExOff {
  background: #f1faf5;
  padding:5vw;
}
  .card{
  border-radius:1vw !important;
      padding: 3vw 3vw !important;
  }
      
  .supportAnimal h1{
font-size: 4vw;
  }
  .supportAnimal 9{
font-size: 1.4vw;
  }
.deviceProtectionCol2 button, .deviceProtectionCol2 ul{
width: 35vw;
}
.deviceProtectionCol2 button{
    background: #ffffff;
}
.deviceProtectionCol2 li{
    border-bottom: 2px solid #d7d7d76b;
    padding: .5vw 0px 1vw 0;
    }
  `}
    </style>
                <style>{`.fade-out {
  animation: fadeOut 5s forwards;
}
  .blackFridayCarouselPlanTab {
  padding-top:2vw;
  }
.benefit-item {
  font-size: 16px;
}
@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}`}</style>
      <Container fluid className="blackFridayBanner" >
        <Row className="align-items-center">
          {/* LEFT TEXT */}
          <Col md={6} className="blackFridayBannerContent">
            <h1 className="fw-bold mb-4">
              Black Friday Mobile Deals -  Save Big. Switch with Purpose
            </h1>

            <p>
              Up to 60% off SIM & mobile bundles — and every plan supports animal rescues
            </p>
<div  className="py-3">
      <Container>
        <Row className="text-white fw-semibold d-flex align-items-center g-4">

          <Col md="auto" className="d-flex align-items-center gap-2">
            <BarChartFill className="text-warning fs-4" />
            <span>Tier-1 5G & LTE</span>
          </Col>

          <Col md="auto" className="d-flex align-items-center gap-2">
            <LightningFill className="text-warning fs-4" />
            <span>Free SIM Activation</span>
          </Col>

          <Col md="auto" className="d-flex align-items-center gap-2">
            <FaPaw   className="text-warning fs-4" />
            <span>Animal Rescue Support</span>
          </Col>

          <Col md="auto" className="d-flex align-items-center gap-2">
            <LaptopFill className="text-warning fs-4" />
            <span>Digital Onboarding</span>
          </Col>

          <Col md="auto" className="d-flex align-items-center gap-2">
            <CreditCardFill className="text-warning fs-4" />
            <span>No Credit Check Options</span>
          </Col>

        </Row>
      </Container>
    </div>
            <div className="d-flex gap-4 bannerBtns">
              <Button variant="dark" size="lg" href="/all-plans">
                Shop Black Friday Deals
              </Button>
              <Button variant="light" size="lg"  href="/activate">
                Activate Your SIM Now
              </Button>
            </div>
          </Col>

          {/* RIGHT IMAGES */}
          {/* RIGHT IMAGES + COUPON */}
<Col
  md={6}
  className="d-flex justify-content-center gap-4 mt-5 mt-md-0 position-relative"
>

  {/* Images */}
  <div className="d-none d-sm-block">
    <img
      src="/img/frames.png"
      alt="Sample Pet 1"
      style={{ width: "100%", borderRadius: "10px" }}
    />
  </div>

  {/* Coupon Card Positioned at Bottom Right */}
  <div className="coupon-card-wrapper">
    <div className="coupon-card">
      <div className="coupon-left">BLACK FRIDAY</div>

      <div className="coupon-right">
        <p className="coupon-small">Use Promo Code</p>
        <h2 className="coupon-code">ZOIKO50</h2>
        <p className="coupon-small">at Checkout</p>

        <p className="coupon-desc">Save 50% on all transactions.</p>
        <p className="coupon-terms">*Terms & conditions</p>
      </div>
    </div>
  </div>

</Col>

        </Row>
      </Container>
      
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
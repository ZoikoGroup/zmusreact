"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Button, Alert, Form, Card, Image } from "react-bootstrap";
import CarouselPlans from "../components/BlackFridayCarouselPlans";
import Testimonials from "../components/Testimonials";
import PhoneSlider from "../components/ChristmasPhoneSlider";
  import { IoMdCheckmark  } from "react-icons/io";
import { Check2 } from "react-bootstrap-icons";

  import { MdOutlineSimCard } from "react-icons/md";
// import { link } from "fs";

export default function christmasPage(){

const faqs = [
    {
      q: "Does free activation apply to all plans?",
      a: "YES - FREE Activation applies to all plans, including SIM and eSIM.",
    },
    {
      q: "Does 30% OFF apply to bundles?",
      a: "YES - 30% OFF for 3 months applies to all bundles.",
    },
    {
      q: "Are refurbished phones covered by protection?",
      a: "YES - Premium protection plan covers all refurbished devices.",
    },
    {
      q: "Are SIM & eSIM deals the same?",
      a: "YES - Both SIM and eSIM get Free Activation + $10 Credit.",
    },
    {
      q: "Can phone plans be gifted?",
      a: "YES - Perfect holiday gift! All plans can be gifted this Christmas.",
    },
  ];
  const offers = [
    {
      bg: "#C6233C",
      icon: "/img/mob.png",
      title: "FREE SIM Offer",
      items: ["Free SIM", "Free Activation", "$10 Credit"],
      btnText: "Get Free SIM",
      btnColor: "#ffffff",
      btnTextColor: "#000",
      link: "/all-plans",
    },
    {
      bg: "linear-gradient(180deg, #0B5C2B, #148842)",
      icon: "/img/thunder.png",
      title: "eSIM Christmas Offer",
      items: [
        "Instant activation",
        "Free Activation",
        "$10 Credit",
        "One-tap eSIM activation",
      ],
      btnText: "Activate eSIM",
      btnColor: "#C6233C",
      btnTextColor: "#fff",
      link: "/how-to-activate-your-esim",
    },
    {
      bg: "linear-gradient(180deg, #19844A, #34A86A)",
      icon: "/img/plant.png",
      title: "Eco-Friendly SIM Offer",
      items: [
        "$5 OFF",
        "$1 animal rescue donation",
        "Eco-conscious phone plan offers",
      ],
      btnText: "Get Eco SIM",
      btnColor: "#C6233C",
      btnTextColor: "#fff",
      link: "#christmas-deals",
    },
  ];
  return (
    
    <>
    <style>{`
    .banner-wrapper{
        background-size: cover !important;
        background-position: center;
        background: url(/img/Banner_image_1.jpg);
        background-repeat: no-repeat;
    }
    .section_2{
        background-size: contain !important;
        background-position: center;
        background: url(/img/Section.png);
        background-repeat: no-repeat;
        background-color: #fff8dc;
    }
    .refurbishedmobile{
        background-size: contain !important;
        background-position: center;
        background: url(/img/section3.png);
        background-repeat: no-repeat;
        background-color: #fff8dc;
    }
    .refubrishDeal{
        background: url(/img/section3.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position:center;
        padding: 50px;
    }
    body {
        background-color: #ffffff;
    }
    .cardIcon{
        width: 2vw;
    }
    .testimonialSec{background: url(/img/section3.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position:center;
      padding: 50px;
    }
    .testimonialSec .bglite{
        background-color: #ffffff00;
    }
      .holidaySec{
    background-size: cover !important;
        background-position: center;
        background: url(/img/Banner_image_1.jpg);
        background-repeat: no-repeat;
        color: #fff;
        padding: 5vw;        
    }
  .christMobTab{
      background: transparent;
    }

    .esimOffer{
      list-style: none;
      padding: 0,
      margin-bottom: 40px;
      text-align: left;
      color: #fff;
      height: 15vw;
    }
      .refurbishedMarketplace{
        color: #0A6A35;
        font-size: 2rem;      
      }
        .refubrishedMobileSubHead{
        font-size: 2rem;
      }
      .offerTxt{
        font-weight: 600;
        font-size: 1.2vw;
      }
      .blackFridayCarouselPlanTab ul li a{
      font-size: 1.3vw;
        }
      .refubrishedMobileViewAllBtn a{
        width:20vw !important;
      }
    @media (max-width: 768px) {
      .holidaySecSubheading{
          font-size: 2.5vw !important;
      }
      .testimonialSec p.txtgreen{
        font-size: 3vw;      
      }
      .refubrishedMobileViewAllBtn a{
        width: 70vw !important;
      }
      .slick-dots
        {
          position: unset !important;
        }

      .esimOffer{      
        color: #fff;
        height: auto;
      }
      .refubrishDeal {
        padding: unset;
      }
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
      .featuresBoxes{
        padding: 0 10vw;  
        text-align: left !important;
        font-size: 3vw;
      }
      .blackFridayCarouselPlanTab ul li a{
        font-size: 3vw;
      }
      .blackFridayCarouselPlanTab {
        max-width: 100vw !important;
      }
      .christmasBox{
        margin: 0 15vw;
        padding: 0 3vw !important;
      }
      .christmasDeal{
        font-size: 5vw;
      }
      .christmasBox img{
        height: 10vw;
        width: auto;
        margin-top: 5vw;
      }
      .christmasBox .offerTxt{
        padding: unset !important;
        font-size: 4vw;
      }
      .christmasBox h5{
        padding: unset !important;
        font-size: 4vw;
      }
      .christmasLink{
        margin-top: 0vw !important;
      }
      .christmasLink a{
        font-size: 4vw;
      }
      .refurbishedMarketplace{
        color: #0A6A35;
        font-size: 6vw !important;
        margin-top: 10vw !important;      
      }

      .refubrishedMobileSubHead{
        font-size: 4vw;
        padding: 0 12vw;
      }
      .esimBox{
        padding: 0 10vw;
      }
      .esimBox card{
        min-height: auto !important;
      }
      .esimBox .card{
        min-height: auto !important;
      }
      .esimBox .card{
            padding: 40px 20px !important;
      }
      .esimOffer{
        padding: 0 1vw;
      }
      .deviceProtectionRow h2{
        font-size: 5vw !important;
                padding-bottom: 3vw;
      }
      .deviceProtectionRow p{
            width: 100%;
      }
      .whyZM{
        font-size: 5vw !important;
      }
    }
      .deviceProtectionRow a{
        width: 100% !important;
      }
      .esimBox  .card{
            background: #C6233C;
    padding: 3vw 3vw;
      }
    .esimBox  .card h4{
            color: #ffffffff;
      }
    .deviceProtectionContainer{
    margin-bottom: 2vw;
    }
    .christmasBox a{
      text-decoration: none !important;
    }
      .holidaySecSubheading{
      font-size: 1vw !important;}
    `}</style>
      <Header />
      {/* <HeadBar text="Join Buster and flock together with your buddies!" /> */}
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
              <Button variant="light" size="lg" href="#christmas-deals" >
                Shop Christmas Deals
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                style={{ borderWidth: "2px" }}
                href="#refurbishedmobile"
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

    <div style={{ padding: "60px 0" }} className="section_2">
      <Container>

        {/* Heading */}
        <h2 className="text-center mb-4 christmasDeal" style={{ color: "#0B7A3E", fontWeight: "700" }}>
          Christmas Deals 2025
        </h2>

        {/* Underline */}
        <div
          style={{
            width: "120px",
            height: "6px",
            margin: "0 auto 40px auto",
            background: "linear-gradient(to right, #E92C2C, #F6D250)",
            borderRadius: "12px",
          }}
        />

        <Row className="gy-4 justify-content-center">

          {/* Card 1 */}
          <Col md={3}>
            <Card className="p-4 shadow-sm christmasBox" style={{ borderRadius: "20px" }}>
              <div className="text-center mb-3">
                <img src="/img/mobile.png" alt="" width="60" />
              </div>
              <h5 className="text-center" style={{ color: "#0B7A3E", fontWeight: "700" }}>
                Plan Deals
              </h5>
              <p className="text-center text-muted p-4 offerTxt">
                30% OFF for 3 months + FREE Activation
              </p>
              <p className="text-center mt-3 christmasLink">
                <a  href="#christmas-deals" style={{ color: "#E92C2C", fontWeight: "600" }}>
                  View Plans →
                </a>
              </p>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md={3}>
            <Card className="p-4 shadow-sm christmasBox" style={{ borderRadius: "20px" }}>
              <div className="text-center mb-3">
                <img src="/img/gift.png" alt="" width="60" />
              </div>
              <h5 className="text-center" style={{ color: "#0B7A3E", fontWeight: "700" }}>
                Refurbished Marketplace
              </h5>
              <p className="text-center text-muted p-4 offerTxt">
                Up to 40% OFF refurbished devices
              </p>
              <p className="text-center mt-3 christmasLink ">
                <a href="#refurbishedmobile" style={{ color: "#E92C2C", fontWeight: "600" }}>
                  Shop Devices →
                </a>
              </p>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md={3}>
            <Card className="p-4 shadow-sm christmasBox" style={{ borderRadius: "20px" }}>
              <div className="text-center mb-3">
                <img src="/img/card.png" alt="" width="60" />
              </div>
              <h5 className="text-center" style={{ color: "#0B7A3E", fontWeight: "700" }}>
                SIM & eSIM Offers
              </h5>
              <p className="text-center text-muted p-4 offerTxt">
                Free SIM + Free Activation + $10 Credit
              </p>
              <p className="text-center mt-3 christmasLink">
                <a href="/all-plans" style={{ color: "#E92C2C", fontWeight: "600" }}>
                  Get Started →
                </a>
              </p>
            </Card>
          </Col>

        </Row>
      </Container>
      
    </div>
    <div  style={{paddingTop:"2vw",}}   id="christmas-deals">
    <CarouselPlans/>
    </div>
    
         <div className="refubrishDeal" >
      <Container>
<div className="text-center mb-4">
        <h2
        className="fw-bold refurbishedMarketplace"
        style={{ color: "#0A6A35", fontSize: "2rem" }}
      >
        Refurbished Phone Marketplace
      </h2>

      {/* Gradient underline */}
      <div  id="refurbishedmobile"
        style={{
          width: "120px",
          height: "4px",
          margin: "10px auto 20px",
          borderRadius: "10px",
          background: "linear-gradient(to right, #C61D32, #FFC300)",
        }}
      />

      <p className="text-muted refubrishedMobileSubHead">
        Christmas refurbished phone deals USA - Up to 40% OFF
      </p>
</div>
        
          <PhoneSlider />
            </Container>
    </div>

<Container className="text-center py-5">
      <h2 className="fw-bold mb-2" style={{ color: "#0F5C2E" }}>
        SIM & eSIM Offers
      </h2>

      {/* Title underline */}
      <div className="text-center mb-5">
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(to right, #CC092F, #FFD84D)",
            borderRadius: "5px",
            margin: "0 auto",
          }}
        ></div>
      </div>

      <Row className="g-4 justify-content-center esimBox">
        {offers.map((offer, i) => (
          <Col md={4} key={i}>
            <Card
              style={{
                background: offer.bg,
                
              }}
              className="shadow-sm"
            >
              {/* Icon */}
              <div className="mb-4">
                <img src={offer.icon} alt="icon" style={{ width: "40px" }} />
              </div>

              {/* Title */}
              <h4 className="fw-bold mb-4">{offer.title}</h4>

              {/* Features */}
              <ul className="esimOffer">
                {offer.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="mb-3 d-flex align-items-center"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "10px" }}
                  >
                    <span style={{ marginRight: "10px", fontSize: "18px" }}>✔</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button href={offer.link}
                style={{
                  background: offer.btnColor,
                  color: offer.btnTextColor,
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 30px",
                  fontWeight: "bold",
                }}
              >
                {offer.btnText}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
 <Container
      className="p-5 deviceProtectionContainer"
      style={{ background: "#F0FAF5", borderRadius: "12px" }}
    >
      <Row className="align-items-center deviceProtectionRow">
        
        {/* LEFT IMAGE */}
        <Col md={5} className="text-center">
          <div
            style={{
              background: "#F6F6F0",
              borderRadius: "16px",
              padding: "20px",
              display: "inline-block",
            }}
          >
            <img
              src="/img/Device-protection.png" // replace with your image
              alt="Protection Plan"
              style={{ maxWidth: "100%", borderRadius: "12px" }}
            />
          </div>
        </Col>

        {/* RIGHT CONTENT */}
        <Col md={7}>
          <h2 className="fw-bold" style={{ color: "#0A3A2A" }}>
            Christmas Protection Hub
          </h2>

          <p className="text-muted" style={{ marginTop: "-5px" }}>
            Up to 30% OFF • Free Activation • Zero Deductible Bonus
          </p>

          {/* FEATURES LIST */}
          <div className="mt-3">
            {[
              "Theft & loss protection",
              "Accidental damage coverage",
              "Screen crack repair",
              "Next-day replacement",
              "24/7 claim support",
            ].map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center py-2"
                style={{ borderBottom: "1px solid #E4E4E4" }}
              >
                <span style={{ color: "#E2003B" }}>
                  <Check2 size={18} />
                </span>
                <span className="ms-2">{item}</span>
              </div>
            ))}
          </div>

          {/* PRICING */}
          <div className="mt-4">
            <span
              style={{
                textDecoration: "line-through",
                color: "#999",
                marginRight: "10px",
              }}
            >
              $12/mo
            </span>

            <span style={{ fontWeight: "700", color: "#E2003B", fontSize: "24px" }}>
              $7/mo
            </span>

            <span className="ms-2" style={{ color: "#E2003B" }}>
              (40% off Christmas Day)
            </span>
          </div>

          {/* BUTTON */}
          <Button href="/device-protection"
            variant="outline-danger"
            className="mt-4 px-5 py-2"
            style={{
              borderRadius: "8px",
              fontWeight: "600",
              borderWidth: "2px",
            }}
          >
            Add Protection
          </Button>
        </Col>
      </Row>
    </Container>

    <section style={{ backgroundColor: "#e91e63", padding: "70px 0" }}>
      <Container>
        <h2 className="text-center text-white mb-3 whyZM">
          Why Zoiko Mobile USA
        </h2>
        <div className="text-center mb-5">
          <span style={{
            display: "inline-block",
            width: "60px",
            height: "4px",
            background: "yellow",
            borderRadius: "5px"
          }}></span>
        </div>

        <Row className="text-center text-white">
          
          <Col md={3} className="mb-4">
            <img
              src="/img/paw.png"
              alt=""
              style={{ width: 40, marginBottom: 15 }}
            />
            <h5 className="text-warning">Supports Animal Rescue Programs</h5>
            <p>$1 animal rescue donation with eco-friendly SIM</p>
          </Col>

          <Col md={3} className="mb-4">
            <img
              src="/img/plant.png"
              alt=""
              style={{ width: 40, marginBottom: 15 }}
            />
            <h5 className="text-warning">Eco-friendly SIM Cards</h5>
            <p>Eco-conscious phone plan offers</p>
          </Col>

          <Col md={3} className="mb-4">
            <img
              src="/img/tick.png"
              alt=""
              style={{ width: 40, marginBottom: 15 }}
            />
            <h5 className="text-warning">
              Certified Refurbished<br />Marketplace
            </h5>
            <p>Christmas refurbished phone deals USA with 1-Year Warranty</p>
          </Col>

          <Col md={3} className="mb-4">
            <img
              src="/img/rader.png"
              alt=""
              style={{ width: 40, marginBottom: 15 }}
            />
            <h5 className="text-warning">Nationwide 5G Coverage</h5>
            <p>Holiday unlimited data deals across the USA</p>
          </Col>

        </Row>
      </Container>
    </section>
      <div className="position-relative py-5 testimonialSec">
     

      <Container className="text-center">
        <h2 className="fw-bold mb-3">Loved by Our Community</h2>
        <p className="text-muted fs-5">
          See how Zoiko Mobile keeps people connected while making a real difference.
        </p>

        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card
              className="py-4"
              style={{
                background: "#E51655",
                borderRadius: "20px",
                border: "none",
              }}
            >
              <Card.Body>
                <h5 className="text-white fw-bold mb-2">Live Orders:</h5>
                <h3 className="text-white fw-bold">
                  247 people activated plans today
                </h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Testimonials/>
    </div>
    <div style={{ background: "#FFF7DD", padding: "60px 0" }}>
      <Container>
        <h2 className="text-center fw-bold mb-2" style={{ color: "#0F5C2E" }}>
          Holiday FAQ
        </h2>

        {/* Underline */}
        <div className="text-center mb-5">
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(to right, #CC092F, #FFD84D)",
              borderRadius: "5px",
              margin: "0 auto",
            }}
          ></div>
        </div>

        <Row className="g-4 justify-content-center">
          {faqs.map((item, index) => (
            <Col md={4} key={index}>
              <Card
                className="p-4 shadow-sm"
                style={{
                  borderRadius: "15px",
                  borderLeft: "6px solid #CC092F",
                  minHeight: "180px",
                }}
              >
                <h5 className="fw-bold mb-3" style={{ color: "#0F5C2E" }}>
                  {item.q}
                </h5>

                <p className="mb-0" style={{ color: "#555" }}>
                  <span className="fw-bold" style={{ color: "#CC092F" }}>
                    YES
                  </span>{" "}
                  - {item.a.replace("YES - ", "")}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>

    <div className="holidaySec">
      <Container className="text-center">
        <h1 className="fw-bold mb-3">Your Holiday Savings Start Now.</h1>

        <p className="fs-5 mb-4 holidaySecSubheading">
          Christmas Phone Plan Deals 2025 - Don't miss out on 30% OFF + FREE Activation
        </p>

        {/* CTA Buttons */}
        <Row className="justify-content-center mb-5">
          <Col xs="auto" className="mb-2">
            <Button href="/all-plans"
              style={{
                background: "#C4315C",
                border: "none",
                padding: "12px 25px",
                borderRadius: "10px",
              }}
            >
              Shop Christmas Deals
            </Button>
          </Col>

          <Col xs="auto" className="mb-2">
            <Button href="/how-to-activate-your-esim"
              style={{
                background: "#FFD500",
                border: "none",
                padding: "12px 25px",
                color: "#000",
                borderRadius: "10px",
              }}
            >
              Activate SIM/eSIM Free
            </Button>
          </Col>

          <Col xs="auto" className="mb-2">
            <Button href="/product-category/refurbished"
              style={{
                background: "transparent",
                border: "2px solid #fff",
                padding: "12px 25px",
                borderRadius: "10px",
              }}
            >
              Browse Refurb Phones
            </Button>
          </Col>
        </Row>

        {/* Quick Checkout */}
        {/* <div className="text-center mt-4">
          <span className="fw-bold me-2" style={{ color: "#fff" }}>
            Quick Checkout:
          </span>

          <Button href="/checkout"
            variant="light"
            className="me-2"
            style={{
              fontSize: "14px",
              padding: "6px 14px",
              borderRadius: "8px",
            }}
          >
            Apple Pay
          </Button>

          <Button
          href="/checkout"
            variant="light"
            style={{
              fontSize: "14px",
              padding: "6px 14px",
              borderRadius: "8px",
            }}
          >
            Google Pay
          </Button>
        </div> */}
      </Container>
    </div>
      <Footer />
    </>
  );
};


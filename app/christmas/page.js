"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Button, Alert, Form, Card, Image } from "react-bootstrap";
import CarouselPlans from "../components/BlackFridayCarouselPlans";
import Testimonials from "../components/Testimonials";
import PhoneSlider from "../components/ChristmasPhoneSlider";
  import { QuestionCircleFill,BarChartFill,  LightningFill,  LaptopFill,  CreditCardFill,  HeartFill  } from "react-bootstrap-icons";
  import { FaSitemap, FaQrcode,FaPercentage,FaSimCard, FaPaw,FaCheck,FaSignal, FaHeart, FaBolt, FaShieldAlt, FaGift, FaLeaf} from "react-icons/fa";
import { Check2 } from "react-bootstrap-icons";

  import { MdOutlineSimCard } from "react-icons/md";

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
              style={{ background: "#FFD700", color: "#000", fontSize: "14px" }}
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
            <Row className="mt-4">
              <Col xs={12} md={6} className="mb-3">
                <div className="p-3 rounded text-white" style={{ background: "#C33838" }}>
                  ✔ FREE Activation (SIM + eSIM)
                </div>
              </Col>

              <Col xs={12} md={6} className="mb-3">
                <div className="p-3 rounded text-white" style={{ background: "#C33838" }}>
                  ✔ Christmas refurbished phone deals USA
                </div>
              </Col>

              <Col xs={12} md={6} className="mb-3">
                <div className="p-3 rounded text-white" style={{ background: "#C33838" }}>
                  ✔ Holiday unlimited data deals
                </div>
              </Col>

              <Col xs={12} md={6} className="mb-3">
                <div className="p-3 rounded text-white" style={{ background: "#C33838" }}>
                  ✔ Eco-conscious phone plan offers
                </div>
              </Col>
            </Row>

            {/* CTA BUTTONS */}
            <div className="mt-4 d-flex gap-3">
              <Button variant="light" size="lg">
                Shop Christmas Deals
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                style={{ borderWidth: "2px" }}
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
        <h2 className="text-center mb-4" style={{ color: "#0B7A3E", fontWeight: "700" }}>
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
            <Card className="p-4 shadow-sm" style={{ borderRadius: "20px" }}>
              <div className="text-center mb-3">
                <img src="/img/mobile.png" alt="" width="60" />
              </div>
              <h5 className="text-center" style={{ color: "#0B7A3E", fontWeight: "700" }}>
                Plan Deals
              </h5>
              <p className="text-center text-muted p-4">
                30% OFF for 3 months + FREE Activation
              </p>
              <p className="text-center mt-3">
                <a href="#" style={{ color: "#E92C2C", fontWeight: "600" }}>
                  View Plans →
                </a>
              </p>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md={3}>
            <Card className="p-4 shadow-sm" style={{ borderRadius: "20px" }}>
              <div className="text-center mb-3">
                <img src="/img/gift.png" alt="" width="60" />
              </div>
              <h5 className="text-center" style={{ color: "#0B7A3E", fontWeight: "700" }}>
                Refurbished Marketplace
              </h5>
              <p className="text-center text-muted p-4">
                Up to 40% OFF refurbished devices
              </p>
              <p className="text-center mt-3">
                <a href="#" style={{ color: "#E92C2C", fontWeight: "600" }}>
                  Shop Devices →
                </a>
              </p>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md={3}>
            <Card className="p-4 shadow-sm" style={{ borderRadius: "20px" }}>
              <div className="text-center mb-3">
                <img src="/img/card.png" alt="" width="60" />
              </div>
              <h5 className="text-center" style={{ color: "#0B7A3E", fontWeight: "700" }}>
                SIM & eSIM Offers
              </h5>
              <p className="text-center text-muted p-4">
                Free SIM + Free Activation + $10 Credit
              </p>
              <p className="text-center mt-3">
                <a href="#" style={{ color: "#E92C2C", fontWeight: "600" }}>
                  Get Started →
                </a>
              </p>
            </Card>
          </Col>

        </Row>
      </Container>
      
    </div>
    <div  style={{paddingTop:"2vw",}}>
    <CarouselPlans/>
    </div>
    
         <div className="refubrishDeal">
      <Container>
<div className="text-center mb-4">
        <h2
        className="fw-bold"
        style={{ color: "#0A6A35", fontSize: "2rem" }}
      >
        Refurbished Phone Marketplace
      </h2>

      {/* Gradient underline */}
      <div
        style={{
          width: "120px",
          height: "4px",
          margin: "10px auto 20px",
          borderRadius: "10px",
          background: "linear-gradient(to right, #C61D32, #FFC300)",
        }}
      />

      <p className="text-muted" style={{ fontSize: "1rem" }}>
        Christmas refurbished phone deals USA - Up to 40% OFF
      </p>
</div>
        
          <PhoneSlider />
            </Container>
    </div>


 <Container className="my-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#0A6A35" }}>
        SIM & eSIM Offers
      </h2>
<div
        style={{
          width: "120px",
          height: "4px",
          margin: "10px auto 20px",
          borderRadius: "10px",
          background: "linear-gradient(to right, #C61D32, #FFC300)",
        }}
      />
      <Row className="g-4 justify-content-center">

        {/* FREE SIM Offer */}
        <Col md={4}>
          <div
            className="p-4 text-center text-white rounded-4"
            style={{ background: "#C61D32" }}
          >
            <div className="mb-3 fs-1">
              <Image src="/img/mob.png" alt="SIM Card" className="cardIcon"/>
            </div>

            <h4 className="fw-bold mb-4">FREE SIM Offer</h4>

            <ul className="list-unstyled text-start opacity-75">
              <li>✔ Free SIM</li>
              <li>✔ Free Activation</li>
              <li>✔ $10 Credit</li>
            </ul>

            <Button variant="light" className="fw-bold px-4 py-2 mt-3 rounded-3">
              Get Free SIM
            </Button>
          </div>
        </Col>

        {/* eSIM Christmas Offer */}
        <Col md={4}>
          <div
            className="p-4 text-center text-white rounded-4"
            style={{
              background: "linear-gradient(180deg, #0C6B2A, #0A4F22)"
            }}
          >
            <div className="mb-3 fs-1">
              <Image src="/img/thunder.png" alt="SIM Card"  className="cardIcon" />
            </div>

            <h4 className="fw-bold mb-4">eSIM Christmas Offer</h4>

            <ul className="list-unstyled text-start opacity-75">
              <li>✔ Instant activation</li>
              <li>✔ Free Activation</li>
              <li>✔ $10 Credit</li>
              <li>✔ One-tap eSIM activation</li>
            </ul>

            <Button
              style={{ background: "#E03A3E", border: "none" }}
              className="fw-bold px-4 py-2 mt-3 rounded-3"
            >
              Activate eSIM
            </Button>
          </div>
        </Col>

        {/* Eco-Friendly SIM Offer */}
        <Col md={4}>
          <div
            className="p-4 text-center text-white rounded-4"
            style={{
              background: "linear-gradient(180deg, #1FAD59, #168B46)"
            }}
          >
            <div className="mb-3 fs-1">
              <Image src="/img/plant.png" alt="SIM Card"  className="cardIcon" />
            </div>

            <h4 className="fw-bold mb-4">Eco-Friendly SIM Offer</h4>

            <ul className="list-unstyled text-start opacity-75">
              <li>✔ $5 OFF</li>
              <li>✔ $1 animal rescue donation</li>
              <li>✔ Eco-conscious phone plan offers</li>
            </ul>

            <Button
              style={{ background: "#D83434", border: "none" }}
              className="fw-bold px-4 py-2 mt-3 rounded-3"
            >
              Get Eco SIM
            </Button>
          </div>
        </Col>

      </Row>
    </Container>
 <Container
      className="p-5"
      style={{ background: "#F0FAF5", borderRadius: "12px" }}
    >
      <Row className="align-items-center">
        
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
          <Button
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
        <h2 className="text-center text-white mb-3">
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
              src="/img/icons/paw.png"
              alt=""
              style={{ width: 40, marginBottom: 15 }}
            />
            <h5 className="text-warning">Supports Animal<br />Rescue Programs</h5>
            <p>$1 animal rescue donation with eco-friendly SIM</p>
          </Col>

          <Col md={3} className="mb-4">
            <img
              src="/img/icons/eco.png"
              alt=""
              style={{ width: 40, marginBottom: 15 }}
            />
            <h5 className="text-warning">Eco-friendly SIM Cards</h5>
            <p>Eco-conscious phone plan offers</p>
          </Col>

          <Col md={3} className="mb-4">
            <img
              src="/img/icons/check.png"
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
              src="/img/icons/satellite.png"
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

        <p className="fs-5 mb-4">
          Christmas Phone Plan Deals 2025 – Don’t miss out on 30% OFF + FREE Activation
        </p>

        {/* CTA Buttons */}
        <Row className="justify-content-center mb-5">
          <Col xs="auto" className="mb-2">
            <Button
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
            <Button
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
            <Button
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
        <div className="text-center mt-4">
          <span className="fw-bold me-2" style={{ color: "#fff" }}>
            Quick Checkout:
          </span>

          <Button
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
            variant="light"
            style={{
              fontSize: "14px",
              padding: "6px 14px",
              borderRadius: "8px",
            }}
          >
            Google Pay
          </Button>
        </div>
      </Container>
    </div>
      <Footer />
    </>
  );
};


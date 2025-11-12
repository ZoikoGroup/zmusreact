"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const BecomeRetailerPage = () => {
    const data = [
    {
      icon: "./img/Group-691314698.png",
      title: "Retailers",
      text: "Expand your product portfolio and attract new customers by offering Zoiko Mobile products and services in your retail stores.",
    },
    {
      icon: "./img/Group-691314699-1.png",
      title: "Distributors",
      text: "Increase your product distribution channels and reach a broader market by distributing Zoiko Mobile products to retailers and resellers.",
    },
    {
      icon: "./img/Group-691314700-1.png",
      title: "Businesses",
      text: "Enhance your corporate offerings by providing employees with access to exclusive discounts on mobile devices, accessories, and services.",
    },
  ];

  return (
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
      <Container>
        <Row className="align-items-center wholesaleBanner">
          {/* Text Section */}
          <Col md={6}>
            <h2 className="fw-bold" style={{ color: "#DF1E5A" }}>
              Partner with Zoiko Mobile for Wholesale Opportunities
            </h2>
            <p className="mt-3">
              Zoiko Mobile offers wholesale opportunities for retailers, distributors, and businesses looking to expand their product offerings and provide their customers with high-quality mobile devices, accessories, and services. Join us as a wholesale partner and benefit from competitive pricing, extensive product selection, and dedicated support.
            </p>
            <Button
              variant="danger"
              size="lg"
              href="/become-affiliate-form"  
              className="mt-3 px-4"
              style={{ backgroundColor: "#DF1E5A", border: "none" }}
            >
              Sign up today
            </Button>
          </Col>

          {/* Image Section */}
          <Col md={6} className="text-center">
            <img
              src="./img/md.webp"
              alt="Join Forces with Zoiko Mobile"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
      
      <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-5">
          Why Partner with Us
        </h2>
        <Row className="gy-4">
          {/* Retail Partnership */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Vector-1.png"
                alt="Retail Partnership"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Competitive Pricing</h5>
                <p className="mb-0">
                  Take advantage of wholesale pricing and competitive discounts on our wide range of mobile devices, accessories, and services.
                </p>
              </div>
            </div>
          </Col>

          {/* Wholesale Partnership */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/x30_8.png"
                alt="Wholesale Partnership"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Extensive Product Selection</h5>
                <p className="mb-0">
                  Access a diverse selection of the latest smartphones, tablets, accessories, and mobile plans to meet the needs of your customers.
                </p>
              </div>
            </div>
          </Col>

          {/* Affiliate Program */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Vector-2.png"
                alt="Affiliate Program"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Quality Assurance</h5>
                <p className="mb-0">
                  Rest assured that all products offered through our wholesale program are of the highest quality and sourced from reputable manufacturers.
                </p>
              </div>
            </div>
          </Col>

          {/* Corporate Collaboration */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Group-691315067.png"
                alt="Corporate Collaboration"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Dedicated Support</h5>
                <p className="mb-0">
                  Receive personalized support from our dedicated wholesale team, who are committed to helping you succeed and grow your business.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
<section className="py-5" style={{ backgroundColor: "#ffffffff",}}>
      <Container>
        <h2 className="text-center fw-bold mb-5">
          Why Partner with <span className="text-dark">Who Can Benefit</span>
        </h2>
        <Row className="justify-content-center">
          {data.map((item, index) => (
            <Col key={index} md={4} sm={12} className="d-flex justify-content-center mb-4">
              <Card
                className="text-center border-0"
                style={{
                  backgroundColor: "#ffe6ee",
                  borderRadius: "15px",
                  padding: "40px 25px",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{
                      width: "200px",
                      height: "160px",
                      backgroundColor: "#fff",
                      borderRadius: "15px",
                      padding: "15px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                    }}
                  />
                </div>
                <Card.Title
                  style={{
                    color: "#e20074",
                    fontWeight: "700",
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "17px",
                    color: "#000",
                    lineHeight: "1.5",
                  }}
                >
                  {item.text}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
        <div className="partner-section">
      <Container className="pt-5 pb-5">
        <div className="card-wrap">
          <h2 className="section-title">How to Get Started</h2>

          {/* Steps visual */}
          <div className="steps-visual">
            {/* horizontal line */}
            <div className="line" />

            {/* circles (positioned absolutely) */}
            <div className="circle c1">1</div>
            <div className="circle c2">2</div>
            <div className="circle c3">3</div>
            <div className="circle c4">4</div>
          </div>

          {/* Text columns */}
          <Row className="mt-5 steps-text text-start">
            
            <Col md={3} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">1</div>
              <h5 className="step-heading">Apply</h5>
              <p className="step-desc">
                Complete the wholesale application form on our website to apply for a wholesale account.
              </p>
            </Col>

            <Col md={3} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">2</div>
              <h5 className="step-heading">Approval</h5>
              <p className="step-desc">
                Our wholesale team will review your application and notify you of your account status.
              </p>
            </Col>

            <Col md={3} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">3</div>
              <h5 className="step-heading">Order</h5>
              <p className="step-desc">
                Once approved, you can place wholesale orders directly through our online portal or contact our wholesale team for assistance.
              </p>
            </Col>
            <Col md={3} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">4</div>
              <h5 className="step-heading">Grow</h5>
              <p className="step-desc">
                Expand your product offerings, attract new customers, and grow your business with Zoiko Mobile.
              </p>
            </Col>
          </Row>
        </div>

        {/* Contact block */}
        <div className="contact-block mt-5">
          <h4 className="contact-title">Contact Us</h4>
          <p className="lead contact-body">
            

            If you're interested in partnering with Zoiko Mobile for wholesale opportunities or have any questions about our wholesale program, please contact us at <a href="mailto:wholesale@zoikomobile.com" className="mailto">wholesale@zoikomobile.com</a>. Our team is here to assist you and provide you with the support you need.

          </p>

          <p className="company-name">Zoiko Mobile America</p>
          <p className="company-address">5900 Balcones Drive, Suite 100, Austin, TX 78731</p>
        </div>
      </Container>

      {/* styles (you can move these to a CSS file) */}
      <style jsx>{`
        .partner-section {
          background: #ffffff;
        }

        .card-wrap {
          background: #fafafa;
          border-radius: 12px;
          padding: 48px 36px 30px;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
        }

        .section-title {
          text-align: center;
          font-weight: 700;
          margin: 0 0 20px;
          color: #1f2d2d; /* dark gray */
        }

        /* Steps visual (line + circles) */
        .steps-visual {
          position: relative;
          height: 72px; /* controls vertical spacing above text */
          display: block;
        }

        .steps-visual .line {
          position: absolute;
          left: 1%;
          right: 23%;
          top: 36px; /* center line vertically inside steps-visual */
          height: 4px;
          background: #e81f5a; /* pink */
          border-radius: 2px;
        }

        .circle1 {
          top: 15px; /* slightly above line so circle center overlaps line */
          width: 48px;
          height: 48px;
          line-height: 48px;
          border-radius: 50%;
          background: #e81f5a;
          color: #fff;
          text-align: center;
          font-weight: 700;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
        }

        .circle {
          position: absolute;
          top: 15px; /* slightly above line so circle center overlaps line */
          width: 48px;
          height: 48px;
          line-height: 48px;
          border-radius: 50%;
          background: #e81f5a;
          color: #fff;
          text-align: center;
          font-weight: 700;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
        }


        /* place three circles: left, center, right */
        .circle.c1 {
          left: 2%;
          transform: translateX(-50%);
        }
        .circle.c2 {
          left: 28%;
          transform: translateX(-50%);
        }
        .circle.c3 {
          right: 47%;
          transform: translateX(50%);
        }
           .circle.c4 {
          right: 22%;
          transform: translateX(50%);
        }

        /* Step text block */
        .steps-text .step-heading {
          color: #e81f5a;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .steps-text .step-desc {
          color: #222;
          line-height: 1.6;
        }

        /* Contact area */
        .contact-block {
          max-width: 980px;
        }

        .contact-title {
          color: #e81f5a;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .contact-body {
          color: #222;
          max-width: 900px;
          line-height: 1.7;
        }

        .mailto {
          color: #0A5A35; /* green link like screenshot */
          text-decoration: none;
        }
        .company-name {
          color: #0A5A35;
          font-weight: 600;
          margin-top: 22px;
          margin-bottom: 4px;
        }
        .company-address {
          margin-bottom: 0;
          color: #222;
        font-size: 1.25rem;
        }

        .step-heading{
              color: #e81f5a;
                  font-size: 1.5rem;
          }
                  .circle {
            display: block;
          }

          .circle1 {
            display: none;
          }


        /* Responsive behavior */
        @media (max-width: 991px) {
          .steps-visual .line {
            left: 4%;
            right: 30%;
          }
            .step-heading, .step-desc{
              text-align: center !important;
          }

          
        }

        /* On small screens stack steps and hide the horizontal line visual */
        @media (max-width: 767px) {
          .steps-visual {
            height: 0;
            margin-bottom: 0;
          }
          .steps-visual .line,
          .circle {
            display: none;
          }

          .circle1 {
            display: block;
          }

          .card-wrap {
            padding: 24px 18px;
          }

          .steps-text .step-desc {
            font-size: 15px;
          }
        .step-heading, .step-desc{
              text-align: center !important;
          }
        }
          @media (min-width: 766px) and (max-width: 991px){
            .steps-visual{
                display: none;
            }
          }
      `}</style>
    </div>
      <Footer />
    </>
  );
};

export default BecomeRetailerPage;

"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const BecomePartnerPage = () => {
    const data = [
    {
      icon: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Icon_1.png",
      title: "Quality Products:",
      text: "Access high-quality mobile devices, accessories, and services from leading brands in the industry.",
    },
    {
      icon: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Icon_2.png",
      title: "Competitive Pricing:",
      text: "Benefit from competitive pricing and attractive discounts to maximize your profitability.",
    },
    {
      icon: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Icon_3.png",
      title: "Dedicated Support:",
      text: "Receive personalized support and guidance from our experienced team to help you succeed in your partnership with Zoiko Mobile America.",
    },
  ];

  return (
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
      <Container>
        <Row className="align-items-center">
          {/* Text Section */}
          <Col md={6}>
            <h2 className="fw-bold" style={{ color: "#DF1E5A" }}>
              Join Forces with Zoiko Mobile
            </h2>
            <p className="mt-3">
              Zoiko Mobile invites you to join forces with us and become a valued
              partner. Whether you're a retailer, distributor, affiliate
              marketer, or technology enthusiast, there are numerous
              opportunities to collaborate and grow together. Partner with us
              and unlock a world of possibilities in the dynamic mobile
              technology industry.
            </p>
            <Button
              variant="danger"
              size="lg"
              href="/become-partner-form"
              className="mt-3 px-4"
              style={{ backgroundColor: "#DF1E5A", border: "none" }}
            >
              Sign up today
            </Button>
          </Col>

          {/* Image Section */}
          <Col md={6} className="text-center">
            <img
              src="./img/Rectangle-665.webp"
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
          Opportunities for Collaboration
        </h2>
        <Row className="gy-4">
          {/* Retail Partnership */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img//Rectangle-667.png"
                alt="Retail Partnership"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Retail Partnership</h5>
                <p className="mb-0">
                  Expand your product offerings by retailing Zoiko Mobile
                  America's extensive range of mobile devices, accessories,
                  and services in your stores or online platforms.
                </p>
              </div>
            </div>
          </Col>

          {/* Wholesale Partnership */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img//Rectangle-668.png"
                alt="Wholesale Partnership"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Wholesale Partnership</h5>
                <p className="mb-0">
                  Access competitive pricing and extensive product selection as
                  a wholesale partner, catering to retailers, distributors,
                  and businesses seeking quality mobile products.
                </p>
              </div>
            </div>
          </Col>

          {/* Affiliate Program */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img//Rectangle-669.png"
                alt="Affiliate Program"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Affiliate Program</h5>
                <p className="mb-0">
                  Monetize your online presence by joining our affiliate program
                  and earning commissions for promoting Zoiko Mobile America's
                  products and services to your audience.
                </p>
              </div>
            </div>
          </Col>

          {/* Corporate Collaboration */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Rectangle-670.png"
                alt="Corporate Collaboration"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Corporate Collaboration</h5>
                <p className="mb-0">
                  Enhance your corporate offerings by providing employees with
                  exclusive discounts on mobile devices, accessories, and
                  services through our corporate program.
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
          Why Partner with <span className="text-dark">Zoiko Mobile America?</span>
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
          </div>

          {/* Text columns */}
          <Row className="mt-5 steps-text text-start">
            
            <Col md={4} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">1</div>
              <h5 className="step-heading">Explore Opportunities:</h5>
              <p className="step-desc">
                Explore the various partnership opportunities available and determine
                which aligns best with your business goals and interests.
              </p>
            </Col>

            <Col md={4} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">2</div>
              <h5 className="step-heading">Apply or Inquire:</h5>
              <p className="step-desc">
                Complete the application process for the partnership program of your
                choice or reach out to us directly for more information and guidance.
              </p>
            </Col>

            <Col md={4} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">3</div>
              <h5 className="step-heading">Collaborate and Grow:</h5>
              <p className="step-desc">
                Once approved, collaborate closely with our team to leverage resources,
                drive growth, and achieve mutual success.
              </p>
            </Col>
          </Row>
        </div>

        {/* Contact block */}
        <div className="contact-block mt-5">
          <h4 className="contact-title">Contact Us</h4>
          <p className="lead contact-body">
            Ready to embark on a journey of collaboration and growth with Zoiko Mobile
            America? Contact us today at{" "}
            <a href="mailto:partnership@zoikomobile.com" className="mailto">
              partnership@zoikomobile.com
            </a>{" "}
            to discuss partnership opportunities and take the first step towards a
            rewarding partnership.
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
          left: 0%;
          right: 30%;
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
          left: 36%;
          transform: translateX(-50%);
        }
        .circle.c3 {
          right: 30%;
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
      `}</style>
    </div>
      <Footer />
    </>
  );
};

export default BecomePartnerPage;

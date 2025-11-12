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
      <HeadBar text="Earn More with a Reliable Nationwide Mobile Network" />
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
      <Container>
        <Row className="align-items-center">
          {/* Text Section */}
          <Col md={6}>
            <h2 className="fw-bold" style={{ color: "#DF1E5A" }}>
              Join Our Affiliate Program and Earn Rewards
            </h2>
            <p className="mt-3">
              At Zoiko Mobile, we value partnerships and collaborations with individuals and organizations who share our passion for connecting people. Our Affiliate Program offers an opportunity for you to earn rewards while promoting our products and services to your audience.
            </p>
            <Button
              variant="danger"
              size="lg"
              href="/become-retailer-form"  
              className="mt-3 px-4"
              style={{ backgroundColor: "#DF1E5A", border: "none" }}
            >
              Sign up today
            </Button>
          </Col>

          {/* Image Section */}
          <Col md={6} className="text-center">
            <img
              src="./img/Rectangle-665-1.webp"
              alt="Join Forces with Zoiko Mobile"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
       <div className="partner-section">
      <Container className="pt-5 pb-5">
        <div className="card-wrap">
          <h2 className="section-title">How It Works</h2>

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
              <h5 className="step-heading">Sign Up:</h5>
              <p className="step-desc">
                Joining our Affiliate Program is easy and free. Simply complete the online application form on our website to become an affiliate partner.
              </p>
            </Col>

            <Col md={4} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">2</div>
              <h5 className="step-heading">Promote:</h5>
              <p className="step-desc">
                Once approved, you will receive unique tracking links and promotional materials that you can share with your audience through your website, blog, social media channels, or other marketing channels.
              </p>
            </Col>

            <Col md={4} className="mb-4">
            <div className="circle1 c1 mx-auto mb-3">3</div>
              <h5 className="step-heading">Earn Rewards:</h5>
              <p className="step-desc">
                Earn commissions for every qualified sale generated through your affiliate links. The more referrals you make, the more rewards you can earn.
              </p>
            </Col>
          </Row>
        </div>
      <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-5">
          Benefits of Joining
        </h2>
        <Row className="gy-4">
          {/* Retail Partnership */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Rectangle-667-1.png"
                alt="Retail Partnership"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Earn Commissions</h5>
                <p className="mb-0">
                  Receive competitive commissions on sales generated through your affiliate links.
                </p>
              </div>
            </div>
          </Col>

          {/* Wholesale Partnership */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Rectangle-669.png"
                alt="Wholesale Partnership"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Support and Guidance</h5>
                <p className="mb-0">
                  Receive dedicated support from our affiliate management team to help you maximize your earning potential and optimize your marketing efforts.
                </p>
              </div>
            </div>
          </Col>

          {/* Affiliate Program */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Rectangle-668.png"
                alt="Affiliate Program"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Access to Resources</h5>
                <p className="mb-0">
                  Gain access to a variety of marketing materials, including banners, text links, and product images, to help you promote Zoiko Mobile America effectively.
                </p>
              </div>
            </div>
          </Col>

          {/* Corporate Collaboration */}
          <Col md={6}>
            <div className="d-flex align-items-center">
              <img
                src="./img/Rectangle-670-1.png"
                alt="Corporate Collaboration"
                className="me-3"
                width="60"
                height="60"
              />
              <div>
                <h5 className="fw-bold text-danger">Track Performancex</h5>
                <p className="mb-0">
                  Monitor your performance and earnings in real-time through our affiliate dashboard, providing you with valuable insights into your campaign effectiveness.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

            <section style={{ padding: "60px 0" }}>
      <Container>
        {/* Who Can Join Section */}
        <Row className="text-center mb-5">
          <Col>
            <h3 style={{ color: "#E91E63", fontWeight: "700" }}>Who Can Join</h3>
            <p style={{ fontSize: "18px", color: "#333", marginTop: "20px", lineHeight: "1.7" }}>
              Our Affiliate Program is open to individuals, influencers, bloggers, content creators,
              website owners, and businesses who are passionate about mobile technology and want to
              promote Zoiko Mobile America to their audience.
            </p>
          </Col>
        </Row>

        {/* Join Today Section */}
        <Row className="justify-content-center">
          <Col md={10}>
            <div
              style={{
                backgroundColor: "#fafafa",
                borderRadius: "10px",
                padding: "40px 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  flex: "0 0 200px",
                  textAlign: "center",
                  borderRight: "2px solid #E91E63",
                  marginRight: "30px",
                }}
              >
                <h3 style={{ color: "#E91E63", fontWeight: "700", marginBottom: "0" }}>Join</h3>
                <h3 style={{ color: "#E91E63", fontWeight: "700" }}>Today</h3>
              </div>
              <div style={{ flex: "1", minWidth: "250px" }}>
                <p style={{ fontSize: "18px", color: "#333", margin: "0", lineHeight: "1.6" }}>
                  Ready to start earning rewards as a Zoiko Mobile America affiliate? Visit our
                  website and sign up for our Affiliate Program today. We look forward to partnering
                  with you and growing together.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

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

export default BecomeRetailerPage;

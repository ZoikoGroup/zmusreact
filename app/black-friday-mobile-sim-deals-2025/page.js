"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Alert, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import CarouselPlans from "../components/BlackFridayCarouselPlans";
import Testimonials from "../components/Testimonials";

  import { QuestionCircleFill,BarChartFill,  LightningFill,  LaptopFill,  CreditCardFill,  HeartFill  } from "react-bootstrap-icons";
  import { FaSitemap, FaQrcode,FaPercentage,FaSimCard, FaPaw,FaCheck,FaSignal, FaHeart, FaBolt, FaShieldAlt, FaGift, FaLeaf} from "react-icons/fa";


  import { MdOutlineSimCard } from "react-icons/md";

export default function blackFridaySpecialPage(){

const faqData = [
    {
      q: "What are the Black Friday deals?",
      a: "Up to 60% off mobile plans, free SIM activation, and 40% off ZoikoCare™ device protection."
    },
    {
      q: "How does my plan support animal rescue?",
      a: "Every Zoiko Mobile plan contributes to the Zoiko Animal Rescue Network (ZARN) which supports shelters nationwide."
    },
    {
      q: "What does ZoikoCare™ cover?",
      a: "Protection covers theft, loss, accidental damage, and screen breaks with next-day replacement available."
    },
    {
      q: "Can I bring my own device?",
      a: "Yes, Zoiko Mobile supports most unlocked devices. Check compatibility on our website."
    },
    {
      q: "When do Black Friday offers end?",
      a: "Offers run from November 28 through December 1 (Cyber Monday), 2025."
    },
    {
      q: "Is there a credit check?",
      a: "We offer no credit check options for prepaid plans."
    },
  ];

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  message: "",
  });


  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


const validate = () => {
let newErrors = {};


if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
if (!formData.email?.trim()) newErrors.email = "Email is required";
else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) 
  newErrors.email = "Invalid email format";

if (!formData.company?.trim()) newErrors.company = "Company is required";
if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";

return newErrors;
};


const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) => {
e.preventDefault();

const validationErrors = validate();

setErrors(validationErrors);


if (Object.keys(validationErrors).length === 0) {
try {
  setLoading(true);
const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/black-friday-form", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});


if (response.ok) {
setSubmitted(true);
setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" });
// Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
}
} catch (error) {
console.error("Form submission error:", error);
}finally {
      setLoading(false);
    }
}
};
// Set your target date here
  // const targetDate = new Date("December 1, 2025 23:59:00").getTime();

  // const [timeLeft, setTimeLeft] = useState({
  //   days: "00",
  //   hours: "00",
  //   minutes: "00",
  //   seconds: "00",
  // });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const now = new Date().getTime();
  //     const diff = targetDate - now;

  //     if (diff <= 0) {
  //       clearInterval(timer);
  //       setTimeLeft({
  //         days: "00",
  //         hours: "00",
  //         minutes: "00",
  //         seconds: "00",
  //       });
  //       return;
  //     }

  //     setTimeLeft({
  //       days: Math.floor(diff / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((diff / (1000 * 60)) % 60),
  //       seconds: Math.floor((diff / 1000) % 60),
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);
  return (
    
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
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
              <Button variant="light" size="lg"  href="/byod-plans">
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
  <div>
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
      
   <Container className="py-5">
      <Row className="text-center gy-4">
        
        <Col md={3}>
          <FaSitemap size={40} color="#e50053" />
          <h5 className="fw-bold mt-3">
            Nationwide Tier-1 5G & LTE coverage
          </h5>
        </Col>

        <Col md={3}>
          <FaShieldAlt size={40} color="#e50053" />
          <h5 className="fw-bold mt-3">
            Exclusive Black Friday<br />accessory + protection bundles
          </h5>
        </Col>

        <Col md={3}>
          <MdOutlineSimCard   size={40} color="#e50053" />
          <h5 className="fw-bold mt-3">
            Flexible prepaid and<br />postpaid plans
          </h5>
        </Col>

        <Col md={3}>
          <FaQrcode size={40} color="#e50053" />
          <h5 className="fw-bold mt-3">
            Sustainable telecom — paperless billing, recyclable SIM packaging
          </h5>
        </Col>

      </Row>
    </Container>
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
    <Container fluid className="blkFrdExOff">
      <h2 className="text-center mb-5 fw-bold">
        Black Friday Exclusive Offers
      </h2>

      <Row className="g-4 mx-5">
        <Col md={3}>
          <Card className="text-center p-4 shadow-sm h-100">
            <div className="text-center">
            <FaPercentage size={40} color="#E61E5D" className="mb-3" />
            </div>
            <h5 className="fw-bold">Up to 60% Off Mobile + SIM Bundles</h5>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-4 shadow-sm h-100">
            <div className="text-center">
            <FaSimCard size={40} color="#E61E5D" className="mb-3" />
            </div>
            <h5 className="fw-bold">Free SIM Activation on select plans</h5>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-4 shadow-sm h-100">
            <div className="text-center">
            <FaPaw size={40} color="#E61E5D" className="mb-3" />
            </div>
            <h5 className="fw-bold">
              Every Purchase Supports Animal Rescue (ZARN)
            </h5>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-4 shadow-sm h-100">
            <div className="text-center">
            <FaShieldAlt size={40} color="#E61E5D" className="mb-3" />
            </div>
            <h5 className="fw-bold">
              Up to 40% Off ZoikoCare™ Device Protection
            </h5>
          </Card>
        </Col>
      </Row>
    </Container>
      {/* <Container fluid className="blackFridayCountdown">
        <Row className="align-items-center text-white">
          <Col md="4" className="d-flex blackFridayCountdownText1">
            <span className="blackFridayFire">🔥</span>
            <span>
              BLACK FRIDAY DEALS END IN :
            </span>
          </Col> */}

          {/* Dynamic Counter */}
          {/* <Col md="4 blackFridayCountdownText2 ">
            <div className="d-flex gap-3 justify-content-center">
              <div className="count-box">
                <span className="count-num">{timeLeft.days}</span>
                <span className="count-label">DAYS</span>
              </div>
              <div className="count-box">
                <span className="count-num">{timeLeft.hours}</span>
                <span className="count-label">HRS</span>
              </div>
              <div className="count-box">
                <span className="count-num">{timeLeft.minutes}</span>
                <span className="count-label">MIN</span>
              </div>
              <div className="count-box">
                <span className="count-num">{timeLeft.seconds}</span>
                <span className="count-label">SEC</span>
              </div>
            </div>
          </Col> */}

          {/* <Col md="4" className="d-flex blackFridayCountdownText3">
            <span>Ends: 1st December 2025, 11:59 PM</span>
          </Col>
        </Row>
      </Container> */}
       <CarouselPlans />
       
    <Container className="py-5" style={{ background: "#f0fff7" }}>
      <Row className="align-items-center">
        
        {/* LEFT IMAGE */}
        <Col md={6} className="deviceProtectionCol1">
          <img
            src="/img/DeviceProtection.png"
            alt="Device Protection"
            className="img-fluid rounded"
          />
        </Col>

        {/* RIGHT CONTENT */}
        <Col md={6} className="deviceProtectionCol2">
          <h2 className="fw-bold mb-2">ZoikoCare™ Device Protection</h2>
          <p className="text-muted">
            Complete coverage for your mobile device
          </p>

          <ul className="list-unstyled fs-5 mt-4">
            <li className="mb-2"><FaCheck className="text-danger me-2" /> Theft & loss protection</li>
            <li className="mb-2"><FaCheck className="text-danger me-2" /> Accidental damage coverage</li>
            <li className="mb-2"><FaCheck className="text-danger me-2" /> Screen crack repair</li>
            <li className="mb-2"><FaCheck className="text-danger me-2" /> Next-day replacement</li>
            <li className="mb-2"><FaCheck className="text-danger me-2" /> 24/7 claim support</li>
          </ul>

          <div className="d-flex align-items-center mt-4 blkFrdSale">
            <span className="text-decoration-line-through me-3 fs-5">$12/mo</span>
            <span className="fw-bold text-danger fs-3">$7/mo</span>
            <span className="ms-2 text-muted">(40% off Black Friday)</span>
          </div>

          <Button
            variant="outline-danger"
            size="lg"
            className="mt-4 px-5 py-2" href="/device-protection"
          >
            Add Protection
          </Button>
        </Col>

      </Row>
    </Container>
    
      <Container className="my-2"  style={{ backgroundColor: "#E81F64", color: "white", padding: "60px 0" }}>
        <h1 className="text-center mb-4 fw-bold">
          Every Plan Supports Animal Rescue
        </h1>
        <p className="text-center mb-5" style={{ maxWidth: 900, margin: "0 auto", fontSize:"1.5vw" }}>
          A portion of every Zoiko Mobile plan goes directly to the Zoiko Animal
          Rescue Network (ZARN), helping protect and care for animals across the
          United States.
        </p>

        <Row className="text-center ">
          <Col md={4} className="mb-4 supportAnimal">
            <h1 className="fw-bold">12,000+</h1>
            <p className="mb-0">Animals helped</p>
          </Col>

          <Col md={4} className="mb-4 supportAnimal">
            <h1 className="fw-bold">45+</h1>
            <p className="mb-0">Partner shelters</p>
          </Col>

          <Col md={4} className="mb-4 supportAnimal">
            <h1 className="fw-bold">$2M+</h1>
            <p className="mb-0">Donated</p>
          </Col>
        </Row>
      </Container>
      <Container className="text-center my-5 py-5">
        <h2 className="mb-5 fw-bold">
          Why Choose Zoiko Mobile This Black Friday
        </h2>

        <Row className="g-5">

          {/* 1. Nationwide Coverage */}
          <Col md={4}>
            <FaSignal size={50} color="#E63963" className="mb-3" />
            <h4 className="fw-semibold">Nationwide Tier-1 Coverage</h4>
            <p className="text-muted">Fast and reliable</p>
          </Col>

          {/* 2. Purpose-Driven Connectivity */}
          <Col md={4}>
            <FaHeart size={50} color="#E63963" className="mb-3" />
            <h4 className="fw-semibold">Purpose-Driven Connectivity</h4>
            <p className="text-muted">Every plan helps protect animals</p>
          </Col>

          {/* 3. Instant Activation */}
          <Col md={4}>
            <FaBolt size={50} color="#E63963" className="mb-3" />
            <h4 className="fw-semibold">Instant Digital Activation</h4>
            <p className="text-muted">SIM and eSIM ready in minutes</p>
          </Col>

          {/* 4. Flexible Plans */}
          <Col md={4}>
            <FaShieldAlt size={50} color="#E63963" className="mb-3" />
            <h4 className="fw-semibold">Flexible Plans</h4>
            <p className="text-muted">
              Prepaid, postpaid, family, and multi-device options.
            </p>
          </Col>

          {/* 5. Holiday Bundles */}
          <Col md={4}>
            <FaGift size={50} color="#E63963" className="mb-3" />
            <h4 className="fw-semibold">Holiday Bundles</h4>
            <p className="text-muted">
              Accessories + protection + bonus data
            </p>
          </Col>

          {/* 6. Eco-Friendly */}
          <Col md={4}>
            <FaLeaf size={50} color="#E63963" className="mb-3" />
            <h4 className="fw-semibold">Eco-Friendly</h4>
            <p className="text-muted">
              Recyclable SIM packaging and paperless billing
            </p>
          </Col>

        </Row>
      </Container>
 

{/* 
    
<Container fluid className="py-5 blackFridayContactArea">
  <Row className="align-items-center">
    <Col md={6} className="px-5">
    <div className="blackFridayContactContent">
<h2 className="fw-bold mb-3">Need Help ?</h2>
<p className="text-muted mb-4">
Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
</p>


<div className="d-flex align-items-center mb-3">
<span className="me-2"><img src="./img/icons/noun_Phone_3612570 1.svg"></img></span>
<span className="fw-semibold">800 988 8116</span>
</div>
<div className="d-flex align-items-center">
<span className="me-2"><img src="./img/icons/mail.svg"></img></span>
<span className="fw-semibold"><a href="mailto:support@zoikomobile.com" style={{ color : "black !important",textDecoration:"none !important"}}>support@zoikomobile.com</a> </span>
</div>
</div>
</Col> */}
<style>{`
@media (max-width: 991.98px) {
.faq-card {
height: auto !important
}
}
.blackFridayContactForm {
    box-shadow: 3px 4px 19px 14px rgba(0, 0, 0, 0.1) !important;
    border-radius: 15px !important;
    padding: 2rem !important;
        width: 40vw;
}
        .blackFridayContactContent{
        width: 25vw;
        float: inline-end;
        }

.form-control{
    height: 50px;
    background: #fafafa;
}
    

.form-control:focus,
.form-select:focus {
  border-color: #dc3545 !important; /* Red border */
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important; /* Red glow */
  outline: none !important;
}


.form-label {
  font-weight: 500;
  color: #222;
}

/* Placeholder color */
.form-control::placeholder {
  color: #999 !important;
}
.blackFridayLowerBox{
    width: 60vw;
    // height: 30vw;
    display: inline-grid;
    justify-content: start;
    align-content: space-evenly;
}
.blackFridayLowerBox li{
margin-bottom: 2vw;}
.blackFridayLowerBoxBtn a{
    border-radius: 30px;
    padding: 10px 30px;
    float: left;
    background-color:#df1e5a;
    border:1px solid red;
    }
    .blackFridayLowerBoxBtn a:hover, .blackFridayLowerBoxBtn a:active, .blackFridayLowerBoxBtn a:focus{
    background-color:#dc3545 !important;
    }
    .form-loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
}
.faq-card {
  border-radius: 20px;
  background: #ffffff;
      height: 12vw;
  border-left: 4px solid #e63946; /* Red left border like screenshot */
}
`}</style>
    {/* <Col md={6}>
      <div style={{ position: "relative" }}>

  {loading && (
    <div className="form-loading-overlay">
      <div className="spinner-border" role="status"></div>
    </div>
  )}
        <Form onSubmit={handleSubmit}  className="blackFridayContactForm m-4">
          
<div className="nameGroup d-flex">
          <Form.Group className="mb-3 col-6">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 col-6">
            <Form.Label>Last Name*</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
</div>
          <Form.Group className="mb-3">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company*</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              isInvalid={!!errors.company}
            />
            <Form.Control.Feedback type="invalid">
              {errors.company}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number*</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 p-2"
            style={{ backgroundColor: "#e71d5a", border: "none" }}
          >
            Send Message
          </Button>
          {submitted && (
  <Alert variant="success" className="mt-3 fade-out">
    Your message has been sent successfully!
  </Alert>
  
)}
        </Form>
      </div>
    </Col>
  </Row>
</Container> */}

 <Testimonials/> 
<Container className="py-5">
      <h2 className="text-center mb-5 fw-bold">Frequently Asked Questions</h2>

      <Row className="g-4">
        {faqData.map((item, index) => (
          <Col md={6} key={index}>
            <Card className="p-4 shadow-sm faq-card">
              <div className="d-flex align-items-start gap-3">
                <QuestionCircleFill className="text-danger fs-3" />
                <div>
                  <h5 className="fw-bold">{item.q}</h5>
                  <p className="mt-2 mb-0 text-secondary">{item.a}</p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
      <Footer />
    </>
  );
};


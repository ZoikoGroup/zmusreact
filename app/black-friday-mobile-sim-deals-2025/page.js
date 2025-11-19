"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Alert, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import CarouselPlans from "../components/BlackFridayCarouselPlans";
import Testimonials from "../components/Testimonials";
export default function blackFridaySpecialPage(){
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
  // alert('ok');
const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/black-friday-form", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});


if (response.ok) {
setSubmitted(true);
setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" });
}
} catch (error) {
console.error("Form submission error:", error);
}
}
};
// Set your target date here
  const targetDate = new Date("December 1, 2025 23:59:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />

      <Container fluid className="blackFridayBanner" >
        <Row className="align-items-center">
          {/* LEFT TEXT */}
          <Col md={6} className="blackFridayBannerContent">
            <h1 className="fw-bold mb-4">
              Connect, Care, and Make a Difference - The Animal & Music Loving Network
            </h1>

            <p>
              Every plan supports animal welfare and young musicians while
              keeping you connected nationwide.
            </p>

            <div className="d-flex gap-4 bannerBtns">
              <Button variant="dark" size="lg" href="/byod-plans">
                Get Your SIM Today
              </Button>
              <Button variant="light" size="lg"  href="/all-plans">
                View Plans
              </Button>
            </div>
          </Col>

          {/* RIGHT IMAGES */}
          <Col
            md={6}
            className="d-flex justify-content-center gap-4 mt-5 mt-md-0"
          >
            <div>
              <img
                src="/img/frames.png"
                alt="Sample Pet 1"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              
            </div>


          </Col>
        </Row>
      </Container>
      
   
      <Container fluid className="blackFridayCountdown">
        <Row className="align-items-center text-white">
          <Col md="4" className="d-flex blackFridayCountdownText1">
            <span className="blackFridayFire">🔥</span>
            <span>
              BLACK FRIDAY DEALS END IN :
            </span>
          </Col>

          {/* Dynamic Counter */}
          <Col md="4 blackFridayCountdownText2 ">
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
          </Col>

          <Col md="4" className="d-flex blackFridayCountdownText3">
            <span>Ends: 1st December 2025, 11:59 PM</span>
          </Col>
        </Row>
      </Container>
 <Container
      fluid
      className="my-5 d-flex justify-content-center background-white"
      style={{ padding: "0 20px" }}
    >
      <div
        className="p-5 text-center"
        style={{
          background: "linear-gradient(135deg, #ffe6ed, #fde6f1)",
          borderRadius: "20px",
          border: "3px solid #ff2c75",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <h2 className="fw-bold mb-3">
          🎁 Black Friday Special
        </h2>

        <p className="fs-5 mb-2">
          Purchase any device + 3 months Protection Plan =  
          <strong> FREE Accessory Kit</strong> (Value $50)
        </p>

        <p className="mb-4">
          Includes: Premium case, screen protector, charging cable & car charger
        </p>

        <Row className="justify-content-center g-3">
          <Col xs="auto">
            <Button variant="light" className="px-4 py-2" style={{ borderRadius: "30px" }} href="/all-plans">
              View Plans
            </Button>
          </Col>

          <Col xs="auto">
            <Button
              variant="danger"
              className="px-4 py-2"
              style={{ borderRadius: "30px" }}
              href="https://phones.zoikomobile.com/"
            >
              View Smartphone Devices
            </Button>
          </Col>
        </Row>
      </div>
    </Container>

    <CarouselPlans /> 

<Container className="text-center my-5 py-5">
      <h2 className="fw-bold mb-5">Why Choose Zoiko Mobile?</h2>

      <Row className="g-5 justify-content-center">

        {/* Item 1 */}
        <Col xs={12} md={6} lg={4}>
          <div className="feature-item">
            <div className="icon-circle">
              <img src="/img/blkfriicon1.png" alt="phone" width="30" />
            </div>
            <h5 className="fw-bold mt-3">Prepaid and Postpaid Flexibility</h5>
            <p>
              Switch plans easily without commitment.<br/>
              Choose prepaid for control or postpaid for convenience.
            </p>
          </div>
        </Col>

        {/* Item 2 */}
        <Col xs={12} md={6} lg={4}>
          <div className="feature-item">
            <div className="icon-circle">
              <img src="/img/blkfriicon2.png" alt="world" width="30" />
            </div>
            <h5 className="fw-bold mt-3">Global Connectivity Network</h5>
            <p>
              Stay connected worldwide with free international<br/>
              calling and roaming options. Reliable global service.
            </p>
          </div>
        </Col>

        {/* Item 3 */}
        <Col xs={12} md={6} lg={4}>
          <div className="feature-item">
            <div className="icon-circle">
              <img src="/img/blkfriicon3.png" alt="animal rescue" width="30" />
            </div>
            <h5 className="fw-bold mt-3">Sustainability and Animal Rescue</h5>
            <p>
              Every plan contributes to animal rescue organizations.<br/>
              Your connectivity helps save lives.
            </p>
          </div>
        </Col>

        {/* Item 4 */}
        <Col xs={12} md={6} lg={4}>
          <div className="feature-item">
            <div className="icon-circle">
              <img src="/img/blkfriicon4.png" alt="AI tools" width="30" />
            </div>
            <h5 className="fw-bold mt-3">AI-Powered Tools</h5>
            <p>
              Smart features that optimize your experience.<br/>
              AI-driven network management.
            </p>
          </div>
        </Col>

        {/* Item 5 */}
        <Col xs={12} md={6} lg={4}>
          <div className="feature-item">
            <div className="icon-circle">
              <img src="/img/blkfriicon5.png" alt="compliance" width="30" />
            </div>
            <h5 className="fw-bold mt-3">Regulatory Compliance Assured</h5>
            <p>
              Fully licensed and compliant with all regulations.<br/>
              Your data and privacy protected.
            </p>
          </div>
        </Col>

        {/* Item 6 */}
        <Col xs={12} md={6} lg={4}>
          <div className="feature-item">
            <div className="icon-circle">
              <img src="/img/blkfriicon6.png" alt="support" width="30" />
            </div>
            <h5 className="fw-bold mt-3">Customer Centric Support</h5>
            <p>
              24/7 support from real people who care.<br/>
              Quick resolution and personalized assistance.
            </p>
          </div>
        </Col>

    </Row>
  </Container>
<Container fluid className="py-5 blackFridayContactArea">
  <Row className="align-items-center">
    <Col md={6} className="px-5">
    <div className="blackFridayContactContent">
<h2 className="fw-bold mb-3">Need Help ?</h2>
<p className="text-muted mb-4">
Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly.
</p>


<div className="d-flex align-items-center mb-3">
<span className="me-2"><img src="./img/icons/noun_Phone_3612570 1.svg"></img></span>
<span className="fw-semibold">800 988 8116</span>
</div>
<div className="d-flex align-items-center">
<span className="me-2"><img src="./img/icons/mail.svg"></img></span>
<span className="fw-semibold">Support@zoikocommunication.com</span>
</div>
</div>
</Col>
<style>{`

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
`}</style>
    <Col md={6}>
      
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
        </Form>
      
    </Col>
  </Row>
</Container>
 <Testimonials/> 
<div style={{ backgroundColor: "#ffe0eb", padding: "60px 0" }}>
<Container className="text-center">
<h1 className="fw-bold">Your Plan Helps Fund Animal Rescues 🐾</h1>
<p className="mt-3">Every Zoiko Mobile customer directly contributes to saving animal lives</p>


<Row className="mt-5">
<Col md={4} className="mb-4">
<h2 className="text-danger fw-bold">$250K+</h2>
<p>Donated to Animal Shelters</p>
</Col>


<Col md={4} className="mb-4">
<h2 className="text-danger fw-bold">5,000+</h2>
<p>Animals Rescued</p>
</Col>


<Col md={4} className="mb-4">
<h2 className="text-danger fw-bold">50+</h2>
<p>Partner Shelters</p>
</Col>
</Row>


<Card className="p-4 mt-6 shadow-sm blackFridayLowerBox" style={{ borderRadius: "20px" }}>
<h4 className="fw-bold mb-4 text-start">How Your Subscription Makes a Difference:</h4>
<ul className="text-start" style={{ listStyle: "none", paddingLeft: 0 }}>
<li>💵 $1 from every plan goes directly to animal rescue organizations</li>
<li className="mt-2">🏥 Funds medical care, food, and shelter for rescued animals</li>
<li className="mt-2">❤️ Supports adoption programs and foster networks</li>
<li className="mt-2">🌟 100% transparent donation tracking available</li>
</ul>


<div className="blackFridayLowerBoxBtn">
<Button  size="lg" href="/animal-charities">
Learn More About Our Mission
</Button>
</div>
</Card>
</Container>
</div>
      <Footer />
    </>
  );
};


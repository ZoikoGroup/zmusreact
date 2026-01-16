"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Col, Container, Image, Row, Form, InputGroup, Button } from "react-bootstrap";
import WhatsAppFloating from "./WhatsApp";
const Footer = () => {
    const curyear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubscribe = async () => {
        if (!email) {
            setMessage("⚠️ Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("✅ Subscription successful! Thank you for subscribing.");
                setEmail("");
            } else {
                setMessage(data.message || "❌ Subscription failed. Please try again.");
            }
        } catch (error) {
            setMessage("⚠️ Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <WhatsAppFloating/>
        <Container fluid className="footerboxlarge">
            <Container className="py-5">
                <Row>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">About Us</p>
                        <ul>
                            <li><Link href={"/about"}>Our Story</Link></li>
                            <li><Link href={"/news"}>Press &amp; Media</Link></li>
                            <li><Link href={"/blog"}>Blogs</Link></li>
                            <li><Link href={"/sustainability"}>Sustainability</Link></li>
                            <li><Link href={"/animal-charities"}>Animal Charities</Link></li>
                            <li><Link href={"/music-hub"}>Zoiko Music Hub</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">Shop</p>
                        <ul>
                            <li><Link href={"/all-plans"}>Mobile Plans</Link></li>
                            <li><Link href={"/byod-plans"}>BYOD</Link></li>
                            <li><Link href={"https://phones.zoikomobile.com"} target="_blank">New Smart Phones</Link></li>
                            <li><Link href={"/accessories"}>Accessories</Link></li>
                            {/* <li><Link href={"#"}>Tablets</Link></li> */}
                            <li><Link href={"/product-category/refurbished"}>Refurbished Smartphones</Link></li>
                            <li><Link href={"/offer-page"}>Special Offers</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">Help &amp; Support</p>
                        <ul>
                            <li><Link href={"/customer-service"}>Customer Service</Link></li>
                            <li><Link href={"/faq"}>FAQs</Link></li>
                            <li><Link href={"https://mvnoc.ai/coverage-map"} target="_blank">Coverage Map</Link></li>
                            <li><Link href={"/network-service"}>Network &amp; Service</Link></li>
                            <li><Link href={"/device-protection"}>Device Protection</Link></li>
                            <li><Link href={"/return-policy"}>Return &amp; Warranty Policy</Link></li>
                            <li><Link href={"/contact-us"}>Contact Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">Zoiko Legal</p>
                        <ul>
                            <li><Link href={"/terms-and-conditions"}>Terms &amp; Conditions</Link></li>
                            <li><Link href={"/privacy-policy"}>Privacy Policy</Link></li>
                            <li><Link href={"/cookie-policy"}>Cookies Policy</Link></li>
                            <li><Link href={"/intellectual-property-notice"}>Intellectual Property</Link></li>
                            <li><Link href={"/consumer-information"}>Consumer Information</Link></li>
                            <li><Link href={"/regularity-information"}>Regulatory Information</Link></li>
                            <li><Link href={"/california-consumer-privacy-act"}>California Consumer Privacy Act (CCPA)</Link>
                                <ul>
                                    <li><Link href={"/do-not-sell-my-personal-information"}>Do Not Sell My Personal Information </Link></li>
                                    <li><Link href={"/california-consumer-privacy-act"}>CCPA Privacy Notice</Link></li>
                                    <li><Link href={"/911-e911-disclosure"}>911 &amp; E911 Disclosure </Link></li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
                
            </Container>
            </Container>

            <Container fluid className="footerbox">
    <Container className="py-5 footerbox">

        {/* TOP SECTION */}
        <Row className="mb-4">
            <Col md={6} sm={12}>
                <h4 className="fw-bold mb-3">Latest News & Offers</h4>
                <p>Receive the latest offers, updates, and unlock amazing savings on Zoiko Mobile plans and devices.</p>

                <InputGroup className="mb-2">
                    <Form.Control
                        placeholder="Enter your email address"
                        aria-label="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        variant="danger"
                        size="lg"
                        disabled={loading}
                        onClick={handleSubscribe}
                    >
                        {loading ? "Subscribing..." : "Subscribe"}
                    </Button>
                </InputGroup>

                <div style={{ minHeight: "24px", marginBottom: "8px" }}>
                    {message && (
                        <p
                            style={{
                                color:
                                    message.includes("successful") || message.includes("✅")
                                        ? "#28a745"
                                        : "#ff4444",
                                fontSize: "14px",
                                margin: 0,
                            }}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </Col>

            {/* RIGHT TOP - SOCIAL LINKS */}
            <Col md={6} sm={12} className="text-md-center mt-4 mt-md-0">
    <h4 className="fw-bold mb-3">Connect with us</h4>

    <div className="social-wrapper">

        <Link href="https://www.facebook.com/zoikomobileusa" target="_blank" className="socialicon">
            <i className="bi bi-facebook"></i>
        </Link>

        {/* <Link href="https://x.com/zoikomobileusa" target="_blank" className="socialicon">
            <i className="bi bi-twitter-x"></i>
        </Link> */}

        <Link href="https://instagram.com/zoikomobileus" target="_blank" className="socialicon">
            <i className="bi bi-instagram"></i>
        </Link>

        <Link href="https://www.linkedin.com/company/zoikomobileusa/" target="_blank" className="socialicon">
            <i className="bi bi-linkedin"></i>
        </Link>

        <Link href="https://www.youtube.com/@ZoikoMobileUSA" target="_blank" className="socialicon">
            <i className="bi bi-youtube"></i>
        </Link>

    </div>
</Col>


        </Row>

        <hr />

        {/* OFFICES SECTION (3 Columns × 2 Rows) */}
        <Row className="mt-4 office-row">
            <Col md={4} sm={12} className="mb-4">
                <h6 className="fw-bold">Head Office (Austin, TX)</h6>
                <p className="mb-1">5900 Balcones Drive, #24685<br />Austin, TX 78731</p>
                <p className="mb-1">📞 800-988-8116</p>
                <p>✉ info@zoikomobile.com</p>

                <div className="mt-4">
                    <h6 className="fw-bold">Washington DC Office</h6>
                    <p className="mb-1">1717 N Street NW, Suite 1<br />Washington, DC 20036</p>
                    <p className="mb-1">📞 800-988-8116</p>
                    <p>✉ info@zoikomobile.com</p>
                </div>
            </Col>

            <Col md={4} sm={12} className="mb-4">
                <h6 className="fw-bold">California Office (Sacramento, CA)</h6>
                <p className="mb-1">1401 21st Street, Suite R<br />Sacramento, CA 95811</p>
                <p className="mb-1">📞 800-988-8116</p>
                <p>✉ info@zoikomobile.com</p>

                <div className="mt-4">
                    <h6 className="fw-bold">Illinois Office (Springfield, IL)</h6>
                    <p className="mb-1">2501 Chatham Rd, Suite R<br />Springfield, IL 62704</p>
                    <p className="mb-1">📞 847-728-6872</p>
                    <p>✉ info@zoikomobile.com</p>
                </div>
            </Col>

            <Col md={4} sm={12} className="mb-4">
                <h6 className="fw-bold">Delaware Office (Dover, DE)</h6>
                <p className="mb-1">8 The Green, Suite A<br />Dover, DE 19901</p>
                <p className="mb-1">📞 302-899-7312</p>
                <p>✉ info@zoikomobile.com</p>

                <div className="mt-4">
                    <h6 className="fw-bold">Florida Office (Orlando, FL)</h6>
                    <p className="mb-1">12386 State Road 535, #302<br />Orlando, FL 32836</p>
                    <p className="mb-1">📞 800-988-8116</p>
                    <p>✉ info@zoikomobile.com</p>
                </div>
            </Col>
        </Row>
<style>{`
@media (max-width: 768px) {
    .footer-linkss a:not(:last-child)::after{
        margin-left: unset !important;    
    }
}
    `}
</style>
        {/* Partner Links */}
        <Row className="text-center mt-5 footer-linkss">
            <Col className="text-center">
                <Link href="/become-retailer" className="text-decoration-none mx-3">Become a Retailer</Link>
                <Link href="/become-affiliate" className="text-decoration-none mx-3">Become an Affiliate</Link>
                <Link href="/become-partner" className="text-decoration-none mx-3">Partner with Us</Link>
            </Col>
        </Row>

    </Container>
</Container>

{/* Copyright */}
<Container fluid className="cpoyrightbox">
    <Container className="py-3 text-center">
        © {curyear} Zoiko Mobile | A trading name of Zoiko Mobile Inc.  
        Headquartered at 5900 Balcones Drive, Suite 100, Austin, TX 78731.  
        All Rights Reserved.
    </Container>
</Container>

        </>
    );
};

export default Footer;

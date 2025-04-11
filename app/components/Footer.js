"use client"
import Link from "next/link";
import { Col, Container, Image, Row,  Form, InputGroup, Button } from "react-bootstrap";

const Footer = () => {
    const curyear = new Date().getFullYear();
    return (
        <>
        <Container fluid className="footerboxlarge">
            <Container className="py-5">
                <Row>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">About Us</p>
                        <ul>
                            <li><Link href={"#"}>Our Story</Link></li>
                            <li><Link href={"#"}>Press &amp; Media</Link></li>
                            <li><Link href={"#"}>Blogs</Link></li>
                            <li><Link href={"#"}>Sustainablity</Link></li>
                            <li><Link href={"#"}>Animal Charities</Link></li>
                            <li><Link href={"#"}>Zoiko Music Hub</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">Shop</p>
                        <ul>
                            <li><Link href={"#"}>Mobile Plans</Link></li>
                            <li><Link href={"#"}>BYOD</Link></li>
                            <li><Link href={"#"}>New Smart Phones</Link></li>
                            <li><Link href={"#"}>Accessories</Link></li>
                            <li><Link href={"#"}>Tablets</Link></li>
                            <li><Link href={"#"}>Refurbished Smartphones</Link></li>
                            <li><Link href={"#"}>Special Offers</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} sm={12} xs={12}>
                        <p className="txtred">Help &amp; Support</p>
                        <ul>
                            <li><Link href={"/customer-service"}>Customer Service</Link></li>
                            <li><Link href={"/faqs"}>FAQs</Link></li>
                            <li><Link href={"https://mvnoc.ai/coverage-map"} target="_blank">Coverage Map</Link></li>
                            <li><Link href={"#"}>Network &amp; Service</Link></li>
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
                            <li><Link href={"#"}>Regulatory Information</Link></li>
                            <li><Link href={"#"}>California Consumer Privacy Act (CCPA)</Link>
                                <ul>
                                    <li><Link href={"#"}>Do Not Sell My Personal Information </Link></li>
                                    <li><Link href={"#"}>CCPA Privacy Notice</Link></li>
                                    <li><Link href={"#"}>911 &amp; E911 Disclosure </Link></li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} sm={12} xs={12}>
                        <Image src="/img/footer-logo.webp" fluid className="w-75" alt="Footer Logo" />
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <p className="txtred">Partner Programs</p>
                        <ul>
                            <li><Link href={"#"}>Affiliate Program</Link></li>
                            <li><Link href={"#"}>Wholesale</Link></li>
                            <li><Link href={"#"}>Partner With Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={5} sm={12} xs={12}>
                        <p className="txtred">Latest News &amp; Offers</p>
                        <p>Receive the latest offers, updates, and unlock amazing savings on Zoiko Mobile plans and devices.</p>
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="Enter your email address" aria-label="Enter your email address" aria-describedby="basic-addon2" />
                            <Button variant="danger" size="lg" id="button-addon2">Subscribe</Button>
                        </InputGroup>
                        <Link href={'https://www.facebook.com/zoikomobileusa'} target="_blank"><i className="bi bi-facebook"></i></Link>
                        <Link href={'https://instagram.com/zoikomobileus'} target="_blank" className="px-3"><i className="bi bi-instagram"></i></Link>
                        <Link href={'https://uk.pinterest.com/zoikomobileusa/'} target="_blank"><i className="bi bi-pinterest"></i></Link>
                        <Link href={'https://x.com/zoikomobileusa'} target="_blank" className="px-3"><i className="bi bi-twitter-x"></i></Link>
                        <Link href={'https://www.linkedin.com/company/zoikomobileusa/'} target="_blank"><i className="bi bi-linkedin"></i></Link>
                        <Link href={'https://www.threads.net/@zoikomobileus'} target="_blank" className="px-3"><i className="bi bi-threads"></i></Link>
                        <Link href={'https://www.youtube.com/@ZoikoMobileUSA'} target="_blank"><i className="bi bi-youtube"></i></Link>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="bgred mb-5 pt-3">
            <Container className="mt-5 px-5 pt-5 footerbox">
                <Row>
                    <Col md={4} sm={12} xs={12}>
                        <p><b>Head Office</b><br />5900 Balcones Drive, Suite 100 Austin,<br />TX 78731<br />Phone: 800-988-8116<br />Email: <Link href="mailto:info@zoikomobile.com">info@zoikomobile.com</Link></p>
                        <p className="mt-4"><b>Washington DC Office</b><br />1717 N Street NW, Suite 1 Washington,<br />DC 20036<br />Phone: 800-988-8116<br />Email: <Link href={"mailto:info@zoikomobile.com"}>info@zoikomobile.com</Link></p>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <p><b>California Office</b><br />1401 21st Street, Suite R Sacramento,<br />CA 95811<br />Phone: 800-988-8116<br />Email: <Link href={"mailto:info@zoikomobile.com"}>info@zoikomobile.com</Link></p>
                        <p className="mt-4"><b>Illinois Office</b><br />2501 Chatham Rd, Suite R Springfield,<br />IL 62704<br />Phone: 847-728-6872<br />Email: <Link href={"mailto:info@zoikomobile.com"}>info@zoikomobile.com</Link></p>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <p><b>Delaware Office</b><br />8 The Green, Suite A Dover,<br />DE 19901<br />Phone: 302-899-7312<br />Email: <Link href={"mailto:info@zoikomobile.com"}>info@zoikomobile.com</Link></p>
                        <p className="mt-4"><b>Florida Office</b><br />12386 State Road 535, #302 Orlando,<br />FL 32836<br />Phone: 800-988-8116<br />Email: <Link href={"mailto:info@zoikomobile.com"}>info@zoikomobile.com</Link></p>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="bgred">
            <Container className="py-3 text-center">
                &copy; {curyear} Zoiko Mobile. Zoiko Mobile is a trading name for Zoiko Mobile Inc. Headquartered at 5900 Balcones Drive, Austin, TX 78731. All rights reserved.
            </Container>
        </Container>
        </>
    );
}
export default Footer;
"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Link from "next/link";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

export default function Wholesale() {
    return (
        <>
        <Header />
        <HeadBar text={<>Grow Your Business with a Reliable Nationwide Mobile Network</>} />
        <Container fluid className="p-0 wholesalebg">
            <Container className="d-flex flex-row py-4 gap-4 align-items-center">
                <div className="w-50">
                    <h3 className="txtred">Partner with Zoiko Mobile for Wholesale Opportunities</h3>
                    <p className="body22">Zoiko Mobile offers wholesale opportunities for retailers, distributors, and businesses looking to expand their product offerings and provide their customers with high-quality mobile devices, accessories, and services. Join us as a wholesale partner and benefit from competitive pricing, extensive product selection, and dedicated support.</p>
                    <Button variant="danger" size="lg" href="/contact-us">Register today</Button>
                </div>
                <div className="w-50 justify-content-end d-flex">
                    <Image src="/img/wholesale.webp" fluid alt="Wholesale Banner" className="w-75" />
                </div>
            </Container>
        </Container>
        <Container fluid className="p-0 bglite">
            <h2 className="txtblack text-center py-4">Why Partner with Us</h2>
            <Container className="d-flex flex-row gap-4">
                <div className="w-50">
                    <Image src="/img/icons/wholesale1.png" alt="Partner Benefits" style={{width:'80px'}} />
                    <h4 className="txtred body22 mt-3">Competitive Pricing</h4>
                    <p className="body22">Take advantage of wholesale pricing and competitive discounts on our wide range of mobile devices, accessories, and services.</p>
                </div>
                <div className="w-50">
                    <Image src="/img/icons/wholesale2.png" alt="Partner Benefits" style={{width:'80px'}} />
                    <h4 className="txtred body22 mt-3">Extensive Product Selection</h4>
                    <p className="body22">Access a diverse selection of the latest smartphones, tablets, accessories, and mobile plans to meet the needs of your customers.</p>
                </div>
            </Container>
            <Container className="d-flex flex-row gap-4">
                <div className="w-50">
                    <Image src="/img/icons/wholesale3.png" alt="Partner Benefits" style={{width:'80px'}} />
                    <h4 className="txtred body22 mt-3">Quality Assurance</h4>
                    <p className="body22">Rest assured that all products offered through our wholesale program are of the highest quality and sourced from reputable manufacturers.</p>
                </div>
                <div className="w-50">
                    <Image src="/img/icons/wholesale4.png" alt="Partner Benefits" style={{width:'80px'}} />
                    <h4 className="txtred body22 mt-3">Dedicated Support</h4>
                    <p className="body22">Receive personalized support from our dedicated wholesale team, who are committed to helping you succeed and grow your business.</p>
                </div>
            </Container>
            <h2 className="txtblack text-center pt-5">Who Can Benefit</h2>
            <Container className="d-flex flex-row py-3 justify-content-center gap-4">
                <div className="d-flex flex-row bgpink align-items-center p-4 gap-3">
                    <Image src="/img/icons/pink1.png" alt="Retailers" style={{height:'40%'}} />
                    <p className="body20"><span className="txtred">Retailers</span><br />Expand your product portfolio and attract new customers by offering Zoiko Mobile products and services in your retail stores.</p>
                </div>
                <div className="d-flex flex-row bgpink align-items-center p-4 gap-3">
                    <Image src="/img/icons/pink2.png" alt="Retailers" style={{height:'40%'}} />
                    <p className="body20"><span className="txtred">Distributors</span><br />Increase your product distribution channels and reach a broader market by distributing Zoiko Mobile products to retailers and resellers.</p>
                </div>
                <div className="d-flex flex-row bgpink align-items-center p-4 gap-3">
                    <Image src="/img/icons/pink3.png" alt="Retailers" style={{height:'40%'}} />
                    <p className="body20"><span className="txtred">Businesses</span><br />Enhance your corporate offerings by providing employees with access to exclusive discounts on mobile devices, accessories, and services.</p>
                </div>
            </Container>
            <h2 className="txtblack text-center pt-5">How to Get Started</h2>
            <Container>
                <Image src="/img/wholesale-flow.png" fluid alt="Wholesale Process" className="w-100" />
            </Container>
            <Container className="d-flex flex-row py-5 gap-4 align-items-center">
                <div>
                    <h4 className="txtred">Apply</h4>
                    <p>Complete the wholesale application form on our website to apply for a wholesale account.</p>
                </div>
                <div>
                    <h4 className="txtred">Approval</h4>
                    <p>Our wholesale team will review your application and notify you of your account status.</p>
                </div>
                <div>
                    <h4 className="txtred">Order</h4>
                    <p>Once approved, you can place wholesale orders directly through our online portal or contact our wholesale team for assistance.</p>
                </div>
                <div>
                    <h4 className="txtred">Grow</h4>
                    <p>Expand your product offerings, attract new customers, and grow your business with Zoiko Mobile.</p>
                </div>
            </Container>
            <Container className="py-5">
                <h4 className="txtred">Contact Us</h4>
                <p className="body20">If you&apos;re interested in partnering with Zoiko Mobile for wholesale opportunities or have any questions about our wholesale program, please contact us at <a href="mailto:wholesale@zoikomobile.com">wholesale@zoikomobile.com</a>. Our team is here to assist you and provide you with the support you need.</p>
                <p className="body22">Zoiko Mobile America<br />5900 Balcones Drive, Suite 100, Austin, TX 78731</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
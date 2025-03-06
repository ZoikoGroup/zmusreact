"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Col, Container, Image, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-bootstrap";

const DeviceProtection = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Comprehensive Protection for Every Device" />
        <Container fluid className="deviceprotbanner"></Container>
        <Container fluid className="py-4 bglite">
            <h2 className="text-center py-4">Why Choose Zoiko Mobile Insurance?</h2>
            <Container>
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="protbox">
                        <Image src="/img/icons/damage.png" className="w-50" alt="Damage Protection" />
                        <h4 className="txtred pt-2">Accidental Damage Coverage</h4>
                        <p>Protection against cracked screens, drops, and other mishaps</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/theft.png" className="w-50" alt="Theft Protection" />
                        <h4 className="txtred pt-2">Theft Protection</h4>
                        <p>Comprehensive coverage for stolen devices to keep you connected.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/water-damage.png" className="w-50" alt="Water Damage Protection" />
                        <h4 className="txtred pt-2">Water Damage Protection</h4>
                        <p>Safeguards against spills, submersion, and other liquid-related issues.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/multi-device.png" className="w-50" alt="Multi Device Protection" />
                        <h4 className="txtred pt-2">Multi-Device Coverage</h4>
                        <p>Includes new phones, BYOD, laptops, tablets, and home electronics like smart hubs and headphones</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/pricing.png" className="w-50" alt="Affordable Pricing" />
                        <h4 className="txtred pt-2">Affordable Pricing</h4>
                        <p>Premium protection starting at $9.99/month per device.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/repair.png" className="w-50" alt="Affordable Pricing" />
                        <h4 className="txtred pt-2">Fast Claims and Repairs</h4>
                        <p>Quick resolutions powered by AKKO&apos;s trusted service network.</p>
                    </div>
                </div>
                <Row className="align-items-center py-5">
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/protected.png" fluid alt="Procted" className="w-100" />
                    </Col>
                    <Col  md={8} sm={12} xs={12}>
                        <h2>What&apos;s Protected</h2>
                        <ul className="body22 protectedlist">
                            <li>Cracked Screens</li>
                            <li>Spills &amp; Liquid Submersion</li>
                            <li>Accidental Damage (like Drops)</li>
                            <li>Damage & Malfunctions from Accidental Damage/Drops</li>
                            <li>Mechanical/Electrical Failures of components (for phones)</li>
                            <li>Theft</li>
                            <li>Theft of items from an unattended vehichle via forced entry (car break-ins)</li>
                        </ul>
                    </Col>
                </Row>
                <Image src="/img/plan-features.png" fluid alt="Plan Features" className="w-100 py-4" />
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Accordion className="w-75 mx-auto w-sm-100">
                    <AccordionItem eventKey="0">
                        <AccordionHeader>What devices are eligible for coverage?</AccordionHeader>
                        <AccordionBody>Zoiko Mobile Insurance covers smartphones, tablets, laptops, smartwatches, and home electronics like headphones and smart hubs. BYOD devices and newly purchased phones are eligible.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="1">
                        <AccordionHeader>What types of incidents are covered?</AccordionHeader>
                        <AccordionBody>Coverage includes accidental damage (cracked screens, drops), theft, and water damage.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="2">
                        <AccordionHeader>How much does it cost?</AccordionHeader>
                        <AccordionBody>Comprehensive protection starts at $9.99/month per device.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="3">
                        <AccordionHeader>How do I enroll?</AccordionHeader>
                        <AccordionBody>Add protection during checkout or through your Zoiko Mobile account dashboard.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="4">
                        <AccordionHeader>Who powers the insurance?</AccordionHeader>
                        <AccordionBody>Our insurance is powered by AKKO, a trusted leader in device protection services.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="5">
                        <AccordionHeader>How do I file a claim?</AccordionHeader>
                        <AccordionBody>Filing a claim is easy. Visit our claims portal or contact customer support for assistance.</AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default DeviceProtection;
"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import Testimonials from "../components/Testimonials";
import PostalFaqs from "../components/PostalFaqs";

const PostalWorkers = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>U.S. Postal Service Workers</>} />
        <Container fluid className="postalworkers position-relative">
            <div className="position-absolute d-none d-md-block" style={{left:'10%', bottom:'16%'}}>
                <Button variant="danger" size="lg" href="/postal-service-workers-form">Sign Up Today</Button>
            </div>
            <div className="position-absolute d-sm-block d-md-none" style={{left:'5%', bottom:'5%'}}>
                <Button variant="danger" size="sm" href="/postal-service-workers-form">Sign Up Today</Button>
            </div>
        </Container>
        <Container fluid className="py-5 bglite">
            <h2 className="text-center py-4">How to Claim Your Discount</h2>
            <Container>
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">1</div>
                        <div className="px-1">
                            <h4 className="txtred">Choose Your Plan</h4>
                            <p>Browse through our range of affordable BYOD plans and pick the one that fits your needs.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">2</div>
                        <div className="px-1">
                            <h4 className="txtred">Sign Up Using Your Work Email</h4>
                            <p>Create a Zoiko Mobile account using your work email address.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">3</div>
                        <div className="px-1">
                            <h4 className="txtred">Verify Your Status</h4>
                            <p>Provide a valid work ID to confirm your status as a U.S. Postal Service Worker.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">4</div>
                        <div className="px-1">
                            <h4 className="txtred">Nominate Your Family and Friends</h4>
                            <p>Nominate up to 5 family members or friends to get 20% off their BYOD plans too.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">5</div>
                        <div className="px-1">
                            <h4 className="txtred">Enjoy Your Discount</h4>
                            <p>You&apos;ll enjoy 20% off your chosen plan for as long as you stay with Zoiko Mobile, and your nominated family and friends will enjoy the same discount!</p>
                        </div>
                    </div>
                </div>
                <hr className="seperatot" />
                <h3 className="text-center pt-5">Why Choose Zoiko Mobile?</h3>
                <ul className="redbullet body22 pb-5">
                    <li>With BYOD plans, you can enjoy affordable, flexible mobile service without the hassle of paying for a new device. Already have a phone? Keep it and just switch your service—it&apos;s quick and easy.</li>
                    <li>Plus, we offer North America roaming to make staying connected while traveling between the U.S., Canada, and Mexico hassle-free, so you can travel with peace of mind.</li>
                </ul>
                <hr className="seperatot" />
                <Row className="align-items-center px-4 py-5 w-sm-100">
                    <Col md={3} sm={12} xs={12}>
                        <p className="bigblack">Don&apos;t Miss Out</p>
                    </Col>
                    <Col md={9} sm={12} xs={12}>
                        <p className="body22">Take advantage of this special offer and get a fantastic deal on mobile service for you and your loved ones. With Zoiko Mobile, you&apos;ll enjoy reliable coverage, affordable pricing, and the flexibility you need.</p>
                        <Button variant="danger" href="#">Browsw Plans Now</Button>
                    </Col>
                </Row>
                <h2 className="text-center mt-5">Terms and Conditions</h2>
                <hr className="seperator" />
                <ul className="redbullet">
                    <li><b>20% Discount:</b> Applies to any Zoiko Mobile mobile plan for as long as you remain a customer</li>
                    <li><b>Family &amp; Friends Discount:</b> Nominate up to 5 family members or friends to receive a 20% lifetime discount on their BYOD plans.</li>
                    <li><b>Valid Government ID:</b> A valid work ID is required to confirm your U.S. Postal Service Worker status.</li>
                    <li><b>Eligibility:</b> This offer is available to new U.S. Postal Service Worker customers only.</li>
                    <li><b>Fair Usage Policy:</b> Applies to all plans, including unlimited calls &amp; texts and North America roaming.</li>
                    <li><b>5G Coverage:</b> Available in select areas only.</li>
                    <li><b>Wi-Fi Calling:</b> Requires a compatible device and network coverage.</li>
                    <li><b>North America Roaming:</b> Available for use in the U.S., Canada, and Mexico.</li>
                    <li><b>Combination with Other Offers:</b> This offer can be used in conjunction with other promotional offers from Zoiko Mobile.</li>
                </ul>
            </Container>
            <Container className="py-5 w-50">
                <Row className="align-items-center">
                    <Col md={3} sm={12} xs={12}>
                        <Button variant="danger" href="#">Sign up today</Button>
                    </Col>
                    <Col md={9} sm={12} xs={12}>
                        <p>At Zoiko Mobile, we&apos;re proud to support U.S. Postal Service Workers and their families. We look forward to keeping you connected with great service and unbeatable prices.</p>
                    </Col>
                </Row>
            </Container>
        </Container>
        <PostalFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default PostalWorkers;
"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Testimonials from "../components/Testimonials";
import IntlFaqs from "../components/IntlFaqs";
import { Container, Button, Image, InputGroup, Form, Row, Col } from "react-bootstrap";

const InternationalCallings = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Zoiko Mobile International Calling" />
        <Container fluid className="internationalcalls position-relative">
            <div className="position-absolute d-none d-md-block" style={{left:'10%', bottom:'16%'}}>
                <Button variant="danger" size="lg" href="/international-calling-country-list">Discover Calling Options</Button>
            </div>
            <div className="position-absolute d-sm-block d-md-none" style={{left:'5%', bottom:'5%'}}>
                <Button variant="danger" size="sm" href="/international-calling-country-list">Discover Calling Options</Button>
            </div>
        </Container>
        <Container fluid className="bglite py-5">
            <h2 className="text-center pb-5">The Zoiko Advantage: International Calling Made Easy</h2>
            <div className="pinkboxwraper justify-content-center gap-4 px-3 mb-4">
                <div className="px-2 box20 text-center">
                    <Image src="/img/icons/global-calling.png" className="w-50" fluid alt="Global Calling" />
                    <h4 className="txtred">Unlimited Global Calling</h4>
                    <p>Free international calls with all plans - no restrictions.</p>
                </div>
                <div className="px-2 box20 text-center">
                    <Image src="/img/icons/coverage.png" className="w-50" fluid alt="Coverage Countries" />
                    <h4 className="txtred">Coverage in 240+ Countries</h4>
                    <p>Call loved ones and business contacts worldwide.</p>
                </div>
                <div className="px-2 box20 text-center">
                    <Image src="/img/icons/addons.png" className="w-50" fluid alt="Addons" />
                    <h4 className="txtred">Affordable Add-On Bundles</h4>
                    <p>Need more minutes? Add them instantly with just a tap.</p>
                </div>
                <div className="px-2 box20 text-center">
                    <Image src="/img/icons/reliable.png" fluid alt="Reliable" />
                    <h4 className="txtred">Reliable Call Quality</h4>
                    <p>Crystal-clear connections powered by top-tier networks.</p>
                </div>
                <div className="px-2 box20 text-center">
                    <Image src="/img/icons/hidden.png" fluid alt="No Hidden Fees" />
                    <h4 className="txtred">No Hidden Fees</h4>
                    <p>We keep it simple and transparent, always.</p>
                </div>
            </div>
            <hr />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h4>Find the best rates for your destination</h4>
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="Search here" aria-label="Search here" aria-describedby="basic-addon2" />
                            <Button variant="outline-danger" size="lg" id="button-addon2">Search</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <h2 className="text-center pt-5">Three Easy Steps to Get Started</h2>
                <hr />
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">1</div>
                        <div className="px-2">
                            <h4 className="txtred">Select Your Plan:</h4>
                            <p>Choose from our flexible options with international calling included.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">2</div>
                        <div className="px-2">
                            <h4 className="txtred">Activate Your Service</h4>
                            <p>Sign up online or in-store, and start calling within minutes.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">3</div>
                        <div className="px-2">
                            <h4 className="txtred">Make Your First Call</h4>
                            <p>Dial the international access code, country code, and number.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Container>
        <IntlFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}

export default InternationalCallings;
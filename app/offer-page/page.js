"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

export default function OfferPage() {
    return (
        <>
        <Header />
        <HeadBar text={<>Zoiko Mobile Special Deals</>} />
        <Container fluid className="p-0 bglite">
            <Container className="py-5">
                <Row className="gx-5 align-items-center">
                    <Col md={6} className="d-flex flex-column" style={{borderRight:'1px solid black'}}>
                        <Image src="/img/offer-1.png" fluid alt="Special Offer 1" className="mb-3" />
                    </Col>
                    <Col md={3} className="d-flex flex-column body20">
                        <p>Duration of Contract: <span className="txtgreen">24 months</span><br />Bill free Months: <span className="txtgreen">3 months</span><br />Months Elligible: <span className="txtgreen">9th, 10th &amp; 11th month</span></p>
                    </Col>
                    <Col md={3} className="d-flex flex-column body20">
                        <p>Use Code: <span className="txtgreen">ZMOBILE24</span></p>
                        <Button variant="danger" size="lg" href="/all-plans">Buy Now</Button>
                    </Col>
                </Row>
                <Row className="gx-5 align-items-center my-5">
                    <Col md={6} className="d-flex flex-column" style={{borderRight:'1px solid black'}}>
                        <Image src="/img/offer-2.png" fluid alt="Special Offer 1" className="mb-3" />
                    </Col>
                    <Col md={3} className="d-flex flex-column body20">
                        <p>Duration of Contract: <span className="txtgreen">12 months</span><br />Bill free Months: <span className="txtgreen">1 month</span><br />Months Elligible: <span className="txtgreen">4th month</span></p>
                    </Col>
                    <Col md={3} className="d-flex flex-column body20">
                        <p>Use Code: <span className="txtgreen">ZMOBILE12</span></p>
                        <Button variant="danger" size="lg" href="/all-plans">Buy Now</Button>
                    </Col>
                </Row>
                <Row className="gx-5 align-items-center">
                    <Col md={6} className="d-flex flex-column" style={{borderRight:'1px solid black'}}>
                        <Image src="/img/offer-3.png" fluid alt="Special Offer 1" className="mb-3" />
                    </Col>
                    <Col md={3} className="d-flex flex-column body20">
                        <p>Duration of Contract: <span className="txtgreen">30 days</span><br />Bill free Months: <span className="txtgreen">30% discount</span><br />Months Elligible: <span className="txtgreen">1st month</span></p>
                    </Col>
                    <Col md={3} className="d-flex flex-column body20">
                        <p>Use Code: <span className="txtgreen">ZMOBILE30</span></p>
                        <Button variant="danger" size="lg" href="/all-plans">Buy Now</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="py-5 offerbg text-center">
            <Container className="d-flex flex-row gap-5 text-center justify-content-center align-items-center">
                <div className="txtred bigred">Zoiko Upcoming Promos</div>
                <div className="txtred"><span className="midbig">Get ready to snag some cracking deals!</span><br /><span className="txtgreen body22">Stay tuned for exciting new promos heading your way soon.</span></div>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
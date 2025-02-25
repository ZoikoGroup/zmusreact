"use client"
import { Container, Image, Row, Col } from "react-bootstrap";

const TravelPlansBanner = () => {
    return (
        <Container className="py-4">
            <Row className="align-items-center">
                <Col md={6} sm={12} xs={12}>
                    <Image src="/img/travel-plans-banner.webp" className="d-block mx-auto" fluid alt="Business Deals" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <h2 className="txtred">Wherever you go Zoiko Travel Pass becomes a part of you</h2>
                    <p className="body22">Get your affordable travel plans, unlimited prepaid/postpaid eSIM plans, just go along anywhere with super fast 5G data*, talk and text - it&apos;s quick and easy!</p>
                    <p className="body22">$7/line/day in 200+ countries and free international calls.</p>
                </Col>
            </Row>
        </Container>
    );
}
export default TravelPlansBanner;
"use client"
import { Container, Image, Row, Col } from "react-bootstrap";

const BusinessDealsBanner = () => {
    return (
        <Container className="pt-2">
            <Row className="align-items-center">
                <Col md={6} sm={12} xs={12}>
                    <Image src="/img/BusinessDealsBanner.webp" className="d-block mx-auto" fluid alt="Business Deals" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <h2 className="txtred">Affordable Unlimited Business Plans - Starting at Just $35/Month!</h2>
                    <p>Upgrade to a truly unlimited business data plan with free international calls included on all plans. Enjoy up to 30GB of mobile hotspot data, plus the option to add monthly device insurance for extra protection. Stay connected with reliable coverage and flexible business solutions.</p>
                    <p className="txtred body22">Bring Your Own Device (BYOD) or Get a New One Today!</p>
                </Col>
            </Row>
        </Container>
    );
}
export default BusinessDealsBanner;
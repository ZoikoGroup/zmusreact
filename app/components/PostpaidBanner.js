"use client"
import { Container, Image, Row, Col } from "react-bootstrap";

const PostpaidBanner = () => {
    return (
        <Container className="pt-5">
            <Row className="align-items-center">
                <Col md={6} sm={12} xs={12}>
                    <Image src="/img/postpaid-banner.webp" className="d-block mx-auto" fluid alt="Prepaid Plans" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <h2 className="txtred">Explore our postpaid SIM only plans to find value-for-money deals.</h2>
                    <p className="body22"><span><b>Switch to our most popular postpaid plans.</b></span><br />Enjoy great perks with every postpaid SIM only plan, no credit check required.</p>
                    <ul className='check-bullet'>
                        <li>Preloaded talk, text, and high-speed data in the US,Canada, Mexico, and elsewhere</li>
                        <li>Free calls from US to over 200+ countries</li>
                        <li>Fast. Reliable. Encrypted. Mobile Hotspot</li>
                        <li>24/7 free VIP Customer Support</li>
                        <li>Easy Smartphone financing</li>
                    </ul>
                    <p>Superfast 5G network and postpaid SIM only plans (eSIM available) & device. 5G Network coverage covers approximately everywhere.</p>
                </Col>
            </Row>
        </Container>
    );
}
export default PostpaidBanner;
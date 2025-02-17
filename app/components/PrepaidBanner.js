"use client"
import { Container, Image, Row, Col } from "react-bootstrap";

const PrepaidBanner = () => {
    return (
        <Container className="pt-5">
            <Row className="align-items-center">
                <Col className="justify-content-center">
                    <Image src="/img/prepaid-plans.webp" className="d-block mx-auto" fluid alt="Prepaid Plans" />
                </Col>
                <Col>
                    <h2 className="txtred">Zoiko Mobile: Premium Wireless, Ultimate Freedom!</h2>
                    <p className="body22"><span><b>Smarter Prepaid. Faster 5G. Unmatched Value.</b></span><br />Get ultra-fast 5G speeds, nationwide coverage, and affordable prepaid plans - all with no contracts and no hidden fees. Zoiko Mobile offers seamless connectivity on one of the top U.S. networks at a fraction of the cost.</p>
                        <ul className='check-bullet body22'>
                            <li>Nationwide 5G Coverage</li>
                            <li>Unlimited Talk, Text & Data from $13/month</li>
                            <li>No Contracts, No Commitments</li>
                            <li>eSIM or Physical SIM</li>
                            <li>Easy Activation</li>
                        </ul>
                </Col>
            </Row>
        </Container>
    );
}
export default PrepaidBanner;
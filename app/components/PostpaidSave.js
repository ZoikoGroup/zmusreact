"use client"
import { Container, Image, Row, Col } from "react-bootstrap";

const PostpaidSave = () => {
    return (
        <Container className="p-5">
            <Row className="align-items-center">
                <Col md={6} sm={12} xs={12}>
                    <Image src="/img/postpaid-save.webp" className="d-block mx-auto" fluid alt="Postpaid Plans" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <h2 className="txtred">Simply Savings</h2>
                    <ul className='postpaidsave'>
                        <li>Sign up to any cheapest Zoiko postpaid plans and activate your SIM in just a minute.</li>
                        <li>Save $15/MO. on each postpaid SIM only plan.</li>
                        <li>Save up to $25 off/MO. on a family postpaid plan. Buy at least 3.</li>
                        <li>Short on money? Buy a NEW device on a monthly rolling contract plan.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}
export default PostpaidSave;
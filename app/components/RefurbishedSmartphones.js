"use client"
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const RefurbishedSmartphones = () => {
    return (
        <Container className="py-5">
            <Row className="align-items-center">
                <Col md={6} sm={12} xs={12}>
                    <h2>Pick Up A Fantastic Deal On Our Smartphones!</h2>
                    <p className="body22">From Sleek Design to Lightning-Fast Processors, Our Smartphones Have Got It All.</p>
                    <Button variant="danger" size="lg" href="/product-category/refurbished/">View All Smartphones</Button>
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <Image src="/img/refurbished-smartphones.webp" fluid alt="Refurbished Smartphones" />
                </Col>
            </Row>
        </Container>
    );
}
export default RefurbishedSmartphones;
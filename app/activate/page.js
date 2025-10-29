"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ActivateSimPlans = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Zoiko Mobile SIM Activation" />
        <Container className="my-5">
            <h2 className="text-center">Now Activate Your Zoiko SIM Card</h2>
            <Form>
                <Row className="mt-4">
                    <Col md={6} className="mb-4">
                        <label htmlFor="fullname" className="form-label">Full Name</label>
                        <Form.Control type="text" name="fullname" id="fullname" placeholder="Full Name" />
                    </Col>
                    <Col md={6} className="mb-4">
                        <label htmlFor="zip" className="form-label">ZIP Code</label>
                        <Form.Control type="text" name="zip" id="zip" placeholder="ZIP Code" />
                    </Col>
                </Row><Row className="mt-4">
                    <Col md={6} className="mb-4">
                        <label htmlFor="city" className="form-label">City</label>
                        <Form.Control type="text" name="city" id="city" placeholder="City" />
                    </Col>
                    <Col md={6} className="mb-4">
                        <label htmlFor="iccid" className="form-label">ICCID/SIM Serial Number (as shown on your SIM Card)</label>
                        <Form.Control type="text" name="iccid" id="iccid" placeholder="Enter 19 digit SIM serial number" />
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <Button variant="danger" type="submit" className="px-5">Activate SIM</Button>
                </div>
            </Form>
        </Container>
        <Footer />
        </>
    );
}
export default ActivateSimPlans;
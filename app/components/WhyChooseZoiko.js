"use client"
import { Card, CardBody, Col, Container, Image, Row } from "react-bootstrap";

const WhyChooseZoiko = () => {
    return (
        <Container fluid className="bglite p-5 my-4">
            <h2 className="text-center pb-3">Why Choose Zoiko Mobile?</h2>
            <Row className="gx-5">
                <Col md={4} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/flexibility.png" fluid className="icw10 mb-3" alt="Plan Flexibility"  />
                            <p><span className="txtred body22">Prepaid and Postpaid Flexibility</span><br />
                            Month-to-month prepaid plans with no hidden fees. Feature-packed postpaid plans with perks like data rollover and bundled subscriptions.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/connectivity.png" fluid className="icw10 mb-3" alt="Plan Flexibility"  />
                            <p><span className="txtred body22">Global Connectivity</span><br />
                            Free international calling to more than 200 countries. Affordable travel add-ons plans and eSIM support for instant global access.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/sustainablity.png" fluid className="icw10 mb-3" alt="Sustainablity"  />
                            <p><span className="txtred body22">Sustainability and Green Initiatives</span><br />
                            Carbon-neutral plans and eco-friendly device options. Recycling programs with loyalty rewards for reducing environmental impact.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row className="gx-5">
                <Col md={4} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/ai-powered.png" fluid className="icw10 mb-3" alt="AI Powred" />
                            <p><span className="txtred body22">AI-Powered Tools</span><br />
                            Predictive plan recommendations based on usage. Automated troubleshooting for faster issue resolution.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/regulatory.png" fluid className="icw10 mb-3" alt="Regulatory"  />
                            <p><span className="txtred body22">Regulatory Compliance</span><br />
                            Enhanced E911 services with real-time location accuracy and multilingual emergency support.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/customer-support.png" fluid className="icw10 mb-3" alt="Customer Support"  />
                            <p><span className="txtred body22">Customer-Centric Support</span><br />
                            24/7 chat and support for seamlessissue resolution and personalizedassistance.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default WhyChooseZoiko;
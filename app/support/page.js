"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, InputGroup, Row, Col, Button, Form, Card, CardBody } from "react-bootstrap";

const HelpSupport = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Zoiko Mobile - Support You May Find Here" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="Search For Articles" aria-label="Search For Articles" aria-describedby="basic-addon2" />
                            <Button variant="outline-danger" size="lg" id="button-addon2">Search</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="bglite pb-5">
            <Container className="pinkboxwraper gap-3 justify-content-center">
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Accounts &amp; Billing</div>
                        <ul className="redbullet">
                            <li><b>View &amp; Pay Your Bill</b> - Online, AutoPay, and accepted payment methods</li>
                            <li><b>Billing &amp; Charges Explained</b> - Taxes, fees, and payment cycles</li>
                            <li><b>Manage Your Account</b> - Online dashboard &amp; mobile app access</li>
                            <li><b>Dispute a Charge</b> - How to resolve billing issues</li>
                            <li><b>Zoiko Rewards &amp; Promotions</b> - Earn perks and special offers</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Network &amp; Coverage</div>
                        <ul className="redbullet">
                            <li><b>Check Coverage &amp; Speeds</b> - 5G, LTE, and rural service availability</li>
                            <li><b>Wi-Fi Calling &amp; VoLTE</b> - Seamless calling with better quality</li>
                            <li><b>Report a Network Issue</b> - Outages, slow speeds, and troubleshooting</li>
                            <li><b>Data Prioritization &amp; Fair Use</b> - How speeds may be affected</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Bring Your Own Device (BYOD)</div>
                        <ul className="redbullet">
                            <li><b>Check Compatibility</b> - Ensure your device works with Zoiko</li>
                            <li><b>How to Activate Your Device</b> - Quick steps for setup</li>
                            <li><b>eSIM Activation</b> - Fast and easy digital setup</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Calling &amp; International Services</div>
                        <ul className="redbullet">
                            <li><b>Unlimite Talk &amp; Text Plans</b> - Best options for nationwide calling</li>
                            <li><b>International Calling &amp; Rates</b> - Low-cost options for global calls</li>
                            <li><b>Roaming Abroad</b> - Coverage, rates, and add-ons</li>
                            <li><b>Wi-Fi &amp; VoIP Calling</b> - Make calls without using cellular data</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Device Setup &amp; Support</div>
                        <ul className="redbullet">
                            <li><b>Set Up Your Phone</b> - Android, iPhone, and APN settings</li>
                            <li><b>Troubleshooting Common Issues</b> - Connectivity, SMS, and calls</li>
                            <li><b>Lost or Stolen Phone?</b> - Lock, track, or replace your device</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Switching &amp; Number Porting</div>
                        <ul className="redbullet">
                            <li><b>Keep Your Number</b> - Transfer to Zoiko seamlessly</li>
                            <li><b>How to Switch to Zoiko</b> - Steps to bring your phone and plan</li>
                            <li><b>Moving Away from Zoiko?</b> - Port your number to another carrier</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Device Setup &amp; Support</div>
                        <ul className="redbullet">
                            <li><b>Zoiko Device Protection Plans</b> - Coverage for loss, theft, and damage</li>
                            <li><b>File a Claim</b> - Get a replacement device quickly</li>
                            <li><b>Account Security &amp; Fraud Protection</b> - Stay safe from scams</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Plans &amp; Add-Ons</div>
                        <ul className="redbullet">
                            <li><b>Compare Plans &amp; Pricing</b> - Find the best fit for your needs</li>
                            <li><b>Prepaid vs. Postpaid</b> - Key differences explained</li>
                            <li><b>Add Data, Hotspot &amp; Features</b> - Customize your plan</li>
                            <li><b>Zoiko Family Plans</b> - Multi-line discounts and shared data</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Network Updates &amp; Policy Changes</div>
                        <ul className="redbullet">
                            <li><b>3G Shutdown &amp; Upgrades</b> - Transitioning to 4G/5G</li>
                            <li><b>Terms &amp; Conditions</b> - Fair use, privacy, and policies</li>
                            <li><b>Data Privacy &amp; Security</b> - How Zoiko protects your information</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="txtred">Customer Support &amp; Self-Service</div>
                        <ul className="redbullet">
                            <li><b>Contact Zoiko Support</b> - Chat, phone, and store locations</li>
                            <li><b>Self-Service Tools</b> - Manage your account, billing, and troubleshooting</li>
                            <li><b>Accessibility &amp; Special Services</b> - Support for hearing/vision needs</li>
                        </ul>
                    </CardBody>
                </Card>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default HelpSupport;
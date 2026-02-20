"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import TopupFaqs from "../components/TopupFaqs";
import { openPlanPurchaseModal } from "../components/Header";
import { Container, Image, Row, Col, Card, CardBody, CardHeader, Button, } from "react-bootstrap";
import Link from "next/link";

const TopUpPlan = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Instant Top-Ups | Unstoppable Coverage | Powered by America&apos;s Best Network</>} />
        <Container fluid className="bglite">
            <Container className="py-5 w-50 w-sm-100 w-xs-100">
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}>
                        <h2>Need extra talk, text, or data?</h2>
                        <p className="body22">Zoiko Mobile Top-up Plans give you more of what you need, whenever you need it. As a premium add-on to your existing Zoiko Mobile plan, they ensure seamless connectivity on a top-tier network.</p>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Image src="/img/topup-banner.webp" className="d-block mx-auto" fluid alt="Topup Plans" />
                    </Col>
                </Row>
                <Row className="align-items-center pt-5">
                    <Col md={6} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                                <Image src="/img/topup1.webp" fluid alt="Topup plan" />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <h3>Zoiko Top-up</h3>
                                    </Col>
                                    <Col>
                                        <p style={{textAlign:'right'}}><span className="curprice">$6.50</span></p>
                                    </Col>
                                </Row>
                                <hr className="separator" />
                                <ul className='check-bullet'>
                                    <li>1GB of High-Speed Data</li>
                                    <li>500 Minutes</li>
                                    <li>1000 Texts</li>
                                    <li>$6.50 for 30 Days</li>
                                </ul>
                                <hr className="separator" />
                                <div className="text-center"><Button onClick={() => openPlanPurchaseModal('Zoiko Top-up', 'zoiko-top-up', 25, 6.50, 0, '30 Days', 18, 'topup')} className="btn btn-danger">Buy this Top-up plan</Button></div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Card>
                            <CardHeader>
                                <Image src="/img/topup2.webp" fluid alt="Topup plan" />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <h3>Zoiko Top-up+</h3>
                                    </Col>
                                    <Col>
                                        <p style={{textAlign:'right'}}><span className="curprice">$9.99</span></p>
                                    </Col>
                                </Row>
                                <hr className="separator" />
                                <ul className='check-bullet'>
                                    <li>1.2GB of High-Speed Data</li>
                                    <li>750 Minutes</li>
                                    <li>1500 Texts</li>
                                    <li>$9.99 for 30 Days</li>
                                </ul>
                                <hr className="separator" />
                                <div className="text-center"><Button onClick={() => openPlanPurchaseModal('Zoiko Top-up+', 'zoiko-top-up-plus', 26, 9.99, 0, '30 Days', 25, 'topup')} className="btn btn-danger">Buy this Top-up plan</Button></div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <h4 className="txtred text-center pt-5">Why Choose Zoiko Mobile?</h4>
                <div className="pinkboxwraper justify-content-center gap-3 mt-3">
                    <div className="pinkboxtopup">
                        <Image src={"/img/icons/folder.png"} alt="Icon 1" className="mx-auto d-block w-50" />
                        <p className="pt-2"><b>Premium Network Access</b><br />Enjoy the same reliable coverage as Verizon, T-Mobile, and AT&T.</p>
                    </div>
                    <div className="pinkboxtopup">
                        <Image src={"/img/icons/headphone.png"} alt="Icon 2" className="mx-auto d-block w-50" />
                        <p className="pt-2"><b>No Commitments</b><br />Add more whenever you need it - no long-term contracts.</p>
                    </div>
                    <div className="pinkboxtopup">
                        <Image src={"/img/icons/percent.png"} alt="Icon 3" className="mx-auto d-block w-50" />
                        <p className="pt-2"><b>Flexibility &amp; Convenience</b><br />A seamless, affordable top-up option when you need extra data, talk, and text</p>
                    </div>
                </div>
            </Container>
        </Container>
        <TopupFaqs />
        <Footer />
        </>
    );
}
export default TopUpPlan;
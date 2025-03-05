"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import ByodFaqs from "../components/ByodFaqs";
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import CarouselSimPlan from "../components/CarouselPlans";
import Link from "next/link";

const ByodPlans = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Bring Your Own Device (BYOD) to Zoiko Mobile</>} />
        <Container fluid className="byod-banner p-0"></Container>
        <Container fluid className="p-5 bglite">
            <h2 className="text-center">Is My Phone Compatible?</h2>
            <p className="body22">Zoiko Mobile utilizes the same network technologies as <b>Verizon, AT&T, and T-Mobile</b>. Generally, if your phone is compatible with one of these carriers, it should work on our network. We support both GSM and CDMA devices, including 4G LTE and 5G compatible phones. However, compatibility can vary. To guarantee a smooth activation process, please verify your device&apos;s compatibility.</p>
        </Container>
        <Container className="my-5 p-4 redborderbox text-center" style={{backgroundColor:'#DF1E5A1C'}}>
            <h2>Check If Phone is Compatible</h2>
            <p className="body22">Enter your IMEI or MEID below to see if your device is compatible with the Zoiko Mobile network</p>
            <InputGroup className="w-50 w-sm-100 mx-auto">
                <Form.Control placeholder="Enter your IMEI or MEID number" aria-label="Enter your IMEI or MEID number" aria-describedby="basic-addon2" />
                <Button variant="danger" size="lg" id="button-addon2">Check My Device</Button>
            </InputGroup>
            <p className="body22 pt-4">Here&apos;s how to Check your IMEI or MEID: This unique number identifies your phone. You can usually find it in your phone&apos;s settings under &quot;About Phone&quot; or by dialing *#06# on your phone&apos;s keypad.</p>
        </Container>
        <CarouselSimPlan />
        <Container fluid className="bglite">
            <Container className="py-5">
                <h3 className="text-center">Activating Your Device</h3>
                <p className="body22 text-center">Once you have your Zoiko Mobile SIM card and have chosen a plan, follow these simple steps to activate your device:</p>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <div className="d-flex flex-row">
                            <div className="bigred px-3">1</div>
                            <div className="px-2">
                                <h4 className="txtred">Insert your Zoiko Mobile SIM card</h4>
                                <p>Turn off your phone and carefully insert the SIM card into the designated slot.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <div className="d-flex flex-row">
                        <div className="bigred px-3">2</div>
                            <div className="px-2">
                                <h4 className="txtred">Visit our activation page</h4>
                                <p>Go to <Link href={"https://www.zoikomobile.com/activate/"}>zoikomobile.com/activate/</Link> on your computer or another device.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <div className="d-flex flex-row">
                        <div className="bigred px-3">3</div>
                            <div className="px-2">
                                <h4 className="txtred">Follow the on-screen instructions</h4>
                                <p>You will be guided through the activation process, which includes verifying your account information and transferring your number (if applicable).</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <div className="d-flex flex-row">
                        <div className="bigred px-3">4</div>
                            <div className="px-2">
                                <h4 className="txtred">Enjoy Zoiko Mobile</h4>
                                <p>Once your device is activated, you are ready to experience the speed and reliability of our nationwide network.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
        <ByodFaqs />
        <Footer />
        </>
    );
}
export default ByodPlans;
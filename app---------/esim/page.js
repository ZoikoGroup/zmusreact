"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import EsimFaqs from "../components/EsimFaqs";
import { Col, Container, Row, Image } from "react-bootstrap";

const Esim = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Go places. Do everything. Use everywhere. Enjoy Life." />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <h1 className="text-center">Zoiko Global eSIM Keeps You Connected, in your every step!</h1>
                <Row className="align-items-center py-4 blackbordercontainer">
                    <Col md={4} sm={12} xs={12}>
                        <ul className="body22 redbullet">
                            <li>Buy Global eSIM.</li>
                            <li>Connect everywhere.</li>
                            <li>Save Up to 90% on roaming.</li>
                        </ul>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <ul className="body22 redbullet">
                            <li>No commitments.</li>
                            <li>No frills</li>
                            <li>No expiration date.</li>
                        </ul>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <ul className="body22 redbullet">
                            <li>Single global eSIM (200+).</li>
                            <li>No SIM-Swapping.</li>
                            <li>No cellular dead zone.</li>
                        </ul>
                    </Col>
                </Row>
                <h2 className="text-center pt-5">Global eSIM Network catches you whenever, wherever - in seconds!</h2>
                <p className="body22">Get connected in seconds with Zoiko&apos;s global eSIM network! Our in-store global eSIM phone plans offers instant eSIM activation for any US Mobile SIM plan on your eSIM-compatible device. Choose your best international eSIM plan and enjoy nationwide 5G coverage for talk, text, and data, wherever you are.</p>
                <h4 className="text-center pt-5">Why Choose Zoiko Global eSIM?</h4>
                <div className="pinkboxwraper gap-4 justify-content-center pt-2">
                    <div className="pinkboxtravel align-items-center">
                        <Image src="/img/icons/esim.png" fluid className="w-50" alt="eSIM" />
                        <p className="bodysm pt-3"><b>Join the Nation&apos;s<br />Best Network</b><br />Flexible, traveler-friendly unlimited global eSIM plans with extensive 5G coverage.</p>
                    </div>
                    <div className="pinkboxtravel align-items-center">
                        <Image src="/img/icons/5G.png" fluid className="w-50" alt="Data Shareing" />
                        <p className="bodysm pt-3"><b>A Leading US<br />Network Operator</b><br />Nationwide 5G coverage ensures reliable connectivity for talk, text, and data.</p>
                    </div>
                    <div className="pinkboxtravel align-items-center">
                        <Image src="/img/icons/dualsim.png" fluid className="w-50" alt="Dual SIM" />
                        <p className="bodysm pt-3"><b>Dual SIM<br />Convenience</b><br />Use one eSIM for business and another SIM for personal use on a single device.</p>
                    </div>
                    <div className="pinkboxtravel align-items-center">
                        <Image src="/img/icons/gc.png" fluid className="w-50" alt="Global Connectivity" />
                        <p className="bodysm pt-3"><b>Instant Global<br />Connectivity</b><br />Activate your secure eSIM instantly and manage everything in one place.</p>
                    </div>
                </div>
            </Container>
            <h2 className="text-center txtred py-5">Benefits of Zoiko Mobile&apos;s Global eSIM</h2>
            <div className="pinkboxwraper justify-content-center gap-3 px-3 mb-4">
                <div className="px-2 box20">
                    <Image src="/img/icons/Vector-4.png" fluid alt="Plan" />
                    <h4 className="txtred pt-4">Global Coverage</h4>
                    <p>Stay connected in over 200 countries across the UK, Europe, Asia, Africa, the Middle East, and the Americas. No more searching for Wi-Fi!</p>
                </div>
                <div className="px-2 box20">
                    <Image src="/img/icons/Vector-1.png" fluid alt="Lines" />
                    <h4 className="txtred pt-4">Easy LocalNetwork Connection</h4>
                    <p>Quickly connect to local cellular networks without physically swapping SIM cards.</p>
                </div>
                <div className="px-2 box20">
                    <Image src="/img/icons/Vector-2.png" fluid alt="Savings" />
                    <h4 className="txtred pt-4">Travel with Ease</h4>
                    <p>No need to buy, carry, or swap physical SIM cards at airports or local shops. Install your Zoiko Mobile eSIM profile and choose a USA prepaid/postpaid SIM plans or business/travel SIM plan in just a few taps.</p>
                </div>
                <div className="px-2 box20">
                    <Image src="/img/icons/Vector-3.png" fluid alt="Plan" />
                    <h4 className="txtred pt-4">Affordableand Flexible Plans</h4>
                    <p>S prepaid and postpaid eSIM plans start as low as $15.00 for unlimited high-speed 5G data, 1500 minutes of talk, and 10,000 texts.</p>
                </div>
                <div className="px-2 box20">
                    <Image src="/img/icons/Vector-5.png" fluid alt="Plan" />
                    <h4 className="txtred pt-4">Valuable Add-ons</h4>
                    <p>Enjoy 1GB of mobile hotspot data and free international calls to over 200 countries - saving you on international roaming charges.</p>
                </div>
            </div>
            <EsimFaqs />
        </Container>
        <Footer />
        </>
    );
}
export default Esim;
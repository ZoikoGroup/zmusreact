"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Col, Container, Image, Row } from "react-bootstrap";

const DataDeals = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Toggle Today on Your Favorite Zoiko Mobile 5G Network." />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}><Image src="/img/5gspeed.webp" className="w-75" fluid alt="5G Speed" /></Col>
                    <Col md={6} sm={12} xs={12}>
                        <h2 className="bigred">Exponentially<br />Faster 5G Data Deals</h2>
                        <h4>Another Reason to Love Zoiko Mobile: Faster &amp; Speedy!</h4>
                    </Col>
                </Row>
                <p className="body22 py-4">Get exponentially faster 5G mobile data plans, get download and upload speeds under 5 milliseconds (low latency rate) with Zoiko Mobile&apos;s ultra-fast 5G network. It&apos;s not just fast - it&apos;s exceptionally super signal strength and stable connectivity. It&apos;s ideal for most households and business connections to send large files, download plus upload multiple files, watch CCTV footage, stream, game, download, etc. Now browse with less stress, inspire, and energize your online activities that match your lifestyle. Our T-Mobile powered best-ever 5G network reaches 98% of American cities and covers across 1.6 million square miles.</p>
                <h2 className="text-center">Benefits of 5G</h2>
                <hr />
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="protbox">
                        <div className="px-2 text-center">
                            <Image src="/img/icons/10x-faster.png" fluid alt="10X Faster" />
                            <h4 className="txtred pt-3">10X Faster</h4>
                        </div>
                    </div>
                    <div className="protbox">
                        <div className="px-2 text-center">
                            <Image src="/img/icons/wifi.png" fluid alt="Wifi" />
                            <h4 className="txtred pt-3">Better Connectivity</h4>
                        </div>
                    </div>
                    <div className="protbox">
                        <div className="px-2 text-center">
                            <Image src="/img/icons/smooth.png" fluid alt="Super Smooth" />
                            <h4 className="txtred pt-3">Super Smooth</h4>
                        </div>
                    </div>
                </div>
                <p className="body22 pt-5">Simply put, the integrated digital transformation between IoT and 5G mobile data plans, plus a unique synergy between superimposed augmented reality and 5G network, is catalyzed in across-enterprise activities, improved productivity, efficiency, safety, and real-time communications. This unique synergy is more than just speed - it&apos;s a democratization of trending technology, just in your one touch!</p>
                <p className="body22">Zoiko Mobile&apos;s upgraded version of 5G mobile data plans will let you connect, create, and immerse yourself completely in fully holistic online domains.</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default DataDeals;
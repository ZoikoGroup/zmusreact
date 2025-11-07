"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import WifiFaqs from "../components/WifiFaqs";
import { Col, Container, Image, Row } from "react-bootstrap";

const WifiCalling = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Go places. Do everything. Use everywhere. Enjoy Life." />
        <Container fluid className="wifibg p-0">
            <Container className="py-4">
                <Row className="align-items-center">
                    <Col md={7} sm={12} xs={12}>
                        <h2 className="txtred">Super Easy &amp; Seamless Connectivity on Wi Fi Calling Service</h2>
                        <p className="body22">Wi Fi calling is an inbuilt feature on most cellular handsets that simply a faster way to connect users to an available Wi Fi network to place and receive calls and send texts to non-US numbers over wireless networks. It&apos;s ideal for non-cellular coverage dead zones or areas with no mobile network coverage.</p>
                    </Col>
                    <Col md={5} sm={12} xs={12}>
                        <Image src="/img/wificalling.png" fluid alt="Wifi Calling" />
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="bglite py-4">
            <Container>
                <h4 className="txtred">Why Wi Fi Calling?</h4>
                <p className="body22">Wi Fi calling is so handy to make uninterrupted ongoing voice calls, hassle-free video calls, and anywhere, anytime send texts in non-cellular coverage blackspot areas. Now makes voice calls, video calls, and texts to 200+ countries over a Wi-Fi network at no additional cost.</p>
                <p className="body22">This feature is a game-changer for those in areas with tricky mobile reception or for those moments when you're in places where the signal just can&apos;t go.</p>
                <Row className="align-items-center">
                    <Col md={7} sm={12} xs={12}>
                        <h4 className="txtred">Enable Wi Fi Calling Service on Apple iPhone!</h4>
                        <p className="body22">When Wi Fi calling is turned on by supported networks, it may improve generally clearer and crisper call quality on your iPhone.</p>
                        <ol className="body22">
                            <li>To actively use Wi Fi Calling, turn on your Wi-Fi and connect.</li>
                            <li>Tab Settings on your Apple iPhone.</li>
                            <li>Tick Cellular if you&apos;re using eSIM as your second network, select either of a network. (e.g., Primary, Secondary).</li>
                            <li>Tap Wi Fi Calling.</li>
                            <li>Now tab &apos;On or Off&apos; on your iPhone to make Wi-Fi calls.</li>
                        </ol>
                    </Col>
                    <Col md={5} sm={12} xs={12}>
                        <Image src="/img/wifi1.webp" fluid alt="Wifi Calling" />
                    </Col>
                </Row>
                <Row className="align-items-center py-4">
                    <Col md={5} sm={12} xs={12}>
                        <Image src="/img/wifi2.webp" fluid alt="Wifi Calling" />
                    </Col>
                    <Col md={7} sm={12} xs={12}>
                        <h4 className="txtred">Enable Wi-Fi Calling Service on Samsung Galaxy Phones!</h4>
                        <p className="body22">Wi Fi calling is exactly as same as made over regular cellular phone callswhen connected to a nearby reliable Wi-Fi network.</p>
                        <ol className="body22">
                            <li>Open a default &quot;Phone app&quot; and tap &quot;three-dot&quot; icon in the top right corner.</li>
                            <li>Go to &quot;Settings&quot; and tap &quot;toggle on&quot; Wi Fi calling.</li>
                        </ol>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={7} sm={12} xs={12}>
                        <h4 className="txtred">Enable Wi Fi Calling Service on Google Phones!</h4>
                        <ol className="body22">
                            <li>Open a default &quot;Phone app&quot; and tap &quot;three-dot&quot; icon in the top right corner.</li>
                            <li>Go to &quot;Settings&quot; and tap the &quot;Calling Accounts&quot; option, then &quot;toggle on&quot; to ensure Wi Fi calling.</li>
                        </ol>
                    </Col>
                    <Col md={5} sm={12} xs={12}>
                        <Image src="/img/wifi3.webp" fluid alt="Wifi Calling" />
                    </Col>
                </Row>
            </Container>
        </Container>
        <WifiFaqs />
        <Footer />
        </>
    );
}
export default WifiCalling;
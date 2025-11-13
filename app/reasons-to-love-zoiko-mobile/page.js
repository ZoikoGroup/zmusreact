"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Card, CardBody, Col, Container, Image, Row } from "react-bootstrap";

const LoveZoiko = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Reasons Zoiko Stands Out: Affordable Plans | Top-Notch Customer Service | Nationwide Coverage" />
        <Container fluid className="lovezoiko p-0">
            <Container className="py-4">
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}>
                        <Image src="/img/lovezoiko-puppy.webp" fluid alt="Zoiko Puppy" />
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <h2>Zoikon, the French Bulldog, loves<br />Zoiko Mobile&apos;s Best Plans in the USA!</h2>
                        <ul className="redbullet body22">
                            <li>Zoikon is enjoying the ease and convenience of ZoikoMobile&apos;s reliable service!</li>
                            <li>Get your hands on a simple, straightforward plan and experience the difference today.</li>
                        </ul>
                        <Button variant="danger" href="/login">Join Our Network Today</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="bglite py-5">
            <Container className="pinkboxwraper gap-3 justify-content-center">
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="d-flex flex-row gap-4">
                            <Image src="/img/icnone.png" fluid className="d-none d-md-block" alt="One" />
                            <div>
                                <div className="txtred">Unbeatable Coverage</div>
                                <p>Zoikon, the clever French Bulldog, knows the importance of staying connected, and Zoiko Mobile delivers. Enjoy nationwide 5G coverage, offering reliable service across the U.S. Whether you&apos;re in rural landscapes or busy urban environments, Zoiko Mobile ensures you stay connected with superior 5G speed and seamless mobile coverage.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="d-flex flex-row gap-4">
                            <Image src="/img/icntwo.png" fluid className="d-none d-md-block" alt="Two" />
                            <div>
                                <div className="txtred">Ultra-Fast Data Speeds for Effortless Streaming and Browsing</div>
                                <p>Zoikon loves streaming viral videos, and with Zoiko Mobile, you can do the same with ease! Experience high-speed data for smooth streaming, quick downloads, and flawless app performance. Powered by cutting-edge 5G technology, Zoiko Mobile gives you the fastest mobile internet speeds, ensuring your digital world runs effortlessly.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="d-flex flex-row gap-4">
                            <Image src="/img/icnthree.png" fluid className="d-none d-md-block" alt="Three" />
                            <div>
                                <div className="txtred">Affordable, Premium Mobile Service</div>
                                <p>Zoiko Mobile delivers premium mobile service without the premium price. Get access to the best mobile networks with no-contract plans that provide flexibility and freedom. Enjoy affordable prepaid phone plans, high-quality service, and unbeatable value for money, all while staying connected to the most reliable mobile network.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="d-flex flex-row gap-4">
                            <Image src="/img/icnfour.png" fluid className="d-none d-md-block" alt="Four" />
                            <div>
                                <div className="txtred">24/7 Customer Support for Expert Assistance</div>
                                <p>Zoikon, the clever French Bulldog, knows the importance of staying connected, and Zoiko Mobile delivers. Enjoy nationwide 5G coverage, offering reliable service across the U.S. Whether you&apos;re in rural landscapes or busy urban environments, Zoiko Mobile ensures you stay connected with superior 5G speed and seamless mobile coverage.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="d-flex flex-row gap-4">
                            <Image src="/img/icnfive.png" fluid className="d-none d-md-block" alt="Five" />
                            <div>
                                <div className="txtred">Exclusive Rewards and Discounts for Loyal Customers</div>
                                <p>Zoikon deserves the best - and so do you! Zoiko Mobile offers exclusive perks and rewards to loyal customers, including special discounts, promotions, and bonuses that enhance your mobile experience. With Zoiko Mobile, your loyalty comes with exciting mobile rewards that make staying connected even more rewarding.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="zoikolovecard">
                    <CardBody>
                        <div className="d-flex flex-row gap-4">
                            <Image src="/img/icnsix.png" fluid className="d-none d-md-block" alt="Six" />
                            <div>
                                <div className="txtred">Flexible Prepaid Plans Tailored to Your Needs</div>
                                <p>Whether Zoikon is strolling the neighborhood or embarking on a long adventure, Zoiko Mobile offers flexible prepaid plans that fit your lifestyle. Choose from a variety of plans - designed for light users, heavy data streamers, and everyone in between. With Zoiko Mobile, you get the best mobile plans that offer reliable coverage, fast speeds, and the flexibility to pay only for what you need.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Container>
            <hr />
            <Container className="w-50 w-sm-100">
                <div className="d-flex flex-row gap-4 align-items-center">
                    <Image src="/img/pinkchip.png" fluid alt="Chip" className="d-none d-md-block" />
                    <div>
                        <h4>Switch to Zoiko Mobile Today</h4>
                        <p>Discover the best prepaid mobile service with Zoiko Mobile. Enjoy premium wirelessthat provides nationwide 5G coverage, unbeatable mobile data speeds, flexible plans,and exceptional customer support—all at an affordable price. Switch to Zoiko Mobiletoday for a superior mobile experience, and start enjoying better connectivity, more rewards, and the value you deserve!</p>
                    </div>
                </div>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default LoveZoiko;
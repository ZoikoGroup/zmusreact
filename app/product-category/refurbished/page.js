"use client"
import TopHeader from "../../components/TopHeader";
import Header from "../../components/Header";
import HeadBarSmall from '../../components/HeadBarSmall';
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import { Col, Container, Image, Row } from "react-bootstrap";
import PhoneSlider from "../../components/PhoneSlider";

const Refurbished = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Stress less & Buy Premium Quality Refurbished Smartphones @ Zoiko Mobile" />
        <Container fluid className="py-4">
            <HeadBarSmall text="--" />
            <Container className="redbordercontainer p-4 bglite" style={{marginTop:'-34px'}}>
                <Row className="align-items-center">
                    <Col md="8" sm="12" xs="12">
                        <h4 className="txtred">Get a Deal on Pre-used Smartphones - Exclusive Offers on Top-tier Refurbished Mobile Phone Deals at Lowest Ever Prices!</h4>
                        <ul className="postpaidsave">
                            <li>Our Smart Chicken, Charlie, has recommended top-grade and certified refurbished phones for you at competitive prices!</li>
                            <li>This could be your sustainable option to get access to proactively defect-protect refurbished smartphones, at a much lower price.</li>
                            <li>Luxurious, slim, sleek design, intelligent, and fastest processors, eSIM-compatible refurbished models from leading brands, and more; our network unlocked refurbished mobile phone deals (In very good condition) are available online for users like you.</li>
                            <li>Charlie's expert recommendations might just surprise you. You can choose from multiple device options and trust you're getting a certified refurbished mobile phone deal that's egg-ceptional value for money.</li>
                        </ul>
                    </Col>
                    <Col md="4" sm="12" xs="12">
                        <Image src="/img/refurbished-banner.png" fluid alt="Refurbished" />
                    </Col>
                </Row>
            </Container>
        </Container>
        <PhoneSlider />
        <Footer />
        </>
    );
}
export default Refurbished;
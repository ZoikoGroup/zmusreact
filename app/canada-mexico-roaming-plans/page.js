"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Image } from "react-bootstrap";

const RoamFree = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Let&apos;s Explore Worry-Free Canada and Mexico Roaming Plans Before You Go!" />
        <Container fluid className="py-5">
            <Container className="redbordercontainer">
                <Row className="align-items-center">
                    <Col md={8} sm={12} xs={12}>
                        <h2 className="txtred">Hey there, fellow adventurers! It&apos;s Benny the Badger here!</h2>
                        <ul className="redbullet body22">
                            <li>Especially when you travel to Canada or Mexico, you can&apos;t avoid expensive roaming charges or need to buy an expensive roaming plan, otherwise, your line will be blocked. Well, if you want to access your current data, make calls, and send texts to US numbers, switch today to Zoiko Mobile&apos;s Canada &amp; Mexico roaming plans. It lets you enjoy great roaming allowance in Canada and Mexico just like you&apos;re in your home country (U.S.).</li>
                            <li>That&apos;s right, folks! Our North America&apos;s best international roaming plans keep you connected on international land, keep mobile bills at ease, and share your travel experience with friends and family without the extra fees. Our fastest 5G network allows you to upload your photos, videos, and large important files as quickly as possible!</li>
                            <li>So why wait? Switch to Zoiko Mobile&apos;s geographically-tuned Canada &amp; Mexico roaming plans today and start exploring Canada and Mexico without incurring any expensive roaming costs!</li>
                        </ul>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/rekoon.png" className="d-block mx-auto" fluid alt="Topup Plans" />
                    </Col>
                </Row>
                <p className="body22 pt-5">International roaming 5G network on Canada &amp; Mexico mobile recharge plans are your smart and affordable travel kit to being connected to you on your go. These prebuilt features such as unlimited talk, text, and data with up to 6GB, 9GB, 10GB, or 15GB (depending on your plan) of unlimited high-speed 5G data, with free international calls to 200+ countries, will make you easy to stay connected with your family and friends from the day one and these Canada &amp; Mexico roaming plans will surely come your first choice.</p>
                <p className="body22">Our selected Canada &amp; Mexico roaming recharge plans let you explore unforgettable adventures, you can roam freely across the stunning coastal Saint Lawrence River, Niagara Falls (Ontario), iconic San Miguel de Allende, vibrant Playa del Carmen, and sip coffee in a café in Montreal and Olimpico, or lie on the sunbath on a pristine Cancun beach, all while seamlessly sharing your adventures on social media. Now, no need to pay pricey roaming charges. Traveling is the treasury of memories, let it linger long. Start your journey with travel-friendly best international roaming plans!</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default RoamFree;
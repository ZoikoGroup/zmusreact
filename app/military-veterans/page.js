"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import Testimonials from "../components/Testimonials";
import MilitaryFaqs from "../components/MilitaryFaqs";

const MilitaryVeterans = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Military &amp; Veterans&apos; Lifetime Deals</>} />
        <Container fluid className="p-0">
            <img className="d-none d-md-block w-100" src="/img/home-banner/Military-Veterans-banner.png" alt="Military Veterans" />
            <img className="d-sm-block d-md-none" src="/img/home-banner/Military-Veterans-banner-mobile.png" alt="Military Veterans" />
            <Container className="w-75" style={{marginTop:'-360px', marginBottom:'100px'}}>
                <h1 className="txtred">Military &amp; Veterans&apos;<br />Lifetime Deals</h1>
                <ul className="redbullet-banner txtblack">
                    <li>20% Lifetime Discount</li>
                    <li>15% Discount For Family &amp; Friends</li>
                </ul>
                <Button variant="danger" size="lg" href="/military-veterans-form">Register Now</Button>
            </Container>
        </Container>
        <Container fluid className="py-4 bglite">
            <h2 className="text-center py-4">Exclusive Benefits</h2>
            <Container>
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="protbox">
                        <Image src="/img/icons/discount.png" className="w-25" alt="Discount" />
                        <h4 className="txtred pt-2">20% Lifetime Discount:</h4>
                        <p>bring-your-own-device (BYOD) plan, whether prepaid or on a contract, for life. Whether you&apos;re active-duty, a veteran, or a reservist, this is our way of saying thank you.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/family.png" className="w-25" alt="Family" />
                        <h4 className="txtred pt-2">15% Discount for Family and Friends:</h4>
                        <p>Extend the benefits to your loved ones. Nominate up to 5 family members or friends to receive a 15% lifetime discount on their bring-your-own-device (BYOD) plans.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/text.png" className="w-25" alt="Text" />
                        <h4 className="txtred pt-2">Unlimited Talk and Text:</h4>
                        <p>Stay connected with unlimited talk and text to standard phone numbers in the United States, Canada, and Mexico. Keep in touch with family or coordinate with fellow service members effortlessly.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/5g-solid.png" className="w-25" alt="5G Access" />
                        <h4 className="txtred pt-2">5G Access</h4>
                        <p>Enjoy lightning-fast 5G speeds in select areas across the United States. Stay connected with the latest technology wherever you are.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/roaming.png" className="w-25" alt="Roaming" />
                        <h4 className="txtred pt-2">North America Roaming</h4>
                        <p>Travel seamlessly throughout the United States, Canada, and Mexico with included data, talk, and text. Stay connected without worrying about extra charges.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/phone.png" className="w-25" alt="Wificalling" />
                        <h4 className="txtred pt-2">Wifi Calling</h4>
                        <p>Make crystal-clear calls over Wi-Fi from anywhere in the world. Whether you&apos;re deployed overseas or relaxing at home, stay close to those who matter most.</p>
                    </div>
                </div>
                <h2 className="text-center pt-5">Eligibility</h2>
                <hr className="seperator" />
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">1</div>
                        <div className="px-2">
                            <h4 className="txtred">Military and Veterans Status:</h4>
                            <p>Provide a valid military ID or proof of veteran status to qualify.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">2</div>
                        <div className="px-2">
                            <h4 className="txtred">New Customers Only:</h4>
                            <p>These offers are available exclusively to new military and veteran customers.</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-center pt-5">Terms and Conditions</h2>
                <hr className="seperator" />
                <ul className="redbullet">
                    <li><b>20% Lifetime Discount:</b> Applies to any bring-your-own-device (BYOD) plan for as long as you remain a Zoiko Mobile customer.</li>
                    <li><b>15% Discount for Family and Friends:</b> Available for up to 5 nominated individuals for the lifetime of their Zoiko Mobile plans.</li>
                    <li><b>Fair Use Policy:</b> Applies to all plans, including unlimited talk, text, and North America roaming.</li>
                    <li><b>5G Access:</b> Available in select areas. Check for coverage in your location.</li>
                    <li><b>Wi-Fi Calling:</b> Requires a compatible device and a reliable network connection.</li>
                    <li><b>North America Roaming:</b> Covers connectivity throughout the United States, Canada, and Mexico.</li>
                </ul>
            </Container>
        </Container>
        <MilitaryFaqs />
        <Container className="py-4 w-50 w-sm-100">
            <Row>
                <Col md={9} sm={12} xs={12}>
                    <p>At Zoiko Mobile, we are committed to keeping you connected with those who matter most. Join today and discover why so many military families trust Zoiko Mobile as their wireless provider of choice.</p>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Button variant="danger" size="lg" href="#">Register Now</Button>
                </Col>
            </Row>
        </Container>
        <Testimonials />
        <Footer />
        </>
    );
}
export default MilitaryVeterans;
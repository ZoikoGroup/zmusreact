"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Testimonials from "../components/Testimonials";
import MusicHubFaqs from "../components/MusicHubFaqs";
import { Container, Button, Row, Col, Image } from "react-bootstrap";

const MusicHub = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Zoiko Music Hub: Empowering Music Creators and Lovers</>} />
        <Container fluid>
            <img className="d-none d-md-block w-100" src="/img/home-banner/Music-Hub-banner.png" alt="Student Banner" />
            <img className="d-sm-block d-md-none" src="/img/home-banner/Music-Hub-banner-mobile.png" alt="Student Banner" />
            <Container className="w-75" style={{marginTop:'-360px', marginBottom:'30px'}}>
                <div>
                    <h4 className="txtred">Zoiko Music Hub:<br />Empowering Music Creators &amp; Lovers</h4>
                    <p className="txtblack body20">At Zoiko Mobile, we know music isn&apos;t just entertainment<br />—it&apos;s a way of life. That&apos;s why we created the Zoiko Music<br />Hub, a dedicated space where music lovers and aspiring<br />musicians can find the tools, perks, and community to fuel<br />their passion. Whether you&apos;re producing your next big hit,<br />jamming with friends, or discovering fresh tunes, Zoiko<br />Mobile is here to keep you connected and inspired.</p>
                    <div className="d-flex flex-nowrap gap-3">
                        <Button href='/music-hub-registratrion-form' variant="danger" size="lg">Register Now</Button>
                        <Button href='#' variant="outline-danger" size="lg">Learn more</Button>
                    </div>
                </div>
            </Container>
        </Container>
        <Container fluid className="bglite py-5">
            <h2 className="text-center">Exclusive Benefits for Music Enthusiasts</h2>
            <Container>
                <hr />
                <Row className="align-items-center">
                    <Col md={8} sm={12} xs={12}>
                        <h4 className="py-4">Discounts for Musicians</h4>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub1.svg" alt="Icon 1" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">20% Off for Musicians and Students</h4>
                                <p>Whether you&apos;re a professional musician, music educator, or a student enrolled in a music program, you can save on your plan with proof of eligibility.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub2.svg" alt="Icon 1" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Family Discounts</h4>
                                <p>Keep your household connected with discounts for up to 5 family members.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/musichub1.png" fluid alt="Music hub 1" />
                    </Col>
                </Row>
                <br />
                <Row className="align-items-center">
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/amico.png" fluid alt="Music hub 2" />
                    </Col>
                    <Col md={8} sm={12} xs={12}>
                        <h4 className="py-4">Unlimited Streaming and Perks</h4>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub3.svg" alt="Icon 3" />
                            </div>
                            <div className="px-1 pt-3">
                                <h4 className="txtred">Enjoy Your Tunes Without Limits</h4>
                                <p>Stream music from your favorite apps without worrying about data caps.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub4.svg" alt="Icon 4" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Free Music Streaming Trials</h4>
                                <p>Get access to popular platforms like Spotify Premium free for 3 months when you join Zoiko Mobile.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row className="align-items-center">
                    <Col md={8} sm={12} xs={12}>
                        <h4 className="py-4">Tools for Aspiring Musicians</h4>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub5.svg" alt="Icon 1" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Music Creation Tools</h4>
                                <p>Unlock free or discounted access to music production apps like BandLab and Ableton Note to bring your ideas to life.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub6.svg" alt="Icon 1" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Free Cloud Storage for Music</h4>
                                <p>Secure your tracks, beats, and recordings with 100GB of complimentary cloud storage</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/musichub3.png" fluid alt="Music hub 1" />
                    </Col>
                </Row>
                <br />
                <Row className="align-items-center">
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/musichub2.png" fluid alt="Music hub 2" />
                    </Col>
                    <Col md={8} sm={12} xs={12}>
                        <h4 className="py-4">Community and Recognition</h4>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub7.svg" alt="Icon 3" />
                            </div>
                            <div className="px-1 pt-3">
                                <h4 className="txtred">Musician Spotlight</h4>
                                <p>Every month, we showcase talented Zoiko Mobile users on our social media and website, giving them a platform to shine.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub8.svg" alt="Icon 4" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Exclusive Event Access</h4>
                                <p>Win tickets to concerts, festivals, and industry events.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row className="align-items-center">
                    <Col md={8} sm={12} xs={12}>
                        <h4 className="py-4">Custom Plans for Creators</h4>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub9.svg" alt="Icon 1" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Unlimited Creator Plans</h4>
                                <p>Designed for musicians who need seamless connectivity, faster uploads, and priority<br />network access.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row protbox">
                            <div className="px-3">
                                <Image src="/img/icons/mhub10.svg" alt="Icon 1" />
                            </div>
                            <div className="px-1">
                                <h4 className="txtred">Portable Studio Connectivity</h4>
                                <p>Stay connected on the go with portable hotspots and SIM-enabled devices.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/musichub5.png" fluid alt="Music hub 5" />
                    </Col>
                </Row>
                <br />
                <h4 className="text-center pt-4">How to Join the Zoiko Music Hub</h4>
                <hr />
                <div className="pinkboxwraper gap-4 pt-4">
                    <div className="d-flex flex-row animalchbox">
                        <div className="bigred px-3">1</div>
                        <div className="px-1">
                            <h4 className="txtred">Sign Up for Zoiko Mobile:</h4>
                            <p>Choose a plan that fits your needs and unlock access to exclusive music benefits.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row animalchbox">
                        <div className="bigred px-3">2</div>
                        <div className="px-1">
                            <h4 className="txtred">Verify Eligibility:</h4>
                            <p>Musicians and students can upload proof of status to activate discounts.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row animalchbox">
                        <div className="bigred px-3">3</div>
                        <div className="px-1">
                            <h4 className="txtred">Start Your Journey:</h4>
                            <p>Enjoy premium perks, create your best work, and connect with a vibrant community of music lovers.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Container>
        <MusicHubFaqs />
        <Container fluid className="bglite py-5">
            <Container>
                <h4 className="text-center">Terms and Conditions</h4>
                <hr />
                <ul className="redbullet body22">
                    <li>Discounts apply to eligible plans only and require proof of eligibility, such as union membership or enrollment in a music program.</li>
                    <li>Free streaming trials and unlimited streaming benefits are subject to availability and participation of streaming platforms.</li>
                    <li>Cloud storage is available for music files only, with a 100GB limit per account.</li>
                    <li>Event giveaways and musician spotlights are limited to Zoiko Mobile customers in good standing</li>
                </ul>
            </Container>
        </Container>
        <Testimonials />
        <Footer />
        </>
    );
}
export default MusicHub;
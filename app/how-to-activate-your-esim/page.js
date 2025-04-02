"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Carousel, CarouselItem, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

const ActivateESIM = () => {

    const [key, setKey] = useState('android');

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="eSIM Card Activation Guides for Smartphone, Tabs & Smartwatch!" />
        <Container fluid className="esimbanner p-0"></Container>
        <Container fluid className="bglite py-5 px-4">
            <div className="text-center">
                <h2 className="txtred">How to activate your Zoiko Mobile&apos;s eSIM?</h2>
                <p className="body22">Here are the detailed walkthroughs on how you can activate your Zoiko Mobile&apos;s eSIM:</p>
                <p className="body22 pt-4">Please Select Your Device:</p>
            </div>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} justify>
                <Tab eventKey={'android'} title="Android">
                    <Container className="txtblack body20 py-4">
                        <Row className="align-items-center">
                            <Col md={6} sm={12} xs={12}>
                                <h2>Configure an eSIM on your Android device.</h2>
                                <p className="body22"><b>Step 1:</b> Purchase an eSIM Plan</p>
                                <p>Initiate your eSIM card from the Zoiko Mobile online store. You&apos;ll receive a QR code via email.</p>
                                <ul>
                                    <li>Open the Settings app on top of your screen.</li>
                                    <li>Tap three dots on your Smartphone (Android/iPhone).</li>
                                    <li>Swipe down and tap Cellular or Mobile Data.</li>
                                    <li>Select &apos;Add Cellular Plan&apos;.</li>
                                </ul>
                                <p className="body22"><b>Step 2:</b> Scan QR Code From an Image</p>
                                <p><b>Step 2.1:</b> Scroll down your mobile screen &#129058; Focus toward QR code for 2-3 seconds &#129058; Scan QR code image &#129058; Tap &quot;Add plan to phone&quot;</p>
                            </Col>
                            <Col md={6} sm={12} xs={12} className="text-center">
                                <Image src="/img/mobile-1.webp" fluid alt="Activation Process" />
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col md={6} sm={12} xs={12}>
                                <h4 className="text-center">OR</h4>
                                <p><b>Step 2.2:</b> Open Settings &#129058; Go to Connections &#129058; SIM manager &#129058; Add eSIM</p>
                                <ul>
                                    <li>Then click &quot;Scan QR code from service provider&quot;</li>
                                    <li>Now scan the QR code on your compatible Android phone provided</li>
                                </ul>
                                <p className="body22"><b>Step 3:</b> Tap to Done</p>
                                <ul>
                                    <li>When initiated, tap &quot;Add&quot;</li>
                                    <li>Wait for up to 5 minutes to activate eSIM</li>
                                    <li>Tap &quot;Done&quot;</li>
                                </ul>
                                <p className="body22"><b>Step 4:</b> Verify the OTP</p>
                                <ul>
                                    <li>Enter six digit OTP number that you&apos;ll receive on your registered Zoiko Mobile number.</li>
                                </ul>
                                <p className="body22"><b>Step 5:</b> Set Up Your eSIM</p>
                                <p><b>Step 5.1:</b> Set a new Zoiko Mobile plan for &quot;Calls&quot; and &quot;Messages&quot; to your original primary SIM or secondary line, depending on your preference.</p>
                                <h4 className="text-center">OR</h4>
                                <p><b>Step 5.2:</b> Set a new Zoiko Mobile plan for &quot;Calls&quot; and &quot;Messages&quot; to your original primary SIM or secondary line, depending on your preference.</p>
                                <p className="body22"><b>Step 5:</b> Set Up Data Roaming</p>
                                <ul>
                                    <li>Click &quot;Settings&quot; &#129058; Go to &apos;Connections&apos; &#129058; Tap &apos;Mobile networks&apos; &#129058; Turned ON &apos;Data roaming&apos;.</li>
                                </ul>
                            </Col>
                            <Col md={6} sm={12} xs={12} className="text-center">
                                <Carousel>
                                    <CarouselItem>
                                        <Image src="/img/mobile-img1.webp" fluid alt="Step 1" />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <Image src="/img/mobile-img2.webp" fluid alt="Step 2" />
                                    </CarouselItem>
                                </Carousel>
                                <br />
                                <Carousel>
                                    <CarouselItem>
                                        <Image src="/img/mobile-img3.webp" fluid alt="Step 1" />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <Image src="/img/mobile-img4.webp" fluid alt="Step 2" />
                                    </CarouselItem>
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey={'iphone'} title="iPhone">
                    <Container className="txtblack body20 py-4">
                        <Row className="align-items-center">
                            <Col md={6} sm={12} xs={12}>
                                <h2>Configure an eSIM on your iPhone.</h2>
                                <p>Follow these below steps to easily configure Zoiko Mobile eSIM on your iPhone:</p>
                                <p className="body22"><b>Step 1:</b> Connect your iPhone with a cellular Data Network or nearby strongest Wi-Fi</p>
                                <p className="body22"><b>Step 2:</b> Open Settings</p>
                                <ul>
                                    <li>Tap Settings to open &#129058; Go to &apos;Mobile Services&apos; &#129058; And Tap it</li>
                                </ul>
                                <p className="body22"><b>Step 3:</b> Go to Mobile Service</p>
                                <ul>
                                    <li>Open Mobile service &#129058; Tap on &apos;Add eSIM&apos;</li>
                                </ul>
                                <p className="body22"><b>Step 4:</b> Go to Setup Mobile Services</p>
                                <ul>
                                    <li>Open setup mobile service &#129058; Tap &apos;USE QR code&apos;</li>
                                </ul>
                                <p className="body22"><b>Step 5:</b> Open QR Code</p>
                                <ul>
                                    <li>Open QR code image &#129058; Scan QR code of the eSIM</li>
                                </ul>
                                <p className="body22"><b>Step 6:</b> How To Turn On eSIM Line</p>
                                <ul>
                                    <li>Go to Settings &#129058; Tap Cellular or Mobile data (depending on your iPhone model).</li>
                                    <li>Go to the eSIM line you already installed (it will shown, e.g., &apos;Zoiko Mobile eSIM&apos;).</li>
                                    <li>Toggle the &apos;ON&apos; in the &apos;Turn On This Line&apos; button.</li>
                                </ul>
                                <p className="body22"><b>Step 7:</b> Activate Data Roaming</p>
                                <ul>
                                    <li>Go to settings &#129058; Tap on Mobile Service.</li>
                                    <li>Scroll to find Primary &#129058; Tap the &apos;ON&apos;.</li>
                                    <li>Scroll down to find &apos;Data Roaming&apos;.</li>
                                    <li>Toggle the switch &apos;ON&apos; to activate Data Roaming</li>
                                </ul>
                            </Col>
                            <Col md={6} sm={12} xs={12} className="text-center">
                                <Image src="/img/iphone1.webp" fluid alt="Activation Process" />
                                <br />
                                <Image src="/img/iphone2.webp" fluid alt="Activation Process" />
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey={'ipad'} title="iPad">
                    <Container className="txtblack body20 py-4">
                        <Row className="align-items-center">
                            <Col md={6} sm={12} xs={12}>
                                <h2>Easy Steps to Configure an eSIM on your iPad</h2>
                                <p>Purchase an eSIM Plan</p>
                                <p className="body22"><b>Step 1:</b> Order your eSIM plan from Zoiko Mobile. You&apos;ll receive a QR code via email.</p>
                                <ul>
                                    <li>Open the Settings app on your iPad</li>
                                    <li>Tap Cellular or Mobile Data.</li>
                                    <li>Select a carrier (Zoiko Mobile)</li>
                                    <li>Add a Cellular Plan.</li>
                                </ul>
                                <p className="body22"><b>Step 2:</b> Scan a QR code provided by a carrier</p>
                                <ul>
                                    <li>Open the Camera &#129058; Correctly position your iPad</li>
                                    <li>Scan QR code provided by Zoiko Mobile</li>
                                    <li>Tap Continue.</li>
                                    <li>Press Add Mobile Data Plan.</li>
                                </ul>
                                <p className="body22"><b>Step 3:</b> Set Up Your eSIM</p>
                                <ul>
                                    <li>Choose your new Zoiko Mobile plan as the default line or Secondary line, depending on your preference.</li>
                                    <li>Adjust settings for the iMessage app</li>
                                    <li>Adjust settings for FaceTime</li>
                                    <li>Adjust settings for mobile data usage</li>
                                </ul>
                                <p className="body22"><b>Step 4:</b> Activate and Confirm</p>
                                <ul>
                                    <li>Your iPhone will automatically activate the plan once the eSIM is added.</li>
                                    <li>You&apos;ll receive a confirmation message, and your eSIM will be ready to use.</li>
                                </ul>
                            </Col>
                            <Col md={6} sm={12} xs={12} className="text-center">
                                <Image src="/img/ipad.webp" fluid alt="Activation Process" />
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey={'watch'} title="Smart Watch">
                    <Container className="txtblack body20 py-4">
                        <Row className="align-items-center">
                            <Col md={6} sm={12} xs={12}>
                                <h2>Easy Steps to Configure an eSIM on your Apple Watch</h2>
                                <p>Install an eSIM On Your Apple Watch</p>
                                <p className="body22"><b>Step 1:</b> iPhone &amp; Apple Watch Pairing</p>
                                <ul>
                                    <li>Hold your iPhone next to your Apple Watch until the pairing screen appears on your iPhone, then tap &apos;Continue&apos;.</li>
                                    <li>Press to turn on the pairing process between your Apple Watch and iPhone.</li>
                                    <li>Read &apos;Terms &amp; Conditions&apos; carefully before tapping to Agree and submit.</li>
                                </ul>
                                <p className="body22"><b>Step 2:</b> Enter Apple ID &amp; Passcode</p>
                                <ul>
                                    <li>Tap Sign-In with your Apple ID &#129058; Enter passcode to continue</li>
                                    <li>Press “Create a Passcode” to create a 4 digits password on your Apple Watch</li>
                                </ul>
                                <p className="body22"><b>Step 3:</b> Mobile Data Setup</p>
                                <ul>
                                    <li>Press &quot;Cellular Data Ready&quot; to transfer your Zoiko Mobile Prepaid/Postpaid number and plan with Apple Watch</li>
                                </ul>
                                <p className="body22"><b>Step 4:</b> Activate Wireless Service</p>
                                <ul>
                                    <li>Select &quot;Continue&quot; to navigate wireless service on your Apple Watch</li>
                                    <li>Enter your Zoiko Mobile Prepaid/Postpaid number and self-created passcode</li>
                                </ul>
                                <p>(Note - If fail to register, then press on &apos;Unable to login&apos; and register your phone number)</p>
                                <p className="body22"><b>Step 5:</b> Start Sign Up Process</p>
                                <ul>
                                    <li>Review your plan, features &amp; services &#129058; Press &quot;Sign Up&quot; to begin the syncing process</li>
                                </ul>
                                <p className="body22"><b>Step 6:</b> Allow Apple Watch To Sync</p>
                                <ul>
                                    <li>Tap &apos;Continue&apos; &#129058; Wait for 10 minutes to complete sync with your Zoiko Mobile number and prepaid/postpaid plan to Apple Watch.</li>
                                </ul>
                            </Col>
                            <Col md={6} sm={12} xs={12} className="text-center">
                                <Image src="/img/watch1.webp" fluid alt="Activation Process" />
                                <br />
                                <Image src="/img/watch2.webp" fluid alt="Activation Process" className="py-4" />
                                <br />
                                <Image src="/img/watch3.webp" fluid alt="Activation Process" />
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey={'tablet'} title="Samsung Tablet">
                    <Container className="txtblack body20 py-4">
                        <h3 className="text-center">Easy Steps to Configure an eSIM on your Samsung Tablet!</h3>
                        <p className="text-center">Before activating the eSIM, make sure your tablet is unlocked.</p>
                        <Row className="align-items-center">
                            <Col md={6} sm={12} xs={12}>
                                <p>Watch this tutorial and learn from basics on how to activate eSIM on your Samsung Galaxy Tab S10 Ultra 5G <a href="https://www.youtube.com/watch?v=NZcraTI14Ag" className="txtred">https://www.youtube.com/watch?v=NZcraTI14Ag</a></p>
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/NZcraTI14Ag?si=R9ufoUqNvxXQKRBw" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </Col>
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
            <hr />
            <h4 className="text-center">Steps to check USA eSIM device Compatibility?</h4>
            <div className="mx-auto w-50 w-sm-100 py-4">
                <ul className="redbullet">
                    <li>Dial *#06# and call that number</li>
                    <li>A flash SMS message will show on your mobile screen if your device supports eSIM.</li>
                    <li> It can show your device&apos;s eSIM EID (unique identification number)</li>
                    <li>It means your device is eSIM compatible.</li>
                </ul>
                <p>For more help, please call us at 611 from your Zoiko Mobile number or WhatsApp us at: 512-743-4894</p>
            </div>
        </Container>
        <Footer />
        </>
    );
}
export default ActivateESIM;
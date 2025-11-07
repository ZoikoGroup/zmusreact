"use client"
import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";
import { Button, Col, Container, Row, Card, CardBody, Image } from "react-bootstrap";
import Testimonials from "../components/Testimonials";

export default function Plans () {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Zoiko Prepaid Plan</>} />
        <Container fluid className="bglite">
            <Container className="py-5 w-75">
                <h2>Zoiko Flex</h2>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none"><path d="M2.152 19.062a2.02 2.02 0 0 1-1.484-.617 2.02 2.02 0 0 1-.617-1.484V2.253q0-.867.617-1.484A2.02 2.02 0 0 1 2.152.15h18.91q.867 0 1.484.618.618.617.617 1.484V16.96q0 .866-.617 1.484a2.02 2.02 0 0 1-1.484.617zm0-2.101h18.91V2.253H2.152zm16.81-8.405h-3.153v2.101h1.051v2.101h-3.152V6.455h5.253q0-.867-.617-1.484a2.02 2.02 0 0 0-1.484-.617h-3.152q-.867 0-1.484.617a2.02 2.02 0 0 0-.617 1.484v6.303q0 .867.617 1.484.618.617 1.484.617h3.152q.867 0 1.484-.617t.617-1.484zM4.252 14.86h4.202q.867 0 1.484-.618.618-.617.618-1.484v-2.1q0-.868-.618-1.485a2.02 2.02 0 0 0-1.484-.617h-2.1V6.455h4.202V4.354H4.253v6.303h4.202v2.101H4.253z" fill="#DF1E5A"/></svg>
                    <span className="p-0">Unlimited High Speed 5G Data*</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M10.682 3.085V.983h10.505v2.102zm0 4.202V5.186h10.505v2.1zm0 4.202V9.388h10.505v2.101zm7.301 10.506q-3.283 0-6.487-1.431t-5.831-4.058-4.058-5.831T.176 4.188q0-.473.315-.788t.788-.315h4.255q.368 0 .656.25a.96.96 0 0 1 .342.59l.683 3.677q.053.42-.027.71a1.1 1.1 0 0 1-.289.498l-2.547 2.574q.525.972 1.247 1.878a19 19 0 0 0 1.59 1.747 19 19 0 0 0 1.707 1.51 17 17 0 0 0 1.89 1.274l2.47-2.47q.236-.236.617-.354.38-.118.748-.065l3.625.735q.367.105.604.38.236.277.236.618v4.255q0 .473-.315.788a1.07 1.07 0 0 1-.788.315M3.353 9.388l1.734-1.733-.446-2.47H2.303q.132 1.078.368 2.128t.683 2.075m9.404 9.403q1.023.446 2.088.709 1.063.263 2.14.341V17.53l-2.469-.499z" fill="#DF1E5A"/></svg>
                    <span className="p-0">1500 Minutes Talk &amp; 10000 Texts</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="m2.304 20.146 16.81-16.862v16.862zm12.607-2.102h2.101V8.38l-2.1 2.101zM7.61 10.795q-.63 0-1.103-.472a1.5 1.5 0 0 1-.473-1.103q0-.63.473-1.104.472-.472 1.103-.472.63 0 1.103.472.473.473.473 1.104 0 .63-.473 1.103-.473.472-1.103.472M4.248 7.33 2.882 5.963q.997-.999 2.206-1.471a6.9 6.9 0 0 1 2.522-.473q1.313 0 2.521.473t2.206 1.47L10.972 7.33a4.8 4.8 0 0 0-1.576-1.064 4.68 4.68 0 0 0-3.572 0A4.8 4.8 0 0 0 4.248 7.33m-2.68-2.732L.204 3.284Q1.753 1.734 3.67.959A10.4 10.4 0 0 1 7.61.185q2.022 0 3.966.774a10.3 10.3 0 0 1 3.493 2.325l-1.366 1.313a8 8 0 0 0-2.85-1.865 9.1 9.1 0 0 0-3.243-.604 8.9 8.9 0 0 0-3.218.604Q2.83 3.337 1.57 4.597" fill="#DF1E5A"/></svg>
                    <span className="p-0">4GB Premium Data(Speed May Reduce After)</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none"><path d="M3.2 15.732a10.6 10.6 0 0 1-2.297-3.401 10.2 10.2 0 0 1-.801-4.005q0-2.101.8-4.006a10.6 10.6 0 0 1 2.3-3.4l1.26 1.26a8.8 8.8 0 0 0-1.904 2.824 8.5 8.5 0 0 0-.67 3.323 8.5 8.5 0 0 0 .67 3.322q.67 1.59 1.904 2.823zm2.417-2.416a6.9 6.9 0 0 1-1.523-2.285 7.1 7.1 0 0 1-.526-2.705q0-1.419.526-2.706a6.9 6.9 0 0 1 1.523-2.285l1.26 1.261a5.1 5.1 0 0 0-1.142 1.72 5.4 5.4 0 0 0-.38 2.01q0 1.05.38 2.009.381.958 1.143 1.72zm3.94 6.566v-9.14a2.6 2.6 0 0 1-1.143-.972 2.57 2.57 0 0 1-.433-1.444q0-1.104.762-1.865.761-.762 1.864-.762t1.865.762.762 1.865q0 .787-.434 1.444t-1.142.972v9.14zm6.04-6.566-1.26-1.26a5.1 5.1 0 0 0 1.142-1.721q.381-.96.381-2.01t-.38-2.009a5.1 5.1 0 0 0-1.143-1.72l1.26-1.26a6.9 6.9 0 0 1 1.524 2.284q.525 1.287.525 2.706a7.1 7.1 0 0 1-.525 2.705 6.9 6.9 0 0 1-1.523 2.285m2.417 2.416-1.26-1.26a8.8 8.8 0 0 0 1.903-2.824 8.5 8.5 0 0 0 .67-3.322 8.5 8.5 0 0 0-.67-3.323 8.8 8.8 0 0 0-1.904-2.823l1.26-1.261a10.6 10.6 0 0 1 2.3 3.401q.8 1.905.8 4.006t-.8 4.005a10.6 10.6 0 0 1-2.3 3.401" fill="#DF1E5A"/></svg>
                    <span className="p-0">1GB Mobile Hotspot</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="m20.01 21.507-3.1-3.1v2.338h-2.1V14.81h5.935v2.1h-2.363l3.099 3.1zm-9.403-.394a10.2 10.2 0 0 1-4.097-.827 10.6 10.6 0 0 1-3.335-2.246 10.6 10.6 0 0 1-2.246-3.335 10.2 10.2 0 0 1-.827-4.098q0-2.18.827-4.097a10.6 10.6 0 0 1 2.246-3.335A10.6 10.6 0 0 1 6.51.929a10.2 10.2 0 0 1 4.097-.827q2.181 0 4.098.827a10.6 10.6 0 0 1 3.335 2.246 10.6 10.6 0 0 1 2.246 3.335 10.2 10.2 0 0 1 .827 4.097 10.6 10.6 0 0 1-.21 2.102h-2.154q.132-.525.197-1.051a8.5 8.5 0 0 0-.197-3.152h-3.572a14.3 14.3 0 0 1 .119 3.152q-.04.525-.119 1.05h-2.1a14 14 0 0 0 .157-2.1 14 14 0 0 0-.158-2.102H8.138a14 14 0 0 0-.157 2.101 14 14 0 0 0 .157 2.102h3.52v2.1H8.61q.315 1.13.814 2.168.5 1.037 1.182 1.982.525 0 1.05-.065.526-.066 1.052-.118v2.153q-.525.053-1.051.119-.525.065-1.05.065M2.465 12.71h3.572a14 14 0 0 1-.157-2.102 14 14 0 0 1 .157-2.1H2.465q-.13.525-.197 1.05a8.5 8.5 0 0 0 .197 3.152m.893-6.304h3.1a16 16 0 0 1 1.418-3.73 7.9 7.9 0 0 0-2.6 1.432 8.3 8.3 0 0 0-1.918 2.298M7.876 18.54a16 16 0 0 1-1.418-3.73h-3.1a8.3 8.3 0 0 0 1.918 2.299 7.9 7.9 0 0 0 2.6 1.431M8.61 6.405h3.992a13 13 0 0 0-1.996-4.15 13 13 0 0 0-1.996 4.15m6.146 0h3.1a8.3 8.3 0 0 0-1.918-2.298 7.9 7.9 0 0 0-2.6-1.432q.472.894.827 1.826t.591 1.904" fill="#DF1E5A"/></svg>
                    <span className="p-0">Free International Calls to 70+ Countries</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none"><path d="M3.355 17.961h2.101v-2.1H3.355zm0-4.202h2.101V9.557H3.355zm4.202 4.202h2.101V13.76h-2.1zm0-6.303h2.101V9.557h-2.1zm4.202 6.303h2.102v-2.1h-2.102zm0-4.202h2.102V9.557h-2.102zm-9.455 7.354a2.02 2.02 0 0 1-1.484-.617 2.02 2.02 0 0 1-.617-1.484V6.405L6.507.102h8.404q.867 0 1.484.617t.617 1.484v16.809q0 .866-.617 1.484a2.02 2.02 0 0 1-1.484.617zm0-2.101h12.607V2.202H7.4L2.304 7.299z" fill="#DF1E5A"/></svg>
                    <span className="p-0">Free SIM Card</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none"><path d="m16.91 18.537-4.201-4.203 4.202-4.202 1.47 1.47-1.654 1.682h4.386v2.1h-4.386l1.655 1.682zM2.204 18.01a2.02 2.02 0 0 1-1.484-.617 2.02 2.02 0 0 1-.617-1.484v-3.152q0-.866.617-1.483a2.02 2.02 0 0 1 1.484-.618h6.303q.867 0 1.484.617.618.618.617 1.484v3.152q0 .867-.617 1.484a2.02 2.02 0 0 1-1.484.617zm0-2.1h6.303v-3.153H2.203zm2.1-6.83-1.47-1.47 1.654-1.68H.102V3.828h4.386l-1.655-1.68L4.303.677l4.203 4.202zm8.406-.525a2.02 2.02 0 0 1-1.484-.617 2.02 2.02 0 0 1-.618-1.484V3.303q0-.867.618-1.484a2.02 2.02 0 0 1 1.484-.617h6.303q.866 0 1.484.617.617.617.617 1.484v3.152q0 .867-.617 1.484a2.02 2.02 0 0 1-1.484.617zm0-2.101h6.303V3.303H12.71z" fill="#DF1E5A"/></svg>
                    <span className="p-0">Free Delivery</span>
                </div>
                <div className="planbox d-flex flex-row p-2 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 15 24" fill="none"><path d="m11.81 10.557-4.202 4.202-4.202-4.202 1.47-1.471 1.681 1.628v-4.36H8.66v4.36l1.68-1.628zm-6.303 9.455h4.202v-1.05H5.507zm-3.152 3.151a2.02 2.02 0 0 1-1.484-.617 2.02 2.02 0 0 1-.617-1.484V2.152q0-.867.617-1.484A2.02 2.02 0 0 1 2.355.051h10.506q.867 0 1.484.617t.617 1.484v18.91q0 .867-.617 1.484a2.02 2.02 0 0 1-1.484.617zm0-5.252v3.151h10.506v-3.151zm0-2.102h10.506V5.304H2.355zm0-12.606h10.506V2.152H2.355z" fill="#DF1E5A"/></svg>
                    <span className="p-0">eSIM available</span>
                </div>
                <div className="text-center pt-4">
                    <Button variant="danger" size="lg" href="#">Continue To Checkout</Button>
                </div>
            </Container>
        </Container>
        <Container fluid className="bglite p-5 whychoose">
            <h2 className="text-center pb-3">Zoiko Mobile Prepaid Plan Features</h2>
            <Row className="gx-3">
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/rss_feed.png" fluid className="icw10 mb-3" alt="Plan Flexibility"  />
                            <p><span className="txtred body22">Unlimited 5G and 4G LTE Data</span><br />
                            Enjoy reliable, ultra-fast data, even during peak hours. Stream, browse, and work with confidence, knowing you have access to unlimited data.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/text.png" fluid className="icw10 mb-3" alt="Plan Flexibility"  />
                            <p><span className="txtred body22">Unlimited Talk &amp; Text</span><br />
                            Stay connected to family, friends, and colleagues across the U.S. with unlimited calls and text messages, ensuring seamless communication wherever you are.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/5g-solid.png" fluid className="icw10 mb-3" alt="Sustainablity"  />
                            <p><span className="txtred body22">Nationwide 5G & 4G Coverage</span><br />
                            Get dependable coverage from cities to rural areas. No matter where you are, Zoiko Mobile provides seamless connectivity across the nation.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/hotspot.png" fluid className="icw10 mb-3" alt="Sustainablity"  />
                            <p><span className="txtred body22">Mobile Hotspot Access</span><br />
                            Share your mobile data with other devices, such as laptops or tablets, at no extra cost. Stay connected on the go, whether you are at work, school, or traveling.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row className="gx-3">
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/devices_other.png" fluid className="icw10 mb-3" alt="AI Powred" />
                            <p><span className="txtred body22">Affordable Device Protection</span><br />
                            Protect your device from accidental damage, loss, or theft with affordable and customizable device protection plans, giving you peace of mind.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/finance_chip.png" fluid className="icw10 mb-3" alt="Regulatory"  />
                            <p><span className="txtred body22">Simple and Transparent Pricing</span><br />
                            No hidden fees - just clear and competitive pricing. Zoiko Mobile&quot;s plans offer simplicity and transparency so you always know what to expect.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/phone.png" fluid className="icw10 mb-3" alt="Customer Support"  />
                            <p><span className="txtred body22">Free International Roaming</span><br />
                            Make international calls and roam freely in Canada and Mexico without the extra charges. Stay in touch with loved ones abroad without worrying about costs.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/customer-support.png" fluid className="icw10 mb-3" alt="Customer Support"  />
                            <p><span className="txtred body22">Priority Customer Support</span><br />
                            Get faster and more personalized, priority customer service, ensuring that any issue is quickly addressed by our dedicated support team.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Testimonials />
        <Footer />
        </>
    );
}
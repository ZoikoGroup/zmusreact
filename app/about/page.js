"use client"
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Image, Row } from "react-bootstrap";

const AboutUs = () => {

    const [isToggled, setIsToggled] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const toggleView = () => {
        setOpen(!isOpen);
        setIsToggled(!isToggled);
    }

    return (
        <>
        <Header />
        <HeadBar text={<>The Zoiko Philosophy: Innovate | Connect | Communicate</>} />
        <Container fluid className="bglite py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}>
                        <h2 className="txtred">The Zoiko Mobile Chronicle:</h2>
                        <p className="body22">Connecting Every Possibility! <span className="txtred">Inspired by Animals, Music &amp; Nature.</span></p>
                        <p className="body22">Zoiko Mobile is more than a telecommunications company; it is the embodiment of a deeply rooted vision, shaped by intellect, passion, and an intricate blend of influences from philosophy, language, mathematics, and music. Founded by Lennox McLeod, Zoiko Mobile is a living testament to the boundless possibilities that arise when diverse passions converge with professional experience and insight.</p>
                        {isOpen && (
                            <>
                            <p className="body22"><b>Lennox&apos;s</b> formative years were defined by a profound connection to animals and a rich theological education. While studying theology, he was introduced to the ancient Greek language, a discovery that sparked a lifelong admiration for its elegance and complexity. During his career, Lennox spent years working on projects at Vodafone, where he gained invaluable experience and first encountered the concept of an MVNO (Mobile Virtual Network Operator). This exposure planted the seed for what would eventually become Zoiko Mobile.</p>
                            <p className="body22"><b>A Name Born of Passion, Experience, and Intellect</b><br />To symbolize animals, Lennox drew upon the Greek language he so deeply revered. He discovered two ancient Greek words: Zoion (ζῷον), meaning &quot;a living being or animal,&quot; and Zoologikos (ζῳολογικός), meaning &quot;pertaining to animals.&quot; However, neither word, in isolation, fully captured the depth and dynamism of his vision.</p>
                            <p className="body22">This challenge led Lennox to mathematics, another of his great passions, and specifically to the principles of permutations and combinations. Drawing on his professional experience and intellectual creativity, he devised a solution by merging fragments of the two Greek words to create something entirely new. He took &apos;zoi&apos; from Zoion and &apos;ko&apos; from Zoologikos. The resulting name, Zoiko, is a linguistic innovation that embodies the vibrancy of life and the interconnectedness of all living beings. It symbolizes the core message of Zoiko Mobile: a network that values life, connection, and harmony.</p>
                            </>
                        )}
                        <div className="py-4"><a className="txtred" href="#" onClick={toggleView}>{isToggled ? 'Read Less' : 'Read More'}</a></div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <div className="text-center">
                            <Image src="/img/aboutlogo.png" fluid alt="Logo" className="w-100" />
                        </div>
                    </Col>
                </Row>
            </Container>
            <h4 className="text-center pt-5 txtred">Why Zoiko Mobile Is Your First Choice?</h4>
            <div className="pinkboxwraper gap-4 justify-content-center pt-2">
                <div className="pinkboxlite">
                    <Image src="/img/icons/phone5g.png" fluid alt="5G Phone" />
                    <p className="bodysm pt-3"><span className="txtred body22">Free Fre 5G Access</span><br />You get nationwide premium coverage on the USA&apos;s largest 5G network for absolutely free than overpriced providers charge.</p>
                </div>
                <div className="pinkboxlite">
                    <Image src="/img/icons/iconeye.png" fluid alt="Data Shareing" />
                    <p className="bodysm pt-3"><span className="txtred body22">We Sell Online</span><br />Skip the retail stores—we&apos;re now on Online Sale! Our no-cash delivery and &quot;no-fuss&quot; returns get you saved huge. Best place to buy your USA mobile bundle deals online.</p>
                </div>
                <div className="pinkboxlite">
                    <Image src="/img/icons/nopay.png" fluid alt="No Pay" />
                    <p className="bodysm pt-3"><span className="txtred body22">No Pay International Calls</span><br />We&apos;re on a 100% free international calling service. No spend extra tomake international calls to loved ones back home in 200+ countries.</p>
                </div>
                <div className="pinkboxlite">
                    <Image src="/img/icons/nocredit.png" alt="No credit" />
                    <p className="bodysm pt-3"><span className="txtred body22">No Credit Check Deals</span><br />Bad credit history? No worry, you still get no-contract mobile bundle deals USA without the fuss of credit checks.</p>
                </div>
                <div className="pinkboxlite">
                    <Image src="/img/icons/flexysim.png" fluid alt="Flexy SIM Plan Options" />
                    <p className="bodysm pt-3"><span className="txtred body22">Flexy SIM Plan Options</span><br />Choosing Zoiko Mobile&apos;s best SIM plans USA means getting lots of data, unlimited calls, SMS, free international calls, and a mobile hotspot at home.</p>
                </div>
            </div>
        </Container>
        <Container fluid className="aboutbg position-relative">
            <div className="position-absolute d-none d-md-block start-50 w-50 px-5" style={{top:'30%'}}>
                <h4 className="txtred">Rhythmic Love Hits On the Right Tune!</h4>
                <p><b>Zoiko Mobile&apos;s</b> philosophy does not end with its name. Lennox&apos;s fourth love, music, also plays a pivotal role in the company&apos;s identity. Surrounded by music throughout his early years, he understood its universal language and transformative power. By weaving the themes of nurture, care, and rhythm, <b>Zoiko Mobile</b> embodies a unique ethos: it is <b>The Animal and Music Loving Network.</b></p>
            </div>
            <div className="position-absolute d-md-none d-sm-block px-5">
                <h4 className="txtred">Rhythmic Love Hits On the Right Tune!</h4>
                <p><b>Zoiko Mobile&apos;s</b> philosophy does not end with its name. Lennox&apos;s fourth love, music, also plays a pivotal role in the company&apos;s identity. Surrounded by music throughout his early years, he understood its universal language and transformative power. By weaving the themes of nurture, care, and rhythm, <b>Zoiko Mobile</b> embodies a unique ethos: it is <b>The Animal and Music Loving Network.</b></p>
            </div>
        </Container>
        <Container fluid className="bglite py-5">
            <h4 className="txtred text-center">Connecting Every Possibility</h4>
            <hr />
            <Container>
                <p>At Zoiko Mobile, our mission transcends conventional telecommunications. We strive to harmonize technology with the principles of compassion, creativity, and innovation. Our tagline, Connecting Every Possibility, reflects this mission, serving as both a guiding philosophy and an enduring commitment.</p>
                <p>Today, Zoiko Mobile offers innovative and accessible solutions that enhance the mobile experience. From affordable prepaid plans with 4G and 5G compatibility to budget-friendly international roaming options, our services are designed to connect people in seamless and meaningful ways.</p>
            </Container>
        </Container>
        <Container fluid className="bglite pb-5">
            <h4 className="txtred text-center">An Inspired Legacy</h4>
            <hr />
            <Container className="pb-4">
                <p>Zoiko Mobile stands as a testament to the power of interdisciplinary thinking, professional expertise, and the relentless pursuit of excellence. Lennox McLeod&apos;s unique blend of theological insight, linguistic reverence, mathematical ingenuity, musical inspiration, and professional experience has created a company that redefines how we connect.</p>
                <p>Join us as we shape a future where technology, compassion, and creativity coexist harmoniously. Together, we can transform every possibility into reality. Welcome to Zoiko Mobile - a world where animals, music, and human connection are celebrated, and where innovation knows no bounds.</p>
            </Container>
            <hr />
            <Container className="pb-4">
                <p>According to J.D Power, around 341 million North American mobile subscribers now use cell phones, now average U.S. wireless subscribers pay less (approximately 9.61%) on monthly bills, compared to $156 in 2023. Why are they overpaying for their mobile service bills? Is it okay to spend too much? We believe it&apos;s still paying way too expensive, especially in unlimited plans use context. That&apos;s why we kicked off Zoiko Mobile USA prepaid and postpaid SIM deals.</p>
                <p>This study has drawn our attention, in most cases, that causes of dissatisfaction had taken place on in-store device purchases due to no basic information being shared. That&apos;s the reason we giving upward trajectory onto our online or in-app store purchase system. So, you may check the correct information on new device purchases - and we deliver an opportunity to solidify customer loyalty and maximum values.</p>
                <p>At Zoiko Mobile, you will pay as you go for the data, talk time, text balance, and international calling balance you need; plus you will enjoy prompt customer support and flexibility on your go if a change in your plan is needed. We also have an online shop where we only sell certified re-newed smartphones at low cost and the latest model smartphones from popular brands.</p>
            </Container>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}>
                        <Image src="/img/aboutimg.webp" fluid alt="About" />
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <p>We founded based on the proposition to at large American mobile subscribers from pricey, tricky contracts, where we uniquely provide nationwide 5G network coverage across the USA; it builts users&apos; on-demand network scalability, and easy switch ability, at any time.</p>
                        <p>No contracts USA mobile bundle deals give a release from confinement to mobile subscribers to customize their cheap mobile plans USA and verify bills on their used mobile network in a month, so they only pay what they use, and never overpay on monthly rolling bills. Our on-priority customer support is our key to win.</p>
                    </Col>
                </Row>
                <h4 className="text-center txtred pt-5">Frequently Asked Questions</h4>
                <Accordion className="mx-auto">
                    <AccordionItem eventKey="0">
                        <AccordionHeader>Why is Zoiko Mobile known as the animal and music-loving network?</AccordionHeader>
                        <AccordionBody>At Zoiko Mobile, we&apos;re all about celebrating what brings people together—whether it&apos;s the love of animals or the universal connection of music. By blending technology with heart, we create a network built on compassion, creativity, and connection, making us the perfect choice for anyone who shares these passions.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="1">
                        <AccordionHeader>How does Zoiko Mobile support animal and music-related causes?</AccordionHeader>
                        <AccordionBody>We&apos;re passionate about giving back. From partnerships and donations to advocacy efforts, Zoiko Mobile actively supports initiatives that make a difference in the lives of animals and in music communities across the United States.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="2">
                        <AccordionHeader>How can I find out more about Zoiko Mobile&apos;s initiatives?</AccordionHeader>
                        <AccordionBody>Dive into The Zoiko Mobile Chronicle and our Sustainability section on the website to discover how we infuse our love for animals and music into everything we do.<br />Still have questions? Our customer service team is here for you! Reach out at support@zoikomobile.com or call us at 800-988-8116.</AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default AboutUs;
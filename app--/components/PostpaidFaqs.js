"use client"
import { Container, Tab, Tabs, Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Row } from 'react-bootstrap';

function PostpaidFaqs() {
    return (
        <Container fluid className='bglite'>
            <Container className="justify-content-center p-5">
                <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-4" fill>
                    <Tab eventKey="home" title="General Questions">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>What are Zoiko Mobile Postpaid Plans?</AccordionHeader>
                                        <AccordionBody>Zoiko Mobile&apos;s postpaid plans offer unlimited talk, text, and generous high-speed data with no hidden fees. These plans come with flexible contract options (12 or 24 months) and include perks like free international calling, mobile hotspot data, and roaming benefits.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>What&apos;s the difference between postpaid and prepaid plans?</AccordionHeader>
                                        <AccordionBody>With postpaid plans, you get a monthly bill based on your chosen plan and any additional services you use. Prepaid plans require you to pay upfront each month. Postpaid plans often include extra perks, such as device financing, premium support, and unlimited data options.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="2">
                                        <AccordionHeader>Do I need to sign a contract?</AccordionHeader>
                                        <AccordionBody>Yes, Zoiko Mobile postpaid plans come with either a 12-month or 24-month contract, depending on the plan you choose. Longer contracts may offer better rates and additional perks.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="3">
                                        <AccordionHeader>Are there any activation or hidden fees?</AccordionHeader>
                                        <AccordionBody>No! Zoiko Mobile believes in transparent pricing. There are no activation fees, hidden taxes, or surprise charges. What you see is what you pay.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Can I bring my own device (BYOD)?</AccordionHeader>
                                        <AccordionBody>Absolutely! If your device is unlocked and compatible with our network, you can bring it to Zoiko Mobile. You can check compatibility on our website before signing up.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Does Zoiko Mobile offer financing for new phones?</AccordionHeader>
                                        <AccordionBody>Yes! You can finance the latest smartphones through Zoiko Mobile&apos;s device financing program. Choose from affordable monthly payment options that fit your budget.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="2">
                                        <AccordionHeader>How does free international calling work?</AccordionHeader>
                                        <AccordionBody>All Zoiko Mobile postpaid plans include unlimited international calls to over 200 countries, so you can stay connected with family and friends without worrying about extra charges.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="3">
                                        <AccordionHeader>Can I switch plans if my needs change?</AccordionHeader>
                                        <AccordionBody>Yes! If you need more data, extra hotspot allowance, or additional perks, you can upgrade your plan anytime. Downgrades may be subject to contract terms, so check with customer support before making changes.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="Zoiko Mobile Postpaid Personal Plans">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Which postpaid plan is best for me?</AccordionHeader>
                                        <AccordionBody>
                                            <ul>
                                                <li>Zoiko Lite - Best for light users who need basic data and reliable connectivity.</li>
                                                <li>Zoiko Core - Perfect for everyday users who want reliable data and priority support.</li>
                                                <li>Zoiko Max - Ideal for streamers, gamers, and heavy users who need high-speed unlimited data.</li>
                                                <li>Zoiko Infinity - Premium plan with no data throttling, VIP support, and device financing options.</li>
                                                <li>Zoiko Supreme Unlimited - The ultimate experience with truly unlimited high-speed data, hotspot access, and premium perks</li>
                                            </ul>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Will my data slow down after a certain limit?</AccordionHeader>
                                        <AccordionBody>
                                            <ul>
                                                <li>Zoiko Lite &amp; Zoiko Core: You get a set amount of high-speed data each month.</li>
                                                <li>Zoiko Max: Speeds may slow down after 20GB of high-speed usage.</li>
                                                <li>Zoiko Infinity &amp; Zoiko Supreme Unlimited: No slowdowns—truly unlimited high-speed data all the time!</li>
                                            </ul>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="2">
                                        <AccordionHeader>Does Zoiko Mobile offer family plans?</AccordionHeader>
                                        <AccordionBody>Yes! You can add multiple lines under a Zoiko Family Plan, sharing data and saving on your monthly bill. Contact customer support to create a custom plan for your family.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Do postpaid plans include mobile hotspot data?</AccordionHeader>
                                        <AccordionBody>Yes! Each plan includes a set amount of mobile hotspot data, so you can share your connection with other devices. Zoiko Premium offers the highest hotspot allowance.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Can I use my Zoiko Mobile plan while traveling?</AccordionHeader>
                                        <AccordionBody>Yes! All Zoiko Mobile postpaid plans include free roaming in Canada and Mexico. If you need service in other countries, you can purchase Zoiko Global Pass for international travel.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="longer-tab" title="Billing, Payments & Account Management">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>How will I receive my bill?</AccordionHeader>
                                        <AccordionBody>Zoiko Mobile sends digital invoices to your registered email each month. You can also view and pay your bill through the Zoiko Mobile app or website.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>What payment options are available?</AccordionHeader>
                                        <AccordionBody>You can pay via:
                                            <ul>
                                                <li>Credit/Debit Cards</li>
                                                <li>Bank Transfers</li>
                                                <li>AutoPay (Enroll in AutoPay for hassle-free monthly payments)</li>
                                            </ul>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="2">
                                        <AccordionHeader>How do I cancel my postpaid plan?</AccordionHeader>
                                        <AccordionBody>You can cancel your plan by contacting Zoiko Mobile customer support. Cancellation fees may apply if you&apos;re under a contract, so review your terms before canceling.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Can I change my payment due date?</AccordionHeader>
                                        <AccordionBody>Yes! Contact customer support to adjust your billing cycle to better fit your budget.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>What happens if I miss a payment?</AccordionHeader>
                                        <AccordionBody>If a payment is missed, you&apos;ll receive a reminder notification. Late fees may apply, and service could be temporarily suspended until payment is made.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
        
    );
}

export default PostpaidFaqs;
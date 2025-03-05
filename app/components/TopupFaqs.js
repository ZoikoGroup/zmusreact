"use client"
import { Container, Tab, Tabs, Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Row } from 'react-bootstrap';

function PostpaidFaqs() {
    return (
        <Container fluid className='bglite'>
            <Container className="justify-content-center p-5">
                <Tabs defaultActiveKey="home" id="fill-tab-example" fill>
                    <Tab eventKey="home" title="General Questions">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>What is the Zoiko Mobile Top-Up Plan?</AccordionHeader>
                                        <AccordionBody>The Zoiko Mobile Top-Up Plan is a flexible add-on that lets you purchase extra data, minutes, and texts whenever you need them. It&apos;s designed to keep you connected without long-term commitments.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Who can use the Top-Up Plan?</AccordionHeader>
                                        <AccordionBody>Any Zoiko Mobile customer with an active plan can use the Top-Up Plan. Whether you need extra data for streaming, more minutes for calls, or additional texts to stay in touch, this plan is for you!</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="2">
                                        <AccordionHeader>Will my Top-Up balance roll over to the next month?</AccordionHeader>
                                        <AccordionBody>Top-up balances typically expire at the end of your current billing cycle. Be sure to use them before your next cycle begins!</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Do I need a contract to use the Top-Up Plan?</AccordionHeader>
                                        <AccordionBody>No! The Zoiko Mobile Top-Up Plan is 100% contract-free. You only add what you need, when you need it.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>How does the Top-Up Plan work?</AccordionHeader>
                                        <AccordionBody>Simply visit www.zoikomobile.com, choose the top-up option that fits your needs, and complete your purchase. The extra data, minutes, and texts will be added to your account instantly.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="Data Minutes &amp; Texts">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>What can I use my top-up data for?</AccordionHeader>
                                        <AccordionBody>Your top-up data can be used for browsing, streaming, gaming, social media, and more—just like your regular Zoiko Mobile data!</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Will my top-up data be high-speed?</AccordionHeader>
                                        <AccordionBody>Yes! Top-up data runs on Zoiko Mobile&apos;s premium network, giving you access to reliable, high-speed browsing.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Can I use my top-up minutes for international calls?</AccordionHeader>
                                        <AccordionBody>No, top-up minutes apply to calls within the U.S. If you need international calling, check out our international add-ons.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Can I send texts to international numbers with my top-up balance?</AccordionHeader>
                                        <AccordionBody>No, top-up texts are for domestic messaging only. For international texting, we offer separate international plans.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="purchase" title="Purchasing &amp; Managing Your Top-Up">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>How do I purchase a top-up?</AccordionHeader>
                                        <AccordionBody>You can purchase a top-up directly on our website at www.zoikomobile.com. Just log in to your account, select your top-up option, and complete payment.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Can I top up more than once per month?</AccordionHeader>
                                        <AccordionBody>Absolutely! You can add as many top-ups as you need throughout your billing cycle.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="2">
                                        <AccordionHeader>Will my top-up be applied immediately?</AccordionHeader>
                                        <AccordionBody>Yes! Your top-up will be activated instantly after your purchase is complete.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>How will I know when my top-up balance is running low?</AccordionHeader>
                                        <AccordionBody>We&apos;ll send you a text notification when you&apos;re running low on data, minutes, or texts. You can also check your balance in your Zoiko Mobile account.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Can I schedule an automatic top-up?</AccordionHeader>
                                        <AccordionBody>At this time, top-ups must be purchased manually, but we&apos;re working on adding an auto top-up feature soon!</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="support" title="Support &amp; Troubleshooting">
                        <Row>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>What if my top-up doesn&apos;t show up on my account?</AccordionHeader>
                                        <AccordionBody>If your top-up doesn&apos;t appear within a few minutes, try refreshing your account or restarting your phone. If you still don&apos;t see it, contact Zoiko Mobile Support for assistance.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Can I get a refund if I don&apos;t use my top-up balance?</AccordionHeader>
                                        <AccordionBody>Unfortunately, top-ups are non-refundable. Be sure to purchase only what you need for your current billing cycle.</AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Col>
                            <Col>
                                <Accordion>
                                    <AccordionItem eventKey="0">
                                        <AccordionHeader>Can I transfer my top-up balance to another Zoiko Mobile customer?</AccordionHeader>
                                        <AccordionBody>No, top-up balances are non-transferable and can only be used on the account where they were purchased.</AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem eventKey="1">
                                        <AccordionHeader>Need More Help?</AccordionHeader>
                                        <AccordionBody>For further assistance, visit our support center at www.zoikomobile.com/support or contact our customer service team. We&apos;re happy to help!<br />Stay connected with Zoiko Mobile - whenever you need, however you need!</AccordionBody>
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
"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function BusinessFaqs () {
    return (
        <Container fluid className="bglite">
        <Container className="p-5">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <Row>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What makes Zoiko Mobile business plans different from personal plans?</AccordionHeader>
                            <AccordionBody>Zoiko Business Plans are designed for professionals, small businesses, and enterprises. They include:
                                <ul>
                                    <li>Higher data allowances</li>
                                    <li>Priority business support</li>
                                    <li>Dedicated account managers</li>
                                    <li>Device financing and BYOD options</li>
                                    <li>Security features for business users</li>
                                </ul>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>Which business plan is best for my company?</AccordionHeader>
                            <AccordionBody>
                                <ul>
                                    <li>Zoiko Business Starter: Best for small teams needing reliable connectivity.</li>
                                    <li>Zoiko Business Pro: Ideal for growing businesses with higher data needs.</li>
                                    <li>Zoiko Business Unlimited: Designed for large teams and power users who need unlimited high-speed data and premium business support.</li>
                                </ul>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Can I mix and match different business plans for my team?</AccordionHeader>
                            <AccordionBody>Yes! You can customize your business account by selecting different plans for employees based on their data needs.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>Do business plans include international calling?</AccordionHeader>
                            <AccordionBody>Yes! All business plans include unlimited international calls to 200+ countries, allowing you to stay connected with global clients and partners.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What is the Zoiko Protect feature on business plans?</AccordionHeader>
                            <AccordionBody>Zoiko Protect is optional device insurance available on Zoiko Business Unlimited plans. For a small monthly fee per device, it covers damage, loss, and theft.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>How does the dedicated business support work?</AccordionHeader>
                            <AccordionBody>Business customers get access to:
                                <ul>
                                    <li>24/7 priority support</li>
                                    <li>Dedicated account managers</li>
                                    <li>Faster response times for troubleshooting</li>
                                </ul>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Can I get multiple lines for my business?</AccordionHeader>
                            <AccordionBody>Yes! Zoiko Mobile offers scalable business plans that allow you to add multiple lines under one account. The more lines you add, the better the savings.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>Do business plans include mobile hotspot data?</AccordionHeader>
                            <AccordionBody>Yes! Business users get generous hotspot allowances, starting from 5GB and going up to 20GB depending on the plan.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </Container>
    );
}
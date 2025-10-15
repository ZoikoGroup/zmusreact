"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function PrepaidFaqs () {
    return (
        <Container fluid className="bglite">
        <Container className="p-5">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <Row>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What are Zoiko Mobile Prepaid Personal Plans?</AccordionHeader>
                            <AccordionBody>Zoiko Mobile Prepaid Personal Plans offer affordable, flexible wireless service with unlimited talk and text, high-speed data, and free international calling to over 200 countries. No contracts, no hidden fees—just simple, transparent pricing.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>Do Zoiko Mobile Prepaid Plans include unlimited data?</AccordionHeader>
                            <AccordionBody>Yes! We offer multiple prepaid plans, including options with unlimited high-speed data. However, some plans may experience reduced speeds after a set amount of data usage. Check your specific plan details for more information.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Can I use my phone as a mobile hotspot?</AccordionHeader>
                            <AccordionBody>Absolutely! Each prepaid plan includes a specific amount of mobile hotspot data. If you need more, consider upgrading to a plan with a higher hotspot allowance.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>What happens if I use all my high-speed data?</AccordionHeader>
                            <AccordionBody>If your plan has a high-speed data limit, your speeds may be reduced, but you&apos;ll still have unlimited access to data at lower speeds. Need more high-speed data? Upgrade to a plan with a higher allowance.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="4">
                            <AccordionHeader>Do Zoiko Prepaid Plans include international calling?</AccordionHeader>
                            <AccordionBody>Yes! All Zoiko Mobile prepaid personal plans include free international calls to over 200 countries, so you can stay connected to loved ones worldwide without extra charges.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="5">
                            <AccordionHeader>Can I roam in Canada and Mexico?</AccordionHeader>
                            <AccordionBody>Yes! Select plans include free roaming in Canada and Mexico, allowing you to use your talk, text, and data just like you do in the U.S.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>Is 5G included in Zoiko Prepaid Plans?</AccordionHeader>
                            <AccordionBody>Yes! All Zoiko Mobile plans support 4G LTE and 5G where available, ensuring you get the best speeds and coverage.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>Do I need a contract or credit check?</AccordionHeader>
                            <AccordionBody>No! Zoiko Mobile prepaid plans are 100% contract-free and don&apos;t require a credit check. Just choose a plan, activate, and start using your service immediately.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Can I bring my own phone?</AccordionHeader>
                            <AccordionBody>Yes! Zoiko Mobile supports most unlocked phones. Simply insert a Zoiko Mobile SIM card or activate an eSIM to get started.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>How do I activate my Zoiko Mobile prepaid plan?</AccordionHeader>
                            <AccordionBody>Activation is easy! After purchasing a Zoiko Mobile SIM or eSIM, follow these steps:
                                <ul>
                                    <li> Insert your SIM card (or activate your eSIM).</li>
                                    <li>Visit zoikomobile.com/how-to-activate-sim/ and follow the instructions.</li>
                                    <li>Choose your plan and start using your service instantly!</li>
                                </ul>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="4">
                            <AccordionHeader>Can I switch plans later?</AccordionHeader>
                            <AccordionBody>Yes! You can upgrade or downgrade your plan at any time. Just log into your Zoiko Mobile account and select a new plan.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="5">
                            <AccordionHeader>Does Zoiko Mobile offer customer support?</AccordionHeader>
                            <AccordionBody>Absolutely! Our 24/7 customer support team is ready to help via phone, chat, or email whenever you need assistance.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </Container>
    );
}
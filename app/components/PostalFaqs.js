"use client"
import Link from "next/link";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function PostalFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-4">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Who is eligible for the U.S. Postal Service Worker discount?</AccordionHeader>
                                <AccordionBody>This exclusive 20% lifetime discount is available to U.S. Postal Service Workers. You can also share this benefit with up to five friends or family members!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How do I claim my U.S. Postal Service Worker discount?</AccordionHeader>
                                <AccordionBody>Simply sign up with your work email, provide a valid work ID for verification, and you&apos;re all set! You&apos;ll then be able to enjoy your discount and nominate up to 5 loved ones.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I use this discount with other offers?</AccordionHeader>
                                <AccordionBody>Yes! This special offer can be combined with other promotions from Zoiko Mobile.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What&apos;s included in the 20% discount?</AccordionHeader>
                                <AccordionBody>The 20% discount applies to any of our Bring Your Own Device (BYOD) plans for as long as you stay with Zoiko Mobile.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Can my friends and family also get the 20% discount?</AccordionHeader>
                                <AccordionBody>Absolutely! You can nominate up to five family members or friends to enjoy the same discount on their BYOD plans.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Is there a specific BYOD plan I need to choose?</AccordionHeader>
                                <AccordionBody>You can select any of our affordable BYOD plans. Pick the one that best suits your needs!<br />For more information, contact us at 800-988-8116 or support@zoikomobile.com. We&apos;re here to help!</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
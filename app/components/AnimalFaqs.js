"use client"
import Link from "next/link";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function AnimalFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-4">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Who is eligible for the Animal Charity Discount Program?</AccordionHeader>
                                <AccordionBody>This program is designed for employees of registered animal welfare charities in the United States. If you&apos;re currently employed in this sector, you&apos;re eligible! Just provide proof of employment during registration.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Can my family and friends benefit from this program?</AccordionHeader>
                                <AccordionBody>Absolutely! You can add up to 5 family members or friends to your account. They&apos;ll receive the same discount so everyone can stay connected affordably.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>What documents do I need to submit for verification?</AccordionHeader>
                                <AccordionBody>We require a valid proof of employment, such as:
                                    <ul>
                                        <li>A charity-issued ID badge</li>
                                        <li>An employment letter on official charity letterhead</li>
                                    </ul>
                                    Make sure your documents are clear and easy to read.
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How long does the verification process take?</AccordionHeader>
                                <AccordionBody>Verification typically takes up to 48 hours. We&apos;ll notify you via email as soon as your account is approved.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Can I register my family and friends later?</AccordionHeader>
                                <AccordionBody>Yes! If you want to add family or friends after registration, just log in to your Zoiko Mobile account, navigate to the &quot;Family &amp; Friends&quot; section, and add their details.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>Didn&apos;t find what you were looking for?</AccordionHeader>
                                <AccordionBody>Check out our Support Page for more answers or connect with us directly.<br />Zoiko Mobile - Proud to connect those who care.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What happens if I change jobs or leave the charity sector?</AccordionHeader>
                                <AccordionBody>If your employment changes, your discount will continue for a grace period of 3 months. After that, we&apos;ll assist you in transitioning to one of our affordable standard plans.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Are there any hidden fees or extra charges?</AccordionHeader>
                                <AccordionBody>No hidden fees here! You&apos;ll enjoy straightforward pricing and the same transparent billing Zoiko Mobile is known for.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I combine this discount with   other Zoiko Mobile promotions?</AccordionHeader>
                                <AccordionBody>This program cannot be combined with other discounts or promotions, but rest assured—it&apos;s one of our best offers tailored just for you.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How do I know my personal information is safe?</AccordionHeader>
                                <AccordionBody>We prioritize your privacy. All the information you share is encrypted and securely stored. We&apos;ll never share your details without your consent.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Who can I contact for help?</AccordionHeader>
                                <AccordionBody>
                                    <ul>
                                        <li>Phone: 800-477-1477</li>
                                        <li>Email: support@zoikomobile.com</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
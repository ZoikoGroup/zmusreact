"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function MusicHubFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-4">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What is the Zoiko Music Hub?</AccordionHeader>
                                <AccordionBody>The Zoiko Music Hub is our exclusive program designed to support musicians, music lovers, and aspiring creators. From discounts on plans to free tools for music production and exclusive event access, it&apos;s the ultimate way to stay connected to your passion for music.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Who can join the Zoiko Music Hub?</AccordionHeader>
                                <AccordionBody>Anyone can join! Whether you&apos;re a professional musician, a music student, or simply a music lover, Zoiko Music Hub has something for you.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Do I need to prove I&apos;m a musician or music student to get perks?</AccordionHeader>
                                <AccordionBody>Certain perks, like musician discounts and tools for music creation, require proof such as a musician&apos;s union membership or enrollment in a music program. However, many other benefits are open to everyone!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>What music streaming perks are available?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile partners with top streaming platforms like Spotify, Apple Music, and TIDAL to offer free or discounted subscriptions. Plus, you&apos;ll get unlimited streaming that doesn&apos;t count toward your data usage.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>If I&apos;m not a musician or music student, can I still get perks?</AccordionHeader>
                                <AccordionBody>Absolutely! Here&apos;s what you can enjoy:
                                    <ul>
                                        <li>Free or discounted subscriptions to music streaming platforms like Spotify or TIDAL.</li>
                                        <li>Unlimited music streaming without using your data.</li>
                                        <li>Opportunities to win tickets to concerts and music festivals.</li>
                                        <li>Special family plans to keep everyone in your household connected.</li>
                                    </ul>
                                    Music is for everyone, and we&apos;re here to make it accessible and fun!
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>Where can I learn more or get help?</AccordionHeader>
                                <AccordionBody>If you have more questions, feel free to email us at music@zoikomobile.com. Our team is happy to assist!</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Are there tools for aspiring musicians?</AccordionHeader>
                                <AccordionBody>Yes! Aspiring musicians can access free or discounted subscriptions to music creation apps like GarageBand or BandLab. You&apos;ll also get 100GB of cloud storage to securely store and share your music projects.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>What is the Musician Spotlight Program?</AccordionHeader>
                                <AccordionBody>Each month, we showcase talented Zoiko Music Hub members on our social media channels or dedicated webpage. It&apos;s a great way to gain exposure and share your music with a wider audience.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I attend music events through Zoiko Music Hub?</AccordionHeader>
                                <AccordionBody>Yes! Zoiko Music Hub members enjoy discounted or exclusive access to major music events, concerts, and festivals. Keep an eye out for event announcements and giveaways!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How do I sign up for Zoiko Music Hub?</AccordionHeader>
                                <AccordionBody>
                                    <ul>
                                        <li>Musician-specific perks require proof of eligibility.</li>
                                        <li>Discounts and subscriptions may vary by partner and availability.</li>
                                        <li>Zoiko Mobile reserves the right to modify or discontinue certain perks at any time.</li>
                                        <li>Event access and giveaways are subject to availability and specific terms outlined at the time of the promotion.</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Can I cancel my plan at any time?</AccordionHeader>
                                <AccordionBody>Yes, you can cancel your plan at any time. However, please review our terms and conditions for details on how cancellations may affect any remaining balance or charges.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
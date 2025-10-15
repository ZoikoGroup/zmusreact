"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function TravelFaqs () {
    return (
        <Container fluid className="bglite">
        <Container className="p-5">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <Row>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What is the Zoiko Daily Adventure Pass?</AccordionHeader>
                            <AccordionBody>The Zoiko Daily Adventure Pass provides unlimited 5G data for 24 hours, along with free talk and text. It also includes free roaming in Canada & Mexico and mobile hotspot access so you can share your connection on the go.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader> How long does the Zoiko Voyager Pass last?</AccordionHeader>
                            <AccordionBody>The Zoiko Voyager Pass is perfect for a 7-day trip. It offers unlimited 5G data, free talk and text, and roaming in Canada & Mexico, as well as mobile hotspot access.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>What is included with the Zoiko Explorer Pass?</AccordionHeader>
                            <AccordionBody>The Zoiko Explorer Pass gives you unlimited 5G data for 14 days, free talk and text, and free roaming in Canada & Mexico. You also get mobile hotspot access to share your connection with others during your trip.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>How does the Zoiko Global Connect plan work?</AccordionHeader>
                            <AccordionBody>The Zoiko Global Connect plan is designed for frequent travellers. It provides unlimited 5G and 4G LTE data, free talk and text, and roaming in Canada & Mexico. Plus, you&apos;ll have mobile hotspot access to stay connected while on the move.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What makes Zoiko Mobile Travel Plans different?</AccordionHeader>
                            <AccordionBody>Zoiko Mobile Travel Plans offer unlimited data, no hidden fees, free roaming in Canada & Mexico, and mobile hotspot access. With 24/7 customer support, you can always rely on us for assistance when needed.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>Can I use mobile hotspot with Zoiko Mobile Travel Plans?</AccordionHeader>
                            <AccordionBody>Yes! Every Zoiko Mobile Travel Plan includes mobile hotspot access, allowing you to share your data with other devices.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Do Zoiko Mobile Travel Plans include international calls?</AccordionHeader>
                            <AccordionBody>All Zoiko Mobile Travel Plans include free talk and text, as well as free roaming in Canada & Mexico, so you can stay connected wherever your travels take you.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader> How can I choose the best travel plan for my trip?</AccordionHeader>
                            <AccordionBody>Choose the plan that best suits the length of your trip and your data needs. Whether you&apos;re going for a day, a week, or longer, Zoiko Mobile has the perfect plan for you.<br />For more information or assistance, our customer support team is available 24/7 to help you choose the right plan! Contact our specialist Support Team on 800-988-8116.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </Container>
    );
}
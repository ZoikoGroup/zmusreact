"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function EsimFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-5">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Why do travelers choose Zoiko Global eSIM phone plans?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile offers significant benefits with minimal effort. Enjoy flexible, traveler-friendly unlimited best international eSIM on a leading 5G network, dual SIM capability, and instant global connectivity.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How does Zoiko Global eSIM save me money?</AccordionHeader>
                                <AccordionBody>Zoiko&apos;s prepaid, postpaid, and travel day pass global eSIM plans help you avoid expensive international roaming charges. Enjoy unlimited 5G data, hotspot access, and free international calls at rates significantly lower than traditional roaming.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>How do I use Dual SIM (one eSIM) on an iPhone?</AccordionHeader>
                                <AccordionBody>Learn how to manage two SIMs on your iPhone for separate work and personal numbers: Dual SIM on iPhone Guide</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How do I convert my physical SIM to an eSIM on my iPhone (14 Pro Max)?</AccordionHeader>
                                <AccordionBody>Convert your existing number to an eSIM: Physical to eSIM Conversion (This process is typically done through your carrier&apos;s app or website.)</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What devices are compatible with eSIMs?</AccordionHeader>
                                <AccordionBody>Zoiko eSIMs are compatible with a wide range of devices, including:<br /><b>iPhone:</b> iPhone 15, 14, 13, 12, XS Max, XR, XS/XR, 11 series, SE (2nd & 3rd gen)<br /><b>iPad:</b> iPad (7th generation and later), iPad Pro (3rd generation and later), iPad Mini (5th generation and later), iPad Air (3rd generation and later)
                                    <p><b>Samsung Galaxy:</b> Galaxy S series (including S20, S21, S22, S23, S24, and S25 Ultra models), Z series (Z Fold, Z Flip, Z Fold6), Note series (Note20 and Note20 Ultra), A series (A54 and A55 5G), X series (XCover 7), Samsung Galaxy Watch models, Tab S9 series, Galaxy Book series (Galaxy Book 2 and 3)</p>
                                    <p><b>Google Pixel:</b> Pixel 4, 4a, 4 XL, 4a 5G, and later models<br /><b>Microsoft Surface:</b> Surface Pro/X (5th and 7th Gen)<br /><b>Other:</b> (Add other compatible brands and models as needed)<br />To check your device&apos;s eSIM compatibility, dial *#06# and call. A flash SMS message will appear if your device supports eSIM, displaying your device&apos;s EID (unique identification number).</p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How do I get a Global eSIM?</AccordionHeader>
                                <AccordionBody>
                                    <p><b>New Customers:</b> Choose a US SIM plan and select the eSIM option during checkout. Call us at 800-988-8116 for assistance.</p>
                                    <p><b>Existing Customers:</b> Get a new eSIM line through your account dashboard or dial 500 from your Zoiko Mobile phone for support with physical to eSIM conversion.</p>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Do Zoiko Global eSIMs support Wi-Fi Calling?</AccordionHeader>
                                <AccordionBody>Yes, all Zoiko phone plans support Wi-Fi Calling at no extra charge.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Do Zoiko Global eSIMs support free international calling?</AccordionHeader>
                                <AccordionBody>Our plans support free international calls to over 200 destinations. Check the specifics of your chosen plan for details.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
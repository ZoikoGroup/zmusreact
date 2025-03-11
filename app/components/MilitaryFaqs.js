"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function MilitaryFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-4">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Who qualifies for the Military &amp; Veterans Lifetime Deals?</AccordionHeader>
                                <AccordionBody>This offer is available to all active-duty military personnel, veterans, and reservists. You just need to provide a valid military ID or proof of your veteran status to qualify.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How do I claim the 20% lifetime discount?</AccordionHeader>
                                <AccordionBody>Simply choose a bring-your-own-device (BYOD) plan from Zoiko Mobile, and provide your military or veteran status proof. Once verified, you&apos;ll receive a 20% lifetime discount on your plan for as long as you remain a Zoiko Mobile customer.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I nominate family and friends for a discount?</AccordionHeader>
                                <AccordionBody>Yes! You can nominate up to 5 family members or friends to receive a 15% lifetime discount on their own BYOD plans. They&apos;ll enjoy the same great benefits you do.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Is this offer available for existing Zoiko Mobile customers?</AccordionHeader>
                                <AccordionBody>This particular offer is available to new Zoiko Mobile customers who are military personnel or veterans. But don&apos;t worry—there are other offers for existing customers, so be sure to check those out!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>What if I already have a Zoiko Mobile account?</AccordionHeader>
                                <AccordionBody>If you&apos;re a current Zoiko Mobile customer and a military member or veteran, you can still take advantage of this offer by signing up for a new BYOD plan under this deal. Just make sure to have your military ID or veteran status verification ready.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>Can my family and friends use their discount on any plan?</AccordionHeader>
                                <AccordionBody>Yes! Your family and friends can use their 15% lifetime discount on any BYOD plan they choose. The discount is available for as long as they remain customers with Zoiko Mobile.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Are there any fees or hidden charges?</AccordionHeader>
                                <AccordionBody>There are no hidden fees for the Military &amp; Veterans Lifetime Deals. However, all plans are subject to Zoiko Mobile&apos;s Fair Usage Policy, so make sure to check the specifics on data usage, roaming, and more.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Will I have 5G access with this deal?</AccordionHeader>
                                <AccordionBody>Yes! As part of this deal, you&apos;ll have access to 5G in select areas, allowing you to enjoy lightning-fast speeds wherever coverage is available.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I use this deal while traveling in Canada or Mexico?</AccordionHeader>
                                <AccordionBody>Absolutely! This deal includes North America roaming across the U.S., Canada, and Mexico, so you can use your data, talk, and text without worrying about extra charges.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How long will it take for my discount to apply?</AccordionHeader>
                                <AccordionBody>After you submit your application, our team will verify your military or veteran status. Once approved, your discount will be applied to your plan and you&apos;ll receive a confirmation email. This process typically takes up to 48 hours.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Can I change my plan after signing up?</AccordionHeader>
                                <AccordionBody>Yes! You can change your BYOD plan at any time by contacting our customer support. Just remember, the lifetime discount will continue to apply to your new plan as long as you remain a Zoiko Mobile customer.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>Is Wi-Fi calling available with this deal?</AccordionHeader>
                                <AccordionBody>Yes, Wi-Fi calling is included with this deal! Just make sure you have a compatible device and a reliable Wi-Fi connection, and you&apos;ll be able to make crystal-clear calls wherever you are.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="6">
                                <AccordionHeader>What happens if I move or change my address?</AccordionHeader>
                                <AccordionBody>No worries! Your Military & Veterans Lifetime Deals will still apply to your plan, even if you move to a different location within the United States. Just update your address with us to ensure all your details are correct.<br />If you have any more questions or need assistance, feel free to contact our customer support team. We&apos;re here to help you get the most out of your Military &amp; Veterans Lifetime Deals!</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
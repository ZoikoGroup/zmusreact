"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function FamilyPlanFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-4">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What is the Zoiko Mobile Family Plan?</AccordionHeader>
                                <AccordionBody>The Zoiko Mobile Family Plan allows you to connect three (3) to ten (10) lines under one account, providing flexibility and significant savings. Once your account has at least three (3) active lines, you qualify for a 20% discount on your total bill. Our plans cater to both Prepaid and Postpaid options, ensuring a solution for every need.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How many lines can I have on a Family Plan?</AccordionHeader>
                                <AccordionBody>You can have between three (3) and ten (10) active lines on a single Family Plan. The more lines you add, the more you save with our 20% discount.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>How does the 20% discount work?</AccordionHeader>
                                <AccordionBody>Once you activate three (3) or more lines, the 20% discount will automatically apply to your total bill. The discount is valid for both Prepaid and Postpaid Plans. There are no additional steps required - just activate and save.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Can I mix and match Prepaid and Postpaid Plans?</AccordionHeader>
                                <AccordionBody>Yes, you can combine both Prepaid and Postpaid Plans under one Family Plan, giving you the flexibility to choose what works best for each member of your group.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Are there any additional perks for Family Plan members?</AccordionHeader>
                                <AccordionBody>Yes, Zoiko Mobile offers several add-on options to enhance your Family Plan, such as:
                                    <ul>
                                        <li><b>Streaming Service Discounts:</b> Save on select streaming platforms with your Family Plan.</li>
                                        <li><b>Parental Controls:</b> Easily manage usage and set restrictions for younger family members.</li>
                                        <li><b>Unlimited Messaging Between Plan Members:</b> Enjoy free international messaging between Family Plan members.</li>
                                        <li><b>Hotspot Data:</b> Add hotspot capabilities to any line.</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>Can I bring my own device (BYOD) to the Family Plan?</AccordionHeader>
                                <AccordionBody>Absolutely. Zoiko Mobile supports Bring Your Own Device (BYOD). Ensure your device is unlocked and compatible with our network using our online compatibility checker.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="6">
                                <AccordionHeader>Can I keep my current phone number when joining the Family Plan?</AccordionHeader>
                                <AccordionBody>Yes, you can port your current number to your Family Plan at no additional cost. The process is simple and seamless.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="7">
                                <AccordionHeader>Do all lines need to share the same plan or data allowance?</AccordionHeader>
                                <AccordionBody>No, each line can have its own plan. Whether someone needs unlimited data or a smaller plan, Zoiko Mobile ensures each line fits the individual&apos;s usage.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="8">
                                <AccordionHeader>Are there any fees for adding lines to my Family Plan?</AccordionHeader>
                                <AccordionBody>No, there are no additional fees for adding lines to your Family Plan. Standard activation fees may apply depending on the type of plan.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="9">
                                <AccordionHeader>Can I include family members or friends who live in different households?</AccordionHeader>
                                <AccordionBody>Yes, you can add family members or friends from different households to your Family Plan. There are no restrictions based on location.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Are international calling and roaming included?</AccordionHeader>
                                <AccordionBody>All of our plans include free international calling and free roaming (Canada and Mexico). You can also add optional roaming features to any line, such as international data or discounted rates for overseas calls.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How does Zoiko Mobile handle overages or data usage?</AccordionHeader>
                                <AccordionBody>If your plan includes shared data, all lines draw from the same pool, but you can set limits for each line. For individual data plans, each line has its own allowance, ensuring no one impacts another&apos;s usage.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I manage my Family Plan online?</AccordionHeader>
                                <AccordionBody>Yes, Zoiko Mobile provides an intuitive online portal and mobile app. You can easily view and pay bills, monitor data usage, adjust individual line settings, and add or remove lines.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How does billing work for the Family Plan?</AccordionHeader>
                                <AccordionBody>You will receive a single, consolidated bill for all lines on your Family Plan. If you are on a Prepaid Plan, payments will reflect the 20% discount immediately upon qualifying.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Is there a contract required for the Family Plan?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile does not require contracts for Prepaid Plans. Postpaid Plans may involve flexible agreements depending on the selected options, but there are no long-term commitments.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>What happens if I cancel my Family Plan or remove a line?</AccordionHeader>
                                <AccordionBody>You can cancel your Family Plan or remove a line at any time without penalty. If your total number of lines drops below three, you will no longer qualify for the 20% discount.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="6">
                                <AccordionHeader>What happens to the discount if I switch between Prepaid and Postpaid Plans?</AccordionHeader>
                                <AccordionBody>Your 20% discount will apply regardless of whether you switch from Prepaid to Postpaid Plans or vice versa, as long as your account maintains at least three active lines.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="7">
                                <AccordionHeader>Is there an age restriction for Family Plan lines?</AccordionHeader>
                                <AccordionBody>There are no age restrictions for individual lines, but the account holder must be at least 18 years old.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="8">
                                <AccordionHeader>Can I switch to a Family Plan if I already have a Zoiko Mobile account?</AccordionHeader>
                                <AccordionBody>Yes, existing Zoiko Mobile customers can easily switch to a Family Plan by adding additional lines. Once you have at least three active lines, the 20% discount will be applied automatically.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="9">
                                <AccordionHeader>How do I get started with the Zoiko Mobile Family Plan?</AccordionHeader>
                                <AccordionBody>Starting is easy. Visit our website, stop by a Zoiko Mobile store, or contact our customer support team. Choose your plans, activate at least three lines, and enjoy 20% savings along with additional perks.<br />Zoiko Mobile&apos;s Family Plan is designed to offer savings, flexibility, and features that meet your family&apos;s unique needs. Start today and experience the difference. If you have any additional questions, feel free to contact us or visit the Family Plan section of our website.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
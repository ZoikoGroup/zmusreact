"use client"
import Link from "next/link";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function CollegelFaqs () {
    return (
        <Container fluid className="bglite">
            <Container className="py-4">
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Row>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Who is eligible for the Zoiko Mobile College Student Discount?</AccordionHeader>
                                <AccordionBody>To qualify for our college student discount, you must be currently enrolled in a recognized college or university in the United States. All students, regardless of year or major, are eligible. You&apos;ll need to provide proof of enrollment, such as a valid student ID or enrollment verification.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How much discount do I get as a student?</AccordionHeader>
                                <AccordionBody>You&apos;ll receive a 20% discount on any of Zoiko Mobile&apos;s plans. Whether you&apos;re looking for unlimited talk, text, or data, the discount applies to all our available plans.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>How do I sign up for the college student discount?</AccordionHeader>
                                <AccordionBody>It&apos;s easy! Just follow these steps:
                                    <ul>
                                        <li>Visit our website at <Link href={'https://zoikomobile.com'}>https://zoikomobile.com</Link></li>
                                        <li>Choose the mobile plan that fits your needs.</li>
                                        <li>Provide your student ID or proof of enrollment during the sign-up process.</li>
                                        <li>Once your student status is verified, you&apos;ll start enjoying your 20% discount on your chosen plan.</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Do I need to switch my number to get the student discount?</AccordionHeader>
                                <AccordionBody>No, you can keep your current phone number if you&apos;re switching to Zoiko Mobile. We make it easy to transfer your number when you sign up. Just request a Porting Authorization Code (PAC) from your current provider and we&apos;ll handle the rest.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Can I use the student discount on any mobile plan?</AccordionHeader>
                                <AccordionBody>Yes, the 20% discount applies to any mobile plan we offer. Whether you&apos;re looking for a plan with unlimited data, unlimited talk and text, or the flexibility to bring your own device, you can use your student discount on any of these options.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>How long will I receive the student discount?</AccordionHeader>
                                <AccordionBody>As long as you remain a Zoiko Mobile customer and continue to meet the eligibility requirements (i.e., you&apos;re still a registered student), you&apos;ll keep receiving the 20% discount. You may need to update your student status annually to continue receiving the discount after each school year.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="6">
                                <AccordionHeader>Can I switch to Zoiko Mobile if I&apos;m on a contract with another provider?</AccordionHeader>
                                <AccordionBody>Yes! You can switch to Zoiko Mobile at any time, even if you&apos;re under contract with another provider. You can keep your current number by porting it to Zoiko Mobile. Just reach out to our customer service team, and we&apos;ll guide you through the process.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Can I combine the student discount with other promotions?</AccordionHeader>
                                <AccordionBody>The 20% student discount cannot be combined with other promotional offers or discounts. However, it&apos;s still a great way to save money on your mobile service!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Is the student discount available for family or friends?</AccordionHeader>
                                <AccordionBody>The student discount is only available to the individual student who meets the eligibility criteria. However, if you have family or friends who are students, they can sign up for their own discounts too!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>What do I need to provide to verify my student status?</AccordionHeader>
                                <AccordionBody>To verify your student status, you&apos;ll need to provide a valid student ID, enrollment verification, or any other document that confirms you&apos;re currently enrolled in a recognized college or university.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Are there any hidden fees or charges with the student discount?</AccordionHeader>
                                <AccordionBody>No, there are no hidden fees when you sign up for our student discount program. You&apos;ll only pay the regular monthly price for your plan, minus the 20% discount.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="4">
                                <AccordionHeader>Can I cancel my plan at any time?</AccordionHeader>
                                <AccordionBody>Yes, you can cancel your plan at any time. However, please review our terms and conditions for details on how cancellations may affect any remaining balance or charges.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="5">
                                <AccordionHeader>Can I change my plan during the contract?</AccordionHeader>
                                <AccordionBody>Yes, you can switch your plan to another one that better suits your needs. Just get in touch with our customer service team to make any changes.<br />Have more questions? Feel free to reach out to our customer service team, and we&apos;ll be happy to assist you! Stay connected and save big with Zoiko Mobile&apos;s College Student Discount Program.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
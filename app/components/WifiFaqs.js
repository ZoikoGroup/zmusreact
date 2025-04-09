"use client"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

export default function WifiFaqs () {
    return (
        <Container fluid className="bglite">
        <Container className="p-5">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <Row>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What Is Wi Fi Calling?</AccordionHeader>
                            <AccordionBody>Wi-Fi Calling, also known as Voice over Wi-Fi (or VoWiFi), is a predefined feature on most smartphones that lets you make and receive video &amp; voice calls, texts, and video calls to the nearby strongest Wi-Fi network instead of using a regular cellular network.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>Are Wi-Fi Calls free?</AccordionHeader>
                            <AccordionBody>Mostly no. The fees or charges for making Wi-Fi calls instead of cellular network phone calls are not free. Operators are mostly treated as regular calls from your selected plan. Please note, that certain public Wi-fi networks demand FEEs to access their network, which will cost your phone bills as well. If you don&apos;t have an active current plan and are unable to make calls from your cell phone, you will most likely need to recharge and activate Wi-Fi calling to make calls on your phone.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Are there any benefits of Wi Fi calling service?</AccordionHeader>
                            <AccordionBody>There are plenty of benefits, especially if you are in cellular coverage dead zones or areas that don&apos;t reach cellular networks.<br />So, what are these? See below.
                                <ul>
                                    <li>It allows you to make voice/video calls in areas where the cellular network is poor.</li>
                                    <li>It&apos;s simply followed by device settings and no need to install any costly apps to permit Wi Fi callings.</li>
                                    <li>It doesn&apos;t require your current plan&apos;s talk time minutes.</li>
                                    <li>Wi-Fi calls don&apos;t eat up your LTE data balance from your current plan.</li>
                                    <li>Enables you to make HD-quality voice calls in weak network areas.</li>
                                    <li>No additional charges and login credentials are required.</li>
                                    <li>Most smartphones like iPhones, Samsung, Google Pixel, Huawei, Xiaomi, etc. phones support this feature.</li>
                                    <li>Extend battery life on your smartphones.</li>
                                </ul>
                                <p>Wi Fi calling simply works on available bandwidth. Typically, it needs 1 MB per minute on your voice call. Whereas, in your video calls, it consumed 8 MB per minute.</p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>Does Wi Fi Calling use data from my current plan?</AccordionHeader>
                            <AccordionBody>Yes, each voice/video call made over Wi-Fi to any number in the US does consume your current calling balance and your active mobile plan&apos;s data balance. Please note; that some operators of Wi-Fi networks may have access fees to connect.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="4">
                            <AccordionHeader>Is Wi Fi Calling service supported on my smartphone?</AccordionHeader>
                            <AccordionBody>Most current smartphones have a predefined Wi Fi Calling feature. You can check if your device supports Wi Fi Calling, check your smartphone&apos;s settings or find tutorial for device Wi Fi calling compatibility.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="5">
                            <AccordionHeader>What actions do I need to activate Wi Fi Calling service on my smartphone?</AccordionHeader>
                            <AccordionBody>To activate Wi Fi Calling, ensure your smartphone is connected to the Zoiko Mobile network on your Android handsets or connect to the Zoiko Mobile network for iPhones. HD Voice must be enabled (accessible via settings), and your device should have access to the Internet via Wi-Fi.<br />Additionally, you must accept &quot;Terms & Conditions&quot; and provide/update your US address for emergency purposes.</AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What smartphones support Wi Fi Calling?</AccordionHeader>
                            <AccordionBody>Most current smartphones, both Android and iPhone, have the capability for Wi Fi Calling. If unsure, refer to your device&apos;s settings or manual for further details.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>Are international calls made over Wi-Fi Calling free?</AccordionHeader>
                            <AccordionBody>No. It&apos;s important to understand that Wi-Fi Calling does not make international calls free. Zoiko Mobile&apos;s rates for international calls made via Wi Fi Calling are generally the same as their standard international calling rates for calls made over the cellular network from within the US.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>How much do international calls cost when using Wi Fi Calling?</AccordionHeader>
                            <AccordionBody>Zoiko Mobile&apos;s international calling rates apply and vary depending on the country you are calling. The rates for same-country calls made via Wi Fi Calling are typically the same as the rates for calls made using your regular cellular connection. For the most accurate and up-to-date pricing information, please contact Zoiko Mobile directly or visit our plan page.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>Where can I find Zoiko Mobile&apos;s international calling rates?</AccordionHeader>
                            <AccordionBody>Contact Zoiko Mobile customer service or visit our website for the most up-to-date information on international calling rates and any associated fees. Do not assume that calls made over Wi-Fi are free just because you are using a Wi-Fi connection.</AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="4">
                            <AccordionHeader>Who should I contact for more information about Wi Fi Calling and international calling rates?</AccordionHeader>
                            <AccordionBody>Contact Zoiko Mobile directly for full details and terms of service related to Wi Fi Calling service and international calls. Our customer support agents can provide you with the most accurate and personalized information regarding your account and calling plans.</AccordionBody>
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
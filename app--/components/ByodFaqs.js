"use client"
import Link from 'next/link';
import { Container, Tab, Tabs, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';

function ByodFaqs() {
    return (
        <Container fluid className='bglite'>
            <Container className="justify-content-center py-5">
                <Tabs defaultActiveKey="home" id="fill-tab-example" fill>
                    <Tab eventKey="home" title="General Information">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What is Zoiko Mobile&apos;s BYOD program?</AccordionHeader>
                                <AccordionBody>The Zoiko Mobile BYOD program lets you bring your current phone and enjoy affordable, high-performance mobile service. Just check compatibility, get a SIM or eSIM, and activate your plan - no new phone required.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Which network does Zoiko Mobile use?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile operates on T-Mobile&apos;s industry-leading nationwide network, delivering fast speeds, strong coverage, and 5G access where available.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Why choose Zoiko Mobile for BYOD?</AccordionHeader>
                                <AccordionBody>
                                    <ul>
                                        <li>Keep your phone & number - No need to buy a new device</li>
                                        <li>Flexible plans for everyone - Choose from Prepaid, Postpaid, Business, Travel, and Top-Up Plans</li>
                                        <li>No contracts, no hidden fees - Just straightforward, affordable service</li>
                                        <li>Nationwide 5G coverage - Enjoy fast speeds and seamless connectivity</li>
                                        <li>24/7 expert support - Call 800-988-8116 anytime</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="device" title="Device Compatibility">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Which network does Zoiko Mobile use?</AccordionHeader>
                                <AccordionBody>Use our Device Compatibility Checker - just enter your IMEI number to confirm if your phone works with Zoiko Mobile.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>What types of phones are supported?</AccordionHeader>
                                <AccordionBody>Most unlocked GSM devices are compatible, including those from T-Mobile, AT&T, and many international models.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Does my phone need to be unlocked?</AccordionHeader>
                                <AccordionBody>Yes. If your phone is locked to another carrier, contact them to request an unlock before switching to Zoiko Mobile.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Can I bring a 5G phone?</AccordionHeader>
                                <AccordionBody>Absolutely! If your phone is 5G-capable and supports T-Mobile&apos;s 5G network, you&apos;ll enjoy ultrafast speeds where 5G is available.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="switch" title="Switching to Zoiko Mobile">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>How do I bring my phone to Zoiko Mobile?</AccordionHeader>
                                <AccordionBody>Switching is quick and easy:<br />Step 1: Check compatibility using our IMEI tool.<br /> Step 2: Order a Zoiko Mobile SIM or eSIM.<br /> Step 3: Activate your service online in minutes.<br />Step 4: Insert your SIM (if applicable), restart your phone, and enjoy!</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Can I keep my current phone number?</AccordionHeader>
                                <AccordionBody>Yes! During activation, select &quot;Keep My Number&quot; and provide your current carrier account details to transfer your number seamlessly.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Do I need a new SIM card?</AccordionHeader>
                                <AccordionBody>Yes. You&apos;ll need a Zoiko Mobile SIM or eSIM, depending on your device. Order one here.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>How do I set up my phone for Zoiko Mobile?</AccordionHeader>
                                <AccordionBody>Most phones automatically configure settings, but if needed, you can find manual APN setup instructions here.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="plans" title="Plans &amp; Coverage">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Which Zoiko Mobile plans work with BYOD?</AccordionHeader>
                                <AccordionBody>You can bring your own phone to any Zoiko Mobile plan, including:
                                    <ul>
                                        <li>Prepaid Plans - Pay monthly, no contracts</li>
                                        <li>Postpaid Plans - Flexible billing with premium features</li>
                                        <li>Business Plans - Scalable solutions for companies</li>
                                        <li>Travel Plans - Stay connected while abroad</li>
                                        <li>Top-Up Plans - Pay-as-you-go flexibility</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Will I get the same coverage as T-Mobile customers?</AccordionHeader>
                                <AccordionBody>Yes! Zoiko Mobile customers enjoy the same premium coverage as T-Mobile users, including nationwide 5G access where available.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Does Zoiko Mobile support international roaming?</AccordionHeader>
                                <AccordionBody>Yes! International roaming is available on select plans. See details <Link href={'https://zoikomobile.com/international-callings/'}>here</Link>.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="support" title="Troubleshooting &amp; Support">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>My phone says &quot;No Service.&quot; What should I do?</AccordionHeader>
                                <AccordionBody>Try these quick fixes:
                                    <ul>
                                        <li>Ensure your SIM is properly inserted.</li>
                                        <li>Restart your phone.</li>
                                        <li>Check your APN settings here.</li>
                                        <li>Still need help? Call us at 800-988-8116.</li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>How do I unlock my phone if it&apos;s carrier-locked?</AccordionHeader>
                                <AccordionBody>Contact your previous carrier to request an unlock. Most carriers have eligibility conditions before unlocking a device.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>I transferred my number, but it&apos;s not working. What should I do?</AccordionHeader>
                                <AccordionBody>Number transfers (porting) usually complete within a few hours. If it takes longer than 24 hours, restart your phone and check your SIM. Need help? Call 800-988-8116.
                                    <h3>How do I contact Zoiko Mobile support?</h3>
                                    We&apos;re here for you 24/7! Reach out via:
                                    <ul>
                                        <li>Phone: 800-988-8116</li>
                                        <li>Live Chat: Available on our website here</li>
                                        <li>Email: <Link href={'support@zoikomobile.com'}>support@zoikomobile.com</Link></li>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Ready to Make the Switch?</AccordionHeader>
                                <AccordionBody>Join Zoiko Mobile today and enjoy premium coverage, affordable plans, and hassle-free service.<br />👉 Check Compatibility | 👉 Order a SIM/eSIM | 👉 Explore Plans</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
}

export default ByodFaqs;
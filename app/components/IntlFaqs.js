"use client"
import Link from 'next/link';
import { Container, Tab, Tabs, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';

function IntlFaqs() {
    return (
        <Container fluid className='bglite'>
            <Container className="justify-content-center py-5">
                <Tabs defaultActiveKey="general" id="fill-tab-example" fill>
                    <Tab eventKey="general" title="General Questions">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What is international long distance calling?</AccordionHeader>
                                <AccordionBody>International long distance calling allows you to make phone calls from the United States to people in other countries.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Are international calls included in Zoiko Mobile plans?</AccordionHeader>
                                <AccordionBody>Yes, all Zoiko Mobile plans include free international calling minutes to over 246 countries. The allowance varies depending on the destination country and whether you are calling a landline or mobile number.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>How does Zoiko Mobile compare to other carriers for international calling?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile offers free international calling minutes to over 246 countries as part of every plan, with no additional activation or hidden fees. Most other carriers charge extra for similar services or cover fewer countries, making Zoiko Mobile a more affordable and comprehensive choice.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey='3'>
                                <AccordionHeader>Do I need to activate international calling on my Zoiko Mobile plan?</AccordionHeader>
                                <AccordionBody>No activation is required. International calling is automatically included in all Zoiko Mobile plans.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey='4'>
                                <AccordionHeader>Can I use Zoiko Mobile&apos;s international calling feature on any device?</AccordionHeader>
                                <AccordionBody>Yes, you can use Zoiko Mobile&apos;s international calling feature on any device compatible with our network, including smartphones and tablets.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="countries" title="Countries &amp; Coverages">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>How many countries are included in Zoiko Mobile&apos;s international calling feature?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile offers international calling to over 246 countries.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Where can I find the list of supported countries and allowances?</AccordionHeader>
                                <AccordionBody>You can view the full list of supported countries, along with the specific minute allowances for landlines and mobile numbers, on the Zoiko Mobile website under the International Calling section.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Does the allowance vary depending on the country or type of number I call?</AccordionHeader>
                                <AccordionBody>Yes! This special offer can be combined with other promotions from Zoiko Mobile.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Are there any restrictions on calling certain numbers?</AccordionHeader>
                                <AccordionBody>Free international calling minutes apply to standard landline and mobile numbers in the supported countries. Calls to premium-rate numbers, toll-free numbers, and certain special services are not included and may incur additional charges.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey='4'>
                                <AccordionHeader>What happens if I call a country not included in the free minutes?</AccordionHeader>
                                <AccordionBody>Absolutely! You can nominate up to five family members or friends to enjoy the same discount on their BYOD plans.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="usage" title="Usage &amp; Billing">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>How many international minutes are included in my plan?</AccordionHeader>
                                <AccordionBody>The number of minutes included varies by country and the type of number you are calling (landline or mobile). Check the Zoiko Mobile website for detailed information about your specific allowance.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>What happens if I exceed my international calling allowance?</AccordionHeader>
                                <AccordionBody>If you use all of your free minutes for a specific country, any additional minutes will be billed at Zoiko Mobile&apos;s standard international rates.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Will I be notified when I am close to exceeding my allowance?</AccordionHeader>
                                <AccordionBody>Yes, Zoiko Mobile will send you usage notifications when you are approaching the end of your free minutes.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Are there any hidden fees for international calls?</AccordionHeader>
                                <AccordionBody>No, Zoiko Mobile does not charge hidden fees. You will only be billed for international calls if you exceed your free minutes or call premium numbers.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey='4'>
                                <AccordionHeader>Can I carry unused international minutes to the next month?</AccordionHeader>
                                <AccordionBody>No, unused international minutes do not roll over to the next billing cycle.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="international" title="How To Make International Calls">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>How do I make an international call with Zoiko Mobile?</AccordionHeader>
                                <AccordionBody>To make an international call:
                                    <ul>
                                        <ol>Dial &quot;+&quot; or &quot;011&quot; (the international dialing code).</ol>
                                        <ol>Enter the country code of the destination you are calling.</ol>
                                        <ol>Dial the phone number, including the area code if required.</ol>
                                        <ol>Press the call button to connect.</ol>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Can I make international calls using Wi-Fi Calling?</AccordionHeader>
                                <AccordionBody>Yes, Zoiko Mobile supports international calls through Wi-Fi Calling. These calls will count toward your free international calling allowance.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Can I use my Zoiko Mobile plan to make international calls while traveling abroad?</AccordionHeader>
                                <AccordionBody>No, the free international calling allowance applies only to calls made from the United States to other countries. For calls made while abroad, you may need an international roaming plan.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey='3'>
                                <AccordionHeader>Can I block international calling on my plan?</AccordionHeader>
                                <AccordionBody>Yes, you can request to block international calling on your line if you do not wish to use this feature. Contact customer support to enable this option.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="support" title="Technical Support">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>What should I do if I cannot make an international call?</AccordionHeader>
                                <AccordionBody>If you experience issues making an international call:
                                    <ul>
                                        <ol>Verify that you have dialed the number correctly, including the country code.</ol>
                                        <ol>Check your usage to ensure you have not used up your free minutes for the country you are calling.</ol>
                                        <ol>Contact Zoiko Mobile&apos;s 24/7 customer support for assistance on 800-988-8116</ol>
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Does Zoiko Mobile support international video calls?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile does not currently support video calls as part of its international calling feature. However, you can use third-party apps to make video calls over Wi-Fi or mobile data.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>What happens if my international call gets disconnected?</AccordionHeader>
                                <AccordionBody>You can redial the number, and only the duration of your connected calls will count toward your free minutes.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="features" title="Features &amp; Offers">
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <AccordionHeader>Can I purchase additional international calling minutes?</AccordionHeader>
                                <AccordionBody>Yes, Zoiko Mobile offers additional international calling minutes for purchase if you frequently exceed your allowance. Contact customer support for details.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <AccordionHeader>Does Zoiko Mobile offer unlimited international calling plans?</AccordionHeader>
                                <AccordionBody>Currently, Zoiko Mobile does not offer unlimited international calling plans. However, our generous allowances and competitive rates are designed to meet most users&apos; needs.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="2">
                                <AccordionHeader>Are there special discounts for calling specific countries?</AccordionHeader>
                                <AccordionBody>Zoiko Mobile&apos;s standard plans include affordable international rates. Periodic promotions or discounts may be available for high-demand destinations. Visit our website or contact customer support for updates.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey="3">
                                <AccordionHeader>Can I track my international calling usage?</AccordionHeader>
                                <AccordionBody>Yes, you can track your international calling usage in real time through your Zoiko Mobile account or mobile app.</AccordionBody>
                            </AccordionItem>
                            <AccordionItem eventKey='4'>
                                <AccordionHeader>Does Zoiko Mobile provide customer support in multiple languages?</AccordionHeader>
                                <AccordionBody>Yes, Zoiko Mobile offers multilingual customer support to assist our diverse customer base.</AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
}

export default IntlFaqs;
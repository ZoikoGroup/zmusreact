"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import {Accordion, AccordionBody, AccordionHeader, AccordionItem, Container} from "react-bootstrap";

export default function FaqPage() {
    return (
        <>
        <Header />
        <HeadBar text={<>Got Questions? Zoikos Got Answers!</>} />
        <Container fluid className="p-0 bglite">
            <Container className="py-4">
                <Accordion>
                    <AccordionItem eventKey="0">
                        <AccordionHeader>What is Zoiko Mobile?</AccordionHeader>
                        <AccordionBody>Zoiko Mobile is a mobile virtual network operator (MVNO) that provides affordable and flexible mobile plans using established networks. We offer a variety of plans to suit different needs, including unlimited talk, text, and data options.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="1">
                        <AccordionHeader>How do I get started with Zoiko Mobile?</AccordionHeader>
                        <AccordionBody>Getting started is simple! Choose a plan that suits your needs, order your SIM card, and activate it online or with customer support. You can even bring your own device to get started with us.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="2">
                        <AccordionHeader>What types of mobile plans do you offer?</AccordionHeader>
                        <AccordionBody>We offer flexible plans, including monthly contracts, pay-as-you-go options, and plans that allow you to bring your own device (BYOD). All our plans are designed to give you maximum value and the best mobile experience.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="3">
                        <AccordionHeader>Can I bring my own device to Zoiko Mobile?</AccordionHeader>
                        <AccordionBody>Absolutely! If your device is unlocked and compatible with our network, you can easily bring it and choose a plan that suits you.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="4">
                        <AccordionHeader>Do you sell mobile phones?</AccordionHeader>
                        <AccordionBody>Yes! Zoiko Mobile offers a variety of mobile phones that you can purchase directly from us, along with accessories to complement your device.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="5">
                        <AccordionHeader>Is Zoiko Mobile available in my area?</AccordionHeader>
                        <AccordionBody>Zoiko Mobile is available nationwide! We provide coverage in most areas, so you can enjoy reliable service no matter where you are.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="6">
                        <AccordionHeader>What is the meaning of Zoiko Mobiles tagline, Connecting Every Possibility?</AccordionHeader>
                        <AccordionBody>Connecting Every Possibility reflects our mission to offer affordable and innovative mobile technology that helps you stay connected to what matters most, whether thats family, work, or your passions.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="7">
                        <AccordionHeader>How do I activate my Zoiko Mobile SIM card?</AccordionHeader>
                        <AccordionBody>Activating your SIM is simple! Follow the instructions that come with your SIM card, or you can activate it online through your Zoiko Mobile account. If you need any help, our customer service team is always available to assist.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="8">
                        <AccordionHeader>What should I do if I need help or support?</AccordionHeader>
                        <AccordionBody>If you need assistance, our customer support team is here to help! You can reach us via phone, email, or live chat on our website. Were committed to providing excellent service and support to all our customers.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="9">
                        <AccordionHeader>Are there any special discounts or promotions available?</AccordionHeader>
                        <AccordionBody>Yes! Zoiko Mobile frequently offers special discounts and promotions. Be sure to check our website or subscribe to our newsletter to stay updated on the latest deals and offers.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="10">
                        <AccordionHeader>What payment methods do you accept?</AccordionHeader>
                        <AccordionBody>We accept various payment methods, including credit and debit cards, PayPal, and other online payment options. You can choose the method that is most convenient for you when signing up for a plan.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="11">
                        <AccordionHeader>Can I change or cancel my plan at any time?</AccordionHeader>
                        <AccordionBody>Yes! Zoiko Mobile offers flexible plans that allow you to change or cancel your plan at any time without any penalties. You can manage your plan through your online account or by contacting our customer support team.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="12">
                        <AccordionHeader>Do you offer international roaming?</AccordionHeader>
                        <AccordionBody>Yes, we offer international roaming options on select plans. Please check the details of your chosen plan or contact our customer support team for more information about international roaming availability and rates.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="13">
                        <AccordionHeader>What is your return policy?</AccordionHeader>
                        <AccordionBody>We have a 30-day return policy for unused SIM cards and devices. If youre not satisfied with your purchase, please contact our customer support team to initiate a return and receive a refund.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="14">
                        <AccordionHeader>How can I stay updated on Zoiko Mobile news and offers?</AccordionHeader>
                        <AccordionBody>You can stay informed by subscribing to our newsletter, following us on social media, and regularly checking our website for the latest news, updates, and special offers.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="15">
                        <AccordionHeader>Do you have a referral program?</AccordionHeader>
                        <AccordionBody>Yes! Zoiko Mobile offers a referral program where you can earn rewards for referring friends and family to our service. Check our website for more details on how to participate and the benefits you can receive.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="16">
                        <AccordionHeader>What networks does Zoiko Mobile use?</AccordionHeader>
                        <AccordionBody>Zoiko Mobile partners with major network providers to deliver reliable coverage and high-speed data. This ensures that our customers have access to quality service across a wide area.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="17">
                        <AccordionHeader>Is there a mobile app for Zoiko Mobile?</AccordionHeader>
                        <AccordionBody>Yes, we have a mobile app that allows you to manage your account, view usage, pay bills, and access customer support easily from your smartphone. The app is available for both iOS and Android devices.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="18">
                        <AccordionHeader>How do I contact Zoiko Mobile customer support?</AccordionHeader>
                        <AccordionBody>You can contact our customer support team via phone, email, or live chat on our website. Were here to assist you with any questions or issues you may have.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="19">
                        <AccordionHeader>What should I do if I lose my phone or it gets stolen?</AccordionHeader>
                        <AccordionBody>If your phone is lost or stolen, please contact our customer support team immediately. We can help you suspend your service to prevent unauthorized usage and guide you through the steps to get a replacement SIM card.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="20">
                        <AccordionHeader>Do you offer family plans?</AccordionHeader>
                        <AccordionBody>Yes, Zoiko Mobile offers family plans that allow multiple lines under one account with shared data and discounts. Check our website for details on available family plan options.</AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
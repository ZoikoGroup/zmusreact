"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Container } from "react-bootstrap";
import React, { useState } from "react";

const Switch = () => {

    const [isToggled, setIsToggled] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const toggleView = () => {
        setOpen(!isOpen);
        setIsToggled(!isToggled);
    }

    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Switch & Save to Zoiko Mobile: Value Meets Exceptional Service" />
        <Container fluid className="bglite py-5 px-0">
            <Container>
                <p>Welcome to Zoiko Mobile! Our &quot;Switch &amp; Save&quot; initiative is transforming mobile connectivity for both individuals and businesses. If you&apos;re looking for a mobile plan that gives you more for less, you&apos;ve come to the right place. Our plans are designed to offer substantial savings, generous data allowances, and extensive coverage, ensuring you stay connected in every way that matters.</p>
                <p className="txtred body22">Making the Switch is as Simple as 1, 2, 3</p>
                <p><span className="txtred">1. Evaluate Your Current Mobile Plan:</span> Take a look at your monthly expenses and data usage. Ready for an upgrade?</p>
                <p><span className="txtred">2. Compare and Discover the Zoiko Advantage:</span> Check out our comparison section to see how our plans stack up against your current plan. Spoiler alert: you&apos;ll be impressed! Click here to compare plans.</p>
                <p><span className="txtred">3. Switch Effortlessly Online:</span> Use our simple online tool to make the switch. From transferring your number with a PAC code to finalizing your plan, everything is designed to make your transition smooth and hassle-free.</p>
                {isOpen && (
                    <>
                    <p><span className="txtred body22">Why Choose Zoiko Mobile?</span><br />
                    <span className="txtred">Guaranteed Savings:</span> Find a comparable plan for less elsewhere? We&apos;ll match the difference for the duration of your current contract, ensuring you&apos;re always getting the best deal.<br />
                    <span className="txtred">Unbeatable Value:</span> Our plans are up to 400% more cost-effective than major competitors, including Vodafone, Three, and Tesco Mobile, without compromising on quality or service.<br />
                    <span className="txtred">Generous Data Offers:</span> From 10GB to Unlimited, our plans are priced to give you more data for less. Plus, for just £3 extra a month, leap to 100GB - a value unmatched by the competition.<br />
                    <span className="txtred">Global Connectivity Without Extra Charges:</span> Unlike some competitors, we offer up to 250 free international minutes, making it easier to stay connected with loved ones or business contacts abroad.<br />
                    <span className="txtred">Unlimited Data Plans:</span> With our Unlimited plan, save over competitors like Vodafone, plus enjoy 250 free international minutes.</p>
                    <p><span className="txtred body22">Comparative Insights: Your Business and Personal Needs Addressed</span><br />
                    Zoiko Mobile stands out with its competitive pricing and comprehensive plans tailored for both individual and business use:<br />
                    <span className="txtred">Business Plans Compared:</span> Our business plans, such as the 30GB package at just £11.99, offer more value and savings compared to similar plans from Vodafone UK and Tesco Mobile.<br />
                    <span className="txtred">International Calling Perks:</span> We provide detailed information on the 250 free international minutes included in select plans, ensuring you know exactly how you can connect globally.<br />
                    <span className="txtred">Promotional Offers and Incentives:</span> Check out our latest promotional offers and sign-up incentives designed to give you even more value from the moment you join.<br />
                    <span className="txtred">Testimonials and Customer Reviews:</span> Don&apos;t just take our word for it. Read what our satisfied customers say about the difference Zoiko Mobile has made in their connectivity and savings.<br />
                    <span className="txtred">Environmental and Social Commitments:</span> Choosing Zoiko Mobile is a step towards supporting sustainable and ethical mobile services. We&apos;re committed to reducing our environmental impact and supporting community initiatives.</p>
                    <p><span className="txtred body22">Seize the Zoiko Advantage Now</span><br />Begin your journey to enhanced connectivity and savings today. Explore our plans, compare with your current service, and switch online effortlessly - all right here on our website! Zoiko Mobile not only promises but delivers unmatched value and service.</p>
                    <p><span className="txtred body22">Ready to Switch?</span><br />
                    Great! Click the button below to get started with our hassle-free online switching tool. We&apos;ll handle your number transfer with a PAC code if needed. Click here to switch online: link to your CRM switching tool Welcome to Zoiko Mobile - Connecting Every Possibility. The smart choice for those who demand more from their mobile service.</p>
                    </>
                )}
                <div className="py-4 text-center"><a className="txtred" href="#" onClick={toggleView}>{isToggled ? 'Read Less' : 'Read More'}</a></div>
                <div className="py-4 text-center"><Button variant="outline-danger" size="lg" href="/zoiko-mobile-switch-save-form">Switch &amp; Save</Button></div>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default Switch;
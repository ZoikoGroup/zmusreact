"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const IntellectualProperty = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Intellectual Property Notice" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <h4 className="txtred">Protecting Our Intellectual Property</h4>
                <p>All content, trademarks, logos, and other intellectual property displayed on the Zoiko Mobile website are the property of Zoiko Mobile Inc. or third parties. We take intellectual property rights seriously and take measures to protect our intellectual property.</p>
                <h4 className="txtred">Trademarks</h4>
                <p>The Zoiko Mobile name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Zoiko Mobile Inc. or its affiliates. You may not use these trademarks without our prior written permission.</p>
                <h4 className="txtred">Copyright</h4>
                <p>All content on the Zoiko Mobile website, including text, images, graphics, videos, and audio files, is protected by copyright laws and belongs to Zoiko Mobile Inc. or its licensors. You may not reproduce, distribute, modify, or create derivative works of this content without our express permission.</p>
                <h4 className="txtred">License to Use</h4>
                <p>We grant you a limited, non-exclusive, non-transferable license to access and use the Zoiko Mobile website for your personal, non-commercial use. This license does not include the right to download or modify any content, except for personal use as permitted by these Terms &amp; Conditions.</p>
                <h4 className="txtred">Reporting Intellectual Property Infringement</h4>
                <p>If you believe that your intellectual property rights have been infringed upon by Zoiko Mobile or any third party using our website, please contact us immediately at support@zoikomobile.com. We will investigate and take appropriate action as necessary.</p>
                <h4 className="txtred">Disclaimer</h4>
                <p>While we make every effort to ensure the accuracy and reliability of the content on our website, we do not guarantee that it is error-free or that your use of the website will be uninterrupted. We are not liable for any damages or losses resulting from the use of our website or the content provided therein.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about our Intellectual Property Notice, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default IntellectualProperty;
"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const CaliforniaAct = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Regulatory Information" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <p>Zoiko Mobile is committed to protecting the privacy rights of our customers in accordance with the California Consumer Privacy Act (CCPA). This Privacy Notice outlines your rights under the CCPA and how we collect, use, and disclose personal information.</p>
                <h4 className="txtred">We may collect the following categories of personal information from our customers:</h4>
                <ol>
                    <li>Identifiers such as name, email address, and phone number.</li>
                    <li>Commercial information such as purchase history and payment information.</li>
                    <li>Internet activity such as browsing history and interactions with our website Geolocation data.</li>
                    <li>Professional or employment-related information.</li>
                    <li>Other information that identifies, relates to, describes, or is capable of being associated with you</li>
                </ol>
                <h4 className="txtred">How We Use Personal Information</h4>
                <h5 className="txtred">We may use personal information for the following purposes:</h5>
                <ol>
                    <li>Providing and improving our products and services.</li>
                    <li>Processing transactions and fulfilling orders.</li>
                    <li>Communicating with you about promotions, offers, and updates.</li>
                    <li>Customizing and personalizing your experience.</li>
                    <li>Analyzing website usage and trends.</li>
                    <li>Complying with legal and regulatory requirements.</li>
                </ol>
                <h4 className="txtred">Your Rights Under the CCPA</h4>
                <div className="ps-3">
                    <h5 className="txtred">Under the CCPA, California residents have the following rights regarding their personal information:</h5>
                    <h5 className="txtred">1. Right to Know:</h5>
                    <p>You have the right to request information about the categories of personal information we have collected, the sources from which it was collected, the purposes for which it was collected, and the categories of third parties with whom we share it.</p>
                    <h5 className="txtred">2. Right to Opt-Out:</h5>
                    <p>You have the right to opt-out of the sale of your personal information to third parties.</p>
                    <h5 className="txtred">3. Right to Delete:</h5>
                    <p>You have the right to request the deletion of your personal information, subject to certain exceptions.</p>
                    <h5 className="txtred">4. Right to Non-Discrimination:</h5>
                    <p>We will not discriminate against you for exercising any of your CCPA rights.</p>
                </div>
                <h4 className="txtred">How to Exercise Your Rights</h4>
                <p>To exercise your rights under the CCPA, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>. We will respond to your request in accordance with applicable law.</p>
                <h4 className="txtred">Additional Information</h4>
                <p>For more detailed information about our privacy practices, including how we collect, use, and disclose personal information, please review our Privacy Policy.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about our CCPA Privacy Notice or your privacy rights, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default CaliforniaAct;
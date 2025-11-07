"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Privacy Policy" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <p>At Zoiko Mobile, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our products or services, or otherwise interact with us.</p>
                <h4 className="txtred">Information We Collect</h4>
                <ol>
                    <li>Personal Information: We may collect personal information that you provide to us, such as your name, email address, phone number, and billing information, when you register for an account, make a purchase, or contact us for support.</li>
                    <li>Usage Data: We may collect information about your interactions with our website, such as your IP address, browser type, pages visited, and referral URL. This information helps us improve our website and provide a better user experience.</li>
                    <li>Cookies: We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but please note that disabling cookies may affect the functionality of our website.</li>
                </ol>
                <h4 className="txtred">How We Use Your Information</h4>
                <p className="body22 txtred">We may use the information we collect for the following purposes:</p>
                <ol>
                    <li>To process transactions and fulfill orders</li>
                    <li>To provide customer support and respond to inquiries</li>
                    <li>To personalize your experience and improve our website</li>
                    <li>To send promotional emails and marketing communications</li>
                    <li>To comply with legal and regulatory requirements</li>
                    <li>To enhance and optimise our website&apos;s functionality, user experience, and content.</li>
                </ol>
                <h4 className="txtred">Data Security</h4>
                <p>We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                <h4 className="txtred">Data Retention</h4>
                <p>We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and as required by applicable laws and regulations. When your information is no longer needed, we will securely dispose of it.</p>
                <h4 className="txtred">Third-Party Links</h4>
                <p>Our website may contain links to third-party websites or services that are not owned or controlled by Zoiko Mobile. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
                <h4 className="txtred">Children&apos;s Privacy</h4>
                <p>Our website and services are not directed to children under the age of 13, and we do not knowingly collect personal information from children. If you are under 13 years of age, please do not provide any personal information to us.</p>
                <h4 className="txtred">Updates to Privacy Policy</h4>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated Privacy Policy on our website.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about our Privacy Policy or our practices regarding your personal information, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default PrivacyPolicy;
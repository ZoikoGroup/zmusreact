"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const CustomerService = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Customer Service" />
        <Container fluid className="bglite">
            <Container className="py-5">
                <p className="body22">At Zoiko Mobile, our customers are at the heart of everything we do. We are dedicated to providing exceptional customer service and ensuring that your experience with us is smooth, efficient, and enjoyable. Whether you need assistance with your mobile plan, device, or any other service, our team is here to help.</p>
                <h4 className="txtred">How Can We Help You?</h4>
                <h5 className="txtred pt-4">1. General Inquiries</h5>
                <p>If you have any questions about our products, services, or policies, our customer service representatives are ready to assist you. Reach out to us via phone, email, or live chat.</p>
                <h5 className="txtred">2. Technical Support</h5>
                <p>Experiencing technical issues with your device or service? Our technical support team can help troubleshoot and resolve any problems you encounter.</p>
                <h5 className="txtred">3. Billing &amp; Account Management</h5>
                <p>For questions related to billing, payments, or managing your account, our customer service team can provide clear and helpful guidance.</p>
                <h5 className="txtred">4. Plan Upgrades &amp; Changes</h5>
                <p>Looking to upgrade your mobile plan or make changes to your current service? We can help you find the best options to meet your needs.</p>
                <h5 className="txtred">5. Device Protection &amp; Warranty</h5>
                <p>Learn more about our device protection plans and warranty policies. If you need to file a claim or have questions about coverage, we are here to assist.</p>
                <h4 className="txtred pt-4">Contact Us</h4>
                <h5 className="txtred pt-2">Phone Support</h5>
                <p>Tel: 800-988-8116<br />Available: Monday to Friday, 8 AM - 8 PM (EST)</p>
                <h5 className="txtred">Email Support</h5>
                <p>General Inquiries: <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>.</p>
                <h5 className="txtred">Technical Support</h5>
                <p><a href="mailto:techsupport@zoikomobile.com" className="txtred">techsupport@zoikomobile.com</a><br />Billing &amp; Account: <a href="mailto:billing@zoikomobile.com" className="txtred">billing@zoikomobile.com</a></p>
                <h5 className="txtred">Live Chat</h5>
                <p>Visit our website and click on the live chat icon to connect with a representative.<br />Available: Monday to Friday, 8 AM - 8 PM (EST)</p>
                <h5 className="txtred">Feedback &amp; Suggestions</h5>
                <p>Your feedback is invaluable to us. If you have any suggestions or comments on how we can improve our services, we encourage you to contact our team via email or phone. We are committed to continuously enhancing our customer experience.</p>
                <h5 className="txtred">Zoiko Mobile Contact Information</h5>
                <p>Phone: 800-988-8116<br />Address: 5900 Balcones Drive, Suite 100,<br />Austin, TX 78731</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default CustomerService;
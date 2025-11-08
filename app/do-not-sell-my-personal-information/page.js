"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const DoNotTell = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Do Not Sell My Personal Information" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <h4 className="txtred">Your Right to Opt-Out</h4>
                <p>Under the California Consumer Privacy Act (CCPA), California residents have the right to opt-out of the sale of their personal information to third parties. Zoiko Mobile respects your privacy preferences and offers you the ability to exercise this right.</p>
                <h4 className="txtred">How to Opt-Out</h4>
                <p>If you would like to opt-out of the sale of your personal information, please contact us directly at support@zoikomobile.com and provide us with your request to opt-out. Please include &quot;Opt-Out Request&quot; in the subject line and provide your full name, email address, and any other information necessary to process your request.</p>
                <h4 className="txtred">Additional Information</h4>
                <p>Opting out of the sale of your personal information will not affect your ability to access or use our products and services. Please note that we may still collect and use your personal information for other purposes permitted by law, such as providing our products and services, fulfilling transactions, and complying with legal obligations.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about opting out of the sale of your personal information, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>. We are here to assist you and address any inquiries you may have.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default DoNotTell;
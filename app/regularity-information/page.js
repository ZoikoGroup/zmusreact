"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const RegulatoryInformation = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Regulatory Information" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <h4 className="txtred">Committed to Compliance and Transparency</h4>
                <p>Zoiko Mobile is committed to adhering to all relevant regulatory requirements and ensuring compliance with industry standards. We prioritize transparency and accountability in our operations, and we strive to provide clear and accessible regulatory information to our customers.</p>
                <h4 className="txtred">Federal Communications Commission (FCC) Compliance</h4>
                <p>Zoiko Mobile operates in accordance with the regulations set forth by the Federal Communications Commission (FCC), the United Statesgovernment agency responsible for regulating interstate and international communications by radio, television, wire, satellite, and cable.</p>
                <h4 className="txtred">State Regulations</h4>
                <p>As a telecommunications provider operating in the United States, Zoiko Mobile complies with all applicable state regulations governing the provision of mobile services, including licensing, taxation, and consumer protection laws.</p>
                <h4 className="txtred">Privacy Regulations</h4>
                <p>Protecting the privacy and security of our customers&apos; personal information is of paramount importance to us. Zoiko Mobile complies with all relevant privacy regulations, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR), as applicable.</p>
                <h4 className="txtred">Transparency Reports</h4>
                <p>We are committed to transparency in our operations and regularly publish reports detailing our compliance efforts, including disclosures related to government requests for customer information and data privacy practices.</p>
                <h4 className="txtred">Consumer Rights</h4>
                <p>Zoiko Mobile is dedicated to upholding consumer rights and ensuring that our customers have access to the information and resources they need to make informed decisions about our products and services. We provide clear and accessible information about our terms of service, privacy policy, and consumer rights.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about regulatory compliance or our commitment to transparency, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>. We are here to assist you and address any inquiries you may have.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default RegulatoryInformation;
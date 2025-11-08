"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Image } from "react-bootstrap";

const ReturnPolicy = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Return & Warranty Policy" />
        <Container fluid className="bglite py-5 px-0">
            <Container>
                <h4 className="txtred">1. Your Satisfaction Guaranteed with Zoiko Mobile</h4>
                <p className="px-4">At Zoiko Mobile, we strive to provide our customers with high-quality products and exceptional service. If for any reason you are not completely satisfied with your purchase, we offer a comprehensive return and warranty policy to ensure your peace of mind.</p>
                <h4 className="txtred">2. Returns</h4>
                <p className="px-4">1. 30-Day Satisfaction Guarantee<br />2. If you are not satisfied with your purchase for any reason, you may return it within 30 days of the purchase date for a full refund or exchange.<br />3. All returned items must be in their original condition, with all accessories and packaging included.<br />4. Return shipping costs are the responsibility of the customer, unless the return is due to a manufacturing defect or an error on our part.</p>
                <h4 className="txtred">3. How to Initiate a Return</h4>
                <p className="px-4">1. Email <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a> to request a return authorization.<br />2. Once your return is approved, you will receive instructions on how to return the item.</p>
                <h4 className="txtred">4. Refunds</h4>
                <p className="px-4">Refunds will be issued to the original payment method used for the purchase within 3-5 business days after the returned item is received and inspected.</p>
                <h4 className="txtred">5. Warranty</h4>
                <p className="px-4"><span className="txtred">Manufacturers Warranty</span><br />All devices purchased from Zoiko Mobile come with a manufacturer&apos;s warranty, covering defects in materials and workmanship for a specified period.<br />Warranty terms and coverage vary depending on the manufacturer and product. Please refer to the warranty documentation included with your device for details.</p>
                <p className="px-4"><span className="txtred">Extended Warranty Options</span><br />We offer optional extended warranty plans for additional coverage beyond the manufacturer&apos;s warranty period. Contact our customer service team for more information on extended warranty options.</p>
                <h4 className="txtred">6. Exclusions</h4>
                <p className="px-4">Our return policy does not cover items that have been damaged due to misuse, neglect, or accidental damage.<br />The warranty does not cover normal wear and tear, cosmetic damage, or damage caused by unauthorized repairs or modifications.</p>
                <h4 className="txtred">7. Contact Us</h4>
                <p className="px-4">If you have any questions or concerns about our return and warranty policy, please contact our customer service team at:</p>
                <p className="px-4">Phone: 800-988-8116<br />Email: <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a><br />Address: 5900 Balcones Drive, Suite 100,<br />Austin, TX 78731</p>
                <p className="px-4">We are here to assist you and ensure that you have a positive experience with Zoiko Mobile.</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default ReturnPolicy;
"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const Terms = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Terms And Conditions" />
        <Container fluid className="bglite py-5">
            <Container>
                <h4 className="txtred">Welcome to Zoiko Mobile</h4>
                <p>These Terms &amp; Conditions govern your use of the Zoiko Mobile website, products, and services. By accessing or using our website or purchasing our products or services, you agree to be bound by these Terms &amp; Conditions. Please read them carefully before proceeding.</p>
                <h4 className="txtred">Acceptance of Terms</h4>
                <p>By accessing or using the Zoiko Mobile website, you agree to abide by these Terms &amp; Conditions, as well as any additional terms and conditions applicable to specific products or services offered by Zoiko Mobile.</p>
                <h4 className="txtred">Use of Website</h4>
                <p>You may use the Zoiko Mobile website for lawful purposes only and in accordance with these Terms &amp; Conditions. You agree not to engage in any conduct that could damage, disable, overburden, or impair the website or interfere with any other party&apos;s use of the website.</p>
                <h4 className="txtred">Privacy Policy</h4>
                <p>Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and disclose information about you when you access or use our website or purchase our products or services.</p>
                <h4 className="txtred">Intellectual Property</h4>
                <p>The content, trademarks, logos, and other intellectual property displayed on the Zoiko Mobile website are owned by Zoiko Mobile or third parties. You may not use, reproduce, modify, or distribute any content from the website without our prior written consent.</p>
                <h4 className="txtred">Disclaimer of Warranties</h4>
                <p>Zoiko Mobile makes no representations or warranties of any kind, express or implied, regarding the website, products, or services. All such content, products, and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without any warranty of any kind.</p>
                <h4 className="txtred">Limitation of Liability</h4>
                <p>To the fullest extent permitted by law, Zoiko Mobile shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website, products, or services.</p>
                <h4 className="txtred">Governing Law</h4>
                <p>These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles.</p>
                <h4 className="txtred">Changes to Terms &amp; Conditions</h4>
                <p>Zoiko Mobile reserves the right to modify or amend these Terms & Conditions at any time without prior notice. Any changes will be effective immediately upon posting on the website. Your continued use of the website after any such changes constitutes your acceptance of the revised Terms &amp; Conditions.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about these Terms & Conditions, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a><br />Thank You for Choosing Zoiko Mobile We appreciate your business and look forward to serving you with high-quality products and excellent customer service.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default Terms;
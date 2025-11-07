"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const CookiePolicy = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Cookie Policy" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
            <h4 className="txtred">Understanding How We Use Cookies</h4>
                <p>At Zoiko Mobile, we use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. This Cookies Policy explains what cookies are, how we use them, and your choices regarding cookies.</p>
                <h4 className="txtred">What are Cookies?</h4>
                <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>
                <h4 className="txtred">How We Use Cookies</h4>
                <ol>
                    <li>Essential Cookies: These cookies are necessary for the operation of our website and enable you to access secure areas, make purchases, and navigate our site effectively.</li>
                    <li>Analytical/Performance Cookies: These cookies allow us to analyze how visitors use our website, track website traffic, and improve our website&apos;s performance and functionality.</li>
                    <li>Functional Cookies: These cookies enable us to personalize your browsing experience by remembering your preferences, such as language settings, and providing enhanced features.</li>
                    <li>Targeting/Advertising Cookies: These cookies may be set by advertising partners to deliver targeted advertisements based on your interests and browsing behavior. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.</li>
                </ol>
                <h4 className="txtred">Your Choices Regarding Cookies</h4>
                <p>You have the option to accept or decline cookies when you visit our website. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, please note that disabling cookies may affect the functionality of our website.</p>
                <h4 className="txtred">Third-Party Cookies</h4>
                <p>We may also use third-party cookies from trusted partners, such as analytics providers and advertising networks, to help us analyze website traffic and deliver targeted advertisements. These third parties may collect information about your online activities over time and across different websites.</p>
                <h4 className="txtred">Updates to Cookies Policy</h4>
                <p>We may update this Cookies Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated Cookies Policy on our website.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about our Cookies Policy or our use of cookies, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default CookiePolicy;
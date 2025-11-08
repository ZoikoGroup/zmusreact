"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const ConsumerInfo = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Consumer Information" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <h4 className="txtred">Your Guide to Zoiko Mobile&apos;s Products and Services</h4>
                <p>At Zoiko Mobile, we are committed to providing our customers with transparent and informative consumer information to help you make informed decisions about our products and services. Below are some key points to help you understand what we offer:</p>
                <h4 className="txtred">Mobile Plans</h4>
                <h5 className="txtred">1. Flexible Plans</h5>
                <p>Choose from a variety of mobile plans tailored to your needs, including individual, family, business, and travel plans (for less than 30 days).</p>
                <h5 className="txtred">2. Unlimited Options:</h5>
                <p>Enjoy unlimited talk, text, and data options with select plans, so you can stay connected without worrying about overage charges.</p>
                <h5 className="txtred">3. Mobile Devices:</h5>
                <p>Customize your plan with add-ons such as international calling, data roaming, and device protection.</p>
                <h4 className="txtred">4. Customizable Features:</h4>
                <p>Upgrade Options: Upgrade to the newest devices with our flexible upgrade programs, allowing you to stay up-to-date with the latest technology.</p>
                <h4 className="txtred">Mobile Devices</h4>
                <h5 className="txtred">1. Latest Devices:</h5>
                <p>Explore a wide selection of the latest smartphones, tablets, and accessories from leading brands.</p>
                <h5 className="txtred">2. Upgrade Options:</h5>
                <p>Upgrade to the newest devices with our flexible upgrade programs, allowing you to stay up-to-date with the latest technology.</p>
                <h5 className="txtred">3. Device Financing:</h5>
                <p>Take advantage of our device financing options to spread the cost of your new device over time.</p>
                <h4 className="txtred">Accessories</h4>
                <h5 className="txtred">1.Enhance Your Experience:</h5>
                <p>Browse our collection of accessories to enhance your mobile experience, including cases, chargers, screen protectors, and more.</p>
                <h5 className="txtred">2. Quality Assurance:</h5>
                <p>Rest assured that all accessories offered by Zoiko Mobile are of the highest quality and compatible with your devices.</p>
                <h4 className="txtred">Customer Support</h4>
                <h5 className="txtred">1. Dedicated Support Team:</h5>
                <p>Our knowledgeable customer support team is available to assist you with any questions or concerns you may have about our products or services.</p>
                <h5 className="txtred">2. Multiple Contact Channels:</h5>
                <p>Reach out to us via phone, email, live chat, or visit one of our retail locations for personalized assistance.</p>
                <h4 className="txtred">Community Engagement</h4>
                <h5 className="txtred">1. Stay Connected:</h5>
                <p>Join the Zoiko Mobile community on social media to stay updated on the latest news, promotions, and events.</p>
                <h5 className="txtred">2. Feedback Welcome:</h5>
                <p>We value your feedback and encourage you to share your thoughts and experiences with us, so we can continue to improve and better serve you.</p>
                <h4 className="txtred">Explore More</h4>
                <p>For more detailed information about our products, services, and policies, please explore our website or contact our customer support team at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>. We are here to help you find the best mobile solutions to fit your lifestyle and needs.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default ConsumerInfo;
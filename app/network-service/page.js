"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

export default function NetworkService() {
    return (
        <>
        <Header />
        <HeadBar text={<>Network &amp; Service</>} />
        <Container fluid className="p-0 bglite">
            <Container className="py-5">
                <h3 className="txtred">Reliable Connectivity, Exceptional Service</h3>
                <p className="body20 mb-4">At Zoiko Mobile, we provide top-tier connectivity by partnering with one of the largest and most trusted network providers in the country. Our partnership ensures that you receive dependable voice and data services across a vast network that covers nearly all of the United States.</p>
                <ol className="body20">
                    <li className="txtred">Network Coverage
                        <ol className="txtred">
                            <li>Nationwide Coverage:<br /><span className="txtblack">With access to a robust nationwide network, we ensure that you stay connected in urban, suburban, and rural areas alike.</span></li>
                            <li>High-Speed Data:<br /><span className="txtblack">Our customers enjoy fast, reliable data speeds, enabling smooth streaming, browsing, and downloading.</span></li>
                            <li>Advanced Technology:<br /><span className="txtblack">We leverage cutting-edge 4G LTE and 5G technologies to deliver fast, seamless, and reliable services.</span></li>
                        </ol>
                    </li>
                    <li className="txtred">Service Plans
                        <ol className="txtred">
                            <li>Flexible Plans:<br /><span className="txtblack">Choose from a variety of service plans designed to suit your needs, whether for individuals or businesses.</span></li>
                            <li>Business Plans:<br /><span className="txtblack">Tailored to meet the needs of businesses, our plans offer flexibility, competitive pricing, and reliable service for your team’s communication needs.</span></li>
                            <li>Travel Plans (Less than 30 Days):<br /><span className="txtblack">Enjoy affordable short-term travel plans with options for talk, text, and data when you’re on the go for less than 30 days.</span></li>
                            <li>Unlimited Options:<br /><span className="txtblack">Select plans with unlimited talk, text, and data, giving you the freedom to stay connected without worrying about overage charges.</span></li>
                            <li>Customizable Features:<br /><span className="txtblack">Personalize your plan with additional options like international calling, data roaming, and device protection to better fit your lifestyle.</span></li>
                        </ol>
                    </li>
                    <li className="txtred">Customer Support
                        <ol>
                            <li>Dedicated Support Team:<br /><span className="txtblack">Our customer support team is here to assist you with any inquiries or issues you may have.</span></li>
                            <li>Multiple Contact Channels:<br /><span className="txtblack">You can reach us by phone, email, live chat, or visit our retail locations for personalized service.</span></li>
                        </ol>
                    </li>
                    <li className="txtred">Innovation &amp; Growth
                        <ol>
                            <li>Commitment to Quality:<br /><span className="txtblack">Our strong network partnership helps us provide high-quality service, and we continue to focus on improving our offerings to meet the evolving needs of our customers.</span></li>
                            <li>Expanding Coverage:<br /><span className="txtblack">As the telecommunications landscape advances, our commitment to delivering the best possible experience through our partnership remains a priority. </span></li>
                        </ol>
                    </li>
                    <li className="txtred">Contact Us<br /><span className="txtblack">If you have any questions about our services, please reach out to us at <a href="mailto:sustainability@zoikomobile.com" style={{color:'#DF1E5A'}}>sustainability@zoikomobile.com</a> We are here to ensure you have a seamless and positive experience with Zoiko Mobile.<br />Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</span></li>
                </ol>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
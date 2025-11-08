"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Image } from "react-bootstrap";

const FreeDeliveryPolicy = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Zoiko Mobile Free Delivery Policy" />
        <Container fluid className="bglite py-5 px-0">
            <Container>
                <div className="pinkboxwraper gap-4 align-items-center">
                    <Image src="/img/flemingo.png" fluid alt="Flemingo" className="w-25 w-sm-100" />
                    <div>
                        <h2 className="bigred">Enjoy Free Deliveries</h2>
                        <h4>Another Reason to Love Zoiko Mobile: Faster &amp; Speedy!</h4>
                    </div>
                </div>
            </Container>
            <Container className="py-5">
                <p><span className="txtred">1. Introduction</span><br />
                We mostly offer free shipping on all selling items to our customers, consisting of USA SIM cards and mobile devices, exclusively to our U.S. shoppers. This policy is entirely outlined in the &apos;Terms and Conditions&apos; page on the &apos;free delivery service section&apos;, and that is equipped to handle your seamless product(s) rapid delivery at no extra cost.</p>
                <p><span className="txtred">2. Eligibility</span><br />
                Free delivery is solely available if all orders have been placed from our online store or customer service channels. This service coverage is applicable only for SIM cards and mobile devices.</p>
                <p><span className="txtred">3. Free Shipping Areas</span><br />Free shipping is only available to all addresses within the contiguous United States (Mainland US), including Alaska and Hawaii. However, shipping time may vary in remote or rural areas, and it will take longer than regular delivery times to reach your destination.<br />Please note that standard delivery times in certain areas typically take longer anywhere from 7 to 12 business days, due to certain areas-imposed restrictions on local regulations or conditions, and delivery times may vary.</p>
                <p><span className="txtred">4. Delivery Times</span><br />
                <span className="txtred">- 4.1 Standard Delivery:</span> Our standard delivery times of most parcels are usually taking place within 3-5 business days in most U.S. locations. If the delivery address is in more remote parts or islands of the US, their package could take 5-7 business days.<br />
                <span className="txtred">- 4.2 Expedited Delivery:</span> Mostly, our standard delivery is anywhere between 1 to 3 days delivery is free, but our available expedited delivery is usually the faster option to get your parcels quickly, if required. Hence, you may incur an additional delivery fee for expedited shipping. To find out about rates and availability, get in touch with our customer service team.</p>
                <p><span className="txtred">5. Processing Times</span><br />
                Order processing is usually taking place within 24 hours of order confirmation. Note: Any order placed on a non-business day (weekends and other public holidays) will be processed on the next business day.</p>
                <p><span className="txtred">6. Track Your Delivery</span><br />
                When your parcel(s) has been shipped, you will get a tracking number in your email. You can use this tracking number to check your parcel delivery status on the courier&apos;s website.</p>
                <p><span className="txtred">7. Contact Us</span><br />Regarding free delivery or delivery issues, please contact us at:<br />Zoiko Mobile<br />Customer Service<br />Email: <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a><br />Telephone: 800-988-8116</p>
                <p>We&apos;re dedicated to giving our U.S. customers fast and free delivery service. We appreciate you for choosing Zoiko Mobile; we&apos;re dedicated to providing the best quality products, mobile network service, and support, which are accessible to everyone.</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default FreeDeliveryPolicy;
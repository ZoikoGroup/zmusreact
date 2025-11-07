"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const E911Disclosure = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="911 & E911 Disclosure" />
        <Container fluid className="bglite p-0">
            <Container className="py-5">
                <h4 className="txtred">Emergency Services Information</h4>
                <p>Zoiko Mobile is committed to ensuring the safety and well-being of our customers. This disclosure provides important information about accessing emergency services, including 911 and Enhanced 911 (E911) capabilities, with our mobile services.</p>
                <h4 className="txtred">911 Emergency Services</h4>
                <p>Dialing 911: You can dial 911 from your Zoiko Mobile device in the event of an emergency to reach local emergency services, including police, fire, and medical assistance.</p>
                <p>Location Information: When you dial 911, your device will attempt to automatically transmit your location information to the nearest emergency call center, known as a Public Safety Answering Point (PSAP).</p>
                <p>Potential Limitations: It&apos;s important to note that there may be limitations to the availability and accuracy of location information, especially if you are indoors or in a remote area.</p>
                <h4 className="txtred">Enhanced 911 (E911) Services</h4>
                <p>Automatic Location Information: E911 services enable the automatic transmission of your device's location information to emergency responders when you dial 911.</p>
                <p>Registered Address: It is essential to ensure that your Zoiko Mobile account is registered with an accurate address to facilitate the delivery of emergency services to your location.</p>
                <p>Keep Information Updated: If your address changes or if you are traveling with your device, make sure to update your account information to ensure accurate location information is transmitted in an emergency.</p>
                <h4 className="txtred">Important Considerations</h4>
                <p>Non-Voice Devices: If you are using a non-voice device, such as a tablet or wearable, you may not be able to make traditional voice calls to 911. Check the device&apos;s capabilities and ensure you have access to alternative methods of contacting emergency services.</p>
                <p>Battery Life: Ensure that your device is adequately charged or has access to power to maintain the ability to contact emergency services when needed.</p>
                <p>Alternative Contacts: In some situations, such as during network outages or when unable to connect to 911 services, it may be necessary to contact alternative emergency contacts or services.</p>
                <h4 className="txtred">Contact Us</h4>
                <p>If you have any questions or concerns about accessing emergency services with your Zoiko Mobile device, please contact us at <a href="mailto:support@zoikomobile.com" className="txtred">support@zoikomobile.com</a>. We are here to assist you and ensure your safety and peace of mind.</p>
                <p>Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</p>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default E911Disclosure;
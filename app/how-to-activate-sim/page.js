"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Container, Image} from "react-bootstrap";

export default function HowToActivateSimPage() {
    return (
        <>
        <Header />
        <HeadBar text={<>Activate Your SIM with Tech Guru Ollie!</>} />
        <Container fluid className="p-0 bglite">
            <Container className="py-4">
                <div className="d-flex flex-row gap-4 align-items-center">
                    <Image src="/img/activate-psim.png" fluid alt="Flemingo" className="w-50 w-sm-100" />
                    <div>
                        <h2 className="txtred">Follow these simple steps to get started:</h2>
                        <ol className="body20">
                            <li><span className="txtred">Enter Your Details:</span> Provide your information on the activation page.</li>
                            <li><span className="txtred">Enter OTP &amp; SIM Serial Number:</span> Input the 8-digit OTP sent to your email, along with your 19-digit SIM serial number.</li>
                            <li><span className="txtred">Activate Your SIM:</span> Click &quot;Activate SIM&quot; to complete the process and start enjoying Zoiko Mobile services!</li>
                        </ol>
                        <h3 className="txtgreen">Activate SIM &amp; Get Connected!</h3>
                        <p className="txtgreen">Click &quot;Activate SIM&quot; to start enjoying Zoiko Mobile services!</p>
                        <p className="txtgreen">Need Help?</p>
                        <p className="txtgreen">Call us at <span className="txtred">800-988-8116</span> or visit our Help & Support page.</p>
                        <Button variant="outline-danger" size="lg" href="/activate">Activate Your SIM</Button>
                    </div>
                    
                </div>
            </Container>
        </Container>
        <Footer />
        
        </>
    );
}
"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import HeadBar from "../components/HeadBar";

export default function SustainabilityPage() {
    return (
        <>
        <Header />
        <HeadBar text={<>Sustainability at Zoiko Mobile</>} />
        <Container fluid className="p-0 bglite">
            <Container className="py-5">
                <ol className="body22">
                    <li className="txtred">Partner with Zoiko Mobile for Wholesale Opportunities<br /><span className="txtblack">At Zoiko Mobile, we&apos;re committed to making a positive impact on the environment and the communities we serve. We have started with practical steps to operate sustainably and contribute to meaningful causes.</span></li>
                    <li className="txtred">Our Sustainability Goals
                        <ol className="txtred">
                            <li>Reducing Carbon Footprint:<br /><span className="txtblack">We aim to reduce carbon emissions by implementing energy-efficient practices in our operations.</span></li>
                            <li>Eco-Friendly Products:<br /><span className="txtblack">We are mindful of sustainability in our product design and use environmentally friendly materials whenever possible.</span></li>
                            <li>ERecycling Programs:<br /><span className="txtblack">We encourage responsible recycling and offer options for customers to recycle old devices and accessories.</span></li>
                            <li>ESupporting Animal Charities:<br /><span className="txtblack">We support animal welfare initiatives by partnering with charities focused on helping animals in need.</span></li>
                        </ol>
                    </li>
                    <li className="txtred">Practical Steps We&apos;re Taking
                        <ol className="txtred">
                            <li>Energy-Efficient Offices:<br /><span className="txtblack">Our office spaces use energy- efficient lighting, and we strive to reduce waste in daily operations.</span></li>
                            <li>Local Community Engagement:<br /><span className="txtblack">As we grow, we aim to contribute to local environmental and animal-related projects that make a difference.</span></li>
                            <li>Employee Involvement:<br /><span className="txtblack">We encourage our team to participate in local sustainability efforts, including volunteer opportunities with animal charities.</span></li>
                        </ol>
                    </li>
                    <li className="txtred">Transparency &amp; Accountability<br /><span className="txtblack">While we&apos;re just getting started, we are committed to being transparent about our sustainability journey. We&apos;re focused on continuous improvement, and we&apos;ll keep you updated on our progress.</span></li>
                    <li className="txtred">Join Us in Making a Difference<br /><span className="txtblack">We know that every small action counts. We invite you to join us in supporting sustainability and animal welfare as we work towards a better future.</span></li>
                    <li className="txtred">Learn More<br /><span className="txtblack">For more information on our sustainability initiatives or to get involved, reach out to us at <a href="mailto:sustainability@zoikomobile.com" style={{color:'#DF1E5A'}}>sustainability@zoikomobile.com</a>.<br />Zoiko Mobile<br />5900 Balcones Drive, Suite 100<br />Austin, TX 78731<br />Tel: 800-988-8116</span></li>
                </ol>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
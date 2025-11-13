"use client"
import { Container, Image, Row, Col } from "react-bootstrap";

const TravelPlanBox = () => {
    return (
        <>
        <Container fluid className="bglite">
            <Container className="pb-5">
                <h4 className="txtred text-center pt-5">Just skip the pricey roaming plans, go alongside Zoiko affordable travel plans</h4>
                <div className="pinkboxwraper justify-content-center gap-5 mt-3">
                    <div className="pinkboxtravel align-items-center">
                        <Image src={"/img/icons/bars.png"} alt="Icon 1" className="mx-auto d-block w-50" />
                        <p className="pt-2"><b>Fastest Mobile Data</b><br />Easy sync to any strongest local network, go everywhere, you've never been before, you never get lost, a good thing to try. Nosy about our network work? </p>
                    </div>
                    <div className="pinkboxtravel">
                        <Image src={"/img/icons/hands.png"} alt="Icon 2" className="mx-auto d-block w-50" />
                        <p className="pt-2"><b>Free International calls</b><br />On an urgent trip or family vacation? Added all-inclusive free international calls on all affordable travel plans, letting you make phone calls at no extra cost.</p>
                    </div>
                    <div className="pinkboxtravel">
                        <Image src={"/img/icons/hand-support.png"} alt="Icon 3" className="mx-auto d-block w-50" />
                        <p className="pt-2"><b>24x7 Support</b><br />Before, during, and after, our globalsupport team is here for you. If youhave questions about Zoiko TravelPass, please, Contact Us</p>
                    </div>
                </div>
            </Container>
        </Container>
        <Container fluid className="bglite">
            <h2 className="text-center pt-5">Great Add-Ons USA SIM plans for Travel Buddies at Just $7.50 Only</h2>
            <div className="pinkboxwraper justify-content-center gap-4 mt-2">
                <div className="pinkboxLarge p-5">
                    <Image src="/img/travel-box1.webp" className="w-50 d-block mx-auto" alt="Box Image" />
                    <p className="pt-3">Add any low-cost best travel data plans for every need to avoid high bill shocks. Sip in a cocktail on a serene, breeze in exotic fruity juice on a sun-kissed beach, trip to see ancient grandiose sites, hike in challenging trails, or walk through scenic landscapes, get a stable network coverage like a home.</p>
                </div>
                <div className="pinkboxLarge p-5">
                    <Image src="/img/travel-box2.webp" className="w-50 d-block mx-auto" alt="Box Image" />
                    <p className="pt-3">Buy add-on affordable travel plans USA with preloaded up to 10GB data/day, 30 free minutes & texts, and free international calls, as low as a $7.50 travel pass top up, wherever you go, you’re always under the Zoiko network.</p>
                </div>
            </div>
        </Container>
        <Container fluid className="bglite">
            <Container className="py-4">
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}>
                        <Image src="/img/travelplan.webp" className="d-block mx-auto w-75" fluid alt="Business Deals" />
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <h2>Zoiko Daily TravelPass</h2>
                        <p className="txtred">Activate your affordable travel plans in 2 Minutes</p>
                        <p className="body22">Add on amongst the best travel data plans alongside your Prepaid/Postpaid or business eSIM plans with your phone&apos;s embedded SIM chip.</p>
                        <ul>
                            <li>International travel recharge SIM plans</li>
                            <li>Fast and easy to add-ons</li>
                            <li>Connect devices automatically</li>
                        </ul>
                        <a href="/byod-plans#deviceCompatibility" className="txtred">Check your phone&apos;s eSIM compaitability <i className="bi bi-arrow-right"></i></a>
                    </Col>
                </Row>
            </Container>
        </Container>
        </>
    );
}
export default TravelPlanBox;
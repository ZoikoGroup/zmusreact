"use client"
import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import Link from "next/link";
import { usePathname} from 'next/navigation';

const TopHeader = () => {
    const pathname = usePathname();
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-lite p-0 topnav">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/top-up-plan" className={pathname == "/top-up-plan" ? "active" : "" }>Top-Up</Nav.Link>
                        <Nav.Link href="/byod-plans" className={pathname == "/byod-plans" ? "active" : "" }>BYOD</Nav.Link>
                        <Nav.Link href="/device-protection" className={pathname == "/device-protection" ? "active" : "" }>Device Protection</Nav.Link>
                        <NavDropdown title="Special Plans" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/college-student">College Students</NavDropdown.Item>
                            <NavDropdown.Item href="/military-veterans">Millitary &amp; Veterans</NavDropdown.Item>
                            <NavDropdown.Item href="/postal-service-workers">Postal Service Workers</NavDropdown.Item>
                            <NavDropdown.Item href="/animal-charities">Animal Charities</NavDropdown.Item>
                            <NavDropdown.Item href="/family-plans">Family Plans</NavDropdown.Item>
                            <NavDropdown.Item href="/music-hub">Zoiko Music Hub</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                        <NavDropdown title="Support" id="collapsible-nav-dropdown" className="dropdownmg">
                            <Container className="py-4">
                                <Row>
                                    <Col md={3} sm={12} xs={12}>
                                        <p><span className="txtgreen">Customer Support</span></p>
                                        <ul className="menulist">
                                            <li><Link href={"/support"}>Help &amp; Support</Link></li>
                                            <li><Link href={"/reasons-to-love-zoiko-mobile"}>Reasons to love Zoiko</Link></li>
                                            <li><Link href={"https://mvnoc.ai/coverage-map"} target="_blank">Check Network Coverage</Link></li>
                                            <li><Link href={"/faq"}>FAQs</Link></li>
                                            <li><Link href={"/how-to-activate-sim"}>How to activate Physical SIM</Link></li>
                                            <li><Link href={"/how-to-activate-your-esim"}>How to activate eSIM</Link></li>
                                        </ul>
                                    </Col>
                                    <Col md={2} sm={12} xs={12}>
                                        <p><span className="txtgreen">Get Started</span></p>
                                        <ul className="menulist">
                                            <li><Link href={"/switch"}>Switch &amp; Save</Link></li>
                                            <li><Link href="/login">Join Zoiko Family</Link></li>
                                            <li><Link href="/free-delivery-policy">Free Delivery</Link></li>
                                            <li><Link href="/product-category/refurbished">Refurbished Smartphones</Link></li>
                                            <li><Link href={"/return-policy"}>Return Policy</Link></li>
                                        </ul>
                                    </Col>
                                    <Col md={2} sm={12} xs={12}>
                                        <p><span className="txtgreen">Customer Dashboard</span></p>
                                        <ul className="menulist">
                                            <li><Link href="/login">Login</Link></li>
                                        </ul>
                                    </Col>
                                    <Col md={3} sm={12} xs={12}>
                                        <p><span className="txtgreen">Tariffs &amp; Prices</span></p>
                                        <ul className="menulist">
                                            <li><Link href={"/roaming-rates"}>Roaming Charges</Link></li>
                                            <li><Link href={"/bundled-offers"}>Bundled Offers</Link></li>
                                            <li><Link href={"/free-international-minutes"}>Free International Calls</Link></li>
                                            <li><Link href={"/international-out-of-bundle-rates"}>Out-of-Bundle Rates</Link></li>
                                            <li><Link href={"/civilservants"}>Public Sector Lifetime Deals</Link></li>
                                        </ul>
                                    </Col>
                                    <Col md={2} sm={12} xs={12}>
                                        <p><span className="txtgreen">What&apos;s Included</span></p>
                                        <ul className="menulist">
                                            <li><Link href={"/5g-data-deals"}>5G Speed</Link></li>
                                            <li><Link href={"/wi-fi-calling"}>Wi-Fi Calling</Link></li>
                                            <li><Link href={"/canada-mexico-roaming-plans"}>Roam Free in Canada &amp; Mexico</Link></li>
                                            <li><Link href={"/international-callings"}>International Calls</Link></li>
                                            <li><Link href={"/esim"}>eSIM</Link></li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Container>
                        </NavDropdown>
                        <Nav.Link href="/international-callings">International Calls</Nav.Link>
                        <Nav.Link href="#">Store Locator</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default TopHeader;
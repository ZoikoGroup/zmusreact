"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Dropdown, Image } from "react-bootstrap";
import Testimonials from "../components/Testimonials";
import FamilyPlanFaqs from '../components/FamilyPlanFaqs';

const FamilyPlans = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Zoiko Mobile - We have a Plan for Every American Family</>} />
        <Container fluid className="familyplanbg position-relative">
            <div className="position-absolute d-none d-md-block" style={{left:'12%', bottom:'26%'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="danger" size="lg" id="dropdown-basic">Explore Family Plans</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/prepaid-plans">Prepaid Plans</Dropdown.Item>
                        <Dropdown.Item href="/postpaid-plans">Postpaid Plans</Dropdown.Item>
                        <Dropdown.Item href="/business-deals">Business Plans</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="position-absolute d-sm-block d-md-none" style={{left:'5%', bottom:'5%'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="danger" size="sm" id="dropdown-basic-sm">Explore Family Plans</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="prepaid-plans">Prepaid Plans</Dropdown.Item>
                        <Dropdown.Item href="postpaid-plans">Postpaid Plans</Dropdown.Item>
                        <Dropdown.Item href="business-deals">Business Plans</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Container>
        <Container fluid className="bglite py-5">
            <h4 className="text-center">Why Choose Zoiko Mobile Family Plans?</h4>
            <div className="pinkboxwraper gap-4 justify-content-center">
                <div className="pinkboxtopup d-flex flex-row gap-3 align-items-center text-start">
                    <Image src="/img/icons/savings.png" fluid className="w-25" alt="Savings" />
                    <p className="w-50 w-sm-100 bodysm"><span className="txtred body22">Savings</span><br />Save 20% when you have 3 or more lines active on your account.</p>
                </div>
                <div className="pinkboxtopup d-flex flex-row gap-3 align-items-center text-start">
                    <Image src="/img/icons/flexible.png" fluid className="w-25" alt="Flexible" />
                    <p className="w-50 w-sm-100 bodysm"><span className="txtred body22">Flexibility</span><br />Add or remove lines easily while ensuring at least 3 lines remain active to qualify.</p>
                </div>
                <div className="pinkboxtopup d-flex flex-row gap-3 align-items-center text-start">
                    <Image src="/img/icons/connect.png" fluid className="w-25" alt="Connect" />
                    <p className="w-50 w-sm-100 bodysm"><span className="txtred body22">Connectivity</span><br />Unlimited calls, texts, and data for every family member.</p>
                </div>
            </div>
            <h4 className="text-center pt-5">More than just Great Savings</h4>
            <div className="pinkboxwraper gap-4 justify-content-center pt-2">
                <div className="pinkboxtravel align-items-center">
                    <Image src="/img/icons/parentcontrol.png" fluid className="w-50" alt="Parent Control" />
                    <p className="bodysm pt-3"><span className="txtred body22">Parental Controls</span><br />Monitor usage and set limits for kids.</p>
                </div>
                <div className="pinkboxtravel align-items-center">
                    <Image src="/img/icons/datashare.png" fluid className="w-50" alt="Data Shareing" />
                    <p className="bodysm pt-3"><span className="txtred body22">Data Shareing</span><br />Share data across all lines for maximum flexibility.</p>
                </div>
                <div className="pinkboxtravel align-items-center">
                    <Image src="/img/icons/psupport.png" fluid className="w-50" alt="Support" />
                    <p className="bodysm pt-3"><span className="txtred body22">Priority Support</span><br />Family Plan users receive priority customer service.</p>
                </div>
                <div className="pinkboxtravel align-items-center">
                    <Image src="/img/icons/nohidenfee.png" fluid className="w-50" alt="No hidden fees" />
                    <p className="bodysm pt-3"><span className="txtred body22">No Hidden Fees</span><br />Transparent pricing with no surprises</p>
                </div>
            </div>
            <Container className="py-5">
                <h2 className="text-center pt-4">Getting Started is Simple</h2>
                <hr />
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">1</div>
                        <div className="px-2">
                            <h4 className="txtred">Choose Your Plan:</h4>
                            <p>Select a plan that fits your family&apos;s needs.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">2</div>
                        <div className="px-2">
                            <h4 className="txtred">Add Lines</h4>
                            <p>Activate at least 3 lines to qualify for the discount.</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row protbox">
                        <div className="bigred px-3">3</div>
                        <div className="px-2">
                            <h4 className="txtred">Enjoy Savings</h4>
                            <p>Keep 3 lines active to maintain your 20% discount.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Container>
        <FamilyPlanFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default FamilyPlans;
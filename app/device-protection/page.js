"use client"
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Col, Container, Image, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem,Dropdown, DropdownButton, DropdownItem, Button } from "react-bootstrap";
import DeviceProtectionModal from "./DeviceProtectionModal";

const DeviceProtection = () => {
    const [showDeviceProtectionModal, setShowDeviceProtectionModal] = useState(false);
    
    return (
        <>
        <style jsx>{`
        /* ── Mobile (max 767px) ── */
@media (max-width: 767px) {
  .dropdown-toggle {
    width: 100% !important;
  }
}

/* ── Low-res mobile (max 400px) ── */
@media (max-width: 400px) {
  .dropdown-toggle {
    width: 100% !important;
  }
}
  /* ── Base: Banner Section ── */
  .banner-section {
    position: relative;
  }

  /* ── Desktop overlay (> 1024px) ── */
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 48%;
    padding: 0 2.5rem 0 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-overlay h1 {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }

  .hero-overlay p {
    font-size: 1rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }

  .hero-overlay .btn,
  .hero-overlay .dropdown > button {
    font-size: 0.8rem;
    padding: 0.4rem 0.9rem;
    width: auto;
  }

  .hero-overlay .buttons-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-right: 2rem;
  }

  /* ── Tablet (768px - 1024px) ── */
  @media (min-width: 768px) and (max-width: 1024px) {
    .hero-overlay {
      width: 50%;
      padding: 0 1.5rem 0 2rem;
    }

    .hero-overlay h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .hero-overlay p {
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }

    .hero-overlay .btn,
    .hero-overlay .dropdown > button {
      font-size: 0.75rem;
      padding: 0.35rem 0.8rem;
      width: auto;
    }

    .hero-overlay .buttons-wrapper {
      padding-right: 1.5rem;
    }
  }

  /* ── Mobile (max 767px) ── */
  @media (max-width: 767px) {
    .hero-overlay {
      display: none !important;
    }

    .mobile-hero-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1.2rem 1rem;
      background: transparent;
    }

    .mobile-hero-text h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .mobile-hero-text p {
      font-size: 0.8rem;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }

    .mobile-hero-text .buttons-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 0 0.5rem;
    }

    .mobile-hero-text .btn,
    .mobile-hero-text .dropdown,
    .mobile-hero-text .dropdown > button {
      font-size: 0.75rem;
      padding: 0.35rem 0.8rem;
      width: 100% !important;
    }
  }

  /* ── Low-res mobile (max 400px) ── */
  @media (max-width: 400px) {
    .mobile-hero-text {
      padding: 0.75rem;
    }

    .mobile-hero-text h1 {
      font-size: 1rem;
      margin-bottom: 0.4rem;
    }

    .mobile-hero-text p {
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }

    .mobile-hero-text .buttons-wrapper {
      padding: 0 0.25rem;
    }

    .mobile-hero-text .btn,
    .mobile-hero-text .dropdown,
    .mobile-hero-text .dropdown > button {
      font-size: 0.7rem;
      padding: 0.3rem 0.7rem;
      width: 100% !important;
    }
  }


  /* Desktop & Tablet - auto width */
.responsive-dropdown,
.responsive-dropdown .dropdown-toggle {
  width: auto !important;
}

/* Mobile - full width */
@media (max-width: 767px) {
  .mobile-hero-text .responsive-dropdown,
  .mobile-hero-text .responsive-dropdown .dropdown-toggle {
    width: 100% !important;
    display: block !important;
  }
}
.mobile-buttons button {
  width: 100% !important;
}
`}</style>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Comprehensive Protection for Every Device" />
        <Container fluid className="p-0 position-relative banner-section">
  {/* Banner Images */}
  <img
    className="d-none d-md-block w-100"
    src="/img/home-banner/device-protection.png"
    alt="Device Protection Banner"
  />
  <img
    className="d-block d-md-none w-100"
    src="/img/home-banner/device-protection-m.png"
    alt="Device Protection Banner"
  />

  {/* Hero Text Overlay - Desktop only */}
  <div className="hero-overlay d-none d-md-flex flex-column justify-content-center">
    <h1 className="txtblack">Total Device Protection<br />with Zoiko Mobile Insurance</h1>
    <p className="txtblack body20">
      One plan to protect your phones Bring Your Own Device and other
      Electronics at home backed by AKKO the trusted leader in device protection.
    </p>
    <div className="buttons-wrapper" style={{ paddingRight: '2rem' }}>
  <DropdownButton variant="danger" className="responsive-dropdown" title="Protect Your Device Now">
    <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
    <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
    <DropdownItem href="/business-deals">Business Deals</DropdownItem>
  </DropdownButton>
  <Button variant="outline-danger" onClick={() => setShowDeviceProtectionModal(true)}>
    For Existing Customers
  </Button>
</div>

  </div>

  <div className="d-block d-md-none mobile-hero-text">
  <h1 className="txtblack">Total Device Protection<br />with Zoiko Mobile Insurance</h1>
  <p className="txtblack">
    One plan to protect your phones Bring Your Own Device and other
    Electronics at home backed by AKKO the trusted leader in device protection.
  </p>
  <div className="buttons-wrapper mobile-buttons w-100" style={{ padding: '0 1rem', textAlign: 'center' }}>
  <DropdownButton variant="danger" className="responsive-dropdown" style={{ width: '100%', display: 'block' }} title="Protect Your Device Now">
    <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
    <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
    <DropdownItem href="/business-deals">Business Deals</DropdownItem>
  </DropdownButton>
  <Button variant="outline-danger" className="w-100" onClick={() => setShowDeviceProtectionModal(true)}>
    For Existing Customers
  </Button>
</div>
</div>

  <DeviceProtectionModal
    show={showDeviceProtectionModal}
    handleClose={() => setShowDeviceProtectionModal(false)}
    planTitle="Device Protection"
    planSlug="device-protection"
    planId={19}
    planPrice={8.99}
    planSalePrice={null}
    planDuration="month"
    planBqid={22}
    planType="addon"
  />
</Container>
        <Container fluid className="py-4 bglite">
            <h2 className="text-center py-4">Why Choose Zoiko Mobile Insurance?</h2>
            <Container>
                <div className="pinkboxwraper justify-content-center gap-4">
                    <div className="protbox">
                        <Image src="/img/icons/damage.png" className="w-50" alt="Damage Protection" />
                        <h4 className="txtred pt-2">Accidental Damage Coverage</h4>
                        <p>Protection against cracked screens, drops, and other mishaps</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/theft.png" className="w-50" alt="Theft Protection" />
                        <h4 className="txtred pt-2">Theft Protection</h4>
                        <p>Comprehensive coverage for stolen devices to keep you connected.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/water-damage.png" className="w-50" alt="Water Damage Protection" />
                        <h4 className="txtred pt-2">Water Damage Protection</h4>
                        <p>Safeguards against spills, submersion, and other liquid-related issues.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/multi-device.png" className="w-50" alt="Multi Device Protection" />
                        <h4 className="txtred pt-2">Multi-Device Coverage</h4>
                        <p>Includes new phones, BYOD, laptops, tablets, and home electronics like smart hubs and headphones</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/pricing.png" className="w-50" alt="Affordable Pricing" />
                        <h4 className="txtred pt-2">Affordable Pricing</h4>
                        <p>Premium protection starting at $9.99/month per device.</p>
                    </div>
                    <div className="protbox">
                        <Image src="/img/icons/repair.png" className="w-50" alt="Affordable Pricing" />
                        <h4 className="txtred pt-2">Fast Claims and Repairs</h4>
                        <p>Quick resolutions powered by AKKO&apos;s trusted service network.</p>
                    </div>
                </div>
                <Row className="align-items-center py-5">
                    <Col md={4} sm={12} xs={12}>
                        <Image src="/img/protected.png" fluid alt="Procted" className="w-100" />
                    </Col>
                    <Col  md={8} sm={12} xs={12}>
                        <h2>What&apos;s Protected</h2>
                        <ul className="body22 protectedlist">
                            <li>Cracked Screens</li>
                            <li>Spills &amp; Liquid Submersion</li>
                            <li>Accidental Damage (like Drops)</li>
                            <li>Damage & Malfunctions from Accidental Damage/Drops</li>
                            <li>Mechanical/Electrical Failures of components (for phones)</li>
                            <li>Theft</li>
                            <li>Theft of items from an unattended vehichle via forced entry (car break-ins)</li>
                        </ul>
                    </Col>
                </Row>
                <Image src="/img/plan-features.png" fluid alt="Plan Features" className="w-100 py-4" />
                <h2 className="text-center">Frequently Asked Questions</h2>
                <Accordion className="w-75 mx-auto w-sm-100">
                    <AccordionItem eventKey="0">
                        <AccordionHeader>What devices are eligible for coverage?</AccordionHeader>
                        <AccordionBody>Zoiko Mobile Insurance covers smartphones, tablets, laptops, smartwatches, and home electronics like headphones and smart hubs. BYOD devices and newly purchased phones are eligible.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="1">
                        <AccordionHeader>What types of incidents are covered?</AccordionHeader>
                        <AccordionBody>Coverage includes accidental damage (cracked screens, drops), theft, and water damage.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="2">
                        <AccordionHeader>How much does it cost?</AccordionHeader>
                        <AccordionBody>Comprehensive protection starts at $9.99/month per device.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="3">
                        <AccordionHeader>How do I enroll?</AccordionHeader>
                        <AccordionBody>Add protection during checkout or through your Zoiko Mobile account dashboard.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="4">
                        <AccordionHeader>Who powers the insurance?</AccordionHeader>
                        <AccordionBody>Our insurance is powered by AKKO, a trusted leader in device protection services.</AccordionBody>
                    </AccordionItem>
                    <AccordionItem eventKey="5">
                        <AccordionHeader>How do I file a claim?</AccordionHeader>
                        <AccordionBody>Filing a claim is easy. Visit our claims portal or contact customer support for assistance.</AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default DeviceProtection;
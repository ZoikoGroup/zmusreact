"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppFloating from "./WhatsApp";
import {
  Smartphone,
  Calendar,
  UserCheck,
  Briefcase,
  Heart,
  Music,
  Users,
  Shield,
  Phone,
  Mail,
  Headphones,
  ChevronRight,
  Radio,
  ArrowLeftRight,
  PlusCircle,
  HelpCircle,
  PawPrint,
  Layers2,
  PawPrintIcon,
  ShieldCheck,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";
import "../globals.css";

const Footer = () => {
  const curyear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubscribe = async (e) => {
    if (e) e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage("⚠️ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("✅ Subscription successful! Thank you for subscribing.");
        setEmail("");
      } else {
        setMessage(data?.message || "❌ Subscription failed. Please try again.");
      }
    } catch {
      setMessage("⚠️ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <WhatsAppFloating />

      <footer className="zk-footer-wrapper">
        {/* ==============================================================
            SECTION 1: "STAY IN THE ZOIKO LOOP" BANNER & ON THE GO CARD
            ============================================================== */}
        <section className="zk-footer-loop">
          <div className="zk-loop-container">
            {/* Col 1: Title & Tagline */}
            <div className="zk-loop-left">
              <h2>Stay in the Zoiko Loop</h2>
              <p>
                Get plan offers, device news, music<br />
                updates and animal-welfare stories.
              </p>
            </div>

            {/* Col 2: Email Subscribe Form */}
            <div className="zk-loop-center">
              <form onSubmit={handleSubscribe} className="zk-loop-form">
                <label className="zk-loop-form-label" htmlFor="zk-footer-email">
                  Email address
                </label>
                <div className="zk-loop-input-capsule">
                  <input
                    id="zk-footer-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="zk-loop-input"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="zk-loop-btn"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>

                <div className="zk-loop-consent">
                  <input
                    type="checkbox"
                    id="zk-consent"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="zk-consent" style={{ cursor: "pointer" }}>
                    I agree to receive marketing emails from Zoiko Mobile. Unsubscribe any time.{" "}
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </label>
                </div>

                {message && (
                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: message.includes("✅") ? "#A7F3D0" : "#FEE2E2",
                    }}
                  >
                    {message}
                  </div>
                )}
              </form>
            </div>

            {/* Col 3: Manage on the go Card */}
            <div className="zk-manage-card">
              <div className="zk-manage-card-icon">
                <Smartphone size={32} strokeWidth={1.75} />
              </div>
              <div className="zk-manage-card-content">
                <h4>Manage on the go</h4>
                <p>Plan, usage and payments from your phone’s browser.</p>
                <Link href="/dashboard" className="zk-manage-card-btn">
                  Open my account
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 2: 8-COLUMN NAVIGATION DIRECTORY
            ============================================================== */}
        <section className="zk-footer-directory">
          <div className="zk-directory-container">
            {/* Column 1: Brand & Identity */}
            <div className="zk-dir-col zk-dir-brand-col">
              <Link href="/">
                <Image
                  src="/img/ZoikoMobileUS_Logo_PNG.png"
                  alt="Zoiko Mobile Logo"
                  width={140}
                  height={50}
                  className="zk-dir-logo"
                />
              </Link>
              <div className="zk-dir-tagline">
                The Animal &amp; Music Loving Network.™
              </div>
              <div className="zk-dir-desc">
                Affordable, flexible wireless for people who love their pets,
                their music and the freedom to stay connected across the USA.
              </div>
              <div className="zk-dir-paws">
                <PawPrint size={20} />
                <Music size={18} />
                <Heart size={18} />
              </div>
            </div>

            {/* Column 2: Plans & Pricing */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <Layers2 size={18} />
                </div>
                <h4>Plans &amp; Pricing</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="/all-plans">All Wireless Plans</Link></li>
                <li><Link href="/all-plans">Compare Plans</Link></li>
                <li><Link href="/plans/zoiko-lite">Zoiko Lite</Link></li>
                <li><Link href="/plans/zoiko-core">Zoiko Core</Link></li>
                <li><Link href="/plans/zoiko-max">Zoiko Max</Link></li>
                <li><Link href="/family-plans">Family &amp; Multi-Line</Link></li>
                <li><Link href="/prepaid-plans">Prepaid Plans</Link></li>
                <li><Link href="/offer-page">Current Offers</Link></li>
              </ul>
            </div>

            {/* Column 3: Phones & Devices */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <Smartphone size={18} />
                </div>
                <h4>Phones &amp; Devices</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="https://phones.zoikomobile.com" target="_blank">Shop Smartphones</Link></li>
                <li><Link href="/product-category/refurbished">Refurbished Phones</Link></li>
                <li><Link href="/accessories">Accessories</Link></li>
                <li><Link href="/byod-plans">Bring Your Own Phone</Link></li>
                <li><Link href="/device-protection">Device Protection</Link></li>
                <li><Link href="/accessories">Tablets &amp; Hotspots</Link></li>
              </ul>
            </div>

            {/* Column 4: Activation & Account */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <UserCheck size={18} />
                </div>
                <h4>Activation &amp; Account</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="/activate">Activate SIM</Link></li>
                <li><Link href="/how-to-activate-your-esim">eSIM Activation Guide</Link></li>
                <li><Link href="/switch">Switch &amp; Save</Link></li>
                <li><Link href="/switch">Transfer Your Number</Link></li>
                <li><Link href="/top-up-plan">Top Up / Add Data</Link></li>
                <li><Link href="/dashboard">Manage My Account</Link></li>
                <li><Link href="/activate">Track Activation</Link></li>
              </ul>
            </div>

            {/* Column 5: Business & International */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <Briefcase size={18} />
                </div>
                <h4>Business &amp; International</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="/business-deals">Business Plans</Link></li>
                <li><Link href="/international-callings">International Calling</Link></li>
                <li><Link href="/travel-plans">Travel &amp; Roaming</Link></li>
                <li><Link href="/canada-mexico-roaming-plans">Canada &amp; Mexico Roaming</Link></li>
                <li><Link href="/support">Business Support</Link></li>
                <li><Link href="/become-retailer">Become a Retailer</Link></li>
                <li><Link href="/become-partner">Partner With Us</Link></li>
              </ul>
            </div>

            {/* Column 6: Animal & Music Community */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <PawPrintIcon size={18} />
                </div>
                <h4>Animal &amp; Music Community</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="/animal-charities">Animal Charities</Link></li>
                <li><Link href="/music-hub">Zoiko Music Hub</Link></li>
                <li><Link href="/blog">Community Stories</Link></li>
                <li><Link href="/music-hub">Music Events &amp; Perks</Link></li>
                <li><Link href="/become-partner">Get Involved</Link></li>
              </ul>
            </div>

            {/* Column 7: About Zoiko */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <Users size={18} />
                </div>
                <h4>About Zoiko</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/news">Press &amp; Media</Link></li>
                <li><Link href="/sustainability">Sustainability</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/become-partner">Careers</Link></li>
                <li><Link href="/become-affiliate">Become an Affiliate</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 8: Help, Legal & Privacy */}
            <div className="zk-dir-col">
              <div className="zk-dir-header">
                <div className="zk-dir-iconbox">
                  <ShieldCheck size={18} />
                </div>
                <h4>Help, Legal &amp; Privacy</h4>
              </div>
              <ul className="zk-dir-list">
                <li><Link href="/support">Help &amp; Support</Link></li>
                <li><Link href="/faq">FAQs</Link></li>
                <li><Link href="https://mvnoc.ai/coverage-map" target="_blank">Coverage Map</Link></li>
                <li><Link href="/network-service">Network &amp; Service</Link></li>
                <li className="zk-dir-spacer" style={{ height: "8px" }} />
                <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/regularity-information">Regulatory Information</Link></li>
                <li><Link href="/911-e911-disclosure">911 / E911 Disclosure</Link></li>
                <li><Link href="/do-not-sell-my-personal-information">Your Privacy Choices</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 3: QUICK ACTION CAPSULE BAR
            ============================================================== */}
        <section className="zk-actionbar-section">
          <div className="zk-actionbar-pill">
            <Link href="https://mvnoc.ai/coverage-map" target="_blank" className="zk-actionbar-item">
              <span className="zk-actionbar-icon">
                <Radio size={19} />
              </span>
              Check Coverage
            </Link>

            <div className="zk-actionbar-divider" />

            <Link href="/activate" className="zk-actionbar-item">
              <span className="zk-actionbar-icon">
                <Smartphone size={19} />
              </span>
              Activate SIM / eSIM
            </Link>

            <div className="zk-actionbar-divider" />

            <Link href="/switch" className="zk-actionbar-item">
              <span className="zk-actionbar-icon">
                <ArrowLeftRight size={19} />
              </span>
              Transfer Your Number
            </Link>

            <div className="zk-actionbar-divider" />

            <Link href="/top-up-plan" className="zk-actionbar-item">
              <span className="zk-actionbar-icon">
                <PlusCircle size={19} />
              </span>
              Top Up Account
            </Link>

            <div className="zk-actionbar-divider" />

            <Link href="/support" className="zk-actionbar-item">
              <span className="zk-actionbar-icon">
                <HelpCircle size={19} />
              </span>
              Get Support
            </Link>
          </div>
        </section>

        {/* ==============================================================
            SECTION 4: DEEP DARK PLUM / VIOLET FOOTER
            ============================================================== */}
        <section className="zk-footer-dark">
          <div className="zk-dark-container">
            {/* Top area */}
            <div className="zk-dark-top">
              {/* Left Column: Talk to us & Socials */}
              <div>
                <div className="zk-dark-label">Talk to us</div>
                <div className="zk-talk-contacts">
                  <a href="tel:8009888116" className="zk-talk-phone">
                    <span className="zk-talk-icon">
                      <Phone size={18} />
                    </span>
                    800-988-8116
                  </a>

                  <a href="mailto:info@zoikomobile.com" className="zk-talk-link">
                    <span className="zk-talk-icon">
                      <Mail size={16} />
                    </span>
                    Email us
                  </a>

                  <Link href="/customer-service" className="zk-talk-link">
                    <span className="zk-talk-icon">
                      <Headphones size={16} />
                    </span>
                    Customer support
                  </Link>
                </div>

                <div className="zk-dark-label">Follow Zoiko Mobile</div>
                <div className="zk-socials-row">
                  <Link
                    href="https://www.facebook.com/zoikomobile"
                    target="_blank"
                    className="zk-social-btn"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={15} />
                  </Link>
                  <Link
                    href="https://instagram.com/zoikomobileus"
                    target="_blank"
                    className="zk-social-btn"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={16} />
                  </Link>
                  <Link
                    href="https://x.com/zoikomobileusa"
                    target="_blank"
                    className="zk-social-btn"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter size={15} />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@ZoikoMobileUSA"
                    target="_blank"
                    className="zk-social-btn"
                    aria-label="YouTube"
                  >
                    <FaYoutube size={16} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/zoikomobileusa/"
                    target="_blank"
                    className="zk-social-btn"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={16} />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@zoikomobile"
                    target="_blank"
                    className="zk-social-btn"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={15} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Office Address */}
              <div>
                <div className="zk-dark-label">Our offices (USA)</div>
                <div className="zk-office-card">
                  <div className="zk-office-info">
                    <h5>Head Office – Austin, TX</h5>
                    <p>
                      5900 Balcones Drive, Suite 24685<br />
                      Austin, TX 78731, USA
                    </p>
                  </div>
                  <Link href="/contact-us" className="zk-office-btn">
                    All Locations &amp; Offices
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Legal Links & Copyright */}
            <div className="zk-dark-bottom">
              <div className="zk-legal-links">
                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/do-not-sell-my-personal-information">Your Privacy Choices</Link>
                <Link href="/terms-and-conditions">Accessibility</Link>
                <Link href="/network-service">Network Management</Link>
                <Link href="/consumer-information">Broadband Consumer Labels</Link>
                <Link href="/regularity-information">Regulatory Information</Link>
                <Link href="/911-e911-disclosure">911 / E911 Disclosure</Link>
              </div>

              <div className="zk-copyright">
                © {curyear} Zoiko Mobile. All rights reserved.
              </div>
            </div>
          </div>

          {/* Rainbow Gradient Line Accent */}
          <div className="zk-footer-rainbow" />
        </section>
      </footer>

      {/* =========================================================================
          OLD FOOTER CODE (COMMENTED OUT AS REQUESTED)
          ========================================================================= */}
      {false && (
      <div>
      <Container fluid className="footerboxlarge">
        <Container className="py-5">
          <Row>
            <Col md={3} sm={12} xs={12}>
              <p className="txtred">About Us</p>
              <ul>
                <li><Link href={"/about"}>Our Story</Link></li>
                <li><Link href={"/news"}>Press &amp; Media</Link></li>
                <li><Link href={"/blog"}>Blogs</Link></li>
                <li><Link href={"/sustainability"}>Sustainability</Link></li>
                <li><Link href={"/animal-charities"}>Animal Charities</Link></li>
                <li><Link href={"/music-hub"}>Zoiko Music Hub</Link></li>
              </ul>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <p className="txtred">Shop</p>
              <ul>
                <li><Link href={"/all-plans"}>Mobile Plans</Link></li>
                <li><Link href={"/byod-plans"}>BYOD</Link></li>
                <li><Link href={"https://phones.zoikomobile.com"} target="_blank">New Smart Phones</Link></li>                            
                <li><Link href={"/product-category/refurbished"}>Refurbished Smartphones</Link></li>
                <li><Link href={"/accessories"}>Accessories</Link></li>
                <li><Link href={"/offer-page"}>Special Offers</Link></li>
              </ul>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <p className="txtred">Help &amp; Support</p>
              <ul>
                <li><Link href={"/customer-service"}>Customer Service</Link></li>
                <li><Link href={"/faq"}>FAQs</Link></li>
                <li><Link href={"https://mvnoc.ai/coverage-map"} target="_blank">Coverage Map</Link></li>
                <li><Link href={"/network-service"}>Network &amp; Service</Link></li>
                <li><Link href={"/device-protection"}>Device Protection</Link></li>
                <li><Link href={"/return-policy"}>Return &amp; Warranty Policy</Link></li>
                <li><Link href={"/contact-us"}>Contact Us</Link></li>
              </ul>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <p className="txtred">Zoiko Legal</p>
              <ul>
                <li><Link href={"/terms-and-conditions"}>Terms &amp; Conditions</Link></li>
                <li><Link href={"/privacy-policy"}>Privacy Policy</Link></li>
                <li><Link href={"/cookie-policy"}>Cookies Policy</Link></li>
                <li><Link href={"/intellectual-property-notice"}>Intellectual Property</Link></li>
                <li><Link href={"/consumer-information"}>Consumer Information</Link></li>
                <li><Link href={"/regularity-information"}>Regulatory Information</Link></li>
                <li><Link href={"/california-consumer-privacy-act"}>California Consumer Privacy Act (CCPA)</Link>
                  <ul>
                    <li><Link href={"/do-not-sell-my-personal-information"}>Do Not Sell My Personal Information </Link></li>
                    <li><Link href={"/california-consumer-privacy-act"}>CCPA Privacy Notice</Link></li>
                    <li><Link href={"/911-e911-disclosure"}>911 &amp; E911 Disclosure </Link></li>
                  </ul>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="footerbox">
        <Container className="py-5 footerbox">
          <Row className="mb-4">
            <Col md={6} sm={12}>
              <h4 className="fw-bold mb-3">Latest News & Offers</h4>
              <p>Receive the latest offers, updates, and unlock amazing savings on Zoiko Mobile plans and devices.</p>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Enter your email address"
                  aria-label="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant="danger"
                  size="lg"
                  disabled={loading}
                  onClick={handleSubscribe}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </InputGroup>
              <div style={{ minHeight: "24px", marginBottom: "8px" }}>
                {message && (
                  <p style={{ color: message.includes("successful") || message.includes("✅") ? "#28a745" : "#ff4444", fontSize: "14px", margin: 0 }}>
                    {message}
                  </p>
                )}
              </div>
            </Col>
            <Col md={6} sm={12} className="text-md-center mt-4 mt-md-0">
              <h4 className="fw-bold mb-3">Connect with us</h4>
              <div className="social-wrapper">
                <Link href="https://www.facebook.com/zoikomobile" target="_blank" className="socialicon"><i className="bi bi-facebook"></i></Link>
                <Link href="https://instagram.com/zoikomobileus" target="_blank" className="socialicon"><i className="bi bi-instagram"></i></Link>
                <Link href="https://www.linkedin.com/company/zoikomobileusa/" target="_blank" className="socialicon"><i className="bi bi-linkedin"></i></Link>
                <Link href="https://www.youtube.com/@ZoikoMobileUSA" target="_blank" className="socialicon"><i className="bi bi-youtube"></i></Link>
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="mt-4 office-row">
            <Col md={4} sm={12} className="mb-4">
              <h6 className="fw-bold">Head Office (Austin, TX)</h6>
              <p className="mb-1">5900 Balcones Drive, #24685<br />Austin, TX 78731</p>
              <p className="mb-1">📞 800-988-8116</p>
              <p>✉ info@zoikomobile.com</p>
              <div className="mt-4">
                <h6 className="fw-bold">Washington DC Office</h6>
                <p className="mb-1">1717 N Street NW, Suite 1<br />Washington, DC 20036</p>
                <p className="mb-1">📞 800-988-8116</p>
                <p>✉ info@zoikomobile.com</p>
              </div>
            </Col>
            <Col md={4} sm={12} className="mb-4">
              <h6 className="fw-bold">California Office (Sacramento, CA)</h6>
              <p className="mb-1">1401 21st Street, Suite R<br />Sacramento, CA 95811</p>
              <p className="mb-1">📞 800-988-8116</p>
              <p>✉ info@zoikomobile.com</p>
              <div className="mt-4">
                <h6 className="fw-bold">Illinois Office (Springfield, IL)</h6>
                <p className="mb-1">2501 Chatham Rd, Suite R<br />Springfield, IL 62704</p>
                <p className="mb-1">📞 847-728-6872</p>
                <p>✉ info@zoikomobile.com</p>
              </div>
            </Col>
            <Col md={4} sm={12} className="mb-4">
              <h6 className="fw-bold">Delaware Office (Dover, DE)</h6>
              <p className="mb-1">8 The Green, Suite A<br />Dover, DE 19901</p>
              <p className="mb-1">📞 302-899-7312</p>
              <p>✉ info@zoikomobile.com</p>
              <div className="mt-4">
                <h6 className="fw-bold">Florida Office (Orlando, FL)</h6>
                <p className="mb-1">12386 State Road 535, #302<br />Orlando, FL 32836</p>
                <p className="mb-1">📞 800-988-8116</p>
                <p>✉ info@zoikomobile.com</p>
              </div>
            </Col>
          </Row>
          <Row className="text-center mt-5 footer-linkss">
            <Col className="text-center">
              <Link href="/become-retailer" className="text-decoration-none mx-3">Become a Retailer</Link>
              <Link href="/become-affiliate" className="text-decoration-none mx-3">Become an Affiliate</Link>
              <Link href="/become-partner" className="text-decoration-none mx-3">Partner with Us</Link>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="cpoyrightbox">
        <Container className="py-3 text-center">
          © {curyear} Zoiko Mobile | A trading name of Zoiko Mobile Inc.  
          Headquartered at 5900 Balcones Drive, Suite 100, Austin, TX 78731.  
          All Rights Reserved.
        </Container>
      </Container>
      </div>
      )}
    </>
  );
};

export default Footer;

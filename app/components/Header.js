"use client";
import {
  Container,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Badge,
} from "react-bootstrap";
import Image from "next/image";
import { FaSearch, FaTimes } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import PlanPurchaseModal from "./PlanPurchaseModal";
import TopHeader from "./TopHeader";
import PaymentModal from "./PaymentModal";
import CustomLanguageSwitcher from "./CustomLanguageSwitcher";
import GetInTouchSidebar from "./GetInTouchSidebar";
import ChristmasSidebar from "./ChristmasSidebar";
import { useRouter } from "next/navigation";

let openPlanModalCallback = null;
let openPaymentModalCallback = null;

// ✅ Global Payment Modal trigger
export function openPaymentModal(orderId, amount) {
  if (openPaymentModalCallback) {
    openPaymentModalCallback(orderId, amount);
  }
}

// ✅ Global Plan Purchase Modal trigger
export function openPlanPurchaseModal(
  planTitle,
  planSlug,
  planId,
  planPrice,
  planSalePrice,
  planDuration,
  planBqid,
  planType,
) {
  if (openPlanModalCallback) {
    openPlanModalCallback(
      planTitle,
      planSlug,
      planId,
      planPrice,
      planSalePrice,
      planDuration,
      planBqid,
      planType,
    );
  }
}

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    } catch (err) {
      console.error("Error calling search API", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  // const [showSearch, setShowSearch] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({ orderId: "", amount: 0 });
  const [modalData, setModalData] = useState({
    title: "",
    slug: "",
    id: "",
    bq_id: "",
    plan_type: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const pathname = usePathname();
  const navbarCollapseRef = useRef(null);
  const toggleButtonRef = useRef(null);
  // --- Add these states ---
  const [searchMounted, setSearchMounted] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchTimeoutRef = useRef(null);

  const TRANSITION_MS = 350; // must match CSS

  // --- Show Search ---
  const handleShowSearch = () => {
    setSearchMounted(true);

    // wait 1 frame then animate
    requestAnimationFrame(() => {
      setSearchVisible(true);
    });
  };

  // --- Hide Search ---
  const handleCloseSearch = () => {
    setSearchVisible(false);

    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchMounted(false);
    }, TRANSITION_MS + 20);
  };

  // --- cleanup ---
  useEffect(() => {
    return () => clearTimeout(searchTimeoutRef.current);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("zoiko_token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalQty = storedCart.reduce(
      (sum, item) => sum + Number(item.formData?.priceQty ?? 1),
      0,
    );
    setCartCount(totalQty);

    window.addEventListener("cartUpdated", () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedQty = updatedCart.reduce(
        (sum, item) => sum + Number(item.formData?.priceQty ?? 1),
        0,
      );
      setCartCount(updatedQty);
    });

    const handleChunkError = (e) => {
      if (e?.message?.includes("ChunkLoadError")) {
        console.warn("Chunk load error detected, reloading...");
        window.location.reload();
      }
    };
    window.addEventListener("error", handleChunkError);

    return () => {
      window.removeEventListener("error", handleChunkError);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("zoiko_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // const handleCloseSearch = () => setShowSearch(false);
  // const handleShowSearch = () => setShowSearch(true);

  const handleOpenPlanModal = (
    title,
    slug,
    id,
    price,
    sale_price,
    duration,
    bq_id,
    plan_type,
  ) => {
    setModalData({
      title,
      slug,
      id,
      price,
      sale_price,
      duration,
      bq_id,
      plan_type,
    });
    setShowPlanModal(true);
  };
  openPlanModalCallback = handleOpenPlanModal;

  const handleOpenPaymentModal = (orderId, amount) => {
    setPaymentData({ orderId, amount });
    setShowPaymentModal(true);
  };
  openPaymentModalCallback = handleOpenPaymentModal;

  const closeMobileMenu = () => {
    const navbar = navbarCollapseRef.current;
    if (navbar?.classList.contains("show") && toggleButtonRef.current) {
      toggleButtonRef.current.click();
    }
  };

  return (
    <>
      {/* <style>{`
    .nav-link{
    font-size:1vw !important;}
    `}</style> */}
      {/* Desktop-only Top Header */}
      <div className="d-none d-lg-block">
        <TopHeader />
      </div>
      <GetInTouchSidebar />
      <ChristmasSidebar />
      <Navbar expand="lg" className="bg-body-tertiary p-0 headnav">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              src="/img/zmuslogo-new.png"
              width={160}
              height={70}
              alt="Logo"
            />
          </Navbar.Brand>

          {/* Mobile Right Icons */}
          <div className="d-flex d-lg-none ms-auto align-items-center gap-3">
            <Nav.Link href="#" onClick={handleShowSearch}>
              <i className="bi bi-search fs-5"></i>
            </Nav.Link>
            <Nav.Link href="/checkout" className="position-relative">
              <i className="bi bi-cart"></i>
              {cartCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown
                title={<i className="bi bi-person fs-5"></i>}
                id="user-nav-dropdown-mobile"
                align="end"
              >
                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <i className="bi bi-person fs-5"></i>
              </Nav.Link>
            )}
          </div>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="ms-2"
            ref={toggleButtonRef}
          />

          {/* Mobile Menu */}
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="mobile-overlay"
            ref={navbarCollapseRef}
          >
            <div className="d-lg-none text-end pe-3 pb-3">
              <button
                className="btn btn-link text-dark fs-3 p-0"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="d-block d-lg-none mb-3 px-3">
              <CustomLanguageSwitcher />
            </div>

            {/* ---------------------NAV-BAR------------------------ */}

            <Nav className="mx-auto mt-3 mt-lg-2">
              <NavDropdown
                title="Personal Plans"
                id="personal-dropdown"
                className="personal-dropdown"
              >
                <div className="personal-menu">
                  <Nav.Link
                    href="/prepaid-plans"
                    className="plan-card active-plan"
                  >
                    <img
                      src="/img/icons/prepaid.svg"
                      alt="Prepaid"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Prepaid Plans</h6>
                      <p>No contracts · Activate today</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/postpaid-plans" className="plan-card">
                    <img
                      src="/img/icons/postpaid.svg"
                      alt="Postpaid"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Postpaid Plans</h6>
                      <p>Monthly billing · Full features</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/family-plans" className="plan-card">
                    <img
                      src="/img/icons/family.svg"
                      alt="Family"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Family Plans</h6>
                      <p>Up to 10 lines · Save more</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>

              <NavDropdown
                title="Business"
                id="personal-dropdown"
                className="personal-dropdown"
              >
                <div className="personal-menu">
                  <Nav.Link href="/business-deals" className="plan-card active-plan">
                    <img
                      src="/img/icons/small-business.svg"
                      alt="small business"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Small Business</h6>
                      <p>2-25 lines . Dedicated Support</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/business-deals" className="plan-card">
                    <img
                      src="/img/icons/enterprices.svg"
                      alt="enterprices"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Enterprices</h6>
                      <p>Custom Solutions</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>

              <NavDropdown
                title="Devices"
                id="personal-dropdown"
                className="personal-dropdown"
              >
                <div className="personal-menu">
                  <Nav.Link
                    href="https://phones.zoikomobile.com/"
                    className="plan-card active-plan"
                  >
                    <img
                      src="/img/icons/new-smart-phones.svg"
                      alt="new smart phones"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>New Smart Phones</h6>
                      <p>Latest flagships & Value packs</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link
                    href="/product-category/refurbished"
                    className="plan-card"
                  >
                    <img
                      src="/img/icons/refurbished.svg"
                      alt="Refurbished smartphones"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Refurbished Smartphones</h6>
                      <p>Used Smartphones</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/device-protection" className="plan-card">
                    <img
                      src="/img/icons/device-protection.svg"
                      alt="Device Protection"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Device Protection</h6>
                      <p>Smartwatch . Tabs . Mobiles</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>

              <NavDropdown
                title="Travel"
                id="personal-dropdown"
                className="personal-dropdown"
              >
                <div className="personal-menu">
                  <Nav.Link
                    href="/travel-plans"
                    className="plan-card active-plan"
                  >
                    <img
                      src="/img/icons/travel-plans.svg"
                      alt="Travel Plans"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Travel Plans</h6>
                      <p>Latest Value plans</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/roaming-rates" className="plan-card">
                    <img
                      src="/img/icons/roaming.svg"
                      alt="Roaming add-ons"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Roaming Add-ons</h6>
                      <p>Day Passes & Data Plans</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>

              <NavDropdown
                title="Community Plans"
                id="personal-dropdown"
                className="personal-dropdown"
              >
                <div className="personal-menu">
                  <Nav.Link
                    href="/college-student"
                    className="plan-card active-plan"
                  >
                    <img
                      src="/img/icons/college-students.svg"
                      alt="College Students"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>College Students</h6>
                      <p>No Contracts . Activate Today</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/military-veterans" className="plan-card">
                    <img
                      src="/img/icons/military.svg"
                      alt="Military & Veterans"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Military & Veterans</h6>
                      <p>Monthly Billing . Full Features</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link
                    href="/postal-service-workers"
                    className="plan-card"
                  >
                    <img
                      src="/img/icons/postal-service.svg"
                      alt="Postal Service Workers"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Postal Service Workers</h6>
                      <p>Up to 10 Lines . Save More</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/animal-charities" className="plan-card">
                    <img
                      src="/img/icons/animal-charity.svg"
                      alt="Animal Charities"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Animal Charities</h6>
                      <p>No Contracts . Activate Today</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>

              <NavDropdown
                title="About Us"
                id="personal-dropdown"
                className="personal-dropdown"
              >
                <div className="personal-menu">
                  <Nav.Link href="/about" className="plan-card active-plan">
                    <img
                      src="/img/icons/our-mission.svg"
                      alt="Our Mission"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Our Mission</h6>
                      <p>Connectivity for Evenryone</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/about" className="plan-card">
                    <img
                      src="/img/icons/leadership.svg"
                      alt="Leadership"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Leadership</h6>
                      <p>Backed By Leaders</p>
                    </div>
                  </Nav.Link>

                  <Nav.Link href="/news" className="plan-card">
                    <img
                      src="/img/icons/press-media.svg"
                      alt="Press & Media"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Press & Media</h6>
                      <p>News releases and Info</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/become-partner" className="plan-card">
                    <img
                      src="/img/icons/careers.svg"
                      alt="careers"
                      className="plan-icon"
                    />
                    <div className="plan-text">
                      <h6>Careers</h6>
                      <p>Work with Us</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
              {/* <Nav.Link
                href="/prepaid-plans"
                className={pathname === "/prepaid-plans" ? "active" : ""}
              >
                Prepaid Plans
              </Nav.Link>
              <Nav.Link
                href="/postpaid-plans"
                className={pathname === "/postpaid-plans" ? "active" : ""}
              >
                Postpaid Plans
              </Nav.Link> */}
              {/* <Nav.Link
                href="/business-deals"
                className={pathname === "/business-deals" ? "active" : ""}
              >
                Business Deals
              </Nav.Link>
              <Nav.Link
                href="/travel-plans"
                className={pathname === "/travel-plans" ? "active" : ""}
              >
                Travel Plans
              </Nav.Link>
              <Nav.Link
                href="/animal-music-channel"
                className={pathname === "/animal-music-channel" ? "active" : ""}
              >
                Animal &amp; Music
              </Nav.Link>
              <NavDropdown title="Devices" id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  href="https://phones.zoikomobile.com/"
                  target="_blank"
                >
                  New Smartphones
                </NavDropdown.Item>
                <NavDropdown.Item href="/product-category/refurbished">
                  Refurbished Smartphones
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href="/about"
                className={pathname === "/about" ? "active" : ""}
              >
                About Us
              </Nav.Link> */}
            </Nav>
            {/* Mobile-only Explore section */}
            <div className="d-lg-none px-3 mt-4 mb-3">
              <h6 className="border-bottom pb-2 text-center text-center">
                Explore More
              </h6>
              <Nav className="flex-column">
                <Nav.Link href="/top-up-plan">Top-Up</Nav.Link>
                <Nav.Link href="/byod-plans">BYOD</Nav.Link>
                <Nav.Link href="/device-protection">Device Protection</Nav.Link>
                <NavDropdown title="Special Plans">
                  <NavDropdown.Item href="/college-student">
                    College Students
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/military-veterans">
                    Military &amp; Veterans
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/postal-service-workers">
                    Postal Service Workers
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/animal-charities">
                    Animal Charities
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/family-plans">
                    Family Plans
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/music-hub">
                    Zoiko Music Hub
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/international-callings">
                  International Calls
                </Nav.Link>
                <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                <NavDropdown title="Support">
                  <NavDropdown title="Customer Support">
                    <NavDropdown.Item href="/support">
                      Help & Support
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/reasons-to-love-zoiko-mobile">
                      Reasons to love Zoiko
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://ee.co.uk/help/mobile-coverage-checker">
                      Check Network Coverage
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/faq">FAQs</NavDropdown.Item>
                    <NavDropdown.Item href="/activate">
                      How to activate Physical SIM
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/how-to-activate-your-esim">
                      How to activate eSIM
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Get Started">
                    <NavDropdown.Item href="/switch">
                      Switch &amp; Save
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/login">
                      Join Zoiko Family
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/free-delivery-policy">
                      Free Delivery
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/product-category/refurbished">
                      Refurbished Smartphones
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/return-policy">
                      Return Policy
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Customer Dashboard">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Tariffs & Prices">
                    <NavDropdown.Item href="/roaming-rates">
                      Roaming Charges
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/bundled-offers">
                      Bundled Offers
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/free-international-minutes">
                      Free International Calls
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/out-of-bundle-rates">
                      Out-of-Bundle Rates
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/postal-service-workers">
                      Postal Service Workers Deals
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/device-protection">
                      Device Protection
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="What's Included">
                    <NavDropdown.Item href="/5g-data-deals">
                      5G Speed
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/wi-fi-calling">
                      Wi-Fi Calling
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/canada-mexico-roaming-plans">
                      Roam Free in Canada & Mexico
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/international-callings">
                      International Calls
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/esim">eSIM</NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
                <Nav.Link href="#">Store Locator</Nav.Link>
              </Nav>
            </div>
            <Nav className="ms-auto d-none d-lg-flex align-items-center gap-3">
              {/* <Nav.Link href="#" onClick={handleShowSearch}><i className="bi bi-search"></i></Nav.Link> */}

              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowSearch();
                }}
              >
                <i className="bi bi-search"></i>
              </Nav.Link>

              <Nav.Link href="/checkout" className="position-relative">
                <i className="bi bi-cart"></i>
                {cartCount > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
              {isLoggedIn ? (
                <NavDropdown
                  title={user?.name || "Account"}
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item href="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
              {/* <CustomLanguageSwitcher /> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Modal */}
      {/* <Modal show={showSearch} onHide={handleCloseSearch} size="lg" centered>
        <Modal.Body>
          <div className="p-5">
            <h2 className="mb-3">Search Zoiko Products</h2>
            <label htmlFor="search">Enter keyword to search</label>
            <input type="text" name="search" className="form-control" />
            <Button variant="primary" onClick={handleCloseSearch} className="mt-4">Search</Button>&nbsp;
            <Button variant="secondary" onClick={handleCloseSearch} className="mt-4">Cancel</Button>
          </div>
        </Modal.Body>
      </Modal> */}

      {/* TOP FIXED SEARCH BAR */}
      {searchMounted && (
        <div
          className={`zoiko-search-container ${searchVisible ? "show" : ""}`}
          role="dialog"
        >
          <Container>
            <InputGroup>
              <Form.Control
                placeholder="Search Zoiko AI..."
                className="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <Button className="zoikoSearchBtn" onClick={handleSearch}>
                <FaSearch size={18} />
              </Button>

              <Button
                variant="link"
                onClick={handleCloseSearch}
                style={{
                  width: "50px",
                  border: "none",
                  textDecoration: "none",
                }}
              >
                <FaTimes size={30} color="#1d0303ff" />
              </Button>
            </InputGroup>
          </Container>
        </div>
      )}

      <PlanPurchaseModal
        show={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        planTitle={modalData.title}
        planSlug={modalData.slug}
        planId={modalData.id}
        planPrice={
          modalData.sale_price ? modalData.sale_price : modalData.price
        }
        planDuration={modalData.duration}
        planBqid={modalData.bq_id}
        planType={modalData.plan_type}
      />

      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderId={paymentData.orderId}
        amount={paymentData.amount}
      />
    </>
  );
};

export default Header;

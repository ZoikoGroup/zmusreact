"use client";
import { Container, Button, Nav, Navbar, NavDropdown, Modal,Badge } from "react-bootstrap";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import PlanPurchaseModal from "./PlanPurchaseModal";
import TopHeader from "./TopHeader"; // Desktop-only
// Import the custom switcher
import CustomLanguageSwitcher from "./CustomLanguageSwitcher";
let openPlanModalCallback = null;

export function openPlanPurchaseModal(planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType) {
    if (openPlanModalCallback) {
        openPlanModalCallback(planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType);
    }
}

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [modalData, setModalData] = useState({ title: "", slug: "", id: "", bq_id: "", plan_type: "" });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const pathname = usePathname();

    const navbarCollapseRef = useRef(null);
    const toggleButtonRef = useRef(null);
// ✅ New state for cart quantity
    const [cartCount, setCartCount] = useState(0); 
    useEffect(() => {
         // Check login
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("zoiko_token");
            const userData = localStorage.getItem("user");
            if (token && userData) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userData));
            }
        }

        // ✅ Load initial cart count from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const totalQty = storedCart.reduce((sum, item) => sum + (Number(item.formData?.priceQty ?? 1)), 0);
        setCartCount(totalQty);

        // ✅ Listen for cart updates (custom event)
        window.addEventListener("cartUpdated", () => {
            const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            const updatedQty = updatedCart.reduce((sum, item) => sum + (Number(item.formData?.priceQty ?? 1)), 0);
            setCartCount(updatedQty);
        });

        // ✅ Detect and reload on ChunkLoadError
  const handleChunkError = (e) => {
    if (e?.message?.includes('ChunkLoadError')) {
      console.warn('Chunk load error detected, reloading...');
      window.location.reload();
    }
  };

  window.addEventListener('error', handleChunkError);

  // ✅ Cleanup
  return () => {
    window.removeEventListener('error', handleChunkError);
  };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("zoiko_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const handleCloseSearch = () => setShowSearch(false);
    const handleShowSearch = () => setShowSearch(true);

    const handleOpenPlanModal = (title, slug, id, price, duration, bq_id, plan_type) => {
        setModalData({ title, slug, id, price, duration, bq_id, plan_type });
        setShowPlanModal(true);
    };

    openPlanModalCallback = handleOpenPlanModal;

    const closeMobileMenu = () => {
        const navbar = navbarCollapseRef.current;
        if (navbar?.classList.contains("show") && toggleButtonRef.current) {
            toggleButtonRef.current.click(); // Use built-in toggle behavior
        }
    };

    return (
        <>
            {/* Desktop-only Top Header */}
            
            <div className="d-none d-lg-block">
                <TopHeader />
            </div>

            <Navbar expand="lg" className="bg-body-tertiary p-0 headnav">
                <Container fluid>
                    
                    <Navbar.Brand href="/">
                    
                        <Image src='/img/zmuslogo-new.png' width={160} height={70} alt="Logo" />
                    </Navbar.Brand>

                    {/* Mobile Right Icons */}
                    <div className="d-flex d-lg-none ms-auto align-items-center gap-3">
                        <Nav.Link href="#" onClick={handleShowSearch}><i className="bi bi-search fs-5"></i></Nav.Link>
                         
                        {/* <Nav.Link href="/checkout"><i className="bi bi-cart fs-5"></i></Nav.Link> */}
                         {/* ✅ Cart icon with quantity badge */}
                            <Nav.Link href="/checkout" className="position-relative">
                                <i className="bi bi-cart"></i>
                                {cartCount > 0 && (
                                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Nav.Link>
                        {isLoggedIn ? (
                            <NavDropdown title={<i className="bi bi-person fs-5"></i>} id="user-nav-dropdown-mobile" align="end">
                                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link href="/login"><i className="bi bi-person fs-5"></i></Nav.Link>
                        )}
                    </div>

                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        className="ms-2"
                        ref={toggleButtonRef} // Ref to control the toggle programmatically
                    />

                    {/* Mobile menu overlay */}
                    <Navbar.Collapse id="responsive-navbar-nav" className="mobile-overlay" ref={navbarCollapseRef}>
                        {/* Close button for mobile menu */}
                        <div className="d-lg-none text-end pe-3 pb-3">
                            <button className="btn btn-link text-dark fs-3 p-0" onClick={closeMobileMenu}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        
                        <div className="d-block d-lg-none">
               <CustomLanguageSwitcher />
            </div>
                        <Nav className="mx-auto mt-3 mt-lg-0">
                            <Nav.Link href="/prepaid-plans" className={pathname === "/prepaid-plans" ? "active" : ""}>Prepaid Plans</Nav.Link>
                            <Nav.Link href="/postpaid-plans" className={pathname === "/postpaid-plans" ? "active" : ""}>Postpaid Plans</Nav.Link>
                            <Nav.Link href="/business-deals" className={pathname === "/business-deals" ? "active" : ""}>Business Deals</Nav.Link>
                            <Nav.Link href="/travel-plans" className={pathname === "/travel-plans" ? "active" : ""}>Travel Plans</Nav.Link>
                            <Nav.Link  href="/animal-music-channel" className={pathname === "/animal-music-channel" ? "active" : ""}>Animal &amp; Music</Nav.Link>
                            <NavDropdown title="Devices" id="collapsible-nav-dropdown" style={{width: "fit-content" }}>
                                <NavDropdown.Item href="https://phones.zoikomobile.com/" target="_blank">New Smartphones</NavDropdown.Item>
                                <NavDropdown.Item href="/product-category/refurbished">Refurbished Smartphones</NavDropdown.Item>
                                <NavDropdown.Item href="#">Accessories</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about" className={pathname === "/about" ? "active" : ""}>About Us</Nav.Link>
                        </Nav>

                        {/* Mobile-only Explore section */}
                        <div className="d-lg-none px-3 mt-4 mb-3">
                            <h6 className="border-bottom pb-2 text-center text-center">Explore More</h6>
                            <Nav className="flex-column">
                                <Nav.Link href="/top-up-plan">Top-Up</Nav.Link>
                                <Nav.Link href="/byod-plans">BYOD</Nav.Link>
                                <Nav.Link href="/device-protection">Device Protection</Nav.Link>
                                <NavDropdown title="Special Plans">
                                    <NavDropdown.Item href="/college-student">College Students</NavDropdown.Item>
                                    <NavDropdown.Item href="/military-veterans">Military &amp; Veterans</NavDropdown.Item>
                                    <NavDropdown.Item href="/postal-service-workers">Postal Service Workers</NavDropdown.Item>
                                    <NavDropdown.Item href="/animal-charities">Animal Charities</NavDropdown.Item>
                                    <NavDropdown.Item href="/family-plans">Family Plans</NavDropdown.Item>
                                    <NavDropdown.Item href="/music-hub">Zoiko Music Hub</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/international-callings">International Calls</Nav.Link>
                                <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                                <NavDropdown title="Support" >
                                    <NavDropdown title="Customer Support" >
                                        <NavDropdown.Item href="/support">Help & Support</NavDropdown.Item>
                                        <NavDropdown.Item href="/reasons-to-love-zoiko-mobile">Reasons to love Zoiko</NavDropdown.Item>
                                        <NavDropdown.Item href="https://ee.co.com/help/mobile-coverage-checker">Check Network Coverage</NavDropdown.Item>
                                        <NavDropdown.Item href="/faq">FAQs</NavDropdown.Item>
                                        <NavDropdown.Item href="/activate">How to activate Physical SIM</NavDropdown.Item>
                                        <NavDropdown.Item href="/how-to-activate-your-esim">How to activate eSIM</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Get Started">
                                        <NavDropdown.Item href="/switch">Switch &amp; Save</NavDropdown.Item>
                                        <NavDropdown.Item href="/login">Join Zoiko Family</NavDropdown.Item>
                                        <NavDropdown.Item href="/free-delivery-policy">Free Delivery</NavDropdown.Item>
                                        <NavDropdown.Item href="/product-category/refurbished">Refurbished Smartphones</NavDropdown.Item>
                                        <NavDropdown.Item href="/return-policy">Return Policy</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Customer Dashboard">
                                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Tariffs & Prices">
                                        <NavDropdown.Item href="/roaming-rates">Roaming Charges</NavDropdown.Item>
                                        <NavDropdown.Item href="/bundled-offers">Bundled Offers</NavDropdown.Item>
                                        <NavDropdown.Item href="/free-international-minutes">Free International Calls</NavDropdown.Item>
                                        <NavDropdown.Item href="/out-of-bundle-rates">Out-of-Bundle Rates</NavDropdown.Item>
                                        <NavDropdown.Item href="/postal-service-workers">Postal Service Workers Deals</NavDropdown.Item>
                                        <NavDropdown.Item href="/device-protection">Device Protection</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="What's Included">
                                        <NavDropdown.Item href="/5g-data-deals">5G Speed</NavDropdown.Item>
                                        <NavDropdown.Item href="/wi-fi-calling">Wi-Fi Calling</NavDropdown.Item>
                                        <NavDropdown.Item href="/canada-mexico-roaming-plans">Roam Free in Canada & Mexico</NavDropdown.Item>
                                        <NavDropdown.Item href="/international-callings">International Calls</NavDropdown.Item>
                                        <NavDropdown.Item href="/esim">eSIM</NavDropdown.Item>
                                    </NavDropdown>

                                </NavDropdown>
                                <Nav.Link href="#">Store Locator</Nav.Link>
                            </Nav>
                        </div>

                        {/* Desktop Right Icons */}
                        <Nav className="ms-auto d-none d-lg-flex align-items-center gap-3">
                            <Nav.Link href="#" onClick={handleShowSearch}><i className="bi bi-search"></i></Nav.Link>
                            {/* <Nav.Link href="/checkout"><i className="bi bi-cart"></i></Nav.Link> */}
                            <Nav.Link href="/checkout" className="position-relative">
                                <i className="bi bi-cart"></i>
                                {cartCount > 0 && (
                                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Nav.Link>
                            {isLoggedIn ? (
                                <NavDropdown title={user?.name || "Account"} id="user-nav-dropdown">
                                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link href="/login">Login</Nav.Link>
                            )}
                       
                            <CustomLanguageSwitcher />

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Search Modal */}
            <Modal show={showSearch} onHide={handleCloseSearch} size="lg" centered>
                <Modal.Body>
                    <div className="p-5">
                        <h2 className="mb-3">Search Zoiko Products</h2>
                        <label htmlFor="search">Enter keyword to search</label>
                        <input type="text" name="search" className="form-control" />
                        <Button variant="primary" onClick={handleCloseSearch} className="mt-4">Search</Button>&nbsp;
                        <Button variant="secondary" onClick={handleCloseSearch} className="mt-4">Cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Plan Purchase Modal */}
            <PlanPurchaseModal
                show={showPlanModal}
                onClose={() => setShowPlanModal(false)}
                planTitle={modalData.title}
                planSlug={modalData.slug}
                planId={modalData.id}
                planPrice={modalData.price}
                planDuration={modalData.duration}
                planBqid={modalData.bq_id}
                planType={modalData.plan_type}
            />
        </>
    );
};

export default Header;

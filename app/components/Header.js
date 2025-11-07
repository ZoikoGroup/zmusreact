"use client";
import { Container, Button, Nav, Navbar, NavDropdown, Modal, Badge } from "react-bootstrap";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import PlanPurchaseModal from "./PlanPurchaseModal";
import TopHeader from "./TopHeader"; // Desktop-only
import PaymentModal from "./PaymentModal";

// =====================
// 🔹 Modal Triggers (Global)
// =====================
let openPlanModalCallback = null;
let openPaymentModalCallback = null;

// ✅ Expose function to open Payment Modal globally
export function openPaymentModal(orderId, amount) {
  if (openPaymentModalCallback) {
    openPaymentModalCallback(orderId, amount);
  }
}

// ✅ Expose function to open Plan Purchase Modal globally
export function openPlanPurchaseModal(planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType) {
  if (openPlanModalCallback) {
    openPlanModalCallback(planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType);
  }
}

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // ✅ New Payment Modal state
  const [paymentData, setPaymentData] = useState({ orderId: "", amount: 0 }); // ✅ Payment data
  const [modalData, setModalData] = useState({ title: "", slug: "", id: "", bq_id: "", plan_type: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const pathname = usePathname();
  const navbarCollapseRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // =====================
  // 🔹 Initial setup
  // =====================
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("zoiko_token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    }

    // ✅ Load initial cart count
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalQty = storedCart.reduce((sum, item) => sum + (Number(item.formData?.priceQty ?? 1)), 0);
    setCartCount(totalQty);

    // ✅ Listen for cart updates
    window.addEventListener("cartUpdated", () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedQty = updatedCart.reduce((sum, item) => sum + (Number(item.formData?.priceQty ?? 1)), 0);
      setCartCount(updatedQty);
    });

    // ✅ Handle chunk errors
    const handleChunkError = (e) => {
      if (e?.message?.includes('ChunkLoadError')) {
        console.warn('Chunk load error detected, reloading...');
        window.location.reload();
      }
    };
    window.addEventListener('error', handleChunkError);

    return () => {
      window.removeEventListener('error', handleChunkError);
    };
  }, []);

  // =====================
  // 🔹 Logout
  // =====================
  const handleLogout = () => {
    localStorage.removeItem("zoiko_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // =====================
  // 🔹 Search Modal handlers
  // =====================
  const handleCloseSearch = () => setShowSearch(false);
  const handleShowSearch = () => setShowSearch(true);

  // =====================
  // 🔹 Plan Modal handler
  // =====================
  const handleOpenPlanModal = (title, slug, id, price, duration, bq_id, plan_type) => {
    setModalData({ title, slug, id, price, duration, bq_id, plan_type });
    setShowPlanModal(true);
  };
  openPlanModalCallback = handleOpenPlanModal;

  // =====================
  // 🔹 Payment Modal handler
  // =====================
  const handleOpenPaymentModal = (orderId, amount) => {
    setPaymentData({ orderId, amount });
    setShowPaymentModal(true);
  };
  openPaymentModalCallback = handleOpenPaymentModal;

  // =====================
  // 🔹 Mobile Menu Close
  // =====================
  const closeMobileMenu = () => {
    const navbar = navbarCollapseRef.current;
    if (navbar?.classList.contains("show") && toggleButtonRef.current) {
      toggleButtonRef.current.click();
    }
  };

  // =====================
  // 🔹 Render
  // =====================
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
            ref={toggleButtonRef}
          />

          {/* Mobile menu */}
          <Navbar.Collapse id="responsive-navbar-nav" className="mobile-overlay" ref={navbarCollapseRef}>
            <div className="d-lg-none text-end pe-3 pb-3">
              <button className="btn btn-link text-dark fs-3 p-0" onClick={closeMobileMenu}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <Nav className="mx-auto mt-3 mt-lg-0">
              <Nav.Link href="/prepaid-plans" className={pathname === "/prepaid-plans" ? "active" : ""}>Prepaid Plans</Nav.Link>
              <Nav.Link href="/postpaid-plans" className={pathname === "/postpaid-plans" ? "active" : ""}>Postpaid Plans</Nav.Link>
              <Nav.Link href="/business-deals" className={pathname === "/business-deals" ? "active" : ""}>Business Deals</Nav.Link>
              <Nav.Link href="/travel-plans" className={pathname === "/travel-plans" ? "active" : ""}>Travel Plans</Nav.Link>
              <Nav.Link href="/animal-music-channel" className={pathname === "/animal-music-channel" ? "active" : ""}>Animal &amp; Music</Nav.Link>
              <NavDropdown title="Devices" id="collapsible-nav-dropdown" style={{ width: "fit-content" }}>
                <NavDropdown.Item href="https://phones.zoikomobile.com/" target="_blank">New Smartphones</NavDropdown.Item>
                <NavDropdown.Item href="/product-category/refurbished">Refurbished Smartphones</NavDropdown.Item>
                <NavDropdown.Item href="#">Accessories</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/about" className={pathname === "/about" ? "active" : ""}>About Us</Nav.Link>
            </Nav>

            {/* Desktop Right Icons */}
            <Nav className="ms-auto d-none d-lg-flex align-items-center gap-3">
              <Nav.Link href="#" onClick={handleShowSearch}><i className="bi bi-search"></i></Nav.Link>
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
              <Nav.Link href="#">Español</Nav.Link>
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

      {/* ✅ Payment Modal */}
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

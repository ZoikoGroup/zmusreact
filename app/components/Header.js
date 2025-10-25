"use client";
import { Container, Button, Nav, Navbar, NavDropdown, Modal, Badge } from "react-bootstrap"; // ✅ Added Badge import
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import PlanPurchaseModal from "./PlanPurchaseModal";

let openPlanModalCallback = null; // global callback reference

export function openPlanPurchaseModal(planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType) {
    if (openPlanModalCallback) {
        openPlanModalCallback(planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType);
    }
}

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [modalData, setModalData] = useState({ title: "", slug: "", id: "" ,bq_id: "", plan_type: ""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // ✅ New state for cart quantity
    const [cartCount, setCartCount] = useState(0); 

    const pathname = usePathname();

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
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("zoiko_token");
        localStorage.removeItem("user");
        window.location.href = "/login"; // redirect
    };

    const handleCloseSearch = () => setShowSearch(false);
    const handleShowSearch = () => setShowSearch(true);

    const handleOpenPlanModal = (title, slug, id, price, duration, bq_id, plan_type) => {
        setModalData({ title, slug, id, price, duration, bq_id, plan_type });
        setShowPlanModal(true);
    };

    openPlanModalCallback = handleOpenPlanModal; // expose globally

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary p-0 headnav">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <Image src='/img/zmuslogo-new.png' width={160} height={70} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link href="/prepaid-plans" className={pathname == "/prepaid-plans" ? "active" : ""}>Prepaid Plans</Nav.Link>
                            <Nav.Link href="/postpaid-plans" className={pathname == "/postpaid-plans" ? "active" : ""}>Postpaid Plans</Nav.Link>
                            <Nav.Link href="/business-deals" className={pathname == "/business-deals" ? "active" : ""}>Business Deals</Nav.Link>
                            <Nav.Link href="/travel-plans" className={pathname == "/travel-plans" ? "active" : ""}>Travel Plans</Nav.Link>
                            <Nav.Link href="#">Animal &amp; Music</Nav.Link>
                            <NavDropdown title="Devices" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="https://phones.zoikomobile.com/" target="_blank">New Smartphones</NavDropdown.Item>
                                <NavDropdown.Item href="/product-category/refurbished">Refurbished Smartphones</NavDropdown.Item>
                                <NavDropdown.Item href="#">Accessories</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about" className={pathname == "/about" ? "active" : ""}>About Us</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link href="#" onClick={handleShowSearch}><i className="bi bi-search"></i></Nav.Link>

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
                                <NavDropdown title={user?.name || "Account"} id="user-nav-dropdown">
                                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <NavDropdown title="Login" id="login-nav-dropdown">
                                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                </NavDropdown>
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
        </>
    );
};

export default Header;

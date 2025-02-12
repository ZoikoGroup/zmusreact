"use client"
import { Container, Button, Nav, Navbar, NavDropdown, Modal } from "react-bootstrap";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useState } from "react";

const Header = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-0">
            <Container fluid>
                <Navbar.Brand href="/"><Image src='/img/zmuslogo.png' width={160} height={90} alt="Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#">Prepaid Plans</Nav.Link>
                        <Nav.Link href="#">Postpaid Plans</Nav.Link>
                        <Nav.Link href="#">Business Deals</Nav.Link>
                        <Nav.Link href="#">Travel Plans</Nav.Link>
                        <Nav.Link href="#">Animal &amp; Music</Nav.Link>
                        <NavDropdown title="Devices" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#">Refurbished Smartphones</NavDropdown.Item>
                            <NavDropdown.Item href="#">Tablets</NavDropdown.Item>
                            <NavDropdown.Item href="#">Accessories</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">About Us</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#" onClick={handleShow}><i className="bi bi-search"></i></Nav.Link>
                        <Nav.Link href="#"><i className="bi bi-cart"></i></Nav.Link>
                        <NavDropdown title="Login" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#">Register</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Body>
                <div className="p-5">
                    <h2 className="mb-3">Search Zoiko Products</h2>
                    <label htmlFor="search">Enter keyword to search</label>
                    <input type="text" name="search" className="form-control" />
                    <Button variant="primary" onClick={handleClose} className="mt-4">Search</Button>&nbsp;
                    <Button variant="primary" onClick={handleClose} className="mt-4">Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default Header;
"use client"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';

const TopHeader = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-lite p-0" style={{fontSize:'12px'}}>
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#">BYOD</Nav.Link>
                        <Nav.Link href="#">Device Protection</Nav.Link>
                        <NavDropdown title="Special Plans" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#">College Students</NavDropdown.Item>
                            <NavDropdown.Item href="#">Millitary &amp; Veterans</NavDropdown.Item>
                            <NavDropdown.Item href="#">Postal Service Workers</NavDropdown.Item>
                            <NavDropdown.Item href="#">Animal Charities</NavDropdown.Item>
                            <NavDropdown.Item href="#">Family Plans</NavDropdown.Item>
                            <NavDropdown.Item href="#">Zoiko Music Hub</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">Contact Us</Nav.Link>
                        <NavDropdown title="Support" id="collapsible-nav-dropdown" className="dropdownmg">
                            <NavDropdown.Item href="#">College Students</NavDropdown.Item>
                            <NavDropdown.Item href="#">Millitary &amp; Veterans</NavDropdown.Item>
                            <NavDropdown.Item href="#">Postal Service Workers</NavDropdown.Item>
                            <NavDropdown.Item href="#">Animal Charities</NavDropdown.Item>
                            <NavDropdown.Item href="#">Family Plans</NavDropdown.Item>
                            <NavDropdown.Item href="#">Zoiko Music Hub</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">International Calls</Nav.Link>
                        <Nav.Link href="#">Store Locator</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default TopHeader;
"use client";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import CustomLanguageSwitcher from "./CustomLanguageSwitcher";

const TopHeader = () => {
  return (
    <Navbar expand="lg" className="p-0 topnav">
      <Container fluid className="topnav-container">
        {/* LEFT SIDE */}
        <Nav className="topnav-left">
          <Nav.Link href="https://mvnoc.ai/coverage-map" target="_blank">
            COVERAGE MAP
          </Nav.Link>

          <Nav.Link href="/network-service" target="_blank">
            NETWORK STATUS
          </Nav.Link>

          <Nav.Link href="/support">SUPPORT</Nav.Link>
        </Nav>

        {/* RIGHT SIDE */}
        <div className="topnav-right">
          <div className="top-item">
            <img
              src="/img/icons/phone.svg"
              alt="Phone"
              className="phone-icon"
            />
            <span>800-988-8116</span>
          </div>

          <div className="top-item">
            <CustomLanguageSwitcher />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopHeader;

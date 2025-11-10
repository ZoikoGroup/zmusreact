"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const PartnershipFormPage = () => {
  return (
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
      <Container className="my-5">
      <h3 className="mb-4 text-center fw-bold">
        Business and Contact Information
      </h3>
      <Form>
        {/* Business and Contact Info */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Company Name *</Form.Label>
              <Form.Control type="text" placeholder="Enter company name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Website (if any)</Form.Label>
              <Form.Control type="text" placeholder="www.example.com" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control type="text" placeholder="Street" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>City *</Form.Label>
              <Form.Control type="text" placeholder="City" />
            </Form.Group>
          </Col>
          
        </Row>

        <Row className="mb-3">
            <Col md={6}>
            <Form.Group>
              <Form.Label>ZIP *</Form.Label>
              <Form.Control type="text" placeholder="ZIP" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>State *</Form.Label>
              <Form.Control type="text" placeholder="State" />
            </Form.Group>
          </Col>
        </Row>

        <h4 className="mt-4 mb-3 fw-bold">Primary Contact Person</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email Address *</Form.Label>
              <Form.Control type="email" placeholder="Enter your email address" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control type="tel" placeholder="+1" />
            </Form.Group>
          </Col>
        </Row>

        <h4 className="mt-4 mb-3 fw-bold">Business Details</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Years in Business *</Form.Label>
              <Form.Select>
                <option>Less than 1 year</option>
                <option>1–3 years</option>
                <option>3–5 years</option>
                <option>5+ years</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Current Monthly Sales Volume (Mobile Plans & Devices) *
              </Form.Label>
              <Form.Select>
                <option>Select</option>
                <option>$0 – $10,000</option>
                <option>$10,000 – $50,000</option>
                <option>$50,000+</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <h4 className="mt-4 mb-3 fw-bold">
          Business Type (Check all that apply)
        </h4>
        <div className="mb-3">
          {[
            "Wireless Retailer",
            "Mobile Service Provider",
            "E-commerce Business",
            "Telecom Distributor",
            "Digital Marketing Agency",
          ].map((label, idx) => (
            <Form.Check
              key={idx}
              inline
              type="checkbox"
              label={label}
              className="me-3"
            />
          ))}
          <Form.Check inline type="checkbox" label="Other (please specify)" />
        </div>

        <h4 className="mt-4 mb-3 fw-bold">
          Which Zoiko Mobile solutions are you interested in offering?
        </h4>
        <div className="mb-3">
          {[
            "Prepaid & Postpaid SIM Plans",
            "5G Data Plans & Bundles",
            "Unlocked Smartphones & Devices",
            "IoT & Enterprise Solutions",
            "White Label Mobile Solutions",
          ].map((label, idx) => (
            <Form.Check
              key={idx}
              inline
              type="checkbox"
              label={label}
              className="me-3"
            />
          ))}
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Do you currently sell other carrier services? *</Form.Label>
              <Form.Select>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>What is your target market? *</Form.Label>
              <Form.Select>
                <option>General Consumers</option>
                <option>Corporate Clients</option>
                <option>Retailers</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Preferred Partnership Model *</Form.Label>
              <Form.Select>
                <option>Select</option>
                <option>Reseller</option>
                <option>Distributor</option>
                <option>Affiliate</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <h4 className="mt-4 mb-3 fw-bold">Preferred Payment Method</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Billing Contact Name *</Form.Label>
              <Form.Control type="text" placeholder="Enter Billing Name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Billing Email *</Form.Label>
              <Form.Control type="email" placeholder="Enter Billing Email Address" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Preferred Shipping Method for Devices/SIMs *</Form.Label>
              <Form.Select>
                <option>Standard Ground</option>
                <option>Express</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Terms and Submit */}
        <Form.Group className="mb-3">
          <Form.Check
            label="I understand that partnership eligibility is subject to approval by Zoiko Mobile."
          />
          <Form.Check
            label={
              <>
                I agree to Zoiko Mobile’s{" "}
                <a href="#" className="text-danger">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-danger">
                  Privacy Policy
                </a>
                .
              </>
            }
          />
        </Form.Group>

        <Button type="submit" variant="danger" className="px-5">
          Submit Your Application
        </Button>
      </Form>
    </Container>
      <Footer />
    </>
  );
};

export default PartnershipFormPage;

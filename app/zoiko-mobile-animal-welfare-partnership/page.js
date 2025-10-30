"use client";

import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import {
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Row,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import React, { useState } from "react";
import Countrycode from "../products/countrycode.json";

const AnimalPartnership = () => {
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    orgname: "",
    orgtype: "",
    focus: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    mission: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    countrycode: "",
    prefcontact: "",
    discount: false,
    support: false,
    campaign: false,
    donation: false,
    volunteer: false,
    other: "",
    supportmission: "",
    statusproof: null,
    concent: false,
    terms: false,
    updates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.orgname) formErrors.orgname = "Organization name is required";
    if (!formData.orgtype) formErrors.orgtype = "Organization type is required";
    if (!formData.focus) formErrors.focus = "This field is required";
    if (!formData.website) formErrors.website = "Please enter your website URL";
    if (!formData.street) formErrors.street = "This field is required";
    if (!formData.city) formErrors.city = "This field is required";
    if (!formData.state) formErrors.state = "This field is required";
    if (!formData.zipcode) formErrors.zipcode = "This field is required";
    if (!formData.mission) formErrors.mission = "Mission is required";
    if (!formData.name) formErrors.name = "This field is required";
    if (!formData.role) formErrors.role = "This field is required";
    if (!formData.phone) formErrors.phone = "This field is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.statusproof)
      formErrors.statusproof = "Please upload a proof document";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setApiResponse(null);

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(
          key,
          typeof formData[key] === "boolean" ? (formData[key] ? "1" : "0") : formData[key]
        );
      }

      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/animal-partnership",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: form,
        }
      );

      const resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        result = { message: "Response not in JSON format", raw: resultText };
      }

      setApiResponse(result);
      setShowModal(true);
    } catch (error) {
      setApiResponse({ error: error.message });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text={<>Zoiko Mobile Animal Welfare Partnership Form</>} />

      <Container fluid className="bglite py-5">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormLabel>Organization Name *</FormLabel>
                <Form.Control
                  name="orgname"
                  value={formData.orgname}
                  onChange={handleChange}
                  placeholder="Full registered name of organization"
                />
                {errors.orgname && <p className="txtred">{errors.orgname}</p>}
              </Col>

              <Col md={6}>
                <FormLabel>Organization Type *</FormLabel>
                <Form.Select
                  name="orgtype"
                  onChange={handleChange}
                  value={formData.orgtype}
                >
                  <option value="">Select One</option>
                  <option>Registered Charity</option>
                  <option>Nonprofit Organization</option>
                  <option>Private Foundation</option>
                  <option>For-profit Organization with Animal Welfare Focus</option>
                  <option>Other</option>
                </Form.Select>
                {errors.orgtype && <p className="txtred">{errors.orgtype}</p>}
              </Col>
            </Row>

            <br />
            <Row>
              <Col md={6}>
                <FormLabel>Primary Focus *</FormLabel>
                <Form.Control
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  placeholder="e.g. Animal rescue, shelter support, etc."
                />
                {errors.focus && <p className="txtred">{errors.focus}</p>}
              </Col>

              <Col md={6}>
                <FormLabel>Website *</FormLabel>
                <Form.Control
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="www.example.com"
                />
                {errors.website && <p className="txtred">{errors.website}</p>}
              </Col>
            </Row>

            <hr />
            <h4 className="text-center pt-3">Headquarter's Address</h4>
            <Row>
              <Col md={6}>
                <FormLabel>Street *</FormLabel>
                <Form.Control
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
                {errors.street && <p className="txtred">{errors.street}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>City *</FormLabel>
                <Form.Control
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="txtred">{errors.city}</p>}
              </Col>
            </Row>

            <br />
            <Row>
              <Col md={6}>
                <FormLabel>State *</FormLabel>
                <Form.Control
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <p className="txtred">{errors.state}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>ZIP *</FormLabel>
                <Form.Control
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
                {errors.zipcode && <p className="txtred">{errors.zipcode}</p>}
              </Col>
            </Row>

            <br />
            <Form.Group>
              <Form.Label>Mission Statement *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="mission"
                value={formData.mission}
                onChange={handleChange}
              />
              {errors.mission && <p className="txtred">{errors.mission}</p>}
            </Form.Group>

            <hr />
            <h4 className="text-center pt-3">Primary Contact Details</h4>
            <Row>
              <Col md={6}>
                <FormLabel>Name *</FormLabel>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="txtred">{errors.name}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Role *</FormLabel>
                <Form.Control
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
                {errors.role && <p className="txtred">{errors.role}</p>}
              </Col>
            </Row>

            <br />
            <Row>
              <Col md={6}>
                <FormLabel>Email *</FormLabel>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Phone *</FormLabel>
                <InputGroup>
                  <Form.Select
                    name="countrycode"
                    value={formData.countrycode}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {Countrycode.map((c) => (
                      <option key={c.code} value={c.dial_code}>
                        {c.dial_code}, {c.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>
            </Row>

            <br />
            <FormLabel>Preferred Contact Method *</FormLabel>
            <Form.Select
              name="prefcontact"
              value={formData.prefcontact}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </Form.Select>

            <hr />
            <h4 className="text-center pt-3">
              What would you like to achieve with this partnership?
            </h4>
            {["discount", "support", "campaign", "donation", "volunteer"].map(
              (key) => (
                <Form.Check
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  checked={formData[key]}
                  onChange={handleChange}
                />
              )
            )}

            <FormLabel className="mt-3">If other, please specify</FormLabel>
            <Form.Control
              name="other"
              value={formData.other}
              onChange={handleChange}
            />

            <Form.Group className="mt-3">
              <Form.Label>How can Zoiko Mobile support your mission?</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="supportmission"
                value={formData.supportmission}
                onChange={handleChange}
              />
            </Form.Group>

            <hr />
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Upload Proof *</Form.Label>
              <Form.Control
                type="file"
                name="statusproof"
                onChange={handleChange}
              />
              {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
            </Form.Group>

            <Form.Check
              label="I confirm that all info is accurate"
              name="concent"
              checked={formData.concent}
              onChange={handleChange}
            />
            <Form.Check
              label="I agree to Terms & Privacy Policy"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <Form.Check
              label="I consent to receive updates"
              name="updates"
              checked={formData.updates}
              onChange={handleChange}
            />

            <br />
            <Button variant="danger" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Submit Your Application"}
            </Button>
          </Form>
        </Container>
      </Container>

      {/* ✅ Modal for showing JSON response */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
            <h5>Your information has been submitted successfully 🎉</h5>
            <p>We appreciate your response. Our team will get back to you soon.</p>
        </Modal.Body>
        </Modal>


      <Footer />
    </>
  );
};

export default AnimalPartnership;

"use client";
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
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text={<>Zoiko Mobile Animal Welfare Partnership Form</>} />
<style>{`  
 h4 {border-bottom: 1px solid #9a9696;
    padding-bottom: 20px;
}
.specialForm{
    box-shadow: 3px 4px 19px 14px rgba(0, 0, 0, 0.1) !important;
    border-radius: 15px !important;
    padding: 2rem !important;
    // margin: 2rem !important;
}

.form-control, .form-select{
    height: 50px;
    background: #fafafa;
}
    
.checkbox-group-center {

  justify-content: center;

}

.stylish-checkboxes .form-check {
  position: relative;
  padding-right: 2rem;
  padding-left: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;   /* ✅ Vertically aligns checkbox + label */
  gap: 8px;              /* space between box and text */
  position: relative;
  cursor: pointer;
}

.stylish-checkboxes .form-check-label {
  cursor: pointer;
  font-weight: 500;
  color: #333;
  transition: color 0.2s ease;
}

.stylish-checkboxes .form-check-input {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  position: relative;
  margin: 0;             /* ✅ Removes unwanted offset */
}

/* Hover effect */
.stylish-checkboxes .form-check-input:hover {
  border-color: #dc3545;
}

/* Checked state */
.form-check-input:checked {
  background-color: #dc3545;
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
}

/* Custom tick mark */
.form-check-input:checked::after {
  
  color: #fff;
  font-size: 14px;
  position: absolute;
  left: 3px;
  top: -2px;
}

/* Label hover */
 .form-check:hover .form-check-label {
  color: #dc3545;
}

.form-check-inline {
    margin-right: 5rem !important;
}

.form-control,
.form-select {
  border: 1.5px solid #ced4da !important;
  border-radius: 8px !important;
  min-height: 50px;
  transition: all 0.25s ease-in-out !important;
  box-shadow: none !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #dc3545 !important; /* Red border */
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important; /* Red glow */
  outline: none !important;
}


.form-label {
  font-weight: 500;
  color: #222;
}

/* Placeholder color */
.form-control::placeholder {
  color: #999 !important;
}
/* Base select styling */
.form-select {
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 10px 14px;
  height: 50px;
  transition: all 0.25s ease-in-out;
  background-color: #fff;
  cursor: pointer;
  box-shadow: none;
}

/* On focus or when opened */
.form-select:focus {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
  outline: none !important;
  background-color: #fff;
}

/* Add subtle icon animation */
.form-select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.048l-6 6-6-6z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

/* On open — make arrow red and give dropdown "glow" */
.form-select:focus-visible,
.form-select:focus-within {
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23dc3545' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.048l-6 6-6-6z'/></svg>");
  background-color: #fff;
  border-color: #dc3545;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
}

/* Optional: when dropdown is disabled */
.form-select:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
  cursor: not-allowed;
}
  // .form-check-input:focus{
  // background-color: #dc3545;
  // }
#formFileLg{line-height: 2.3rem !important;}
`}</style>
      <Container fluid className="bglite py-5">
        <Container>
          <Form onSubmit={handleSubmit} className="specialForm">
            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>Organization Name *</FormLabel>
                <Form.Control
                  name="orgname"
                  value={formData.orgname}
                  onChange={handleChange}
                  placeholder="Full registered name of organization"
                />
                {errors.orgname && <p className="txtred">{errors.orgname}</p>}
              </Col>

              <Col md={6} className="mt-2">
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

            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>Primary Focus *</FormLabel>
                <Form.Control
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  placeholder="e.g. Animal rescue, shelter support, etc."
                />
                {errors.focus && <p className="txtred">{errors.focus}</p>}
              </Col>

              <Col md={6} className="mt-2">
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
              <Col md={6} className="mt-2">
                <FormLabel>Street *</FormLabel>
                <Form.Control
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
                {errors.street && <p className="txtred">{errors.street}</p>}
              </Col>
              <Col md={6} className="mt-2">
                <FormLabel>City *</FormLabel>
                <Form.Control
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="txtred">{errors.city}</p>}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>State *</FormLabel>
                <Form.Control
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <p className="txtred">{errors.state}</p>}
              </Col>
              <Col md={6} className="mt-2">
                <FormLabel>ZIP *</FormLabel>
                <Form.Control
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
                {errors.zipcode && <p className="txtred">{errors.zipcode}</p>}
              </Col>
            </Row>

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
              <Col md={6} className="mt-2">
                <FormLabel>Name *</FormLabel>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="txtred">{errors.name}</p>}
              </Col>
              <Col md={6} className="mt-2">
                <FormLabel>Role *</FormLabel>
                <Form.Control
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
                {errors.role && <p className="txtred">{errors.role}</p>}
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>Email *</FormLabel>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
              <Col md={6} className="mt-2">
                <FormLabel>Phone *</FormLabel>
                
                  <Form.Control
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                {errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>
            </Row>

            <FormLabel className="mt-2">Preferred Contact Method *</FormLabel>
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
            <div className="d-flex flex-wrap checkbox-group-center  stylish-checkboxes">
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

          
            </div>

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

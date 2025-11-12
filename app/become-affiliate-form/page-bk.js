"use client";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, FormLabel, InputGroup } from "react-bootstrap";
import Countrycode from "../products/countrycode.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";

const PartnerWithUsForm = () => {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    name: "",
    job: "",
    email: "",
    phone: "",
    countrycode: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    yearsInBusiness: "",
    monthlySales: "",
    businessTypes: [],
    saleOtherCarriers: "",
    planToSell: [],
    estimatedMonthlyPurchase: "",
    bankTransfer: "",
    billingContact: "",
    billingEmail: "",
    preferredShippingMethod: "",
    agreeEligibility: false,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;
    if (dataset.group === "businessTypes" || dataset.group === "planToSell") {
      const arr = formData[dataset.group];
      const updated = checked ? [...arr, value] : arr.filter((item) => item !== value);
      setFormData({ ...formData, [dataset.group]: updated });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Enter your registered company name";
    if (!formData.businessType) newErrors.businessType = "Business type is required";
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.job) newErrors.job = "Job title is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.street) newErrors.street = "Street is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip) newErrors.zip = "ZIP is required";
    if (!formData.yearsInBusiness) newErrors.yearsInBusiness = "Select years in business";
    if (!formData.monthlySales) newErrors.monthlySales = "Select monthly sales volume";
    if (!formData.saleOtherCarriers) newErrors.saleOtherCarriers = "This field is required";
    if (!formData.estimatedMonthlyPurchase) newErrors.estimatedMonthlyPurchase = "Select estimated monthly purchase";
    if (!formData.bankTransfer) newErrors.bankTransfer = "Select payment method";
    if (!formData.billingContact) newErrors.billingContact = "Billing contact is required";
    if (!formData.billingEmail) newErrors.billingEmail = "Billing email is required";
    if (!formData.preferredShippingMethod) newErrors.preferredShippingMethod = "Select a shipping method";
    if (!formData.agreeEligibility) newErrors.agreeEligibility = "You must confirm eligibility";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/become-affiliate-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok) {
        alert("✅ Application submitted successfully!");
        console.log(result);
        setFormData({
          companyName: "",
          businessType: "",
          name: "",
          job: "",
          email: "",
          phone: "",
          countrycode: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          yearsInBusiness: "",
          monthlySales: "",
          businessTypes: [],
          saleOtherCarriers: "",
          planToSell: [],
          estimatedMonthlyPurchase: "",
          bankTransfer: "",
          billingContact: "",
          billingEmail: "",
          preferredShippingMethod: "",
          agreeEligibility: false,
          agreeTerms: false,
        });
      } else {
        alert("❌ Submission failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <HeadBar text="Expand Your Business with Zoiko Mobile - A Premium American Wireless Provider!" />
<style>{`  
 h4 {border-bottom: 1px solid #9a9696;
    padding-bottom: 20px;
}
.partnerForm{
    box-shadow: 3px 4px 19px 14px rgba(0, 0, 0, 0.1) !important;
    border-radius: 15px !important;
    padding: 2rem !important;
    margin: 2rem !important;
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
.stylish-checkboxes .form-check-input:checked {
  background-color: #dc3545;
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
}

/* Custom tick mark */
.stylish-checkboxes .form-check-input:checked::after {
  
  color: #fff;
  font-size: 14px;
  position: absolute;
  left: 3px;
  top: -2px;
}

/* Label hover */
.stylish-checkboxes .form-check:hover .form-check-label {
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

`}</style>
      <Container fluid className="bglite py-5">
        <Container>
          <Form onSubmit={handleSubmit} className="partnerForm">
            <h4 className="mb-4 fw-bold text-center">Business and Contact Information</h4>
            <Row>
              <Col md={6}>
                <FormLabel>Company Name *</FormLabel>
                <Form.Control
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
                {errors.companyName && <p className="txtred">{errors.companyName}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Business Type *</FormLabel>
                <Form.Select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Wireless Retailer</option>
                  <option>Mobile Service Provider</option>
                  <option>E-commerce Business</option>
                  <option>E-commerce Business B2B Reseller</option>
                </Form.Select>
                {errors.businessType && <p className="txtred">{errors.businessType}</p>}
              </Col>
              <Col md={6} className="mt-3">
                <FormLabel>Full Name  *</FormLabel>
                <Form.Control name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <p className="txtred">{errors.name}</p>}
              </Col>
              <Col md={6}  className="mt-3">
                <FormLabel>Job Title *</FormLabel>
                <Form.Control name="job" value={formData.job} onChange={handleChange} />
                {errors.job && <p className="txtred">{errors.job}</p>}
              </Col>
              <Col md={6}   className="mt-3">
                <FormLabel>Email Address *</FormLabel>
                <Form.Control name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
              <Col md={6}   className="mt-3">
                <FormLabel>Phone Number *</FormLabel>
                <InputGroup>
                  <Form.Select
                    name="countrycode"
                    onChange={handleChange}
                    value={formData.countrycode}
                    style={{ maxWidth: "30%" }}
                  >
                    <option>Select Country</option>
                    {Countrycode.map((code) => (
                      <option key={code.code} value={code.dial_code}>
                        {code.dial_code}, {code.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="Enter phone number"
                  />
                </InputGroup>
                {errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={3}>
                <FormLabel>Street *</FormLabel>
                <Form.Control name="street" value={formData.street} onChange={handleChange} />
                {errors.street && <p className="txtred">{errors.street}</p>}
              </Col>
              <Col md={3}>
                <FormLabel>City *</FormLabel>
                <Form.Control name="city" value={formData.city} onChange={handleChange} />
                {errors.city && <p className="txtred">{errors.city}</p>}
              </Col>
              <Col md={3}>
                <FormLabel>State *</FormLabel>
                <Form.Control name="state" value={formData.state} onChange={handleChange} />
                {errors.state && <p className="txtred">{errors.state}</p>}
              </Col>
              <Col md={3}>
                <FormLabel>ZIP *</FormLabel>
                <Form.Control name="zip" value={formData.zip} onChange={handleChange} />
                {errors.zip && <p className="txtred">{errors.zip}</p>}
              </Col>
            </Row>

            
            <h4 className="mt-5 mb-3 fw-bold text-center">Business Details</h4>
            <Row>
              <Col md={6}>
                <FormLabel>Years in Business *</FormLabel>
                <Form.Select
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Less than 1 year</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </Form.Select>
                {errors.yearsInBusiness && <p className="txtred">{errors.yearsInBusiness}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Current Monthly Sales Volume (Mobile Plans & Devices): *</FormLabel>
                <Form.Select
                  name="monthlySales"
                  value={formData.monthlySales}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Under 100 units</option>
                  <option>100-500 units</option>
                  <option>500-1,000 units</option>
                  <option>1,000+ units</option>
                </Form.Select>
                {errors.monthlySales && <p className="txtred">{errors.monthlySales}</p>}
              </Col>
            </Row>

            <h5 className="mt-5 mb-3 fw-bold text-center">Which products/services are you interested in wholesaling? (Check all that apply)</h5>
            <div className="d-flex flex-wrap checkbox-group-center  stylish-checkboxes">
              {[
                "Prepaid & Postpaid SIM Cards (Bulk activations available)",
                "Mobile Plans & Bundles",
                "Unlocked Smartphones",
                "5G Hotspots & Wireless Devices",
                "Mobile Accessories (Cases, chargers, headphones, etc.)",
              ].map((item) => (
                <Form.Check
                  key={item}
                  inline
                  label={item}
                  name={item}
                  value={item}
                  data-group="businessTypes"
                  checked={formData.businessTypes.includes(item)}
                  onChange={handleChange}
                />
              ))}
              <Form.Check
                inline
                label="Other (please specify)"
                name="businessTypes"
                value="Other"
                data-group="businessTypes"
                checked={formData.businessTypes.includes("Other")}
                onChange={handleChange}
              />
            </div>
            <Row>
              <Col md={12}>
                <FormLabel>Do you currently sell other carrier services? *</FormLabel>
                <Form.Select
                  name="saleOtherCarriers"
                  value={formData.saleOtherCarriers}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </Form.Select>
                {errors.saleOtherCarriers && <p className="txtred">{errors.saleOtherCarriers}</p>}
              </Col>

            </Row>

            <h5 className="mt-5 mb-3 fw-bold text-center">
              How do you plan to sell Zoiko Mobile products? (Check all that apply)
            </h5>
            <div className="d-flex flex-wrap checkbox-group-center  stylish-checkboxes">
              {[
                "In-store Retail Sales",
                "Online E-commerce",
                "B2B Sales (Business Clients & Corporate Accounts)",
                "Subscription-based Model",
              ].map((item) => (
                <Form.Check
                  key={item}
                  inline
                  label={item}
                  name={item}
                  value={item}
                  data-group="planToSell"
                  checked={formData.planToSell.includes(item)}
                  onChange={handleChange}
                />
              ))}
            </div>
            <Row>
              <Col md={12}>
                <FormLabel>Estimated Monthly Purchase Volume with Zoiko Mobile *</FormLabel>
                <Form.Select
                  name="estimatedMonthlyPurchase"
                  value={formData.estimatedMonthlyPurchase}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={"50 - 200 units"}>50 - 200 units</option>
                  <option value={"200 - 500 units"}>200 - 500 units</option>
                  <option value={"500 -1000 units"}>500 -1000 units</option>
                  <option value={"1000+ units"}>1000+ units</option>
                </Form.Select>
                {errors.estimatedMonthlyPurchase && <p className="txtred">{errors.estimatedMonthlyPurchase}</p>}
              </Col>

            </Row>
            
            <h4 className="mt-5 mb-3 fw-bold text-center">Preferred Payment Method</h4>
            <Row>
                <Col md={12} className="mt-3">
                <Form.Select
                  name="bankTransfer"
                  value={formData.bankTransfer}
                  onChange={handleChange}
                >
                  <option value={"Bank Transfer"}>Bank Transfer</option>
                  <option value={"Credit/Debiit Card"}>Credit/Debiit Card</option>
                  <option value={"Paypal"}>Paypal</option>
                  <option value={"Net-30 Terms (Subject to Approval)"}>Net-30 Terms (Subject to Approval)</option>
                </Form.Select>
              </Col>
              <Col md={6} className="mt-3">
                <FormLabel>Billing Contact Name *</FormLabel>
                <Form.Control
                  name="billingContact"
                  value={formData.billingContact}
                  onChange={handleChange}
                />
                {errors.billingContact && <p className="txtred">{errors.billingContact}</p>}
              </Col>
              <Col md={6}  className="mt-3" >
                <FormLabel>Billing Email *</FormLabel>
                <Form.Control
                  name="billingEmail"
                  value={formData.billingEmail}
                  onChange={handleChange}
                />
                {errors.billingEmail && <p className="txtred">{errors.billingEmail}</p>}
              </Col>
              
              <Col md={12} className="mt-3">
                <FormLabel>Preferred Shipping Method for Devices/SIMs *</FormLabel>
                <Form.Select
                  name="preferredShippingMethod"
                  value={formData.preferredShippingMethod}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={"Standard Ground"}>Standard Ground</option>
                  <option value={"Expedited Shipping"}>Expedited Shipping</option>
                  <option value={"Local Pickup (if available)"}>Local Pickup (if available)</option>
                </Form.Select>
                {errors.preferredShippingMethod && <p className="txtred">{errors.preferredShippingMethod}</p>}
              </Col>
            </Row>

            <Form.Check
              className="mt-4"
              type="checkbox"
              label="I understand that wholesale purchases require a minimum order quantity (MOQ) and are subject to Zoiko Mobile’s approval."
              name="agreeEligibility"
              checked={formData.agreeEligibility}
              onChange={handleChange}
            />
            {errors.agreeEligibility && <p className="txtred">{errors.agreeEligibility}</p>}

            <Form.Check
              type="checkbox"
              label={
                <>
                  I agree to Zoiko Mobile’s{" "}
                  <a href="/terms-and-conditions" className="txtred">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="txtred">
                    Privacy Policy
                  </a>.
                </>
              }
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            {errors.agreeTerms && <p className="txtred">{errors.agreeTerms}</p>}

            <div className="text-center mt-5">
              <Button variant="danger" type="submit">
                Submit Your Application
              </Button>
            </div>
          </Form>
        </Container>
      </Container>

      <Footer />
    </>
  );
};

export default PartnerWithUsForm;

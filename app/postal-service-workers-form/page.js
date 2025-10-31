"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Row,
  InputGroup,
} from "react-bootstrap";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Countrycode from "../products/countrycode.json";

const PostalWorkersForm = () => {
  const [errors, setErrors] = useState({});
  const [plans, setPlans] = useState([]);
  const [planTypes, setPlanTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    dob: "",
    countrycode: "",
    phone: "",
    statusproof: "",
    plan: "",
    cat: "",
    famname: "",
    famemail: "",
    concent: false,
    terms: false,
  });

  // Fetch all plans and derive unique plan types
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/plans");
        const data = await res.json();

        if (data?.data?.length) {
          setPlans(data.data);

          // Extract unique plan types dynamically
          const uniqueTypes = [
            ...new Set(data.data.map((p) => p.plan_type).filter(Boolean)),
          ];
          setPlanTypes(uniqueTypes);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  // Filter plans based on selected plan type
  useEffect(() => {
    if (formData.plan) {
      const filtered = plans.filter((p) => p.plan_type === formData.plan);
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans([]);
    }
  }, [formData.plan, plans]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Ensure only digits for phone input
    if (name === "phone") {
      const cleanedValue = value.replace(/\D/g, ""); // remove non-digits
      if (cleanedValue.length <= 10) {
        setFormData({ ...formData, [name]: cleanedValue });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  // Validation
  const validate = () => {
    const formErrors = {};

    if (!formData.fname.trim()) formErrors.fname = "⚠️ Full name is required.";
    if (!formData.email) {
      formErrors.email = "⚠️ Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "⚠️ Invalid Email Format.";
    }
    if (!formData.dob) formErrors.dob = "⚠️ Date of birth is required.";
    if (!formData.countrycode) formErrors.countrycode = "⚠️ Country code is required.";
    if (!formData.phone) {
      formErrors.phone = "⚠️ Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "⚠️ Phone number must be exactly 10 digits.";
    }
    if (!formData.statusproof) formErrors.statusproof = "⚠️ Upload of ID or Proof is required.";
    if (!formData.plan) formErrors.plan = "⚠️ Please select a plan type.";
    if (!formData.cat) formErrors.cat = "⚠️ Please select a plan.";
    if (formData.famemail && !/\S+@\S+\.\S+/.test(formData.famemail)) {
      formErrors.famemail = "⚠️ Invalid Family/Friend Email.";
    }
    if (!formData.concent) formErrors.concent = "⚠️ Please confirm your selected plan.";
    if (!formData.terms) formErrors.terms = "⚠️ Please agree to terms.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/postal-service-workers-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("✅ Application submitted successfully!");
        console.log("Response:", data);
      } else {
        alert(`⚠️ ${data.message || "Submission failed. Please try again."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Network error. Please check your connection.");
    }
  };

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text={<>U.S. Postal Service Workers Registration</>} />

      <Container fluid className="bglite py-5">
        <Container className="bg-white shadow-lg rounded-4 p-5">
          <h3 className="text-center mb-4 fw-bold text-uppercase">
            U.S. Postal Service Workers Registration
          </h3>

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Basic Details */}
            <Row className="mb-3">
              <Col md={4}>
                <FormLabel>Full Name *</FormLabel>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="First and last name"
                />
                <div className="form-error">{errors.fname || ""}</div>
              </Col>
              <Col md={4}>
                <FormLabel>Email *</FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
                <div className="form-error">{errors.email || ""}</div>
              </Col>
              <Col md={4}>
                <FormLabel>Date of Birth *</FormLabel>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <div className="form-error">{errors.dob || ""}</div>
              </Col>
            </Row>

            {/* Phone */}
            <Row className="mb-3">
              <Col md={6}>
                <FormLabel>Phone Number *</FormLabel>
                <InputGroup>
                  <Form.Select
                    name="countrycode"
                    onChange={handleChange}
                    value={formData.countrycode}
                  >
                    <option value="">Select Country</option>
                    {Countrycode.map((code) => (
                      <option key={code.code} value={code.dial_code}>
                        {code.dial_code}, {code.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    name="phone"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </InputGroup>
                <div className="form-error">{errors.countrycode || errors.phone || ""}</div>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <FormLabel>Upload ID / Proof *</FormLabel>
                  <Form.Control
                    type="file"
                    name="statusproof"
                    onChange={handleChange}
                    accept=".jpg,.png,.pdf"
                  />
                  <div className="form-error">{errors.statusproof || ""}</div>
                </Form.Group>
              </Col>
            </Row>

            {/* Dynamic Plan Type & Plan Dropdowns */}
            <h4 className="text-center pt-4">Choose the Perfect Plan</h4>
            <Row className="mb-3">
              <Col md={6}>
                <FormLabel>Plan Type *</FormLabel>
                <Form.Select
                  name="plan"
                  onChange={handleChange}
                  value={formData.plan}
                >
                  <option value="">-- Select Plan Type --</option>
                  {planTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </Form.Select>
                <div className="form-error">{errors.plan || ""}</div>
              </Col>

              <Col md={6}>
                <FormLabel>Category *</FormLabel>
                <Form.Select
                  name="cat"
                  onChange={handleChange}
                  value={formData.cat}
                  disabled={!filteredPlans.length}
                >
                  <option value="">-- Select Plan --</option>
                  {filteredPlans.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.currency}
                      {p.price}/{p.duration_type})
                    </option>
                  ))}
                </Form.Select>
                <div className="form-error">{errors.cat || ""}</div>
              </Col>
            </Row>

            {/* Family Section */}
            <h4 className="text-center pt-4">Add Family or Friends (Optional)</h4>
            <p className="text-center text-muted">
              Nominate up to 5 family members or friends to enjoy the same 20% discount.
            </p>

            <Row className="mb-3">
              <Col md={6}>
                <FormLabel>Full Name</FormLabel>
                <Form.Control
                  type="text"
                  name="famname"
                  value={formData.famname}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </Col>
              <Col md={6}>
                <FormLabel>Email</FormLabel>
                <Form.Control
                  type="email"
                  name="famemail"
                  value={formData.famemail}
                  onChange={handleChange}
                  placeholder="Email address"
                />
                <div className="form-error">{errors.famemail || ""}</div>
              </Col>
            </Row>

            {/* Checkboxes */}
            <Form.Check
              label="Confirm your selected plan and verify the details of any nominated family and friends."
              name="concent"
              checked={formData.concent}
              onChange={handleChange}
              type="checkbox"
            />
            <div className="form-error">{errors.concent || ""}</div>

            <Form.Check
              label="By submitting this form, you agree to Zoiko Saver Deals' terms and conditions."
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              type="checkbox"
            />
            <div className="form-error">{errors.terms || ""}</div>

            <div className="text-center mt-4">
              <Button variant="danger" type="submit" className="px-5 py-2 rounded-pill fw-bold">
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

export default PostalWorkersForm;

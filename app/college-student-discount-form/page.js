"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, FormLabel, Row, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import Countrycode from "../products/countrycode.json";

const StudentDiscountForm = () => {

  const [errors, setErrors] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    countrycode: "",
    phone: "",
    statusproof: "",
    school: "",
    yos: "",
    keepnumber: "",
    plan: "",
    cat: "",
    concent: false,
    terms: false
  });

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.fname) formErrors.fname = "Your name is required";
    if (!formData.countrycode) formErrors.countrycode = "Your country code is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.school) formErrors.school = "This field is required";
    if (!formData.yos) formErrors.yos = "Date of birth is required";
    if (!formData.statusproof) formErrors.statusproof = "This field is required";
    if (!formData.keepnumber) formErrors.keepnumber = "This field is required";
    if (!formData.plan) formErrors.plan = "This field is required";
    if (!formData.cat) formErrors.cat = "This field is required";
    if (!formData.concent) formErrors.concent = "This field is required";
    if (!formData.terms) formErrors.terms = "This field is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Validation failed", errors);
      return;
    }
console.log(formData);
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      console.log("Sending request with FormData...");

      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/collage-student-discount-form", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json().catch(() => ({ message: "No JSON body received" }));

      console.log("Response:", res.status, result);

      if (res.ok) {
        alert("✅ Application submitted successfully!");
        setFormData({
          fname: "",
          email: "",
          countrycode: "",
          phone: "",
          statusproof: "",
          school: "",
          yos: "",
          keepnumber: "",
          plan: "",
          cat: "",
          concent: false,
          terms: false,
        });
      } else {
        alert("❌ Submission failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Error submitting form. Check console for details.");
    }
  };

  return (
    <>
      <Header />
      <HeadBar text={<>Zoiko Mobile College Student Discount Program Registration Form</>} />
      <style>{`
        h4 {border-bottom: 1px solid #9a9696; padding-bottom: 20px;}
        .specialPlanForm {
          box-shadow: 3px 4px 19px 14px rgba(0, 0, 0, 0.1) !important;
          border-radius: 15px !important;
          padding: 2rem !important;
          margin: 2rem !important;
        }
        .form-control, .form-select {
          height: 50px;
          background: #fafafa;
        }
        .form-control { line-height: 2.3rem; }
        .checkbox-group-center { justify-content: center; }
        .stylish-checkboxes .form-check {
          position: relative;
          padding-right: 2rem;
          padding-left: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 8px;
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
          margin: 0;
        }
        .stylish-checkboxes .form-check-input:hover { border-color: #dc3545; }
        .stylish-checkboxes .form-check-input:checked {
          background-color: #dc3545;
          border-color: #dc3545;
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
        }
        .stylish-checkboxes .form-check-input:checked::after {
          color: #fff;
          font-size: 14px;
          position: absolute;
          left: 3px;
          top: -2px;
        }
        .stylish-checkboxes .form-check:hover .form-check-label { color: #dc3545; }
        .form-check-inline { margin-right: 5rem !important; }
        .form-control, .form-select {
          border: 1.5px solid #ced4da !important;
          border-radius: 8px !important;
          min-height: 50px;
          transition: all 0.25s ease-in-out !important;
          box-shadow: none !important;
        }
        .form-control:focus, .form-select:focus {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
          outline: none !important;
        }
        .form-label { font-weight: 500; color: #222; }
        .form-control::placeholder { color: #999 !important; }
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
        .form-select:focus {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
          outline: none !important;
          background-color: #fff;
        }
        .form-select {
          background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.048l-6 6-6-6z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
        }
        .form-select:focus-visible, .form-select:focus-within {
          background-image: url("data:image/svg+xml;utf8,<svg fill='%23dc3545' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.048l-6 6-6-6z'/></svg>");
          background-color: #fff;
          border-color: #dc3545;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
        }
        .form-select:disabled {
          background-color: #f8f9fa;
          opacity: 0.8;
          cursor: not-allowed;
        }
      `}</style>

      <Container fluid className="bglite py-5">
        <Container>
          <Form onSubmit={handleSubmit} className="specialPlanForm">
            <Row>
              <Col md={6}>
                <FormLabel htmlFor="fname">Full Name <span className="txtred">*</span></FormLabel>
                <Form.Control type="text" name="fname" onChange={handleChange} value={formData.fname} placeholder="First name and last name" />
                {errors.fname && <p className="txtred">{errors.fname}</p>}
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="email">Email <span className="txtred">*</span></FormLabel>
                <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6}>
                <FormLabel htmlFor="phone">Phone no <span className="txtred">*</span></FormLabel>
                <InputGroup>
                  <Form.Select name="countrycode" onChange={handleChange} value={formData.countrycode}>
                    <option>Select Country</option>
                    {Countrycode.map((code) => (
                      <option key={code.code} value={code.dial_code}>{code.dial_code}, {code.name}</option>
                    ))}
                  </Form.Select>
                  <Form.Control name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone no" style={{ width: '40%' }} />
                </InputGroup>
                {/* {errors.phone && <p className="txtred">{errors.phone}</p>} */}
                {errors.countrycode || errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>
              <Col md={6}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>Upload Student ID <span className="txtred">*</span></Form.Label>
                  <Form.Control type="file" name="statusproof" onChange={handleChange} />
                  {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6}>
                <FormLabel htmlFor="school">School Name <span className="txtred">*</span></FormLabel>
                <Form.Control type="text" name="school" onChange={handleChange} value={formData.school} placeholder="Name of school" />
                {errors.school && <p className="txtred">{errors.school}</p>}
              </Col>
              <Col md={6}>
                <FormLabel htmlFor="yos">Year of study <span className="txtred">*</span></FormLabel>
                <Form.Control type="date" name="yos" onChange={handleChange} value={formData.yos} placeholder="Year of study" />
                {errors.yos && <p className="txtred">{errors.yos}</p>}
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={4}>
                <FormLabel htmlFor="keepnumber">Do you want to keep your current number? <span className="txtred">*</span></FormLabel>
                <Form.Select name="keepnumber" onChange={handleChange} value={formData.keepnumber}>
                  <option value="">Select</option>
                  <option value="yes">Yes, I want to keep my number</option>
                  <option value="no">No, I want a new number</option>
                </Form.Select>
                {errors.keepnumber && <p className="txtred">{errors.keepnumber}</p>}
              </Col>
              <Col md={4}>
                <FormLabel htmlFor="plan">Select Plan <span className="txtred">*</span></FormLabel>
                <Form.Select name="plan" onChange={handleChange} value={formData.plan}>
                  <option value="">Select</option>
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                  <option value="travel">Travel</option>
                  <option value="business">Business</option>
                </Form.Select>
                {errors.plan && <p className="txtred">{errors.plan}</p>}
              </Col>
              <Col md={4}>
                <FormLabel htmlFor="cat">Select Category <span className="txtred">*</span></FormLabel>
                <Form.Select name="cat" onChange={handleChange} value={formData.cat}>
                  <option value="">Select</option>
                  <option value="lite">Zoiko Lite</option>
                  <option value="essential">Zoiko Essential</option>
                  <option value="unlimited">Zoiko Unlimited One</option>
                  <option value="plus">Zoiko Unlimited Plus</option>
                  <option value="premium">Zoiko Premium Unlimited</option>
                </Form.Select>
                {errors.cat && <p className="txtred">{errors.cat}</p>}
              </Col>
            </Row>
            <br />
            <Form.Check
              label="I hereby declare that the information provided is accurate and complete to the best of my knowledge. I understand that providing false information may result in the termination of services."
              name="concent"
              onChange={handleChange}
              checked={formData.concent}
              type="checkbox"
            />
            {errors.concent && <p className="txtred">{errors.concent}</p>}
            <Form.Check
              label="By submitting this form, you agree to Zoiko College Student Discount Program's terms and conditions."
              name="terms"
              onChange={handleChange}
              checked={formData.terms}
              type="checkbox"
            />
            {errors.terms && <p className="txtred">{errors.terms}</p>}
            <br />
            <div className="text-center mt-5">
              <Button variant="danger" type="submit" name="submit">
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

export default StudentDiscountForm;

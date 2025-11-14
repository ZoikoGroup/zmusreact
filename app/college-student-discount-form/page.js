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
} from "react-bootstrap";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentDiscountForm = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    statusproof: null,
    school: "",
    yos: "",
    keepnumber: "",
    plan: "",
    cat: "",
    concent: false,
    terms: false,

    // ✅ Static country code (US)
    countrycode: "+1",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.fname) formErrors.fname = "Your name is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.school) formErrors.school = "This field is required";
    if (!formData.yos) formErrors.yos = "Year of study is required";
    if (!formData.statusproof) formErrors.statusproof = "Upload required";
    if (!formData.keepnumber) formErrors.keepnumber = "This field is required";
    if (!formData.plan) formErrors.plan = "This field is required";
    if (!formData.cat) formErrors.cat = "This field is required";
    if (!formData.concent) formErrors.concent = "You must agree before submitting";
    if (!formData.terms) formErrors.terms = "You must accept terms";

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

    if (!validate()) return;
    setLoading(true);

    try {
      const bodyData = new FormData();

      // ✅ Static country code always sent
      bodyData.append("countrycode", formData.countrycode);

      bodyData.append("fname", formData.fname);
      bodyData.append("email", formData.email);
      bodyData.append("phone", formData.phone);
      bodyData.append("statusproof", formData.statusproof);
      bodyData.append("school", formData.school);
      bodyData.append("yos", formData.yos);
      bodyData.append("keepnumber", formData.keepnumber);
      bodyData.append("plan", formData.plan);
      bodyData.append("cat", formData.cat);
      bodyData.append("concent", formData.concent ? 1 : 0);
      bodyData.append("terms", formData.terms ? 1 : 0);

      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/collage-student-discount-form",
        {
          method: "POST",
          headers: {
            "Accept": "application/json", // Important
          },
          body: bodyData,
        }
      );

      // Read raw response first
      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("JSON parse error:", err);
        alert("Server returned invalid response. Check console.");
        return;
      }

      if (response.ok) {
        alert("✅ Application submitted successfully!");

        setFormData({
          fname: "",
          email: "",
          phone: "",
          statusproof: null,
          school: "",
          yos: "",
          keepnumber: "",
          plan: "",
          cat: "",
          concent: false,
          terms: false,
          countrycode: "+1",
        });
      } else {
        alert("❌ Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("⚠️ Network or server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HeadBar text={<>Zoiko Mobile College Student Discount Program Registration Form</>} />
      <style>{`
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
        .add-more-btn {
          font-size: 18px;
          text-decoration: none !important;
          color: #e91e63;
        }
        .add-more-btn:hover {
          color: #d81b60;
        }
        .remove-btn {
          background: #fff !important;
          color: #dc3545;
          border: none;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 6px;
        }
          .remove-btn:hover {
          color: #8d0e1bff !important;
          background: #ffffffff;
          border: none;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 6px;
        }
      `}</style>

      <Container fluid className="bglite py-5">
        <Container>
          <Form onSubmit={handleSubmit} className="specialPlanForm">

            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>Full Name *</FormLabel>
                <Form.Control
                  type="text"
                  name="fname"
                  onChange={handleChange}
                  value={formData.fname}
                  placeholder="Full name"
                />
                {errors.fname && <p className="txtred">{errors.fname}</p>}
              </Col>

              <Col md={6} className="mt-2">
                <FormLabel>Email *</FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email"
                />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>Phone no *</FormLabel>
                <Form.Control
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  placeholder="Phone number"
                />
                {errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>

              <Col md={6} className="mt-2">
                <FormLabel>Upload Student ID *</FormLabel>
                <Form.Control
                  type="file"
                  name="statusproof"
                  onChange={handleChange}
                />
                {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>School Name *</FormLabel>
                <Form.Control
                  type="text"
                  name="school"
                  onChange={handleChange}
                  value={formData.school}
                  placeholder="Name of school"
                />
                {errors.school && <p className="txtred">{errors.school}</p>}
              </Col>

              <Col md={6} className="mt-2">
                <FormLabel>Year of Study *</FormLabel>
                <DatePicker
                  selected={formData.yos ? new Date(formData.yos) : null}
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      yos: date ? date.toISOString().split("T")[0] : "",
                    })
                  }
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  className="form-control"
                />
                {errors.yos && <p className="txtred">{errors.yos}</p>}
              </Col>
            </Row>

            <Row>
              <Col md={4} className="mt-2">
                <FormLabel>Keep current number *</FormLabel>
                <Form.Select name="keepnumber" onChange={handleChange} value={formData.keepnumber}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
                {errors.keepnumber && <p className="txtred">{errors.keepnumber}</p>}
              </Col>

              <Col md={4} className="mt-2">
                <FormLabel>Select Plan *</FormLabel>
                <Form.Select name="plan" onChange={handleChange} value={formData.plan}>
                  <option value="">Select</option>
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                  <option value="travel">Travel</option>
                  <option value="business">Business</option>
                </Form.Select>
                {errors.plan && <p className="txtred">{errors.plan}</p>}
              </Col>

              <Col md={4} className="mt-2">
                <FormLabel>Select Category *</FormLabel>
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

            <Form.Check
              label="I confirm the information provided is accurate."
              name="concent"
              onChange={handleChange}
              checked={formData.concent}
              type="checkbox"
              className="mt-3"
            />
            {errors.concent && <p className="txtred">{errors.concent}</p>}

            <Form.Check
              label="I agree to the terms and conditions."
              name="terms"
              onChange={handleChange}
              checked={formData.terms}
              type="checkbox"
              className="mt-2"
            />
            {errors.terms && <p className="txtred">{errors.terms}</p>}

            <div className="text-center mt-5">
              <Button variant="danger" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Your Application"}
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

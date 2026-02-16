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
import React, { useState, useEffect } from "react";
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
    countrycode: "+1",
  });

  // ===========================================================
  // ⭐ NEW STATES FOR DYNAMIC DATA
  // ===========================================================
  const [plans, setPlans] = useState([]);
  const [planTypes, setPlanTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // ===========================================================
  // ⭐ FETCH PLANS API
  // ===========================================================
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/plans");
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setPlans(data.data);

          // Extract unique plan types
          const uniqueTypes = [...new Set(data.data.map((p) => p.plan_type))];
          setPlanTypes(uniqueTypes);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // ===========================================================
  // ⭐ UPDATED HANDLE CHANGE (ONLY FOR PLAN RESET)
  // ===========================================================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // When plan changes → update category list
    if (name === "plan") {
      const filtered = plans.filter((p) => p.plan_type === value);
      setFilteredPlans(filtered);

      setFormData({
        ...formData,
        plan: value,
        cat: "", // auto-reset category
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  // ===========================================================
  // (NO CHANGES IN VALIDATE, SUBMIT, STYLING, FIELDS, ETC)
  // ===========================================================
  

const validate = () => {
  let formErrors = {};

  // =========================
  // Full Name Validation
  // =========================
  if (!formData.fname.trim()) {
    formErrors.fname = "Full name is required";
  } else if (formData.fname.trim().length < 3) {
    formErrors.fname = "Name must be at least 3 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.fname)) {
    formErrors.fname = "Name can contain only letters";
  }

  // =========================
  // Email Validation
  // =========================
  if (!formData.email.trim()) {
    formErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    formErrors.email = "Enter valid email address";
  }

  // =========================
  // Phone Validation
  // =========================
  if (!formData.phone.trim()) {
    formErrors.phone = "Phone number is required";
  } else if (!/^[0-9]+$/.test(formData.phone)) {
    formErrors.phone = "Phone must contain only numbers";
  } else if (formData.phone.length < 8 || formData.phone.length > 15) {
    formErrors.phone = "Phone must be between 8 and 15 digits";
  }

  // =========================
  // School Validation
  // =========================
  if (!formData.school.trim()) {
    formErrors.school = "School name is required";
  } else if (formData.school.length < 3) {
    formErrors.school = "School name too short";
  }

  // =========================
  // Year of Study Validation
  // =========================
  if (!formData.yos) {
    formErrors.yos = "Year of study is required";
  } else {
    const selectedDate = new Date(formData.yos);
    const today = new Date();

    if (selectedDate > today) {
      formErrors.yos = "Future date not allowed";
    }
  }

  // =========================
  // File Validation
  // =========================
  if (!formData.statusproof) {
    formErrors.statusproof = "Student ID is required";
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(formData.statusproof.type)) {
      formErrors.statusproof =
        "Only JPG, PNG, or PDF allowed";
    }

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (formData.statusproof.size > maxSize) {
      formErrors.statusproof =
        "File size must be less than 2MB";
    }
  }

  // =========================
  // Keep Number Validation
  // =========================
  if (!formData.keepnumber) {
    formErrors.keepnumber = "Please select option";
  }

  // =========================
  // Plan Validation
  // =========================
  if (!formData.plan) {
    formErrors.plan = "Please select plan";
  }

  // =========================
  // Category Validation
  // =========================
  if (!formData.cat) {
    formErrors.cat = "Please select category";
  }

  // =========================
  // Consent Validation
  // =========================
  if (!formData.concent) {
    formErrors.concent =
      "You must confirm the information";
  }

  // =========================
  // Terms Validation
  // =========================
  if (!formData.terms) {
    formErrors.terms =
      "You must accept terms and conditions";
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
          headers: { Accept: "application/json" },
          body: bodyData,
        }
      );

      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("JSON parse error:", err);
        alert("Server returned invalid response.");
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
        .form-label { font-weight: 500; color: #222; margin-bottom: .5rem;  }
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

              <Col md={6} className="d-grid mt-2">
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

                {/* ⭐ Dynamic Plan List */}
                <Form.Select name="plan" onChange={handleChange} value={formData.plan}>
                  <option value="">Select</option>

                  {loadingPlans && <option>Loading...</option>}

                  {!loadingPlans &&
                    planTypes.map((type, index) => (
                      <option value={type} key={index}>
                        {type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                </Form.Select>

                {errors.plan && <p className="txtred">{errors.plan}</p>}
              </Col>

              <Col md={4} className="mt-2">
                <FormLabel>Select Category *</FormLabel>

                {/* ⭐ Dynamic category based on selected plan */}
                <Form.Select
                  name="cat"
                  onChange={handleChange}
                  value={formData.cat}
                  disabled={!formData.plan}
                >
                  <option value="">Select</option>

                  {filteredPlans.map((p) => (
                    <option value={p.slug} key={p.id}>
                      {p.title} ({p.currency}
                        {p.price}/{p.duration_type})
                    </option>
                  ))}
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

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
import { FaTrashAlt } from "react-icons/fa";

const MilitaryVeteransForm = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // <-- LOADING STATE

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    statusproof: null,
    concent: false,
    terms: false,
    family: [
      { famname: "", famemail: "", famphone: "", famrelation: "" },
    ],
  });

  // -------------------------
  // HANDLE FORM INPUT CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value, type, checked, dataset, files } = e.target;
    const index = dataset.index ? parseInt(dataset.index) : null;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      return;
    }

    if (index !== null && name.startsWith("fam")) {
      const updatedFamily = [...formData.family];
      updatedFamily[index][name] = value;
      setFormData({ ...formData, family: updatedFamily });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // -------------------------
  // ADD FAMILY MEMBER
  // -------------------------
  const addFamilyMember = () => {
    if (formData.family.length < 5) {
      setFormData({
        ...formData,
        family: [
          ...formData.family,
          { famname: "", famemail: "", famphone: "", famrelation: "" },
        ],
      });
    } else {
      alert("You can add up to 5 family members only.");
    }
  };

  // -------------------------
  // REMOVE FAMILY MEMBER
  // -------------------------
  const removeFamilyMember = (index) => {
    const updatedFamily = [...formData.family];
    updatedFamily.splice(index, 1);
    setFormData({ ...formData, family: updatedFamily });
  };

  // -------------------------
  // VALIDATION
  // -------------------------
  const validate = () => {
    let formErrors = {};

    if (!formData.fname) formErrors.fname = "Your name is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";

    if (!formData.statusproof)
      formErrors.statusproof = "This field is required";

    if (!formData.concent) formErrors.concent = "This field is required";
    if (!formData.terms) formErrors.terms = "This field is required";

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    formData.family.forEach((member, i) => {
      if (!member.famname)
        formErrors[`famname_${i}`] = "Name required";

      if (!member.famemail)
        formErrors[`famemail_${i}`] = "Email required";
      else if (!/\S+@\S+\.\S+/.test(member.famemail))
        formErrors[`famemail_${i}`] = "Invalid email";

      if (!member.famphone)
        formErrors[`famphone_${i}`] = "Phone required";

      if (!member.famrelation)
        formErrors[`famrelation_${i}`] = "Relation required";
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // -------------------------
  // SUBMIT FORM
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true); // <-- START LOADING

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("fname", formData.fname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("concent", formData.concent ? 1 : 0);
      formDataToSend.append("terms", formData.terms ? 1 : 0);

      if (formData.statusproof) {
        formDataToSend.append("statusproof", formData.statusproof);
      }

      formData.family.forEach((member, i) => {
        formDataToSend.append(`family[${i}][famname]`, member.famname);
        formDataToSend.append(`family[${i}][famemail]`, member.famemail);
        formDataToSend.append(`family[${i}][famphone]`, member.famphone);
        formDataToSend.append(`family[${i}][famrelation]`, member.famrelation);
      });

      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/military-discount-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("✅ Application submitted successfully!");

        setFormData({
          fname: "",
          email: "",
          phone: "",
          statusproof: null,
          concent: false,
          terms: false,
          family: [
            { famname: "", famemail: "", famphone: "", famrelation: "" },
          ],
        });
      } else {
        alert("❌ Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("⚠️ Network or server error. Check console.");
    } finally {
      setLoading(false); // <-- STOP LOADING
    }
  };

  return (
    <>
      <Header />
      <HeadBar text={<>Military &amp; Veterans Lifetime Deals Registration Form</>} />
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
        <Container className="w-100">
          <Form onSubmit={handleSubmit} className="specialPlanForm">

            {/* Your Name + Email */}
            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>
                  Full Name <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="First name and last name"
                />
                {errors.fname && <p className="txtred">{errors.fname}</p>}
              </Col>

              <Col md={6} className="mt-2">
                <FormLabel>
                  Email <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
            </Row>

            {/* Phone + File Upload */}
            <Row>
              <Col md={6} className="mt-2">
                <FormLabel>
                  Phone no <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone no"
                />
                {errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>

              <Col md={6} className="mt-2">
                <FormLabel>
                  Upload a valid ID <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  type="file"
                  name="statusproof"
                  onChange={handleChange}
                />
                {errors.statusproof && (
                  <p className="txtred">{errors.statusproof}</p>
                )}
              </Col>
            </Row>

            {/* FAMILY SECTION */}
            <h4 className="text-center pt-5">
              Nominated Family and Friends (up to 5)
            </h4>

            {formData.family.map((member, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <Row>
                  <Col md={6} className="mt-2">
                    <FormLabel>
                      Full Name <span className="txtred">*</span>
                    </FormLabel>
                    <Form.Control
                      type="text"
                      name="famname"
                      data-index={index}
                      value={member.famname}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                    {errors[`famname_${index}`] && (
                      <p className="txtred">{errors[`famname_${index}`]}</p>
                    )}
                  </Col>

                  <Col md={6} className="mt-2">
                    <FormLabel>
                      Email <span className="txtred">*</span>
                    </FormLabel>
                    <Form.Control
                      type="email"
                      name="famemail"
                      data-index={index}
                      value={member.famemail}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    {errors[`famemail_${index}`] && (
                      <p className="txtred">{errors[`famemail_${index}`]}</p>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mt-2">
                    <FormLabel>
                      Contact no <span className="txtred">*</span>
                    </FormLabel>
                    <Form.Control
                      type="text"
                      name="famphone"
                      data-index={index}
                      value={member.famphone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                    {errors[`famphone_${index}`] && (
                      <p className="txtred">{errors[`famphone_${index}`]}</p>
                    )}
                  </Col>

                  <Col md={6} className="mt-2">
                    <FormLabel>
                      Relationship <span className="txtred">*</span>
                    </FormLabel>
                    <Form.Control
                      type="text"
                      name="famrelation"
                      data-index={index}
                      value={member.famrelation}
                      onChange={handleChange}
                      placeholder="Relation"
                    />
                    {errors[`famrelation_${index}`] && (
                      <p className="txtred">
                        {errors[`famrelation_${index}`]}
                      </p>
                    )}
                  </Col>

                  {formData.family.length > 1 && (
                    <Col md={12} className="text-end mt-2">
                      <Button
                        className="remove-btn ms-2 mt-2"
                        onClick={() => removeFamilyMember(index)}
                      >
                        <FaTrashAlt size={16} />
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            ))}

            {/* ADD MORE */}
            <div className="text-left mt-3">
              <Button variant="link" className="add-more-btn p-0" onClick={addFamilyMember}>
                + Add More
              </Button>
            </div>

            {/* CHECKBOXES */}
            <Form.Check
              label="Confirm your selected BYOD plan and verify the details."
              name="concent"
              checked={formData.concent}
              onChange={handleChange}
              type="checkbox"
            />
            {errors.concent && <p className="txtred">{errors.concent}</p>}

            <Form.Check
              label="Agree to Zoiko Saver Deals' terms and conditions."
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              type="checkbox"
            />
            {errors.terms && <p className="txtred">{errors.terms}</p>}

            {/* SUBMIT BUTTON WITH LOADING SPINNER */}
            <Button
              variant="danger"
              className="mt-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit Your Application"
              )}
            </Button>
          </Form>
        </Container>
      </Container>

      <Footer />
    </>
  );
};

export default MilitaryVeteransForm;

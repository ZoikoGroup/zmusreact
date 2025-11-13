"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Testimonials from "../components/Testimonials";
import {
  Container,
  Image,
  Row,
  Col,
  Form,
  FormLabel,
  InputGroup,
  Button,
} from "react-bootstrap";
import React, { useState } from "react";
const ContactUs = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    msg: "",
    terms: false,
  });

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    // ✅ Allow only digits for phone number
    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "");
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : updatedValue,
    });
  };

  // ✅ Validation function
  const validate = () => {
    const formErrors = {};

    if (!formData.fname.trim()) formErrors.fname = "Name is required";

    if (!formData.phone) {
      formErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Mobile number must be exactly 10 digits";
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!formData.msg.trim()) formErrors.msg = "Message is required";
    if (!formData.terms) formErrors.terms = "You must agree before sending";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // ✅ Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/contact-us",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fname,
            email: formData.email,
            phone: formData.phone,
            message: formData.msg,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Message sent successfully!");
        setFormData({
          fname: "",
          email: "",
          phone: "",
          msg: "",
          terms: false,
        });
        setErrors({});
      } else {
        setMessage(`❌ ${data.message || "Failed to send message."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Inline error helper with fixed height (no layout shift)
  const ErrorText = ({ text }) => (
    <div
      className="form-error"
      style={{
        color: "#d9534f",
        fontSize: "0.9rem",
        lineHeight: "1",
        minHeight: "16px",
        marginTop: "2px",
      }}
    >
      {text || ""}
    </div>
  );

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="Have You got Any Questions? At Zoiko Mobile We Offer Solutions!" />
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
          <Row className="align-items-center">
            <Col md={6} sm={12}>
              <Image src="/img/contactus.png" alt="Contact Zoiko" fluid />
            </Col>

            <Col md={6} sm={12}>
              <h4 className="pb-3 body22">
                If you have any questions, at Zoiko Mobile we pride ourselves in
                providing tailored solutions within the shortest possible time.
              </h4>

              <Form onSubmit={onSubmit} noValidate className="specialForm">
                {/* Full Name */}
                <FormLabel htmlFor="fname">
                  Full Name <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  type="text"
                  name="fname"
                  placeholder="First name and last name"
                  value={formData.fname}
                  onChange={handleChange}
                />
                <ErrorText text={errors.fname} />

                {/* Email */}
                <FormLabel htmlFor="email">
                  Email <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <ErrorText text={errors.email} />

                {/* Phone */}
                <FormLabel htmlFor="phone">
                  Phone No <span className="txtred">*</span>
                </FormLabel>
                
                  <Form.Control
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                   
                  />

                <ErrorText text={errors.phone} />

                {/* Message */}
                <FormLabel htmlFor="msg">
                  Your Message <span className="txtred">*</span>
                </FormLabel>
                <Form.Control
                  as="textarea"
                  name="msg"
                  rows={3}
                  placeholder="How can we support you?"
                  value={formData.msg}
                  onChange={handleChange}
                />
                <ErrorText text={errors.msg} />

                {/* Checkbox */}
                <Form.Check
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  label="Please save my name, email address, and website information on this browser for future use."
                  className="mt-2"
                />
                <ErrorText text={errors.terms} />

                {/* Message from API */}
                {message && (
                  <p
                    className={`pt-2 ${
                      message.startsWith("✅")
                        ? "text-success"
                        : "txtred fw-semibold"
                    }`}
                  >
                    {message}
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  variant="danger"
                  type="submit"
                  disabled={loading}
                  className="mt-3"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>

      <Testimonials />
      <Footer />
    </>
  );
};

export default ContactUs;

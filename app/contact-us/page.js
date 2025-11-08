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
import Countrycode from "../products/countrycode.json";

const ContactUs = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    countrycode: "",
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

    if (!formData.countrycode)
      formErrors.countrycode = "Your country code is required";

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
            phone: `${formData.countrycode}${formData.phone}`,
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
          countrycode: "",
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

              <Form onSubmit={onSubmit} noValidate>
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
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </InputGroup>
                <ErrorText text={errors.countrycode} />
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

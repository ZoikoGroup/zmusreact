"use client";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import MessageBox from "../components/MessageBox";
import { Button, Card, CardBody, Container, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const showMessage = (type, text) => setMessage({ type, text });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = "⚠️ Please enter your full name.";
    }

    if (!formData.email.trim()) {
      formErrors.email = "⚠️ Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "⚠️ The email address you entered is not valid. Please check and try again.";
    }

    if (!formData.password) {
      formErrors.password =
        "⚠️ Password is required and must be at least 8 characters.";
    } else if (formData.password.length < 8) {
      formErrors.password = "⚠️ Password must be at least 8 characters long and include a number and special character.";
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      formErrors.password =
        "⚠️ Password must be at least 8 characters long and include a number and special character.";
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "⚠️ Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "⚠️ Passwords do not match. Please re-enter to confirm.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showMessage("error", "Please complete all required fields before continuing.");
      return;
    }

    try {
      setLoading(true);
      showMessage("info", "⏳ Creating your Zoiko account...");

      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          frontend_url: window.location.origin // ✅ capture current frontend domain
        }),
      });

      const data = await res.json();
      setLoading(false);

      // ✅ Handle success
      if (data.success) {
        showMessage(
          "success",
          "Welcome to Zoiko Mobile! Your account has been created successfully. Please verify your email to activate your service."
        );
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setErrors({});
        return;
      }

      // ⚠️ Handle validation errors from backend
      if (data.errors) {
        let newErrors = {};
        if (data.errors.name) newErrors.name = "⚠️ " + data.errors.name[0];
        if (data.errors.email) newErrors.email = " ";
        if (data.errors.password) newErrors.password = "⚠️ " + data.errors.password[0];
        setErrors(newErrors);

        // More human-friendly top message
        if (
          (data.errors.email && data.errors.email[0].includes("taken"))
        ) {
          showMessage(
            "error",
            "It looks like you already have an account with Zoiko Mobile. Please sign in or reset your password to continue."
          );
        } else {
          showMessage("error", "Please complete all required fields before continuing.");
        }
        return;
      }

      // ❌ Generic fallback
      showMessage(
        "error",
        data.message ||
          "❌ Something went wrong while registering. Please try again later."
      );
    } catch (error) {
      console.error("Registration Error:", error);
      setLoading(false);
      showMessage("error", "❌ Unable to connect. Please try again in a few moments.");
    }
  };

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
      <Container className="p-5">
        <Card>
          <CardBody>
            <Row className="gx-5 align-items-center">
              <Col md={6} className="d-none d-md-block d-lg-block">
                <div className="loginbg">
                  <p className="txtwhite text-center body22">
                    Hello Buddies! Our well-loved character 'Budgie', our
                    first-of-its-kind animal-friendly network, is set to arrive
                    at your place.
                  </p>
                </div>
              </Col>

              <Col md={6}>
                <h2>Create Account</h2>
                <p className="body22">Fill in the form to join Zoiko Mobile.</p>

                {/* Top Message */}
                <MessageBox type={message.type} text={message.text} />

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn btn-danger w-100"
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>

                  <div className="text-center mt-3">
                    <Button variant="danger" href="/api/auth/google">
                      Sign in with Google
                    </Button>
                    <p className="mt-3">
                      Already have an account?{" "}
                      <Link href="/login" className="txtred fw-bold">
                        Login
                      </Link>
                    </p>
                  </div>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Register;

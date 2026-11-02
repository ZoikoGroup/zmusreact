"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import MessageBox from "../components/MessageBox";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { Form } from "react-bootstrap";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

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
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
      <section className="zl-hero">
        <div className="zl-panel">
          <div className="zl-tabs">
            <Link className="zl-tab" href="/login">
              Login
            </Link>
            <span className="zl-tab active">Register</span>
            <button
              type="button"
              className="zl-tab"
              onClick={() => setShowForgot(true)}
            >
              Reset Password
            </button>
          </div>

          <div className="zl-card">
            <h1 className="zl-title">Create account</h1>
            <p className="zl-subtitle">Fill in the form to join Zoiko Mobile.</p>

            {/* Top Message */}
            <MessageBox type={message.type} text={message.text} />

            <Form onSubmit={handleSubmit}>
              <Form.Group className="zl-field" controlId="zl-name">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="zl-input"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="zl-field" controlId="zl-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="zl-input"
                  placeholder="name@company.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="zl-field" controlId="zl-password">
                <Form.Label>Password</Form.Label>
                <div className="zl-password">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="zl-input"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <button
                    type="button"
                    className="zl-eye"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                      {showPassword && <line x1="2" y1="2" x2="22" y2="22" />}
                    </svg>
                  </button>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group className="zl-field" controlId="zl-confirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="zl-input"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <button type="submit" className="zl-submit mt-2" disabled={loading}>
                {loading ? "Registering..." : "Create Account"}
              </button>

              <div className="zl-divider">
                <span>or continue with</span>
              </div>

              <a className="zl-social" href="/api/auth/google">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt=""
                />
                <span>Continue with Google</span>
                <span className="zl-chevron" aria-hidden="true">›</span>
              </a>

              <p className="zl-register">
                Already have an account? <Link href="/login">Log in</Link>
              </p>
            </Form>
          </div>

          <div className="zl-footer">
            <Link href="/privacy-policy">Privacy</Link>
            <span aria-hidden="true">•</span>
            <Link href="/terms-and-conditions">Terms</Link>
            <span aria-hidden="true">•</span>
            <Link href="/support">Help</Link>
            <span className="zl-copy">
              © {new Date().getFullYear()} Zoiko Mobile Inc.
            </span>
          </div>
        </div>
      </section>

      <ForgotPasswordModal
        show={showForgot}
        onHide={() => setShowForgot(false)}
      />
      <Footer />
    </>
  );
};

export default Register;

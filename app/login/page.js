"use client";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    passwd: "",
    remember: false,
  });

  const [verifyMessage, setVerifyMessage] = useState(null);
  const [verifyType, setVerifyType] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const message = params.get("message");
    if (message) {
      setVerifyMessage(decodeURIComponent(message));
      setVerifyType(status);
    }
  }, []);

  // Forgot Password States
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotData, setForgotData] = useState({
    email: "",
    code: "",
    password: "",
    password_confirmation: "",
  });
  const [forgotMessage, setForgotMessage] = useState("");

  // Handle login form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.username)
      formErrors.username = "⚠️ Please complete all required fields before continuing.";
    if (!formData.passwd)
      formErrors.passwd = "⚠️ Please complete all required fields before continuing.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.passwd,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok || !data.success) {
        setErrors({
          api: "⚠️ No account found with these details. Try again or register a new account.",
        });
        return;
      }

      localStorage.setItem("zoiko_token", data.token.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      setErrors({
        api: "⚠️ Something went wrong. Please try again later.",
      });
    }
  };

  // Forgot Password Handlers
  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData({
      ...forgotData,
      [name]: value,
    });
  };

  const handleForgotEmail = async () => {
    if (!forgotData.email)
      return setForgotMessage("⚠️ Please complete all required fields before continuing.");
    setForgotMessage("📩 Sending reset code...");
    try {
      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/password/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: forgotData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotStep(2);
        setForgotMessage("📨 Verification code sent! Check your inbox.");
      } else {
        setForgotMessage(
          data.message || "⚠️ Failed to send reset code. Please check and try again."
        );
      }
    } catch (err) {
      setForgotMessage("⚠️ Error sending email. Please try again.");
    }
  };

  const handleForgotCodeCheck = async () => {
    if (!forgotData.code)
      return setForgotMessage("⚠️ Please complete all required fields before continuing.");
    setForgotMessage("🔎 Verifying code...");
    try {
      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/password/code/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: forgotData.code }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotStep(3);
        setForgotMessage("✅ Code verified successfully. You can now reset your password.");
      } else {
        setForgotMessage(
          data.message ||
            "⚠️ That code is invalid or has expired. Please request a new verification code."
        );
      }
    } catch (err) {
      setForgotMessage("⚠️ Error verifying code. Please try again.");
    }
  };

  const passwordPolicy = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleForgotReset = async () => {
    if (!forgotData.password || !forgotData.password_confirmation)
      return setForgotMessage("⚠️ Please complete all required fields before continuing.");

    if (!passwordPolicy(forgotData.password))
      return setForgotMessage(
        "⚠️ Password must be at least 8 characters long and include a number and special character."
      );

    if (forgotData.password !== forgotData.password_confirmation)
      return setForgotMessage("⚠️ Passwords do not match. Please re-enter to confirm.");

    setForgotMessage("🔐 Resetting password...");
    try {
      const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: forgotData.code,
          password: forgotData.password,
          password_confirmation: forgotData.password_confirmation,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotMessage("🔐 Password updated successfully. You can now sign in with your new credentials.");
        setTimeout(() => {
          setShowForgot(false);
          setForgotStep(1);
        }, 2000);
      } else {
        setForgotMessage(data.message || "⚠️ Failed to reset password. Please try again.");
      }
    } catch (err) {
      setForgotMessage("⚠️ Error resetting password. Please try again.");
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
                <h2>Welcome Back!</h2>
                <p className="body22">
                  Simply fill in the form below to get started.
                </p>

                {/* ✅ Verification message */}
                {verifyMessage && (
                  <div
                    className={`alert ${
                      verifyType === "success"
                        ? "alert-success"
                        : verifyType === "error"
                        ? "alert-danger"
                        : "alert-info"
                    } d-flex align-items-center py-2 px-3 mb-3`}
                    role="alert"
                  >
                    <span
                      style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
                    >
                      {verifyType === "success"
                        ? "✅"
                        : verifyType === "error"
                        ? "⚠️"
                        : "ℹ️"}
                    </span>
                    <span>{verifyMessage}</span>
                  </div>
                )}

                {errors.api && (
                  <div
                    className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3"
                    role="alert"
                  >
                    <span
                      style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
                    >
                      ⚠️
                    </span>
                    <span>{errors.api.replace(/^⚠️\s*/, "")}</span>
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <label>Username or Email</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.username}
                  />
                  {errors.username && (
                    <small className="txtred">{errors.username}</small>
                  )}
                  <br />

                  <label>Password</label>
                  <input
                    type="password"
                    name="passwd"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.passwd}
                  />
                  {errors.passwd && (
                    <small className="txtred">{errors.passwd}</small>
                  )}
                  <br />

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <input
                        type="checkbox"
                        name="remember"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={formData.remember}
                      />{" "}
                      <label className="form-check-label">Remember me</label>
                    </div>
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => setShowForgot(true)}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <div className="mt-3">
                    <input
                      type="submit"
                      value={loading ? "Logging in..." : "Login"}
                      className="btn btn-outline-danger"
                      disabled={loading}
                    />{" "}
                    <Button variant="outline-danger" href="/register">
                      Register
                    </Button>{" "}
                    <Button variant="danger" href="/api/auth/google">
                      Sign in with Google
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>

      {/* Forgot Password Modal */}
      <Modal show={showForgot} onHide={() => setShowForgot(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotStep === 1 && (
            <>
              <Form.Group>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={forgotData.email}
                  onChange={handleForgotChange}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="mt-3"
                onClick={handleForgotEmail}
              >
                Send Reset Code
              </Button>
            </>
          )}

          {forgotStep === 2 && (
            <>
              <Form.Group>
                <label>Enter Verification Code</label>
                <input
                  type="text"
                  name="code"
                  className="form-control"
                  value={forgotData.code}
                  onChange={handleForgotChange}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="mt-3"
                onClick={handleForgotCodeCheck}
              >
                Verify Code
              </Button>
            </>
          )}

          {forgotStep === 3 && (
            <>
              <Form.Group>
                <label>Enter New Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={forgotData.password}
                  onChange={handleForgotChange}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control"
                  value={forgotData.password_confirmation}
                  onChange={handleForgotChange}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="mt-3"
                onClick={handleForgotReset}
              >
                Reset Password
              </Button>
            </>
          )}
          {forgotMessage && <p className="mt-3 text-danger">{forgotMessage}</p>}
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default Login;

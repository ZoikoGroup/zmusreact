"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
  // Redirect if already logged in
  const token = localStorage.getItem("zoiko_token");
  if (token) {
    window.location.href = "/dashboard";
  }
 }, []);


  const [showForgot, setShowForgot] = useState(false);

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
          api: "⚠️ Invalid email or password. Please try again.",
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

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />
      <section className="zl-hero">
        <div className="zl-panel">
          <div className="zl-tabs">
            <span className="zl-tab active">Login</span>
            <a className="zl-tab" href="/register">
              Register
            </a>
            <button
              type="button"
              className="zl-tab"
              onClick={() => setShowForgot(true)}
            >
              Reset Password
            </button>
          </div>

          <div className="zl-card">
                <h1 className="zl-title">Welcome back!</h1>
                <p className="zl-subtitle">
                  Sign in to your Zoiko Mobile account.
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
                  <div className="zl-field">
                    <label htmlFor="zl-email">Email address</label>
                    <input
                      id="zl-email"
                      type="text"
                      name="username"
                      className="form-control zl-input"
                      placeholder="name@company.com"
                      autoComplete="email"
                      onChange={handleChange}
                      value={formData.username}
                    />
                    {errors.username && (
                      <small className="txtred">{errors.username}</small>
                    )}
                  </div>

                  <div className="zl-field">
                    <label htmlFor="zl-password">Password</label>
                    <div className="zl-password">
                      <input
                        id="zl-password"
                        type={showPassword ? "text" : "password"}
                        name="passwd"
                        className="form-control zl-input"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={formData.passwd}
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
                    {errors.passwd && (
                      <small className="txtred">{errors.passwd}</small>
                    )}
                  </div>

                  <div className="zl-row">
                    <div className="form-check m-0">
                      <input
                        id="zl-remember"
                        type="checkbox"
                        name="remember"
                        className="form-check-input zl-check"
                        onChange={handleChange}
                        checked={formData.remember}
                      />
                      <label className="form-check-label" htmlFor="zl-remember">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="zl-link"
                      onClick={() => setShowForgot(true)}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button type="submit" className="zl-submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
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
                    New to Zoiko Mobile? <a href="/register">Register</a>
                  </p>
                </Form>
          </div>

          <div className="zl-footer">
            <a href="/privacy-policy">Privacy</a>
            <span aria-hidden="true">•</span>
            <a href="/terms-and-conditions">Terms</a>
            <span aria-hidden="true">•</span>
            <a href="/support">Help</a>
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

export default Login;

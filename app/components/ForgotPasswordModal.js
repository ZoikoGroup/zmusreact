"use client";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";

const ForgotPasswordModal = ({ show, onHide }) => {
  // Forgot Password States
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotData, setForgotData] = useState({
    email: "",
    code: "",
    password: "",
    password_confirmation: "",
  });
  const [forgotMessage, setForgotMessage] = useState("");

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
          onHide();
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
    <Modal show={show} onHide={onHide} centered>
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
  );
};

export default ForgotPasswordModal;

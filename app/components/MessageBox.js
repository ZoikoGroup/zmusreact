// components/MessageBox.js
"use client";
import React from "react";
import { Alert } from "react-bootstrap";

const colorMap = {
  success: "success",
  error: "danger",
  info: "info",
};

const iconMap = {
  success: "✅",
  error: "⚠️",
  info: "ℹ️",
};

export default function MessageBox({ type, text }) {
  if (!text) return null;

  return (
    <Alert
      variant={colorMap[type] || "info"}
      role="alert"
      className="d-flex align-items-center mb-3"
    >
      <span style={{ fontSize: "1.2rem", marginRight: "0.6rem" }}>
        {iconMap[type]}
      </span>
      <span>{text}</span>
    </Alert>
  );
}

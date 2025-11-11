"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import * as beQuick from "../utils/beQuickApiPay";

const PaymentModal = ({ show, onClose, amount, orderId }) => {
  const [subscriber, setSubscriber] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    firstName: "",
    lastName: "",
    companyName: "",
    region: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (!userData?.email) return;

        const res = await beQuick.getSubscriberByEmail(userData.email);
        const s = res?.data || res;
        if (!s?.subscriber_id) return;

        setSubscriber(s);

        setForm((prev) => ({
          ...prev,
          firstName: s.first_name || "",
          lastName: s.last_name || "",
          companyName: s.email || "",
          region: s.country || "United States (US)",
          state: s.state || "",
          city: s.city || "",
          street: s.address_line1 || "",
          houseNumber: s.email || "",
          zip: s.zip || "",
          phone: s.phone_number || "",
          email: s.email || "",
        }));
      } catch (err) {
        console.error("Error fetching subscriber:", err);
      }
    };

    if (show) fetchSubscriber();
  }, [show]);

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const handlePayment = async () => {
    const newErrors = {};
    const cardNumClean = form.cardNumber.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(cardNumClean)) newErrors.cardNumber = "Card number must be 13-19 digits";
    if (!/^\d{2}\/\d{2,4}$/.test(form.expiry)) newErrors.expiry = "Expiry must be MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) newErrors.cvc = "CVC must be 3 or 4 digits";
    ["firstName", "lastName", "street", "city", "state", "zip", "phone", "email"].forEach(
      (field) => {
        if (!form[field]) newErrors[field] = "This field is required";
      }
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProcessingPayment(true);
    setErrors({});

    try {
      const payload = {
        billingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          companyName: form.companyName,
          region: form.region,
          state: form.state,
          city: form.city,
          street: form.street,
          houseNumber: form.houseNumber,
          zip: form.zip,
          phone: form.phone,
          email: form.email,
        },
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          companyName: form.companyName,
          region: form.region,
          state: form.state,
          city: form.city,
          street: form.street,
          houseNumber: form.houseNumber,
          zip: form.zip,
          phone: form.phone,
          email: form.email,
        },
        cardAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          region: form.region,
          phone: form.phone,
        },
        cardDetails: {
          cardNumber: cardNumClean,
          expiry: form.expiry,
          cvc: form.cvc,
        },
        coupon: null,
        cart: [
          {
            planPrice: amount,
            planBqid: orderId,
            lineType: "newLine",
            simType: "pSIM",
            formData: {},
          },
        ],
        agreedToTerms: true,
        createdAt: new Date().toISOString(),
        subscriber_id: subscriber?.subscriber_id,
      };

      const result = await beQuick.processOrder(payload);
      setOrderResponse(result);
    } catch (err) {
      console.error("Payment error:", err);
      setErrors({ submit: "Payment failed. Check console for details." });
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered className="payment-modal">
      <div className="p-4">
        <h6 className="text-muted mb-2 text-center">Pay</h6>
        <div className="payment-amount-box mx-auto mb-3 text-center">${amount}</div>

        <Form>
          {/* Card Details */}
          <Form.Group className="mb-2">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 1234 1234 1234"
              value={form.cardNumber}
              onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })}
            />
            {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="mb-2 flex-fill">
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              />
              {errors.expiry && <small className="text-danger">{errors.expiry}</small>}
            </Form.Group>
            <Form.Group className="mb-2 flex-fill">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="CVC"
                value={form.cvc}
                onChange={(e) => setForm({ ...form, cvc: e.target.value })}
              />
              {errors.cvc && <small className="text-danger">{errors.cvc}</small>}
            </Form.Group>
          </div>

          {/* Address Fields */}
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
            />
            {errors.street && <small className="text-danger">{errors.street}</small>}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            {errors.city && <small className="text-danger">{errors.city}</small>}
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="mb-2 flex-fill">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
              {errors.state && <small className="text-danger">{errors.state}</small>}
            </Form.Group>

            <Form.Group className="mb-2 flex-fill">
              <Form.Label>ZIP</Form.Label>
              <Form.Control
                type="text"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
              />
              {errors.zip && <small className="text-danger">{errors.zip}</small>}
            </Form.Group>
          </div>

          {errors.submit && <p className="text-danger">{errors.submit}</p>}
        </Form>

        {processingPayment && (
          <div className="text-center py-3">
            <Spinner animation="border" />
            <p className="mt-2">Processing Payment...</p>
          </div>
        )}

        {orderResponse && (
          <div className="alert alert-success mt-3">
            <strong>Success!</strong> Order created with ID:{" "}
            <strong>{orderResponse.data.order_id}</strong>
            {/* {orderResponse.message && <p>{orderResponse.message}</p>} */}
          </div>
        )}

        {/* Buttons */}
        {!processingPayment && (
          <div className="mt-3">
            {!orderResponse && (
              <Button variant="success" className="w-100 mb-2" onClick={handlePayment}>
                Pay ${amount}
              </Button>
            )}
            <Button variant="outline-secondary" className="w-100" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PaymentModal;

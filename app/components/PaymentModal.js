"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const PaymentModal = ({ show, onClose, amount, orderId }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      // simulate payment request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Payment successful for Order #${orderId}, Amount: $${amount}`);
      onClose();
    } catch (err) {
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Inline CSS for modal styling */}
      <style jsx>{`
        .payment-modal .modal-content {
          border-radius: 12px;
          border: none;
          box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.15);
        }

        .payment-amount-box {
          background: #f7f9fa;
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 20px;
          font-weight: 600;
          color: #198754;
          width: fit-content;
        }

        .payment-option {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 10px;
          transition: 0.2s;
          cursor: pointer;
        }

        .payment-option:hover {
          border-color: #198754;
          background: #f8fff9;
        }

        .payment-option input {
          margin-right: 8px;
          cursor: pointer;
        }

        .payment-option img {
          margin-right: 8px;
        }

        .card-details input {
          background: #fafafa;
        }

        button.btn-success {
          font-weight: 600;
          border-radius: 8px;
          padding: 10px;
        }

        button.btn-outline-secondary {
          border-radius: 8px;
          padding: 10px;
        }
      `}</style>

      <Modal show={show} onHide={onClose} centered className="payment-modal">
        <div className="p-4">
          {/* Amount Display */}
          <div className="text-center mb-3">
            <h6 className="text-muted mb-2">Pay</h6>
            <div className="payment-amount-box mx-auto mb-3">${amount}</div>
          </div>

          {/* Payment Methods */}
          <div className="mb-3">
            
              

            <label
              htmlFor="paypal"
              className={`payment-option ${
                paymentMethod === "paypal" ? "border-success bg-light" : ""
              }`}
            >
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                width="25"
              />
              PayPal
            </label>

            <label
              htmlFor="credit-card"
              className={`payment-option ${
                paymentMethod === "card" ? "border-success bg-light" : ""
              }`}
            >
              <input
                type="radio"
                id="credit-card"
                name="paymentMethod"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <i className="bi bi-credit-card me-2"></i> Credit / Debit Card
            </label>
          </div>

          {/* Card Details Section */}
          {paymentMethod === "card" && (
            <div className="card-details mt-3">
              <Form.Group className="mb-2">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Form.Group className="mb-2 flex-fill">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM / YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2 flex-fill">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CVC"
                    value={cardDetails.cvc}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvc: e.target.value })
                    }
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-2">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                />
              </Form.Group>
            </div>
          )}

          {/* Buttons */}
          {loading ? (
            <div className="text-center py-3">
              <Spinner animation="border" />
            </div>
          ) : (
            <Button
              variant="success"
              onClick={handlePayment}
              className="w-100 mt-3"
            >
              Pay ${amount}
            </Button>
          )}
          <Button
            variant="outline-secondary"
            className="w-100 mt-2"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;

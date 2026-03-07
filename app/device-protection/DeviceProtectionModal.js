"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

const DeviceProtectionModal = ({
  show,
  handleClose,
  onClose,
  planTitle,
  planSlug,
  planId,
  planPrice,
  planSalePrice,
  planDuration,
  planBqid,
  planType,
}) => {

    const router = useRouter();
  const closeFn =
    typeof handleClose === "function"
      ? handleClose
      : typeof onClose === "function"
      ? onClose
      : () => {};

  const [addSPProtection, setAddSPProtection] = useState(true);
  const [addTProtection, setAddTProtection] = useState(false);
  const [addSWProtection, setAddSWProtection] = useState(false);

  /* ── reset + auto-add smartphone protection on open ── */
  useEffect(() => {
    if (!show) return;

    setAddSPProtection(true);
    setAddTProtection(false);
    setAddSWProtection(false);

    // Auto-add Smart Phone Device Protection
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyAdded = cart.some((item) => item.planId === 19);
    if (!alreadyAdded) {
      cart.push(makeProtectionPlan(19, "Smart Phone Device Protection", "device-protection", 8.99, 22));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [show]);

  /* ── helpers ── */
  const makeProtectionPlan = (id, title, slug, price, bqid) => ({
    type: "plan",
    planTitle: title,
    planSlug: slug,
    planId: id,
    planPrice: price,
    planDuration: "month",
    planBqid: bqid,
    planType: "addon",
    lineType: "addon",
    simType: "device_protection",
    formData: {},
  });

  const toggleCartItem = (checked, planId, title, slug, price, bqid) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (checked) {
      if (!cart.some((i) => i.planId === planId)) {
        cart.push(makeProtectionPlan(planId, title, slug, price, bqid));
      }
    } else {
      cart = cart.filter((i) => i.planId !== planId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleSPToggle = (e) => {
    const v = e.target.checked;
    setAddSPProtection(v);
    toggleCartItem(v, 19, "Smart Phone Device Protection", "device-protection", 8.99, 22);
  };

  const handleTToggle = (e) => {
    const v = e.target.checked;
    setAddTProtection(v);
    toggleCartItem(v, 26, "Tablet Device Protection", "tablet-device-protection", 6.99, 26);
  };

  const handleSWToggle = (e) => {
    const v = e.target.checked;
    setAddSWProtection(v);
    toggleCartItem(v, 27, "Smart Watch Device Protection", "smart-watch-device-protection", 5.99, 27);
  };

  const handleConfirm = () => {
    closeFn();
    // Optional: navigate to checkout
    router.push("/checkout");
  };

  /* ── Protection plan row ── */
  const ProtectionRow = ({ label, price, checked, onChange }) => (
    <div
      className={`d-flex justify-content-between align-items-center border rounded-3 p-3 my-2 ${
        checked ? "border-danger bg-dark" : "border-light bg-light"
      }`}
    >
      <div className="text-start">
        <h6 className="m-0 text-danger fw-bold">{label}</h6>
        <small className="text-muted">
          Starting at just <b>${price}</b>/month per device
        </small>
      </div>

      <label className={`toggle ${checked ? "active" : ""}`}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div
          className="slider"
          style={{ background: checked ? "#4cdf4e" : "#565656", border: "none" }}
        />
      </label>
    </div>
  );

  return (
    <>
      <style>{`
        /* ── Modal header ── */
        .dp-modal .modal-header {
          background-color: #e91e63;
          color: white;
        }

        /* ── Protection rows ── */
        .dp-modal .my-2 {
          margin-top: 15px !important;
          margin-bottom: 15px !important;
          border-radius: 20px !important;
          padding: 25px 20px !important;
        }
        .dp-modal .bg-dark  { background-color: rgb(255 235 233) !important; }
        .dp-modal .border-light { border: 3px solid #a4a4a4 !important; }
        .dp-modal .border-danger { border: 3px solid #f37e7e !important; }

        /* ── Toggle switch ── */
        .dp-modal .toggle {
          position: relative;
          display: inline-block;
          width: 52px;
          height: 28px;
          cursor: pointer;
        }
        .dp-modal .toggle input { display: none; }
        .dp-modal .slider {
          position: absolute;
          inset: 0;
          border-radius: 34px;
          transition: 0.3s;
        }
        .dp-modal .slider::before {
          content: "";
          position: absolute;
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 4px;
          background-color: #fff;
          border-radius: 50%;
          transition: 0.3s;
        }
        .dp-modal .toggle input:checked + .slider::before {
          transform: translateX(24px);
        }
      `}</style>

      <Modal
        show={show}
        onHide={closeFn}
        size="lg"
        centered
        dialogClassName="dp-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ padding: "20px", fontSize: "30px" }}>
            Device Protection
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-muted" style={{ textAlign: "left" }}>
            Select the device you want to protect and see the monthly price.
          </p>

          <ProtectionRow
            label="SMART PHONE PROTECTION"
            price="8.99"
            checked={addSPProtection}
            onChange={handleSPToggle}
          />
          <ProtectionRow
            label="TABLET PROTECTION"
            price="6.99"
            checked={addTProtection}
            onChange={handleTToggle}
          />
          <ProtectionRow
            label="SMART WATCH PROTECTION"
            price="5.99"
            checked={addSWProtection}
            onChange={handleSWToggle}
          />

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={closeFn}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Confirm &amp; Checkout
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeviceProtectionModal;

"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
// import "./style.css"; // custom styling

const PlanPurchaseModal = ({ show, handleClose, onClose, planTitle, planSlug, planId, planPrice, planDuration, planBqid, planType }) => {
 // const closeFn = typeof handleClose === "function" ? handleClose : () => {};
  const closeFn = typeof handleClose === "function" ? handleClose : (typeof onClose === "function" ? onClose : () => {});
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Plan Selected", "Enter Details", "Choose Your SIM Preference"];

  const [lineType, setLineType] = useState("newLine");
  const [simType, setSimType] = useState("pSIM");

  const [formData, setFormData] = useState({
    mdn: "",
    first_name: "",
    last_name: "",
    carrier_account: "",
    carrier_password: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    zip: "",
    imei: ""
  });

  const [deviceCheckStatus, setDeviceCheckStatus] = useState(null);
  const [checkingDevice, setCheckingDevice] = useState(false);

  useEffect(() => {
    if (show) {
      setCurrentStep(0);
      setLineType("newLine");
      setSimType("pSIM");
      setFormData({
        mdn: "",
        first_name: "",
        last_name: "",
        carrier_account: "",
        carrier_password: "",
        state: "",
        city: "",
        address1: "",
        address2: "",
        zip: "",
        imei: ""
      });
      setDeviceCheckStatus(null);
      setCheckingDevice(false);
    }
  }, [show, planId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleLineToggle = () => setLineType(lineType === "newLine" ? "portNumber" : "newLine");
  const handleSimToggle = () => setSimType(simType === "pSIM" ? "eSIM" : "pSIM");

  const checkDeviceCompatibility = async () => {
    if (!formData.imei) return;
    setCheckingDevice(true);
    setDeviceCheckStatus(null);

    try {
      const res = await fetch("https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "09ff2d85-a451-47e6-86bc-aba98e1e4629",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ device_serial: formData.imei })
      });
      const data = await res.json();
      setDeviceCheckStatus(data.compatibility ? "compatible" : "incompatible");
    } catch (err) {
      setDeviceCheckStatus("error");
    }
    setCheckingDevice(false);
  };

  const nextStep = () => {
  // If eSIM is selected and device step not checked, don't proceed
  if (simType === "eSIM" && currentStep === steps.length) {
    if (deviceCheckStatus !== "compatible") return;
  }

  // Skip porting form for new line
  if (lineType === "newLine" && currentStep === 0) {
    setCurrentStep(2);
    return;
  }

  if (currentStep < steps.length - 1) {
    setCurrentStep((s) => s + 1);
    return;
  }

  // If eSIM and device step not added yet, move to device step
  if (simType === "eSIM" && currentStep === steps.length - 1) {
    setCurrentStep(currentStep + 1);
    return;
  }

  // ✅ Prepare formData based on the conditions
  let filteredData = {};

  if (lineType === "newLine" && simType === "pSIM") {
    // newLine + pSIM → Empty object
    filteredData = {};
  } else if (lineType === "portNumber" && simType === "pSIM") {
    // portNumber + pSIM → All porting fields except imei
    const { imei, ...rest } = formData;
    filteredData = rest;
  } else if (lineType === "newLine" && simType === "eSIM") {
    // newLine + eSIM → only imei
    filteredData = { imei: formData.imei };
  } else if (lineType === "portNumber" && simType === "eSIM") {
    // portNumber + eSIM → all porting fields + imei
    filteredData = { ...formData };
  }

  // ✅ Prepare final cart item
  const finalData = {
    planTitle,
    planSlug,
    planId,
    planPrice,
    planDuration,
    planBqid,
    planType,
    lineType,
    simType,
    formData: filteredData,
  };

  // ✅ Save to session storage
  let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  cart.push(finalData);
  sessionStorage.setItem("cart", JSON.stringify(cart));

  closeFn();
  router.push("/checkout");
};



  const prevStep = () => {
    if (currentStep === 2 && lineType === "newLine") {
      setCurrentStep(0);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <Modal show={show} onHide={closeFn} size="lg" centered dialogClassName="custom-modal">
      <Modal.Body>
        <div className="close-button" onClick={closeFn} aria-label="Close">×</div>
        <div className="few-steps-header">
          <h1>Few Easy Steps and You’re Good To Go</h1>
        </div>

        {/* Steps */}
        <div className="steps-wrapper">
          <div className="steps-bar">
            {[...steps, ...(simType === "eSIM" ? ["Device Check"] : [])].map((label, idx) => (
              <div key={idx} className={`step ${currentStep >= idx ? "active" : ""}`}>
                <div className="circle">{currentStep >= idx && <img src="/img/check_small.svg" alt="check" />}</div>
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="plan-info" style={{ textAlign: "center", marginBottom: 12 }}>
          {planSlug && <small style={{ color: "#666" }}>New number or keep your current one — your call. We’re here to make it effortless either way.</small>}
        </div>

        {/* Step Content */}
        <div className="step-content">
          {currentStep === 0 && (
            <div>
              <h2>Select Line Type</h2>
              <div className="toggle-wrapper">
                <span className={`toggle-label ${lineType === "newLine" ? "active" : ""}`}>New Line</span>
                <label className="toggle">
                  <input type="checkbox" checked={lineType === "portNumber"} onChange={handleLineToggle} />
                  <div className="slider"></div>
                </label>
                <span className={`toggle-label ${lineType === "portNumber" ? "active" : ""}`}>Port Number</span>
              </div>
            </div>
          )}

          {currentStep === 1 && lineType === "portNumber" && (
            <div>
              <h4>Enter Details For Porting Number</h4>
              <div className="form_wrapper">
                {["mdn","first_name","last_name","carrier_account","carrier_password","city","address1","address2","zip"].map((field) => (
                  <div key={field} className="form_field_group-half validate-required">
                    <label>{field.replace("_"," ").toUpperCase()}</label>
                    <input type="text" name={field} value={formData[field]} onChange={handleChange} />
                  </div>
                ))}
                <div className="form_field_group-half validate-required">
                  <label>State</label>
                  <select name="state" value={formData.state} onChange={handleChange}>
                    <option value="">Select state</option>
                    <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="DC">District of Columbia</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
  <option value="KS">Kansas</option>
  <option value="KY">Kentucky</option>
  <option value="LA">Louisiana</option>
  <option value="ME">Maine</option>
  <option value="MD">Maryland</option>
  <option value="MA">Massachusetts</option>
  <option value="MI">Michigan</option>
  <option value="MN">Minnesota</option>
  <option value="MS">Mississippi</option>
  <option value="MO">Missouri</option>
  <option value="MT">Montana</option>
  <option value="NE">Nebraska</option>
  <option value="NV">Nevada</option>
  <option value="NH">New Hampshire</option>
  <option value="NJ">New Jersey</option>
  <option value="NM">New Mexico</option>
  <option value="NY">New York</option>
  <option value="NC">North Carolina</option>
  <option value="ND">North Dakota</option>
  <option value="OH">Ohio</option>
  <option value="OK">Oklahoma</option>
  <option value="OR">Oregon</option>
  <option value="PA">Pennsylvania</option>
  <option value="RI">Rhode Island</option>
  <option value="SC">South Carolina</option>
  <option value="SD">South Dakota</option>
  <option value="TN">Tennessee</option>
  <option value="TX">Texas</option>
  <option value="UT">Utah</option>
  <option value="VT">Vermont</option>
  <option value="VA">Virginia</option>
  <option value="WA">Washington</option>
  <option value="WV">West Virginia</option>
  <option value="WI">Wisconsin</option>
  <option value="WY">Wyoming</option>
  <option value="AA">Armed Forces (AA)</option>
  <option value="AE">Armed Forces (AE)</option>
  <option value="AP">Armed Forces (AP)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2>Choose Your SIM Preference</h2>
              <div className="toggle-wrapper">
                <span className={`toggle-label ${simType === "pSIM" ? "active" : ""}`}>pSIM</span>
                <label className="toggle">
                  <input type="checkbox" checked={simType === "eSIM"} onChange={handleSimToggle} />
                  <div className="slider"></div>
                </label>
                <span className={`toggle-label ${simType === "eSIM" ? "active" : ""}`}>eSIM</span>
              </div>
            </div>
          )}

          {simType === "eSIM" && currentStep === steps.length && (
  <div className="buttons">
    {/* ✅ Only show the compatibility input + button if not yet compatible */}
    {deviceCheckStatus !== "compatible" && (
      <>
        <h2>Check If Phone is Compatible</h2>
        <p>Enter your IMEI or MEID below to see if your device is compatible with eSIMs</p>
        <div
          className="form_field_group-half validate-required"
          style={{ textAlign: "center", marginBottom: 12 }}
        >
          <label>IMEI/MEID number  *</label>
          <input
            type="text"
            name="imei"
            value={formData.imei}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="primary btn-danger"
          onClick={checkDeviceCompatibility}
          disabled={checkingDevice}
        >
          {checkingDevice ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Check My Device"
          )}
        </Button>
      </>
    )}

    {/* ✅ Always show the result message */}
    {deviceCheckStatus === "compatible" && (
      <>
        <img src="/img/success.gif"></img>
        <p style={{ color: "green", marginTop: 8 }}>Congratulations Your Device is Compatible to Use Zoiko Mobile eSIM Service</p>
      </>
    )}
    {deviceCheckStatus === "incompatible" && (
      <p style={{ color: "red", marginTop: 8 }}>Your Device is NOT Compatible for eSIM.</p>
    )}
    {deviceCheckStatus === "error" && (
      <p style={{ color: "orange", marginTop: 8 }}>Error checking device.</p>
    )}
  </div>
)}
        </div>

        <div className="button-group buttons" style={{ marginTop: 16 }}>
          <Button variant="secondary" onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
          <Button
            variant="primary btn-danger"
            onClick={nextStep}
            disabled={simType === "eSIM" && currentStep === steps.length && deviceCheckStatus !== "compatible"}
          >
            Continue <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PlanPurchaseModal;

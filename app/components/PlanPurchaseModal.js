"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const PlanPurchaseModal = ({ show, handleClose, onClose, planTitle, planSlug, planId, planPrice, planSalePrice, planDuration, planBqid, planType }) => {
const closeFn = typeof handleClose === "function" ? handleClose : (typeof onClose === "function" ? onClose : () => {});
const router = useRouter();

const [currentStep, setCurrentStep] = useState(0);
const steps = ["Plan Selected", "Enter Details", "Choose Your SIM Preference",""];

const [lineType, setLineType] = useState("newLine");
const [simType, setSimType] = useState("pSIM");
const [addSPProtection, setAddSPProtection] = useState(true);
const [addTProtection, setAddTProtection] = useState(false);
const [addSWProtection, setAddSWProtection] = useState(false);
 const type = 'plan';

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
const [errors, setErrors] = useState({});
useEffect(() => {
if (show) {
  setCurrentStep(0);
  setLineType("newLine");
  setSimType("pSIM");
  setAddSPProtection(true);
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

    // ✅ Auto-add Device Protection if default is ON
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const alreadyAdded = cart.some((item) => item.planId === 19);
if (!alreadyAdded) {
  const protectionPlan = {
    type:"plan",
    planTitle: "Smart Phone Device Protection",
    planSlug: "device-protection",
    planId: 19,
    planPrice: 8.99,
    planDuration: "month",
    planBqid: 22,
    planType: "addon",
    lineType: "addon",
    simType: "device_protection",
    formData: {},
  };
  cart.push(protectionPlan);
  localStorage.setItem("cart", JSON.stringify(cart));
}



}
}, [show, planId]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((p) => ({ ...p, [name]: value }));

  // Remove validation error for this field as soon as user types
  if (errors[name]) {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }
};

const handleLineToggle = () => setLineType(lineType === "newLine" ? "portNumber" : "newLine");
const handleSimToggle = () => setSimType(simType === "pSIM" ? "eSIM" : "pSIM");

const handleSmartPhoneProtectionToggle = (e) => {
const newValue = e.target.checked;
setAddSPProtection(newValue);

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (newValue) {
    // ✅ Add protection plan if not already added
    const alreadyAdded = cart.some((item) => item.planId === 19);
    if (!alreadyAdded) {
      const protectionPlan = {
        type:"plan",
        planTitle: "Smart Phone Device Protection",
        planSlug: "device-protection",
        planId: 19,
        planPrice: 8.99,
        planDuration: "month",
        planBqid: 22,
        planType: "addon",
        lineType: "addon",
        simType: "device_protection",
        formData: {},
      };
      cart.push(protectionPlan);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    } else {
      // ❌ Remove protection plan if exists
      cart = cart.filter((item) => item.planId !== 19);
      localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const handleSmartWatchProtectionToggle = (e) => {
  const newValue = e.target.checked;
  setAddSWProtection(newValue);

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (newValue) {
    // ✅ Add protection plan if not already added
    const alreadyAdded = cart.some((item) => item.planId === 27);
    if (!alreadyAdded) {
      const protectionPlan = {
        type:"plan",
        planTitle: "Smart Watch Device Protection",
        planSlug: "smart-watch-device-protection",
        planId: 27,
        planPrice: 5.99,
        planDuration: "month",
        planBqid: 27,
        planType: "addon",
        lineType: "addon",
        simType: "device_protection",
        formData: {},
      };
      cart.push(protectionPlan);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    // ❌ Remove protection plan if exists
    cart = cart.filter((item) => item.planId !== 27);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const handleTabletProtectionToggle = (e) => {
  const newValue = e.target.checked;
  setAddTProtection(newValue);

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (newValue) {
    // ✅ Add protection plan if not already added
    const alreadyAdded = cart.some((item) => item.planId === 26);
    if (!alreadyAdded) {
      const protectionPlan = {
        type:"plan",
        planTitle: "Tablet Device Protection",
        planSlug: "tablet-device-protection",
        planId: 26,
        planPrice: 6.99,
        planDuration: "month",
        planBqid: 26,
        planType: "addon",
        lineType: "addon",
        simType: "device_protection",
        formData: {},
      };
      cart.push(protectionPlan);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    // ❌ Remove protection plan if exists
    cart = cart.filter((item) => item.planId !== 26);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const formatLabel = (field) => {
  return field
    .replace(/_/g, " ") // replace underscores with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
    .join(" ");
};

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

const validatePortingFields = () => {
  const requiredFields = [
    "mdn",
    "first_name",
    "last_name",
    "carrier_account",
    "carrier_password",
    "state",
    "city",
    "address1",
    "zip",
  ];

  const newErrors = {};

  requiredFields.forEach((field) => {
    const val = formData[field];
    if (!val || !String(val).trim()) {
      newErrors[field] = "This field is required";
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const nextStep = () => {
  // If eSIM user and currently at device check step
  if (simType === "eSIM" && currentStep === steps.length) {
    if (deviceCheckStatus !== "compatible") return;
  }

  // For newLine -> skip porting
  if (lineType === "newLine" && currentStep === 0) {
    setCurrentStep(2);
    return;
  }

  if (lineType === "portNumber" && currentStep === 0) {
    setCurrentStep(1);
    return;
  }
  // Validate when in porting step
if (lineType === "portNumber" && currentStep === 1) {
  if (!validatePortingFields()) return; // stop if invalid
}

  // ✅ Handle SIM and Device Check flow
  const totalSteps = simType === "eSIM" ? steps.length + 1 : steps.length;

  if (currentStep < totalSteps - 1) {
    setCurrentStep((s) => s + 1);
    return;
  }

  // Final submit logic (after protection)
  if (currentStep === totalSteps - 1) {
    let filteredData = {};

    if (lineType === "newLine" && simType === "pSIM") filteredData = {};
    else if (lineType === "portNumber" && simType === "pSIM") {
      const { imei, ...rest } = formData;
      filteredData = rest;
    } else if (lineType === "newLine" && simType === "eSIM") filteredData = { imei: formData.imei };
    else if (lineType === "portNumber" && simType === "eSIM") filteredData = { ...formData };

    const finalData = {
      type,
      planTitle,
      planSlug,
      planId,
      planPrice,
      planSalePrice,
      planDuration,
      planBqid,
      planType,
      lineType,
      simType,
      formData: filteredData,
    };

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(finalData);
    localStorage.setItem("cart", JSON.stringify(cart));

    closeFn();
    router.push("/checkout");
  }
};



  const prevStep = () => {
    if (currentStep === 2 && lineType === "newLine") {
      setCurrentStep(0);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
     console.log(currentStep)
  };

  return (
    <Modal show={show} onHide={closeFn} size="lg" centered dialogClassName="custom-modal">
      {((simType === "pSIM" && currentStep === 3) || (simType === "eSIM" && currentStep === 4) ) && (
    <Modal.Header closeButton style={{ backgroundColor: "#e91e63", color: "white" }}>
    <Modal.Title style={{    padding: "20px",fontSize: "30px"}}>Device Protection</Modal.Title>
    </Modal.Header>
      )}
      <Modal.Body>
        {currentStep < 3 && (
          <>
        <div className="close-button" onClick={closeFn} aria-label="Close">×</div>
        <div className="few-steps-header">
          <h1>Few Easy Steps and You’re Good To Go</h1>
        </div>

 
        <div className="steps-wrapper">
          <div className="steps-bar">
            {[...steps, ...(simType === "eSIM" ? ["Device Check"] : [])].map((label, idx) => (
              ( idx<3) &&
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
 </>
        )}
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
                  <div key={field} className="form_field_group-half validate-required" style={{  }}>
  <label style={{ display: "block" }}>
    {formatLabel(field)}
  </label>
  <input
   placeholder={field === 'mdn' ? "Enter 10 digit Phone Number (MDN)" : `Enter ${formatLabel(field)}`}
    type="text"
    name={field}
    value={formData[field] || ""}
    onChange={handleChange}
    className={`form-control ${errors[field] ? "is-invalid" : ""}`}
  />

  {/* ✅ Reserve space even if there's no error */}
  <div
    className="invalid-feedback"
    style={{
      display: "block",
      minHeight: "20px", // reserve consistent height
      marginTop: "4px",
      visibility: errors[field] ? "visible" : "hidden", // hide text, keep space
    }}
  >
    {errors[field] || "placeholder"} {/* placeholder text just to hold height */}
  </div>
</div>
                ))}
                <div className="form_field_group-half validate-required" style={{ marginBottom: 12 }}>
  <label style={{ display: "block", marginBottom: 6 }}>STATE</label>
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
                    <option value="AP">Armed Forces (AP)</option>`
                  </select>
                   {errors.state && (
        <div
    className="invalid-feedback"
    style={{
      display: "block",
      minHeight: "20px",
      marginTop: "4px",
      visibility: errors.state ? "visible" : "hidden",
    }}
  >
    {errors.state || "placeholder"}
  </div>
      )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2>Choose Your SIM Preference</h2>
              <div className="toggle-wrapper" style={{ marginBottom: '30px' }}>
                <span className={`toggle-label ${simType === "pSIM" ? "active" : ""}`}>pSIM</span>
                <label className="toggle">
                  <input type="checkbox" checked={simType === "eSIM"} onChange={handleSimToggle} />
                  <div className="slider"></div>
                </label>
                <span className={`toggle-label ${simType === "eSIM" ? "active" : ""}`}>eSIM</span>
              </div>

            </div>
          )}

          {simType === "eSIM" && currentStep === 3 && (
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

{( (simType === "pSIM" && currentStep === 3) || (simType === "eSIM" && currentStep === 4) ) && (
  console.log(currentStep),
  <>
        <p className="text-muted" style={{textAlign: "left"}}>
          Select the device you want to protect and see the monthly price
        </p>

        

        <style>{`
        .my-2 {
       margin-top: 15px !important;
    margin-bottom: 15px !important;
    border-radius: 20px !important;
        padding: 25px 20px !important;
}
  .slider::before{
    background-color: #ffffff;
    bottom: 4px;
  }
    .slider{    border: none;}
    .bg-dark{background-color: rgb(255 235 233) !important;}
    .border-light{border:3px solid #a4a4a4ff !important;}
    .border-danger{border:3px solid #f37e7eff !important;}
`}
</style>
        {/* Protection Toggle */}
<div className={`d-flex justify-content-between align-items-center border rounded-3 p-3 my-2 ${!addSPProtection ? "border-light bg-light" : "border-danger bg-dark"  }`}>

  <div className="text-start">
    <h6 className="m-0 text-danger fw-bold">SMART PHONE PROTECTION</h6>
    <small className="text-muted">Starting at just <b>$8.99</b>/month per device</small>
  </div>


  <div className="toggle-wrapper" style={ {marginTop:0 }}>
    
    <label className={`toggle  ${addSPProtection ? "active" : "" }`}>
      <input
        type="checkbox"
        checked={addSPProtection}
        onChange={handleSmartPhoneProtectionToggle}
      />
      <div className="slider" style={ addSPProtection ? { background: "#4cdf4e" } : {    background:"#565656"} }></div>
    </label>

  </div>
  

</div>
       {/* Protection Toggle */}
<div className={`d-flex justify-content-between align-items-center border rounded-3 p-3 my-2 ${!addTProtection ? "border-light bg-light" : "border-danger bg-dark"  }`}>

  <div className="text-start">
    <h6 className="m-0 text-danger fw-bold">TABLET PROTECTION</h6>
    <small className="text-muted">Starting at just <b>$8.99</b>/month per device</small>
  </div>


  <div className="toggle-wrapper" style={ {marginTop:0 }}>
    
    <label className={`toggle  ${addTProtection ? "active" : "" }`}>
      <input
        type="checkbox"
        checked={addTProtection}
        onChange={handleTabletProtectionToggle}
      />
      <div className="slider" style={ addTProtection ? { background: "#4cdf4e" } : {    background:"#565656"} }></div>
    </label>

  </div>
  

</div>
       {/* Protection Toggle */}
<div className={`d-flex justify-content-between align-items-center border rounded-3 p-3 my-2 ${!addSWProtection ? "border-light bg-light" : "border-danger bg-dark"  }`}>

  <div className="text-start">
    <h6 className="m-0 text-danger fw-bold">SMART WATCH PROTECTION</h6>
    <small className="text-muted">Starting at just <b>$5.99</b>/month per device</small>
  </div>


  <div className="toggle-wrapper" style={ {marginTop:0 }}>
    
    <label className={`toggle  ${addSWProtection ? "active" : "" }`}>
      <input
        type="checkbox"
        checked={addSWProtection}
        onChange={handleSmartWatchProtectionToggle}
      />
      <div className="slider" style={ addSWProtection ? { background: "#4cdf4e" } : {    background:"#565656"} }></div>
    </label>

  </div>
  

</div>
  </>
        )}
        </div>

        <div className="button-group buttons" style={{ marginTop: 16 }}>
          <Button variant="secondary" onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
          <Button
            variant="primary btn-danger"
            onClick={nextStep}
            disabled={simType === "eSIM" && currentStep === steps.length-1 && deviceCheckStatus !== "compatible"}
          >
            Continue <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      </Modal.Body>
     
    
    </Modal>
  );
};

export default PlanPurchaseModal;

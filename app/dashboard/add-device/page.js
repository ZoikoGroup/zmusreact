"use client";

import { useState } from "react";
import TopHeader from "../../components/TopHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import "../Dashboard.css";

export default function AddDevicePage() {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [imei, setImei] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [apiResult, setApiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const devices = [
    { id: "smartphone", title: "Smartphone", desc: "For calls, texts, data, and apps on the road", icon: "📱" },
    { id: "tablet", title: "Tablet", desc: "Perfect for navigation and entertainment", icon: "💻" },
    { id: "hotspot", title: "Mobile Hotspot", desc: "Share internet with multiple devices", icon: "📶" },
    { id: "iot", title: "IoT Device", desc: "Fleet tracking and monitoring devices", icon: "🔗" },
  ];

  const handleNext = () => {
    if (step === 1 && !selectedDevice) {
      alert("Please select a device type.");
      return;
    }
    if (step === 2 && (!apiResult || !apiResult.compatibility)) {
      alert("Please check device compatibility before continuing.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const validateIMEI = () => {
    const valid = /^\d{15,16}$/.test(imei) || /^\d{32}$/.test(imei);
    if (!valid) {
      setValidationMsg("Please enter a valid 15/16-digit IMEI or 32-digit EID number.");
      return false;
    }
    setValidationMsg("✅ IMEI/EID validated successfully!");
    return true;
  };

  const validateAndCheckDevice = async () => {
    if (!validateIMEI()) return;

    setLoading(true);
    setApiResult(null);
    setValidationMsg("Checking device compatibility...");

    try {
      const res = await fetch(
        "https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": "09ff2d85-a451-47e6-86bc-aba98e1e4629",
          },
          body: JSON.stringify({ device_serial: imei }),
        }
      );
      const data = await res.json();
      setApiResult(data);

      if (data.success && data.compatibility) {
        setValidationMsg("✅ Device is compatible!");
      } else {
        setValidationMsg("❌ Device is not compatible.");
      }
    } catch (error) {
      setValidationMsg("❌ Error checking device. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const ProgressBar = () => (
    <div className="progress mb-3" style={{ height: "6px" }}>
      <div
        className="progress-bar bg-success"
        style={{ width: `${(step / 3) * 100}%`, transition: "width 0.3s ease" }}
      ></div>
    </div>
  );

  const renderStep1 = () => (
    <div className="card p-4 shadow-sm">
      <p className="text-muted small mb-1">Step 1 of 3</p>
      <h4 className="fw-bold mb-3">Device Selection</h4>
      <p className="text-muted small mb-4">
        Choose the type of device you want to add to your plan.
      </p>

      <div className="row g-3">
        {devices.map((device) => (
          <div className="col-md-6 col-lg-3" key={device.id}>
            <div
              onClick={() => setSelectedDevice(device.id)}
              className={`border rounded-3 p-3 text-center h-100 ${
                selectedDevice === device.id ? "border-success bg-light" : "border-secondary-subtle bg-white"
              }`}
              style={{ cursor: "pointer", transition: "all 0.3s" }}
            >
              <div className="fs-1 mb-2">{device.icon}</div>
              <h6 className="fw-semibold mb-1">{device.title}</h6>
              <p className="small text-muted mb-0">{device.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-outline-secondary px-4" onClick={() => history.back()}>
          Cancel
        </button>
        <button className="btn btn-success px-4" onClick={handleNext}>
          Continue to Device Info →
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const isValidIMEI = /^\d{15,16}$/.test(imei) || /^\d{32}$/.test(imei);

    return (
      <div className="card p-4 shadow-sm">
        <p className="text-muted small mb-1">Step 2 of 3</p>
        <h4 className="fw-bold mb-3">Device Info</h4>

        <p className="text-muted small mb-4">
          Provide your device’s unique identifier to check compatibility with our network.
        </p>

        <div className="mb-3">
          <label className="form-label fw-semibold">Device IMEI or EID Number</label>
          <div className="d-flex gap-2">
            <input
  type="text"
  value={imei}
  onChange={(e) => setImei(e.target.value)}
  className="form-control"
  placeholder="Enter 15/16-digit IMEI or 32-digit EID"
  style={{ width: "70%" }}
/>

            <button
              className="btn btn-success fw-semibold"
              onClick={validateAndCheckDevice}
              disabled={!isValidIMEI || loading}
            >
              {loading ? "Checking..." : "Check Compatibility"}
            </button>
          </div>
          {validationMsg && (
            <p className={`small mt-2 ${validationMsg.startsWith("✅") ? "text-success" : "text-danger"}`}>
              {validationMsg}
            </p>
          )}
        </div>

        {/* Show device info only if compatible */}
        {apiResult && apiResult.compatibility && (
          <div className="device-info p-3 rounded mb-3" style={{ color: "green", borderColor: "green", borderWidth: "2px", borderStyle: "solid" }}>
            <p><strong>Manufacturer:</strong> {apiResult.manufacturer}</p>
            <p><strong>Model:</strong> {apiResult.model}</p>
            <p><strong>Marketing Name:</strong> {apiResult.marketing_name}</p>
            <p><strong>Operating System:</strong> {apiResult.operating_system}</p>
            <p><strong>5G Compatible:</strong> {apiResult.device_5g ? "Yes" : "No"}</p>
            <p><strong>VoLTE:</strong> {apiResult.volte_compatible ? "Yes" : "No"}</p>
            <p><strong>WiFi Calling:</strong> {apiResult.wifi_calling_capable ? "Yes" : "No"}</p>
          </div>
        )}

        <p className="small text-muted">
          Find your IMEI by dialing <strong>*#06#</strong> or checking Settings → About.
        </p>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-secondary" onClick={handleBack}>
            ← Back
          </button>
          <button
            className="btn btn-success px-4"
            onClick={handleNext}
            disabled={!apiResult || !apiResult.compatibility}
          >
            Continue to Review →
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="card p-4 shadow-sm">
      <p className="text-muted small mb-1">Step 3 of 3</p>
      <h4 className="fw-bold mb-3">Review & Confirm</h4>

      <div className="border p-3 rounded bg-light mb-3">
        <p><strong>Device Type:</strong> {selectedDevice}</p>
        <p><strong>IMEI/EID:</strong> {imei}</p>
      </div>

      <p className="small text-muted mb-3">
        Please confirm your device details before activation.
      </p>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={handleBack}>
          ← Back
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            alert("✅ Device successfully added!");
            setStep(1);
            setSelectedDevice("");
            setImei("");
            setValidationMsg("");
            setApiResult(null);
          }}
        >
          Confirm & Activate
        </button>
      </div>
    </div>
  );

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="My Devices & SIMs" />

      <div className="dashboard-container container py-4">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            <ProgressBar />
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          {/* Help Section */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card p-4 shadow-sm">
              <h5 className="fw-semibold mb-3">Finding Your IMEI/EID</h5>
              <p className="small mb-2 fw-semibold">For Smartphones & Tablets:</p>
              <ul className="small text-muted ps-3 mb-3">
                <li>Dial *#06# to display IMEI</li>
                <li>Go to Settings → About → IMEI</li>
                <li>Check device box or SIM tray</li>
              </ul>

              <p className="small mb-2 fw-semibold">For eSIM devices:</p>
              <ul className="small text-muted ps-3 mb-3">
                <li>Look for EID in Settings → Cellular</li>
                <li>EID is 32 digits long</li>
              </ul>

              <div className="bg-warning-subtle border border-warning rounded-3 p-3 mb-3">
                <h6 className="fw-semibold text-dark mb-2">Need Assistance?</h6>
                <p className="small text-muted mb-2">
                  Our support team is available 24/7. Chat with us for help or questions about device compatibility or activation.
                </p>
                <button className="btn btn-warning w-100 fw-semibold">
                  Chat with Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

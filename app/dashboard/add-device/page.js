"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import "../Dashboard.css";
import { getSubscriberByEmail, getLinesBySubscriberID, changeDevice } from "../../utils/beQuickApi";

export default function AddDevicePage() {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [imei, setImei] = useState("");
  const [checking, setChecking] = useState(false);
  const [compatResult, setCompatResult] = useState(null);
  const [imeiError, setImeiError] = useState(null);

  // selectedLine holds the full line object: { id, iccid, status, mdn, ... }
  const [selectedLine, setSelectedLine] = useState(null);
  const [iccidError, setIccidError] = useState(null);
  const [activating, setActivating] = useState(false);
  const [activationResult, setActivationResult] = useState(null);
  const [linesInfo, setLinesInfo] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userMail = user.email || "";

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const id = await getSubscriberByEmail(userMail);
        const response = await getLinesBySubscriberID(id);

        // API returns { lines: [...], meta: {...} } — extract the array safely
        const rawLines = Array.isArray(response)
          ? response
          : Array.isArray(response?.lines)
          ? response.lines
          : [];

        // Only show active lines that have a valid ICCID
        const activeLines = rawLines.filter(
          (line) => line.status === "active" && line.iccid
        );

        setLinesInfo(activeLines);
      } catch (err) {
        console.error("Failed to load lines:", err);
        setLinesInfo([]);
      }
    };

    fetchLines();
  }, []);

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
    if (step === 2 && (!compatResult || !compatResult.compatible)) {
      alert("Please check device compatibility before continuing.");
      return;
    }
    if (step === 2 && !selectedLine) {
      alert("Please select an ICCID before continuing.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const openChat = () => {
    window.open(
      "https://zoikon-722985113446.europe-west1.run.app/ui/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const validateAndCheckDevice = async () => {
    const cleanedImei = imei.replace(/\s/g, "").trim();

    if (!cleanedImei) {
      setImeiError("Please enter your IMEI/MEID number.");
      return;
    }
    if (!/^\d{14,16}$/.test(cleanedImei)) {
      setImeiError("Please enter a valid 14-16 digit IMEI number.");
      return;
    }

    setImeiError(null);
    setChecking(true);
    setCompatResult(null);
    setSelectedLine(null); // reset line selection whenever we re-check IMEI

    try {
      // STEP 1: CHECK LOCAL STORAGE
      const storageKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("device_serial_")
      );
      let localMatch = null;
      for (const key of storageKeys) {
        const item = localStorage.getItem(key);
        if (!item) continue;
        const parsed = JSON.parse(item);
        if (parsed.device_serial === cleanedImei) {
          localMatch = parsed;
          break;
        }
      }
      const nextIndex = storageKeys.length + 1;

      if (localMatch) {
        setCompatResult({
          compatible: localMatch.esim_compatible,
          message: `${cleanedImei} is ${localMatch.esim_compatible ? "" : "not "}compatible with eSIM.`,
        });
        return;
      }

      // STEP 2: GOLITE CHECK
      const goliteRes = await fetch(
        "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY,
          },
          body: JSON.stringify({ action: "esim_check", imei: cleanedImei }),
        }
      );
      const goliteData = await goliteRes.json();
      if (goliteData.compatible === true) {
        setCompatResult({ compatible: true, message: `${cleanedImei} is compatible with eSIM.` });
        localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: true }));
        return;
      }

      // STEP 3: BEQUICK API
      const bequickRes = await fetch(
        "https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_BEQUICK_TOKEN,
          },
          body: JSON.stringify({ device_serial: cleanedImei }),
        }
      );
      const bequickData = await bequickRes.json();
      if (bequickData?.esim_compatible === true) {
        setCompatResult({ compatible: true, message: `${cleanedImei} is compatible with eSIM.` });
        localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: true }));
        await fetch("https://goliteapi.golitemobile.com/api/device_compatibility_checker/", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY },
          body: JSON.stringify({ action: "esim_update", imei: cleanedImei }),
        });
        return;
      }

      // STEP 4: FINAL CHECK
      const finalRes = await fetch(
        "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY,
          },
          body: JSON.stringify({ action: "esim_v_check", imei: cleanedImei }),
        }
      );
      const finalData = await finalRes.json();
      const finalResult = finalData.esimCompatible === true;
      localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: finalResult }));
      setCompatResult({
        compatible: finalResult,
        message: `${cleanedImei} is ${finalResult ? "" : "not "}compatible with eSIM.`,
      });
    } catch (err) {
      setCompatResult({
        compatible: false,
        message: err instanceof Error ? err.message : "Unable to verify device. Please try again.",
      });
    } finally {
      setChecking(false);
    }
  };

  const handleConfirmAndActivate = async () => {
    if (!selectedLine) {
      setIccidError("Please select an ICCID.");
      return;
    }

    setIccidError(null);
    setActivating(true);

    try {
      const lineID = selectedLine.id;
      const deviceDetails = { device_serial: imei, iccid: selectedLine.iccid };

      console.log("[changeDevice] lineID:", lineID, "deviceDetails:", deviceDetails);

      const result = await changeDevice(lineID, deviceDetails);

      console.log("[changeDevice] raw result:", result);
      console.log("[changeDevice] result type:", typeof result);
      console.log("[changeDevice] result keys:", result ? Object.keys(result) : "null/undefined");

      if (!result) throw new Error("No response returned from changeDevice.");
      if (result?.error || result?.errors) throw new Error(result.error || JSON.stringify(result.errors));

      setActivationResult({ success: true, message: "Device successfully activated.", data: result });

      setTimeout(() => {
        setStep(1);
        setSelectedDevice("");
        setImei("");
        setCompatResult(null);
        setSelectedLine(null);
        setActivationResult(null);
      }, 3000);
    } catch (err) {
      console.error("[changeDevice] error:", err?.message);
      console.error("[changeDevice] stack:", err?.stack);
      setActivationResult({
        success: false,
        message: err instanceof Error ? err.message : "Activation failed. Please try again.",
      });
    } finally {
      setActivating(false);
    }
  };

  const ProgressBar = () => (
    <div className="progress mb-3" style={{ height: "6px" }}>
      <div
        className="progress-bar bg-success"
        style={{ width: `${(step / 3) * 100}%`, transition: "width 0.3s ease" }}
      />
    </div>
  );

  // ─── STEP 1 ───────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="card p-4 shadow-sm">
      <p className="text-muted small mb-1">Step 1 of 3</p>
      <h4 className="fw-bold mb-3">Device Selection</h4>
      <p className="text-muted small mb-4">Choose the type of device you want to add to your plan.</p>

      <div className="row g-3">
        {devices.map((device) => (
          <div className="col-md-6 col-lg-3" key={device.id}>
            <div
              onClick={() => setSelectedDevice(device.id)}
              className={`border rounded-3 p-3 text-center h-100 ${
                selectedDevice === device.id
                  ? "border-success bg-light"
                  : "border-secondary-subtle bg-white"
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

  // ─── STEP 2 ───────────────────────────────────────────────────────────────
  const renderStep2 = () => {
    const isValidIMEI = /^\d{15,16}$/.test(imei) || /^\d{32}$/.test(imei);

    const handleLineSelect = (e) => {
      const lineId = parseInt(e.target.value, 10);
      const line = linesInfo.find((l) => l.id === lineId) || null;
      setSelectedLine(line);
      setIccidError(null);
    };

    return (
      <div className="card p-4 shadow-sm">
        <p className="text-muted small mb-1">Step 2 of 3</p>
        <h4 className="fw-bold mb-3">Device Info</h4>
        <p className="text-muted small mb-4">
          Provide your device's unique identifier to check compatibility with our network.
        </p>

        {/* IMEI Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Device IMEI or EID Number</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              value={imei}
              onChange={(e) => {
                setImei(e.target.value);
                setCompatResult(null);
                setSelectedLine(null);
                setImeiError(null);
              }}
              className="form-control"
              placeholder="Enter 15/16-digit IMEI or 32-digit EID"
              style={{ width: "70%" }}
            />
            <button
              className="btn btn-success fw-semibold"
              onClick={validateAndCheckDevice}
              disabled={!isValidIMEI || checking}
            >
              {checking ? "Checking..." : "Check Compatibility"}
            </button>
          </div>

          <p className="small text-muted mt-1">
            Find your IMEI by dialing <strong>*#06#</strong> or checking Settings → About.
          </p>

          {/* Error / compatibility result shown inline below IMEI input */}
          {imeiError && (
            <p className="small mt-1 text-danger">{imeiError}</p>
          )}
          {compatResult && (
            <p className={`small mt-1 fw-semibold ${compatResult.compatible ? "text-success" : "text-danger"}`}>
              {compatResult.compatible ? "✅" : "❌"} {compatResult.message}
            </p>
          )}
        </div>

        {/* ICCID select — only shown when device is compatible */}
        {compatResult?.compatible && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Line (ICCID)</label>
            <select
              className="form-control"
              value={selectedLine?.id ?? ""}
              onChange={handleLineSelect}
            >
              <option value="">-- Select a line --</option>
              {linesInfo.map((line) => (
                // value = line.id (numeric), so we can retrieve the full object on change
                <option key={line.id} value={line.id}>
                  {line.iccid}{line.mdn ? ` — ${line.mdn}` : ""} (Line #{line.id})
                </option>
              ))}
            </select>

            {linesInfo.length === 0 && (
              <p className="text-warning small mt-2">No active lines found for your account.</p>
            )}
            {iccidError && <p className="text-danger small mt-2">{iccidError}</p>}

            {/* Confirm card showing both line ID and ICCID after selection */}
            {selectedLine && (
              <div className="mt-2 p-2 bg-light rounded border small">
                <strong>Line ID:</strong> {selectedLine.id}&nbsp;|&nbsp;
                <strong>ICCID:</strong> {selectedLine.iccid}
                {selectedLine.mdn && (
                  <>&nbsp;|&nbsp;<strong>MDN:</strong> {selectedLine.mdn}</>
                )}
              </div>
            )}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-secondary" onClick={handleBack}>
            ← Back
          </button>
          <button
            className="btn btn-success px-4"
            onClick={handleNext}
            disabled={!compatResult?.compatible || !selectedLine}
          >
            Continue to Review →
          </button>
        </div>
      </div>
    );
  };

  // ─── STEP 3 ───────────────────────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="card p-4 shadow-sm">
      <p className="text-muted small mb-1">Step 3 of 3</p>
      <h4 className="fw-bold mb-3">Review & Confirm</h4>

      <div className="border p-3 rounded bg-light mb-3">
        <p className="mb-1">
          <strong>Device Type:</strong>{" "}
          {devices.find((d) => d.id === selectedDevice)?.title || selectedDevice}
        </p>
        <p className="mb-1"><strong>IMEI/EID:</strong> {imei}</p>
        <p className="mb-1"><strong>Line ID:</strong> {selectedLine?.id}</p>
        <p className="mb-1"><strong>ICCID:</strong> {selectedLine?.iccid}</p>
        {selectedLine?.mdn && (
          <p className="mb-1"><strong>MDN:</strong> {selectedLine.mdn}</p>
        )}
        <p className="mb-0">
          <strong>eSIM Compatibility:</strong>{" "}
          <span className="text-success fw-semibold">Compatible ✅</span>
        </p>
      </div>

      <p className="small text-muted mb-3">
        Clicking <strong>Confirm & Activate</strong> will call{" "}
        <code>changeDevice({selectedLine?.id}, {"{ device_serial, iccid }"})</code> to link this device to the selected line.
      </p>

      {activationResult && (
        <div className={`alert ${activationResult.success ? "alert-success" : "alert-danger"} py-2`}>
          {activationResult.success ? "✅" : "❌"} {activationResult.message}
        </div>
      )}
      {iccidError && <p className="text-danger small">{iccidError}</p>}

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-outline-secondary" onClick={handleBack} disabled={activating}>
          ← Back
        </button>
        <button
          className="btn btn-success px-4"
          onClick={handleConfirmAndActivate}
          disabled={activating || activationResult?.success}
        >
          {activating ? "Activating..." : "Confirm & Activate"}
        </button>
      </div>
    </div>
  );

  return (
    <>
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
                  Our support team is available 24/7. Chat with us for help or questions about
                  device compatibility or activation.
                </p>
                <button className="btn btn-warning w-100 fw-semibold" onClick={openChat}>
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
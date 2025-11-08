"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import HeadBar from "../../../components/HeadBar";
import "../../Dashboard.css";
import beQuick from "../../../utils/dasdbeQuickApi";
import { FaMobileAlt, FaWifi, FaPhoneAlt } from "react-icons/fa";
import { useParams } from "next/navigation";


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [fullData, setFullData] = useState(null); // ✅ define state
  const params = useParams();
  const planId = params.planId;
  const [error, setError] = useState(null);
  const [usage, setUsage] = useState({
    mobileData: { used: 0, total: 358466 },
    hotspot: { used: 0, total: 0 },
    talkText: { minutes: 0, texts: 0 },
    autoRenew: true,
    usageAlerts: true,
    billingCycle: "Oct 10 - Nov 10, 2025",
  });

  useEffect(() => {
  async function fetchData() {
    setLoading(true);
    try {
      const data = await beQuick.getPlanDetails([planId], true);
      setFullData(data); // keep full JSON for debugging

      const usageSummary = data.usage_summary || {};

      const mobileData = {
  used: Math.round(parseFloat(usageSummary.data?.used || 0) / 1024), // KB -> MB
  total: Math.round(
    (parseFloat(usageSummary.data?.used || 0) +
      parseFloat(usageSummary.data?.remaining || 0)) /
      1024
  ),
};

const hotspot = { used: 0, total: 0 }; // API doesn't provide hotspot

const talkText = {
  minutes: Math.round(parseFloat(usageSummary.voice?.total || 0)),
  texts: Math.round(parseFloat(usageSummary.text?.total || 0)),
};


// ✅ Safe billing cycle extraction
const startDate = data?.service_period?.start_at;
const endDate = data?.service_period?.end_at;

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatBillingCycle = () => {
  if (!startDate || !endDate) return "";

  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const year = new Date(endDate).getFullYear();

  return `${start} - ${end}, ${year}`;
};

const billingCycle = formatBillingCycle();


      setUsage({
        mobileData,
        hotspot,
        talkText,
        autoRenew: true, // default
        usageAlerts: true, // default
        billingCycle, // API has no service period
      });
    } catch (err) {
      console.error("beQuick.getPlanDetails error:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, []);




  const pct = (used, total) =>
    total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;



  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar />

      <div className="page-shell">


        <div className="dashboard-wrapper">
          {loading && <div className="alert alert-info">Loading your data…</div>}
        {error && <div className="alert alert-danger">{error}</div>}
          {/* === Current Usage === */}
          <div className="usage-header">
            <h4 className="usage-heading">Current Usage Overview</h4>
            <div className="billing-cycle">{usage.billingCycle}</div>
          </div>

          {/* --- Usage Cards --- */}
          <div className="cards-row">
            {/* Mobile Data */}
            <div className="card card-highlight">
              <div className="card-top">
                <div className="card-icon">
                  <FaMobileAlt />
                </div>
                <div className="card-title">Mobile Data</div>
              </div>

              <div className="card-value">
                <span className="big">{usage.mobileData.used}</span>
                <span className="small">
                  MB / {usage.mobileData.total} MB
                </span>
              </div>

              <div className="progress-wrap">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct(
                        usage.mobileData.used,
                        usage.mobileData.total
                      )}%`,
                    }}
                  />
                </div>
                <div className="progress-note">
                  <span>
                    {pct(usage.mobileData.used, usage.mobileData.total)}% used
                  </span>
                  <span className="muted">
                    {" "}
                    · {Math.max(0, usage.mobileData.total - usage.mobileData.used)} MB
                    remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Hotspot */}
            <div className="card">
              <div className="card-top">
                <div className="card-icon">
                  <FaWifi />
                </div>
                <div className="card-title">Mobile Hotspot</div>
              </div>

              <div className="card-value">
                <span className="big">{usage.hotspot.used}</span>
                <span className="small">
                  MB / {usage.hotspot.total} MB
                </span>
              </div>

              <div className="progress-wrap">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct(usage.hotspot.used, usage.hotspot.total)}%`,
                    }}
                  />
                </div>
                <div className="progress-note">
                  <span>
                    {pct(usage.hotspot.used, usage.hotspot.total)}% used
                  </span>
                  <span className="muted">
                    {" "}
                    · {Math.max(0, usage.hotspot.total - usage.hotspot.used)} MB
                    remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Talk & Text */}
            <div className="card">
              <div className="card-top">
                <div className="card-icon">
                  <FaPhoneAlt />
                </div>
                <div className="card-title">Talk & Text</div>
              </div>

              <div className="card-value">
                <span className="big">{usage.talkText.minutes}</span>
                <span className="small">
                  min / {usage.talkText.texts} texts
                </span>
              </div>

              <div className="progress-wrap">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `0%` }} />
                </div>
                <div className="progress-note">
                  <span>{usage.talkText.minutes} min this month</span>
                  <span className="muted">
                    {" "}
                    · {usage.talkText.texts} messages sent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* === Plan Preferences (with visible toggles) === */}
          <div className="section-card">
            <h5 className="section-title">Plan Preferences</h5>

            {/* Auto Renewal */}
            <div className="pref-card">
              <div className="pref-header">
                <div>
                  <h6>Auto Renewal</h6>
                  <p className="pref-sub">
                    Automatically renew your plan when it expires
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={usage.autoRenew}
                    onChange={() =>
                      setUsage((p) => ({ ...p, autoRenew: !p.autoRenew }))
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <p className="pref-status">
                {usage.autoRenew
                  ? "Enabled - Your plan will renew automatically"
                  : "Disabled - Your plan will not auto renew"}
              </p>
            </div>

            {/* Usage Alerts */}
            <div className="pref-card">
              <div className="pref-header">
                <div>
                  <h6>Usage Alerts</h6>
                  <p className="pref-sub">
                    Get notified when approaching your plan limits
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={usage.usageAlerts}
                    onChange={() =>
                      setUsage((p) => ({
                        ...p,
                        usageAlerts: !p.usageAlerts,
                      }))
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <p className="pref-status">
                {usage.usageAlerts
                  ? "Alerts at 80% and 95% usage"
                  : "Alerts disabled"}
              </p>
            </div>
          </div>

          {/* === Quick Actions === */}
          <div className="section-card">
            <h5 className="section-title">Quick Actions</h5>
            <div className="quick-actions">
              <button className="btn-outline upgrade">Upgrade Plan</button>
              <button className="btn-outline buy">Buy More Data</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

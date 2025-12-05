"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import HeadBar from "../../../components/HeadBar";
import "../../Dashboard.css";
import beQuick from "../../../utils/dasdbeQuickApi";
import { FaMobileAlt, FaWifi, FaPhoneAlt, FaRegCommentDots } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [fullData, setFullData] = useState(null);
  const params = useParams();
  const planId = params.planId;
  const [error, setError] = useState(null);

  const [usage, setUsage] = useState({
    usageBlocks: {},
    autoRenew: true,
    usageAlerts: true,
    billingCycle: "",
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await beQuick.getPlanDetails([planId], true);
        setFullData(data);

        const usageSummary = data.usage_summary || {};

        // Convert function (supports GB for data)
        const convert = (used, remaining, isData = false) => {
          let u = parseFloat(used || 0);
          let r = parseFloat(remaining || 0);
          let total = u + r;

          if (isData) {
            // Convert KB → GB
            u = u / (1024 * 1024);
            r = r / (1024 * 1024);
            total = u + r;
          }

          return {
            used: isData ? u.toFixed(2) : Math.round(u),
            remaining: isData ? r.toFixed(2) : Math.round(r),
            total: isData ? total.toFixed(2) : Math.round(total),
            pct: total > 0 ? Math.round((u / total) * 100) : 0,
            isData,
          };
        };

        const usageBlocks = {
          domestic_voice: convert(
            usageSummary.voice?.used,
            usageSummary.voice?.remaining
          ),
          international_voice: convert(
            usageSummary.international_voice?.used,
            usageSummary.international_voice?.remaining
          ),
          domestic_text: convert(
            usageSummary.text?.used,
            usageSummary.text?.remaining
          ),
          international_text: convert(
            usageSummary.international_text?.used,
            usageSummary.international_text?.remaining
          ),
          domestic_data: convert(
            usageSummary.data?.used,
            usageSummary.data?.remaining,
            true
          ),
          roaming_data: convert(
            usageSummary.international_data?.used,
            usageSummary.international_data?.remaining,
            true
          ),
        };

        // Billing cycle
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

        setUsage({
          usageBlocks,
          autoRenew: true,
          usageAlerts: true,
          billingCycle: formatBillingCycle(),
        });
      } catch (err) {
        console.error("beQuick.getPlanDetails error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
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

          {/* === 3 BLOCKS PER LINE === */}
          <div
            className="cards-row1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {usage.usageBlocks &&
              Object.entries(usage.usageBlocks).map(([key, item]) => {
                // Icon logic
                let Icon = FaMobileAlt;
                let unit = "";

                // Title mapping
                const titleMap = {
                  domestic_voice: "Domestic Voice",
                  international_voice: "International Voice",
                  domestic_text: "Domestic Texts",
                  international_text: "International Texts",
                  domestic_data: "Domestic Data",
                  roaming_data: "Roaming Data",
                };

                const blockTitle = titleMap[key] || key;

                // Units per block
                if (key.includes("voice")) {
                  Icon = FaPhoneAlt;
                  unit = "Minutes";
                } else if (key.includes("text")) {
                  Icon = FaRegCommentDots;
                  unit = "SMS";
                } else if (key.includes("data")) {
                  Icon = FaWifi;
                  unit = item.total < 1 ? "MB" : "GB";
                }

                // Convert <1GB to MB
                let usedLabel = item.used;
                let totalLabel = item.total;
                let remainingLabel = item.remaining;

                if (item.isData && item.total < 1) {
                  usedLabel = (item.used * 1024).toFixed(0);
                  totalLabel = (item.total * 1024).toFixed(0);
                  remainingLabel = (item.remaining * 1024).toFixed(0);
                }

                return (
                  <div className="card card-highlight" key={key}>
                    <div className="card-top">
                      <div className="card-icon">
                        <Icon />
                      </div>
                      <div className="card-title">{blockTitle}</div>
                    </div>

                    <div className="card-value">
                      <span className="big">{usedLabel}</span>
                      <span className="small"> / {totalLabel} {unit}</span>
                    </div>

                    <div className="progress-wrap">
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>

                      <div className="progress-note">
                        <span>{item.pct}% used</span>
                        <span className="muted">
                          · {remainingLabel} {unit} remaining
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* === Plan Preferences === */}
          <div className="section-card">
            <h5 className="section-title">Plan Preferences</h5>

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

          <div className="section-card">
            <h5 className="section-title">Quick Actions</h5>
            <div className="quick-actions">
              <button className="btn-outline upgrade">Upgrade Plan</button>
              <button className="btn-outline buy">Buy More Data</button>

              {/* New Back Button */}
              <button
                className="btn-outline back"
                onClick={() => window.history.back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

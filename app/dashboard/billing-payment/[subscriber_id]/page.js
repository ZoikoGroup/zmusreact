"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import HeadBar from "../../../components/HeadBar";
import "../../Dashboard.css";

export default function BillingPaymentPage({ params }) {
  const { subscriber_id } = params;

  const [loading, setLoading] = useState(true);
  const [billingData, setBillingData] = useState({
    bills: [],
    currentBalance: "0.00",
    daysLeft: 0,
    recentSummary: "0.00",
    billingAlerts: [],
  });
  const [error, setError] = useState(null);

  const API_URL = `https://zoiko-atom-api.bequickapps.com/billing_statements?by_subscriber_id=${subscriber_id}`;
  const TOKEN = "09ff2d85-a451-47e6-86bc-aba98e1e4629";

  useEffect(() => {
    async function fetchBillingData() {
      try {
        const res = await fetch(API_URL, {
          headers: { "X-AUTH-TOKEN": TOKEN },
        });
        if (!res.ok) throw new Error("Failed to fetch billing data");
        const data = await res.json();

        const bills = data.billing_statements.map((b, index) => ({
          id: b.id,
          period: `${new Date(b.start_at).toLocaleDateString()} - ${new Date(
            b.closed_at
          ).toLocaleDateString()}`,
          amount: `$${b.total}`,
          due: new Date(b.due_at).toLocaleDateString(),
          status: b.status,
          attachmentUrl: b.statement_attachment_url,
        }));

        const latest = data.billing_statements[data.billing_statements.length - 1];
        const alerts = [];
        if (latest.past_due) alerts.push("Payment overdue");
        if (!latest.paid) alerts.push("Pending payment for the latest bill");
        else alerts.push("Auto-renew is enabled");

        setBillingData({
          bills,
          currentBalance: `$${latest.total}`,
          daysLeft: Math.max(
            0,
            Math.ceil(
              (new Date(latest.due_at) - new Date()) / (1000 * 60 * 60 * 24)
            )
          ),
          recentSummary: `$${latest.net_received}`,
          billingAlerts: alerts,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load billing data.");
      } finally {
        setLoading(false);
      }
    }

    fetchBillingData();
  }, [subscriber_id]);

  // ✅ Download bill as PDF
  const handleDownload = async (billId) => {
    try {
      const res = await fetch(
        `https://zoiko-atom-api.bequickapps.com/billing_statements/${billId}/statement_attachment`,
        {
          headers: { "X-AUTH-TOKEN": TOKEN },
        }
      );
      if (!res.ok) throw new Error("Failed to download statement");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `billing_statement_${billId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download statement.");
    }
  };

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="Billing & Payment" />

      <div className="container py-4">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center my-5">{error}</div>
        ) : (
          <>
            {/* Top Summary Cards */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card p-3 shadow-sm border-0 rounded-3">
                  <h6 className="text-muted">Current Balance</h6>
                  <h4 className="fw-bold">{billingData.currentBalance}</h4>
                  <p className="small text-secondary">
                    {billingData.daysLeft} days left
                  </p>
                  <button className="btn btn-success w-100 mt-2">
                    Pay Now
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3 shadow-sm border-0 rounded-3">
                  <h6 className="text-muted">Recent Summary</h6>
                  <h4 className="fw-bold">{billingData.recentSummary}</h4>
                  <p className="small text-success">
                    ✓ Last payment successful
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3 shadow-sm border-0 rounded-3">
                  <h6 className="text-muted">Billing Alerts</h6>
                  {billingData.billingAlerts.length > 0 ? (
                    billingData.billingAlerts.map((alert, i) => (
                      <p key={i} className="small mb-1 text-warning">
                        ⚠️ {alert}
                      </p>
                    ))
                  ) : (
                    <p className="small text-success mb-0">
                      ✓ No pending alerts
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bill History Table */}
            <div className="card p-3 mb-4 shadow-sm border-0 rounded-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Bill History</h6>
                
              </div>

              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Service Period</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.bills.map((bill, i) => (
                      <tr key={i}>
                        <td>{bill.id}</td>
                        <td>{bill.period}</td>
                        <td>{bill.amount}</td>
                        <td>{bill.due}</td>
                        <td>
                          <span
                            className={`badge ${
                              bill.status === "Paid"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {bill.status}
                          </span>
                        </td>
                        <td>
                          {bill.attachmentUrl ? (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleDownload(bill.id)}
                            >
                              Download
                            </button>
                          ) : (
                            <span className="text-muted small">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Manage Billing */}
            <div className="card p-3 shadow-sm mb-5 border-0 rounded-3">
              <h6 className="fw-bold mb-3">Manage Billing</h6>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-outline-success btn-sm">
                  Enroll in Paperless Billing
                </button>
                <button className="btn btn-outline-success btn-sm">
                  Update Payment Method
                </button>
                <button className="btn btn-outline-success btn-sm">
                  Billing Preferences
                </button>
                <button className="btn btn-outline-success btn-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Header, { openPaymentModal } from "../../../components/Header"; // make sure Header exports openPaymentModal
import Footer from "../../../components/Footer";
import HeadBar from "../../../components/HeadBar";
import "../../Dashboard.css";

export default function BillingPaymentPage({ params }) {
  const { subscriber_id } = use(params);

  const [loading, setLoading] = useState(true);
  const [billingData, setBillingData] = useState({
    bills: [],
    currentBalance: "0.00",
    daysLeft: 0,
    recentSummary: "0.00",
    billingAlerts: [],
  });
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 5;

  const API_URL = `https://zoiko-atom-api.bequickapps.com/billing_statements?by_subscriber_id=${subscriber_id}`;
  const TOKEN = "09ff2d85-a451-47e6-86bc-aba98e1e4629";

  useEffect(() => {
    async function fetchBillingData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL, {
          headers: { "X-AUTH-TOKEN": TOKEN },
        });

        if (!res.ok) throw new Error("Failed to fetch billing data");

        const data = await res.json();
        console.log("Billing data:", data);

        const statements = data?.billing_statements || [];

        if (statements.length === 0) {
          setBillingData({
            bills: [],
            currentBalance: "$0.00",
            daysLeft: 0,
            recentSummary: "$0.00",
            billingAlerts: ["No billing statements found"],
          });
          return;
        }

        // Build bills list (latest first)
        const bills = statements
          .map((b) => ({
            id: b.id,
            period: `${new Date(b.start_at).toLocaleDateString()} - ${new Date(
              b.closed_at
            ).toLocaleDateString()}`,
            amount: `$${b.total}`,
            due: new Date(b.due_at).toLocaleDateString(),
            status: b.status || "Unknown",
            attachmentUrl: b.statement_attachment_url,
          }))
          .reverse();

        const latest = statements[statements.length - 1] || {};

        const alerts = [];
        if (latest?.past_due) alerts.push("Payment overdue");
        if (!latest?.paid) alerts.push("Pending payment for the latest bill");
        else alerts.push("Auto-renew is enabled");

        const dueDate = latest?.due_at ? new Date(latest.due_at) : null;
        const daysLeft = dueDate
          ? Math.max(
              0,
              Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24))
            )
          : 0;

        setBillingData({
          bills,
          currentBalance: `$${latest?.total || "0.00"}`,
          daysLeft,
          recentSummary: `$${latest?.net_received || "0.00"}`,
          billingAlerts: alerts,
        });
      } catch (err) {
        console.error("Billing fetch error:", err);
        setError("Unable to load billing data.");
      } finally {
        setLoading(false);
      }
    }

    if (subscriber_id) fetchBillingData();
  }, [subscriber_id]);

  // Download bill as PDF
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

  // Pagination logic
  const totalBills = billingData.bills.length;
  const totalPages = Math.ceil(totalBills / billsPerPage);
  const startIndex = (currentPage - 1) * billsPerPage;
  const currentBills = billingData.bills.slice(
    startIndex,
    startIndex + billsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
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
            {/* Summary Cards */}
            <div className="row g-3 mb-4">
              {/* Current Balance */}
              <div className="col-md-4">
                <div className="card p-3 shadow-sm border-0 rounded-3">
                  <h6 className="text-muted">Current Balance</h6>
                  <h4 className="fw-bold">{billingData.currentBalance}</h4>
                  <p className="small text-secondary">
                    {billingData.daysLeft} days left
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      openPaymentModal(
                        "ORD1234",
                        parseFloat(
                          billingData.currentBalance.replace(/[^0-9.]/g, "")
                        ) || 0
                      )
                    }
                  >
                    Pay Now
                  </button>
                </div>
              </div>

              {/* Recent Summary */}
              <div className="col-md-4">
                <div className="card p-3 shadow-sm border-0 rounded-3">
                  <h6 className="text-muted">Recent Summary</h6>
                  <h4 className="fw-bold">{billingData.recentSummary}</h4>
                  <p className="small text-success">✓ Last payment successful</p>
                </div>
              </div>

              {/* Billing Alerts */}
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
                    <p className="small text-success mb-0">✓ No pending alerts</p>
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
                    {currentBills.length > 0 ? (
                      currentBills.map((bill, i) => (
                        <tr key={i}>
                          <td>{bill.id}</td>
                          <td>{bill.period}</td>
                          <td>{bill.amount}</td>
                          <td>{bill.due}</td>
                          <td>
                            <span
                              className={`badge ${
                                bill.status?.toLowerCase() === "paid"
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                          No billing records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-success btn-sm me-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-success btn-sm ms-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

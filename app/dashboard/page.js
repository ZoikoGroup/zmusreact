"use client";

import { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import "./Dashboard.css";
import beQuick from "../utils/dasdbeQuickApi";
import Link from "next/link";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [subscriber, setSubscriber] = useState(null);
  const [subscriberNotFound, setSubscriberNotFound] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planDetails, setPlanDetails] = useState(null);
  const [lineUsage, setLineUsage] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [primaryLineId, setPrimaryLineId] = useState(null);
  const [devices, setDevices] = useState([]);

  // Helper: format date and remaining days
  function formatDateAndRemaining(endAt) {
    if (!endAt) return { formatted: "N/A", remainingDays: "N/A" };
    const endDate = new Date(endAt);
    const today = new Date();
    const diffTime = endDate - today;
    const remainingDays = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formatted = endDate.toLocaleDateString("en-US", options);
    return { formatted, remainingDays };
  }

  // Fetch devices dynamically based on subscriber & plan details
  async function fetchDevices(subscriberInfo, planDetailsInfo) {
    try {
      let devicesList = [];
      const deviceIds = subscriberInfo?.primary_line_id
        ? planDetailsInfo?.line?.device_identifier_ids || []
        : [];

      if (deviceIds.length > 0) {
        devicesList = deviceIds.map((id, index) => ({
          label: `Device ${id}`,
          note: index === 0 ? "pSIM • Primary Line (Selected)" : "pSIM • Secondary Line",
          status: planDetailsInfo?.line?.status === "active" ? "Active" : "Pending",
        }));
      }

      if (devicesList.length === 0) {
        // Fallback devices
        devicesList = [
          { label: "Device 3132", note: "pSIM • Primary Line (Selected)", status: "Active" },
          { label: "Device #77", note: "pSIM • Secondary Line", status: "Pending" },
        ];
      }

      return devicesList;
    } catch (err) {
      console.error("Error fetching devices:", err);
      return [
        { label: "Device 3132", note: "pSIM • Primary Line (Selected)", status: "Active" },
        { label: "Device #77", note: "pSIM • Secondary Line", status: "Pending" },
      ];
    }
  }

  // Load dashboard data dynamically by subscriber email
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        // Get user email from localStorage
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userEmail = userData?.email;

        if (!userEmail) {
          setSubscriberNotFound(true);
          setLoading(false);
          return;
        }

        // Get subscriber_id dynamically
        const subscriberResult = await beQuick.getSubscriberByEmail(userEmail);

        if (!subscriberResult || !subscriberResult.subscriber_id) {
          setSubscriberNotFound(true);
          setLoading(false);
          return;
        }

        const SUBSCRIBER_ID = subscriberResult.subscriber_id;

        // Fetch subscriber details
        const subDetails = await beQuick.getSubscriberDetails(SUBSCRIBER_ID);
        const subscriberInfo = subDetails?.subscribers?.[0];

        if (!subscriberInfo) {
          setSubscriberNotFound(true);
          setLoading(false);
          return;
        }

        setSubscriber(subscriberInfo);
        setPrimaryLineId(subscriberInfo.primary_line_id);

        // Load plans list
        const plansData = await beQuick.getAllPlans();
        setPlans(plansData?.products || plansData?.data || []);

        // Fetch primary line plan details
        if (subscriberInfo.primary_line_id) {
          const pDetails = await beQuick.getPlanDetails(subscriberInfo.primary_line_id, true);
          setPlanDetails(pDetails);

          const buckets = await beQuick.getLineBuckets(subscriberInfo.primary_line_id);
          setLineUsage(buckets);

          // Fetch devices dynamically
          const dynamicDevices = await fetchDevices(subscriberInfo, pDetails);
          setDevices(dynamicDevices);
        }

        // Payment methods & orders
        const pm = await beQuick.getPaymentMethods(SUBSCRIBER_ID);
        setPaymentMethods(pm);

        const ord = await beQuick.getOrders(SUBSCRIBER_ID);
        setOrders(ord?.orders || ord?.data || []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError(err?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Show "subscriber not found" message
  if (subscriberNotFound) {
    return (
      <>
        <TopHeader />
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger text-center">
            Subscriber not found for your account.
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Render helpers
  const currentBill = paymentMethods?.currentAmount || 15.98;
  const nextPayment = planDetails?.service?.next_payment_date || "Nov 09";

  const usageData = planDetails?.usage_summary?.data || {};
  const servicePeriod = planDetails?.service_period || {};
  const totalGB = usageData.total ? Number(usageData.total) / 1024 : 0;
  const usedGB = usageData.used ? Number(usageData.used) / 1024 : 0;
  const remainingGB = usageData.remaining ? Number(usageData.remaining) / 1024 : totalGB - usedGB;
  const percentUsed = usageData?.percent || 0;

  const { formatted: activeUntil, remainingDays } = formatDateAndRemaining(servicePeriod?.end_at);

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />

      <div className="dashboard-container container py-4">
        {loading && <div className="alert alert-info">Loading your data…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && subscriber && (
        <div className="row g-4">
          {/* Plans & Usage */}
          <div className="col-lg-4 col-md-6">
            <div className="dash-card">
              <h6 className="card-title">My Plans & Usage</h6>
              <p className="text-muted small mb-3">See active plans, data use and renewal options</p>
              <div className="plan-box mb-3">
                <h6 className="fw-bold mb-1">{planDetails?.current_plans?.[0]?.name || "N/A"}</h6>
                <small className="text-success">Active until: {activeUntil}</small>
              </div>

              <div className="usage-info mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>{usedGB.toFixed(2)} GB Used This Month</span>
                  <span>{remainingGB.toFixed(2)} GB Remaining</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-success" style={{ width: `${percentUsed}%` }}></div>
                </div>
                <small className="text-muted d-block mt-1">
                  {percentUsed}% used • {remainingDays !== "N/A" && `Renews in ${remainingDays} days`}
                </small>
              </div>

              <div className="d-flex gap-2">
                <Link className="btn btn-success btn-sm" href={`/dashboard/plan-usages/${primaryLineId}`}>
                  View Details
                </Link>
                <button className="btn btn-warning btn-sm text-white">Upgrade Plan</button>
              </div>
            </div>
          </div>

          {/* Devices & SIMs */}
          <div className="col-lg-4 col-md-6">
            <div className="dash-card">
              <h6 className="card-title">My Devices & SIMs</h6>
              <p className="text-muted small mb-3">Activate, pause, or switch your pSIM/eSIM</p>

              {devices.map((d, i) => (
                <div key={i} className="device-item mb-3 d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{d.label || `Device ${i + 1}`}</strong>
                    <p className="text-muted small mb-0">{d.note || ""}</p>
                  </div>
                  <span className={`badge ${d.status === "Active" ? "bg-success" : "bg-warning text-dark"}`}>
                    {d.status}
                  </span>
                </div>
              ))}

              <div className="d-flex gap-2">
                {/* Corrected dynamic subscriber_id */}
                {subscriber?.id && (
                  <Link href={`/dashboard/my-devices-sims/${subscriber.id}`}>
                    <button className="btn btn-success btn-sm">Manage SIMs</button>
                  </Link>
                )}
                <Link href={`/dashboard/add-device/`}>
                <button className="btn btn-outline-success btn-sm">Add Device</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Billing & Payment */}
          <div className="col-lg-4 col-md-6">
            <div className="dash-card">
              <h6 className="card-title">Billing & Payment</h6>
              <p className="text-muted small mb-3">Update payment method or view invoices</p>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <h5 className="fw-bold mb-0">${Number(currentBill).toFixed(2)}</h5>
                  <small className="text-muted">Current Bill</small>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">{nextPayment}</h6>
                  <small className="text-muted">Next Payment</small>
                </div>
              </div>

              <p className="text-muted small mb-2">Payment Method</p>
              <button className="btn btn-outline-success btn-sm mb-3">Add</button>

              <div className="d-flex gap-2">
                <button className="btn btn-success btn-sm">Pay Now</button>
                <button className="btn btn-outline-secondary btn-sm">View Invoices</button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="col-lg-4 col-md-6">
            <div className="dash-card">
              <h6 className="card-title">Account Settings</h6>
              <p className="text-muted small mb-3">Manage password, contact info, and security</p>
              <p className="small mb-1 fw-bold">Contact Info</p>
              <p className="text-muted small mb-0">{subscriber?.email || "info@zoikomobile.com"}</p>
              <p className="text-muted small mb-3">{subscriber?.contact_number || "800-988-8116"}</p>
              <p className="small mb-1 fw-bold">Security</p>
              <p className="text-muted small mb-3">
                Two-factor authentication {subscriber?.two_fa ? "enabled" : "disabled"}
              </p>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm">Edit Profile</button>
                <button className="btn btn-outline-success btn-sm">Security Settings</button>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="col-lg-4 col-md-6">
            <div className="dash-card">
              <h6 className="card-title">Order History</h6>
              <p className="text-muted small mb-3">Track previous orders</p>

              {orders.slice(0, 3).map((o, i) => (
                <div key={i} className="mb-3">
                  <p className="small mb-1 text-muted">{o.date || o.created_at || ""}</p>
                  <p>
                    <strong>Order {o.id || o.order_id || ""} - {o.description || ""}</strong>{" "}
                    <span className="text-muted">${Number(o.amount || o.total || 0).toFixed(2)}</span>
                  </p>
                </div>
              ))}

              <div className="d-flex gap-2">
                <button className="btn btn-outline-success btn-sm">View All Orders</button>
                <button className="btn btn-outline-secondary btn-sm">Track Shipment</button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="col-lg-4 col-md-6">
            <div className="dash-card">
              <h6 className="card-title text-danger">Request Support</h6>
              <p className="text-muted small mb-3">Instant access to help with account pre-filled</p>
              <div className="alert alert-warning py-2 small mb-3">
                Need help? Our driver support team is available 24/7
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-outline-success btn-sm">Live Chat</button>
                <button className="btn btn-outline-success btn-sm">Call Support</button>
                <button className="btn btn-outline-success btn-sm">Email Help</button>
                <button className="btn btn-outline-secondary btn-sm">FAQ</button>
              </div>

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-success btn-sm">Contact Support</button>
                <button className="btn btn-outline-warning btn-sm text-dark">Browse Help Center</button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      <Footer />
    </>
  );
}

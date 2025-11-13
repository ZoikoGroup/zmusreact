"use client";

import { useEffect, useState } from "react";
import Header, { openPaymentModal } from "../components/Header"; // ensure Header exports openPaymentModal
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import "./Dashboard.css";
import beQuick from "../utils/dasdbeQuickApi";
import Link from "next/link";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardPage() {
  // --- Dashboard states (BeQuick + UI) ---
  const [loading, setLoading] = useState(true);
  const [subscriber, setSubscriber] = useState(null);
  const [subscriberNotFound, setSubscriberNotFound] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planDetails, setPlanDetails] = useState(null);
  const [lineUsage, setLineUsage] = useState(null);
  const [currentBill, setCurrentBill] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [primaryLineId, setPrimaryLineId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [userName, setUserName] = useState("Customer");

  // --- Card management states (zmapi / Laravel endpoints) ---
  const [cards, setCards] = useState([]);
  const [savingCard, setSavingCard] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [newCard, setNewCard] = useState({
    card_number: "",
    card_holder_name: "",
    exp_month: "",
    exp_year: "",
    cvv: "",
  });

  // ---------------- Helpers ----------------
  function formatDateAndRemaining(endAt) {
    if (!endAt) return { formatted: "N/A", remainingDays: "N/A" };
    const endDate = new Date(endAt);
    const today = new Date();
    const diffTime = endDate - today;
    const remainingDays =
      diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formatted = endDate.toLocaleDateString("en-US", options);
    return { formatted, remainingDays };
  }

  function kbToMb(kb) {
    return kb / 1024;
  }
  function kbToGb(kb) {
    return kb / 1024 / 1024;
  }

  async function fetchDevices(subscriberInfo, planDetailsInfo) {
    try {
      const deviceIds = planDetailsInfo?.line?.device_identifier_ids || [];

      if (deviceIds.length > 0) {
        return deviceIds.map((id, index) => ({
          label: `Device ${id}`,
          note:
            index === 0
              ? "pSIM • Primary Line (Selected)"
              : "pSIM • Secondary Line",
          status:
            planDetailsInfo?.line?.status === "active" ? "Active" : "Pending",
        }));
      }

      // fallback
      return [
        {
          label: "Device 3132",
          note: "pSIM • Primary Line (Selected)",
          status: "Active",
        },
        {
          label: "Device #77",
          note: "pSIM • Secondary Line",
          status: "Pending",
        },
      ];
    } catch (err) {
      console.error("Error fetching devices:", err);
      return [
        {
          label: "Device 3132",
          note: "pSIM • Primary Line (Selected)",
          status: "Active",
        },
        {
          label: "Device #77",
          note: "pSIM • Secondary Line",
          status: "Pending",
        },
      ];
    }
  }

  // ---------------- Card API functions (zmapi) ----------------
  // GET saved cards
  async function fetchCards() {
    try {
      const token = localStorage.getItem("zoiko_token");
      if (!token) {
        setCards([]);
        return;
      }

      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/customer/cards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      if (data && data.success) {
        // expected data.cards
        setCards(data.cards || []);
      } else {
        setCards([]);
      }
    } catch (err) {
      console.error("Error fetching cards:", err);
      setCards([]);
    }
  }

  // Save card with validation
  async function saveCard(e) {
    e.preventDefault();

    const { card_number, card_holder_name, exp_month, exp_year, cvv } = newCard;

    if (!/^\d{16}$/.test(card_number)) {
      alert("Card number must be exactly 16 digits.");
      return;
    }
    if (!card_holder_name.trim()) {
      alert("Card holder name is required.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])$/.test(exp_month)) {
      alert("Expiry month must be 01–12.");
      return;
    }
    if (!/^\d{4}$/.test(exp_year) || parseInt(exp_year) < new Date().getFullYear()) {
      alert("Expiry year must be a valid future year.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      alert("CVV must be 3 or 4 digits.");
      return;
    }

    setSavingCard(true);

    try {
      const token = localStorage.getItem("zoiko_token");
      if (!token) return alert("Please login again!");

      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/customer/cards",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Card added successfully!");
        setShowCardModal(false);
        setNewCard({
          card_number: "",
          card_holder_name: "",
          exp_month: "",
          exp_year: "",
          cvv: "",
        });
        await fetchCards();
      } else {
        alert(data.message || "Failed to save card. Please check details.");
      }
    } catch (err) {
      console.error("Save card error:", err);
      alert("Error saving card!");
    } finally {
      setSavingCard(false);
    }
  }

  // Use/select card
  async function useCard(cardId) {
    try {
      const token = localStorage.getItem("zoiko_token");
      if (!token) return alert("Please login again!");

      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/customer/cards/use",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ card_id: cardId }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Card selected successfully!");
        await fetchCards();
      } else {
        alert("Failed to set active card!");
      }
    } catch (err) {
      console.error("Use card error:", err);
      alert("Error selecting card!");
    }
  }

  // Delete card
  async function deleteCard(cardId) {
    if (!confirm("Are you sure you want to delete this card?")) return;
    try {
      const token = localStorage.getItem("zoiko_token");
      if (!token) return alert("Please login again!");

      const response = await fetch(
        `https://zmapi.zoikomobile.co.uk/api/v1/customer/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        alert("Card deleted successfully!");
      } else {
        alert("Failed to delete card!");
      }
    } catch (err) {
      console.error("Delete card error:", err);
      alert("Error deleting card!");
    }
  }

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return; // Only allow digits
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- Load Dashboard + Cards ----------------
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userEmail = userData?.email;
        const userFullName = userData?.name || "Customer";
        setUserName(userFullName);

        // load cards immediately (so UI has them even if beQuick fails)
        await fetchCards();

        if (!userEmail) {
          setSubscriberNotFound(true);
          setLoading(false);
          return;
        }

        const subscriberResult = await beQuick.getSubscriberByEmail(userEmail);

        if (!subscriberResult || !subscriberResult.subscriber_id) {
          setSubscriberNotFound(true);
          setLoading(false);
          return;
        }

        const SUBSCRIBER_ID = subscriberResult.subscriber_id;
        //const SUBSCRIBER_ID = 54;
        const subDetails = await beQuick.getSubscriberDetails(SUBSCRIBER_ID);
        const subscriberInfo = subDetails?.subscribers?.[0];

        if (!subscriberInfo) {
          setSubscriberNotFound(true);
          setLoading(false);
          return;
        }

        setSubscriber(subscriberInfo);
        setPrimaryLineId(subscriberInfo.primary_line_id);

        const plansData = await beQuick.getAllPlans();
        setPlans(plansData?.products || plansData?.data || []);

        // Fetch Plan Details and Usage
        if (subscriberInfo.primary_line_id) {
          const pDetails = await beQuick.getPlanDetails(
            subscriberInfo.primary_line_id,
            true
          );
          setPlanDetails(pDetails);

          const buckets = await beQuick.getLineBuckets(
            subscriberInfo.primary_line_id
          );
          setLineUsage(buckets);

          const dynamicDevices = await fetchDevices(subscriberInfo, pDetails);
          setDevices(dynamicDevices);
        }

        // Fetch Current Bill
        const bill = await beQuick.getCurrentBill(SUBSCRIBER_ID);
        setCurrentBill(bill || null);

        // Fetch Orders
        const ord = await beQuick.getOrders(SUBSCRIBER_ID);
        setOrders(ord?.orders || ord?.data || []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError(err?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    })();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------- Derived values ----------------
  const currentBilli = currentBill?.total || 0;
  const nextPayment = currentBill?.due_at
    ? new Date(currentBill.due_at).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  const usageData = planDetails?.usage_summary?.data || {};
  const servicePeriod = planDetails?.service_period || {};
  const totalMB = usageData.total ? kbToMb(Number(usageData.total)) : 0;
  const usedMB = usageData.used ? kbToMb(Number(usageData.used)) : 0;
  const remainingMB = usageData.remaining
    ? kbToMb(Number(usageData.remaining))
    : totalMB - usedMB;
  const percentUsed = usageData?.percent || 0;

  const { formatted: activeUntil, remainingDays } =
    formatDateAndRemaining(servicePeriod?.end_at);
const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize(); // Opens chat box
    } else {
      alert("Chat is loading... please try again in a moment!");
    }
  };
  // ---------------- Render ----------------
  return (
    <>
      <Header />
      <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />

      <div className="dashboard-container container py-4">
        {/* Welcome */}
        <div className="alert alert-success text-center mb-4 fw-bold">
          👋 Welcome, {userName}!
        </div>

        {/* Subscriber missing / loading / error */}
        {subscriberNotFound && (
          <div className="alert alert-danger text-center">
            ⚠️ Subscriber not found for your account. Please contact support.
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <Spinner />
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && (
          <>
            {/* First Row */}
            <div className="row g-4">
              {/* Plans & Usage */}
              <div className="col-lg-4 col-md-6">
                <div className="dash-card">
                  <h6 className="card-title">My Plans & Usage</h6>
                  <p className="text-muted small mb-3">
                    See active plans, data use and renewal options
                  </p>
                  <div className="plan-box mb-3">
                    <h6 className="fw-bold mb-1">
                      {planDetails?.current_plans?.[0]?.name || "N/A"}
                    </h6>
                    <small className="text-success">Active until: {activeUntil}</small>
                  </div>

                  <div className="usage-info mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>{usedMB.toFixed(2)} MB Used</span>
                      <span>{remainingMB.toFixed(2)} MB Remaining</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${percentUsed}%` }}
                      ></div>
                    </div>
                    <small className="text-muted d-block mt-1">
                      {percentUsed}% used •{" "}
                      {remainingDays !== "N/A" && `Renews in ${remainingDays} days`}
                    </small>
                  </div>

                  <div className="d-flex gap-2">
                    <Link
                      className="btn btn-success btn-sm"
                      href={`/dashboard/plan-usages/${primaryLineId}`}
                    >
                      View details
                    </Link>
                    <Link className="btn btn-warning btn-sm text-white" href={`/all-plans`}>
                      Upgrade Plan
                    </Link>
                  </div>
                </div>
              </div>

              {/* Devices & SIMs */}
              <div className="col-lg-4 col-md-6">
                <div className="dash-card">
                  <h6 className="card-title">My Devices & SIMs</h6>
                  <p className="text-muted small mb-3">
                    Activate, pause, or switch your pSIM/eSIM
                  </p>

                  {devices.map((d, i) => (
                    <div
                      key={i}
                      className="device-item mb-3 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{d.label}</strong>
                        <p className="text-muted small mb-0">{d.note}</p>
                      </div>
                      <span
                        className={`badge ${
                          d.status === "Active" ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {d.status}
                      </span>
                    </div>
                  ))}

                  <div className="d-flex gap-2">
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
                      <h5 className="fw-bold mb-0">${Number(currentBilli).toFixed(2)}</h5>
                      <small className="text-muted">Current Bill</small>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{nextPayment}</h6>
                      <small className="text-muted">Next Payment</small>
                    </div>
                  </div>

                  <p className="text-muted small mb-2">Payment Method</p>

                  

                  {/* Saved Cards */}
                  <div className="mt-2">
                    {cards.length === 0 ? (
                      <p className="text-muted small mb-2">No saved cards yet.</p>
                    ) : (
                      cards.map((card) => (
                        <div
                          key={card.id}
                          className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                        >
                          <div>
                            <strong>{card.card_holder_name || card.card_holder}</strong>
                            <p className="mb-0 small text-muted">
                              **** **** **** {card.last4 || (card.card_number?.slice(-4) ?? "0000")} 
                              &nbsp; • Exp{" "} {card.exp_month || card.expiry_month}/{card.exp_year || card.expiry_year}
                            </p>
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCard(card.id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Card button BEFORE Pay Now */}
                  <div className="mb-3">
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => setShowCardModal(true)}
                    >
                      + Add Card
                    </button>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-success"
                      onClick={() => openPaymentModal(planDetails?.current_plans?.[0]?.id, Number(currentBilli))}
                    >
                      Pay Now
                    </button>

                    {subscriber?.id && (
                      <Link href={`/dashboard/billing-payment/${subscriber.id}`} className="btn btn-outline-secondary">
                        View Invoices
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="row g-4 mt-3">
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
                        <strong>
                          Order {o.id || o.order_id || ""} - {o.description || ""}
                        </strong>{" "}
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
                    <button className="btn btn-outline-success btn-sm"  onClick={openChat}>Live Chat</button>
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
          </>
        )}
      </div>

      <Footer />

      {/* Card Modal */}
      <Modal show={showCardModal} onHide={() => setShowCardModal(false)} centered>
        <Form onSubmit={saveCard}>
          <Modal.Header closeButton>
            <Modal.Title>Add Payment Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234123412341234"
                name="card_number"
                maxLength={16}
                value={newCard.card_number}
                onChange={handleNumericInput}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Holder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                name="card_holder_name"
                value={newCard.card_holder_name}
                onChange={(e) => setNewCard({ ...newCard, card_holder_name: e.target.value })}
                required
              />
            </Form.Group>

            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Month (MM)</Form.Label>
                  <Form.Control
                    type="text"
                    name="exp_month"
                    placeholder="08"
                    maxLength={2}
                    value={newCard.exp_month}
                    onChange={handleNumericInput}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Year (YYYY)</Form.Label>
                  <Form.Control
                    type="text"
                    name="exp_year"
                    placeholder="2028"
                    maxLength={4}
                    value={newCard.exp_year}
                    onChange={handleNumericInput}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                name="cvv"
                placeholder="123"
                maxLength={4}
                value={newCard.cvv}
                onChange={handleNumericInput}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCardModal(false)} disabled={savingCard}>
              Cancel
            </Button>
            <Button type="submit" variant="success" disabled={savingCard}>
              {savingCard ? "Saving..." : "Save Card"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

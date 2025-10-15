// /app/test/page.js
"use client"; // needed if you use hooks like useState or useEffect
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import "./Dashboard.css"; // custom styling
import { useEffect, useState } from "react";
import { getSubscriberByEmail, getAllPlans, createSubscriberAndFetch,storeServiceAddress,createDraftLine } from "../utils/beQuickApi"; // adjust path
import { tokenizationCard,ziftConnectionTest } from "../utils/ziftApi"; // adjust path

export default function TestPage() {
  // const [jsongetSubscriberByEmail, setgetSubscriberByEmail] = useState(null);
  // const [jsongetAllPlans, setgetAllPlans] = useState(null);
  // const [jsoncreateSubscriberAndFetch, setcreateSubscriberAndFetch] = useState(null);
  // const [jsonfetchStoreServiceAddress, setfetchStoreServiceAddress] = useState(null);
  const [jsonfetchTokenizationCard, setfetchtokenizationCard] = useState(null);

  useEffect(() => {
    // async function fetchDatagetSubscriberByEmail() {
    //   const resgetSubscriberByEmail = await getSubscriberByEmail("sumonklyn466@gmail.com");
    //   setgetSubscriberByEmail(resgetSubscriberByEmail);
    // }fetchDatagetSubscriberByEmail();

    // async function fetchDatagetAllPlans() {
    //   const resgetSubscriberByEmail = await getAllPlans();
    //   setgetAllPlans(resgetSubscriberByEmail);
    // }fetchDatagetAllPlans();

    // async function fetchDatacreateSubscriberAndFetch() {
    //   const rescreateSubscriberAndFetch = await createSubscriberAndFetch();
    //   setcreateSubscriberAndFetch(rescreateSubscriberAndFetch);
    // }fetchDatacreateSubscriberAndFetch();

    // function storeServiceAddress($subscriberId, $name, $phoneNumber, $address1, $address2, $city, $stateCode, $zip, $countryCode, $isPrimary): 



    // async function fetchDataStoreServiceAddress() {
    //   const resfetchStoreServiceAddress = await storeServiceAddress(203,'react Sumon','01711446777','4566 TAHOE CIR','','CLERMONT','FL','34714','US',true) ;
    //   setfetchStoreServiceAddress(resfetchStoreServiceAddress);
    // }fetchDataStoreServiceAddress();

    async function fetchDataTokenizationCard() {
      const resfetchtokenizationCard = await ziftConnectionTest() ;
      setfetchtokenizationCard(resfetchtokenizationCard);
    }fetchDataTokenizationCard();
    
  }, []);

  const [showShipping, setShowShipping] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!coupon) {
      alert("Please enter a coupon code");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("zmapi.zoikomobile.co.uk/api/v1/apply-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1, // 🔹 predefined user id
          email: "anowar.euronox@gmail.com", // 🔹 predefined email
          coupon: coupon, // 🔹 dynamic coupon text
        }),
      });

      const data = await response.json();
      console.log("Coupon API Response:", data);

      if (data.success) {
        alert(`Coupon applied! Discount: ${data.discount || 0}%`);
      } else {
        alert(data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      alert("Something went wrong, please try again.");
    }

    setLoading(false);
  };
  return (
    <>
     <TopHeader />
        <Header />
        <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />
     <div className="dashboard-container container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Dashboard</h3>
        <div className="d-flex align-items-center gap-3">
          <select className="form-select form-select-sm w-auto">
            <option>4258303132 (Primary)</option>
          </select>
          <input
            type="text"
            className="form-control form-control-sm search-input"
            placeholder="Search Device"
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="row g-4">
        {/* My Plans & Usage */}
        <div className="col-lg-4 col-md-6">
          <div className="dash-card">
            <h6 className="card-title">My Plans & Usage</h6>
            <p className="text-muted small mb-3">
              See active plans, data use and renewal options
            </p>
            <div className="plan-box mb-3">
              <h6 className="fw-bold mb-1">Zoiko Lite</h6>
              <small className="text-success">Active until Nov 10, 2025</small>
            </div>
            <div className="usage-info mb-3">
              <div className="d-flex justify-content-between small mb-1">
                <span>0 GB Used This Month</span>
                <span>3584 GB Remaining</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-success" style={{ width: "0%" }}></div>
              </div>
              <small className="text-muted d-block mt-1">
                0% used • Renews in 27 days
              </small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm">View Details</button>
              <button className="btn btn-warning btn-sm text-white">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* My Devices & SIMs */}
        <div className="col-lg-4 col-md-6">
          <div className="dash-card">
            <h6 className="card-title">My Devices & SIMs</h6>
            <p className="text-muted small mb-3">
              Activate, pause, or switch your pSIM/eSIM
            </p>

            <div className="device-item mb-3">
              <div>
                <strong>Device 3132</strong>
                <p className="text-muted small mb-0">
                  pSIM • Primary Line (Selected)
                </p>
              </div>
              <span className="badge bg-success">Active</span>
            </div>

            <div className="device-item mb-3">
              <div>
                <strong>Device #77</strong>
                <p className="text-muted small mb-0">
                  pSIM • Secondary Line
                </p>
              </div>
              <span className="badge bg-warning text-dark">Pending</span>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm">Manage SIMs</button>
              <button className="btn btn-outline-success btn-sm">Add Device</button>
            </div>
          </div>
        </div>

        {/* Billing & Payment */}
        <div className="col-lg-4 col-md-6">
          <div className="dash-card">
            <h6 className="card-title">Billing & Payment</h6>
            <p className="text-muted small mb-3">
              Update payment method or view invoices
            </p>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h5 className="fw-bold mb-0">$15.99</h5>
                <small className="text-muted">Current Bill</small>
              </div>
              <div>
                <h6 className="fw-bold mb-0">Nov 09</h6>
                <small className="text-muted">Next Payment</small>
              </div>
            </div>

            <p className="text-muted small mb-2">Payment Method</p>
            <button className="btn btn-outline-success btn-sm mb-3">Add</button>

            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm">Pay Now</button>
              <button className="btn btn-outline-secondary btn-sm">
                View Invoices
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="col-lg-4 col-md-6">
          <div className="dash-card">
            <h6 className="card-title">Account Settings</h6>
            <p className="text-muted small mb-3">
              Manage password, contact info, and security
            </p>
            <p className="small mb-1 fw-bold">Contact Info</p>
            <p className="text-muted small mb-0">info@driverxmobile.com</p>
            <p className="text-muted small mb-3">09836852983</p>
            <p className="small mb-1 fw-bold">Security</p>
            <p className="text-muted small mb-3">
              Two-factor authentication disabled
            </p>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm">
                Edit Profile
              </button>
              <button className="btn btn-outline-success btn-sm">
                Security Settings
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="col-lg-4 col-md-6">
          <div className="dash-card">
            <h6 className="card-title">Order History</h6>
            <p className="text-muted small mb-3">Track previous orders</p>
            <p className="small mb-1 text-muted">Mar 10, 2025</p>
            <p>
              <strong>Order #359 - Zoiko Lite</strong>{" "}
              <span className="text-muted">$15.00</span>
            </p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-success btn-sm">
                View All Orders
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                Track Shipment
              </button>
            </div>
          </div>
        </div>

        {/* Request Support */}
        <div className="col-lg-4 col-md-6">
          <div className="dash-card">
            <h6 className="card-title text-danger">Request Support</h6>
            <p className="text-muted small mb-3">
              Instant access to help with account pre-filled
            </p>
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
              <button className="btn btn-outline-warning btn-sm text-dark">
                Browse Help Center
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
// export default TestPage;
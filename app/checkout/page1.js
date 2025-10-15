"use client";

import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [showShipping, setShowShipping] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountData, setDiscountData] = useState(null); // <-- NEW

  // Load cart from sessionStorage
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].formData.priceQty = (newCart[index].formData.priceQty || 1) + delta;
    if (newCart[index].formData.priceQty < 1) newCart[index].formData.priceQty = 1;
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleClearCart = () => {
    setCart([]);
    sessionStorage.removeItem("cart");
  };

  // -----------------------------
  // Updated Coupon Handler
  // -----------------------------
  const handleApplyCoupon = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      const currentUrl = window.location.href;
      if (confirm("You need to login to apply a coupon. Go to login page?")) {
        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return;
    }

    if (!coupon) {
      alert("Please enter a coupon code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/apply-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.zoiko_token}`, // <-- token used here
        },
        body: JSON.stringify({
          user_id: user.id,
          email: user.email,
          coupon_code: coupon,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDiscountData(data.data); // <-- store full coupon object
        alert(`Coupon applied! Discount: ${data.data.discount} (${data.data.type})`);
      } else {
        setDiscountData(null);
        alert(data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error(error);
      setDiscountData(null);
      alert("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  // -----------------------------
  // Calculate totals
  // -----------------------------
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.planPrice || item.formData.price || 0) * (item.formData.priceQty || 1),
    0
  );

  const shippingFee = 5;

  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;

  const total = subtotal + shippingFee - discountAmount;

  // Prepare final data object
  const prepareFinalData = (item) => ({
    planTitle: item.planTitle,
    planSlug: item.planSlug,
    planId: item.planId,
    planPrice: item.planPrice || item.formData.price,
    planDuration: item.planDuration,
    lineType: item.lineType,
    simType: item.simType,
    formData: item.formData,
  });

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />

      <div className="container my-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-success">
            Checkout <small className="text-muted">Connecting Every Possibility with Zoiko Mobile!</small>
          </h3>
          <div>
            <button className="btn btn-danger me-2" onClick={handleClearCart}>Clear Cart</button>
            <button className="btn btn-outline-primary">+ Continue Shopping</button>
          </div>
        </div>

        <div className="row">
          {/* Left Section */}
          <div className="col-md-7 mb-4">
            {/* Cart Items */}
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div className="card mb-3" key={idx}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="text-danger fw-bold">{item.planTitle}</h5>
                        <small className="text-muted">
                          Line Type: {item.lineType || "N/A"} | SIM Type: {item.simType || "N/A"}
                        </small>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(idx)}>Remove</button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <span className="fw-bold">${item.planPrice || item.formData.price || 13} / {item.planDuration}</span>
                      <div>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantity(idx, -1)}>-</button>
                        <span className="mx-2">{item.formData.priceQty || 1}</span>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantity(idx, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Coupon */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Have a Coupon?</h5>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleApplyCoupon} disabled={loading}>
                    {loading ? "Applying..." : "Apply Coupon"}
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Form */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Service/Billing Details</h5>
                <div className="row g-3">
                  {["First Name", "Last Name", "Company Name", "Region", "State", "City", "Street Address", "Phone", "ZIP Code", "Email", "Create Account Password"].map((label, i) => (
                    <div className={`col-md-6`} key={i}>
                      {label === "Region" || label === "State" ? (
                        <select className="form-select"><option>Select {label}</option></select>
                      ) : (
                        <input className="form-control" type={label.includes("Email") ? "email" : label.includes("Password") ? "password" : "text"} placeholder={label} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Ship to different address toggle */}
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shipDifferent"
                    checked={showShipping}
                    onChange={(e) => setShowShipping(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="shipDifferent">
                    Ship to a different address?
                  </label>
                </div>

                {showShipping && (
                  <div className="mt-4 p-3 border rounded bg-light">
                    <h6 className="fw-bold mb-3 text-primary">Shipping Address</h6>
                    <div className="row g-3">
                      {["First Name", "Last Name", "Street Address", "City", "ZIP Code", "Region", "State", "Phone"].map((label, i) => (
                        <div className="col-md-6" key={i}>
                          {label === "Region" || label === "State" ? (
                            <select className="form-select"><option>Select {label}</option></select>
                          ) : (
                            <input className="form-control" type="text" placeholder={label} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-5">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Your Order</h5>
                {cart.map((item, idx) => {
                  const data = prepareFinalData(item);
                  return (
                    <div key={idx} className="d-flex justify-content-between">
                      <span>{data.planTitle} ({data.simType}) x {(item.formData.priceQty || 1)}</span>
                      <span>${(data.planPrice * (item.formData.priceQty || 1)).toFixed(2)}</span>
                    </div>
                  );
                })}
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Shipping Fee</span>
                  <span>${shippingFee}</span>
                </div>

                {discountData && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount ({discountData.type === "percentage" ? discountData.discount + "%" : "$" + discountData.discount})</span>
                    <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="card">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Payment Method</h5>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="radio" name="paymentMethod" defaultChecked />
                  <label className="form-check-label">Credit Card</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Card Number *</label>
                  <input className="form-control" type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date *</label>
                    <input className="form-control" type="text" placeholder="MM / YY" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">CVC *</label>
                    <input className="form-control" type="text" placeholder="CVC" />
                  </div>
                </div>
                <div className="form-check mt-3 mb-3">
                  <input className="form-check-input" type="checkbox" id="sameAddress" />
                  <label className="form-check-label" htmlFor="sameAddress">Same as Service/Billing Address</label>
                </div>
                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" id="terms" />
                  <label className="form-check-label" htmlFor="terms">I have read and agree to the website terms and conditions.</label>
                </div>
                <button className="btn btn-danger w-100 mt-3">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

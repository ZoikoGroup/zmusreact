"use client";

import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { useEffect, useState } from "react";
import { usStates } from "../utils/usStates";
import { processOrder } from "../utils/beQuickApi"; // adjust path

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [showShipping, setShowShipping] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountData, setDiscountData] = useState(null);
  const [couponMessage, setCouponMessage] = useState(""); // Coupon feedback
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const billingFieldMeta = {
    firstName: { label: "First Name", placeholder: "Enter your first name" },
    lastName: { label: "Last Name", placeholder: "Enter your last name" },
    companyName: { label: "Company Name", placeholder: "Enter your company name (optional)" },
    region: { label: "Country / Region", placeholder: "United States (US)", disabled: true },
    state: { label: "State", placeholder: "Enter your state" },
    city: { label: "City", placeholder: "Enter your city" },
    street: { label: "Street Address", placeholder: "Enter your street address" },
    houseNumber: { label: "Apartment, suite, unit, etc. (optional)", placeholder: "Apartment or suite" },
    zip: { label: "ZIP Code", placeholder: "Enter your ZIP code" },
    phone: { label: "Phone Number", placeholder: "Enter your phone number" },
    email: { label: "Email Address", placeholder: "Enter your email address" },
  };
  
  const [billingAddress, setBillingAddress] = useState({
    firstName : "",
      lastName : "",
      companyName :"",
      region :"United States (US)",
      state : "",
      city : "",
      street: "",
      houseNumber : "",      
      zip : "",      
      phone : "",
      email : "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName : "",
      lastName : "",
      companyName :"",
      region :"United States (US)",
      state : "",
      city : "",
      street: "",
      houseNumber : "",      
      zip : "",      
      phone : "",
      email : "",
  });

  const [cardAddress, setCardAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    region: "United States (US)",
    phone: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const handleSameAsBilling = (checked) => {
    setSameAsBilling(checked);
    if (checked) {
      setCardAddress((prev) => ({
        ...prev,
        firstName: billingAddress.firstName || "",
        lastName: billingAddress.lastName || "",
        street: billingAddress.street || "",
        city: billingAddress.city || "",
        state: billingAddress.state || "",
        zip: billingAddress.zip || "",
        country: billingAddress.region || "United States (US)",
        phone: billingAddress.phone || "",
      }));
    } else {
      setCardAddress({
      firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "United States (US)",
        phone: "",
      });
    }
  };

  // Load cart & check login
  useEffect(() => {
    try {
      const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      setCart(storedCart);
      if (typeof window !== "undefined" && localStorage.getItem("zoiko_token")) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Failed to parse cart from sessionStorage", err);
      setCart([]);
    }
  }, []);

  const handleQuantity = (index, delta) => {
    const newCart = [...cart];
    const curQty = Number(newCart[index].formData?.priceQty || 1);
    newCart[index].formData = {
      ...newCart[index].formData,
      priceQty: Math.max(1, curQty + delta),
    };
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

  // ---------------- Coupon Functionality ----------------
  const handleApplyCoupon = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    if (!coupon) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    setLoading(true);
    setCouponMessage("");
    try {
      const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/apply-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.zoiko_token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          email: user.email,
          coupon_code: coupon,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDiscountData(data.data);
        setCouponMessage(`Coupon applied! Discount: ${data.data.discount} (${data.data.type})`);
      } else {
        setDiscountData(null);
        setCouponMessage(data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error(error);
      setDiscountData(null);
      setCouponMessage("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  const handleCancelCoupon = () => {
    setCoupon("");
    setDiscountData(null);
    setCouponMessage("Coupon cancelled.");
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.planPrice ?? item.formData?.price ?? 0);
    const qty = Number(item.formData?.priceQty ?? 1);
    return acc + price * qty;
  }, 0);

  const shippingFee = 5;

  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;

  const total = Math.max(subtotal + shippingFee - discountAmount, shippingFee); // Total cannot be less than shipping

  const prepareFinalData = (item) => ({
    planTitle: item.planTitle,
    planSlug: item.planSlug,
    planId: item.planId,
    planPrice: Number(item.planPrice ?? item.formData?.price ?? 0),
    planDuration: item.planDuration,
    lineType: item.lineType,
    simType: item.simType,
    formData: item.formData,
  });
const handlePlaceOrder = async() => {
  if (!agreeTerms) {
    setShowTermsPopup(true);
    return;
  }

  // Define required fields per section
  const billingRequired = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"];
  const shippingRequired = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"];
  const cardRequired = ["firstName", "lastName", "state", "city", "zip", "phone"];

  const checkMissing = (data, required, label) => {
    const missing = required.filter((key) => !data[key]?.trim());
    if (missing.length > 0) {
      alert(`Please fill all required ${label} fields:\n${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  // ✅ Validate all sections
  if (!checkMissing(billingAddress, billingRequired, "Billing Address")) return;
  if (showShipping && !checkMissing(shippingAddress, shippingRequired, "Shipping Address")) return;
  if (!checkMissing(cardAddress, cardRequired, "Card Address")) return;

  // ✅ Prepare formatted product data
  const products = cart.map((item) => ({
    id: item.planId,
    title: item.planTitle,
    slug: item.planSlug,
    duration: item.planDuration,
    lineType: item.lineType,
    simType: item.simType,
    quantity: Number(item.formData?.priceQty ?? 1),
    pricePerUnit: Number(item.planPrice ?? item.formData?.price ?? 0),
    totalPrice: Number(item.planPrice ?? item.formData?.price ?? 0) * Number(item.formData?.priceQty ?? 1),
  }));

  // ✅ Calculate totals
  const subtotal = products.reduce((sum, p) => sum + p.totalPrice, 0);
  const shippingFee = 5;
  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;
  const total = Math.max(subtotal + shippingFee - discountAmount, shippingFee);

  // ✅ Collect full order data
  const orderData = {
    billingAddress,
    shippingAddress: showShipping ? shippingAddress : billingAddress,
    cardAddress,
    coupon: discountData ? { ...discountData } : null,
    cart,
    totals: {
      subtotal,
      shipping: shippingFee,
      discount: discountAmount,
      total,
    },
    agreedToTerms: agreeTerms,
    createdAt: new Date().toISOString(),
  };


 try {
    setLoading(true);

    const response = await processOrder(orderData); // 🔥 Pass full order data

    setLoading(false);

    if (response?.success) {
      alert("✅ Order placed successfully!");
      console.log("🧾 Server Response:", response);
  // ✅ Example: Print formatted order JSON
    console.log("🧾 Final Order JSON:", orderData);
    alert("Order data collected! Check console for JSON output.");
      // Clear cart after successful order
      setCart([]);
      sessionStorage.removeItem("cart");
    } else {
      alert("⚠️ Failed to place order. Please try again.");
      console.error("ProcessOrder error:", response);
    }
  } catch (error) {
    setLoading(false);
    console.error("❌ processOrder() failed:", error);
    alert("Something went wrong while processing your order.");
  }

  

  // ✅ (Optional) Send to backend API
  // fetch("https://yourapi.com/orders", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(orderData),
  // });
};

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />

      {/* Cart JSON Preview */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Cart JSON Data</h5>
          <pre style={{ background: "#f8f9fa", padding: "12px", borderRadius: "6px", maxHeight: "400px", overflow: "auto" }}>
            {JSON.stringify(cart, null, 2)}
          </pre>
        </div>
      </div>

      <div className="container my-5">
        {cart.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "60vh" }}>
            <img src="/images/empty-cart.png" alt="Empty Cart" style={{ width: "180px", opacity: 0.8 }} onError={(e) => (e.target.style.display = "none")} />
            <h3 className="mt-3 text-secondary">Your Cart is Empty</h3>
            <p className="text-muted">Looks like you haven’t added anything to your cart yet.</p>
            <a href="/" className="btn btn-primary mt-2">Continue Shopping</a>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-success">
                Checkout <small className="text-muted">Connecting Every Possibility with Zoiko Mobile!</small>
              </h3>
              <div>
                <button className="btn btn-danger me-2" onClick={handleClearCart}>Clear Cart</button>
                <a href="/" className="btn btn-outline-primary">+ Continue Shopping</a>
              </div>
            </div>

            <div className="row">
              {/* Left Side - Cart & Form */}
              <div className="col-md-7 mb-4">
                {cart.map((item, idx) => (
                  <div className="card mb-3" key={idx}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="text-danger fw-bold">{item.planTitle}</h5>
                          <small className="text-muted">Line Type: {item.lineType || "N/A"} | SIM Type: {item.simType || "N/A"} {item.planBqid}{item.planType}</small>
                        </div>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(idx)}>Remove</button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <span className="fw-bold">
                          ${(Number(item.planPrice ?? item.formData?.price ?? 0)).toFixed(2)} / {item.planDuration}
                        </span>
                        <div>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantity(idx, -1)}>-</button>
                          <span className="mx-2">{item.formData?.priceQty ?? 1}</span>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantity(idx, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Section */}
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
                      {discountData && (
                        <button className="btn btn-outline-danger ms-2" onClick={handleCancelCoupon}>
                          Cancel Coupon
                        </button>
                      )}
                    </div>
                    {couponMessage && <p className={`mt-2 ${discountData ? "text-success" : "text-danger"}`}>{couponMessage}</p>}
                    {!isLoggedIn && <p className="text-danger mt-2 small">You need to login to apply coupon.</p>}
                  </div>
                </div>

                {/* Billing Form */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">Service/Billing Details</h5>
                        <div className="row g-3">
                          {Object.keys(billingAddress).map((key, i) => {
                            const meta = billingFieldMeta[key] || {};
                            return (
                              <div className="col-md-6" key={i}>
                                <label className="form-label fw-semibold">
  {meta.label || key.replace(/([A-Z])/g, " $1")}
  {["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"].includes(key) && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

                                {key === "state" ? (
                                  <select
                                    className="form-select"
                                    value={billingAddress.state}
                                    onChange={(e) =>
                                      setBillingAddress({ ...billingAddress, state: e.target.value })
                                    }
                                  >
                                    {usStates.map((s) => (
                                      <option key={s.code} value={s.code}>
                                        {s.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={meta.placeholder || `Enter ${key}`}
                                    value={billingAddress[key]}
                                    disabled={meta.disabled || false}
                                    onChange={(e) =>
                                      setBillingAddress({ ...billingAddress, [key]: e.target.value })
                                    }
                                  />
                                )}
                              </div>
                            );
                          })}
                        
                      </div>
                    </div>
                  </div>


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
                        {Object.keys(shippingAddress).map((key, i) => {
                            const meta = billingFieldMeta[key] || {};
                            return (
                              <div className="col-md-6" key={i}>
                                <label className="form-label fw-semibold">
  {meta.label || key.replace(/([A-Z])/g, " $1")}
  {["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"].includes(key) && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

                                {key === "state" ? (
                                  <select
                                    className="form-select"
                                    value={shippingAddress.state}
                                    onChange={(e) =>
                                      setShippingAddress({ ...shippingAddress, state: e.target.value })
                                    }
                                  >
                                    {usStates.map((s) => (
                                      <option key={s.code} value={s.code}>
                                        {s.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={meta.placeholder || `Enter ${key}`}
                                    value={shippingAddress[key]}
                                    disabled={meta.disabled || false}
                                    onChange={(e) =>
                                      setShippingAddress({ ...shippingAddress, [key]: e.target.value })
                                    }
                                  />
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="col-md-5">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Your Order</h5>
                  {cart.map((item, idx) => {
                    const data = prepareFinalData(item);
                    return (
                      <div key={idx} className="d-flex justify-content-between">
                        <span>{data.planTitle} ({data.simType}) x {(item.formData?.priceQty || 1)}</span>
                        <span>${(data.planPrice * (item.formData?.priceQty || 1)).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Shipping Fee</span>
                    <span>${shippingFee.toFixed(2)}</span>
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

              {/* Payment Section */}
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
                    <div className="card mt-4">
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">Credit Card Address</h5>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="sameAsBilling"
                            checked={sameAsBilling}
                            onChange={(e) => handleSameAsBilling(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="sameAsBilling">
                            Same as Service/Billing Address
                          </label>
                        </div>

                        <div className="row g-3">
                          {Object.keys(cardAddress).map((key, i) => {
                            const meta = billingFieldMeta[key] || {};
                            return (
                              <div className="col-md-6" key={i}>
                                <label className="form-label fw-semibold">
  {meta.label || key.replace(/([A-Z])/g, " $1")}
  {["firstName", "lastName", "state", "city", "zip", "phone"].includes(key) && (
  <span className="text-danger ms-1">*</span>
)}
</label>

                                {key === "state" ? (
                                  <select
                                    className="form-select"
                                    value={cardAddress.state}
                                    onChange={(e) =>
                                      setCardAddress({ ...cardAddress, state: e.target.value })
                                    }
                                  >
                                    {usStates.map((s) => (
                                      <option key={s.code} value={s.code}>
                                        {s.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={meta.placeholder || `Enter ${key}`}
                                    value={cardAddress[key]}
                                    disabled={meta.disabled || false}
                                    onChange={(e) =>
                                      setCardAddress({ ...cardAddress, [key]: e.target.value })
                                    }
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    </div>
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />

                      <label className="form-check-label" htmlFor="terms">
                        I have read and agree to the website terms and conditions.
                      </label>
                    </div>
                    <button className="btn btn-danger w-100 mt-3" onClick={handlePlaceOrder}>Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />

      {/* Login Required Popup */}
      {showLoginPopup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card" style={{ maxWidth: 500, width: "90%" }}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Login Required</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowLoginPopup(false)}>Close</button>
              </div>
              <div className="card-body text-center">
                <p>You need to login to apply your coupon code.</p>
                <a
                  className="btn btn-primary"
                  href={`/login?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "/")}`}
                >
                  Go to Login
                </a>
                <div className="mt-3">
                  <button className="btn btn-link" onClick={() => setShowLoginPopup(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTermsPopup && (
  <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}>
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card text-center p-3" style={{ maxWidth: 400, width: "90%" }}>
        <h5 className="text-danger fw-bold mb-3">Terms & Conditions Required</h5>
        <p className="text-muted">You must agree to the website terms and conditions before placing your order.</p>
        <button className="btn btn-primary w-100" onClick={() => setShowTermsPopup(false)}>
          OK
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

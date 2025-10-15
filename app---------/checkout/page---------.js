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
  const [discountData, setDiscountData] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States (US)",
    phone: "",
  });

  const [cardAddress, setCardAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States (US)",
    phone: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const handleSameAsBilling = (checked) => {
    setSameAsBilling(checked);
    if (checked) {
      setCardAddress({ ...billingAddress });
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

  // Load cart and login info
  useEffect(() => {
    try {
      const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      setCart(storedCart);
      if (typeof window !== "undefined" && localStorage.getItem("zoiko_token")) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Failed to parse cart", err);
      setCart([]);
    }
  }, []);

  // Quantity, remove, clear
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

  // Apply coupon
  const handleApplyCoupon = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      setShowLoginPopup(true);
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

  const total = subtotal + shippingFee - discountAmount;

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

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />

      <div className="container my-5">
        {cart.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "60vh" }}>
            <img src="/images/empty-cart.png" alt="Empty Cart" style={{ width: "180px", opacity: 0.8 }} onError={(e) => (e.target.style.display = "none")} />
            <h3 className="mt-3 text-secondary">Your Cart is Empty</h3>
            <p className="text-muted">Looks like you haven’t added anything to your cart yet.</p>
            <a href="/plans" className="btn btn-primary mt-2">Continue Shopping</a>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-success">
                Checkout <small className="text-muted">Connecting Every Possibility with Zoiko Mobile!</small>
              </h3>
              <div>
                <button className="btn btn-danger me-2" onClick={handleClearCart}>Clear Cart</button>
                <a href="/plans" className="btn btn-outline-primary">+ Continue Shopping</a>
              </div>
            </div>

            <div className="row">
              {/* Left Side */}
              <div className="col-md-7 mb-4">
                {/* Cart Items */}
                {cart.map((item, idx) => (
                  <div className="card mb-3" key={idx}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="text-danger fw-bold">{item.planTitle}</h5>
                          <small className="text-muted">Line Type: {item.lineType || "N/A"} | SIM Type: {item.simType || "N/A"}</small>
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
                      <input type="text" className="form-control" placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                      <button className="btn btn-primary" onClick={handleApplyCoupon} disabled={loading}>
                        {loading ? "Applying..." : "Apply Coupon"}
                      </button>
                    </div>
                    {!isLoggedIn && <p className="text-danger mt-2 small">You need to login to apply coupon.</p>}
                  </div>
                </div>

                {/* Billing Form */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Service/Billing Details</h5>
                    <div className="row g-3">
                      {Object.keys(billingAddress).map((key, i) => (
                        <div className="col-md-6" key={i}>
                          <input type="text" className="form-control" placeholder={key.replace(/([A-Z])/g, " $1")} value={billingAddress[key]} onChange={(e) => setBillingAddress({ ...billingAddress, [key]: e.target.value })} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shipping form toggle */}
                <div className="form-check mt-3 mb-3">
                  <input className="form-check-input" type="checkbox" id="shipDifferent" checked={showShipping} onChange={(e) => setShowShipping(e.target.checked)} />
                  <label className="form-check-label" htmlFor="shipDifferent">Ship to a different address?</label>
                </div>

                {showShipping && (
                  <div className="mt-4 p-3 border rounded bg-light">
                    <h6 className="fw-bold mb-3 text-primary">Shipping Address</h6>
                    <div className="row g-3">
                      {["First Name","Last Name","Street Address","City","ZIP Code","Region","State","Phone"].map((label,i)=>(
                        <div className="col-md-6" key={i}>
                          {label==="Region"||label==="State"?<select className="form-select"><option>Select {label}</option></select>:<input className="form-control" type="text" placeholder={label} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side */}
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
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

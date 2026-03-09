"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { useEffect, useState } from "react";
import { usStates } from "../utils/usStates";
import { processOrderZift } from "../utils/beQuickApi";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import {
  Phone,
  PhoneFill,
  PhoneVibrate,
  PhoneLandscape,
} from "react-bootstrap-icons";

import { useRef } from "react";

import { processOrderStripe } from "../utils/beQuickStripeWebPaymentApi";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "../components/StripePaymentForm";

// ─── STEP 2: Set your activation fee amount here ───────────────────────────
const ACTIVATION_FEE_PER_ESIM = 13.99;

export default function CheckoutPage() {
  const [shippingFee, setShippingFee] = useState(0);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const [paymentMethod, setPaymentMethod] = useState("zift");
  const [clientSecret, setClientSecret] = useState("");
  const stripeFormRef = useRef(null);

  const shippingOptions = [
    { label: "Standard (3-5 Days)", value: 9.99 },
    { label: "Expedited (2-3 Days)", value: 14.99 },
    { label: "Overnight", value: 24.99 },
  ];

  const [showThankYou, setShowThankYou] = useState(false);
  const [cart, setCart] = useState([]);
  const [showShipping, setShowShipping] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountData, setDiscountData] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption] = useState(shippingOptions[0]);

  const [errors, setErrors] = useState({
    billingEmail: "",
    billingPhone: "",
    shippingEmail: "",
    shippingPhone: "",
    billingFirstName: "",
    billingLastName: "",
    billingState: "",
    billingCity: "",
    billingHouseNumber: "",
    billingZip: "",
    shippingFirstName: "",
    shippingLastName: "",
    shippingState: "",
    shippingCity: "",
    shippingHouseNumber: "",
    shippingZip: "",
    cardFirstName: "",
    cardLastName: "",
    cardState: "",
    cardCity: "",
    cardZip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const billingFieldMeta = {
    firstName: { label: "First Name", placeholder: "Enter your first name" },
    lastName: { label: "Last Name", placeholder: "Enter your last name" },
    companyName: { label: "Company Name", placeholder: "Enter your company name (optional)" },
    region: { label: "Country / Region", placeholder: "United States (US)", disabled: true },
    state: { label: "State", placeholder: "Enter your state" },
    city: { label: "City", placeholder: "Enter your city" },
    street: { label: "Street Address", placeholder: "Enter your street address" },
    houseNumber: { label: "Apartment, suite, unit, etc.", placeholder: "Apartment or suite" },
    zip: { label: "ZIP Code", placeholder: "Enter your ZIP code" },
    phone: { label: "Phone Number", placeholder: "Enter your phone number" },
    email: { label: "Email Address", placeholder: "Enter your email address" },
  };

  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    region: "United States (US)",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    region: "United States (US)",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
    email: "",
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

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
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
        region: billingAddress.region || "United States (US)",
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
        region: "United States (US)",
        phone: "",
      });
    }
  };

  // Load cart & check login
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log(storedCart);
      const normalized = (storedCart || []).map((item) => {
        if (item && (item.planId || item.planTitle)) return item;

        const numericPrice = (() => {
          if (!item) return 0;
          if (typeof item.price === "number") return item.price;
          if (typeof item.price === "string") {
            const n = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            return Number.isFinite(n) ? n : 0;
          }
          return 0;
        })();

        return {
          planId: item.id || item.planId || null,
          planSlug: item.slug || item.planSlug || null,
          planTitle: item.name || item.planTitle || item.title || item.slug || "",
          planPrice: numericPrice,
          planDuration: item.planDuration || "1",
          lineType: item.lineType || "device",
          simType: item.simType || "N/A",
          formData: {
            priceQty: item.qty || (item.formData && item.formData.priceQty) || 1,
            price: (item.formData && item.formData.price) || numericPrice,
          },
          _raw: item,
        };
      });

      setCart(normalized);
      if (typeof window !== "undefined" && localStorage.getItem("zoiko_token")) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
      setCart([]);
    }
  }, []);

  // ─── STEP 1: Show shipping if any item is a device OR has pSIM ─────────────
  const hasShippingItem = cart.some(
    (item) => item.type === "device" || item.simType === "pSIM"
  );

  // ─── STEP 2: Count prepaid eSIM items for activation fee ───────────────────
  const prepaidEsimItems = cart.filter(
    (item) => item.planType === "prepaid-plans"
  );
  const activationFeeTotal = prepaidEsimItems.reduce((acc, item) => {
  const qty = Number(item.formData?.priceQty ?? item.qty ?? 1);
  return acc + ACTIVATION_FEE_PER_ESIM * qty;
}, 0);

  const handleQuantity = (index, delta) => {
    const newCart = [...cart];
    const curQty = Number(newCart[index].formData?.priceQty || 1);
    newCart[index].formData = {
      ...newCart[index].formData,
      priceQty: Math.max(1, curQty + delta),
    };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

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
          Authorization: `Bearer ${user.zoiko_token}`,
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
        let num = parseFloat(data.data.discount);
        const cleanDiscount = Number.isInteger(num) ? num.toString() : num.toFixed(2);
        const discountText =
          data.data.type === "percentage" ? `${cleanDiscount}%` : `${cleanDiscount} flat`;
        setCouponMessage(`Coupon applied! Discount: ${discountText}`);
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

  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;

  // ─── STEP 3: Update shippingFee based on hasShippingItem ──────────────────
  useEffect(() => {
    if (hasShippingItem && selectedShippingOption) {
      setShippingFee(selectedShippingOption.value);
    } else {
      setShippingFee(0);
    }
  }, [selectedShippingOption, hasShippingItem]);

  // ─── STEP 4: Add activationFeeTotal into total ────────────────────────────
  const total = Math.max(subtotal + shippingFee + activationFeeTotal - discountAmount, 0);

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

  // Create payment intent when total changes
  useEffect(() => {
    if (total > 0 && cart.length > 0) {
      const createPaymentIntent = async () => {
        try {
          const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Math.round(total * 100),
              currency: "usd",
              metadata: {
                cartItems: cart.length,
                subtotal: subtotal.toFixed(2),
                shipping: shippingFee.toFixed(2),
                activationFee: activationFeeTotal.toFixed(2),
                discount: discountAmount.toFixed(2),
              },
            }),
          });

          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        } catch (error) {
          console.error("Failed to create payment intent:", error);
        }
      };

      createPaymentIntent();
    }
  }, [total, cart.length]);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    newErrors.billingFirstName = billingAddress.firstName ? "" : "First name is required";
    newErrors.billingLastName = billingAddress.lastName ? "" : "Last name is required";
    newErrors.billingState = billingAddress.state ? "" : "State is required";
    newErrors.billingCity = billingAddress.city ? "" : "City is required";
    newErrors.billingHouseNumber = billingAddress.houseNumber ? "" : "House number is required";
    newErrors.billingZip = billingAddress.zip ? "" : "ZIP code is required";
    newErrors.billingEmail = emailRegex.test(billingAddress.email) ? "" : "Invalid email address";
    newErrors.billingPhone = phoneRegex.test(billingAddress.phone) ? "" : "Invalid phone number";

    if (showShipping) {
      newErrors.shippingFirstName = shippingAddress.firstName ? "" : "First name is required";
      newErrors.shippingLastName = shippingAddress.lastName ? "" : "Last name is required";
      newErrors.shippingState = shippingAddress.state ? "" : "State is required";
      newErrors.shippingCity = shippingAddress.city ? "" : "City is required";
      newErrors.shippingHouseNumber = shippingAddress.houseNumber ? "" : "House number is required";
      newErrors.shippingZip = shippingAddress.zip ? "" : "ZIP code is required";
      newErrors.shippingEmail = emailRegex.test(shippingAddress.email) ? "" : "Invalid email address";
      newErrors.shippingPhone = phoneRegex.test(shippingAddress.phone) ? "" : "Invalid phone number";
    } else {
      newErrors.shippingFirstName = "";
      newErrors.shippingLastName = "";
      newErrors.shippingState = "";
      newErrors.shippingCity = "";
      newErrors.shippingHouseNumber = "";
      newErrors.shippingZip = "";
      newErrors.shippingEmail = "";
      newErrors.shippingPhone = "";
    }

    newErrors.cardFirstName = cardAddress.firstName ? "" : "First name is required";
    newErrors.cardLastName = cardAddress.lastName ? "" : "Last name is required";
    newErrors.cardState = cardAddress.state ? "" : "State is required";
    newErrors.cardCity = cardAddress.city ? "" : "City is required";
    newErrors.cardZip = cardAddress.zip ? "" : "ZIP code is required";

    const cardNumberRegex = /^[0-9]{13,19}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/;
    const cvcRegex = /^[0-9]{3,4}$/;

    newErrors.cardNumber = cardNumberRegex.test(cardDetails.cardNumber.replace(/\s+/g, ""))
      ? ""
      : "Invalid card number";

    const cleanExpiry = cardDetails.expiry.replace(/\s+/g, "");
    newErrors.cardExpiry = expiryRegex.test(cleanExpiry) ? "" : "Invalid expiry format (MM/YY)";
    newErrors.cardCvc = cvcRegex.test(cardDetails.cvc.trim()) ? "" : "Invalid CVC code";

    const allKeys = Object.keys(errors);
    allKeys.forEach((k) => {
      if (typeof newErrors[k] === "undefined") newErrors[k] = "";
    });

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err && err.length);
  };

  const validateFieldsStripe = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    newErrors.billingFirstName = billingAddress.firstName ? "" : "First name is required";
    newErrors.billingLastName = billingAddress.lastName ? "" : "Last name is required";
    newErrors.billingState = billingAddress.state ? "" : "State is required";
    newErrors.billingCity = billingAddress.city ? "" : "City is required";
    newErrors.billingHouseNumber = billingAddress.houseNumber ? "" : "House number is required";
    newErrors.billingZip = billingAddress.zip ? "" : "ZIP code is required";
    newErrors.billingEmail = emailRegex.test(billingAddress.email) ? "" : "Invalid email address";
    newErrors.billingPhone = phoneRegex.test(billingAddress.phone) ? "" : "Invalid phone number";

    if (showShipping) {
      newErrors.shippingFirstName = shippingAddress.firstName ? "" : "First name is required";
      newErrors.shippingLastName = shippingAddress.lastName ? "" : "Last name is required";
      newErrors.shippingState = shippingAddress.state ? "" : "State is required";
      newErrors.shippingCity = shippingAddress.city ? "" : "City is required";
      newErrors.shippingHouseNumber = shippingAddress.houseNumber ? "" : "House number is required";
      newErrors.shippingZip = shippingAddress.zip ? "" : "ZIP code is required";
      newErrors.shippingEmail = emailRegex.test(shippingAddress.email) ? "" : "Invalid email address";
      newErrors.shippingPhone = phoneRegex.test(shippingAddress.phone) ? "" : "Invalid phone number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err && err.length);
  };

  const handlePlaceOrderZift = async () => {
    if (!agreeTerms) {
      setShowTermsPopup(true);
      return;
    }
    if (!validateFields()) return;

    const billingRequired = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"];
    const shippingRequired = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"];
    const cardRequired = ["firstName", "lastName", "state", "city", "zip", "phone"];

    const checkMissing = (data, required, label) => {
      const missing = required.filter((key) => !data[key]?.toString().trim());
      if (missing.length > 0) {
        alert(`Please fill all required ${label} fields:\n${missing.join(", ")}`);
        return false;
      }
      return true;
    };

    if (!checkMissing(billingAddress, billingRequired, "Billing Address")) return;
    if (showShipping && !checkMissing(shippingAddress, shippingRequired, "Shipping Address")) return;
    if (!checkMissing(cardAddress, cardRequired, "Card Address")) return;

    const products = cart.map((item) => ({
      id: item.planId,
      title: item.planTitle,
      slug: item.planSlug,
      duration: item.planDuration,
      lineType: item.lineType,
      simType: item.simType,
      quantity: Number(item.formData?.priceQty ?? 1),
      pricePerUnit: Number(item.planPrice ?? item.formData?.price ?? 0),
      totalPrice:
        Number(item.planPrice ?? item.formData?.price ?? 0) * Number(item.formData?.priceQty ?? 1),
    }));

    const subtotalLocal = products.reduce((sum, p) => sum + p.totalPrice, 0);

    const discountAmountLocal = discountData
      ? discountData.type === "percentage"
        ? (subtotalLocal * Number(discountData.discount)) / 100
        : Number(discountData.discount)
      : 0;

    // ─── STEP 3 (order): Use hasShippingItem for shipping fee ─────────────
    const shippingFeeLocal = hasShippingItem ? selectedShippingOption.value : 0;

    // ─── STEP 4 (order): Include activation fee in total ──────────────────
    const activationFeesLocal =
      cart.filter((item) => item.planType === "prepaid-plans" && item.simType === "eSIM").length *
      ACTIVATION_FEE_PER_ESIM;

    const totalLocal = Math.max(
      subtotalLocal + shippingFeeLocal + activationFeesLocal - discountAmountLocal,
      0
    );

    const orderData = {
      billingAddress,
      shippingAddress: showShipping ? shippingAddress : billingAddress,
      shippingOption: hasShippingItem ? { ...selectedShippingOption } : null,
      cardAddress: { ...cardAddress },
      cardDetails: { ...cardDetails },
      coupon: discountData ? { ...discountData } : null,
      cart,
      totals: {
        subtotal: subtotalLocal,
        shipping: shippingFeeLocal,
        activationFee: activationFeesLocal,
        discount: discountAmountLocal,
        total: totalLocal,
      },
      agreedToTerms: agreeTerms,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await processOrderZift(orderData);
      console.log("processOrder response:", orderData);

      const bequickPayload = response && response.data ? response.data : response;

      try {
        const bqResponse = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/bqorders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bequickPayload),
        });
        const bqResult = await bqResponse.json();
        console.log("Internal bqorders response:", bqResult);
        if (!bqResponse.ok) {
          console.warn("Saving BeQuick response to internal API returned non-OK status", bqResult);
        }
      } catch (err) {
        console.error("Failed to save BeQuick response to internal API:", err);
      }

      const success =
        (response && (response.status === true || response.status === "success" || response.status === 1)) ||
        (response && response.success === true) ||
        (response && response.data && (response.data.success === true || response.data.status === "success"));

      if (success) {
        setShowThankYou(true);
        setCart([]);
        localStorage.removeItem("cart");
      } else {
        const msg =
          (response && response.message) ||
          (response && response.data && response.data.message) ||
          "Failed to place order. Please check details or try again.";
        alert(msg);
      }
    } catch (error) {
      console.error("❌ processOrder() failed:", error);
      alert("Something went wrong while processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrderStripe = async () => {
    if (!agreeTerms) {
      setShowTermsPopup(true);
      return;
    }
    if (!validateFieldsStripe()) {
      alert("Please fill all required fields correctly");
      return;
    }

    try {
      setLoading(true);

      if (stripeFormRef.current) {
        const paymentResult = await stripeFormRef.current.submitPayment();
        if (!paymentResult.success) {
          alert(paymentResult.error || "Payment failed");
          return;
        }
      }

      const products = cart.map((item) => ({
        id: item.planId,
        title: item.planTitle,
        slug: item.planSlug,
        duration: item.planDuration,
        lineType: item.lineType,
        simType: item.simType,
        quantity: Number(item.formData?.priceQty ?? 1),
        pricePerUnit: Number(item.planPrice ?? item.formData?.price ?? 0),
        totalPrice:
          Number(item.planPrice ?? item.formData?.price ?? 0) * Number(item.formData?.priceQty ?? 1),
      }));

      const orderData = {
        billingAddress,
        shippingAddress: showShipping ? shippingAddress : billingAddress,
        shippingOption: hasShippingItem ? { ...selectedShippingOption } : null,
        coupon: discountData ? { ...discountData } : null,
        cart,
        totals: {
          subtotal,
          shipping: shippingFee,
          activationFee: activationFeeTotal,
          discount: discountAmount,
          total,
        },
        agreedToTerms: agreeTerms,
        paymentMethod: "stripe",
        createdAt: new Date().toISOString(),
      };

      const response = await processOrderStripe(orderData);
      const bequickPayload = response && response.data ? response.data : response;
      console.log("processOrder response:", bequickPayload);

      await fetch("https://zmapi.zoikomobile.co.uk/api/v1/bqorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bequickPayload),
      });

      setShowThankYou(true);
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("❌ Order processing failed:", error);
      alert("Something went wrong while processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDiscount = (value) => {
    const num = parseFloat(value);
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  const appearance = {
    theme: "stripe",
    variables: { colorPrimary: "#dc3545" },
  };

  return (
    <>
      <Header />
      <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />

      <div className="container my-5">
        {cart.length === 0 ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{ minHeight: "60vh" }}
          >
            <img
              src="/img/empty-cart.png"
              alt="Empty Cart"
              style={{ width: "180px", opacity: 0.8 }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <h3 className="mt-3 text-secondary">Your cart is empty</h3>
            <p className="text-muted">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Container className="py-4">
              <Row className="g-3">
                <Col md={3} sm={6} xs={12}>
                  <Button
                    className="w-100 py-3 fw-semibold rounded-3 border-0 text-white"
                    style={{ background: "#DF1E5A" }}
                    href="/prepaid-plans"
                  >
                    <Phone className="me-2" />
                    Prepaid plans
                  </Button>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <Button
                    className="w-100 py-3 fw-semibold rounded-3 border-0 text-white"
                    style={{ background: "#DF1E5A" }}
                    href="/postpaid-plans"
                  >
                    <PhoneFill className="me-2" />
                    Postpaid plans
                  </Button>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <Button
                    className="w-100 py-3 fw-semibold rounded-3 border-0 text-white"
                    style={{ background: "#DF1E5A" }}
                    href="/business-deals"
                  >
                    <PhoneVibrate className="me-2" />
                    Business Deals
                  </Button>
                </Col>
                <Col md={3} sm={6} xs={12}>
                  <Button
                    className="w-100 py-3 fw-semibold rounded-3 border-0 text-white"
                    style={{ background: "#DF1E5A" }}
                    href="/travel-plans"
                  >
                    <PhoneLandscape className="me-2" />
                    Travel Plans
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <>
            <style>{`
              .btn-red { color: #fff; background-color: #dc3545; }
              .btn-red:hover { color: #fff; background-color: #dc3545; }
              .form-check-input:checked { background-color: #dc3545; border-color: #dc3545; }
            `}</style>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-danger">
                Checkout{" "}
                <small className="text-muted">
                  Connecting Every Possibility with Zoiko Mobile!
                </small>
              </h3>
              <div>
                <button
                  className="btn btn-danger me-2"
                  onClick={handleClearCart}
                  disabled={loading}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="row">
              {/* Left Side */}
              <div className="col-md-7 mb-4">
                {cart.map((item, idx) => (
                  <div className="card mb-3" key={idx}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="text-danger fw-bold">{item.planTitle}</h5>
                          <small className="text-muted">
                            Line Type: {item.lineType || "N/A"} | SIM Type:{" "}
                            {item.simType || "N/A"}
                          </small>
                          {/* ─── Show activation fee badge for prepaid eSIM items ─── */}
                          {item.planType === "prepaid-plans" && (
                            <div className="mt-1">
                              <span className="badge bg-warning text-dark">
                                + ${ACTIVATION_FEE_PER_ESIM.toFixed(2)} Activation Fee
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemove(idx)}
                          disabled={loading}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <span className="fw-bold">
                          ${Number(item.planPrice ?? item.formData?.price ?? 0).toFixed(2)} /{" "}
                          {item.planDuration}
                        </span>
                        <div>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantity(idx, -1)}
                            disabled={loading}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.formData?.priceQty ?? 1}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantity(idx, 1)}
                            disabled={loading}
                          >
                            +
                          </button>
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
                        disabled={loading}
                      />
                      <button
                        className="btn btn-red"
                        onClick={handleApplyCoupon}
                        disabled={loading}
                      >
                        {loading ? "Applying..." : "Apply Coupon"}
                      </button>
                      {discountData && (
                        <button
                          className="btn btn-outline-danger ms-2"
                          onClick={handleCancelCoupon}
                          disabled={loading}
                        >
                          Cancel Coupon
                        </button>
                      )}
                    </div>
                    {couponMessage && (
                      <p className={`mt-2 ${discountData ? "text-success" : "text-danger"}`}>
                        {couponMessage}
                      </p>
                    )}
                    {!isLoggedIn && (
                      <p className="text-danger mt-2 small">
                        You need to login to apply coupon.
                      </p>
                    )}
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
                            const errorKey = `billing${key.charAt(0).toUpperCase() + key.slice(1)}`;
                            return (
                              <div className="col-md-6" key={i}>
                                <label className="form-label fw-semibold">
                                  {meta.label || key.replace(/([A-Z])/g, " $1")}
                                  {["firstName", "lastName", "state", "city", "houseNumber", "zip", "email", "phone"].includes(key) && (
                                    <span className="text-danger ms-1">*</span>
                                  )}
                                </label>
                                {key === "state" ? (
                                  <select
                                    className={`form-select ${errors[errorKey] ? "is-invalid" : ""}`}
                                    value={billingAddress.state}
                                    onChange={(e) =>
                                      setBillingAddress({ ...billingAddress, state: e.target.value })
                                    }
                                    disabled={loading}
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
                                    className={`form-control ${errors[errorKey] ? "is-invalid" : ""}`}
                                    placeholder={meta.placeholder || `Enter ${key}`}
                                    value={billingAddress[key]}
                                    disabled={meta.disabled || loading}
                                    onChange={(e) =>
                                      setBillingAddress({ ...billingAddress, [key]: e.target.value })
                                    }
                                  />
                                )}
                                {errors[errorKey] && (
                                  <div className="text-danger small mt-1">{errors[errorKey]}</div>
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
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="shipDifferent">
                        Ship to a different address?
                      </label>
                    </div>

                    {showShipping && (
                      <div className="mt-4 p-3 border rounded bg-light">
                        <h6 className="fw-bold mb-3 text-red">Shipping Address</h6>
                        <div className="row g-3">
                          {Object.keys(shippingAddress).map((key, i) => {
                            const meta = billingFieldMeta[key] || {};
                            const errorKey = `shipping${key.charAt(0).toUpperCase() + key.slice(1)}`;
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
                                    className={`form-select ${errors[errorKey] ? "is-invalid" : ""}`}
                                    value={shippingAddress.state}
                                    onChange={(e) =>
                                      setShippingAddress({ ...shippingAddress, state: e.target.value })
                                    }
                                    disabled={loading}
                                  >
                                    <option value="">Select state</option>
                                    {usStates.map((s) => (
                                      <option key={s.code} value={s.code}>
                                        {s.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    className={`form-control ${errors[errorKey] ? "is-invalid" : ""}`}
                                    placeholder={meta.placeholder || `Enter ${key}`}
                                    value={shippingAddress[key]}
                                    disabled={meta.disabled || loading}
                                    onChange={(e) =>
                                      setShippingAddress({ ...shippingAddress, [key]: e.target.value })
                                    }
                                  />
                                )}
                                {errors[errorKey] && (
                                  <div className="text-danger small mt-1">{errors[errorKey]}</div>
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
                          <span>
                            {data.planTitle} ({data.simType}) x{" "}
                            {item.formData?.priceQty || 1}
                          </span>
                          <span>
                            ${(data.planPrice * (item.formData?.priceQty || 1)).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}

                    {/* ─── STEP 5: Show shipping options if pSIM or device ──── */}
                    {hasShippingItem && (
                      <div className="border mt-3 p-3">
                        <div className="mb-3">
                          <label className="form-label">Shipping Options</label>
                          <select
                            className="form-select"
                            value={selectedShippingOption.value}
                            onChange={(e) => {
                              const selected = shippingOptions.find(
                                (opt) => opt.value === parseFloat(e.target.value)
                              );
                              setSelectedShippingOption(selected);
                            }}
                          >
                            {shippingOptions.map((opt, i) => (
                              <option key={i} value={opt.value}>
                                {opt.label} — ${opt.value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Shipping Fee</span>
                          <span>${shippingFee.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* ─── STEP 5: Show activation fee line if any prepaid eSIM ─ */}
                    {activationFeeTotal > 0 && (() => {
                      const totalEsimQty = prepaidEsimItems.reduce((acc, item) => 
                        acc + Number(item.formData?.priceQty ?? item.qty ?? 1), 0);
                      return (
                        <div className="d-flex justify-content-between text-success mt-2">
                          <span>
                            Activation Fee{totalEsimQty > 1 ? "s" : ""}  -  {totalEsimQty} x {ACTIVATION_FEE_PER_ESIM.toFixed(2)} 
                          </span>
                          <span>+ ${activationFeeTotal.toFixed(2)}</span>
                        </div>
                      );
                    })()}

                    {discountData && (
                      <div className="d-flex justify-content-between text-success">
                        <span>
                          Discount (
                          {discountData.type === "percentage"
                            ? formatDiscount(discountData.discount) + "%"
                            : "$" + formatDiscount(discountData.discount)}
                          )
                        </span>
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

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "zift"}
                        onChange={() => setPaymentMethod("zift")}
                      />
                      <label className="form-check-label">
                        Pay with Credit / Debit Card
                      </label>
                    </div>

                    {paymentMethod === "zift" && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Card Number *</label>
                          <input
                            className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                            }
                            disabled={loading}
                          />
                          {errors.cardNumber && (
                            <div className="text-danger small mt-1">{errors.cardNumber}</div>
                          )}
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Expiry Date *</label>
                            <input
                              className={`form-control ${errors.cardExpiry ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="MM / YY"
                              value={cardDetails.expiry}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "");
                                if (value.length >= 3) {
                                  value = value.slice(0, 2) + " / " + value.slice(2, 4);
                                }
                                setCardDetails({ ...cardDetails, expiry: value });
                              }}
                              disabled={loading}
                            />
                            {errors.cardExpiry && (
                              <div className="text-danger small mt-1">{errors.cardExpiry}</div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">CVC *</label>
                            <input
                              className={`form-control ${errors.cardCvc ? "is-invalid" : ""}`}
                              type="text"
                              placeholder="CVC"
                              value={cardDetails.cvc}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, cvc: e.target.value })
                              }
                              disabled={loading}
                            />
                            {errors.cardCvc && (
                              <div className="text-danger small mt-1">{errors.cardCvc}</div>
                            )}
                          </div>
                        </div>

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
                                disabled={loading}
                              />
                              <label className="form-check-label" htmlFor="sameAsBilling">
                                Same as Service/Billing Address
                              </label>
                            </div>
                            <div className="row g-3">
                              {Object.keys(cardAddress).map((key, i) => {
                                const meta = billingFieldMeta[key] || {};
                                const errorKey = `card${key.charAt(0).toUpperCase() + key.slice(1)}`;
                                return (
                                  <div className="col-md-6" key={i}>
                                    <label className="form-label fw-semibold">
                                      {meta.label || key.replace(/([A-Z])/g, " $1")}
                                      {["firstName", "lastName", "state", "city", "zip"].includes(key) && (
                                        <span className="text-danger ms-1">*</span>
                                      )}
                                    </label>
                                    {key === "state" ? (
                                      <select
                                        className={`form-select ${errors[errorKey] ? "is-invalid" : ""}`}
                                        value={cardAddress.state}
                                        onChange={(e) =>
                                          setCardAddress({ ...cardAddress, state: e.target.value })
                                        }
                                        disabled={loading}
                                      >
                                        <option value="">Select state</option>
                                        {usStates.map((s) => (
                                          <option key={s.code} value={s.code}>
                                            {s.name}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      <input
                                        type="text"
                                        className={`form-control ${errors[errorKey] ? "is-invalid" : ""}`}
                                        placeholder={meta.placeholder || `Enter ${key}`}
                                        value={cardAddress[key]}
                                        disabled={meta.disabled || loading}
                                        onChange={(e) =>
                                          setCardAddress({ ...cardAddress, [key]: e.target.value })
                                        }
                                      />
                                    )}
                                    {errors[errorKey] && (
                                      <div className="text-danger small mt-1">{errors[errorKey]}</div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "stripe" && clientSecret && (
                      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                        <StripePaymentForm
                          ref={stripeFormRef}
                          onPaymentSuccess={() => console.log("Payment successful")}
                          onPaymentError={(error) => console.error("Payment error:", error)}
                        />
                      </Elements>
                    )}

                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I have read and agree to the website{" "}
                        <a href="/terms-and-conditions">terms and conditions</a>.
                      </label>
                    </div>

                    <button
                      className="btn btn-danger w-100 mt-3"
                      type="button"
                      onClick={
                        paymentMethod === "stripe"
                          ? handlePlaceOrderStripe
                          : handlePlaceOrderZift
                      }
                      disabled={loading || (paymentMethod === "stripe" && !clientSecret)}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {paymentMethod === "stripe"
                            ? "Processing payment with Stripe..."
                            : "Placing order..."}
                        </>
                      ) : paymentMethod === "stripe" ? (
                        "Place Order with Stripe"
                      ) : (
                        "Place Your Order"
                      )}
                    </button>
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
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="card" style={{ maxWidth: 500, width: "90%" }}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Login Required</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowLoginPopup(false)}
                >
                  Close
                </button>
              </div>
              <div className="card-body text-center">
                <p>You need to login to apply your coupon code.</p>
                <a
                  className="btn btn-red"
                  href={`/login?redirect=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : "/"
                  )}`}
                >
                  Go to Login
                </a>
                <div className="mt-3">
                  <button className="btn btn-link" onClick={() => setShowLoginPopup(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTermsPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1060,
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="card text-center p-3" style={{ maxWidth: 400, width: "90%" }}>
              <h5 className="text-danger fw-bold mb-3">Terms & Conditions Required</h5>
              <p className="text-muted">
                You must agree to the website{" "}
                <a href="/terms-and-conditions">terms and conditions</a> before placing your
                order.
              </p>
              <button className="btn btn-red w-100" onClick={() => setShowTermsPopup(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      <Modal show={showThankYou} onHide={() => setShowThankYou(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ fontSize: "50px", color: "#28a745" }}>✔️</div>
          <h5 className="mt-3 text-success">Your order has been successfully placed!</h5>
          <p className="text-muted">
            A confirmation email has been sent with your order details.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="success"
            onClick={() => {
              setShowThankYou(false);
              window.location.href = "/";
            }}
          >
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * GooglePayButton (OR_BIBED_11 Fix)
 *
 * Expects:
 * - NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY (Stripe publishable key)
 * - NEXT_PUBLIC_GOOGLE_MERCHANT_ID (Google Merchant ID)
 *
 * Props:
 * - amount (number|string)
 * - currency (string)
 * - onSuccess(paymentData)
 * - onCancel()
 * - onError(error)
 *
 * IMPORTANT:
 * - Production requires HTTPS and an authorized domain configured for your Google Merchant.
 * - OR_BIBED_11 fix: Updated Stripe API version, added billing address support, improved validation
 */

const GooglePayButton = ({ amount = 1.0, currency = "USD", onSuccess, onCancel, onError }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [buttonAppended, setButtonAppended] = useState(false);
  const [error, setError] = useState(null);

  // Force production per your request
  const googleEnvironment = "PRODUCTION";

  // Read keys from public env vars (Next.js)
  const publishableKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY : undefined;
  const merchantId = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID : undefined;

  // Validate configuration on mount
  useEffect(() => {
    if (!publishableKey) {
      const msg = "GooglePayButton: NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY is missing. Payments will fail.";
      console.error(msg);
      setError(msg);
    }
    if (!merchantId) {
      const msg = "GooglePayButton: NEXT_PUBLIC_GOOGLE_MERCHANT_ID is missing. Required for production.";
      console.warn(msg);
    }
  }, [publishableKey, merchantId]);

  // load script
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.google && window.google.payments && window.google.payments.api) {
      setScriptLoaded(true);
      return;
    }
    const scriptId = "google-pay-js";
    if (document.getElementById(scriptId)) {
      setScriptLoaded(Boolean(window.google && window.google.payments && window.google.payments.api));
      return;
    }
    const s = document.createElement("script");
    s.id = scriptId;
    s.src = "https://pay.google.com/gp/p/js/pay.js";
    s.async = true;
    s.onload = () => {
      console.info("Google Pay script loaded");
      setScriptLoaded(true);
    };
    s.onerror = (e) => {
      console.error("Failed to load Google Pay script", e);
      setScriptLoaded(false);
      setError("Failed to load Google Pay script");
    };
    document.head.appendChild(s);
  }, []);

  const formattedTotal = useCallback(() => {
    const value = typeof amount === "string" ? parseFloat(amount) : Number(amount || 0);
    return isFinite(value) ? value.toFixed(2) : "0.00";
  }, [amount]);

  // Updated tokenization spec with latest Stripe API version
  const getTokenizationSpec = useCallback(() => {
    if (!publishableKey) {
      console.error("GooglePayButton: missing NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY");
      return null;
    }
    return {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "stripe",
        "stripe:version": "2024-11-20", // Updated to latest stable version
        "stripe:publishableKey": publishableKey,
      },
    };
  }, [publishableKey]);

  const getPaymentRequest = useCallback(() => {
    const tokenizationSpec = getTokenizationSpec();
    if (!tokenizationSpec) {
      return null;
    }

    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            billingAddressRequired: true,
            billingAddressParameters: {
              format: "FULL",
              phoneNumberRequired: false,
            },
          },
          tokenizationSpecification: tokenizationSpec,
        },
      ],
      merchantInfo: {
        merchantName: "zoiko mobile",
        merchantId: merchantId || undefined,
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: formattedTotal(),
        currencyCode: currency || "USD",
        countryCode: "US",
      },
      shippingAddressRequired: false,
      emailRequired: false,
    };
  }, [formattedTotal, currency, getTokenizationSpec, merchantId]);

  // Detect availability and append button
  useEffect(() => {
    if (!scriptLoaded || typeof window === "undefined" || !window.google || !window.google.payments) {
      return;
    }

    if (!publishableKey || !merchantId) {
      console.warn("GooglePayButton: Missing configuration (key or merchantId). Button may not function properly.");
      setIsReady(false);
      return;
    }

    try {
      const client = new window.google.payments.api.PaymentsClient({ environment: googleEnvironment });

      const isReadyRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            },
          },
        ],
      };

      client.isReadyToPay(isReadyRequest)
        .then((res) => {
          console.info("isReadyToPay result:", res);
          if (res && res.result) {
            setIsReady(true);
            const container = document.getElementById("gpay-container");
            if (!container) return;
            if (!buttonAppended && container.childNodes.length === 0) {
              const button = client.createButton({
                onClick: () => handlePayClick(client),
                buttonColor: "default",
                buttonType: "long",
                buttonSizeMode: "fill",
              });
              container.appendChild(button);
              setButtonAppended(true);
            }
          } else {
            setIsReady(false);
            console.info("Device/browser not ready for Google Pay");
          }
        })
        .catch((err) => {
          setIsReady(false);
          console.error("isReadyToPay error:", err);
          const errorMsg = `Google Pay availability check failed: ${err?.message || err}`;
          setError(errorMsg);
          if (typeof onError === "function") onError(err);
        });
    } catch (err) {
      console.error("Google Pay initialization error:", err);
      setError(`Google Pay initialization failed: ${err?.message || err}`);
      if (typeof onError === "function") onError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded, buttonAppended, publishableKey, merchantId]);

  // loadPaymentData handler
  const handlePayClick = async (paymentClientInstance) => {
    if (typeof window === "undefined" || !window.google) {
      console.warn("Google Pay not available");
      return;
    }

    const client = paymentClientInstance || new window.google.payments.api.PaymentsClient({ environment: googleEnvironment });
    const request = getPaymentRequest();

    if (!request) {
      const errMsg = "Payment request could not be created (missing tokenization spec)";
      console.error(errMsg);
      setError(errMsg);
      if (typeof onError === "function") onError(new Error(errMsg));
      return;
    }

    try {
      const paymentData = await client.loadPaymentData(request);
      console.info("Google Pay loadPaymentData returned:", paymentData);
      setError(null);
      if (typeof onSuccess === "function") {
        try { onSuccess(paymentData); } catch (err) { console.warn("onSuccess callback threw:", err); }
      }
    } catch (err) {
      // Detect user-closed case
      const isUserCanceled =
        err?.name === "AbortError" ||
        err?.statusCode === "CANCELED" ||
        (typeof err?.message === "string" && /closed the Payment Request UI|user closed|cancel/i.test(err.message));

      if (isUserCanceled) {
        console.info("Google Pay cancelled by user:", err?.message || err);
        setError(null);
        if (typeof onCancel === "function") {
          try { onCancel(); } catch (e) { console.warn("onCancel callback threw:", e); }
        }
        return;
      }

      // Log full error for debugging
      console.error("Google Pay loadPaymentData failed:", {
        errorCode: err?.statusCode,
        errorMessage: err?.message,
        errorName: err?.name,
        fullError: err,
      });

      const errorMsg = `Payment failed: ${err?.message || err}`;
      setError(errorMsg);

      if (typeof onError === "function") {
        try { onError(err); } catch (e) { console.warn("onError callback threw:", e); }
      }
    }
  };

  return (
    <div id="gpay-wrapper">
      {error && (
        <div style={{ color: "#d32f2f", fontSize: "0.875rem", marginBottom: "8px", padding: "8px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
          ⚠️ {error}
        </div>
      )}
      <div id="gpay-container" style={{ minHeight: 48 }} />
      <small style={{ color: "#666", display: "block", marginTop: 6 }}>
        {scriptLoaded ? (isReady ? `Google Pay available — ${currency} ${formattedTotal()}` : "Google Pay not available on this device/browser.") : "Loading Google Pay..."}
      </small>
    </div>
  );
};

export default GooglePayButton;
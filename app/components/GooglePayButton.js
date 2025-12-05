"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * GooglePayButton (Production-ready debug)
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
 */

const GooglePayButton = ({ amount = 1.0, currency = "USD", onSuccess, onCancel, onError }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [buttonAppended, setButtonAppended] = useState(false);

  // Force production per your request
  const googleEnvironment = "PRODUCTION";

  // Read keys from public env vars (Next.js)
  const publishableKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY : undefined;
  const merchantId = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID : undefined;

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
    };
    document.head.appendChild(s);
  }, []);

  const formattedTotal = useCallback(() => {
    const value = typeof amount === "string" ? parseFloat(amount) : Number(amount || 0);
    return isFinite(value) ? value.toFixed(2) : "0.00";
  }, [amount]);

  const getTokenizationSpec = useCallback(() => {
    if (!publishableKey) {
      console.warn("GooglePayButton: missing NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY");
    }
    return {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "stripe",
        "stripe:version": "2022-11-15",
        "stripe:publishableKey": publishableKey || "MISSING_PUBLISHABLE_KEY",
      },
    };
  }, [publishableKey]);

  const getPaymentRequest = useCallback(() => {
    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
          },
          tokenizationSpecification: getTokenizationSpec(),
        },
      ],
      merchantInfo: {
        merchantName: "zoiko mobile",
        ...(merchantId ? { merchantId } : {}),
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: formattedTotal(),
        currencyCode: currency,
        countryCode: "US",
      },
    };
  }, [formattedTotal, currency, getTokenizationSpec, merchantId]);

  // Detect availability and append button
  useEffect(() => {
    if (!scriptLoaded || typeof window === "undefined" || !window.google || !window.google.payments) {
      return;
    }

    // Log helpful hints if config missing
    if (!publishableKey) {
      console.warn("GooglePayButton: publishable key not set (NEXT_PUBLIC_GOOGLEPAY_STRIPE_PUBLISHABLE_KEY). Payments may fail.");
    }
    if (!merchantId) {
      console.warn("GooglePayButton: merchant ID not set (NEXT_PUBLIC_GOOGLE_MERCHANT_ID). Required for production.");
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
              });
              container.appendChild(button);
              setButtonAppended(true);
            }
          } else {
            setIsReady(false);
          }
        })
        .catch((err) => {
          setIsReady(false);
          console.error("isReadyToPay error:", err);
          if (typeof onError === "function") onError(err);
        });
    } catch (err) {
      console.error("Google Pay initialization error:", err);
      if (typeof onError === "function") onError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded, buttonAppended, publishableKey, merchantId]);

  // loadPaymentData handler (accepts an optional client instance)
  const handlePayClick = async (paymentClientInstance) => {
    if (typeof window === "undefined" || !window.google) {
      console.warn("Google Pay not available");
      return;
    }

    const client = paymentClientInstance || new window.google.payments.api.PaymentsClient({ environment: googleEnvironment });
    const request = getPaymentRequest();

    try {
      const paymentData = await client.loadPaymentData(request);
      console.info("Google Pay loadPaymentData returned:", paymentData);
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
        if (typeof onCancel === "function") {
          try { onCancel(); } catch (e) { console.warn("onCancel callback threw:", e); }
        }
        return;
      }

      console.error("Google Pay loadPaymentData failed:", err);
      if (typeof onError === "function") {
        try { onError(err); } catch (e) { console.warn("onError callback threw:", e); }
      }
    }
  };

  return (
    <div id="gpay-wrapper">
      <div id="gpay-container" style={{ minHeight: 48 }} />
      <small style={{ color: "#666", display: "block", marginTop: 6 }}>
        {scriptLoaded ? (isReady ? `Google Pay available — ${currency} ${formattedTotal()}` : "Google Pay not available on this device/browser.") : "Loading Google Pay..."}
      </small>
    </div>
  );
};

export default GooglePayButton;
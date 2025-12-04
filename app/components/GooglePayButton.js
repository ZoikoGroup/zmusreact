"use client";

import { useState, useEffect, useCallback } from "react";

const GooglePayButton = ({ amount = 1.0, currency = "USD", onSuccess }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  /** Load Google Pay script */
  useEffect(() => {
    if (window.google) {
      setScriptLoaded(true);
      return;
    }

    const scriptId = "google-pay-js";

    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://pay.google.com/gp/p/js/pay.js";
      s.async = true;
      s.onload = () => setScriptLoaded(true);
      s.onerror = () => console.error("Failed to load Google Pay script");
      document.head.appendChild(s);
    }
  }, []);

  /** Format amount */
  const formattedTotal = useCallback(() => {
    const value =
      typeof amount === "string" ? parseFloat(amount) : Number(amount || 0);
    return isFinite(value) ? value.toFixed(2) : "0.00";
  }, [amount]);

  /** Google Pay request object (PRODUCTION MODE) */
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

          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "stripe",
              "stripe:version": "2022-11-15",
              // ⚠️ LIVE publishable key
              "stripe:publishableKey": "pk_live_51QofcmDMpE5crg6qpDvjzvxk24Iz6He78tnAUr4OyafpMxON3NnTnGPynzJHAbSnwc2dEWYnCziJkiv5hXRgiyoP00Kc1PpzXu",
            },
          },
        },
      ],

      merchantInfo: {
        merchantName: "zoiko mobile",
        // ⚠️ LIVE Google Merchant ID (required for production)
        merchantId: "BCR2DN4TTXMY5QKS",
      },

      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: formattedTotal(),
        currencyCode: currency,
        countryCode: "US",
      },
    };
  }, [formattedTotal, currency]);

  /** Detect if Google Pay is available */
  useEffect(() => {
    if (!scriptLoaded || !window.google) return;

    const client = new window.google.payments.api.PaymentsClient({
      environment: "PRODUCTION",
    });

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

    client
      .isReadyToPay(isReadyRequest)
      .then((res) => {
        if (res.result) {
          setIsReady(true);

          const container = document.getElementById("gpay-container");

          if (container && container.childNodes.length === 0) {
            const button = client.createButton({
              onClick: handlePayClick,
              buttonColor: "default",
              buttonType: "long",
            });

            container.appendChild(button);
          }
        }
      })
      .catch((err) => console.error("isReadyToPay error:", err));
  }, [scriptLoaded, getPaymentRequest]);

  /** Handle Pay button click */
  const handlePayClick = async () => {
    if (!window.google) return;

    const paymentClient = new window.google.payments.api.PaymentsClient({
      environment: "PRODUCTION",
    });

    const request = getPaymentRequest();

    try {
      const paymentData = await paymentClient.loadPaymentData(request);

      console.log("Google Pay Payment Data:", paymentData);

      if (onSuccess) onSuccess(paymentData);

      // Send token to your backend:
      // paymentData.paymentMethodData.tokenizationData.token

    } catch (err) {
      console.error("Google Pay error:", err);
      console.error("statusCode:", err?.statusCode);
      console.error("statusMessage:", err?.statusMessage);
      console.error("details:", err?.details);
    }
  };

  return (
    <div>
      <div id="gpay-container" style={{ minHeight: 48 }}></div>
      <small style={{ color: "#666" }}>
        {scriptLoaded
          ? isReady
            ? `Google Pay ready — ${currency} ${formattedTotal()}`
            : "Google Pay not available."
          : "Loading Google Pay..."}
      </small>
    </div>
  );
};

export default GooglePayButton;

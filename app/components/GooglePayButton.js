import React, { useEffect, useCallback, useState } from "react";

/**
 * GooglePayButton
 * - Works in TEST environment
 * - Uses Stripe PAYMENT_GATEWAY tokenization with correct parameter keys
 * - Omits merchantId in TEST mode (use merchantId only for PRODUCTION after registration)
 * - Does readiness check and logs detailed error info
 *
 * Props:
 *  - amount: number or string (will be formatted to "0.00" string)
 *  - currency: string (default "USD")
 *  - onSuccess(paymentData) optional
 */
const GooglePayButton = ({ amount = 1.0, currency = "USD", onSuccess }) => {
  const [scriptLoaded, setScriptLoaded] = useState(Boolean(window?.google));
  const [isReady, setIsReady] = useState(false);

  // Ensures google.payments.api script is present
  useEffect(() => {
    if (window.google) {
      setScriptLoaded(true);
      return;
    }
    const id = "google-pay-js";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://pay.google.com/gp/p/js/pay.js";
    s.async = true;
    s.onload = () => setScriptLoaded(true);
    s.onerror = () => {
      console.error("Failed to load Google Pay script");
      setScriptLoaded(false);
    };
    document.head.appendChild(s);
  }, []);

  // Format price to string with 2 decimals (Google Pay requires string)
  const formattedTotal = useCallback(() => {
    const n = typeof amount === "string" ? parseFloat(amount) : Number(amount || 0);
    if (!isFinite(n)) return "0.00";
    return n.toFixed(2);
  }, [amount]);

  // Build the payment request
  const getGooglePaymentRequest = useCallback(() => {
    // base CARD method (no tokenization) used for isReadyToPay check
    const baseCardPaymentMethod = {
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
      },
    };

    // tokenized card method for loadPaymentData
    const cardPaymentMethodWithTokenization = {
      ...baseCardPaymentMethod,
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "stripe",
          // IMPORTANT: keys below must be exactly these strings (with colons)
          "stripe:version": "2022-11-15",
          "stripe:publishableKey": "pk_test_XXXXXXXXXXXXXXXXXXXX",
        },
      },
    };

    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [cardPaymentMethodWithTokenization],
      merchantInfo: {
        // TEST mode: omit merchantId. Use merchantName only
        merchantName: "zoiko mobile (TEST)",
        // merchantId: <only for PRODUCTION and after registration>
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: formattedTotal(),
        currencyCode: currency,
        countryCode: "US",
      },
    };
  }, [formattedTotal, currency]);

  // Create button after isReadyToPay passes
  useEffect(() => {
    if (!scriptLoaded) return;
    if (!window.google) {
      console.error("window.google is not available even after script load");
      return;
    }

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    });

    // base request for isReadyToPay (no tokenization)
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

    paymentsClient
      .isReadyToPay(isReadyRequest)
      .then((response) => {
        if (response.result) {
          setIsReady(true);
          // create and append button only once
          const container = document.getElementById("gpay-container");
          if (container && container.childNodes.length === 0) {
            const button = paymentsClient.createButton({
              onClick: onGooglePayButtonClick,
              buttonColor: "default",
              buttonType: "long",
            });
            container.appendChild(button);
          }
        } else {
          setIsReady(false);
          console.warn("Google Pay is not available on this device/browser");
        }
      })
      .catch((err) => {
        setIsReady(false);
        console.error("isReadyToPay error:", err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded, getGooglePaymentRequest]);

  // Handler for click
  const onGooglePayButtonClick = async () => {
    if (!window.google) {
      console.error("Google Pay not loaded");
      return;
    }

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    });

    const request = getGooglePaymentRequest();

    // For debugging: log the full request object
    console.debug("Google Pay request:", request);

    try {
      const paymentData = await paymentsClient.loadPaymentData(request);
      console.log("Payment success (paymentData):", paymentData);
      if (onSuccess) onSuccess(paymentData);
      // send paymentData.paymentMethodData.tokenizationData.token to your server
    } catch (err) {
      // Google Pay returns a complex error object. Log details.
      console.error("loadPaymentData error (full):", err);
      // Helpful fields to show, if present
      try {
        // eslint-disable-next-line no-console
        console.error("statusCode:", err?.statusCode);
        console.error("statusMessage:", err?.statusMessage);
        console.error("details:", err?.details);
      } catch (ex) {
        // ignore
      }
    }
  };

  return (
    <div>
      <div id="gpay-container" style={{ minHeight: 40 }} />
      <div style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
        {scriptLoaded ? (
          isReady ? (
            <span>Google Pay ready — pay {currency} {formattedTotal()}</span>
          ) : (
            <span>Google Pay not available on this device/browser.</span>
          )
        ) : (
          <span>Loading Google Pay...</span>
        )}
      </div>
    </div>
  );
};

export default GooglePayButton;

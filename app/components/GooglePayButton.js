import React, { useEffect } from "react";

const GooglePayButton = ({ amount }) => {
  useEffect(() => {
    if (!window.google) return;

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST", // change to "PRODUCTION" in live mode
    });

    const button = paymentsClient.createButton({
      onClick: onGooglePayButtonClick,
      buttonColor: "default",
      buttonType: "long",
    });

    const container = document.getElementById("gpay-container");
    if (container && container.childNodes.length === 0) {
      container.appendChild(button);
    }

    // eslint-disable-next-line
  }, [amount]);

  // Dynamic request builder
  const getGooglePaymentRequest = () => ({
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["VISA", "MASTERCARD"],
        },
        tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
                gateway: "stripe",
                "stripe:version": "2022-11-15",
                "stripe:publishableKey": "pk_live_XXXXXXXXXX",
            },
            },
      },
    ],
    merchantInfo: {
      merchantId: "BCR2DN4TTXMY5QKS",
      merchantName: "zoiko mobile",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: amount, // 👈 dynamic price
      currencyCode: "USD",
      countryCode: "US",
    },
  });

  const onGooglePayButtonClick = async () => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    });

    try {
      const paymentData = await paymentsClient.loadPaymentData(
        getGooglePaymentRequest()
      );

      console.log("Payment Success:", paymentData);

      // send paymentData.token to backend for processing
    } catch (error) {
      console.error("Google Pay Error:", error);
    }
  };

  return <div id="gpay-container"></div>;
};

export default GooglePayButton;

import { tokenizationCard} from "../utils/ziftApi"; // adjust path

// utils/beQuickApi.js
const API_BASE = "https://zoiko-atom-api.bequickapps.com";
const BEQUICK_TOKEN = "09ff2d85-a451-47e6-86bc-aba98e1e4629";

async function beQuickRequest(url, method = "GET", data = {}, headers = {}, timeout = 30) {
  let fullUrl = API_BASE + url;
  method = method.toUpperCase();

  if (method === "GET" && Object.keys(data).length > 0) {
    const query = new URLSearchParams(data).toString();
    fullUrl += (fullUrl.includes("?") ? "&" : "?") + query;
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout * 1000);

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": BEQUICK_TOKEN,
        ...headers,
      },
      body:
        ["POST", "PUT", "PATCH"].includes(method) && Object.keys(data).length > 0
          ? JSON.stringify(data)
          : undefined,
      signal: controller.signal,
    });

    clearTimeout(id);
    const json = await response.json().catch(() => ({}));

    console.log("BeQuick API:", { url, method, request: data, response: json });

    return { status: true, data: json };
  } catch (err) {
    return { status: false, message: err.message };
  }
}


export async function processOrder(postData) {
  try {
    // Default payment type
    postData.payment_type_id = 3;

    // Step 1: Fetch or create subscriber
    const customerResponse = await createSubscriberAndFetch(postData);
    if (!customerResponse.status) return customerResponse;

    // Add subscriber ID to post data
    postData.subscriber_id = customerResponse.subscriber_id;

    // Step 2: Handle payment method logic
    if (postData.payment_method === "zift_custom_payment_gateway") {
      postData.payment_type_id = 3;
    }

    // Step 3: Add payment method
    const paymentMethodResponse = await addPaymentMethod(postData);
    if (!paymentMethodResponse.status) return paymentMethodResponse;

    // Step 4: Create draft line
    const draftLineCreateResponse = await createDraftLine(postData);
    if (!draftLineCreateResponse.status) return draftLineCreateResponse;

    // Store IDs for next step
    postData.line_id = draftLineCreateResponse.line.id;
    postData.shipping_address_id = draftLineCreateResponse.shipping_address_id;

    // Step 5: Create draft order
    const orderResponse = await createDraftOrder(postData);
    if (!orderResponse.status) return orderResponse;

    // Save order info
    postData.bequick_order_id = orderResponse.order.id;
    postData.bequick_order_amount = orderResponse.order.total;

    // Step 6: Make payment
    const orderPaymentResponse = await orderPayment(postData);
    if (!orderPaymentResponse.status) return orderPaymentResponse;

    // Step 7: Submit order
    const submitOrderResponse = await submitOrder(postData.bequick_order_id);
    if (!submitOrderResponse.status) return submitOrderResponse;

    // ✅ Final success response
    return {
      status: true,
      message: "BYOD order is processed successfully",
      data: postData,
    };
  } catch (error) {
    // 🧯 Global fallback error handler
    return {
      status: false,
      message: "Unexpected error while processing order",
      error: error.message,
    };
  }
}



// ---------- Exported helpers ----------
export async function storeServiceAddress(
  subscriberId,
  name,
  phoneNumber,
  address1,
  address2,
  city,
  stateCode,
  zip,
  countryCode = "US",
  isPrimary = false
) {
  try {
    // Validate address
    const validateData = {
      "address1" : address1,
      "address2" : address2,
      "city" : city,
      "state" : stateCode,
      "zip" : zip
    };

    const validatedAddressResponse = await beQuickRequest(
      "/addresses/validate",
      "POST",
      validateData
    );

    // Prepare address data
    let data = {
      "address" : {
        "primary" : isPrimary,
        "name" : name,
        "phone_number" : phoneNumber,
        "country_code" : countryCode,
        "usps_validated" : true,
        "fed_ex_validated" : false,
        "subscriber_id": subscriberId,
      },
    };

    // Merge validated response
    data.address = {
      ...data.address,
      ...validatedAddressResponse.data,
    };

    // Store address
    const response = await beQuickRequest("/addresses", "POST", data);

    if (response?.errors) {
      return {
        status: false,
        message: "Unable to add subscriber address",
        error: response.errors,
      };
    }

    return {
      status: true,
      message: validatedAddressResponse,
      address_id: response.addresses?.[0]?.id,
    };
  } catch (error) {
    console.error("Error storing service address:", error);
    return {
      status: false,
      message: "Unexpected error while storing service address.",
      error,
    };
  }
}

export const getAllPlans = () =>
  beQuickRequest(`/products`, "GET");

function normalizeResponse(response) {
  if (!response) return null;

  if (response?.subscriber?.subscribers) {
    // POST create response
    return response.subscriber.subscribers;
  }

  if (response?.subscriber?.data?.subscribers) {
    // GET response
    return response.subscriber.data.subscribers;
  }

  if (response?.subscribers) {
    // Alternative shape
    return response.subscribers;
  }

  return null;
}

function extractSubscriberId(response) {
  const subscribers = normalizeResponse(response);
  return subscribers?.[0]?.id || null;
}


export async function createSubscriberAndFetch() {
  try {
    const email = "reactSumon333@gmail.com";

    // Try to fetch by email
    let finalResponse = await getSubscriberByEmail(email);

    // If subscriber does not exist, create one
    if (finalResponse?.errors || !extractSubscriberId(finalResponse)) {
      const data = {
        action: "create",
        subscriber: {
          first_name: "react",
          last_name: "Sumon",
          email,
          company_id: "1",
          phone: "9999999999",
        },
      };
      finalResponse = await beQuickRequest("/subscribers", "POST", data);

      // 🔑 Immediately fetch again if no ID in create response
      if (!extractSubscriberId(finalResponse)) {
        finalResponse = await getSubscriberByEmail(email);
      }
    }

    if (finalResponse?.errors) {
      return {
        status: false,
        message: "Unable to find or create subscriber",
      };
    }

    const subscriberId = extractSubscriberId(finalResponse);

    return {
      status: !!subscriberId,
      subscriber_id: subscriberId,
    };
  } catch (error) {
    console.error("Error in createSubscriberAndFetch:", error);
    return {
      status: false,
      message: "Unexpected error occurred",
    };
  }
}


export async function fetchAddressesBySubscriber(subscriberId) {
  try {
    const response = await sendBeQuickRequest(
      `/addresses?by_subscriber_id=${subscriberId}&archived=false`,
      "GET"
    );

    if (response?.addresses) {
      return response.addresses;
    }

    return [];
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
}


export async function addPaymentMethod(postData, cardData) {
  const subscriberId = postData.subscriber_id;
  const name = `${postData.first_name} ${postData.last_name}`;

  // Destructure card + billing data (instead of pulling from PHP session/meta)
  const {
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    address1,
    address2,
    city,
    state,
    zip,
    country,
  } = cardData;

  const street = `${address1} ${address2 || ""}`.trim();

  // Step 1: Tokenize the card
  const tokenResponse = await tokenizationCard(
    name,
    cardNumber,
    expiryMonth,
    expiryYear,
    street,
    city,
    state,
    zip,
    postData.phone_number,
    postData.email
  );

  if (!tokenResponse.status) {
    return tokenResponse; // { status: false, message: ... }
  }

  // Step 2: Store service address
  const storeAddressResponse = await storeServiceAddress(
    subscriberId,
    name,
    postData.phone_number,
    address1,
    address2,
    city,
    state,
    zip,
    country || "US",
    false
  );

  if (!storeAddressResponse.status) {
    return storeAddressResponse; // error from BeQuick
  }

  // Assign service address ID to postData
  postData.service_address_id = storeAddressResponse.address_id;

  // Step 3: Prepare payment method payload
  const data = {
    "payment_method" : {
      "type" : "CreditCard",
      "payment_method_nonce" : tokenResponse.token,
      "cvv" : cvc,
      "expiration_month" : expiryMonth,
      "expiration_year" : expiryYear,
      "address_id" : postData.service_address_id,
      "payment_type_id" : 3,
      "subscriber_id": subscriberId
    },
  };

  // Step 4: Send request to BeQuick
  const paymentMethodResponse = await beQuickRequest(
    "/payment_methods",
    "POST",
    data
  );

  // Step 5: Handle response
  if (paymentMethodResponse?.errors) {
    return {
      status: false,
      message: paymentMethodResponse.errors.base?.join("<br>") || "Failed",
    };
  }

  postData.payment_method_id =
    paymentMethodResponse?.payment_methods?.[0]?.id || null;

  return {
    status: true,
    message: "Payment method added successfully",
  };
}

export async function createDraftLine(postData) {
  // Prepare shipping details
  const shippingFullName = `${postData.shipping_address.first_name} ${postData.shipping_address.last_name}`;

  const {
    "address_1": shippingAddress1,
    "address_2": shippingAddress2,
    "city": shippingCity,
    "state": shippingState,
    "postcode": shippingZip,
    "country": shippingCountry,
  } = postData.shipping_address;

  // Store service address
  const storeAddressResponse = await storeServiceAddress(
    postData.subscriber_id,
    shippingFullName,
    postData.phone_number,
    shippingAddress1,
    shippingAddress2 || "",
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    false
  );

  if (storeAddressResponse.status === false) {
    return storeAddressResponse;
  }

  // Prepare line data
  const data = {
    "line": {
      "subscriber_id": 203,
      "carrier_id": 1,
      "service_address_id":296,
      "status": "draft",
    },
  };

  // Add porting attributes if present
  if (
    postData.products_prepaid &&
    postData.products_prepaid[0]?.porting &&
    Object.keys(postData.products_prepaid[0].porting).length > 0
  ) {
    data.line.number_port_attributes = postData.products_prepaid[0].porting;
  }

  // Send request
  const response = await beQuickRequest("/lines", "POST", data);

  if (response.errors) {
    return {
      status: false,
      message: "Unable to create line.",
      error: response.errors,
    };
  }

  return {
    status: true,
    line: response.lines[0],
    shipping_address_id: storeAddressResponse.address_id,
  };
}

export async function createDraftOrder(postData) {
  let orderDetailsAttributes = [];
  let planCount = 0;
  let simCount = 0;

  // Fetch products
  const productsList = await fetchProducts();
  if (!productsList.status) {
    return {
      status: false,
      message: "Unable to load product from BeQuick",
    };
  }

  // Process prepaid products
  if (Array.isArray(postData.products_prepaid)) {
    for (const product of postData.products_prepaid) {
      orderDetailsAttributes.push({
        product_id: product.bequick_product_id,
        line_id: postData.line_id,
      });
      planCount++;

      const simType = product.sim_type?.toUpperCase();
      if (simType === "ESIM") {
        orderDetailsAttributes.push({
          product_id: ESIM_PRODUCT_ID,
          line_id: postData.line_id,
        });
        simCount++;
      } else if (simType === "PSIM") {
        orderDetailsAttributes.push({
          product_id: PSIM_PRODUCT_ID,
          line_id: postData.line_id,
        });
        simCount++;
      }
    }
  }

  // Process device protection products
  if (Array.isArray(postData.device_protection)) {
    for (const product of postData.device_protection) {
      orderDetailsAttributes.push({
        product_id: product.bequick_product_id,
        line_id: postData.line_id,
      });
    }
  }

  // Validate required products
  if (planCount === 0 && simCount === 0) {
    return {
      status: false,
      message:
        "Cannot create order without plan and SIM to process the BYOD order.",
    };
  }

  // Prepare payload
  const data = {
    order: {
      subscriber_id: postData.subscriber_id,
      apply_taxes: true,
      order_details_attributes: orderDetailsAttributes,
    },
  };

  // Send API request
  const response = await beQuickRequest("/orders", "POST", data);

  // Handle API errors
  if (response?.errors) {
    return {
      status: false,
      message: "Unable to create order for subscriber",
      error: response.errors,
    };
  }

  return {
    status: true,
    order: response?.orders?.[0],
  };
}

export async function orderPayment(postData) {
  const data = {
    order_payment: {
      order_id: postData.bequick_order_id,
      payment_type_id: postData.payment_type_id,
      payment_method_id: postData.payment_method_id,
      amount: postData.bequick_order_amount,
    },
  };

  const response = await beQuickRequest("/order_payments", "POST", data);

  if (response?.errors) {
    return {
      status: false,
      message: "Unable to create order for subscriber",
      error: response.errors,
    };
  }

  return { status: true };
}

export async function submitOrder(orderId) {
  const response = await beQuickRequest(`/orders/${orderId}/submit`, "POST");

  if (response?.errors) {
    return {
      status: false,
      message: "Unable to create order for subscriber",
      error: response.errors,
    };
  }

  return { status: true };
}

export async function fetchProducts() {
  const url = `/products?by_orderable=true&page=1&per=100`;

  try {
    const response = await beQuickRequest(url, "GET");

    // Check if products exist in the response
    if (response && response.products) {
      return {
        status: true,
        product: response.products,
      };
    }

    return {
      status: false,
      message: "Invalid product selected and not found on BeQuick",
    };
  } catch (error) {
    return {
      status: false,
      message: "Error fetching products from BeQuick",
      error: error.message || error,
    };
  }
}
export const getPlanDetails = (planId) =>
  beQuickRequest(`/plans/${planId}`, "GET");

export const createOrder = (orderData) =>
  beQuickRequest(`/orders`, "POST", orderData);

export const getSubscriber = (subscriberId) =>
  beQuickRequest(`/subscribers/${subscriberId}`, "GET");

export const updateSubscriber = (subscriberId, data) =>
  beQuickRequest(`/subscribers/${subscriberId}`, "PATCH", data);

export async function getSubscriberByEmail(subscriberEmail) {
  const url = `/subscribers?filter_by[0][value]=${encodeURIComponent(
    subscriberEmail
  )}&filter_by[0][column]=email`;

  const result = await beQuickRequest(url, "GET");

  if (result?.data?.subscribers && result.data.subscribers.length > 0) {
    return { subscribers: [result.data.subscribers[0]] };
  }
  return false;
}
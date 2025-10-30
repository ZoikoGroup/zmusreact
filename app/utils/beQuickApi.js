import { tokenizationCard } from "./ziftApi";

const API_BASE = "https://zoiko-atom-api.bequickapps.com";
const BEQUICK_TOKEN = "09ff2d85-a451-47e6-86bc-aba98e1e4629";

/* -------------------- Core Request Wrapper -------------------- */
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

    console.log("BeQuick API -> '" + url + "' :", { url, method, request: data, response: json });
    return json;
  } catch (err) {
    console.error("BeQuick Request Error -> '" + url + "' :", err);
    return { errors: [{ message: err.message }] };
  }
}

/* -------------------- MAIN ORDER PROCESSOR -------------------- */
export async function processOrder(postData) {
  try {
    postData.payment_type_id = 3;

    // 1️⃣ Create or get subscriber
    const customerResponse = await createSubscriberAndFetch(postData);
    if (!customerResponse.status) return customerResponse;
    postData.subscriber_id = customerResponse.subscriber_id;

    // 2️⃣ Add payment method
    const cardData = postData.cardAddress || {}; // Expect cardData from checkout
    const paymentMethodResponse = await addPaymentMethod(postData);
    if (!paymentMethodResponse.status) return paymentMethodResponse;
    postData.payment_method_id = paymentMethodResponse.payment_method_id;
    postData.address_id = paymentMethodResponse.service_address_id;
    postData.address_attributes = paymentMethodResponse.address_attributes;


    postData.service_address_id = paymentMethodResponse.service_address_id;
    postData.address_attributes = paymentMethodResponse.address_attributes;
    postData.payment_method_id = paymentMethodResponse.payment_method_id;




    console.log("Payment Method Response:", paymentMethodResponse);
    
    // 3️⃣ Create draft line
    const draftLineResponse = await createDraftLine(postData);
    if (!draftLineResponse.status) return draftLineResponse;
    postData.line_id = draftLineResponse.line.id;
    postData.shipping_address_id = draftLineResponse.shipping_address_id;
// console.log("Draft Line Response:", draftLineResponse);
    // 4️⃣ Create draft order
    const orderResponse = await createDraftOrder(postData);
    if (!orderResponse.status) return orderResponse;
    postData.bequick_order_id = orderResponse.order.id;
    postData.bequick_order_amount = orderResponse.order.total;

    // // 5️⃣ Make payment
    const orderPaymentResponse = await orderPayment(postData);
    if (!orderPaymentResponse.status) return orderPaymentResponse;

    // 6️⃣ Submit order
    const submitResponse = await submitOrder(postData.bequick_order_id);
    if (!submitResponse.status) return submitResponse.response;

    return {
      status: true,
      message: "Order processed successfully",
      data: postData,
      orderresponse: submitResponse,
    };
  } catch (error) {
    return {
      status: false,
      message: "Unexpected error while processing order",
      error: error.message,
    };
  }
}

/* -------------------- HELPER FUNCTIONS -------------------- */
export async function storeServiceAddress(
  subscriberId,
  name,
  phone,
  address1,
  address2,
  city,
  state,
  zip,
  country = "US",
  isPrimary = false
) {
  try {
    const validateData = { address1, address2, city, state, zip };
    const validateResp = await beQuickRequest("/addresses/validate", "POST", validateData);

    const data = {
      address: {
        primary: isPrimary,
        name:name,
        phone_number: phone,
        zip:zip,
        country_code: country,
        usps_validated: true,
        subscriber_id: subscriberId,
        ...validateResp,
      },
    };
    console.log("Store Address validate Data skm:", data);
    const response = await beQuickRequest("/addresses", "POST", data);
    if (response?.errors){
      return { status: false, message: "Failed to store address", error: response.errors };
    }else{
      console.log("Store Address Response:", response);
      return {
        status: true,
        address_id: response.addresses?.[0]?.id,
        address_attributes:validateResp,
      };
    }
  } catch (error) {
    return { status: false, message: "Error storing service address", error };
  }
}

export async function createSubscriberAndFetch(postData) {
  try {
    const email = postData.billingAddress?.email || postData.shippingAddress?.email;
    const firstName = postData.billingAddress?.firstName || "Unknown";
    const lastName = postData.billingAddress?.lastName || "Unknown";
    const phone = postData.billingAddress?.phone || "9999999999";

    // Try fetch
    let found = await getSubscriberByEmail(email);
    if (found && found.subscriber_id) return { status: true, subscriber_id: found.subscriber_id };

    // Create if not exists
    const data = {
      action: "create",
      subscriber: {
        first_name: firstName,
        last_name: lastName,
        email,
        company_id: "1",
        phone,
        addresses_attributes:[
          {
            address1: postData.billingAddress?.street || "",
            address2: postData.billingAddress?.houseNumber || "",
            city: postData.billingAddress?.city || "",  
            state: postData.billingAddress?.state || "",
            zip: postData.billingAddress?.zip || "",
            country_code: postData.billingAddress?.country || "US",
          }
        ]
      },
    };

    const response = await beQuickRequest("/subscribers", "POST", data);

    const id = response?.subscribers?.[0]?.id;
    if (!id) return { status: false, message: "Failed to create subscriber" };

    return { status: true, subscriber_id: id };
  } catch (err) {
    return { status: false, message: err.message };
  }
}

export async function addPaymentMethod(postData) {
  const subscriberId = postData.subscriber_id;
  const name = `${postData.cardAddress?.firstName } ${postData.cardAddress?.lastName}`.trim();
  const cardNumber = postData.cardDetails?.cardNumber || "";
  const cardExpiry = postData.cardDetails?.expiry || "";
  const cvc = postData.cardDetails?.cvc || "";
  const street = postData.cardAddress?.street || "";
  const city = postData.cardAddress?.city || "";  
  const state = postData.cardAddress?.state || "";  
  const zip = postData.cardAddress?.zip || "";
  const country = postData.cardAddress?.country || "US";
  const phone = postData.billingAddress?.phone || "9999999999";
  const email = postData.billingAddress?.email || "skm@gmail.com";
  // 1️⃣ Tokenize
  const tokenResponse = await tokenizationCard(
    name,
    cardNumber,
    cardExpiry,
    street,
    city,
    state,
    zip,
    phone,
    email
  );

  if (!tokenResponse.status) return tokenResponse;

  // 2️⃣ Store address
  const addrResponse = await storeServiceAddress(
    subscriberId,
    `${postData.billingAddress?.firstName} ${postData.billingAddress?.lastName}`,
    phone,
    street,
    "",
    city,
    state,
    zip,
    country,
  );

  if (!addrResponse.status) return addrResponse;
  // if (addrResponse.status) return addrResponse;
  console.log("Address Response skm:", addrResponse);
  // postData.service_address_id = addrResponse.address_id;
  // postData.address_attributes = addrResponse.address_attributes;
  console.log("payment method storeServiceAddress skm:", addrResponse);
  console.log(postData);
  const cleanedExpiry = cardExpiry.replace(/\D/g, ""); // "01/23" -> "0123"
  const [expiryMonth, expiryYear] = cleanedExpiry.match(/.{1,2}/g) || ["", ""];

  // 3️⃣ Create payment method
  const data = {
    payment_method: {
      type: "CreditCard",
      payment_method_nonce: tokenResponse.token,
      cvv: cvc,
      expiration_month: expiryMonth,
      expiration_year: expiryYear,
      address_id: addrResponse.address_id,
      payment_type_id: 3,
      subscriber_id: subscriberId,
    },
  };
  console.log("Payment Method Data:", data);
  const response = await beQuickRequest("/payment_methods", "POST", data);
  if (response?.errors)
    return { status: false, message: response.errors?.base?.join("<br>") || "Payment failed" };

  // postData.payment_method_id = response?.payment_methods?.[0]?.id || null;
  return { status: true, message: "Payment method added successfully",   service_address_id :addrResponse.address_id, address_attributes: addrResponse.address_attributes,payment_method_id:response?.payment_methods?.[0]?.id };
}

export async function createDraftLine(postData) {
  let data = {
    line: {
      subscriber_id: postData.subscriber_id,
      carrier_id: 1,
      service_address_id: postData.address_id,
      status: "draft",
    },
  };

  const cart = postData.cart || [];
  if (cart.length === 0) return { status: false, message: "Empty cart" };
  const i = 0;
  for (const item of cart) {
    if (item.lineType === "portNumber") {
      data.line.device_serial = item.formData.imei;
      const number_port_attributes = {
        mdn: item.formData.mdn,
        first_name: item.formData.firstName || "Unknown",
        last_name: item.formData.lastName || "Unknown",
        carrier_account: item.formData.carrier_account,
        carrier_password: item.formData.carrier_password,
        address_attributes : postData.address_attributes
      };
      data.line.number_port_attributes = number_port_attributes;
      // Merge into the line data
      data.line.number_port_attributes.address_attributes = postData.address_attributes;
    }
     console.log("Draft Line Data:", data);
       // Send to API
      const response = await beQuickRequest("/lines", "POST", data);
      if (response?.errors)
        return { status: false, message: "Unable to create draft line", error: response.errors };
      postData.cart[i].line_id = response.lines?.[0]?.id; 
      return {
        status: true,
        line: response.lines?.[0],
        shipping_address_id: postData.service_address_id,
      };
      i++;
  }

 


}

export async function createDraftOrder(postData) {
  let planCount = 0;
  let simCount = 0;

  const ESIM_PRODUCT_ID = 20; // replace with real ID
  const PSIM_PRODUCT_ID = 19; // replace with real ID
  const DEVICE_PROTECTION_PRODUCT_ID = 19; 

  const cart = postData.cart || [];
  if (cart.length === 0) {
    return { status: false, message: "Empty cart" };
  }

  let orderDetailsAttributes = []; // should be an array (since you're pushing per product)

  for (const product of cart) {
    const simType = (product.simType || "").trim();
    // console.log("simType:", simType);

    // Add plan first
    orderDetailsAttributes.push({
      product_id: parseInt(product.planBqid),
      line_id: product.line_id,
    });
    planCount++;

    // Then add SIM type
    if (simType === "eSIM") {
      orderDetailsAttributes.push({
        product_id: ESIM_PRODUCT_ID,
        line_id: product.line_id,
      });
      simCount++;
      console.log("Added eSIM:", orderDetailsAttributes);
    } else if (simType === "pSIM") {
      orderDetailsAttributes.push({
        product_id: PSIM_PRODUCT_ID,
        line_id: product.line_id,
      });
      simCount++;
      console.log("Added pSIM:", orderDetailsAttributes);
    } else if (simType === "device_protection") {
      orderDetailsAttributes.push({
        product_id: DEVICE_PROTECTION_PRODUCT_ID,
        line_id: product.line_id,
      });
      simCount++;
      console.log("Added Device_Protection:", orderDetailsAttributes);
    } else {
      console.warn("Unknown SIM type:", simType);
    }
  }
  //  console.log("orderDetailsAttributes:", orderDetailsAttributes);


  // ----- Validate plan and SIM presence -----
  if (planCount === 0 && simCount === 0) {
    return {
      status: false,
      message:
        "Cannot create order without plan and SIM to process the BYOD order.",
    };
  }

  // ----- Final data structure -----
  const data = {
    order: {
      subscriber_id: postData.subscriber_id,
      apply_taxes: true,
      order_details_attributes: orderDetailsAttributes,
    },
  };

  // console.log("Draft Order Data:", data);

  // ----- Send API request -----
  const response = await beQuickRequest("/orders", "POST", data);
console.log("Draft Order Response:", response);
  // ----- Handle errors -----
  if (response?.errors) {
    return {
      status: false,
      message: "Unable to create order for subscriber",
      error: response.errors,
    };
  }

  return {
    status: true,
    order: response.orders?.[0],
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
  // console.log("Order Payment Data:", data);
  const response = await beQuickRequest("/order_payments", "POST", data);
  if (response?.errors)
    return { status: false, message: "Order payment failed", error: response.errors };
  return { status: true };
}

export async function submitOrder(orderId) {
  const response = await beQuickRequest(`/orders/${orderId}/submit`, "POST");
  if (response?.errors) return { status: false, message: "Submit failed", error: response.errors };
  return { status: true,response: response  };
}

export async function getSubscriberByEmail(email) {
  const result = await beQuickRequest(
    `/subscribers?filter_by[0][value]=${encodeURIComponent(email)}&filter_by[0][column]=email`,
    "GET"
  );

  const id =
    result?.data?.subscribers?.[0]?.id ||
    result?.subscribers?.[0]?.id ||
    result?.subscriber?.subscribers?.[0]?.id;
  return id ? { subscriber_id: id } : false;
}


export async function activateSim(simDetails) {
  console.log("Activating SIM with details:", simDetails);
  const data = {
                  delivery: {
                      tracking_number: simDetails,
                      delivery_details_attributes: [{
                        label: "IMEI",
                        value: simDetails.imei,
                        order_detail_id: 0
                      }, {
                        label: "ICCID",
                        value: simDetails.iccid,
                        order_detail_id: 0
                      }]
                    },
                };

  try {
    const response = await beQuickRequest("/deliveries/"+simDetails.deliveriesID+"/deliver", "PUT", data);
    console.log("Activation Response:", response);
    return response;
  } catch (error) {
    console.error("Error activating SIM:", error);
    throw error;
  }
}
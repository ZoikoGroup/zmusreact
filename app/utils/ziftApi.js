// utils/ziftApi.js
const ZIFT_API_BASE = "https://secure.zift.io";

export async function ziftRequest(url, formData = {}, headers = {}, timeout = 30) {
  const fullUrl = ZIFT_API_BASE + url;

  // Convert formData into x-www-form-urlencoded string if it's an object
  const body =
    typeof formData === "object"
      ? new URLSearchParams(formData).toString()
      : formData;

  // Default headers
  const defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: { ...defaultHeaders, ...headers },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const text = await response.text();

    // Try to parse query-style response (like `key1=value1&key2=value2`)
    let parsed = {};
    try {
      new URLSearchParams(text).forEach((v, k) => (parsed[k] = v));
    } catch {
      parsed = text;
    }

    // Optional: log request/response
    console.info("ZIFT Request Log:", {
      endpoint: url,
      method: "POST",
      request: formData,
      response: parsed,
    });

    return parsed;
  } catch (error) {
    console.error("ZIFT Request Error:", error.message);
    return { error: error.message };
  }
}

export async function tokenizationCard(
  name,
  cardNumber,
  cardExpiry,
  street,
  city,
  state,
  zipCode,
  phone,
  email
) {
  const data = {
    "requestType": "tokenization",
    "userName" : "api-zoiko-pmt-7225001",
    "password" : "L70Q8u5LckH1cTUDme4yRH91PAaLVI7C",
    "accountId" : "7225001",
    "accountType" : "R",
    "accountNumber" : cardNumber,
    "accountAccessory" : `${cardExpiry.replace("/", "")}`,
    "holderType" : "P",
    "holderName" : name,
    "transactionIndustryType" : "RE",
    "countryCode" : "US",
    "street" : street,
    "city" : city,
    "state" : state,
    "zipCode" : zipCode,
    "phone" : phone,
    "email" : email
  };

  const response = await ziftRequest("/gates/xurl", data);
console.log("🧾 Server Response:", data);
  if (response?.responseCode === "A01") {
    return {
      status: true,
      token: response.token,
    };
  }

  return {
    status: false,
    message: response?.failureMessage || "Tokenization failed",
  };
}
export async function ziftConnectionTest() {
  const data = {
    "requestType": "ping",
    "userName" : "api-zoiko-mst-8001000",
    "password" : "o4NKbBaQjqe0b3IsQysF8EDDI70tro7v",
  };

  const response = await ziftRequest("/gates/xurl", data);

  return {
    message: response,
  };
}

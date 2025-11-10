"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import "./Dashboard.css";
import {
  Modal,
  Button,
  Form,
  Spinner,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Named imports for both APIs
import * as dasdBeQuick from "../utils/dasdbeQuickApi";
import * as beQuick from "../utils/beQuickApiPay";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscriber, setSubscriber] = useState(null);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    card_number: "",
    expiry_date: "",
    cvv: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_line1: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [processingPayment, setProcessingPayment] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (!userData?.email) {
          setError("Please log in first.");
          setLoading(false);
          return;
        }

        const res = await dasdBeQuick.getSubscriberByEmail(userData.email);
        let s = res?.data || res;

        if (!s?.subscriber_id) {
          setError("Subscriber not found. Please log in again.");
          setLoading(false);
          return;
        }

        setSubscriber(s);
        setBillingAddress({
          first_name: s.first_name || "",
          last_name: s.last_name || "",
          email: s.email || userData.email,
          phone: s.phone_number || "",
          address_line1: s.address_line1 || "",
          city: s.city || "",
          state: s.state || "",
          zip: s.zip || "",
          country: s.country || "US",
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load subscriber data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriber();
  }, []);

  const handlePayNow = async () => {
    if (!subscriber || !subscriber.subscriber_id) {
      alert("Subscriber missing. Please log in again.");
      return;
    }

    if (!newCard.card_number || !newCard.expiry_date || !newCard.cvv) {
      alert("Please enter card details.");
      return;
    }

    setProcessingPayment(true);
    try {
      // ✅ Your provided static payload
      const payload = {
        billingAddress: {
          firstName: "Kessna",
          lastName: "McDuffie",
          companyName: "skm888@abc.com",
          region: "United States (US)",
          state: "FL",
          city: "CLERMONT",
          street: "Tahoe Circle",
          houseNumber: "skm888@abc.com",
          zip: "34714",
          phone: "7438848851",
          email: "anowar@abc.com",
        },
        shippingAddress: {
          firstName: "Kessna",
          lastName: "McDuffie",
          companyName: "skm888@abc.com",
          region: "United States (US)",
          state: "FL",
          city: "CLERMONT",
          street: "Tahoe Circle",
          houseNumber: "skm888@abc.com",
          zip: "34714",
          phone: "7438848851",
          email: "anowar@abc.com",
        },
        cardAddress: {
          firstName: "Kessna",
          lastName: "McDuffie",
          street: "Tahoe Circle",
          city: "CLERMONT",
          state: "FL",
          zip: "34714",
          region: "United States (US)",
          phone: "7438848851",
        },
        cardDetails: {
          cardNumber: "5348600116405256",
          expiry: "01/30",
          cvc: "876",
        },
        coupon: null,
        cart: [
          {
            planTitle: "Zoiko Flex ",
            planSlug: "zoiko-flex",
            planId: 2,
            planPrice: "13.00",
            planDuration: "mo",
            planBqid: "3",
            planType: "prepaid-plans",
            lineType: "newLine",
            simType: "pSIM",
            formData: {},
          },
        ],
        
        agreedToTerms: true,
        createdAt: new Date().toISOString(),
        subscriber_id: subscriber.subscriber_id,
      };

      console.log("🟦 Sending payload to beQuick.processOrder:", payload);
      const result = await beQuick.processOrder(payload);
      console.log("🟩 BeQuick.processOrder result:", result);
      setOrderResponse(result);
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Check console for details.");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" /> <p>Loading Dashboard...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-5 text-danger">
        <h5>{error}</h5>
      </div>
    );

  return (
    <>
      <Header />
      <HeadBar text="Your Dashboard" />

      <Container className="py-4">
        <h2 className="mb-3">
          Hello, {subscriber?.first_name || "Subscriber"}!
        </h2>

        <Row>
          <Col md={6}>
            <Card className="p-3 mb-3">
              <h5>Subscriber Details</h5>
              <hr />
              <p><strong>ID:</strong> {subscriber?.subscriber_id}</p>
              <p><strong>Email:</strong> {subscriber?.email}</p>
              <p><strong>Phone:</strong> {subscriber?.phone_number}</p>
              <p><strong>City:</strong> {subscriber?.city}</p>
            </Card>

            <Card className="p-3">
              <h5>Card Information</h5>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    value={newCard.card_number}
                    onChange={(e) =>
                      setNewCard({ ...newCard, card_number: e.target.value })
                    }
                    placeholder="4111111111111111"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Expiry (MM/YY)</Form.Label>
                  <Form.Control
                    value={newCard.expiry_date}
                    onChange={(e) =>
                      setNewCard({ ...newCard, expiry_date: e.target.value })
                    }
                    placeholder="01/30"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    value={newCard.cvv}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cvv: e.target.value })
                    }
                    placeholder="123"
                  />
                </Form.Group>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handlePayNow}
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </Form>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3">
              <h5>Payment Response</h5>
              {orderResponse ? (
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                >
                  {JSON.stringify(orderResponse, null, 2)}
                </pre>
              ) : (
                <div className="text-muted">No payment yet.</div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

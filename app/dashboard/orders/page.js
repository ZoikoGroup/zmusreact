"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import beQuick from "../../utils/dasdbeQuickApi";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userEmail = userData?.email;

        if (!userEmail) {
          setError("User not found");
          return;
        }

        const subscriberResult = await beQuick.getSubscriberByEmail(userEmail);

        if (!subscriberResult?.subscriber_id) {
          setError("Subscriber not found");
          return;
        }

        const SUBSCRIBER_ID = subscriberResult.subscriber_id;

        const ord = await beQuick.getOrders(SUBSCRIBER_ID);

        setOrders(ord?.orders || ord?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <HeadBar text="Your Orders & Transactions" />

      <div className="container py-4">
        <h4 className="mb-4 fw-bold">All Orders</h4>

        {loading && (
          <div className="text-center py-4">
            <Spinner />
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && orders.length === 0 && (
          <div className="text-center py-5">
            <h5>No Orders Found</h5>
            <p className="text-muted">You haven’t placed any orders yet.</p>
            <Link href="/all-plans" className="btn btn-success">
              Explore Plans
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="row g-4">
            {orders.map((order, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="fw-bold mb-2">
                      Order #{order.id || order.order_id}
                    </h6>

                    <p className="text-muted small mb-2">
                      {order.date || order.created_at}
                    </p>

                    <p className="mb-2">
                      {order.description || "Plan Purchase"}
                    </p>

                    <h5 className="text-success mb-3">
                      ${Number(order.amount || order.total || 0).toFixed(2)}
                    </h5>

                    <span
                      className={`badge ${
                        order.status === "completed"
                          ? "bg-success"
                          : order.status === "pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status || "Unknown"}
                    </span>

                    <div className="mt-3">
                      <button className="btn btn-outline-success btn-sm w-100">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
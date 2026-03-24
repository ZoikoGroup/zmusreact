"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import { Spinner, Form } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
import beQuick from "../../utils/dasdbeQuickApi";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  // ---------------- Fetch Orders ----------------
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
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------- Filter + Search ----------------
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        (order.id || order.order_id || "")
          .toString()
          .includes(search) ||
        (order.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (order.status || "").toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ---------------- Pagination ----------------
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* ✅ SEO META (client side) */}
      <Head>
        <title>My Orders | Zoiko Mobile Dashboard</title>
        <meta
          name="description"
          content="View all your Zoiko Mobile orders, billing history, and transactions in one place."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <Header />
      <HeadBar text="Your Orders & Transactions" />

      <div className="container py-4">
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">All Orders</h4>
          <span className="text-muted small">
            Total: {filteredOrders.length} orders
          </span>
        </div>

        {/* Filters */}
        <div className="card p-3 shadow-sm border-0 mb-4 rounded-4">
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Control
                type="text"
                placeholder="🔍 Search orders..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="col-md-3">
              <Form.Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </Form.Select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <Spinner />
          </div>
        )}

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Empty */}
        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-5">
            <h5>No Orders Found</h5>
            <p className="text-muted">Try changing filters or search</p>
          </div>
        )}

        {/* Orders */}
        <div className="row g-4">
          {paginatedOrders.map((order, i) => {
            const status = (order.status || "").toLowerCase();

            const badgeClass =
              status === "completed"
                ? "bg-success"
                : status === "processing"
                ? "bg-info text-dark"
                : status === "pending"
                ? "bg-warning text-dark"
                : status === "failed"
                ? "bg-danger"
                : "bg-secondary";

            return (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="card border-0 shadow-sm rounded-4 h-100 order-card">
                  <div className="card-body d-flex flex-column">

                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="fw-bold">
                        Order #{order.id || order.order_id}
                      </h6>
                      <span className={`badge ${badgeClass}`}>
                        {status || "unknown"}
                      </span>
                    </div>

                    <small className="text-muted mb-2">
                      {order.date || order.created_at}
                    </small>

                    <p className="flex-grow-1 text-muted">
                      {order.description || "Plan Purchase"}
                    </p>

                    <h5 className="text-success fw-bold">
                      ${Number(order.amount || order.total || 0).toFixed(2)}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${
                  currentPage === i + 1
                    ? "btn-success"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
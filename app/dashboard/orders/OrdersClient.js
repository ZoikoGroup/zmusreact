"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import { Spinner, Form } from "react-bootstrap";
import Link from "next/link";
import beQuick from "../../utils/dasdbeQuickApi";

export default function OrdersClient() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

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

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <HeadBar text="Your Orders & Transactions" />

      <div className="container py-4">
        <h4 className="fw-bold mb-4">All Orders</h4>

        {/* Filters */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Form.Control
              type="text"
              placeholder="Search..."
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
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </Form.Select>
          </div>
        </div>

        {loading && <Spinner />}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {paginatedOrders.map((order, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="card p-3 shadow-sm">
                <h6>Order #{order.id || order.order_id}</h6>
                <p className="small text-muted">
                  {order.date || order.created_at}
                </p>
                <p>{order.description}</p>
                <strong>
                  ${Number(order.amount || order.total || 0).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 text-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="mx-2">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
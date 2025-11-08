"use client";

import { useEffect, useState } from "react";
import { FaSimCard, FaMobileAlt, FaDatabase } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import beQuick from "../utils/dasdbeQuickApi";
import "../dashboard/Dashboard.css";

const DevicesPage = () => {
  const [loading, setLoading] = useState(true);
  const [subscriber, setSubscriber] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [devices, setDevices] = useState([]);

  const SUBSCRIBER_ID = 54;

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const subDetails = await beQuick.getSubscriberDetails(SUBSCRIBER_ID);
        const subscriberInfo = subDetails?.subscribers?.[0];
        setSubscriber(subscriberInfo);

        if (subscriberInfo?.primary_line_id) {
          const pDetails = await beQuick.getPlanDetails(subscriberInfo.primary_line_id, true);
          setPlanDetails(pDetails);

          const deviceList = pDetails?.service_buckets?.length
            ? pDetails.service_buckets.map((bucket, idx) => ({
                label: `Device ${subscriberInfo?.mdn?.slice(-4) || idx + 1}`,
                note: bucket?.plan?.name || "pSIM • Primary Line",
                status: pDetails?.line?.status === "active" ? "Active" : "Pending",
                simType: pDetails?.line?.is_esim ? "eSIM" : "pSIM",
                phoneNumber: pDetails?.line?.mdn || "N/A",
                dataUsed: `${(Number(bucket?.services?.[0]?.used_units || 0) / 1024).toFixed(2)} GB`,
                dataTotal: `${(Number(bucket?.services?.[0]?.total_units || 0) / 1024).toFixed(2)} GB`,
              }))
            : [
                {
                  label: "No Device Found",
                  note: "N/A",
                  status: "Pending",
                  simType: "N/A",
                  phoneNumber: "N/A",
                  dataUsed: "0 GB",
                  dataTotal: "0 GB",
                },
              ];

          setDevices(deviceList);
        }
      } catch (err) {
        console.error("Error loading devices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handlePauseDevice = (device) => {
    alert(`Pausing ${device.label}...`);
  };

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="My Devices & SIMs" />

      <div className="dashboard-container container py-4">
        {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && (
          <div className="row g-3">
            {devices.map((d, i) => (
              <div key={i} className="col-md-6">
                <div className="card p-3 device-card">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>{d.label}</strong>
                      <p className="text-muted small mb-0">{d.note}</p>
                    </div>
                    <span
                      className={`badge ${
                        d.status === "Active" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>

                  <div className="mt-2 device-info">
                    <p>
                      <FaSimCard className="icon me-2" />
                      <strong>SIM Type:</strong> {d.simType}
                    </p>
                    <p>
                      <FaMobileAlt className="icon me-2" />
                      <strong>Phone Number:</strong> {d.phoneNumber}
                    </p>
                    <p>
                      <FaDatabase className="icon me-2" />
                      <strong>Data Used:</strong> {d.dataUsed} / {d.dataTotal}
                    </p>

                    {/* Optional visual data bar */}
                    <div className="data-bar">
                      <div
                        className="data-bar-filled"
                        style={{
                          width: `${(parseFloat(d.dataUsed) / parseFloat(d.dataTotal)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-success btn-sm mt-2"
                    onClick={() => handlePauseDevice(d)}
                  >
                    Pause Device
                  </button>
                </div>
              </div>
            ))}

            {/* Add new device button full width */}
            <div className="col-12">
              <button className="btn btn-success btn-block mt-3">+ Add New Device</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DevicesPage;

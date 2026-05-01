"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import "../Dashboard.css";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load user + token from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const storedToken = localStorage.getItem("zoiko_token") || "";

    setName(userData.name || "");
    setEmail(userData.email || "");
    setUserId(userData.id || "");
    setToken(storedToken);
  }, []);

  // ✅ Save profile
  const handleSave = async () => {
    if (!name || !email) {
      setMessage("❌ Name and Email are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://zmapi.zoikomobile.co.uk/api/user/update/${userId}`,
        {
          method: "POST", // ⚠️ As per your curl
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            email: email,
          }),
        }
      );

      const data = await res.json();
      console.log("API Response:", data);

      if (data.success) {
        setMessage("✅ Profile updated successfully!");

        // ✅ Update localStorage user
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("user") || "{}"),
          name: name,
          email: email,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        setMessage("❌ Update failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HeadBar text="Edit Profile" />

      <div className="dashboard-container container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card p-4 shadow-sm">
              <h4 className="fw-bold mb-3 text-success">Edit Profile</h4>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email} readOnly
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              {/* Message */}
              {message && (
                <p
                  className={`small ${
                    message.startsWith("✅")
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {message}
                </p>
              )}

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => history.back()}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
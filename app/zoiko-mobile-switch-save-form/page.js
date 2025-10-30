"use client";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import {
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";

const SwitchSaveForm = () => {
  const [errors, setErrors] = useState({});
  const [plans, setPlans] = useState([]);
  const [planTypes, setPlanTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    msisdn: "",
    simno: "",
    plan: "",
    cat: "",
    ospno: "",
    osppass: "",
    addr1: "",
    addr2: "",
    city: "",
    state: "",
    zip: "",
    concent: false,
    terms: false,
  });

  // ✅ Fetch available plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          "https://zmapi.zoikomobile.co.uk/api/v1/plans"
        );
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setPlans(data.data);
          const uniqueTypes = [...new Set(data.data.map((plan) => plan.plan_type))];
          setPlanTypes(uniqueTypes);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "plan") {
      setFilteredPlans(plans.filter((p) => p.plan_type === value));
      setFormData({ ...formData, plan: value, cat: "" });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // ✅ Validation
  const validate = () => {
    const formErrors = {};

    if (!formData.fname) formErrors.fname = "⚠️ Name is required";
    if (!formData.email) {
      formErrors.email = "⚠️ Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "⚠️ Enter a valid email address";
    }
    if (!formData.msisdn) {
      formErrors.msisdn = "⚠️ Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.msisdn)) {
      formErrors.msisdn = "⚠️ Enter a valid 10-digit number";
    }
    if (!formData.simno) formErrors.simno = "⚠️ SIM number is required";
    if (!formData.plan) formErrors.plan = "⚠️ Please select a plan type";
    if (!formData.cat) formErrors.cat = "⚠️ Please select a plan";
    if (!formData.ospno) formErrors.ospno = "⚠️ This field is required";
    if (!formData.osppass) formErrors.osppass = "⚠️ This field is required";
    if (!formData.addr1) formErrors.addr1 = "⚠️ This field is required";
    if (!formData.city) formErrors.city = "⚠️ This field is required";
    if (!formData.state) formErrors.state = "⚠️ This field is required";
    if (!formData.zip) formErrors.zip = "⚠️ This field is required";
    if (!formData.concent) formErrors.concent = "⚠️ You must agree to the terms";
    if (!formData.terms) formErrors.terms = "⚠️ Consent is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setApiResponse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const [firstName, ...rest] = formData.fname.split(" ");
    const lastName = rest.join(" ") || "";

    const bequickPayload = {
      line: {
        subscriber_id: 96,
        carrier_id: 3,
        service_address_id: 1,
        status: "draft",
        number_port_attributes: {
          mdn: formData.msisdn,
          first_name: firstName,
          last_name: lastName,
          carrier_account: formData.ospno,
          carrier_password: formData.osppass,
          ssn: "1234",
          address_attributes: {
            primary: false,
            address1: formData.addr1,
            address2: formData.addr2,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
        },
      },
    };

    try {
      // ✅ Step 1: BeQuick API call
      const res = await fetch("https://zoiko-atom-api.bequickapps.com/lines", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "09ff2d85-a451-47e6-86bc-aba98e1e4629",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bequickPayload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "BeQuick API Error");

      // ✅ Step 2: Send data to Laravel API
      const saveRes = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/switch-save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, bequick_response: data }),
        }
      );

      const saveData = await saveRes.json();

      if (saveRes.ok) {
        setApiResponse({
          type: "success",
          message: "✅ Thank you! Your request has been submitted successfully.",
        });
        setFormData({
          fname: "",
          email: "",
          msisdn: "",
          simno: "",
          plan: "",
          cat: "",
          ospno: "",
          osppass: "",
          addr1: "",
          addr2: "",
          city: "",
          state: "",
          zip: "",
          concent: false,
          terms: false,
        });
      } else {
        throw new Error(saveData?.message || "Switch & Save API Error");
      }
    } catch (error) {
      console.error("Error:", error);
      setApiResponse({
        type: "danger",
        message: `⚠️ ${error.message || "Something went wrong, please try again."}`,
      });
    } finally {
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar
        text={
          <>
            Switch to Simplicity:{" "}
            <span className="txtyellow">
              <i className="bi bi-music-note-beamed"></i>
            </span>{" "}
            More Data{" "}
            <span className="txtyellow">
              <i className="bi bi-music-note-beamed"></i>
            </span>{" "}
            More Savings{" "}
            <span className="txtyellow">
              <i className="bi bi-music-note-beamed"></i>
            </span>{" "}
            Less Hassle
          </>
        }
      />

      <Container fluid className="bglite">
        <Container className="py-5">
          <h2 className="text-center">Speed up your savings with Zoiko Mobile!</h2>
          <p className="body22 text-center">Fill Out the Switch & Save Form</p>

          {apiResponse && (
            <Alert variant={apiResponse.type} className="text-center">
              {apiResponse.message}
            </Alert>
          )}

          {loadingPlans ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
              <p>Loading available plans...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {/* Name & Email */}
              <Row>
                <Col md={6}>
                  <FormLabel>Full Name *</FormLabel>
                  <Form.Control
                    type="text"
                    name="fname"
                    onChange={handleChange}
                    value={formData.fname}
                    placeholder="First and last name"
                  />
                  <div className="form-error">{errors.fname || ""}</div>
                </Col>
                <Col md={6}>
                  <FormLabel>Email *</FormLabel>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Email"
                  />
                  <div className="form-error">{errors.email || ""}</div>
                </Col>
              </Row>

              {/* Mobile & SIM */}
              <Row className="mt-3">
                <Col md={6}>
                  <FormLabel>MSISDN *</FormLabel>
                  <Form.Control
                    type="text"
                    name="msisdn"
                    onChange={handleChange}
                    value={formData.msisdn}
                    placeholder="Enter 10-digit mobile number"
                  />
                  <div className="form-error">{errors.msisdn || ""}</div>
                </Col>
                <Col md={6}>
                  <FormLabel>SIM Number *</FormLabel>
                  <Form.Control
                    type="text"
                    name="simno"
                    onChange={handleChange}
                    value={formData.simno}
                    placeholder="Enter 19-digit SIM Serial Number"
                  />
                  <div className="form-error">{errors.simno || ""}</div>
                </Col>
              </Row>

              <hr className="my-5" />
              <h4 className="text-center">Choose Your New Zoiko Mobile Plan</h4>

              {/* Plan Type & Plan */}
              <Row>
                <Col md={6}>
                  <FormLabel>Plan Type *</FormLabel>
                  <Form.Select name="plan" onChange={handleChange} value={formData.plan}>
                    <option value="">-- Select Plan Type --</option>
                    {planTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="form-error">{errors.plan || ""}</div>
                </Col>
                <Col md={6}>
                  <FormLabel>Plan *</FormLabel>
                  <Form.Select name="cat" onChange={handleChange} value={formData.cat}>
                    <option value="">-- Select Plan --</option>
                    {filteredPlans.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.currency}
                        {p.price}/{p.duration_type})
                      </option>
                    ))}
                  </Form.Select>
                  <div className="form-error">{errors.cat || ""}</div>
                </Col>
              </Row>

              <hr className="my-5" />
              {/* Account Info */}
              <Row>
                <Col md={6}>
                  <FormLabel>OSP Account Number *</FormLabel>
                  <Form.Control
                    type="text"
                    name="ospno"
                    onChange={handleChange}
                    value={formData.ospno}
                  />
                  <div className="form-error">{errors.ospno || ""}</div>
                </Col>
                <Col md={6}>
                  <FormLabel>OSP Password/PIN *</FormLabel>
                  <Form.Control
                    type="text"
                    name="osppass"
                    onChange={handleChange}
                    value={formData.osppass}
                  />
                  <div className="form-error">{errors.osppass || ""}</div>
                </Col>
              </Row>

              {/* Address */}
              <Row className="mt-3">
                <Col md={6}>
                  <FormLabel>Address Line 1 *</FormLabel>
                  <Form.Control
                    type="text"
                    name="addr1"
                    onChange={handleChange}
                    value={formData.addr1}
                  />
                  <div className="form-error">{errors.addr1 || ""}</div>
                </Col>
                <Col md={6}>
                  <FormLabel>Address Line 2 *</FormLabel>
                  <Form.Control
                    type="text"
                    name="addr2"
                    onChange={handleChange}
                    value={formData.addr2}
                  />
                  <div className="form-error">{errors.addr2 || ""}</div>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={4}>
                  <FormLabel>City *</FormLabel>
                  <Form.Control
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                  />
                  <div className="form-error">{errors.city || ""}</div>
                </Col>

                {/* ✅ CHANGED STATE FIELD TO TEXT INPUT */}
                <Col md={4}>
                  <FormLabel>State *</FormLabel>
                  <Form.Control
                    type="text"
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                    placeholder="Enter state code or name"
                  />
                  <div className="form-error">{errors.state || ""}</div>
                </Col>

                <Col md={4}>
                  <FormLabel>ZIP *</FormLabel>
                  <Form.Control
                    type="text"
                    name="zip"
                    onChange={handleChange}
                    value={formData.zip}
                  />
                  <div className="form-error">{errors.zip || ""}</div>
                </Col>
              </Row>

              {/* Terms */}
              <br />
              <Form.Check
                label={
                  <>
                    I agree to the{" "}
                    <a href="/terms-and-conditions" className="txtred">
                      Terms and Conditions
                    </a>{" "}
                    of Zoiko Mobile.
                  </>
                }
                name="concent"
                onChange={handleChange}
                checked={formData.concent}
              />
              <div className="form-error">{errors.concent || ""}</div>

              <Form.Check
                label="I consent to transfer my service to Zoiko Mobile and understand that my current service will end once the switch completes."
                name="terms"
                onChange={handleChange}
                checked={formData.terms}
              />
              <div className="form-error">{errors.terms || ""}</div>

              {/* Submit */}
              <br />
              <Button variant="danger" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner size="sm" animation="border" /> Submitting...
                  </>
                ) : (
                  "Switch & Save Today"
                )}
              </Button>
            </Form>
          )}
        </Container>
      </Container>

      <Footer />

      <style jsx global>{`
        .form-error {
          color: #d9534f;
          font-size: 13px;
          line-height: 1;
          margin-top: 3px;
          height: 14px;
          display: block;
          transition: opacity 0.2s ease;
        }
        .form-error:empty {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default SwitchSaveForm;
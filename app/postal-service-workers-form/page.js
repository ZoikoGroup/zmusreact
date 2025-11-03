"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Row,
  InputGroup,
} from "react-bootstrap";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Countrycode from "../products/countrycode.json";

const PostalWorkersForm = () => {
  const [errors, setErrors] = useState({});
  const [plans, setPlans] = useState([]);
  const [planTypes, setPlanTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    dob: "",
    countrycode: "",
    phone: "",
    statusproof: "",
    plan: "",
    cat: "",
    concent: false,
    terms: false,
    familyFriends: [{ famname: "", famemail: "" }], // ✅ Initialize properly
  });

  // Fetch all plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/plans");
        const data = await res.json();

        if (data?.data?.length) {
          setPlans(data.data);
          const uniqueTypes = [
            ...new Set(data.data.map((p) => p.plan_type).filter(Boolean)),
          ];
          setPlanTypes(uniqueTypes);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  // Filter plans based on selected type
  useEffect(() => {
    if (formData.plan) {
      const filtered = plans.filter((p) => p.plan_type === formData.plan);
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans([]);
    }
  }, [formData.plan, plans]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 10) {
        setFormData({ ...formData, [name]: cleaned });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  // Handle family/friend field changes
  const handleFamilyFriendChange = (index, field, value) => {
    const updated = [...formData.familyFriends];
    updated[index][field] = value;
    setFormData({ ...formData, familyFriends: updated });
  };

  // Add new family/friend row
  const addFamilyFriendRow = () => {
    if (formData.familyFriends.length < 5) {
      setFormData({
        ...formData,
        familyFriends: [...formData.familyFriends, { famname: "", famemail: "" }],
      });
    } else {
      alert("⚠️ You can add up to 5 family or friends only.");
    }
  };

  // Remove family/friend row
  const removeFamilyFriendRow = (index) => {
    const updated = formData.familyFriends.filter((_, i) => i !== index);
    setFormData({ ...formData, familyFriends: updated });
  };

  // Validation
  const validate = () => {
    const formErrors = {};

    if (!formData.fname.trim()) formErrors.fname = "⚠️ Full name is required.";
    if (!formData.email)
      formErrors.email = "⚠️ Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "⚠️ Invalid Email Format.";
    if (!formData.dob) formErrors.dob = "⚠️ Date of birth is required.";
    if (!formData.countrycode)
      formErrors.countrycode = "⚠️ Country code is required.";
    if (!formData.phone)
      formErrors.phone = "⚠️ Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      formErrors.phone = "⚠️ Phone number must be exactly 10 digits.";
    if (!formData.statusproof)
      formErrors.statusproof = "⚠️ Upload of ID or Proof is required.";
    if (!formData.plan) formErrors.plan = "⚠️ Please select a plan type.";
    if (!formData.cat) formErrors.cat = "⚠️ Please select a plan.";
    if (!formData.concent)
      formErrors.concent = "⚠️ Please confirm your selected plan.";
    if (!formData.terms)
      formErrors.terms = "⚠️ Please agree to terms.";

    // Validate family/friend emails if provided
    formData.familyFriends.forEach((f, i) => {
      if (f.famemail && !/\S+@\S+\.\S+/.test(f.famemail)) {
        formErrors[`famemail_${i}`] = "⚠️ Invalid Family/Friend Email.";
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Submit
  // Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    // Build JSON data exactly like your Postman body
    const jsonData = {
      fname: formData.fname,
      email: formData.email,
      dob: formData.dob,
      countrycode: formData.countrycode,
      phone: formData.phone,
      statusproof: formData.statusproof?.name || "",
      plan: formData.plan,
      cat: formData.cat,
      familyFriends: formData.familyFriends.map(f => ({
        famname: f.famname,
        famemail: f.famemail
      })),
      concent: formData.concent,
      terms: formData.terms,
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(jsonData));

    // ✅ Append file properly
    if (formData.statusproof) {
      fd.append("file", formData.statusproof);
    }

    const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/postal-service-workers", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: fd,
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Application submitted successfully!");
      console.log("Response:", data);
    } else {
      alert(`⚠️ ${data.message || "Submission failed. Please try again."}`);
      console.error("Server response:", data);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("⚠️ Network error. Please check your connection.");
  }
};


  return (
    <>
      <TopHeader />
      <Header />
      <HeadBar text={<>U.S. Postal Service Workers Registration</>} />

      <Container fluid className="bglite py-5">
        <Container className="bg-white shadow-lg rounded-4 p-5">
          <h3 className="text-center mb-4 fw-bold text-uppercase">
            U.S. Postal Service Workers Registration
          </h3>

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Basic Details */}
            <Row className="mb-3">
              <Col md={4}>
                <FormLabel>Full Name *</FormLabel>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="First and last name"
                />
                <div className="form-error">{errors.fname || ""}</div>
              </Col>
              <Col md={4}>
                <FormLabel>Email *</FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
                <div className="form-error">{errors.email || ""}</div>
              </Col>
              <Col md={4}>
                <FormLabel>Date of Birth *</FormLabel>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <div className="form-error">{errors.dob || ""}</div>
              </Col>
            </Row>

            {/* Phone */}
            <Row className="mb-3">
              <Col md={6}>
                <FormLabel>Phone Number *</FormLabel>
                <InputGroup>
                  <Form.Select
                    name="countrycode"
                    onChange={handleChange}
                    value={formData.countrycode}
                  >
                    <option value="">Select Country</option>
                    {Countrycode.map((code) => (
                      <option key={code.code} value={code.dial_code}>
                        {code.dial_code}, {code.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    name="phone"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </InputGroup>
                <div className="form-error">
                  {errors.countrycode || errors.phone || ""}
                </div>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <FormLabel>Upload ID / Proof *</FormLabel>
                  <Form.Control
                    type="file"
                    name="statusproof"
                    onChange={handleChange}
                    accept=".jpg,.png,.pdf"
                  />
                  <div className="form-error">{errors.statusproof || ""}</div>
                </Form.Group>
              </Col>
            </Row>

            {/* Plan Type */}
            <h4 className="text-center pt-4">Choose the Perfect Plan</h4>
            <Row className="mb-3">
              <Col md={6}>
                <FormLabel>Plan Type *</FormLabel>
                <Form.Select
                  name="plan"
                  onChange={handleChange}
                  value={formData.plan}
                >
                  <option value="">-- Select Plan Type --</option>
                  {planTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type.replace("-", " ").replace(/\b\w/g, (c) =>
                        c.toUpperCase()
                      )}
                    </option>
                  ))}
                </Form.Select>
                <div className="form-error">{errors.plan || ""}</div>
              </Col>

              <Col md={6}>
                <FormLabel>Category *</FormLabel>
                <Form.Select
                  name="cat"
                  onChange={handleChange}
                  value={formData.cat}
                  disabled={!filteredPlans.length}
                >
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

            {/* Family Section */}
            <h4 className="text-center pt-4">Add Family or Friends (Optional)</h4>
            <p className="text-center text-muted">
              Nominate up to 5 family members or friends to enjoy the same 20%
              discount.
            </p>

            {formData.familyFriends.map((friend, index) => (
              <Row className="mb-3" key={index}>
                <Col md={6}>
                  <FormLabel>Full Name</FormLabel>
                  <Form.Control
                    type="text"
                    name="famname"
                    value={friend.famname}
                    onChange={(e) =>
                      handleFamilyFriendChange(index, "famname", e.target.value)
                    }
                    placeholder="Full name"
                  />
                </Col>
                <Col md={6}>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      name="famemail"
                      value={friend.famemail}
                      onChange={(e) =>
                        handleFamilyFriendChange(
                          index,
                          "famemail",
                          e.target.value
                        )
                      }
                      placeholder="Email address"
                    />
                    {formData.familyFriends.length > 1 && (
                      <Button
                        variant="outline-danger"
                        onClick={() => removeFamilyFriendRow(index)}
                        title="Remove this row"
                      >
                        -
                      </Button>
                    )}
                  </InputGroup>
                  <div className="form-error">
                    {errors[`famemail_${index}`] || ""}
                  </div>
                </Col>
              </Row>
            ))}

            <Row className="mb-4">
              <Col>
                <Button variant="outline-primary" onClick={addFamilyFriendRow}>
                  + Add Family / Friend
                </Button>
              </Col>
            </Row>

            {/* Checkboxes */}
            <Form.Check
              label="Confirm your selected plan and verify the details of any nominated family and friends."
              name="concent"
              checked={formData.concent}
              onChange={handleChange}
              type="checkbox"
            />
            <div className="form-error">{errors.concent || ""}</div>

            <Form.Check
              label="By submitting this form, you agree to Zoiko Saver Deals' terms and conditions."
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              type="checkbox"
            />
            <div className="form-error">{errors.terms || ""}</div>

            <div className="text-center mt-4">
              <Button
                variant="danger"
                type="submit"
                className="px-5 py-2 rounded-pill fw-bold"
              >
                Submit Your Application
              </Button>
            </div>
          </Form>
        </Container>
      </Container>

      <Footer />
    </>
  );
};

export default PostalWorkersForm;

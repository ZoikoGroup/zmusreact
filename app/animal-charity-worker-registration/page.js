"use client";
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
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import Countrycode from "../products/countrycode.json";

const AnimalWorkerRegistration = () => {
  const [errors, setErrors] = useState({});
  const [familyMembers, setFamilyMembers] = useState([
    { famname: "", famemail: "", famphone: "", relation: "" },
  ]);
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    countrycode: "",
    phone: "",
    dob: "",
    statusproof: null,
    orgname: "",
    jobtitle: "",
    street: "",
    apprt: "",
    city: "",
    state: "",
    zipcode: "",
    concent: false,
    terms: false,
    updates: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔹 For scroll to top when message changes
  const messageRef = useRef(null);
  useEffect(() => {
    if (message.text && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleFamilyChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...familyMembers];
    updated[index][name] = value;
    setFamilyMembers(updated);
  };

  const addFamilyMember = () => {
    if (familyMembers.length < 5) {
      setFamilyMembers([
        ...familyMembers,
        { famname: "", famemail: "", famphone: "", relation: "" },
      ]);
    } else {
      alert("You can add up to 5 members only.");
    }
  };

  const removeFamilyMember = (index) => {
    const updated = [...familyMembers];
    updated.splice(index, 1);
    setFamilyMembers(updated);
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.fname) formErrors.fname = "Your name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Invalid email";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.dob) formErrors.dob = "Date of birth is required";
    if (!formData.statusproof) formErrors.statusproof = "Please upload your ID proof";
    if (!formData.orgname) formErrors.orgname = "Organization name is required";
    if (!formData.jobtitle) formErrors.jobtitle = "Job title is required";
    if (!formData.street) formErrors.street = "Street is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.state) formErrors.state = "State is required";
    if (!formData.zipcode) formErrors.zipcode = "ZIP code is required";
    if (!formData.concent) formErrors.concent = "You must confirm your information";
    if (!formData.terms) formErrors.terms = "You must accept the Terms & Conditions";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validate()) return;

    setSubmitting(true);
    const rawjson = { ...formData, familyMembers };
    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "statusproof" && value) {
        formPayload.append("statusproof", value);
      } else if (typeof value === "boolean") {
        formPayload.append(key, value ? "1" : "0");
      } else {
        formPayload.append(key, value);
      }
    });

    familyMembers.forEach((member, index) => {
      Object.entries(member).forEach(([key, val]) => {
        formPayload.append(`familyMembers[${index}][${key}]`, val);
      });
    });

    formPayload.append("rawjson", JSON.stringify(rawjson));

    try {
      const response = await fetch(
        "https://zmapi.zoikomobile.co.uk/api/v1/animal-worker-registration",
        {
          method: "POST",
          body: formPayload,
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: "✅ Registration submitted successfully! A confirmation email has been sent.",
        });

        // Reset form
        setFormData({
          fname: "",
          email: "",
          countrycode: "",
          phone: "",
          dob: "",
          statusproof: null,
          orgname: "",
          jobtitle: "",
          street: "",
          apprt: "",
          city: "",
          state: "",
          zipcode: "",
          concent: false,
          terms: false,
          updates: false,
        });
        setFamilyMembers([{ famname: "", famemail: "", famphone: "", relation: "" }]);
        setErrors({});
      } else {
        setMessage({
          type: "danger",
          text: data.message || "❌ Something went wrong while submitting.",
        });
        console.error(data);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage({
        type: "danger",
        text: "⚠️ Network error while submitting the form.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <HeadBar text={<>Animal Charity Worker Registration</>} />
      <Container fluid className="bglite py-5">
        <Container>
          <div ref={messageRef}>
            {message.text && (
              <Alert variant={message.type} className="text-center fw-bold">
                {message.text}
              </Alert>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormLabel>Full Name <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="fname"
                  onChange={handleChange}
                  value={formData.fname}
                  placeholder="First and last name"
                />
                {errors.fname && <p className="txtred">{errors.fname}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Email <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email"
                />
                {errors.email && <p className="txtred">{errors.email}</p>}
              </Col>
            </Row>

            <br />
            <Row>
              <Col md={6}>
                <FormLabel>Phone no <span className="txtred">*</span></FormLabel>
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
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="Phone number"
                  />
                </InputGroup>
                {errors.phone && <p className="txtred">{errors.phone}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Date of Birth <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={formData.dob}
                />
                {errors.dob && <p className="txtred">{errors.dob}</p>}
              </Col>
            </Row>

            <h4 className="text-center pt-5">Let’s confirm your eligibility for this program</h4>
            <p className="text-center">
              Upload a valid proof of employment, such as an ID badge or employment letter.
            </p>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Upload document <span className="txtred">*</span></Form.Label>
              <Form.Control
                type="file"
                name="statusproof"
                onChange={handleChange}
              />
              {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
            </Form.Group>

            <Row>
              <Col md={6}>
                <FormLabel>Name of Charity Organization <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="orgname"
                  placeholder="Organization name"
                  onChange={handleChange}
                  value={formData.orgname}
                />
                {errors.orgname && <p className="txtred">{errors.orgname}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Job Title <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="jobtitle"
                  placeholder="Your job title"
                  onChange={handleChange}
                  value={formData.jobtitle}
                />
                {errors.jobtitle && <p className="txtred">{errors.jobtitle}</p>}
              </Col>
            </Row>

            <br />
            <Row>
              <Col md={6}>
                <FormLabel>Street <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="street"
                  onChange={handleChange}
                  value={formData.street}
                  placeholder="Street address"
                />
                {errors.street && <p className="txtred">{errors.street}</p>}
              </Col>
              <Col md={6}>
                <FormLabel>Apartment/Unit (Optional)</FormLabel>
                <Form.Control
                  type="text"
                  name="apprt"
                  onChange={handleChange}
                  value={formData.apprt}
                  placeholder="Apartment"
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col md={4}>
                <FormLabel>City <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  placeholder="City"
                />
                {errors.city && <p className="txtred">{errors.city}</p>}
              </Col>
              <Col md={4}>
                <FormLabel>State <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={formData.state}
                  placeholder="State"
                />
                {errors.state && <p className="txtred">{errors.state}</p>}
              </Col>
              <Col md={4}>
                <FormLabel>ZIP <span className="txtred">*</span></FormLabel>
                <Form.Control
                  type="text"
                  name="zipcode"
                  onChange={handleChange}
                  value={formData.zipcode}
                  placeholder="ZIP"
                />
                {errors.zipcode && <p className="txtred">{errors.zipcode}</p>}
              </Col>
            </Row>

            <hr />
            <h4 className="text-center pt-5">Add Your Family and Friends (Optional)</h4>
            <p className="text-center">
              Want to share the love? You can add up to 5 family members or friends.
            </p>

            {familyMembers.map((member, index) => (
              <div key={index} className="border p-3 mb-3 rounded">
                <Row>
                  <Col md={6}>
                    <FormLabel>Full Name</FormLabel>
                    <Form.Control
                      type="text"
                      name="famname"
                      onChange={(e) => handleFamilyChange(index, e)}
                      value={member.famname}
                      placeholder="Full name"
                    />
                  </Col>
                  <Col md={6}>
                    <FormLabel>Email</FormLabel>
                    <Form.Control
                      type="email"
                      name="famemail"
                      onChange={(e) => handleFamilyChange(index, e)}
                      value={member.famemail}
                      placeholder="Email"
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={6}>
                    <FormLabel>Contact No</FormLabel>
                    <Form.Control
                      type="text"
                      name="famphone"
                      onChange={(e) => handleFamilyChange(index, e)}
                      value={member.famphone}
                      placeholder="Contact number"
                    />
                  </Col>
                  <Col md={6}>
                    <FormLabel>Relationship</FormLabel>
                    <Form.Control
                      type="text"
                      name="relation"
                      onChange={(e) => handleFamilyChange(index, e)}
                      value={member.relation}
                      placeholder="Relationship"
                    />
                  </Col>
                </Row>
                {index > 0 && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => removeFamilyMember(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            {familyMembers.length < 5 && (
              <Button variant="primary" onClick={addFamilyMember}>
                + Add Family Member
              </Button>
            )}

            <br /><br />
            <Form.Check
              label="I confirm that all information provided is accurate."
              name="concent"
              onChange={handleChange}
              checked={formData.concent}
              type="checkbox"
            />
            {errors.concent && <p className="txtred">{errors.concent}</p>}

            <Form.Check
              label="I agree to Zoiko Mobile's Terms & Conditions and Privacy Policy"
              name="terms"
              onChange={handleChange}
              checked={formData.terms}
              type="checkbox"
            />
            {errors.terms && <p className="txtred">{errors.terms}</p>}

            <Form.Check
              label="I consent to receive updates and partnership-related communication."
              name="updates"
              onChange={handleChange}
              checked={formData.updates}
              type="checkbox"
            />
            <br />

            <Button variant="danger" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                "Submit Your Application"
              )}
            </Button>
          </Form>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default AnimalWorkerRegistration;

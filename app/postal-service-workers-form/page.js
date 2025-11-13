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
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Countrycode from "../products/countrycode.json";
import { FaTrashAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text={<>U.S. Postal Service Workers Registration</>} />
<style>{`  
 h4 {border-bottom: 1px solid #9a9696;
    padding-bottom: 20px;
}
.specialForm{
    box-shadow: 3px 4px 19px 14px rgba(0, 0, 0, 0.1) !important;
    border-radius: 15px !important;
    padding: 2rem !important;
    margin: 2rem !important;
}

.form-control, .form-select{
    height: 50px;
    background: #fafafa;
}
    
.checkbox-group-center {

  justify-content: center;

}

.stylish-checkboxes .form-check {
  position: relative;
  padding-right: 2rem;
  padding-left: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;   /* ✅ Vertically aligns checkbox + label */
  gap: 8px;              /* space between box and text */
  position: relative;
  cursor: pointer;
}

.stylish-checkboxes .form-check-label {
  cursor: pointer;
  font-weight: 500;
  color: #333;
  transition: color 0.2s ease;
}

.stylish-checkboxes .form-check-input {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  position: relative;
  margin: 0;             /* ✅ Removes unwanted offset */
}

/* Hover effect */
.stylish-checkboxes .form-check-input:hover {
  border-color: #dc3545;
}

/* Checked state */
.form-check-input:checked {
  background-color: #dc3545;
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
}

/* Custom tick mark */
.form-check-input:checked::after {
  
  color: #fff;
  font-size: 14px;
  position: absolute;
  left: 3px;
  top: -2px;
}

/* Label hover */
 .form-check:hover .form-check-label {
  color: #dc3545;
}

.form-check-inline {
    margin-right: 5rem !important;
}

.form-control,
.form-select {
  border: 1.5px solid #ced4da !important;
  border-radius: 8px !important;
  min-height: 50px;
  transition: all 0.25s ease-in-out !important;
  box-shadow: none !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #dc3545 !important; /* Red border */
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important; /* Red glow */
  outline: none !important;
}


.form-label {
  font-weight: 500;
  color: #222;
}

/* Placeholder color */
.form-control::placeholder {
  color: #999 !important;
}
/* Base select styling */
.form-select {
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 10px 14px;
  height: 50px;
  transition: all 0.25s ease-in-out;
  background-color: #fff;
  cursor: pointer;
  box-shadow: none;
}

/* On focus or when opened */
.form-select:focus {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
  outline: none !important;
  background-color: #fff;
}

/* Add subtle icon animation */
.form-select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.048l-6 6-6-6z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

/* On open — make arrow red and give dropdown "glow" */
.form-select:focus-visible,
.form-select:focus-within {
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23dc3545' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548l4.484 4.484 4.484-4.484L16 9.048l-6 6-6-6z'/></svg>");
  background-color: #fff;
  border-color: #dc3545;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
}

/* Optional: when dropdown is disabled */
.form-select:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
  cursor: not-allowed;
}
  // .form-check-input:focus{
  // background-color: #dc3545;
  // }
#formFileLg{line-height: 2.3rem !important;}
 .add-more-btn {
          font-size: 18px;
          text-decoration: none !important;
          color: #e91e63;
        }
        .add-more-btn:hover {
          color: #d81b60;
        }
          .remove-btn {
          background: #fff !important;
          color: #dc3545;
          border: none;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 6px;
        }
          .remove-btn:hover {
          color: #8d0e1bff !important;
          background: #ffffffff;
          border: none;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 6px;
        }
`}</style>
      <Container fluid className="bglite py-5">
        <Container className="bg-white shadow-lg rounded-4 p-5">
          <h3 className="text-center mb-4 fw-bold text-uppercase">
            U.S. Postal Service Workers Registration
          </h3>

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Basic Details */}
            <Row className="mb-3">
              <Col md={4} className="mt-2">
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
              <Col md={4} className="mt-2">
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
              <Col md={4} className="mt-2">
                <FormLabel>Date of Birth *</FormLabel>
                {/* <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                /> */}
                <DatePicker
                                    selected={formData.yos ? new Date(formData.yos) : null}
                                    onChange={(date) =>
                                        setFormData({ ...formData, yos: date.toISOString().split("T")[0] })
                                    }
                                    
                                    name="dob"
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="MM/DD/YYYY"
                                    className="form-control"
                                    />
                <div className="form-error">{errors.dob || ""}</div>
              </Col>
            </Row>

            {/* Phone */}
            <Row className="mb-3">
              <Col md={6} className="mt-2">
                <FormLabel>Phone Number *</FormLabel>
                <InputGroup>
                  <Form.Select
                    name="countrycode"
                    onChange={handleChange}
                    value={formData.countrycode}
                  >
                    <option value="">Country</option>
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
                    style={{width:"60%"}}
                  />
                </InputGroup>
                <div className="form-error">
                  {errors.countrycode || errors.phone || ""}
                </div>
              </Col>

              <Col md={6} className="mt-2">
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
              <Col md={6} className="mt-2">
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

              <Col md={6} className="mt-2">
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
                <Col md={6} className="mt-2">
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
                <Col md={6} className="mt-2">
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
                    {/* {formData.familyFriends.length > 1 && (
                      <Button
                        variant="outline-danger"
                        onClick={() => removeFamilyFriendRow(index)}
                        title="Remove this row"
                      >
                        -
                      </Button>
                    )} */}

                    {formData.familyFriends.length > 1 && (
                    <Col md={12} className="text-end">
                        <Button className="remove-btn ms-2 mt-2" onClick={() => removeFamilyFriendRow(index)}><FaTrashAlt size={16} /></Button>
                        </Col>
                      )}


                  </InputGroup>
                  <div className="form-error">
                    {errors[`famemail_${index}`] || ""}
                  </div>
                </Col>
              </Row>
            ))}


                <div className="text-left mt-3 mb-3">
              <Button variant="link" className="add-more-btn p-0" onClick={addFamilyFriendRow}>
                + Add More
              </Button>
            </div>


            {/* Checkboxes */}
            <Form.Check
              label="Confirm your selected plan and verify the details of any nominated family and friends."
              name="concent"
              checked={formData.concent}
              onChange={handleChange}
              type="checkbox"
               className="mt-2"
            />
            <div className="form-error">{errors.concent || ""}</div>

            <Form.Check
              label="By submitting this form, you agree to Zoiko Saver Deals' terms and conditions."
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              type="checkbox"
               className="mt-2"
            />
            <div className="form-error">{errors.terms || ""}</div>

            <div className="text-center mt-4">
              <Button
                variant="danger"
                type="submit"
                className="px-5 py-2 rounded-pill fw-bold mt-3"
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

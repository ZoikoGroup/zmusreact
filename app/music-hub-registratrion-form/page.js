"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, FormLabel, Row, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import Countrycode from "../products/countrycode.json";

const MusicHubRegistration = () => {

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        countrycode: "",
        phone: "",
        statusproof: "",
        desc: "",
        perks: false,
        discount: false,
        tools: false,
        storage: false,
        access: false,
        other: "",
        musicjourney: "",
        concent: false,
        terms: false
    });
    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }
    const validate = () => {
        let formErrors = {}

        if (!formData.fname) formErrors.fname = "Your name is required"
        if (!formData.countrycode) formErrors.countrycode = "Your country code is required"
        if (!formData.phone) formErrors.phone = "Phone number is required"
        if (!formData.statusproof) formErrors.statusproof = "This field is required"
        if (!formData.desc) formErrors.desc = "This field is required"
        if (!formData.concent) formErrors.concent = "This field is required"
        if (!formData.terms) formErrors.terms = "This field is required"
        if (!formData.email) {
            formErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email address is invalid"
        }

        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handelSubmit = async (e) => {
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
    }

    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Join the Zoiko Music Hub and unlock exclusive perks, tools, and opportunities designed for music lovers and aspiring musicians!</>} />
        <style>{`  
 h4 {border-bottom: 1px solid #9a9696;
    padding-bottom: 20px;
}
.specialForm{
    box-shadow: 3px 4px 19px 14px rgba(0, 0, 0, 0.1) !important;
    border-radius: 15px !important;
    padding: 2rem !important;
    // margin: 2rem !important;
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
            <Container>
                <Form onSubmit={handelSubmit} className="specialForm">
                    <Row>
                        <Col md={4} sm={12} xs={12} className="mt-2">
                            <FormLabel htmlFor="fname">Full Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="fname" onChange={handleChange} value={formData.fname} placeholder="First name and last name" />
                            {errors.fname && <p className="txtred">{errors.fname}</p>}
                        </Col>
                        <Col md={4} sm={12} xs={12} className="mt-2">
                            <FormLabel htmlFor="email">Eamil <span className="txtred">*</span></FormLabel>
                            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                            {errors.email && <p className="txtred">{errors.email}</p>}
                        </Col>
                        <Col md={4} sm={12} xs={12} className="mt-2">
                            <FormLabel htmlFor="phnoe">Phone no <span className="txtred">*</span></FormLabel>
                            
                               
                                <Form.Control name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone no" />
                           
                            {errors.phone && <p className="txtred">{errors.phone}</p>} {errors.countrycode && <p className="txtred">{errors.countrycode}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12} xs={12} className="mt-2">
                        <FormLabel htmlFor="desc">Are you a music lover, a creator, or both?</FormLabel>
                        <Form.Select name="desc" onChange={handleChange} value={formData.statusproof}>
                            <option>Select Description</option>
                            <option value={'lover'}>Music Lover</option>
                            <option value={'aspiring'}>Aspiring Musician</option>
                            <option value={'professional'}>Professional Musician</option>
                            <option value={'educator'}>Music Educator</option>
                            <option value={'student'}>Student in a music program</option>
                        </Form.Select>
                        {errors.desc && <p className="txtred">{errors.desc}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12} className="mt-2">
                            <Form.Group controlId="formFileLg" className="mb-3">
                                <Form.Label>Upload Student ID <span className="txtred">*</span></Form.Label>
                                <Form.Control type="file" name="statusproof" onChange={handleChange} value={formData.statusproof} />
                                {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <h4 className="pt-4">What type of benefits are you most interested in? (Select all that apply)</h4>
                    <Form.Check label="Music streaming perks" name="perks" type="checkbox" onChange={handleChange} value={formData.perks} />
                    <Form.Check label="Discounts on plans" name="discount" onChange={handleChange} value={formData.discount} type="checkbox" />
                    <Form.Check label="Music production tools" name="tools" onChange={handleChange} value={formData.tools} type="checkbox" />
                    <Form.Check label="Cloud storage for music files" name="storage" onChange={handleChange} value={formData.storage} type="checkbox" />
                    <Form.Check label="Exclusive access to events and giveaways" name="access" onChange={handleChange} value={formData.access} type="checkbox" />
                    <FormLabel className="mt-2" htmlFor="other" >If other please specify</FormLabel>
                    <Form.Control type="text" name="other" onChange={handleChange} value={formData.other} placeholder="Please specify" />

                    <Form.Group className="mb-3 mt-2">
                        <Form.Label htmlFor="musicjourney">Share Your Music Journey (Optional)</Form.Label>
                        <Form.Control as="textarea" name="musicjourney" onChange={handleChange} value={formData.musicjourney} rows={5} placeholder="What inspires your musical journey?" />
                    </Form.Group>
                    <Form.Check label={<>I have read and agree to the <a href="/terms-and-conditions" className="txtred">terms and conditions</a>.</>} name="concent" onChange={handleChange} value={formData.concent} type="checkbox" />
                    {errors.concent && <p className="txtred">{errors.concent}</p>}
                    <Form.Check label="I consent to receiving updates, promotions, and opportunities related to the Zoiko Music Hub." name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
                    {errors.terms && <p className="txtred">{errors.terms}</p>}
                    <br />
                    <Button variant="danger" type="submit" className="mt-2" name="submit">Submit Your Application</Button>
                </Form>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default MusicHubRegistration;
"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, FormLabel, Row, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import Countrycode from "../products/countrycode.json";

const AnimalWorkerRegistration = () => {

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        countrycode: "",
        phone: "",
        dob: "",
        statusproof: "",
        orgname: "",
        jobtitle: "",
        street: "",
        apprt: "",
        city: "",
        state: "",
        zipcode: "",
        famname: "",
        famemail: "",
        famphone: "",
        relation: "",
        concent: false,
        terms: false,
        updates: false
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
        if (!formData.phone) formErrors.phone = "This field is required"
        if (!formData.dob) formErrors.dob = "Date of birth is required"
        if (!formData.statusproof) formErrors.statusproof = "This field is required"
        if (!formData.street) formErrors.street = "This field is required"
        if (!formData.city) formErrors.city = "This field is required"
        if (!formData.state) formErrors.state = "This field is required"
        if (!formData.zipcode) formErrors.zipcode = "This field is required"
        if (!formData.orgname) formErrors.orgname = "This field is required"
        if (!formData.jobtitle) formErrors.jobtitle = "This field is required"
        if (!formData.famname) formErrors.famname = "This field is required"
        if (!formData.famphone) formErrors.famphone = "This field is required"
        if (!formData.relation) formErrors.relation = "This field is required"
        if (!formData.concent) formErrors.concent = "This field is required"
        if (!formData.terms) formErrors.terms = "This field is required"
        if (!formData.email) {
            formErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email address is invalid"
        }
        if (!formData.famemail) {
            formErrors.famemail = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.famemail)) {
            formErrors.famemail = "Email address is invalid"
        }

        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        console.log(formData);
    }

    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Animal Charity Worker Registration</>} />
        <Container fluid className="bglite py-5">
            <Container>
                <Form onSubmit={handelSubmit}>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="fname">Full Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="fname" onChange={handleChange} value={formData.fname} placeholder="First name and last name" />
                            {errors.fname && <p className="txtred">{errors.fname}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="email">Eamil <span className="txtred">*</span></FormLabel>
                            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                            {errors.email && <p className="txtred">{errors.email}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="phno">Phone no <span className="txtred">*</span></FormLabel>
                            <InputGroup>
                                <Form.Select name="countrycode" onChange={handleChange} value={formData.countrycode}>
                                    <option>Select Country</option>
                                    {Countrycode.map((code) => (
                                        <option key={code.code} value={code.dial_code}>{code.dial_code}, {code.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone no" style={{width:'40%'}} />
                            </InputGroup>
                            {errors.phone && <p className="txtred">{errors.phone}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="dob">Date of Birth <span className="txtred">*</span></FormLabel>
                            <Form.Control type="date" name="dob" onChange={handleChange} value={formData.dob} placeholder="Email" />
                            {errors.dob && <p className="txtred">{errors.dob}</p>}
                        </Col>
                    </Row>
                    <h4 className="text-center pt-5">Let&apos;s confirm your eligibility for this program</h4>
                    <p className="text-center">Upload a valid proof of employment, such as an ID badge or employment letter.</p>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload document <span className="txtred">*</span></Form.Label>
                        <Form.Control type="file" name="statusproof" onChange={handleChange} value={formData.statusproof} />
                        {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
                    </Form.Group>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="orgname">Name of Charity Organization <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="orgname" placeholder="Full registered name of organization" onChange={handleChange} value={formData.orgname} />
                            {errors.orgname && <p className="txtred">{errors.orgname}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="jobtitle">Job Title <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="jobtitle" placeholder="Your job title" onChange={handleChange} value={formData.jobtitle} />
                            {errors.jobtitle && <p className="txtred">{errors.jobtitle}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="street">Street <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="street" onChange={handleChange} value={formData.street} placeholder="Street address" />
                            {errors.street && <p className="txtred">{errors.street}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="apprt">Apartment/Unit (Optional)</FormLabel>
                            <Form.Control type="text" name="apprt" onChange={handleChange} value={formData.apprt} placeholder="Appartment" />
                            {errors.apprt && <p className="txtred">{errors.apprt}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="city">City <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="city" onChange={handleChange} value={formData.city} placeholder="City" />
                            {errors.city && <p className="txtred">{errors.city}</p>}
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="state">State <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="state" onChange={handleChange} value={formData.state} placeholder="State" />
                            {errors.state && <p className="txtred">{errors.state}</p>}
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="zipcode">ZIP <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="zipcode" onChange={handleChange} value={formData.zipcode} placeholder="ZIP" />
                            {errors.zipcode && <p className="txtred">{errors.zipcode}</p>}
                        </Col>
                    </Row>
                    <hr />
                    <h4 className="text-center pt-5">Add Your Family and Friends(Optional)</h4>
                    <p className="text-center">Want to share the love? You can add up to 5 family members or friends to enjoy the same discount!</p>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="famname">Full Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="famname" onChange={handleChange} value={formData.famname} placeholder="First name and last name" />
                            {errors.famname && <p className="txtred">{errors.famname}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="famemail">Eamil <span className="txtred">*</span></FormLabel>
                            <Form.Control type="email" name="famemail" onChange={handleChange} value={formData.famemail} placeholder="Email" />
                            {errors.famemail && <p className="txtred">{errors.famemail}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="famphone">Contact no <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="famphone" onChange={handleChange} value={formData.famphone} placeholder="First name and last name" />
                            {errors.famphone && <p className="txtred">{errors.famphone}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="relation">Relationship <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="relation" onChange={handleChange} value={formData.relation} placeholder="Relationship" />
                            {errors.relation && <p className="txtred">{errors.relation}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Form.Check label="I confirm that all the information provided is accurate and truthful" name="concent" onChange={handleChange} value={formData.concent} type="checkbox" />
                    {errors.concent && <p className="txtred">{errors.concent}</p>}
                    <Form.Check label="I agree to Zoiko Mobile&apos;s Terms & Conditions and Privacy Policy" name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
                    {errors.terms && <p className="txtred">{errors.terms}</p>}
                    <Form.Check label="I consent to receive updates and partnership-related communication from Zoiko Mobile." name="updates" onChange={handleChange} value={formData.updates} type="checkbox" />
                    <br />
                    <Button variant="danger" type="submit" name="submit">Submit Your Application</Button>
                </Form>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default AnimalWorkerRegistration;
"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, FormLabel, Row, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import Countrycode from "../products/countrycode.json";

const MilitaryVeteransForm = () => {

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        countrycode: "",
        phone: "",
        statusproof: "",
        plan: "",
        cat: "",
        famname: "",
        famemail: "",
        famphone: "",
        relation: "",
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
        if (!formData.plan) formErrors.plan = "This field is required"
        if (!formData.cat) formErrors.cat = "This field is required"
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
        <TopHeader />
        <Header />
        <HeadBar text={<>Military &amp; Veterans Lifetime Deals Registration Form</>} />
        <Container fluid className="bglite py-5">
            <Container className="w-50">
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
                            <FormLabel htmlFor="phnoe">Phone no <span className="txtred">*</span></FormLabel>
                            <InputGroup>
                                <Form.Select name="countrycode" onChange={handleChange} value={formData.countrycode}>
                                    <option>Select Country</option>
                                    {Countrycode.map((code) => (
                                        <option key={code.code} value={code.dial_code}>{code.dial_code}, {code.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone no" style={{width:'40%'}} />
                            </InputGroup>
                            {errors.phone && <p className="txtred">{errors.phone}</p>} {errors.countrycode && <p className="txtred">{errors.countrycode}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <Form.Group controlId="formFileLg" className="mb-3">
                                <Form.Label>Upload Student ID <span className="txtred">*</span></Form.Label>
                                <Form.Control type="file" name="statusproof" onChange={handleChange} value={formData.statusproof} />
                                {errors.statusproof && <p className="txtred">{errors.statusproof}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <h4 className="text-center">Select a bring-your-own-device (BYOD) plan that fits your needs</h4>
                    <p className="text-center">20% Lifetime Discount: Applies to any BYOD plan for the duration of your Zoiko Mobile account.</p>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="plan">Select Plan <span className="txtred">*</span></FormLabel>
                            <Form.Select name="plan">
                                <option value={'prepaid'}>Prepaid</option>
                                <option value={'postpaid'}>Postpaid</option>
                                <option value={'travel'}>Travel</option>
                                <option value={'business'}>Business</option>
                            </Form.Select>
                            {errors.plan && <p className="txtred">{errors.plan}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="cat">Select Category <span className="txtred">*</span></FormLabel>
                            <Form.Select name="cat">
                                <option value={'lite'}>Zoiko Lite</option>
                                <option value={'essential'}>Zoiko Essential</option>
                                <option value={'unlimited'}>Zoiko Unlimited One</option>
                                <option value={'plus'}>Zoiko Unlimited Plus</option>
                                <option value={'premium'}>Zoiko Premium Unlimited</option>
                            </Form.Select>
                            {errors.cat && <p className="txtred">{errors.cat}</p>}
                        </Col>
                    </Row>
                    <br />
                    <h4 className="text-center pt-5">Add Your Family and Friends(Optional)</h4>
                    <p className="text-center">Share the benefits! Nominate up to 5 family members or friends to receive a 15% lifetime discount on their BYOD plans.</p>
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
                    <Form.Check label="Confirm your selected BYOD plan and verify the details of any nominated family and friends." name="concent" onChange={handleChange} value={formData.concent} type="checkbox" />
                    {errors.concent && <p className="txtred">{errors.concent}</p>}
                    <Form.Check label="By submitting this form, you agree to Zoiko Saver Deals' terms and conditions." name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
                    {errors.terms && <p className="txtred">{errors.terms}</p>}
                    <br />
                    <Button variant="danger" type="submit" name="submit">Submit Your Application</Button>
                </Form>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default MilitaryVeteransForm;
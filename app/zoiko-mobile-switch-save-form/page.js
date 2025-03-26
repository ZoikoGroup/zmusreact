"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import React, { useState } from "react";

const SwitchSaveForm = () => {

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        msisidn: "",
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
        if (!formData.msisidn) formErrors.msisidn = "This field is required"
        if (!formData.simno) formErrors.simno = "SIM number is required"
        if (!formData.plan) formErrors.plan = "This field is required"
        if (!formData.cat) formErrors.cat = "This field is required"
        if (!formData.ospno) formErrors.ospno = "This field is required"
        if (!formData.osppass) formErrors.osppass = "This field is required"
        if (!formData.addr1) formErrors.addr1 = "This field is required"
        if (!formData.addr2) formErrors.addr2 = "This field is required"
        if (!formData.city) formErrors.city = "This field is required"
        if (!formData.state) formErrors.state = "This field is required"
        if (!formData.zip) formErrors.zip = "This field is required"
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
        e.preventDefault()
        if (!validate()) return
        console.log(formData);
    }

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Switch to Simplicity: <span className="txtyellow"><i className="bi bi-music-note-beamed"></i></span> More Data <span className="txtyellow"><i className="bi bi-music-note-beamed"></i></span> More Savings <span className="txtyellow"><i className="bi bi-music-note-beamed"></i></span> Less Hassle</>} />
        <Container fluid className="bglite">
            <Container className="py-5">
                <h2 className="text-center">Speed up your savings with Zoiko Mobile!</h2>
                <p className="body22 text-center">Fill Out the Switch &amp; Save Form</p>
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
                            <FormLabel htmlFor="msisidn">MSISIDN <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="msisidn" onChange={handleChange} value={formData.msisidn} placeholder="Enter your 10-digit number (e.g., 555-123-4567)" />
                            {errors.msisidn && <p className="txtred">{errors.msisidn}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="simno">SIM Number <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="simno" onChange={handleChange} value={formData.simno} placeholder="Enter 19 Digit SIM Serial Number" />
                            {errors.simno && <p className="txtred">{errors.simno}</p>}
                        </Col>
                    </Row>
                    <hr className="my-5" />
                    <h4 className="text-center">Choose Your New Zoiko Mobile Plan</h4>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="plan">Please Select Your Plan Type <span className="txtred">*</span></FormLabel>
                            <Form.Select name="plan" onChange={handleChange}>
                                <option value={'prepaid'}>Prepaid</option>
                                <option value={'postpaid'}>Postpaid</option>
                                <option value={'travel'}>Travel</option>
                                <option value={'business'}>Business</option>
                            </Form.Select>
                            {errors.plan && <p className="txtred">{errors.plan}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="cat">Please Choose one of the Following Plans <span className="txtred">*</span></FormLabel>
                            <Form.Select name="cat" onChange={handleChange}>
                                <option value={'lite'}>Zoiko Lite</option>
                                <option value={'essential'}>Zoiko Essential</option>
                                <option value={'unlimited'}>Zoiko Unlimited One</option>
                                <option value={'plus'}>Zoiko Unlimited Plus</option>
                                <option value={'premium'}>Zoiko Premium Unlimited</option>
                            </Form.Select>
                            {errors.cat && <p className="txtred">{errors.cat}</p>}
                        </Col>
                    </Row>
                    <hr className="my-5" />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="ospno">OSP Account Number <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="ospno" onChange={handleChange} value={formData.ospno} placeholder="OSP Account Number" />
                            {errors.ospno && <p className="txtred">{errors.ospno}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="osppass">OSP Account Password/PIN <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="osppass" onChange={handleChange} value={formData.osppass} placeholder="OSP Account Password/PIN" />
                            {errors.osppass && <p className="txtred">{errors.osppass}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="addr1">Address Line 1 <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="addr1" onChange={handleChange} value={formData.addr1} placeholder="Address line 1" />
                            {errors.addr1 && <p className="txtred">{errors.addr1}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="addr2">Address Line 2 <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="addr2" onChange={handleChange} value={formData.addr2} placeholder="Address line 2" />
                            {errors.addr2 && <p className="txtred">{errors.addr2}</p>}
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
                            <FormLabel htmlFor="zip">ZIP <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="zip" onChange={handleChange} value={formData.zip} placeholder="ZIP" />
                            {errors.zip && <p className="txtred">{errors.zip}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Form.Check label={<>I agree to the <a href="#" className="txtred">Terms and Conditions</a> of Zoiko Mobile.</>} name="concent" onChange={handleChange} value={formData.concent} type="checkbox" />
                    {errors.concent && <p className="txtred">{errors.concent}</p>}
                    <Form.Check label="I consent to the transfer of my service to Zoiko Mobile and understand that my current service will be terminated once the switch is complete." name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
                    {errors.terms && <p className="txtred">{errors.terms}</p>}
                    <br />
                    <Button variant="danger" type="submit" name="submit">Switch &amp; Save Today</Button>
                </Form>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
export default SwitchSaveForm;
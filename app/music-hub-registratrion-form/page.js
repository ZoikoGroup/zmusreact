"use client"
import TopHeader from "../components/TopHeader";
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
        e.preventDefault()
        if (!validate()) return
        console.log(formData);
    }

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Join the Zoiko Music Hub and unlock exclusive perks, tools, and opportunities designed for music lovers and aspiring musicians!</>} />
        <Container fluid className="bglite py-5">
            <Container>
                <Form onSubmit={handelSubmit}>
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="fname">Full Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="fname" onChange={handleChange} value={formData.fname} placeholder="First name and last name" />
                            {errors.fname && <p className="txtred">{errors.fname}</p>}
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="email">Eamil <span className="txtred">*</span></FormLabel>
                            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                            {errors.email && <p className="txtred">{errors.email}</p>}
                        </Col>
                        <Col md={4} sm={12} xs={12}>
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
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
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
                        <Col md={6} sm={12} xs={12}>
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
                    <br />
                    <FormLabel htmlFor="other">If other please specify</FormLabel>
                    <Form.Control type="text" name="other" onChange={handleChange} value={formData.other} placeholder="Please specify" />
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="musicjourney">Share Your Music Journey (Optional)</Form.Label>
                        <Form.Control as="textarea" name="musicjourney" onChange={handleChange} value={formData.musicjourney} rows={5} placeholder="What inspires your musical journey?" />
                    </Form.Group>
                    <Form.Check label={<>I have read and agree to the <a href="/terms-and-conditions" className="txtred">terms and conditions</a>.</>} name="concent" onChange={handleChange} value={formData.concent} type="checkbox" />
                    {errors.concent && <p className="txtred">{errors.concent}</p>}
                    <Form.Check label="I consent to receiving updates, promotions, and opportunities related to the Zoiko Music Hub." name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
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
export default MusicHubRegistration;
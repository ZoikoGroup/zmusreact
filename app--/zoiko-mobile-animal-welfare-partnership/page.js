"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Form, FormLabel, Row, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import Countrycode from "../products/countrycode.json";

const AnimalPartnership = () => {

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
        orgname: "",
        orgtype: "",
        focus: "",
        website: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        mission: "",
        name: "",
        role:"",
        email: "",
        phone: "",
        countrycode: "",
        prefcontact: "",
        discount: false,
        support: false,
        campaign: false,
        donation:  false,
        volunteer: false,
        other: "",
        supportmission: "",
        statusproof: "",
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
    
        if (!formData.orgname) formErrors.orgname = "Organization name is required"
        if (!formData.orgtype) formErrors.orgtype = "Organization type is required"
        if (!formData.focus) formErrors.focus = "This field is required"
        if (!formData.website) formErrors.website = "Please enter your website url"
        if (!formData.street) formErrors.street = "This field is required"
        if (!formData.city) formErrors.city = "This field is required"
        if (!formData.state) formErrors.state = "This field is required"
        if (!formData.zipcode) formErrors.zipcode = "This field is required"
        if (!formData.name) formErrors.name = "This field is required"
        if (!formData.role) formErrors.role = "This field is required"
        if (!formData.phone) formErrors.phone = "This field is required"
        if (!formData.email) {
            formErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email address is invalid"
        }
    
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handelSubmit  = async (e) => {
        e.preventDefault()
        if (!validate()) return
        console.log(formData);
    }

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Zoiko Mobile Animal Welfare Partnership Form</>} />
        <Container fluid className="bglite py-5">
            <Container>
                <Form onSubmit={handelSubmit}>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="orgname">Organization Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="orgname" placeholder="Full registered name of organization" onChange={handleChange} value={formData.orgname} />
                            {errors.orgname && <p className="txtred">{errors.orgname}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="orgtype">Organization Type <span className="txtred">*</span></FormLabel>
                            <Form.Select name="orgtype" onChange={handleChange} value={formData.orgtype}>
                                <option>Select One</option>
                                <option value="1">Registered Charity</option>
                                <option value="2">Nonprofit Organization</option>
                                <option value="3">Private Foundation</option>
                                <option value="4">For-profit Organization with Animal Welfare Focus</option>
                                <option value="5">Other</option>
                            </Form.Select>
                            {errors.orgtype && <p className="txtred">{errors.orgtype}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="focus">Primary Focus <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="focus" onChange={handleChange} value={formData.focus} placeholder="e.g. Animal rescue, shelter support, wildlife conservation etc." />
                            {errors.focus && <p className="txtred">{errors.focus}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="website">Website <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="website" onChange={handleChange} value={formData.website} placeholder="www.example.com" />
                            {errors.website && <p className="txtred">{errors.website}</p>}
                        </Col>
                    </Row>
                    <hr />
                    <h4 className="text-center pt-3">Headquarter&apos;s Address</h4>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="street">Street <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="street" onChange={handleChange} value={formData.street} placeholder="Street address" />
                            {errors.street && <p className="txtred">{errors.street}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="city">City <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="city" onChange={handleChange} value={formData.city} placeholder="City" />
                            {errors.city && <p className="txtred">{errors.city}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="state">State <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="state" onChange={handleChange} value={formData.state} placeholder="State" />
                            {errors.state && <p className="txtred">{errors.state}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="zipcode">ZIP <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="zipcode" onChange={handleChange} value={formData.zipcode} placeholder="ZIP" />
                            {errors.zipcode && <p className="txtred">{errors.zipcode}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="mission">Organization&apos;s Mission Statement <span className="txtred">*</span></Form.Label>
                        <Form.Control as="textarea" name="mission" onChange={handleChange} value={formData.mission} rows={5} placeholder="Briefly tell us about your cause" />
                        {errors.mission && <p className="txtred">{errors.mission}</p>}
                    </Form.Group>
                    <hr />
                    <h4 className="text-center pt-3">Primary Contact Details</h4>
                    <p className="text-center">Let us know who to connect with at your organization.</p>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="name">First and Last Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} placeholder="First name and last name" />
                            {errors.name && <p className="txtred">{errors.name}</p>}
                        </Col>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="role">Position/Role <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="role" onChange={handleChange} value={formData.role} placeholder="e.g. Director, Fundraising Manager etc." />
                            {errors.role && <p className="txtred">{errors.role}</p>}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormLabel htmlFor="email">Eamil <span className="txtred">*</span></FormLabel>
                            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                            {errors.email && <p className="txtred">{errors.email}</p>}
                        </Col>
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
                    </Row>
                    <br />
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="prefcontact">Preferred Contact Method <span className="txtred">*</span></FormLabel>
                            <Form.Select name="prefcontact" onChange={handleChange} value={formData.prefcontact} required>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <h4 className="text-center pt-5 pb-3">What would you like to achieve with this partnership?</h4>
                    <Form.Check label="Discounted plans for your staff" name="discount" type="checkbox" onChange={handleChange} value={formData.discount} />
                    <Form.Check label="Fundraising support" name="support" onChange={handleChange} value={formData.support} type="checkbox" />
                    <Form.Check label="Awareness campaigns" name="campaign" onChange={handleChange} value={formData.campaign} type="checkbox" />
                    <Form.Check label="Donations or sponsorships" name="donation" onChange={handleChange} value={formData.donation} type="checkbox" />
                    <Form.Check label="Volunteer engagement opportunities" name="volunteer" onChange={handleChange} value={formData.volunteer} type="checkbox" />
                    <br />
                    <FormLabel htmlFor="other">If other please specify <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="other" onChange={handleChange} value={formData.other} placeholder="Please specify" />
                    <br />
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="supportmission">How can Zoiko Mobile support your mission? <span className="txtred">*</span></Form.Label>
                        <Form.Control as="textarea" name="supportmission" onChange={handleChange} value={formData.supportmission} rows={5} placeholder="Tell us how can we best partner with you" />
                    </Form.Group>
                    <hr />
                    <h4 className="text-center">Upload Proof of Organization Status (if applicable)</h4>
                    <p className="text-center">e.g., 501(c)(3) determination letter, state registration, or equivalent proof</p>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload document <span className="txtred">*</span></Form.Label>
                        <Form.Control type="file" name="statusproof" onChange={handleChange} value={formData.statusproof} />
                    </Form.Group>
                    <hr />
                    <Form.Check label="I confirm that all the information provided is accurate and truthful" name="concent" onChange={handleChange} value={formData.concent} type="checkbox" />
                    <Form.Check label="I agree to Zoiko Mobile&apos;s Terms & Conditions and Privacy Policy" name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
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
export default AnimalPartnership;
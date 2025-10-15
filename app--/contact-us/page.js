"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import Testimonials from "../components/Testimonials";
import { Container, Image, Row, Col, Form, FormLabel, InputGroup, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import Link from "next/link";
import Countrycode from "../products/countrycode.json";

const ContactUs = () => {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        countrycode: "",
        phone: "",
        msg: "",
        terms: false
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        })
    }
    const validate = () => {
        let formErrors = {}
    
        if (!formData.fname) formErrors.fname = "Name is required"
        if (!formData.phone) formErrors.phone = "Mobile is required"
        if (!formData.countrycode) formErrors.countrycode = "Your country code is required"
        if (!formData.terms) formErrors.terms = "This field is required"
        if (!formData.email) {
          formErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          formErrors.email = "Email address is invalid"
        }
        if (!formData.msg) formErrors.msg = "Message is required"
    
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }
    const onSubmit  = async (e) => {
        e.preventDefault()
        if (!validate()) return
        console.log(formData)
    }

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Have You got Any Questions? At Zoiko Mobile We Offer Solutions!" />
        <Container fluid className="bglite py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} sm={12} xs={12}>
                        <Image src={'/img/contactus.png'} alt="Bird" fluid />
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <h4 className="pb-3 body22">If you have any questions, at Zoiko Mobile we pride ourselves in providing tailored solutions within the shortest possible time.</h4>
                        <Form onSubmit={onSubmit}>
                            <FormLabel htmlFor="fname">Full Name <span className="txtred">*</span></FormLabel>
                            <Form.Control type="text" name="fname" onChange={handleChange} value={formData.fname} placeholder="First name and last name" />
                            {errors.fname && <p className="txtred">{errors.fname}</p>}
                            <br />
                            <FormLabel htmlFor="email">Eamil <span className="txtred">*</span></FormLabel>
                            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                            {errors.email && <p className="txtred">{errors.email}</p>}
                            <br />
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
                            <br />
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="msg">Your Message</Form.Label>
                                <Form.Control as="textarea" name="msg" onChange={handleChange} value={formData.msg} rows={3} placeholder="How can we support you" />
                            </Form.Group>
                            <Form.Check label="Please save my name, email address, and website information on this browser for future use." name="terms" onChange={handleChange} value={formData.terms} type="checkbox" />
                            {errors.terms && <p className="txtred">{errors.terms}</p>}
                            <br />
                            <Button variant="danger" type="submit" name="submit">Send Message</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="contactmapbg py-5">
            <Container>
                <div className="pinkboxwraper flex-row gap-4 justify-content-center">
                    <Card className="p-2 pinkboxcontact">
                        <Image src={'/img/headoffice.webp'} fluid alt="Head Office" />
                        <Card.Body>
                            <Card.Title className="txtred text-center">Head Office</Card.Title>
                            <Card.Text><b>Corporate Office:</b> 5900 Balcones Drive # 24685 Austin, TX 78731<br /><b>Phone:</b> 800-988-8116<br /><b>Email:</b> info@zoikomobile.com</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="p-2 pinkboxcontact">
                        <Image src={'/img/caloffice.webp'} fluid alt="California Office" />
                        <Card.Body>
                            <Card.Title className="txtred text-center">California Office</Card.Title>
                            <Card.Text>1401 21st Street, Suite R, Sacramento, CA 95811.<br /><b>Phone:</b> 800-988-8116<br /><b>Email:</b> info@zoikomobile.com</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="p-2 pinkboxcontact">
                        <Image src={'/img/illoffice.webp'} alt="Illinois Office" />
                        <Card.Body>
                            <Card.Title className="txtred text-center">Illinois Office</Card.Title>
                            <Card.Text>2501 Chatham Rd, Suite R, Springfield, IL 62704<br /><b>Phone:</b> 847-728-6872<br /><b>Email:</b> info@zoikomobile.com</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="p-2 pinkboxcontact">
                        <Image src={'/img/delaware.webp'} fluid alt="Delaware Office" />
                        <Card.Body>
                            <Card.Title className="txtred text-center">Delaware Office</Card.Title>
                            <Card.Text>8 The Green, Suite A, Dover, DE<br /><b>Phone:</b>302-899-7312<br /><b>Email:</b>info@zoikomobile.com</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="p-2 pinkboxcontact">
                        <Image src={'/img/washinton.webp'} fluid alt="Washington DC Office" />
                        <Card.Body>
                            <Card.Title className="txtred text-center">Washington DC Office</Card.Title>
                            <Card.Text>1717 N Street NW, Suite 1, Washington, DC 20036<br /><b>Phone:</b> 800-988-8116<br /><b>Email:</b> info@zoikomobile.com</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="p-2 pinkboxcontact">
                        <Image src={'/img/florida.webp'} alt="Florida Office" />
                        <Card.Body>
                            <Card.Title className="txtred text-center">Florida Office</Card.Title>
                            <Card.Text>12386 State Road 535, #302, Orlando, FL 32836<br /><b>Phone:</b> 800-988-8116<br /><b>Email:</b> info@zoikomobile.com</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </Container>
        <Container fluid className="bglite py-5">
            <Container>
                <h3 className="txtred text-center">Most Asked Questions</h3>
                <Row className="py-4">
                    <Col md={3} sm={6} xs={6}>
                        <Link href="#">
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">Account &amp;<br />Billing</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} sm={6} xs={6}>
                        <Link href="#">
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">Network<br />Switch</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} sm={6} xs={6}>
                        <Link href="#">
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">Roaming Setup<br />for IOS</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} sm={6} xs={6}>
                        <Link href={"#"}>
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">SIM<br />Activation</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                </Row>
                <Row className="py-4">
                    <Col md={3} sm={6} xs={6}>
                        <Link href={"#"}>
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">International Call<br />Charges</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} sm={6} xs={6}>
                        <Link href={"#"}>
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">Roaming Setup<br />for Android</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} sm={6} xs={6}>
                        <Link href={"#"}>
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">National Call &amp;<br />Data Charges</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={3} sm={6} xs={6}>
                        <Link href={"#"}>
                            <Card className="p-3">
                                <Card.Title className="green18 text-center">Day Pass<br />Roaming Plans</Card.Title>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Testimonials />
        <Footer />
        </>
    );
}
export default ContactUs;
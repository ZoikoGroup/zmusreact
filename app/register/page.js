"use client";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Card, CardBody, Container, Form, Row, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import Link from "next/link";

const Register = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = "Name is required";
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords do not match";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            setMessage("");
            setErrors({});

            const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage(
                    <span>
                        ✅ Registration successful! Please{" "}
                        <Link href="/login" className="fw-bold txtred">login here</Link>.
                    </span>
                );
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                if (data.errors) {
                    let newErrors = {};
                    if (data.errors.name) newErrors.name = data.errors.name[0];
                    if (data.errors.email) newErrors.email = data.errors.email[0];
                    if (data.errors.password) newErrors.password = data.errors.password[0];
                    setErrors(newErrors);
                }
                setMessage("❌ Registration failed. Please fill correctly.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TopHeader />
            <Header />
            <HeadBar text="Join Buster and flock together with your buddies!" />
            <Container className="p-5">
                <Card>
                    <CardBody>
                        <Row className="gx-5 align-items-center">
                            <Col md={6} className="d-none d-md-block d-lg-block">
                                <div className="loginbg">
                                    <p className="txtwhite text-center body22">
                                        Hello Buddies! Our well-loved character 'Budgie', our first-of-its-kind
                                        animal-friendly network, is set to arrive at your place.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <h2>Create Account</h2>
                                <p className="body22">Fill in the form to join Zoiko Mobile.</p>

                                {/* Display message at the top */}
                                {message && <Alert variant={message.toString().startsWith("✅") ? "success" : "danger"}>{message}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Button type="submit" disabled={loading} className="w-20 btn btn-danger">
                                        {loading ? "Registering..." : "Register"}
                                    </Button>
                                    &nbsp;
                                    <Button variant="danger" href="/api/auth/google">Sign in with Google</Button>
                                    <p className="mt-3 text-center">
                                        Already have an account?{" "}
                                        <Link href="/login" className="txtred fw-bold">Login</Link>
                                    </p>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default Register;

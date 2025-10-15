"use client";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("zoiko_token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch("https://zmapi.zoikomobile.co.uk/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("zoiko_token");
        router.push("/login");
    };

    const quickLinks = [
        { title: "View Plans", icon: "📄" },
        { title: "Activate Your SIM", icon: "💳" },
        { title: "Switch & Save", icon: "🔄" },
        { title: "Special Deals", icon: "🎁" },
        { title: "Redeem Cashback", icon: "💰" },
    ];

    return (
        <>
            <TopHeader />
            <Header />
            <HeadBar text="Welcome to Your Zoiko Mobile Dashboard" />
            <Container fluid className="p-0">
                <Row>
                    {/* Sidebar */}
                    <Col md={3} className="bg-light vh-100 p-3">
                        <div className="text-center mb-4">
                            <div className="bg-secondary rounded-circle mb-2" style={{ width: "80px", height: "80px", margin: "0 auto" }}></div>
                            <h5>{user?.name || "User Name"}</h5>
                            <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
                        </div>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Button variant="link" className="text-start w-100">Dashboard</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">View My Bill</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">View My Plans</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">Usage History</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">Refer & Earn</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">Latest Offers</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">Downloads</Button></li>
                            <li className="mb-2"><Button variant="link" className="text-start w-100">Account Summary</Button></li>
                        </ul>
                    </Col>

                    {/* Main Content */}
                    <Col md={9} className="p-4">
                        <Row className="mb-4">
                            {quickLinks.map((link, idx) => (
                                <Col md={4} lg={2} key={idx} className="mb-3">
                                    <Card className="text-center py-4" style={{ backgroundColor: "#ffe6ec", cursor: "pointer" }}>
                                        <Card.Body>
                                            <div style={{ fontSize: "24px" }}>{link.icon}</div>
                                            <Card.Title style={{ fontSize: "14px", marginTop: "10px" }}>{link.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Card className="p-3 shadow-sm">
                            <h5>Check Coverage in Your Area</h5>
                            <Button variant="danger" className="mt-2">Let's Go</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Dashboard;

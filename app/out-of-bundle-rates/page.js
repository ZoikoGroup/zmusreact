"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

export default function OutOfBundleRatesPage() {
    return (
        <>
        <Header />
        <HeadBar text={<>Out of Bundle Rates</>} />
        <Container fluid className="p-0 bglite">
            <Container className="py-5">
                <h1 className="txtblack text-center py-5">Comming Soon</h1>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
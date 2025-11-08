"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

export default function AccessoriesPage() {
    return (
        <>
        <Header />
        <Container fluid className="p-0 accessoriesbg">
            <Container>
                <h1 className="verybig txtblack py-5">We have great offers coming your way soon!</h1>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
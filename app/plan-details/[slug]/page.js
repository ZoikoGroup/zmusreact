"use client"
import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

import { use } from "react";

export default function PlanDetail ({ params }) {
    const router = useRouter();
    const paramUrl = use(params).slug;

    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Zoiko Prepaid Plan</>} />
        <Container></Container>
        <Footer />
        </>
    );
}
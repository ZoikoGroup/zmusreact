"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container } from "react-bootstrap";

const ProductCategory = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Product Categories" />
        <Container>
            <h4>Product Categories</h4>
        </Container>
        <Footer />
        </>
    );
}
export default ProductCategory;
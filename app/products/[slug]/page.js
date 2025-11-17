"use client"
import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import data from "../../products/phonedata.json";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetail () {
    const router = useRouter();
    const params = useParams();
    const paramUrl = params?.slug;
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);

    const handleGoToCheckout = (item) => {
        // prepare cart item with selected options (fallback to first available)
        // Normalize cart item to match checkout's expected shape
        const numericPrice = (() => {
            if (typeof item.price === 'number') return item.price;
            if (typeof item.price === 'string') {
                // strip currency symbols and commas
                const n = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                return Number.isFinite(n) ? n : 0;
            }
            return 0;
        })();

        const cartItem = {
            // original product fields
            id: item.id,
            slug: item.slug,
            name: item.name,
            price: item.price,
            image: item.image,
            color: selectedColor || (item.color && item.color[0]) || null,
            storage: selectedStorage || (item.storage && item.storage[0]) || null,
            condition: selectedCondition || (item.condition && item.condition[0]) || null,
            qty: 1,

            // checkout-compatible fields
            planId: item.id,
            planSlug: item.slug,
            planTitle: item.name,
            planPrice: numericPrice,
            planDuration: "1",
            lineType: "device",
            simType: "N/A",
            formData: {
                priceQty: 1,
                price: numericPrice,
            },
        };

        // simple validation: require storage and condition (you can adjust rules)
        if (!cartItem.storage || !cartItem.condition) {
            alert('Please select storage and condition before checkout.');
            return;
        }

        try {
            console.log('Adding to cart:', cartItem);
            const existing = JSON.parse(localStorage.getItem('cart')) || [];
            existing.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(existing));
        } catch (e) {
            // if localStorage unavailable, just set fresh
            console.log('localStorage unavailable, setting cart fresh');
            localStorage.setItem('cart', JSON.stringify([cartItem]));
        }

        // go to checkout page
        router.push('/checkout');
    }

    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text={<>Discover Premium Quality Refurbished Smartphones @ Zoiko Mobile</>} />
        <Container fluid className="bglite">
            {data.filter(item => item.slug === paramUrl).map((item) => {
                return(
                    <Container key={item.id} className="py-4">
                        <Row>
                            <Col md={6} sm={12} xs={12} className="p-4 text-center">
                                <Image src={item.image} alt={item.name} width={300} height={400} style={{width:'70%',height:'auto'}} />
                            </Col>
                            <Col md={6} sm={12} xs={12} className="p-4">
                                <h2 className="green24bold">{item.name}</h2>
                                <div className="midbigred">{item.price}</div>
                                <hr />
                                <h4 className="pt-3">Color</h4>
                                <div>{item.color.map((name, index) => (
                                    <button
                                        key={index}
                                        className="checkoutlistcolor"
                                        onClick={() => setSelectedColor(name)}
                                        style={{
                                            color: name,
                                            border: selectedColor === name ? '2px solid black' : '1px solid gray',
                                            background: 'none',
                                            cursor: 'pointer',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            marginRight: '8px'
                                        }}
                                    >
                                        <i className="bi bi-circle-fill"></i>
                                    </button>
                                ))}</div>
                                <h4 className="pt-3">Storage</h4>
                                <div className="pb-3">{item.storage.map((name, index) => (
                                    <button
                                        key={index}
                                        className="checkoutliststorage"
                                        onClick={() => setSelectedStorage(name)}
                                        style={{
                                            border: selectedStorage === name ? '2px solid #dc3545' : '1px solid #ccc',
                                            background: selectedStorage === name ? '#f8f9fa' : 'white',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            marginRight: '8px',
                                            marginBottom: '8px'
                                        }}
                                    >
                                        {name}
                                    </button>
                                ))}</div>
                                <h4 className="pt-3">Condition</h4>
                                <div className="pb-4">{item.condition.map((name, index) => (
                                    <button
                                        key={index}
                                        className="checkoutliststorage"
                                        onClick={() => setSelectedCondition(name)}
                                        style={{
                                            border: selectedCondition === name ? '2px solid #dc3545' : '1px solid #ccc',
                                            background: selectedCondition === name ? '#f8f9fa' : 'white',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            marginRight: '8px',
                                            marginBottom: '8px'
                                        }}
                                    >
                                        {name}
                                    </button>
                                ))}</div>
                                <Button variant="outline-danger" size="lg" onClick={() => handleGoToCheckout(item)}>Go To Checkout</Button>
                            </Col>
                        </Row>
                    </Container>
                );
            })}

            <Container className="p-5">
                <h3 className="green24bold">You may also like</h3>
                <Row>
                    {data.map((item) => (
                        <Col key={item.id} md={4}>
                            <Card className="p-4 mb-4" style={{height:'430px'}}>
                                <h3 dangerouslySetInnerHTML={{ __html: item.name }} className="green24bold" />
                                <Row>
                                    <Col md={6} sm={6} xs={6}>
                                        Starting From:<p dangerouslySetInnerHTML={{ __html: item.price }} className="txtred" />
                                    </Col>
                                    <Col md={6} sm={6} xs={6}>
                                        Device condition:<p dangerouslySetInnerHTML={{ __html: item.condition }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={6} xs={6}>
                                        <Image src={item.image} alt={item.name} width={130} height={180} />
                                    </Col>
                                    <Col md={6} sm={6} xs={6}>
                                        Available colors:<br />
                                        {item.color.map((index) => (
                                            <span key={index} style={{color:`${index}`}}><i className="bi bi-circle-fill"></i> </span>
                                        ))}<br />
                                        Internal Storage:<br />
                                        {item.storage.map((index) => (
                                            <span key={index}>{index} </span>
                                        ))}<br />
                                        <p dangerouslySetInnerHTML={{ __html: item.quality }} />
                                    </Col>
                                </Row>
                                <div className="mt-4">
                                    <Button variant="outline-danger" href={`/products/${item.slug}`}>View details</Button>&nbsp;<Button variant="outline-danger" href={`/products/${item.slug}`}>Buy Now</Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
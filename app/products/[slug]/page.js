"use client"
import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import data from "../../products/phonedata.json";
import Image from "next/image";
import { use } from "react";

export default function ProductDetail ({ params }) {
    const router = useRouter();
    const paramUrl = use(params).slug;

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
                                    <li className="checkoutlistcolor" key={index} style={{color:`${name}`}}><i className="bi bi-circle-fill"></i></li>
                                ))}</div>
                                <h4 className="pt-3">Storage</h4>
                                <div className="pb-3">{item.storage.map((name, index) => (
                                    <li className="checkoutliststorage" key={index}>{name}</li>
                                ))}</div>
                                <h4 className="pt-3">Condition</h4>
                                <div className="pb-4">{item.condition.map((name, index) => (
                                    <li className="checkoutliststorage" key={index}>{name}</li>
                                ))}</div>
                                <Button variant="outline-danger" href="#" size="lg">Go To Checkout</Button>
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
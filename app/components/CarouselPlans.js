"use client"
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function CarouselSimPlan () {

    return (
        <>
        <Container fluid className="py-4 bglite">
            <h2 className="text-center py-4">Choose Your Zoiko Mobile Preferred Plan</h2>
            <ul className="nav nav-tabs nav-justified tabhead" role="tablist" style={{border:'1px solid black',borderRadius:'8px'}}>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" id="justified-tab-0" data-bs-toggle="tab" href="#prepaid" role="tab" aria-controls="justified-tabpanel-0" aria-selected="true"> Prepaid Plans </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="justified-tab-1" data-bs-toggle="tab" href="#postpaid" role="tab" aria-controls="justified-tabpanel-1" aria-selected="false"> Postpaid Plans </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="justified-tab-2" data-bs-toggle="tab" href="#business" role="tab" aria-controls="justified-tabpanel-2" aria-selected="false"> Business Plans </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="justified-tab-3" data-bs-toggle="tab" href="#travel" role="tab" aria-controls="justified-tabpanel-3" aria-selected="false"> Travel Plans </Link>
                </li>
            </ul>
        </Container>
        <Container fluid className="px-4 bglite">
            <div className="tab-content">
                <div id="prepaid" className="tab-pane active" aria-current="page">
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src={"/img/zoiko-lite.webp"} fluid alt='Zoiko Lite' />
                                <div className="card-header">
                                    Zoiko Lite 
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$15.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 15GB/1000 min/1000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/zoiko-essential.webp' fluid alt='Zoiko Essential' />
                                <div className="card-header">
                                    Zoiko Essential
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$22.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>Roaming 30GB/2000 min/2000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/zoiko-unlimited.webp' fluid alt='Zoiko Un;imited' />
                                <div className="card-header">
                                    Zoiko Unlimited One
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <div className="data">Unlimited 5G Data</div>
                                        </div>
                                        <div className="col">
                                            <p style={{textAlign:'right'}}><span className="curprice">$36.00/mo</span><br />per line</p>
                                        </div>
                                    </div>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 40GB/Unlimited Calls &amp; Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/prepaid-plans'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
                <div id="postpaid" className="tab-pane fade">
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src={"/img/zoiko-lite.webp"} fluid alt='Zoiko Lite' />
                                <div className="card-header">
                                    Zoiko Lite
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$20.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 15GB/1000 min/1000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/zoiko-essential.webp' fluid alt='Zoiko Essential' />
                                <div className="card-header">
                                    Zoiko Essential
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$38.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>Roaming 30GB/2000 min/2000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/zoiko-unlimited.webp' fluid alt='Zoiko Unlimited' />
                                <div className="card-header">
                                    Zoiko Unlimited
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$68.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 40GB/Unlimited Calls &amp; Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/postpaid-plans'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
                <div id="business" className="tab-pane fade">
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/business-starter.webp' fluid alt='Business Starter' />
                                <div className="card-header">
                                    Zoiko Business Starter
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$45.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 15GB/1000 min/1000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/business-pro.webp' fluid alt='Business Pro' />
                                <div className="card-header">
                                    Zoiko Business Pro
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$75.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>Roaming 30GB/2000 min/2000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/business-unlimited.webp' fluid alt='Business Unlimited' />
                                <div className="card-header">
                                    Zoiko Business Unlimited
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$85.00/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 40GB/Unlimited Calls &amp; Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/business-deals'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
                <div id="travel" className="tab-pane fade">
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/adventure-pass.webp' fluid alt='Adventure Pass' />
                                <div className="card-header">
                                    Daily Adventure Pass
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$7.50</span></p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 15GB/1000 min/1000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/voyager-pass.webp' fluid alt='Voyager Pass' />
                                <div className="card-header">
                                    Voyager Pass
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$16.00</span></p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>Roaming 30GB/2000 min/2000 Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <div className="card p-2">
                                <Image src='/img/explorer-pass.webp' fluid alt='Explorer Pass' />
                                <div className="card-header">
                                    Explorer Pass
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">Unlimited 5G Data</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">$52.00</span></p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        <li>Unlimited Calls &amp; Texts</li>
                                        <li>Free International Calls</li>
                                        <li>Wi-Fi Calling &amp; eSIM</li>
                                        <li>EU Roaming: 40GB/Unlimited Calls &amp; Texts</li>
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href="#" className="btn btn-outline-danger px-4">View plan</Link> <Link href="#" className="btn btn-danger">Buy this plan</Link></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/travel-plans'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
            </div>
        </Container>
        </>
    );
}
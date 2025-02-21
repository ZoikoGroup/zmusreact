"use client"
import { Container, Card, CardBody, Row, Col, Button, Image } from "react-bootstrap";

const BusinessPlans = () => {
    return (
        <>
        <Container fluid className="py-5">
            <h2 className="text-center pt-3">Zoiko Mobile Postpaid Business Deals</h2>
            <Row>
                <Col md={4} sm={12} xs={12}>
                    <Card>
                        <CardBody>
                            <Image src="/img/business-starter.webp" fluid alt="Zoiko Business Starter" />
                            <h4 className="pt-2 txtred">Zoiko Business Starter</h4>
                            <hr className="separator" />
                            <Row>
                                <Col className="data">Unlimited 5G Data</Col>
                                <Col style={{textAlign:'right'}}><span className="curprice">$35.00</span><br />/mo/line</Col>
                            </Row>
                            <hr className="separator" />
                            <ul className='check-bullet'>
                                <li>Unlimited 5G and 4G LTE Data</li>
                                <li>Unlimited Talk & Text</li>
                                <li>Nationwide 5G &amp; 4G Coverage</li>
                                <li>Mobile Hotspot Access</li>
                                <li>Flexible Contracts and Scalable Plans</li>
                                <li>Business-Specific Device Protection</li>
                            </ul>
                            <hr className="separator" />
                            <Button variant="danger" href="#" size="sm">Buy This Plan</Button>&nbsp;
                            <Button variant="outline-danger" href="#" size="sm">View Details</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Card>
                        <CardBody>
                            <Image src="/img/business-starter.webp" fluid alt="Zoiko Business Starter" />
                            <h4 className="pt-2 txtred">Zoiko Business Advance</h4>
                            <hr className="separator" />
                            <Row>
                                <Col className="data">Unlimited 5G Data</Col>
                                <Col style={{textAlign:'right'}}><span className="curprice">$67.00</span><br />/mo/line</Col>
                            </Row>
                            <hr className="separator" />
                            <ul className='check-bullet'>
                                <li>Unlimited 5G and 4G LTE Data</li>
                                <li>Unlimited Talk & Text</li>
                                <li>Nationwide 5G &amp; 4G Coverage</li>
                                <li>Mobile Hotspot Access</li>
                                <li>Flexible Contracts and Scalable Plans</li>
                                <li>Business-Specific Device Protection</li>
                            </ul>
                            <hr className="separator" />
                            <Button variant="danger" href="#" size="sm">Buy This Plan</Button>&nbsp;
                            <Button variant="outline-danger" href="#" size="sm">View Details</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Card>
                        <CardBody>
                            <Image src="/img/business-starter.webp" fluid alt="Zoiko Business Starter" />
                            <h4 className="pt-2 txtred">Zoiko Business Infinite</h4>
                            <hr className="separator" />
                            <Row>
                                <Col className="data">Unlimited 5G Data</Col>
                                <Col style={{textAlign:'right'}}><span className="curprice">$74.00</span><br />/mo/line</Col>
                            </Row>
                            <hr className="separator" />
                            <ul className='check-bullet'>
                                <li>Unlimited 5G and 4G LTE Data</li>
                                <li>Unlimited Talk & Text</li>
                                <li>Nationwide 5G &amp; 4G Coverage</li>
                                <li>Mobile Hotspot Access</li>
                                <li>Flexible Contracts and Scalable Plans</li>
                                <li>Business-Specific Device Protection</li>
                            </ul>
                            <hr className="separator" />
                            <Button variant="danger" href="#" size="sm">Buy This Plan</Button>&nbsp;
                            <Button variant="outline-danger" href="#" size="sm">View Details</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container fluid className="redimgbg p-0">
            <Container className="p-5">
                <h4>Climb your business&apos;s bottom line.</h4>
                <p>Pick among the best Unlimited Business Postpaid Plans and select the number of lines to see a big impact on your business&apos;s bottom line.</p>
                <h4>Reward your growing business with just one connection to climb to success.</h4>
                <p>Business phone plans are available with a pay monthly rolling easy agreement.</p>
            </Container>
        </Container>
        <Image src="/img/pinkbg-us.webp" fluid alt="Zoiko USA" />
        </>
    );
}
export default BusinessPlans;
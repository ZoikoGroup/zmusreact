"use client";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import ByodFaqs from "../components/ByodFaqs";
import { Container, Form, InputGroup, Button, Row, Col, DropdownButton, DropdownItem, Spinner, Alert } from "react-bootstrap";
import CarouselSimPlan from "../components/CarouselPlans";
import Link from "next/link";
import { useState } from "react";

const ByodPlans = () => {
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkCompatibility = async () => {
    if (!imei.trim()) {
      setResult({ status: "error", message: "⚠️ Please enter a valid IMEI or MEID number." });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info", {
        method: "POST",
        headers: {
          "X-AUTH-TOKEN": "09ff2d85-a451-47e6-86bc-aba98e1e4629",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_serial: imei }),
      });

      const data = await res.json();

      // ✅ Compatibility Check Logic
      if (res.ok && data && data.compatibility === true) {
        setResult({ status: "success", message: "✅ Your device is compatible with Zoiko Mobile network!" });
      } else if (res.ok && data && data.compatible === false) {
        setResult({ status: "error", message: "❌ Not Compatible with Zoiko Mobile network." });
      } else {
        setResult({ status: "error", message: "❌ Not Compatible with Zoiko Mobile network." });
      }
    } catch (error) {
      console.error("API Error:", error);
      setResult({ status: "error", message: "❌ Not Compatible with Zoiko Mobile network." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text={<>Bring Your Own Device (BYOD) to Zoiko Mobile</>} />

      {/* Banner */}
      <Container fluid className="p-0">
        <img className="d-none d-md-block w-100" src="/img/home-banner/byod-banner.png" alt="Student Banner" />
        <img className="d-sm-block d-md-none" src="/img/home-banner/byod-banner-m.png" alt="Student Banner" />
        <Container>
          <div style={{marginTop:'-440px', marginBottom:'200px'}}>
            <h1 className="d-none d-md-block txtblack w-50">Bring Your Own Device (BYOD) to Zoiko Mobile</h1>
            <h1 className="d-sm-block d-md-none txtblack">Bring Your Own Device (BYOD) to Zoiko Mobile</h1>
            <p className="d-none d-md-block body22 w-50">Ready to experience seamless connectivity on Zoiko Mobile&apos;s nationwide network? Bringing your own device is easy! Check the simple steps below to ensure your phone is compatible and ready to go.</p>
            <p className="d-sm-block d-md-none body22">Ready to experience seamless connectivity on Zoiko Mobile&apos;s nationwide network? Bringing your own device is easy! Check the simple steps below to ensure your phone is compatible and ready to go.</p>
            <DropdownButton variant="danger" size="lg" title="Browse Plans Now">
              <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
              <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
              <DropdownItem href="/business-deals">Business Deals</DropdownItem>
            </DropdownButton>
          </div>
        </Container>
      </Container>

      {/* Compatibility Info */}
      <Container fluid className="p-5 bglite">
        <h2 className="text-center">Is My Phone Compatible?</h2>
        <p className="body22">
          Zoiko Mobile utilizes the same network technologies as <b>Verizon, AT&T, and T-Mobile</b>. Generally, if your
          phone is compatible with one of these carriers, it should work on our network. We support both GSM and CDMA
          devices, including 4G LTE and 5G compatible phones. However, compatibility can vary. To guarantee a smooth
          activation process, please verify your device&apos;s compatibility.
        </p>
      </Container>

      {/* IMEI Checker */}
      <Container className="my-5 p-4 redborderbox text-center" style={{ backgroundColor: "#DF1E5A1C" }}>
        <h2>Check If Phone is Compatible</h2>
        <p className="body22">
          Enter your IMEI or MEID below to see if your device is compatible with the Zoiko Mobile network
        </p>
        <InputGroup className="w-50 w-sm-100 mx-auto">
          <Form.Control
            placeholder="Enter your IMEI or MEID number"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
          <Button variant="danger" size="lg" onClick={checkCompatibility} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Checking...
              </>
            ) : (
              "Check My Device"
            )}
          </Button>
        </InputGroup>

        {/* ✅ Compatibility Message */}
        {result && (
          <div className="pt-4">
            <Alert variant={result.status === "success" ? "success" : "danger"}>{result.message}</Alert>
          </div>
        )}

        <p className="body22 pt-4">
          Here&apos;s how to check your IMEI or MEID: This unique number identifies your phone. You can usually find it
          in your phone&apos;s settings under &quot;About Phone&quot; or by dialing *#06# on your phone&apos;s keypad.
        </p>
      </Container>

      {/* Plans Carousel */}
      <CarouselSimPlan />

      {/* Activation Steps */}
      <Container fluid className="bglite">
        <Container className="py-5">
          <h3 className="text-center">Activating Your Device</h3>
          <p className="body22 text-center">
            Once you have your Zoiko Mobile SIM card and have chosen a plan, follow these simple steps to activate your
            device:
          </p>
          <Row>
            <Col md={6}>
              <div className="d-flex flex-row">
                <div className="bigred px-3">1</div>
                <div className="px-2">
                  <h4 className="txtred">Insert your Zoiko Mobile SIM card</h4>
                  <p>Turn off your phone and carefully insert the SIM card into the designated slot.</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex flex-row">
                <div className="bigred px-3">2</div>
                <div className="px-2">
                  <h4 className="txtred">Visit our activation page</h4>
                  <p>
                    Go to{" "}
                    <Link href="https://www.zoikomobile.com/activate/">zoikomobile.com/activate/</Link> on your computer
                    or another device.
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="d-flex flex-row">
                <div className="bigred px-3">3</div>
                <div className="px-2">
                  <h4 className="txtred">Follow the on-screen instructions</h4>
                  <p>
                    You will be guided through the activation process, which includes verifying your account information
                    and transferring your number (if applicable).
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex flex-row">
                <div className="bigred px-3">4</div>
                <div className="px-2">
                  <h4 className="txtred">Enjoy Zoiko Mobile</h4>
                  <p>
                    Once your device is activated, you are ready to experience the speed and reliability of our
                    nationwide network.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <ByodFaqs />
      <Footer />
    </>
  );
};

export default ByodPlans;

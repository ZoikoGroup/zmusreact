"use client";
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

const [compatResult, setCompatResult] = useState(null);
const [checking, setChecking] = useState(false);
const [imeiError, setImeiError] = useState(null);


const checkCompatibility = async () => {
  if (!imei?.trim()) return;
  const cleanedImei = imei.replace(/\s/g, "").trim();

  if (!cleanedImei) {
    setImeiError("Please enter your IMEI/MEID number.");
    return;
  }

  if (!/^\d{14,16}$/.test(cleanedImei)) {
    setImeiError("Please enter a valid 14-16 digit IMEI number.");
    return;
  }

  setImeiError(null);
  setChecking(true);
  // ✅ Reset previous result before new check
  setCompatResult(null);
  // setConfirmedImei(null);

  try {
    const storageKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("device_serial_")
    );

    let localMatch = null;

    for (const key of storageKeys) {
      const item = localStorage.getItem(key);
      if (!item) continue;
      const parsed = JSON.parse(item);
      if (parsed.device_serial === cleanedImei) {
        localMatch = parsed;
        break;
      }
    }

    const nextIndex = storageKeys.length + 1;

    if (localMatch && localMatch.esim_compatible === true) {
      setCompatResult({ compatible: true, message: cleanedImei + " is compatible with eSIM." });
      // setConfirmedImei(cleanedImei);
      return;
    }

    if (localMatch && localMatch.esim_compatible === false) {
      setCompatResult({ compatible: false, message: cleanedImei + " is not compatible with eSIM." });
      return;
    }

    const goliteRes = await fetch(
      "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY,
        },
        body: JSON.stringify({ action: "esim_check", imei: cleanedImei }),
      }
    );

    const goliteData = await goliteRes.json();

    if (goliteData.compatible === true) {
      setCompatResult({ compatible: true, message: cleanedImei + " is compatible with eSIM." });
      // setConfirmedImei(cleanedImei);
      localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: true }));
      return;
    }

    const bequickRes = await fetch(
      "https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_BEQUICK_TOKEN,
        },
        body: JSON.stringify({ device_serial: cleanedImei }),
      }
    );

    const bequickData = await bequickRes.json();
    const isEsimCompatible = bequickData?.esim_compatible;

    if (isEsimCompatible === true) {
      setCompatResult({ compatible: true, message: cleanedImei + " is compatible with eSIM." });
      // setConfirmedImei(cleanedImei);
      localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: true }));

      await fetch(
        "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY,
          },
          body: JSON.stringify({ action: "esim_update", imei: cleanedImei }),
        }
      );
      return;
    }

    const goliteVRes = await fetch(
      "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY,
        },
        body: JSON.stringify({ action: "esim_v_check", imei: cleanedImei }),
      }
    );

    const goliteVData = await goliteVRes.json();

    if (goliteVData.esimCompatible === true) {
      setCompatResult({ compatible: true, message: cleanedImei + " is compatible with eSIM." });
      // setConfirmedImei(cleanedImei);
      localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: true }));
    } else {
      localStorage.setItem(`device_serial_${nextIndex}`, JSON.stringify({ device_serial: cleanedImei, esim_compatible: false }));
      setCompatResult({ compatible: false, message: cleanedImei + " is not compatible with eSIM." });
    }
  } catch (err) {
    setCompatResult({
      compatible: false,
      message: err instanceof Error ? err.message : "Unable to verify device. Please try again.",
    });
  } finally {
    setChecking(false);
  }
};

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <style>{`
        @media (max-width: 768px) {
            .byodBanner{
                background-image: url(/img/home-banner/byod-banner-m.png) !important;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                height: 100vw;
            }
            .bannerText{
                padding-top: 6vw;            
            }
            .byodBanner h1{
                font-size: 4.5vw;
                text-align: center;
            }
            .byodBanner h2{
                font-size: 3vw;
                text-align: center;
            }
            .byodBanner p{
                font-size: 2vw;
                text-align: center;
                padding-bottom: 1vw;
                margin-bottom: 0vw !important;
            }
            .byodBanner a{
                width: 30vw;
                padding: 2vw;
                font-size: 2.5vw;
            }
            .zoiko-btn {
                display: flex;
                justify-content: center;
            }
            .byodBanner ul{
                display:grid;
                padding-left:0px;
                justify-items: center;
            }
            .pinkboxwraper {
            text-align: center;
            }
           
        }
        @media (min-width: 769px) {
            .byodBanner {
                background-image: url(/img/home-banner/byod-banner.png);
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                height: 35vw;
            }
            .bannerText{
                padding-top: 2vw;            
            }
            .byodBanner h1{
                font-size: 2.5vw;
            }
            .byodBanner h2{
                font-size: 2vw;
            }
            .byodBanner p{
              font-size: 1.5vw;
              padding-right: 1.5vw;
              width: 50% !important;
            }
            .byodBanner a{
                width: 20vw;
                padding: 1vw;
                font-size: 1.5vw;
            }
           
            .byodBanner ul li{
                font-size: 1.5rem;
            }
            .byodBanner ul{
                width: 50%;
            }
                
        }
        `}</style>
      <HeadBar className="byodPlans" text={<>Bring Your Own Device (BYOD) to Zoiko Mobile</>} />

      {/* Banner */}
      {/* <Container fluid className="p-0">
        <img className="d-none d-md-block w-100" src="/img/home-banner/byod-banner.png" alt="Student Banner" />
        <img className="d-sm-block d-md-none"  style={{ width: "inherit" }} src="/img/home-banner/byod-banner-m.png" alt="Student Banner" />
        <Container className="d-none d-md-block txtblack w-75">
          <div style={{marginTop:'-440px', marginBottom:'140px'}}>
            <h1 className="txtblack"  style={{ width: "40%" }}>Bring Your Own Device (BYOD) to Zoiko Mobile</h1>
            <p className="body22" style={{ width: "40%" }}>Ready to experience seamless connectivity on Zoiko Mobile&apos;s nationwide network? Bringing your own device is easy! Check the simple steps below to ensure your phone is compatible and ready to go.</p>
            <DropdownButton variant="danger" size="lg" title="Browse Plans Now" style={{width: "20%"}}>
              <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
              <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
              <DropdownItem href="/business-deals">Business Deals</DropdownItem>
            </DropdownButton>
          </div>
        </Container>
        <Container className="d-sm-block d-md-none">
          <div style={{marginTop:'-480px', marginBottom:'260px'}}>
            <h1 className="txtblack">Bring Your Own Device (BYOD) to Zoiko Mobile</h1>
            <p className="body22">Ready to experience seamless connectivity on Zoiko Mobile&apos;s nationwide network? Bringing your own device is easy! Check the simple steps below to ensure your phone is compatible and ready to go.</p>
            <DropdownButton variant="danger" size="lg" title="Browse Plans Now">
              <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
              <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
              <DropdownItem href="/business-deals">Business Deals</DropdownItem>
            </DropdownButton>
          </div>
        </Container>
      </Container> */}


      <Container fluid className="p-0 byodBanner">

        <Container className="w-75">
          <div className="bannerText">
            <h2 className="txtred">Bring Your Own Device (BYOD)<br/>to Zoiko Mobile</h2>
            <p className="txtblack ">Ready to experience seamless connectivity on Zoiko Mobile&apos;s nationwide network? Bringing your own device is easy! Check the simple steps below to ensure your phone is compatible and ready to go.</p>
            <div className="d-flex flex-nowrap gap-3 zoiko-btn">
              <DropdownButton variant="danger" size="lg" title="Browse Plans Now">
              <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
              <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
              <DropdownItem href="/business-deals">Business Deals</DropdownItem>
            </DropdownButton>
            </div>
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
      <Container className="my-5 p-4 redborderbox text-center" id="deviceCompatibility" style={{ backgroundColor: "#DF1E5A1C" }}>
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
          <Button variant="danger" size="lg" onClick={checkCompatibility}  disabled={checking}>
           {checking ? "Checking…" : "Check My Device"}
          </Button>
         
        </InputGroup>

        {imeiError && <p className="text-danger" style={{ marginTop: 8 }}>{imeiError}</p>}

              {compatResult && (
                <div
                  className={`mt-3 rounded-xl p-3 text-sm ${
                    compatResult.compatible
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                  style={{ marginTop: 12 }}
                >
                  {compatResult.compatible ? (
                    <p className="font-bold text-success mb-0">{compatResult.message}</p>
                  ) : (
                    <p className="text-danger font-medium mb-0">
                      {compatResult.message || "Your device may not be compatible. Please contact support."}
                    </p>
                  )}
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

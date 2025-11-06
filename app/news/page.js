"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col } from "react-bootstrap";
import { Check2 } from "react-bootstrap-icons";

export default function FreeInternationalMinutes() {
;

  return (
    <>
      <Header />
      <HeadBar text="Zoiko's Buzz News : Where Mobile Trends & Tech Talks Converge" />

      <section className="py-5">
      <Container>
        {/* Main Heading */}
        <h1 className="fw-bold mb-3">
          Zoiko Mobile: Affordable, Reliable & Hassle-Free Wireless Service
        </h1>

        <h4 className="text-danger fw-semibold mb-4">
          Break Free from Overpriced Mobile Plans!
        </h4>

        <p>
          The wait is over! <strong>Zoiko Mobile</strong> is now available in the
          USA, bringing you affordable, no-contract mobile service with{" "}
          <strong>nationwide 4G & 5G coverage.</strong> Whether you need a
          budget-friendly prepaid plan, a reliable business solution, flexible
          family options, or seamless international roaming, we’ve got you
          covered.
        </p>

        <p>
          We believe staying connected should be simple, transparent, and
          stress-free – no contracts, no hidden fees, just reliable service at
          unbeatable prices.
        </p>

        {/* Why Choose Section */}
        <h3 className="fw-bold mt-5 mb-3">Why Choose Zoiko Mobile Over Big Carriers?</h3>

        <p>
          Unlike <strong>Verizon, AT&T, or T-Mobile</strong>, Zoiko Mobile is designed for
          people who want <strong>premium network coverage without premium prices.</strong>
        </p>

        <ul className="list-unstyled">
          <li>✔ Powered by top-tier U.S. networks to ensure strong, reliable signal quality.</li>
        </ul>

        {/* Affordable Plans */}
        <h5 className="fw-bold mt-4">📌 Affordable, No-Contract Plans</h5>
        <ul>
          <li>Prepaid & postpaid options that fit your lifestyle — without overpriced extras.</li>
          <li>No credit checks, no surprise fees, and total flexibility to change plans anytime.</li>
        </ul>

        {/* International Coverage */}
        <h5 className="fw-bold mt-4">🌍 International Coverage Without the Headaches</h5>
        <ul>
          <li>Free international minutes preloaded on select plans.</li>
          <li>Affordable Canada & Mexico roaming — stay connected wherever you go.</li>
          <li>No outrageous overage fees — just simple, transparent pricing.</li>
        </ul>

        {/* Plans for Everyone */}
        <h5 className="fw-bold mt-4">📶 Plans That Work for Everyone</h5>
        <ul>
          <li>Prepaid & Postpaid SIM-Only Plans — no commitment, just savings.</li>
          <li>Unlimited Business Phone Plans — reliable service for professionals.</li>
          <li>Military & Veterans Plans — special discounts for service members.</li>
          <li>Family Plans — share data, talk & text without overpaying.</li>
          <li>US Postal Service Plans — affordable options for postal workers.</li>
        </ul>

        {/* Movement Section */}
        <h5 className="fw-bold mt-4">❤️ More Than a Mobile Network — A Movement</h5>
        <p>
          We’re the <strong>Animal & Music Loving Network</strong> – up to{" "}
          <strong>2% of our profits support animal rescues and wildlife conservation.</strong>{" "}
          Every call, every text, and every plan contributes to a kinder world.
        </p>

        {/* Switching Section */}
        <h3 className="fw-bold mt-5 mb-3">Switching is Easy!</h3>
        <ul className="list-unstyled">
          <li><Check2 /> Keep your number</li>
          <li><Check2 /> No contracts or credit checks</li>
          <li><Check2 /> Activate in minutes</li>
        </ul>

        {/* How to Get Started */}
        <h3 className="fw-bold mt-5 mb-3">How to Get Started</h3>
        <ol>
          <li>Visit <strong>www.zoikomobile.com</strong></li>
          <li>Pick the plan that suits you best</li>
          <li>Activate your service and enjoy hassle-free connectivity</li>
        </ol>

        {/* CTA */}
        <h2 className="fw-bold mt-5">
          Join Zoiko Mobile Today & Experience Wireless Freedom!
        </h2>

        <p>
          Why overpay for mobile service? Get affordable, reliable coverage with
          no strings attached — and make a difference while you stay connected.
        </p>

        <p className="fw-semibold text-danger">
          🔶 Sign up now at <strong>www.zoikomobile.com</strong> and take control of your mobile experience!
        </p>
      </Container>
    </section>
      <Footer />
    </>
  );
}

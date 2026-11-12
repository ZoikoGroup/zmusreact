"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Hash,
  ShieldCheck,
  Signal,
  Cpu,
  Lock,
  CheckCircle2,
  RefreshCw,
  Info,
  XCircle,
  ArrowRight,
  Phone,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./CheckCompatibility.module.css";

const imeiTabs = {
  iPhone: [
    "Open Settings.",
    "Tap General, then About.",
    "Scroll down to IMEI.",
    "Press and hold the number to copy it.",
  ],
  Android: [
    "Open Settings.",
    "Tap About phone (or About device).",
    "Look for IMEI (slot 1).",
    "Press and hold to copy the 15-digit number.",
  ],
  "Any phone": [
    "Open your phone's dialer / keypad.",
    "Dial *#06# (no need to press call).",
    "Your 15-digit IMEI appears on screen.",
    "Use IMEI 1 if two numbers are shown.",
  ],
  "Box or receipt": [
    "Check the barcode label on the original phone box.",
    "Look for the 15-digit number labeled IMEI.",
    "Check your purchase receipt or carrier invoice.",
    "Avoid using the Serial Number or MEID.",
  ],
};

const itChecksItems = [
  "Whether your phone works on our network",
  "Which SIM types your phone can use",
  "Whether your phone is locked to another carrier",
  "Whether your phone is reported lost or stolen",
  "Which features, like 5G and Wi-Fi calling, are confirmed",
];

const itDoesntItems = [
  "Choose or approve a plan for you",
  "Approve a payment or create an order",
  "Transfer your phone number (that's a separate check)",
  "Activate your phone or start service",
  "Guarantee coverage at every location",
];

const nextStepCards = [
  {
    img: "/img/Check-Compatibility/cc7.png",
    alt: "Couple checking mobile plans together",
    title: "Choose a plan",
    desc: "Compare plans once your phone is eligible.",
    linkText: "See all plans",
    href: "/plans",
  },
  {
    img: "/img/Check-Compatibility/cc8.png",
    alt: "Friends smiling outdoors with smartphone",
    title: "Keep your number",
    desc: "Check your number separately and transfer it securely.",
    linkText: "Check my number",
    href: "/switch",
  },
  {
    img: "/img/Check-Compatibility/cc9.png",
    alt: "Modern devices on desk",
    title: "Need a new phone?",
    desc: "Shop phones that are ready for Zoiko.",
    linkText: "Shop phones",
    href: "/devices",
  },
  {
    img: "/img/Check-Compatibility/cc10.png",
    alt: "Customer support specialist with headset",
    title: "Talk to us",
    desc: "Our team can help with locked or older phones.",
    linkText: "Get support",
    href: "/support",
  },
];

const compatibilityFaqs = [
  {
    q: "How do I unlock my phone?",
    a: "Ask the carrier your phone is locked to. Most carriers unlock phones once they're paid off and meet their unlocking policy. When it's unlocked, check again here.",
  },
  {
    q: "Will 5G work on my phone?",
    a: "If your phone supports our 5G bands and is unlocked, 5G will be available in 5G coverage areas.",
  },
  {
    q: "How do I know if I can use eSIM?",
    a: "Your IMEI check will confirm eSIM support. Most recent iPhone, Pixel, and Samsung Galaxy models support eSIM.",
  },
  {
    q: "Is my IMEI kept private?",
    a: "Yes. We use your IMEI solely to check network and SIM compatibility—it does not activate service or store personal details.",
  },
  {
    q: "Does this transfer my phone number?",
    a: "No. Checking device compatibility is separate from transferring your phone number. You can keep your number during activation.",
  },
  {
    q: "My check failed. What now?",
    a: "Double-check that you entered all 15 digits of IMEI 1 (not the serial number or MEID). If it still fails, call us at 800-988-8116.",
  },
  {
    q: "Can I use an MEID instead?",
    a: "No. We require a 15-digit IMEI number. Dial *#06# on your phone to view your IMEI.",
  },
];

export default function CheckCompatibilityClient() {
  const [imei, setImei] = useState("");
  const [error, setError] = useState("");
  const [checkedImei, setCheckedImei] = useState(null);
  const [activeDeviceTab, setActiveDeviceTab] = useState("iPhone");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleImeiChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 15);
    setImei(digitsOnly);
    if (error) setError("");
  };

  const handleCheckSubmit = (e) => {
    e.preventDefault();
    if (imei.length !== 15) {
      setError("Please enter a valid 15-digit IMEI number.");
      return;
    }
    setError("");
    setCheckedImei(imei);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* SECTION 1A: HERO & IMEI CHECKER */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Mobile-only Breadcrumb */}
          <nav className={styles.mobileBreadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.mobileBreadcrumbLink}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/switch" className={styles.mobileBreadcrumbLink}>
              Bring Your Phone
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.mobileBreadcrumbCurrent}>
              Check Compatibility
            </span>
          </nav>

          <span className={styles.heroEyebrow}>
            <Smartphone size={13} strokeWidth={2.2} />
            <span>BRING YOUR OWN PHONE</span>
          </span>

          <h1 className={styles.heroTitle}>
            Will your phone work{" "}
            <span className={styles.heroTitleAccent}>with Zoiko?</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Enter your device&apos;s IMEI to review network and SIM
            compatibility before choosing a plan.
          </p>

          <form className={styles.imeiCard} onSubmit={handleCheckSubmit}>
            <label htmlFor="cc-imei-input" className={styles.imeiLabel}>
              Device IMEI (15 digits)
            </label>

            <div className={styles.imeiInputRow}>
              <div className={styles.imeiInputBox}>
                <Hash
                  size={15}
                  strokeWidth={2.2}
                  className={styles.imeiInputIcon}
                />
                <input
                  id="cc-imei-input"
                  type="text"
                  inputMode="numeric"
                  className={styles.imeiInput}
                  placeholder="35 123456 789012 3"
                  value={imei}
                  onChange={handleImeiChange}
                />
                <span className={styles.imeiCounter}>{imei.length}/15</span>
              </div>

              <button type="submit" className={styles.imeiSubmitBtn}>
                Check my phone
              </button>
            </div>

            {error && <p className={styles.imeiError}>{error}</p>}

            <div className={styles.imeiHelpers}>
              <p className={styles.imeiHelperLine}>
                <span>
                  Dial <strong>*#06#</strong> on your phone or open Settings to
                  find the IMEI.
                </span>
                <a href="#find-imei" className={styles.imeiHelpLink}>
                  Step-by-step help
                </a>
              </p>
              <p className={styles.imeiHelperLine}>
                <ShieldCheck
                  size={13}
                  strokeWidth={2.2}
                  className={styles.imeiShieldIcon}
                />
                <span>
                  We use this only to check eligibility. It won&apos;t activate
                  your phone.
                </span>
              </p>
            </div>
          </form>

          <div className={styles.featurePillsRow}>
            <span className={styles.featurePill}>
              <Signal
                size={13}
                strokeWidth={2.2}
                className={styles.featurePillIcon}
              />
              <span>Network</span>
            </span>
            <span className={styles.featurePill}>
              <Cpu
                size={13}
                strokeWidth={2.2}
                className={styles.featurePillIcon}
              />
              <span>SIM or eSIM</span>
            </span>
            <span className={styles.featurePill}>
              <Lock
                size={13}
                strokeWidth={2.2}
                className={styles.featurePillIcon}
              />
              <span>Lock status</span>
            </span>
            <span className={styles.featurePill}>
              <CheckCircle2
                size={13}
                strokeWidth={2.2}
                className={styles.featurePillIcon}
              />
              <span>Device status</span>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 1B: WIDE BANNER IMAGE */}
      <section className={styles.bannerSection}>
        <div className={styles.container}>
          <div className={styles.bannerWrap}>
            <img
              src="/img/Check-Compatibility/cc1.png"
              alt="People holding smartphones to check compatibility"
              className={`${styles.bannerImg} ${styles.desktopOnly}`}
            />
            <img
              src="/img/Check-Compatibility/cc12.png"
              alt="Modern smartphones and devices"
              className={`${styles.bannerImg} ${styles.mobileOnly}`}
            />
            <div className={styles.bannerOverlay} />
            <div className={styles.bannerPillsRow}>
              <span className={styles.bannerPill}>
                <Lock
                  size={12}
                  strokeWidth={2.2}
                  className={styles.bannerPillIcon}
                />
                <span>Works best with unlocked phones</span>
              </span>
              <span className={styles.bannerPill}>
                <Cpu
                  size={12}
                  strokeWidth={2.2}
                  className={styles.bannerPillIcon}
                />
                <span>eSIM or physical SIM</span>
              </span>
              <span className={styles.bannerPill}>
                <RefreshCw
                  size={12}
                  strokeWidth={2.2}
                  className={styles.bannerPillIcon}
                />
                <span>Keep your number separately</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1C: YOUR COMPATIBILITY RESULT */}
      <section className={styles.resultSection}>
        <div className={styles.container}>
          <h2 className={styles.resultHeading}>Your compatibility result</h2>

          <div className={styles.resultCard}>
            <div className={styles.resultImgWrap}>
              <img
                src="/img/Check-Compatibility/cc2.png"
                alt="5G SIM card compatibility illustration"
                className={`${styles.resultImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Check-Compatibility/cc13.png"
                alt="Smartphone and notebook on desk"
                className={`${styles.resultImg} ${styles.mobileOnly}`}
              />
            </div>

            <div className={styles.resultBody}>
              {!checkedImei ? (
                <>
                  <h3 className={styles.resultTitle}>
                    Your results will appear here
                  </h3>
                  <p className={styles.resultDesc}>
                    We check network compatibility, SIM options, lock status,
                    and device status separately, so you know exactly what
                    works.
                  </p>
                </>
              ) : (
                <>
                  <span className={styles.resultStatusBadge}>
                    <CheckCircle2 size={14} strokeWidth={2.4} />
                    <span>IMEI {checkedImei} reviewed</span>
                  </span>
                  <h3 className={styles.resultTitle}>
                    Ready for Zoiko 5G &amp; LTE Network
                  </h3>
                  <p className={styles.resultDesc}>
                    Your device format matches our 15-digit IMEI check. Make
                    sure your phone is carrier-unlocked before activating with
                    eSIM or physical SIM.
                  </p>
                  <button
                    type="button"
                    className={styles.resultResetBtn}
                    onClick={() => {
                      setCheckedImei(null);
                      setImei("");
                    }}
                  >
                    Check another IMEI
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2A: SIM OPTIONS */}
      <section className={styles.simSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>SIM OPTIONS</span>
          <h2 className={styles.sectionHeading}>
            Choose how you&apos;ll connect.
          </h2>
          <p className={styles.sectionSubtext}>
            eSIM and physical SIM are checked separately for your device, our
            network partner and your plan.
          </p>

          <div className={styles.simInfoBar}>
            <Info size={15} strokeWidth={2.2} />
            <span>
              Check your IMEI first. SIM options open once your device is
              eligible to continue.
            </span>
          </div>

          <div className={styles.simGrid}>
            <div className={styles.simCard}>
              <div className={styles.simCardImgWrap}>
                <img
                  src="/img/Check-Compatibility/cc3.png"
                  alt="Team holding smartphones"
                  className={`${styles.simCardImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/Check-Compatibility/cc14.png"
                  alt="Headphones on light surface"
                  className={`${styles.simCardImg} ${styles.mobileOnly}`}
                />
              </div>
              <div className={styles.simCardBody}>
                <div className={styles.simCardTopRow}>
                  <h3 className={styles.simCardTitle}>eSIM</h3>
                  <span
                    className={`${styles.simStatusPill} ${
                      checkedImei ? styles.simStatusPillReady : ""
                    }`}
                  >
                    {checkedImei ? "Available" : "Check IMEI first"}
                  </span>
                </div>
                <p className={styles.simCardDesc}>
                  A digital SIM, set up on your phone without waiting for a
                  card. We may need your phone&apos;s EID to confirm.
                </p>
                <button
                  type="button"
                  className={`${styles.simBtnPinkMuted} ${
                    checkedImei ? styles.simBtnPinkActive : ""
                  }`}
                >
                  Choose eSIM
                </button>
              </div>
            </div>

            <div className={styles.simCard}>
              <div className={styles.simCardImgWrap}>
                <img
                  src="/img/Check-Compatibility/cc4.png"
                  alt="Physical SIM and eSIM illustration"
                  className={styles.simCardImg}
                />
              </div>
              <div className={styles.simCardBody}>
                <div className={styles.simCardTopRow}>
                  <h3 className={styles.simCardTitle}>Physical SIM</h3>
                  <span
                    className={`${styles.simStatusPill} ${
                      checkedImei ? styles.simStatusPillReady : ""
                    }`}
                  >
                    {checkedImei ? "Available" : "Check IMEI first"}
                  </span>
                </div>
                <p className={styles.simCardDesc}>
                  A SIM card shipped to you with simple setup steps.
                  Availability is confirmed for your address at checkout.
                </p>
                <button
                  type="button"
                  className={`${styles.simBtnOutlineMuted} ${
                    checkedImei ? styles.simBtnOutlineActive : ""
                  }`}
                >
                  Choose physical SIM
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2B: FIND YOUR IMEI */}
      <section id="find-imei" className={styles.findImeiSection}>
        <div className={styles.container}>
          <div className={styles.findImeiGrid}>
            <div className={styles.imeiCollage}>
              <div className={styles.imeiTallCard}>
                <img
                  src="/img/Check-Compatibility/cc5.png"
                  alt="Device information screen showing IMEI 1 and IMEI 2 barcodes"
                  className={`${styles.imeiTallImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/Check-Compatibility/cc16.png"
                  alt="Smartphone corner on light surface"
                  className={`${styles.imeiTallImg} ${styles.mobileOnly}`}
                />
              </div>

              <div className={styles.imeiRightStack}>
                <div className={styles.imeiDialCard}>
                  <img
                    src="/img/Check-Compatibility/cc6.png"
                    alt="Phone dialer showing IMEI popup"
                    className={`${styles.imeiDialImg} ${styles.desktopOnly}`}
                  />
                  <img
                    src="/img/Check-Compatibility/cc17.png"
                    alt="Lavender smartphone case"
                    className={`${styles.imeiDialImg} ${styles.mobileOnly}`}
                  />
                </div>
                <div className={styles.imeiQuickCard}>
                  <span className={styles.imeiQuickEyebrow}>QUICKEST WAY</span>
                  <span className={styles.imeiQuickCode}>*#06#</span>
                  <p className={styles.imeiQuickCaption}>
                    Dial it on any phone to show the IMEI.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className={styles.sectionEyebrow}>FIND YOUR IMEI</span>
              <h2 className={styles.sectionHeading}>
                Where to find your 15-digit IMEI.
              </h2>

              <div
                className={styles.deviceTabs}
                role="tablist"
                aria-label="Device IMEI instructions"
              >
                {Object.keys(imeiTabs).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeDeviceTab === tab}
                    className={`${styles.deviceTabBtn} ${
                      activeDeviceTab === tab ? styles.deviceTabBtnActive : ""
                    }`}
                    onClick={() => setActiveDeviceTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <ol className={styles.imeiStepsList}>
                {imeiTabs[activeDeviceTab].map((stepText, idx) => (
                  <li key={stepText} className={styles.imeiStepItem}>
                    <span className={styles.imeiStepBadge}>{idx + 1}</span>
                    <span>{stepText}</span>
                  </li>
                ))}
              </ol>

              <p className={styles.dualSimNote}>
                <Info
                  size={14}
                  strokeWidth={2.2}
                  style={{ color: "#c81e5a", flexShrink: 0 }}
                />
                <span>
                  Dual-SIM phones show two IMEIs. Use the first one (IMEI 1). We
                  don&apos;t accept MEID numbers.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2C: GOOD TO KNOW */}
      <section className={styles.goodToKnowSection}>
        <div className={styles.container}>
          <div className={styles.goodToKnowHeader}>
            <span className={styles.sectionEyebrow}>GOOD TO KNOW</span>
            <h2 className={styles.goodToKnowHeading}>
              What a compatibility check does, and doesn&apos;t, tell you.
            </h2>
          </div>

          <div className={styles.checksGrid}>
            <div className={styles.checksCard}>
              <h3 className={styles.checksCardTitleGreen}>
                <CheckCircle2 size={16} strokeWidth={2.4} />
                <span>It checks</span>
              </h3>
              <ul className={styles.checksList}>
                {itChecksItems.map((item) => (
                  <li key={item} className={styles.checksItem}>
                    <CheckCircle2
                      size={14}
                      strokeWidth={2.2}
                      className={styles.checksIconGreen}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.checksCard}>
              <h3 className={styles.checksCardTitleDark}>
                <Info size={16} strokeWidth={2.4} />
                <span>It doesn&apos;t</span>
              </h3>
              <ul className={styles.checksList}>
                {itDoesntItems.map((item) => (
                  <li key={item} className={styles.checksItem}>
                    <XCircle
                      size={14}
                      strokeWidth={2.2}
                      className={styles.checksIconMuted}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3A: WHERE TO GO FROM HERE */}
      <section className={styles.nextStepsSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>NEXT STEPS</span>
          <h2 className={styles.sectionHeading}>Where to go from here.</h2>

          <div className={styles.nextStepsGrid}>
            {nextStepCards.map((card) => (
              <div key={card.title} className={styles.nextStepCard}>
                <div className={styles.nextStepImgWrap}>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className={styles.nextStepImg}
                  />
                </div>
                <div className={styles.nextStepBody}>
                  <h3 className={styles.nextStepTitle}>{card.title}</h3>
                  <p className={styles.nextStepDesc}>{card.desc}</p>
                  <Link href={card.href} className={styles.nextStepLink}>
                    <span>{card.linkText}</span>
                    <ArrowRight size={13} strokeWidth={2.3} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3B: COMPATIBILITY QUESTIONS (FAQS) */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div>
              <span className={styles.sectionEyebrow}>FAQS</span>
              <h2 className={styles.sectionHeading}>
                Compatibility questions.
              </h2>

              <div className={styles.faqPhotoCard}>
                <img
                  src="/img/Check-Compatibility/cc11.png"
                  alt="Desk with laptop, glasses, and coffee cup"
                  className={styles.faqPhotoImg}
                />
                <div className={styles.faqPhotoFooter}>
                  <p className={styles.faqPhotoTitle}>
                    Check failed or unsure?
                  </p>
                  <a href="tel:8009888116" className={styles.faqPhoneLink}>
                    <Phone size={15} strokeWidth={2.2} />
                    <span>800-988-8116</span>
                  </a>
                  <p className={styles.faqPhotoCaption}>
                    Never share your IMEI by email or chat. We&apos;ll ask
                    securely.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.faqList}>
              {compatibilityFaqs.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={item.q}
                    className={`${styles.faqItem} ${
                      isOpen ? styles.faqItemOpen : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestionBtn}
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    >
                      <span>{item.q}</span>
                      <span
                        className={`${styles.faqToggleCircle} ${
                          isOpen ? styles.faqToggleCircleOpen : ""
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus size={13} strokeWidth={2.5} />
                        ) : (
                          <Plus size={13} strokeWidth={2.5} />
                        )}
                      </span>
                    </button>
                    {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

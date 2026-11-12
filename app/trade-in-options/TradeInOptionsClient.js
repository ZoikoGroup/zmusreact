"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Info,
  Search,
  Tag,
  Package,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./TradeInOptions.module.css";

const howSteps = [
  {
    num: "01",
    title: "Check",
    desc: "See if your phone and ZIP code are covered by an approved program.",
    icon: "search",
    dark: false,
  },
  {
    num: "02",
    title: "Estimate",
    desc: "Answer a few honest questions about its condition for an estimate.",
    icon: "tag",
    dark: false,
  },
  {
    num: "03",
    title: "Send it in",
    desc: "Use the partner's prepaid shipping, after you back up and erase it.",
    icon: "package",
    dark: false,
  },
  {
    num: "04",
    title: "Inspect & credit",
    desc: "Final value is set after inspection. You can accept or decline any change.",
    icon: "check",
    dark: true,
  },
];

const checkerSteps = [
  { num: 1, title: "Check", sub: "Phone and ZIP" },
  { num: 2, title: "Condition", sub: "A few questions" },
  { num: 3, title: "Estimate", sub: "Review and accept" },
  { num: 4, title: "Send & track", sub: "Ship and get credit" },
];

const protectCards = [
  {
    num: 1,
    img: "/img/Trade-In-Options/tio4.png",
    alt: "Backing up smartphone data",
    title: "Back up your phone",
    desc: "Save photos, contacts and messages to your cloud account or computer.",
    overlayNum: false,
  },
  {
    num: 2,
    img: "/img/Trade-In-Options/tio5.png",
    alt: "Turning off Find My or Google lock in settings",
    title: "Turn off Find My or Google lock",
    desc: "Do it in your own account settings. We'll never ask for your password.",
    overlayNum: true,
  },
  {
    num: 3,
    img: "/img/Trade-In-Options/tio6.png",
    alt: "Factory reset settings screens",
    title: "Erase it completely",
    desc: "Use Settings to reset to factory settings, after you've backed up.",
    overlayNum: true,
  },
  {
    num: 4,
    img: "/img/Trade-In-Options/tio7.png",
    alt: "Removing SIM card from smartphone",
    title: "Remove your SIM and pack it",
    desc: "Take out your SIM card, then pack the phone safely using the partner's instructions.",
    overlayNum: true,
  },
];

const relatedCards = [
  {
    img: "/img/Trade-In-Options/tio8.png",
    alt: "Couple shopping for phones",
    title: "Shop phones",
    desc: "Find your next phone. Trade-in is added to your order, not a separate store.",
    href: "/devices",
  },
  {
    img: "/img/Trade-In-Options/tio9.png",
    alt: "Latest smartphones and devices",
    title: "New smartphones",
    desc: "See the latest arrivals ready for Zoiko.",
    href: "/devices",
  },
  {
    img: "/img/Trade-In-Options/tio10.png",
    alt: "Friends checking phone compatibility",
    title: "Check compatibility",
    desc: "Keeping your current phone? Check it works on our network.",
    href: "/check-compatibility",
  },
  {
    img: "/img/Trade-In-Options/tio11.png",
    alt: "Support agent with headset",
    title: "Phone unlock help",
    desc: "Need your old phone unlocked first? Start here.",
    href: "/check-compatibility#find-imei",
  },
];

const tradeInFaqs = [
  {
    q: "Is trade-in available now?",
    a: "Not yet. We're setting up an approved trade-in partner. Leave your email and we'll let you know when it opens.",
  },
  {
    q: "Is my estimate guaranteed?",
    a: "No. Your estimate is based on the condition you report. The final value is confirmed only after the partner inspects your phone.",
  },
  {
    q: "What if the inspection finds a different condition?",
    a: "You'll receive an updated offer based on the inspection findings, which you can accept or decline.",
  },
  {
    q: "How do I get my credit?",
    a: "Once you accept the final value after inspection, your trade-in credit is issued according to the approved program terms.",
  },
  {
    q: "Is a promotion included in my estimate?",
    a: "No. Base trade-in estimates and promotional credits are shown separately so you can see exactly how each applies.",
  },
  {
    q: "What happens to my data?",
    a: "You should back up and factory-reset your phone before shipping. Partners also perform a certified data wipe upon receipt.",
  },
  {
    q: "What if I cancel my new phone order?",
    a: "Trade-in credits are tied to your device order; if you cancel before shipping your trade-in, you can keep your old phone.",
  },
  {
    q: "Does trade-in check if my phone works on Zoiko?",
    a: "No. Trade-in checks your old phone's value. To check if a phone works on our network, use our compatibility checker.",
  },
];

export default function TradeInOptionsClient() {
  const [checkerMode, setCheckerMode] = useState("model");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [imei, setImei] = useState("");
  const [zip, setZip] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [doneSteps, setDoneSteps] = useState({});
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const readyCount = Object.values(doneSteps).filter(Boolean).length;

  const toggleDoneStep = (num) => {
    setDoneSteps((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const renderStepIcon = (iconName) => {
    if (iconName === "search") return <Search size={16} strokeWidth={2.2} />;
    if (iconName === "tag") return <Tag size={16} strokeWidth={2.2} />;
    if (iconName === "package") return <Package size={16} strokeWidth={2.2} />;
    return <CheckCircle2 size={16} strokeWidth={2.2} />;
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setAvailabilityMessage(
      "Trade-ins aren't open yet while we finalize our approved partner. Check back soon or shop phones today."
    );
  };

  return (
    <div className={styles.pageWrapper}>
      {/* SECTION 1A: HERO BANNER */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Mobile-only Breadcrumb */}
          <nav className={styles.mobileBreadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.mobileBreadcrumbLink}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/devices" className={styles.mobileBreadcrumbLink}>
              Shop Phones
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.mobileBreadcrumbCurrent}>
              Trade-In Options
            </span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <span className={styles.heroPill}>
                <RefreshCw size={12} strokeWidth={2.3} />
                <span>TRADE-IN OPTIONS</span>
              </span>

              <h1 className={styles.heroTitle}>
                Give your old phone a{" "}
                <span className={styles.heroTitleAccent}>next chapter.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Explore trade-in possibilities as you shop for your next phone.
                Availability, estimates and credit options depend on the device
                and approved program terms.
              </p>

              <div className={styles.heroNoticeBox}>
                <Info
                  size={15}
                  strokeWidth={2.2}
                  className={styles.heroNoticeIcon}
                />
                <div>
                  <p className={styles.heroNoticeTitle}>
                    Trade-ins aren&apos;t available yet
                  </p>
                  <p className={styles.heroNoticeDesc}>
                    We&apos;re setting up an approved partner. You can still
                    learn how it will work and get notified when it opens.
                  </p>
                </div>
              </div>

              <div className={styles.heroActions}>
                <a href="#trade-in-checker" className={styles.heroPrimaryBtn}>
                  Check trade-in availability
                </a>
                <Link href="/devices" className={styles.heroSecondaryBtn}>
                  Shop phones
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className={styles.mobileProgramTermsLink}
                >
                  Program terms
                </Link>
              </div>
            </div>

            <div className={styles.heroCollage}>
              <img
                src="/img/Trade-In-Options/tio1.png"
                alt="People exchanging smartphones at a desk"
                className={`${styles.collageMainImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Trade-In-Options/tio13.png"
                alt="Modern smartphones and devices"
                className={`${styles.collageMainImg} ${styles.mobileOnly}`}
              />

              <img
                src="/img/Trade-In-Options/tio2.png"
                alt="Reviewing phone trade-in details"
                className={`${styles.collageTopRightImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Trade-In-Options/tio14.png"
                alt="Outdoor maintenance tools"
                className={`${styles.collageTopRightImg} ${styles.mobileOnly}`}
              />

              <img
                src="/img/Trade-In-Options/tio3.png"
                alt="Holding smartphones for trade-in"
                className={`${styles.collageBottomLeftImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Trade-In-Options/tio15.png"
                alt="Light blue smartphone case"
                className={`${styles.collageBottomLeftImg} ${styles.mobileOnly}`}
              />

              <div className={styles.howValueCard}>
                <span className={styles.howValueEyebrow}>HOW VALUE WORKS</span>
                <div className={styles.howValueRow}>
                  <span>Estimate</span>
                  <span className={styles.howValueStrong}>Before you ship</span>
                </div>
                <div className={styles.howValueRow}>
                  <span>Final value</span>
                  <span className={styles.howValueStrong}>
                    After inspection
                  </span>
                </div>
                <div className={styles.howValueRow}>
                  <span>Promotion</span>
                  <span className={styles.howValueStrong}>
                    Shown separately
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1B: FOUR STEPS, WITH NO SURPRISES */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>HOW TRADE-IN WORKS</span>
          <h2 className={styles.sectionHeading}>
            Four steps, with no surprises.
          </h2>

          <div className={styles.stepsGrid}>
            {howSteps.map((s) => (
              <div
                key={s.num}
                className={`${styles.stepCard} ${
                  s.dark ? styles.stepCardDark : ""
                }`}
              >
                <div className={styles.stepCardTop}>
                  <span
                    className={`${styles.stepIconBox} ${
                      s.dark ? styles.stepIconBoxDark : ""
                    }`}
                  >
                    {renderStepIcon(s.icon)}
                  </span>
                  <span
                    className={`${styles.stepNumWatermark} ${
                      s.dark ? styles.stepNumWatermarkDark : ""
                    }`}
                  >
                    {s.num}
                  </span>
                </div>
                <h3
                  className={`${styles.stepTitle} ${
                    s.dark ? styles.stepTitleDark : ""
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`${styles.stepDesc} ${
                    s.dark ? styles.stepDescDark : ""
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.disclaimerBar}>
            <AlertTriangle
              size={15}
              strokeWidth={2.2}
              className={styles.disclaimerIcon}
            />
            <span>
              An estimate isn&apos;t a guaranteed payment. The final value is
              confirmed only after the partner inspects your phone.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 1C: TRADE-IN CHECKER */}
      <section id="trade-in-checker" className={styles.checkerSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>TRADE-IN CHECKER</span>
          <h2 className={styles.sectionHeading}>
            Check, estimate and send, step by step.
          </h2>
          <p className={styles.checkerSubtitle}>
            We&apos;ll only ask for what&apos;s needed. Your answers are kept as
            you move between steps.
          </p>

          <div className={styles.checkerGrid}>
            <div className={styles.checkerSidebar}>
              {checkerSteps.map((item) => (
                <div
                  key={item.num}
                  className={`${styles.checkerStepRow} ${
                    item.num === 1 ? styles.checkerStepRowActive : ""
                  }`}
                >
                  <span
                    className={`${styles.checkerStepBadge} ${
                      item.num === 1 ? styles.checkerStepBadgeActive : ""
                    }`}
                  >
                    {item.num}
                  </span>
                  <div>
                    <span className={styles.checkerStepName}>{item.title}</span>
                    <span className={styles.checkerStepSub}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <form
              className={styles.checkerFormCard}
              onSubmit={handleCheckAvailability}
            >
              <h3 className={styles.checkerCardTitle}>
                Which phone are you trading in?
              </h3>

              <div className={styles.checkerModeTabs} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={checkerMode === "model"}
                  className={`${styles.checkerModeBtn} ${
                    checkerMode === "model" ? styles.checkerModeBtnActive : ""
                  }`}
                  onClick={() => setCheckerMode("model")}
                >
                  Choose my model
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={checkerMode === "imei"}
                  className={`${styles.checkerModeBtn} ${
                    checkerMode === "imei" ? styles.checkerModeBtnActive : ""
                  }`}
                  onClick={() => setCheckerMode("imei")}
                >
                  Use my IMEI
                </button>
              </div>

              {checkerMode === "model" ? (
                <div className={styles.checkerSelectGrid}>
                  <div>
                    <label htmlFor="tio-brand" className={styles.fieldLabel}>
                      Brand
                    </label>
                    <select
                      id="tio-brand"
                      className={styles.fieldControl}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Google">Google</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tio-model" className={styles.fieldLabel}>
                      Model
                    </label>
                    <select
                      id="tio-model"
                      className={styles.fieldControl}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="iPhone 15">iPhone 15</option>
                      <option value="Galaxy S24">Galaxy S24</option>
                      <option value="Pixel 8">Pixel 8</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tio-storage" className={styles.fieldLabel}>
                      Storage
                    </label>
                    <select
                      id="tio-storage"
                      className={styles.fieldControl}
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: "16px", maxWidth: "360px" }}>
                  <label htmlFor="tio-imei" className={styles.fieldLabel}>
                    Device IMEI (15 digits)
                  </label>
                  <input
                    id="tio-imei"
                    type="text"
                    inputMode="numeric"
                    maxLength={15}
                    placeholder="35 123456 789012 3"
                    className={styles.fieldControl}
                    value={imei}
                    onChange={(e) =>
                      setImei(e.target.value.replace(/\D/g, "").slice(0, 15))
                    }
                  />
                </div>
              )}

              <div className={styles.zipWrap}>
                <label htmlFor="tio-zip" className={styles.fieldLabel}>
                  Your ZIP code
                </label>
                <input
                  id="tio-zip"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  className={styles.fieldControl}
                  value={zip}
                  onChange={(e) =>
                    setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                />
              </div>

              <button type="submit" className={styles.checkerSubmitBtn}>
                Check availability
              </button>

              {availabilityMessage && (
                <p className={styles.checkerStatusNote}>
                  {availabilityMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 2A: PROTECT YOUR DATA BEFORE YOU SEND IT */}
      <section className={styles.protectSection}>
        <div className={styles.container}>
          <div className={styles.protectHeader}>
            <div>
              <span className={styles.sectionEyebrow}>
                GET YOUR PHONE READY
              </span>
              <h2 className={styles.sectionHeading}>
                Protect your data before you send it.
              </h2>
            </div>

            <span className={styles.readyBadge}>{readyCount} of 4 ready</span>
          </div>

          <div className={styles.protectGrid}>
            {protectCards.map((card) => (
              <div key={card.num} className={styles.protectCard}>
                <div className={styles.protectImgWrap}>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className={styles.protectImg}
                  />
                  {card.overlayNum ? (
                    <span className={styles.protectNumBadge}>{card.num}</span>
                  ) : (
                    <span
                      className={`${styles.protectNumBadge} ${styles.mobileOnly}`}
                    >
                      {card.num}
                    </span>
                  )}
                </div>

                <div className={styles.protectBody}>
                  <h3 className={styles.protectTitle}>{card.title}</h3>
                  <p className={styles.protectDesc}>{card.desc}</p>

                  <label className={styles.markDoneLabel}>
                    <input
                      type="checkbox"
                      className={styles.markDoneCheckbox}
                      checked={Boolean(doneSteps[card.num])}
                      onChange={() => toggleDoneStep(card.num)}
                    />
                    <span>Mark as done</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.shippingBar}>
            <Package size={15} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span>
              Only use the shipping label and tracking number from the approved
              partner. We&apos;ll never ask you to ship to a personal address.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2B: RELATED WAYS TO SWITCH AND SAVE */}
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>KEEP GOING</span>
          <h2 className={styles.sectionHeading}>
            Related ways to switch and save.
          </h2>

          <div className={styles.relatedGrid}>
            {relatedCards.map((card) => (
              <div key={card.title} className={styles.relatedCard}>
                <div className={styles.relatedImgWrap}>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className={styles.relatedImg}
                  />
                </div>
                <div className={styles.relatedBody}>
                  <h3 className={styles.relatedTitle}>{card.title}</h3>
                  <p className={styles.relatedDesc}>{card.desc}</p>
                  <Link href={card.href} className={styles.relatedGoLink}>
                    <span>Go</span>
                    <ArrowRight size={13} strokeWidth={2.3} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2C: TRADE-IN QUESTIONS, ANSWERED */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>FAQS</span>
          <h2 className={styles.sectionHeading}>
            Trade-in questions, answered.
          </h2>

          <div className={styles.faqGrid}>
            <div className={styles.faqPhotoCard}>
              <img
                src="/img/Trade-In-Options/tio12.png"
                alt="Customer support agent ready to help with trade-in questions"
                className={styles.faqPhotoImg}
              />
              <div className={styles.faqPhotoFooter}>
                <p className={styles.faqPhotoTitle}>
                  Questions about a trade-in?
                </p>
                <a href="tel:8009888116" className={styles.faqPhoneLink}>
                  <Phone size={15} strokeWidth={2.2} />
                  <span>800-988-8116</span>
                </a>
                <p className={styles.faqPhotoCaption}>
                  Disputes about a final value are reviewed by our team with the
                  partner&apos;s inspection evidence.
                </p>
              </div>
            </div>

            <div className={styles.faqList}>
              {tradeInFaqs.map((item, idx) => {
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

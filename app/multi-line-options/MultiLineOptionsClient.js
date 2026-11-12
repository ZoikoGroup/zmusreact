"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Lock,
  Phone,
  FileText,
  CheckCircle2,
  Trash2,
  Info,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./MultiLineOptions.module.css";

const planCatalog = {
  "unlimited-one": {
    label: "Zoiko Unlimited One · $30/mo",
    shortName: "Zoiko Unlimited One",
    price: 30,
    spec: "15GB premium data · 5GB hotspot",
  },
  essentials: {
    label: "Zoiko Essentials · $20/mo",
    shortName: "Zoiko Essentials",
    price: 20,
    spec: "6GB premium data · 3GB hotspot",
  },
  lite: {
    label: "Zoiko Lite · $15/mo",
    shortName: "Zoiko Lite",
    price: 15,
    spec: "5GB premium data · 2GB hotspot",
  },
};

const lineColors = ["#e11d5a", "#6b21a8", "#f97316", "#0ea5e9", "#16a34a"];

const discountRules = [
  {
    eyebrow: "1–2 LINES",
    title: "No family discount",
    desc: "You can still join and add more lines later.",
    tone: "lavender",
  },
  {
    eyebrow: "3–10 ACTIVE LINES",
    title: "20% family discount",
    desc: "Applies to your bill once 3 or more lines are active.",
    tone: "green",
  },
  {
    eyebrow: "LINE ACTIVATING",
    title: "Doesn't count yet",
    desc: "A line waiting for a transfer or activation counts once it's active.",
    tone: "amber",
  },
  {
    eyebrow: "DROPS BELOW 3",
    title: "Discount ends",
    desc: "We'll tell you first, and show the date it stops.",
    tone: "amber",
  },
  {
    eyebrow: "11+ LINES",
    title: "Managed account",
    desc: "Groups over 10 lines need our sales team.",
    tone: "rose",
  },
];

const groupExtras = [
  {
    img: "/img/Multi-Line-Options/mlo5.png",
    alt: "Connected devices for shared data",
    title: "Shared data",
    desc: "Pool data across lines on plans that support it.",
    badge: "Being confirmed",
    green: false,
  },
  {
    img: "/img/Multi-Line-Options/mlo6.png",
    alt: "Smartphone and notebook for parental controls",
    title: "Parental controls",
    desc: "Tools to help manage younger members' lines.",
    badge: "Being confirmed",
    green: false,
  },
  {
    img: "/img/Multi-Line-Options/mlo7.png",
    alt: "Priority support specialist",
    title: "Priority support",
    desc: "Faster help for family accounts.",
    badge: "Being confirmed",
    green: false,
  },
  {
    img: "/img/Multi-Line-Options/mlo8.png",
    alt: "Acoustic guitar for animal and music community",
    title: "Animal & music community",
    desc: "Explore our community programs together.",
    badge: "Open to everyone",
    green: true,
  },
];

const multiLineFaqs = [
  {
    q: "How does the 20% family discount work?",
    a: "Groups with 3 to 10 active lines get 20% off. The exact amount is calculated by our pricing service and shown on your quote before you pay.",
  },
  {
    q: "Do lines waiting for a number transfer count?",
    a: "Not yet. Only active lines count toward the 3-line minimum for the 20% family discount. Once a transfer completes and the line is active, it counts.",
  },
  {
    q: "Can everyone choose a different plan?",
    a: "Yes. Each person in your group can pick the plan that fits them—whether Unlimited One, Essentials, or Zoiko Lite—all on one bill.",
  },
  {
    q: "Can we keep our numbers and phones?",
    a: "Yes. Each member can bring their existing phone number and compatible unlocked phone, or choose a new number.",
  },
  {
    q: "What happens if we drop below 3 lines?",
    a: "If your active line count drops below 3, the 20% family discount ends. We'll notify you first and show the exact date it stops.",
  },
  {
    q: "Can I have more than 10 lines?",
    a: "Groups of up to 10 lines are supported in the online builder. For 11 or more lines, our sales team can set up a managed account.",
  },
  {
    q: "What can group members see?",
    a: "Account owners manage billing and all lines. Individual group members see only their own line.",
  },
  {
    q: "Do we get shared data or parental controls?",
    a: "Those group extras are currently being confirmed and will only be switched on once terms are finalized for your plans.",
  },
];

const groupSteps = [
  {
    num: "01",
    title: "Choose how many",
    desc: "Pick 1 to 10 lines. Groups of 3 or more qualify for the family discount.",
    icon: "users",
    dark: false,
  },
  {
    num: "02",
    title: "Set up each line",
    desc: "Choose a plan, keep or get a number, and pick SIM or eSIM for every person.",
    icon: "phone",
    dark: false,
  },
  {
    num: "03",
    title: "See your quote",
    desc: "Get an itemized quote with taxes and fees before you pay.",
    icon: "file",
    dark: true,
  },
  {
    num: "04",
    title: "Activate together",
    desc: "Track each line as it activates. Your discount starts once 3 are active.",
    icon: "check",
    dark: false,
  },
];

export default function MultiLineOptionsClient() {
  const [lines, setLines] = useState([
    { id: 1, name: "", plan: "unlimited-one", sim: "esim" },
    { id: 2, name: "", plan: "essentials", sim: "esim" },
    { id: 3, name: "", plan: "lite", sim: "esim" },
  ]);
  const [zip, setZip] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const subtotal = lines.reduce(
    (sum, item) => sum + (planCatalog[item.plan]?.price || 0),
    0
  );

  const handleSetLineCount = (targetCount) => {
    const clamped = Math.max(1, Math.min(10, targetCount));
    if (clamped === lines.length) return;
    if (clamped > lines.length) {
      const additions = [];
      for (let i = lines.length; i < clamped; i++) {
        additions.push({
          id: Date.now() + i,
          name: "",
          plan: "essentials",
          sim: "esim",
        });
      }
      setLines([...lines, ...additions]);
    } else {
      setLines(lines.slice(0, clamped));
    }
  };

  const updateLine = (id, patch) => {
    setLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, ...patch } : line))
    );
  };

  const removeLine = (id) => {
    if (lines.length <= 1) return;
    setLines((prev) => prev.filter((line) => line.id !== id));
  };
  const renderStepIcon = (iconName) => {
    if (iconName === "users") return <Users size={16} strokeWidth={2.2} />;
    if (iconName === "phone") return <Phone size={16} strokeWidth={2.2} />;
    if (iconName === "file") return <FileText size={16} strokeWidth={2.2} />;
    return <CheckCircle2 size={16} strokeWidth={2.2} />;
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
            <Link href="/plans" className={styles.mobileBreadcrumbLink}>
              Plans
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.mobileBreadcrumbCurrent}>
              Multi-Line Options
            </span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <span className={styles.heroPill}>
                <Users size={12} strokeWidth={2.3} />
                <span>FAMILY &amp; FRIENDS</span>
              </span>

              <h1 className={styles.heroTitle}>
                Connect your people{" "}
                <span className={styles.heroTitleAccent}>
                  under one account.
                </span>
              </h1>

              <p className={styles.heroSubtitle}>
                Bring family and friends together on one bill. Each person picks
                the plan that suits them, keeps their number and uses their own
                phone.
              </p>

              <div className={styles.discountCard}>
                <div className={styles.discountPercentWrap}>
                  <span className={styles.discountNumber}>20%</span>
                  <span className={styles.discountOff}>off</span>
                </div>
                <p className={styles.discountText}>
                  Your family discount applies once{" "}
                  <strong>3 lines are active</strong>, for groups of up to{" "}
                  <strong>10 lines</strong>.
                  <a href="#how-it-works" className={styles.discountLink}>
                    See how it works
                  </a>
                </p>
              </div>

              <div className={styles.heroActions}>
                <a href="#group-builder" className={styles.heroPrimaryBtn}>
                  Build your group
                </a>
                <Link href="/login" className={styles.heroSecondaryBtn}>
                  <Lock size={13} strokeWidth={2.2} />
                  <span>Manage my lines</span>
                </Link>
              </div>
            </div>

            <div className={styles.heroCollage}>
              <img
                src="/img/Multi-Line-Options/mlo1.png"
                alt="People smiling together at a table"
                className={styles.collageMainImg}
              />
              <img
                src="/img/Multi-Line-Options/mlo2.png"
                alt="Dog outdoors"
                className={styles.collageTopRightImg}
              />
              <img
                src="/img/Multi-Line-Options/mlo3.png"
                alt="Couple looking at a smartphone"
                className={styles.collageBottomLeftImg}
              />

              <div className={styles.groupFloatCard}>
                <span className={styles.groupFloatEyebrow}>YOUR GROUP</span>
                <div className={styles.groupLineRow}>
                  <span className={styles.groupLineLeft}>
                    <span
                      className={styles.groupLineNum}
                      style={{ backgroundColor: "#e11d5a" }}
                    >
                      1
                    </span>
                    <span>Line 1</span>
                  </span>
                  <span className={styles.groupLinePlan}>Unlimited One</span>
                </div>
                <div className={styles.groupLineRow}>
                  <span className={styles.groupLineLeft}>
                    <span
                      className={styles.groupLineNum}
                      style={{ backgroundColor: "#6b21a8" }}
                    >
                      2
                    </span>
                    <span>Line 2</span>
                  </span>
                  <span className={styles.groupLinePlan}>Essentials</span>
                </div>
                <div className={styles.groupLineRow}>
                  <span className={styles.groupLineLeft}>
                    <span
                      className={styles.groupLineNum}
                      style={{ backgroundColor: "#f97316" }}
                    >
                      3
                    </span>
                    <span>Line 3</span>
                  </span>
                  <span className={styles.groupLinePlan}>Zoiko Lite</span>
                </div>
                <p className={styles.groupFloatNote}>
                  One bill · each line its own plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1B: FOUR STEPS TO YOUR GROUP */}
      <section id="how-it-works" className={styles.stepsSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>HOW IT WORKS</span>
          <h2 className={styles.sectionHeading}>Four steps to your group.</h2>

          <div className={styles.stepsGrid}>
            {groupSteps.map((s) => (
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
        </div>
      </section>

      {/* SECTION 2A: BUILD YOUR GROUP */}
      <section id="group-builder" className={styles.builderSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>BUILD YOUR GROUP</span>
          <h2 className={styles.sectionHeading}>Set up every line your way.</h2>
          <p className={styles.builderSubtitle}>
            Prices shown are published plan prices before the family discount,
            taxes and fees. Your exact total comes from our pricing service.
          </p>

          <div className={styles.howManyCard}>
            <div>
              <span className={styles.howManyLabel}>How many lines?</span>
              <div className={styles.lineStepper}>
                <button
                  type="button"
                  className={styles.lineStepperBtn}
                  onClick={() => handleSetLineCount(lines.length - 1)}
                  aria-label="Decrease lines"
                >
                  −
                </button>
                <span className={styles.lineStepperVal}>{lines.length}</span>
                <button
                  type="button"
                  className={styles.lineStepperBtn}
                  onClick={() => handleSetLineCount(lines.length + 1)}
                  aria-label="Increase lines"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <div className={styles.segmentsTrack}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.segmentBar} ${
                      i < lines.length ? styles.segmentBarActive : ""
                    }`}
                  />
                ))}
              </div>
              <div className={styles.segmentsLabels}>
                <span>1 line</span>
                <span className={styles.segmentsHighlight}>
                  3 lines: family discount
                </span>
                <span>10 lines max</span>
              </div>
              <div className={styles.qualifyBanner}>
                <CheckCircle2 size={14} strokeWidth={2.2} />
                <span>
                  {lines.length >= 3
                    ? "Your group qualifies for the 20% family discount once 3 or more lines are active."
                    : `Add ${3 - lines.length} more line${
                        3 - lines.length > 1 ? "s" : ""
                      } to qualify for the 20% family discount.`}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.builderGrid}>
            <div>
              {lines.map((line, idx) => {
                const planInfo = planCatalog[line.plan];
                const badgeColor = lineColors[idx % lineColors.length];
                return (
                  <div key={line.id} className={styles.lineCard}>
                    <div className={styles.lineCardHeader}>
                      <div className={styles.lineCardTitleWrap}>
                        <span
                          className={styles.lineBadge}
                          style={{ backgroundColor: badgeColor }}
                        >
                          {idx + 1}
                        </span>
                        <span className={styles.lineCardTitle}>
                          Line {idx + 1}
                        </span>
                      </div>

                      <div className={styles.lineCardPriceWrap}>
                        <span className={styles.lineCardPrice}>
                          ${planInfo.price}/mo
                        </span>
                        <button
                          type="button"
                          className={styles.trashBtn}
                          disabled={lines.length <= 1}
                          onClick={() => removeLine(line.id)}
                          aria-label={`Remove Line ${idx + 1}`}
                        >
                          <Trash2 size={15} strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.lineRowTop}>
                      <div>
                        <label className={styles.lineFieldLabel}>
                          Who&apos;s it for? (optional)
                        </label>
                        <input
                          type="text"
                          className={styles.lineInput}
                          placeholder="e.g. Sam"
                          value={line.name}
                          onChange={(e) =>
                            updateLine(line.id, { name: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className={styles.lineFieldLabel}>Plan</label>
                        <select
                          className={styles.lineInput}
                          value={line.plan}
                          onChange={(e) =>
                            updateLine(line.id, { plan: e.target.value })
                          }
                        >
                          {Object.entries(planCatalog).map(([key, info]) => (
                            <option key={key} value={key}>
                              {info.label}
                            </option>
                          ))}
                        </select>
                        <p className={styles.planSpecNote}>{planInfo.spec}</p>
                      </div>
                    </div>

                    <div className={styles.lineRowOptions}>
                      <div>
                        <span className={styles.lineFieldLabel}>
                          Phone number
                        </span>
                        <div className={styles.pillToggleRow}>
                          <button
                            type="button"
                            className={`${styles.pillToggleBtn} ${styles.pillToggleBtnActive}`}
                          >
                            New number
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className={styles.lineFieldLabel}>SIM type</span>
                        <div className={styles.pillToggleRow}>
                          <button
                            type="button"
                            onClick={() => updateLine(line.id, { sim: "esim" })}
                            className={`${styles.pillToggleBtn} ${
                              line.sim === "esim"
                                ? styles.pillToggleBtnActive
                                : ""
                            }`}
                          >
                            eSIM
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateLine(line.id, { sim: "physical" })
                            }
                            className={`${styles.pillToggleBtn} ${
                              line.sim === "physical"
                                ? styles.pillToggleBtnActive
                                : ""
                            }`}
                          >
                            Physical SIM
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className={styles.lineFieldLabel}>Phone</span>
                        <div className={styles.pillToggleRow}>
                          <button
                            type="button"
                            className={`${styles.pillToggleBtn} ${styles.pillToggleBtnActive}`}
                          >
                            Bring my phone
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.lineInfoBar}>
                      <Info
                        size={14}
                        strokeWidth={2.2}
                        style={{ flexShrink: 0 }}
                      />
                      <span>
                        We&apos;ll check this phone works with Zoiko before
                        activation.
                      </span>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                className={styles.addLineBtn}
                disabled={lines.length >= 10}
                onClick={() => handleSetLineCount(lines.length + 1)}
              >
                + Add another line
              </button>
            </div>

            <aside className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>
                Your group · {lines.length} line{lines.length > 1 ? "s" : ""}
              </h3>

              {lines.map((line, idx) => {
                const planInfo = planCatalog[line.plan];
                const dotColor = lineColors[idx % lineColors.length];
                return (
                  <div key={line.id} className={styles.summaryRow}>
                    <span className={styles.summaryRowLeft}>
                      <span
                        className={styles.summaryDot}
                        style={{ backgroundColor: dotColor }}
                      />
                      <span>
                        Line {idx + 1} · {planInfo.shortName}
                      </span>
                    </span>
                    <span className={styles.summaryPrice}>
                      ${planInfo.price}
                    </span>
                  </div>
                );
              })}

              <div className={styles.summarySubtotalRow}>
                <span>Plans subtotal</span>
                <span className={styles.summarySubtotalVal}>
                  ${subtotal}/mo
                </span>
              </div>

              <div className={styles.summaryGreenBox}>
                <p className={styles.summaryGreenTitle}>
                  Family discount: 20% once active
                </p>
                <p className={styles.summaryGreenText}>
                  The exact amount is calculated by our pricing service and
                  shown on your quote.
                </p>
              </div>

              <p className={styles.summaryDisclaimer}>
                Before the family discount, taxes, fees and any device costs. We
                never estimate the discount amount ourselves.
              </p>

              <label htmlFor="mlo-zip" className={styles.lineFieldLabel}>
                ZIP code for taxes
              </label>
              <input
                id="mlo-zip"
                type="text"
                inputMode="numeric"
                maxLength={5}
                className={styles.lineInput}
                value={zip}
                onChange={(e) =>
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
                }
              />

              <button
                type="button"
                className={styles.summaryQuoteBtn}
                onClick={() =>
                  setQuoteText(
                    `Itemized quote prepared for ${lines.length} lines ($${subtotal}/mo subtotal before 20% active discount).`
                  )
                }
              >
                Get my quote
              </button>

              <Link href="/checkout" className={styles.summaryCheckoutBtn}>
                Continue to checkout
              </Link>

              {quoteText && (
                <p className={styles.quoteResultNote}>{quoteText}</p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION 2B: FAMILY DISCOUNT RULES */}
      <section className={styles.rulesSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>FAMILY DISCOUNT RULES</span>
          <h2 className={styles.sectionHeading}>
            When the 20% applies, clearly.
          </h2>
          <p className={styles.rulesSubtitle}>
            Only active lines count. Lines that are still activating or waiting
            for a number transfer don&apos;t count yet.
          </p>

          <div className={styles.rulesGrid}>
            {discountRules.map((rule) => (
              <div
                key={rule.eyebrow}
                className={`${styles.ruleCard} ${
                  rule.tone === "lavender"
                    ? styles.ruleCardLavender
                    : rule.tone === "green"
                    ? styles.ruleCardGreen
                    : rule.tone === "amber"
                    ? styles.ruleCardAmber
                    : styles.ruleCardRose
                }`}
              >
                <span className={styles.ruleEyebrow}>{rule.eyebrow}</span>
                <h3 className={styles.ruleTitle}>{rule.title}</h3>
                <p className={styles.ruleDesc}>{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3A: MANAGE MY LINES */}
      <section className={styles.manageSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>MANAGE MY LINES</span>
          <h2 className={styles.sectionHeading}>
            Your group, in one secure place.
          </h2>
          <p className={styles.manageSubtitle}>
            Account owners manage billing and lines. Members see only their own
            line.
          </p>

          <div className={styles.manageCard}>
            <div className={styles.manageImgWrap}>
              <img
                src="/img/Multi-Line-Options/mlo4.png"
                alt="Group of friends smiling while looking at a phone"
                className={styles.manageImg}
              />
            </div>

            <div className={styles.manageBody}>
              <h3 className={styles.manageTitle}>
                Already have a Zoiko group?
              </h3>
              <p className={styles.manageDesc}>
                Sign in to add or remove lines, invite members and see each
                line&apos;s status.
              </p>
              <Link href="/login" className={styles.manageBtn}>
                Sign in (preview)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3B: GROUP EXTRAS */}
      <section className={styles.extrasSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>GROUP EXTRAS</span>
          <h2 className={styles.sectionHeading}>
            More for families and friends.
          </h2>
          <p className={styles.extrasSubtitle}>
            Extras are shown with their status. We only switch them on once
            they&apos;re confirmed for your plans.
          </p>

          <div className={styles.extrasGrid}>
            {groupExtras.map((extra) => (
              <div key={extra.title} className={styles.extraCard}>
                <div className={styles.extraImgWrap}>
                  <img
                    src={extra.img}
                    alt={extra.alt}
                    className={styles.extraImg}
                  />
                </div>
                <div className={styles.extraBody}>
                  <h3 className={styles.extraTitle}>{extra.title}</h3>
                  <p className={styles.extraDesc}>{extra.desc}</p>
                  <span
                    className={
                      extra.green
                        ? styles.extraBadgeGreen
                        : styles.extraBadgeMuted
                    }
                  >
                    {extra.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3C: MULTI-LINE QUESTIONS (FAQS) */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>FAQS</span>
          <h2 className={styles.sectionHeading}>
            Multi-line questions, answered.
          </h2>

          <div className={styles.faqGrid}>
            <div className={styles.faqPhotoCard}>
              <img
                src="/img/Multi-Line-Options/mlo9.png"
                alt="Customer support agent ready to help with multi-line accounts"
                className={styles.faqPhotoImg}
              />
              <div className={styles.faqPhotoFooter}>
                <p className={styles.faqPhotoTitle}>
                  Setting up a bigger group?
                </p>
                <a href="tel:8009888116" className={styles.faqPhoneLink}>
                  <Phone size={15} strokeWidth={2.2} />
                  <span>800-988-8116</span>
                </a>
              </div>
            </div>

            <div className={styles.faqList}>
              {multiLineFaqs.map((item, idx) => {
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

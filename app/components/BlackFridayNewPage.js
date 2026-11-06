"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Phone,
  Wifi,
  Shield,
  ShieldCheck,
  Check,
  ArrowRight,
  Plus,
  Minus,
  Heart,
  Tag,
  Radio,
  Clock,
  ChevronRight,
  Headphones,
  PawPrint,
  MapPin,
  Smartphone,
  PlusCircle,
  CheckCircle2,
  Repeat,
} from "lucide-react";
import Header, { openPlanPurchaseModal } from "./Header";
import Footer from "./Footer";
import styles from "./BlackFriday.module.css";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

const PLAN_TABS = [
  { key: "prepaid-plans", label: "Prepaid Plans", href: "/prepaid-plans" },
  { key: "postpaid-plans", label: "Postpaid Plans", href: "/postpaid-plans" },
  { key: "business-plans", label: "Business Plans", href: "/business-deals" },
  { key: "travel-plans", label: "Travel Plans", href: "/travel-plans" },
];

const FAQS = [
  {
    q: "Who is eligible for the Black Friday offer?",
    a: "The 40% off discount applies to qualifying new lines activating on eligible Zoiko Mobile USA plans. Both SIM card and instant eSIM activations are eligible.",
  },
  {
    q: "How long does the offer run?",
    a: "Our Black Friday promotional prices run starting Friday, November 27 through Cyber Monday, November 30, 2026.",
  },
  {
    q: "What will I pay after the first three months?",
    a: "After your promotional 3-month savings period, standard transparent monthly pricing ($13–$30/mo depending on plan) applies automatically with zero contracts or lock-in.",
  },
  {
    q: "Is there an activation fee?",
    a: "No! SIM card activation and instant eSIM setups are completely free during our Black Friday event.",
  },
  {
    q: "Are taxes and fees included?",
    a: "All standard regulatory fees and transparent line costs are clearly presented before checkout with no surprise hidden fees.",
  },
  {
    q: "Will Zoiko Mobile work where I live?",
    a: "Yes! Zoiko Mobile operates across the premier nationwide 5G/4G LTE network covering over 99% of Americans. You can verify your exact address on our Coverage Map.",
  },
];

export default function BlackFridayNewPage() {
  const [activeTab, setActiveTab] = useState("prepaid-plans");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Fetch plans from backend API (Section 2 exact API from prepaid-plans)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function fetchPlans() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/plans/${activeTab}`);
        const result = await res.json();
        if (isMounted) {
          if (result.success && Array.isArray(result.data)) {
            setPlans(result.data);
          } else {
            setPlans([]);
          }
        }
      } catch (err) {
        console.error("Error fetching Black Friday plans:", err);
        if (isMounted) {
          setError("Failed to load plans from server.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPlans();
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* GLOBAL HEADER */}
      <Header />

      {/* 1. TOP TICKER INFORMATION BAR */}
      <section className={styles.topTicker}>
        <div className={styles.topTickerTrack}>
          <div className={styles.topTickerItem}>
            <Radio size={16} />
            <span>UNLIMITED TALK · TEXT · DATA</span>
          </div>
          <div className={styles.topTickerItem}>
            <Wifi size={16} />
            <span>NATIONWIDE 5G COVERAGE</span>
          </div>
          <div className={styles.topTickerWhiteBox}>
            <Tag size={16} />
            <span>BLACK FRIDAY 2026 · NOV 27 – CYBER MONDAY NOV 30</span>
          </div>
          <div className={styles.topTickerItem}>
            <CheckCircle2 size={16} />
            <span>AFFORDABLE PLANS STARTING AT $15</span>
          </div>
        </div>
      </section>

      {/* 2. HERO SECTION */}
      <section className={styles.heroSection}>
        {/* Animated Background Blast & Wave Trails */}
        <div className={styles.heroBlastContainer} aria-hidden="true">
          {/* Sweeping SVG Light Wave Trails */}
          <svg
            className={styles.heroSvgBlast}
            viewBox="0 0 1440 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-40 288 C 250 420, 680 520, 1500 500"
              stroke="url(#blastGradient1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={styles.heroWavePath1}
            />
            <path
              d="M300 452 C 550 560, 950 540, 1500 380"
              stroke="url(#blastGradient2)"
              strokeWidth="1.8"
              strokeLinecap="round"
              className={styles.heroWavePath2}
            />
            <path
              d="M700 -20 C 850 60, 1150 70, 1500 10"
              stroke="url(#blastGradient3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={styles.heroWavePath3}
            />
            <defs>
              <linearGradient id="blastGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DF1E5A" stopOpacity="0" />
                <stop offset="35%" stopColor="#DF1E5A" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#FF3D7F" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#DF1E5A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="blastGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DF1E5A" stopOpacity="0" />
                <stop offset="40%" stopColor="#FF3D7F" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#DF1E5A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#DF1E5A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="blastGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DF1E5A" stopOpacity="0" />
                <stop offset="50%" stopColor="#FF8CC6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#DF1E5A" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Radial Glowing Blast Orbs */}
          <div className={styles.heroBlastOrbRight} />
          <div className={styles.heroBlastOrbLeft} />
          <div className={styles.heroBlastShockwave} />

          {/* Confetti blast particles (exact Figma coordinates & colors) */}
          <div className={`${styles.confetti} ${styles.confetti1}`} />
          <div className={`${styles.confetti} ${styles.confetti2}`} />
          <div className={`${styles.confetti} ${styles.confetti3}`} />
          <div className={`${styles.confetti} ${styles.confetti4}`} />
          <div className={`${styles.confetti} ${styles.confetti5}`} />
          <div className={`${styles.confetti} ${styles.confetti6}`} />
          <div className={`${styles.confetti} ${styles.confetti7}`} />
          <div className={`${styles.confetti} ${styles.confetti8}`} />

          {/* Twinkling 4-Point Star Sparkles */}
          <span className={`${styles.sparkleStar} ${styles.sparkle1}`}>✦</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle2}`}>✦</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle3}`}>✦</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle4}`}>✦</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle5}`}>✦</span>
          <span className={`${styles.sparkleStar} ${styles.sparkle6}`}>✦</span>

          {/* Ambient micro-dots */}
          <span className={`${styles.ambientDot} ${styles.dot1}`} />
          <span className={`${styles.ambientDot} ${styles.dot2}`} />
          <span className={`${styles.ambientDot} ${styles.dot3}`} />
          <span className={`${styles.ambientDot} ${styles.dot4}`} />
          <span className={`${styles.ambientDot} ${styles.dot5}`} />
        </div>

        

        <div className={styles.heroContainer}>
          {/* Left Column: Copy & Headline */}
          <div className={styles.heroLeft}>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              ZOIKO MOBILE USA · BLACK FRIDAY 2026
            </div>

            <div className={styles.heroHeadlineBlock}>
              <div className={styles.heroHeadlineRow1}>
                <span className={styles.heroHeadlineWord}>GET</span>
                <img
                  src="/img/black-friday/40percent.png"
                  alt="40%"
                  className={styles.hero40Img}
                />
                <span className={styles.heroHeadlineWord}>OFF</span>
              </div>
              <span className={styles.heroHeadlineMid}>
                YOUR MOBILE PLAN CHARGES
              </span>
              <span className={styles.heroHeadlinePink}>
                FOR THE FIRST 3 MONTHS
              </span>
            </div>

            <div className={styles.heroLocationSub}>
              <PawPrint size={18} className={styles.heroLocationIcon} />
              <span>Switch with purpose. Save more. Support animal rescues.</span>
            </div>

            <div className={styles.heroBtnRow}>
              <a href="#plans" className={styles.heroPrimaryBtn}>
                See Plans &amp; Savings →
              </a>
              <Link href="/activate" className={styles.heroSecondaryBtn}>
                Activate SIM/eSIM Free
              </Link>
            </div>

            <p className={styles.heroNote}>
              For qualifying new lines. Offer subject to approval. Standard monthly price ($13–$30/mo per line, depending on plan) applies after the first three months. Taxes, fees and eligibility terms: [to be confirmed].
            </p>
          </div>

          {/* Right Column: Visual Frame with Couple, Dog & Hanging Tag */}
          <div className={styles.heroRight}>
            {/* Hanging Swing Tag */}
            <div className={`${styles.heroSwingTag} ${styles.ukSwing}`}>
              <div className={styles.swingTagString} />
              <div className={styles.swingTagBody}>
                <div className={styles.swingTagHole} />
                <div className={styles.swingTagTextTop}>
                  BLACK<br />FRIDAY
                </div>
                <div className={styles.swingTagSale}>SALE</div>
                <div className={styles.swingTagDates}>NOV 27 – 30</div>
              </div>
            </div>

            {/* Visual Frame */}
            <div className={styles.heroVisualFrame}>
              <img
                src="/img/black-friday/image (39).png"
                alt="Zoiko Mobile Black Friday Family Celebration"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CROSSING MARQUEE RIBBONS (INFINITE ANIMATION) */}
      <div className={styles.ribbonWrapper}>
        {/* Upper Ribbon (Tilted -2.4deg) */}
        <div className={styles.ribbonUpper}>
          <div className={`${styles.ukMarquee} ${styles.ribbonUpperText}`}>
            {[...Array(6)].map((_, i) => (
              <span key={i} style={{ marginRight: "32px" }}>
                BLACK FRIDAY ✦ SWITCH WITH PURPOSE ✦ SAVE MORE ✦ CYBER MONDAY ✦{" "}
              </span>
            ))}
          </div>
        </div>

        {/* Lower Ribbon (Tilted 2.2deg) */}
        <div className={styles.ribbonLower}>
          <div className={`${styles.ukMarquee} ${styles.ribbonLowerText}`}>
            {[...Array(6)].map((_, i) => (
              <span key={i} style={{ marginRight: "32px" }}>
                ZOIKO MOBILE USA · BLACK FRIDAY 2026 · NOV 27 – NOV 30 ·{" "}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. THREE STEP SAVINGS PROCESS */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsContainer}>
          <div className={styles.sectionSuperTitle}>
            THE PURPOSEFUL SWITCH
          </div>
          <h2 className={styles.sectionMainTitle}>
            YOUR BLACK FRIDAY SAVING, <span>IN THREE STEPS</span>
          </h2>

          {/* Timeline Dates Box */}
          <div className={styles.timelineDatesRow}>
            {/* Box 1 (Dark) */}
            <div className={styles.timelineDateBoxDark}>
              <div className={styles.timelineDateNumber}>27</div>
              <div className={styles.timelineDateMeta}>
                <span className={styles.timelineDateMonth}>NOVEMBER 2026</span>
                <span className={styles.timelineDateTagPink}>BLACK FRIDAY</span>
              </div>
            </div>

            {/* Dotted Divider */}
            <div className={styles.timelineDottedDivider} />

            {/* Box 2 (White with Pink Border) */}
            <div className={styles.timelineDateBoxWhite}>
              <div className={styles.timelineDateNumberPink}>30</div>
              <div className={styles.timelineDateMeta}>
                <span className={styles.timelineDateMonthDark}>NOVEMBER 2026</span>
                <span className={styles.timelineDateTagGrey}>CYBER MONDAY</span>
              </div>
            </div>
          </div>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <div className={styles.stepBadgeRibbon}>
                <span className={styles.stepBadgeRibbonDot} />
                STEP 01
              </div>
              <div className={styles.stepIconWrap}>
                <Smartphone size={32} className={styles.stepIcon} />
              </div>
              <h3 className={styles.stepCardTitle}>Choose an eligible plan</h3>
              <p className={styles.stepCardDesc}>
                Pick Zoiko Flex, Zoiko Essentials or Zoiko Unlimited One — all with unlimited 5G data.
              </p>
            </div>

            {/* Step 2 (Active Dark Card) */}
            <div className={`${styles.stepCard} ${styles.stepCardActive}`}>
              <div className={`${styles.stepBadgeRibbon} ${styles.stepBadgeRibbonActive}`}>
                <span className={styles.stepBadgeRibbonDot} />
                STEP 02
              </div>
              <div className={styles.stepIconWrap}>
                <PlusCircle size={32} className={styles.stepIconPink} />
              </div>
              <h3 className={styles.stepCardTitle}>Add a qualifying new line</h3>
              <p className={styles.stepCardDesc}>
                The saving applies to qualifying new lines. Eligibility criteria: [to be confirmed].
              </p>
            </div>

            {/* Step 3 */}
            <div className={styles.stepCard}>
              <div className={styles.stepBadgeRibbon}>
                <span className={styles.stepBadgeRibbonDot} />
                STEP 03
              </div>
              <div className={styles.stepIconWrap}>
                <Tag size={32} className={styles.stepIcon} />
              </div>
              <h3 className={styles.stepCardTitle}>Save for your first 3 months</h3>
              <p className={styles.stepCardDesc}>
                Save on eligible plan charges for the first three months, then your standard monthly price applies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BACKEND PLANS SECTION (FIGMA SECTION 2) */}
      <section id="plans" className={styles.plansSection}>
        <div className={styles.plansContainer}>
          {/* Plan Category Tabs */}
          <div className={styles.planTabsRow}>
            {PLAN_TABS.map((tab, idx) => (
              <React.Fragment key={tab.key}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`${styles.planTabBtn} ${
                    activeTab === tab.key ? styles.planTabActive : ""
                  }`}
                >
                  {tab.label}
                </button>
                {idx < PLAN_TABS.length - 1 && (
                  <span className={styles.planTabDivider}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Main Plans Box */}
          <div className={styles.plansBox}>
            {/* Corner Ribbon */}
            <div className={styles.plansCornerRibbon}>BLACK FRIDAY</div>

            {/* Floating Blast Particles & Confetti across Plans Section */}
            <div className={styles.plansBlastContainer} aria-hidden="true">
              <div className={styles.plansBlastGlow} />
              {/* Left side confetti & sparkles */}
              <div className={`${styles.plansConfetti} ${styles.plansConfetti1}`} />
              <span className={`${styles.plansSparkle} ${styles.plansSparkle1}`}>✦</span>
              <div className={`${styles.plansConfetti} ${styles.plansConfetti2}`} />
              <span className={`${styles.plansDot} ${styles.plansDot1}`} />

              {/* Right side confetti & sparkles */}
              <div className={`${styles.plansConfetti} ${styles.plansConfetti3}`} />
              <span className={`${styles.plansSparkle} ${styles.plansSparkle2}`}>✦</span>
              <div className={`${styles.plansConfetti} ${styles.plansConfetti4}`} />
              <span className={`${styles.plansDot} ${styles.plansDot2}`} />
            </div>

            {/* Swinging Sale Tag */}
            <div className={`${styles.plansBoxSwingTag} ${styles.ukSwing}`}>
              <div className={styles.plansBoxSwingCord} />
              <div className={styles.plansBoxSwingTagBody}>
                <div className={styles.plansBoxSwingTagHole} />
                <div className={styles.plansBoxSwingTagSale}>SALE</div>
                <div className={styles.plansBoxSwingTagDate}>NOV 27</div>
              </div>
            </div>

            {/* Header info */}
            <div className={styles.plansHeader}>
              <div className={styles.plansHeaderPill}>
                <Sparkles size={13} />
                BLACK FRIDAY {activeTab.replace("-", " ").toUpperCase()} DEALS
              </div>
              <h2 className={styles.plansHeaderTitle}>
                Freedom to Connect, Your Way
              </h2>
              <p className={styles.plansHeaderDesc}>
                Stay in control with flexible, no-contract prepaid plans designed for
                your lifestyle.{" "}
                <span className={styles.plansHeaderHighlight}>
                  GET 40% OFF
                </span>{" "}
                for 3 Months this Black Friday.
              </p>
            </div>

            {/* Loading / Error States */}
            {loading && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "36px",
                    height: "36px",
                    border: "4px solid #DF1E5A",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p style={{ marginTop: "12px", color: "#6B7280", fontWeight: "600" }}>
                  Loading Black Friday plans from server...
                </p>
                <style jsx>{`
                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </div>
            )}

            {error && !loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "24px",
                  background: "#FFF0F4",
                  border: "1px solid #FCD4DF",
                  borderRadius: "12px",
                  color: "#DF1E5A",
                  fontWeight: "600",
                }}
              >
                {error}
              </div>
            )}

            {/* Dynamic Plans Grid strictly from backend API (matching Prepaid/Postpaid/Business/Travel pages) */}
            {!loading && plans.length > 0 && (
              <div className={styles.plansGrid}>
                {plans.slice(0, 3).map((item) => {
                  const regularPrice = parseFloat(item.price || "0");
                  // Black Friday 40% Promotional Discount
                  const discountPrice = (regularPrice * 0.6).toFixed(2);
                  const imgSrc = item.featured_image
                    ? `${API_BASE_URL}/storage/${item.featured_image}`
                    : null;

                  return (
                    <div key={item.id} className={styles.planCard}>
                      <div>
                        {/* Plan Image Header */}
                        {imgSrc && (
                          <div className={styles.planImageArea}>
                            <img
                              src={imgSrc}
                              alt={item.title}
                              className={styles.planCardImg}
                            />
                            <div className={styles.planDealBadge}>
                              <span className={styles.planDealBadgeDot} />
                              BLACK FRIDAY DEAL
                            </div>
                            <div className={styles.planDiscountTag}>
                              <div className={styles.planDiscountTagBig}>40% OFF</div>
                              <div className={styles.planDiscountTagSub}>3 MONTHS</div>
                            </div>
                          </div>
                        )}

                        {/* Title */}
                        <div className={styles.planTitleRow}>
                          <div className={styles.planTitle}>{item.title}</div>
                        </div>

                        {/* Price Row */}
                        <div className={styles.planPriceRow}>
                          <div className={styles.planDataType}>
                            {item.sub_title || "Unlimited 5G Data"}
                          </div>
                          <div className={styles.planPriceCol}>
                            <div>
                              <span className={styles.planPriceNow}>
                                {item.currency || "$"}{discountPrice}
                              </span>
                              <span className={styles.planPriceUnit}>
                                /{item.duration_type || "mo"}/line
                              </span>
                            </div>
                            <div className={styles.planPriceThen}>
                              then {item.currency || "$"}{regularPrice.toFixed(2)}/{item.duration_type || "mo"}/line
                            </div>
                          </div>
                        </div>

                        {/* Real Backend Features List (identical to PrepaidSlider) */}
                        {Array.isArray(item.features) && item.features.length > 0 && (
                          <ul className={styles.planFeatureList}>
                            {item.features.slice(0, 6).map((ftr, i) => (
                              <li key={i} className={styles.planFeatureItem}>
                                <Check size={16} className={styles.planFeatureIcon} />
                                <span>{i === 1 ? "Unlimited Talk & Text" : (ftr.text || ftr)}</span>
                              </li>
                            ))}
                            <li className={styles.planFeatureItem}>
                              <Check size={16} className={styles.planFeatureIcon} />
                              <span>Discounted Device Protection</span>
                            </li>
                          </ul>
                        )}
                      </div>

                      {/* Card Action Buttons (Directly triggering real PlanPurchaseModal) */}
                      <div className={styles.planActionRow}>
                        <button
                          type="button"
                          onClick={() =>
                            openPlanPurchaseModal(
                              item.title,
                              item.slug,
                              item.id,
                              item.price,
                              discountPrice,
                              item.duration_type || "mo",
                              item.bq_id,
                              item.plan_type || activeTab
                            )
                          }
                          className={styles.planBuyBtn}
                        >
                          Buy this plan
                        </button>
                        <Link
                          href={`/plans/${item.slug}`}
                          className={styles.planDetailsBtn}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && plans.length === 0 && !error && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#6B7280", fontWeight: "600" }}>
                No plans found for this category from the server.
              </div>
            )}

            {/* Bottom View More Action */}
            <div className={styles.plansBottomAction}>
              <Link
                href={PLAN_TABS.find((t) => t.key === activeTab)?.href || "/all-plans"}
                className={styles.plansViewMoreBtn}
              >
                View More Plans
                <ChevronRight size={17} />
              </Link>
            </div>

            <div className={styles.plansDisclaimer}>
              Prices per line, per month. Black Friday pricing applies to qualifying
              new lines for the first three months and standard monthly price applies
              after. Taxes &amp; fees apply.
            </div>
          </div>
        </div>
      </section>

      {/* 6. BLACK FRIDAY PROTECTION HUB SECTION */}
      <section className={styles.protectionSection}>
        <div className={styles.protectionContainer}>
          {/* Left Graphic */}
          <div className={styles.protectionVisual}>
            <Image
              src="/img/black-friday/image (40).png"
              alt="Black Friday Device Protection Hub"
              width={538}
              height={400}
              className={styles.protectionImg}
            />
          </div>

          {/* Right Content */}
          <div className={styles.protectionContent}>
            <div className={styles.plansHeaderPill}>
              <Shield size={13} />
              DEVICE PROTECTION
            </div>

            <h2 className={styles.sectionMainTitle} style={{ textAlign: "left" }}>
              Black Friday Protection Hub
            </h2>

            <p style={{ color: "#4B5563", fontSize: "15px", lineHeight: "1.6" }}>
              Protect the phone you switch with. Discounted comprehensive device
              protection comes bundled with every Zoiko wireless plan.
            </p>

            <div className={styles.protectionList}>
              <div className={styles.protectionItem}>
                <Check size={18} className={styles.protectionCheckIcon} />
                <span>Theft &amp; loss protection</span>
              </div>
              <div className={styles.protectionItem}>
                <Check size={18} className={styles.protectionCheckIcon} />
                <span>Accidental damage coverage</span>
              </div>
              <div className={styles.protectionItem}>
                <Check size={18} className={styles.protectionCheckIcon} />
                <span>Screen crack repair</span>
              </div>
              <div className={styles.protectionItem}>
                <Check size={18} className={styles.protectionCheckIcon} />
                <span>Next-day replacement</span>
              </div>
              <div className={styles.protectionItem}>
                <Check size={18} className={styles.protectionCheckIcon} />
                <span>24/7 dedicated claim support</span>
              </div>
            </div>

            <div className={styles.protectionPriceRow}>
              <div className={styles.protectionPricePill}>
                <span className={styles.protectionPriceFrom}>From</span>
                <span className={styles.protectionPriceAmount}>$9.90</span>
                <span className={styles.protectionPriceUnit}>/mo</span>
              </div>
              <span className={styles.protectionPriceDesc}>
                Black Friday protection pricing
              </span>
            </div>

            <Link href="/device-protection" className={styles.protectionAddBtn}>
              Add Protection
              <ArrowRight size={16} />
            </Link>

            <span style={{ fontSize: "11.5px", color: "#9CA3AF" }}>
              Coverage, deductibles, claim limits and eligible devices: Terms apply.
            </span>
          </div>
        </div>
      </section>

      {/* 7. SWITCH WITH PURPOSE / ANIMAL RESCUES SECTION */}
      <section className={styles.animalSection}>
        {/* Background Paw Prints (Figma coordinates) */}
        <div className={styles.animalPawBackground} aria-hidden="true">
          <PawPrint size={24} className={`${styles.bgPawItem} ${styles.bgPaw1}`} />
          <PawPrint size={22} className={`${styles.bgPawItem} ${styles.bgPaw2}`} />
          <PawPrint size={24} className={`${styles.bgPawItem} ${styles.bgPaw3}`} />
          <PawPrint size={22} className={`${styles.bgPawItem} ${styles.bgPaw4}`} />
          <PawPrint size={24} className={`${styles.bgPawItem} ${styles.bgPaw5}`} />
        </div>

        <div className={styles.animalContainer}>
          {/* Left Visual */}
          <div className={styles.animalVisualFrame}>
            <Image
              src="/img/black-friday/Background (6).png"
              alt="Zoiko Animal Welfare Rescue Network"
              width={540}
              height={420}
              className={styles.animalImg}
            />
            <div className={styles.animalCornerBadge}>
              <span>SWITCH WITH </span>
              <span>PURPOSE</span>
            </div>
          </div>

          {/* Right Content */}
          <div className={styles.animalContent}>
            <div className={styles.animalSuperTitle}>
              OUR PURPOSE
            </div>

            <h2 className={styles.animalTitle}>
              SWITCH WITH PURPOSE. <br />
              <span className={styles.animalTitlePink}>SAVE MORE.</span> SUPPORT <br />
              ANIMAL RESCUES.
            </h2>

            <p className={styles.animalDesc}>
              Changing carriers can be about more than a lower bill. Zoiko Mobile USA
              pairs everyday mobile value with a genuine affinity for animal rescue.
            </p>

            <div className={styles.animalBtnRow}>
              <Link href="/animal-charities" className={styles.animalBtnPrimary}>
                Switch &amp; save today
              </Link>
              <Link
                href="/animal-charities#how-giving-works"
                className={styles.animalBtnSecondary}
              >
                Know More...
              </Link>
            </div>

            <div className={styles.animalCardsRow}>
              <div className={styles.animalMiniCard}>
                <Tag size={20} color="#DF1E5A" />
                <span className={styles.animalMiniTitle}>Everyday value</span>
              </div>
              <div className={styles.animalMiniCard}>
                <Repeat size={20} color="#DF1E5A" />
                <span className={styles.animalMiniTitle}>A reason to switch</span>
              </div>
              <div className={styles.animalMiniCard}>
                <Heart size={20} color="#DF1E5A" />
                <span className={styles.animalMiniTitle}>Animal-rescue affinity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLACK FRIDAY FAQS SECTION */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          {/* Left Column: Heading & Contact Box */}
          <div className={styles.faqLeft}>
            <div>
              <div className={styles.sectionSuperTitle}>GOOD TO KNOW</div>
              <h2 className={styles.sectionMainTitle} style={{ textAlign: "left" }}>
                BLACK FRIDAY <br />
                <span>FAQS</span>
              </h2>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  marginTop: "8px",
                }}
              >
                Everything about eligibility, timing and what you will pay once the promotion ends.
              </p>
            </div>

            <div className={styles.faqQuestionsBox}>
              <div className={styles.faqQuestionsTitle}>Still have questions?</div>
              <div className={styles.faqQuestionsDesc}>
                Our USA support team can help you check device compatibility and coverage before you switch.
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
                <a href="tel:8009888116" className={styles.faqContactBtn}>
                  <Phone size={15} />
                  Call 800-988-8116
                </a>
                <Link
                  href="/support"
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "700",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "none",
                    padding: "11px 14px",
                  }}
                >
                  Visit Support →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className={styles.faqAccordionList}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className={styles.faqHeaderBtn}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQuestionText}>{faq.q}</span>
                    <span className={styles.faqToggleIcon}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  {isOpen && <div className={styles.faqAnswerText}>{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM FINAL CTA BANNER */}
      <section className={styles.bottomCtaSection}>
        {/* Background Sweeping Light Waves & Blast Particles */}
        <div className={styles.bottomBlastContainer} aria-hidden="true">
          <svg
            className={styles.bottomSvgBlast}
            viewBox="0 0 1440 644"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-20 96 C 350 160, 1050 80, 1480 120"
              stroke="rgba(223, 30, 90, 0.45)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M-20 408 C 450 360, 950 460, 1480 410"
              stroke="rgba(223, 30, 90, 0.5)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M-40 450 C 380 320, 880 520, 1480 360"
              stroke="rgba(255, 61, 127, 0.45)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          {/* Figma Particles & Confetti */}
          <div className={`${styles.confetti} ${styles.bottomConfetti1}`} />
          <div className={styles.bottomConfetti2} />
          <div className={styles.bottomConfetti3} />
          <div className={`${styles.confetti} ${styles.bottomConfetti4}`} />
        </div>

        {/* Huge Outline Watermark */}
        <div className={styles.bottomWatermark}>BLACK FRIDAY</div>

        <div className={styles.bottomCtaContainer}>
          <div className={styles.bottomPill}>
            BLACK FRIDAY NOV 27 · CYBER MONDAY NOV 30
          </div>

          <h2 className={styles.bottomBigTitle}>
            GET <span>40% OFF</span> YOUR PLAN <br />
            CHARGES FOR 3 MONTHS
          </h2>

          <p className={styles.bottomSubtitle}>
            Switch with purpose. Save more. Support animal rescues.
          </p>

          <a href="#plans" className={styles.bottomBigBtn}>
            See Plans &amp; Savings →
          </a>

          <p className={styles.bottomNote}>
            For qualifying new lines. Offer subject to approval. Standard monthly price ($13–$30/mo per line, depending on plan) applies after the first three months.
          </p>
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}

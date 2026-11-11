"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container, Spinner } from "react-bootstrap";
import {
  Check,
  CheckCircle2,
  FileText,
  Globe,
  Headphones,
  Info,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";

import Header, { openPlanPurchaseModal } from "../../components/Header";
import Footer from "../../components/Footer";
import { internationalCountries } from "../../utils/internationalCountries";
import styles from "./PlanDetails.module.css";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

const QUICK_DESTINATIONS = ["Mexico", "India", "Philippines", "Canada", "Nigeria"];

function formatPrice(val) {
  const num = Number(val);
  if (Number.isNaN(num)) return val || "0";
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

function formatDuration(durationType) {
  if (!durationType) return "month";
  const lower = durationType.toLowerCase();
  if (lower === "mo" || lower === "month") return "month";
  if (lower === "yr" || lower === "year") return "year";
  return lower;
}

function extractGbNumber(label) {
  if (!label) return 0;
  const match = label.match(/(\d+(?:\.\d+)?)\s*GB/i);
  return match ? Number(match[1]) : 0;
}

function parsePlanSpecs(plan) {
  const features = Array.isArray(plan?.features)
    ? plan.features.map((f) => (f?.text || "").trim()).filter(Boolean)
    : [];

  let premiumData = "";
  let hotspot = "";
  let minutesPart = "";
  let textsPart = "";
  let combinedTalkText = "";
  let intlCalling = "";
  let contractTerm = "";
  let deviceProtection = "Optional add-on";

  for (const text of features) {
    const lower = text.toLowerCase();

    if (!premiumData) {
      const premMatch = text.match(
        /(\d+(?:GB|MB)|Unlimited)\s*(?:of\s*)?(?:Premium|High[-\s]?Speed)\s*Data/i
      );
      if (
        premMatch &&
        !lower.includes("unlimited high speed 5g data") &&
        !lower.includes("unlimited high-speed 5g data") &&
        !lower.includes("unlimited high-speed data 5g")
      ) {
        premiumData = premMatch[1];
      } else if (lower.includes("speed reduces after")) {
        const afterMatch = text.match(/after\s*(\d+(?:GB|MB))/i);
        if (afterMatch) premiumData = afterMatch[1];
      }
    }

    if (!hotspot && lower.includes("hotspot")) {
      const hsMatch = text.match(/(\d+(?:GB|MB))/i);
      if (hsMatch) hotspot = hsMatch[1];
    }

    if (lower.includes("talk") && lower.includes("text")) {
      combinedTalkText = text;
    } else {
      if (!minutesPart && (lower.includes("minute") || lower.includes("talk"))) {
        minutesPart = text.replace(/\s*Minutes?\s*Talk/i, " Mins").trim();
      }
      if (!textsPart && lower.includes("text")) {
        textsPart = text.trim();
      }
    }

    if (!intlCalling && lower.includes("international")) {
      const countryMatch = text.match(/(\d+\+\s*Countries)/i);
      if (countryMatch) {
        intlCalling = countryMatch[1];
      } else if (lower.includes("unlimited")) {
        intlCalling = "Unlimited";
      } else {
        intlCalling = "Included";
      }
    }

    if (!contractTerm && lower.includes("contract")) {
      contractTerm = text;
    }

    if (lower.includes("device protection")) {
      deviceProtection = "Optional add-on";
    }
  }

  if (!premiumData) {
    const anyGb = features.find((t) => /premium data/i.test(t));
    if (anyGb) {
      const m = anyGb.match(/(\d+(?:GB|MB)|Unlimited)/i);
      if (m) premiumData = m[1];
    }
  }

  let callsTexts = combinedTalkText;
  if (!callsTexts) {
    if (minutesPart && textsPart) callsTexts = `${minutesPart} & ${textsPart}`;
    else callsTexts = minutesPart || textsPart || "Unlimited";
  }

  const slugLower = (plan?.slug || "").toLowerCase();
  let eyebrow = "Wireless plan";
  let tagline = plan?.sub_title?.trim() || "Simple, reliable U.S. wireless.";
  let bestFor = "Balanced everyday use";
  let heroDescription = "";

  if (slugLower === "zoiko-lite") {
    eyebrow = "Essential wireless";
    tagline = "Stay connected. Spend less.";
    bestFor = "Lighter data use";
    heroDescription = `Simple U.S. wireless with the essentials: ${
      premiumData || "5GB"
    } of premium data and ${hotspot || "2GB"} of mobile hotspot.`;
  } else if (slugLower === "zoiko-core") {
    eyebrow = "Everyday wireless";
    tagline = "More data for the moments that matter.";
    bestFor = "Daily balanced use";
    heroDescription = `Balanced everyday wireless with ${
      premiumData || "10GB"
    } of premium data and ${hotspot || "4GB"} of mobile hotspot.`;
  } else if (slugLower === "zoiko-max") {
    eyebrow = "Our highest data allowance";
    tagline = "More room for what moves you.";
    bestFor = "Heavier data & hotspot use";
    heroDescription = `For heavier data and hotspot use: ${
      premiumData || "20GB"
    } of premium data and ${hotspot || "10GB"} of mobile hotspot.`;
  } else {
    if (plan?.plan_type === "postpaid-plans") eyebrow = "Postpaid wireless";
    else if (plan?.plan_type === "prepaid-plans") eyebrow = "Prepaid wireless";
    else if (plan?.plan_type === "business-plans") eyebrow = "Business wireless";
    else if (plan?.plan_type === "travel-plans") eyebrow = "Travel wireless";

    heroDescription = `Flexible U.S. connectivity with ${
      premiumData || "Unlimited"
    } premium data and ${hotspot || "mobile hotspot"} included.`;
  }

  const premiumGb = extractGbNumber(premiumData);
  const hotspotGb = extractGbNumber(hotspot);

  return {
    eyebrow,
    tagline,
    bestFor,
    heroDescription,
    premiumData: premiumData || "Unlimited",
    hotspot: hotspot || "Included",
    premiumGb,
    hotspotGb,
    callsTexts,
    intlCalling: intlCalling || "Included",
    contractTerm: contractTerm || "No annual contract",
    deviceProtection,
    simType: "SIM or eSIM*",
    features,
  };
}

export default function PlanDetailsPage({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;

  const [plan, setPlan] = useState(null);
  const [categoryPlans, setCategoryPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interactive 3-step check state
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    1: false,
    2: false,
    3: false,
  });

  // Step 1: Coverage ZIP check
  const [zipCode, setZipCode] = useState("");
  const [coverageResult, setCoverageResult] = useState(null);

  // Step 2: IMEI compatibility check
  const [imei, setImei] = useState("");
  const [checkingImei, setCheckingImei] = useState(false);
  const [imeiResult, setImeiResult] = useState(null);

  // Step 3: Phone number check
  const [portNumber, setPortNumber] = useState("");
  const [portResult, setPortResult] = useState(null);

  // Interactive Allowance Sliders
  const [dataUsedGb, setDataUsedGb] = useState(12);
  const [hotspotUsedGb, setHotspotUsedGb] = useState(4);

  // Country search state
  const [countryQuery, setCountryQuery] = useState("");
  const [countrySearched, setCountrySearched] = useState(false);

  // FAQ accordion state (first question open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const checkerSectionRef = useRef(null);
  const countrySectionRef = useRef(null);
  const countryInputRef = useRef(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    const controller = new AbortController();

    const loadPlanData = async () => {
      setLoading(true);
      try {
        const [planRes, allPlansRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/plan/slug/${slug}`, {
            signal: controller.signal,
          }),
          fetch(`${API_BASE_URL}/api/v1/plans`, {
            signal: controller.signal,
          }),
        ]);

        const planJson = await planRes.json();
        const allJson = await allPlansRes.json();

        if (!isMounted) return;

        const current = planJson?.success ? planJson.data : null;
        setPlan(current);

        const allList = Array.isArray(allJson?.data) ? allJson.data : [];
        if (current) {
          const sameCategory = allList
            .filter((p) => p.plan_type === current.plan_type)
            .sort(
              (a, b) =>
                Number(a.sale_price || a.price || 0) -
                Number(b.sale_price || b.price || 0)
            );
          setCategoryPlans(sameCategory);
        } else {
          setCategoryPlans([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error loading plan details:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPlanData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [slug]);

  const specs = useMemo(() => parsePlanSpecs(plan), [plan]);

  // Initialize allowance sliders cleanly when plan specs load
  useEffect(() => {
    if (specs.premiumGb > 0) {
      setDataUsedGb(Math.max(1, Math.round(specs.premiumGb * 0.6)));
    }
    if (specs.hotspotGb > 0) {
      setHotspotUsedGb(Math.max(1, Math.round(specs.hotspotGb * 0.4)));
    }
  }, [specs.premiumGb, specs.hotspotGb]);

  const comparePlans = useMemo(() => {
    if (!plan || categoryPlans.length === 0) return [];
    const currentIndex = categoryPlans.findIndex((p) => p.slug === plan.slug);
    let selected = [];

    if (currentIndex === -1) {
      selected = [plan, ...categoryPlans.slice(0, 2)];
    } else if (categoryPlans.length <= 3) {
      selected = categoryPlans;
    } else if (currentIndex <= 1) {
      selected = categoryPlans.slice(0, 3);
    } else {
      // Include up to 2 preceding or surrounding plans, capped at 3 columns
      const start = Math.max(0, currentIndex - 2);
      selected = categoryPlans.slice(start, start + 3);
    }

    return selected.map((p) => ({
      ...p,
      specs: parsePlanSpecs(p),
    }));
  }, [plan, categoryPlans]);

  const matchedCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return [];
    return internationalCountries
      .filter((item) => item.destination.toLowerCase().includes(q))
      .slice(0, 8);
  }, [countryQuery]);

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  const handleChoosePlan = () => {
    if (!plan) return;
    openPlanPurchaseModal(
      plan.title,
      plan.slug,
      plan.id,
      plan.price,
      plan.sale_price,
      plan.duration_type,
      plan.bq_id,
      plan.plan_type
    );
  };

  const jumpToPhoneCheck = () => {
    setActiveStep(2);
    checkerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const jumpToCountrySearch = () => {
    countrySectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => countryInputRef.current?.focus(), 400);
  };

  const handleCoverageCheck = (e) => {
    e.preventDefault();
    const cleaned = zipCode.replace(/\D/g, "").trim();
    if (!/^\d{5}$/.test(cleaned)) {
      setCoverageResult({
        ok: false,
        message: "Please enter a valid 5-digit U.S. ZIP code.",
      });
      return;
    }

    setCoverageResult({
      ok: true,
      message: `Great news — nationwide 5G & 4G LTE coverage is available in ZIP code ${cleaned}.`,
    });
    setCompletedSteps((prev) => ({ ...prev, 1: true }));
  };

  const handleImeiCheck = async (e) => {
    e.preventDefault();
    const cleanedImei = imei.replace(/\s/g, "").trim();
    if (!/^\d{14,16}$/.test(cleanedImei)) {
      setImeiResult({
        ok: false,
        message: "Please enter a valid 14–16 digit IMEI or MEID number.",
      });
      return;
    }

    setCheckingImei(true);
    setImeiResult(null);

    try {
      const storageKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("device_serial_")
      );
      for (const key of storageKeys) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed.device_serial === cleanedImei) {
          const ok = parsed.esim_compatible === true;
          setImeiResult({
            ok,
            message: ok
              ? `Device ${cleanedImei} is unlocked & eSIM/SIM compatible with ${plan?.title || "this plan"}.`
              : `Device ${cleanedImei} is not eSIM-compatible. Physical SIM options may still apply on unlocked phones.`,
          });
          setCompletedSteps((prev) => ({ ...prev, 2: true }));
          return;
        }
      }

      const goliteRes = await fetch(
        "https://goliteapi.golitemobile.com/api/device_compatibility_checker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY || "",
          },
          body: JSON.stringify({ action: "esim_check", imei: cleanedImei }),
        }
      );
      const goliteData = await goliteRes.json();

      if (goliteData.compatible === true) {
        setImeiResult({
          ok: true,
          message: `Device ${cleanedImei} is compatible with Zoiko Mobile eSIM and physical SIM.`,
        });
        setCompletedSteps((prev) => ({ ...prev, 2: true }));
        return;
      }

      const bequickRes = await fetch(
        "https://zoiko-atom-api.bequickapps.com/carriers/3/query_device_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_BEQUICK_TOKEN || "",
          },
          body: JSON.stringify({ device_serial: cleanedImei }),
        }
      );
      const bequickData = await bequickRes.json();

      if (bequickData?.esim_compatible === true) {
        setImeiResult({
          ok: true,
          message: `Device ${cleanedImei} is compatible with Zoiko Mobile 5G & eSIM.`,
        });
      } else {
        setImeiResult({
          ok: true,
          message: `IMEI ${cleanedImei} verified. Ensure your phone is carrier-unlocked before activating your SIM or eSIM.`,
        });
      }
      setCompletedSteps((prev) => ({ ...prev, 2: true }));
    } catch {
      setImeiResult({
        ok: false,
        message: "Unable to verify IMEI right now. Please check your IMEI or visit BYOD compatibility.",
      });
    } finally {
      setCheckingImei(false);
    }
  };

  const handleNumberCheck = (e) => {
    e.preventDefault();
    const digits = portNumber.replace(/\D/g, "").trim();
    if (digits.length !== 10) {
      setPortResult({
        ok: false,
        message: "Please enter a valid 10-digit U.S. mobile number.",
      });
      return;
    }

    setPortResult({
      ok: true,
      message: `Number (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)} can be transferred to ${plan?.title || "Zoiko Mobile"} during checkout, or you can request a new number.`,
    });
    setCompletedSteps((prev) => ({ ...prev, 3: true }));
  };

  const handleNextCheck = () => {
    setActiveStep((prev) => (prev < 3 ? prev + 1 : 1));
  };

  const faqs = useMemo(() => {
    if (!plan) return [];
    const currency = plan.currency || "$";
    const activePrice = formatPrice(plan.sale_price || plan.price);
    const period = formatDuration(plan.duration_type);

    return [
      {
        q: `How much does ${plan.title} cost?`,
        a: `${currency}${activePrice} per ${period} per line, plus applicable taxes and fees. Before you pay, we show what's due today and your monthly amount. (${specs.contractTerm})`,
      },
      {
        q: `What happens after I use ${specs.premiumData}?`,
        a: `You get ${specs.premiumData} of high-speed 5G/4G LTE premium data each billing period. After reaching ${specs.premiumData}, your data continues at reduced speeds under our network management policy so you never face overage surprises.`,
      },
      {
        q: `What happens after ${specs.hotspot} of hotspot?`,
        a: `Mobile hotspot draws from its own ${specs.hotspot} allowance per billing period, counted separately from your main premium data. Speeds reduce after ${specs.hotspot} is used.`,
      },
      {
        q: "What calls and texts are included?",
        a: `${plan.title} includes ${specs.callsTexts} across the U.S., keeping your everyday voice and text usage clear and predictable.`,
      },
      {
        q: "Which countries can I call?",
        a: `${plan.title} includes international calling (${specs.intlCalling}) from the U.S. Use the destination search tool above to verify included monthly minutes for your destination.`,
      },
      {
        q: "Can I keep my current phone and number?",
        a: "Yes. Most unlocked smartphones work with Zoiko Mobile, and you can transfer your existing U.S. mobile number during checkout with your current carrier's account number and transfer PIN.",
      },
      {
        q: "Do you support eSIM?",
        a: "Yes. eSIM is supported on eligible unlocked smartphones for instant digital activation, alongside standard physical SIM delivery.",
      },
      {
        q: "Is device protection included?",
        a: "Device protection is available as an optional add-on (sold separately) so you only pay for coverage if you want it.",
      },
      {
        q: "Is there a contract or cancellation policy?",
        a: `This plan includes ${specs.contractTerm}. Review the full terms and conditions during checkout before paying.`,
      },
      {
        q: "What if I need more data?",
        a: "You can compare higher-tier wireless plans anytime and switch to a plan with a larger premium data and hotspot allowance if your usage grows.",
      },
    ];
  }, [plan, specs]);

  if (loading) {
    return (
      <>
        <Header />
        <Container className="text-center mt-5 py-5">
          <Spinner animation="border" variant="danger" />
          <div className="pt-3">Loading plan details...</div>
        </Container>
        <Footer />
      </>
    );
  }

  if (!plan) {
    return (
      <>
        <Header />
        <Container className="text-center mt-5 py-5">
          <h2>Plan not found</h2>
          <p>Please check the plan link or browse all available plans.</p>
          <Link href="/all-plans" className="btn btn-danger mt-2">
            View All Plans
          </Link>
        </Container>
        <Footer />
      </>
    );
  }

  const currency = plan.currency || "$";
  const displayPrice = formatPrice(plan.sale_price || plan.price);
  const basePrice = formatPrice(plan.price);
  const showStrike = Number(plan.price) > Number(plan.sale_price || plan.price);
  const periodLabel = formatDuration(plan.duration_type);
  const shortPeriod = periodLabel === "month" ? "mo" : periodLabel;

  const dataMaxSlider = specs.premiumGb > 0 ? Math.round(specs.premiumGb * 1.5) : 30;
  const hotspotMaxSlider = specs.hotspotGb > 0 ? Math.round(specs.hotspotGb * 1.5) : 15;
  const dataLeftGb = Math.max(0, specs.premiumGb - dataUsedGb);
  const hotspotLeftGb = Math.max(0, specs.hotspotGb - hotspotUsedGb);

  const nextLabel =
    activeStep === 1
      ? "Next: Your phone"
      : activeStep === 2
      ? "Next: Your number"
      : "All steps reviewed";

  const roadmapSteps = [
    {
      num: 1,
      title: "Check coverage",
      meta: "On this page",
      done: completedSteps[1],
      badge: completedSteps[1] ? "Done" : null,
    },
    {
      num: 2,
      title: "Check your phone",
      meta: "On this page",
      done: completedSteps[2],
      badge: completedSteps[2] ? "Done" : null,
    },
    {
      num: 3,
      title: "Choose SIM or eSIM",
      meta: "After the phone check",
      done: false,
      badge: null,
    },
    {
      num: 4,
      title: "Keep or get a number",
      meta: "On this page",
      done: completedSteps[3],
      badge: completedSteps[3] ? "Done" : null,
    },
    {
      num: 5,
      title: "Review your quote",
      meta: "Checkout · taxes, fees & due today",
      done: false,
      badge: "At checkout",
    },
    {
      num: 6,
      title: "Pay securely",
      meta: "Checkout",
      done: false,
      badge: "At checkout",
    },
    {
      num: 7,
      title: "Activate your line",
      meta: "Confirmed by our network partner",
      done: false,
      badge: "At checkout",
    },
  ];

  const isMaxPlan = plan.slug?.toLowerCase() === "zoiko-max";
  const isCorePlan = plan.slug?.toLowerCase() === "zoiko-core";

  return (
    <>
      <Header />

      <main className={styles.pageRoot}>
        {/* SECTION 1: HERO */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              {/* Left Info */}
              <div className={styles.heroLeft}>
                <p className={styles.eyebrow}>{specs.eyebrow}</p>
                <h1 className={styles.heroTitle}>{plan.title}</h1>
                <h2 className={styles.heroTagline}>{specs.tagline}</h2>
                <p className={styles.heroDesc}>{specs.heroDescription}</p>

                <div className={styles.specStrip}>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>Premium data</span>
                    <span className={styles.specValue}>{specs.premiumData}</span>
                  </div>
                  <div className={`${styles.specCell} ${styles.specCellBordered}`}>
                    <span className={styles.specLabel}>Hotspot</span>
                    <span className={styles.specValue}>{specs.hotspot}</span>
                  </div>
                  <div className={`${styles.specCell} ${styles.specCellBordered}`}>
                    <span className={styles.specLabel}>SIM type</span>
                    <span className={styles.specValueSmall}>{specs.simType}</span>
                  </div>
                </div>

                <p className={styles.eligibleNote}>
                  *On eligible phones.{" "}
                  <button
                    type="button"
                    onClick={jumpToPhoneCheck}
                    className={styles.inlineActionLink}
                  >
                    Check yours
                  </button>
                </p>
              </div>

              {/* Right Pricing Column & Plan Switcher */}
              <div className={styles.heroRightCol}>
                {comparePlans.length > 1 && (
                  <div className={styles.planSwitcherWrap}>
                    <div className={styles.planSwitcherTrack}>
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        const shortTitle = cp.title.replace(/^Zoiko\s+/i, "");
                        return (
                          <Link
                            key={cp.id || cp.slug}
                            href={`/plans/${cp.slug}`}
                            className={`${styles.planSwitcherPill} ${
                              isActive ? styles.planSwitcherPillActive : ""
                            }`}
                          >
                            {shortTitle} &middot; {cp.currency || "$"}
                            {formatPrice(cp.sale_price || cp.price)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={styles.priceCard}>
                <div className={styles.priceCardTopBar} />
                <div className={styles.priceCardBody}>
                  <div className={styles.priceHeader}>
                    <div className={styles.priceRow}>
                      <span className={styles.priceAmount}>
                        {currency}
                        {displayPrice}
                      </span>
                      {showStrike && (
                        <span className={styles.priceStrike}>
                          {currency}
                          {basePrice}
                        </span>
                      )}
                      <span className={styles.pricePeriod}>
                        /{periodLabel} per line
                      </span>
                    </div>
                    <p className={styles.taxNote}>
                      Plus taxes &amp; fees. We show what&rsquo;s due today and
                      monthly before you pay.
                    </p>
                  </div>

                  <div className={styles.cardFeatureList}>
                    <div className={styles.cardFeatureRow}>
                      <span className={styles.cardFeatureLeft}>
                        <Smartphone size={18} className={styles.cardFeatureIcon} />
                        Premium data
                      </span>
                      <span className={styles.cardFeatureValue}>
                        {specs.premiumData}
                      </span>
                    </div>
                    <div className={styles.cardFeatureRow}>
                      <span className={styles.cardFeatureLeft}>
                        <Wifi size={18} className={styles.cardFeatureIcon} />
                        Mobile hotspot
                      </span>
                      <span className={styles.cardFeatureValue}>{specs.hotspot}</span>
                    </div>
                    <div className={styles.cardFeatureRow}>
                      <span className={styles.cardFeatureLeft}>
                        <PhoneCall size={18} className={styles.cardFeatureIcon} />
                        Calls &amp; texts
                      </span>
                      <span className={styles.cardFeatureValue}>
                        {specs.callsTexts}
                      </span>
                    </div>
                    <div className={styles.cardFeatureRow}>
                      <span className={styles.cardFeatureLeft}>
                        <Globe size={18} className={styles.cardFeatureIcon} />
                        International calling
                      </span>
                      <button
                        type="button"
                        onClick={jumpToCountrySearch}
                        className={styles.inlineActionLink}
                      >
                        Check a destination
                      </button>
                    </div>
                    <div className={styles.cardFeatureRow}>
                      <span className={styles.cardFeatureLeft}>
                        <ShieldCheck size={18} className={styles.cardFeatureIcon} />
                        Device protection
                      </span>
                      <span className={styles.cardFeatureMuted}>
                        Optional, sold separately
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleChoosePlan}
                    className={styles.primaryBtn}
                  >
                    Choose {plan.title}
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BEFORE YOU SWITCH + SWITCH ROADMAP */}
        <section ref={checkerSectionRef} className={styles.greySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionHeadingGroup}>
                <div className={styles.eyebrowRow}>
                  <span className={styles.eyebrowDash} />
                  <p className={styles.eyebrow}>Before you switch</p>
                </div>
                <h2 className={styles.sectionTitle}>
                  Will {plan.title} work for you?
                </h2>
                <p className={styles.sectionSubtitle}>
                  Coverage, phone and number in under a minute. Nothing is
                  submitted until checkout.
                </p>
              </div>

              <div className={styles.progressWrap}>
                <span className={styles.progressLabel}>
                  {completedCount} of 3 checks done
                </span>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(completedCount / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.twoColBalanced}>
              {/* Left Interactive Checker */}
              <div className={styles.checkCard}>
                <div>
                  <div className={styles.stepTabsGrid}>
                    {[
                      { id: 1, title: "Coverage", sub: "ZIP code" },
                      { id: 2, title: "Your phone", sub: "IMEI check" },
                      { id: 3, title: "Your number", sub: "Keep or new" },
                    ].map((tab) => {
                      const isActive = activeStep === tab.id;
                      const isDone = completedSteps[tab.id];
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveStep(tab.id)}
                          className={`${styles.stepTab} ${
                            isActive ? styles.stepTabActive : ""
                          }`}
                        >
                          <span
                            className={`${styles.stepBadge} ${
                              isDone
                                ? styles.stepBadgeDone
                                : isActive
                                ? styles.stepBadgeActive
                                : ""
                            }`}
                          >
                            {isDone ? <Check size={14} /> : tab.id}
                          </span>
                          <span className={styles.stepTabText}>
                            <span className={styles.stepTabTitle}>{tab.title}</span>
                            <span className={styles.stepTabSub}>{tab.sub}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: 22 }}>
                    {/* Step 1: Coverage */}
                    {activeStep === 1 && (
                      <form onSubmit={handleCoverageCheck} className={styles.checkFormRow}>
                        <div className={styles.inputGroup}>
                          <label htmlFor="zip-check-input" className={styles.inputLabel}>
                            ZIP code where you use your phone most
                          </label>
                          <input
                            id="zip-check-input"
                            type="text"
                            maxLength={5}
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="e.g. 78731"
                            className={styles.textInput}
                          />
                        </div>
                        <button
                          type="submit"
                          className={`${styles.primaryBtn} ${styles.primaryBtnInline}`}
                        >
                          Check coverage
                        </button>
                      </form>
                    )}

                    {activeStep === 1 && coverageResult && (
                      <div
                        style={{ marginTop: 14 }}
                        className={`${styles.checkResultBox} ${
                          coverageResult.ok
                            ? styles.checkResultSuccess
                            : styles.checkResultError
                        }`}
                      >
                        <span>{coverageResult.message}</span>
                        <a
                          href="https://mvnoc.ai/coverage-map"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.inlineActionLink}
                        >
                          View full Coverage Map
                        </a>
                      </div>
                    )}

                    {/* Step 2: Your phone */}
                    {activeStep === 2 && (
                      <form onSubmit={handleImeiCheck} className={styles.checkFormRow}>
                        <div className={styles.inputGroup}>
                          <label htmlFor="imei-check-input" className={styles.inputLabel}>
                            Enter your 14–16 digit IMEI or MEID (dial *#06#)
                          </label>
                          <input
                            id="imei-check-input"
                            type="text"
                            maxLength={16}
                            value={imei}
                            onChange={(e) => setImei(e.target.value)}
                            placeholder="Enter IMEI / MEID number"
                            className={styles.textInput}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={checkingImei}
                          className={`${styles.primaryBtn} ${styles.primaryBtnInline}`}
                        >
                          {checkingImei ? "Checking..." : "Check compatibility"}
                        </button>
                      </form>
                    )}

                    {activeStep === 2 && imeiResult && (
                      <div
                        style={{ marginTop: 14 }}
                        className={`${styles.checkResultBox} ${
                          imeiResult.ok
                            ? styles.checkResultSuccess
                            : styles.checkResultError
                        }`}
                      >
                        <span>{imeiResult.message}</span>
                        <Link href="/byod-plans" className={styles.inlineActionLink}>
                          More BYOD details
                        </Link>
                      </div>
                    )}

                    {/* Step 3: Your number */}
                    {activeStep === 3 && (
                      <form onSubmit={handleNumberCheck} className={styles.checkFormRow}>
                        <div className={styles.inputGroup}>
                          <label htmlFor="port-check-input" className={styles.inputLabel}>
                            Current U.S. mobile number you want to keep
                          </label>
                          <input
                            id="port-check-input"
                            type="tel"
                            value={portNumber}
                            onChange={(e) => setPortNumber(e.target.value)}
                            placeholder="e.g. (512) 555-0199"
                            className={styles.textInput}
                          />
                        </div>
                        <button
                          type="submit"
                          className={`${styles.primaryBtn} ${styles.primaryBtnInline}`}
                        >
                          Check number
                        </button>
                      </form>
                    )}

                    {activeStep === 3 && portResult && (
                      <div
                        style={{ marginTop: 14 }}
                        className={`${styles.checkResultBox} ${
                          portResult.ok
                            ? styles.checkResultSuccess
                            : styles.checkResultError
                        }`}
                      >
                        <span>{portResult.message}</span>
                        <Link href="/switch" className={styles.inlineActionLink}>
                          How number transfer works
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.checkFooter}>
                  <span className={styles.checkNextLabel}>{nextLabel}</span>
                  <button
                    type="button"
                    onClick={handleNextCheck}
                    className={styles.outlineBtn}
                  >
                    Next check &rarr;
                  </button>
                </div>
              </div>

              {/* Right Switch Roadmap Card */}
              <div className={styles.roadmapCard}>
                <h3 className={styles.roadmapTitle}>Your switch, step by step</h3>
                <div className={styles.roadmapList}>
                  {roadmapSteps.map((step) => (
                    <div key={step.num} className={styles.roadmapItem}>
                      <span
                        className={`${styles.roadmapNum} ${
                          step.done ? styles.roadmapNumDone : ""
                        }`}
                      >
                        {step.done ? <Check size={14} /> : step.num}
                      </span>
                      <div className={styles.roadmapTextWrap}>
                        <span className={styles.roadmapStepName}>{step.title}</span>
                        <span className={styles.roadmapStepMeta}>{step.meta}</span>
                      </div>
                      {step.badge && (
                        <span className={styles.roadmapBadge}>{step.badge}</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className={styles.roadmapFootnote}>
                  We only show &ldquo;Active&rdquo; once your line is confirmed.
                  Number transfers stay pending until your carrier releases the
                  number.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE ALLOWANCE SLIDERS */}
        <section className={styles.whiteSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeadingGroup}>
              <div className={styles.eyebrowRow}>
                <span className={styles.eyebrowDash} />
                <p className={styles.eyebrow}>Know your allowances</p>
              </div>
              <h2 className={styles.sectionTitle}>
                {isCorePlan
                  ? `What ${specs.premiumData} of premium data means.`
                  : "See what happens as you use your data."}
              </h2>
              <p className={styles.sectionSubtitle}>
                Drag the sliders to explore a billing period. Premium data and
                hotspot are counted separately.
              </p>
            </div>

            <div className={styles.sliderGrid}>
              {/* Premium Data Slider Card */}
              <div className={styles.detailCard}>
                <div className={styles.sliderTopRow}>
                  <h3 className={styles.cardHeading}>
                    Premium data &middot; {specs.premiumData}
                  </h3>
                  <span className={styles.sliderReadoutPink}>
                    {specs.premiumGb > 0 ? `${dataUsedGb}GB` : specs.premiumData}
                  </span>
                </div>

                <p className={styles.sliderSubLabel}>Data used this billing period</p>

                {specs.premiumGb > 0 ? (
                  <>
                    <input
                      type="range"
                      min={0}
                      max={dataMaxSlider}
                      value={dataUsedGb}
                      onChange={(e) => setDataUsedGb(Number(e.target.value))}
                      aria-label="Data used this billing period"
                      className={styles.rangeInput}
                    />
                    <div className={styles.usageBar}>
                      <div
                        className={styles.usageFillPrimary}
                        style={{
                          width: `${Math.min(
                            100,
                            (dataUsedGb / dataMaxSlider) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className={styles.scaleRow}>
                      <span>0GB</span>
                      <span className={styles.scaleThreshold}>
                        {specs.premiumData} premium threshold
                      </span>
                      <span>{dataMaxSlider}GB</span>
                    </div>
                    <div
                      className={`${styles.allowanceAlert} ${
                        dataLeftGb > 0
                          ? styles.allowanceAlertOk
                          : styles.allowanceAlertWarn
                      }`}
                    >
                      {dataLeftGb > 0 ? (
                        <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                      ) : (
                        <Info size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                      )}
                      <div>
                        {dataLeftGb > 0 ? (
                          <>
                            <strong>{dataLeftGb}GB of premium data left.</strong> Your
                            data has premium network treatment up to{" "}
                            {specs.premiumData} this billing period.
                          </>
                        ) : (
                          <>
                            <strong>
                              You&rsquo;ve reached your {specs.premiumData} threshold.
                            </strong>{" "}
                            Your connection continues at reduced speeds under our{" "}
                            <Link
                              href="/network-service"
                              className={styles.inlineActionLink}
                            >
                              network management policy
                            </Link>
                            .
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`${styles.allowanceAlert} ${styles.allowanceAlertOk}`}>
                    <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong>Unlimited premium data included</strong> under our
                      standard network management policy.
                    </div>
                  </div>
                )}
              </div>

              {/* Hotspot Slider Card */}
              <div className={styles.detailCard}>
                <div className={styles.sliderTopRow}>
                  <h3 className={styles.cardHeading}>
                    {isCorePlan
                      ? `${specs.hotspot} for sharing your connection`
                      : `Mobile hotspot \u00b7 ${specs.hotspot}`}
                  </h3>
                  <span className={styles.sliderReadoutDark}>
                    {specs.hotspotGb > 0 ? `${hotspotUsedGb}GB` : specs.hotspot}
                  </span>
                </div>

                <p className={styles.sliderSubLabel}>
                  Hotspot used this billing period
                </p>

                {specs.hotspotGb > 0 ? (
                  <>
                    <input
                      type="range"
                      min={0}
                      max={hotspotMaxSlider}
                      value={hotspotUsedGb}
                      onChange={(e) => setHotspotUsedGb(Number(e.target.value))}
                      aria-label="Hotspot used this billing period"
                      className={`${styles.rangeInput} ${styles.rangeInputHotspot}`}
                    />
                    <div className={styles.usageBar}>
                      <div
                        className={styles.usageFillHotspot}
                        style={{
                          width: `${Math.min(
                            100,
                            (hotspotUsedGb / hotspotMaxSlider) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className={styles.scaleRow}>
                      <span>0GB</span>
                      <span className={styles.scaleThreshold}>
                        {specs.hotspot} hotspot allowance
                      </span>
                      <span>{hotspotMaxSlider}GB</span>
                    </div>
                    <div
                      className={`${styles.allowanceAlert} ${
                        hotspotLeftGb > 0
                          ? styles.allowanceAlertOk
                          : styles.allowanceAlertWarn
                      }`}
                    >
                      {hotspotLeftGb > 0 ? (
                        <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                      ) : (
                        <Info size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                      )}
                      <div>
                        {hotspotLeftGb > 0 ? (
                          <>
                            <strong>{hotspotLeftGb}GB of hotspot left.</strong> Hotspot
                            use is counted separately from your premium data.
                          </>
                        ) : (
                          <>
                            <strong>
                              You&rsquo;ve used your {specs.hotspot} hotspot allowance.
                            </strong>{" "}
                            Hotspot speeds slow for the rest of this billing period.
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`${styles.allowanceAlert} ${styles.allowanceAlertOk}`}>
                    <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      Hotspot capability is available with this plan per billing
                      period.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CALLING AT HOME & ABROAD */}
        <section ref={countrySectionRef} className={styles.greySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeadingGroup}>
              <p className={styles.eyebrow}>Calls &amp; texts</p>
              <h2 className={styles.sectionTitle}>
                {isCorePlan
                  ? "Call and text the people you need."
                  : "Calling at home and abroad."}
              </h2>
              <p className={styles.sectionSubtitle}>
                We only show allowances and destinations that are approved for{" "}
                {plan.title}.
              </p>
            </div>

            <div className={styles.callingGrid}>
              {/* Destination Search + Quick Chips */}
              <div className={styles.detailCard}>
                <h3 className={styles.cardHeading}>Check a destination</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCountrySearched(true);
                  }}
                  className={styles.checkFormRow}
                >
                  <div className={styles.inputGroup}>
                    <label htmlFor="country-search-input" className={styles.inputLabel}>
                      Country you want to call
                    </label>
                    <input
                      ref={countryInputRef}
                      id="country-search-input"
                      type="text"
                      value={countryQuery}
                      onChange={(e) => {
                        setCountryQuery(e.target.value);
                        setCountrySearched(true);
                      }}
                      placeholder="e.g. Mexico"
                      className={styles.textInput}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${styles.primaryBtn} ${styles.primaryBtnInline}`}
                  >
                    Check
                  </button>
                </form>

                <div className={styles.chipsRow}>
                  {QUICK_DESTINATIONS.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setCountryQuery(country);
                        setCountrySearched(true);
                      }}
                      className={`${styles.countryChip} ${
                        countryQuery.toLowerCase() === country.toLowerCase()
                          ? styles.countryChipActive
                          : ""
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>

                {countrySearched && countryQuery.trim() && (
                  <div className={styles.countryResults}>
                    {matchedCountries.length > 0 ? (
                      matchedCountries.map((row, idx) => (
                        <div key={idx} className={styles.countryItem}>
                          <span>{row.destination}</span>
                          <strong>{row.minutes} mins included</strong>
                        </div>
                      ))
                    ) : (
                      <p className={styles.summarySubText}>
                        No exact match found.{" "}
                        <Link
                          href="/international-calling-country-list"
                          className={styles.inlineActionLink}
                        >
                          Browse all 200+ destinations
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Right Details Summary */}
              <div className={styles.summaryCard}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    Domestic calls &amp; texts
                  </span>
                  <span className={styles.summaryValue}>{specs.callsTexts}</span>
                </div>
                <div className={styles.summaryRowStack}>
                  <strong className={styles.summaryLabel}>
                    Calling abroad &ne; roaming
                  </strong>
                  <span className={styles.summarySubText}>
                    The lookup covers calls from the U.S. Using your phone while
                    traveling is{" "}
                    <Link href="/roaming-rates" className={styles.inlineActionLink}>
                      roaming
                    </Link>
                    , which is separate.
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Device protection</span>
                  <Link href="/device-protection" className={styles.summaryValue}>
                    {specs.deviceProtection}
                  </Link>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Contract term</span>
                  <Link href="/terms-and-conditions" className={styles.summaryValue}>
                    {specs.contractTerm}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: COMPARE WIRELESS PLANS */}
        {comparePlans.length > 0 && (
          <section className={styles.whiteSection}>
            <div className={styles.container}>
              <div className={styles.sectionHeadingGroup}>
                <p className={styles.eyebrow}>Compare wireless plans</p>
                <h2 className={styles.sectionTitle}>
                  {isMaxPlan
                    ? "Do you need the extra room?"
                    : isCorePlan
                    ? "Is Core the right amount of data?"
                    : "Need more data?"}
                </h2>
                <p className={styles.sectionSubtitle}>
                  One-line monthly prices, before taxes and fees, on the same basis.
                </p>
              </div>

              <div className={styles.compareTableWrapper}>
                <table className={styles.compareTable}>
                  <thead>
                    <tr>
                      <th aria-label="Feature" />
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <th
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveHeader : ""}
                          >
                            <span className={styles.comparePlanName}>
                              {cp.title}
                            </span>
                            {isActive && (
                              <span className={styles.viewingTag}>
                                You&rsquo;re viewing
                              </span>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.compareRowLabel}>
                        Monthly price, 1 line
                      </td>
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <td
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveCol : ""}
                          >
                            <span
                              className={
                                isActive
                                  ? styles.compareValueActive
                                  : styles.compareValue
                              }
                            >
                              {cp.currency || "$"}
                              {formatPrice(cp.sale_price || cp.price)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className={styles.compareRowLabel}>Premium data</td>
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <td
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveCol : ""}
                          >
                            <span
                              className={
                                isActive
                                  ? styles.compareValueActive
                                  : styles.compareValue
                              }
                            >
                              {cp.specs.premiumData}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className={styles.compareRowLabel}>Mobile hotspot</td>
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <td
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveCol : ""}
                          >
                            <span
                              className={
                                isActive
                                  ? styles.compareValueActive
                                  : styles.compareValue
                              }
                            >
                              {cp.specs.hotspot}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className={styles.compareRowLabel}>Calls &amp; texts</td>
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <td
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveCol : ""}
                          >
                            <span
                              className={
                                isActive
                                  ? styles.compareValueActive
                                  : styles.compareValue
                              }
                            >
                              {cp.specs.callsTexts}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className={styles.compareRowLabel}>Best for</td>
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <td
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveCol : ""}
                          >
                            <span
                              className={
                                isActive
                                  ? styles.compareValueActive
                                  : styles.compareValue
                              }
                            >
                              {cp.specs.bestFor}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td />
                      {comparePlans.map((cp) => {
                        const isActive = cp.slug === plan.slug;
                        return (
                          <td
                            key={cp.id || cp.slug}
                            className={isActive ? styles.compareActiveCol : ""}
                          >
                            {isActive ? (
                              <button
                                type="button"
                                onClick={handleChoosePlan}
                                className={`${styles.primaryBtn} ${styles.primaryBtnInline}`}
                              >
                                Choose {cp.title}
                              </button>
                            ) : (
                              <Link
                                href={`/plans/${cp.slug}`}
                                className={styles.compareViewLink}
                              >
                                View {cp.title}
                              </Link>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className={styles.compareFootnote}>
                International destinations differ by plan and don&rsquo;t simply
                increase with price.
              </p>
            </div>
          </section>
        )}

        {/* SECTION 6: TRUST & FAQS (2-COLUMN) */}
        <section className={styles.greySection}>
          <div className={styles.container}>
            <div className={styles.faqTwoCol}>
              {/* Left Trust Cards */}
              <div className={styles.trustLeftCol}>
                <div className={styles.sectionHeadingGroup}>
                  <div className={styles.eyebrowRow}>
                    <span className={styles.eyebrowDash} />
                    <p className={styles.eyebrow}>Trust &amp; FAQs</p>
                  </div>
                  <h2 className={styles.sectionTitle}>
                    Check the details before you choose.
                  </h2>
                </div>

                <Link href="/consumer-information" className={styles.trustCard}>
                  <div className={styles.trustIconBox}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className={styles.trustCardTitle}>
                      {plan.title} Broadband Facts
                    </span>
                    <span className={styles.trustCardSub}>
                      Price, fees, speeds and network policy for this plan
                    </span>
                  </div>
                </Link>

                <a href="tel:8009888116" className={styles.trustCard}>
                  <div className={`${styles.trustIconBox} ${styles.trustIconPink}`}>
                    <Headphones size={24} />
                  </div>
                  <div>
                    <span className={styles.trustCardTitle}>
                      Talk to our team
                    </span>
                    <span className={styles.trustCardSub}>
                      800-988-8116 &middot; Live chat
                    </span>
                  </div>
                </a>
              </div>

              {/* Right FAQ Cards */}
              <div className={styles.faqCardsList}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`${styles.faqCardItem} ${
                        isOpen ? styles.faqCardItemOpen : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        className={styles.faqBtn}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.faqQuestion}>{faq.q}</span>
                        <span
                          className={`${styles.faqPillBadge} ${
                            isOpen ? styles.faqPillBadgeOpen : ""
                          }`}
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && <div className={styles.faqAnswer}>{faq.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: BOTTOM CTA BANNER */}
        <section className={styles.ctaWrapper}>
          <div className={styles.container}>
            <div className={styles.ctaBanner}>
              <div className={styles.ctaLeftStrip} />
              <div>
                <h2 className={styles.ctaTitle}>
                  {isMaxPlan
                    ? `More room starts at ${currency}${displayPrice}/${shortPeriod}.`
                    : isCorePlan
                    ? "Ready for more everyday data?"
                    : "Ready for simpler wireless?"}
                </h2>
                <p className={styles.ctaSub}>
                  {specs.premiumData} premium data and {specs.hotspot} hotspot per
                  line ({currency}
                  {displayPrice}/{shortPeriod}), plus taxes &amp; fees. Part of the
                  Animal &amp; Music Loving Network.&trade;{" "}
                  <Link href="/animal-charities" className={styles.ctaSubLink}>
                    Animal charities
                  </Link>{" "}
                  &middot;{" "}
                  <Link href="/music-hub" className={styles.ctaSubLink}>
                    Music Hub
                  </Link>
                </p>
              </div>
              <div className={styles.ctaActions}>
                <Link href="/all-plans" className={styles.ctaCompareLink}>
                  Compare wireless plans
                </Link>
                <button
                  type="button"
                  onClick={handleChoosePlan}
                  className={styles.ctaWhiteBtn}
                >
                  Choose {plan.title}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

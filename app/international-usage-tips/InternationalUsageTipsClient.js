"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plane,
  Globe,
  LifeBuoy,
  CheckSquare,
  Smartphone,
  DollarSign,
  ArrowRight,
  Printer,
  AlertTriangle,
  Plus,
  Minus,
  Wifi,
  PhoneOutgoing,
  Cpu,
  Sun,
} from "lucide-react";
import styles from "./InternationalUsageTips.module.css";

const preTravelItems = [
  {
    id: "destination",
    title: "Know where you're going",
    desc: "Countries, border areas, cruises and flights can each have different rules.",
    linkText: "Check a destination",
    href: "/roaming-rates",
  },
  {
    id: "phone-ready",
    title: "Check your phone is ready",
    desc: "Make sure it's unlocked and works on networks abroad. Compatible doesn't mean roaming is included.",
    linkText: "Check compatibility",
    href: "/check-compatibility",
  },
  {
    id: "cost",
    title: "Check what it may cost",
    desc: "Look up approved rates for your plan and destination before you leave.",
    linkText: "Check a destination",
    href: "/roaming-rates",
  },
  {
    id: "safety",
    title: "Plan for safety",
    desc: "Save the local emergency number, your accommodation and consulate details offline.",
  },
  {
    id: "download",
    title: "Download what you'll need",
    desc: "Offline maps, travel documents, and sign-in or recovery codes for your apps.",
  },
  {
    id: "line",
    title: "Know which line you'll use",
    desc: "If you have more than one SIM, check which line handles data and calls.",
  },
  {
    id: "reach-us",
    title: "Save how to reach us",
    desc: "Keep our help center and support number handy.",
    linkText: "Contact support",
    href: "/support",
  },
];

const setupGuides = {
  iPhone: [
    {
      num: 1,
      title: "Choose the right line",
      steps: [
        "Open Settings, then Cellular (or Mobile Data).",
        "If you have two lines, tap the Zoiko line.",
        "Check which line is set for Cellular Data.",
      ],
    },
    {
      num: 2,
      title: "Data roaming",
      steps: [
        "Open Settings > Cellular > Cellular Data Options.",
        "Toggle Data Roaming on only when your plan or pass covers your destination.",
      ],
    },
    {
      num: 3,
      title: "Wi-Fi Calling",
      steps: [
        "Open Settings > Cellular > Wi-Fi Calling.",
        "Toggle Wi-Fi Calling on This iPhone before you leave the U.S.",
      ],
    },
  ],
  "Android & Pixel": [
    {
      num: 1,
      title: "Choose the right line",
      steps: [
        "Open Settings, then Network & internet > SIMs.",
        "Select your Zoiko SIM or eSIM.",
        "Confirm which SIM is set for Mobile data and Calls.",
      ],
    },
    {
      num: 2,
      title: "Data roaming",
      steps: [
        "Open Settings > Network & internet > SIMs > Zoiko.",
        "Toggle Roaming on only if your destination is covered.",
      ],
    },
    {
      num: 3,
      title: "Wi-Fi Calling",
      steps: [
        "Open Settings > Network & internet > SIMs > Zoiko.",
        "Turn on Wi-Fi Calling while still in the U.S.",
      ],
    },
  ],
};

const chargeCards = [
  {
    icon: "plane",
    amber: false,
    title: "Roaming",
    desc: "Using your mobile line on partner networks outside the U.S. Your destination, plan and tier dictate what's included.",
  },
  {
    icon: "phone",
    amber: false,
    title: "Calling overseas",
    desc: "Calling an international number while you're in the U.S. It's separate from roaming, and mobile and landline numbers can differ.",
  },
  {
    icon: "wifi",
    amber: false,
    title: "Wi-Fi Calling",
    desc: "Calls carried over Wi-Fi where it's supported. Availability and charges vary, so it isn't automatically free.",
  },
  {
    icon: "plane",
    amber: false,
    title: "Airplane Mode",
    desc: "Stops normal cellular connections while you use Wi-Fi. It doesn't guarantee every possible charge is blocked.",
  },
  {
    icon: "cpu",
    amber: false,
    title: "Dual SIM",
    desc: "Two active lines can use different paths and rules for data and calls.",
  },
  {
    icon: "sun",
    amber: true,
    title: "Sea, air & satellite",
    desc: "Cruise, in-flight and satellite networks aren't regular country roaming and can be priced very differently.",
  },
];

const helpTopics = [
  {
    id: "sos",
    label: 'No service or "SOS only"',
    tip: "Toggle Airplane Mode on for 15 seconds, then off. Confirm your Zoiko line is active and check whether your destination is covered.",
  },
  {
    id: "data",
    label: "Mobile data isn't working",
    tip: "Verify Cellular Data is set to your Zoiko line and check Data Roaming in Settings only if your plan or pass covers the destination.",
  },
  {
    id: "calls",
    label: "Calls or texts won't go through",
    tip: "Include the full international dialing prefix (+ and country code) and confirm your plan supports calling in your current location.",
  },
  {
    id: "wifi",
    label: "Wi-Fi Calling isn't working",
    tip: "Confirm you are connected to a stable Wi-Fi network and that Wi-Fi Calling was enabled in Settings before leaving the U.S.",
  },
];

const travelFaqs = [
  {
    q: "Will 911 work when I'm abroad?",
    a: "Don't assume it will. Use your destination's local emergency number, or another available way to reach local services.",
  },
  {
    q: "If I turn on Data Roaming, is roaming included?",
    a: "No. Turning on Data Roaming lets your phone connect to partner networks abroad, but whether roaming is included depends on your plan and destination.",
  },
  {
    q: "Does turning off data roaming stop all charges?",
    a: "Turning off Data Roaming stops mobile data roaming, but voice calls, SMS texts, or cruise/in-flight networks can still incur charges unless Airplane Mode is on.",
  },
  {
    q: "Are Wi-Fi calls free?",
    a: "Not always. Whether a Wi-Fi call is charged depends on your line, where you are, and who you are calling.",
  },
  {
    q: "Why is my phone's data counter different from my bill?",
    a: "Your phone's built-in counter tracks local device estimates and reset dates may differ from your Zoiko billing cycle.",
  },
  {
    q: "Do cruises and flights use normal roaming?",
    a: "No. Maritime, in-flight, and satellite networks are separate from standard country roaming and are priced differently.",
  },
  {
    q: "Where can I see rates?",
    a: "All approved roaming and international calling rates are listed in our Check a Destination tool.",
  },
];

export default function InternationalUsageTipsClient() {
  const [checkedMap, setCheckedMap] = useState({});
  const [setupDevice, setSetupDevice] = useState("iPhone");
  const [openSetupIdx, setOpenSetupIdx] = useState(0);
  const [selectedHelpId, setSelectedHelpId] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const renderChargeIcon = (name) => {
    if (name === "plane") return <Plane size={15} strokeWidth={2.2} />;
    if (name === "phone") return <PhoneOutgoing size={15} strokeWidth={2.2} />;
    if (name === "wifi") return <Wifi size={15} strokeWidth={2.2} />;
    if (name === "cpu") return <Cpu size={15} strokeWidth={2.2} />;
    return <Sun size={15} strokeWidth={2.2} />;
  };

  const checkedCount = Object.values(checkedMap).filter(Boolean).length;
  const percent = Math.round((checkedCount / preTravelItems.length) * 100);

  const toggleItem = (id) => {
    setCheckedMap((prev) => ({ ...prev, [id]: !prev[id] }));
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
            <Link href="/travel-plans" className={styles.mobileBreadcrumbLink}>
              International
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.mobileBreadcrumbCurrent}>
              International Usage Tips
            </span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <span className={styles.heroEyebrow}>
                <Plane size={13} strokeWidth={2.2} />
                <span>TRAVEL SMARTER. STAY PREPARED.</span>
              </span>

              <h1 className={styles.heroTitle}>International usage tips</h1>

              <p className={styles.heroSubtitle}>
                Prepare your phone, understand potential charges, and get help
                while traveling.
              </p>

              <div className={styles.heroActions}>
                <Link href="/roaming-rates" className={styles.heroPrimaryBtn}>
                  <Globe size={15} strokeWidth={2.2} />
                  <span>Check a destination</span>
                </Link>

                <Link href="/login" className={styles.heroSecondaryLink}>
                  Sign in for line-specific info
                </Link>
              </div>
            </div>

            <div className={styles.heroVisualWrap}>
              <img
                src="/img/International-Usage-Tips/iut1.png"
                alt="Traveler checking phone at airport"
                className={`${styles.heroImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/International-Usage-Tips/iut8.png"
                alt="Traveler checking smartphone in city"
                className={`${styles.heroImg} ${styles.mobileOnly}`}
              />

              <div className={styles.checklistFloatCard}>
                <span className={styles.checklistFloatEyebrow}>
                  YOUR CHECKLIST
                </span>
                <span className={styles.checklistFloatPercent}>{percent}%</span>
                <p className={styles.checklistFloatSub}>
                  {preTravelItems.length - checkedCount} steps left before you
                  go
                </p>
              </div>
            </div>
          </div>

          <div className={styles.emergencyBar}>
            <LifeBuoy
              size={16}
              strokeWidth={2.2}
              className={styles.emergencyIcon}
            />
            <div>
              <p className={styles.emergencyTitle}>Emergencies abroad</p>
              <p className={styles.emergencyDesc}>
                For emergencies, use your destination&apos;s local emergency
                number or another available way to contact local services. Do
                not assume 911 will work outside the United States.
              </p>
            </div>
          </div>

          <div className={styles.quickNavGrid}>
            <a href="#checklist" className={styles.quickNavCard}>
              <span className={styles.quickNavIconPink}>
                <CheckSquare size={15} strokeWidth={2.2} />
              </span>
              <div>
                <span className={styles.quickNavTitle}>Before you go</span>
                <span className={styles.quickNavSub}>
                  Seven steps to get ready.
                </span>
              </div>
            </a>

            <a href="#phone-setup" className={styles.quickNavCard}>
              <span className={styles.quickNavIconPink}>
                <Smartphone size={15} strokeWidth={2.2} />
              </span>
              <div>
                <span className={styles.quickNavTitle}>Phone setup</span>
                <span className={styles.quickNavSub}>
                  iPhone and Android settings.
                </span>
              </div>
            </a>

            <a href="#understand-charges" className={styles.quickNavCard}>
              <span className={styles.quickNavIconPink}>
                <DollarSign size={15} strokeWidth={2.2} />
              </span>
              <div>
                <span className={styles.quickNavTitle}>Understand charges</span>
                <span className={styles.quickNavSub}>
                  Roaming, calling and Wi-Fi.
                </span>
              </div>
            </a>

            <a href="#get-help" className={styles.quickNavCard}>
              <span className={styles.quickNavIconGreen}>
                <LifeBuoy size={15} strokeWidth={2.2} />
              </span>
              <div>
                <span className={styles.quickNavTitle}>Get help</span>
                <span className={styles.quickNavSub}>
                  Not connecting? Start here.
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1B: YOUR PRE-TRAVEL CHECKLIST */}
      <section id="checklist" className={styles.checklistSection}>
        <div className={styles.container}>
          <div className={styles.checklistGrid}>
            <div>
              <span className={styles.sectionEyebrow}>BEFORE YOU GO</span>
              <h2 className={styles.sectionHeading}>
                Your pre-travel checklist
              </h2>
              <p className={styles.checklistSubtitle}>
                Tick items as you go. Your progress stays on this device only;
                nothing is sent to us.
              </p>

              <div className={styles.progressRow}>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className={styles.progressCount}>
                  {checkedCount}/{preTravelItems.length}
                </span>
              </div>

              <div className={styles.checklistItems}>
                {preTravelItems.map((item) => {
                  const isChecked = Boolean(checkedMap[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`${styles.checklistItemCard} ${
                        isChecked ? styles.checklistItemCardChecked : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className={styles.checklistCheckbox}
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                      />
                      <div>
                        <span className={styles.checklistItemTitle}>
                          {item.title}
                        </span>
                        <p className={styles.checklistItemDesc}>{item.desc}</p>
                        {item.linkText && (
                          <Link
                            href={item.href}
                            className={styles.checklistItemLink}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{item.linkText}</span>
                            <ArrowRight size={12} strokeWidth={2.3} />
                          </Link>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className={styles.checklistActionsRow}>
                <button
                  type="button"
                  className={styles.printBtn}
                  onClick={() => window.print()}
                >
                  <Printer size={14} strokeWidth={2.2} />
                  <span>Print checklist</span>
                </button>
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setCheckedMap({})}
                >
                  Clear ticks
                </button>
              </div>
            </div>

            <div className={styles.checklistCollage}>
              <div className={styles.collageTallWrap}>
                <img
                  src="/img/International-Usage-Tips/iut2.png"
                  alt="Brown canvas travel backpack"
                  className={`${styles.collageTallImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/International-Usage-Tips/iut9.png"
                  alt="Brown canvas travel backpack"
                  className={`${styles.collageTallImg} ${styles.mobileOnly}`}
                />
              </div>

              <div className={styles.collageRightStack}>
                <img
                  src="/img/International-Usage-Tips/iut3.png"
                  alt="Traveler holding smartphone outdoors"
                  className={`${styles.collageTopImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/International-Usage-Tips/iut10.png"
                  alt="Travel sunglasses"
                  className={`${styles.collageTopImg} ${styles.mobileOnly}`}
                />

                <div className={styles.ratesLiveCard}>
                  <h3 className={styles.ratesLiveTitle}>
                    Rates live in one place.
                  </h3>
                  <p className={styles.ratesLiveDesc}>
                    This guide explains; Check a Destination shows approved
                    rates.
                  </p>
                  <Link href="/roaming-rates" className={styles.ratesLiveLink}>
                    <span>Check a destination</span>
                    <ArrowRight size={13} strokeWidth={2.3} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2A: PHONE SETUP */}
      <section id="phone-setup" className={styles.setupSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>PHONE SETUP</span>
          <h2 className={styles.sectionHeading}>
            Set up your phone for international travel
          </h2>
          <p className={styles.setupSubtitle}>
            Menu names vary by model and software version. Steps here are
            guidance, not proof your plan includes roaming.
          </p>

          <div className={styles.deviceTabsRow} role="tablist">
            {Object.keys(setupGuides).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={setupDevice === tab}
                className={`${styles.deviceTabBtn} ${
                  setupDevice === tab ? styles.deviceTabBtnActive : ""
                }`}
                onClick={() => {
                  setSetupDevice(tab);
                  setOpenSetupIdx(0);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.setupGrid}>
            <div>
              <div className={styles.setupWarningBar}>
                <AlertTriangle
                  size={15}
                  strokeWidth={2.2}
                  style={{ color: "#b45309", flexShrink: 0, marginTop: "1px" }}
                />
                <span>
                  Check your destination and plan terms before turning on
                  roaming. Some activity may cost extra.
                </span>
              </div>

              <div className={styles.setupAccordion}>
                {setupGuides[setupDevice].map((item, idx) => {
                  const isOpen = openSetupIdx === idx;
                  return (
                    <div key={item.title} className={styles.setupAccItem}>
                      <button
                        type="button"
                        className={styles.setupAccBtn}
                        aria-expanded={isOpen}
                        onClick={() => setOpenSetupIdx(isOpen ? -1 : idx)}
                      >
                        <span className={styles.setupAccLeft}>
                          <span className={styles.setupAccNum}>
                            {item.num}
                          </span>
                          <span>{item.title}</span>
                        </span>
                        {isOpen ? (
                          <Minus size={15} strokeWidth={2.4} />
                        ) : (
                          <Plus size={15} strokeWidth={2.4} />
                        )}
                      </button>

                      {isOpen && (
                        <ol className={styles.setupAccSteps}>
                          {item.steps.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ol>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className={styles.setupReviewedNote}>
                Manufacturer guidance reviewed November 4, 2025 ·{" "}
                <a
                  href={
                    setupDevice === "iPhone"
                      ? "https://support.apple.com"
                      : "https://support.google.com/pixelphone"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.setupReviewedLink}
                >
                  {setupDevice === "iPhone"
                    ? "Apple Support (opens in a new tab)"
                    : "Google Pixel Help (opens in a new tab)"}
                </a>
              </p>
            </div>

            <div>
              <img
                src="/img/International-Usage-Tips/iut4.png"
                alt="Traveler sitting with suitcase checking smartphone"
                className={`${styles.setupRightImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/International-Usage-Tips/iut11.png"
                alt="Smartphone and notebook on desk"
                className={`${styles.setupRightImg} ${styles.mobileOnly}`}
              />

              <div className={styles.setupInfoCard}>
                <div className={styles.setupInfoHeader}>
                  <Smartphone
                    size={15}
                    strokeWidth={2.2}
                    style={{ color: "#c8104f" }}
                  />
                  <span>Using two SIMs or eSIMs?</span>
                </div>
                <p className={styles.setupInfoText}>
                  Each line can have its own data and calling rules. Check which
                  line your phone uses for mobile data and calls before you
                  travel, so you don&apos;t use the wrong one by accident.
                </p>
              </div>

              <div className={styles.setupInfoCard}>
                <div className={styles.setupInfoHeader}>
                  <Wifi
                    size={15}
                    strokeWidth={2.2}
                    style={{ color: "#15803d" }}
                  />
                  <span>Save data while you&apos;re away</span>
                </div>
                <ul className={styles.setupBulletList}>
                  <li>Download offline maps and travel documents first</li>
                  <li>Turn on Low Data Mode (iPhone) or Data Saver (Android)</li>
                  <li>
                    Stop automatic app updates and backups over mobile data
                  </li>
                  <li>Your phone&apos;s data counter may differ from your bill</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2B: UNDERSTAND CHARGES */}
      <section id="understand-charges" className={styles.chargesSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>UNDERSTAND CHARGES</span>
          <h2 className={styles.sectionHeading} style={{ maxWidth: "520px" }}>
            Know the difference: roaming and international calling
          </h2>
          <p className={styles.chargesSubtitle}>
            This guide explains how charges work. It never shows prices;
            approved rates live in Check a Destination.
          </p>

          <div className={styles.chargesGrid}>
            {chargeCards.map((c) => (
              <div key={c.title} className={styles.chargeCard}>
                <span
                  className={
                    c.amber ? styles.chargeIconAmber : styles.chargeIconPink
                  }
                >
                  {renderChargeIcon(c.icon)}
                </span>
                <h3 className={styles.chargeTitle}>{c.title}</h3>
                <p className={styles.chargeDesc}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.wifiBannerGrid}>
            <img
              src="/img/International-Usage-Tips/iut5.png"
              alt="Traveler checking smartphone in city"
              className={`${styles.wifiBannerImg} ${styles.desktopOnly}`}
            />
            <img
              src="/img/International-Usage-Tips/iut12.png"
              alt="Colorful international market produce"
              className={`${styles.wifiBannerImg} ${styles.mobileOnly}`}
            />

            <div className={styles.wifiBannerCard}>
              <h3 className={styles.wifiBannerTitle}>
                Wi-Fi Calling may still involve charges
              </h3>
              <p className={styles.wifiBannerDesc}>
                Whether a Wi-Fi call is charged depends on your line, where you
                are and who you call. Check before you rely on it, especially
                for long calls.
              </p>
              <Link href="/roaming-rates" className={styles.wifiBannerBtn}>
                Check a destination
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3A: GET HELP ABROAD */}
      <section id="get-help" className={styles.helpSection}>
        <div className={styles.container}>
          <div className={styles.helpGrid}>
            <div>
              <span className={styles.helpEyebrowGreen}>GET HELP ABROAD</span>
              <h2 className={styles.sectionHeading}>
                Not connecting? Start here.
              </h2>
              <p className={styles.helpSubtitle}>
                Answer one question at a time. You can stop as soon as it&apos;s
                fixed.
              </p>

              <img
                src="/img/International-Usage-Tips/iut6.png"
                alt="Traveler with green backpack checking phone at airport"
                className={`${styles.helpImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/International-Usage-Tips/iut13.png"
                alt="London Tower Bridge at sunset"
                className={`${styles.helpImg} ${styles.mobileOnly}`}
              />
            </div>

            <div className={styles.helpCard}>
              <h3 className={styles.helpCardTitle}>What&apos;s happening?</h3>
              <div className={styles.helpOptionsGrid}>
                {helpTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() =>
                      setSelectedHelpId(
                        selectedHelpId === topic.id ? null : topic.id
                      )
                    }
                    className={`${styles.helpOptionBtn} ${
                      selectedHelpId === topic.id
                        ? styles.helpOptionBtnActive
                        : ""
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>

              {selectedHelpId && (
                <div className={styles.helpTipBox}>
                  {helpTopics.find((t) => t.id === selectedHelpId)?.tip}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3B: TRAVEL QUESTIONS, ANSWERED */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>FAQS</span>
          <h2 className={styles.sectionHeading}>Travel questions, answered.</h2>

          <div className={styles.faqGrid}>
            <div className={styles.faqPhotoCard}>
              <img
                src="/img/International-Usage-Tips/iut7.png"
                alt="Customer support agent ready to help with travel questions"
                className={`${styles.faqPhotoImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/International-Usage-Tips/iut14.png"
                alt="Customer support agent ready to help with travel questions"
                className={`${styles.faqPhotoImg} ${styles.mobileOnly}`}
              />
              <div className={styles.faqPhotoFooter}>
                <p className={styles.faqPhotoTitle}>Planning a trip?</p>
                <p className={styles.faqPhotoCaption}>
                  Call 800-988-8116 before you go and we&apos;ll talk it
                  through.
                </p>
              </div>
            </div>

            <div className={styles.faqList}>
              {travelFaqs.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
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
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
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

          {/* Mobile-only Document Metadata Footer */}
          <div className={`${styles.mobileMetaCard} ${styles.mobileOnly}`}>
            <p>
              <strong>Last reviewed:</strong> November 4, 2025
            </p>
            <p>
              <strong>Edition:</strong> 1.0
            </p>
            <p>
              <strong>Owner:</strong> Zoiko Mobile USA Content
            </p>
            <p>
              Content reviews deal with a rule date. Rates come from Check a
              Destination.
            </p>
            <Link href="/contact-us" className={styles.mobileMetaLink}>
              Report a correction
            </Link>
          </div>
          <a
            href="#checklist"
            className={`${styles.mobilePhotoCredits} ${styles.mobileOnly}`}
          >
            &lt; Photo credits
          </a>
        </div>
      </section>
    </div>
  );
}

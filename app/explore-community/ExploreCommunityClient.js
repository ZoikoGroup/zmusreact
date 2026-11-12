"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  PawPrint,
  Music,
  Check,
  Sparkles,
  ArrowRight,
  Info,
  BarChart3,
  ShieldCheck,
  HandHeart,
  Users,
  Calendar,
  CheckCircle2,
  Headphones,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./ExploreCommunity.module.css";

const helpCards = [
  {
    img: "/img/Explore-Community/ec5.png",
    alt: "Cat resting inside a wooden shelter",
    eyebrow: "ADOPT OR FOSTER",
    title: "Give an animal a home",
    steps: [
      "Contact a licensed shelter or rescue near you.",
      "Ask about fostering if you can't adopt long-term.",
      "Plan for food, vet visits and time together.",
    ],
    href: "/animal-charities",
  },
  {
    img: "/img/Explore-Community/ec6.png",
    alt: "Volunteer gardening and maintenance tools on grass",
    eyebrow: "VOLUNTEER",
    title: "Lend a hand locally",
    steps: [
      "Tell us you're interested using the form below.",
      "We'll match you with verified local opportunities.",
      "Every role shows what's involved before you commit.",
    ],
    href: "/animal-charity-worker-registration",
  },
  {
    img: "/img/Explore-Community/ec7.png",
    alt: "Happy dog looking up outdoors",
    eyebrow: "LOST OR FOUND PET",
    title: "Help a pet get home",
    steps: [
      "Check for a collar tag and call the number.",
      "Ask a vet or shelter to scan for a microchip.",
      "Report it to your local animal control or shelter.",
    ],
    href: "/animal-charities",
  },
  {
    img: "/img/Explore-Community/ec8.png",
    alt: "Sunset outdoor illustration",
    eyebrow: "WILDLIFE",
    title: "Look out for wildlife",
    steps: [
      "Keep a safe distance from wild animals.",
      "Call your state wildlife agency for injured animals.",
      "Don't feed wildlife or move young animals.",
    ],
    href: "/animal-charities",
  },
];

const givingSteps = [
  {
    num: 1,
    active: false,
    title: "Zoiko earns",
    desc: "From running a wireless service.",
  },
  {
    num: 2,
    active: true,
    title: "A share is set aside",
    desc: "Zoiko states up to 2% of profits supports animal rescues and wildlife conservation.",
  },
  {
    num: 3,
    active: false,
    title: "Partners receive it",
    desc: "Payments go to verified animal-welfare partners.",
  },
  {
    num: 4,
    active: false,
    title: "Results are checked",
    desc: "Outcomes are verified before we publish them.",
  },
];

const musicItems = [
  {
    img: "/img/Explore-Community/ec10.png",
    alt: "Acoustic guitar resting outdoors",
    title: "Artist profiles",
    desc: "Creators we feature, with permission and rights cleared.",
    badge: "Coming soon",
    badgeStyle: "muted",
    href: "/music-hub",
  },
  {
    img: "/img/Explore-Community/ec11.png",
    alt: "Live music stage with performers and crowd",
    title: "Events & experiences",
    desc: "Concerts and community nights with organizer and terms up front.",
    badge: "See events",
    badgeStyle: "pink",
    href: "/music-hub",
  },
  {
    img: "/img/Explore-Community/ec12.png",
    alt: "Vinyl turntable icon",
    title: "Share your music",
    desc: "Apply for a Spotlight. Every submission is reviewed.",
    badge: "Open for interest",
    badgeStyle: "green",
    href: "/music-hub-registratrion-form",
  },
  {
    img: "/img/Explore-Community/ec13.png",
    alt: "Studio headphones",
    title: "Music Hub benefits",
    desc: "Streaming, storage and creator tools for members.",
    badge: "Not active yet",
    badgeStyle: "muted",
    href: "/music-hub",
  },
];

const interestOptions = [
  {
    id: "volunteer",
    title: "Volunteer",
    desc: "Help at local events and drives.",
    icon: "hand",
  },
  {
    id: "partner",
    title: "Partner with us",
    desc: "For animal rescues and nonprofits.",
    icon: "users",
  },
  {
    id: "music",
    title: "Share my music",
    desc: "Apply for an Artist Spotlight.",
    icon: "music",
  },
  {
    id: "event",
    title: "Host an event",
    desc: "Bring a community event to life.",
    icon: "calendar",
  },
];

const storyFilters = ["All", "Animal welfare", "Music", "Community"];

const faqItems = [
  {
    q: "Do I need to be a Zoiko Mobile customer?",
    a: "No. Anyone can explore, read stories and express interest. If any music benefit is ever just for customers, we'll say so clearly.",
  },
  {
    q: "Does Zoiko donate part of my bill?",
    a: "No. Zoiko Mobile commits up to 2% of company profits to support animal rescues and wildlife conservation, rather than taking a share of your monthly bill.",
  },
  {
    q: "Is expressing interest a commitment?",
    a: "No. Raising your hand simply lets us know what you'd like to hear about or take part in—there is no obligation, cost, or commitment.",
  },
  {
    q: "How do you choose which stories to publish?",
    a: "Every story goes through a verification process: we obtain consent from the people and partners involved, check facts and figures, and publish with a clear source and date.",
  },
  {
    q: "Can I change or delete what I sent?",
    a: "Yes. You can contact us or use the Manage my details option at any time to update, withdraw, or delete your submitted information.",
  },
  {
    q: "Where are the Music Hub perks?",
    a: "Music Hub benefits—such as streaming, storage, and creator tools—are currently being finalized with partners and will appear once terms are confirmed.",
  },
];

export default function ExploreCommunityClient() {
  const [activeStoryFilter, setActiveStoryFilter] = useState("All");
  const [step, setStep] = useState(1);
  const [selectedInterest, setSelectedInterest] = useState("volunteer");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [submittedRequest, setSubmittedRequest] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const renderInterestIcon = (iconName) => {
    if (iconName === "hand") return <HandHeart size={15} strokeWidth={2} />;
    if (iconName === "users") return <Users size={15} strokeWidth={2} />;
    if (iconName === "music") return <Music size={15} strokeWidth={2} />;
    return <Calendar size={15} strokeWidth={2} />;
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterDone(true);
    setNewsletterEmail("");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* SECTION 1A: HERO BANNER */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Mobile-only Breadcrumb */}
          <nav
            className={styles.mobileBreadcrumb}
            aria-label="Breadcrumb"
          >
            <Link href="/" className={styles.mobileBreadcrumbLink}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.mobileBreadcrumbCurrent}>
              Explore Community
            </span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Copy & CTAs */}
            <div className={styles.heroLeft}>
              <div className={styles.heroPill}>
                <span>THE ANIMAL &amp; MUSIC LOVING NETWORK</span>
                <span className={styles.heroPillDot} aria-hidden="true" />
              </div>

              <h1 className={styles.heroTitle}>
                Animals. Music.
                <span className={styles.heroTitleAccent}>Community.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                See what our community is doing for animals and live music, read
                verified stories, and find your way to take part. No account
                needed.
              </p>

              <div className={styles.heroActions}>
                <Link href="/get-involved" className={styles.heroPrimaryBtn}>
                  <span>Get Involved</span>
                  <ChevronRight size={16} strokeWidth={2.5} />
                </Link>

                <Link href="#stories" className={styles.heroSecondaryLink}>
                  Read our stories
                </Link>
              </div>
            </div>

            {/* Right Circular Photo Collage */}
            <div className={styles.heroRight}>
              <div className={styles.collageWrap}>
                <div className={styles.circleBack}>
                  <img
                    src="/img/Explore-Community/ec1.png"
                    alt="Musician playing drums with a dog"
                    className={`${styles.circleImg} ${styles.desktopOnly}`}
                  />
                  <img
                    src="/img/Explore-Community/ec16.png"
                    alt="Happy dog outdoors"
                    className={`${styles.circleImg} ${styles.mobileOnly}`}
                  />
                </div>

                <div className={styles.circleFront}>
                  <img
                    src="/img/Explore-Community/ec2.png"
                    alt="Community members interacting with a puppy"
                    className={`${styles.circleImg} ${styles.desktopOnly}`}
                  />
                  <img
                    src="/img/Explore-Community/ec10.png"
                    alt="Acoustic guitar outdoors"
                    className={`${styles.circleImg} ${styles.mobileOnly}`}
                  />
                </div>

                <div className={styles.heartBadge} aria-hidden="true">
                  <Heart size={24} strokeWidth={2} />
                </div>

                <div className={styles.openBadge}>
                  <span className={styles.openBadgeIcon} aria-hidden="true">
                    <Sparkles size={14} strokeWidth={2.2} />
                  </span>
                  <span>Open to everyone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE-ONLY: ON THIS PAGE NAV BAR */}
      <nav className={styles.mobileOnThisPage} aria-label="On this page">
        <span className={styles.onThisPageLabel}>ON THIS PAGE</span>
        <a
          href="#passions"
          className={`${styles.onThisPageLink} ${styles.onThisPageLinkActive}`}
        >
          <span className={styles.onThisPageIcon} aria-hidden="true">
            <Sparkles size={12} strokeWidth={2.2} />
          </span>
          <span>Animals &amp; music</span>
        </a>
        <a href="#giving" className={styles.onThisPageLink}>
          <span className={styles.onThisPageIcon} aria-hidden="true">
            <BarChart3 size={12} strokeWidth={2.2} />
          </span>
          <span>How giving works</span>
        </a>
        <a href="#music" className={styles.onThisPageLink}>
          <span className={styles.onThisPageIcon} aria-hidden="true">
            <Music size={12} strokeWidth={2.2} />
          </span>
          <span>Music &amp; creators</span>
        </a>
        <a href="#stories" className={styles.onThisPageLink}>
          <span>Stories</span>
        </a>
        <a href="#raise-hand" className={styles.onThisPageLink}>
          <span>Get involved</span>
        </a>
        <a href="#faqs" className={styles.onThisPageLink}>
          <span>FAQs</span>
        </a>
      </nav>

      {/* SECTION 1B: TWO PASSIONS / PICK WHAT MOVES YOU */}
      <section id="passions" className={styles.passionsSection}>
        <div className={styles.container}>
          <div className={styles.passionsHeader}>
            <div>
              <span className={styles.sectionPill}>TWO PASSIONS</span>
              <h2 className={styles.sectionTitle}>Pick what moves you.</h2>
            </div>

            <p className={styles.passionsNote}>
              Each path shows only what&apos;s active and verified today. More
              will appear as it&apos;s confirmed.
            </p>
          </div>

          <div className={styles.passionsGrid}>
            {/* Left Card: Animal Welfare */}
            <div className={styles.passionCard}>
              <img
                src="/img/Explore-Community/ec3.png"
                alt="Cat resting in a wooden shelter"
                className={`${styles.passionCardBg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Explore-Community/ec17.png"
                alt="Cat resting in a wooden shelter"
                className={`${styles.passionCardBg} ${styles.mobileOnly}`}
              />
              <div className={styles.passionCardOverlay} />

              <div className={styles.passionCardContent}>
                <span className={styles.cardCategoryPill}>
                  <PawPrint size={12} strokeWidth={2.2} />
                  <span>ANIMAL WELFARE</span>
                </span>

                <h3 className={styles.cardTitle}>Help animals thrive.</h3>

                <ul className={styles.cardChecklist}>
                  <li className={styles.cardCheckItem}>
                    <span className={styles.checkCircle} aria-hidden="true">
                      <Check size={10} strokeWidth={2.8} />
                    </span>
                    <span>
                      Learn about rescue and wildlife causes we care about
                    </span>
                  </li>
                  <li className={styles.cardCheckItem}>
                    <span className={styles.checkCircle} aria-hidden="true">
                      <Check size={10} strokeWidth={2.8} />
                    </span>
                    <span>Volunteer locally with verified partners</span>
                  </li>
                  <li className={styles.cardCheckItem}>
                    <span className={styles.checkCircle} aria-hidden="true">
                      <Check size={10} strokeWidth={2.8} />
                    </span>
                    <span>Follow how our giving works, step by step</span>
                  </li>
                </ul>

                <Link href="/animal-charities" className={styles.cardCtaBtn}>
                  <span>Explore Animal Welfare</span>
                  <ChevronRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Right Card: Music & Creators */}
            <div className={styles.passionCard}>
              <img
                src="/img/Explore-Community/ec4.png"
                alt="People sitting together watching a live music concert"
                className={`${styles.passionCardBg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Explore-Community/ec18.png"
                alt="Microphone illustration"
                className={`${styles.passionCardBg} ${styles.mobileOnly}`}
              />
              <div className={styles.passionCardOverlay} />

              <div className={styles.passionCardContent}>
                <span className={styles.cardCategoryPill}>
                  <Music size={12} strokeWidth={2.2} />
                  <span>MUSIC &amp; CREATORS</span>
                </span>

                <h3 className={styles.cardTitle}>
                  Celebrate the people who make music.
                </h3>

                <ul className={styles.cardChecklist}>
                  <li className={styles.cardCheckItem}>
                    <span className={styles.checkCircle} aria-hidden="true">
                      <Check size={10} strokeWidth={2.8} />
                    </span>
                    <span>Discover creators and community events</span>
                  </li>
                  <li className={styles.cardCheckItem}>
                    <span className={styles.checkCircle} aria-hidden="true">
                      <Check size={10} strokeWidth={2.8} />
                    </span>
                    <span>Share your music for an Artist Spotlight</span>
                  </li>
                  <li className={styles.cardCheckItem}>
                    <span className={styles.checkCircle} aria-hidden="true">
                      <Check size={10} strokeWidth={2.8} />
                    </span>
                    <span>Music Hub benefits shown once partners confirm</span>
                  </li>
                </ul>

                <Link href="/music-hub" className={styles.cardCtaBtn}>
                  <span>Explore Music &amp; Creators</span>
                  <ChevronRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2A: WAYS TO HELP ANIMALS TODAY */}
      <section className={styles.helpSection}>
        <div className={styles.container}>
          <div className={styles.helpHeader}>
            <span className={styles.sectionPill}>ANIMAL WELFARE</span>
            <h2 className={styles.sectionTitle}>Ways to help animals today.</h2>
            <p className={styles.helpSubtitle}>
              Simple, practical steps anyone can take, whether or not
              you&apos;re a Zoiko customer.
            </p>
          </div>

          <div className={styles.helpGrid}>
            {helpCards.map((card) => (
              <div key={card.eyebrow} className={styles.helpCard}>
                <div className={styles.helpCardImgWrap}>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className={styles.helpCardImg}
                  />
                </div>
                <div className={styles.helpCardBody}>
                  <span className={styles.helpCardEyebrow}>
                    {card.eyebrow}
                  </span>
                  <h3 className={styles.helpCardTitle}>{card.title}</h3>
                  <ol className={styles.helpSteps}>
                    {card.steps.map((step, idx) => (
                      <li key={idx} className={styles.helpStepItem}>
                        <span className={styles.helpStepNum}>{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <Link href={card.href} className={styles.helpDetailsBtn}>
                    More details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2B: HOW GIVING WORKS */}
      <section id="giving" className={styles.givingSection}>
        <div className={styles.container}>
          <div className={styles.givingHeader}>
            <div className={styles.givingHeaderLeft}>
              <span className={styles.sectionPill}>HOW GIVING WORKS</span>
              <h2 className={styles.sectionTitle}>
                From your plan to animal welfare, simply.
              </h2>
            </div>

            <Link
              href="/zoiko-mobile-animal-welfare-partnership"
              className={styles.givingMethodLink}
            >
              <span>Read the full method</span>
              <ArrowRight size={14} strokeWidth={2.2} />
            </Link>
          </div>

          <div className={styles.timelineGrid}>
            {givingSteps.map((step) => (
              <div key={step.num} className={styles.timelineStep}>
                <div
                  className={`${styles.stepCircle} ${
                    step.active ? styles.stepCircleActive : ""
                  }`}
                >
                  {step.num}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.givingNotesGrid}>
            <div className={styles.givingNoteCard}>
              <Info
                size={16}
                strokeWidth={2.2}
                className={styles.givingNoteIcon}
              />
              <div>
                <h4 className={styles.givingNoteTitle}>
                  It&apos;s not a share of your bill
                </h4>
                <p className={styles.givingNoteText}>
                  The commitment is up to 2% of profits, not a fixed amount from
                  each customer.
                </p>
              </div>
            </div>

            <div className={styles.givingNoteCard}>
              <BarChart3
                size={16}
                strokeWidth={2.2}
                className={styles.givingNoteIcon}
              />
              <div>
                <h4 className={styles.givingNoteTitle}>
                  Impact numbers are being prepared
                </h4>
                <p className={styles.givingNoteText}>
                  Every figure we publish will show its period, method, who
                  verified it and when.
                </p>
              </div>
            </div>

            <div className={styles.givingNoteCard}>
              <ShieldCheck
                size={16}
                strokeWidth={2.2}
                className={styles.givingNoteIcon}
              />
              <div>
                <h4 className={styles.givingNoteTitle}>
                  Partners are verified first
                </h4>
                <p className={styles.givingNoteText}>
                  We name partners only after confirming who they are and their
                  permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2C: MUSIC & CREATORS */}
      <section id="music" className={styles.musicSection}>
        <div className={styles.container}>
          <div className={styles.musicGrid}>
            <div>
              <span className={styles.musicPill}>MUSIC &amp; CREATORS</span>
              <h2 className={styles.musicTitle}>
                Where music lovers and makers meet.
              </h2>
              <p className={styles.musicSubtitle}>
                Discover creators and events, or share your own music. Music Hub
                benefits appear here once partner terms are confirmed.
              </p>
              <div className={styles.musicFeatureImgWrap}>
                <img
                  src="/img/Explore-Community/ec9.png"
                  alt="Sunset music festival illustration"
                  className={`${styles.musicFeatureImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/Explore-Community/ec23.png"
                  alt="Sunset music festival illustration"
                  className={`${styles.musicFeatureImg} ${styles.mobileOnly}`}
                />
              </div>
            </div>

            <div className={styles.musicCardsList}>
              {musicItems.map((item) => (
                <div key={item.title} className={styles.musicCardItem}>
                  <img
                    src={item.img}
                    alt={item.alt}
                    className={styles.musicThumb}
                  />
                  <div className={styles.musicCardInfo}>
                    <h3 className={styles.musicCardTitle}>{item.title}</h3>
                    <p className={styles.musicCardDesc}>{item.desc}</p>
                    <span
                      className={
                        item.badgeStyle === "pink"
                          ? styles.statusBadgePink
                          : item.badgeStyle === "green"
                          ? styles.statusBadgeGreen
                          : styles.statusBadgeMuted
                      }
                    >
                      {item.badge}
                    </span>
                    <Link href={item.href} className={styles.musicLearnMore}>
                      <span>Learn more</span>
                      <ArrowRight size={12} strokeWidth={2.4} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3A: REAL STORIES, CAREFULLY CHECKED */}
      <section id="stories" className={styles.storiesSection}>
        <div className={styles.container}>
          <div className={styles.storiesHeader}>
            <div>
              <span className={styles.sectionPill}>STORIES &amp; IMPACT</span>
              <h2 className={styles.sectionTitle}>
                Real stories, carefully checked.
              </h2>
              <p className={`${styles.storiesCountNote} ${styles.desktopOnly}`}>
                No published stories yet.
              </p>
            </div>

            <div
              className={styles.storiesFilterGroup}
              role="tablist"
              aria-label="Filter stories"
            >
              {storyFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={activeStoryFilter === filter}
                  className={`${styles.storiesFilterBtn} ${
                    activeStoryFilter === filter
                      ? styles.storiesFilterBtnActive
                      : ""
                  }`}
                  onClick={() => setActiveStoryFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <p className={`${styles.storiesCountNoteMobile} ${styles.mobileOnly}`}>
            No published stories yet.
          </p>

          <div className={styles.storiesGrid}>
            <div className={styles.storiesImgWrap}>
              <img
                src="/img/Explore-Community/ec14.png"
                alt="Dog sitting on a park bench beside an acoustic guitar"
                className={`${styles.storiesImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Explore-Community/ec28.png"
                alt="Story review workspace"
                className={`${styles.storiesImg} ${styles.mobileOnly}`}
              />
            </div>

            <div className={styles.storiesReviewCard}>
              <h3 className={styles.storiesReviewTitle}>
                Our first stories are being reviewed
              </h3>
              <p className={styles.storiesReviewDesc}>
                Before we publish, every story is fact-checked, approved by the
                people in it, and dated.
              </p>

              <ol className={styles.storiesChecklist}>
                <li className={styles.storiesCheckItem}>
                  <span className={styles.storiesCheckNum}>1</span>
                  <span>Consent from partners and people</span>
                </li>
                <li className={styles.storiesCheckItem}>
                  <span className={styles.storiesCheckNum}>2</span>
                  <span>Facts and figures checked</span>
                </li>
                <li className={styles.storiesCheckItem}>
                  <span className={styles.storiesCheckNum}>3</span>
                  <span>Published with source and date</span>
                </li>
              </ol>

              <a href="#newsletter" className={styles.storiesNotifyBtn}>
                Notify me about new stories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3B: THREE QUICK STEPS TO RAISE YOUR HAND */}
      <section id="raise-hand" className={styles.raiseHandSection}>
        <div className={styles.container}>
          <div className={styles.raiseHandGrid}>
            <div>
              <span className={styles.sectionPill}>GET INVOLVED</span>
              <h2 className={styles.sectionTitle}>
                Three quick steps to raise your hand.
              </h2>
              <p className={styles.raiseHandSubtitle}>
                It&apos;s an expression of interest, not a commitment or a
                donation. It never costs anything.
              </p>

              <div className={styles.raiseHandImgWrap}>
                <img
                  src="/img/Explore-Community/ec15.png"
                  alt="Person with yellow headphones and a cat checking a phone"
                  className={`${styles.raiseHandImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/Explore-Community/ec29.png"
                  alt="Smiling community members outdoors"
                  className={`${styles.raiseHandImg} ${styles.mobileOnly}`}
                />
              </div>

              <ul className={styles.trustList}>
                <li className={styles.trustItem}>
                  <ShieldCheck
                    size={15}
                    strokeWidth={2.2}
                    className={styles.trustIcon}
                  />
                  <span>We only ask for what we need, and say why.</span>
                </li>
                <li className={styles.trustItem}>
                  <CheckCircle2
                    size={15}
                    strokeWidth={2.2}
                    className={styles.trustIcon}
                  />
                  <span>
                    Correct, withdraw or delete your details anytime.
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.stepperCard}>
              <div className={styles.stepperTopRow}>
                <span className={styles.stepperStepLabel}>
                  {step === 1 && "Step 1 of 3: Choose"}
                  {step === 2 && "Step 2 of 3: Your details"}
                  {step === 3 && "Step 3 of 3: Confirm"}
                </span>
                <span className={styles.stepperPercent}>
                  {step === 1 ? "33%" : step === 2 ? "66%" : "100%"}
                </span>
              </div>

              <div className={styles.stepperBarTrack}>
                <div
                  className={styles.stepperBarFill}
                  style={{
                    width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                  }}
                />
              </div>

              {step === 1 && (
                <>
                  <h3 className={styles.stepperQuestion}>
                    What would you like to do?
                  </h3>
                  <div className={styles.optionsGrid}>
                    {interestOptions.map((opt) => {
                      const isSelected = selectedInterest === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedInterest(opt.id)}
                          className={`${styles.optionCard} ${
                            isSelected ? styles.optionCardSelected : ""
                          }`}
                        >
                          <div className={styles.optionCardTop}>
                            <span className={styles.optionIconWrap}>
                              {renderInterestIcon(opt.icon)}
                            </span>
                            <span
                              className={`${styles.optionRadio} ${
                                isSelected ? styles.optionRadioSelected : ""
                              }`}
                            >
                              {isSelected && (
                                <span className={styles.optionRadioDot} />
                              )}
                            </span>
                          </div>
                          <span className={styles.optionTitle}>
                            {opt.title}
                          </span>
                          <span className={styles.optionDesc}>{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className={styles.stepperQuestion}>
                    Tell us how to reach you
                  </h3>
                  <div className={styles.stepFieldsGrid}>
                    <div>
                      <label
                        htmlFor="ec-interest-name"
                        className={styles.stepFieldLabel}
                      >
                        Full name
                      </label>
                      <input
                        id="ec-interest-name"
                        type="text"
                        className={styles.stepFieldInput}
                        placeholder="Your name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ec-interest-email"
                        className={styles.stepFieldLabel}
                      >
                        Email address
                      </label>
                      <input
                        id="ec-interest-email"
                        type="email"
                        className={styles.stepFieldInput}
                        placeholder="you@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className={styles.stepSuccessBox}>
                  {submittedRequest ? (
                    <span>
                      Thank you! Your expression of interest has been noted.
                    </span>
                  ) : (
                    <span>
                      Ready to submit your interest for{" "}
                      <strong>
                        {
                          interestOptions.find(
                            (o) => o.id === selectedInterest
                          )?.title
                        }
                      </strong>
                      {formName ? ` (${formName})` : ""}. Click Continue to
                      confirm.
                    </span>
                  )}
                </div>
              )}

              <div className={styles.stepperActionRow}>
                {step > 1 && !submittedRequest && (
                  <button
                    type="button"
                    className={styles.stepperBackBtn}
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </button>
                )}

                {!submittedRequest ? (
                  <button
                    type="button"
                    className={styles.stepperContinueBtn}
                    onClick={() => {
                      if (step < 3) {
                        setStep(step + 1);
                      } else {
                        setSubmittedRequest(true);
                      }
                    }}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.stepperContinueBtn}
                    onClick={() => {
                      setSubmittedRequest(false);
                      setStep(1);
                      setFormName("");
                      setFormEmail("");
                    }}
                  >
                    Start another
                  </button>
                )}
              </div>

              <div className={styles.stepperFooterRow}>
                <p className={styles.stepperFooterLabel}>
                  Already sent us something?
                </p>
                <div className={styles.stepperFooterBtns}>
                  <Link href="/contact-us" className={styles.stepperOutlineBtn}>
                    Check my request
                  </Link>
                  <Link href="/contact-us" className={styles.stepperOutlineBtn}>
                    Manage my details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3C: NEWSLETTER BANNER */}
      <section id="newsletter" className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterBanner}>
            <div>
              <h2 className={styles.newsletterTitle}>
                Thanks for caring about animals and music.
              </h2>
              <p className={styles.newsletterDesc}>
                Get new stories, events and ways to help. Separate from
                subscriber marketing, and easy to stop.
              </p>
            </div>

            <form
              className={styles.newsletterFormCard}
              onSubmit={handleNewsletterSubmit}
            >
              <label
                htmlFor="ec-newsletter-email"
                className={styles.newsletterLabel}
              >
                Email address
              </label>
              <div className={styles.newsletterInputRow}>
                <input
                  id="ec-newsletter-email"
                  type="email"
                  required
                  className={styles.newsletterInput}
                  placeholder=""
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className={styles.newsletterSubmitBtn}>
                  Get updates
                </button>
              </div>
              <p className={styles.newsletterHelper}>
                {newsletterDone
                  ? "You're subscribed to community updates."
                  : "Unsubscribe anytime."}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 4: FAQS / QUESTIONS, ANSWERED */}
      <section id="faqs" className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div>
              <span className={styles.sectionPill}>FAQS</span>
              <h2 className={styles.faqHeading}>Questions, answered.</h2>

              <div className={styles.faqSupportCard}>
                <span className={styles.faqSupportIcon} aria-hidden="true">
                  <Headphones size={20} strokeWidth={2} />
                </span>
                <div>
                  <p className={styles.faqSupportLabel}>Still curious?</p>
                  <a href="tel:8009888116" className={styles.faqSupportPhone}>
                    800-988-8116
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.faqList}>
              {faqItems.map((item, idx) => {
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
                          <Minus size={14} strokeWidth={2.5} />
                        ) : (
                          <Plus size={14} strokeWidth={2.5} />
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

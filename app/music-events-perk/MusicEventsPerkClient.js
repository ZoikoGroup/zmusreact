"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Music,
  Calendar,
  MapPin,
  CheckCircle,
  Search,
  Sliders,
  Cloud,
  GraduationCap,
  Sparkles,
  Radio,
  Disc,
  Mic,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  Heart,
  Volume2,
} from "lucide-react";
import styles from "./MusicEventsPerk.module.css";

// 6 Events Data matching Figma design
const initialEvents = [
  {
    id: 1,
    title: "[Local live music night]",
    category: "Live music",
    badgeType: "member",
    badgeText: "Member access: check eligibility",
    date: "Sat, Dec 5, 2026 · [7:00 PM CT]",
    location: "Austin, TX",
    accessible: true,
    image: "/img/music-events-perk/event-1.png",
    description: "An intimate evening celebrating Texas indie talent and acoustic songsmiths. Enjoy exclusive reserved seating access for eligible Zoiko members.",
    venue: "The Continental Lounge, Austin, TX",
  },
  {
    id: 2,
    title: "[Community music festival]",
    category: "Festivals",
    badgeType: "info",
    badgeText: "Info only",
    date: "Sat, Dec 12, 2026 · [12:00 PM PT]",
    location: "Sacramento, CA",
    accessible: true,
    image: "/img/music-events-perk/event-2.png",
    description: "All-day community celebration featuring 14 independent acts, food trucks, family areas, and animal charity outreach booths.",
    venue: "Capitol Park Grounds, Sacramento, CA",
  },
  {
    id: 3,
    title: "[Open mic for new artists]",
    category: "Open mic",
    badgeType: "info",
    badgeText: "Info only",
    date: "Thu, Dec 17, 2026 · [8:00 PM ET]",
    location: "Orlando, FL",
    accessible: false,
    image: "/img/music-events-perk/event-3.png",
    description: "Weekly walk-in open mic stage welcoming songwriters, beatmakers, and poets. Sign-ups open at 7:00 PM at the front desk.",
    venue: "Downtown Beats Studio & Cafe, Orlando, FL",
  },
  {
    id: 4,
    title: "[Home studio workshop]",
    category: "Workshops",
    badgeType: "member",
    badgeText: "Member access: check eligibility",
    date: "Sat, Jan 9, 2027 · [2:00 PM CT]",
    location: "Springfield, IL",
    accessible: true,
    image: "/img/music-events-perk/event-4.png",
    description: "Hands-on masterclass in microphone placement, DAW optimization, and vocal tracking with industry sound engineers.",
    venue: "Midwest Creative Arts Center, Springfield, IL",
  },
  {
    id: 5,
    title: "[Acoustic evening]",
    category: "Live music",
    badgeType: "paused",
    badgeText: "No longer available",
    date: "Fri, Jan 15, 2027 · [7:30 PM ET]",
    location: "Dover, DE",
    accessible: false,
    image: "/img/music-events-perk/event-5.png",
    description: "A sold-out acoustic showcase featuring regional touring duos. Check back for upcoming date announcements.",
    venue: "Old State Theater, Dover, DE",
  },
  {
    id: 6,
    title: "[DJ and vinyl session]",
    category: "Workshops",
    badgeType: "info",
    badgeText: "Info only",
    date: "Sat, Jan 23, 2027 · [6:00 PM CT]",
    location: "Austin, TX",
    accessible: true,
    image: "/img/music-events-perk/event-6.png",
    description: "Vinyl crate digging and beat matching workshop led by resident club DJs. Headphone gear provided.",
    venue: "Soundbox Records, Austin, TX",
  },
];

// 6 FAQs matching Figma design
const faqsData = [
  {
    question: "Does my plan include music perks automatically?",
    answer: "No. Each perk has its own eligibility rules. Sign in to see which perks your account can use, and why if one isn’t available.",
  },
  {
    question: "Does eligibility guarantee a ticket?",
    answer: "Eligibility confirms you can claim or purchase special access codes or presale perks. Because venue capacities are limited, tickets are fulfilled on a first-come, first-served basis.",
  },
  {
    question: "Who sells the tickets?",
    answer: "Tickets are sold directly by authorized venue partners, box offices, or verified third-party ticketing platforms. Zoiko provides verified access codes and exclusive community allocations.",
  },
  {
    question: "Is there an age limit for events?",
    answer: "Age policies vary by venue and are clearly noted on each event’s detail page (e.g. All Ages, 18+, or 21+).",
  },
  {
    question: "How does the Artist Spotlight work?",
    answer: "Musicians and creators can submit an application with streaming links. Our editorial team reviews every submission by hand, and approved artists receive dedicated showcase features and community promotion.",
  },
  {
    question: "Something went wrong with my claim. What now?",
    answer: "Call 800-988-8116 or open a support case through your account. Our support team verifies claim logs and resolves access issues promptly.",
  },
];

export default function MusicEventsPerkClient() {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cityQuery, setCityQuery] = useState("");
  const [whenFilter, setWhenFilter] = useState("Any date");
  const [stepFreeOnly, setStepFreeOnly] = useState(false);

  // Spotlight application state
  const [spotlightForm, setSpotlightForm] = useState({
    stageName: "",
    email: "",
    city: "",
    genre: "Select a genre",
    link: "",
    bio: "",
    agreeTerms: false,
    optionalEmail: false,
  });
  const [spotlightSubmitted, setSpotlightSubmitted] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [interests, setInterests] = useState(["Events near me"]);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Modal state
  const [activeEventModal, setActiveEventModal] = useState(null);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((ev) => {
      if (selectedCategory !== "All" && ev.category !== selectedCategory) return false;
      if (stepFreeOnly && !ev.accessible) return false;
      if (cityQuery.trim() !== "") {
        const query = cityQuery.toLowerCase();
        const matchTitle = ev.title.toLowerCase().includes(query);
        const matchLoc = ev.location.toLowerCase().includes(query);
        const matchCat = ev.category.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchCat) return false;
      }
      return true;
    });
  }, [selectedCategory, cityQuery, stepFreeOnly]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setCityQuery("");
    setWhenFilter("Any date");
    setStepFreeOnly(false);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSpotlightSubmit = (e) => {
    e.preventDefault();
    if (!spotlightForm.agreeTerms) {
      alert("Please accept the Spotlight terms to submit your application.");
      return;
    }
    setSpotlightSubmitted(true);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterConsent) {
      alert("Please confirm consent to receive updates.");
      return;
    }
    setNewsletterSuccess(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Music size={13} className={styles.heroBadgeIcon} />
              <span>ZOIKO MUSIC COMMUNITY</span>
            </div>
            <h1 className={styles.heroHeading}>
              More than wireless. <br />
              <span className={styles.highlightPink}>A stage for connection.</span>
            </h1>
            <p className={styles.heroDescription}>
              Discover live music, see the perks you can actually use, and share your sound with the Animal &amp;
              Music Loving Network.™
            </p>
            <div className={styles.heroActions}>
              <button onClick={() => scrollToSection("events")} className={styles.btnPrimary}>
                Explore events
              </button>
              <button onClick={() => scrollToSection("perks")} className={styles.btnSecondaryWhite}>
                View my perks
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 HERO FEATURE CARDS OVERLAPPING HERO BOTTOM */}
      <section className={styles.heroFeatureCardsSection}>
        <div className={styles.container}>
          <div className={styles.heroFeatureGrid}>
            {/* Card 1: Events */}
            <div className={styles.featureCard}>
              <div className={styles.featureImgWrapper}>
                <img
                  src="/img/music-events-perk/card-events.png"
                  alt="Live music near you"
                  className={styles.featureImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <span className={styles.featureCategory}>EVENTS</span>
                <h3 className={styles.featureTitle}>Live music near you</h3>
                <p className={styles.featureDesc}>
                  Concerts, festivals and community nights, with the terms up front.
                </p>
                <button onClick={() => scrollToSection("events")} className={styles.featureLink}>
                  Explore →
                </button>
              </div>
            </div>

            {/* Card 2: Perks */}
            <div className={styles.featureCard}>
              <div className={styles.featureImgWrapper}>
                <img
                  src="/img/music-events-perk/card-perks.png"
                  alt="Perks you can use"
                  className={styles.featureImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <span className={styles.featureCategory}>MEMBER PERKS</span>
                <h3 className={styles.featureTitle}>Perks you can use</h3>
                <p className={styles.featureDesc}>
                  See which music perks your account is eligible for right now.
                </p>
                <button onClick={() => scrollToSection("perks")} className={styles.featureLink}>
                  Explore →
                </button>
              </div>
            </div>

            {/* Card 3: Artists */}
            <div className={styles.featureCard}>
              <div className={styles.featureImgWrapper}>
                <img
                  src="/img/music-events-perk/card-artists.png"
                  alt="Share your sound"
                  className={styles.featureImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <span className={styles.featureCategory}>ARTISTS &amp; CREATORS</span>
                <h3 className={styles.featureTitle}>Share your sound</h3>
                <p className={styles.featureDesc}>Apply for an Artist Spotlight and connect with fans.</p>
                <button onClick={() => scrollToSection("spotlight")} className={styles.featureLink}>
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MUSIC LIVES EVERYWHERE YOU GO */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.galleryHeaderRow}>
            <div>
              <span className={styles.sectionBadge}>The Animal &amp; Music Loving Network.™</span>
              <h2 className={styles.sectionTitle}>Music lives everywhere you go.</h2>
            </div>
            <p className={styles.sectionSubtitle} style={{ marginBottom: 0, maxWidth: "460px" }}>
              From the first chord to the last encore, stay connected to the sounds, people and pets you love.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {/* Play (Tall) */}
            <div className={styles.galleryItemPlay}>
              <img
                src="/img/music-events-perk/gallery-play.png"
                alt="Play guitar"
                className={styles.galleryImg}
              />
              <span className={styles.galleryPill}>Play</span>
            </div>

            {/* Listen (Headphones) */}
            <div className={styles.galleryItemListen}>
              <img
                src="/img/music-events-perk/gallery-share.png"
                alt="Listen headphones"
                className={styles.galleryImg}
              />
              <span className={styles.galleryPill}>Listen</span>
            </div>

            {/* Share (Speakers) */}
            <div className={styles.galleryItemShare}>
              <img
                src="/img/music-events-perk/gallery-listen.png"
                alt="Share speakers"
                className={styles.galleryImg}
              />
              <span className={styles.galleryPill}>Share</span>
            </div>

            {/* Care (Dog & vet) */}
            <div className={styles.galleryItemCare}>
              <img
                src="/img/music-events-perk/gallery-care.png"
                alt="Care animal welfare"
                className={styles.galleryImg}
              />
              <span className={styles.galleryPill}>Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FIND LIVE MUSIC (EVENTS DIRECTORY) */}
      <section id="events" className={styles.eventsSection}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>Events &amp; experiences</span>
          <h2 className={styles.sectionTitle}>Find live music.</h2>
          <p className={styles.sectionSubtitle}>
            Every listing shows who runs it, where it is, and how access works before you take any step.
          </p>

          {/* Filter Card */}
          <div className={styles.filterCard}>
            {/* Category pills */}
            <div className={styles.filterPillsRow}>
              {["All", "Live music", "Festivals", "Open mic", "Workshops"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterPill} ${
                    selectedCategory === cat ? styles.filterPillActive : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search, Date, Accessibility, Reset */}
            <div className={styles.filterInputsRow}>
              <div className={styles.filterInputGroup}>
                <label className={styles.filterLabel}>City or ZIP</label>
                <input
                  type="text"
                  placeholder="e.g. Austin"
                  value={cityQuery}
                  onChange={(e) => setCityQuery(e.target.value)}
                  className={styles.filterInput}
                />
              </div>

              <div className={styles.filterInputGroup}>
                <label className={styles.filterLabel}>When</label>
                <select
                  value={whenFilter}
                  onChange={(e) => setWhenFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="Any date">Any date</option>
                  <option value="This weekend">This weekend</option>
                  <option value="Next 30 days">Next 30 days</option>
                </select>
              </div>

              <label className={styles.accessibleCheckbox}>
                <input
                  type="checkbox"
                  checked={stepFreeOnly}
                  onChange={(e) => setStepFreeOnly(e.target.checked)}
                  style={{ accentColor: "#D81B60", width: "16px", height: "16px" }}
                />
                <span>Step-free access</span>
              </label>

              {(selectedCategory !== "All" || cityQuery || whenFilter !== "Any date" || stepFreeOnly) && (
                <button type="button" onClick={handleResetFilters} className={styles.resetBtn}>
                  Reset
                </button>
              )}
            </div>

            <div className={styles.eventsCountText}>{filteredEvents.length} events found</div>
          </div>

          {/* 4-column Events Grid */}
          <div className={styles.eventsGrid}>
            {filteredEvents.map((ev) => (
              <div key={ev.id} className={styles.eventCard}>
                <div className={styles.eventImgWrapper}>
                  <img src={ev.image} alt={ev.title} className={styles.eventImg} />
                  <div className={styles.eventBadgesRow}>
                    <span
                      className={
                        ev.badgeType === "member"
                          ? styles.badgePink
                          : ev.badgeType === "paused"
                          ? styles.badgeDark
                          : styles.badgeWhite
                      }
                    >
                      {ev.badgeText}
                    </span>
                    <span className={styles.badgeSample}>Sample listing</span>
                  </div>
                </div>

                <div className={styles.eventCardContent}>
                  <span className={styles.eventCategory}>{ev.category}</span>
                  <h3 className={styles.eventTitle}>{ev.title}</h3>

                  <div className={styles.eventMetaItem}>
                    <Calendar size={15} color="#D81B60" style={{ flexShrink: 0 }} />
                    <span>{ev.date}</span>
                  </div>

                  <div className={styles.eventMetaItem}>
                    <MapPin size={15} color="#D81B60" style={{ flexShrink: 0 }} />
                    <span>{ev.location}</span>
                  </div>

                  {ev.accessible && (
                    <div className={styles.eventAccessibleBadge}>
                      <CheckCircle size={15} color="#059669" />
                      <span>Step-free venue access</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveEventModal(ev)}
                    className={styles.eventViewBtn}
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PERKS YOU CAN ACTUALLY USE */}
      <section id="perks" className={styles.perksSection}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>My music perks</span>
          <h2 className={styles.sectionTitle}>Perks you can actually use.</h2>
          <p className={styles.sectionSubtitle}>
            An active plan doesn’t automatically include a perk. We check each one for your account before you
            claim.
          </p>

          <div className={styles.perksSplitCard}>
            <div className={styles.perksContentCol}>
              <h3 className={styles.perksTitle}>Sign in to see your perks</h3>
              <p className={styles.perksDesc}>
                We’ll show which perks are available for your account, and why if one isn’t. You’ll come
                straight back here.
              </p>
              <button
                type="button"
                onClick={() => alert("Please sign in to your Zoiko Mobile account to view personalized music perks.")}
                className={styles.btnWhitePink}
              >
                Sign in (preview)
              </button>
            </div>
            <div className={styles.perksImgCol}>
              <img
                src="/img/music-events-perk/perks-students.png"
                alt="Friends and music fans enjoying community perks"
                className={styles.perksImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. MUSIC HUB PROGRAMS */}
      <section className={styles.programsSection}>
        <div className={styles.container}>
          <span className={`${styles.sectionBadge} ${styles.sectionBadgeLight}`}>Music Hub programs</span>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
            What we’re building for music lovers.
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.sectionSubtitleLight}`}>
            We only switch a program on once its partner, terms and fulfillment are confirmed. Until then,
            it’s shown here as on its way.
          </p>

          <div className={styles.programsGrid}>
            {/* 1 */}
            <div className={styles.programCard}>
              <Music className={styles.programIcon} />
              <h3 className={styles.programTitle}>Streaming service trials</h3>
              <p className={styles.programDesc}>Partner trials with listed terms.</p>
              <span className={styles.programStatusPill}>Not currently available</span>
            </div>

            {/* 2 */}
            <div className={styles.programCard}>
              <Sliders className={styles.programIcon} />
              <h3 className={styles.programTitle}>Creator tools</h3>
              <p className={styles.programDesc}>Discounts on recording and production tools.</p>
              <span className={styles.programStatusPill}>Not currently available</span>
            </div>

            {/* 3 */}
            <div className={styles.programCard}>
              <Cloud className={styles.programIcon} />
              <h3 className={styles.programTitle}>Creator cloud storage</h3>
              <p className={styles.programDesc}>Storage for your tracks and stems.</p>
              <span className={styles.programStatusPill}>Not currently available</span>
            </div>

            {/* 4 */}
            <div className={styles.programCard}>
              <GraduationCap className={styles.programIcon} />
              <h3 className={styles.programTitle}>Musician &amp; student discount</h3>
              <p className={styles.programDesc}>A discount for musicians and music students.</p>
              <span className={styles.programStatusPill}>Not currently available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ARTIST SPOTLIGHT */}
      <section id="spotlight" className={styles.spotlightSection}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>Artist Spotlight</span>
          <h2 className={styles.sectionTitle}>Share your sound with our community.</h2>
          <p className={styles.sectionSubtitle}>
            Approved artists appear here only with their permission. Sponsored features are always labeled.
          </p>

          {/* 3 Artist Profile Cards with Vector Art */}
          <div className={styles.spotlightCardsRow}>
            {/* Profile 1 - Guitarist on Pink Sun */}
            <div className={styles.spotlightProfileCard}>
              <div className={styles.spotlightVectorArt}>
                <svg viewBox="0 0 320 180" className={styles.spotlightSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FF4655" stopOpacity="1" />
                      <stop offset="60%" stopColor="#EE2836" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#C81D5E" stopOpacity="0.4" />
                    </radialGradient>
                    <linearGradient id="spotlightRay" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="180" fill="#200424" />
                  <polygon points="120,0 200,0 270,180 50,180" fill="url(#spotlightRay)" />
                  <circle cx="160" cy="95" r="58" fill="url(#sunGlow)" />
                  {/* Guitarist silhouette */}
                  <circle cx="160" cy="58" r="13" fill="#140117" />
                  <path d="M148,74 C148,68 172,68 172,74 L176,145 L144,145 Z" fill="#140117" />
                  <path d="M132,90 Q146,85 170,94 Q188,100 190,114 Q187,126 172,124 Q148,122 135,112 Z" fill="#140117" />
                  <line x1="118" y1="84" x2="196" y2="116" stroke="#EE2836" strokeWidth="2.5" />
                  <circle cx="158" cy="104" r="5" fill="#EE2836" />
                </svg>
              </div>
              <div className={styles.spotlightProfileContent}>
                <span className={styles.eventCategory}>Singer-songwriter</span>
                <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1E041C" }}>
                  [Approved artist profile]
                </h4>
                <p style={{ fontSize: "14px", color: "#6C5E6E" }}>
                  Appears after consent and editorial review.
                </p>
              </div>
            </div>

            {/* Profile 2 - Vinyl on Turntable */}
            <div className={styles.spotlightProfileCard}>
              <div className={styles.spotlightVectorArt}>
                <svg viewBox="0 0 320 180" className={styles.spotlightSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="turntableGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#200424" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="320" height="180" fill="#200424" />
                  <rect x="45" y="16" width="230" height="148" rx="18" fill="#2B0530" stroke="#481050" strokeWidth="2" />
                  <circle cx="145" cy="90" r="58" fill="url(#turntableGlow)" />
                  <circle cx="145" cy="90" r="52" fill="#120215" stroke="#25042A" strokeWidth="1" />
                  <circle cx="145" cy="90" r="44" stroke="#2A0530" strokeWidth="1" strokeDasharray="5,2" />
                  <circle cx="145" cy="90" r="36" stroke="#2A0530" strokeWidth="1" strokeDasharray="8,3" />
                  <circle cx="145" cy="90" r="28" stroke="#2A0530" strokeWidth="1" />
                  <circle cx="145" cy="90" r="18" fill="#EE2836" />
                  <circle cx="145" cy="90" r="4" fill="#120215" />
                  <circle cx="235" cy="42" r="8" fill="#581564" stroke="#8A259C" strokeWidth="1.5" />
                  <path d="M235,42 L208,98 L184,90" stroke="#E2D7E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="180" y="86" width="10" height="8" rx="2" fill="#EE2836" />
                </svg>
              </div>
              <div className={styles.spotlightProfileContent}>
                <span className={styles.eventCategory}>DJ &amp; producer</span>
                <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1E041C" }}>
                  [Approved artist profile]
                </h4>
                <p style={{ fontSize: "14px", color: "#6C5E6E" }}>
                  Appears after consent and editorial review.
                </p>
              </div>
            </div>

            {/* Profile 3 - Microphone with Stage Spotlight */}
            <div className={styles.spotlightProfileCard}>
              <div className={styles.spotlightVectorArt}>
                <svg viewBox="0 0 320 180" className={styles.spotlightSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="micGlow" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#EE2836" stopOpacity="0.85" />
                      <stop offset="45%" stopColor="#8E0E38" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#200424" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="micLight" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#EE2836" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#EE2836" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="180" fill="#200424" />
                  <polygon points="135,0 185,0 230,180 90,180" fill="url(#micLight)" />
                  <circle cx="160" cy="78" r="55" fill="url(#micGlow)" />
                  <path d="M125,64 A 25 25 0 0 0 125,92" stroke="#EE2836" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
                  <path d="M115,52 A 40 40 0 0 0 115,104" stroke="#EE2836" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
                  <path d="M195,64 A 25 25 0 0 1 195,92" stroke="#EE2836" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
                  <path d="M205,52 A 40 40 0 0 1 205,104" stroke="#EE2836" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
                  <line x1="160" y1="0" x2="160" y2="46" stroke="#E2D7E0" strokeWidth="3" />
                  <rect x="146" y="46" width="28" height="44" rx="14" fill="#120215" stroke="#E2D7E0" strokeWidth="2.5" />
                  <line x1="148" y1="60" x2="172" y2="60" stroke="#EE2836" strokeWidth="1.5" />
                  <line x1="148" y1="68" x2="172" y2="68" stroke="#EE2836" strokeWidth="1.5" />
                  <line x1="160" y1="48" x2="160" y2="80" stroke="#EE2836" strokeWidth="1.5" />
                  <circle cx="160" cy="68" r="23" stroke="#8A259C" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className={styles.spotlightProfileContent}>
                <span className={styles.eventCategory}>Spoken word &amp; vocals</span>
                <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1E041C" }}>
                  [Approved artist profile]
                </h4>
                <p style={{ fontSize: "14px", color: "#6C5E6E" }}>
                  Appears after consent and editorial review.
                </p>
              </div>
            </div>
          </div>

          {/* Form and Image Section */}
          <div className={styles.spotlightApplicationGrid}>
            {/* Form */}
            <div className={styles.spotlightFormCard}>
              <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#1E041C", marginBottom: "20px" }}>
                Apply for a Spotlight
              </h3>

              <form onSubmit={handleSpotlightSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label className={styles.filterLabel}>Artist or stage name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Luna Sol"
                      value={spotlightForm.stageName}
                      onChange={(e) => setSpotlightForm({ ...spotlightForm, stageName: e.target.value })}
                      className={styles.filterInput}
                    />
                  </div>
                  <div>
                    <label className={styles.filterLabel}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="artist@example.com"
                      value={spotlightForm.email}
                      onChange={(e) => setSpotlightForm({ ...spotlightForm, email: e.target.value })}
                      className={styles.filterInput}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label className={styles.filterLabel}>City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Austin, TX"
                      value={spotlightForm.city}
                      onChange={(e) => setSpotlightForm({ ...spotlightForm, city: e.target.value })}
                      className={styles.filterInput}
                    />
                  </div>
                  <div>
                    <label className={styles.filterLabel}>Main genre</label>
                    <select
                      value={spotlightForm.genre}
                      onChange={(e) => setSpotlightForm({ ...spotlightForm, genre: e.target.value })}
                      className={styles.filterSelect}
                    >
                      <option value="Select a genre">Select a genre</option>
                      <option value="Singer-songwriter">Singer-songwriter</option>
                      <option value="Indie / Alternative">Indie / Alternative</option>
                      <option value="Hip-hop / R&B">Hip-hop / R&B</option>
                      <option value="Electronic / DJ">Electronic / DJ</option>
                      <option value="Acoustic / Folk">Acoustic / Folk</option>
                      <option value="Rock">Rock</option>
                      <option value="Spoken word & vocals">Spoken word &amp; vocals</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label className={styles.filterLabel}>Link to your music</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={spotlightForm.link}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, link: e.target.value })}
                    className={styles.filterInput}
                  />
                  <span style={{ fontSize: "12px", color: "#6C5E6E", marginTop: "4px", display: "block" }}>
                    A streaming, video or personal site URL (https://…).
                  </span>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label className={styles.filterLabel}>Short bio</label>
                  <textarea
                    rows={3}
                    maxLength={300}
                    required
                    placeholder="Tell our community about your sound, roots, and inspirations..."
                    value={spotlightForm.bio}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, bio: e.target.value })}
                    className={styles.filterInput}
                    style={{ resize: "vertical" }}
                  />
                  <div style={{ textAlign: "right", fontSize: "12px", color: "#8C7D8F", marginTop: "4px" }}>
                    {spotlightForm.bio.length} / 300 characters
                  </div>
                </div>

                <label style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#1E041C", marginBottom: "12px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={spotlightForm.agreeTerms}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, agreeTerms: e.target.checked })}
                    style={{ accentColor: "#D81B60", marginTop: "2px" }}
                  />
                  <span>
                    I own or have permission to share this music, name and any images, and I agree to the{" "}
                    <Link href="/terms" style={{ color: "#D81B60", textDecoration: "underline", fontWeight: 700 }}>
                      Spotlight terms
                    </Link>
                    .
                  </span>
                </label>

                <label style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#1E041C", marginBottom: "20px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={spotlightForm.optionalEmail}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, optionalEmail: e.target.checked })}
                    style={{ accentColor: "#D81B60", marginTop: "2px" }}
                  />
                  <span>Optional: email me about future artist opportunities.</span>
                </label>

                <button type="submit" className={styles.btnPrimary} style={{ width: "100%" }}>
                  Submit application
                </button>

                {spotlightSubmitted && (
                  <div style={{ marginTop: "16px", padding: "14px", background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "12px", color: "#166534", fontSize: "14px", fontWeight: 600 }}>
                    ✓ Thank you! Your application has been received. Our music editorial team reviews submissions weekly and will follow up at {spotlightForm.email}.
                  </div>
                )}
              </form>
            </div>

            {/* Right side photo and reassurance */}
            <div className={styles.spotlightSideCol}>
              <img
                src="/img/music-events-perk/spotlight-desk.png"
                alt="Artist creative desk"
                className={styles.spotlightSideImg}
              />

              <div className={styles.spotlightChecklist}>
                <div className={styles.spotlightCheckItem}>
                  <ShieldCheck size={18} color="#D81B60" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>We review every application by hand. Nothing is published automatically.</span>
                </div>
                <div className={styles.spotlightCheckItem}>
                  <ShieldCheck size={18} color="#D81B60" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>You can ask us to update or remove your profile at any time.</span>
                </div>
                <div className={styles.spotlightCheckItem}>
                  <ShieldCheck size={18} color="#D81B60" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>We never ask for ID documents for a Spotlight.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONNECTIONS THAT MATTER */}
      <section className={styles.connectionsSection}>
        <div className={styles.container}>
          <div className={styles.connectionsBanner}>
            <img
              src="/img/music-events-perk/connection-dog.png"
              alt="Happy dog outdoors"
              className={styles.connectionsImg}
            />
            <div className={styles.connectionsContent}>
              <span className={styles.sectionBadge}>Animals &amp; music</span>
              <h2 className={styles.sectionTitle}>Connections that matter.</h2>
              <p className={styles.sectionSubtitle}>
                The Animal &amp; Music Loving Network.™ brings together people who care about animals and live for
                music.
              </p>
              <Link href="/animal-charities" className={styles.btnDarkPlum}>
                Learn about our animal-welfare work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GET MUSIC AND EVENT UPDATES (NEWSLETTER) */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterBanner}>
            <div className={styles.newsletterTextCol}>
              <h2 className={styles.newsletterTitle}>
                Get music and event updates
              </h2>
              <p className={styles.newsletterSubtitle}>
                New events near you, member perks and artist opportunities. Unsubscribe anytime.
              </p>
            </div>

            <div className={styles.newsletterWhiteBox}>
              <form onSubmit={handleNewsletterSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label className={styles.filterLabel}>Email address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className={styles.filterInput}
                  />
                </div>

                <div>
                  <label className={styles.filterLabel}>I’m interested in</label>
                  <div className={styles.newsletterPillsGroup}>
                    {["Events near me", "Member perks", "Artist opportunities"].map((item) => {
                      const isChecked = interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleToggleInterest(item)}
                          className={`${styles.newsletterPillBtn} ${
                            isChecked ? styles.newsletterPillBtnActive : ""
                          }`}
                        >
                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "4px",
                              border: isChecked ? "none" : "1.5px solid #8C7D8F",
                              background: isChecked ? "#D81B60" : "transparent",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#FFFFFF",
                              fontSize: "10px",
                            }}
                          >
                            {isChecked && "✓"}
                          </span>
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#1E041C", marginBottom: "20px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    style={{ accentColor: "#D81B60", marginTop: "2px" }}
                  />
                  <span>
                    Yes, email me Zoiko Mobile music updates. This is separate from any program sign-up.{" "}
                    <Link href="/privacy" style={{ color: "#D81B60", textDecoration: "underline", fontWeight: 700 }}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button type="submit" className={styles.btnPrimary} style={{ width: "100%", padding: "14px" }}>
                  Get updates
                </button>

                {newsletterSuccess && (
                  <div style={{ marginTop: "14px", padding: "12px", background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "12px", color: "#166534", fontSize: "14px", fontWeight: 600 }}>
                    ✓ Subscribed! You will receive music and event notifications at {newsletterEmail}.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQS */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>FAQs</span>
          <h2 className={styles.sectionTitle}>Music, events and perks.</h2>

          <div className={styles.faqGrid}>
            {/* Left Card */}
            <div>
              <div className={styles.faqTroubleCard}>
                <img
                  src="/img/music-events-perk/faq-headphones.png"
                  alt="Headphones"
                  className={styles.faqHeadphonesImg}
                />
                <div className={styles.faqTroubleContent}>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#1E041C", marginBottom: "6px" }}>
                    Trouble with a claim?
                  </h4>
                  <p style={{ fontSize: "14px", color: "#554A58", lineHeight: 1.55 }}>
                    Call 800-988-8116 or open a support case. We’ll never issue a code twice.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Accordion List */}
            <div className={styles.faqAccordionList}>
              {faqsData.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`${styles.faqAccordionItem} ${isOpen ? styles.faqAccordionItemOpen : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className={styles.faqQuestionBtn}
                    >
                      <span>{faq.question}</span>
                      <span className={styles.faqToggleIcon}>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <div className={styles.faqAnswer}>{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.photoCreditsNote}>
            <strong>Photo credits:</strong> Zoiko Music Community verified artist archives, partner venues, and
            approved music creators. All photos used with permission.
          </div>
        </div>
      </section>

      {/* 10. MODAL: EVENT DETAILS */}
      {activeEventModal && (
        <div className={styles.modalBackdrop} onClick={() => setActiveEventModal(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eventCategory}>{activeEventModal.category}</span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1E041C" }}>
                  {activeEventModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveEventModal(null)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div style={{ marginBottom: "18px", borderRadius: "16px", overflow: "hidden", height: "200px" }}>
                <img
                  src={activeEventModal.image}
                  alt={activeEventModal.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div style={{ background: "#FAF7F9", padding: "16px", borderRadius: "14px", marginBottom: "20px", fontSize: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div><strong>When:</strong> {activeEventModal.date}</div>
                <div><strong>Where:</strong> {activeEventModal.venue}</div>
                <div><strong>City:</strong> {activeEventModal.location}</div>
                <div><strong>Access type:</strong> {activeEventModal.badgeText}</div>
                <div>
                  <strong>Venue Accessibility:</strong>{" "}
                  {activeEventModal.accessible ? "Step-free venue access confirmed" : "Standard venue access"}
                </div>
              </div>

              <p style={{ fontSize: "15px", color: "#554A58", lineHeight: 1.6, marginBottom: "24px" }}>
                {activeEventModal.description}
              </p>

              <button
                type="button"
                onClick={() => {
                  alert(`Thank you for your interest in ${activeEventModal.title}. Sign in to check eligibility for member ticket presales.`);
                  setActiveEventModal(null);
                }}
                className={styles.btnPrimary}
                style={{ width: "100%" }}
              >
                Check Member Eligibility &amp; Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

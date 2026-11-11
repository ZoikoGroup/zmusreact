"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Music,
  Hand,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle,
  CircleCheck,
  Search,
  Info,
  ShieldCheck,
  Headphones,
  X,
} from "lucide-react";
import styles from "./GetInvolved.module.css";

// 6 Opportunities data matching user design exactly
const initialOpportunities = [
  {
    id: 1,
    title: "[Weekend shelter helper]",
    organizer: "[Approved animal shelter]",
    cause: "Animal welfare",
    status: "Open for interest",
    statusType: "open",
    schedule: "Saturdays · [10:00 AM–1:00 PM CT]",
    location: "Austin, TX · In person",
    locationType: "In person",
    accessible: true,
    image: "/img/get-involved/opp-1.png",
    description: "Assist shelter staff with walking rescue dogs, cleaning enclosures, socializing cats, and preparing nutrition bowls.",
    requirements: "Ages 18+. Must be comfortable with animals of all sizes. Orientation provided.",
  },
  {
    id: 2,
    title: "[Foster-care information session]",
    organizer: "[Approved rescue partner]",
    cause: "Animal welfare",
    status: "Details coming soon",
    statusType: "coming",
    schedule: "[Date to be announced]",
    location: "Online",
    locationType: "Online",
    accessible: true,
    image: "/img/get-involved/opp-2.png",
    description: "Learn what it takes to foster a rescue pet temporarily in your home. All veterinary care and food are covered by our rescue partner.",
    requirements: "No pet care experience required. Open to renters and homeowners alike.",
  },
  {
    id: 3,
    title: "[Community concert volunteer]",
    organizer: "[Approved event organizer]",
    cause: "Music & creators",
    status: "Open for interest",
    statusType: "open",
    schedule: "[Date] · [Time, local]",
    location: "Orlando, FL · In person",
    locationType: "In person",
    accessible: true,
    image: "/img/get-involved/opp-3.png",
    description: "Support our live community stage event: help with artist check-in, distribution of event wristbands, sound equipment staging, and attendee assistance.",
    requirements: "Positive attitude, love for live music. Water and volunteer t-shirt provided.",
  },
  {
    id: 4,
    title: "[Youth music mentor]",
    organizer: "[Approved music nonprofit]",
    cause: "Music & creators",
    status: "Open for interest",
    statusType: "open",
    schedule: "Weekly · [Evenings]",
    location: "Online",
    locationType: "Online",
    accessible: true,
    image: "/img/get-involved/opp-4.png",
    description: "Provide online coaching and encouragement to aspiring young musicians in guitar, piano, or basic songwriting.",
    requirements: "Intermediate proficiency in an instrument or songwriting. Background verification required.",
  },
  {
    id: 5,
    title: "[Neighborhood park clean-up]",
    organizer: "[Approved community group]",
    cause: "Volunteer & events",
    status: "Open for interest",
    statusType: "open",
    schedule: "[Date] · [Morning]",
    location: "Sacramento, CA · In person",
    locationType: "In person",
    accessible: true,
    image: "/img/get-involved/opp-5.png",
    description: "Join local community members to beautify our public park, plant native pollinator flowers, and clear trail pathways.",
    requirements: "All ages welcome (under 16 accompanied by guardian). Gloves and bags supplied.",
  },
  {
    id: 6,
    title: "[Open mic night host]",
    organizer: "[Approved venue partner]",
    cause: "Volunteer & events",
    status: "Paused",
    statusType: "paused",
    schedule: "[Date to be announced]",
    location: "Springfield, IL · In person",
    locationType: "In person",
    accessible: false,
    image: "/img/get-involved/opp-6.png",
    description: "Coordinate sign-up sheets and introduce performers at our weekly community acoustic open mic evening.",
    requirements: "Energetic and welcoming speaking presence.",
  },
];

// FAQs data
const faqsData = [
  {
    question: "Do I need to be a Zoiko Mobile customer?",
    answer: "No. Anyone can browse opportunities and express interest. You don’t need a phone plan.",
  },
  {
    question: "Does expressing interest guarantee a place?",
    answer: "No. Submitting an interest form lets the organizing charity or group know you're interested. They will review applications based on current capacity and reach out to confirm availability.",
  },
  {
    question: "What information do you ask for?",
    answer: "We only ask for essential contact details—your name and email address, and optional notes or accommodation requests. We will never ask for payment, bank details, or government IDs.",
  },
  {
    question: "Can I donate through this page?",
    answer: "This page is dedicated to volunteering, community programs, and partnerships. To support animal charities through our verified giving initiatives, please visit our Animal Charities page.",
  },
  {
    question: "How do I withdraw my interest?",
    answer: "You can withdraw your interest at any time by using your confirmation reference code in the Track a Request section, or by replying directly to the confirmation email you receive.",
  },
  {
    question: "How do organizations become partners?",
    answer: "Registered shelters, rescues, community non-profits, event organizers, and artists can submit the partnership inquiry form below. Our community partnerships team reviews every inquiry within 3 to 5 business days.",
  },
];

export default function GetInvolvedClient() {
  // Filter States
  const [selectedCause, setSelectedCause] = useState("All causes");
  const [selectedLocation, setSelectedLocation] = useState("Anywhere");
  const [searchQuery, setSearchQuery] = useState("");
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  // Modal State
  const [activeModalOpp, setActiveModalOpp] = useState(null);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [interestRefCode, setInterestRefCode] = useState("");
  const [volunteerForm, setVolunteerForm] = useState({ name: "", email: "", phone: "", notes: "" });

  // Track Request State
  const [trackRef, setTrackRef] = useState("");
  const [trackEmail, setTrackEmail] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState("");

  // Partner Form State
  const [partnerType, setPartnerType] = useState("Animal shelter or rescue");
  const [partnerForm, setPartnerForm] = useState({
    orgName: "",
    website: "",
    name: "",
    email: "",
    message: "",
    consent: false,
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // FAQ Accordion State (open first by default matching Figma)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return initialOpportunities.filter((opp) => {
      if (selectedCause !== "All causes" && opp.cause !== selectedCause) return false;
      if (selectedLocation === "In person" && opp.locationType !== "In person") return false;
      if (selectedLocation === "Online" && opp.locationType !== "Online") return false;
      if (accessibleOnly && !opp.accessible) return false;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = opp.title.toLowerCase().includes(query);
        const matchOrg = opp.organizer.toLowerCase().includes(query);
        const matchLoc = opp.location.toLowerCase().includes(query);
        const matchCause = opp.cause.toLowerCase().includes(query);
        if (!matchTitle && !matchOrg && !matchLoc && !matchCause) return false;
      }
      return true;
    });
  }, [selectedCause, selectedLocation, accessibleOnly, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCause("All causes");
    setSelectedLocation("Anywhere");
    setSearchQuery("");
    setAccessibleOnly(false);
  };

  // Scroll Helpers
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Track Request
  const handleCheckStatus = (e) => {
    if (e) e.preventDefault();
    setTrackError("");
    setTrackResult(null);

    const ref = trackRef.trim().toUpperCase();
    const email = trackEmail.trim().toLowerCase();

    if (!ref || !email) {
      setTrackError("Please provide both a valid Reference Code and Email.");
      return;
    }

    if (ref === "ZM-GI-0000" || ref === "ZM-GI-1042" || ref.startsWith("ZM-GI-")) {
      setTrackResult({
        reference: ref,
        status: "Under review with organizer",
        opportunity: "[Weekend shelter helper]",
        organizer: "[Approved animal shelter]",
        date: "November 2026",
        notes: "Your details were safely delivered to the shelter coordinator. They typically review applications on Thursdays.",
      });
    } else {
      setTrackError("No matching record found. Please verify the Reference code and email used when expressing interest.");
    }
  };

  const handleTrySample = () => {
    setTrackRef("ZM-GI-0000");
    setTrackEmail("sample.volunteer@example.com");
    setTrackError("");
    setTrackResult({
      reference: "ZM-GI-0000",
      status: "Interest confirmed – Under review",
      opportunity: "[Weekend shelter helper]",
      organizer: "[Approved animal shelter]",
      date: "November 2026",
      notes: "Sample record verified. Your details are on file. The coordinator will contact you via email with confirmation.",
    });
  };

  // Handle Volunteer Interest Submit
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    const randomCode = `ZM-GI-${Math.floor(1000 + Math.random() * 9000)}`;
    setInterestRefCode(randomCode);
    setInterestSubmitted(true);
  };

  // Handle Partner Form Submit
  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!partnerForm.consent) {
      alert("Please check the consent checkbox to submit.");
      return;
    }
    setPartnerSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCard}>
              <div className={styles.heroBadge}>
                <Heart size={16} />
                <span>Zoiko Community</span>
              </div>
              <h1 className={styles.heroHeading}>
                Get involved in <br />
                what <span className={styles.highlightPink}>you love.</span>
              </h1>
              <p className={styles.heroDescription}>
                Help animals, support local music and creators, and connect with people who care. Find an
                opportunity, tell us you’re interested, and we’ll take it from there.
              </p>
              <div className={styles.heroActions}>
                <button onClick={() => scrollToSection("opportunities")} className={styles.btnPrimary}>
                  Explore opportunities
                </button>
                <button onClick={() => scrollToSection("partner")} className={styles.btnSecondary}>
                  Become a partner
                </button>
              </div>
              <div className={styles.heroReassurance}>
                <CircleCheck size={18} />
                <span>Free to browse. No phone plan needed.</span>
              </div>
            </div>

            <div className={styles.heroCollage}>
              <div className={styles.collageTile}>
                <img src="/img/get-involved/hero-1.png" alt="Volunteer petting a beagle" className={styles.collageImg} />
                <span className={styles.collageBadge}>
                  <Heart size={16} />
                  <span>Animal welfare</span>
                </span>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.collageTile}>
                  <img src="/img/get-involved/hero-animals.png" alt="Volunteers at a community event" className={styles.collageImg} />
                  <span className={styles.collageBadge}>
                    <Hand size={16} />
                    <span>Volunteer &amp; events</span>
                  </span>
                </div>
                <div className={styles.heroRightBottom}>
                  <div className={styles.collageTile}>
                    <img src="/img/get-involved/hero-volunteer.png" alt="Man with his golden retriever" className={styles.collageImg} />
                  </div>
                  <div className={styles.collageTile}>
                    <img src="/img/get-involved/hero-music.png" alt="Local musicians" className={styles.collageImg} />
                    <span className={styles.collageBadge}>
                      <Music size={16} />
                      <span>Music</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR PATH SECTION */}
      <section className={styles.pathSection}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>CHOOSE YOUR PATH</span>
          <h2 className={styles.sectionTitle}>Four ways to get involved.</h2>

          <div className={styles.pathGrid}>
            {[
              { img: "path-animals.png", Icon: Heart, cat: "ANIMAL WELFARE", title: "Help animals in need", desc: "Support rescues and shelters in your community.", cause: "Animal welfare", cta: "See opportunities →" },
              { img: "path-music.png", Icon: Music, cat: "MUSIC & CREATORS", title: "Support music and creators", desc: "Help local artists and music programs grow.", cause: "Music & creators", cta: "See opportunities →" },
              { img: "path-volunteer.png", Icon: Hand, cat: "VOLUNTEER & EVENTS", title: "Lend a hand locally", desc: "Volunteer at community clean-ups, events and drives.", cause: "Volunteer & events", cta: "See opportunities →" },
              { img: "path-partner.png", Icon: Briefcase, cat: "PARTNER WITH ZOIKO", title: "Bring your organization", desc: "Shelters, nonprofits, artists and organizers can reach out.", cause: null, cta: "Start an inquiry →" },
            ].map((p) => (
              <div key={p.title} className={styles.pathCard}>
                <div className={styles.pathImgWrap}>
                  <img src={`/img/get-involved/${p.img}`} alt={p.title} className={styles.pathImg} />
                  <span className={styles.pathIcon}>
                    <p.Icon size={22} />
                  </span>
                </div>
                <div className={styles.pathContent}>
                  <div className={styles.pathCategory}>{p.cat}</div>
                  <h3 className={styles.pathTitle}>{p.title}</h3>
                  <p className={styles.pathDesc}>{p.desc}</p>
                  <button
                    onClick={() => {
                      if (p.cause) {
                        setSelectedCause(p.cause);
                        scrollToSection("opportunities");
                      } else {
                        scrollToSection("partner");
                      }
                    }}
                    className={styles.pathLink}
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPPORTUNITIES SECTION */}
      <section id="opportunities" className={`${styles.section} ${styles.sectionAlt} ${styles.oppSection}`}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>OPPORTUNITIES</span>
          <h2 className={styles.sectionTitle}>Find a way to help.</h2>
          <p className={styles.sectionSubtitle}>
            Every opportunity shows who runs it, where it is and what’s involved, before you share any details.
          </p>

          <div className={styles.filterCard}>
            <div className={styles.filterTabsRow}>
              <div className={styles.filterGroup}>
                {["All causes", "Animal welfare", "Music & creators", "Volunteer & events"].map((cause) => (
                  <button
                    key={cause}
                    type="button"
                    onClick={() => setSelectedCause(cause)}
                    className={`${styles.filterPill} ${selectedCause === cause ? styles.filterPillActive : ""}`}
                  >
                    {cause}
                  </button>
                ))}
              </div>
              <div className={styles.filterGroup}>
                {["Anywhere", "In person", "Online"].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`${styles.filterPill} ${selectedLocation === loc ? styles.filterPillActive : ""}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.searchLabel} htmlFor="gi-search">Search</label>
            <div className={styles.filterControlsRow}>
              <div className={styles.searchBox}>
                <Search size={18} />
                <input
                  id="gi-search"
                  type="text"
                  placeholder="Shelter, music, clean-up, city…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <label className={styles.accessibleToggle}>
                <input
                  type="checkbox"
                  checked={accessibleOnly}
                  onChange={(e) => setAccessibleOnly(e.target.checked)}
                />
                <span>Accessible venues</span>
              </label>
              <button type="button" onClick={handleResetFilters} className={styles.resetBtn}>
                Reset
              </button>
            </div>
            <p className={styles.oppCount}>
              {filteredOpportunities.length} {filteredOpportunities.length === 1 ? "opportunity" : "opportunities"}
            </p>
          </div>

          <div className={styles.oppGrid}>
            {filteredOpportunities.length === 0 && (
              <p className={styles.noResults}>No opportunities match your filters. Try resetting them.</p>
            )}
            {filteredOpportunities.map((opp) => (
              <div key={opp.id} className={styles.oppCard}>
                <div className={styles.oppImgWrapper}>
                  <img src={opp.image} alt={opp.title} className={styles.oppImg} />
                  <span
                    className={`${styles.statusPill} ${
                      opp.statusType === "open"
                        ? styles.statusOpen
                        : opp.statusType === "coming"
                        ? styles.statusComing
                        : styles.statusPaused
                    }`}
                  >
                    {opp.status}
                  </span>
                  <span className={styles.samplePill}>Sample</span>
                </div>

                <div className={styles.oppContent}>
                  <span className={styles.oppCategory}>{opp.cause}</span>
                  <h3 className={styles.oppTitle}>{opp.title}</h3>
                  <p className={styles.oppOrganizer}>Organized by {opp.organizer}</p>

                  <div className={styles.oppMetaList}>
                    <div className={styles.oppMetaItem}>
                      <Calendar size={16} />
                      <span>{opp.schedule}</span>
                    </div>
                    <div className={styles.oppMetaItem}>
                      <MapPin size={16} />
                      <span>{opp.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalOpp(opp);
                      setInterestSubmitted(false);
                      setVolunteerForm({ name: "", email: "", phone: "", notes: "" });
                    }}
                    className={styles.oppBtn}
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className={`${styles.section} ${styles.howSection}`}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>HOW IT WORKS</span>
          <h2 className={styles.sectionTitle}>Simple, clear and no pressure.</h2>
          <p className={styles.sectionSubtitle}>
            Expressing interest isn’t a commitment, and it never costs anything.
          </p>

          <div className={styles.stepGrid}>
            {[
              { n: "01", Icon: Search, t: "Discover", d: "Browse opportunities. No sign-up needed." },
              { n: "02", Icon: Info, t: "Review the details", d: "See who runs it, where, when and any requirements." },
              { n: "03", Icon: Hand, t: "Express interest", d: "Share a few contact details. It takes about two minutes.", featured: true },
              { n: "04", Icon: CircleCheck, t: "Hear back", d: "We or the organizer will reply with the outcome and next steps." },
            ].map((s) => (
              <div key={s.n} className={`${styles.stepCard} ${s.featured ? styles.stepFeatured : ""}`}>
                <div className={styles.stepIcon}>
                  <s.Icon size={22} />
                </div>
                <div className={styles.stepNumber}>{s.n}</div>
                <h3 className={styles.stepTitle}>{s.t}</h3>
                <p className={styles.stepDesc}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRACK A REQUEST SECTION */}
      <section className={`${styles.section} ${styles.sectionAlt} ${styles.trackSection}`}>
        <div className={styles.container}>
          <div className={styles.trackGrid}>
            <div>
              <span className={styles.sectionBadge}>TRACK A REQUEST</span>
              <h2 className={styles.sectionTitle}>Check where things stand.</h2>
              <p className={styles.sectionSubtitle}>
                Enter the reference from your confirmation and the email you used.
              </p>

              <div className={styles.trackFormCard}>
                <form onSubmit={handleCheckStatus}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="gi-ref">Reference</label>
                    <input
                      id="gi-ref"
                      type="text"
                      placeholder="ZM-GI-0000"
                      value={trackRef}
                      onChange={(e) => setTrackRef(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="gi-email">Email</label>
                    <input
                      id="gi-email"
                      type="email"
                      value={trackEmail}
                      onChange={(e) => setTrackEmail(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.trackButtonsRow}>
                    <button type="submit" className={styles.btnPrimary}>Check status</button>
                    <button type="button" onClick={handleTrySample} className={styles.btnSecondary}>
                      Try a sample request
                    </button>
                  </div>
                </form>
                <p className={styles.trackPrivacyNote}>
                  For your privacy, we only show a request when both details match.
                </p>
                {trackError && <div className={styles.trackError}>{trackError}</div>}
              </div>
            </div>

            <div className={styles.trackImgCol}>
              <img src="/img/get-involved/track-request.png" alt="Team reviewing community requests" className={styles.trackImg} />
              {trackResult ? (
                <p className={styles.trackResult}>
                  <strong>Request {trackResult.reference}:</strong> {trackResult.status}
                  <br />
                  {trackResult.opportunity} ({trackResult.organizer}) · {trackResult.notes}
                </p>
              ) : (
                <p className={styles.trackCaption}>
                  Your request status appears here. You’ll also get one confirmation email when you submit.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW GIVING WORKS BANNER */}
      <section className={styles.givingSection}>
        <div className={styles.container}>
          <div className={styles.givingGrid}>
            <div className={styles.givingImgWrap}>
              <img src="/img/get-involved/giving-animals.png" alt="Veterinarian with rescue animal" className={styles.givingImg} />
            </div>
            <div className={styles.givingContentCol}>
              <span className={styles.givingBadge}>HOW GIVING WORKS</span>
              <h2 className={styles.givingTitle}>See how Zoiko supports animal welfare.</h2>
              <p className={styles.givingDesc}>
                We explain how our giving program works, who it supports and how it’s reviewed. Figures are
                published only once they’re verified.
              </p>
              <Link href="/animal-charities" className={styles.btnWhiteGiving}>
                How giving works
              </Link>
              <Link href="/animal-charities" className={styles.givingLink}>
                Visit Animal Charities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STORIES & IMPACT SECTION */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <span className={styles.sectionBadge}>STORIES &amp; IMPACT</span>
          <h2 className={styles.sectionTitle}>Real stories, carefully checked.</h2>

          <div className={styles.storiesCard}>
            <div className={styles.storiesImgWrap}>
              <img src="/img/get-involved/story-spotlight.png" alt="Concert stage and live community performers" className={styles.storiesImg} />
            </div>
            <div className={styles.storiesContentCol}>
              <h3 className={styles.storiesHeading}>Our first stories are being reviewed</h3>
              <p className={styles.storiesDesc}>
                Every story is fact-checked, approved by the people in it and dated, so you can trust what you read.
              </p>
              <div className={styles.storiesChecklist}>
                {["Partner and participants consent", "Facts and any figures are checked", "Published with a date and source"].map((t, i) => (
                  <div key={t} className={styles.storiesCheckItem}>
                    <span className={styles.checkIconCircle}>{i + 1}</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARTNER WITH ZOIKO SECTION */}
      <section id="partner" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.partnerGrid}>
            <div>
              <span className={styles.sectionBadge}>PARTNER WITH ZOIKO</span>
              <h2 className={styles.sectionTitle}>Bring your organization to our community.</h2>
              <p className={styles.sectionSubtitle}>
                Animal shelters, nonprofits, artists and event organizers: tell us about your work. Every inquiry is
                reviewed by our partnerships team.
              </p>
              <img src="/img/get-involved/partner-team.png" alt="Community organizers collaborating" className={styles.partnerImg} />
              <div className={styles.partnerBulletPoints}>
                <div className={styles.partnerBulletItem}>
                  <CircleCheck size={20} />
                  <span>Submitting an inquiry doesn’t mean admission to a program.</span>
                </div>
                <div className={styles.partnerBulletItem}>
                  <CircleCheck size={20} />
                  <span>We’ll never list your organization without your approval.</span>
                </div>
              </div>
            </div>

            <div className={styles.partnerFormCard}>
              <form onSubmit={handlePartnerSubmit}>
                <span className={styles.formLabel}>Organization type</span>
                <div className={styles.typePillsGrid}>
                  {["Animal shelter or rescue", "Nonprofit", "Artist or manager", "Event organizer"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPartnerType(type)}
                      className={`${styles.typePillBtn} ${partnerType === type ? styles.typePillActive : ""}`}
                    >
                      <span className={styles.radioDot} />
                      {type}
                    </button>
                  ))}
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Organization name</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.orgName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Website</label>
                    <input
                      type="url"
                      value={partnerForm.website}
                      onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                      className={styles.formInput}
                    />
                    <p className={styles.fieldHint}>https://…</p>
                  </div>
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your name</label>
                    <input
                      type="text"
                      required
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Work email</label>
                    <input
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>What would you like to do together?</label>
                  <textarea
                    maxLength={600}
                    required
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className={styles.formTextarea}
                  />
                  <div className={styles.charCount}>{partnerForm.message.length} / 600 characters</div>
                </div>

                <label className={styles.termsCheckboxLabel}>
                  <input
                    type="checkbox"
                    checked={partnerForm.consent}
                    onChange={(e) => setPartnerForm({ ...partnerForm, consent: e.target.checked })}
                    className={styles.termsCheckbox}
                  />
                  <span>
                    I’m authorized to contact Zoiko on behalf of this organization, and I’ve read the{" "}
                    <Link href="/privacy" className={styles.termsLink}>Privacy Policy</Link>.
                  </span>
                </label>

                <button type="submit" className={`${styles.btnPrimary} ${styles.partnerSubmit}`}>
                  Send inquiry
                </button>

                {partnerSubmitted && (
                  <div className={styles.partnerSuccessMsg}>
                    ✓ Thank you! Your partnership inquiry has been received. Our partnerships coordinator will
                    reach out to {partnerForm.email} within 2–3 business days.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQS SECTION */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div>
              <span className={styles.sectionBadge}>FAQS</span>
              <h2 className={styles.sectionTitle}>Questions about getting involved.</h2>

              <div className={styles.faqSidebar}>
                <div className={styles.faqAdvisoryCard}>
                  <ShieldCheck size={28} className={styles.advisoryIcon} />
                  <div>
                    <h3 className={styles.advisoryTitle}>Stay safe</h3>
                    <p className={styles.advisoryDesc}>
                      Zoiko will never ask you to pay to volunteer, or for bank or ID details.{" "}
                      <Link href="/support" className={styles.advisoryLink}>Report a problem</Link>
                    </p>
                  </div>
                </div>
                <div className={styles.faqAdvisoryCard}>
                  <Headphones size={28} className={styles.advisoryIcon} />
                  <div>
                    <h3 className={styles.advisoryTitle}>Need an accommodation?</h3>
                    <p className={styles.advisoryDesc}>Call 800-988-8116 or mention it in your interest form.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.faqAccordionList}>
              {faqsData.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`${styles.faqAccordionItem} ${isOpen ? styles.faqAccordionItemOpen : ""}`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
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
        </div>
      </section>

      <details className={styles.photoCredits}>
        <summary>Photo credits</summary>
        <p>
          Zoiko Community verified media library, partner shelters, community contributors and approved artist
          archives. All photos used with permission.
        </p>
      </details>

      {/* 10. MODAL: OPPORTUNITY DETAILS & EXPRESS INTEREST */}
      {activeModalOpp && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModalOpp(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.oppCategory}>{activeModalOpp.cause}</span>
                <h3 className={styles.modalTitle}>{activeModalOpp.title}</h3>
                <p className={styles.modalOrganizer}>Organized by {activeModalOpp.organizer}</p>
              </div>
              <button type="button" onClick={() => setActiveModalOpp(null)} className={styles.modalCloseBtn}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {!interestSubmitted ? (
                <>
                  <div className={styles.modalInfoBox}>
                    <div>
                      <strong>Schedule:</strong> {activeModalOpp.schedule}
                    </div>
                    <div>
                      <strong>Location:</strong> {activeModalOpp.location}
                    </div>
                    <div>
                      <strong>About this opportunity:</strong> {activeModalOpp.description}
                    </div>
                    <div>
                      <strong>Requirements:</strong> {activeModalOpp.requirements}
                    </div>
                    <div>
                      <strong>Venue accessibility:</strong>{" "}
                      {activeModalOpp.accessible ? "Wheelchair accessible" : "Standard venue"}
                    </div>
                  </div>

                  <h4 className={styles.modalFormTitle}>Express Interest</h4>
                  <p style={{ fontSize: "14px", color: "#6C5E6E", marginBottom: "16px" }}>
                    Share your contact details. No phone plan needed, and there is no cost or commitment.
                  </p>

                  <form onSubmit={handleVolunteerSubmit}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Full name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email address</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone number (optional)</label>
                        <input
                          type="tel"
                          placeholder="(555) 000-0000"
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Notes or accommodations (optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Mention any questions or accommodation needs..."
                        value={volunteerForm.notes}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, notes: e.target.value })}
                        className={styles.formTextarea}
                      />
                    </div>

                    <button type="submit" className={styles.btnPrimary} style={{ width: "100%", marginTop: "10px" }}>
                      Submit interest
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.modalSuccessState}>
                  <CheckCircle size={48} color="#059669" style={{ margin: "0 auto 16px auto" }} />
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#1E041C", marginBottom: "8px" }}>
                    Interest submitted!
                  </h3>
                  <p style={{ fontSize: "15px", color: "#554A58", marginBottom: "12px" }}>
                    We have safely routed your interest for <strong>{activeModalOpp.title}</strong> to{" "}
                    {activeModalOpp.organizer}.
                  </p>

                  <div className={styles.refCodeBadge}>{interestRefCode}</div>

                  <p style={{ fontSize: "13px", color: "#8C7D8F", marginBottom: "24px" }}>
                    Save this reference code to check your status at any time in the Track a Request section.
                    A confirmation will also be sent to {volunteerForm.email}.
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveModalOpp(null)}
                    className={styles.btnPrimary}
                    style={{ margin: "0 auto" }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

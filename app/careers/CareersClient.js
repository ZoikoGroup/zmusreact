"use client";

import React, { useState, useMemo } from "react";
import {
  Code, Headphones, TrendingUp, Heart, Star, Users, Music, MapPin, ChevronUp, ChevronDown, ShieldCheck,
} from "lucide-react";
import styles from "./Careers.module.css";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

const arrClass = (a) =>
  a === "Remote" ? styles.arrangementRemote : a === "Hybrid" ? styles.arrangementHybrid : styles.arrangementOnsite;

const ALL_JOBS = [
  // TECHNOLOGY & PRODUCT (4)
  {
    id: "tech-1",
    team: "Technology & Product",
    title: "Frontend Engineer (React)",
    location: "Remote (U.S.)",
    arrangement: "Remote",
    type: "Full-time",
    posted: "Nov 9, 2026",
    closes: "Dec 7, 2026",
    isNew: true,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Engineering Manager, Web",
    pay: "$105,000 – $135,000 per year",
    about:
      "Join the team building zoikomobile.com and our customer account experience. You'll turn designs into fast, accessible React interfaces that help millions of people choose a plan, activate a SIM and manage their service.",
    responsibilities: [
      "Build and maintain customer-facing features in React and TypeScript",
      "Turn Figma designs into accessible, responsive components that meet WCAG 2.2 AA",
      "Work with backend engineers on Laravel APIs for plans, checkout and activation",
      "Improve page speed and Core Web Vitals across the site",
      "Review code, write tests and share knowledge with the team",
    ],
    requirements: [
      "3+ years building production web apps with React",
      "Strong JavaScript/TypeScript, HTML and CSS skills",
      "Experience with REST APIs and state management",
      "Working knowledge of web accessibility standards",
    ],
    niceToHave: ["Experience in e-commerce or subscription checkout flows"],
  },
  {
    id: "tech-2",
    team: "Technology & Product",
    title: "Backend Engineer (Laravel)",
    location: "Remote (U.S.)",
    arrangement: "Remote",
    type: "Full-time",
    posted: "Nov 7, 2026",
    closes: "Dec 5, 2026",
    isNew: true,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Engineering Manager, Backend",
    pay: "$110,000 – $140,000 per year",
    about:
      "Lead the backend systems powering wireless plan provisioning, SIM management, subscriber billing, and third-party telecom carrier integrations.",
    responsibilities: [
      "Develop high-throughput RESTful APIs with Laravel and PHP 8+",
      "Design and maintain scalable database schemas in MySQL/PostgreSQL",
      "Integrate telecom carrier APIs for instant eSIM & physical SIM activations",
      "Maintain strict PCI-DSS and customer data privacy compliance",
    ],
    requirements: [
      "4+ years of backend engineering experience with modern Laravel / PHP",
      "Proven track record with distributed systems, queuing, and caching (Redis)",
      "Strong relational database optimization skills",
    ],
    niceToHave: ["Telecom (MVNO) or fintech billing integration experience"],
  },
  {
    id: "tech-3",
    team: "Technology & Product",
    title: "Product Designer",
    location: "Austin, TX",
    arrangement: "Hybrid",
    type: "Full-time",
    posted: "Nov 4, 2026",
    closes: "Dec 2, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Head of Product Design",
    pay: "$95,000 – $125,000 per year",
    about:
      "Shape the end-to-end user journeys for wireless plan shoppers, account management portals, and community-driven pet & music perk experiences.",
    responsibilities: [
      "Design pixel-perfect user interfaces, user flows, and interactive prototypes in Figma",
      "Collaborate directly with product managers and engineers during sprint cycles",
      "Conduct user research and usability testing on checkout and activation flows",
    ],
    requirements: [
      "3+ years of product design experience for consumer web and mobile applications",
      "Strong portfolio demonstrating systems design, UX architecture, and UI craft",
      "Deep understanding of responsive design patterns and accessibility standards",
    ],
    niceToHave: ["Design token architecture or Figma variables expertise"],
  },
  {
    id: "tech-4",
    team: "Technology & Product",
    title: "QA Engineer",
    location: "Remote (U.S.)",
    arrangement: "Remote",
    type: "Full-time",
    posted: "Oct 28, 2026",
    closes: "Nov 28, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "QA Lead",
    pay: "$85,000 – $110,000 per year",
    about:
      "Ensure the highest reliability across our mobile web applications, shopping funnel, and plan configuration tools through rigorous manual and automated testing.",
    responsibilities: [
      "Write automated end-to-end tests using Cypress or Playwright",
      "Perform cross-browser and mobile device regression testing",
      "Collaborate with developers to isolate and reproduce edge-case bugs",
    ],
    requirements: [
      "3+ years in software quality assurance for modern web applications",
      "Experience with test automation frameworks and CI/CD pipelines",
      "Strong analytical mindset with keen attention to functional detail",
    ],
    niceToHave: ["Experience testing payment gateways and checkout funnels"],
  },

  // CUSTOMER EXPERIENCE (3)
  {
    id: "cx-1",
    team: "Customer Experience",
    title: "Customer Care Specialist",
    location: "Orlando, FL",
    arrangement: "Hybrid",
    type: "Full-time",
    posted: "Nov 8, 2026",
    closes: "Dec 6, 2026",
    isNew: true,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Customer Care Supervisor",
    pay: "$45,000 – $55,000 per year",
    about:
      "Be the helpful, empathetic voice of Zoiko Mobile. Help subscribers choose the right plan, understand their billing, and troubleshoot network questions.",
    responsibilities: [
      "Deliver outstanding customer service via phone, chat, and email",
      "Help customers activate new SIM cards, configure APN settings, and manage lines",
      "Accurately document customer interactions in CRM tools",
    ],
    requirements: [
      "1+ years experience in customer service or tech support (telecom preferred)",
      "Excellent verbal and written communication skills",
      "Friendly, patient, and problem-solving disposition",
    ],
    niceToHave: ["Bilingual English/Spanish is a plus"],
  },
  {
    id: "cx-2",
    team: "Customer Experience",
    title: "Activation Support Specialist (English & Spanish)",
    location: "Remote (U.S.)",
    arrangement: "Remote",
    type: "Full-time",
    posted: "Nov 5, 2026",
    closes: "Dec 3, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Onboarding Team Lead",
    pay: "$48,000 – $58,000 per year",
    about:
      "Guide new subscribers through their first crucial days with Zoiko Mobile, providing bilingual onboarding assistance for number porting and eSIM setup.",
    responsibilities: [
      "Assist subscribers with number transfers (port-in) from prior carriers",
      "Walk customers through eSIM QR installation and dual-SIM device settings",
      "Deliver fluent, high-touch support in both English and Spanish",
    ],
    requirements: [
      "Professional fluency in both English and Spanish (oral and written)",
      "Experience assisting customers with mobile device configuration",
      "Strong technical troubleshooting skills",
    ],
    niceToHave: ["Knowledge of MVNO activation flows and carrier porting rules"],
  },
  {
    id: "cx-3",
    team: "Customer Experience",
    title: "Customer Experience Team Lead",
    location: "Sacramento, CA",
    arrangement: "On-site",
    type: "Full-time",
    posted: "Oct 30, 2026",
    closes: "Nov 30, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Customer Operations Director",
    pay: "$65,000 – $80,000 per year",
    about:
      "Lead and mentor a team of frontline customer care representatives in our Sacramento office, ensuring exceptional CSAT and First Contact Resolution.",
    responsibilities: [
      "Coach and mentor a team of 10-12 customer experience specialists",
      "Monitor response times, customer satisfaction metrics, and QA scorecards",
      "Handle escalated inquiries with speed, professionalism, and care",
    ],
    requirements: [
      "2+ years of leadership or team lead experience in a customer operations center",
      "Strong analytical skills with knowledge of Zendesk, Salesforce, or similar platforms",
      "Proven ability to motivate and develop team members",
    ],
    niceToHave: ["Experience establishing QA rubrics and training curriculum"],
  },

  // BUSINESS & GROWTH (3)
  {
    id: "biz-1",
    team: "Business & Growth",
    title: "Partnerships Manager",
    location: "Austin, TX",
    arrangement: "Hybrid",
    type: "Full-time",
    posted: "Nov 8, 2026",
    closes: "Dec 6, 2026",
    isNew: true,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "VP of Partnerships",
    pay: "$90,000 – $120,000 per year",
    about:
      "Build alliances with animal welfare charities, music festival organizers, and retail distribution partners across the United States.",
    responsibilities: [
      "Identify, negotiate, and close co-marketing and benefit partnerships",
      "Manage relationship health and reporting with animal rescue organizations",
      "Coordinate promotional benefit distribution for Zoiko Music events",
    ],
    requirements: [
      "4+ years experience in business development, partnerships, or partner marketing",
      "Strong contract negotiation and executive relationship skills",
      "Genuine passion for animal advocacy or music communities",
    ],
    niceToHave: ["Experience in telecom, loyalty programs, or entertainment partnerships"],
  },
  {
    id: "biz-2",
    team: "Business & Growth",
    title: "Retail Sales Associate",
    location: "Springfield, IL",
    arrangement: "On-site",
    type: "Part-time",
    posted: "Nov 2, 2026",
    closes: "Dec 2, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Retail Store Manager",
    pay: "$20 – $25 per hour",
    about:
      "Deliver friendly, in-person assistance to retail customers looking for affordable wireless plans, refurbished smartphones, and phone accessories.",
    responsibilities: [
      "Guide walk-in customers through plan options and phone choices",
      "Process SIM activations and device trade-ins",
      "Maintain a clean, organized, and inviting store environment",
    ],
    requirements: [
      "Previous retail, hospitality, or sales experience",
      "Enthusiastic personality with a commitment to customer satisfaction",
      "Ability to work flexible hours including some weekends",
    ],
    niceToHave: ["Knowledge of popular smartphone models and accessories"],
  },
  {
    id: "biz-3",
    team: "Business & Growth",
    title: "Business Operations Analyst",
    location: "Dover, DE",
    arrangement: "Hybrid",
    type: "Full-time",
    posted: "Oct 26, 2026",
    closes: "Nov 26, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Director of Business Operations",
    pay: "$80,000 – $100,000 per year",
    about:
      "Drive operational excellence across carrier invoicing, customer subscriber retention metrics, inventory forecasting, and compliance tracking.",
    responsibilities: [
      "Build KPI dashboards and revenue reports for executive leadership",
      "Analyze customer churn, device margin, and carrier wholesale usage rates",
      "Streamline cross-departmental workflows between finance, ops, and engineering",
    ],
    requirements: [
      "3+ years of business analysis or operational analytics experience",
      "Advanced SQL, Excel, and BI dashboarding skills (Tableau, PowerBI, or Metabase)",
      "Strong mathematical and problem-solving aptitude",
    ],
    niceToHave: ["Experience in subscription SaaS or telecommunications"],
  },

  // COMMUNITY & BRAND (2)
  {
    id: "comm-1",
    team: "Community & Brand",
    title: "Community Programs Coordinator",
    location: "Sacramento, CA",
    arrangement: "Hybrid",
    type: "Full-time",
    posted: "Nov 6, 2026",
    closes: "Dec 4, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Community & Welfare Lead",
    pay: "$55,000 – $70,000 per year",
    about:
      "Coordinate Zoiko Mobile's signature philanthropic initiatives, connecting mobile subscribers with shelter adoption drives, pet rescue sponsorships, and local music fundraisers.",
    responsibilities: [
      "Organize community outreach days with partner animal shelters",
      "Manage logistics for Zoiko Music Hub event sponsorships and ticket giveaways",
      "Collect and produce storytelling assets showcasing community impact",
    ],
    requirements: [
      "2+ years coordinating events, non-profit outreach, or community initiatives",
      "Exceptional project management and organization skills",
      "Strong interpersonal skills and empathy",
    ],
    niceToHave: ["Experience working with 501(c)(3) animal rescue organizations"],
  },
  {
    id: "comm-2",
    team: "Community & Brand",
    title: "Social Media & Content Intern",
    location: "Remote (U.S.)",
    arrangement: "Remote",
    type: "Internship",
    posted: "Nov 3, 2026",
    closes: "Dec 3, 2026",
    isNew: false,
    hiringCompany: "Zoiko Mobile USA",
    reportsTo: "Brand & Social Media Manager",
    pay: "$22 per hour",
    about:
      "Create captivating social content spotlighting animal rescue stories, indie music tracks, subscriber tips, and behind-the-scenes life at Zoiko Mobile.",
    responsibilities: [
      "Create short-form video content (TikTok, Reels, YouTube Shorts)",
      "Engage with community comments and pet photo submissions",
      "Help draft social copy and schedule weekly editorial calendars",
    ],
    requirements: [
      "Current student or recent graduate in Marketing, Communications, or Design",
      "Deep understanding of current social trends and meme culture",
      "Basic video editing and graphic creation skills (CapCut, Canva, Premiere)",
    ],
    niceToHave: ["Active personal presence or content portfolio in pets or music"],
  },
];

const FAQS = [
  {
    q: "Are there open roles right now?",
    a: "Only roles listed under Open roles are open. Our team areas describe the work we do, not current vacancies.",
  },
  {
    q: "Do I need a Zoiko Mobile account to apply?",
    a: "No. Candidate profiles and application records are completely separate from customer mobile subscriber accounts. You do not need to be a customer to apply.",
  },
  {
    q: "What file types can I upload?",
    a: "We accept PDF and Microsoft Word (.docx, .doc) files up to 10MB in size. We recommend PDF format to preserve your resume layout.",
  },
  {
    q: "How will I hear back?",
    a: "Every applicant receives an automated email confirmation with a unique reference number (e.g. ZM-APP-0000). If your profile is a match for the role, our recruiting team will email you to schedule an initial interview.",
  },
  {
    q: "Can I withdraw my application?",
    a: "Yes. You can withdraw your application at any time by emailing careers@zoikomobile.com with your application reference number, or through your status portal.",
  },
  {
    q: "How do I know a recruiter is genuine?",
    a: "Official Zoiko Mobile recruiters only contact applicants from email addresses ending in @zoikomobile.com. We never ask for payments, gift cards, home equipment fees, or bank account details.",
  },
];

export default function CareersClient() {
  // Filter States
  const [keyword, setKeyword] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedArrangement, setSelectedArrangement] = useState("Any");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // Collapsible Team sections state
  const [collapsedTeams, setCollapsedTeams] = useState({});

  // Modal States
  const [selectedJob, setSelectedJob] = useState(null); // Details modal
  const [applyJob, setApplyJob] = useState(null); // Apply modal
  const [applyStep, setApplyStep] = useState(1); // 1, 2, 3, or 'success'
  const [applyForm, setApplyForm] = useState({
    canWorkSchedule: "yes",
    fullName: "",
    email: "",
    city: "",
    phone: "",
    resumeName: "",
    privacyConsent: true,
    futureRolesConsent: false,
  });
  const [generatedAppRef, setGeneratedAppRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Status Checker State
  const [statusRef, setStatusRef] = useState("");
  const [statusEmail, setStatusEmail] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState("");

  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  // Toggle team filter checkbox
  const toggleTeamFilter = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      setSelectedTeams(selectedTeams.filter((t) => t !== teamName));
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setKeyword("");
    setSelectedTeams([]);
    setSelectedLocation("All");
    setSelectedArrangement("Any");
    setSelectedType("All");
  };

  // Toggle accordion collapse
  const toggleTeamCollapse = (teamName) => {
    setCollapsedTeams((prev) => ({
      ...prev,
      [teamName]: !prev[teamName],
    }));
  };

  // Filtered and Sorted Jobs
  const filteredJobs = useMemo(() => {
    return ALL_JOBS.filter((job) => {
      if (
        keyword.trim() &&
        !job.title.toLowerCase().includes(keyword.toLowerCase()) &&
        !job.about.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return false;
      }
      if (selectedTeams.length > 0 && !selectedTeams.includes(job.team)) {
        return false;
      }
      if (selectedLocation !== "All" && job.location !== selectedLocation) {
        return false;
      }
      if (selectedArrangement !== "Any" && job.arrangement !== selectedArrangement) {
        return false;
      }
      if (selectedType !== "All" && job.type !== selectedType) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "location") return a.location.localeCompare(b.location);
      return 0;
    });
  }, [keyword, selectedTeams, selectedLocation, selectedArrangement, selectedType, sortBy]);

  // Group filtered jobs by team
  const groupedJobs = useMemo(() => {
    const groups = {};
    filteredJobs.forEach((job) => {
      if (!groups[job.team]) {
        groups[job.team] = [];
      }
      groups[job.team].push(job);
    });
    return groups;
  }, [filteredJobs]);

  const handleOpenDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const handleStartApply = (job) => {
    setSelectedJob(null);
    setApplyJob(job);
    setApplyStep(1);
  };

  const handleCloseApply = () => {
    setApplyJob(null);
    setApplyStep(1);
    setSubmitError("");
  };

  const handleSubmitApplication = async (e) => {
    if (e) e.preventDefault();
    if (submitting) return;
    setSubmitError("");
    if (!applyForm.privacyConsent) {
      setSubmitError("Please confirm the Candidate Privacy Notice before submitting.");
      return;
    }
    if (!applyForm.fullName.trim() || !/^\S+@\S+\.\S+$/.test(applyForm.email.trim())) {
      setSubmitError("Please enter your full name and a valid email address.");
      return;
    }
    const newRef = `ZM-APP-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: applyForm.fullName.trim(),
          email: applyForm.email.trim(),
          phone: applyForm.phone.trim(),
          message: [
            "JOB APPLICATION",
            `Reference: ${newRef}`,
            `Role: ${applyJob ? applyJob.title : "-"}${applyJob ? ` (${applyJob.team}, ${applyJob.location})` : ""}`,
            `City: ${applyForm.city || "-"}`,
            `Can work the schedule: ${applyForm.canWorkSchedule}`,
            `Resume file: ${applyForm.resumeName || "-"}`,
            `Consent to be contacted about future roles: ${applyForm.futureRolesConsent ? "yes" : "no"}`,
          ].join("\n"),
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setGeneratedAppRef(newRef);
      setApplyStep("success");
    } catch {
      setSubmitError(`We couldn’t submit your application right now. Please try again in a few minutes.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckStatus = (e) => {
    e.preventDefault();
    setStatusError("");
    if (!statusRef.trim() || !statusEmail.trim()) {
      setStatusError("Please enter both your application reference and email address.");
      return;
    }
    setStatusResult({
      ref: statusRef.trim().toUpperCase(),
      email: statusEmail.trim(),
      role: "Frontend Engineer (React)",
      status: "Under Review",
      updated: "Today, 10:30 AM",
      message:
        "Your application has been received and is currently being reviewed by our engineering hiring team. We will email you with updates soon.",
    });
  };

  const handleSeeSample = () => {
    setStatusRef("ZM-APP-8492");
    setStatusEmail("sdkgroup786@gmail.com");
    setStatusResult({
      ref: "ZM-APP-8492",
      email: "sdkgroup786@gmail.com",
      role: "Frontend Engineer (React)",
      status: "Under Review",
      updated: "Today, 10:30 AM",
      message:
        "Your application has been received and is currently being reviewed by our engineering hiring team. We will email you with updates soon.",
    });
    setStatusError("");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ===================================================
          1. HERO SECTION
          =================================================== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* 1. Left White Hero Card */}
            <div className={styles.heroWhiteCard}>
              <div>
                <div className={styles.heroPill}>
                  <svg
                    className={styles.heroPillIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span className={styles.heroPillText}>Careers at Zoiko Mobile</span>
                </div>

                <h1 className={styles.heroTitle}>
                  Build<br />
                  connections.<br />
                  <span className={styles.heroTitleAccent}>
                    Make a meaningful<br />
                    impact.
                  </span>
                </h1>
              </div>

              <p className={styles.heroDescription}>
                Help bring affordable, everyday wireless to people across the U.S., with a team that also cares about animals and music.
              </p>
            </div>

            {/* 2. Middle Tall Photo Card */}
            <div className={styles.heroMiddleCard}>
              <img
                src="/img/carrers/hero-customer-exp.png"
                alt="Customer experience team member"
              />
              <div className={styles.heroFloatingTag}>
                <Headphones size={14} /> Customer experience
              </div>
            </div>

            {/* 3. Right Column (Top Photo + Bottom Two Photos) */}
            <div className={styles.heroRightCol}>
              <div className={styles.heroTopPhotoCard}>
                <img
                  src="/img/carrers/hero-tech-desk.png"
                  alt="Technology and product workspace"
                />
                <div className={styles.heroFloatingTag}>
                  <Code size={14} /> Technology &amp; product
                </div>
              </div>

              <div className={styles.heroBottomRow}>
                <div className={styles.heroSmallPhotoCard}>
                  <img
                    src="/img/carrers/hero-dog.png"
                    alt="Zoiko animal rescue partner dog"
                  />
                </div>
                <div className={styles.heroSmallPhotoCard}>
                  <img
                    src="/img/carrers/hero-guitar.png"
                    alt="Zoiko acoustic music community guitar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. OUR TEAMS SECTION
          =================================================== */}
      <section id="our-teams" className={styles.teamsSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>Our teams</div>
          <h2 className={styles.sectionTitle}>Find where you fit.</h2>
          <p className={styles.sectionSubtitle}>
            Four areas of work at Zoiko Mobile. These describe our teams, not open positions.
          </p>

          <div className={styles.teamsGrid}>
            {/* Card 1: Technology & Product */}
            <div
              className={`${styles.teamCard} ${
                selectedTeams.includes("Technology & Product") ? styles.teamCardActive : ""
              }`}
              onClick={() => toggleTeamFilter("Technology & Product")}
            >
              <div className={styles.teamImageWrap}>
                <img src="/img/carrers/team-tech.png" alt="Technology & Product" />
                <div className={styles.teamFloatingIcon}>
                  <Code size={22} />
                </div>
              </div>
              <div className={styles.teamCardBody}>
                <h3 className={styles.teamName}>Technology &amp; Product</h3>
                <p className={styles.teamDesc}>
                  Build the apps, website and systems that keep customers connected.
                </p>
                <div className={styles.teamOpenBadge}>4 open roles</div>
              </div>
            </div>

            {/* Card 2: Customer Experience */}
            <div
              className={`${styles.teamCard} ${
                selectedTeams.includes("Customer Experience") ? styles.teamCardActive : ""
              }`}
              onClick={() => toggleTeamFilter("Customer Experience")}
            >
              <div className={styles.teamImageWrap}>
                <img src="/img/carrers/team-cx.png" alt="Customer Experience" />
                <div className={styles.teamFloatingIcon}>
                  <Headphones size={22} />
                </div>
              </div>
              <div className={styles.teamCardBody}>
                <h3 className={styles.teamName}>Customer Experience</h3>
                <p className={styles.teamDesc}>
                  Help customers switch, activate and get the most from their service.
                </p>
                <div className={styles.teamOpenBadge}>3 open roles</div>
              </div>
            </div>

            {/* Card 3: Business & Growth */}
            <div
              className={`${styles.teamCard} ${
                selectedTeams.includes("Business & Growth") ? styles.teamCardActive : ""
              }`}
              onClick={() => toggleTeamFilter("Business & Growth")}
            >
              <div className={styles.teamImageWrap}>
                <img src="/img/carrers/team-business.png" alt="Business & Growth" />
                <div className={styles.teamFloatingIcon}>
                  <TrendingUp size={22} />
                </div>
              </div>
              <div className={styles.teamCardBody}>
                <h3 className={styles.teamName}>Business &amp; Growth</h3>
                <p className={styles.teamDesc}>
                  Grow partnerships, sales and operations across the U.S.
                </p>
                <div className={styles.teamOpenBadge}>3 open roles</div>
              </div>
            </div>

            {/* Card 4: Community & Brand */}
            <div
              className={`${styles.teamCard} ${
                selectedTeams.includes("Community & Brand") ? styles.teamCardActive : ""
              }`}
              onClick={() => toggleTeamFilter("Community & Brand")}
            >
              <div className={styles.teamImageWrap}>
                <img src="/img/carrers/team-community.png" alt="Community & Brand" />
                <div className={styles.teamFloatingIcon}>
                  <Heart size={22} />
                </div>
              </div>
              <div className={styles.teamCardBody}>
                <h3 className={styles.teamName}>Community &amp; Brand</h3>
                <p className={styles.teamDesc}>
                  Tell our story and run our animal-welfare and music programs.
                </p>
                <div className={styles.teamOpenBadge}>2 open roles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. ALL JOBS (FIND YOUR NEXT ROLE)
          =================================================== */}
      <section id="all-jobs" className={styles.jobsSection}>
        <div className={styles.container}>
          <div className={styles.jobsHeaderRow}>
            <div>
              <div className={styles.sectionBadge}>All jobs</div>
              <h2 className={styles.sectionTitle}>Find your next role.</h2>
              <p className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>
                Every posted job is listed here, grouped by team. Each role shows the hiring company, location and pay range where required.
              </p>
            </div>

            <div className={styles.jobsSortWrap}>
              <span className={styles.sortLabel}>Sort by</span>
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most recent</option>
                <option value="title">Title (A-Z)</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>

          <div className={styles.jobsLayout}>
            {/* LEFT SIDEBAR FILTERS */}
            <aside className={styles.filterSidebar}>
              {/* Keyword Search */}
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Keyword</div>
                <div className={styles.filterSearchWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#554A58" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Title or skill"
                    className={styles.filterSearchInput}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>

              {/* Team Checkboxes */}
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Team</div>
                <div className={styles.checkboxList}>
                  {[
                    { name: "Technology & Product", count: 4 },
                    { name: "Customer Experience", count: 3 },
                    { name: "Business & Growth", count: 3 },
                    { name: "Community & Brand", count: 2 },
                  ].map((team) => (
                    <label key={team.name} className={styles.checkboxItem}>
                      <span className={styles.checkboxLabelWrap}>
                        <input
                          type="checkbox"
                          checked={selectedTeams.includes(team.name)}
                          onChange={() => toggleTeamFilter(team.name)}
                        />
                        <span>{team.name}</span>
                      </span>
                      <span className={styles.checkboxCount}>{team.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Select */}
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Location</div>
                <select
                  className={styles.filterSelect}
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="All">All locations</option>
                  <option value="Remote (U.S.)">Remote (U.S.)</option>
                  <option value="Austin, TX">Austin, TX</option>
                  <option value="Sacramento, CA">Sacramento, CA</option>
                  <option value="Orlando, FL">Orlando, FL</option>
                  <option value="Springfield, IL">Springfield, IL</option>
                  <option value="Dover, DE">Dover, DE</option>
                </select>
              </div>

              {/* Work Arrangement Pills */}
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Work arrangement</div>
                <div className={styles.pillOptions}>
                  {["Any", "Remote", "Hybrid", "On-site"].map((arr) => (
                    <button
                      key={arr}
                      type="button"
                      className={`${styles.filterPill} ${
                        selectedArrangement === arr ? styles.filterPillActive : ""
                      }`}
                      onClick={() => setSelectedArrangement(arr)}
                    >
                      {arr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Employment Type */}
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Employment type</div>
                <select
                  className={styles.filterSelect}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="All">All types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Clear filters button */}
              <button
                type="button"
                className={styles.clearFiltersBtn}
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            </aside>

            {/* RIGHT COLUMN - JOB LISTINGS GROUPED BY TEAM */}
            <main className={styles.jobsMainList}>
              <div className={styles.jobsCountBanner}>
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
              </div>

              {filteredJobs.length === 0 ? (
                <div className={styles.noJobsNotice}>
                  <h3>No matching jobs found</h3>
                  <p>Try clearing your filters or searching for another keyword.</p>
                  <button
                    className={styles.clearFiltersBtn}
                    style={{ width: "auto", margin: "16px auto 0" }}
                    onClick={clearFilters}
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                Object.keys(groupedJobs).map((teamName) => {
                  const jobsInTeam = groupedJobs[teamName];
                  const isCollapsed = collapsedTeams[teamName];

                  return (
                    <div key={teamName} className={styles.teamJobGroup}>
                      {/* Group Header */}
                      <div
                        className={styles.teamJobGroupHeader}
                        onClick={() => toggleTeamCollapse(teamName)}
                      >
                        <div className={styles.teamJobGroupTitle}>
                          <span>{teamName}</span>
                          <span className={styles.teamJobCountTag}>
                            {jobsInTeam.length} open {jobsInTeam.length === 1 ? "role" : "roles"}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={styles.toggleAccordionBtn}
                          aria-label="Toggle team jobs"
                        >
                          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </button>
                      </div>

                      {/* Group Jobs in 5-Column Row */}
                      {!isCollapsed && (
                        <div>
                          {jobsInTeam.map((job) => (
                            <div key={job.id} className={styles.jobTableRow}>
                              {/* Col 1: Title + Posted Date / New */}
                              <div className={styles.jobColTitle}>
                                <span
                                  className={styles.jobTitleText}
                                  onClick={() => handleOpenDetails(job)}
                                >
                                  {job.title}
                                </span>
                                <span className={styles.jobPostedSub}>
                                  Posted {job.posted}
                                  {job.isNew && (
                                    <>
                                      <span>•</span>
                                      <span className={styles.jobNewTag}>New</span>
                                    </>
                                  )}
                                </span>
                              </div>

                              {/* Col 2: Location */}
                              <div className={styles.jobColLocation}>
                                <span className={styles.jobPinIcon}><MapPin size={15} /></span>
                                <span>{job.location}</span>
                              </div>

                              {/* Col 3: Work arrangement pill */}
                              <div className={styles.jobColArrangement}>
                                <span className={`${styles.arrangementPill} ${arrClass(job.arrangement)}`}>
                                  {job.arrangement}
                                </span>
                              </div>

                              {/* Col 4: Employment Type */}
                              <div className={styles.jobColType}>
                                {job.type}
                              </div>

                              {/* Col 5: Action Link */}
                              <div className={styles.jobColAction}>
                                <button
                                  type="button"
                                  className={styles.viewJobBtn}
                                  onClick={() => handleOpenDetails(job)}
                                >
                                  View →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. WHY ZOIKO & WHERE WE WORK
          =================================================== */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>Why Zoiko</div>
          <h2 className={styles.sectionTitle}>How we work together.</h2>

          {/* 4 Values with gradient icon boxes */}
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}><Heart size={22} /></div>
              <h3 className={styles.valueTitle}>Customers first</h3>
              <p className={styles.valueDesc}>
                Clear plans, honest pricing and support that actually helps.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}><Star size={22} /></div>
              <h3 className={styles.valueTitle}>Own it</h3>
              <p className={styles.valueDesc}>
                Small teams, real responsibility and room to grow.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}><Users size={22} /></div>
              <h3 className={styles.valueTitle}>Better together</h3>
              <p className={styles.valueDesc}>
                We share what we learn and help each other win.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}><Music size={22} /></div>
              <h3 className={styles.valueTitle}>Give back</h3>
              <p className={styles.valueDesc}>
                Animal welfare and music are part of how we show up.
              </p>
            </div>
          </div>

          {/* Where we work plum banner with 6 cards */}
          <div className={styles.whereWeWorkBanner}>
            <div className={styles.whereHeaderRow}>
              <div className={`${styles.sectionBadge} ${styles.sectionBadgeLight}`}>
                Where we work
              </div>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`} style={{ marginBottom: "6px", fontSize: "28px" }}>
                Offices across the U.S., plus remote roles.
              </h3>
              <p className={`${styles.sectionSubtitle} ${styles.sectionSubtitleLight}`} style={{ marginBottom: 0, fontSize: "14px" }}>
                Each job lists its exact location and work arrangement.
              </p>
            </div>

            <div className={styles.officesCardsGrid}>
              <div className={styles.officeCardBox}>
                <div className={styles.officeBoxTop}>
                  <span className={styles.officePinDot}><MapPin size={14} /></span>
                  <span className={styles.officeCityName}>Austin, TX</span>
                </div>
                <span className={styles.officeRolesSub}>Head office • 3 roles</span>
              </div>

              <div className={styles.officeCardBox}>
                <div className={styles.officeBoxTop}>
                  <span className={styles.officePinDot}><MapPin size={14} /></span>
                  <span className={styles.officeCityName}>Sacramento, CA</span>
                </div>
                <span className={styles.officeRolesSub}>Office • 2 roles</span>
              </div>

              <div className={styles.officeCardBox}>
                <div className={styles.officeBoxTop}>
                  <span className={styles.officePinDot}><MapPin size={14} /></span>
                  <span className={styles.officeCityName}>Orlando, FL</span>
                </div>
                <span className={styles.officeRolesSub}>Office • 1 role</span>
              </div>

              <div className={styles.officeCardBox}>
                <div className={styles.officeBoxTop}>
                  <span className={styles.officePinDot}><MapPin size={14} /></span>
                  <span className={styles.officeCityName}>Springfield, IL</span>
                </div>
                <span className={styles.officeRolesSub}>Office • 1 role</span>
              </div>

              <div className={styles.officeCardBox}>
                <div className={styles.officeBoxTop}>
                  <span className={styles.officePinDot}><MapPin size={14} /></span>
                  <span className={styles.officeCityName}>Dover, DE</span>
                </div>
                <span className={styles.officeRolesSub}>Office • 1 role</span>
              </div>

              <div className={styles.officeCardBox}>
                <div className={styles.officeBoxTop}>
                  <span className={styles.officePinDot}><MapPin size={14} /></span>
                  <span className={styles.officeCityName}>Remote</span>
                </div>
                <span className={styles.officeRolesSub}>Across the U.S. • 4 roles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. LIFE AT ZOIKO
          =================================================== */}
      <section className={styles.lifeSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>Life at Zoiko</div>
          <h2 className={styles.sectionTitle}>Work that connects people.</h2>

          {/* Top row: 2 cards */}
          <div className={styles.lifeTopGrid}>
            {/* Card 1: Wide collaboration image with bottom gradient overlay */}
            <div className={styles.lifeBigCard}>
              <img
                src="/img/carrers/life-collaboration.png"
                alt="Affordable wireless, done right - life at Zoiko"
              />
              <div className={styles.lifeOverlayBanner}>
                <h3 className={styles.lifeOverlayTitle}>
                  Affordable wireless, done right
                </h3>
                <p className={styles.lifeOverlayDesc}>
                  We keep things simple and fair for the people we serve.
                </p>
              </div>
            </div>

            {/* Card 2: Dark plum card with animal & music overlay */}
            <div className={styles.lifeSideCard}>
              <img
                src="/img/carrers/life-dog.png"
                alt="Animals and music matter here"
                className={styles.lifeSideBgImg}
              />
              <div className={styles.lifeSideFloatingIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className={styles.lifeSideContent}>
                <h3 className={styles.lifeOverlayTitle}>
                  Animals &amp; music matter here
                </h3>
                <p className={styles.lifeOverlayDesc}>
                  Our community programs are part of who we are.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row: 3 cards */}
          <div className={styles.lifeBottomGrid}>
            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Benefits</h3>
              <p className={styles.benefitDesc}>
                Listed on each role once confirmed by HR, so you always see what applies to that job.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Pay transparency</h3>
              <p className={styles.benefitDesc}>
                Where the law requires it, every role shows its approved pay range.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Employee stories</h3>
              <p className={styles.benefitDesc}>
                Coming soon, told by our team in their own words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          6. HOW WE HIRE (5 STEPS)
          =================================================== */}
      <section className={styles.hireSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>How we hire</div>
          <h2 className={styles.sectionTitle}>Clear steps, no surprises.</h2>
          <p className={styles.sectionSubtitle}>
            Role-specific steps may differ. We’ll always tell you what comes next.
          </p>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <div className={styles.stepBadgeCircle}>1</div>
              <div className={styles.stepWatermark}>01</div>
              <h3 className={styles.stepTitle}>Apply</h3>
              <p className={styles.stepDesc}>
                Send your details and resume for an approved role.
              </p>
            </div>

            {/* Step 2 */}
            <div className={styles.stepCard}>
              <div className={styles.stepBadgeCircle}>2</div>
              <div className={styles.stepWatermark}>02</div>
              <h3 className={styles.stepTitle}>Review</h3>
              <p className={styles.stepDesc}>
                Our team reviews your application against the role.
              </p>
            </div>

            {/* Step 3 (Highlighted Dark Card) */}
            <div className={`${styles.stepCard} ${styles.stepCardActive}`}>
              <div className={styles.stepBadgeCircle}>3</div>
              <div className={styles.stepWatermark}>03</div>
              <h3 className={styles.stepTitle}>Interview</h3>
              <p className={styles.stepDesc}>
                If it’s a fit, we’ll invite you to talk. Steps vary by role.
              </p>
            </div>

            {/* Step 4 */}
            <div className={styles.stepCard}>
              <div className={styles.stepBadgeCircle}>4</div>
              <div className={styles.stepWatermark}>04</div>
              <h3 className={styles.stepTitle}>Decision</h3>
              <p className={styles.stepDesc}>
                We’ll let you know the outcome either way.
              </p>
            </div>

            {/* Step 5 */}
            <div className={styles.stepCard}>
              <div className={styles.stepBadgeCircle}>5</div>
              <div className={styles.stepWatermark}>05</div>
              <h3 className={styles.stepTitle}>Onboarding</h3>
              <p className={styles.stepDesc}>
                Welcome to the team. We’ll help you get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          7. MY APPLICATION STATUS CHECKER
          =================================================== */}
      <section className={styles.statusSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>My application</div>
          <h2 className={styles.sectionTitle}>Check your application status.</h2>
          <p className={styles.sectionSubtitle}>
            Use the reference from your confirmation and the email you applied with.
          </p>

          <div className={styles.statusCardGrid}>
            {/* Left Form Card */}
            <div className={styles.statusFormCard}>
              <form onSubmit={handleCheckStatus}>
                <div className={styles.statusInputGroup}>
                  <label className={styles.statusLabel}>Application reference</label>
                  <input
                    type="text"
                    placeholder="ZM-APP-0000"
                    className={styles.statusInput}
                    value={statusRef}
                    onChange={(e) => setStatusRef(e.target.value)}
                  />
                </div>

                <div className={styles.statusInputGroup}>
                  <label className={styles.statusLabel}>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.statusInput}
                    value={statusEmail}
                    onChange={(e) => setStatusEmail(e.target.value)}
                  />
                </div>

                {statusError && (
                  <p style={{ color: "#E50046", fontSize: "13px", margin: "4px 0" }}>
                    {statusError}
                  </p>
                )}

                <div className={styles.statusButtonRow}>
                  <button type="submit" className={styles.primaryCheckBtn}>
                    Check status
                  </button>
                  <button
                    type="button"
                    className={styles.sampleBtn}
                    onClick={handleSeeSample}
                  >
                    See a sample
                  </button>
                </div>

                <p className={styles.statusSubtext}>
                  Your candidate details are separate from any Zoiko Mobile customer account.
                </p>
              </form>

              {/* Status Result Preview Box */}
              {statusResult && (
                <div className={styles.statusResultBox}>
                  <div className={styles.statusResultTitle}>
                    <span>Ref: {statusResult.ref}</span>
                    <span className={styles.statusPill}>{statusResult.status}</span>
                  </div>
                  <div className={styles.statusResultDetail}>
                    <p><strong>Role:</strong> {statusResult.role}</p>
                    <p><strong>Updated:</strong> {statusResult.updated}</p>
                    <p style={{ marginTop: "4px" }}>{statusResult.message}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Candidate Portal Image Card */}
            <div className={styles.statusImageCard}>
              <div className={styles.statusImageWrap}>
                <img
                  src="/img/carrers/status-candidate.png"
                  alt="Candidate tracking application status on smartphone"
                />
              </div>
              <div className={styles.statusImageCaption}>
                Your status appears here. We share clear updates, never other candidates’ details or internal notes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          8. INCLUSIVE & SAFE HIRING
          =================================================== */}
      <section className={styles.inclusiveSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>Inclusive &amp; safe hiring</div>
          <h2 className={styles.sectionTitle}>Everyone deserves a fair chance.</h2>

          <div className={styles.inclusiveGrid}>
            <div className={styles.inclusiveCard}>
              <div className={styles.inclusiveIcon}><Heart size={22} /></div>
              <h3 className={styles.inclusiveTitle}>Equal opportunity</h3>
              <p className={styles.inclusiveDesc}>
                [Legal-approved equal employment opportunity statement for the hiring company.] Zoiko Mobile provides equal employment opportunities to all employees and applicants without regard to race, color, religion, sex, national origin, age, disability or genetics.
              </p>
            </div>

            <div className={styles.inclusiveCard}>
              <div className={styles.inclusiveIcon}><Headphones size={22} /></div>
              <h3 className={styles.inclusiveTitle}>Accommodations</h3>
              <p className={styles.inclusiveDesc}>
                Need an adjustment to apply or interview? Contact [approved accommodations contact] at accommodations@zoikomobile.com or call 800-988-8116. You don’t need to share medical details in your application.
              </p>
            </div>

            <div className={`${styles.inclusiveCard} ${styles.inclusiveCardDark}`}>
              <div className={styles.inclusiveIcon}><ShieldCheck size={22} /></div>
              <h3 className={styles.inclusiveTitle}>Avoid hiring scams</h3>
              <p className={styles.inclusiveDesc}>
                We’ll never ask you to pay a fee, buy equipment or share bank details to get a job. Recruiters only contact you from official @zoikomobile.com email addresses.
              </p>
              <a
                href="mailto:careers@zoikomobile.com?subject=Report%20Suspicious%20Contact"
                className={styles.scamReportLink}
              >
                Report suspicious contact →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          9. HIRING FAQS
          =================================================== */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionBadge}>FAQs</div>
          <h2 className={styles.sectionTitle}>Hiring questions, answered.</h2>

          <div className={styles.faqLayout}>
            {/* Left Contact Card with notepad photo */}
            <div className={styles.faqSideCard}>
              <div className={styles.faqSideImgWrap}>
                <img
                  src="/img/carrers/faq-notepad.png"
                  alt="Writing notes on desk"
                />
              </div>
              <div className={styles.faqSideBody}>
                <h3 className={styles.faqSideTitle}>Need help with an application?</h3>
                <p className={styles.faqSideText}>
                  Contact careers@zoikomobile.com or call 800-988-8116.
                </p>
                <a
                  href="mailto:careers@zoikomobile.com"
                  className={styles.faqContactBtn}
                >
                  Contact recruiting support →
                </a>
              </div>
            </div>

            {/* Right Accordion with 6 items */}
            <div className={styles.accordionList}>
              {FAQS.map((faq, index) => {
                const isOpen = faqOpenIndex === index;
                return (
                  <div
                    key={faq.q}
                    className={`${styles.accordionItem} ${
                      isOpen ? styles.accordionItemOpen : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={styles.accordionHeader}
                      onClick={() => setFaqOpenIndex(isOpen ? -1 : index)}
                    >
                      <span>{faq.q}</span>
                      <span className={styles.accordionIcon}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className={styles.accordionBody}>
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PHOTO CREDITS STRIP
          =================================================== */}
      <div className={styles.photoCreditsStrip}>
        <div className={styles.container}>
          <span>ⓘ Photo credits</span>
        </div>
      </div>

      {/* ===================================================
          10. MODAL 1: JOB DETAILS MODAL
          =================================================== */}
      {selectedJob && (
        <div className={styles.modalBackdrop} onClick={handleCloseDetails}>
          <div
            className={styles.modalWindow}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={handleCloseDetails}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.modalTopCategory}>
              {selectedJob.team.toUpperCase()} • EXAMPLE LISTING
            </div>
            <h2 className={styles.modalJobTitle}>{selectedJob.title}</h2>

            <div className={styles.modalTwoCol}>
              {/* Left Column: Job Description */}
              <div>
                <h3 className={styles.modalSectionHeading}>About the role</h3>
                <p className={styles.modalParagraph}>{selectedJob.about}</p>

                <h3 className={styles.modalSectionHeading}>What you'll do</h3>
                <ul className={styles.modalBulletList}>
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <h3 className={styles.modalSectionHeading}>What you'll need</h3>
                <ul className={styles.modalBulletList}>
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>

                {selectedJob.niceToHave && selectedJob.niceToHave.length > 0 && (
                  <>
                    <h3 className={styles.modalSectionHeading}>Nice to have</h3>
                    <ul className={styles.modalBulletList}>
                      {selectedJob.niceToHave.map((nth, i) => (
                        <li key={i}>{nth}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Right Column: Meta Card + Apply CTA */}
              <div className={styles.modalSideCard}>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Hiring company</span>
                  <span className={styles.modalSideValue}>
                    {selectedJob.hiringCompany}
                  </span>
                </div>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Reports to</span>
                  <span className={styles.modalSideValue}>
                    {selectedJob.reportsTo}
                  </span>
                </div>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Location</span>
                  <span className={styles.modalSideValue}>
                    {selectedJob.location}
                  </span>
                </div>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Work arrangement</span>
                  <span className={styles.modalSideValue}>
                    {selectedJob.arrangement}
                  </span>
                </div>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Employment type</span>
                  <span className={styles.modalSideValue}>{selectedJob.type}</span>
                </div>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Pay</span>
                  <span className={styles.modalSideValue}>{selectedJob.pay}</span>
                </div>
                <div className={styles.modalSideRow}>
                  <span className={styles.modalSideLabel}>Posted • Closes</span>
                  <span className={styles.modalSideValue}>
                    {selectedJob.posted} • {selectedJob.closes}
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.modalApplyCTA}
                  onClick={() => handleStartApply(selectedJob)}
                >
                  Apply for this role
                </button>

                <p className={styles.modalLegalNote}>
                  Zoiko Mobile is an equal opportunity employer. We welcome applicants of all backgrounds. Need an accommodation to apply? Call 800-988-8116.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          11. MODAL 2: MULTI-STEP APPLICATION FLOW
          =================================================== */}
      {applyJob && (
        <div className={styles.modalBackdrop} onClick={handleCloseApply}>
          <div
            className={styles.modalWindow}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={handleCloseApply}
              aria-label="Close modal"
            >
              ✕
            </button>

            {applyStep !== "success" && (
              <>
                <div className={styles.modalTopCategory}>
                  {applyJob.team.toUpperCase()} • EXAMPLE LISTING
                </div>
                <h2 className={styles.modalJobTitle}>{applyJob.title}</h2>

                {/* Stepper Header */}
                <div className={styles.modalStepper}>
                  <div className={styles.stepProgressItem}>
                    <div
                      className={`${styles.stepProgressBar} ${styles.stepProgressBarActive}`}
                    />
                    <span
                      className={`${styles.stepProgressLabel} ${
                        applyStep >= 1 ? styles.stepProgressLabelActive : ""
                      }`}
                    >
                      Role
                    </span>
                  </div>

                  <div className={styles.stepProgressItem}>
                    <div
                      className={`${styles.stepProgressBar} ${
                        applyStep >= 2 ? styles.stepProgressBarActive : ""
                      }`}
                    />
                    <span
                      className={`${styles.stepProgressLabel} ${
                        applyStep >= 2 ? styles.stepProgressLabelActive : ""
                      }`}
                    >
                      Your details
                    </span>
                  </div>

                  <div className={styles.stepProgressItem}>
                    <div
                      className={`${styles.stepProgressBar} ${
                        applyStep >= 3 ? styles.stepProgressBarActive : ""
                      }`}
                    />
                    <span
                      className={`${styles.stepProgressLabel} ${
                        applyStep >= 3 ? styles.stepProgressLabelActive : ""
                      }`}
                    >
                      Review
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* STEP 1: ROLE CONFIRMATION */}
            {applyStep === 1 && (
              <div>
                <div className={styles.applyAlertBox}>
                  You're applying for <strong>{applyJob.title}</strong> • {applyJob.location} • {applyJob.arrangement}. We've checked this role is still open.
                </div>

                <div className={styles.applyQuestionTitle}>
                  Can you work the schedule and location described for this role?
                </div>

                <div className={styles.applyRadioGroup}>
                  <label
                    className={`${styles.applyRadioBtn} ${
                      applyForm.canWorkSchedule === "yes" ? styles.applyRadioBtnActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="schedule"
                      value="yes"
                      checked={applyForm.canWorkSchedule === "yes"}
                      onChange={() =>
                        setApplyForm({ ...applyForm, canWorkSchedule: "yes" })
                      }
                      style={{ accentColor: "#E50046" }}
                    />
                    <span>Yes</span>
                  </label>

                  <label
                    className={`${styles.applyRadioBtn} ${
                      applyForm.canWorkSchedule === "no" ? styles.applyRadioBtnActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="schedule"
                      value="no"
                      checked={applyForm.canWorkSchedule === "no"}
                      onChange={() =>
                        setApplyForm({ ...applyForm, canWorkSchedule: "no" })
                      }
                      style={{ accentColor: "#E50046" }}
                    />
                    <span>No</span>
                  </label>
                </div>

                <div className={styles.modalActionRow}>
                  <button
                    type="button"
                    className={styles.modalBackBtn}
                    onClick={() => {
                      setSelectedJob(applyJob);
                      setApplyJob(null);
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.modalSubmitBtn}
                    onClick={() => setApplyStep(2)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: YOUR DETAILS */}
            {applyStep === 2 && (
              <div>
                <div className={styles.applyFormGrid}>
                  <div>
                    <label className={styles.statusLabel}>Full Name *</label>
                    <input
                      type="text"
                      className={styles.statusInput}
                      value={applyForm.fullName}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, fullName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.statusLabel}>Email address *</label>
                    <input
                      type="email"
                      className={styles.statusInput}
                      value={applyForm.email}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.statusLabel}>City / Location *</label>
                    <input
                      type="text"
                      className={styles.statusInput}
                      value={applyForm.city}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, city: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className={styles.statusLabel}>Phone Number</label>
                    <input
                      type="tel"
                      className={styles.statusInput}
                      value={applyForm.phone}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.applyFormFull}>
                    <label className={styles.statusLabel}>Resume / CV *</label>
                    <label className={styles.uploadBox}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setApplyForm({
                              ...applyForm,
                              resumeName: e.target.files[0].name,
                            });
                          }
                        }}
                      />
                      <div className={styles.uploadIcon}>📄</div>
                      <div className={styles.uploadTitle}>
                        {applyForm.resumeName || "Click to browse or drop resume"}
                      </div>
                      <div className={styles.uploadHelp}>
                        PDF, DOCX, DOC up to 10MB
                      </div>
                    </label>
                  </div>
                </div>

                <div className={styles.modalActionRow}>
                  <button
                    type="button"
                    className={styles.modalBackBtn}
                    onClick={() => setApplyStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.modalSubmitBtn}
                    onClick={() => setApplyStep(3)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & SUBMIT */}
            {applyStep === 3 && (
              <div>
                <div className={styles.reviewBox}>
                  <div className={styles.reviewName}>{applyForm.fullName}</div>
                  <div className={styles.reviewMeta}>
                    {applyForm.email} • {applyForm.city}
                  </div>
                  <div className={styles.reviewResume}>
                    Resume: {applyForm.resumeName}
                  </div>
                  <div className={styles.reviewRole}>
                    Role: {applyJob.title}
                  </div>
                </div>

                <label className={styles.consentItem}>
                  <input
                    type="checkbox"
                    checked={applyForm.privacyConsent}
                    onChange={(e) =>
                      setApplyForm({
                        ...applyForm,
                        privacyConsent: e.target.checked,
                      })
                    }
                  />
                  <span>
                    I've read the{" "}
                    <span className={styles.consentLink}>Candidate Privacy Notice</span>{" "}
                    and confirm my information is accurate.
                  </span>
                </label>

                <label className={styles.consentItem}>
                  <input
                    type="checkbox"
                    checked={applyForm.futureRolesConsent}
                    onChange={(e) =>
                      setApplyForm({
                        ...applyForm,
                        futureRolesConsent: e.target.checked,
                      })
                    }
                  />
                  <span>
                    Optional: email me about future roles that match my interests.
                  </span>
                </label>

                {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}

                <div className={styles.modalActionRow}>
                  <button
                    type="button"
                    className={styles.modalBackBtn}
                    onClick={() => setApplyStep(2)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.modalSubmitBtn}
                    onClick={handleSubmitApplication}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS CONFIRMATION */}
            {applyStep === "success" && (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Application submitted!</h3>
                <div className={styles.refTagBox}>
                  Reference: {generatedAppRef}
                </div>
                <p className={styles.successDesc}>
                  Thank you, <strong>{applyForm.fullName}</strong>. We've sent a confirmation email to <strong>{applyForm.email}</strong> for the <strong>{applyJob.title}</strong> role. You can track your status anytime using your reference number.
                </p>
                <button
                  type="button"
                  className={styles.modalSubmitBtn}
                  onClick={handleCloseApply}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppFloating from "./WhatsApp";
import {
  Smartphone,
  UserRound,
  BriefcaseBusiness,
  Music,
  UsersRound,
  ShieldCheck,
  Phone,
  Mail,
  Headphones,
  ChevronRight,
  ChevronDown,
  ArrowRightLeft,
  CreditCard,
  PawPrint,
  Layers3,
  MapPin,
  MessageCircleMore,
  Clock3,
  Lock,
  Shield,
  Signal,
  SmartphoneNfc,
  Play,
  Facebook,
  Instagram,
  X,
  Youtube,
  Linkedin,
} from "lucide-react";
import { FaApple } from "react-icons/fa6";
import "../globals.css";
import "./Footer.css";

// TODO: replace with the real store listing URLs once the apps are published.
const APP_LINKS = {
  googlePlay: "#",
  appStore: "#",
};

const NAV_COLUMNS = [
  {
    title: ["Plans &", "Pricing"],
    icon: Layers3,
    links: [
      ["All Wireless Plans", "/wireless-plans"],
      ["Compare Plans", "/all-plans"],
      ["Zoiko Lite", "/plans/zoiko-lite"],
      ["Zoiko Core", "/plans/zoiko-core"],
      ["Zoiko Max", "/plans/zoiko-max"],
      ["Family & Multi-Line", "/multi-line-options"],
      ["Prepaid Plans", "/prepaid-plans"],
      ["Current Offers", "/offer-page"],
    ],
  },
  {
    title: ["Phones &", "Devices"],
    icon: Smartphone,
    links: [
      ["Shop Smartphones", "/shop-phones"],
      ["Refurbished Phones", "/product-category/refurbished"],
      ["Accessories", "/accessories"],
      ["Bring Your Own Phone", "/byod-plans"],
      ["Device Protection", "/device-protection"],
      ["Tablets & Hotspots", "/devices"],
      ["Check Compatibility", "/check-compatibility"],
    ],
  },
  {
    title: ["Activation &", "Account"],
    icon: UserRound,
    links: [
      ["Activate SIM /eSIM", "/activate"],
      ["Switch & Save", "/switch"],
      ["Transfer Your Number", "/switch"],
      ["Top Up / Add Data", "/top-up-plan"],
      ["Manage My Account", "/dashboard"],
      ["Track Activation", "/activate"],
      ["Keep Your Number", "/switch"],
    ],
  },
  {
    title: ["Business &", "International"],
    icon: BriefcaseBusiness,
    links: [
      ["Business Plans", "/business-deals"],
      ["International Calling", "/international-callings"],
      ["Travel & Roaming", "/travel-plans"],
      ["Check a Destination", "/international-calling-country-list"],
      ["International Usage Tips", "/international-usage-tips"],
      ["Canada & Mexico Roaming", "/canada-mexico-roaming-plans"],
      ["Partner With Us", "/become-partner"],
    ],
  },
  {
    title: ["Animal & Music", "Community"],
    icon: PawPrint,
    iconFill: true,
    links: [
      ["Animal Charities", "/animal-charities"],
      ["Zoiko Music Hub", "/music-hub"],
      ["Music Events & Perks", "/music-events-perk"],
      ["Get Involved", "/get-involved"],
      ["How Giving Works", "/zoiko-mobile-animal-welfare-partnership"],
      ["Stories & Impact", "/explore-community"],
      ["Artists & Creators", "/music-hub"],
      ["Events & Experiences", "/music-events-perk"],
    ],
  },
  {
    title: ["About Zoiko"],
    icon: UsersRound,
    links: [
      ["Our Story", "/about"],
      ["Press & Media", "/news"],
      ["Sustainability", "/sustainability"],
      ["Blog", "/blog"],
      ["Careers", "/careers"],
      ["Become an Affiliate", "/become-affiliate"],
      ["Contact Us", "/contact-us"],
    ],
  },
  {
    title: ["Help, Legal &", "Privacy"],
    icon: ShieldCheck,
    links: [
      ["Help & Support", "/support"],
      ["FAQs", "/faq"],
      ["Coverage Map", "https://mvnoc.ai/coverage-map", true],
      ["Network & Service", "/network-service"],
      ["911 / E911 Disclosure", "/911-e911-disclosure"],
      ["Privacy Choices", "/do-not-sell-my-personal-information"],
      ["Accessibility", "/terms-and-conditions"],
      ["Broadband Consumer Labels", "/consumer-information"],
    ],
  },
];

const QUICK_ACTIONS = [
  { label: "Check Coverage", href: "https://mvnoc.ai/coverage-map", icon: Signal, external: true },
  { label: "Activate SIM /eSIM", href: "/activate", icon: SmartphoneNfc },
  { label: "Transfer Your Number", href: "/switch", icon: ArrowRightLeft },
  { label: "Top Up Account", href: "/top-up-plan", icon: CreditCard },
  { label: "Get Support", href: "/support", icon: Headphones },
];

const OFFICES = [
  { title: "Head Office – Austin, TX", lines: ["5900 Balcones Drive, Suite 24685", "Austin, TX 78731, USA"] },
  { title: "California – Sacramento, CA", lines: ["1401 21st Street, Suite R", "Sacramento, CA 95811, USA"] },
  { title: "Delaware – Dover, DE", lines: ["8 The Green, Suite A", "Dover, DE 19901, USA"] },
  { title: "Illinois – Springfield, IL", lines: ["2501 Chatham Road, Suite R", "Springfield, IL 62704, USA"] },
  { title: "Florida – Orlando, FL", lines: ["12386 State Road 535, #302", "Orlando, FL 32836, USA"] },
];

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/zoikomobile", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/zoikomobileus", icon: Instagram },
  { label: "X (Twitter)", href: "https://x.com/zoikomobileusa", icon: X },
  { label: "YouTube", href: "https://www.youtube.com/@ZoikoMobileUSA", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zoikomobileusa/", icon: Linkedin },
];

const LEGAL_LINKS = [
  ["Terms & Conditions", "/terms-and-conditions"],
  ["Privacy Policy", "/privacy-policy"],
  ["Cookies Policy", "/cookie-policy"],
  ["Accessibility", "/terms-and-conditions"],
  ["Network Management", "/network-service"],
  ["Broadband Consumer Label", "/consumer-information"],
  ["Regulatory Information", "/regularity-information"],
  ["Your Privacy Choices", "/do-not-sell-my-personal-information"],
  ["911 / E911", "/911-e911-disclosure"],
];

const openChat = () => {
  window.open("https://zoikon-722985113446.europe-west1.run.app/ui/", "_blank");
};

const Footer = () => {
  const curyear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubscribe = async (e) => {
    if (e) e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage("⚠️ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("✅ Subscription successful! Thank you for subscribing.");
        setEmail("");
      } else {
        setMessage(data?.message || "❌ Subscription failed. Please try again.");
      }
    } catch {
      setMessage("⚠️ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <WhatsAppFloating />

      <footer className="zf">
        {/* ============ 1. NEWSLETTER + APP BANNER ============ */}
        <section className="zf-loop">
          <div className="zf-container zf-loop-inner">
            <div className="zf-loop-intro">
              <span className="zf-loop-mail" aria-hidden="true">
                <Mail size={66} strokeWidth={1.9} />
              </span>
              <div className="zf-loop-copy">
                <h2>Stay in the Zoiko Loop</h2>
                <p>
                  Get exclusive plan offers, new devices, music events and animal charity
                  updates.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="zf-loop-form">
              <label className="zf-loop-label" htmlFor="zf-footer-email">
                Email address
              </label>
              <div className="zf-loop-capsule">
                <Mail size={18} strokeWidth={1.75} className="zf-loop-input-icon" aria-hidden="true" />
                <input
                  id="zf-footer-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="zf-loop-input"
                  required
                />
                <button type="submit" disabled={loading} className="zf-loop-btn">
                  {loading ? "Subscribing..." : "Subscribe"}
                  {!loading && <ChevronRight size={16} strokeWidth={2.75} />}
                </button>
              </div>

              <div className="zf-loop-consent">
                <input
                  type="checkbox"
                  id="zf-consent"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="zf-consent">
                  I agree to receive marketing communications from Zoiko Mobile. You can
                  unsubscribe at any time. <Link href="/privacy-policy">Privacy Policy</Link>
                </label>
              </div>

              {message && (
                <div
                  className="zf-loop-msg"
                  style={{ color: message.includes("✅") ? "#D1FAE5" : "#FFE4E6" }}
                >
                  {message}
                </div>
              )}
            </form>

            <div className="zf-app">
              <span className="zf-app-phone" aria-hidden="true">
                <span className="zf-app-phone-bar" />
              </span>
              <div className="zf-app-copy">
                <h3>Get the Zoiko Mobile App</h3>
                <p>Manage your plan, usage, and payments on the go.</p>
                <div className="zf-app-btns">
                  <a href={APP_LINKS.googlePlay} className="zf-store-btn">
                    <Play size={15} fill="currentColor" strokeWidth={1} /> Google Play
                  </a>
                  <a href={APP_LINKS.appStore} className="zf-store-btn">
                    <FaApple size={14} /> App Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. NAVIGATION DIRECTORY ============ */}
        <section className="zf-dir">
          <div className="zf-container zf-dir-grid">
            <div className="zf-brand">
              <Link href="/" aria-label="Zoiko Mobile home" className="zf-brand-logo-link">
                <Image
                  src="/img/zoiko-footer-logo.webp"
                  alt="Zoiko Mobile Logo"
                  width={176}
                  height={61}
                  className="zf-brand-logo"
                />
              </Link>
              <div className="zf-brand-tagline">
                The Animal &amp; Music
                <br />
                Loving Network.™
              </div>
              <svg
                className="zf-brand-underline"
                viewBox="0 0 196 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="zfUnderline" x1="0" x2="1">
                    <stop offset="0%" stopColor="#E0115F" />
                    <stop offset="100%" stopColor="#F26A2A" />
                  </linearGradient>
                </defs>
                <path
                  d="M1 8.5 C40 4.5 120 2 195 1.2 L195 3.6 C120 4.6 50 6.6 2 9.6 Z"
                  fill="url(#zfUnderline)"
                />
              </svg>
              <p className="zf-brand-desc">
                Affordable, flexible wireless for people who love their pets, their music and
                the freedom to stay connected across the USA.
              </p>
            </div>

            {NAV_COLUMNS.map(({ title, icon: Icon, iconFill, links }) => (
              <div className="zf-col" key={title.join(" ")}>
                <Icon
                  size={32}
                  strokeWidth={1.75}
                  className="zf-col-icon"
                  aria-hidden="true"
                  {...(iconFill ? { fill: "currentColor" } : {})}
                />
                <h4 className="zf-col-title">
                  {title.map((t, i) => (
                    <span key={t}>
                      {t}
                      {i < title.length - 1 && <br />}
                    </span>
                  ))}
                </h4>
                <ul className="zf-col-list">
                  {links.map(([label, href, external]) => (
                    <li key={label}>
                      <Link href={href} {...(external ? { target: "_blank" } : {})}>
                        <span>{label}</span>
                        <ChevronRight size={12} strokeWidth={3} className="zf-chev" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="zf-container zf-quick">
            <div className="zf-quick-mark" aria-hidden="true">
              <PawPrint size={40} fill="currentColor" strokeWidth={1} />
              <span className="zf-quick-mark-sep" />
              <Music size={44} strokeWidth={2.4} />
            </div>
            <nav className="zf-quick-pill" aria-label="Quick actions">
              {QUICK_ACTIONS.map(({ label, href, icon: Icon, external }) => (
                <Link
                  key={label}
                  href={href}
                  className="zf-quick-item"
                  {...(external ? { target: "_blank" } : {})}
                >
                  <Icon size={24} strokeWidth={2} className="zf-quick-icon" />
                  <span>{label}</span>
                  <ChevronRight size={16} strokeWidth={2.75} className="zf-quick-chev" />
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* ============ 3. DARK FOOTER ============ */}
        <section className="zf-dark">
          <div className="zf-container">
            {/* Offices */}
            <div className="zf-offices">
              <div className="zf-offices-head">
                <MapPin size={34} strokeWidth={1.75} />
                <h4>
                  Our Offices
                  <br />
                  (USA)
                </h4>
              </div>
              {OFFICES.map((o) => (
                <div className="zf-office" key={o.title}>
                  <h5>{o.title}</h5>
                  {o.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="zf-offices-all">
              <Link href="/contact-us">
                <MapPin size={22} strokeWidth={1.75} className="zf-pink" />
                All Locations &amp; Offices
                <ChevronRight size={16} strokeWidth={2.75} className="zf-pink" />
              </Link>
            </div>

            {/* Contact + socials */}
            <div className="zf-contact">
              <div className="zf-contact-links">
                <a href="tel:8009888116" className="zf-contact-phone">
                  <Phone size={32} strokeWidth={1.75} className="zf-pink" />
                  800-988-8116
                </a>
                <button type="button" onClick={openChat} className="zf-contact-link">
                  <MessageCircleMore size={28} strokeWidth={1.75} className="zf-pink" />
                  Live Chat
                </button>
                <a href="mailto:info@zoikomobile.com" className="zf-contact-link">
                  <Mail size={28} strokeWidth={1.75} className="zf-pink" />
                  Email Us
                </a>
                <Link href="/customer-service" className="zf-contact-link">
                  <Clock3 size={30} strokeWidth={1.75} className="zf-pink" />
                  Customer Support
                </Link>
              </div>

              <div className="zf-follow">
                <span className="zf-follow-label">Follow Zoiko Mobile</span>
                <div className="zf-socials">
                  {SOCIALS.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className="zf-social"
                      aria-label={label}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Legal links */}
            <div className="zf-legal">
              {LEGAL_LINKS.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="zf-bottom">
              <div className="zf-copyright">
                © {curyear} Zoiko Mobile | A trading name of Zoiko Mobile Inc. All rights reserved.
              </div>
              <div className="zf-badges">
                <Link href="/regularity-information" className="zf-badge">
                  <span className="zf-badge-fcc">FCC</span>
                  <span className="zf-badge-text">
                    <strong>FCC information</strong>
                    <small>Regulatory disclosures</small>
                  </span>
                </Link>
                <div className="zf-badge">
                  <Lock size={24} strokeWidth={1.9} />
                  <span className="zf-badge-text">
                    <strong>Secure &amp;</strong>
                    <strong>Encrypted</strong>
                  </span>
                </div>
                <div className="zf-badge">
                  <Shield size={24} strokeWidth={1.9} />
                  <span className="zf-badge-text">
                    <strong>PCI DSS Compliant</strong>
                  </span>
                </div>
                <div className="zf-lang" aria-label="Language: English (US)">
                  <svg width="30" height="20" viewBox="0 0 30 20" aria-hidden="true">
                    <rect width="30" height="20" fill="#B22234" />
                    {[1, 3, 5, 7, 9, 11].map((i) => (
                      <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#fff" />
                    ))}
                    <rect width="13" height={(7 * 20) / 13} fill="#3C3B6E" />
                  </svg>
                  English (US)
                  <ChevronDown size={18} strokeWidth={2.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Gradient wave */}
          <img src="/img/zoiko-footer-wave.webp" alt="" aria-hidden="true" className="zf-wave" />
        </section>
      </footer>
    </>
  );
};

export default Footer;

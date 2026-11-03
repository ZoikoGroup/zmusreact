"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  MapPin,
  Activity,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  User,
  LogOut,
  Layers,
  Tag,
  Wifi,
  Briefcase,
  Users,
  Plane,
  PhoneCall,
  Globe,
  Sparkles,
  PawPrint,
  Music,
} from "lucide-react";
import styles from "./Header.module.css";

import PlanPurchaseModal from "./PlanPurchaseModal";
import PaymentModal from "./PaymentModal";
import CustomLanguageSwitcher from "./CustomLanguageSwitcher";
import GetInTouchSidebar from "./GetInTouchSidebar";
import ChristmasSidebar from "./ChristmasSidebar";
import "../globals.css";
import { Tooltip } from "react-bootstrap";

// Legacy callback hooks for other components to trigger plan/payment modals
let openPlanModalCallback = null;
let openPaymentModalCallback = null;

// ✅ Global Payment Modal trigger
export function openPaymentModal(orderId, amount) {
  if (openPaymentModalCallback) {
    openPaymentModalCallback(orderId, amount);
  }
}

// ✅ Global Plan Purchase Modal trigger
export function openPlanPurchaseModal(
  planTitle,
  planSlug,
  planId,
  planPrice,
  planSalePrice,
  planDuration,
  planBqid,
  planType,
) {
  if (openPlanModalCallback) {
    openPlanModalCallback(
      planTitle,
      planSlug,
      planId,
      planPrice,
      planSalePrice,
      planDuration,
      planBqid,
      planType,
    );
  }
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  // User auth & cart states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Modal states
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({ orderId: "", amount: 0 });
  const [modalData, setModalData] = useState({
    title: "",
    slug: "",
    id: "",
    bq_id: "",
    plan_type: "",
    price: 0,
    sale_price: 0,
    duration: "",
  });

  // Check auth and cart on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("zoiko_token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setIsLoggedIn(true);
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
        }
      }

      const syncCart = () => {
        try {
          const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
          const totalQty = storedCart.reduce(
            (sum, item) => sum + Number(item.formData?.priceQty ?? 1),
            0,
          );
          setCartCount(totalQty);
        } catch {
          setCartCount(0);
        }
      };

      syncCart();
      window.addEventListener("cartUpdated", syncCart);
      return () => window.removeEventListener("cartUpdated", syncCart);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("zoiko_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchOpen(false);
  };

  // Global Plan Modal Opener
  const handleOpenPlanModal = (
    title,
    slug,
    id,
    price,
    sale_price,
    duration,
    bq_id,
    plan_type,
  ) => {
    if (plan_type === "topup") {
      const cartItem = {
        type: "topup",
        planTitle: title,
        planSlug: slug,
        planId: id,
        planPrice: sale_price || price,
        planDuration: duration,
        planBqid: bq_id,
        planType: "topup",
        lineType: null,
        simType: "topup",
        formData: { priceQty: 1 },
      };
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));
      router.push("/checkout");
      return;
    }

    setModalData({
      title,
      slug,
      id,
      price,
      sale_price,
      duration,
      bq_id,
      plan_type,
    });
    setShowPlanModal(true);
  };
  openPlanModalCallback = handleOpenPlanModal;

  const handleOpenPaymentModal = (orderId, amount) => {
    setPaymentData({ orderId, amount });
    setShowPaymentModal(true);
  };
  openPaymentModalCallback = handleOpenPaymentModal;

  return (
    <>
      <div className="zk-header-wrapper">
        {/* ==============================================================
            TOP UTILITY BAR (Coverage Map, Network Status, Support, Phone)
            ============================================================== */}
        <div className="zk-topbar">
          <div className="zk-topbar-container">
            <div className="zk-topbar-left">
              <Link
                href="https://mvnoc.ai/coverage-map"
                target="_blank"
                className="zk-topbar-link"
              >
                <span className="zk-topbar-icon">
                  <MapPin size={13} strokeWidth={2.2} />
                </span>
                Coverage Map
              </Link>

              <Link href="/network-service" className="zk-topbar-link">
                <span className="zk-topbar-icon">
                  <Activity size={13} strokeWidth={2.2} />
                </span>
                Network Status
              </Link>

              <Link href="/support" className="zk-topbar-link">
                <span className="zk-topbar-icon">
                  <HelpCircle size={13} strokeWidth={2.2} />
                </span>
                Help &amp; Support
              </Link>

              <div className={`zk-menu-item ${styles.hasMegaMenu}`} style={{ position: "static" }}>
                <Link href="/about" className="zk-topbar-link">
                  About Us
                  <ChevronDown size={11} strokeWidth={2} />
                </Link>

                {/* Mega Menu: About Us */}
                <div className={styles.megaMenu} style={{ top: "100%" }}>
                  {/* Col 1: Our Company */}
                  <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                    <div className={styles.colHeader}>
                      <span className={styles.colHeaderTitle}>Our Company</span>
                    </div>
                    <div className={styles.linkList}>
                      <Link href="/about" className={styles.linkItem}>
                        <span>Our Story</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/reasons-to-love-zoiko-mobile" className={styles.linkItem}>
                        <span>Why Zoiko Mobile</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/animal-music-channel" className={styles.linkItem}>
                        <span>Animal &amp; Music Thesis</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/news" className={styles.linkItem}>
                        <span>Press &amp; Media</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/sustainability" className={styles.linkItem}>
                        <span>Sustainability</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                    </div>
                  </div>

                  {/* Col 2: Trust & Support */}
                  <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                    <div className={styles.colHeader}>
                      <span className={styles.colHeaderTitle}>Trust &amp; Support</span>
                    </div>
                    <div className={styles.linkList}>
                      <Link href="/support" className={styles.linkItem}>
                        <span>Help &amp; Support</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="https://mvnoc.ai/coverage-map" target="_blank" className={styles.linkItem}>
                        <span>Coverage Map</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/network-service" className={styles.linkItem}>
                        <span>Network Status</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/device-protection" className={styles.linkItem}>
                        <span>Device Protection</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/faq" className={styles.linkItem}>
                        <span>FAQs</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: Partner With Us */}
                  <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                    <div className={styles.colHeader}>
                      <span className={styles.colHeaderTitle}>Partner With Us</span>
                    </div>
                    <div className={styles.linkList}>
                      <Link href="/become-retailer" className={styles.linkItem}>
                        <span>Become a Retailer</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/become-affiliate" className={styles.linkItem}>
                        <span>Become an Affiliate</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/become-partner" className={styles.linkItem}>
                        <span>Partner with Us</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/music-hub" className={styles.linkItem}>
                        <span>Zoiko Music Hub</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                      <Link href="/animal-charities" className={styles.linkItem}>
                        <span>Animal Charities</span>
                        <ChevronRight size={13} className={styles.chevronArrow} />
                      </Link>
                    </div>
                  </div>

                  {/* Col 4: Promo Card */}
                  <div className={styles.promoCol}>
                    <div className={styles.promoCard}>
                      <div>
                        <div className={styles.promoTitle}>
                          More than wireless. A network with purpose.
                        </div>
                      </div>
                      <div className={styles.promoActionArea}>
                        <Link href="/about" className={styles.promoBtn}>
                          Discover Our Story ›
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="zk-topbar-right">
              <a href="tel:8009888116" className="zk-topbar-phone">
                <Phone size={13} strokeWidth={2.4} />
                800-988-8116
              </a>
              <div className="zk-topbar-divider" />
              <div className="zk-topbar-lang">
                <CustomLanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* ==============================================================
            MAIN NAVIGATION BAR
            ============================================================== */}
        <header className="zk-mainnav">
          <div className="zk-mainnav-container">
            {/* LOGO */}
            <Link href="/" className="zk-logo-link">
              <Image
                src="/img/zoikomobileus-logo-png.png"
                alt="Zoiko Mobile Logo"
                width={175}
                height={64}
                priority
                className="zk-logo-img"
              />
            </Link>

            {/* DESKTOP MENU ITEMS */}
            <nav>
              <ul className="zk-menu">
                {/* 1. Plans & Pricing */}
                <li
                  className={`zk-menu-item ${styles.hasMegaMenu} ${
                    pathname?.includes("plan") ? "active" : ""
                  }`}
                >
                  <button type="button" className="zk-menu-button">
                    Plans &amp; Pricing
                    <ChevronDown size={13} className="zk-menu-chevron" />
                    {pathname?.includes("plan") && (
                      <span className="zk-active-indicator" />
                    )}
                  </button>

                  {/* Mega Menu: Plans & Pricing */}
                  <div className={styles.megaMenu}>
                    {/* Col 1: Shop Plans */}
                    <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Layers size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Shop Plans</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/all-plans" className={styles.linkItem}>
                          <span>Compare All Plans</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/all-plans" className={styles.linkItem}>
                          <span>Zoiko Lite</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/all-plans" className={styles.linkItem}>
                          <span>Zoiko Core</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/all-plans" className={styles.linkItem}>
                          <span>Zoiko Max</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/prepaid-plans" className={styles.linkItem}>
                          <span>Prepaid Plans</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Save More */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Tag size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Save More</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/family-plans" className={styles.linkItem}>
                          <span>Family &amp; Multi-Line</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/college-student" className={styles.linkItem}>
                          <span>Student Savings</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/military-veterans" className={styles.linkItem}>
                          <span>Military &amp; Veterans</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/postal-service-workers" className={styles.linkItem}>
                          <span>USPS Employees</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/offer-page" className={styles.linkItem}>
                          <span>Current Deals</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Get Connected */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Wifi size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Get Connected</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/byod-plans" className={styles.linkItem}>
                          <span>Bring Your Phone</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="https://mvnoc.ai/coverage-map" target="_blank" className={styles.linkItem}>
                          <span>Check Coverage</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/activate" className={styles.linkItem}>
                          <span>Activate SIM or eSIM</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/switch" className={styles.linkItem}>
                          <span>Switch &amp; Save</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/switch" className={styles.linkItem}>
                          <span>Keep Your Number</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Promo Card */}
                    <div className={styles.promoCol}>
                      <div className={styles.promoCard}>
                        <div>
                          <div className={styles.promoTitle}>
                            Wireless plans from <span className={styles.promoHighlight}>$13</span>/month per line.
                          </div>
                        </div>
                        <div className={styles.promoActionArea}>
                          <Link href="/all-plans" className={styles.promoBtn}>
                            Compare Plans ›
                          </Link>
                          <Link href="/all-plans" className={styles.promoDetailLink}>
                            View plan details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 2. Phones & Devices */}
                <li
                  className={`zk-menu-item ${styles.hasMegaMenu} ${
                    pathname?.includes("product") || pathname?.includes("device")
                      ? "active"
                      : ""
                  }`}
                >
                  <button type="button" className="zk-menu-button">
                    Phones &amp; Devices
                    <ChevronDown size={13} className="zk-menu-chevron" />
                  </button>

                  {/* Mega Menu: Phones & Devices */}
                  <div className={styles.megaMenu}>
                    {/* Col 1: Shop Devices */}
                    <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderTitle}>Shop Devices</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="https://phones.zoikomobile.com" target="_blank" className={styles.linkItem}>
                          <span>New Smartphones</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/product-category/refurbished" className={styles.linkItem}>
                          <span>Refurbished Phones</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/accessories" className={styles.linkItem}>
                          <span>Accessories</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/accessories" className={styles.linkItem}>
                          <span>Tablets &amp; Hotspots</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/offer-page" className={styles.linkItem}>
                          <span>Device Deals</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Keep Your Device */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderTitle}>Keep Your Device</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/byod-plans" className={styles.linkItem}>
                          <span>Bring Your Own Phone</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/byod-plans" className={styles.linkItem}>
                          <span>Check Compatibility</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/esim" className={styles.linkItem}>
                          <span>SIM &amp; eSIM</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/device-protection" className={styles.linkItem}>
                          <span>Device Protection</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>Phone Unlock Help</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Shop by Need */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderTitle}>Shop by Need</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="https://phones.zoikomobile.com" target="_blank" className={styles.linkItem}>
                          <span>Browse All Smartphones</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/product-category/refurbished" className={styles.linkItem}>
                          <span>Phones Under $300</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="https://phones.zoikomobile.com" target="_blank" className={styles.linkItem}>
                          <span>Phones for Families</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/contact-us" className={styles.linkItem}>
                          <span>Trade-In Options</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/return-policy" className={styles.linkItem}>
                          <span>Returns &amp; Warranty</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Promo Card */}
                    <div className={styles.promoCol}>
                      <div className={styles.promoCard}>
                        <div>
                          <div className={styles.promoTitle}>
                            Find a phone, or bring the one you own.
                          </div>
                        </div>
                        <div className={styles.promoActionArea}>
                          <Link href="https://phones.zoikomobile.com" target="_blank" className={styles.promoBtn}>
                            Shop Phones ›
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 3. Bring Your Phone */}
                <li
                  className={`zk-menu-item ${styles.hasMegaMenu} ${
                    pathname?.includes("byod") || pathname?.includes("switch")
                      ? "active"
                      : ""
                  }`}
                >
                  <button type="button" className="zk-menu-button">
                    Bring Your Phone
                    <ChevronDown size={13} className="zk-menu-chevron" />
                  </button>

                  {/* Mega Menu: Bring Your Phone */}
                  <div className={styles.megaMenu}>
                    {/* Col 1: Start Here */}
                    <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderTitle}>Start Here</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/byod-plans" className={styles.linkItem}>
                          <span>Check Compatibility</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/byod-plans" className={styles.linkItem}>
                          <span>How BYOD Works</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/all-plans" className={styles.linkItem}>
                          <span>Choose a Plan</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/esim" className={styles.linkItem}>
                          <span>SIM or eSIM</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>Unlock Your Phone</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Switch & Activate */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderTitle}>Switch &amp; Activate</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/switch" className={styles.linkItem}>
                          <span>Keep Your Number</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/switch" className={styles.linkItem}>
                          <span>Transfer Your Number</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/activate" className={styles.linkItem}>
                          <span>Activate SIM or eSIM</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/switch" className={styles.linkItem}>
                          <span>Switch &amp; Save</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/activate" className={styles.linkItem}>
                          <span>Track Activation</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Help & Resources */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderTitle}>Help &amp; Resources</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/faq" className={styles.linkItem}>
                          <span>BYOD FAQs</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="https://mvnoc.ai/coverage-map" target="_blank" className={styles.linkItem}>
                          <span>Network Coverage</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>Number Transfer Help</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/network-service" className={styles.linkItem}>
                          <span>APN &amp; Setup Help</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/contact-us" className={styles.linkItem}>
                          <span>Contact Support</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Promo Card */}
                    <div className={styles.promoCol}>
                      <div className={styles.promoCard}>
                        <div>
                          <div className={styles.promoTitle}>
                            Keep your phone. Keep your number where eligible.
                          </div>
                          <div className={styles.promoSubtext}>
                            Plans from $13/month per line. Terms apply.
                          </div>
                        </div>
                        <div className={styles.promoActionArea}>
                          <Link href="/byod-plans" className={styles.promoBtn}>
                            Check Compatibility ›
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 4. Business */}
                <li
                  className={`zk-menu-item ${styles.hasMegaMenu} ${
                    pathname?.includes("business") ? "active" : ""
                  }`}
                >
                  <button type="button" className="zk-menu-button">
                    Business
                    <ChevronDown size={13} className="zk-menu-chevron" />
                  </button>

                  {/* Mega Menu: Business */}
                  <div className={styles.megaMenu}>
                    {/* Col 1: Business Plans */}
                    <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Briefcase size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Business Plans</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Business Plans</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Compare Business Plans</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Multi-Line Options</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/contact-us" className={styles.linkItem}>
                          <span>Talk to Sales</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Manage Your Team */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Users size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Manage Your Team</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Bring Employee Devices</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Add or Change Lines</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Business Devices</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>Account &amp; Billing Support</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>Dedicated Support</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Business Solutions */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Layers size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Business Solutions</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Small Business</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Retail &amp; Field Teams</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/business-deals" className={styles.linkItem}>
                          <span>Remote &amp; Hybrid Teams</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/international-callings" className={styles.linkItem}>
                          <span>International Calling</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/contact-us" className={styles.linkItem}>
                          <span>Request a Quote</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Promo Card */}
                    <div className={styles.promoCol}>
                      <div className={styles.promoCard}>
                        <div>
                          <div className={styles.promoTitle}>
                            Wireless built for growing teams.
                          </div>
                          <div className={styles.bulletList}>
                            <div className={styles.bulletItem}>
                              <span className={styles.greenDot} />
                              <span>Flexible multi-line plans</span>
                            </div>
                            <div className={styles.bulletItem}>
                              <span className={styles.greenDot} />
                              <span>Bring your own devices</span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.promoActionArea}>
                          <Link href="/business-deals" className={styles.promoBtn}>
                            Explore Business Plans ›
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 5. International */}
                <li
                  className={`zk-menu-item ${styles.hasMegaMenu} ${
                    pathname?.includes("international") ||
                    pathname?.includes("travel")
                      ? "active"
                      : ""
                  }`}
                >
                  <button type="button" className="zk-menu-button">
                    International
                    <ChevronDown size={13} className="zk-menu-chevron" />
                  </button>

                  {/* Mega Menu: International */}
                  <div className={styles.megaMenu}>
                    {/* Col 1: Call Abroad */}
                    <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <PhoneCall size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Call Abroad</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/international-callings" className={styles.linkItem}>
                          <span>International Calling</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/roaming-rates" className={styles.linkItem}>
                          <span>Check Calling Rates</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/international-callings" className={styles.linkItem}>
                          <span>Calling Add-Ons</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/faq" className={styles.linkItem}>
                          <span>International FAQs</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Travel & Roaming */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Plane size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Travel &amp; Roaming</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/travel-plans" className={styles.linkItem}>
                          <span>International Roaming</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/canada-mexico-roaming-plans" className={styles.linkItem}>
                          <span>Canada &amp; Mexico</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/travel-plans" className={styles.linkItem}>
                          <span>Travel Passes</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/esim" className={styles.linkItem}>
                          <span>Travel eSIM</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Before You Go */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Globe size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Before You Go</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/roaming-rates" className={styles.linkItem}>
                          <span>Check a Destination</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/byod-plans" className={styles.linkItem}>
                          <span>Device Compatibility</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>Travel Support</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/support" className={styles.linkItem}>
                          <span>International Usage Tips</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Promo Card */}
                    <div className={styles.promoCol}>
                      <div className={styles.promoCard}>
                        <div>
                          <div className={styles.promoTitle}>
                            Wherever life takes you, stay connected.
                          </div>
                          <div className={styles.promoSubtext}>
                            Country-specific rates and availability shown before you buy.
                          </div>
                        </div>
                        <div className={styles.promoActionArea}>
                          <Link href="/travel-plans" className={styles.promoBtn}>
                            Explore International ›
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 6. Community */}
                <li
                  className={`zk-menu-item ${styles.hasMegaMenu} ${
                    pathname?.includes("student") ||
                    pathname?.includes("military") ||
                    pathname?.includes("animal") ||
                    pathname?.includes("music")
                      ? "active"
                      : ""
                  }`}
                >
                  <button type="button" className="zk-menu-button">
                    Community
                    <ChevronDown size={13} className="zk-menu-chevron" />
                  </button>

                  {/* Mega Menu: Community */}
                  <div className={styles.megaMenu}>
                    {/* Col 1: Animal Causes */}
                    <div className={`${styles.megaCol} ${styles.megaColFirst}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <PawPrint size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Animal Causes</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/animal-charities" className={styles.linkItem}>
                          <span>Animal Charities</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/zoiko-mobile-animal-welfare-partnership" className={styles.linkItem}>
                          <span>Charity Partnerships</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/animal-charities" className={styles.linkItem}>
                          <span>How Giving Works</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/animal-music-channel" className={styles.linkItem}>
                          <span>Stories &amp; Impact</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Music & Culture */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Music size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Music &amp; Culture</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/music-hub" className={styles.linkItem}>
                          <span>Zoiko Music Hub</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/music-hub" className={styles.linkItem}>
                          <span>Artists &amp; Creators</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/music-hub" className={styles.linkItem}>
                          <span>Music Perks</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/music-hub" className={styles.linkItem}>
                          <span>Events &amp; Experiences</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Special Programs */}
                    <div className={`${styles.megaCol} ${styles.megaColDivider}`}>
                      <div className={styles.colHeader}>
                        <span className={styles.colHeaderIcon}>
                          <Users size={18} />
                        </span>
                        <span className={styles.colHeaderTitle}>Special Programs</span>
                      </div>
                      <div className={styles.linkList}>
                        <Link href="/college-student" className={styles.linkItem}>
                          <span>Students</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/military-veterans" className={styles.linkItem}>
                          <span>Military &amp; Veterans</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/postal-service-workers" className={styles.linkItem}>
                          <span>USPS Employees</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/family-plans" className={styles.linkItem}>
                          <span>Families</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                        <Link href="/become-partner" className={styles.linkItem}>
                          <span>Become a Partner</span>
                          <ChevronRight size={13} className={styles.chevronArrow} />
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Promo Card */}
                    <div className={styles.promoCol}>
                      <div className={styles.promoCard}>
                        <div>
                          <div className={styles.promoTitle}>
                            A network for what you love.
                          </div>
                          <div className={styles.promoSubtext}>
                            Support animals. Discover music. Connect with people.
                          </div>
                        </div>
                        <div className={styles.promoActionArea}>
                          <Link href="/animal-charities" className={styles.promoBtn}>
                            Explore Community ›
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* =========================================================
                    OLD SIMPLE DROPDOWNS CODE (COMMENTED OUT AS REQUESTED)
                    ========================================================= */}
                {false && (
                  <div className="old-community-links">
                    <Link href="/college-student">College Students</Link>
                    <Link href="/military-veterans">Military &amp; Veterans</Link>
                    <Link href="/postal-service-workers">Postal Service Workers</Link>
                    <Link href="/animal-charities">Animal Charities</Link>
                    <Link href="/music-hub">Zoiko Music Hub</Link>
                  </div>
                )}

                {/* =========================================================
                    OLD SIMPLE DROPDOWNS CODE (COMMENTED OUT AS REQUESTED)
                    ========================================================= */}
                {false && (
                  <li className="zk-menu-item">
                    <div className="zk-dropdown-pane">
                      <Link href="/all-plans" className="zk-dropdown-item">All Wireless Plans</Link>
                      <Link href="/prepaid-plans" className="zk-dropdown-item">Prepaid Plans</Link>
                      <Link href="/postpaid-plans" className="zk-dropdown-item">Postpaid Plans</Link>
                      <Link href="/family-plans" className="zk-dropdown-item">Family &amp; Multi-Line</Link>
                      <Link href="/top-up-plan" className="zk-dropdown-item">Top-Up Plans</Link>
                      <Link href="/offer-page" className="zk-dropdown-item">Current Offers</Link>
                    </div>
                  </li>
                )}
              </ul>
            </nav>

            {/* RIGHT SIDE ACTIONS */}
            <div className="zk-actions">
              {/* Search Toggle Button */}
              <button
                type="button"
                className="zk-icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={19} />
              </button>

              {/* Shopping Cart Button */}
              <Link
                href="/checkout"
                className="zk-icon-btn"
                aria-label="View Shopping Cart"
              >
                <ShoppingCart size={19} />
                <span className="zk-cart-badge">{cartCount}</span>
              </Link>

              {/* Sign In / Account */}
              {isLoggedIn ? (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Link href="/dashboard" className="zk-signin-link">
                    <User size={15} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                    {user?.name?.split(" ")[0] || "Account"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="zk-icon-btn"
                    title="Logout"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="zk-signin-link">
                  Sign In
                </Link>
              )}

              {/* Primary Call-to-Action */}
              <Link href="/prepaid-plans" className="zk-getstarted-btn">
                Get Started ›
              </Link>

              {/* Mobile Drawer Toggle */}
              <button
                type="button"
                className="zk-mobile-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </header>

        {/* ==============================================================
            EXPANDABLE SEARCH BAR
            ============================================================== */}
        {searchOpen && (
          <div
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #E5E7EB",
              padding: "16px 40px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  background: "#F3F4F6",
                  borderRadius: "9999px",
                  padding: "6px 18px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <Search size={18} color="#888" style={{ marginRight: "8px" }} />
                <input
                  type="text"
                  placeholder="Search Zoiko plans, phones, eSIM or help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    fontSize: "14px",
                    fontFamily: "inherit",
                  }}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="zk-getstarted-btn"
                style={{ padding: "8px 20px" }}
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="zk-icon-btn"
              >
                <X size={20} />
              </button>
            </form>
          </div>
        )}

        {/* ==============================================================
            RESPONSIVE MOBILE DRAWER
            ============================================================== */}
        {mobileMenuOpen && (
          <>
            <div
              className="zk-mobile-drawer-backdrop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="zk-mobile-drawer open">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Image
                  src="/img/ZoikoMobileUS_Logo_PNG.png"
                  alt="Zoiko Mobile Logo"
                  width={140}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="zk-icon-btn"
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <CustomLanguageSwitcher />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <Link
                  href="/all-plans"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  Plans &amp; Pricing
                </Link>
                <Link
                  href="/product-category/refurbished"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  Phones &amp; Devices
                </Link>
                <Link
                  href="/byod-plans"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  Bring Your Phone
                </Link>
                <Link
                  href="/business-deals"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  Business
                </Link>
                <Link
                  href="/travel-plans"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  International
                </Link>
                <Link
                  href="/college-student"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  Community Plans
                </Link>
                <Link
                  href="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#1A1A1A", padding: "8px 0" }}
                >
                  Support &amp; Coverage
                </Link>
              </div>

              <hr style={{ margin: "24px 0", borderColor: "#f0d5df" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="zk-signin-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="zk-signin-link"
                      style={{ textAlign: "left", background: "none", border: "none" }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="zk-signin-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}

                <Link
                  href="/prepaid-plans"
                  className="zk-getstarted-btn"
                  style={{ justifyContent: "center", marginTop: "8px" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started ›
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Legacy modals kept for app-wide compatibility */}
      <PlanPurchaseModal
        show={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        planTitle={modalData.title}
        planSlug={modalData.slug}
        planId={modalData.id}
        planPrice={
          modalData.sale_price ? modalData.sale_price : modalData.price
        }
        planDuration={modalData.duration}
        planBqid={modalData.bq_id}
        planType={modalData.plan_type}
      />

      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderId={paymentData.orderId}
        amount={paymentData.amount}
      />

      <GetInTouchSidebar />
      <ChristmasSidebar />

      {/* =========================================================================
          OLD HEADER CODE (COMMENTED OUT AS REQUESTED)
          ========================================================================= */}
      {false && (
      <div>
      <div className="d-none d-lg-block">
        <TopHeader />
      </div>
      <Navbar expand="lg" className="bg-body-tertiary p-0 headnav">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image
              src="/img/zoikomobileus-logo-png.png"
              width={160}
              height={70}
              alt="Logo"
            />
          </Navbar.Brand>
          <div className="d-flex d-lg-none ms-auto align-items-center gap-3">
            <Nav.Link href="#" onClick={handleShowSearch}>
              <i className="bi bi-search fs-5"></i>
            </Nav.Link>
            <Nav.Link href="/checkout" className="position-relative">
              <i className="bi bi-cart"></i>
              {cartCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown
                title={<i className="bi bi-person fs-5"></i>}
                id="user-nav-dropdown-mobile"
                align="end"
              >
                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <i className="bi bi-person fs-5"></i>
              </Nav.Link>
            )}
          </div>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="ms-2"
            ref={toggleButtonRef}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="mobile-overlay"
            ref={navbarCollapseRef}
          >
            <div className="d-lg-none text-end pe-3 pb-3">
              <button
                className="btn btn-link text-dark fs-3 p-0"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="d-block d-lg-none mb-3 px-3">
              <CustomLanguageSwitcher />
            </div>
            <Nav className="mx-auto mt-3 mt-lg-2">
              <NavDropdown title="Personal Plans" id="personal-dropdown" className="personal-dropdown">
                <div className="personal-menu">
                  <Nav.Link href="/prepaid-plans" className="plan-card active-plan">
                    <img src="/img/icons/prepaid.svg" alt="Prepaid" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Prepaid Plans</h6>
                      <p>No contracts · Activate today</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/postpaid-plans" className="plan-card">
                    <img src="/img/icons/postpaid.svg" alt="Postpaid" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Postpaid Plans</h6>
                      <p>Monthly billing · Full features</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/family-plans" className="plan-card">
                    <img src="/img/icons/family.svg" alt="Family" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Family Plans</h6>
                      <p>Up to 10 lines · Save more</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/top-up-plan" className="plan-card">
                    <img src="/img/icons/topup.svg" alt="Family" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Top-up Plans</h6>
                      <p>Quick and easy top-ups</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title="Business" id="personal-dropdown" className="personal-dropdown">
                <div className="personal-menu">
                  <Nav.Link href="/business-deals" className="plan-card active-plan">
                    <img src="/img/icons/small-business.svg" alt="small businesses" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Small Businesses</h6>
                      <p>2-25 lines . Dedicated Support</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/business-deals" className="plan-card">
                    <img src="/img/icons/enterprices.svg" alt="Enterprises" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Enterprises</h6>
                      <p>Custom Solutions</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title="Devices" id="personal-dropdown" className="personal-dropdown">
                <div className="personal-menu">
                  <Nav.Link href="https://phones.zoikomobile.com/" className="plan-card active-plan">
                    <img src="/img/icons/new-smart-phones.svg" alt="new smart phones" className="plan-icon" />
                    <div className="plan-text">
                      <h6>New Smart Phones</h6>
                      <p>Latest flagships & Value packs</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/product-category/refurbished" className="plan-card">
                    <img src="/img/icons/refurbished.svg" alt="Refurbished smartphones" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Refurbished Smartphones</h6>
                      <p>Used Smartphones</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/device-protection" className="plan-card">
                    <img src="/img/icons/device-protection.svg" alt="Device Protection" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Device Protection</h6>
                      <p>Smartwatch . Tabs . Mobiles</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title="Travel" id="personal-dropdown" className="personal-dropdown">
                <div className="personal-menu">
                  <Nav.Link href="/travel-plans" className="plan-card active-plan">
                    <img src="/img/icons/travel-plans.svg" alt="Travel Plans" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Travel Plans</h6>
                      <p>Day Passes & Data Plans</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/roaming-rates" className="plan-card">
                    <img src="/img/icons/roaming.svg" alt="Roaming add-ons" className="plan-icon" />
                    <div className="plan-text">
                      <h6>International Calls</h6>
                      <p>Latest Value plans</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title="Community Plans" id="personal-dropdown" className="personal-dropdown">
                <div className="personal-menu">
                  <Nav.Link href="/college-student" className="plan-card active-plan">
                    <img src="/img/icons/college-students.svg" alt="College Students" className="plan-icon" />
                    <div className="plan-text">
                      <h6>College Students</h6>
                      <p>No Contracts . Activate Today</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/military-veterans" className="plan-card">
                    <img src="/img/icons/military.svg" alt="Military & Veterans" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Military & Veterans</h6>
                      <p>Monthly Billing . Full Features</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/postal-service-workers" className="plan-card">
                    <img src="/img/icons/postal-service.svg" alt="Postal Service Workers" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Postal Service Workers</h6>
                      <p>Up to 10 Lines . Save More</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/animal-charities" className="plan-card">
                    <img src="/img/icons/animal-charity.svg" alt="Animal Charities" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Animal Charities</h6>
                      <p>No Contracts . Activate Today</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title="About Us" id="personal-dropdown" className="personal-dropdown">
                <div className="personal-menu">
                  <Nav.Link href="/about" className="plan-card active-plan">
                    <img src="/img/icons/our-mission.svg" alt="Our Mission" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Our Mission</h6>
                      <p>Connectivity for Evenryone</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/about" className="plan-card">
                    <img src="/img/icons/leadership.svg" alt="Leadership" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Leadership</h6>
                      <p>Backed By Leaders</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/news" className="plan-card">
                    <img src="/img/icons/press-media.svg" alt="Press & Media" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Press & Media</h6>
                      <p>News releases and Info</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/become-partner" className="plan-card">
                    <img src="/img/icons/careers.svg" alt="careers" className="plan-icon" />
                    <div className="plan-text">
                      <h6>Careers</h6>
                      <p>Work with Us</p>
                    </div>
                  </Nav.Link>
                </div>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto d-none d-lg-flex align-items-center auth-section">
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); handleShowSearch(); }}>
                <i className="bi bi-search"></i>
              </Nav.Link>
              <Nav.Link href="/checkout" className="position-relative">
                <i className="bi bi-cart"></i>
                {cartCount > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
              {isLoggedIn ? (
                <NavDropdown title={user?.name || "Account"} id="user-nav-dropdown" align="end">
                  <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <Nav.Link href="/login" className="signin-link">Sign In</Nav.Link>
                  <Nav.Link href="/register" className="signup-btn">Sign Up</Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      )}
    </>
  );
};

export default Header;

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Cpu,
  RefreshCw,
  ShieldCheck,
  Search,
  ArrowRight,
  Truck,
  RotateCcw,
  Lock,
  Phone,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./ShopPhones.module.css";

const phonesCatalog = [
  {
    id: "iphone-se-2",
    brand: "Apple",
    network: "4G LTE",
    title: "iPhone SE (2nd Gen)",
    condition: "Pre-owned",
    listingType: "Storefront price",
    img: "/img/Shop-Phones/usp8.png",
    mobileImg: "/img/Shop-Phones/usp32.png",
    colors: ["#1e1e1e", "#f5f5f7", "#dc2626"],
    storage: "64GB · 128GB",
    price: 179,
    stock: "In stock",
    esim: true,
  },
  {
    id: "galaxy-a14-5g",
    brand: "Samsung",
    network: "5G",
    title: "Galaxy A14 5G",
    condition: "New",
    listingType: "Storefront price",
    img: "/img/Shop-Phones/usp9.png",
    mobileImg: "/img/Shop-Phones/usp33.png",
    colors: ["#1e1e1e", "#cbd5e1", "#4d7c0f"],
    storage: "64GB",
    price: 149,
    stock: "Low stock",
    esim: false,
  },
  {
    id: "nuu-f4l-flip",
    brand: "NUU",
    network: "4G LTE",
    title: "NUU F4L Flip Phone",
    condition: "New",
    listingType: "Storefront price",
    img: "/img/Shop-Phones/usp10.png",
    mobileImg: "/img/Shop-Phones/usp34.png",
    colors: ["#1e1e1e"],
    storage: "8GB",
    price: 59,
    stock: "In stock",
    esim: false,
  },
  {
    id: "iphone-12",
    brand: "Apple",
    network: "5G",
    title: "iPhone 12",
    condition: "Pre-owned",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp11.png",
    mobileImg: "/img/Shop-Phones/usp35.png",
    colors: ["#1e1e1e", "#1d4ed8", "#f5f5f7"],
    storage: "64GB · 128GB",
    price: 299,
    stock: "In stock",
    esim: true,
  },
  {
    id: "iphone-13",
    brand: "Apple",
    network: "5G",
    title: "iPhone 13",
    condition: "Pre-owned",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp12.png",
    mobileImg: "/img/Shop-Phones/usp36.png",
    colors: ["#1e1e1e", "#f472b6", "#f5f5f7"],
    storage: "128GB · 256GB",
    price: 389,
    stock: "Low stock",
    esim: true,
  },
  {
    id: "galaxy-a15-5g",
    brand: "Samsung",
    network: "5G",
    title: "Galaxy A15 5G",
    condition: "New",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp13.png",
    mobileImg: "/img/Shop-Phones/usp37.png",
    colors: ["#1e293b", "#93c5fd"],
    storage: "128GB",
    price: 169,
    stock: "In stock",
    esim: false,
  },
  {
    id: "galaxy-s23",
    brand: "Samsung",
    network: "5G",
    title: "Galaxy S23",
    condition: "Pre-owned",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp14.png",
    mobileImg: "/img/Shop-Phones/usp38.png",
    colors: ["#1e1e1e", "#fef3c7", "#d8b4fe"],
    storage: "128GB · 256GB",
    price: 429,
    stock: "In stock",
    esim: true,
  },
  {
    id: "pixel-7a",
    brand: "Google",
    network: "5G",
    title: "Pixel 7a",
    condition: "Pre-owned",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp15.png",
    mobileImg: "/img/Shop-Phones/usp39.png",
    colors: ["#1e1e1e", "#93c5fd", "#f5f5f7"],
    storage: "128GB",
    price: 249,
    stock: "In stock",
    esim: true,
  },
  {
    id: "pixel-8",
    brand: "Google",
    network: "5G",
    title: "Pixel 8",
    condition: "New",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp16.png",
    mobileImg: "/img/Shop-Phones/usp40.png",
    colors: ["#1e1e1e", "#cbd5e1", "#fbcfe8"],
    storage: "128GB · 256GB",
    price: 499,
    stock: "Out of stock",
    esim: true,
  },
  {
    id: "moto-g-play-2024",
    brand: "Motorola",
    network: "4G LTE",
    title: "moto g play (2024)",
    condition: "New",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp17.png",
    mobileImg: "/img/Shop-Phones/usp41.png",
    colors: ["#1e3a8a"],
    storage: "64GB",
    price: 129,
    stock: "In stock",
    esim: false,
  },
  {
    id: "moto-g-5g-2024",
    brand: "Motorola",
    network: "5G",
    title: "moto g 5G (2024)",
    condition: "New",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp18.png",
    mobileImg: "/img/Shop-Phones/usp42.png",
    colors: ["#64748b", "#1e1e1e"],
    storage: "128GB",
    price: 199,
    stock: "In stock",
    esim: true,
  },
  {
    id: "razr-2023",
    brand: "Motorola",
    network: "5G",
    title: "razr (2023)",
    condition: "Pre-owned",
    listingType: "Sample listing",
    img: "/img/Shop-Phones/usp19.png",
    mobileImg: "/img/Shop-Phones/usp43.png",
    colors: ["#64748b", "#ddd6fe", "#fef3c7"],
    storage: "128GB",
    price: 349,
    stock: "Low stock",
    esim: true,
  },
];

const brandCards = [
  {
    name: "Apple",
    count: "3 phones",
    logo: "/img/Shop-Phones/usp3.png",
    mobileLogo: "/img/Shop-Phones/usp27.png",
  },
  {
    name: "Samsung",
    count: "3 phones",
    logo: "/img/Shop-Phones/usp4.png",
    mobileLogo: "/img/Shop-Phones/usp28.png",
  },
  {
    name: "Google",
    count: "2 phones",
    logo: "/img/Shop-Phones/usp5.png",
    mobileLogo: "/img/Shop-Phones/usp28.png",
  },
  {
    name: "Motorola",
    count: "3 phones",
    logo: "/img/Shop-Phones/usp6.png",
    mobileLogo: "/img/Shop-Phones/usp28.png",
  },
  {
    name: "NUU",
    count: "1 phone",
    logo: "/img/Shop-Phones/usp7.png",
    mobileLogo: "/img/Shop-Phones/usp26.png",
  },
];

const whyCards = [
  {
    img: "/img/Shop-Phones/usp20.png",
    alt: "Couple pairing phone with a plan",
    title: "Pair it with a plan",
    desc: "Choose a plan at checkout. Your monthly plan price is shown separately from your phone.",
    linkText: "Compare plans",
    href: "/plans",
  },
  {
    img: "/img/Shop-Phones/usp21.png",
    alt: "Friends smiling outdoors",
    title: "Keep your number",
    desc: "Bring your U.S. number over securely. Keep your old service active until it moves.",
    linkText: "How transfers work",
    href: "/switch",
  },
  {
    img: "/img/Shop-Phones/usp22.png",
    alt: "Customer support specialist",
    title: "Real help when you need it",
    desc: "Our team can help you choose a phone, set it up and get connected.",
    linkText: "Talk to us",
    href: "/support",
  },
  {
    img: "/img/Shop-Phones/usp23.png",
    mobileImg: "/img/Shop-Phones/usp47.png",
    alt: "Hands using a mobile device",
    title: "Protect it",
    desc: "Cases, chargers and screen protectors for your new phone.",
    linkText: "Shop accessories",
    href: "/accessories",
  },
];

const buyingFaqs = [
  {
    q: "Are the phones unlocked?",
    a: "Phones are sold unlocked unless a listing says otherwise. Unlocked doesn't always mean compatible, so we check compatibility before activation.",
  },
  {
    q: "What does pre-owned mean?",
    a: "Pre-owned phones are inspected, unlocked, and graded for cosmetic condition, with battery and hardware tested before listing.",
  },
  {
    q: "Can I buy a phone without a plan?",
    a: "Yes. You can purchase a phone outright or pair it with any Zoiko Mobile plan at checkout.",
  },
  {
    q: "When will my phone arrive?",
    a: "Delivery options and estimated arrival dates for your ZIP code are shown before you complete checkout.",
  },
  {
    q: "Can I keep my number?",
    a: "Yes. You can transfer your existing U.S. number securely during activation—keep your current service active until the transfer completes.",
  },
  {
    q: "What is your return policy?",
    a: "Eligible devices can be returned within the return window shown at checkout. See our Returns policy for full terms.",
  },
  {
    q: "Do you offer financing?",
    a: "Available payment and installment options are shown at checkout before you confirm your order.",
  },
];

export default function ShopPhonesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [priceRange, setPriceRange] = useState("any");
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [esimOnly, setEsimOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [byodImei, setByodImei] = useState("");
  const [byodMessage, setByodMessage] = useState("");
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const toggleArr = (setter, val) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortBy("featured");
    setSelectedBrands([]);
    setSelectedConditions([]);
    setPriceRange("any");
    setSelectedNetworks([]);
    setEsimOnly(false);
    setInStockOnly(false);
  };

  const filteredPhones = useMemo(() => {
    let list = phonesCatalog.filter((p) => {
      if (
        searchQuery.trim() &&
        !`${p.title} ${p.brand}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      ) {
        return false;
      }
      if (selectedBrands.length && !selectedBrands.includes(p.brand))
        return false;
      if (
        selectedConditions.length &&
        !selectedConditions.includes(p.condition)
      )
        return false;
      if (priceRange === "under150" && p.price >= 150) return false;
      if (priceRange === "150to300" && (p.price < 150 || p.price > 300))
        return false;
      if (priceRange === "over300" && p.price <= 300) return false;
      if (selectedNetworks.length && !selectedNetworks.includes(p.network))
        return false;
      if (esimOnly && !p.esim) return false;
      if (inStockOnly && p.stock === "Out of stock") return false;
      return true;
    });

    if (sortBy === "low") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [
    searchQuery,
    sortBy,
    selectedBrands,
    selectedConditions,
    priceRange,
    selectedNetworks,
    esimOnly,
    inStockOnly,
  ]);
  return (
    <div className={styles.pageWrapper}>
      {/* Mobile-only Top Preview Strip */}
      <div className={styles.mobilePreviewBar}>
        Design preview: iPhone SE (2nd Gen), Galaxy A14 5G and NUU F4L prices
        are from the Nov 6, 2026 storefront snapshot; other listings are
        samples. Stock and prices are confirmed at checkout.
      </div>

      {/* SECTION 1A: HERO BANNER */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Mobile-only Breadcrumb */}
          <nav className={styles.mobileBreadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.mobileBreadcrumbLink}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/devices" className={styles.mobileBreadcrumbLink}>
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <span className={styles.mobileBreadcrumbCurrent}>Phones</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <span className={styles.heroEyebrow}>SHOP PHONES</span>

              <h1 className={styles.heroTitle}>
                Great phones, ready for{" "}
                <span className={styles.heroTitleAccent}>Zoiko Mobile.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                New and pre-owned phones from brands you know. Pair one with a
                plan, keep your number, and see your full price before you pay.
              </p>

              <div className={styles.heroActions}>
                <a href="#phone-catalog" className={styles.heroPrimaryBtn}>
                  Shop all phones
                </a>
                <Link
                  href="/check-compatibility"
                  className={styles.heroSecondaryBtn}
                >
                  Bring your own phone
                </Link>
              </div>

              <div className={styles.heroFeaturePills}>
                <span className={styles.heroFeaturePill}>
                  <CheckCircle2
                    size={12}
                    strokeWidth={2.2}
                    className={styles.heroFeatureIcon}
                  />
                  <span>New &amp; pre-owned</span>
                </span>
                <span className={styles.heroFeaturePill}>
                  <Cpu
                    size={12}
                    strokeWidth={2.2}
                    className={styles.heroFeatureIcon}
                  />
                  <span>SIM or eSIM</span>
                </span>
                <span className={styles.heroFeaturePill}>
                  <RefreshCw
                    size={12}
                    strokeWidth={2.2}
                    className={styles.heroFeatureIcon}
                  />
                  <span>Keep your number</span>
                </span>
              </div>
            </div>

            <div className={styles.heroVisualWrap}>
              <img
                src="/img/Shop-Phones/usp1.png"
                alt="Latest smartphones and devices ready for Zoiko Mobile"
                className={`${styles.heroImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Shop-Phones/usp25.png"
                alt="Latest smartphones and devices ready for Zoiko Mobile"
                className={`${styles.heroImg} ${styles.mobileOnly}`}
              />

              <span className={styles.unlockedBadge}>
                <ShieldCheck
                  size={13}
                  strokeWidth={2.2}
                  style={{ color: "#c81e5a" }}
                />
                <span>Unlocked &amp; checked</span>
              </span>

              <div className={styles.floatingProductCard}>
                <img
                  src="/img/Shop-Phones/usp2.png"
                  alt="NUU F4L Flip Phone"
                  className={`${styles.floatingProductImg} ${styles.desktopOnly}`}
                />
                <img
                  src="/img/Shop-Phones/usp26.png"
                  alt="NUU F4L Flip Phone"
                  className={`${styles.floatingProductImg} ${styles.mobileOnly}`}
                />
                <div>
                  <span className={styles.floatingFrom}>FROM</span>
                  <span className={styles.floatingPrice}>$59</span>
                  <span className={styles.floatingName}>NUU F4L Flip Phone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1B: SHOP BY BRAND */}
      <section className={styles.brandSection}>
        <div className={styles.container}>
          <h2 className={styles.brandHeading}>Shop by brand</h2>

          <div className={styles.brandGrid}>
            {brandCards.map((brand) => (
              <a
                key={brand.name}
                href="#phone-catalog"
                className={styles.brandCard}
                onClick={() => setSelectedBrands([brand.name])}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className={`${styles.brandLogo} ${styles.desktopOnly}`}
                />
                <img
                  src={brand.mobileLogo}
                  alt={`${brand.name} icon`}
                  className={`${styles.brandLogo} ${styles.mobileOnly}`}
                />
                <div>
                  <span className={styles.brandName}>{brand.name}</span>
                  <span className={styles.brandCount}>{brand.count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: ALL PHONES CATALOG */}
      <section id="phone-catalog" className={styles.catalogSection}>
        <div className={styles.container}>
          <div className={styles.catalogTopBar}>
            <div>
              <span className={styles.sectionEyebrow}>ALL PHONES</span>
              <h2 className={styles.sectionHeading}>Find your next phone.</h2>
            </div>

            <div className={styles.catalogControls}>
              <div>
                <label htmlFor="sp-search" className={styles.controlLabel}>
                  Search phones
                </label>
                <div className={styles.searchInputWrap}>
                  <Search
                    size={14}
                    strokeWidth={2.2}
                    style={{ color: "#8c8290", flexShrink: 0 }}
                  />
                  <input
                    id="sp-search"
                    type="text"
                    className={styles.searchInput}
                    placeholder="iPhone, Galaxy, flip phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sp-sort" className={styles.controlLabel}>
                  Sort by
                </label>
                <select
                  id="sp-sort"
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.catalogLayout}>
            {/* Left Filter Sidebar */}
            <aside className={styles.filterSidebar}>
              <div className={styles.filterGroup}>
                <span className={styles.filterGroupTitle}>Brand</span>
                {[
                  { name: "Apple", count: 3 },
                  { name: "Samsung", count: 3 },
                  { name: "Google", count: 2 },
                  { name: "Motorola", count: 3 },
                  { name: "NUU", count: 1 },
                ].map((b) => (
                  <label key={b.name} className={styles.filterOptionRow}>
                    <span className={styles.filterOptionLeft}>
                      <input
                        type="checkbox"
                        className={styles.filterInput}
                        checked={selectedBrands.includes(b.name)}
                        onChange={() => toggleArr(setSelectedBrands, b.name)}
                      />
                      <span>{b.name}</span>
                    </span>
                    <span className={styles.filterCount}>{b.count}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterGroupTitle}>Condition</span>
                {[
                  { name: "New", count: 6 },
                  { name: "Pre-owned", count: 6 },
                ].map((c) => (
                  <label key={c.name} className={styles.filterOptionRow}>
                    <span className={styles.filterOptionLeft}>
                      <input
                        type="checkbox"
                        className={styles.filterInput}
                        checked={selectedConditions.includes(c.name)}
                        onChange={() =>
                          toggleArr(setSelectedConditions, c.name)
                        }
                      />
                      <span>{c.name}</span>
                    </span>
                    <span className={styles.filterCount}>{c.count}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterGroupTitle}>Price</span>
                {[
                  { id: "any", label: "Any price", count: "" },
                  { id: "under150", label: "Under $150", count: 3 },
                  { id: "150to300", label: "$150–$300", count: 5 },
                  { id: "over300", label: "Over $300", count: 4 },
                ].map((pr) => (
                  <label key={pr.id} className={styles.filterOptionRow}>
                    <span className={styles.filterOptionLeft}>
                      <input
                        type="radio"
                        name="priceRange"
                        className={styles.filterInput}
                        checked={priceRange === pr.id}
                        onChange={() => setPriceRange(pr.id)}
                      />
                      <span>{pr.label}</span>
                    </span>
                    {pr.count !== "" && (
                      <span className={styles.filterCount}>{pr.count}</span>
                    )}
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterGroupTitle}>Network</span>
                {[
                  { name: "5G", count: 9 },
                  { name: "4G LTE", count: 3 },
                ].map((n) => (
                  <label key={n.name} className={styles.filterOptionRow}>
                    <span className={styles.filterOptionLeft}>
                      <input
                        type="checkbox"
                        className={styles.filterInput}
                        checked={selectedNetworks.includes(n.name)}
                        onChange={() => toggleArr(setSelectedNetworks, n.name)}
                      />
                      <span>{n.name}</span>
                    </span>
                    <span className={styles.filterCount}>{n.count}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterGroupTitle}>Features</span>
                <label className={styles.filterOptionRow}>
                  <span className={styles.filterOptionLeft}>
                    <input
                      type="checkbox"
                      className={styles.filterInput}
                      checked={esimOnly}
                      onChange={() => setEsimOnly(!esimOnly)}
                    />
                    <span>eSIM capable</span>
                  </span>
                </label>
                <label className={styles.filterOptionRow}>
                  <span className={styles.filterOptionLeft}>
                    <input
                      type="checkbox"
                      className={styles.filterInput}
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                    />
                    <span>In stock only</span>
                  </span>
                </label>
              </div>

              <button
                type="button"
                className={styles.clearFiltersBtn}
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            </aside>

            {/* Right Products Grid */}
            <div>
              <p className={styles.catalogCountText}>
                {filteredPhones.length} phones
              </p>

              <div className={styles.productsGrid}>
                {filteredPhones.map((phone) => {
                  const stockColor =
                    phone.stock === "In stock"
                      ? "#15803d"
                      : phone.stock === "Low stock"
                      ? "#b45309"
                      : "#be123c";

                  return (
                    <div key={phone.id} className={styles.productCard}>
                      <div className={styles.productTopRow}>
                        <span
                          className={
                            phone.condition === "New"
                              ? styles.condBadgeNew
                              : styles.condBadgePreowned
                          }
                        >
                          {phone.condition}
                        </span>
                        <span className={styles.listingTag}>
                          {phone.listingType}
                        </span>
                      </div>

                      <img
                        src={phone.img}
                        alt={phone.title}
                        className={`${styles.productImg} ${styles.desktopOnly}`}
                      />
                      <img
                        src={phone.mobileImg}
                        alt={phone.title}
                        className={`${styles.productImg} ${styles.mobileOnly}`}
                      />

                      <span className={styles.productMeta}>
                        {phone.brand.toUpperCase()} · {phone.network}
                      </span>

                      <h3 className={styles.productTitle}>{phone.title}</h3>

                      <div className={styles.productSpecsRow}>
                        {phone.colors.map((hex, idx) => (
                          <span
                            key={idx}
                            className={styles.colorDot}
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                        <span>{phone.storage}</span>
                      </div>

                      <div className={styles.productPriceRow}>
                        <span>From</span>
                        <span className={styles.productPriceVal}>
                          ${phone.price}
                        </span>
                      </div>

                      <div
                        className={styles.stockRow}
                        style={{ color: stockColor }}
                      >
                        <span
                          className={styles.stockDot}
                          style={{ backgroundColor: stockColor }}
                        />
                        <span>{phone.stock}</span>
                      </div>

                      <Link
                        href="/devices"
                        className={
                          phone.stock === "Out of stock"
                            ? styles.viewDetailsBtn
                            : styles.chooseBtn
                        }
                      >
                        {phone.stock === "Out of stock"
                          ? "View details"
                          : "Choose options"}
                      </Link>

                      <label className={styles.compareLabel}>
                        <input
                          type="checkbox"
                          className={styles.filterInput}
                          checked={compareIds.includes(phone.id)}
                          onChange={() => toggleArr(setCompareIds, phone.id)}
                        />
                        <span>Compare</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3A: WHY BUY FROM ZOIKO */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>WHY BUY FROM ZOIKO</span>
          <h2 className={styles.sectionHeading}>
            Everything you need, in one place.
          </h2>

          <div className={styles.whyGrid}>
            {whyCards.map((card) => (
              <div key={card.title} className={styles.whyCard}>
                <div className={styles.whyImgWrap}>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className={`${styles.whyImg} ${
                      card.mobileImg ? styles.desktopOnly : ""
                    }`}
                  />
                  {card.mobileImg && (
                    <img
                      src={card.mobileImg}
                      alt={card.alt}
                      className={`${styles.whyImg} ${styles.mobileOnly}`}
                    />
                  )}
                </div>
                <div className={styles.whyBody}>
                  <h3 className={styles.whyTitle}>{card.title}</h3>
                  <p className={styles.whyDesc}>{card.desc}</p>
                  <Link href={card.href} className={styles.whyLink}>
                    <span>{card.linkText}</span>
                    <ArrowRight size={12} strokeWidth={2.3} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.whyBottomGrid}>
            <form
              className={styles.byodDarkCard}
              onSubmit={(e) => {
                e.preventDefault();
                if (byodImei.length === 15) {
                  setByodMessage(
                    `IMEI ${byodImei} formatted cleanly. Continue to Check Compatibility for full details.`
                  );
                } else {
                  setByodMessage("Please enter a 15-digit IMEI number.");
                }
              }}
            >
              <h3 className={styles.byodDarkTitle}>
                Already have a phone you love?
              </h3>
              <p className={styles.byodDarkDesc}>
                Check it works on our network with your IMEI (dial *#06#). We
                only use it to check compatibility.
              </p>

              <div className={styles.byodFormRow}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={15}
                  placeholder="15-digit IMEI"
                  className={styles.byodInput}
                  value={byodImei}
                  onChange={(e) => {
                    setByodImei(
                      e.target.value.replace(/\D/g, "").slice(0, 15)
                    );
                    if (byodMessage) setByodMessage("");
                  }}
                />
                <button type="submit" className={styles.byodBtn}>
                  Check my phone
                </button>
              </div>

              <p className={styles.byodCaption}>
                {byodMessage ||
                  "Unlocked doesn't always mean compatible. Final eligibility is confirmed at activation."}
              </p>
            </form>

            <div className={styles.trustGrid}>
              <div className={styles.trustCard}>
                <span className={styles.trustIconBox}>
                  <Truck size={14} strokeWidth={2.2} />
                </span>
                <h4 className={styles.trustTitle}>Shipping</h4>
                <p className={styles.trustDesc}>
                  Delivery options and timing for your address are shown before
                  you pay.
                </p>
              </div>

              <div className={styles.trustCard}>
                <span className={styles.trustIconBox}>
                  <RotateCcw size={14} strokeWidth={2.2} />
                </span>
                <h4 className={styles.trustTitle}>Returns</h4>
                <p className={styles.trustDesc}>
                  Return window and any fees are listed before checkout.
                  <Link href="/return-policy" className={styles.trustInlineLink}>
                    Returns policy
                  </Link>
                </p>
              </div>

              <div className={styles.trustCard}>
                <span className={styles.trustIconBox}>
                  <ShieldCheck size={14} strokeWidth={2.2} />
                </span>
                <h4 className={styles.trustTitle}>Pre-owned grading</h4>
                <p className={styles.trustDesc}>
                  Every pre-owned phone shows its condition grade and warranty
                  before you buy.
                </p>
              </div>

              <div className={styles.trustCard}>
                <span className={styles.trustIconBox}>
                  <Lock size={14} strokeWidth={2.2} />
                </span>
                <h4 className={styles.trustTitle}>Secure checkout</h4>
                <p className={styles.trustDesc}>
                  Payments are processed securely. A retry never charges you
                  twice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3B: BUYING A PHONE, ANSWERED */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <span className={styles.sectionEyebrow}>FAQS</span>
          <h2 className={styles.sectionHeading}>
            Buying a phone, answered.
          </h2>

          <div className={styles.faqGrid}>
            <div className={styles.faqPhotoCard}>
              <img
                src="/img/Shop-Phones/usp24.png"
                alt="Support specialists ready to help choose a phone"
                className={`${styles.faqPhotoImg} ${styles.desktopOnly}`}
              />
              <img
                src="/img/Shop-Phones/usp48.png"
                alt="Smartphone and notebook on desk"
                className={`${styles.faqPhotoImg} ${styles.mobileOnly}`}
              />
              <div className={styles.faqPhotoFooter}>
                <p className={styles.faqPhotoTitle}>Need help choosing?</p>
                <a href="tel:8009888116" className={styles.faqPhoneLink}>
                  <Phone
                    size={14}
                    strokeWidth={2.2}
                    style={{ color: "#c81e5a" }}
                  />
                  <span>800-988-8116</span>
                </a>
              </div>
            </div>

            <div className={styles.faqList}>
              {buyingFaqs.map((item, idx) => {
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
        </div>
      </section>
    </div>
  );
}

"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";
import Script from "next/script";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";


/**
 * app/layout.js
 * - Client-side dynamic metadata (title, description, canonical, OG, Twitter)
 * - Uses metaMap for static pages + dynamic handler for /plans/, /product/, /blog/
 * - JSON-LD (Organization + WebSite)
 * - Tawk.to chat included
 * - Default OG image: /img/zoikomobile_logo.png
 */

/* -------------------------
   FONT
------------------------- */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

/* -------------------------
   DEFAULT META
------------------------- */
const defaultMeta = {
  title: "Zoiko Mobile | Best Mobile Plans with Unlimited Data",
  description:
    "Stay connected with Zoiko Mobile for affordable plans, free international calling and nationwide 5G coverage.",
  image: "/img/zoikomobile_logo.png",
};

/* -------------------------
   PAGE META MAP (from provided doc)
   Add / edit entries here. This is a large map built from your doc.
------------------------- */
const metaMap = {
  "/": {
    title: "Zoiko Mobile | Best Mobile Plans with Unlimited Data",
    description:
      "Stay connected with Zoiko Mobile for the best mobile plans with unlimited data. Get the coverage & affordability you deserve with our top mobile plan options.",
  },
  "/black-friday-mobile-sim-deals-2025": {
    title: "Black Friday Mobile & SIM Card Deals 2025 | Zoiko Mobile",
    description:
      "Explore Zoiko Mobile Black Friday Mobile & SIM Card Deals 2025. Save big on SIM plans, device protection & phones, and help animal rescues today!",
  },
  "/about": {
    title: "About Us | Zoiko Mobile’s Mission & Vision",
    description:
      "Discover Zoiko Mobile’s purpose‑driven mission: fast 5G, flexible plans & giving back to animals & music. Join the network, making a positive impact daily.",
  },
  "/prepaid-plans": {
    title: "Prepaid Phone Plans | Unlimited High-Speed 5G Data",
    description:
      "Get the best prepaid phone plans at Zoiko Mobile. Affordable, flexible prepaid plans with unlimited high-speed 5G data and reliable coverage.",
  },
  "/postpaid-plans": {
    title: "Best Postpaid Phone Plans | Reliable Mobile Coverage",
    description:
      "Choose Zoiko Mobile for the best postpaid plans. Enjoy affordable, flexible options with nationwide coverage to fit your mobile communication needs.",
  },
  "/business-deals": {
    title: "Affordable Unlimited Business Plans | Zoiko Mobile",
    description: "Affordable unlimited business mobile plans from Zoiko Mobile. Enjoy unlimited data, reliable service & flexible billing tailored for businesses. Sign up now.",
  },
  "/travel-plans": {
    title: "Affordable Travel Data Plans Worldwide | Zoiko Mobile USA",
    description: "Experience the best travel data plans with ZoiKo Mobile. Enjoy seamless connectivity and affordable rates as you explore new destinations around the globe.",
  },
  "/animal-music-channel": {
    title: "Animal and Music Loving Network in USA | Zoiko Mobile",
    description:
      "Join the vibrant community of the animal and music loving network in USA. Zoiko Mobile offers a unique experience for pet enthusiasts.",
  },
  "/product-category/refurbished": {
    title: "Premium Refurbished Mobile Phone Deals | Zoiko Mobile USA",
    description:
      "Explore premium refurbished mobile phone deals with incredible discounts! Enjoy high-quality, fully tested smartphones from top brands at affordable prices.",
  },
  "/student-discount-program": {
    title: "Best Phone Plans for Students | Great Deals & Coverage",
    description:
      "Zoiko Mobile offers the best phone plans for students! Stay connected with budget-friendly options designed to fit your college lifestyle. Shop now!",
  },
  "/military-veterans": {
    title: "Affordable Military & Veterans Phone Plans | Zoiko Mobile",
    description:
      "Get the most affordable military & veterans phone plans. Enjoy reliable service with great coverage, plus exclusive discounts for military members & veterans.",
  },
  "/postal-service-workers": {
    title: "Postal Service Mobile Plans | Unlimited Data | Zoiko Mobile",
    description:
      "Get connected with our postal service mobile plans featuring unlimited data. Perfect for postal service workers looking for dependable options. Shop Now!",
  },
  "/family-plans": {
    title: "Affordable Family Phone Plans | Great Deals for Families",
    description:
      "Save money with family phone plans that fit your budget. Stay connected with unlimited data & excellent coverage for all family members. Find your plan now!",
  },
  "/5g-data-deals": {
    title: "Affordable 5G Mobile Data Plans | Zoiko Mobile",
    description:
      "Upgrade to Zoiko Mobile's 5G mobile data plans and enjoy blazing-fast internet speeds. Perfect for streaming, gaming, and staying connected on the go!",
  },
  "/wi-fi-calling": {
    title: "Affordable WiFi Calling Service | Zoiko Mobile",
    description:
      "Zoiko Mobile offers top-notch wifi calling service that enhances your communication experience. Enjoy clear calls & reliable connections anytime, anywhere.",
  },
  "/canada-mexico-roaming-plans": {
    title: "Affordable Canada & Mexico Roaming Plans | Zoiko Mobile",
    description:
      "Travel smart with Zoiko Mobile's Canada & Mexico roaming plans. Experience hassle-free communication while exploring new destinations. Check our plans now!",
  },
  "/esim": {
    title: "eSIM Service Provider in USA | Stay Connected Worldwide",
    description:
      "Stay connected globally with a top eSIM service provider in USA. Fast activation, flexible mobile plans, and high-speed service without a physical SIM card.",
  },
  "/free-international-calling": {
    title: "Free International Minutes | Stay Connected Worldwide",
    description:
      "Say goodbye to expensive calls! Enjoy free international minutes and connect with your loved ones worldwide. Check out Zoiko Mobile for details!",
  },
  "/byod-plans": {
    title: "Bring Your Own Phone Data Plans | Zoiko Mobile",
    description:
      "Join Zoiko Mobile for the best bring your own phone data plans. Enjoy seamless connectivity and savings while keeping your favorite device!",
  },
  "/blog": {
    title: "Read Zoiko Mobile Blog | SIM Tips, News & Insights",
    description:
      "Read Zoiko Mobile Blog for the latest SIM-only and eSIM tips, mobile insights, plan comparisons, and expert advice on saving money and using tech smartly.",
  },
  "/sustainability": {
    title: "Zoiko Mobile Sustainability | Commitment to Greener Future",
    description:
      "Zoiko Mobile is working towards a sustainable future through responsible practices, green technology, and initiatives designed to preserve the environment.",
  },
  "/animal-charities": {
    title: "Animal Charity Workers Get 20% Off Zoiko Mobile Plans",
    description:
      "Zoiko Mobile offers 20% off mobile plans to animal charity workers. Get connected with great service and savings while supporting animal welfare.",
  },
  "/terms-and-conditions": {
    title: "Discover Zoiko Mobile’s Terms and Conditions | Learn more",
    description:
      "Read Zoiko Mobile’s terms and conditions to understand the guidelines and policies for using our services. Stay informed about your rights and obligations.",
  },
  "/privacy-policy": {
    title: "Zoiko Mobile Privacy Policy | Protecting Your Data Safely",
    description:
      "Zoiko Mobile ensures your personal data is protected. Read our privacy policy to understand how we collect, store, and secure your information safely.",
  },
  "/cookie-policy": {
    title: "Zoiko Mobile Cookie Policy | Learn How We Use Cookies",
    description:
      "Learn about Zoiko Mobile's cookie usage and how we enhance your browsing experience by personalizing content and tracking site activity for analytics.",
  },
  "/intellectual-property-notice": {
    title: "Zoiko Mobile Intellectual Property and Copyright Notice",
    description:
      "Get detailed information about Zoiko Mobile’s intellectual property rights, including copyright protection and trademark use guidelines.",
  },
  "/consumer-information": {
    title: "Helpful Consumer Information & Resources | Zoiko Mobile",
    description:
      "Find complete consumer information on Zoiko Mobile’s products, services, plans, devices and customer support to enhance your experience and stay informed.",
  },
  "/regularity-information": {
    title: "Zoiko Mobile Legal and Regulatory Compliance Details",
    description:
      "Read Zoiko Mobile's regulatory information and compliance with industry standards, ensuring transparency, security & legal adherence for our customers.",
  },
  "/california-consumer-privacy-act": {
    title: "Zoiko Mobile | California Consumer Privacy Act (CCPA)",
    description:
      "Read about Zoiko Mobile's compliance with the California Consumer Privacy Act (CCPA) and how we protect your personal information.",
  },
  "/contact-us": {
    title: "Contact Zoiko Mobile | We're Here to Help",
    description:
      "Have questions about Zoiko Mobile? Contact our friendly team for support with plans, billing, coverage, and more. Fast, reliable help is just a click away.",
  },
  "/free-delivery-policy": {
    title: "Zoiko Mobile Free Delivery Policy | Shop with Ease",
    description:
      "At Zoiko Mobile, enjoy free delivery on all purchases. Get your devices and mobile plans shipped for free. Shop now for great deals with no extra cost.",
  },
  "/news": {
    title: "Zoiko Mobile | News & Updates | Stay Connected",
    description:
      "Discover the latest updates, news, and press releases from Zoiko Mobile – stay informed on our newest products, innovations, partnerships & announcements.",
  },
  "/roaming-rates": {
    title: "Zoiko International Roaming Rates | Data, Minutes & Texts",
    description:
      "Traveling abroad? Discover Zoiko Mobile's competitive roaming rates for data, minutes, and texts. Stay connected globally at the best prices.",
  },
  "/bundled-offers": {
    title: "Top Bundled Offers for Data, Calls & Text | Zoiko Mobile",
    description:
      "Save big with Zoiko Mobile’s bundled offers! Our SIM cards come with affordable data, calls, and text packages to meet your mobile needs.",
  },
  "/out-of-bundle-rates": {
    title: "Zoiko Mobile Out of Bundle Rates for Global Coverage",
    description:
      "Zoiko Mobile offers transparent out-of-bundle rates for data, calls, and text messages. Learn about our pricing for global coverage today!",
  },
  "/global-chatter-free-international-calls": {
    title: "Free International Calls with Global Chatter | Zoiko Mobile",
    description:
      "Stay connected globally with Zoiko Mobile’s Global Chatter. Enjoy free international calls to over 240 countries with no hidden charges.",
  },
  "/international-callings": {
    title: "Affordable International Calling Plans | Zoiko Mobile",
    description:
      "Get the best international calling plans with Zoiko Mobile. Make calls to over 240 countries at affordable prices. Stay connected without the high costs.",
  },
  "/store-locater": {
    title: "Zoiko Mobile Store Locator | Find a Store Nearby",
    description:
      "Looking for a Zoiko Mobile store? Use our store locator to easily find the nearest location and visit for the best mobile plans and services.",
  },
  "/top-up-plan": {
    title: "Zoiko Mobile Top-Up Plan | Instant Credit & Flexibility",
    description:
      "Instantly recharge your Zoiko Mobile account with our Top-Up Plan. Enjoy flexible, on-demand credit that gives you full control—no contracts required.",
  },
  "/free-international-minutes": {
    title: "Enjoy Free International Minutes with Zoiko Mobile Plans",
    description:
      "Stay globally connected with Zoiko Mobile—get 250 free international minutes on select plans and call over 200 countries without fees.",
  },
  "/all-plans": {
    title: "All Zoiko Mobile Plans | 5G Data and No Hidden Charges",
    description:
      "Browse Zoiko Mobile's all plans featuring high-speed 5G, unlimited everything, flexible pricing, hotspot access, and secure device protection.",
  },
  "/refer-a-friend-page": {
    title: "Zoiko Refer a Friend Program | Earn £20 Per Referral",
    description:
      "Refer friends to Zoiko Mobile and get £20 credit for each successful signup. They will get £20 too after activating their plan. Share your link now!",
  },
  "/cashback-reward": {
    title: "Zoiko Mobile Cashback Rewards | Earn Credits & Bonuses",
    description:
      "Join Zoiko Mobile today and earn 5¢ cashback for every 1¢ spent on your plan or bundle. A simple way to reward your loyalty and cut monthly costs.",
  },
  "/business-login": {
    title: "Zoiko Mobile Business Login | Manage Your Account",
    description:
      "Log in to your Zoiko Mobile Business account to manage multiple SIM-only plans, monitor wireless usage, update billing details, and control user access.",
  },
  "/careers": {
    title: "Careers at Zoiko Mobile | Join Our Growing Team",
    description:
      "Join Zoiko Mobile’s team and grow your career. We’re hiring sales professionals and more across the USA. Apply now to make an impact.",
  },
  "/do-not-sell-my-personal-information": {
    title: "Do Not Sell My Personal Information Policy | Zoiko Mobile",
    description:
      "Protect your data with Zoiko Mobile’s Do Not Sell My Personal Information Policy. Opt-out now and take control of your privacy rights. Read More!",
  },
  "/911-e911-disclosure": {
    title: "Zoiko Mobile 911 & E911 Emergency Call Disclosure",
    description:
      "Learn how Zoiko Mobile manages emergency services with 911 & E911 disclosure focused on safety, accurate information, and user responsibility.",
  },
  "/ild-consumer-agreement": {
    title: "ILD Consumer Agreement | Zoiko Mobile Services",
    description:
      "Learn about Zoiko Mobile's ILD Consumer Agreement, including service terms, usage policies, and your responsibilities when using international calls.",
  },
  "/activate": {
    title: "Zoiko Mobile SIM Activation Form | Fast Online Process",
    description:
      "Activate your Zoiko Mobile SIM card quickly and easily online. Follow the simple steps to get up and running on your mobile service in no time.",
  },
  "/wholesale": {
    title: "Zoiko Mobile Wholesale | Partner with Us Today",
    description:
      "Join Zoiko Mobile’s wholesale program for access to affordable devices and plans. Ideal for resellers, distributors, and retail partners.",
  },
  "/switch": {
    title: "Switch to Zoiko Mobile | Unlock Huge Savings on Mobile Plans",
    description:
      "Save big by switching to Zoiko Mobile today! Enjoy great savings on mobile plans, devices, and services, with affordable pricing & excellent customer support.",
  },
  "/login": {
    title: "Log in to My Zoiko Account | Easily Manage Your Services",
    description:
      "Access your Zoiko Mobile account and manage everything from usage history to plan details. Log in to make updates and explore your account options.",
  },
  "/offer-page": {
    title: "Zoiko Mobile Offers | Save on Your Next Mobile Plan",
    description:
      "Save more with Zoiko Mobile! Our special offers include discounts on mobile plans, phones, and more. Don’t miss out on exclusive deals for new customers.",
  },
  "/music-hub": {
    title: "Zoiko Mobile Music Hub Plans | Access Your Music Anytime",
    description:
      "Access unlimited music with Zoiko Mobile’s Music Hub. Stream, download, and enjoy your favorite tunes anytime and anywhere with our easy-to-use platform.",
  },
  "/support": {
    title: "Zoiko Mobile Support | Comprehensive Help for Customers",
    description:
      "Need assistance? Zoiko Mobile’s support page provides quick solutions to your questions about billing, devices, plans, and network issues. Get help now.",
  },
  "/reasons-to-love-zoiko-mobile": {
    title: "Reasons to Love Zoiko Mobile | Great Plans and Services",
    description:
      "Learn about the top reasons to love Zoiko Mobile. Enjoy great plans, affordable prices, and top-notch customer service every time you need it.",
  },
  "/customer-service": {
    title: "Zoiko Mobile Customer Support | Get Assistance Anytime",
    description:
      "Zoiko Mobile’s customer service provides fast assistance for mobile plans, billing, devices, and more. Get answers and solutions with ease and efficiency.",
  },
  "/how-to-activate-sim": {
    title: "Zoiko Mobile SIM Activation | Quick and Easy Steps",
    description:
      "Learn how to activate your Zoiko Mobile SIM card with ease. Follow our guide to get up and running on your mobile service in no time.",
  },
  "/how-to-activate-your-esim": {
    title: "How to Activate Your eSIM | Easy Guide for Zoiko Mobile",
    description:
      "Learn how to activate your Zoiko Mobile eSIM with our easy step-by-step guide. Start using your eSIM quickly and enjoy all the benefits of mobile service.",
  },
  "/checkout": {
    title: "ZoikoMobile Checkout | Confirm Order & Secure Payment",
    description:
      "Ready to check out? Confirm your Zoiko Mobile order and complete payment securely. Fast, simple, and safe mobile checkout experience.",
  },
  "/affiliate-program": {
    title: "Join the Zoiko Mobile Affiliate Program | Earn Rewards",
    description:
      "Join the Zoiko Mobile Affiliate Program and earn rewards for every referral. Promote our services and start generating income today!",
  },
  "/affiliate-program-application-form": {
    title: "Zoiko Mobile Affiliate Program Form | Become a Partner Now",
    description:
      "Fill out the Zoiko Mobile Affiliate Program form now and become a partner. Earn commissions on every successful referral with a secure application process.",
  },
  "/partner-with-us": {
    title: "Partner with Zoiko Mobile | Join Our Network",
    description:
      "Partner with Zoiko Mobile to grow your business. Join our affiliate, wholesale, or retail programs for exclusive opportunities and support.",
  },
  "/community": {
    title: "Zoiko Mobile Community | Connect, Share, and Grow",
    description:
      "Join the Zoiko Mobile Community to connect, share ideas, and collaborate with fellow mobile enthusiasts. Engage, learn, and grow together today!",
  },
  "/plans/zoiko-core": {
    title: "Zoiko Core Plan with 5GB Unlimited Data | Save Money",
    description:
      "Get the Zoiko Core 5GB phone plan with powerful features, unlimited data, 2000 minutes of talk, 20,000 texts & free international calls to over 100+ countries.",
  },
  "/plans/zoiko-supreme-unlimited": {
    title: "Get Zoiko Supreme Unlimited | Data Without Limits",
    description:
      "Get unlimited 5G data, talk, and text with Zoiko Supreme Unlimited. Fast speeds, reliable service, and no limits on data.",
  },
  "/plans/zoiko-unlimited-plus": {
    title: "Get Unlimited 5G Data with Zoiko Unlimited Plus Plan",
    description:
      "Get unlimited 5G data and talk with the Zoiko Unlimited Plus Plan. Only $30/month for fast speeds, unlimited calls & reliable service with no limits.",
  },
  "/plans/zoiko-premium-unlimited": {
    title: "Zoiko Premium Unlimited Plan with 20GB Mobile Hotspot",
    description:
      "Stay connected with Zoiko Premium Unlimited. Enjoy unlimited 5G data, talk, and text with 20GB hotspot included for high-usage customers.",
  },
  "/plans/zoiko-flex": {
    title: "Zoiko Flex Plan | Unlimited Data & Hotspot for $13",
    description:
      "Zoiko Flex Plan offers unlimited 5G data, talk, text, and mobile hotspot for just $13/month. Stay connected with free international calls and more.",
  },
  "/plans/zoiko-essential": {
    title: "Zoiko Essential Plan | Unlimited High-Speed 5GB Data",
    description:
      "Stay connected with Zoiko Essential Plan. Get 5GB data, talk, and text for just $20/month—affordable mobile service with reliable coverage.",
  },
  "/plans/zoiko-unlimited-one": {
    title: "ZoiKo Unlimited One Plan | Unlimited Data & Talk",
    description:
      "Enjoy unlimited 5G data, talk, and text with ZoiKo Unlimited One. Get nationwide coverage and mobile hotspot access for just $30/month.",
  },
  "/plans/zoiko-max": {
    title: "Affordable Zoiko Max Plans | Unlimited 5G Data",
    description:
      "Discover the Zoiko Max Plan – unlimited 5G, free global calling, and no contracts. Experience seamless connectivity with Zoiko Mobile’s prepaid plans.",
  },
  "/plans/zoiko-infinity": {
    title: "Zoiko Infinity Plan | Unlimited Free International Calls",
    description:
      "Stay connected with Zoiko Infinity Plan: unlimited 5G, free global calls, and budget-friendly prepaid plans with no contracts or credit checks required.",
  },
  "/plans/zoiko-business-advanced": {
    title: "Zoiko Business Advanced Plan | Advanced Connectivity",
    description:
      "Stay connected with Zoiko Business Advanced. Designed for business needs, offering robust data, priority access, and enterprise-grade reliability.",
  },
  "/plans/zoiko-business-infinite": {
    title: "Zoiko Business Infinite Plan | Unlimited Data & Calls",
    description:
      "Get unlimited data, calls, and texts with Zoiko Business Infinite Plan. Power your business with reliable connectivity and fast speeds wherever you are.",
  },
  "/plans/zoiko-daily-adventure-pass": {
    title: "Zoiko Daily Adventure Pass | 500MB Roaming Data",
    description:
      "Stay connected during your travels with the Zoiko Daily Adventure Pass. Enjoy the freedom of daily roaming data access wherever your journey takes you.",
  },
  "/plans/zoiko-voyager-pass": {
    title: "Zoiko Voyager Pass Plan | 2GB Premium Data Per Day",
    description:
      "Enjoy the freedom of travel with Zoiko Voyager Pass. Get 2GB premium data daily and easily stay online across borders.",
  },
  "/plans/zoiko-global-connect": {
    title: "Zoiko Global Connect Plan | 10GB High-Speed Data",
    description:
      "Roam freely with Zoiko Voyager Pass. Get uninterrupted 10GB High-Speed Data and enjoy mobile freedom while traveling without any complex setup.",
  },
  "/plans/zoiko-top-up": {
    title: "Zoiko Mobile Top-Up | Recharge Your Plan Anytime",
    description:
      "Stay connected with Zoiko Mobile top-up plans. Enjoy instant recharges, secure payments, and 24/7 service—all from the convenience of your device.",
  },
  "/plans/zoiko-top-up-plus": {
    title: "Recharge Your Zoiko Mobile with Top-Up Plus Plans",
    description:
      "Get fast, secure mobile recharges with Zoiko Top-Up Plus. Choose your amount, pay online, and recharge your Zoiko Mobile instantly and easily.",
  },
  "/plans/zoiko-premium-unlimited": {
    title: "Zoiko Premium Unlimited Plan with 20GB Mobile Hotspot",
    description:
      "Stay connected with Zoiko Unlimited Plus. Enjoy unlimited 5G data, talk, and text with 20GB hotspot included for high-usage customers.",
  },
  "/plans/zoiko-lite-postpaid": {
    title: "Zoiko Lite Postpaid | Affordable Mobile Plan",
    description:
      "Get the Zoiko Lite Postpaid Plan for just $15/month. Enjoy unlimited talk, text, 5G data, mobile hotspot, and international calling to 200+ countries.",
  }
  // add more entries as needed...
};

/* -------------------------
   DYNAMIC META HANDLER
------------------------- */
function generateDynamicMeta(pathname) {
  // plans like /plans/zoiko-core
  if (pathname.startsWith("/plans/")) {
    const planName = pathname.split("/").pop().replace(/[-_]/g, " ");
    const pretty = planName
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `Zoiko ${pretty} Plan | Unlimited 5G Data & Free Calls`,
      description: `Get the Zoiko ${pretty} plan — enjoy unlimited 5G data, free international calls, and reliable coverage.`,
      image: defaultMeta.image,
    };
  }

  // blog posts like /blog/some-post
  // if (pathname.startsWith("/blog/")) {
  //   const post = pathname.split("/").pop().replace(/[-_]/g, " ");
  //   const pretty = post
  //     .split(" ")
  //     .filter(Boolean)
  //     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  //     .join(" ");
  //   return {
  //     title: `${pretty} | Zoiko Mobile Blog`,
  //     description: `Read about ${pretty} and explore Zoiko Mobile news and insights.`,
  //     image: defaultMeta.image,
  //   };
  // }

  // products like /product/samsung-galaxy-s25 or /product/sku
  if (pathname.startsWith("/product/")) {
    const prod = pathname.split("/").pop().replace(/[-_]/g, " ");
    const pretty = prod
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `Buy ${pretty} | Zoiko Mobile`,
      description: `Purchase ${pretty} from Zoiko Mobile. Great deals and secure shopping.`,
      image: defaultMeta.image,
    };
  }

  return {
    title: defaultMeta.title,
    description: defaultMeta.description,
    image: defaultMeta.image,
  };
}

/* -------------------------
   Helper: set or update meta tags
------------------------- */
function setMetaTag({ selector, attr = "content", value, create = false, element = "meta", attrName = "name", attrValue }) {
  try {
    let node = document.querySelector(selector);
    if (node) {
      node.setAttribute(attr, value);
    } else if (create) {
      const el = document.createElement(element);
      if (attrName && attrValue) el.setAttribute(attrName, attrValue);
      el.setAttribute(attr, value);
      document.head.appendChild(el);
    }
  } catch (e) {
    // ignore in case head not ready
  }
}

/* -------------------------
   ROOT LAYOUT (client)
------------------------- */
export default function RootLayout({ children }) {
  const pathname = usePathname() || "/";
  const staticMeta = metaMap[pathname];
  const metaObj = staticMeta ? { ...staticMeta, image: defaultMeta.image } : generateDynamicMeta(pathname);

  useEffect(() => {
    // Title
    if (metaObj?.title) document.title = metaObj.title;

    // Description
    const descSelector = 'meta[name="description"]';
    setMetaTag({
      selector: descSelector,
      attr: "content",
      value: metaObj.description || defaultMeta.description,
      create: true,
      element: "meta",
      attrName: "name",
      attrValue: "description",
    });

    // Canonical
    const canonicalHref = `${window.location.origin}${pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalHref;
    else {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = canonicalHref;
      document.head.appendChild(canonical);
    }

    // Open Graph tags
    setMetaTag({
      selector: 'meta[property="og:title"]',
      attr: "content",
      value: metaObj.title,
      create: true,
      element: "meta",
      attrName: "property",
      attrValue: "og:title",
    });
    setMetaTag({
      selector: 'meta[property="og:description"]',
      attr: "content",
      value: metaObj.description,
      create: true,
      element: "meta",
      attrName: "property",
      attrValue: "og:description",
    });
    setMetaTag({
      selector: 'meta[property="og:url"]',
      attr: "content",
      value: canonicalHref,
      create: true,
      element: "meta",
      attrName: "property",
      attrValue: "og:url",
    });
    setMetaTag({
      selector: 'meta[property="og:image"]',
      attr: "content",
      value: metaObj.image || defaultMeta.image,
      create: true,
      element: "meta",
      attrName: "property",
      attrValue: "og:image",
    });

    // Twitter card
    setMetaTag({
      selector: 'meta[name="twitter:card"]',
      attr: "content",
      value: "summary_large_image",
      create: true,
      element: "meta",
      attrName: "name",
      attrValue: "twitter:card",
    });
    setMetaTag({
      selector: 'meta[name="twitter:title"]',
      attr: "content",
      value: metaObj.title,
      create: true,
      element: "meta",
      attrName: "name",
      attrValue: "twitter:title",
    });
    setMetaTag({
      selector: 'meta[name="twitter:description"]',
      attr: "content",
      value: metaObj.description,
      create: true,
      element: "meta",
      attrName: "name",
      attrValue: "twitter:description",
    });
    setMetaTag({
      selector: 'meta[name="twitter:image"]',
      attr: "content",
      value: metaObj.image || defaultMeta.image,
      create: true,
      element: "meta",
      attrName: "name",
      attrValue: "twitter:image",
    });

    // Cleanup function is optional: we keep tags updated rather than removing.
  }, [pathname, metaObj]);

  // JSON-LD structured data
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Zoiko Mobile",
      url: typeof window !== "undefined" ? window.location.origin : "https://zoikomobile.com",
      logo: `${typeof window !== "undefined" ? window.location.origin : "https://zoikomobile.com"}/img/zoikomobile_logo.png`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "800-988-8116",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Zoiko Mobile",
      url: typeof window !== "undefined" ? window.location.origin : "https://zoikomobile.com",
      potentialAction: {
        "@type": "SearchAction",
        target: `${typeof window !== "undefined" ? window.location.origin : "https://zoikomobile.com"}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html lang="en">
      <head>
        <Script id="zoiko-breadcrumb-jsonld" type="application/ld+json" strategy="afterInteractive">
{`{
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Best Postpaid Phone Plans",
      "item": "https://zoikomobile.com/postpaid-plans/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Best Travel Data Plan",
      "item": "https://zoikomobile.com/travel-plans/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Refurbished Mobile Phone Deals",
      "item": "https://zoikomobile.com/product-category/refurbished/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Best Phone Plans for Students",
      "item": "https://zoikomobile.com/college-student/"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Best eSim Service Provider in USA",
      "item": "https://zoikomobile.com/esim/"
    }
  ]
}`}
        </Script>
        {/* ✅ JSON-LD structured data (WebSite) */}
        {/* <Script
          id="zoiko-website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Zoiko Mobile",
              url: "https://zoikomobile.com/",
            }),
          }}
        /> */}

        {/* ✅ Open Graph site name */}
        <meta property="og:site_name" content="Zoiko Mobile" />

        {/* Google Translate meta tag */}
        <meta name="google-translate-customization" content="notranslate" />

        {/* Google Site Verification */}
        <meta name="google-site-verification" content="U_E87KEtgWSC9YqTlXs8tN41X6j60af1_HXlKOYFrU4" />

        {/* Google Analytics using env var NEXT_PUBLIC_GA_ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
          
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />

            {/* <script id="bp-wa-script" src="https://cdn.botpenguin.com/whatsapp-widget.js">1d7581d3-034a-4279-a26b-c3cac2106314</script> */}
          </>
        )}


       {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '838514508768820');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=838514508768820&ev=PageView&noscript=1"
          />
        </noscript>
        <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
      </head>

      <body className={roboto.className}>
        <BootstrapClient />
         {children}
        {/* Tawk.to chat
        <Script id="tawkto-script" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/677d17e049e2fd8dfe03ae53/1ih544pk7';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script> */}

        <Script id="tawkto-script" strategy="afterInteractive">
  {`
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    Tawk_API.onLoad = function() {
      Tawk_API.hideWidget(); // Hide on page load
    };

    Tawk_API.onChatMinimized = function(){
      Tawk_API.hideWidget(); // Hide when user closes chat
    };

    (function(){
      var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/677d17e049e2fd8dfe03ae53/1ih544pk7';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  `}
</Script>

        {/* JSON-LD */}
        <Script id="zoiko-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <Script id="chunk-error-recovery" strategy="afterInteractive">
          {`
            window.addEventListener('error', (e) => {
              if (e?.message?.includes('ChunkLoadError')) {
                console.warn('ChunkLoadError detected, reloading...');
                window.location.reload();
              }
            });
          `}
          </Script>

      </body>
    </html>
  );
}
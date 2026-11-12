const IMG = "/img/wireless-plans/";

// Plans are loaded live from the Zoiko API (see normalizePlans).
export const families = [
  { id: "prepaid", label: "Personal Prepaid" },
  { id: "lcm", label: "Lite / Core / Max" },
  { id: "business", label: "Business" },
  { id: "travel", label: "Travel & International", tag: "Updating" },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

const FAMILY_BY_TYPE = {
  "prepaid-plans": "prepaid",
  "postpaid-plans": "lcm",
  "business-plans": "business",
  "travel-plans": "travel",
};
const CARD_IMAGES = [35, 36, 37, 38, 39].map((n) => `${IMG}image (${n}).png`);

const findFeature = (features, re) => (features.find((f) => re.test(f.text)) || {}).text;
const toGB = (text) => {
  if (!text) return 0;
  if (/unlimited/i.test(text)) return 999;
  const m = text.match(/(\d+(?:\.\d+)?)\s*(GB|MB)/i);
  if (!m) return 0;
  return m[2].toUpperCase() === "MB" ? Number(m[1]) / 1000 : Number(m[1]);
};

// "1500 Minutes Talk & 10000 Texts" -> "1500 min · 10000 texts"
const talkLabel = (t) => {
  const min = t.match(/(\d[\d,]*)\s*minutes/i);
  const txt = t.match(/(\d[\d,]*)\s*texts/i);
  if (min && txt) return `${min[1]} min · ${txt[1]} texts`;
  if (/unlimited/i.test(t)) return "Unlimited";
  return t.trim();
};

export function normalizePlans(list) {
  const counters = {};
  return list
    .filter((p) => p.status === "active" && FAMILY_BY_TYPE[p.plan_type])
    .sort((a, b) => a.order - b.order || a.id - b.id)
    .map((p) => {
      const family = FAMILY_BY_TYPE[p.plan_type];
      const features = p.features || [];
      const premiumText = findFeature(features, /premium data/i);
      const hotspotText = findFeature(features, /hotspot/i);
      const intlText = findFeature(features, /\d+\+?\s*countries/i);
      const talkText = findFeature(features, /minutes|texts?\b|talk/i);
      const n = (counters[family] = (counters[family] ?? -1) + 1);
      const gb = (t) => { const m = (t || "").match(/(\d+(?:\.\d+)?)\s*(GB|MB)/i); return m ? m[0].replace(/\s+/g, "") : null; };
      return {
        id: String(p.id),
        slug: p.slug,
        family,
        name: p.title.trim(),
        price: Number(p.sale_price || p.price),
        listPrice: Number(p.price),
        currency: p.currency || "$",
        per: p.duration_type ? `/${p.duration_type} per line` : "/mo per line",
        badge: p.tag && !/unlimited/i.test(p.tag) ? p.tag : null,
        image: CARD_IMAGES[n % CARD_IMAGES.length],
        dataGB: premiumText ? toGB(premiumText) : null,
        premium: premiumText ? (/unlimited/i.test(premiumText) ? "Unlimited" : gb(premiumText)) : null,
        hotspot: hotspotText ? gb(hotspotText) : null,
        hotspotGB: hotspotText ? toGB(hotspotText) : null,
        talk: talkText ? talkLabel(talkText) : null,
        intl: intlText ? ((intlText.match(/\d+\+?\s*countries/i) || [null])[0] || "").toLowerCase() || null : null,
        features: features.map((f) => f.text),
      };
    });
}

export const faqs = [
  { q: "What does “plus taxes & fees” mean?", a: "Prices shown are per line, per month, before taxes and regulatory fees. Your exact total, including anything due today, is shown before you pay." },
  { q: "How do multi-line discounts work?", a: "Multi-line discounts are checked at quote. Add your lines in the quote tool and the pricing service returns your total." },
  { q: "Are talk and text unlimited?", a: "Most plans list unlimited talk and text, but some plans carry text limits. Final terms are confirmed for each plan before purchase." },
  { q: "What happens after I use my premium data?", a: "Data continues under the plan’s approved policy, which may mean slower speeds. See the fair-use policy for details." },
  { q: "Can I compare plans from different families?", a: "Plans can be compared within the same family. Every price comes from one catalog and is confirmed at checkout." },
  { q: "Which countries can I call?", a: "Each plan lists its approved destinations. See the international calling country list for the full set." },
  { q: "Can I keep my number?", a: "Yes. Transfer your U.S. number securely and keep your old service active until it’s done." },
  { q: "Where is the Broadband Facts label?", a: "Every plan card links to its Broadband Facts label. You can also find them on the Broadband Consumer Labels page." },
];

export const buyCards = [
  { id: "coverage", title: "Check coverage", image: IMG + "image (42).png", field: "ZIP code", placeholder: "" },
  { id: "phone", title: "Check your phone", image: IMG + "image (43).png", field: "IMEI (dial *#06#)", placeholder: "" },
  { id: "number", title: "Keep your number", image: IMG + "image (44).png", text: "Transfer your U.S. number securely. Keep your old service active until it’s done.", link: "Start a transfer", href: "/switch" },
  { id: "esim", title: "eSIM or SIM", image: IMG + "image (45).png", text: "Use eSIM on supported, unlocked phones, or get a physical SIM shipped.", link: "How activation works", href: "/how-to-activate-your-esim" },
];

import { internationalCountries } from "../utils/internationalCountries";
import { roamingRates } from "../utils/roamingRates";

export const img = (n) => `/img/explore-international/image (${n}).png`;

// --- Calling from the U.S.: group landline / mobile minutes per destination ---
const callMap = new Map();
for (const row of internationalCountries) {
  const mobile = /\s-\s*Cellular$/i.test(row.destination);
  const name = row.destination.replace(/\s-\s*Cellular$/i, "").trim();
  const entry = callMap.get(name) || { name, landline: null, mobile: null };
  if (mobile) entry.mobile = row.minutes;
  else entry.landline = row.minutes;
  callMap.set(name, entry);
}
export const callingDestinations = [...callMap.values()].sort((a, b) => a.name.localeCompare(b.name));

// --- Roaming rates by destination ---
export const roamingByName = new Map(roamingRates.map((r) => [r.destination, r]));
export const roamingDestinations = roamingRates
  .map((r) => r.destination)
  .filter((d) => d !== "Airline Services")
  .sort((a, b) => a.localeCompare(b));

// Destinations for the hero search, which serves both services.
export const allDestinations = [
  ...new Set([...callingDestinations.map((d) => d.name), ...roamingDestinations]),
].sort((a, b) => a.localeCompare(b));

export const services = {
  calling: {
    badge: "International calling",
    title: "Calling from the U.S.",
    image: img(23),
    text: "You’re in the U.S. and want to call or text someone in another country. What’s included depends on your plan, the destination and whether you call a mobile or a landline.",
    bullets: [
      "Mobile and landline allowances shown separately",
      "Dialing steps for each country",
      "Premium and special numbers explained",
    ],
    cta: "Check calling details",
    href: "#calling",
  },
  roaming: {
    badge: "Roaming",
    title: "Traveling abroad",
    image: img(25),
    text: "You’re taking your phone to another country. Roaming is offered on select plans, and whether your line can roam there is confirmed for your plan and destination.",
    bullets: [
      "Data, call and text charges listed separately",
      "Plan up to three trip stops",
      "Line-specific check when you sign in",
    ],
    cta: "Plan my trip",
    href: "#roaming",
  },
};

export const steps = [
  { n: "01", icon: "globe", title: "Choose what you need", text: "Calling from the U.S., or using your phone abroad." },
  { n: "02", icon: "search", title: "Check your destination", text: "See what applies for your plan, country and number type." },
  { n: "03", icon: "check", title: "Get ready to go", text: "Set up your phone and know your charges before you leave." },
];

export const guides = [
  {
    id: "before",
    label: "Before you travel",
    title: "Get ready before you leave",
    sub: "A few minutes at home saves surprises abroad.",
    steps: [
      "Check your phone is unlocked and supports the networks in your destination.",
      "Check whether your plan includes roaming, and in which countries.",
      "Turn on Wi-Fi calling so you can call and text over Wi-Fi.",
      "Download offline maps and translation packs on Wi-Fi.",
      "Save the local emergency number for each country you’ll visit.",
      "Save our support number: 800-988-8116.",
    ],
  },
  {
    id: "iphone",
    label: "Roaming on iPhone",
    title: "Turn roaming on for iPhone",
    sub: "Settings names can vary by iOS version.",
    steps: [
      "Confirm your plan includes roaming for your destination first.",
      "Open Settings, then tap Mobile Service (or Cellular).",
      "Tap Mobile Data Options (or Cellular Data Options).",
      "Turn on Data Roaming when you arrive.",
      "Turn Data Roaming off again when you’re back in the U.S.",
    ],
  },
  {
    id: "android",
    label: "Roaming on Android",
    title: "Turn roaming on for Android",
    sub: "Menu names differ by brand and software version.",
    steps: [
      "Confirm your plan includes roaming for your destination first.",
      "Open Settings, then Network & internet (or Connections).",
      "Tap Mobile network (or SIM manager) and choose your line.",
      "Turn on Data roaming when you arrive.",
      "Turn Data roaming off again when you’re back in the U.S.",
    ],
  },
  {
    id: "wifi",
    label: "Wi-Fi calling",
    title: "Call and text over Wi-Fi",
    sub: "Works where Wi-Fi calling is supported on your phone and plan.",
    steps: [
      "On iPhone: open Settings › Phone › Wi-Fi Calling and turn it on.",
      "On Android: open Settings › Connections (or Network) › Wi-Fi calling.",
      "Confirm your emergency address if your phone asks for it.",
      "Connect to Wi-Fi, then make a call as usual.",
    ],
  },
  {
    id: "data",
    label: "Save data abroad",
    title: "Keep your data use in check",
    sub: "Small settings changes make a big difference.",
    steps: [
      "Use Wi-Fi whenever it’s available.",
      "Download maps, playlists and shows before you leave.",
      "Turn off background app refresh and automatic app updates.",
      "Set a data warning so there are no surprises.",
      "Check your usage in the Zoiko app or your account.",
    ],
  },
];

export const checklist = [
  { t: "Check your phone works abroad", d: "Make sure it’s unlocked and supports the networks where you’re going." },
  { t: "Check your plan’s roaming", d: "Roaming is offered on select plans. Confirm yours before you leave." },
  { t: "Turn on Wi-Fi calling", d: "Call and text over Wi-Fi where it’s supported." },
  { t: "Look up local emergency numbers", d: "911 may not work abroad. Many countries use 112 or a local number." },
  { t: "Set data alerts", d: "Keep an eye on usage so there are no surprises." },
  { t: "Save our support number", d: "Call 800-988-8116 if you need help with international service." },
];

export const quickLinks = [
  { icon: "search", tone: "pink", title: "Check a destination", text: "Full destination details and rates.", href: "/roaming-rates" },
  { icon: "phone", tone: "pink", title: "International calling", text: "Plans, destinations and dialing.", href: "/international-callings" },
  { icon: "plane", tone: "green", title: "Roaming", text: "Using your phone abroad.", href: "/travel-plans" },
  { icon: "wifi", tone: "green", title: "Usage tips", text: "Wi-Fi calling, data settings and saving data abroad.", href: "/wi-fi-calling" },
  { icon: "headset", tone: "plum", title: "Get help", text: "Talk to our team about international service.", href: "/support" },
];

export const faqs = [
  { q: "What’s the difference between international calling and roaming?", a: "International calling means calling another country while you’re in the U.S. Roaming means using your phone while you’re in another country. They have different rules and charges." },
  { q: "Are international calls unlimited?", a: "Not necessarily. Allowances depend on your plan, the destination and whether you call a mobile or a landline. Check the destination above to see what applies." },
  { q: "How do I dial another country from the U.S.?", a: "Dial 011, then the country code, then the local number. On a mobile you can also press and hold 0 to enter +, then the country code and number." },
  { q: "Can I roam on my plan?", a: "Roaming is offered on select plans. Whether your line can roam in a country is confirmed for your plan and destination." },
  { q: "How will I be charged for roaming?", a: "Data, calls and texts are charged separately, per destination. See the rates for each country on the roaming rates page, and set data alerts before you travel." },
  { q: "Do you sell travel passes?", a: "Yes. See our travel plans for daily and weekly passes for use abroad." },
  { q: "Will 911 work when I’m abroad?", a: "Not always. 911 may not work outside the U.S. Many countries use 112 or a local emergency number, so look it up before you go." },
];

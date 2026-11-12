const IMG = "/img/phone-unlock-help/";
export const img = (n) => `${IMG}image (${n}).png`;

export const journey = [
  { n: 1, title: "Check lock status", sub: "On your phone", href: "#lock-status" },
  { n: 2, title: "Find your carrier", sub: "Who sold the phone", href: "#carrier" },
  { n: 3, title: "Fix common issues", sub: "PUK, financing and more", href: "#issues" },
  { n: 4, title: "Get help", sub: "Next steps and support", href: "#help" },
];

export const platforms = [
  {
    id: "iphone",
    label: "iPhone",
    title: "Check your iPhone",
    steps: [
      "Open Settings.",
      "Tap General, then About.",
      "Scroll to Carrier Lock.",
      "“No SIM restrictions” may mean your iPhone is unlocked. Anything else usually means it’s locked.",
    ],
    note: "Menu names can differ by iOS version.",
  },
  {
    id: "android",
    label: "Android",
    title: "Check your Android phone",
    steps: [
      "Open Settings.",
      "Tap About phone (or Software information).",
      "Look for SIM status, Network lock or SIM lock status.",
      "If it says unlocked or no restrictions, your phone is probably unlocked. Anything else usually means it’s locked.",
    ],
    note: "Menu names differ by brand and software version.",
  },
  {
    id: "unsure",
    label: "Not sure",
    title: "Not sure what phone you have?",
    steps: [
      "Look at the back of the phone or the box for the brand and model.",
      "Open Settings and search for “About” to find the model name.",
      "Choose iPhone or Android above, then follow those steps.",
      "Still stuck? Ask the carrier that sold you the phone, or use the help form below.",
    ],
    note: "Your receipt or carrier account also shows the phone model.",
  },
];

// What the person found on their phone -> which "next step" card applies.
export const findings = [
  { id: "unlocked", label: "It looks unlocked" },
  { id: "locked", label: "It looks locked" },
  { id: "pending", label: "I’ve asked my carrier, and it’s pending" },
  { id: "restricted", label: "It’s reported lost, stolen or restricted" },
  { id: "unsure", label: "I’m not sure" },
];

export const statuses = [
  { id: "unlocked", icon: "unlock", tone: "green", title: "Unlocked (from your phone)", text: "Next, check compatibility with Zoiko.", ready: "Not yet", readyTone: "plum" },
  { id: "locked", icon: "lock", tone: "plum", title: "Locked", text: "Ask your original carrier to unlock it.", ready: "No", readyTone: "pink" },
  { id: "pending", icon: "clock", tone: "amber", title: "Unlock request pending", text: "Check the status with your carrier. Pending isn’t approved.", ready: "No", readyTone: "pink" },
  { id: "restricted", icon: "shield", tone: "pink", title: "Carrier restricted", text: "Contact the carrier. There’s no workaround for lost, stolen or fraud restrictions.", ready: "No", readyTone: "pink" },
  { id: "unsure", icon: "info", tone: "plum", title: "Not sure", text: "Follow the steps above, or ask our team for help.", ready: "No", readyTone: "pink" },
  { id: "compatible", icon: "check", tone: "green", title: "Compatible (checked by Zoiko)", text: "Your phone passed our compatibility check.", ready: "Subject to all checks", readyTone: "green" },
];

// Carrier unlock guidance. AT&T content is from the approved design; other carriers
// are placeholders until Content Operations supplies verified policy text and URLs.
const PENDING_NOTE = "This carrier’s published unlock requirements are being verified. Always confirm on the carrier’s official page.";
export const carriers = [
  {
    id: "att", name: "AT&T", type: "Consumer", short: "AT&T",
    bullets: ["Device bought more than 60 days ago.", "Device fully paid off.", "No loss, theft or fraud flag on the device.", "Account meets AT&T’s current conditions."],
    warning: "Not every AT&T device qualifies after 60 days. AT&T makes the final decision.",
    url: "https://www.att.com/deviceunlock/", source: "https://www.att.com/deviceunlock/",
    verified: "November 6, 2026", owner: "Content Operations", status: "Verified · Legal approval pending",
  },
  {
    id: "att-prepaid", name: "AT&T Prepaid", type: "Prepaid", short: "AT&T Prepaid",
    bullets: ["Check the unlock requirements for prepaid devices on AT&T’s official page."],
    warning: PENDING_NOTE,
    url: "https://www.att.com/deviceunlock/", source: "https://www.att.com/deviceunlock/",
    verified: "Pending", owner: "Content Operations", status: "Pending verification",
  },
  {
    id: "tmobile", name: "T-Mobile", type: "All plans", short: "T-Mobile",
    bullets: ["Check T-Mobile’s device unlock requirements on its official page."],
    warning: PENDING_NOTE,
    url: "https://www.t-mobile.com/", source: "https://www.t-mobile.com/",
    verified: "Pending", owner: "Content Operations", status: "Pending verification",
  },
  {
    id: "verizon-prepaid", name: "Verizon Prepaid", type: "Prepaid", short: "Verizon Prepaid",
    bullets: ["Check Verizon’s prepaid device unlock requirements on its official page."],
    warning: PENDING_NOTE,
    url: "https://www.verizon.com/", source: "https://www.verizon.com/",
    verified: "Pending", owner: "Content Operations", status: "Pending verification",
  },
  {
    id: "verizon", name: "Verizon Monthly & Business", type: "Postpaid / business", short: "Verizon",
    bullets: ["Check Verizon’s postpaid and business device unlock requirements on its official page."],
    warning: PENDING_NOTE,
    url: "https://www.verizon.com/", source: "https://www.verizon.com/",
    verified: "Pending", owner: "Content Operations", status: "Pending verification",
  },
  {
    id: "other", name: "Other / not sure", type: "We’ll help you work it out", short: "Your carrier",
    bullets: ["Find the name of the carrier on your bill, receipt or SIM card.", "Ask that carrier whether your phone is eligible to be unlocked.", "Use the help form below if you can’t tell who sold the phone."],
    warning: "Only the carrier that originally locked the phone can unlock it.",
    url: "#help", source: "—", verified: "—", owner: "Content Operations", status: "General guidance",
  },
];

export const issues = [
  { id: "iphone-carrier", title: "iPhone shows a carrier name", text: "Seeing something other than “No SIM restrictions”?", image: img(10),
    todo: "A carrier name next to your signal bars is just the network your SIM is on. The lock status is under Settings › General › About › Carrier Lock. If it doesn’t say “No SIM restrictions”, your original carrier can tell you if it can be unlocked." },
  { id: "android-menus", title: "Android menus look different", text: "Every brand and software version is a little different.", image: img(9),
    todo: "Open Settings and search for “SIM status” or “Network lock”. If you can’t find it, check your brand’s support page or ask the carrier that sold the phone." },
  { id: "puk", title: "Asked for a SIM PIN or PUK", text: "That’s a SIM card lock, not a carrier lock.", image: img(8),
    todo: "A PIN or PUK prompt protects the SIM card, not the phone. Your original carrier can give you the PUK for that SIM. Don’t guess: too many wrong PUK attempts can permanently block the SIM." },
  { id: "financing", title: "Still paying for the phone", text: "Carriers usually require the phone to be paid off first.", image: img(7),
    todo: "Check your balance with the carrier. Most carriers won’t unlock a phone until it’s paid off. Unlocking or switching doesn’t pay off a device balance." },
  { id: "lost", title: "Reported lost or stolen", text: "Only the carrier can review this kind of restriction.", image: img(6),
    todo: "Contact the carrier that reported it. There’s no workaround for lost, stolen or fraud restrictions, and Zoiko can’t remove them." },
  { id: "sellers", title: "Unlock code sellers", text: "Paying a third party for unlock codes or software is risky.", image: img(2),
    todo: "Never pay third-party sellers for unlock codes or software. Only your original carrier can unlock your phone safely." },
];

export const nextSteps = [
  { title: "Check Compatibility", text: "See if your phone works with Zoiko.", link: "Check my phone", href: "/byod-plans", image: img(5) },
  { title: "Keep Your Number", text: "Transfer your number separately and securely.", link: "Check my number", href: "/switch", image: img(11) },
  { title: "Shop Phones", text: "Prefer a new phone, ready for Zoiko?", link: "Shop phones", href: "https://phones.zoikomobile.com", image: img(4) },
];

export const keepSeparate = [
  ["Unlocking:", "handled by your original carrier."],
  ["Compatibility:", "checked by Zoiko with our network partner."],
  ["SIM PIN / PUK:", "a SIM card lock, not a carrier lock."],
  ["Number transfer:", "a separate, secure process. Don’t cancel your old service first."],
  ["Financing:", "unlocking or switching doesn’t pay off a device balance."],
];

export const topics = [
  "My phone shows a carrier name",
  "I can’t find the lock setting",
  "My carrier hasn’t replied",
  "I’m asked for a SIM PIN or PUK",
  "I’m still paying for the phone",
  "Checking if my phone works with Zoiko",
  "Something else",
];

export const faqs = [
  { q: "Can Zoiko unlock my phone?", a: "No. Only the carrier that originally locked your phone can unlock it. We can help you understand the steps and check whether your phone works with Zoiko." },
  { q: "How do I know if my phone is unlocked?", a: "On iPhone, go to Settings › General › About and look at Carrier Lock. “No SIM restrictions” usually means unlocked. On Android, look for SIM status or Network lock under About phone. Menus vary by brand and version." },
  { q: "Is there a rule that phones unlock after 60 days?", a: "Some carriers publish a waiting period, such as 60 days, but rules differ by carrier and plan. Check your carrier’s official unlock page, because the carrier makes the final decision." },
  { q: "If my phone is unlocked, will it work with Zoiko?", a: "Not automatically. Unlocked doesn’t always mean compatible. A compatibility check is always the next step." },
  { q: "Does unlocking cancel my device payments?", a: "No. Unlocking or switching doesn’t pay off a device balance. Most carriers require the phone to be paid off before they unlock it." },
  { q: "What’s the difference between a PUK and an unlock code?", a: "A PUK unlocks a SIM card that’s been blocked after wrong PIN attempts. An unlock code (or an unlock request) removes the carrier lock from the phone. They’re different things." },
  { q: "Should I cancel my old service before switching?", a: "No. Keep your old service active until your number transfer is complete, so you don’t lose your number." },
];

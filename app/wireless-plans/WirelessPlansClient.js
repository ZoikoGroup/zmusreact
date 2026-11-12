"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Minus, Plus, ChevronDown, BarChart3, Wifi, MessageCircle, Globe,
  FileText, Info, Phone, Check, X,
} from "lucide-react";
import styles from "./WirelessPlans.module.css";
import { families, faqs, buyCards, normalizePlans, API_BASE_URL } from "./plansData";

const PRICE_FILTERS = [
  { id: "any", label: "Any" },
  { id: "under25", label: "Under $25", test: (p) => p < 25 },
  { id: "25-50", label: "$25–$50", test: (p) => p >= 25 && p <= 50 },
  { id: "over50", label: "Over $50", test: (p) => p > 50 },
];
const DATA_FILTERS = [
  { id: "any", label: "Any" },
  { id: "light", label: "Light (up to 6GB)", test: (g) => g <= 6 },
  { id: "moderate", label: "Moderate (7–15GB)", test: (g) => g >= 7 && g <= 15 },
  { id: "heavy", label: "Heavy (16GB+)", test: (g) => g >= 16 },
];
const SORTS = [
  { id: "asc", label: "Price: low to high" },
  { id: "desc", label: "Price: high to low" },
  { id: "data", label: "Most premium data" },
];

const dataQ = ["Mostly Wi-Fi", "Streaming on the go", "Lots of video"];
const hotspotQ = ["Rarely", "Sometimes", "Often"];
const whoQ = ["Just me", "Family (2–5 lines)", "My business"];

function Chip({ active, children, ...rest }) {
  return (
    <button type="button" className={`${styles.chip} ${active ? styles.chipActive : ""}`} {...rest}>
      {children}
    </button>
  );
}

function Stepper({ value, onChange }) {
  return (
    <div className={styles.stepper}>
      <button type="button" aria-label="Decrease" onClick={() => onChange(Math.max(1, value - 1))}><Minus size={16} /></button>
      <span>{value}</span>
      <button type="button" aria-label="Increase" onClick={() => onChange(Math.min(10, value + 1))}><Plus size={16} /></button>
    </div>
  );
}

function PlanCard({ plan, lines, compared, onCompare }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={styles.planCard}>
      <div className={styles.planImg}>
        <img src={plan.image} alt="" />
        {plan.badge && <span className={styles.planBadge}>{plan.badge}</span>}
      </div>
      <div className={styles.planBody}>
        <h3>{plan.name}</h3>
        <div className={styles.planPrice}>
          <strong>{plan.currency}{plan.price}</strong><span>{plan.per}</span>
        </div>
        <p className={styles.planMeta}>Plus taxes &amp; fees</p>
        <ul className={styles.planFeatures}>
          {plan.premium && <li><span><BarChart3 size={15} /> Premium data</span><b>{plan.premium}</b></li>}
          {plan.hotspot && <li><span><Wifi size={15} /> Hotspot</span><b>{plan.hotspot}</b></li>}
          {plan.talk && <li><span><MessageCircle size={15} /> Talk &amp; text</span><b>{plan.talk}</b></li>}
          {plan.intl && <li><span><Globe size={15} /> International</span><Link href="/international-calling-country-list" className={styles.linkPink}>{plan.intl}</Link></li>}
        </ul>
        <button type="button" className={styles.seeAll} onClick={() => setOpen(!open)} aria-expanded={open}>
          See all features <ChevronDown size={14} className={open ? styles.rot : ""} />
        </button>
        {open && (
          <div className={styles.expanded}>
            <ul className={styles.featList}>
              {plan.features.map((f) => (<li key={f}>{f.trim()}</li>))}
            </ul>
            <p>{lines} {lines === 1 ? "line" : "lines"} · {plan.currency}{plan.price * lines}/mo before taxes &amp; fees. Multi-line discounts are checked at quote.</p>
          </div>
        )}
        {plan.unavailable && (
          <div className={styles.planNote}><Info size={13} /> {plan.note}</div>
        )}
        <Link href="/consumer-information" className={styles.bfl}><FileText size={14} /> Broadband Facts label</Link>
        <div className={styles.planActions}>
          {plan.unavailable ? (
            <button type="button" className={styles.btnDisabled} disabled>Not available yet</button>
          ) : (
            <Link href={`/plans/${plan.slug}`} className={styles.btnPrimary}>Select plan</Link>
          )}
          <label className={styles.compare}>
            <input type="checkbox" checked={compared} onChange={() => onCompare(plan.id)} />
            <span className={styles.box}>{compared && <Check size={12} />}</span> Compare
          </label>
        </div>
      </div>
    </article>
  );
}

function CompareModal({ list, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const rows = [
    ["Price per line", (p) => `${p.currency}${p.price}${p.per.replace(" per line", "")}`],
    ["Premium data", (p) => p.premium],
    ["Hotspot", (p) => p.hotspot],
    ["Talk & text", (p) => p.talk],
    ["International calling", (p) => p.intl],
  ].filter(([, get]) => list.some((p) => get(p)));
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Compare plans" onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h3>Compare plans</h3>
          <button type="button" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className={styles.modalScroll}>
          <table className={styles.cmpTable}>
            <thead>
              <tr>
                <th scope="col"></th>
                {list.map((p) => (
                  <th key={p.id} scope="col"><img src={p.image} alt="" /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Plan</th>{list.map((p) => <td key={p.id}><b>{p.name}</b></td>)}</tr>
              {rows.map(([label, get]) => (
                <tr key={label}><th scope="row">{label}</th>{list.map((p) => <td key={p.id}>{get(p) || "—"}</td>)}</tr>
              ))}
              <tr>
                <th scope="row"></th>
                {list.map((p) => (
                  <td key={p.id}>
                    {p.unavailable
                      ? <span className={styles.cmpNA}>Not available yet</span>
                      : <Link href={`/plans/${p.slug}`} className={styles.btnPrimary}>Buy now</Link>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function WirelessPlansClient() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState("loading");
  const [family, setFamily] = useState("prepaid");
  const [lines, setLines] = useState(1);
  const [priceF, setPriceF] = useState("any");
  const [dataF, setDataF] = useState("any");
  const [sort, setSort] = useState("asc");
  const [compare, setCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const [ans, setAns] = useState({ data: null, hotspot: null, who: null });
  const [quotePlan, setQuotePlan] = useState("");
  const [quoteLines, setQuoteLines] = useState(1);
  const [quote, setQuote] = useState(null);
  const [zip, setZip] = useState("");
  const [imei, setImei] = useState("");
  const [checks, setChecks] = useState({});
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/plans`, { signal: ctrl.signal });
        const json = await res.json();
        if (!json.success || !Array.isArray(json.data)) throw new Error("bad response");
        setPlans(normalizePlans(json.data));
        setStatus("ready");
      } catch (e) {
        if (e.name !== "AbortError") setStatus("error");
      }
    })();
    return () => ctrl.abort();
  }, []);

  const fromPlan = useMemo(
    () => plans.filter((p) => p.family !== "travel").sort((a, b) => a.price - b.price)[0] || null,
    [plans]
  );

  const counts = useMemo(
    () => Object.fromEntries(families.map((f) => [f.id, plans.filter((p) => p.family === f.id).length])),
    [plans]
  );

  const visible = useMemo(() => {
    const pf = PRICE_FILTERS.find((f) => f.id === priceF);
    const df = DATA_FILTERS.find((f) => f.id === dataF);
    const list = plans.filter(
      (p) => p.family === family && (!pf.test || pf.test(p.price)) && (!df.test || (p.dataGB != null && df.test(p.dataGB)))
    );
    return [...list].sort((a, b) =>
      sort === "desc" ? b.price - a.price : sort === "data" ? (b.dataGB ?? -1) - (a.dataGB ?? -1) : a.price - b.price
    );
  }, [plans, family, priceF, dataF, sort]);

  const toggleCompare = (id) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));

  const clearAll = () => { setPriceF("any"); setDataF("any"); setSort("asc"); setLines(1); setCompare([]); };

  const answered = ans.data !== null && ans.hotspot !== null && ans.who !== null;
  const matches = useMemo(() => {
    if (!answered) return [];
    const wantGB = [6, 15, 22][ans.data] + (ans.who === 1 ? 5 : 0);
    const wantHot = [1, 4, 12][ans.hotspot];
    const fam = ans.who === 2 ? "business" : "prepaid";
    return plans
      .filter((p) => p.family === fam && !p.unavailable)
      .map((p) => ({ p, score: Math.abs((p.dataGB ?? 0) - wantGB) + Math.abs((p.hotspotGB ?? 0) - wantHot) }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)
      .map((x) => x.p);
  }, [plans, ans, answered]);

  const getQuote = () => {
    const p = plans.find((x) => x.id === quotePlan);
    if (!p) return setQuote({ error: "Choose a plan to get a quote." });
    setQuote({ plan: p, lines: quoteLines, total: p.price * quoteLines });
  };

  const runCheck = async (id) => {
    const setRes = (ok, msg) => setChecks((c) => ({ ...c, [id]: { ok, msg } }));
    if (id === "coverage") {
      if (!/^\d{5}$/.test(zip.trim())) return setRes(false, "Enter a valid 5-digit ZIP code.");
      setRes(true, "Opening the coverage map for your area…");
      window.open("https://mvnoc.ai/coverage-map", "_blank", "noopener");
      return;
    }
    const cleaned = imei.replace(/\D/g, "");
    if (cleaned.length !== 15) return setRes(false, "Enter a 15-digit IMEI.");
    setRes(true, "Checking your phone…");
    try {
      const res = await fetch("https://goliteapi.golitemobile.com/api/device_compatibility_checker/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Secret-Key": process.env.NEXT_PUBLIC_ESIM_SECRET_KEY || "" },
        body: JSON.stringify({ action: "esim_check", imei: cleaned }),
      });
      const data = await res.json();
      setRes(true, data.compatible === true
        ? "Your phone is compatible with Zoiko Mobile eSIM and physical SIM."
        : "IMEI verified. Make sure your phone is carrier-unlocked before activating.");
    } catch {
      setRes(false, "Unable to verify your IMEI right now. Please try again.");
    }
  };
  const fieldValue = { coverage: [zip, setZip], phone: [imei, setImei] };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>All wireless plans</span>
          <h1>Find the plan that fits your life.</h1>
          <p>Personal, Lite / Core / Max, business and travel plans in one place.<br />Compare clearly, check coverage and keep your number.</p>
          <div className={styles.heroFrom}>
            {fromPlan && (<>
              Plans from <strong>{fromPlan.currency}{fromPlan.price}</strong>
              <span>/mo per line for {fromPlan.name}, plus taxes &amp; fees. <Link href="/terms-and-conditions">See pricing conditions</Link></span>
            </>)}
          </div>
          <div className={styles.heroBtns}>
            <a href="#catalog" className={styles.btnPrimaryLg}>Browse plans</a>
            <a href="#coverage" className={styles.btnGhostLg}><MapPin size={16} /> Check coverage</a>
          </div>
        </div>
        <div className={styles.heroImgs}>
          <img className={styles.h1img} src="/img/wireless-plans/image (32).png" alt="Two friends sharing a phone" />
          <img className={styles.h2img} src="/img/wireless-plans/image (33).png" alt="Friends laughing at a phone" />
          <img className={styles.h3img} src="/img/wireless-plans/image (34).png" alt="Team talking around a table" />
          {fromPlan && (
            <div className={styles.heroPriceCard}>
              <span>Plans from</span>
              <strong>{fromPlan.currency}{fromPlan.price}</strong>
              <small>/mo per line · {fromPlan.name}</small>
            </div>
          )}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className={styles.catalog}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Plan catalog</span>
          <h2>Choose a plan family.</h2>
          <p className={styles.lead}>Plans can be compared within the same family. Every price comes from one catalog and is confirmed at checkout.</p>

          <div className={styles.tabs} role="tablist">
            {families.map((f) => (
              <button key={f.id} role="tab" aria-selected={family === f.id} type="button"
                className={`${styles.tab} ${family === f.id ? styles.tabActive : ""}`}
                onClick={() => { setFamily(f.id); setCompare([]); }}>
                {f.label}
                {f.tag ? <em className={styles.tabTag}>{f.tag}</em> : <i className={styles.count}>{counts[f.id]}</i>}
              </button>
            ))}
          </div>

          <div className={styles.catalogGrid}>
            <aside className={styles.filters}>
              <h4>Number of lines</h4>
              <Stepper value={lines} onChange={setLines} />
              <p className={styles.small}>Multi-line discounts are checked at quote.</p>
              <h4>Price per line</h4>
              <div className={styles.chipRow}>
                {PRICE_FILTERS.map((f) => <Chip key={f.id} active={priceF === f.id} onClick={() => setPriceF(f.id)}>{f.label}</Chip>)}
              </div>
              <h4>Data needs</h4>
              <div className={styles.chipRow}>
                {DATA_FILTERS.map((f) => <Chip key={f.id} active={dataF === f.id} onClick={() => setDataF(f.id)}>{f.label}</Chip>)}
              </div>
              <h4>Sort by</h4>
              <select className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <button type="button" className={styles.clearBtn} onClick={clearAll}>Clear all</button>
            </aside>

            <div>
              <p className={styles.count2}>{visible.length} {visible.length === 1 ? "plan" : "plans"} · {lines} {lines === 1 ? "line" : "lines"}</p>
              {family === "travel" && (
                <p className={styles.small}>Travel &amp; International plans are being updated. <Link href="/travel-plans" className={styles.linkPink}>See current travel plans</Link>.</p>
              )}
              {status === "loading" ? (
                <div className={styles.empty}>Loading plans…</div>
              ) : status === "error" ? (
                <div className={styles.empty}>We couldn’t load plans right now. <button type="button" onClick={() => window.location.reload()}>Try again</button></div>
              ) : visible.length === 0 ? (
                <div className={styles.empty}>No plans match these filters. <button type="button" onClick={clearAll}>Clear all</button></div>
              ) : (
                <div className={styles.planGrid}>
                  {visible.map((p) => (
                    <PlanCard key={p.id} plan={p} lines={lines} compared={compare.includes(p.id)} onCompare={toggleCompare} />
                  ))}
                </div>
              )}
              {compare.length > 0 && (
                <div className={styles.compareBar}>
                  <strong>Comparing {compare.length}/3:</strong>{" "}
                  {compare.map((id) => plans.find((p) => p.id === id).name).join(" · ")}
                  <button type="button" className={styles.compareGo} disabled={compare.length < 2} onClick={() => setShowCompare(true)}>
                    {compare.length < 2 ? "Select 2+ to compare" : "Compare plans"}
                  </button>
                  <button type="button" onClick={() => setCompare([])}>Clear</button>
                </div>
              )}
              <p className={styles.fine}>Plan details are as published on zoikomobile.com. Premium-data speed terms vary, so final talk, text and data terms are confirmed for each plan before purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HELP ME CHOOSE */}
      <section className={styles.white}>
        <div className={`${styles.wrap} ${styles.twoCol}`}>
          <div>
            <span className={styles.eyebrow}>Help me choose</span>
            <h2>Three questions. A clear answer.</h2>
            <p className={styles.lead}>We match plans to your needs and show why. No hidden rankings.</p>
            <img className={styles.roundImg} src="/img/wireless-plans/image (40).png" alt="Support team helping a customer" />
          </div>
          <div className={styles.panel}>
            <h4>1. How do you use data?</h4>
            <div className={styles.chipRow}>{dataQ.map((t, i) => <Chip key={t} active={ans.data === i} onClick={() => setAns({ ...ans, data: i })}>{t}</Chip>)}</div>
            <h4>2. Do you share your connection (hotspot)?</h4>
            <div className={styles.chipRow}>{hotspotQ.map((t, i) => <Chip key={t} active={ans.hotspot === i} onClick={() => setAns({ ...ans, hotspot: i })}>{t}</Chip>)}</div>
            <h4>3. Who is it for?</h4>
            <div className={styles.chipRow}>{whoQ.map((t, i) => <Chip key={t} active={ans.who === i} onClick={() => setAns({ ...ans, who: i })}>{t}</Chip>)}</div>
            {answered ? (
              <div className={styles.matches}>
                <p className={styles.small}>Best matches for your answers:</p>
                {matches.map((p) => (
                  <Link key={p.id} href={`/plans/${p.slug}`} className={styles.matchRow}>
                    <span>{p.name}</span><b>{p.currency}{p.price}/mo</b>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.small}>Answer all three to see matching plans.</p>
            )}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className={styles.tint}>
        <div className={`${styles.wrap} ${styles.twoCol}`}>
          <div>
            <span className={styles.eyebrow}>Your quote</span>
            <h2>Lines, plan and total in one place.</h2>
            <p className={styles.lead}>Totals come only from our pricing service. We never guess a total in your browser.</p>
            <img className={styles.roundImg} src="/img/wireless-plans/image (41).png" alt="Team talking around a table" />
          </div>
          <div className={styles.quoteCard}>
            <label className={styles.lbl} htmlFor="qplan">Plan</label>
            <select id="qplan" className={styles.input} value={quotePlan} onChange={(e) => { setQuotePlan(e.target.value); setQuote(null); }}>
              <option value="">Choose a plan</option>
              {plans.filter((p) => !p.unavailable).map((p) => <option key={p.id} value={p.id}>{p.name} — {p.currency}{p.price}/mo</option>)}
            </select>
            <span className={styles.lbl}>Lines</span>
            <Stepper value={quoteLines} onChange={(v) => { setQuoteLines(v); setQuote(null); }} />
            <button type="button" className={styles.btnPrimaryBlock} onClick={getQuote}>Get my quote</button>
            {quote?.error && <p className={styles.err}>{quote.error}</p>}
            {quote?.plan && (
              <div className={styles.quoteResult}>
                <b>{quote.plan.name}</b> × {quote.lines} {quote.lines === 1 ? "line" : "lines"}
                <strong>{quote.plan.currency}{quote.total}/mo</strong>
                <Link href={`/plans/${quote.plan.slug}`} className={styles.linkPinkBold}>Continue to plan →</Link>
                <small>Before taxes &amp; fees. Final total is confirmed at checkout.</small>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BEFORE YOU BUY */}
      <section id="coverage" className={styles.white}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Before you buy</span>
          <h2>Coverage, your phone and your number.</h2>
          <div className={styles.buyGrid}>
            {buyCards.map((c) => (
              <div key={c.id} className={styles.buyCard}>
                <img src={c.image} alt="" />
                <div className={styles.buyBody}>
                  <h3>{c.title}</h3>
                  {c.field ? (
                    <>
                      <label className={styles.lblSm} htmlFor={`f-${c.id}`}>{c.field}</label>
                      <div className={styles.checkRow}>
                        <input id={`f-${c.id}`} className={styles.input} value={fieldValue[c.id][0]} onChange={(e) => fieldValue[c.id][1](e.target.value)} />
                        <button type="button" className={styles.btnGhostSm} onClick={() => runCheck(c.id)}>Check</button>
                      </div>
                      {checks[c.id] && <p className={checks[c.id].ok ? styles.ok : styles.err}>{checks[c.id].msg}</p>}
                    </>
                  ) : (
                    <>
                      <p>{c.text}</p>
                      <Link href={c.href} className={styles.linkPinkBold}>{c.link} →</Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA & CALLING */}
      <section className={styles.tint}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Know before you choose</span>
          <h2>How data and international calling work.</h2>
          <div className={styles.knowGrid}>
            <div className={styles.knowCard}>
              <h3>Premium data and hotspot</h3>
              <div className={styles.bar}><i /></div>
              <p>Each plan includes an amount of premium data. After that, data continues under that plan’s approved policy, which may mean slower speeds. Hotspot has its own allowance.</p>
              <p className={styles.smallDark}>We don’t claim “unlimited high-speed” unless a plan’s terms confirm it. <Link href="/terms-and-conditions" className={styles.linkPinkBold}>Fair-use policy</Link></p>
            </div>
            <div className={`${styles.knowCard} ${styles.knowImg}`}>
              <img src="/img/wireless-plans/image (46).png" alt="Traveler using a phone" />
              <div className={styles.knowBody}>
                <h3>Calling abroad vs. roaming</h3>
                <p><b>Calling abroad</b> means calling other countries from the U.S. <b>Roaming</b> means using your phone while you’re outside the U.S. Each plan lists approved destinations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className={styles.white}>
        <div className={`${styles.wrap} ${styles.communityGrid}`}>
          <div>
            <span className={styles.eyebrow}>The Animal &amp; Music Loving Network.™</span>
            <h2>More than a phone plan.</h2>
            <p className={styles.lead}>Our community supports animal welfare and celebrates music. Community programs are separate from your plan and aren’t included benefits.</p>
            <Link href="/music-hub" className={styles.btnDark}>Explore Community</Link>
          </div>
          <figure className={styles.tile}><img src="/img/wireless-plans/image (47).png" alt="Woman smiling at her phone" /><figcaption>Animal welfare</figcaption></figure>
          <figure className={styles.tile}><img src="/img/wireless-plans/image (48).png" alt="Acoustic guitar outdoors" /><figcaption>Music</figcaption></figure>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.tint}>
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <div>
            <span className={styles.eyebrow}>FAQs</span>
            <h2>Plans, pricing and switching.</h2>
            <div className={styles.expert}>
              <img src="/img/wireless-plans/image (49).png" alt="Zoiko plan expert" />
              <div className={styles.expertBody}>
                <h3>Talk to a plan expert</h3>
                <a href="tel:8009888116"><Phone size={18} /> 800-988-8116</a>
              </div>
            </div>
          </div>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <div key={f.q} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}>
                <button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <i>{openFaq === i ? <Minus size={14} /> : <Plus size={14} />}</i>
                </button>
                {openFaq === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showCompare && <CompareModal list={compare.map((id) => plans.find((p) => p.id === id)).filter(Boolean)} onClose={() => setShowCompare(false)} />}

      <div className={styles.credits}><div className={styles.wrap}>• <span>Photo credits</span></div></div>
    </div>
  );
}

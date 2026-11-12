"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Phone, Plane, Globe, Search, CheckCircle2, Lock, Plus, Minus, Wifi, Headphones, Check, X,
} from "lucide-react";
import styles from "./ExploreInternational.module.css";
import {
  img, callingDestinations, roamingByName, roamingDestinations, allDestinations,
  services, steps, guides, checklist, quickLinks, faqs,
} from "./intlData";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

const ICONS = { globe: Globe, search: Search, check: CheckCircle2, phone: Phone, plane: Plane, wifi: Wifi, headset: Headphones };
const today = () => new Date().toISOString().slice(0, 10);
const nights = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000) + 1;
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const scrollTo = (id) => setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);

function Check2() {
  return <CheckCircle2 size={17} />;
}

export default function ExploreInternationalClient() {
  // plans from the live API
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/plans`, { signal: ctrl.signal });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setPlans(json.data.filter((p) => p.status === "active" && p.plan_type !== "add-on"));
        }
      } catch {
        /* plan lists stay empty; the checkers still work without a plan */
      }
    })();
    return () => ctrl.abort();
  }, []);
  const planOptions = useMemo(() => plans.map((p) => ({ id: String(p.id), name: p.title.trim(), features: p.features || [] })), [plans]);

  // hero
  const [need, setNeed] = useState("");
  const [heroDest, setHeroDest] = useState("");
  const [heroErr, setHeroErr] = useState("");

  // calling
  const [callTo, setCallTo] = useState("");
  const [callPlan, setCallPlan] = useState("");
  const [numType, setNumType] = useState("mobile");
  const [callResult, setCallResult] = useState(null);
  const [callErr, setCallErr] = useState("");

  // roaming
  const [roamPlan, setRoamPlan] = useState("");
  const [stops, setStops] = useState([{ country: "", from: "", to: "" }]);
  const [tripResult, setTripResult] = useState(null);
  const [tripErr, setTripErr] = useState("");

  // guides, checklist, faq
  const [guide, setGuide] = useState("before");
  const [done, setDone] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);

  const planById = (id) => planOptions.find((p) => p.id === id);

  const runCalling = (country = callTo, type = numType, planId = callPlan) => {
    setCallErr("");
    if (!country) { setCallResult(null); return setCallErr("Choose a country to check."); }
    const d = callingDestinations.find((x) => x.name === country);
    const plan = planById(planId);
    const intlFeature = plan?.features.find((f) => /countries/i.test(f.text))?.text;
    setCallResult({
      country,
      type,
      minutes: d ? (type === "mobile" ? d.mobile : d.landline) : null,
      listed: !!d,
      plan: plan?.name,
      planLine: intlFeature,
    });
  };

  const runHero = () => {
    if (!need) return setHeroErr("Choose what you need first.");
    if (!heroDest) return setHeroErr("Choose a country.");
    setHeroErr("");
    if (need === "calling") {
      setCallTo(heroDest);
      runCalling(heroDest);
      scrollTo("calling");
    } else {
      setStops((s) => [{ ...s[0], country: heroDest }, ...s.slice(1)]);
      setTripResult(null);
      scrollTo("roaming");
    }
  };

  const setStop = (i, k, v) => setStops((s) => s.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  const runTrip = () => {
    setTripErr("");
    for (let i = 0; i < stops.length; i++) {
      const s = stops[i];
      if (!s.country) return setTripErr(`Choose a country for stop ${i + 1}.`);
      if (s.from && s.to && s.to < s.from) return setTripErr(`Stop ${i + 1}: the end date can’t be before the start date.`);
    }
    const plan = planById(roamPlan);
    setTripResult({
      plan: plan?.name,
      stops: stops.map((s) => ({ ...s, rate: roamingByName.get(s.country) })),
    });
  };

  const g = guides.find((x) => x.id === guide);
  const pct = Math.round((done.length / checklist.length) * 100);
  const toggleDone = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>Explore international</span>
          <h1>Call the world. <em>Travel connected.</em></h1>
          <p>Calling another country from the U.S. and using your phone abroad are different services. Tell us which one you need, and we’ll show what applies.</p>

          <div className={styles.finder}>
            <h4>What do you need?</h4>
            <div className={styles.radioRow} role="radiogroup" aria-label="What do you need?">
              <button type="button" role="radio" aria-checked={need === "calling"} className={`${styles.needOpt} ${need === "calling" ? styles.needOn : ""}`} onClick={() => setNeed("calling")}>
                <span className={styles.radio}>{need === "calling" && <Check size={11} />}</span>
                <span><b><Phone size={15} /> Calling from the U.S.</b><small>Call people in another country</small></span>
              </button>
              <button type="button" role="radio" aria-checked={need === "roaming"} className={`${styles.needOpt} ${need === "roaming" ? styles.needOnGreen : ""}`} onClick={() => setNeed("roaming")}>
                <span className={`${styles.radio} ${need === "roaming" ? styles.radioGreen : ""}`}>{need === "roaming" && <Check size={11} />}</span>
                <span><b className={styles.greenTxt}><Plane size={15} /> Traveling abroad</b><small>Use your phone in another country</small></span>
              </button>
            </div>
            <label className={styles.lbl} htmlFor="hero-dest">Destination</label>
            <div className={styles.destRow}>
              <select id="hero-dest" value={heroDest} onChange={(e) => setHeroDest(e.target.value)}>
                <option value="">Choose a country</option>
                {allDestinations.map((c) => <option key={c}>{c}</option>)}
              </select>
              <button type="button" className={styles.btnPrimary} onClick={runHero}>Check destination</button>
            </div>
            {heroErr && <p className={styles.err} role="alert">{heroErr}</p>}
            <small className={styles.fineLine}>We never assume you’re traveling or calling. Results depend on your plan and line.</small>
          </div>
        </div>

        <div className={styles.heroRight}>
          <img src={img(24)} alt="Traveler using her phone on a city street" />
          <div className={styles.heroBadge}>
            <div><span className={styles.icoPink}><Phone size={16} /></span><b>Calling from the U.S.</b></div>
            <div><span className={styles.icoGreen}><Plane size={16} /></span><b>Roaming abroad</b></div>
            <small>Two services. Two clear answers.</small>
          </div>
        </div>
      </section>

      {/* TWO SERVICES */}
      <section className={styles.white}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowPlain}>Two services</span>
          <h2>Which one do you need?</h2>
          <div className={styles.svcGrid}>
            {[["calling", services.calling], ["roaming", services.roaming]].map(([key, s]) => (
              <article key={key} className={styles.svcCard}>
                <div className={styles.svcImg}>
                  <img src={s.image} alt="" />
                  <span className={`${styles.svcBadge} ${key === "roaming" ? styles.badgeGreen : ""}`}>
                    {key === "calling" ? <Phone size={13} /> : <Plane size={13} />} {s.badge}
                  </span>
                </div>
                <div className={styles.svcBody}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.bullets.map((b) => (<li key={b} className={key === "roaming" ? styles.liGreen : ""}><Check2 />{b}</li>))}
                  </ul>
                  <a href={s.href} className={`${styles.btnPrimary} ${key === "roaming" ? styles.btnGreen : ""}`}>{s.cta}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALLING */}
      <section id="calling" className={styles.tint}>
        <div className={`${styles.wrap} ${styles.twoCol}`}>
          <div>
            <span className={styles.eyebrowPlain}>International calling</span>
            <h2>Calling a country from the U.S.</h2>
            <p className={styles.lead}>Choose where you’re calling, your plan, and whether it’s a mobile or landline number.</p>
            <img className={styles.roundImg} src={img(22)} alt="Man on a call outside an office building" />
          </div>
          <div>
            <div className={styles.formCard}>
              <p className={styles.from}><Lock size={13} /> Calling from: <b>United States</b></p>
              <div className={styles.row2}>
                <label>Calling to
                  <select value={callTo} onChange={(e) => { setCallTo(e.target.value); setCallResult(null); }}>
                    <option value="">Choose a country</option>
                    {callingDestinations.map((d) => <option key={d.name}>{d.name}</option>)}
                  </select>
                </label>
                <label>Your plan
                  <select value={callPlan} onChange={(e) => { setCallPlan(e.target.value); setCallResult(null); }}>
                    <option value="">Choose a plan</option>
                    {planOptions.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </label>
              </div>
              <span className={styles.lbl}>Number type</span>
              <div className={styles.radioRow} role="radiogroup" aria-label="Number type">
                {[["mobile", "Mobile number"], ["landline", "Landline"]].map(([v, l]) => (
                  <button key={v} type="button" role="radio" aria-checked={numType === v} className={`${styles.pillOpt} ${numType === v ? styles.pillOn : ""}`} onClick={() => { setNumType(v); setCallResult(null); }}>
                    <span className={styles.radio}>{numType === v && <Check size={11} />}</span>{l}
                  </button>
                ))}
              </div>
              <button type="button" className={styles.btnPrimaryBlock} onClick={() => runCalling()}>Check calling details</button>
              {callErr && <p className={styles.err} role="alert">{callErr}</p>}
              {callResult && (
                <div className={styles.result} role="status">
                  <h4>{callResult.country} · {callResult.type === "mobile" ? "Mobile" : "Landline"}</h4>
                  {callResult.listed && callResult.minutes != null ? (
                    <p><b>{callResult.minutes} minutes</b> included to {callResult.type === "mobile" ? "mobile numbers" : "landlines"} in {callResult.country}.</p>
                  ) : (
                    <p>We don’t list an included {callResult.type === "mobile" ? "mobile" : "landline"} allowance for {callResult.country}. Check the full list or ask our team.</p>
                  )}
                  {callResult.plan && (
                    <p>Your plan: <b>{callResult.plan}</b>{callResult.planLine ? ` · ${callResult.planLine.trim()}` : ""}</p>
                  )}
                  <p>Dial <b>011</b>, then the country code, then the local number.</p>
                  <Link href="/international-calling-country-list" className={styles.linkPink}>See the full country list →</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ROAMING */}
      <section id="roaming" className={styles.white}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowGreen}>Roaming</span>
          <div className={styles.roamHead}>
            <div>
              <h2>Plan your trip.</h2>
              <p className={styles.lead}>Add up to three stops. Each destination is checked on its own, and travel dates are for planning only.</p>
            </div>
            <p className={styles.signedOut}><Lock size={13} /> Signed out: showing public information</p>
          </div>
          <div className={styles.roamGrid}>
            <div className={styles.tripCard}>
              <label className={styles.lbl2}>Your plan
                <select value={roamPlan} onChange={(e) => { setRoamPlan(e.target.value); setTripResult(null); }}>
                  <option value="">Choose a plan</option>
                  {planOptions.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </label>
              {stops.map((s, i) => (
                <div key={i} className={styles.stop}>
                  <div className={styles.stopHead}>
                    <b>Stop {i + 1}</b>
                    {i > 0 && <button type="button" aria-label={`Remove stop ${i + 1}`} onClick={() => { setStops((x) => x.filter((_, j) => j !== i)); setTripResult(null); }}><X size={14} /></button>}
                  </div>
                  <div className={styles.stopRow}>
                    <label>Country
                      <select value={s.country} onChange={(e) => { setStop(i, "country", e.target.value); setTripResult(null); }}>
                        <option value="">Choose</option>
                        {roamingDestinations.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </label>
                    <label>From
                      <input type="date" min={today()} value={s.from} onChange={(e) => { setStop(i, "from", e.target.value); setTripResult(null); }} />
                    </label>
                    <label>To
                      <input type="date" min={s.from || today()} value={s.to} onChange={(e) => { setStop(i, "to", e.target.value); setTripResult(null); }} />
                    </label>
                  </div>
                </div>
              ))}
              <div className={styles.tripActions}>
                <button type="button" className={styles.btnOutline} disabled={stops.length >= 3} onClick={() => setStops((s) => [...s, { country: "", from: "", to: "" }])}><Plus size={14} /> Add a stop</button>
                <button type="button" className={`${styles.btnPrimary} ${styles.btnGreen}`} onClick={runTrip}>Check my trip</button>
              </div>
              {tripErr && <p className={styles.err} role="alert">{tripErr}</p>}
            </div>

            <div className={styles.tripSide}>
              <img src={img(21)} alt="Travel planning with a map, camera and phone" />
              <div className={styles.tripNote}>
                {!tripResult ? (
                  <p>Your trip results appear here, one destination at a time. We never add them up into a guessed total.</p>
                ) : (
                  <div className={styles.tripResults} role="status">
                    {tripResult.plan && <p className={styles.small}>Plan: <b>{tripResult.plan}</b>. Whether your line can roam is confirmed when you sign in.</p>}
                    {tripResult.stops.map((s, i) => (
                      <div key={i} className={styles.tripStop}>
                        <b>{i + 1}. {s.country}</b>
                        {s.from && s.to && <span> · {fmtDate(s.from)} – {fmtDate(s.to)} ({nights(s.from, s.to)} days)</span>}
                        {s.rate ? (
                          <ul>
                            <li>Data: {s.rate.per_mb} per MB</li>
                            <li>Calls: {s.rate.per_minute} per minute</li>
                            <li>Texts: {s.rate.per_sms} per message</li>
                          </ul>
                        ) : <p>No public rate listed. Ask our team.</p>}
                      </div>
                    ))}
                    <Link href="/roaming-rates" className={styles.linkGreen}>See all roaming rates →</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.tint}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowPlain}>How it works</span>
          <h2>Three steps to the right answer.</h2>
          <div className={styles.stepGrid}>
            {steps.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={s.n} className={`${styles.stepCard} ${i === 1 ? styles.stepDark : ""}`}>
                  <span className={styles.stepNum}>{s.n}</span>
                  <span className={`${styles.stepIco} ${i === 0 ? styles.icoPink : i === 1 ? styles.icoGrad : styles.icoGreen}`}><Icon size={18} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW-TO GUIDES */}
      <section id="guides" className={styles.white}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowPlain}>How-to guides</span>
          <h2>Step-by-step help for your trip.</h2>
          <p className={styles.lead}>Settings names can vary by phone model and software version.</p>
          <div className={styles.tabs} role="tablist">
            {guides.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={guide === x.id} className={guide === x.id ? styles.tabOn : ""} onClick={() => setGuide(x.id)}>{x.label}</button>
            ))}
          </div>
          <div className={styles.guideGrid}>
            <div className={styles.guideCard}>
              <h3>{g.title}</h3>
              <p className={styles.small}>{g.sub}</p>
              <ol>
                {g.steps.map((s, i) => (<li key={s}><i>{i + 1}</i><span>{s}</span></li>))}
              </ol>
            </div>
            <img className={styles.guideImg} src={img(20)} alt="Two travelers checking a tablet by a bus" />
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className={styles.white}>
        <div className={`${styles.wrap} ${styles.checkGrid}`}>
          <div className={styles.collage}>
            <img className={styles.cA} src={img(19)} alt="Leather backpack" />
            <img className={styles.cB} src={img(18)} alt="Sunglasses" />
            <div className={styles.cC}>
              <strong>{pct}%</strong>
              <span>of your checklist done</span>
            </div>
          </div>
          <div>
            <span className={styles.eyebrowGreen}>Travel readiness</span>
            <h2>Get ready before you go.</h2>
            <p className={styles.lead}>Tick each step as you do it. Nothing is saved or sent.</p>
            <div className={styles.checkList}>
              {checklist.map((c, i) => (
                <label key={c.t} className={styles.checkItem}>
                  <input type="checkbox" checked={done.includes(i)} onChange={() => toggleDone(i)} />
                  <span className={styles.box}>{done.includes(i) && <Check size={13} />}</span>
                  <span><b>{c.t}</b><small>{c.d}</small></span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUR LINE */}
      <section className={styles.tint}>
        <div className={`${styles.wrap} ${styles.lineGrid}`}>
          <div>
            <span className={styles.eyebrowPlain}>Your line</span>
            <h2>See your own international options.</h2>
            <p className={styles.lead}>Sign in to see what’s confirmed for your line by our network partner. We never guess.</p>
            <Link href="/login" className={styles.btnPrimary}>Sign in (preview)</Link>
          </div>
          <img className={styles.roundImgR} src={img(17)} alt="Team talking around a table" />
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className={styles.white}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowPlain}>Quick links</span>
          <h2>Go straight to what you need.</h2>
          <div className={styles.quickGrid}>
            {quickLinks.map((q) => {
              const Icon = ICONS[q.icon];
              return (
                <Link key={q.title} href={q.href} className={styles.quickCard}>
                  <span className={`${styles.quickIco} ${q.tone === "pink" ? styles.icoPink : q.tone === "green" ? styles.icoGreen : styles.icoPlum}`}><Icon size={18} /></span>
                  <h3>{q.title}</h3>
                  <p>{q.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.tint}>
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <div>
            <span className={styles.eyebrowPlain}>FAQs</span>
            <h2>International questions.</h2>
            <div className={styles.expert}>
              <img src={img(16)} alt="Zoiko support agent" />
              <div>
                <h3>Traveling soon? Talk to us first.</h3>
                <a href="tel:8009888116"><Phone size={17} /> 800-988-8116</a>
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
    </div>
  );
}

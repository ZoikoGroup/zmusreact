"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock, Unlock, Info, ShieldCheck, Clock, CheckCircle2, AlertTriangle, ExternalLink,
  Plus, Minus, ArrowRight, Check,
} from "lucide-react";
import styles from "./PhoneUnlockHelp.module.css";
import {
  img, journey, platforms, findings, statuses, carriers, issues, nextSteps,
  keepSeparate, topics, faqs,
} from "./unlockData";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

const ICONS = { unlock: Unlock, lock: Lock, clock: Clock, shield: ShieldCheck, info: Info, check: CheckCircle2 };

function Eyebrow({ n, children }) {
  return (
    <div className={styles.eyebrow}>
      {n ? <span className={styles.eyebrowNum}>{n}</span> : null}
      <span>{children}</span>
    </div>
  );
}

export default function PhoneUnlockHelpClient() {
  const [platform, setPlatform] = useState("iphone");
  const [finding, setFinding] = useState(null);
  const [carrierId, setCarrierId] = useState("att");
  const [openIssue, setOpenIssue] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const [form, setForm] = useState({ phoneType: "", carrier: "", topic: "", message: "", name: "", phone: "", email: "", consent: false });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const plat = platforms.find((p) => p.id === platform);
  const carrier = carriers.find((c) => c.id === carrierId);
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const pickFinding = (id) => {
    setFinding(id);
    setTimeout(() => document.getElementById("status")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.phoneType) er.phoneType = "Choose your phone type.";
    if (!form.carrier) er.carrier = "Choose the original carrier.";
    if (!form.topic) er.topic = "Choose a topic.";
    if (!form.message.trim()) er.message = "Describe the issue.";
    if (!form.name.trim()) er.name = "Enter your name.";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) er.phone = "Enter a 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Enter a valid email address.";
    if (!form.consent) er.consent = "Please agree so we can respond.";
    setErrors(er);
    if (Object.keys(er).length) return;

    setSending(true);
    setSendError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.replace(/\D/g, ""),
          message: [
            "PHONE UNLOCK HELP",
            `Phone type: ${form.phoneType}`,
            `Original carrier: ${form.carrier}`,
            `Topic: ${form.topic}`,
            `Details: ${form.message.trim()}`,
          ].join("\n"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setSendError(`We couldn’t send your request right now. Please try again in a few minutes.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.pill}><Unlock size={14} /> Phone unlock help</span>
          <h1>
            Unlock your phone.<br />
            <em>Keep your options open.</em>
          </h1>
          <p>Check whether your device is carrier-locked, get help from the original carrier, and see if it can work with Zoiko Mobile.</p>
          <div className={styles.heroBtns}>
            <a href="#lock-status" className={styles.btnPrimary}>Get unlocking help</a>
            <Link href="/byod-plans" className={styles.btnGhost}>Check compatibility</Link>
          </div>
          <div className={styles.callout}>
            <Info size={14} />
            <p><b>Your original carrier controls the lock.</b> Zoiko can’t unlock a phone locked by another carrier, but we can help you understand the steps and check your phone works with us.</p>
          </div>
        </div>
        <div className={styles.heroImgs}>
          <img className={styles.hA} src={img(1)} alt="Hands holding a smartphone" />
          <img className={styles.hB} src={img(14)} alt="Phone settings on a wooden table" />
          <img className={styles.hC} src={img(13)} alt="SIM and number transfer screens" />
          <div className={styles.heroCard}>
            <span><Unlock size={14} /> On iPhone</span>
            <small>Settings › General › About</small>
            <strong>“No SIM restrictions”</strong>
            <small>may mean your iPhone is unlocked.</small>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <nav className={styles.journey} aria-label="Unlock steps">
        <div className={styles.journeyInner}>
          {journey.map((j) => (
            <a key={j.n} href={j.href} className={styles.journeyItem}>
              <i>{j.n}</i>
              <span><b>{j.title}</b><small>{j.sub}</small></span>
            </a>
          ))}
        </div>
      </nav>

      {/* 1. LOCK STATUS */}
      <section id="lock-status" className={styles.white}>
        <div className={styles.wrap}>
          <Eyebrow n="1">First, check your lock status</Eyebrow>
          <h2>See what your phone says.</h2>
          <p className={styles.lead}>Choose your phone type for the steps. Menus can vary by software version.</p>
          <div className={styles.segment} role="tablist">
            {platforms.map((p) => (
              <button key={p.id} type="button" role="tab" aria-selected={platform === p.id}
                className={platform === p.id ? styles.segActive : ""} onClick={() => setPlatform(p.id)}>{p.label}</button>
            ))}
          </div>

          <div className={styles.lockGrid}>
            <div className={styles.stepsCard}>
              <h3>{plat.title}</h3>
              <ol>
                {plat.steps.map((s, i) => (<li key={s}><i>{i + 1}</i><span>{s}</span></li>))}
              </ol>
              <div className={styles.noteAmber}><Info size={15} /> {plat.note}</div>
              <div className={styles.notePink}><ShieldCheck size={15} /> Never pay for unlock codes or software from third-party sellers. Only your original carrier can unlock your phone safely.</div>
              <a href="#help" className={styles.linkPink}>I can’t find this setting <ArrowRight size={14} /></a>
            </div>

            <div className={styles.findCard} role="radiogroup" aria-label="What did you find?">
              <h3>What did you find?</h3>
              {findings.map((f) => (
                <button key={f.id} type="button" role="radio" aria-checked={finding === f.id}
                  className={`${styles.findOpt} ${finding === f.id ? styles.findOptOn : ""}`} onClick={() => pickFinding(f.id)}>
                  <span className={styles.radio}>{finding === f.id && <Check size={12} />}</span>{f.label}
                </button>
              ))}
              <p>This is what you see on your phone. It isn’t a carrier-verified record.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CARRIER */}
      <section id="carrier" className={styles.tint}>
        <div className={styles.wrap}>
          <Eyebrow n="2">Who originally sold the phone?</Eyebrow>
          <h2>Choose the carrier that originally locked your phone.</h2>
          <p className={styles.lead}>We’ll show that carrier’s published policy and link you to its official unlock page. This is guidance only, not an eligibility check.</p>
          <div className={styles.carrierGrid}>
            <div className={styles.carrierList} role="radiogroup" aria-label="Carrier">
              {carriers.map((c) => (
                <button key={c.id} type="button" role="radio" aria-checked={carrierId === c.id}
                  className={`${styles.carrierOpt} ${carrierId === c.id ? styles.carrierOptOn : ""}`} onClick={() => setCarrierId(c.id)}>
                  <span><b>{c.name}</b><small>{c.type}</small></span>
                  <span className={styles.radio}>{carrierId === c.id && <Check size={12} />}</span>
                </button>
              ))}
            </div>

            <div className={styles.carrierCard}>
              <div className={styles.carrierBanner} style={{ backgroundImage: `linear-gradient(90deg, rgba(36,6,48,.55), rgba(36,6,48,.15)), url("${img(12)}")` }}>
                <small>{carrier.type === "Consumer" ? "Consumer" : carrier.type}</small>
                <h3>{carrier.name}</h3>
              </div>
              <div className={styles.carrierBody}>
                <h4>What {carrier.short} publishes</h4>
                <ul>
                  {carrier.bullets.map((b) => (<li key={b}><CheckCircle2 size={17} />{b}</li>))}
                </ul>
                <div className={styles.noteAmber}><AlertTriangle size={15} /> {carrier.warning}</div>
                <dl className={styles.meta}>
                  <div><dt>Source</dt><dd>{carrier.source}</dd></div>
                  <div><dt>Last verified</dt><dd>{carrier.verified}</dd></div>
                  <div><dt>Content owner</dt><dd>{carrier.owner}</dd></div>
                  <div><dt>Status</dt><dd><span className={styles.statusTag}>{carrier.status}</span></dd></div>
                </dl>
                {carrier.url.startsWith("http") ? (
                  <a href={carrier.url} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                    View {carrier.short} unlock instructions <ExternalLink size={15} />
                  </a>
                ) : (
                  <a href={carrier.url} className={styles.btnPrimary}>Ask our team for help <ArrowRight size={15} /></a>
                )}
                <p className={styles.fine}>Your carrier makes the final decision. Zoiko can’t see or change your carrier account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ISSUES */}
      <section id="issues" className={styles.white}>
        <div className={styles.wrap}>
          <Eyebrow n="3">Common issues</Eyebrow>
          <h2>Sorting out the tricky bits.</h2>
          <div className={styles.issueGrid}>
            {issues.map((c) => {
              const open = openIssue === c.id;
              return (
                <article key={c.id} className={styles.issueCard}>
                  <img src={c.image} alt="" />
                  <div className={styles.issueBody}>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    {open && <p className={styles.issueTodo}>{c.todo}</p>}
                    <button type="button" aria-expanded={open} onClick={() => setOpenIssue(open ? null : c.id)}>
                      {open ? "Hide" : "What to do"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section id="status" className={styles.tint}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowPlain}>What happens next</span>
          <h2>Your status, and the right next step.</h2>
          <p className={styles.lead}>Unlocked doesn’t automatically mean your phone works with Zoiko. A compatibility check is always the next step.</p>
          <div className={styles.statusGrid}>
            {statuses.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={s.id} className={`${styles.statusCard} ${finding === s.id ? styles.statusOn : ""}`}>
                  <div className={styles.statusHead}>
                    <span className={`${styles.statusIcon} ${styles["tone_" + s.tone]}`}><Icon size={18} /></span>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.text}</p>
                  <div className={styles.statusFoot}>
                    <span>Ready to activate?</span>
                    <b className={styles["chip_" + s.readyTone]}>{s.ready}</b>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HELP */}
      <section id="help" className={styles.white}>
        <div className={`${styles.wrap} ${styles.helpGrid}`}>
          <div>
            <Eyebrow n="4">Get help</Eyebrow>
            <h2>Next steps and support.</h2>
            <div className={styles.nextList}>
              {nextSteps.map((n) => (
                <div key={n.title} className={styles.nextCard}>
                  <img src={n.image} alt="" />
                  <div>
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                    <Link href={n.href} className={styles.linkPinkSm} {...(n.href.startsWith("http") ? { target: "_blank" } : {})}>{n.link} <ArrowRight size={13} /></Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.separate}>
              <h3>Keep these separate</h3>
              <ul>
                {keepSeparate.map(([k, v]) => (<li key={k}><Info size={14} /><span><b>{k}</b> {v}</span></li>))}
              </ul>
            </div>
          </div>

          <div className={styles.askCard}>
            <img src={img(15)} alt="Zoiko support team" />
            <form className={styles.askBody} onSubmit={submit} noValidate>
              <h3>Ask our team for help</h3>
              {sent ? (
                <div className={styles.sentBox} role="status">
                  <CheckCircle2 size={22} />
                  <b>Request sent.</b>
                  <p>Thanks. Our team will reply to {form.email}. Never share your account password or PIN.</p>
                </div>
              ) : (
                <>
                  <div className={styles.notePink}><Lock size={15} /> Tell us the issue, not your account password or PIN.</div>
                  <div className={styles.row2}>
                    <label>Phone type
                      <select value={form.phoneType} onChange={(e) => setF("phoneType", e.target.value)}>
                        <option value="">Choose</option><option>iPhone</option><option>Android</option><option>Other / not sure</option>
                      </select>
                      {errors.phoneType && <span className={styles.err}>{errors.phoneType}</span>}
                    </label>
                    <label>Original carrier
                      <select value={form.carrier} onChange={(e) => setF("carrier", e.target.value)}>
                        <option value="">Choose</option>
                        {carriers.map((c) => <option key={c.id}>{c.name}</option>)}
                      </select>
                      {errors.carrier && <span className={styles.err}>{errors.carrier}</span>}
                    </label>
                  </div>
                  <label>What do you need help with?
                    <select value={form.topic} onChange={(e) => setF("topic", e.target.value)}>
                      <option value="">Choose a topic</option>
                      {topics.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    {errors.topic && <span className={styles.err}>{errors.topic}</span>}
                  </label>
                  <label>Describe the issue
                    <textarea rows={4} maxLength={600} value={form.message} onChange={(e) => setF("message", e.target.value)} />
                    <small className={styles.count}>{form.message.length} / 600 characters</small>
                    {errors.message && <span className={styles.err}>{errors.message}</span>}
                  </label>
                  <div className={styles.row2}>
                    <label>Name
                      <input type="text" autoComplete="name" value={form.name} onChange={(e) => setF("name", e.target.value)} />
                      {errors.name && <span className={styles.err}>{errors.name}</span>}
                    </label>
                    <label>Mobile number
                      <input type="tel" autoComplete="tel" inputMode="numeric" value={form.phone} onChange={(e) => setF("phone", e.target.value)} />
                      {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                    </label>
                  </div>
                  <label>Email
                    <input type="email" value={form.email} onChange={(e) => setF("email", e.target.value)} />
                    {errors.email && <span className={styles.err}>{errors.email}</span>}
                  </label>
                  <label className={styles.consent}>
                    <input type="checkbox" checked={form.consent} onChange={(e) => setF("consent", e.target.checked)} />
                    <span>I agree Zoiko can use these details to respond to this request, as described in the <Link href="/privacy-policy">Privacy Policy</Link>.</span>
                  </label>
                  {errors.consent && <span className={styles.err}>{errors.consent}</span>}
                  {sendError && <p className={styles.sendErr} role="alert">{sendError}</p>}
                  <button type="submit" className={styles.btnPrimary} disabled={sending}>{sending ? "Sending…" : "Send my request"}</button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.tint}>
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <div>
            <span className={styles.eyebrowPlain}>FAQs</span>
            <h2>Unlocking questions, answered.</h2>
            <div className={styles.policyCard}>
              <img src={img(3)} alt="Support agents helping customers" />
              <div>
                <h3>About these policies</h3>
                <p>Carrier facts on this page reflect each carrier’s public policy as reviewed on November 6, 2026. They aren’t a live eligibility check. Always confirm with your carrier.</p>
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

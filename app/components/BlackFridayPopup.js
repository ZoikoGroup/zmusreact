"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./BlackFridayPopup.module.css";

// Black Friday 2026 goes live Friday Nov 27 (local time)
const DEADLINE = new Date("2026-11-27T00:00:00").getTime();
const OFFER_END = new Date("2026-12-01T00:00:00").getTime();
const STORAGE_KEY = "bfPopupDismissed2026";

const COLORS = ["#ffd400", "#ff6fae", "#ffffff", "#d58bff", "#df1e5a"];
const CONFETTI = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47) % 100,
  color: COLORS[i % COLORS.length],
  size: 5 + (i % 3) * 2,
  dur: 5 + (i % 6),
  delay: -((i * 7) % 10),
}));

function getTimeLeft() {
  const diff = Math.max(0, DEADLINE - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hrs: Math.floor((diff / 3600000) % 24),
    min: Math.floor((diff / 60000) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
}

export default function BlackFridayPopup() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (Date.now() > OFFER_END) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch (e) {}
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearInterval(id);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
  }

  if (!open) return null;

  const live = time && DEADLINE <= Date.now();
  const units = time
    ? [
        ["Days", time.days],
        ["Hrs", time.hrs],
        ["Min", time.min],
        ["Sec", time.sec],
      ]
    : [];

  return (
    <div className={styles.overlay} onClick={close} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Black Friday Sale 2026"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.blast} aria-hidden="true">
          <div className={styles.sparks} />
          {CONFETTI.map((c, i) => (
            <i
              key={i}
              className={styles.confetti}
              style={{
                left: `${c.left}%`,
                background: c.color,
                width: c.size,
                height: c.size * 1.6,
                animationDuration: `${c.dur}s`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>

        <button className={styles.close} onClick={close} aria-label="Close popup">
          ×
        </button>

        <div className={styles.imageSide}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroImg}
            src="/img/black-friday/image%20(39).png"
            alt="Family enjoying Black Friday deals"
          />
        </div>

        <div className={styles.content}>
          <span className={styles.badge}>⚡ BLACK FRIDAY SALE 2026</span>
          <h2 className={styles.title}>
            Stay connected <span>to what you love.</span>
          </h2>

          <div className={styles.offerBox}>
            <div className={styles.percent}>
              40%<small>OFF</small>
            </div>
            <div className={styles.offerText}>
              <strong>
                selected plans for your <em>first 3 months</em>
              </strong>
              <span>Qualifying new lines · SIM &amp; eSIM</span>
            </div>
          </div>

          {!live ? (
            <>
              <div className={styles.liveLabel}>DEALS GO LIVE IN</div>
              <div className={styles.timer}>
                {units.map(([label, val]) => (
                  <div key={label} className={styles.unit}>
                    <b key={val} className={styles.tick}>
                      {String(val).padStart(2, "0")}
                    </b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.liveLabel}>DEALS ARE LIVE NOW!</div>
          )}

          <Link href="/black-friday" className={styles.cta} onClick={close}>
            See Black Friday deals →
          </Link>

          <p className={styles.fine}>
            Qualifying new lines only. Offer runs 27–30 Nov 2026. Standard monthly price
            applies after the first three months.
          </p>
        </div>
      </div>
    </div>
  );
}

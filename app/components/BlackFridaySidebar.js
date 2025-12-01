"use client";

import { useState } from "react";

const BlackFridaySidebar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      {/* Sticky Tab */}
      <div className="bftouch-tab">
        <button
          className="close-btn"
          onClick={() => setVisible(false)}
          aria-label="Close Black Friday Tab"
        >
          ✕
        </button>

        <span className="tab-text">
          <a href="/black-friday-mobile-sim-deals-2025">Black Friday Sale</a>
        </span>
      </div>

      <style>{`
     
/* Sticky vertical tab */
.bftouch-tab {
  position: fixed;
  left: 0;
  top: 40%;
  background: #DF1E5A;
  padding: 15px 7px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  border-radius: 8px 0px 0px 8px;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  position: fixed;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.bftouch-tab a {
  color: #fff;
  text-decoration: none;
}

/* Close Button - Top Right */
.close-btn {
  background: transparent;
    color: white;
    border: none;
    font-size: 1vw;
    cursor: pointer;
    padding: 0;
    transform: rotate(180deg);
}

/* Hover effect */
.bftouch-tab:hover {
  background: #cd1650;
}
  @media (max-width: 991.98px) {
  .close-btn {
 
    font-size: 2vw;
}
  }
      `}</style>
    </>
  );
};

export default BlackFridaySidebar;

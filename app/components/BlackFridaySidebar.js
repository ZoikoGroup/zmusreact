"use client";

const BlackFridaySidebar = () => {


  return (
    <>
      {/* Sticky Tab */}
      <div
  className="bftouch-tab">
  <span>
    <a href="/black-friday-mobile-sim-deals-2025" className="vertical-badge">
    Black Friday Sale
</a>
  </span>
</div>

      <style>{`
     
/* Sticky vertical tab */
.bftouch-tab a {color:white;}
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
    transform: rotate(360deg);
    border-radius: 0px 8px 8px 0px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: opacity 0.35s 
ease, transform 0.35s 
ease;
}

/* Hover effect */
.bftouch-tab:hover {
  background: #cd1650ff;
}

      `}</style>

      
    </>
  );
};

export default BlackFridaySidebar;

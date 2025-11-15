"use client";
import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

const GetInTouchSidebar = () => {
  const [show, setShow] = useState(false);
// const openChat = () => {
//     if (window.Tawk_API) {
//       window.Tawk_API.maximize(); // Opens chat box
//     } else {
//       alert("Chat is loading... please try again in a moment!");
//     }
//   };

const openChat = () => {
  if (window.Tawk_API) {
    window.Tawk_API.showWidget(); // show widget
    window.Tawk_API.maximize();   // open chat box
  } else {
    alert("Chat is loading... please try again in a moment!");
  }
};
  return (
    <>
      {/* Sticky Tab */}
      <div
  className={`getintouch-tab ${show ? "hide-tab" : "show-tab"}`}
  onClick={() => setShow(true)}
>
  <span>
    Get in touch 
    <span className="arrow-icon">
  <svg
    width="20"
    height="20"
    viewBox="5 0 20 20"
    fill="none"
    stroke="#fff"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6 L15 12 L9 18" />
  </svg>
</span>
  </span>
</div>

      <style>{`
/* Sticky vertical tab */

.getintouch-tab {
    position: fixed;
    right: 0;
    top: 40%;
    background: #DF1E5A;
    padding: 15px 7px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
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
.getintouch-tab:hover {
  background: #cd1650ff;
}

/* Arrow icon */
.arrow-icon {
  font-size: 14px;
  margin-top: 6px;
  opacity: 0.9;
}

/* When sidebar opens → hide */
.hide-tab {
  opacity: 0;
  pointer-events: none;
  transform: translateX(40px) rotate(180deg);
}

/* When sidebar closes → show */
.show-tab {
  opacity: 1;
  transform: translateX(0) rotate(180deg);
}

/* Sidebar width */
.getintouch-sidebar {
  width: 30vw !important;
}

/* Links */
.getintouch-sidebar a {
  color: #000;
  text-decoration: underline;
}
.getintouch-sidebar a:hover {
  text-decoration: none;
}
  .chatNowBtn{
    background-color:#DF1E5A;
    border:none;
        width: 9vw !important;
    height: 3vw;
  }

      `}</style>

      {/* Sidebar */}
      <Offcanvas
        placement="end"
        show={show}
        onHide={() => setShow(false)}
        className="getintouch-sidebar"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Get in touch</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <h5>Live chat</h5>
          <p>Click below to speak to a specialist on live chat.</p>
          <p><strong>We're open 8am to 10pm, 7 days a week.</strong></p>
          <Button variant="danger" onClick={openChat} className="chatNowBtn w-100 mb-4">Chat now</Button>

          <hr />

          <h5>Call us</h5>
          <h3 className="fw-bold">800 988 8116</h3>
          <p><strong>Monday to Friday:</strong> 8am to 10pm</p>
          <p><strong>Saturday and Sunday:</strong> 8am to 8pm</p>

          <hr />

          <h5>Information</h5>
          <ul className="list-unstyled">
            <li><a href="#">Returns policy</a></li>
            <li><a href="#">Help and support</a></li>
            <li><a href="https://mvnoc.ai/coverage-map">Coverage checker</a></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default GetInTouchSidebar;

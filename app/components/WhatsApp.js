import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export default function WhatsAppFloating() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
      }}
    >
      {/* Close (X) Button */}
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "10px",
          cursor: "pointer",
        }}
      >
        <FaTimes size={10} />
      </button>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/15127434894"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "60px",
          height: "60px",
          background: "#25D366",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
          color: "#fff",
          fontSize: "28px",
        }}
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

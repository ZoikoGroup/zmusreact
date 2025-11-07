"use client";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

/**
 * CustomLanguageSwitcher Component
 * Single toggle button for Google Translate
 */
const CustomLanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es",
            autoDisplay: false,
          },
          "google_translate_element_hidden"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = initGoogleTranslate;
    } else if (window.google && window.google.translate) {
      initGoogleTranslate();
    }

    const checkCurrentLanguage = () => {
      const cookies = document.cookie.split(";");
      const googleTransCookie = cookies.find((c) =>
        c.trim().startsWith("googtrans=")
      );
      if (googleTransCookie) {
        const lang = googleTransCookie.split("/")[2];
        setCurrentLang(lang || "en");
      }
    };

    checkCurrentLanguage();
    const interval = setInterval(checkCurrentLanguage, 1000);

    return () => {
      clearInterval(interval);
      delete window.googleTranslateElementInit;
    };
  }, []);

  const changeLanguage = (lang) => {
    const selectElement = document.querySelector(".goog-te-combo");
    if (selectElement) {
      selectElement.value = lang;
      selectElement.dispatchEvent(new Event("change"));
      setCurrentLang(lang);
    }
  };

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "es" : "en";
    changeLanguage(newLang);
  };

  return (
    <>
      <div id="google_translate_element_hidden" style={{ display: "none" }}></div>

      {/* Toggle Button (not translated by Google) */}
      <Button
        variant="link"
        className="notranslate text-decoration-none text-dark p-0"
        onClick={toggleLanguage}
      >
        <i className="bi bi-globe me-1 notranslate"></i>
        <span className="notranslate">
          {currentLang === "en" ? "Español" : "English"}
        </span>
      </Button>
    </>
  );
};

export default CustomLanguageSwitcher;

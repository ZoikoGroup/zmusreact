"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";


const videos = [
  {
    id: "uIdD8aVArU0",
    thumb: "https://assets.zoikomobile.com/wp-content/uploads/2024/08/maxresdefault.jpg",
    title: "Wake Up",
  },
  {
    id: "m-hQw7Bhhys",
    thumb: "https://assets.zoikomobile.com/wp-content/uploads/2024/08/maxresdefault-1.jpg",
    title: "Playful Chimp",
  },
  {
    id: "zWabBqkMVhc",
    thumb: "https://assets.zoikomobile.com/wp-content/uploads/2024/08/maxresdefault-2.jpg",
    title: "Cute Kittens",
  },
  {
    id: "e5I-LvVP0W0",
    thumb: "https://assets.zoikomobile.com/wp-content/uploads/2024/08/maxresdefault-3.jpg",
    title: "Play Time",
  },
  {
    id: "eELa9KLGuMo",
    thumb: "https://assets.zoikomobile.com/wp-content/uploads/2024/08/maxresdefault-4.jpg",
    title: "Adorable Pals",
  },
];
export default function FreeInternationalMinutes() {
  // === SLIDER 1 STATES ===
  const [activeIndex1, setActiveIndex1] = useState(0);
  const autoplayRef1 = useRef(null);
  const touchStartX1 = useRef(null);
  const AUTOPLAY_INTERVAL = 10000;

  // === SLIDER 2 STATES ===
  const [activeIndex2, setActiveIndex2] = useState(0);
  const autoplayRef2 = useRef(null);

  // === VIDEO MODAL STATES ===
  const [showModal, setShowModal] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // helper functions
  const prevIndex = (i) => (i - 1 + videos.length) % videos.length;
  const nextIndex = (i) => (i + 1) % videos.length;

  const goPrev1 = () => setActiveIndex1((i) => prevIndex(i));
  const goNext1 = () => setActiveIndex1((i) => nextIndex(i));
  const goNext2 = () => setActiveIndex2((i) => nextIndex(i));

  // autoplay for slider 1
  const startAutoplay1 = () => {
    clearInterval(autoplayRef1.current);
    autoplayRef1.current = setInterval(() => {
      setActiveIndex1((i) => nextIndex(i));
    }, AUTOPLAY_INTERVAL);
  };
  useEffect(() => {
    startAutoplay1();
    return () => clearInterval(autoplayRef1.current);
  }, []);

  // autoplay for slider 2
  useEffect(() => {
    clearInterval(autoplayRef2.current);
    autoplayRef2.current = setInterval(() => {
      setActiveIndex2((i) => nextIndex(i));
    }, 6000);
    return () => clearInterval(autoplayRef2.current);
  }, []);

  // swipe for slider 1
  const handleTouchStart1 = (e) => (touchStartX1.current = e.touches[0].clientX);
  const handleTouchEnd1 = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX1.current;
    if (Math.abs(diff) > 50) diff > 0 ? goPrev1() : goNext1();
  };

  // video modal
  const openVideo = (id) => {
    clearInterval(autoplayRef1.current);
    clearInterval(autoplayRef2.current);
    setPlayingVideoId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setPlayingVideoId(null), 300);
    startAutoplay1();
  };

  const embedUrl = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

  const leftIdx = prevIndex(activeIndex1);
  const rightIdx = nextIndex(activeIndex1);
return (
    <>
      <Header />
      <HeadBar text="Feel Rhythms Like Animal Beats - Drop Your Own Tunes!" />

      {/* Hero Banner */}
      <div className="animal-banner">
        <Container className="text-center py-5">
          <h1 className="banner-title">Sync your love for animals</h1>
          <h2 className="banner-subtitle">
            Love the tempo on all the right notes
          </h2>
          <p className="banner-desc">
            Explore the Unique Bond Between Animals and Music
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <Button variant="danger" size="lg">
              Switch to Save
            </Button>
            <Button variant="outline-danger" size="lg">
              View All Plans
            </Button>
          </div>
        </Container>
      </div>

      {/* SLIDER 1 */}
      <Container className="text-center my-5">
        <h2 className="fw-bold text-danger mb-3">
          Watch Pawsitively Cute Fun In Action Videos!
        </h2>
        <p className="text-muted fs-5 animalslider1">
          Watch heartwarming videos of animals doing what they do best — being
          cute, playful, and full of life.
        </p>

        <div
          className="carousel-wrapper position-relative mx-auto"
          style={{ height: 400, maxWidth: 1200, overflow: "visible" }}
          onTouchStart={handleTouchStart1}
          onTouchEnd={handleTouchEnd1}
        >
          {videos.map((v, i) => {
            let position = "hidden";
            if (i === activeIndex1) position = "center";
            else if (i === leftIdx) position = "left";
            else if (i === rightIdx) position = "right";

            const scale =
              position === "center" ? 1 : position === "hidden" ? 0.6 : 0.8;
            const translateX =
              position === "center"
                ? "0%"
                : position === "left"
                ? "-120%"
                : position === "right"
                ? "120%"
                : "0%";
            const zIndex =
              position === "center" ? 3 : position === "hidden" ? 0 : 1;
            const opacity =
              position === "center" ? 1 : position === "hidden" ? 0 : 0.8;

            return (
              <div
                key={v.id}
                className="video-slide position-absolute top-50 start-50"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                  transition: "transform 0.8s ease, opacity 0.8s ease",
                  opacity,
                  zIndex,
                  cursor: "pointer",
                }}
                onClick={() =>
                  position === "center"
                    ? openVideo(v.id)
                    : setActiveIndex1(i)
                }
              >
                <div
                  className="video-thumb position-relative"
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow:
                      position === "center"
                        ? "0 15px 40px rgba(0,0,0,0.4)"
                        : "0 6px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src={v.thumb}
                    alt={v.title}
                    style={{
                      width: position === "center" ? 720 : 360,
                      height: position === "center" ? 360 : 220,
                      objectFit: "cover",
                      display: "block",
                      transition: "all 0.6s ease",
                    }}
                  />
                  <div
                    className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                    style={{
                      width: position === "center" ? 80 : 56,
                      height: position === "center" ? 80 : 56,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.5)",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <svg
                      width={position === "center" ? 36 : 24}
                      height={position === "center" ? 36 : 24}
                      viewBox="0 0 24 24"
                      fill="#fff"
                    >
                      <path d="M5 3v18l15-9L5 3z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-white small fw-semibold">{v.title}</p>
              </div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="mt-4 d-flex justify-content-center gap-2">
          {videos.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex1(i)}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: i === activeIndex1 ? "#dc3545" : "#bbb",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </Container>

      {/* Modal Video Player */}
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Body style={{ padding: 0 }}>
          {playingVideoId ? (
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                title="YouTube Player"
                src={embedUrl(playingVideoId)}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          ) : (
            <div
              style={{
                height: 360,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Loading...
            </div>
          )}
        </Modal.Body>
        <div className="d-flex justify-content-end p-2">
          <Button variant="secondary" size="sm" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>

      {/* === SLIDER 2 === */}
      <Container className="my-5 py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold text-danger mb-3">
              Feel The Catchiest <br /> Tunes Of The Kindest Acts!
            </h2>
            <p className="text-muted fs-5">
              Do you love Blippi videos, Paw shows, or the musical TV series
              Daniel Tiger? See how they groove, act on tunes, and dance on
              songs. Discover floor filler beats & pet-specific hits. Pick your
              favorite grooving playlist, and we'll play it for you. Join our
              animal and music-loving network in USA.
            </p>
            <Button variant="danger" size="lg" className="mt-3">
              Explore Our Plans →
            </Button>
          </div>

          <div className="col-md-6 text-center">
            <div
              className="position-relative mb-3 mx-auto"
              style={{
                maxWidth: 550,
                height: 310,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                transition: "all 0.5s ease",
              }}
            >
              <img
                src={videos[activeIndex2].thumb}
                alt={videos[activeIndex2].title}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />

              <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                  width: 70,
                  height: 70,
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => openVideo(videos[activeIndex2].id)}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="red">
                  <path d="M5 3v18l15-9-15-9z" />
                </svg>
              </div>
            </div>

            {/* Thumbnails */}
            <div
              className="d-flex justify-content-center gap-2 flex-wrap"
              style={{
                maxWidth: 550,
                margin: "0 auto",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {videos.map((v, i) => (
                <div
                  key={v.id}
                  onClick={() => setActiveIndex2(i)}
                  style={{
                    border:
                      activeIndex2 === i
                        ? "3px solid #dc3545"
                        : "2px solid transparent",
                    borderRadius: 8,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={v.thumb}
                    alt={v.title}
                    width={100}
                    height={60}
                    style={{
                      objectFit: "cover",
                      filter:
                        activeIndex2 === i
                          ? "brightness(1)"
                          : "brightness(0.8)",
                      transform:
                        activeIndex2 === i ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.4s ease",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="d-flex justify-content-center mt-3">
              {videos.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex2(i)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background:
                      activeIndex2 === i ? "#dc3545" : "#bbb",
                    margin: "0 5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

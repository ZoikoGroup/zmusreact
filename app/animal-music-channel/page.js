"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import React, { useEffect, useRef, useState } from "react";
import { Row,Col, Button, Modal, Container, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-bootstrap";
import { ChevronLeft, ChevronRight, PlayCircle } from "react-bootstrap-icons";
import { FaPlay } from "react-icons/fa";
const videos5 = [
  {
    id: 1,
    link: "https://www.youtube.com/watch?v=XFb2yagnO8A",
    thumbnail: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Group-1928.webp",
  },
  {
    id: 2,
    link: "https://www.youtube.com/watch?v=uIdD8aVArU0",
    thumbnail: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-787.webp",
  },
  {
    id: 3,
    link: "https://www.youtube.com/watch?v=m-hQw7Bhhys",
    thumbnail: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-788.webp",
  },
];
const artists = [
  {
    name: "Peter Graham",
    image: "../img/peter-graham.jpg",
    link: "https://open.spotify.com/artist/0z6S9Vu5DzgaYlPfa4t9lv",
  },
  {
    name: "Doug Carroll",
    image: "../img/Doug-Carroll.jpg" ,
    link: "https://open.spotify.com/artist/6zqgWTRnDo30IxlYwVHXLH",
  },
  {
    name: "Jean C. Roche",
    image: "../img/jean-roche.jpg",
    link: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2yDqgc",
  },
  {
    name: "Hayley Hoffman",
    image: "../img/hayley-hoffman.jpg",
    link: "https://open.spotify.com/artist/5edS4vot8PGTaYuXuUIW4J",
  },
  {
    name: "Sound Effects Library",
    image: "../img/sound-library.jpg",
    link: "https://open.spotify.com/artist/6BzziB95IQ1jfkr7GHCfl3",
  },
  {
    name: "Dog Barking",
    image: "../img/dog-barking.jpg",
    link: "https://open.spotify.com/playlist/7q1Lweg17hXbvsMOGQ3xFw",
  },
];

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

// const videos2 = [
//   {
//     id: "hkBhJxZupeE",
//     thumb: "../img/Rectangle-747.webp",
//     title: "Wake Up",
//   },
//   {
//     id: "e_BYraHQmns",
//     thumb: "../img/maxresdefault-5.jpg",
//     title: "Playful Chimp",
//   },
//   {
//     id: "RZ_0ImDYrPY",
//     thumb: "../img/maxresdefault-6.jpg",
//     title: "Cute Kittens",
//   },
 
// ];
const videos3 = [
  {
    img: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Group-1144.webp",
    url: "https://www.youtube.com/embed/1Up_eIQejKU?autoplay=1&modestbranding=1&rel=0&showinfo=0",
  },
  {
    img: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-754.webp",
    url: "https://www.youtube.com/embed/jXHOHOYkbYc?autoplay=1&modestbranding=1&rel=0&showinfo=0",
  },
  {
    img: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-755.webp",
    url: "https://www.youtube.com/embed/qacnieKsz8k?autoplay=1&modestbranding=1&rel=0&showinfo=0",
  },
  {
    img: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-758-1.webp",
    url: "https://www.youtube.com/embed/UoOXLQYNsoQ?autoplay=1&modestbranding=1&rel=0&showinfo=0",
  },
  {
    img: "https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-756-1.webp",
    url: "https://www.youtube.com/embed/1GQWnKALmJI?autoplay=1&modestbranding=1&rel=0&showinfo=0",
  },
];

const tracks = [
    "https://open.spotify.com/embed/track/3OiNjtE8luK6VFyDg6Vlba?utm_source=generator",
    "https://open.spotify.com/embed/track/6Wr7v5hKgjrbfYvciKJR5K?utm_source=generator",
    "https://open.spotify.com/embed/track/49fOxBc8o4a9cNwvglo1zN?utm_source=generator",
    "https://open.spotify.com/embed/track/74GeIYnKynMtgqOV1BzjfL?utm_source=generator",
    "https://open.spotify.com/embed/track/4EA5ge8hgE6OySXrVqrjxn?utm_source=generator",
    "https://open.spotify.com/embed/track/6QvzZe7cI3MShQDorCavxA?utm_source=generator",
    "https://open.spotify.com/embed/track/5YNK1Gb5PyCe33pvDGuEyH?utm_source=generator",
  ];
export default function FreeInternationalMinutes() {

    const [startIndex5, setStartIndex5] = useState(0);

  const total = videos5.length;

  const nextSlide = () => {
    setStartIndex5((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setStartIndex5((prev) => (prev - 1 + total) % total);
  };

  const openModal = (link) => {
    setActiveVideo(link);
    setShowModal(true);
  };



  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(videos5[(startIndex5 + i) % total]);
    }
    return visible;
  };





  // === SLIDER 1 STATES ===
  const [activeIndex1, setActiveIndex1] = useState(0);
  const autoplayRef1 = useRef(null);
  const touchStartX1 = useRef(null);
  const AUTOPLAY_INTERVAL = 10000;

  // === SLIDER 2 STATES ===
  // const [activeIndex2, setActiveIndex2] = useState(0);
  const autoplayRef2 = useRef(null);
const [activeVideo, setActiveVideo] = useState(null);

  const handlePlay = (index) => {
    setActiveVideo(index);
  };
  // === VIDEO MODAL STATES ===
  const [showModal, setShowModal] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // helper functions
  const prevIndex = (i) => (i - 1 + videos.length) % videos.length;
  const nextIndex = (i) => (i + 1) % videos.length;

  const goPrev1 = () => setActiveIndex1((i) => prevIndex(i));
  const goNext1 = () => setActiveIndex1((i) => nextIndex(i));
  // const goNext2 = () => setActiveIndex2((i) => nextIndex(i));

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

  // === SLIDER 3 STATES ===
const [currentIndex, setCurrentIndex] = useState(0);
const [visibleItems, setVisibleItems] = useState(8); // default
const totalSlides = tracks.length;

// Detect window width on client side
useEffect(() => {
  const updateVisibleItems = () => {
    const width = window.innerWidth;
    if (width < 768) setVisibleItems(1);
    else if (width < 992) setVisibleItems(2);
    else setVisibleItems(4);
  };

  updateVisibleItems();
  window.addEventListener("resize", updateVisibleItems);

  return () => window.removeEventListener("resize", updateVisibleItems);
}, []);

// Autoplay logic (slower: 5000ms)
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, 1005000);
  return () => clearInterval(interval);
}, [totalSlides]);

// Navigate by clicking dots
const goToSlide = (i) => setCurrentIndex(i);
  

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

      {/* === SLIDER 2 === 
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
            <Button variant="danger" href="/all-plans" size="lg" className="mt-3">
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
                src={videos2[activeIndex2].thumb}
                alt={videos2[activeIndex2].title}
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
                onClick={() => openVideo(videos2[activeIndex2].id)}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="red">
                  <path d="M5 3v18l15-9-15-9z" />
                </svg>
              </div>
            </div>

            <div
              className="d-flex justify-content-center gap-2 flex-wrap"
              style={{
                maxWidth: 550,
                margin: "0 auto",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {videos2.map((v, i) => (
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

            
            <div className="d-flex justify-content-center mt-3">
              {videos2.map((_, i) => (
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
      </Container>*/}
      
       <Container className="py-5 text-center">
      {/* Top Row */}
      <Row className="align-items-center">
        <Col md={4} className="mb-4 mb-md-0">
          <div className="video-box" onClick={() => handlePlay(0)}>
            {activeVideo === 0 ? (
              <iframe
                src={videos3[0].url}
                title="video-1"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img src={videos3[0].img} alt="Video thumbnail" />
                <div className="overlay always">
                  <button className="play-btn">
                    <FaPlay />
                  </button>
                </div>
              </>
            )}
          </div>
        </Col>

        <Col md={4} className="text-center mb-4 mb-md-0">
          <h3 className="fw-bold text-danger">
            Let’s Have Gifts <br /> That Deeply Change Us!
          </h3>
          <p className="mt-3">
            Animals snuggling is really special! <br />
            Watch as these charming duos create unforgettable memories together.
            You might feel happy & lucky to connect to a larger audience on our
            channel.
          </p>
        </Col>

        <Col md={4}>
          <div className="video-box" onClick={() => handlePlay(1)}>
            {activeVideo === 1 ? (
              <iframe
                src={videos3[1].url}
                title="video-2"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img src={videos3[1].img} alt="Video thumbnail" />
                <div className="overlay always">
                  <button className="play-btn">
                    <FaPlay />
                  </button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

      {/* Bottom Row */}
      <Row className="mt-4">
        {videos3.slice(2).map((vid, index) => (
          <Col md={4} className="mb-3 mb-md-0" key={index + 2}>
            <div className="video-box" onClick={() => handlePlay(index + 2)}>
              {activeVideo === index + 2 ? (
                <iframe
                  src={vid.url}
                  title={`video-${index + 3}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img src={vid.img} alt="Video thumbnail" />
                  <div className="overlay always">
                    <button className="play-btn">
                      <FaPlay />
                    </button>
                  </div>
                </>
              )}
            </div>
          </Col>
        ))}
      </Row>

      {/* Inline CSS */}
      <style jsx>{`
        .video-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
        }
        .video-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .video-box:hover img {
          transform: scale(1.03);
        }
        .overlay.always {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.25);
        }
        .play-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: none;
          background: #ffffff1f; /* Bootstrap red */
          color: white;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, background 0.3s ease;
        }
        .play-btn:hover {
        //   background: #b02a37;
          transform: scale(1.1);
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
        }
      `}</style>
    </Container>
        {/* slider 3 */}
     <Container fluid className="py-5">
          <h2 className="fw-bold text-danger text-center mb-4">
            Turn up your love for animals!
          </h2>
          <p className="text-center">Explore our rhythmic cues that pull your heartstrings, on our best-ever animal and music loving network in USA pulls a biggest collection of awesome animals and their kingdoms with songs and music videos featuring fun acts. See funky twirling dogs pounce to rhythms, chimpanzees grinning on camera, penguin party, an orangutan driving a golf buggy, or purring sounds on a cat playing the piano, these amazing videos will surely make you sail into perfect bliss.</p>
          <div className="spotify-slider-container position-relative overflow-hidden">
            <div
              className="spotify-slider-track d-flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                transition: "transform 0.6s ease",
                width: `${100}%`,
              }}
            >
              {tracks.concat(tracks).map((track, index) => (
                <div
                  key={index}
                  className="spotify-slide p-2"
                //   style={{ flex: `0 0 ${25}%` }}
                >
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={track}
                    width="100%"
                    height="260"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
              ))}
            </div>
            <div className="spotify-dots text-center mt-3">
  {tracks.map((_, i) => (
    <span
      key={i}
      className={`spotify-dot ${i === currentIndex ? "active" : ""}`}
      onClick={() => goToSlide(i)}
    ></span>
  ))}
</div>
          </div>
        </Container>


        {/* END slider 3 */}
 <Container className="text-center my-5">
      <h3 className="fw-bold mb-4">Popular Artists</h3>
      <Row className="justify-content-center">
        {artists.map((artist, index) => (
          <Col
            key={index}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="d-flex flex-column align-items-center mb-4"
          >
            <a
              href={artist.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="rounded-circle mb-3"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <h6 className="text-dark">{artist.name}</h6>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
    <div className="animal-love-section d-flex align-items-center justify-content-center py-5 px-3">
      <div className="container text-center text-md-start d-flex flex-column flex-md-row align-items-center">
        <img
          src="https://assets.zoikomobile.com/wp-content/uploads/2024/08/Rectangle-784.png" // <-- Replace with your correct path
          alt="Half Star"
          className="half-star mb-3 mb-md-0 me-md-3"
        />
        <div>
          <h2 className="fw-bold text-danger mb-3">
            Turn Up Your Love For Animals!
          </h2>
          <p className="text-dark fs-5">
            Let's have gifts that deeply change us. These musical video
            collections are perhaps a paradise of animal love, adventure, or
            melodious wonder; these will inspire you to live in a fantasy world.
            Now stream tracks, choose albums, propagation-themed playlists, and
            affectionate tunes of the animal kingdom.
          </p>
        </div>
      </div>
    </div>




    <Container className="py-4 position-relative text-center">
      <Button
        variant="light"
        className="position-absolute top-50 start-0 translate-middle-y shadow"
        onClick={prevSlide}
        style={{ zIndex: 2, borderRadius: "50%" }}
      >
        <ChevronLeft size={24} />
      </Button>

      <Row className="justify-content-center">
        {getVisibleSlides().map((video) => (
          <Col key={video.id} md={4} sm={6} xs={12} className="mb-3">
            <div
              className="position-relative rounded overflow-hidden shadow"
              style={{ cursor: "pointer" }}
              onClick={() => openModal(video.link)}
            >
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className="w-100"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <PlayCircle
                size={50}
                className="position-absolute top-50 start-50 translate-middle text-white"
              />
            </div>
          </Col>
        ))}
      </Row>

      <Button
        variant="light"
        className="position-absolute top-50 end-0 translate-middle-y shadow"
        onClick={nextSlide}
        style={{ zIndex: 2, borderRadius: "50%" }}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Modal for YouTube Video */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Body className="p-0 bg-dark">
          {activeVideo && (
            <div className="ratio ratio-16x9">
              <iframe
                src={activeVideo.replace("watch?v=", "embed/")}
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>

    <div
        style={{
          backgroundImage:
            "url('https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-641.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#000",
          padding: "80px 0",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h4 className="fw-bold text-danger">
                A Journey Of <br /> Compassion To The Voiceless
              </h4>
              <p className="mt-3">
                Our charitable donation will surely unite compassion and
                contribute to better animal welfare standards. We volunteer in a
                cause to stretch out our helping hands for shelterless strays,
                traumatic medical care, and much-needed love to innocent and
                loving animals.
              </p>
              <div className="mt-4">
                <Button
                  variant="danger"
                  className="me-3 px-4"
                  style={{ borderRadius: "8px" }}
                >
                  Partner With Us
                </Button>
                <Button
                  variant="outline-danger"
                  className="px-4"
                  style={{ borderRadius: "8px" }}
                >
                  Know More
                </Button>
              </div>
            </Col>
            <Col md={6}></Col>
          </Row>
        </Container>
      </div>

      {/* ====== Section 2 ====== */}
      <div
        style={{
          backgroundImage:
            "url('https://assets.zoikomobile.com/wp-content/uploads/2025/02/Rectangle-1228.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#000",
          padding: "80px 0",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}></Col>
            <Col md={6}>
              <h4 className="fw-bold text-danger">
                Mission To Save More Four-Legged
              </h4>
              <p className="mt-3">
                Your animal advocacy and our inherent acts are grounded in the
                belief in the sanctity of animal life, that sentient brings
                innate worth to the sanctity of animal life.
              </p>
              <p>
                Our proponent donations as a purring gratitude to
                foster-based feline friendships kept in pride, we contribute to
                animals rescued from cruelty and neglect. We wish to become part
                of a loving community. Plus, as a thank you, we invite you and
                your dedicated team members to enjoy 20% off on USA SIM
                purchases — in our intentional acts, we believe in rewarding
                kindness!
              </p>
              <div className="mt-4">
                <Button
                  variant="danger"
                  className="me-3 px-4"
                  style={{ borderRadius: "8px" }}
                >
                  Buy USA SIM plans today!
                </Button>
                <Button
                  variant="outline-danger"
                  className="px-4"
                  style={{ borderRadius: "8px" }}
                >
                  Know More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <section className="chat-section py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} md={12} className="text-center text-lg-start mb-4 mb-lg-0">
            <img
              src="https://assets.zoikomobile.com/wp-content/uploads/2024/08/Rectangle-799.png"
              alt="Chat Bubble"
              className="img-fluid mb-4"
            />
            <h1 className="fw-bold text-danger mb-3">Let's have a chat</h1>
            <p className="text-muted">
              Welcome to our happiest animal and music loving network in USA,
              which endures animal love, swaps up in hilarious pet fails, and
              animals hop on their feet with toe-tapping tunes! Share your deep
              experience, emotional videos, and stories, alongside, connect with
              fellow animal and music lovers, and unleash the fun! Our community
              is so warm and friendly, you'll think you’ve slipped into a giant
              furry hug!
            </p>
            <p className="text-muted">
              Join a pet-friendly wireless provider today! Grab your smartphone,
              capture your goofy pets or pet’s quirks, and let’s put your high
              fives, and more. Don’t be a wallflower—jump in a party - are you
              with us?
            </p>
            <Button variant="danger" className="rounded-pill px-4 py-2 fw-semibold">
              Share your story
            </Button>
          </Col>

          {/* Right Chat Image */}
          <Col lg={6} md={12} className="text-center">
            <img
              src="https://assets.zoikomobile.com/wp-content/uploads/2024/08/Group-1231.png"
              alt="Chat Mockup"
              className="img-fluid rounded shadow"
              
            />
            <p className="mt-3 text-danger fw-semibold">
              Login/Register to start sending messages
            </p>
          </Col>
        </Row>
      </Container>
    </section>
    <Container fluid className="bglite">
        <Container className="p-5">
            <h2 className="text-center text-red">Frequently Asked Questions</h2>
            <Row>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>What is the Zoiko Mobile Animal & Music Hub?</AccordionHeader>
                            <AccordionBody>
                                <p>The <strong>Zoiko Mobile Animal &amp; Music Hub</strong> is a one-of-a-kind digital space where <strong>animal lovers and music fans unite!</strong> Watch adorable animal videos, groove to pet-friendly beats, and connect with a fun-loving community that shares your passion.</p>
                                <p>
                                    <img draggable="false" width="10px" role="img" className="emoji" alt="🐶" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f436.svg" />
                                    <img draggable="false" width="10px" role="img" className="emoji" alt="🎶" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f3b6.svg" />
                                    <strong> Cute animals + great music = pure happiness!</strong>
                                </p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>What kind of videos can I watch?</AccordionHeader>
                            <AccordionBody>
                                <p>
                                    Expect pawsitively heartwarming content! Watch:
                                    <br />
                                    <img width="10px" draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/16.0.1/svg/2705.svg" /> Funky twirling dogs pouncing to beats
                                    <br />
                                    <img  width="10px" draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/16.0.1/svg/2705.svg" /> Penguins partying in the snow
                                    <br />
                                    <img width="10px" draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/16.0.1/svg/2705.svg" /> A chimpanzee grinning for the camera
                                    <br />
                                    <img width="10px" draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/16.0.1/svg/2705.svg" /> An orangutan driving a golf buggy (yes, really!)
                                    <br />
                                    <img width="10px" draggable="false" role="img" className="emoji" alt="✅" src="https://s.w.org/images/core/emoji/16.0.1/svg/2705.svg" /> A cat playing the piano (purrfection!)
                                </p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Can I share my own animal videos?</AccordionHeader>
                            <AccordionBody>
                                <p>Absolutely! We’d love to see your furry, feathered, or scaly friends in action. Share your pet’s quirky moves, funny fails, or musical talents with the community.</p>
                                <p>
                                    <img width="10px" draggable="false" role="img" className="emoji" alt="📸" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f4f8.svg" />
                                    <img width="10px"draggable="false" role="img" className="emoji" alt="🐕" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f415.svg" />
                                    <strong>Tag us and get featured!</strong>
                                </p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>Is there a specific playlist for pets?</AccordionHeader>
                            <AccordionBody><p>Yes! We’ve curated special <strong>pet-friendly playlists</strong> with calming tunes, upbeat dance tracks, and even songs <strong>scientifically proven</strong> to make your pets happy.</p><p><img draggable="false" width="10px" role="img" className="emoji" alt="🎵" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f3b5.svg" /><img draggable="false" width="10px" role="img" className="emoji" alt="🐾" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f43e.svg" /> <strong>Pick your pet’s favorite beats and watch them groove!</strong></p></AccordionBody>
                        </AccordionItem>
                        
                    </Accordion>
                </Col>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="0">
                            <AccordionHeader>Do you support animal charities?</AccordionHeader>
                            <AccordionBody>
                              <p>Yes! We believe in <strong>giving back to our four-legged friends</strong>. Through donations and volunteering, we help:<br /><img width="10px" draggable="false" role="img" className="emoji" alt="❤️" src="https://s.w.org/images/core/emoji/16.0.1/svg/2764.svg" /> Shelterless animals find homes<br /><img draggable="false" width="10px" role="img" className="emoji" alt="❤️" src="https://s.w.org/images/core/emoji/16.0.1/svg/2764.svg" /> Provide <strong>trauma care</strong> for rescued animals<br /><img draggable="false" role="img" width="10px" className="emoji" alt="❤️" src="https://s.w.org/images/core/emoji/16.0.1/svg/2764.svg" /> Support <strong>foster-based feline friendships</strong><br /><br /><img draggable="false" width="10px" role="img" className="emoji" alt="🐶" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f436.svg" /><img width="10px" draggable="false" role="img" className="emoji" alt="🐱" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f431.svg" /> <strong>Join us in making a difference!</strong></p>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="1">
                            <AccordionHeader>How can I get involved in animal advocacy?</AccordionHeader>
                            <AccordionBody><p>We welcome all animal lovers to <strong>be part of the movement!</strong> Whether it’s adopting, fostering, donating, or simply sharing awareness, every small act makes a big impact.</p><p><img width="10px" draggable="false" role="img" className="emoji" alt="🐾" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f43e.svg"/> <strong>Together, we can create a kinder world for animals.</strong></p></AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="2">
                            <AccordionHeader>Does Zoiko Mobile offer any pet-friendly perks?</AccordionHeader>
                            <AccordionBody><p>Yes! As a thank-you for your love and compassion toward animals, we offer <strong>20% off on USA SIM purchases</strong> for animal advocates and rescue teams.</p><p><img draggable="false" role="img" className="emoji" alt="📱" width="10px" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f4f1.svg" /><img draggable="false" role="img"  width="10px"className="emoji" alt="🐾" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f43e.svg" /> <strong>Stay connected while staying kind!</strong></p></AccordionBody>
                        </AccordionItem>
                        <AccordionItem eventKey="3">
                            <AccordionHeader>How do I join this amazing community?</AccordionHeader>
                            <AccordionBody><p>It’s easy! Just grab your smartphone, record your pet’s <strong>funniest, cutest, or most musical moments</strong>, and <strong>join the party!</strong></p><p><img draggable="false" role="img" className="emoji" alt="📲"width="10px" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f4f2.svg" /> <strong>Follow us, share your love, and let’s make the world a </strong></p>
                            </AccordionBody>
                        </AccordionItem>
                        
                    </Accordion>
                </Col>
                
            </Row>
            <Row>
                <Col>
                    <Accordion>
                        <AccordionItem eventKey="4">
                            <AccordionHeader>What makes Zoiko Mobile the “Animal & Music Loving Network”?</AccordionHeader>
                            <AccordionBody>
                              <p>
                                <img width="10px" draggable="false" role="img" className="emoji" alt="🐾" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f43e.svg" /> We <strong>celebrate the unbreakable bond between animals and music.</strong>
                              </p>
                              <p>
                                <img width="10px" draggable="false" role="img" className="emoji" alt="🎶" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f3b6.svg" /> We offer <strong>curated playlists for pets and their humans.</strong>
                              </p>
                              <p>
                                <img width="10px" draggable="false" role="img" className="emoji" alt="📱" src="https://s.w.org/images/core/emoji/16.0.1/svg/1f4f1.svg" /> We provide a <strong>warm, welcoming community</strong> for animal lovers.
                              </p>
                              <p>
                                <img width="10px" draggable="false" role="img" className="emoji" alt="❤️" src="https://s.w.org/images/core/emoji/16.0.1/svg/2764.svg" /> We <strong>support animal welfare</strong> through donations and volunteering.
                              </p>
                            </AccordionBody>
                        </AccordionItem>
                        
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </Container>
      <Footer />
    </>
  );
}

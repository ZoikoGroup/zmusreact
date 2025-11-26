"use client";

import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import { Button, Col, Container, Row, Card, Accordion, Modal } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const [mainImage, setMainImage] = useState(null);

  // existing info modal (technical specs / perks / included / faqs)
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });

  // Lightbox modal (Option A)
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // for hover zoom transform origin
  const mainImgContainerRef = useRef(null);

  /* ----------------------------------------
        FETCH PRODUCT BY SLUG
  ----------------------------------------- */
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetch(`https://zmapi.zoikomobile.co.uk/api/v1/products/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.product) {
          const p = data.product;
          setProduct(p);

          const firstImage = resolveImageUrl(p.image_url);
          setMainImage(firstImage);
        } else {
          setProduct(null);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ----------------------------------------
        FETCH RELATED PRODUCTS
  ----------------------------------------- */
  useEffect(() => {
    if (!product?.related_products?.length) return;

    setRelatedLoading(true);

    const fetchRelated = async () => {
      try {
        const fetches = product.related_products.map((id) =>
          fetch(`https://zmapi.zoikomobile.co.uk/api/v1/product/get/${id}`)
            .then((res) => res.json())
            .then((data) => data.product || null)
            .catch(() => null)
        );

        const related = (await Promise.all(fetches)).filter(Boolean);
        setRelatedProducts(related);
      } catch (error) {
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelated();
  }, [product]);

  /* ----------------------------------------
        GO TO CHECKOUT
  ----------------------------------------- */
  const handleGoToCheckout = () => {
    if (!product) return;

    const v = product.variants?.[0] || {};
    const price = parseFloat(v.starting_price || 0);

    if (!selectedColor || !selectedStorage || !selectedCondition) {
      alert("Please select Color, Storage and Condition.");
      return;
    }

    const cartItem = {
      type: "device",
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: mainImage,
      color: selectedColor,
      storage: selectedStorage,
      condition: selectedCondition,
      qty: 1,
      planId: product.id,
      planSlug: product.slug,
      planTitle: product.name,
      planPrice: price,
      lineType: "device",
      simType: "N/A",
      formData: { priceQty: 1, price },
    };

    const existing = JSON.parse(localStorage.getItem("cart") || "[]");
    existing.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existing));

    router.push("/checkout");
  };

  if (loading) return <div className="text-center p-5">Loading product...</div>;
  if (!product) return <div className="text-center p-5">Product not found</div>;

  const variant = product.variants?.[0] || {};
  const imagesRaw = product.images?.length ? product.images : [product.image_url];

  // Build gallery array of full URLs and ensure uniqueness (main first)
  const galleryImages = (() => {
    const primary = resolveImageUrl(product.image_url);
    const others = (imagesRaw || [])
      .map((img) => resolveImageUrl(img))
      .filter((u) => u && u !== primary);

    // unique
    return [primary, ...Array.from(new Set(others))];
  })();

  /* ----------------------------------------
        MODAL HANDLER (existing info modal)
  ----------------------------------------- */
  const handleOpenModal = (title, type) => {
    let body = null;

    if (type === "technical_specs") {
      body = product.technical_specs.map((spec, i) => (
        <div className="product-html-wrapper" key={i} dangerouslySetInnerHTML={{ __html: spec.value }} />
      ));
    } else if (type === "perks") {
      body = product.perks.map((perk, i) => (
        <div className="product-html-wrapper" key={i} dangerouslySetInnerHTML={{ __html: perk.description }} />
      ));
    } else if (type === "included") {
      body = product.whats_included.map((inc, i) => (
        <div className="product-html-wrapper" key={i} dangerouslySetInnerHTML={{ __html: inc.item }} />
      ));
    } else if (type === "faqs") {
      body = (
        <Accordion alwaysOpen>
          {product.faqs.map((faq, i) => (
            <Accordion.Item eventKey={i.toString()} key={i}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      );
    }

    setModalContent({ title, body });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  /* ----------------------------------------
        LIGHTBOX HANDLERS (simple modal)
  ----------------------------------------- */
  const openLightboxAt = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => setShowLightbox(false);

  const lightboxPrev = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const lightboxNext = () => setLightboxIndex((i) => (i + 1) % galleryImages.length);

  // when clicking a thumbnail, also set main image
  const handleThumbnailClick = (url, index) => {
    setMainImage(url);
  };

  // sync mainImage -> lightbox index when opening from main image
  const openLightboxFromMain = () => {
    const idx = galleryImages.indexOf(mainImage);
    openLightboxAt(idx >= 0 ? idx : 0);
  };

  /* ----------------------------------------
        Hover zoom (update transform-origin based on cursor)
  ----------------------------------------- */
  const handleMainMouseMove = (e) => {
    // only for desktop pointer
    const el = mainImgContainerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    el.style.setProperty("--tx", `${px}%`);
    el.style.setProperty("--ty", `${py}%`);
  };

  const handleMainMouseLeave = () => {
    const el = mainImgContainerRef.current;
    if (!el) return;
    // reset origin to center
    el.style.setProperty("--tx", `50%`);
    el.style.setProperty("--ty", `50%`);
  };

  return (
    <>
      <Header />

      <HeadBar text={<>Discover Premium Quality Refurbished Smartphones @ Zoiko Mobile</>} />

      <Container fluid className="bglite">
        <Container className="py-4">
          <Row>
            {/* LEFT: vertical thumbnails (on md+ screens) */}
            <Col md={1} sm={12} className="p-2 d-none d-md-block">
              <div className="thumbs-vertical">
                {galleryImages.map((imgUrl, i) => (
                  <div
                    key={i}
                    className={`thumb-item ${mainImage === imgUrl ? "active" : ""}`}
                    onClick={() => handleThumbnailClick(imgUrl, i)}
                    title={`View ${i + 1}`}
                  >
                    <img src={imgUrl} alt={`thumb-${i}`} />
                  </div>
                ))}
              </div>
            </Col>

            {/* MAIN IMAGE + MOBILE THUMBNAILS */}
            <Col md={5} sm={12} className="p-4 text-center">
              {/* Main image container with hover zoom */}
              <div
                className="product-main-frame zoomable"
                ref={mainImgContainerRef}
                onMouseMove={handleMainMouseMove}
                onMouseLeave={handleMainMouseLeave}
                onClick={openLightboxFromMain} // open lightbox on click
                role="button"
                aria-label="Open image viewer"
              >
                <img src={mainImage} alt={product.name} className="main-img" />
                {/* zoom hint for desktop */}
                <div className="zoom-hint">Click to enlarge</div>
              </div>

              {/* Mobile / small screens: horizontal thumbnails under image */}
              <div className="d-md-none mt-3 d-flex justify-content-center flex-wrap">
                {galleryImages.map((imgUrl, i) => (
                  <div
                    key={i}
                    className={`product-thumb-frame mobile-thumb ${mainImage === imgUrl ? "active" : ""}`}
                    onClick={() => handleThumbnailClick(imgUrl, i)}
                    style={{
                      border: mainImage === imgUrl ? "3px solid #000" : "1px solid #ccc",
                    }}
                  >
                    <img src={imgUrl} alt={`mobile-thumb-${i}`} />
                  </div>
                ))}
              </div>
            </Col>

            {/* PRODUCT DETAILS */}
            <Col md={6} sm={12} className="p-4">
              <h2 className="green24bold">{product.name}</h2>
              {product.model_number && (
                <p>Model Number: {product.model_number}</p>
              )}

              {product.network && (
                <p>Network: {product.network}</p>
              )}

              <div className="midbigred">${variant.starting_price || "0.00"}</div>
              <hr />

              {/* COLORS */}
              <h4 className="pt-3">Color</h4>
              <div>
                {(variant.colors || []).map((color, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      display: "inline-block",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: color,
                      border: selectedColor === color ? "3px solid #000" : "2px solid #ccc",
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  ></span>
                ))}
              </div>

              {/* STORAGE */}
              <h4 className="pt-3">Storage</h4>
              <div className="pb-3">
                {(variant.storages || []).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedStorage(s)}
                    className={`btn me-2 mb-2 ${
                      selectedStorage === s ? "btn-danger" : "btn-outline-secondary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* CONDITION */}
              <h4 className="pt-3">Condition</h4>
              <div className="pb-4">
                {(variant.device_conditions || []).map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCondition(c)}
                    className={`btn me-2 mb-2 ${
                      selectedCondition === c ? "btn-danger" : "btn-outline-secondary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <Button variant="danger" size="lg" onClick={handleGoToCheckout}>
                Go To Checkout
              </Button>

              {/* ACCORDION */}
              <div className="mt-4">
                <Accordion alwaysOpen>
                  {product.technical_specs?.length > 0 && (
                    <Accordion.Item eventKey="0">
                      <Accordion.Header onClick={() => handleOpenModal("Technical Specifications", "technical_specs")}>
                        Technical Specifications
                      </Accordion.Header>
                    </Accordion.Item>
                  )}
                  {product.perks?.length > 0 && (
                    <Accordion.Item eventKey="1">
                      <Accordion.Header onClick={() => handleOpenModal("Perks & Benefits Included", "perks")}>
                        Perks & Benefits Included
                      </Accordion.Header>
                    </Accordion.Item>
                  )}
                  {product.faqs?.length > 0 && (
                    <Accordion.Item eventKey="3">
                      <Accordion.Header onClick={() => handleOpenModal("Frequently Asked Questions", "faqs")}>
                        Frequently Asked Questions
                      </Accordion.Header>
                    </Accordion.Item>
                  )}
                  {product.whats_included?.length > 0 && (
                    <Accordion.Item eventKey="2">
                      <Accordion.Header onClick={() => handleOpenModal("What is Included?", "included")}>
                        What is Included?
                      </Accordion.Header>
                    </Accordion.Item>
                  )}
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>

        {/* RELATED PRODUCTS */}
        <Container className="p-5">
          <h3 className="green24bold">You may also like</h3>
          {relatedLoading ? (
            <div>Loading suggestions...</div>
          ) : relatedProducts.length > 0 ? (
            <Row>
              {relatedProducts.map((p) => {
                const v = p.variants?.[0] || {};
                const img = resolveImageUrl(p.image_url);
                return (
                  <Col md={4} className="mb-4" key={p.id}>
                    <Card className="p-3 h-100 shadow-sm">
                      <div
                        onClick={() => router.push(`/products/${p.slug}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="related-product-frame">
                          <img src={img} alt={p.name} />
                        </div>

                        <h5 className="mt-3">{p.name}</h5>
                      </div>
                      <Row className="mt-2">
                        <Col md={6}>
                          <div className="text-muted small">Starting From:</div>
                          <div className="txtred fw-bold">${v.starting_price}</div>
                        </Col>
                        <Col md={6}>
                          <div className="text-muted small">Condition:</div>
                          <div>{(v.device_conditions || []).join(", ")}</div>
                        </Col>
                      </Row>
                      <div className="mt-2">
                        {(v.colors || []).map((color, ci) => (
                          <span
                            key={ci}
                            style={{
                              display: "inline-block",
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: color,
                              marginRight: 6,
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-3">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => router.push(`/products/${p.slug}`)}
                        >
                          View details
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => router.push(`/products/${p.slug}`)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div>No related products found.</div>
          )}
        </Container>
      </Container>

      {/* Info Modal (technical specs / perks / included / faqs) */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Lightbox Modal (Option A - minimal) */}
      <Modal show={showLightbox} onHide={closeLightbox} size="lg" centered dialogClassName="lightbox-modal">
        <Modal.Body className="lightbox-body p-0">
          <div className="lightbox-inner">
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
            <button className="lightbox-prev" onClick={lightboxPrev} aria-label="Previous">‹</button>

            <div className="lightbox-image-wrap">
              <img src={galleryImages[lightboxIndex]} alt={`big-${lightboxIndex}`} />
            </div>

            <button className="lightbox-next" onClick={lightboxNext} aria-label="Next">›</button>

            <div className="lightbox-thumbs">
              {galleryImages.map((u, i) => (
                <div key={i} className={`lb-thumb ${i === lightboxIndex ? "active" : ""}`} onClick={() => setLightboxIndex(i)}>
                  <img src={u} alt={`lb-thumb-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Footer />

      
    </>
  );
}

/* --------------------------
   Helper: resolve image urls
   -------------------------- */
function resolveImageUrl(img) {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  // if already a full path /storage/...
  if (img.startsWith("/")) {
    // assume same storage host
    return `https://zmapi.zoikomobile.co.uk${img}`;
  }
  // default: storage path
  return `https://zmapi.zoikomobile.co.uk/storage/${img}`;
}

"use client";

import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
          setProduct(data.product);
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
    if (!product?.product_category_id) return;

    setRelatedLoading(true);
    fetch(
      `https://zmapi.zoikomobile.co.uk/api/v1/products/category/1`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = data?.products?.products || [];
        const filtered = list.filter((p) => p.id !== product.id);
        setRelatedProducts(list);
      })
      .catch(() => setRelatedProducts([]))
      .finally(() => setRelatedLoading(false));
  }, [product]);

  /* ----------------------------------------
        ADD TO CART + CHECKOUT
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
      type:"device",
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: `https://zmapi.zoikomobile.co.uk/storage/${product.image_url}`,
      color: selectedColor,
      storage: selectedStorage,
      condition: selectedCondition,
      qty: 1,
      deviceSlug: product.slug,
      deviceTitle: product.name,
      devicePrice: price,
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

  return (
    <>
      <Header />
      <HeadBar text={<>Discover Premium Quality Refurbished Smartphones @ Zoiko Mobile</>} />

      <Container fluid className="bglite">
        <Container className="py-4">
          <Row>
            {/* IMAGE SECTION */}
            <Col md={6} sm={12} className="p-4 text-center">
              <img
                src={`https://zmapi.zoikomobile.co.uk/storage/${product.image_url}`}
                alt={product.name}
                style={{ width: "70%", objectFit: "contain" }}
              />
            </Col>

            {/* PRODUCT DETAILS */}
            <Col md={6} sm={12} className="p-4">
              <h2 className="green24bold">{product.name}</h2>
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
            </Col>
          </Row>
        </Container>

        {/* RELATED PRODUCTS */}
        <Container className="p-5">
          <h3 className="green24bold">You may also like</h3>

          {relatedLoading ? (
            <div>Loading suggestions...</div>
          ) : (
            <Row>
              {relatedProducts.map((p) => {
                const v = p.variants?.[0] || {};

                return (
                  <Col md={4} className="mb-4" key={p.id}>
                    <Card className="p-3 h-100 shadow-sm">
                      <div onClick={() => router.push(`/products/${p.slug}`)} style={{ cursor: "pointer" }}>
                        <img
                          src={`https://zmapi.zoikomobile.co.uk/storage/${p.image_url}`}
                          alt={p.name}
                          className="img-fluid"
                          style={{ height: 180, width: "100%", objectFit: "cover" }}
                        />

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

                      {/* COLOR CIRCLES */}
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
                          ></span>
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
          )}
        </Container>
      </Container>

      <Footer />
    </>
  );
}

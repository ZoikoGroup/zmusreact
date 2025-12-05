"use client";
import React, { useState, useEffect } from "react";
import { Button, Image, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { openPlanPurchaseModal } from "./Header"; // ✅ Import modal trigger

export default function CarouselSimPlan() {
  const [plans, setPlans] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchPlans() {
      try {
        let res = await fetch(`${API_BASE_URL}/api/v1/plans`);
        let data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setPlans(data.data);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    }
    fetchPlans();
  }, [API_BASE_URL]);

  if (!plans) return <div>Loading...</div>;

  const planTypes = [
    { type: "prepaid-plans", title: "Prepaid Plans", href: "/prepaid-plans" },
    { type: "postpaid-plans", title: "Postpaid Plans", href: "/postpaid-plans" },
    { type: "business-plans", title: "Business Plans", href: "/business-deals" },
    { type: "travel-plans", title: "Travel Plans", href: "/travel-plans" },
  ];

  return (
    <>
    <style>
      {`
        .blackFridayCarouselPlanTab ul li a.nav-link.active{
          background-color:#ffffff00;
          color:#df1e5a !important;
          border:none !important;
        }
          .blackFridayCarouselPlanTab ul li a.nav-link{
          color:#54575a !important;
          border:none !important;
        }
      .blackFridayCarouselPlanContent{
          border-top: 4px solid red;
          border-radius: 2vw;
          box-shadow: -1px 0px 14px 2px rgb(29 27 27 / 42%);
          // margin-bottom:2vw;
      }
      .blackFridayCarouselPlanContent .text-center{
          padding: 2vw;
          }
          .blackFridayCarouselPlanTab {
              max-width: 50vw;
              
          }
          // .blackFridayCarouselPlanTab li .active  {
          //     border-top: 3px solid #ee1717ff !important;
          //     border-top-right-radius: 2vw;
          //     border-top-left-radius: 2vw;
          // }
          // .blackFridayCarouselPlanTab li {
          //     border-top: 3px solid #baaaaa !important;
          //     border-top-right-radius: 2vw;
          //     border-top-left-radius: 2vw;
          // }
          // .blackFridayCarouselPlanTab li:has(> a.active){
          // border-top: 3px solid #ee1717ff !important;
          // }
          .blackFridayCarouselPlanTab ul{
              margin-bottom: 1vw !important;
                  border-bottom: none !important;
              
              }
      `}
    </style>
      <Container className=" blackFridayCarouselPlanTab">
        
        <ul
          className="nav nav-tabs gap-3 nav-justified tabhead p-1"
          role="tablist"
        >
          {planTypes.map((p, idx) => (
            <li className="nav-item" role="presentation" key={p.type}>
              <Link
                className={`nav-link ${idx === 0 ? "active" : ""}`}
                id={`tab-${idx}`}
                data-bs-toggle="tab"
                href={`#${p.type}`}
                role="tab"
                aria-controls={`tabpanel-${idx}`}
                aria-selected={idx === 0 ? "true" : "false"}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="px-4 blackFridayCarouselPlanContent">
        <div className="text-center">
         <h2 className="fw-bold mb-3">
        Freedom to Connect, Your Way
      </h2>

      <p className="fs-5 text-muted m-0">
        Stay in control with flexible, no-contract prepaid plans<br />
        designed for your lifestyle.
      </p>
      </div>
        <div className="tab-content blackFridayCarouselPlans">
          {planTypes.map((p, idx) => (
            <div
              id={p.type}
              className={`tab-pane fade ${idx === 0 ? "show active" : ""}`}
              key={p.type}
            >
              <Row>
                {plans
                  .filter((plan) => plan.plan_type === p.type)
                  .slice(0, 3)
                  .map((item) => (
                    <Col md={4} sm={12} xs={12} key={item.id}>
                      <div className="card p-2">
                        <Image
                          src={`${API_BASE_URL}/storage/${item.featured_image}`}
                          fluid
                          alt={item.title}
                        />
                        <div className="card-header">{item.title}</div>
                        <div className="card-body">
                          <Row>
                            <Col>
                              <div className="data">{item.sub_title}</div>
                            </Col>
                            <Col>
                              <p style={{ textAlign: "right" }}>
                                <span className="curprice">
                                  ${item.price}
                                </span>
                                <br />
                                /{item.duration_type}/line
                              </p>
                            </Col>
                          </Row>
                          <hr className="separator" />
                          <ul className="check-bullet">
                            {item.features.slice(0, 6).map((ftrs, index) => (
                              <li key={index}>
                                {index === 1 ? "Unlimited Talk & Text" : ftrs.text}
                              </li>
                            ))}
                            <li>Discounted Device Protection</li>
                          </ul>
                          <hr className="separator" />
                          <div className="gap-3 d-flex justify-content-center">
                            <Button variant="outline-danger" href={`/plans/${item.slug}`}>
                              View plan
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() =>
                                openPlanPurchaseModal(
                                  item.title,
                                  item.slug,
                                  item.id,
                                  item.price,
                                  item.duration_type,
                                  item.bq_id,
                                  item.plan_type
                                )
                              }
                            >
                              Buy this plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
              <div className="text-center py-4">
                <Button variant="outline-danger" size="lg" href={p.href}>
                  View All Plans <i className="bi bi-arrow-right"></i>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
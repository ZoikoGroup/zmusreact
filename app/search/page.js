"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Alert, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function searchPage(){

  return (
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />

      <Footer />
    </>
  );
};


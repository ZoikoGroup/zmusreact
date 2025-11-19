"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Button, Alert, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import CarouselPlans from "../components/BlackFridayCarouselPlans";
import Testimonials from "../components/Testimonials";
export default function blackFridaySpecialPage(){
const [formData, setFormData] = useState({
firstName: "",
lastName: "",
email: "",
company: "",
phone: "",
message: "",
});


const [errors, setErrors] = useState({});
const [submitted, setSubmitted] = useState(false);


const validate = () => {
let newErrors = {};


if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
if (!formData.email?.trim()) newErrors.email = "Email is required";
else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) 
  newErrors.email = "Invalid email format";

if (!formData.company?.trim()) newErrors.company = "Company is required";
if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";

return newErrors;
};


const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) => {
e.preventDefault();
const validationErrors = validate();
setErrors(validationErrors);


if (Object.keys(validationErrors).length === 0) {
try {
  // alert('ok');
const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/black-friday-form", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});


if (response.ok) {
setSubmitted(true);
setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", message: "" });
}
} catch (error) {
console.error("Form submission error:", error);
}
}
};
// Set your target date here
  const targetDate = new Date("December 1, 2025 23:59:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Header />
      <HeadBar text="Join Buster and flock together with your buddies!" />

      <Footer />
    </>
  );
};


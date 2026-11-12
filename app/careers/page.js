import Header from "../components/Header";
import Footer from "../components/Footer";
import CareersClient from "./CareersClient";

export const metadata = {
  metadataBase: new URL("https://zoikomobile.com"),
  title: "Careers at Zoiko Mobile | Join Our Growing Team",
  description:
    "Join Zoiko Mobile's team and grow your career. We're hiring across engineering, customer experience, business and community. Apply now to make an impact.",
  alternates: {
    canonical: "https://zoikomobile.com/careers",
  },
  openGraph: {
    title: "Careers at Zoiko Mobile | Join Our Growing Team",
    description:
      "Join Zoiko Mobile's team and grow your career. We're hiring across engineering, customer experience, business and community. Apply now to make an impact.",
    url: "https://zoikomobile.com/careers",
    images: ["/img/carrers/hero-customer-exp.png"],
  },
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <CareersClient />
      </main>
      <Footer />
    </>
  );
}

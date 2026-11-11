import Header from "../components/Header";
import Footer from "../components/Footer";
import GetInvolvedClient from "./GetInvolvedClient";

export const metadata = {
  title: "Get Involved – Zoiko Community | Support Animals & Music",
  description:
    "Help animals, support local music and creators, and connect with people who care. Explore opportunities, partner with Zoiko, and see our community impact.",
  alternates: {
    canonical: "https://zoikomobile.com/get-involved",
  },
  openGraph: {
    title: "Get Involved – Zoiko Community | Support Animals & Music",
    description:
      "Help animals, support local music and creators, and connect with people who care. Explore opportunities, partner with Zoiko, and see our community impact.",
    url: "https://zoikomobile.com/get-involved",
    images: ["/img/get-involved/hero-animals.png"],
  },
};

export default function GetInvolvedPage() {
  return (
    <>
      <Header />
      <main>
        <GetInvolvedClient />
      </main>
      <Footer />
    </>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckCompatibilityClient from "./CheckCompatibilityClient";

export const metadata = {
  title: "Check Compatibility – Will Your Phone Work With Zoiko? | Zoiko Mobile",
  description:
    "Enter your device's IMEI to review network, SIM or eSIM, lock status, and device compatibility before choosing a Zoiko Mobile plan.",
  alternates: {
    canonical: "https://zoikomobile.com/check-compatibility",
  },
  openGraph: {
    title:
      "Check Compatibility – Will Your Phone Work With Zoiko? | Zoiko Mobile",
    description:
      "Enter your device's IMEI to review network, SIM or eSIM, lock status, and device compatibility before choosing a Zoiko Mobile plan.",
    url: "https://zoikomobile.com/check-compatibility",
    images: ["/img/Check-Compatibility/cc1.png"],
  },
};

export default function CheckCompatibilityPage() {
  return (
    <>
      <Header />
      <main>
        <CheckCompatibilityClient />
      </main>
      <Footer />
    </>
  );
}

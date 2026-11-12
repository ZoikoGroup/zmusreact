import Header from "../components/Header";
import Footer from "../components/Footer";
import WirelessPlansClient from "./WirelessPlansClient";

export const metadata = {
  title: "All Wireless Plans | Zoiko Mobile",
  description:
    "Personal, Lite / Core / Max, business and travel plans in one place. Compare clearly, check coverage and keep your number.",
  alternates: { canonical: "https://zoikomobile.com/wireless-plans" },
  openGraph: {
    title: "All Wireless Plans | Zoiko Mobile",
    description:
      "Find the plan that fits your life. Compare Zoiko plans, check coverage and keep your number.",
    url: "https://zoikomobile.com/wireless-plans",
    images: ["/img/wireless-plans/image (32).png"],
  },
};

export default function WirelessPlansPage() {
  return (
    <>
      <Header />
      <main>
        <WirelessPlansClient />
      </main>
      <Footer />
    </>
  );
}

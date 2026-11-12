import Header from "../components/Header";
import Footer from "../components/Footer";
import TradeInOptionsClient from "./TradeInOptionsClient";

export const metadata = {
  title: "Trade-In Options – Give Your Old Phone a Next Chapter | Zoiko Mobile",
  description:
    "Explore trade-in possibilities as you shop for your next phone. Learn how estimates, inspection, and credit options work at Zoiko Mobile.",
  alternates: {
    canonical: "https://zoikomobile.com/trade-in-options",
  },
  openGraph: {
    title:
      "Trade-In Options – Give Your Old Phone a Next Chapter | Zoiko Mobile",
    description:
      "Explore trade-in possibilities as you shop for your next phone. Learn how estimates, inspection, and credit options work at Zoiko Mobile.",
    url: "https://zoikomobile.com/trade-in-options",
    images: ["/img/Trade-In-Options/tio1.png"],
  },
};

export default function TradeInOptionsPage() {
  return (
    <>
      <Header />
      <main>
        <TradeInOptionsClient />
      </main>
      <Footer />
    </>
  );
}

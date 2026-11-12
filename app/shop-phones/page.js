import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopPhonesClient from "./ShopPhonesClient";

export const metadata = {
  title: "Shop Phones – Great Phones, Ready for Zoiko Mobile | Zoiko Mobile",
  description:
    "Shop new and pre-owned phones from Apple, Samsung, Google, Motorola, and NUU. Pair with a plan, keep your number, and see your full price before you pay.",
  alternates: {
    canonical: "https://zoikomobile.com/shop-phones",
  },
  openGraph: {
    title: "Shop Phones – Great Phones, Ready for Zoiko Mobile | Zoiko Mobile",
    description:
      "Shop new and pre-owned phones from Apple, Samsung, Google, Motorola, and NUU.",
    url: "https://zoikomobile.com/shop-phones",
    images: ["/img/Shop-Phones/usp1.png"],
  },
};

export default function ShopPhonesPage() {
  return (
    <>
      <Header />
      <main>
        <ShopPhonesClient />
      </main>
      <Footer />
    </>
  );
}

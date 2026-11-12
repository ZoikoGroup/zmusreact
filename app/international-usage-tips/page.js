import Header from "../components/Header";
import Footer from "../components/Footer";
import InternationalUsageTipsClient from "./InternationalUsageTipsClient";

export const metadata = {
  title: "International Usage Tips – Travel Smarter & Stay Prepared | Zoiko Mobile",
  description:
    "Prepare your phone, understand potential roaming and calling charges, and get help while traveling abroad with Zoiko Mobile.",
  alternates: {
    canonical: "https://zoikomobile.com/international-usage-tips",
  },
  openGraph: {
    title:
      "International Usage Tips – Travel Smarter & Stay Prepared | Zoiko Mobile",
    description:
      "Prepare your phone, understand potential roaming and calling charges, and get help while traveling abroad with Zoiko Mobile.",
    url: "https://zoikomobile.com/international-usage-tips",
    images: ["/img/International-Usage-Tips/iut1.png"],
  },
};

export default function InternationalUsageTipsPage() {
  return (
    <>
      <Header />
      <main>
        <InternationalUsageTipsClient />
      </main>
      <Footer />
    </>
  );
}

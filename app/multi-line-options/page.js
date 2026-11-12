import Header from "../components/Header";
import Footer from "../components/Footer";
import MultiLineOptionsClient from "./MultiLineOptionsClient";

export const metadata = {
  title: "Multi-Line Options – Connect Your People Under One Account | Zoiko Mobile",
  description:
    "Bring family and friends together on one bill. Save 20% when 3 or more lines are active, for groups of up to 10 lines.",
  alternates: {
    canonical: "https://zoikomobile.com/multi-line-options",
  },
  openGraph: {
    title:
      "Multi-Line Options – Connect Your People Under One Account | Zoiko Mobile",
    description:
      "Bring family and friends together on one bill. Save 20% when 3 or more lines are active, for groups of up to 10 lines.",
    url: "https://zoikomobile.com/multi-line-options",
    images: ["/img/Multi-Line-Options/mlo1.png"],
  },
};

export default function MultiLineOptionsPage() {
  return (
    <>
      <Header />
      <main>
        <MultiLineOptionsClient />
      </main>
      <Footer />
    </>
  );
}

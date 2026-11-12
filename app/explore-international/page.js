import Header from "../components/Header";
import Footer from "../components/Footer";
import ExploreInternationalClient from "./ExploreInternationalClient";

export const metadata = {
  title: "Explore International | Call the World, Travel Connected | Zoiko Mobile",
  description:
    "Calling another country from the U.S. and using your phone abroad are different services. Check international calling and roaming for your plan and destination.",
  alternates: { canonical: "https://zoikomobile.com/explore-international" },
  openGraph: {
    title: "Explore International | Zoiko Mobile",
    description:
      "Call the world. Travel connected. Tell us which service you need and we'll show what applies.",
    url: "https://zoikomobile.com/explore-international",
    images: ["/img/explore-international/image (24).png"],
  },
};

export default function ExploreInternationalPage() {
  return (
    <>
      <Header />
      <main>
        <ExploreInternationalClient />
      </main>
      <Footer />
    </>
  );
}

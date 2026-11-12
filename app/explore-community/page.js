import Header from "../components/Header";
import Footer from "../components/Footer";
import ExploreCommunityClient from "./ExploreCommunityClient";

export const metadata = {
  title: "Explore Community – Animals. Music. Community. | Zoiko Mobile",
  description:
    "See what our community is doing for animals and live music, read verified stories, and find your way to take part. No account needed.",
  alternates: {
    canonical: "https://zoikomobile.com/explore-community",
  },
  openGraph: {
    title: "Explore Community – Animals. Music. Community. | Zoiko Mobile",
    description:
      "See what our community is doing for animals and live music, read verified stories, and find your way to take part. No account needed.",
    url: "https://zoikomobile.com/explore-community",
    images: ["/img/Explore-Community/ec1.png"],
  },
};

export default function ExploreCommunityPage() {
  return (
    <>
      <Header />
      <main>
        <ExploreCommunityClient />
      </main>
      <Footer />
    </>
  );
}

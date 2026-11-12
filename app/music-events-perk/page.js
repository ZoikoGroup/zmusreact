import Header from "../components/Header";
import Footer from "../components/Footer";
import MusicEventsPerkClient from "./MusicEventsPerkClient";

export const metadata = {
  title: "Music Events & Perks | Zoiko Music Community",
  description:
    "Discover live music, member perks you can actually use, and share your sound with the Animal & Music Loving Network.™ Explore events, artist spotlights and community programs.",
  alternates: {
    canonical: "https://zoikomobile.com/music-events-perk",
  },
  openGraph: {
    title: "Music Events & Perks | Zoiko Music Community",
    description:
      "Discover live music, member perks you can actually use, and share your sound with the Animal & Music Loving Network.™ Explore events, artist spotlights and community programs.",
    url: "https://zoikomobile.com/music-events-perk",
    images: ["/img/music-events-perk/card-events.png"],
  },
};

export default function MusicEventsPerkPage() {
  return (
    <>
      <Header />
      <main>
        <MusicEventsPerkClient />
      </main>
      <Footer />
    </>
  );
}

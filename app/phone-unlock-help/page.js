import Header from "../components/Header";
import Footer from "../components/Footer";
import PhoneUnlockHelpClient from "./PhoneUnlockHelpClient";

export const metadata = {
  title: "Phone Unlock Help | Zoiko Mobile",
  description:
    "Check whether your phone is carrier-locked, get help from the original carrier, and see if it can work with Zoiko Mobile.",
  alternates: { canonical: "https://zoikomobile.com/phone-unlock-help" },
  openGraph: {
    title: "Phone Unlock Help | Zoiko Mobile",
    description:
      "Unlock your phone. Keep your options open. Check your lock status, find your carrier's unlock policy and get help.",
    url: "https://zoikomobile.com/phone-unlock-help",
    images: ["/img/phone-unlock-help/image (1).png"],
  },
};

export default function PhoneUnlockHelpPage() {
  return (
    <>
      <Header />
      <main>
        <PhoneUnlockHelpClient />
      </main>
      <Footer />
    </>
  );
}

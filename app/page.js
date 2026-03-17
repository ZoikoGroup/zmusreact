import Header from "./components/Header";
import HomeBanner from "./components/HomeBanner";
import HomeSecA from "./components/HomeSecA";
import CarouselPlans from "./components/CarouselPlans";
import Footer from "./components/Footer";
import WhyChooseZoiko from "./components/WhyChooseZoiko";
import RefurbishedSmartphones from "./components/RefurbishedSmartphones";
import PhoneSlider from "./components/PhoneSlider";
import Testimonials from "./components/Testimonials";

// ✅ SEO Metadata
export const metadata = {
  title: "Zoiko Mobile | Best Mobile Plans with Unlimited Data",
  description:
    "Stay connected with Zoiko Mobile for the best mobile plans with unlimited data. Get the coverage & affordability you deserve with our top mobile plan options.",
};

export default function Home() {
  return (
    <>
    {/* <TopHeader /> */}
    <Header />
    <HomeBanner />
    <HomeSecA />
    <CarouselPlans />
    <WhyChooseZoiko />
    <RefurbishedSmartphones />
    <PhoneSlider />
    <Testimonials />
    <Footer />
    </>
  );
}

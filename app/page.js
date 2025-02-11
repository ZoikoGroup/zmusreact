import Header from "./components/Header";
import HomeBanner from "./components/HomeBanner";
import HomeSecA from "./components/HomeSecA";
import CarouselPlans from "./components/CarouselPlans";
import Footer from "./components/Footer";
import WhyChooseZoiko from "./components/WhyChooseZoiko";
import RefurbishedSmartphones from "./components/RefurbishedSmartphones";
import TopHeader from "./components/TopHeader";

export default function Home() {
  return (
    <>
    <TopHeader />
    <Header />
    <HomeBanner />
    <HomeSecA />
    <CarouselPlans />
    <WhyChooseZoiko />
    <RefurbishedSmartphones />
    <Footer />
    </>
  );
}

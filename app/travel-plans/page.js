"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import TravelPlansBanner from '../components/TravelPlansBanner';
import TravelPlanSlider from '../components/TravelPlanSlider';
import TravelPlanBox from '../components/TravelPlanBox';
import Testimonials from "../components/Testimonials";
import TravelFaqs from "../components/TravelFaqs";

const TravelPlans = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Travel Around, no regrets, no excuses!" />
        <TravelPlansBanner />
        <TravelPlanSlider />
        <TravelPlanBox />
        <TravelFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default TravelPlans;
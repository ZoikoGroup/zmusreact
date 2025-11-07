"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import PrepaidBanner from "../components/PrepaidBanner";
import PrepaidSlider from "../components/PrepaidSlider";
import PrepaidBox from "../components/PrepaidBox";
import PrepaidFaqs from "../components/PrepaidFaqs";
import Testimonials from "../components/Testimonials";

const PrepaidPlans = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="No Contract Best Prepaid Mobile Phone Deals" />
        <PrepaidBanner />
        <PrepaidSlider />
        <PrepaidBox />
        <PrepaidFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default PrepaidPlans;
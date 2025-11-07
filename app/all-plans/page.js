"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import PostpaidSlider  from "../components/POstpaidSlider";
import PrepaidSlider from "../components/PrepaidSlider";
import Testimonials from "../components/Testimonials";
import BusinessPlans from "../components/BusinessPlans";
import TravelPlanSlider from "../components/TravelPlanSlider";

const PrepaidPlans = () => {
    return (
        <>
        {/* <TopHeader /> */}
        <Header />
        <HeadBar text="Affordable Plans | No Credit Checks | No Hidden Fees | Unlimited Everything | Reliable Nationwide Coverage" />
        <PrepaidSlider />
        <HeadBar text="Zoiko Mobile Postpaid Plans" />
        <PostpaidSlider />
        <HeadBar text="Zoiko Mobile Postpaid Business Plans" />
        <BusinessPlans />
        <HeadBar text="Stay Connected Globally - Simple, Affordable Travel Plans" />
        <TravelPlanSlider />
        <Testimonials />
        <Footer />
        </>
    );
}
export default PrepaidPlans;
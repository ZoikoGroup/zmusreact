"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import BusinessDealsBanner from "../components/BusinessDealsBanner";
import BusinessPlans from "../components/BusinessPlans";
import Testimonials from "../components/Testimonials";
import PrepaidFaqs from "../components/PrepaidFaqs";

const BusinessDeals = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Reach out to clients in a great mobility with cellular business postpaid plans" />
        <BusinessDealsBanner />
        <BusinessPlans />
        <PrepaidFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default BusinessDeals;
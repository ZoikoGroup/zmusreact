"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import PostpaidBanner from "../components/PostpaidBanner";
import POstpaidSlider from "../components/POstpaidSlider";
import PostpaidBox from "../components/PostpaidBox";
import Testimonials from "../components/Testimonials";
import PostpaidFaqs from "../components/PostpaidFaqs";

const PostpaidPlans = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!" />
        <PostpaidBanner />
        <POstpaidSlider />
        <PostpaidBox />
        <PostpaidFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default PostpaidPlans;
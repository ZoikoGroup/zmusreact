"use client";

import { usePathname } from "next/navigation";
import TopHeader from "../../components/TopHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadBar from "../../components/HeadBar";
import PrepaidBanner from "../../components/PrepaidBanner";
import PlansSlider from "../../components/PlansSlider";
import PrepaidBox from "../../components/PrepaidBox";
import PrepaidFaqs from "../../components/PrepaidFaqs";
import Testimonials from "../../components/Testimonials";

const PrepaidPlans = () => {
    const pathname = usePathname();
    const slug = pathname.split("/").filter(Boolean).pop(); // Get last URL part

    // ✅ Convert slug to Title Case (e.g. "prepaid-plans" → "Prepaid Plans")
    const titleCaseSlug = slug
        ? slug
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";

    return (
        <>
            <TopHeader />
            <Header />
            {/* ✅ Dynamically show the slug in title case */}
            <HeadBar text={`No Contract Best ${titleCaseSlug} Mobile Phone Deals`} />
            <PrepaidBanner />
            {/* ✅ Pass raw slug to PlansSlider for API/filter use */}
            <PlansSlider slug={slug} />
            <PrepaidBox />
            <PrepaidFaqs />
            <Testimonials />
            <Footer />
        </>
    );
};

export default PrepaidPlans;

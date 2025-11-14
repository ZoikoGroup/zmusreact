"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";  // remove if not needed

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("zoiko_token");

    if (!token) {
      router.replace("/login");
    } else {
      setAllowed(true);
    }
  }, [router]);

  // Show header/footer even during loading
  if (!allowed) {
    return (
      <>
        <Header />
        <HeadBar text="Dashboard" /> {/* optional */}
        <div className="text-center p-5">
          <p>Checking authentication...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Show actual dashboard content
  return (
    <>     
      {children}     
    </>
  );
}

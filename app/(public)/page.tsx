"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Announcements from "@/components/Announcement";
import Officials from "@/components/Officials";
import Footer from "@/components/Footer";
import Navbar from "@/pages/Navbar";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/auth/checkAuth");
        const data = await res.json();

        if (data.authenticated && data.redirectUrl) {
          router.push(data.redirectUrl);
        }
      } catch (error) {
        // User is not authenticated, stay on public page
        console.log("User not authenticated");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Announcements />
      <Services />
      <Officials />
      <Footer />
    </div>
  );
};

export default Homepage;

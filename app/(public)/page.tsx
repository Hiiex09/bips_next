import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Announcements from "@/components/Announcement";
import Officials from "@/components/Officials";
import Footer from "@/components/Footer";
import Navbar from "@/pages/Navbar";

const Homepage = () => {
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

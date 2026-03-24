import HeroSection from "@/components/HeroSection"
import Services from "@/components/Services"
import Announcements from "@/components/Announcement"
import Officials from "@/components/Officials"


const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <Announcements />
      <Services />
      <Officials />
    </div>
  )
}

export default Homepage
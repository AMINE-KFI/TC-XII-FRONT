import Navbar2 from "../components/Navbar2";
import HeroSection from "../components/HeroSection";
import ContactSection from "../components/ContactSection";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar2 />
      
      <Dashboard />

      <ContactSection />
    </main>
  );
}
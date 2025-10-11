import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/about";
import Sponsors from "../components/sponsors/Sponsors";
import LiveEventComponent from "../components/events/eventposter";
import TestimonialSection from "../components/Testimonials/TestimonialSection";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Sponsors />
      <LiveEventComponent />
      <TestimonialSection />
      <Footer />
    </div>
  );
}

export default HomePage;

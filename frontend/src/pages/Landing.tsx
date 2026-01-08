import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Benefits from "../components/landing/Benefits";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;

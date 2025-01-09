import React from 'react';
import Navbar from './components/navbar/Navbar.jsx'
import Sponsors from "./components/sponsors/Sponsors"
import LiveEventComponent from './components/events'; 
import TestimonialSection from "./components/Testimonials/TestimonialSection"

function App() {
  return (
    <div>
       <Navbar />
      <Sponsors />
      <LiveEventComponent />
     <TestimonialSection />
    </div>
  );
}

export default App;
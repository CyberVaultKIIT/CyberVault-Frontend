
import Sponsors from "./../../components/sponsors/Sponsors";
import LiveEventComponent from '../../components/events';
import TestimonialSection from "../../components/Testimonials/TestimonialSection";
import Hero from "../../components/Hero/Hero";
import About from '../../components/About/about.jsx';

function Home() {
    return (
        <div>
            <Hero />
            <About />
            <Sponsors />
            <LiveEventComponent />
            <TestimonialSection />
        </div>
    );
}

export default Home;



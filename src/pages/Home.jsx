import React from "react";
import { Hero } from "../components/Hero";
// import { Counters } from "../components/Counters"; // now merged into Hero
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { Services } from "../components/Services";
import { Counters } from "../components/Counters";
import { FAQs } from "../components/FAQ";
import { Contact } from "../components/Contact";


export const Home = () => (
  <>
    <Hero />
    <About />
    <Counters />
    <Services />
    <Testimonials />
    <FAQs />
    <Contact />
  </>
);
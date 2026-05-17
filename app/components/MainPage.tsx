import React from "react";
import Hero from "./Hero";
import Projects from "./Projects";
import Navbar from "./Navbar";

const MainPage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
    </main>
  );
};

export default MainPage;

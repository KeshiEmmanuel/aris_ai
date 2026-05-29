import Hero from "./Hero";
import Projects from "./Projects";
import Navbar from "./Navbar";
import StudioBrief from "./StudioBrief";
import WhoWeWorkWith from "./WhoWeWorkWith";
import OurProcess from "./OurProcess";
import Studio from "./Studio";
import StudioUs from "./StudioUs";
import FAQsection from "./FAQsection";
import MainFooter from "./MainFooter";
import { LenisProvider } from "./ScrollSmoother";

const MainPage = () => {
  return (
    <main className="font-primary">
      <LenisProvider>
        <Navbar />
        <Hero />
        {/* <Projects />
        <StudioBrief />
        <WhoWeWorkWith />
        <OurProcess />
        <Studio />
        <StudioUs />
        <FAQsection />
        <MainFooter /> */}
      </LenisProvider>
    </main>
  );
};

export default MainPage;

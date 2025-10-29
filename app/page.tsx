import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <main className="home-page">
      <div className="max-container">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
};
export default Home;

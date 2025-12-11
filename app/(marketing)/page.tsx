import Button from "@/components/editor/ai/Button";
import Footer from "@/components/editor/ai/Footer";
import FeatureList from "@/components/editor/FeatureCard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { redirect } from "next/navigation";

const Home = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) return redirect("/new");

  if (!currentUser)
    return (
      <main className="font-inter">
        <div>
          <Hero />
        </div>
      </main>
    );
};
export default Home;

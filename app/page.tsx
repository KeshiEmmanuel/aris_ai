import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { redirect } from "next/navigation";

const Home = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) return redirect("/dashboard");

  if (!currentUser)
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

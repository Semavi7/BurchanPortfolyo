import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { MachineLearning } from "@/components/MachineLearning";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <MachineLearning />
      <Skills />
      <Timeline />
      <Certifications />
      <Footer />
    </main>
  );
}

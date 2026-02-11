import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { MachineLearning } from "@/components/MachineLearning";
import { Algorithms } from "@/components/Algorithms";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <MachineLearning />
      <Algorithms />
      <Skills />
      <Timeline />
      <Certifications />
      <Footer />
    </main>
  );
}

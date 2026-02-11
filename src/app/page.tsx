import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { MachineLearning } from "@/components/MachineLearning";
import { Algorithms } from "@/components/Algorithms";
import { GoLang } from "@/components/GoLang";
import { RustLang } from "@/components/RustLang";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <MachineLearning />
      <Algorithms />
      <GoLang />
      <RustLang />
      <Skills />
      <Timeline />
      <Certifications />
      <Footer />
    </main>
  );
}

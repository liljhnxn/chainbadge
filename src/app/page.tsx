import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BadgeCard } from "@/components/BadgeCard";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col justify-center py-10 sm:py-16">
        <Hero />
        <BadgeCard />
      </main>
      <Footer />
    </div>
  );
}

import CategoryCarousels from "../components/CategoryCarousels";
import HeroCarousel from "../components/HeroCarousel";

export default function Home() {
  return (
    <div className="bg-dark">
      <HeroCarousel />
      <CategoryCarousels />
    </div>
  );
}

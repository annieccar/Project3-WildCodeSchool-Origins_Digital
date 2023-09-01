import MultipleItems from "../components/Carousel";
import HeroCarousel from "../components/HeroCarousel";

export default function Home() {
  return (
    <div className="bg-dark">
      <HeroCarousel />
      <MultipleItems />
    </div>
  );
}

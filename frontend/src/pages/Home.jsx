import MultipleItems from "../components/Carousel";
import HeroCarousel from "../components/HeroCarousel";
import TestAnnie from "../components/testAnnie";

export default function Home() {
  return (
    <div className="bg-dark">
      <HeroCarousel />
      <TestAnnie />
      <MultipleItems />
    </div>
  );
}

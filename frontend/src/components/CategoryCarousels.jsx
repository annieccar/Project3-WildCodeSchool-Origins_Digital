import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import interceptor from "../hooks/useInstanceWithInterceptor";

import StaticCarousel from "./StaticCarousel";

export default function CategoryCarousels() {
  const [categories, setCategories] = useState([]);
  const [videoByCategories, setVideoByCategories] = useState([]);
  const [categoryCarousels, setCategoryCarousels] = useState([]);
  const expressAPI = interceptor();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await expressAPI.get("/api/categories");
        const videoResponse = await expressAPI.get("/api/carousels/videos");
        setCategories(categoriesResponse.data);
        setVideoByCategories(videoResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (videoByCategories.length > 0 && categories.length > 0) {
      const categoriesWithVideos = categories.map((category) => {
        const categoryArray = videoByCategories.filter(
          (video) => video.title === category.name
        );
        return categoryArray;
      });
      setCategoryCarousels(categoriesWithVideos);
    }
  }, [videoByCategories, categories]);

  const capitalizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  };

  return (
    categoryCarousels.length > 0 && (
      <div className="flex flex-col items-center pb-16">
        {categoryCarousels.map((array) => (
          <div
            className="relative w-100 lg:w-[980px]"
            key={`${array[0].carousel_id}`}
          >
            <StaticCarousel
              videosArray={array}
              carousselName={capitalizeFirstLetter(array[0].title)}
            />
            <button
              type="button"
              onClick={() => {
                navigate(`/category/${array[0].category_id}`);
              }}
              className="text-white bg-orange-gradient font-primary font-semibold rounded-full w-auto h-8 px-4 py-0.5 absolute right-5 lg:right-0 top-8"
            >
              View more
            </button>
          </div>
        ))}
      </div>
    )
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import StaticCarousel from "./StaticCarousel";

export default function CategoryCarousels() {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoByCategories, setVideoByCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const categoriesWithVideos = categories.map((category) => {
      const categoryArray = videos.filter(
        (video) => video.category_id === category.id
      );
      return categoryArray;
    });
    setVideoByCategories(categoriesWithVideos);
  }, [videos, categories]);

  return (
    videoByCategories.length > 0 && (
      <div className="flex flex-col items-center">
        {videoByCategories.map((array) => (
          <StaticCarousel videosArray={array} carousselName="Category" />
        ))}
      </div>
    )
  );
}

import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import StaticCarousel from "./StaticCarousel";

export default function FavoritesCarousel({ playlist }) {
  const [videoNames, setVideoNames] = useState([]);

  useEffect(() => {
    const names = [];
    playlist.videos.map((elem) => names.push(elem));
    setVideoNames(names);
  }, []);

  return <StaticCarousel videosArray={videoNames} carousselName="" />;
}

FavoritesCarousel.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        details: PropTypes.string,
        category_id: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};

import { useState, useEffect } from "react";

/**
 * This hook watches window resizing for responsive purposes, returns true if window width is superior to the parameter.
 * @example
 * const isDesktop = useMediaQuery("(min-width: 760px)"); // Hook call at the beginning of the function
 * isDesktop ? // returns true if screen width > 760px
 * @param {string} query
 * @returns {boolean}
 */

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches]);

  return matches;
};

export default useMediaQuery;

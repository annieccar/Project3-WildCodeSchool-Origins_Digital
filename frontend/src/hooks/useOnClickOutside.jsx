import { useEffect } from "react";

/**
 * Custom hook that watches click events : if click occurs outside of current ref area, handler function is expressed.
 * @param {object} ref
 * @param {function} handler
 */
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
};

export default useOnClickOutside;

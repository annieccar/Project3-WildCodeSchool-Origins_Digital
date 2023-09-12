import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const BlurredBackgroundContext = createContext();

export const useBlurredBackgroundContext = () =>
  useContext(BlurredBackgroundContext);

export function BlurredBackgroundContextProvider({ children }) {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const memoizedBlur = useMemo(() => {
    return { isBackgroundBlurred, setIsBackgroundBlurred };
  }, [isBackgroundBlurred]);

  return (
    <BlurredBackgroundContext.Provider value={memoizedBlur}>
      {children}
    </BlurredBackgroundContext.Provider>
  );
}
BlurredBackgroundContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

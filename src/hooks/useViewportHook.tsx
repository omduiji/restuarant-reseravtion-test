import { useState, useEffect } from 'react';

const useViewportWidth = (breakpoint: number) => {
  const [isViewportWidth, setIsViewportWidth] = useState(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsViewportWidth(window.innerWidth <= breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isViewportWidth;
};

export default useViewportWidth;

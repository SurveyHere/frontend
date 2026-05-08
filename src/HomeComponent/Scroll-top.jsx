import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
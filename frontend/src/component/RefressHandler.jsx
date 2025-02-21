import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefressHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      const token = JSON.parse(data).token;
      if (token) {
        setIsAuthenticated(true);
        if (location.pathname === '/' || location.pathname === '/login') {
          navigate('/dashboard', { replace: false });
        }
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
};

export default RefressHandler;

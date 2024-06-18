import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TokenExchange = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const userName = params.get("userName");
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (userId && userName && accessToken && refreshToken) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 6);
    localStorage.setItem("expiration", expiration.toISOString());

    navigate("/");
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default TokenExchange;

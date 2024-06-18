import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { getAuthToken, getTokenDuration } from "../util/auth.js"; // 필요한 유틸리티 함수 임포트

const Header = () => {
  const navigate = useNavigate();
  const tokenData = useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenData);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const tokenDuration = getTokenDuration();
      if (tokenDuration > 0) {
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [tokenData]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const redirectToGoogleOAuth = () => {
    window.location.href =
      "https://trip-ani.kro.kr/oauth2/authorization/google";
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("expiration");
    setIsAuthenticated(false);
    setUserMenuOpen(false); // 로그아웃 후 사용자 메뉴 닫기
    navigate("/");
  };

  return (
    <header className="bg-orange-100 text-purple-900 w-full p-0 m-0 h-16 relative">
      <div className="flex justify-between items-center px-4 h-full">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          <FaBars />
        </button>
        <div className="flex justify-center flex-grow">
          <Link to="/" className="text-3xl font-bold">
            t&nbsp;r&nbsp;i&nbsp;
            <span className="text-4xl">P&nbsp;&nbsp;트리피</span>
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="text-2xl text-purple-900 focus:outline-none"
            >
              <FaUser />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={redirectToGoogleOAuth}
            className="text-xl text-purple-900 focus:outline-none"
          >
            로그인
          </button>
        )}
      </div>
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-orange-300 z-10 shadow-lg opacity-70">
          <Link
            to="/"
            className=" text-lg font-bold block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/menupan"
            className="text-lg font-bold block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            여행 메뉴판
          </Link>
          <Link
            to="/chat"
            className="text-lg font-bold block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            리피톡
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

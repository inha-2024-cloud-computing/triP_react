import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  return (
    <header className="bg-purple-200 text-purple-900 w-full p-0 m-0 h-16 relative">
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
        <Link to="/login">
          <button className="text-2xl text-purple-900 focus:outline-none">
            <FaUser />
          </button>
        </Link>
      </div>
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-purple-100 z-10 shadow-lg opacity-70">
          <Link
            to="/"
            className="block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/menupan"
            className="block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            여행 메뉴판
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            컴파일러 좆같다
          </Link>
          <Link
            to="/where"
            className="block px-4 py-2 text-purple-900 hover:bg-purple-200"
            onClick={toggleMenu}
          >
            위치
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

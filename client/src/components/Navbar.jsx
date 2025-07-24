import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            בית
          </Link>
        </li>
        <li>
          <Link
            to="/books"
            className={location.pathname === "/books" ? "active" : ""}
          >
            אוסף הספרים
          </Link>
        </li>
        <li>
          <Link
            to="/add-book"
            className={location.pathname === "/add-book" ? "active" : ""}
          >
            הוסף ספר
          </Link>
        </li>
        <li>
          <Link
            to="/top-rated"
            className={location.pathname === "/top-rated" ? "active" : ""}
          >
            הספרים שבטופ 3
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

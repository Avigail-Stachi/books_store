import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="page-container">
      <div className="home-content">
        <h2>ברוכים הבאים לחנות הספרים שלנו!</h2>
        <p>כאן תוכלו למצוא מגוון רחב של ספרים בקטגוריות שונות</p>
        <div className="home-features">
          <Link to="/books" className="feature-link">
            <div className="feature">
              <h3>📚 מגוון ספרים</h3>
              <p>ספרים בקטגוריות מגוונות לכל הטעמים</p>
            </div>
          </Link>
          <Link to="/top-rated" className="feature-link">
            <div className="feature">
              <h3>⭐ מומלצים</h3>
              <p>ראו את המומלצים ביותר</p>
            </div>
          </Link>
          <Link to="/add-book" className="feature-link">
            <div className="feature">
              <h3>📝 הוספת ספרים</h3>
              <p>הוסיפו ספרים חדשים לאוסף</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

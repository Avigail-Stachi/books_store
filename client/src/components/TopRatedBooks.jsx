import React, { useEffect, useState } from "react";
import "../styles/TopRatedBooks.css";

const TopRatedBooks = ({ refreshTrigger }) => {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRatedBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/books/top-rated");
      if (!response.ok) {
        throw new Error("Failed to fetch top rated books");
      }
      const data = await response.json();
      setTopBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch top rated books", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedBooks();
  }, [refreshTrigger]);

  if (loading) {
    return <p>טוען את הספרים המדורגים...</p>;
  }

  if (!Array.isArray(topBooks) || topBooks.length === 0) {
    return (
      <div className="top-rated-container">
        <h2>הספרים המדורגים ביותר (טופ 3)</h2>
        <p>אין ספרים זמינים כרגע או שטרם דורגו</p>
      </div>
    );
  }

  return (
    <div className="top-rated-container">
      <h2>שלושת הספרים המדורגים גבוה ביותר</h2>
      <ul className="top-rated-list">
        {topBooks.map((book) => (
          <li key={book.id} className="top-rated-item">
            <span className="top-rated-title">{book.title}</span>
            <span className="top-rated-rating">
              {" "}
              דירוג: {book.averageRating.toFixed(1)} ({book.ratingCount}{" "}
              דירוגים)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedBooks;

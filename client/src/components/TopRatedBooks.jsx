import React from "react";
import "../styles/TopRatedBooks.css";

const TopRatedBooks = ({ books }) => {
  if (!Array.isArray(books) || books.length === 0) {
    return (
      <div className="top-rated-container">
        <h2>הספרים המדורגים ביותר (טופ 3)</h2>
        <p>אין ספרים זמינים כרגע או שטרם דורגו </p>
      </div>
    );
  }
  const ratedBooks = books.filter((book) => book.ratingCount > 0);
  let top3Books = [];
  ratedBooks.forEach((book) => {
    if (top3Books.length < 3) {
      top3Books.push(book);
      top3Books.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      const minRatedBookInTop3 = top3Books[top3Books.length - 1];
      if (book.averageRating > minRatedBookInTop3.averageRating) {
        top3Books.pop();
        top3Books.push(book);
        top3Books.sort((a, b) => b.averageRating - a.averageRating);
      }
    }
  });

  if (top3Books.length === 0) {
    return (
      <div className="top-rated-container">
        <h2>הספרים המדורגים גבוה ביותר</h2>
        <p>אין מספיק ספרים מדורגים עדיין</p>
      </div>
    );
  }
  return (
    <div className="top-rated-container">
      <h2>שלושת הספרים המדורגים גבוה ביותר</h2>
      <ul className="top-rated-list">
        {top3Books.map((book) => (
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

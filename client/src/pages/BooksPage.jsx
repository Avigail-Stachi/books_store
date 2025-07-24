import React from "react";
import BookDisplay from "../components/BookDisplay";

const BooksPage = ({ books, loading, onDelete, onStockUpdate, onRate }) => {
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">טוען ספרים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">כל הספרים</h2>
      <main className="book-list-container">
        {books.map((book) => (
          <BookDisplay
            key={book.id}
            book={book}
            onDelete={() => onDelete(book.id)}
            onStockUpdate={(newStock) => onStockUpdate(book.id, newStock)}
            onRate={(rating) => onRate(book.id, rating)}
          />
        ))}
      </main>
    </div>
  );
};

export default BooksPage;

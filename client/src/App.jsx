import React, { useState, useEffect } from "react";
import "./styles/App.css";
import BookDisplay from "./components/BookDisplay";
import AddBookForm from "./components/AddBookForm";
import TopRatedBooks from "./components/TopRatedBooks";

function App() {
  const API_BASE_URL = "http://localhost:5000/api";

  // הגדרת כל הקטגוריות האפשריות במערך אחד
  const ALL_CATEGORIES = {
    SCIENCE_FICTION: "מדע בדיוני",
    ADVENTURE: "הרפתקאות",
    COMEDY: "קומדיה",
    PHILOSOPHY: "פילוסופיה",
    POPULAR_SCIENCE: "מדע פופולרי",
    ASTRONOMY: "אסטרונומיה",
    CHILDREN: "ילדים",
    FANTASY: "פנטזיה",
    FUTURISM: "עתידנות",
    SOCIETY: "חברה",
  };

  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topRatedRefresh, setTopRatedRefresh] = useState(0);

  // טעינת ספרים מהשרת
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleStockUpdate = async (bookId, newStockQuantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${bookId}/stock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStockQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      const updatedBook = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
      );
      // מעדכן את רשימת הטופ 3
      setTopRatedRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("שגיאה בעדכון המלאי");
    }
  };

  // הוספת ספר חדש
  const handleAddBook = async (newBook) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const addedBook = await response.json();
      setBooks((prev) => [...prev, addedBook]);
      setShowForm(false); // סגירת הטופס לאחר הוספת הספר
    } catch (error) {
      console.error("Error adding book:", error);
      alert("שגיאה בהוספת הספר");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("שגיאה במחיקת הספר");
    }
  };

  const handleRateBook = async (bookId, newRating) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${bookId}/rate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate book");
      }

      const updatedBook = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
      );
      setTopRatedRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error rating book:", error);
      alert("שגיאה בדירוג הספר");
    }
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>חנות ספרים</h1>
        </header>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">טוען ספרים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>חנות ספרים</h1>
      </header>

      <TopRatedBooks refreshTrigger={topRatedRefresh} />

      <section className="add-book-section">
        <button
          className="open-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "סגור טופס הוספה" : "הוסף ספר חדש"}
        </button>

        {showForm && (
          <AddBookForm
            onAddBook={handleAddBook}
            allCategories={Object.values(ALL_CATEGORIES)}
          />
        )}
      </section>

      <main className="book-list-container">
        {books.map((book) => (
          <BookDisplay
            key={book.id}
            book={book}
            onDelete={() => handleDeleteBook(book.id)}
            onStockUpdate={(newStock) => handleStockUpdate(book.id, newStock)}
            onRate={(rating) => handleRateBook(book.id, rating)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;

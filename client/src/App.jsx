import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css"; // עדיין תוכל להשתמש בזה לעיצובים גלובליים
import Layout from "./components/Layout"; // ייבא את קומפוננטת ה-Layout החדשה
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import AddBookPage from "./pages/AddBookPage";
import TopRatedPage from "./pages/TopRatedPage";

function App() {
  const API_BASE_URL = "http://localhost:5000/api";

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
  const [loading, setLoading] = useState(true);
  const [topRatedRefresh, setTopRatedRefresh] = useState(0);

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
      setTopRatedRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("שגיאה בעדכון המלאי");
    }
  };

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

  return (
    // עוטפים את ה-Routes בקומפוננטת Layout
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/books"
          element={
            <BooksPage
              books={books}
              loading={loading}
              onDelete={handleDeleteBook}
              onStockUpdate={handleStockUpdate}
              onRate={handleRateBook}
            />
          }
        />
        <Route
          path="/add-book"
          element={
            <AddBookPage
              onAddBook={handleAddBook}
              allCategories={Object.values(ALL_CATEGORIES)}
            />
          }
        />
        <Route
          path="/top-rated"
          element={<TopRatedPage refreshTrigger={topRatedRefresh} />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

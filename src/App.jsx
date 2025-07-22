import React, { useState } from "react";
import "./App.css";
import BookDisplay from "./components/BookDisplay";
import AddBookForm from "./components/AddBookForm";

function App() {
  const handleStockUpdate = (bookId, newStockQuantity) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, stockQuantity: newStockQuantity } : book
      )
    );
  };

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

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "מסע אל המרחבים",
      author: "א. כהן",
      price: 50.0,
      discountPercentage: 10,
      stockQuantity: 5,
      categories: [ALL_CATEGORIES.SCIENCE_FICTION, ALL_CATEGORIES.ADVENTURE],
    },
    {
      id: 2,
      title: "המדריך לגלקסיה",
      author: null,
      price: 75.5,
      discountPercentage: 20,
      stockQuantity: 10,
      categories: [
        ALL_CATEGORIES.COMEDY,
        ALL_CATEGORIES.SCIENCE_FICTION,
        ALL_CATEGORIES.PHILOSOPHY,
      ],
    },
    {
      id: 3,
      title: "סודות היקום",
      author: "מ. לוי",
      price: 120.0,
      discountPercentage: 0,
      stockQuantity: 0,
      categories: [ALL_CATEGORIES.POPULAR_SCIENCE, ALL_CATEGORIES.ASTRONOMY],
    },
    {
      id: 4,
      title: "ההרפתקה הגדולה",
      author: "יעל א.",
      price: 80.0,
      discountPercentage: 15,
      stockQuantity: 12,
      categories: [
        ALL_CATEGORIES.ADVENTURE,
        ALL_CATEGORIES.CHILDREN,
        ALL_CATEGORIES.FANTASY,
      ],
    },
    {
      id: 5,
      title: "העולם של מחר",
      author: "שרית פ.",
      price: 95.0,
      discountPercentage: 0,
      stockQuantity: 22,
      categories: [
        ALL_CATEGORIES.FUTURISM,
        ALL_CATEGORIES.SOCIETY,
        ALL_CATEGORIES.SCIENCE_FICTION,
      ],
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  //הוספת ספר חדש
  const handleAddBook = (newBook) => {
    const bookWithId = { ...newBook, id: Date.now() }; // מזהה ייחודי
    setBooks((prev) => [...prev, bookWithId]);
    setShowForm(false); // סגירת הטופס לאחר הוספת הספר
  };
  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>חנות ספרים</h1>
      </header>

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
          />
        ))}
      </main>
    </div>
  );
}

export default App;

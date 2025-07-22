import React from "react";
import "./App.css";
import BookDisplay from "./components/BookDisplay";

function App() {
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

  const books = [
    {
      id: 1,
      title: "מסע אל המרחבים",
      author: "א. כהן",
      price: 50.0,
      discountPercentage: 10,
      inStock: true,
      categories: [ALL_CATEGORIES.SCIENCE_FICTION, ALL_CATEGORIES.ADVENTURE],
    },
    {
      id: 2,
      title: "המדריך לגלקסיה",
      author: null,
      price: 75.5,
      discountPercentage: 20,
      inStock: true,
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
      inStock: false,
      categories: [ALL_CATEGORIES.POPULAR_SCIENCE, ALL_CATEGORIES.ASTRONOMY],
    },
    {
      id: 4,
      title: "ההרפתקה הגדולה",
      author: "יעל א.",
      price: 80.0,
      discountPercentage: 15,
      inStock: true,
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
      inStock: true,
      categories: [
        ALL_CATEGORIES.FUTURISM,
        ALL_CATEGORIES.SOCIETY,
        ALL_CATEGORIES.SCIENCE_FICTION,
      ],
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>חנות ספרים</h1>
      </header>
      <main className="book-list-container">
        {books.map((book) => (
          <BookDisplay key={book.id} book={book} />
        ))}
      </main>
    </div>
  );
}

export default App;

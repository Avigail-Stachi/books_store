import React from 'react';
import './App.css';
import BookDisplay from './components/BookDisplay'; 

function App() {
  // נתוני ספרים
  const books = [
    {
      id: 1,
      title: "מסע אל המרחבים",
      author: "א. כהן",
      price: 50.00,
      discountPercentage: 10,
      inStock: true,
      categories: ["מדע בדיוני", "הרפתקאות"]
    },
    {
      id: 2,
      title: "המדריך לגלקסיה",
      author: null,
      price: 75.50,
      discountPercentage: 20,
      inStock: true,
      categories: ["קומדיה", "מדע בדיוני", "פילוסופיה"] 
    },
    {
      id: 3,
      title: "סודות היקום",
      author: "מ. לוי",
      price: 120.00,
      discountPercentage: 0,
      inStock: false,
      categories: ["מדע פופולרי", "אסטרונומיה"] 
    },
    {
      id: 4,
      title: "ההרפתקה הגדולה",
      author: "יעל א.",
      price: 80.00,
      discountPercentage: 15,
      inStock: true,
      categories: ["הרפתקאות", "ילדים", "פנטזיה"] 
    },
    { 
      id: 5,
      title: "העולם של מחר",
      author: "שרית פ.",
      price: 95.00,
      discountPercentage: 0,
      inStock: true,
      categories: ["עתידנות", "חברה", "מדע בדיוני"]
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>חנות ספרים</h1>
      </header>
      <main className="book-list-container">
        {books.map(book => (
          <BookDisplay key={book.id} book={book} />
        ))}
      </main>
    </div>
  );
}

export default App;
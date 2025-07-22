const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let books = [
  {
    id: 1,
    title: "מסע אל המרחבים",
    author: "א. כהן",
    price: 50.0,
    discountPercentage: 10,
    stockQuantity: 5,
    categories: ["מדע בדיוני", "הרפתקאות"],
    averageRating: 0,
    ratingCount: 0,
  },
  {
    id: 2,
    title: "המדריך לגלקסיה",
    author: null,
    price: 75.5,
    discountPercentage: 20,
    stockQuantity: 10,
    categories: ["קומדיה", "מדע בדיוני", "פילוסופיה"],
    averageRating: 0,
    ratingCount: 0,
  },
  {
    id: 3,
    title: "סודות היקום",
    author: "מ. לוי",
    price: 120.0,
    discountPercentage: 0,
    stockQuantity: 0,
    categories: ["מדע פופולרי", "אסטרונומיה"],
    averageRating: 0,
    ratingCount: 0,
  },
  {
    id: 4,
    title: "ההרפתקה הגדולה",
    author: "יעל א.",
    price: 80.0,
    discountPercentage: 15,
    stockQuantity: 12,
    categories: ["הרפתקאות", "ילדים", "פנטזיה"],
    averageRating: 0,
    ratingCount: 0,
  },
  {
    id: 5,
    title: "העולם של מחר",
    author: "שרית פ.",
    price: 95.0,
    discountPercentage: 0,
    stockQuantity: 22,
    categories: ["עתידנות", "חברה", "מדע בדיוני"],
    averageRating: 0,
    ratingCount: 0,
  },
];

const getNextId = () => {
  if (books.length === 0) return 1;
  return Math.max(...books.map((book) => book.id)) + 1;
};

// שליפת כל הספרים
app.get("/api/books", (req, res) => {
  res.json(books);
});

// שליפת ספר לפי ID
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// הוספת ספר חדש
app.post("/api/books", (req, res) => {
  const newBook = {
    id: getNextId(),
    title: req.body.title || "כותרת לא ידועה",
    author: req.body.author || "anonymous",
    price: req.body.price || 0,
    discountPercentage: req.body.discountPercentage || 0,
    stockQuantity: req.body.stockQuantity || 0,
    categories: req.body.categories || [],
    averageRating: 0,
    ratingCount: 0,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

//עדכון ספר
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    // לצורך פשטות, השדות 'id', 'averageRating', 'ratingCount' אינם מתעדכנים ישירות באמצעות PUT.
    // שדות אלו מנוהלים על ידי פעולות ספציפיות אחרות (כמו דירוג או לוגיקה פנימית).
    const updatedBook = {
      ...books[bookIndex],
      title:
        req.body.title !== undefined ? req.body.title : books[bookIndex].title,
      author:
        req.body.author !== undefined
          ? req.body.author
          : books[bookIndex].author,
      price:
        req.body.price !== undefined ? req.body.price : books[bookIndex].price,
      discountPercentage:
        req.body.discountPercentage !== undefined
          ? req.body.discountPercentage
          : books[bookIndex].discountPercentage,
      stockQuantity:
        req.body.stockQuantity !== undefined
          ? req.body.stockQuantity
          : books[bookIndex].stockQuantity,
      categories:
        req.body.categories !== undefined
          ? req.body.categories
          : books[bookIndex].categories,
    };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

// (עדכון חלקי) כמות מלאי
app.patch("/api/books/:id/stock", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { newStockQuantity } = req.body;

  if (typeof newStockQuantity === "undefined" || newStockQuantity < 0) {
    return res.status(400).send("Invalid new stock quantity provided");
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex].stockQuantity = newStockQuantity;
    res.json(books[bookIndex]);
  } else {
    res.status(404).send("Book not found");
  }
});

// PATCH (עדכון חלקי) דירוג ספר
app.patch("/api/books/:id/rate", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { rating } = req.body;

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res
      .status(400)
      .send("Invalid rating provided. Rating must be between 1 and 5.");
  }
  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    const book = books[bookIndex];
    const total = book.averageRating * book.ratingCount;
    const newCount = book.ratingCount + 1;
    const newAvg = (total + rating) / newCount;

    books[bookIndex] = {
      ...book,
      averageRating: newAvg,
      ratingCount: newCount,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).send("Book not found");
  }
});

// מחיקת ספר
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter((b) => b.id !== bookId);

  if (books.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs"); // לטיפול בקבצים

const app = express();
const PORT = 5000;
const DATA_File = "./books.json";

app.use(bodyParser.json());
app.use(cors());

let books = [];
try {
  const data = fs.readFileSync(DATA_File, "utf8");
  books = JSON.parse(data);
  console.log("Books loaded from json file");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("Json file not found. starting with empty array");
    fs.writeFileSync(DATA_File, JSON.stringify([], null, 2), "utf8");
  } else {
    console.error("Error loading books from file: ", error);
  }
}

const writeBooksToFile = () => {
  console.log("Writing books to file...");
  try {
    fs.writeFileSync(DATA_File, JSON.stringify(books, null, 2), "utf8");
    console.log("Books saved to file");
  } catch (error) {
    console.error("Error saving Books to file: ", error);
  }
};

const getNextId = () => {
  if (books.length === 0) return 1;
  return Math.max(...books.map((book) => book.id)) + 1;
};

let top3BooksCache = [];

const updateTop3BooksCache = () => {
  const ratedBooks = books.filter((book) => book.ratingCount > 0);
  ratedBooks.sort((a, b) => {
    if (b.averageRating !== a.averageRating) {
      return b.averageRating - a.averageRating;
    }
    return b.ratingCount - a.ratingCount;
  });
  top3BooksCache = ratedBooks.slice(0, 3);
  console.log(
    "Top 3 books cache updated:",
    top3BooksCache.map((b) => ({
      title: b.title,
      rating: b.averageRating,
      count: b.ratingCount,
    }))
  );
};

updateTop3BooksCache();

// שליפת כל הספרים
app.get("/api/books", (req, res) => {
  res.json(books);
});

// החזרת שלושת הספרים שבטופ
app.get("/api/books/top-rated", (req, res) => {
  res.json(top3BooksCache);
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
  writeBooksToFile();
  res.status(201).json(newBook);
});

//עדכון ספר
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
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
    writeBooksToFile();
    res.json(updatedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

// עדכון כמות מלאי
app.patch("/api/books/:id/stock", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { newStockQuantity } = req.body;

  if (typeof newStockQuantity === "undefined" || newStockQuantity < 0) {
    return res.status(400).send("Invalid new stock quantity provided");
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex].stockQuantity = newStockQuantity;
    writeBooksToFile();
    res.json(books[bookIndex]);
  } else {
    res.status(404).send("Book not found");
  }
});

// PATCH (עדכון חלקי) דירוג ספר
app.patch("/api/books/:id/rate", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { rating } = req.body;

  console.log(
    `Received rating request for book ${bookId} with rating ${rating}`
  );

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res
      .status(400)
      .send("Invalid rating provided. Rating must be between 1 and 5.");
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    const book = books[bookIndex];
    console.log(`Current book data:`, {
      title: book.title,
      averageRating: book.averageRating,
      ratingCount: book.ratingCount,
    });

    const total = book.averageRating * book.ratingCount;
    const newCount = book.ratingCount + 1;
    const newAvg = (total + rating) / newCount;

    books[bookIndex] = {
      ...book,
      averageRating: Math.round(newAvg * 10) / 10,
      ratingCount: newCount,
    };

    console.log(`Updated book data:`, {
      title: books[bookIndex].title,
      averageRating: books[bookIndex].averageRating,
      ratingCount: books[bookIndex].ratingCount,
    });

    writeBooksToFile();
    updateTop3BooksCache();

    res.json(books[bookIndex]);
  } else {
    res.status(404).send("Book not found");
  }
});

app.patch("/api/books/:id/stock/decrement", (req, res) => {
  const bookId = parseInt(req.params.id);

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).send("Book not found");
  }

  if (books[bookIndex].stockQuantity <= 0) {
    return res.status(400).send("Stock is already zero, cannot decrement");
  }

  books[bookIndex].stockQuantity -= 1;
  writeBooksToFile();

  res.json(books[bookIndex]);
});

// מחיקת ספר
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter((b) => b.id !== bookId);

  if (books.length < initialLength) {
    writeBooksToFile();
    updateTop3BooksCache();
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

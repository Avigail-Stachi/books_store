// src/components/BookDisplay.jsx
import React, { useState } from "react";
import "../styles/BookDisplay.css";

const BookDisplay = ({ book, onDelete, onStockUpdate, onRate }) => {
  const {
    title = "כותרת לא ידועה",
    author = null,
    price = 0,
    discountPercentage = 0,
    stockQuantity = 0,
    categories = [],
    averageRating = 0,
    ratingCount = 0,
  } = book;

  const [isConsidering, setIsConsidering] = useState(false);
  const [stockInputValue, setStockInputValue] = useState(stockQuantity);
  const [showRating, setShowRating] = useState(false); // מצב חדש לשליטה בהצגת הדירוג

  const inStock = stockQuantity > 0;
  const discountedPrice = price * (1 - discountPercentage / 100);
  const displayAuthor = author === null ? "anonymous" : author;

  const handleAddToCart = () => {
    console.log("Book added to cart:", {
      id: book.id,
      title: title,
      author: displayAuthor,
      price: price,
      discountPercentage: discountPercentage,
      discountedPrice: discountedPrice,
      inStock: inStock,
      categories: categories,
    });
    alert(`"הוספת את ${title} לסל!"`);
  };

  const switchConsideration = () => {
    setIsConsidering((prev) => !prev);
  };

  // פונקציה לשינוי מצב הצגת הדירוג (תקרא כאשר הצ'קבוקס משתנה)
  const handleToggleRatingChange = () => {
    setShowRating((prev) => !prev);
  };

  const hasSignificantDiscount = discountPercentage >= 15 && price > 0;

  return (
    <div
      className={`book-card ${
        hasSignificantDiscount ? "significant-discount" : ""
      } ${!inStock ? "out-of-stock-card" : ""} ${
        isConsidering ? "considering-card" : ""
      }`}
    >
      <h3>{title}</h3>
      <p>
        <strong>מאת:</strong> {displayAuthor}
      </p>
      <div className="category-list">
        {categories.map((cat, index) => (
          <span key={index} className="category-tag">
            {cat}
          </span>
        ))}
      </div>
      <p>
        <strong>מחיר:</strong>{" "}
        {discountPercentage > 0 ? (
          <>
            <span className="original-price">{price.toFixed(2)} ₪</span>{" "}
            <span className="discounted-price">
              {discountedPrice.toFixed(2)} ₪
            </span>{" "}
            <span className="discount-percentage">
              ({discountPercentage}% הנחה)
            </span>
          </>
        ) : (
          `${price.toFixed(2)} ₪`
        )}
      </p>

      {/* תצוגת דירוג ממוצע קיימת */}
      {averageRating > 0 ? (
        <p className="average-rating">
          דירוג ממוצע: {averageRating.toFixed(1)} ({ratingCount} דירוגים)
        </p>
      ) : (
        <p className="no-rating">עדיין לא דורג</p>
      )}

      {/* מתג ה-ON/OFF החדש */}
      <div className="toggle-rating-container">
        <span className="toggle-label">דרג ספר:</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={showRating}
            onChange={handleToggleRatingChange}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* תנאי להצגת כלי הדירוג */}
      {showRating && (
        <div className="rating-section">
          <label>
            דרג ספר (1-5):
            <select
              onChange={(e) => onRate(parseInt(e.target.value))}
              className="rating-select"
            >
              <option value="">בחר דירוג</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
      )}

      <div className="book-actions">
        {inStock ? (
          <>
            <p>
              <strong>מלאי:</strong> {stockQuantity}
            </p>
            <div className="action-buttons">
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                הוסף לסל
              </button>
              <button className="consider-button" onClick={switchConsideration}>
                {isConsidering ? "ביטול התלבטות" : "מתלבט/ת לגביו"}
              </button>
            </div>
            <div className="stock-update">
              <input
                type="number"
                min={stockQuantity}
                value={stockInputValue}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setStockInputValue("");
                    return;
                  }
                  const numericVal = parseInt(val, 10);
                  if (!isNaN(numericVal) && numericVal >= stockQuantity) {
                    setStockInputValue(numericVal);
                  }
                }}
              />
              <button
                onClick={() => {
                  if (stockInputValue && stockInputValue >= stockQuantity) {
                    onStockUpdate(stockInputValue);
                  }
                }}
              >
                עדכן מלאי
              </button>

              <button className="delete-book-button" onClick={onDelete}>
                הסרת ספר
              </button>
            </div>
          </>
        ) : (
          <p className="out-of-stock-message">הספר אזל מהמלאי!</p>
        )}
      </div>
    </div>
  );
};

export default BookDisplay;

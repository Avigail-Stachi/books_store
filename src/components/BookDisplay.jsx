import React from "react";
import "../styles/BookDisplay.css";

const BookDisplay = ({ book }) => {
  const {
    title = "כותרת לא ידועה",
    author = null,
    price = 0,
    discountPercentage = 0,
    inStock = true,
    categories = [],
  } = book;

  const discountedPrice = price * (1 - discountPercentage / 100);
  const displayAuthor = author === null ? "anonymous" : author;

  const handleAddToCart = () => {
    alert(`"הוספת את ${title} לסל!"`);
  };

  const hasSignificantDiscount = discountPercentage >= 15;

  return (
    <div
      className={`book-card ${
        hasSignificantDiscount ? "significant-discount" : ""
      }`}
    >
      <h3>{title}</h3>
      <p className="book-author">מאת: {displayAuthor}</p>
      <div className="price-info">
        <span className="price-label-bold">מחיר: </span>
        {discountPercentage > 0 ? (
          <>
            <span className="original-price">{price.toFixed(2)} ש"ח</span>
            <span className="discounted-price">
              {discountedPrice.toFixed(2)} ש"ח
            </span>
          </>
        ) : (
          <span className="price-no-discount-value">
            {price.toFixed(2)} ש"ח
          </span>
        )}
      </div>

      {/* הצגת הקטגוריות של הספר */}
      {categories.length > 0 && (
        <div className="book-categories">
          <p className="categories-label">קטגוריות:</p>
          <ul className="categories-list">
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="stock-action-area">
        {!inStock ? (
          <p className="out-of-stock-message">הודעה: הספר אזל מהמלאי!</p>
        ) : (
          <button onClick={handleAddToCart} className="add-to-cart-button">
            הוסף לסל
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDisplay;

import React, { useState } from "react";
import "../styles/BookDisplay.css";

const BookDisplay = ({ book }) => {
  const {
    title = "כותרת לא ידועה",
    author = null,
    price = 0,
    discountPercentage = 0,
    stockQuantity = 0,
    categories = [],
  } = book;

  const [isConsidering, setIsConsidering] = useState(false);
  const [stockInputValue, setStockInputValue] = useState(stockQuantity);

  const handleStockUpdate = () => {
    const newAmount = parseInt(stockInputValue, 10);
    if (isNaN(newAmount) || newAmount < stockQuantity) {
      alert("נא להזין מספר תקין גדול או שווה לכמות הנוכחית במלאי.");
      setStockInputValue(stockQuantity);
      return;
    }
    const amountToAdd = newAmount - stockQuantity;
    if (amountToAdd === 0) {
      alert("לא נוספה כמות למלאי.");
      return;
    }
    book.stockQuantity += amountToAdd;
    alert(`הוספת ${amountToAdd} עותקים של ${title} למלאי!`);
  };

  const inStock = stockQuantity > 0; // בדיקה אם הספר במלאי
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

  const hasSignificantDiscount = discountPercentage >= 15;

  // קלאסים דינמיים עבור כרטיס הספר
  const cardClasses = [
    "book-card",
    hasSignificantDiscount && inStock ? "significant-discount" : "", // רק אם יש הנחה וגם במלאי
    !inStock ? "out-of-stock-card" : "", // אם אזל מהמלאי
    isConsidering ? "considering-card" : "",
  ]
    .filter(Boolean)
    .join(" "); // מסנן קלאסים ריקים ומחבר
  return (
    <div className={cardClasses}>
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
        {/* {stockQuantity > 0 && (
    <p className="stock-info">כמות במלאי: {stockQuantity}</p>
  )} */}

        {inStock ? (
          <>
            <div className="buttons-row">
              <button onClick={handleAddToCart} className="add-to-cart-button">
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
              <button onClick={handleStockUpdate}>עדכן מלאי</button>
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

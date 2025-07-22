import React, { useState } from "react";
import "../styles/AddBookForm.css";

function AddBookForm({ onAddBook, allCategories }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    discountPercentage: 0,
    stockQuantity: 0,
    categories: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" ||
      name === "discountPercentage" ||
      name === "stockQuantity"
        ? Number(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCategorySelectChange = (e) => {
    const val = e.target.value;

    if (val === "other") {
      setSelectedCategory("other");
      setCustomCategory("");
    } else {
      setSelectedCategory(val);
      setCustomCategory("");
      if (val && !formData.categories.includes(val)) {
        setFormData((prev) => ({
          ...prev,
          categories: [...prev.categories, val],
        }));
      }
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategory.trim();
    if (trimmed && !formData.categories.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, trimmed],
      }));
      setCustomCategory("");
      setSelectedCategory("");
    }
  };

  const handleRemoveCategory = (catToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== catToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      alert("אנא בחר לפחות קטגוריה אחת");
      return;
    }

    onAddBook(formData);

    setFormData({
      title: "",
      author: "",
      price: "",
      discountPercentage: 0,
      stockQuantity: 0,
      categories: [],
    });
    setSelectedCategory("");
    setCustomCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <label>
        שם הספר:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        שם הסופר:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        מחיר:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        אחוז הנחה:
        <input
          type="number"
          name="discountPercentage"
          value={formData.discountPercentage}
          onChange={handleChange}
        />
      </label>

      <label>
        כמות במלאי:
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        בחר קטגוריה:
        <select value={selectedCategory} onChange={handleCategorySelectChange}>
          <option value="">-- בחר קטגוריה --</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="other">אחר</option>
        </select>
      </label>

      {selectedCategory === "other" && (
        <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="הקלד קטגוריה חדשה"
            value={customCategory}
            onChange={handleCustomCategoryChange}
          />
          <button
            type="button"
            onClick={handleAddCustomCategory}
            disabled={!customCategory.trim()}
          >
            הוסף קטגוריה
          </button>
        </label>
      )}

      {formData.categories.length > 0 && (
        <div>
          <p>קטגוריות שנבחרו:</p>
          <ul>
            {formData.categories.map((cat) => (
              <li key={cat}>
                {cat}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(cat)}
                  aria-label={`הסר את הקטגוריה ${cat}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit">הוסף ספר</button>
    </form>
  );
}

export default AddBookForm;

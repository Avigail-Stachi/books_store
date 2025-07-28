import React from "react";
import { useNavigate } from "react-router-dom";
import AddBookForm from "../components/AddBookForm";

const AddBookPage = ({ onAddBook, allCategories }) => {
  const navigate = useNavigate();

  const handleAddBook = async (newBook) => {
    await onAddBook(newBook);
    navigate("/books");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">הוסף ספר חדש</h2>
      <AddBookForm onAddBook={handleAddBook} allCategories={allCategories} />
    </div>
  );
};

export default AddBookPage;

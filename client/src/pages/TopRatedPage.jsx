import React from "react";
import TopRatedBooks from "../components/TopRatedBooks";

const TopRatedPage = ({ refreshTrigger }) => {
  return (
    <div className="page-container">
      <h2 className="page-title">הספרים המדורגים ביותר</h2>
      <TopRatedBooks refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default TopRatedPage;

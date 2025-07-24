// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar"; // ייבא את ה-Navbar
import "../styles/App.css"; // או קובץ CSS ייעודי ללייאאוט אם יש

const Layout = ({ children }) => {
  return (
    <div className="App">
      {" "}
      {/* השתמש בקלאס של ה-App אם הוא מכיל עיצובים כלליים */}
      <header className="App-header">
        <h1>חנות ספרים</h1>
      </header>
      <Navbar />
      <main className="App-content">
        {" "}
        {/* תוכל להוסיף קלאס עבור התוכן הראשי */}
        {children}
      </main>
    </div>
  );
};

export default Layout;

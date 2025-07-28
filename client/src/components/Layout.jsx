import React from "react";
import Navbar from "./Navbar";
import "../styles/App.css";

const Layout = ({ children }) => {
  return (
    <div className="App">
      {" "}
      <header className="App-header">
        <h1>חנות ספרים</h1>
      </header>
      <Navbar />
      <main className="App-content"> {children}</main>
    </div>
  );
};

export default Layout;

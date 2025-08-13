import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-div">
        <h2 className="logo">
          Queen<span className="logo-highlight">B</span>
        </h2>
        <div className="nav-links">
          <p>link to..</p>
        </div>
      </div>
    </nav>
  );
}

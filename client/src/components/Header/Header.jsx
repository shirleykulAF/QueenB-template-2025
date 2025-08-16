import React from "react";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.bar}>
      <div className={s.container}>
        <div className={s.logo}>
          <span className={s.crown} aria-hidden>
            👑
          </span>
          <span className={s.title}>Queens Match</span>
        </div>

        <nav className={s.navigation}>
          <a href="#how-it-works" className={s.navLink}>
            How It Works
          </a>
          <a href="#about" className={s.navLink}>
            About
          </a>
          <a href="#contact" className={s.navLink}>
            Contact
          </a>
        </nav>

        <button className={s.mobileMenuBtn} aria-label="Menu">
          <span className={s.menuIcon}></span>
          <span className={s.menuIcon}></span>
          <span className={s.menuIcon}></span>
        </button>
      </div>
    </header>
  );
}

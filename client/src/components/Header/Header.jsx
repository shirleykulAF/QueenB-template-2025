import { useState, useEffect } from "react";
import s from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(null);
        // Redirect to home page
        window.location.href = '/';
      } else {
        console.error('Logout failed');
        alert('Failed to sign out. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <header className={s.bar}>
      <div className={s.container}>
        <a href="/" className={s.logo}>
          <span className={s.crown} aria-hidden>
            👑
          </span>
          <span className={s.title}>Queens Match</span>
        </a>

        <nav className={s.navigation}>
          {user ? (
            // Show sign out when logged in
            <div className={s.userSection}>
              <span className={s.welcomeText}>
                Welcome, {user.userType === 'mentor' ? 'Mentor' : 'Mentee'}!
              </span>
              <button 
                onClick={handleSignOut}
                className={s.signOutBtn}
              >
                Sign Out
              </button>
            </div>
          ) : (
            // Show navigation when not logged in
            <>
              <a href="#how-it-works" className={s.navLink}>
                How It Works
              </a>
              <a href="#about" className={s.navLink}>
                About
              </a>
              <a href="#contact" className={s.navLink}>
                Contact
              </a>
            </>
          )}
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
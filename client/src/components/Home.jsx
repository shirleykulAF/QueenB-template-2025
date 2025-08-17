import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import s from "./Home.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff5f7",
          color: "white",
          padding: "4rem 6rem",
          gap: "3rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "black",
            }}
          >
            Find Your Perfect Mentor
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "1rem",
              color: "black",
            }}
          >
            Empower your growth by connecting with mentors in our community.
          </p>
          <p style={{ fontSize: "1rem", maxWidth: "500px", color: "black" }}>
            QueenB helps ambitious individuals find experienced mentors who can
            guide them on their journey. Join thousands of mentees today and
            fast-track your path to success.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: "500px",
            background: "white",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            color: "black",
          }}
        >
          <LoginPage />
        </div>
      </section>

      <section id="how-it-works" className={s.section}>
        <div className={s.sectionContainer}>
          <div className={s.sectionHeader}>
            <h2>How It Works</h2>
            <p>Get started with QueenB in just four simple steps</p>
          </div>

          <div className={s.stepsGrid}>
            <div className={s.stepCard}>
              <div className={s.stepNumber}>1</div>
              <div className={s.stepIcon}>📝</div>
              <h3>Create Your Profile</h3>
              <p>Tell us about your</p>
            </div>
            <div className={s.stepCard}>
              <div className={s.stepNumber}>2</div>
              <div className={s.stepIcon}>🎯</div>
              <h3>Get Matched</h3>
              <p>You will be able to pick the perfect mentor for you</p>
            </div>
            <div className={s.stepCard}>
              <div className={s.stepNumber}>3</div>
              <div className={s.stepIcon}>💬</div>
              <h3>Start Mentoring</h3>
              <p>
                Launch powerful conversations that move you forward with your
                mentor
              </p>
            </div>
            <div className={s.stepCard}>
              <div className={s.stepNumber}>4</div>
              <div className={s.stepIcon}>🚀</div>
              <h3>Accelerate Growth</h3>
              <p>Track progress and advance your personal growth</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className={s.about}>
        <div className={s.aboutContent}>
          <div className={s.aboutGrid}>
            <div className={s.aboutText}>
              <h2>About QueenB</h2>
              <p>
                QueenB is a dynamic community dedicated to empowering young
                women in Israel by teaching them how to code and pursue careers
                in technology. <br></br>Founded by Noga Mann, Yasmin Dunsky, and
                Neta Moses, the organization aims to bridge the gender gap in
                the tech industry.
              </p>
              <p>
                Through small group sessions conducted in Hebrew or Arabic,
                QueenB fosters a supportive environment where creativity and
                confidence flourish.<br></br> The initiative also boasts a
                robust network offering continuous career support and
                professional development opportunities.
              </p>
              <div className={s.aboutHighlights}>
                <span className={s.highlightTag}>Coding Education</span>
                <span className={s.highlightTag}>Mentorship</span>
                <span className={s.highlightTag}>Career Support</span>
                <span className={s.highlightTag}>Community Building</span>
              </div>
            </div>

            <div className={s.aboutStats}>
              <div className={s.statItem}>
                <span className={s.statNumber}>5,000+</span>
                <span className={s.statLabel}>Network Members</span>
              </div>
              <div className={s.statItem}>
                <span className={s.statNumber}>100+</span>
                <span className={s.statLabel}>Active Mentors</span>
              </div>
              <div className={s.statItem}>
                <span className={s.statNumber}>3</span>
                <span className={s.statLabel}>Co-Founders</span>
              </div>
              <div className={s.statItem}>
                <span className={s.statNumber}>2</span>
                <span className={s.statLabel}>Languages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={s.contactSection}>
        <div className={s.sectionContainer}>
          <div className={s.sectionHeader}>
            <h2>Get In Touch</h2>
            <p>
              Have questions? We'd love to hear from you.<br></br> Reach out to
              us anytime.
            </p>
          </div>
          <div className={s.contactContent}>
            <div className={s.contactCard}>
              <div className={s.contactIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#f43f5e"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 13.065l-11-7.065v14h22v-14l-11 7.065z" />
                  <path d="M12 11.065l11-7.065h-22l11 7.065z" />
                </svg>
              </div>
             <div className={s.contactDetails}>
              <h4>Email Us</h4>
              <a 
                href="mailto:queenb.program@gmail.com" 
                className={s.contactValue}
              >
                queenb.program@gmail.com
              </a>
            </div>
            </div>

            <div className={s.contactCard}>
              <div className={s.contactIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#f43f5e"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.55.57 1 1 0 011 1v3.5a1 1 0 01-1 1C10.79 22 2 13.21 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.48.57 3.55a1 1 0 01-.27 1.11l-2.18 2.13z" />
                </svg>
              </div>
              <div className={s.contactDetails}>
                <h4>WhatsApp</h4>
                <a 
                  href="https://wa.me/972557258235" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={s.contactValue}
                >
                  +972 55-7258235
                </a>
              </div>
            </div>

            <div className={s.contactCard}>
              <div className={s.contactIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="3"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="17"
                    cy="12"
                    r="3"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="7"
                    cy="17"
                    r="3"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line
                    x1="9.5"
                    y1="8.5"
                    x2="14.5"
                    y2="10.5"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="9.5"
                    y1="15.5"
                    x2="14.5"
                    y2="13.5"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className={s.contactDetails}>
                <h4>Follow Us</h4>
                <div className={s.contactValue}>
                  <a
                    href="https://www.instagram.com/queenbprogram?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://www.facebook.com/groups/QueenBstudents/?rdid=QRCZvZxIxKOyYIgB&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F17P4VmtGnj%2F#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

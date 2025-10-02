import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "active" : ""}`}>
        <div className="brand">SkillCraft<span>Tech</span></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#vision">Vision</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Design the Future with SkillCraft</h1>
          <p>
            Build smart, modern, and interactive experiences for every device — from idea to impact.
          </p>
          <a href="#services" className="hero-btn">Explore More</a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section services">
        <h2>Our Core Features</h2>
        <div className="card-grid">
          <div className="card">
            <h3>🧠 Intelligent Design</h3>
            <p>UI that adapts and reacts dynamically to user behavior.</p>
          </div>
          <div className="card">
            <h3>🚀 Performance First</h3>
            <p>Lightning-fast architecture for seamless interaction.</p>
          </div>
          <div className="card">
            <h3>🎨 Aesthetic Minimalism</h3>
            <p>Clean visuals with functional depth and user delight.</p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="section dark">
        <div className="vision-box">
          <h2>Our Vision</h2>
          <p>
            To craft web experiences that inspire innovation — blending art, code, and purpose.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <h2>Let’s Connect</h2>
        <p>
          Want to collaborate or learn with us? Reach out anytime.
        </p>
        <a href="https://skillcrafttech.com/" className="contact-btn">Contact Us</a>
      </section>

      {/*  FOOTER  */}
      <footer>
        <p>© {new Date().getFullYear()} SkillCraft Technology. Crafted with 💙 by You.</p>
      </footer>
    </>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style/LandingPage.css";
import HeroImage from "../assets/hero.webp"; 

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">Online Medical Store</h1>
        <nav>
          <button onClick={() => navigate("/login")} className="btn login-btn">Login</button>
          <button onClick={() => navigate("/register")} className="btn register-btn">Register</button>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-left">
          <h2>Your Online Medical Store</h2>
          <p>Get your medicines delivered to your doorstep quickly and safely.</p>          
        </div>
        <div className="hero-right">
          <img src={HeroImage} alt="Medical Hero" />
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <h3>Fast Delivery</h3>
          <p>Receive your medicines at home in record time.</p>
        </div>
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>We are here to help you anytime.</p>
        </div>
        <div className="feature">
          <h3>Wide Range of Products</h3>
          <p>Prescription drugs, OTC, and wellness products.</p>
        </div>
      </section>
    </div>
  );
}

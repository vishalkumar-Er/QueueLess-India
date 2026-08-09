import { Link } from "react-router-dom";
import Chatbot from "../../components/Chatbot/Chatbot";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <div className="logo">
          📋 QueueLess India
        </div>

        <div className="nav-buttons">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/signup" className="signup-btn">
            Signup
          </Link>

          <Link to="/login" className="admin-btn">
            Admin Portal
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-left">

          <span className="hero-badge">
            🚀 Smart Queue Management
          </span>

          <h1>
            Skip the Queue.
            <br />
            <span>Save Your Time.</span>
          </h1>

          <p>
            Experience a smarter way to manage queues with
            QueueLess India. Book your queue online, track your
            live position and get served without standing in
            long waiting lines.
          </p>

          <Link to="/signup" className="primary-btn">
            🚀 Get Started
          </Link>

        </div>


        {/* ================= LIVE QUEUE CARD ================= */}
        <div className="hero-right">

          <div className="hero-card">

            <div className="card-title">
              📊 Live Queue Status
            </div>

            <div className="dashboard-item">
              <span>🏥 Department</span>
              <strong>Hospital OPD</strong>
            </div>

            <div className="dashboard-item">
              <span>🎟 Token</span>
              <strong>A-102</strong>
            </div>

            <div className="dashboard-item">
              <span>👥 People Ahead</span>
              <strong>03</strong>
            </div>

            <div className="dashboard-item">
              <span>⏱ Waiting Time</span>
              <strong>15 Minutes</strong>
            </div>

            <div className="dashboard-item">
              <span>📍 Status</span>
              <span className="waiting">
                Waiting
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features">

        <h2>Why Choose QueueLess?</h2>

        <p className="section-subtitle">
          Everything you need for a smarter queue experience.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🎟️</div>
            <h3>Smart Token</h3>
            <p>
              Get your digital token instantly without
              standing in a physical queue.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Live Tracking</h3>
            <p>
              Track your queue position and estimated
              waiting time in real time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h3>Email Alerts</h3>
            <p>
              Receive important booking and queue
              updates directly through email.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>
              Powerful insights and reports for
              efficient queue management.
            </p>
          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works">

        <h2>How It Works</h2>

        <p className="section-subtitle">
          Manage your queue in four simple steps.
        </p>

        <div className="steps">

          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>
              Register your account and get started
              with QueueLess India.
            </p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Book Queue</h3>
            <p>
              Select your department and book
              your digital queue token.
            </p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Live</h3>
            <p>
              Monitor your token position,
              people ahead and waiting time.
            </p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Service</h3>
            <p>
              Visit the counter when your turn
              is about to arrive.
            </p>
          </div>

        </div>

      </section>


{/* ================= FOOTER ================= */}
<footer
  className="footer"
  style={{
    width: "100%",
    margin: 0,
    padding: "15px 20px 8px",
    minHeight: "0",
    height: "auto",
    boxSizing: "border-box",
    textAlign: "center",
    background: "#020617",
  }}
>

  <div
    className="footer-logo"
    style={{
      fontSize: "22px",
      fontWeight: "700",
      margin: "0 0 3px",
      lineHeight: "1.2",
      color: "#60a5fa",
    }}
  >
    📋 QueueLess India
  </div>

  <p
    style={{
      margin: "3px 0",
      fontSize: "13px",
      lineHeight: "1.3",
      color: "#94a3b8",
    }}
  >
    Smart Queue Management Platform
  </p>

  <div
    className="footer-links"
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      margin: "8px 0",
    }}
  >
    <a href="#" style={{ fontSize: "13px" }}>
      GitHub
    </a>

    <a href="#" style={{ fontSize: "13px" }}>
      LinkedIn
    </a>

    <a href="#" style={{ fontSize: "13px" }}>
      Contact
    </a>
  </div>

  <div
    className="footer-line"
    style={{
      width: "350px",
      maxWidth: "70%",
      height: "1px",
      margin: "8px auto",
      background: "rgba(255,255,255,0.1)",
    }}
  />

  <p
    className="copyright"
    style={{
      margin: 0,
      fontSize: "11px",
      lineHeight: "1.3",
      color: "#64748b",
    }}
  >
    © 2026 QueueLess India. All rights reserved.
  </p>

</footer>


      {/* ================= CHATBOT ================= */}
      <Chatbot />

    </div>
  );
}

export default Landing;
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.css";
import App from "./App.jsx";

// Simple router-less switch between landing and app
function Main() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <App />;
  }

  return (
    <div
      className={"dark"}
      style={{
        backgroundColor: "#0b1220",
        color: "#e0e0ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.2rem 2rem",
          borderBottom: "1px solid #1c2333",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e0e0ff" }}>
          Algorithm Visualizer
        </h1>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#e0e0ff",
          }}
        >
          Visualize Algorithms in Real Time
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#b9b9dd",
            maxWidth: "600px",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Explore sorting, trees, stacks, queues, and more interactively.
          Watch algorithms come alive with animations, step controls, and
          pseudocode.
        </p>
        <button
          onClick={() => setShowApp(true)}
          style={{
            backgroundColor: "#5a3fc0",
            color: "white",
            padding: "14px 28px",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7d61ff")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a3fc0")}
        >
          Start Visualizing
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid #1c2333",
          color: "#8b8fb3",
          fontSize: "0.9rem",
        }}
      >
        © {new Date().getFullYear()} Algorithm Visualizer — Built by Manan Kakkar
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

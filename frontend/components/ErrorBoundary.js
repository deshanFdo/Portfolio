"use client";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#050508",
            color: "#fff",
            fontFamily: "'Orbitron', monospace",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#00D2BE" }}>
            Something went wrong
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", maxWidth: "400px" }}>
            Even F1 cars break down sometimes. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "transparent",
              border: "1px solid #00D2BE",
              color: "#00D2BE",
              padding: "0.8rem 2rem",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.9rem",
              cursor: "pointer",
              letterSpacing: "2px",
            }}
          >
            RELOAD
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

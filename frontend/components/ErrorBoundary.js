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
            background: "#06101b",
            color: "#f7f9ff",
            fontFamily: "'Orbitron', monospace",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#88A8FF" }}>
            Something went wrong
          </h1>
          <p style={{ color: "rgba(220,230,244,0.68)", marginBottom: "2rem", maxWidth: "400px" }}>
            The interface hit an unexpected state. Refresh to restore the portfolio runtime.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "transparent",
              border: "1px solid #88A8FF",
              color: "#88A8FF",
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

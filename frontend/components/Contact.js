"use client";
import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder - add your form handling logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          <span className={styles.sectionNumber}>05</span>
          <h2 className={styles.h2}>Get in Touch</h2>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.grid}>
          {/* Left content */}
          <div className={styles.content}>
            <h3 className={styles.contentTitle}>
              Ready to start your next project?
            </h3>
            <p className={styles.contentDesc}>
              Whether you have a project in mind, want to collaborate, or just 
              want to say hello — I'd love to hear from you. Let's build something 
              amazing together.
            </p>
            
            <div className={styles.contactMethods}>
              <a href="mailto:your@email.com" className={styles.contactMethod}>
                <span className={styles.methodIcon}>📧</span>
                <span className={styles.methodLabel}>Email</span>
                <span className={styles.methodValue}>your@email.com</span>
              </a>
              <a href="#" className={styles.contactMethod}>
                <span className={styles.methodIcon}>💼</span>
                <span className={styles.methodLabel}>LinkedIn</span>
                <span className={styles.methodValue}>Connect with me</span>
              </a>
              <a href="#" className={styles.contactMethod}>
                <span className={styles.methodIcon}>🐙</span>
                <span className={styles.methodLabel}>GitHub</span>
                <span className={styles.methodValue}>Check my code</span>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <span className={styles.formIcon}>🏎️</span>
              <span>Send a Message</span>
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input 
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder="What should I call you?"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input 
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="Where can I reach you?"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea 
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="Tell me about your project..."
                rows={5}
                value={formState.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`${styles.button} ${submitted ? styles.submitted : ''}`}
            >
              {submitted ? (
                <>
                  <span className={styles.checkmark}>✓</span>
                  Message Sent!
                </>
              ) : (
                <>
                  <span className={styles.buttonIcon}>🚀</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Checkered pattern accent */}
      <div className={styles.checkeredAccent} aria-hidden="true"></div>
    </section>
  );
}

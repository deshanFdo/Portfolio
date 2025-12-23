"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Contact.module.css";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const email = process.env.NEXT_PUBLIC_EMAIL || "hello@example.com";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "#";
  const phone = process.env.NEXT_PUBLIC_PHONE || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.headerLabel}>Get in</span>
          <h2 className={styles.headerTitle}>Touch</h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.infoText}>
              Interested in working together? Feel free to reach out for 
              collaborations or just a friendly hello.
            </p>

            <div className={styles.links}>
              <a href={`mailto:${email}`} className={styles.link}>
                <span className={styles.linkLabel}>Email</span>
                <span className={styles.linkValue}>{email}</span>
              </a>
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.link}>
                  <span className={styles.linkLabel}>Phone</span>
                  <span className={styles.linkValue}>{phone}</span>
                </a>
              )}
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span className={styles.linkLabel}>LinkedIn</span>
                <span className={styles.linkValue}>Profile →</span>
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span className={styles.linkLabel}>GitHub</span>
                <span className={styles.linkValue}>Profile →</span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="Your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Your message"
                rows={5}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Sent ✓"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

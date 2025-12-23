"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import NorrisText from "./NorrisText";
import styles from "./Contact.module.css";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Get in</span>
          <a href="#contact">
            <NorrisText text="Touch" fontSize="clamp(3rem, 10vw, 7rem)" />
          </a>
        </motion.div>

        <div className={styles.grid}>
          {/* Links */}
          <motion.div
            className={styles.links}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a href={`mailto:${email}`} className={styles.link}>
              <span className={styles.linkLabel}>Email</span>
              <NorrisText text={email} fontSize="1rem" />
            </a>
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.link}>
                <span className={styles.linkLabel}>Phone</span>
                <NorrisText text={phone} fontSize="1rem" />
              </a>
            )}
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkLabel}>LinkedIn</span>
              <NorrisText text="View Profile" fontSize="1rem" />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkLabel}>GitHub</span>
              <NorrisText text="View Profile" fontSize="1rem" />
            </a>
          </motion.div>

          {/* Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                required
              />
            </div>
            <button type="submit" disabled={status === "sending"}>
              {status === "idle" && <NorrisText text="Send Message" fontSize="0.9rem" />}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent ✓"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

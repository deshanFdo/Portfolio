"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Contact.module.css";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  // Use environment variables with fallbacks
  const email = process.env.NEXT_PUBLIC_EMAIL || "your@email.com";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "#";
  const phone = process.env.NEXT_PUBLIC_PHONE || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const contactMethods = [
    { icon: "📧", label: "Email", value: email, href: `mailto:${email}` },
    { icon: "💼", label: "LinkedIn", value: linkedin.replace("https://", ""), href: linkedin },
    { icon: "🐙", label: "GitHub", value: github.replace("https://", ""), href: github },
    ...(phone ? [{ icon: "📱", label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` }] : [])
  ];

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.inner}>
        {/* Section header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionNumber}>05</span>
          <h2 className={styles.title}>GET_IN_TOUCH</h2>
          <div className={styles.titleLine} />
        </motion.div>

        <div className={styles.grid}>
          {/* Left content */}
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className={styles.contentTitle}>
              Let's build something <span>amazing</span> together.
            </h3>
            <p className={styles.contentDesc}>
              I'm currently open to new opportunities and collaborations.
              Whether you have a project in mind, want to discuss technology,
              or just want to say hi — my inbox is always open.
            </p>

            <div className={styles.contactMethods}>
              {contactMethods.map((method, i) => (
                <motion.a 
                  key={i}
                  href={method.href}
                  className={styles.contactMethod}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
                  whileHover={{ x: 10, borderColor: "var(--petronas-teal)" }}
                >
                  <span className={styles.methodIcon}>{method.icon}</span>
                  <div className={styles.methodInfo}>
                    <span className={styles.methodLabel}>{method.label}</span>
                    <span className={styles.methodValue}>{method.value}</span>
                  </div>
                  <span className={styles.methodArrow}>→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form 
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={styles.formHeader}>
              <span className={styles.formIcon}>{">"}</span>
              <span>Send a Message</span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="What should I call you?"
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
                placeholder="Where can I reach you?"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={5}
                required
              />
            </div>

            <motion.button
              type="submit"
              className={`${styles.submitBtn} ${status === 'sent' ? styles.sent : ''}`}
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'idle' && (
                <>
                  <span>Send Message</span>
                  <span className={styles.btnIcon}>🚀</span>
                </>
              )}
              {status === 'sending' && (
                <span className={styles.sending}>Sending...</span>
              )}
              {status === 'sent' && (
                <>
                  <span>Message Sent!</span>
                  <span className={styles.btnIcon}>✓</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

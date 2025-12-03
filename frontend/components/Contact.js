"use client";
import React from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <h2 className={styles.h2}>Contact</h2>
        <p className={styles.lead}>Drop a message. This is a placeholder form.</p>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.row}>
            <input className={styles.input} placeholder="Your name" />
            <input className={styles.input} placeholder="Email" />
          </div>
          <textarea className={styles.textarea} placeholder="Message" rows={4} />
          <div className={styles.actions}>
            <button className={styles.button} type="submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("xknlreor");
  const [showPopup, setShowPopup] = useState(false);

  const handleOnSubmit = async (e) => {
    await handleSubmit(e);
    if (state.succeeded) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  };

  if (showPopup) {
    return (
      <div style={styles.popup}>
        <p>We will get back to you soon!</p>
      </div>
    );
  }

  return (
     <div style={styles.contactFormContainer}>
      <h1 style={styles.heading}>Contact Us</h1>
      <form onSubmit={handleOnSubmit} style={styles.form}>
        <label htmlFor="name" style={styles.label}>
          Full Name
        </label>
        <input id="name" type="text" name="name" style={styles.input} />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <label htmlFor="email" style={styles.label}>
          Email Address
        </label>
        <input id="email" type="email" name="email" style={styles.input} />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="phone" style={styles.label}>
          Phone Number
        </label>
        <input id="phone" type="tel" name="phone" style={styles.input} />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />

        <label htmlFor="message" style={styles.label}>
          Message
        </label>
        <textarea id="message" name="message" style={styles.textarea} />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <button type="submit" disabled={state.submitting} style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  contactFormContainer: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "15px",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#555",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    resize: "none",
    minHeight: "100px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "5px",
    backgroundColor: "#9155FD",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  },
  popup: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    zIndex: 1000,
  },
};

export default function ContactUs(){
    return <ContactForm/>
}
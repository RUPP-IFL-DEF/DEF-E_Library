import React, { useRef } from 'react';
import Header from '../../../components/section/Header';
import Footer from '../../../components/section/Footer';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    // Construct mailto URL
    const mailtoLink = `mailto:savuth75@gmail.com?subject=Feedback from ${name}&body=From: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = mailtoLink;

    form.reset();
  };

  return (
    <>
      <Header />

      <section className="contact__banner">
        <img src="/2.jpg" alt="Contact Banner" className="contact__image" />
        <div className="contact__overlay">
          <h1 className="contact__title">Contact & Feedback</h1>
        </div>
      </section>

      <main className="contact__main">
        <section className="contact__info">
          <h2>Office</h2>
          <p>Senate of the Kingdom of Cambodia</p>
          <p>Preah Norodom Blvd (41), Palace Chamkarmorn</p>
          <p>Phnom Penh, Cambodia</p>

          <h2>Contact</h2>
          <p><strong>Phone:</strong> +855 77 771 721</p>
          <p><strong>Email:</strong> <a href="mailto:savuth75@gmail.com">savuth75@gmail.com</a></p>

          <h2>Follow Us</h2>
          <a
            href="https://www.facebook.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
          >
            <img src="/facebook.png" alt="Facebook" className="contact__icon" />
            Facebook
          </a>
        </section>

        <section className="contact__form">
          <h2>Send Feedback</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;

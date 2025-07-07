import React, { useEffect, useRef } from 'react';
import "./componentStyles/Contact.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState} from 'react';
import emailjs from "@emailjs/browser";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function Contact() {
  const contactRef = useRef([]);
  contactRef.current = [];
  const addToRefs = (el) => {
    if (el && !contactRef.current.includes(el)) {
      contactRef.current.push(el);
    }
  };
  useEffect(() => {
    contactRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play pause resume reset',
          },
        }
      );
    });
  }, []);


  const formRef = useRef();
  const [status, setStatus] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vnru49o",
        "template_d9mx1sw",
        formRef.current,
        "VXJtCtdD8ygUEDRcJ"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Failed to send message. Please try again later.");
        }
      );
  };
  return (
    <section id='contact' className="contact-section-container">
      <h1 ref={addToRefs} className='contact-section-heading'>Contact Me</h1>
      <div className="contact-section">
        <div className="contact-static-container">
          <h2 ref={addToRefs} className='contact-h2' >Get in Touch</h2>
          <div className="contact-static-info">
            <div ref={addToRefs} className="contact">
              <div className="contact-logo">
                <p><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /></p>
              </div>
              <div className="contact-info">
                <p className="contact-heading">Email</p>
                <p className="contact-main">hk747p@gmail.com</p>
              </div>
            </div>
            <div ref={addToRefs} className="contact">
              <div className="contact-logo">
                <p><FontAwesomeIcon icon={faPhone} style={{color: "#ffffff",}} /></p>
              </div>
              <div className="contact-info">
                <p className="contact-heading">Phone</p>
                <p className="contact-main">+91 6375019785</p>
              </div>
            </div>
            <div ref={addToRefs} className="contact">
              <div className="contact-logo">
                <p><FontAwesomeIcon icon={faLocationDot} style={{color: "#ffffff",}} /></p>
              </div>
              <div className="contact-info">
                <p className="contact-heading">Location</p>
                <p className="contact-main">Jodhpur, Rajasthan</p>
              </div>
            </div>
            <div ref={addToRefs} className="contact">
              <div className="contact-logo">
                <p><FontAwesomeIcon icon={faLinkedin} style={{color: "#ffffff",}} /></p>
              </div>
              <div className="contact-info">
                <p className="contact-heading">Linkedin</p>
                <p className="contact-main">linkedin.com/in/sindhihassan</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-message-container">
          <h2 ref={addToRefs} className="contact-h2">Send me a messsage</h2>
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div ref={addToRefs} className="contact-user-info-container">
              <div className="contact-user-info">
                <p className='contact-input-description'>Name</p>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  required
                  className="contact-input"
                />
              </div>
              <div className="contact-user-info">
                <p className='contact-input-description'>Email</p>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  required
                  className="contact-input"
                />
              </div>
            </div>
            <div ref={addToRefs} className="contact-user-message">
              <div className="contact-message-text">
                <p className="contact-input-description">Message</p>
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className="contact-input-message"
              ></textarea>
            </div>
            <button
              ref={addToRefs}
              type="submit"
              className="contact-submit-button"
            >
              Submit Message
            </button>
          </form>
          {status && <p className="contact-output">{status}</p>}
        </div>
      </div>
      
    </section>
  );
}

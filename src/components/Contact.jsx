import React, { useEffect, useRef, useState } from 'react';
import "./componentStyles/Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import emailjs from "@emailjs/browser";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerText from './utils/StaggerText';
import MagneticButton from './utils/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef    = useRef(null);
  const formRef       = useRef(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Panels
      gsap.fromTo(
        '.contact-panel-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      
      gsap.fromTo(
        '.contact-panel-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formData = new FormData(formRef.current);
    const userEmail = formData.get("from_email");

    if (!emailRegex.test(userEmail)) {
      setStatus("Error: Please enter a valid email address.");
      return;
    }

    setStatus("");
    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setIsSubmitting(false);
          formRef.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Failed to send message. Please try again later.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id='contact' className="py-16 md:py-32 relative z-10" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="contact-header text-center md:text-left mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient mb-2">
            <StaggerText text="Contact Me" />
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] font-mono">Let's build something amazing</p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left Panel */}
          <div className="contact-panel-left flex flex-col justify-center space-y-10">
            <div>
              <h3 className="text-3xl font-clash font-bold text-[var(--text-primary)] mb-2">Get in Touch</h3>
              <p className="text-[var(--text-secondary)]">Feel free to reach out for collaborations or just a friendly hello.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-xl text-emerald-500 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] font-mono mb-1">Email</p>
                  <p className="text-lg text-[var(--text-primary)] font-medium transition-colors">hk747p@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-xl text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10 group-hover:border-[var(--accent-primary)]/30 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] font-mono mb-1">Phone</p>
                  <p className="text-lg text-[var(--text-primary)] font-medium transition-colors">+91 6375019785</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-xl text-[var(--accent-secondary)] group-hover:bg-[var(--accent-secondary)]/10 group-hover:border-[var(--accent-secondary)]/30 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] font-mono mb-1">Location</p>
                  <p className="text-lg text-[var(--text-primary)] font-medium transition-colors">Jodhpur, Rajasthan</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-xl text-blue-400 group-hover:bg-blue-400/10 group-hover:border-blue-400/30 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] font-mono mb-1">LinkedIn</p>
                  <p className="text-lg text-[var(--text-primary)] font-medium transition-colors">linkedin.com/in/hassansindhi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="contact-panel-right">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-diffused)] p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--accent-secondary)] opacity-20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[var(--accent-primary)] opacity-20 blur-[100px] rounded-full pointer-events-none" />
              
              <h3 className="text-2xl font-clash font-bold text-[var(--text-primary)] mb-8 relative z-10">Send me a message</h3>
              
              <form ref={formRef} onSubmit={sendEmail} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="text"
                      name="from_name"
                      placeholder="Your Name"
                      required
                      className="w-full bg-[var(--input-bg)] focus:bg-[var(--input-focus-bg)] border-b border-[var(--border-subtle)] pb-3 pt-3 px-4 rounded-t-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-all peer cursor-none"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-300 peer-focus:w-full" />
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      name="from_email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-[var(--input-bg)] focus:bg-[var(--input-focus-bg)] border-b border-[var(--border-subtle)] pb-3 pt-3 px-4 rounded-t-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-all peer cursor-none"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-300 peer-focus:w-full" />
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows="4"
                    className="w-full bg-[var(--input-bg)] focus:bg-[var(--input-focus-bg)] border-b border-[var(--border-subtle)] pb-3 pt-3 px-4 rounded-t-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-all peer resize-none cursor-none"
                  ></textarea>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-300 peer-focus:w-full" />
                </div>

                <div className="pt-4">
                  <MagneticButton>
                    <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-[var(--accent-primary)] text-white rounded-full font-medium hover:bg-[var(--accent-secondary)] hover:shadow-[0_0_15px_var(--accent-secondary)] transition-all cursor-none flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit Message"
                      )}
                    </button>
                  </MagneticButton>
                </div>
                
                {status && (
                  <p className={`mt-4 font-mono text-sm ${status.startsWith("Error") || status.startsWith("Failed") ? "text-red-400" : "text-emerald-500"}`}>
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';

const ImprovedContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurant: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', restaurant: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-content">
          {/* Left Side - Info */}
          <div className="contact-info">
            <div className="contact-eyebrow">LET&apos;S TALK</div>
            <h2 className="contact-title">Have questions?<br />We&apos;re here to help.</h2>
            <p className="contact-subtitle">
              Whether you need a demo, have a question, or want custom features for your restaurant — just reach out.
            </p>

            <div className="contact-details">
              <a href="mailto:asmamewadmasuofficial@gmail.com" className="contact-detail">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-label">Email us</div>
                  <div className="contact-value">asmamewadmasuofficial@gmail.com</div>
                </div>
              </a>

              <a href="tel:+251910113474" className="contact-detail">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Call or WhatsApp</div>
                  <div className="contact-value">+251 910 113 474</div>
                </div>
              </a>

              <div className="contact-detail">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Visit us</div>
                  <div className="contact-value">Bole, Addis Ababa</div>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://t.me/Acu_404" className="social-link">Telegram</a>
              <a href="https://t.me/Acu_404" className="social-link">Instagram</a>
              <a href="https://t.me/Acu_404" className="social-link">Facebook</a>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form-wrapper">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-header">
                  <h3>Send us a message</h3>
                  <p>We usually reply within a few hours.</p>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Abebe Kebede"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@restaurant.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Restaurant Name <span className="optional">(optional)</span></label>
                  <input
                    type="text"
                    name="restaurant"
                    value={formData.restaurant}
                    onChange={handleInputChange}
                    placeholder="Habesha Kitchen"
                  />
                </div>

                <div className="form-field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hi! I'd like to know more about..."
                    rows={5}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner" />
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="success-state">
                <div className="success-icon">🎉</div>
                <h3>Message sent successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={resetForm} className="reset-button">
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: #0f2417;
          padding: 100px 24px;
          color: white;
        }

        .contact-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 80px;
          align-items: start;
        }

        .contact-info {
          padding-top: 20px;
        }

        .contact-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
          display: inline-block;
          padding: 5px 16px;
          border-radius: 50px;
          border: 1px solid rgba(74, 222, 128, 0.3);
          margin-bottom: 16px;
        }

        .contact-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(30px, 3.6vw, 46px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          letter-spacing: -0.6px;
          margin: 0 0 18px;
        }

        .contact-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin: 0 0 42px;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 42px;
        }

        .contact-detail {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-decoration: none;
          color: white;
          transition: opacity 0.2s;
        }

        .contact-detail:hover {
          opacity: 0.8;
        }

        .contact-icon {
          width: 42px;
          height: 42px;
          background: rgba(74, 222, 128, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .contact-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 2px;
        }

        .contact-value {
          font-size: 15px;
          font-weight: 500;
        }

        .contact-socials {
          display: flex;
          gap: 12px;
        }

        .social-link {
          padding: 8px 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.2s;
        }

        .social-link:hover {
          background: rgba(74, 222, 128, 0.15);
          border-color: #4ade80;
          color: #4ade80;
        }

        /* Form */
        .contact-form-wrapper {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 42px;
          backdrop-filter: blur(12px);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-header h3 {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0 0 6px;
        }

        .form-header p {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-field label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
        }

        .optional {
          color: rgba(255,255,255,0.35);
          font-weight: 400;
        }

        .form-field input,
        .form-field textarea {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 15px;
          color: white;
          font-family: inherit;
          outline: none;
          transition: all 0.2s;
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .form-field input:focus,
        .form-field textarea:focus {
          border-color: #4ade80;
          background: rgba(255,255,255,0.08);
        }

        .form-field textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #16a34a;
          color: white;
          border: none;
          padding: 15px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .submit-button:hover:not(:disabled) {
          background: #15803d;
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success State */
        .success-state {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          font-size: 52px;
          margin-bottom: 16px;
        }

        .success-state h3 {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0 0 10px;
        }

        .success-state p {
          color: rgba(255,255,255,0.6);
          margin: 0 0 24px;
          line-height: 1.6;
        }

        .reset-button {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          padding: 10px 22px;
          border-radius: 10px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-button:hover {
          border-color: rgba(255,255,255,0.4);
          color: white;
        }

        @media (max-width: 900px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ImprovedContact;
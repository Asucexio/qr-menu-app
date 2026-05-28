'use client';

import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Build your menu",
      description: "Sign up in 30 seconds. Add your restaurant name, create categories, and add dishes with prices and beautiful photos.",
      time: "5 min"
    },
    {
      number: "02",
      title: "Generate your QR code",
      description: "One click and your unique QR code is ready. Download it, print on table cards, or display it anywhere.",
      time: "30 sec"
    },
    {
      number: "03",
      title: "Customers scan & enjoy",
      description: "Guests scan the QR with their phone camera. Your stunning menu loads instantly — no app needed.",
      time: "Instant"
    }
  ];

  return (
    <section className="how-section" id="how">
      <div className="how-container">
        <div className="how-header">
          <div className="how-eyebrow">SIMPLE PROCESS</div>
          <h2 className="how-title">Go live in under 10 minutes</h2>
          <p className="how-subtitle">
            No technical skills required. Just follow these 3 easy steps.
          </p>
        </div>

        <div className="how-content">
          {/* Left Side - Mascot Image */}
          <div className="how-image-side">
            <img 
              src="https://ik.imagekit.io/sl226drpx/grok-image-f2dcf043-daa9-4844-be3f-16c6e6592600-removebg-preview.png" 
              alt="Umenu Chef Mascot" 
              className="how-mascot-img"
            />
          </div>

          {/* Right Side - Vertical Steps */}
          <div className="how-steps-side">
            {steps.map((step, index) => (
              <div key={index} className="how-step-vertical">
                <div className="step-number">{step.number}</div>
                
                <div className="step-details">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-time-badge">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="how-bottom">
          <a href="/signup" className="how-cta-button">
            Start building your menu free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <p className="how-cta-note">No credit card required • Cancel anytime</p>
        </div>
      </div>

      <style>{`
        .how-section {
          background: #f8fafc;
          padding: 100px 24px;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .how-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .how-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .how-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #16a34a;
          background: #f0fdf4;
          display: inline-block;
          padding: 5px 16px;
          border-radius: 50px;
          border: 1px solid #bbf7d0;
          margin-bottom: 12px;
        }

        .how-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(34px, 3.8vw, 48px);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.1;
          letter-spacing: -0.8px;
          margin: 0 0 16px;
        }

        .how-subtitle {
          font-size: 17px;
          color: #666;
          max-width: 480px;
          margin: 0 auto;
        }

       .how-content {
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 2px;
          align-items: start;
        }

        /* Left Side - Image */
        .how-image-side {
          position: sticky;
          top: 100px;
        }

             .how-mascot-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.25));
          border-radius: 24px;
        }

        /* Right Side - Vertical Steps */
        .how-steps-side {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .how-step-vertical {
          display: flex;
          gap: 24px;
          background: white;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .how-step-vertical:hover {
          border-color: #16a34a;
          transform: translateX(8px);
          box-shadow: 0 20px 40px rgba(22, 163, 74, 0.1);
        }

        .step-number {
          font-family: 'Instrument Serif', serif;
          font-size: 48px;
          font-weight: 700;
          color: #16a34a;
          line-height: 1;
          flex-shrink: 0;
          width: 70px;
        }

        .step-details {
          flex: 1;
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin: 0 0 10px;
        }

        .step-description {
          font-size: 15px;
          color: #555;
          line-height: 1.7;
          margin: 0 0 16px;
        }

        .step-time-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: #16a34a;
          background: #f0fdf4;
          padding: 5px 14px;
          border-radius: 50px;
        }

        .how-bottom {
          text-align: center;
          margin-top: 70px;
        }

        .how-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #16a34a;
          color: white;
          font-size: 15px;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35);
        }

        .how-cta-button:hover {
          background: #15803d;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(22, 163, 74, 0.45);
        }

        .how-cta-note {
          margin-top: 14px;
          font-size: 13px;
          color: #888;
        }

        @media (max-width: 900px) {
          .how-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .how-image-side {
            position: static;
            text-align: center;
          }
          
          .how-mascot-img {
            max-width: 320px;
          }
          
          .how-step-vertical {
            flex-direction: column;
            text-align: center;
          }
          
          .step-number {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
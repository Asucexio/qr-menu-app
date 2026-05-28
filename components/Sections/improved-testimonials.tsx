'use client';

import React from 'react';

const ImprovedTestimonials = () => {
  const testimonials = [
    {
      name: "Tigist Haile",
      role: "Owner, Yod Restaurant",
      text: "Setup took less than 30 minutes. Now I update my menu from my phone while I'm at the market. No more printing!",
      stars: 5,
      initials: "TH"
    },
    {
      name: "Dawit Mulugeta",
      role: "Manager, Addis Coffee House",
      text: "My customers are impressed every time they scan the QR. The menu looks so professional and loads instantly.",
      stars: 5,
      initials: "DM"
    },
    {
      name: "Sara Tesfaye",
      role: "Owner, Kategna Bole",
      text: "I have 3 different menus — breakfast, lunch, and dinner. Switching between them is one tap. Amazing!",
      stars: 5,
      initials: "ST"
    },
    {
      name: "Yonas Bekele",
      role: "Owner, Gusto Restaurant",
      text: "The best investment for my restaurant this year. Customers love it and I save money on printing every month.",
      stars: 5,
      initials: "YB"
    },
    {
      name: "Meron Alemu",
      role: "Manager, Lucy Restaurant",
      text: "When we run out of a dish we just hide it from the app. No more awkward conversations with customers.",
      stars: 5,
      initials: "MA"
    },
    {
      name: "Kirubel Tadesse",
      role: "Owner, 2000 Habesha",
      text: "Incredibly easy to use. I added photos to every dish and my customers always comment on how beautiful it looks.",
      stars: 5,
      initials: "KT"
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-eyebrow">REAL STORIES</div>
          <h2 className="testimonials-title">Loved by restaurant owners across Ethiopia</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="testimonial-text">"{t.text}"</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background: #fff;
          padding: 100px 24px;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .testimonials-eyebrow {
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
          margin-bottom: 14px;
        }

        .testimonials-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(30px, 3.5vw, 44px);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.15;
          letter-spacing: -0.6px;
          margin: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }

        .testimonial-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .testimonial-card:hover {
          border-color: #16a34a;
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(22, 163, 74, 0.08);
        }

        .testimonial-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 18px;
        }

        .testimonial-text {
          font-size: 15px;
          color: #444;
          line-height: 1.7;
          flex: 1;
          margin: 0 0 24px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .testimonial-avatar {
          width: 44px;
          height: 44px;
          background: #16a34a;
          color: white;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          flex-shrink: 0;
        }

        .testimonial-name {
          font-size: 14.5px;
          font-weight: 700;
          color: #111;
        }

        .testimonial-role {
          font-size: 13px;
          color: #888;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ImprovedTestimonials;
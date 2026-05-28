'use client';

import React from 'react';

const ImprovedWhyMenuQR = () => {
  const problems = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="14" rx="2"/>
          <path d="M7 21h10M7 17h10"/>
        </svg>
      ),
      title: "Reprinting menus every time prices change",
      problem: "Paying the printer again and again for small updates.",
      solution: "Update prices instantly from your phone. The QR never changes."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l2 2"/>
        </svg>
      ),
      title: "Customers ordering sold-out dishes",
      problem: "Waiters have to tell customers the dish is unavailable.",
      solution: "Hide any item in one tap. It disappears from every phone instantly."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3C7 3 3 7 3 12c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Dirty physical menus",
      problem: "Hundreds of people touch the same laminated menu every day.",
      solution: "Every customer uses their own phone. No shared surfaces."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <circle cx="8" cy="11" r="1.5"/>
          <path d="M3 16l4-3 3 3 3-4 4 4"/>
        </svg>
      ),
      title: "Text-only menus with no photos",
      problem: "Customers don’t know what the food looks like.",
      solution: "Add beautiful photos to every dish. Customers order with confidence."
    }
  ];

  return (
    <section className="why-section" id="problems">
      <div className="why-container">
        <div className="why-header">
          <div className="why-eyebrow">WHY MENUQR</div>
          <h2 className="why-title">We solve real problems<br />Ethiopian restaurants face every day</h2>
          <p className="why-subtitle">Simple solutions to the frustrations you know too well.</p>
        </div>

        <div className="why-grid">
          {problems.map((item, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{item.icon}</div>
              
              <h3 className="why-card-title">{item.title}</h3>
              
              <div className="why-problem">
                <span className="why-dot bad">✕</span>
                <p>{item.problem}</p>
              </div>
              
              <div className="why-solution">
                <span className="why-dot good">✓</span>
                <p>{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-section {
          background: #f8fafc;
          padding: 90px 24px;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .why-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .why-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .why-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #16a34a;
          background: #f0fdf4;
          display: inline-block;
          padding: 5px 16px;
          border-radius: 50px;
          border: 1px solid #bbf7d0;
          margin-bottom: 14px;
        }

        .why-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(30px, 3.6vw, 44px);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.15;
          letter-spacing: -0.6px;
          margin: 0 0 14px;
        }

        .why-subtitle {
          font-size: 16px;
          color: #666;
          max-width: 420px;
          margin: 0 auto;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .why-card {
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 18px;
          padding: 32px 28px;
          transition: all 0.3s ease;
        }

        .why-card:hover {
          border-color: #16a34a;
          box-shadow: 0 10px 30px rgba(22, 163, 74, 0.08);
          transform: translateY(-4px);
        }

        .why-icon {
          width: 56px;
          height: 56px;
          background: #f0fdf4;
          color: #16a34a;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }

        .why-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #111;
          line-height: 1.35;
          margin: 0 0 18px;
        }

        .why-problem, .why-solution {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }

        .why-problem {
          color: #666;
        }

        .why-solution {
          color: #15803d;
        }

        .why-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .why-dot.bad {
          background: #fee2e2;
          color: #dc2626;
        }

        .why-dot.good {
          background: #dcfce7;
          color: #16a34a;
        }

        .why-problem p,
        .why-solution p {
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .why-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .why-section {
            padding: 70px 20px;
          }

          .why-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default ImprovedWhyMenuQR;
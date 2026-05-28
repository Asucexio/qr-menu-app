'use client';

import React from 'react';

const ImprovedPricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      period: "Forever free",
      description: "Perfect for trying MenuQR",
      features: [
        "1 menu",
        "Basic QR code",
        "Up to 20 items",
        "Mobile-friendly view",
        "Email support"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "#6b7280"
    },
    {
      name: "Pro",
      price: "499",
      period: "per month",
      description: "Most popular for growing restaurants",
      features: [
        "Unlimited menus",
        "Beautiful premium themes",
        "Unlimited items + photos",
        "Real-time analytics",
        "Priority support",
        "Custom branding"
      ],
      buttonText: "Start 14-day Free Trial",
      popular: true,
      color: "#16a34a"
    },
    {
      name: "Business",
      price: "999",
      period: "per month",
      description: "For restaurants with multiple locations",
      features: [
        "Everything in Pro",
        "Multiple locations",
        "Team access & roles",
        "Advanced analytics",
        "White-label option",
        "Dedicated account manager"
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "#111827"
    }
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <div className="pricing-eyebrow">PRICING</div>
          <h2 className="pricing-title">Simple pricing.<br />No surprises.</h2>
          <p className="pricing-subtitle">30-day billing. Cancel anytime. All plans include free updates.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <div className="pricing-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">ETB</span>
                  <span className="amount">{plan.price}</span>
                </div>
                <p className="plan-period">{plan.period}</p>
                <p className="plan-description">{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`plan-button ${plan.popular ? 'plan-button--primary' : ''}`}
                onClick={() => {
                  if (plan.name === "Business") {
                    window.location.href = "#contact";
                  } else {
                    window.location.href = "/signup";
                  }
                }}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer">
          <p>All plans include a 14-day money-back guarantee. No questions asked.</p>
        </div>
      </div>

      <style>{`
        .pricing-section {
          background: #fff;
          padding: 100px 24px;
        }

        .pricing-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .pricing-eyebrow {
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

        .pricing-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.1;
          letter-spacing: -0.8px;
          margin: 0 0 16px;
        }

        .pricing-subtitle {
          font-size: 16px;
          color: #666;
          max-width: 420px;
          margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
          align-items: stretch;
        }

        .pricing-card {
          background: #fff;
          border: 2px solid #f0f0f0;
          border-radius: 24px;
          padding: 40px 36px;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .pricing-card:hover {
          border-color: #16a34a;
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.08);
        }

        .pricing-card--popular {
          border-color: #16a34a;
          box-shadow: 0 25px 60px rgba(22, 163, 74, 0.15);
          transform: scale(1.02);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #16a34a;
          color: white;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 20px;
          border-radius: 50px;
          letter-spacing: 0.5px;
        }

        .pricing-card-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .plan-name {
          font-size: 22px;
          font-weight: 700;
          color: #111;
          margin: 0 0 8px;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          margin-bottom: 4px;
        }

        .currency {
          font-size: 18px;
          font-weight: 600;
          color: #666;
        }

        .amount {
          font-size: 52px;
          font-weight: 700;
          color: #111;
          line-height: 1;
        }

        .plan-period {
          font-size: 14px;
          color: #888;
          margin-bottom: 12px;
        }

        .plan-description {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          flex: 1;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14.5px;
          color: #444;
          margin-bottom: 14px;
        }

        .plan-button {
          width: 100%;
          padding: 16px;
          border: 2px solid #e5e7eb;
          background: white;
          color: #111;
          font-size: 15px;
          font-weight: 600;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .plan-button:hover {
          border-color: #16a34a;
          color: #16a34a;
        }

        .plan-button--primary {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
        }

        .plan-button--primary:hover {
          background: #15803d;
          border-color: #15803d;
          color: white;
        }

        .pricing-footer {
          text-align: center;
          margin-top: 48px;
          font-size: 13px;
          color: #888;
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
          
          .pricing-card--popular {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ImprovedPricing;
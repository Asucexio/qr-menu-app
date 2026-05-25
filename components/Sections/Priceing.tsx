import React, { useState } from 'react';

const PremiumPricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 199,
      annualPrice: 1990,
      description: 'Perfect for small restaurants getting started with digital menus.',
      badge: null,
      highlighted: false,
      features: [
        { text: '1 restaurant profile', included: true },
        { text: 'Up to 3 active menus', included: true },
        { text: 'Unlimited menu items', included: true },
        { text: 'QR code generation & download', included: true },
        { text: 'Customer-facing menu page', included: true },
        { text: 'Email support', included: true },
        { text: 'Custom branding', included: false },
        { text: 'Priority support', included: false },
      ],
      cta: 'Get started',
      color: '#3b82f6'
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: 499,
      annualPrice: 4990,
      description: 'For restaurants that want unlimited menus and premium features.',
      badge: 'Most popular',
      highlighted: true,
      features: [
        { text: '1 restaurant profile', included: true },
        { text: 'Unlimited active menus', included: true },
        { text: 'Unlimited menu items', included: true },
        { text: 'QR code generation & download', included: true },
        { text: 'Customer-facing menu page', included: true },
        { text: 'Custom restaurant branding', included: true },
        { text: 'Priority support', included: true },
        { text: 'Early access to new features', included: true },
      ],
      cta: 'Get started',
      color: '#10b981'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      description: 'For restaurant chains and large operations with custom needs.',
      badge: 'Custom',
      highlighted: false,
      features: [
        { text: 'Unlimited restaurant profiles', included: true },
        { text: 'Unlimited active menus', included: true },
        { text: 'Unlimited menu items', included: true },
        { text: 'QR code generation & download', included: true },
        { text: 'Customer-facing menu page', included: true },
        { text: 'White-label solutions', included: true },
        { text: '24/7 phone & email support', included: true },
        { text: 'Custom integrations', included: true },
      ],
      cta: 'Contact sales',
      color: '#8b5cf6'
    }
  ];

  const getPrice = (plan) => {
    if (billingCycle === 'monthly') {
      return plan.monthlyPrice;
    }
    return plan.annualPrice;
  };

  const getSavings = (plan) => {
    if (!plan.monthlyPrice || !plan.annualPrice) return 0;
    return Math.round((1 - plan.annualPrice / (plan.monthlyPrice * 12)) * 100);
  };

  return (
    <section className="premium-pricing-section">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .premium-pricing-section {
          width: 100%;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          padding: 60px 40px;  /* Changed from 100px to 60px - decreased height */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .premium-pricing-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .pricing-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 50px;  /* Reduced from 80px */
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pricing-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 16px;
        }

        .pricing-title {
          font-size: 48px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .pricing-subtitle {
          font-size: 18px;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .pricing-toggle-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin-bottom: 50px;  /* Reduced from 80px */
          animation: slideUp 0.8s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .pricing-toggle-label {
          font-size: 14px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .pricing-toggle {
          position: relative;
          width: 64px;
          height: 32px;
          background: rgba(148, 163, 184, 0.2);
          border: 2px solid rgba(148, 163, 184, 0.3);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pricing-toggle:hover {
          background: rgba(148, 163, 184, 0.3);
          border-color: rgba(148, 163, 184, 0.5);
        }

        .pricing-toggle.active {
          background: #10b981;
          border-color: #059669;
        }

        .pricing-toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 28px;
          height: 28px;
          background: white;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .pricing-toggle.active .pricing-toggle-slider {
          transform: translateX(32px);
        }

        .pricing-badge {
          display: inline-block;
          padding: 6px 12px;
          background: #10b981;
          color: white;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .pricing-plans {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 40px;  /* Reduced from 60px */
        }

        .pricing-card {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(209, 211, 214, 0.1);
          border-radius: 16px;
          padding: 40px 32px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
        }

        .pricing-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .pricing-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .pricing-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .pricing-card.highlighted {
          border-color: #10b981;
          transform: scale(1.02);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%);
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.15);
        }

        .pricing-card:hover {
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .pricing-card.highlighted:hover {
          transform: scale(1.02) translateY(-8px);
          box-shadow: 0 0 50px rgba(16, 185, 129, 0.2);
        }

        .pricing-plan-name {
          font-size: 24px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 12px;
        }

        .pricing-plan-price {
          margin-bottom: 16px;
        }

        .pricing-currency {
          font-size: 16px;
          color: #94a3b8;
        }

        .pricing-amount {
          font-size: 48px;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1;
        }

        .pricing-period {
          font-size: 14px;
          color: #64748b;
        }

        .pricing-savings {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.2);
          color: #86efac;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 8px;
        }

        .pricing-plan-desc {
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 20px 0 32px;
        }

        .pricing-features {
          list-style: none;
          margin-bottom: 32px;
        }

        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.5;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }

        .pricing-features li:last-child {
          border-bottom: none;
        }

        .pricing-features li.disabled {
          opacity: 0.5;
          color: #64748b;
        }

        .pricing-features svg {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }

        .pricing-features li.included svg {
          color: #10b981;
        }

        .pricing-features li.disabled svg {
          color: #475569;
        }

        .pricing-cta {
          width: 100%;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .pricing-cta--outline {
          background: transparent;
          border-color: rgba(148, 163, 184, 0.3);
          color: #cbd5e1;
        }

        .pricing-cta--outline:hover {
          background: rgba(148, 163, 184, 0.1);
          border-color: rgba(148, 163, 184, 0.5);
          color: #f1f5f9;
        }

        .pricing-cta--solid {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-color: #10b981;
        }

        .pricing-cta--solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .pricing-footer-note {
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .pricing-footer-note strong {
          color: #cbd5e1;
        }

        .pricing-faq-hint {
          text-align: center;
          color: #64748b;
          font-size: 13px;
          margin-top: 12px;
        }

        .pricing-faq-hint a {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .pricing-faq-hint a:hover {
          color: #059669;
        }

        @media (max-width: 768px) {
          .premium-pricing-section {
            padding: 40px 20px;  /* Reduced for mobile as well */
          }

          .pricing-header {
            margin-bottom: 30px;
          }

          .pricing-title {
            font-size: 32px;
          }

          .pricing-subtitle {
            font-size: 16px;
          }

          .pricing-plans {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .pricing-card.highlighted {
            transform: scale(1);
          }

          .pricing-card.highlighted:hover {
            transform: translateY(-8px);
          }
        }
      `}</style>

      <div className="pricing-container">
        <div className="pricing-header">
          <div className="pricing-eyebrow lp-eyebrow lp-eyebrow--light">Transparent Pricing</div>
          <h2 className="pricing-title">Simple, honest pricing</h2>
          <p className="pricing-subtitle">30-day subscriptions. No hidden fees. Cancel anytime.</p>
        </div>

        <div className="pricing-toggle-container">
          <span className="pricing-toggle-label">Monthly</span>
          <div
            className={`pricing-toggle ${billingCycle === 'annual' ? 'active' : ''}`}
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            role="button"
            tabIndex={0}
            aria-label="Toggle billing cycle"
          >
            <div className="pricing-toggle-slider"></div>
          </div>
          <span className="pricing-toggle-label">Annual</span>
          {billingCycle === 'annual' && (
            <span className="pricing-savings">Save up to 17%</span>
          )}
        </div>

        <div className="pricing-plans">
          {plans.map((plan, index) => {
            const price = getPrice(plan);
            const savings = getSavings(plan);

            return (
              <div
                key={plan.id}
                className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.badge && (
                  <div className="pricing-badge">{plan.badge}</div>
                )}

                <h3 className="pricing-plan-name">{plan.name}</h3>

                <div className="pricing-plan-price">
                  {price ? (
                    <>
                      <div className="pricing-currency">ETB</div>
                      <div className="pricing-amount">{price.toLocaleString()}</div>
                      <div className="pricing-period">{billingCycle === 'monthly' ? '/month' : '/year'}</div>
                      {billingCycle === 'annual' && savings > 0 && (
                        <div className="pricing-savings">Save {savings}%</div>
                      )}
                    </>
                  ) : (
                    <div className="pricing-amount" style={{ fontSize: '24px' }}>Custom pricing</div>
                  )}
                </div>

                <p className="pricing-plan-desc">{plan.description}</p>

                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={feature.included ? 'included' : 'disabled'}>
                      <svg viewBox="0 0 16 16" fill="none">
                        {feature.included ? (
                          <path
                            d="M3 8l3.5 3.5L13 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                        )}
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <button
                  className={`pricing-cta ${plan.highlighted ? 'pricing-cta--solid' : 'pricing-cta--outline'}`}
                  style={{
                    borderColor: plan.highlighted ? undefined : `${plan.color}40`,
                    background: plan.highlighted ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}cc 100%)` : undefined
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <div className="pricing-footer-note">
          <strong>✓ All plans include a free setup.</strong> No credit card required to start.
        </div>

        <div className="pricing-faq-hint">
          Have questions? <a href="#faq">See our FAQ</a> or <a href="#contact">contact our sales team</a>
        </div>
      </div>
    </section>
  );
};

export default PremiumPricingSection;
import React from 'react';
import { Timer, QrCode, Menu, View, ToggleOnFilled } from "@aliimam/icons"

const PremiumFeaturesStatic = () => {
  const features = [
    {
      id: 1,
      icon: <Timer size={40} color="#10b981" />,
      title: 'Live menu updates',
      description: 'Change prices, hide sold-out items, add daily specials — updates reflect instantly on every customer\'s phone. No reprinting, no delay.',
      color: '#10b981',
      badge: 'Updated 2 sec ago'
    },
    {
      id: 2,
      icon: <QrCode size={40} color="#10b981" />,
      title: 'Instant QR generation',
      description: 'Get a print-ready QR code for every menu. Download as PNG, print on table cards, and you\'re done. Share with customers in seconds.',
      color: '#10b981',
      badge: 'Ready to print'
    },
    {
      id: 3,
      icon: <Menu size={40} color="#10b981" />,
      title: 'Multi-menu support',
      description: 'Create separate lunch, dinner, drinks, and seasonal menus. Switch them active with one tap. Organize everything your way.',
      color: '#10b981',
      badge: 'Fully customizable'
    },
    {
      id: 4,
      icon: <View size={40} color="#10b981" />,
      title: 'Beautiful customer view',
      description: 'Customers get a fast, gorgeous menu page — no app, no login, no friction. Just scan and browse your entire selection.',
      color: '#10b981',
      badge: 'Mobile optimized'
    },
    {
      id: 5,
      icon: <ToggleOnFilled size={40} color="#10b981" />,
      title: 'Item availability toggle',
      description: 'Sold out of Tibs? Hide it in one click. It disappears from every customer\'s view immediately. Keep menus accurate always.',
      color: '#10b981',
      badge: 'Real-time sync'
    }
  ];

  return (
    <section className="premium-features-section">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .premium-features-section {
          width: 100%;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 80px 40px;
        }

        .premium-features-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .features-header {
          text-align: center;
          margin-bottom: 80px;
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

        .features-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 16px;
        }

        .features-title {
          font-size: 48px;
          font-weight: 700;
          color: #0a0a0a;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .features-subtitle {
          font-size: 18px;
          color: #555;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-bottom: 40px;
        }

        .feature-card {
          background: white;
          backdrop-filter: none;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 40px 32px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .feature-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .feature-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .feature-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .feature-card:nth-child(4) {
          animation-delay: 0.4s;
        }

        .feature-card:nth-child(5) {
          animation-delay: 0.5s;
        }

        .feature-card:hover {
          border-color: #16a34a;
          background: #f0fdf4;
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(22, 163, 74, 0.1);
        }

        .feature-badge {
          display: inline-block;
          padding: 6px 12px;
          background: #d1fae5;
          color: #047857;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 20px;
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card:hover .feature-icon {
          transform: translateY(-8px);
          animation: bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .feature-title {
          font-size: 20px;
          font-weight: 700;
          color: #0a0a0a;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
          line-height: 1.3;
        }

        .feature-accent-line {
          width: 40px;
          height: 3px;
          background: #16a34a;
          border-radius: 2px;
          margin-bottom: 16px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card:hover .feature-accent-line {
          width: 60px;
          background: #15803d;
        }

        .feature-description {
          font-size: 14px;
          color: #555;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .premium-features-section {
            padding: 60px 20px;
          }

          .features-header {
            margin-bottom: 60px;
          }

          .features-title {
            font-size: 32px;
          }

          .features-subtitle {
            font-size: 16px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .feature-card {
            padding: 32px 24px;
          }

          .feature-title {
            font-size: 18px;
          }

          .feature-description {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="features-container">
        {/* <div className="features-header">
          <div className="features-eyebrow">Powerful Features</div>
          <h2 className="features-title">Everything you need to manage menus</h2>
          <p className="features-subtitle">All the tools to run your restaurant menus like a pro, without the complexity.</p>
        </div> */}

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-badge">{feature.badge}</div>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-accent-line"></div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumFeaturesStatic;
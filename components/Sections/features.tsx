 import React, { useState, useEffect, useRef } from 'react';
 import { Timer,QrCode,Menu,View,ToggleOnFilled} from "@aliimam/icons"

const PremiumFeaturesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState('next');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const features = [
    {
      id: 1,
      icon: <Timer size={40} color="#10b981" />,
      title: 'Live menu updates',
      description: 'Change prices, hide sold-out items, add daily specials — updates reflect instantly on every customer\'s phone. No reprinting, no delay.',
      image: 'https://ik.imagekit.io/sl226drpx/gpt-image-2_act_as_senior_ui_ux_desiner_and_generate_image_for_this_h3_className_lp-feature_-0.jpg?updatedAt=1779660749185',
      color: '#10b981',
      badge: 'Updated 2 sec ago'
    },
    {
      id: 2,
      icon: <QrCode size={40} color="#10b981" />,
      title: 'Instant QR generation',
      description: 'Get a print-ready QR code for every menu. Download as PNG, print on table cards, and you\'re done. Share with customers in seconds.',
      image: 'https://ik.imagekit.io/sl226drpx/Modern%20Promotional%20Illustration%20For%20Instant%20QR%20Generation%20Service.png?updatedAt=1779660852342',
      color: '#10b981',
      badge: 'Ready to print'
    },
    {
      id: 3,
      icon: <Menu size={40} color="#10b981" />,
      title: 'Multi-menu support',
      description: 'Create separate lunch, dinner, drinks, and seasonal menus. Switch them active with one tap. Organize everything your way.',
      image: 'https://ik.imagekit.io/sl226drpx/a-clean-modern-mobile-app-interface-scre_JUbMgs3uVDi-HD1-L3F_OQ_qxil1iFnTOG3XFkLWRzV4Q_sd.jpeg',
      color: '#10b981',
      badge: 'Fully customizable'
    },
    {
      id: 4,
      icon: <View size={40} color="#10b981" />,
      title: 'Beautiful customer view',
      description: 'Customers get a fast, gorgeous menu page — no app, no login, no friction. Just scan and browse your entire selection.',
      image: 'https://ik.imagekit.io/sl226drpx/gpt-image-2_act_as_senior_ui_ux_desinor_and_generate_image_for_this_no_text_add_h3_className-0.jpg?updatedAt=1779694199558',
      color: '#10b981',
      badge: 'Mobile optimized'
    },
    {
      id: 5,
      icon: <ToggleOnFilled size={40} color="#10b981" />,
      title: 'Item availability toggle',
      description: 'Sold out of Tibs? Hide it in one click. It disappears from every customer\'s view immediately. Keep menus accurate always.',
      image: 'https://ik.imagekit.io/sl226drpx/gemini-2.5-flash-image_add_the_text_on_it-0.jpg',
      color: '#10b981',
      badge: 'Real-time sync'
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, features.length]);

  const handlePrev = () => {
    setDirection('prev');
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleNext = () => {
    setDirection('next');
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };

  const feature = features[activeIndex];

  return (
    <section className="premium-carousel-section">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .premium-carousel-section {
          width: 100%;
          min-height: 80vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
   m
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          position: relative;
          overflow: hidden;
          margin-top: -140px;
          padding-top: 120px;
          padding-bottom: 40px;
        }

        .carousel-header {
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

        .carousel-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 16px;
        }

        .carousel-title {
          font-size: 48px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .carousel-subtitle {
          font-size: 18px;
          color: #475569;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .carousel-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .carousel-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 500px;
        }

        .carousel-content {
          position: relative;
          z-index: 2;
        }

        .feature-badge {
          display: inline-block;
          padding: 8px 16px;
          background: ${feature.color}15;
          color: ${feature.color};
          border-radius: 24px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 24px;
          letter-spacing: 0.5px;
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: inline-block;
          animation: bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .feature-title {
          font-size: 38px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .feature-description {
          font-size: 16px;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .feature-accent-line {
          width: 60px;
          height: 4px;
          background: ${feature.color};
          border-radius: 2px;
          margin-bottom: 24px;
          animation: expandWidth 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 60px;
          }
        }

        .carousel-visual {
          position: relative;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .carousel-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${feature.color}00 0%, ${feature.color}15 100%);
          pointer-events: none;
        }

        .carousel-controls {
          display: flex;
          gap: 16px;
          margin-top: 48px;
          align-items: center;
        }

        .carousel-button {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #475569;
        }

        .carousel-button:hover {
          border-color: ${feature.color};
          color: ${feature.color};
          background: ${feature.color}08;
          transform: translateY(-4px);
        }

        .carousel-button:active {
          transform: translateY(-2px);
        }

        .carousel-counter {
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
          margin-left: 8px;
          padding-top: 0px;
          margin-top: 0px;
        }

        .carousel-dots {
          display: flex;
          gap: 12px;
          margin-top: 48px;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid transparent;
        }

        .carousel-dot:hover {
          background: #94a3b8;
        }

        .carousel-dot.active {
          width: 32px;
          border-radius: 4px;
          background: ${feature.color};
          border-color: ${feature.color}30;
        }

        .carousel-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: ${feature.color};
          border-radius: 0;
          animation: progress 5s linear forwards;
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .premium-carousel-section {
            padding: 40px 20px;
            min-height: auto;
          }

          .carousel-header {
            margin-bottom: 40px;
          }

          .carousel-title {
            font-size: 32px;
          }

          .carousel-subtitle {
            font-size: 16px;
          }

          .carousel-main {
            grid-template-columns: 1fr;
            gap: 30px;
            min-height: auto;
          }

          .carousel-visual {
            height: 350px;
          }

          .feature-title {
            font-size: 28px;
          }

          .carousel-controls {
            flex-wrap: wrap;
          }
        }
      `}</style>
{/* 
        Header */}

      <div className="carousel-container">
        <div className="carousel-main">
          <div className="carousel-content">
            <div className="feature-accent-line"></div>
            <div className="feature-badge">{feature.badge}</div>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>

            <div className="carousel-controls">
              <button className="carousel-button" onClick={handlePrev} aria-label="Previous feature">
                ←
              </button>
              <button className="carousel-button" onClick={handleNext} aria-label="Next feature">
                →
              </button>
              <div className="carousel-counter">
                <span style={{ color: feature.color, fontWeight: 700 }}>{activeIndex + 1}</span>
                <span> / {features.length}</span>
              </div>
            </div>

            <div className="carousel-dots">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  style={{
                    background: index === activeIndex ? feature.color : '#cbd5e1'
                  }}
                  aria-label={`Go to feature ${index + 1}`}
                  role="button"
                  tabIndex={0}
                />
              ))}
            </div>
          </div>

          <div className="carousel-visual">
            <img src={feature.image} alt={feature.title} className="carousel-image" />
            <div className="carousel-image-overlay"></div>
            {isAutoPlay && <div className="carousel-progress"></div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeaturesCarousel;
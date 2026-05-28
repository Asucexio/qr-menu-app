'use client';

import React from 'react';
import { Timer, QrCode, Menu, View, ToggleRight, Camera, BarChart3, Palette } from "lucide-react";

const ImprovedFeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <Timer size={42} />,
      title: 'Live menu updates',
      description: 'Change prices, hide sold-out items, or add daily specials — updates appear on every customer\'s phone in seconds. No reprinting ever again.',
      badge: 'Instant sync',
      color: '#10b981',
      stat: '2s'
    },
    {
      id: 2,
      icon: <QrCode size={42} />,
      title: 'Instant QR generation',
      description: 'Get a beautiful, print-ready QR code for every menu in one click. Download as PNG and print on table tents or stickers.',
      badge: 'Print ready',
      color: '#10b981',
      stat: '1 click'
    },
    {
      id: 3,
      icon: <Menu size={42} />,
      title: 'Multiple menus',
      description: 'Create separate Breakfast, Lunch, Dinner, Drinks, and Seasonal menus. Switch them active with a single tap.',
      badge: 'Flexible',
      color: '#10b981',
      stat: 'Unlimited'
    },
    {
      id: 4,
      icon: <View size={42} />,
      title: 'Stunning customer view',
      description: 'Customers get a fast, gorgeous mobile menu — no app, no login. Just scan and browse with beautiful photos.',
      badge: 'Mobile-first',
      color: '#10b981',
      stat: '<2s load'
    },
    {
      id: 5,
      icon: <ToggleRight size={42} />,
      title: 'Availability toggle',
      description: 'Sold out of Tibs or Kategna? Hide it instantly. It disappears from every customer\'s screen in real time.',
      badge: 'Real-time',
      color: '#10b981',
      stat: 'Live'
    },
    {
      id: 6,
      icon: <Camera size={42} />,
      title: 'Food photography',
      description: 'Add mouth-watering photos to every dish. Customers see exactly what they\'re ordering — fewer questions, faster decisions.',
      badge: 'Visual menu',
      color: '#10b981',
      stat: 'HD photos'
    }
    // },
    // {
    //   id: 7,
    //   icon: <BarChart3 size={42} />,
    //   title: 'Menu analytics',
    //   description: 'See which dishes are most popular, peak ordering times, and total menu views. Make data-driven decisions.',
    //   badge: 'Insights',
    //   color: '#10b981',
    //   stat: 'Live data'
    // },
    // {
    //   id: 8,
    //   icon: <Palette size={42} />,
    //   title: 'Custom branding',
    //   description: 'Match your restaurant\'s colors, add your logo, and choose from beautiful themes. Make the menu truly yours.',
    //   badge: 'On-brand',
    //   color: '#10b981',
    //   stat: 'Pro'
    // }
  ];

  return (
    <section className="improved-features-section">
      <div className="features-container">
        <div className="features-header">
          <div className="features-eyebrow">POWERFUL FEATURES</div>
          <h2 className="features-title">Everything you need.<br />Nothing you don&apos;t.</h2>
          <p className="features-subtitle">
            Built specifically for Ethiopian restaurants — from small cafes in Bole to busy hotels in Addis.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="feature-top">
                <div 
                  className="feature-icon-wrapper"
                  style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <div className="feature-badge">{feature.badge}</div>
              </div>

              <h3 className="feature-title">{feature.title}</h3>
              
              <p className="feature-description">{feature.description}</p>

              <div className="feature-footer">
                <div className="feature-stat">
                  <span className="stat-value">{feature.stat}</span>
                </div>
                <div className="feature-accent" />
              </div>
            </div>
          ))}
        </div>

        <div className="features-bottom">
          <p className="features-bottom-text">
            All features included in every plan • No hidden costs • Cancel anytime
          </p>
        </div>
      </div>

      <style>{`
        .improved-features-section {
          width: 100%;
          background: #ffffff;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }

        .features-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .features-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .features-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #16a34a;
          margin-bottom: 14px;
          background: #f0fdf4;
          display: inline-block;
          padding: 6px 18px;
          border-radius: 50px;
          border: 1px solid #bbf7d0;
        }

        .features-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(36px, 4.2vw, 54px);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.1;
          letter-spacing: -1.2px;
          margin: 0 0 18px;
        }

        .features-subtitle {
          font-size: 17px;
          color: #666;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.65;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          padding: 36px 32px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: featureSlideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .feature-card:hover {
          border-color: #16a34a;
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 30px 70px rgba(22, 163, 74, 0.12);
        }

        @keyframes featureSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .feature-icon-wrapper {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(3deg);
        }

        .feature-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 5px 11px;
          border-radius: 6px;
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
          align-self: flex-start;
          margin-top: 4px;
        }

        .feature-title {
          font-size: 21px;
          font-weight: 700;
          color: #111;
          line-height: 1.3;
          margin: 0 0 14px;
          letter-spacing: -0.4px;
        }

        .feature-description {
          font-size: 14.5px;
          color: #555;
          line-height: 1.7;
          margin: 0 0 28px;
          min-height: 72px;
        }

        .feature-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .feature-stat {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stat-value {
          font-size: 13px;
          font-weight: 700;
          color: #16a34a;
          background: #f0fdf4;
          padding: 3px 10px;
          border-radius: 50px;
          letter-spacing: 0.3px;
        }

        .feature-accent {
          width: 42px;
          height: 3px;
          background: linear-gradient(to right, #16a34a, #4ade80);
          border-radius: 3px;
          transition: width 0.4s ease;
        }

        .feature-card:hover .feature-accent {
          width: 68px;
        }

        .features-bottom {
          text-align: center;
          margin-top: 64px;
        }

        .features-bottom-text {
          font-size: 13px;
          color: #888;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .improved-features-section {
            padding: 72px 20px;
          }

          .features-header {
            margin-bottom: 52px;
          }

          .features-title {
            font-size: 34px;
          }

          .features-subtitle {
            font-size: 15.5px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .feature-card {
            padding: 30px 26px;
          }

          .feature-title {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
};

export default ImprovedFeaturesSection;
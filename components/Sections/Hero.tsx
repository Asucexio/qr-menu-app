'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Typewriter } from '@/components/ui/typewritter';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="lp-hero" ref={heroRef}>
      <div className="lp-hero__bg">
        <div className="lp-hero__blob lp-hero__blob--1" />
        <div className="lp-hero__blob lp-hero__blob--2" />
        <div className="lp-hero__blob lp-hero__blob--3" />
        <div className="lp-hero__grid" />
      </div>
      <div className="lp-hero__inner">
        <div className="lp-hero__content">
          <div className="lp-badge">
            <span className="lp-badge__dot" />
            Trusted by 25+ restaurants in Ethiopia
          </div>
          <h1 className="lp-hero__title">
            Your menu,<br />
            <Typewriter 
              words={['beautifully digital.', 'always up to date.', 'in customers\' hands.']} 
              className="lp-hero__title--accent" 
            />
          </h1>
          <p className="lp-hero__sub">
            Create stunning digital menus, generate QR codes instantly, and let customers browse from their phones — no app download required.
          </p>
          <div className="lp-hero__actions">
            <Link href="/signup" className="lp-btn lp-btn--hero">
              Start free today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button 
              onClick={() => window.open('/demo', '_blank')} 
              className="lp-btn lp-btn--outline"
            >
              See Live Demo
            </button>
          </div>
          <div className="lp-hero__stats">
            <div className="lp-stat">
              <span className="lp-stat__num">25+</span>
              <span className="lp-stat__label">Restaurants</span>
            </div>
            <div className="lp-stat__divider" />
            <div className="lp-stat">
              <span className="lp-stat__num">1,450+</span>
              <span className="lp-stat__label">Monthly scans</span>
            </div>
            <div className="lp-stat__divider" />
            <div className="lp-stat">
              <span className="lp-stat__num">10 min</span>
              <span className="lp-stat__label">To go live</span>
            </div>
          </div>
        </div>

        <div className="lp-hero__visual">
          <div className="lp-phone">
            <div className="lp-phone__shell">
              <div className="lp-phone__notch" />
              <div className="lp-phone__screen">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop"
                  alt="Food menu"
                  className="lp-phone__img"
                />
                <div className="lp-phone__overlay">
                  <div className="lp-phone__card">
                    <div className="lp-phone__card-tag">Starters</div>
                    <div className="lp-phone__card-item"><span>Sambusa</span><span>45 ETB</span></div>
                    <div className="lp-phone__card-item"><span>Tibs fitfit</span><span>185 ETB</span></div>
                    <div className="lp-phone__card-item"><span>Kategna</span><span>60 ETB</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lp-phone__qr">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://menuqr.com/demo" 
                alt="QR code" 
                className="lp-phone__qr-img" 
              />
              <span>Scan me</span>
            </div>
            <div className="lp-phone__float lp-phone__float--1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5 5.5 4 7 1z" fill="#f59e0b"/>
              </svg>
              4.9 rating
            </div>
            <div className="lp-phone__float lp-phone__float--2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" fill="#22c55e" opacity=".2"/>
                <circle cx="6" cy="6" r="3" fill="#22c55e"/>
              </svg>
              Live menu
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



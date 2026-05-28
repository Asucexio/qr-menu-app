'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}>
      <div className="lp-nav__inner">
        <a href="#" className="lp-logo">
          <img
            src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png"
            alt="MenuQR Logo"
            width={170}
            height={170}
          />
        </a>

        <div className="lp-nav__links">
          <a href="#features" className="lp-nav__link">Features</a>
          <a href="#how" className="lp-nav__link">How it works</a>
          <a href="#pricing" className="lp-nav__link">Pricing</a>
          <a href="#testimonials" className="lp-nav__link">Reviews</a>
          <a href="#contact" className="lp-nav__link">Contact</a>
        </div>

        <div className="lp-nav__cta">
          <Link href="/signin" className="lp-btn lp-btn--ghost">Sign in</Link>
          <Link href="/signup" className="lp-btn lp-btn--primary">Get started free</Link>
        </div>

        <button 
          className="lp-hamburger" 
          aria-label="Toggle menu" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={menuOpen ? 'lp-ham--open-1' : ''} />
          <span className={menuOpen ? 'lp-ham--open-2' : ''} />
          <span className={menuOpen ? 'lp-ham--open-3' : ''} />
        </button>
      </div>

      {menuOpen && (
        <div className="lp-mobile-menu">
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <div className="lp-mobile-menu__divider" />
          <Link href="/signin" onClick={() => setMenuOpen(false)}>Sign in</Link>
          <Link href="/signup" className="lp-btn lp-btn--primary lp-btn--mobile" onClick={() => setMenuOpen(false)}>
            Get started free
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
 
//         *, *::before, *::after { box-sizing: border-box; }
 
//         .lp-root {
//           font-family: 'DM Sans', sans-serif;
//           color: #111;
//           background: #fff;
//           overflow-x: hidden;
//           -webkit-font-smoothing: antialiased;
//         }
 
//         /* ── NAV ── */
//         .lp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all .3s ease; padding: 0 24px; }
//         .lp-nav--scrolled { background: rgba(255,255,255,.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,.07); box-shadow: 0 1px 24px rgba(0,0,0,.05); }
//         .lp-nav__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 32px; height: 68px; }
//         .lp-nav__links { display: flex; gap: 2px; margin-left: auto; }
//         .lp-nav__link { padding: 7px 13px; font-size: 14px; color: #555; border-radius: 8px; text-decoration: none; transition: all .15s; font-weight: 450; }
//         .lp-nav__link:hover { background: #f3f4f6; color: #111; }
//         .lp-nav__cta { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
//         .lp-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; margin-left: auto; }
//         .lp-hamburger span { display: block; width: 22px; height: 2px; background: #333; border-radius: 2px; transition: all .25s; transform-origin: center; }
//         .lp-ham--open-1 { transform: translateY(7px) rotate(45deg); }
//         .lp-ham--open-2 { opacity: 0; transform: scaleX(0); }
//         .lp-ham--open-3 { transform: translateY(-7px) rotate(-45deg); }
//         .lp-mobile-menu { background: #fff; border-top: 1px solid #f0f0f0; padding: 8px 16px 20px; display: flex; flex-direction: column; gap: 2px; }
//         .lp-mobile-menu a { padding: 10px 12px; font-size: 15px; color: #333; text-decoration: none; border-radius: 8px; display: block; transition: background .15s; }
//         .lp-mobile-menu a:hover { background: #f5f5f5; }
//         .lp-mobile-menu__divider { height: 1px; background: #f0f0f0; margin: 8px 0; }
//         .lp-btn--mobile { margin-top: 4px; justify-content: center; }
 
//         /* ── LOGO ── */
//         .lp-logo { display: flex; align-items: center; gap: 9px; text-decoration: none; flex-shrink: 0; }
//         .lp-logo__icon { width: 34px; height: 34px; background: #16a34a; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
//         .lp-logo__text { font-family: 'Instrument Serif', serif; font-size: 20px; color: #111; letter-spacing: -.3px; }
 
//         /* ── BUTTONS ── */
//         .lp-btn { display: inline-flex; align-items: center; gap: 7px; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 10px; transition: all .2s; cursor: pointer; border: none; white-space: nowrap; font-family: 'DM Sans', sans-serif; }
//         .lp-btn--ghost { padding: 8px 16px; color: #444; background: transparent; }
//         .lp-btn--ghost:hover { background: #f5f5f5; color: #111; }
//         .lp-btn--primary { padding: 9px 18px; background: #16a34a; color: #fff; }
//         .lp-btn--primary:hover { background: #15803d; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(22,163,74,.3); }
//         .lp-btn--hero { padding: 14px 28px; background: #16a34a; color: #fff; font-size: 15px; border-radius: 12px; box-shadow: 0 4px 20px rgba(22,163,74,.35); font-weight: 600; }
//         .lp-btn--hero:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(22,163,74,.4); }
//         .lp-btn--outline { padding: 13px 22px; border: 1.5px solid #e0e0e0; color: #444; font-size: 14px; border-radius: 12px; background: rgba(255,255,255,.7); backdrop-filter: blur(8px); }
//         .lp-btn--outline:hover { border-color: #bbb; background: #fff; transform: translateY(-1px); }
//         .lp-btn--cta { padding: 15px 30px; background: #fff; color: #16a34a; font-size: 15px; font-weight: 600; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,.15); }
//         .lp-btn--cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,.2); }
 
//         /* ── HERO ── */
//         .lp-hero { min-height: 100vh; display: flex; align-items: center; padding-top: 68px; position: relative; overflow: hidden; }
//         .lp-hero__bg { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(160deg, #f0fdf4 0%, #fff 45%, #f0fdf4 100%); }
//         .lp-hero__blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .45; }
//         .lp-hero__blob--1 { width: 700px; height: 700px; background: radial-gradient(circle, #bbf7d0, transparent 70%); top: -200px; right: -150px; animation: blobFloat 8s ease-in-out infinite; }
//         .lp-hero__blob--2 { width: 500px; height: 500px; background: radial-gradient(circle, #d1fae5, transparent 70%); bottom: -100px; left: -150px; animation: blobFloat 10s ease-in-out infinite reverse; }
//         .lp-hero__blob--3 { width: 300px; height: 300px; background: radial-gradient(circle, #dcfce7, transparent 70%); top: 40%; left: 40%; animation: blobFloat 12s ease-in-out infinite 2s; }
//         @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-15px) scale(1.05)} 66%{transform:translate(-10px,20px) scale(.95)} }
//         .lp-hero__grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px); background-size: 48px 48px; }
//         .lp-hero__inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; width: 100%; position: relative; z-index: 1; }
//         .lp-hero__content { display: flex; flex-direction: column; gap: 28px; }
//         .lp-badge { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid #bbf7d0; color: #15803d; font-size: 13px; font-weight: 500; padding: 7px 14px; border-radius: 100px; width: fit-content; box-shadow: 0 2px 10px rgba(22,163,74,.12); }
//         .lp-badge__dot { width: 7px; height: 7px; background: #16a34a; border-radius: 50%; flex-shrink: 0; animation: pulse 2s infinite; }
//         @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
//         .lp-hero__title { font-family: 'Instrument Serif', serif; font-size: clamp(40px, 5vw, 64px); line-height: 1.1; color: #0a0a0a; letter-spacing: -.5px; margin: 0; }
//         .lp-hero__title--accent { color: #16a34a; font-style: italic; display: block; min-height: 1.1em; }
//         .lp-hero__sub { font-size: 17px; line-height: 1.72; color: #555; margin: 0; max-width: 460px; }
//         .lp-hero__actions { display: flex; gap: 12px; flex-wrap: wrap; }
//         .lp-hero__stats { display: flex; align-items: center; gap: 24px; padding-top: 4px; flex-wrap: wrap; }
//         .lp-stat { display: flex; flex-direction: column; gap: 2px; }
//         .lp-stat__num { font-size: 22px; font-weight: 600; color: #111; letter-spacing: -.5px; line-height: 1; }
//         .lp-stat__label { font-size: 12px; color: #888; }
//         .lp-stat__divider { width: 1px; height: 36px; background: #e5e7eb; }
 
//         /* ── PHONE MOCKUP ── */
//         .lp-hero__visual { display: flex; justify-content: center; }
//         .lp-phone { position: relative; }
//         .lp-phone__shell { width: 240px; background: #111; border-radius: 36px; padding: 12px; box-shadow: 0 40px 90px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.1) inset, 0 0 0 8px rgba(0,0,0,.2); }
//         .lp-phone__notch { width: 80px; height: 22px; background: #111; border-radius: 0 0 16px 16px; margin: 0 auto 8px; }
//         .lp-phone__screen { border-radius: 26px; overflow: hidden; background: #fff; min-height: 400px; position: relative; }
//         .lp-phone__img { width: 100%; height: 180px; object-fit: cover; display: block; }
//         .lp-phone__overlay { padding: 12px; }
//         .lp-phone__card-tag { font-size: 10px; font-weight: 600; color: #16a34a; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
//         .lp-phone__card-item { display: flex; justify-content: space-between; font-size: 12px; color: #333; padding: 7px 0; border-bottom: 1px solid #f5f5f5; }
//         .lp-phone__card-item:last-child { border: none; }
//         .lp-phone__qr { position: absolute; bottom: -16px; right: -16px; background: #fff; border-radius: 16px; padding: 10px 12px; box-shadow: 0 8px 32px rgba(0,0,0,.15); display: flex; flex-direction: column; align-items: center; gap: 5px; }
//         .lp-phone__qr-img { width: 60px; height: 60px; border-radius: 4px; }
//         .lp-phone__qr span { font-size: 10px; font-weight: 600; color: #16a34a; }
//         .lp-phone__float { position: absolute; background: #fff; border-radius: 20px; padding: 8px 12px; font-size: 11px; font-weight: 500; color: #333; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 20px rgba(0,0,0,.12); white-space: nowrap; }
//         .lp-phone__float--1 { top: 20px; left: -30px; animation: float1 3s ease-in-out infinite; }
//         .lp-phone__float--2 { bottom: 60px; left: -40px; animation: float2 3.5s ease-in-out infinite; }
//         @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
//         @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
 
//         /* ── LOGOS ── */
//         .lp-logos { border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; padding: 28px 24px; text-align: center; }
//         .lp-logos__label { font-size: 12px; color: #aaa; font-weight: 500; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 20px; }
//         .lp-logos__row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 24px; }
 
//         /* ── SECTIONS ── */
//         .lp-section { padding: 100px 24px; }
//         .lp-section--tint { background: #f9fafb; }
//         .lp-section__inner { max-width: 1200px; margin: 0 auto; }
//         .lp-section__inner--narrow { max-width: 760px; }
//         .lp-section__header { text-align: center; margin-bottom: 0px;  }
//         .lp-eyebrow { display: inline-flex; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 5px 14px; border-radius: 100px; margin-bottom: 16px; }
//         .lp-eyebrow--light { color: #86efac; background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.2); }
//         .lp-section__title { font-family: 'Instrument Serif', serif; font-size: clamp(30px, 4vw, 46px); color: #0a0a0a; letter-spacing: -.4px; margin: 0 0 16px; line-height: 1.15; display: block; }
//         .lp-section__sub { font-size: 16px; color: #666; line-height: 1.72; max-width: 520px; margin: 0 auto; }
 
//         /* ── HOW IT WORKS ── */
//         .lp-how { background: #f9fafb; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; padding: 100px 24px; }
//         .lp-steps { display: flex; align-items: flex-start; gap: 16px; }
//         .lp-step { flex: 1; display: flex; flex-direction: column; gap: 14px; }
//         .lp-step__num { font-family: 'Instrument Serif', serif; font-size: 52px; color: #16a34a; line-height: 1; letter-spacing: -2px; }
//         .lp-step__visual { border-radius: 20px; overflow: hidden; height: 220px; }
//         .lp-step__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
//         .lp-step__img:hover { transform: scale(1.04); }
//         .lp-step__title { font-size: 18px; font-weight: 600; color: #111; margin: 0; }
//         .lp-step__desc { font-size: 14px; color: #666; line-height: 1.7; margin: 0; }
//         .lp-step__arrow { flex-shrink: 0; color: #d1d5db; margin-top: 140px; }


         
//         /* PROBLEMS */
//         .lp-problems-section { background: #f9fafb; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
//         .lp-problems { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
//         .lp-problem { background: #fff; border: 1px solid #f0f0f0; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; gap: 14px; transition: all .2s; }
//         .lp-problem:hover { border-color: #d1fae5; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
//         .lp-problem__top { display: flex; align-items: center; justify-content: space-between; }
//         .lp-problem__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//         .lp-problem__icon--red { background: #fff1f2; color: #e11d48; }
//         .lp-problem__icon--amber { background: #fffbeb; color: #d97706; }
//         .lp-problem__tag { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; letter-spacing: .2px; }
//         .lp-problem__icon--red + .lp-problem__tag { background: #fff1f2; color: #e11d48; }
//         .lp-problem__icon--amber + .lp-problem__tag { background: #fffbeb; color: #b45309; }
//         .lp-problem__title { font-size: 14px; font-weight: 700; color: #111; line-height: 1.4; margin: 0; }
//         .lp-problem__row { display: flex; align-items: flex-start; gap: 10px; padding: 10px; border-radius: 10px; }
//         .lp-problem__row--bad { background: #fff5f5; }
//         .lp-problem__row--good { background: #f0fdf4; }
//         .lp-problem__dot { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
//         .lp-problem__dot--bad { background: #fecdd3; color: #e11d48; }
//         .lp-problem__dot--good { background: #bbf7d0; color: #15803d; }
//         .lp-problem__text { font-size: 12px; color: #666; line-height: 1.6; margin: 0; }
//         .lp-problem__text--good { color: #15803d; }
 
//         /* ── TESTIMONIALS ── */
//         .lp-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
//         .lp-testimonial { background: #fff; border: 1px solid #f0f0f0; border-radius: 20px; padding: 26px; display: flex; flex-direction: column; gap: 14px; transition: all .25s; }
//         .lp-testimonial:hover { border-color: #d1fae5; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,.07); }
//         .lp-testimonial__stars { display: flex; gap: 2px; }
//         .lp-testimonial__text { font-size: 14px; color: #555; line-height: 1.72; flex: 1; }
//         .lp-testimonial__author { display: flex; align-items: center; gap: 10px; }
//         .lp-testimonial__name { font-size: 13px; font-weight: 600; color: #111; }
//         .lp-testimonial__role { font-size: 12px; color: #aaa; }
 
//         /* ── FAQ ── */
//         .lp-faqs { display: flex; flex-direction: column; }
//         .lp-faq { border-bottom: 1px solid #f0f0f0; }
//         .lp-faq__q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; cursor: pointer; font-size: 15px; font-weight: 500; color: #111; background: none; border: none; text-align: left; width: 100%; font-family: 'DM Sans', sans-serif; transition: color .15s; }
//         .lp-faq__q:hover { color: #16a34a; }
//         .lp-faq__icon { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid #e5e7eb; display: flex; align-items: center; justify-content: center; color: #666; transition: all .2s; }
//         .lp-faq--open .lp-faq__icon { background: #16a34a; border-color: #16a34a; color: #fff; transform: rotate(45deg); }
//         .lp-faq__a { font-size: 14px; color: #666; line-height: 1.78; padding: 0 40px 20px 0; margin: 0; }
 
//         /* ── CONTACT ── */
//         .lp-contact { background: #0d1a0f; padding: 100px 24px; }
//         .lp-contact__inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 5fr 7fr; gap: 80px; align-items: start; }
//         .lp-contact__title { font-family: 'Instrument Serif', serif; font-size: clamp(28px, 3.5vw, 42px); color: #fff; margin: 16px 0; line-height: 1.15; letter-spacing: -.3px; }
//         .lp-contact__sub { font-size: 15px; color: rgba(255,255,255,.55); line-height: 1.72; margin: 0 0 36px; }
//         .lp-contact__details { display: flex; flex-direction: column; gap: 20px; margin-bottom: 36px; }
//         .lp-contact__detail { display: flex; align-items: flex-start; gap: 14px; text-decoration: none; transition: opacity .2s; }
//         .lp-contact__detail:hover { opacity: .75; }
//         .lp-contact__detail-icon { width: 42px; height: 42px; border-radius: 12px; background: rgba(22,163,74,.15); border: 1px solid rgba(22,163,74,.2); display: flex; align-items: center; justify-content: center; color: #4ade80; flex-shrink: 0; }
//         .lp-contact__detail-label { font-size: 11px; color: rgba(255,255,255,.4); font-weight: 500; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 2px; }
//         .lp-contact__detail-value { font-size: 14px; color: rgba(255,255,255,.85); font-weight: 500; margin: 0; }
//         .lp-contact__socials { display: flex; gap: 10px; }
//         .lp-contact__social { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,.5); transition: all .2s; text-decoration: none; }
//         .lp-contact__social:hover { background: rgba(22,163,74,.2); border-color: rgba(22,163,74,.3); color: #4ade80; }
 
//         /* Form */
//         .lp-contact__form-wrap { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 24px; padding: 40px; backdrop-filter: blur(8px); }
//         .lp-contact__form { display: flex; flex-direction: column; gap: 20px; }
//         .lp-contact__form-header { margin-bottom: 4px; }
//         .lp-contact__form-title { font-size: 20px; font-weight: 600; color: #fff; margin: 0 0 6px; letter-spacing: -.3px; }
//         .lp-contact__form-sub { font-size: 13px; color: rgba(255,255,255,.4); margin: 0; }
//         .lp-contact__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//         .lp-contact__field { display: flex; flex-direction: column; gap: 6px; }
//         .lp-contact__label { font-size: 12.5px; font-weight: 500; color: rgba(255,255,255,.55); letter-spacing: .02em; }
//         .lp-contact__optional { color: rgba(255,255,255,.25); font-weight: 400; }
//         .lp-contact__input { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 11px 14px; font-size: 14px; color: #fff; font-family: 'DM Sans', sans-serif; outline: none; transition: all .2s; }
//         .lp-contact__input::placeholder { color: rgba(255,255,255,.25); }
//         .lp-contact__input:focus { border-color: rgba(22,163,74,.5); background: rgba(255,255,255,.08); box-shadow: 0 0 0 3px rgba(22,163,74,.12); }
//         .lp-contact__textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
//         .lp-contact__submit { display: flex; align-items: center; justify-content: center; gap: 8px; background: #16a34a; color: #fff; border: none; border-radius: 12px; padding: 13px 24px; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .2s; margin-top: 4px; }
//         .lp-contact__submit:hover:not(:disabled) { background: #15803d; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,.4); }
//         .lp-contact__submit:disabled { opacity: .65; cursor: not-allowed; }
//         .lp-contact__spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }
 
//         /* Success state */
//         .lp-contact__success { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 14px; min-height: 300px; }
//         .lp-contact__success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(22,163,74,.1); border: 1px solid rgba(22,163,74,.2); display: flex; align-items: center; justify-content: center; }
//         .lp-contact__success-title { font-size: 22px; font-weight: 600; color: #fff; margin: 0; }
//         .lp-contact__success-sub { font-size: 14px; color: rgba(255,255,255,.5); line-height: 1.65; max-width: 300px; margin: 0; }
//         .lp-contact__success-btn { background: none; border: 1px solid rgba(255,255,255,.15); color: rgba(255,255,255,.5); padding: 8px 18px; border-radius: 8px; font-size: 13px; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; margin-top: 8px; }
//         .lp-contact__success-btn:hover { border-color: rgba(255,255,255,.3); color: rgba(255,255,255,.8); }
 
//         /* ── CTA ── */
//         .lp-cta { padding: 100px 24px; background: #0f2417; position: relative; overflow: hidden; text-align: center; }
//         .lp-cta__bg { position: absolute; inset: 0; background-image: radial-gradient(ellipse at 20% 50%, rgba(22,163,74,.15), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(22,163,74,.1), transparent 60%); pointer-events: none; }
//         .lp-cta__inner { position: relative; max-width: 580px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
//         .lp-cta__title { font-family: 'Instrument Serif', serif; font-size: clamp(30px, 4vw, 46px); color: #fff; margin: 0; line-height: 1.15; letter-spacing: -.3px; }
//         .lp-cta__sub { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.65; margin: 0; }
 
//         /* ── FOOTER ── */
//         .lp-footer { border-top: 1px solid #f0f0f0; padding: 56px 24px 0; }
//         .lp-footer__inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid #f0f0f0; align-items: start; }
//         .lp-footer__brand { display: flex; flex-direction: column; gap: 12px; }
//         .lp-footer__tagline { font-size: 14px; color: #999; margin: 0; }
//         .lp-footer__links { display: flex; gap: 48px; }
//         .lp-footer__col { display: flex; flex-direction: column; gap: 10px; }
//         .lp-footer__col-title { font-size: 11.5px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
//         .lp-footer__col a { font-size: 14px; color: #555; text-decoration: none; transition: color .15s; }
//         .lp-footer__col a:hover { color: #16a34a; }
//         .lp-footer__bottom { max-width: 1200px; margin: 0 auto; padding: 20px 0; display: flex; justify-content: space-between; font-size: 13px; color: #bbb; }
 

//         .lp-logo__image {
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// }
//         /* ── RESPONSIVE ── */
//         @media (max-width: 960px) {
//           .lp-hero__inner { grid-template-columns: 1fr; gap: 48px; text-align: center; padding: 60px 24px; }
//           .lp-hero__content { align-items: center; }
//           .lp-hero__sub { text-align: center; }
//           .lp-hero__visual { display: none; }
//           .lp-steps { flex-direction: column; align-items: stretch; }
//           .lp-step__arrow { display: none; }
//           .lp-testimonials { grid-template-columns: 1fr 1fr; }
//           .lp-contact__inner { grid-template-columns: 1fr; gap: 48px; }
//           .lp-nav__links { display: none; }
//           .lp-nav__cta { display: none; }
//           .lp-hamburger { display: flex; }
//           .lp-footer__inner { grid-template-columns: 1fr; }
//           .lp-footer__links { flex-wrap: wrap; gap: 32px; }
//         }
//         @media (max-width: 640px) {
//           .lp-testimonials { grid-template-columns: 1fr; }
//           .lp-section { padding: 64px 20px; }
//           .lp-how { padding: 64px 20px; }
//           .lp-contact { padding: 64px 20px; }
//           .lp-contact__form-wrap { padding: 24px 20px; }
//           .lp-contact__row { grid-template-columns: 1fr; }
//           .lp-hero__stats { justify-content: center; }
//           .lp-hero__actions { justify-content: center; }
//           .lp-footer__bottom { flex-direction: column; gap: 6px; text-align: center; }
//         }

//       `}</style>
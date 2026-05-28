'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="lp-footer">
      <div className="lp-footer__inner">
        <div className="lp-footer__brand">
          <a href="#" className="lp-logo">
            <img
              src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png"
              alt="MenuQR Logo"
              width={170}
              height={170}
            />
          </a>
          <p className="lp-footer__tagline">Digital menus for Ethiopian restaurants.</p>
        </div>

        <div className="lp-footer__links">
          <div className="lp-footer__col">
            <span className="lp-footer__col-title">Product</span>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#how">How it works</a>
          </div>
          <div className="lp-footer__col">
            <span className="lp-footer__col-title">Company</span>
            <a href="#testimonials">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="lp-footer__col">
            <span className="lp-footer__col-title">Account</span>
            <Link href="/signin">Sign in</Link>
            <Link href="/signup">Sign up free</Link>
          </div>
        </div>
      </div>

      <div className="lp-footer__bottom">
        <span>© {new Date().getFullYear()} MenuQR. All rights reserved.</span>
        <span>Built with ❤️ for Ethiopia 🇪🇹</span>
      </div>
    </footer>
  );
};

export default Footer;
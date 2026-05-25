'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { DemoOne } from '@/components/logomarque'
import { Typewriter } from '@/components/ui/typewritter'
import PremiumFeaturesCarousel from '@/components/Sections/features'
import Avatar11 from '@/components/ui/avatar-11'
import PremiumPricingSection from '../components/Sections/Priceing'
 
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', restaurant: '', message: '' })
  const [contactSent, setContactSent] = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
 
  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactLoading(true)
    // Replace with your actual contact API call
    await new Promise(r => setTimeout(r, 1200))
    setContactSent(true)
    setContactLoading(false)
  }

  return (
    <div className="lp-root">
 
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}>
        <div className="lp-nav__inner">
          <a href="#" className="lp-logo">
            <span className="lp-logo__icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor"/>
                <rect x="12" y="1" width="7" height="7" rx="1.5" fill="currentColor"/>
                <rect x="1" y="12" width="7" height="7" rx="1.5" fill="currentColor"/>
                <rect x="12" y="12" width="3" height="3" rx="0.75" fill="currentColor"/>
                <rect x="16" y="12" width="3" height="3" rx="0.75" fill="currentColor"/>
                <rect x="12" y="16" width="3" height="3" rx="0.75" fill="currentColor"/>
                <rect x="16" y="16" width="3" height="3" rx="0.75" fill="currentColor"/>
              </svg>
            </span>
            <span className="lp-logo__text">MenuQR</span>
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
          <button className="lp-hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
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
 
      {/* ── HERO ────────────────────────────────────────────── */}
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
              Trusted by 10+ restaurants in Ethiopia
            </div>
            <h1 className="lp-hero__title">
              Your menu,<br />
              <Typewriter words={['beautifully digital.', 'always up to date.', 'in customers\' hands.']} className="lp-hero__title--accent" />
            </h1>
            <p className="lp-hero__sub">
              Create stunning digital menus, generate QR codes instantly, and let customers browse from their phones — no app download required.
            </p>
            <div className="lp-hero__actions">
              <Link href="/signup" className="lp-btn lp-btn--hero">
                Start free today
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#how" className="lp-btn lp-btn--outline">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/></svg>
                See how it works
              </a>
            </div>
            <div className="lp-hero__stats">
              <div className="lp-stat">
                <span className="lp-stat__num">10+</span>
                <span className="lp-stat__label">Restaurants</span>
              </div>
              <div className="lp-stat__divider" />
              <div className="lp-stat">
                <span className="lp-stat__num">200+</span>
                <span className="lp-stat__label">Menu scans / mo</span>
              </div>
              <div className="lp-stat__divider" />
              <div className="lp-stat">
                <span className="lp-stat__num">2 min</span>
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
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://menuqr.com/demo" alt="QR code" className="lp-phone__qr-img" />
                <span>Scan me</span>
              </div>
              <div className="lp-phone__float lp-phone__float--1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5 5.5 4 7 1z" fill="#f59e0b"/></svg>
                4.9 rating
              </div>
              <div className="lp-phone__float lp-phone__float--2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="#22c55e" opacity=".2"/><circle cx="6" cy="6" r="3" fill="#22c55e"/></svg>
                Live menu
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── LOGOS ───────────────────────────────────────────── */}
      <section className="lp-logos">
        <p className="lp-logos__label">Trusted by leading restaurants across Ethiopia</p>
        <div className="lp-logos__row">
          <DemoOne />
        </div>
      </section>


      {/* ── FEATURES GRID ───────────────────────────────────── */}
      <section className="lp-section" id="features">
        <div className="lp-section__inner">
          <div className="lp-section__header">
            <div className="lp-eyebrow">Features</div>
            <div> <Typewriter   words={["Everything your restaurant needs"]} className="lp-section__title" /></div>
           
            <p className="lp-section__sub">A complete digital menu platform built for Ethiopian restaurants — from setup to the customer's table in minutes.</p>
          </div>
          
{/*         
          <div className="lp-features">

            <div className="lp-feature lp-feature--large">
              <div className="lp-feature__content">
                <div className="lp-feature__icon lp-feature__icon--green">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 4v5l3 3-1.5 1.5L9 12.5V6H11z" fill="currentColor"/></svg>
                </div>
                <h3 className="lp-feature__title">Live menu updates</h3>
                <p className="lp-feature__desc">Change prices, hide sold-out items, add daily specials — updates reflect instantly on every customer's phone. No reprinting, no delay.</p>
              </div>
              <div className="lp-feature__visual">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop" alt="Restaurant kitchen" className="lp-feature__img"/>
                <div className="lp-feature__visual-card">
                  <div className="lp-feature__visual-dot lp-feature__visual-dot--live"/>
                  <span>Updated 2 sec ago</span>
                </div>
              </div>
            </div>

            <div className="lp-feature-grid">
              <div className="lp-feature">
                <div className="lp-feature__icon lp-feature__icon--amber">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="12" y="3" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="3" y="12" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="12" y="12" width="3" height="3" rx="0.75" fill="currentColor"/><rect x="16" y="12" width="3" height="3" rx="0.75" fill="currentColor"/><rect x="12" y="16" width="3" height="3" rx="0.75" fill="currentColor"/><rect x="16" y="16" width="3" height="3" rx="0.75" fill="currentColor"/></svg>
                </div>
                <h3 className="lp-feature__title">Instant QR generation</h3>
                <p className="lp-feature__desc">Get a print-ready QR code for every menu. Download as PNG, print on table cards, and you're done.</p>
              </div>
              <div className="lp-feature">
                <div className="lp-feature__icon lp-feature__icon--blue">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="2" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 6h6M8 10h6M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="lp-feature__title">Multi-menu support</h3>
                <p className="lp-feature__desc">Create separate lunch, dinner, drinks, and seasonal menus. Switch them active with one tap.</p>
              </div>
              <div className="lp-feature">
                <div className="lp-feature__icon lp-feature__icon--purple">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>
                </div>
                <h3 className="lp-feature__title">Beautiful customer view</h3>
                <p className="lp-feature__desc">Customers get a fast, gorgeous menu page — no app, no login, no friction. Just scan and browse.</p>
              </div>
              <div className="lp-feature">
                <div className="lp-feature__icon lp-feature__icon--rose">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M9 11l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <h3 className="lp-feature__title">Item availability toggle</h3>
                <p className="lp-feature__desc">Sold out of Tibs? Hide it in one click. It disappears from every customer's view immediately.</p>
              </div>
            </div>

          </div> */}
        </div>
      </section>
      <PremiumFeaturesCarousel />
      

     
 
      {/* ── HOW IT WORKS ────────────────────────────────────── */} 
      <section className="lp-how" id="how">
        <div className="lp-section__inner">
          <div className="lp-section__header">
            
            <div className="lp-eyebrow">How it works</div>
            <div> <Typewriter   words={["Live in 3 simple steps"]} className="lp-section__title" /> </div>
          </div>
          <div className="lp-steps">
            <div className="lp-step">
              <div className="lp-step__num">01</div>
              <div className="lp-step__visual"> 
               <img src="https://ik.imagekit.io/sl226drpx/a-professional-product-photography-shot-_UAFbpgn6SqS-nn6jIt4JXA_B_OzBAbvSoSlI6nHvozssQ_sd.jpeg" alt="Build menu" className="lp-step__img"/>
              </div>
              <h3 className="lp-step__title">Build your menu</h3>
              <p className="lp-step__desc">Sign up, create your restaurant, add categories like Starters, Mains, and Drinks, then add your items with prices and photos.</p>
            </div>
            <div className="lp-step__arrow">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16h16M20 10l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="lp-step">
              <div className="lp-step__num">02</div>
              <div className="lp-step__visual">
                <img src="https://ik.imagekit.io/sl226drpx/a-clean-modern-user-interface-design-sho_dmdjGEPsUMGuvGy1fLhEWg_ocgXTblFQXSmonSMpxPfJA_sd.jpeg" alt="Generate QR" className="lp-step__img"/>
              </div>
              <h3 className="lp-step__title">Generate your QR code</h3>
              <p className="lp-step__desc">Click generate — your unique QR code is ready instantly. Download it as a PNG and print it on table cards or tent cards.</p>
            </div>
            <div className="lp-step__arrow">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16h16M20 10l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="lp-step">
              <div className="lp-step__num">03</div>
              <div className="lp-step__visual">
                <img src="https://blogadmin.vpsvc.com/hub/wp-content/uploads/sites/14/2022/12/CMT-1438-QRcodesForYourSmallBusiness-Marquee_en-us-1-scaled.jpg" alt="Customer scans" className="lp-step__img"/>
              </div>
              <h3 className="lp-step__title">Customers scan & browse</h3>
              <p className="lp-step__desc">Guests point their phone camera at the QR code. Your full menu loads instantly in their browser — beautiful, fast, and no app needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* {/* ── SHOWCASE IMAGE ───────────────────────────────────── */}
      {/* <section className="lp-showcase">
        <div className="lp-showcase__inner">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85&auto=format&fit=crop"
            alt="Restaurant interior"
            className="lp-showcase__img"
          />
          <div className="lp-showcase__overlay">
            <div className="lp-showcase__quote">
              "We went from a laminated paper menu to a beautiful digital one in 20 minutes. Our customers love it."
            </div>
            <div className="lp-showcase__author">
              <div className="lp-showcase__avatar">AK</div>
              <div>
                <div className="lp-showcase__name">Abebe Kebede</div>
                <div className="lp-showcase__role">Owner, Habesha Kitchen · Addis Ababa</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="lp-section" id="testimonials">
        <div className="lp-section__inner">
          <div className="lp-section__header">
            <div className="lp-eyebrow">Reviews</div>
            <h2 className="lp-section__title">What restaurant owners say</h2>
          </div>
          <div className="lp-testimonials">
            {[
              { name: 'Tigist Haile',   role: 'Yod Restaurant',        text: 'Setup took less than 30 minutes. Now I update my menu from my phone while I\'m at the market. No more printing!', stars: 5, initials: 'TH' , avatar: <Avatar11 /> },
              { name: 'Dawit Mulugeta', role: 'Addis Coffee House',     text: 'My customers are impressed every time they scan the QR. The menu looks so professional and loads instantly.', stars: 5, initials: 'DM' , avatar: <Avatar11 />},
              { name: 'Sara Tesfaye',   role: 'Kategna Bole',           text: 'I have 3 different menus — breakfast, lunch, and dinner. Switching between them is one tap. Amazing product.', stars: 5, initials: 'ST', avatar: <Avatar11 /> },
              { name: 'Yonas Bekele',   role: 'Gusto Restaurant',       text: 'The best investment for my restaurant this year. Customers love it and I save money on printing every month.', stars: 5, initials: 'YB', avatar: <Avatar11 /> },
              { name: 'Meron Alemu',    role: 'Lucy Restaurant',        text: 'When we run out of a dish we just hide it from the app. No more awkward conversations telling customers it\'s unavailable.', stars: 5, initials: 'MA', avatar: <Avatar11 /> },
              { name: 'Kirubel Tadesse','role': '2000 Habesha',         text: 'Incredibly easy to use. I added photos to every dish and my customers always comment on how beautiful the menu looks.', stars: 5, initials: 'KT', avatar: <Avatar11 /> },
            ].map(t => (
              <div key={t.name} className="lp-testimonial">
                <div className="lp-testimonial__stars">
                  {Array.from({length: t.stars}).map((_,i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b"><path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5 5.5 4 7 1z"/></svg>
                  ))}
                </div>
                <p className="lp-testimonial__text">"{t.text}"</p>
                <div className="lp-testimonial__author">
                  {t.avatar || <div className="lp-testimonial__avatar">{t.initials}</div>}
                  <div>
                    <div className="lp-testimonial__name">{t.name}</div>
                    <div className="lp-testimonial__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <PremiumPricingSection />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="lp-section" id="faq">
        <div className="lp-section__inner lp-section__inner--narrow">
          <div className="lp-section__header">
            <div className="lp-eyebrow">FAQ</div>
            <h2 className="lp-section__title">Common questions</h2>
          </div>
          <div className="lp-faqs">
            {[
              { q: 'Do my customers need to download an app?', a: 'No. Customers simply point their phone camera at the QR code and your menu opens in their browser instantly. No app download, no account, no friction.' },
              { q: 'Can I update my menu in real time?', a: 'Yes. Any change you make — price update, new item, hiding a sold-out dish — appears on every customer\'s screen within seconds.' },
              { q: 'What if I have multiple menus?', a: 'Each menu gets its own unique QR code. You can create a Breakfast menu, Lunch menu, and Drinks menu — each with its own QR code for different tables or times.' },
              { q: 'Can I add photos to my menu items?', a: 'Absolutely. You can add an image URL for any item. We recommend using high-quality food photos to make your menu more appetizing.' },
              { q: 'What payment methods does Chapa accept?', a: 'Chapa supports all major Ethiopian payment methods including Telebirr, CBEBirr, Awash Bank, and bank cards.' },
              { q: 'Can I cancel my subscription anytime?', a: 'Yes. Your subscription runs for 30 days. You can choose not to renew at any time with no penalty.' },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
         <section className="lp-contact" id="contact">
        <div className="lp-contact__inner">
 
          {/* Left info panel */}
          <div className="lp-contact__info">
            <div className="lp-eyebrow lp-eyebrow--light">Contact</div>
            <h2 className="lp-contact__title">Get in touch with us</h2>
            <p className="lp-contact__sub">
              Have a question, need a demo, or want to talk about custom features for your restaurant? We're here to help.
            </p>
 
            <div className="lp-contact__details">
              <a href="mailto:hello@menuqr.et" className="lp-contact__detail">
                <div className="lp-contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <p className="lp-contact__detail-label">Email us</p>
                  <p className="lp-contact__detail-value">hello@menuqr.et</p>
                </div>
              </a>
 
              <a href="tel:+251911000000" className="lp-contact__detail">
                <div className="lp-contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3h3.5l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5L12 11l4 1.5V16a1 1 0 01-1 1C6.163 17 1 11.837 1 5.5A1.5 1.5 0 013 4V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p className="lp-contact__detail-label">Call us</p>
                  <p className="lp-contact__detail-value">+251 911 000 000</p>
                </div>
              </a>
 
              <div className="lp-contact__detail">
                <div className="lp-contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1C5.686 1 3 3.686 3 7c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div>
                  <p className="lp-contact__detail-label">Find us</p>
                  <p className="lp-contact__detail-value">Bole, Addis Ababa, Ethiopia</p>
                </div>
              </div>
 
              <div className="lp-contact__detail">
                <div className="lp-contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <p className="lp-contact__detail-label">Support hours</p>
                  <p className="lp-contact__detail-value">Mon–Sat, 8 AM – 6 PM EAT</p>
                </div>
              </div>
            </div>
 
            {/* Social links */}
            <div className="lp-contact__socials">
              <a href="#" className="lp-contact__social" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.61c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.105l-2.95-.924c-.642-.2-.654-.642.136-.953l11.527-4.445c.535-.194 1.003.13.37.465z"/></svg>
              </a>
              <a href="#" className="lp-contact__social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0"/></svg>
              </a>
              <a href="#" className="lp-contact__social" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97H15.83c-1.49 0-1.955.93-1.955 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
            </div>
          </div>
 
          {/* Right form */}
          <div className="lp-contact__form-wrap">
            {contactSent ? (
              <div className="lp-contact__success">
                <div className="lp-contact__success-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#16a34a" strokeWidth="2"/><path d="M9 16l5 5 9-9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="lp-contact__success-title">Message sent!</h3>
                <p className="lp-contact__success-sub">We'll get back to you within 24 hours. Thank you for reaching out.</p>
                <button
                  onClick={() => { setContactSent(false); setContactForm({ name: '', email: '', restaurant: '', message: '' }) }}
                  className="lp-contact__success-btn"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContact} className="lp-contact__form">
                <div className="lp-contact__form-header">
                  <h3 className="lp-contact__form-title">Send us a message</h3>
                  <p className="lp-contact__form-sub">We typically reply within a few hours.</p>
                </div>
 
                <div className="lp-contact__row">
                  <div className="lp-contact__field">
                    <label className="lp-contact__label">Your name</label>
                    <input
                      type="text"
                      required
                      placeholder="Abebe Kebede"
                      value={contactForm.name}
                      onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                      className="lp-contact__input"
                    />
                  </div>
                  <div className="lp-contact__field">
                    <label className="lp-contact__label">Email address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@restaurant.com"
                      value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      className="lp-contact__input"
                    />
                  </div>
                </div>
 
                <div className="lp-contact__field">
                  <label className="lp-contact__label">Restaurant name <span className="lp-contact__optional">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Habesha Kitchen"
                    value={contactForm.restaurant}
                    onChange={e => setContactForm(f => ({ ...f, restaurant: e.target.value }))}
                    className="lp-contact__input"
                  />
                </div>
 
                <div className="lp-contact__field">
                  <label className="lp-contact__label">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what you need — a demo, a question, or custom features..."
                    value={contactForm.message}
                    onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                    className="lp-contact__input lp-contact__textarea"
                  />
                </div>
 
                <button type="submit" disabled={contactLoading} className="lp-contact__submit">
                  {contactLoading ? (
                    <span className="lp-contact__spinner" />
                  ) : (
                    <>
                      Send message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
 
      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="lp-cta">
        <div className="lp-cta__bg" />
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Ready to modernize your menu?</h2>
          <p className="lp-cta__sub">Join Ethiopian restaurants already using MenuQR. Setup takes less than 10 minutes.</p>
          <Link href="/signup" className="lp-btn lp-btn--cta">
            Create your free account
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="lp-cta">
        <div className="lp-cta__bg"/>
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Ready to modernize your menu?</h2>
          <p className="lp-cta__sub">Join 500+ Ethiopian restaurants already using MenuQR. Setup takes less than 10 minutes.</p>
          <Link href="/signup" className="lp-btn lp-btn--cta">
            Create your free account
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
   <footer className="lp-footer">
        <div className="lp-footer__inner">
          <div className="lp-footer__brand">
            <a href="#" className="lp-logo">
              <span className="lp-logo__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor"/>
                  <rect x="12" y="1" width="7" height="7" rx="1.5" fill="currentColor"/>
                  <rect x="1" y="12" width="7" height="7" rx="1.5" fill="currentColor"/>
                  <rect x="12" y="12" width="3" height="3" rx="0.75" fill="currentColor"/>
                  <rect x="16" y="12" width="3" height="3" rx="0.75" fill="currentColor"/>
                  <rect x="12" y="16" width="3" height="3" rx="0.75" fill="currentColor"/>
                  <rect x="16" y="16" width="3" height="3" rx="0.75" fill="currentColor"/>
                </svg>
              </span>
              <span className="lp-logo__text">MenuQR</span>
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lp-root { font-family: 'DM Sans', sans-serif; color: #111; background: #fff; overflow-x: hidden; }

        /* NAV */
        .lp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all .3s; padding: 0 24px; }
        .lp-nav--scrolled { background: rgba(255,255,255,.92); backdrop-filter: blur(12px); border-bottom: 1px solid #f0f0f0; box-shadow: 0 1px 20px rgba(0,0,0,.06); }
        .lp-nav__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 32px; height: 68px; }
        .lp-nav__links { display: flex; gap: 6px; margin-left: auto; }
        .lp-nav__link { padding: 8px 14px; font-size: 14px; color: #444; border-radius: 8px; text-decoration: none; transition: all .2s; }
        .lp-nav__link:hover { background: #f5f5f5; color: #111; }
        .lp-nav__cta { display: flex; gap: 8px; align-items: center; }
        .lp-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; margin-left: auto; }
        .lp-hamburger span { display: block; width: 22px; height: 2px; background: #333; border-radius: 2px; }
        .lp-mobile-menu { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px 16px; border-top: 1px solid #f0f0f0; background: #fff; }
        .lp-mobile-menu a { padding: 10px 12px; font-size: 15px; color: #333; text-decoration: none; border-radius: 8px; }
        .lp-mobile-menu a:hover { background: #f5f5f5; }

        /* LOGO */
        .lp-logo { display: flex; align-items: center; gap: 9px; text-decoration: none; flex-shrink: 0; }
        .lp-logo__icon { width: 34px; height: 34px; background: #16a34a; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #fff; }
        .lp-logo__text { font-family: 'Instrument Serif', serif; font-size: 20px; color: #111; letter-spacing: -.3px; }

        /* BUTTONS */
        .lp-btn { display: inline-flex; align-items: center; gap: 7px; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 10px; transition: all .2s; cursor: pointer; border: none; white-space: nowrap; }
        .lp-btn--ghost { padding: 8px 16px; color: #444; }
        .lp-btn--ghost:hover { background: #f5f5f5; color: #111; }
        .lp-btn--primary { padding: 9px 18px; background: #16a34a; color: #fff; }
        .lp-btn--primary:hover { background: #15803d; transform: translateY(-1px); }
        .lp-btn--hero { padding: 14px 28px; background: #16a34a; color: #fff; font-size: 16px; border-radius: 12px; box-shadow: 0 4px 20px rgba(22,163,74,.35); }
        .lp-btn--hero:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 6px 28px rgba(22,163,74,.4); }
        .lp-btn--outline { padding: 14px 24px; border: 1.5px solid #e0e0e0; color: #444; font-size: 15px; border-radius: 12px; background: rgba(255,255,255,.6); backdrop-filter: blur(8px); }
        .lp-btn--outline:hover { border-color: #bbb; background: #fff; transform: translateY(-1px); }
        .lp-btn--cta { padding: 16px 32px; background: #fff; color: #16a34a; font-size: 16px; font-weight: 600; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,.12); }
        .lp-btn--cta:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(0,0,0,.18); }

        /* HERO */
        .lp-hero { min-height: 100vh; display: flex; align-items: center; padding-top: 68px; position: relative; overflow: hidden; background: linear-gradient(160deg, #f0fdf4 0%, #fff 50%, #f0fdf4 100%); }
        .lp-hero__bg { position: absolute; inset: 0; pointer-events: none; }
        .lp-hero__blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .5; }
        .lp-hero__blob--1 { width: 600px; height: 600px; background: radial-gradient(circle, #bbf7d0, transparent); top: -100px; right: -100px; }
        .lp-hero__blob--2 { width: 400px; height: 400px; background: radial-gradient(circle, #d1fae5, transparent); bottom: 0; left: -100px; }
        .lp-hero__grid { position: absolute; inset: 0; background-image: linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px); background-size: 48px 48px; opacity: .2; }
        .lp-hero__inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; width: 100%; position: relative; }
        .lp-hero__content { display: flex; flex-direction: column; gap: 28px; }
        .lp-badge { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid #bbf7d0; color: #15803d; font-size: 13px; font-weight: 500; padding: 7px 14px; border-radius: 100px; width: fit-content; box-shadow: 0 2px 8px rgba(22,163,74,.1); }
        .lp-badge__dot { width: 7px; height: 7px; background: #16a34a; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.85)} }
        .lp-hero__title { font-family: 'Instrument Serif', serif; font-size: clamp(42px, 5vw, 64px); line-height: 1.1; color: #0a0a0a; letter-spacing: -.5px; margin: 0; }
        .lp-hero__title--accent { color: #16a34a; font-style: italic; }
        .lp-hero__sub { font-size: 18px; line-height: 1.7; color: #555; margin: 0; max-width: 480px; }
        .lp-hero__actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .lp-hero__stats { display: flex; align-items: center; gap: 24px; padding-top: 8px; }
        .lp-stat { display: flex; flex-direction: column; }
        .lp-stat__num { font-size: 22px; font-weight: 600; color: #111; letter-spacing: -.5px; }
        .lp-stat__label { font-size: 12px; color: #888; }
        .lp-stat__divider { width: 1px; height: 36px; background: #e0e0e0; }

        /* PHONE MOCKUP */
        .lp-hero__visual { display: flex; justify-content: center; position: relative; }
        .lp-phone { position: relative; }
        .lp-phone__shell { width: 240px; background: #1a1a1a; border-radius: 36px; padding: 12px; box-shadow: 0 32px 80px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.1) inset; }
        .lp-phone__notch { width: 80px; height: 22px; background: #1a1a1a; border-radius: 0 0 14px 14px; margin: 0 auto 8px; position: relative; z-index: 1; }
        .lp-phone__screen { border-radius: 26px; overflow: hidden; background: #fff; min-height: 400px; position: relative; }
        .lp-phone__img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .lp-phone__overlay { padding: 12px; }
        .lp-phone__card { background: #fff; }
        .lp-phone__card-tag { font-size: 10px; font-weight: 600; color: #16a34a; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
        .lp-phone__card-item { display: flex; justify-content: space-between; font-size: 12px; color: #333; padding: 7px 0; border-bottom: 1px solid #f5f5f5; }
        .lp-phone__card-item:last-child { border: none; }
        .lp-phone__qr { position: absolute; bottom: -20px; right: -20px; background: #fff; border-radius: 16px; padding: 12px; box-shadow: 0 8px 32px rgba(0,0,0,.15); display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .lp-phone__qr span { font-size: 10px; font-weight: 600; color: #16a34a; }
        .lp-phone__float { position: absolute; background: #fff; border-radius: 20px; padding: 8px 12px; font-size: 11px; font-weight: 500; color: #333; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 16px rgba(0,0,0,.12); white-space: nowrap; }
        .lp-phone__float--1 { top: 20px; left: -30px; animation: float1 3s ease-in-out infinite; }
        .lp-phone__float--2 { bottom: 60px; left: -40px; animation: float2 3.5s ease-in-out infinite; }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

        /* LOGOS */
        .lp-logos { border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; padding: 28px 24px; text-align: center; }
        .lp-logos__label { font-size: 12px; color: #aaa; font-weight: 500; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 18px; }
        .lp-logos__row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 24px; }
        .lp-logos__item { font-size: 13px; font-weight: 500; color: #999; padding: 4px 0; }

        /* SECTIONS */
        .lp-section { padding: 100px 24px; }
        .lp-section__inner { max-width: 1200px; margin: 0 auto; }
        .lp-section__inner--narrow { max-width: 780px; }
        .lp-section__header { text-align: center; margin-bottom: 64px; }
        .lp-eyebrow { display: inline-flex; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 5px 14px; border-radius: 100px; margin-bottom: 16px; }
        .lp-eyebrow--light { color: #86efac; background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.2); }
        .lp-section__title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 4vw, 48px); color: #0a0a0a; letter-spacing: -.5px; margin: 0 0 16px; line-height: 1.15; }
        .lp-section__title--light { color: #fff; }
        .lp-section__sub { font-size: 17px; color: #666; line-height: 1.7; max-width: 540px; margin: 0 auto; }
        .lp-section__sub--light { color: rgba(255,255,255,.75); }

        /* FEATURES */
        .lp-features { display: flex; flex-direction: column; gap: 24px; }
        .lp-feature--large { background: #f9fafb; border: 1px solid #f0f0f0; border-radius: 24px; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; }
        .lp-feature--large .lp-feature__content { padding: 48px; display: flex; flex-direction: column; gap: 16px; justify-content: center; }
        .lp-feature--large .lp-feature__visual { position: relative; overflow: hidden; min-height: 320px; }
        .lp-feature--large .lp-feature__img { width: 100%; height: 100%; object-fit: cover; }
        .lp-feature__visual-card { position: absolute; bottom: 20px; left: 20px; background: rgba(255,255,255,.95); backdrop-filter: blur(8px); border-radius: 12px; padding: 10px 14px; font-size: 12px; font-weight: 500; color: #333; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1); }
        .lp-feature__visual-dot { width: 8px; height: 8px; border-radius: 50%; animation: pulse 2s infinite; }
        .lp-feature__visual-dot--live { background: #16a34a; }
        .lp-feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .lp-feature { background: #f9fafb; border: 1px solid #f0f0f0; border-radius: 20px; padding: 32px; transition: all .2s; }
        .lp-feature:hover { border-color: #d1fae5; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
        .lp-feature__icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .lp-feature__icon--green { background: #dcfce7; color: #16a34a; }
        .lp-feature__icon--amber { background: #fef3c7; color: #d97706; }
        .lp-feature__icon--blue { background: #dbeafe; color: #2563eb; }
        .lp-feature__icon--purple { background: #ede9fe; color: #7c3aed; }
        .lp-feature__icon--rose { background: #ffe4e6; color: #e11d48; }
        .lp-feature__title { font-size: 17px; font-weight: 600; color: #111; margin: 0 0 10px; }
        .lp-feature__desc { font-size: 14px; color: #666; line-height: 1.65; margin: 0; }

        /* HOW IT WORKS */
        .lp-how { background: #f9fafb; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; padding: 100px 24px; }
        .lp-steps { display: flex; align-items: flex-start; gap: 16px; }
        .lp-step { flex: 1; display: flex; flex-direction: column; gap: 16px; }
        .lp-step__num { font-family: 'Instrument Serif', serif; font-size: 48px; color: #0ec721; line-height: 1; }
        .lp-step__visual { border-radius: 20px; overflow: hidden; height: 220px; }
        .lp-step__img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
        .lp-step__img:hover { transform: scale(1.04); }
        .lp-step__title { font-size: 18px; font-weight: 600; color: #111; margin: 0; }
        .lp-step__desc { font-size: 14px; color: #666; line-height: 1.65; margin: 0; }
        .lp-step__arrow { flex-shrink: 0; color: #000000; margin-top: 140px; }

        /* SHOWCASE */
        .lp-showcase { padding: 0 24px 0; }
        .lp-showcase__inner { max-width: 1200px; margin: 0 auto; border-radius: 32px; overflow: hidden; position: relative; height: 480px; }
        .lp-showcase__img { width: 100%; height: 100%; object-fit: cover; }
        .lp-showcase__overlay { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.3) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 56px; gap: 20px; }
        .lp-showcase__quote { font-family: 'Instrument Serif', serif; font-size: clamp(20px, 2.5vw, 28px); color: #fff; line-height: 1.5; max-width: 640px; font-style: italic; }
        .lp-showcase__author { display: flex; align-items: center; gap: 16px; }
        .lp-showcase__avatar { width: 48px; height: 48px; border-radius: 50%; background: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600; color: #fff; flex-shrink: 0; }
        .lp-showcase__name { font-size: 15px; font-weight: 600; color: #fff; }
        .lp-showcase__role { font-size: 13px; color: rgba(255,255,255,.65); }

        /* TESTIMONIALS */
        .lp-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lp-testimonial { background: #f9fafb; border: 1px solid #f0f0f0; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 16px; transition: all .2s; }
        .lp-testimonial:hover { border-color: #d1fae5; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
        .lp-testimonial__stars { display: flex; gap: 3px; }
        .lp-testimonial__text { font-size: 14px; color: #555; line-height: 1.7; flex: 1; }
        .lp-testimonial__author { display: flex; align-items: center; gap: 12px; }
        .lp-testimonial__avatar { width: 36px; height: 36px; border-radius: 50%; background: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #fff; flex-shrink: 0; }
        .lp-testimonial__name { font-size: 13px; font-weight: 600; color: #111; }
        .lp-testimonial__role { font-size: 12px; color: #aaa; }

        /* PRICING */
        .lp-pricing { background: #0a0a0a; padding: 100px 24px; }
        .lp-plans { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 860px; margin: 0 auto 32px; }
        .lp-plan { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 24px; padding: 40px; display: flex; flex-direction: column; gap: 20px; position: relative; }
        .lp-plan--featured { background: #16a34a; border-color: #16a34a; box-shadow: 0 0 0 1px #22c55e, 0 24px 60px rgba(22,163,74,.4); }
        .lp-plan__badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #fbbf24; color: #78350f; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; white-space: nowrap; }
        .lp-plan__name { font-size: 14px; font-weight: 600; color: rgba(255,255,255,.6); text-transform: uppercase; letter-spacing: .5px; }
        .lp-plan--featured .lp-plan__name { color: rgba(255,255,255,.75); }
        .lp-plan__price { display: flex; align-items: flex-end; gap: 4px; }
        .lp-plan__currency { font-size: 14px; font-weight: 500; color: rgba(255,255,255,.5); margin-bottom: 8px; }
        .lp-plan__amount { font-family: 'Instrument Serif', serif; font-size: 52px; color: #fff; line-height: 1; }
        .lp-plan__period { font-size: 14px; color: rgba(255,255,255,.4); margin-bottom: 10px; }
        .lp-plan__desc { font-size: 14px; color: rgba(255,255,255,.5); line-height: 1.6; margin: 0; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,.08); }
        .lp-plan__features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .lp-plan__features li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(255,255,255,.65); }
        .lp-plan__features--light li { color: rgba(255,255,255,.85); }
        .lp-plan__cta { display: block; text-align: center; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 600; text-decoration: none; transition: all .2s; }
        .lp-plan__cta--outline { border: 1.5px solid rgba(255,255,255,.2); color: #fff; }
        .lp-plan__cta--outline:hover { border-color: rgba(255,255,255,.5); background: rgba(255,255,255,.05); }
        .lp-plan__cta--solid { background: #fff; color: #16a34a; box-shadow: 0 4px 16px rgba(0,0,0,.2); }
        .lp-plan__cta--solid:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(0,0,0,.3); }
        .lp-pricing__note { text-align: center; font-size: 13px; color: rgba(255,255,255,.35); }

        /* FAQ */
        .lp-faqs { display: flex; flex-direction: column; gap: 0; }
        .lp-faq { border-bottom: 1px solid #f0f0f0; }
        .lp-faq__q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; cursor: pointer; font-size: 16px; font-weight: 500; color: #111; background: none; border: none; text-align: left; width: 100%; }
        .lp-faq__q:hover { color: #16a34a; }
        .lp-faq__icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #ddd; display: flex; align-items: center; justify-content: center; color: #666; transition: all .2s; }
        .lp-faq--open .lp-faq__icon { background: #16a34a; border-color: #16a34a; color: #fff; transform: rotate(45deg); }
        .lp-faq__a { font-size: 14px; color: #666; line-height: 1.75; padding: 0 0 20px; }

        /* CTA */
        .lp-cta { padding: 100px 24px; background: #1A273C; position: relative; overflow: hidden; text-align: center; }
        .lp-cta__bg { position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,.08), transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,.06), transparent 60%); pointer-events: none; }
        .lp-cta__inner { position: relative; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .lp-cta__title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 4vw, 48px); color: #fff; margin: 0; line-height: 1.15; }
        .lp-cta__sub { font-size: 17px; color: rgba(255,255,255,.8); line-height: 1.6; margin: 0; }

        /* FOOTER */
        .lp-footer { border-top: 1px solid #f0f0f0; padding: 60px 24px 0; }
        .lp-footer__inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid #f0f0f0; }
        .lp-footer__brand { display: flex; flex-direction: column; gap: 12px; }
        .lp-footer__tagline { font-size: 14px; color: #999; margin: 0; }
        .lp-footer__links { display: flex; gap: 48px; }
        .lp-footer__col { display: flex; flex-direction: column; gap: 10px; }
        .lp-footer__col-title { font-size: 12px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
        .lp-footer__col a { font-size: 14px; color: #555; text-decoration: none; }
        .lp-footer__col a:hover { color: #16a34a; }
        .lp-footer__bottom { max-width: 1200px; margin: 0 auto; padding: 20px 0; display: flex; justify-content: space-between; font-size: 13px; color: #bbb; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .lp-hero__inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
          .lp-hero__content { align-items: center; }
          .lp-hero__visual { display: none; }
          .lp-feature--large { grid-template-columns: 1fr; }
          .lp-feature--large .lp-feature__visual { min-height: 240px; }
          .lp-steps { flex-direction: column; }
          .lp-step__arrow { display: none; }
          .lp-testimonials { grid-template-columns: 1fr; }
          .lp-plans { grid-template-columns: 1fr; }
          .lp-nav__links { display: none; }
          .lp-nav__cta { display: none; }
          .lp-hamburger { display: flex; }
          .lp-footer__inner { grid-template-columns: 1fr; }
          .lp-showcase__inner { height: 340px; }
        }
        @media (max-width: 600px) {
          .lp-feature-grid { grid-template-columns: 1fr; }
          .lp-hero__actions { flex-direction: column; align-items: center; }
          .lp-section { padding: 64px 20px; }
          .lp-hero__stats { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`lp-faq ${open ? 'lp-faq--open' : ''}`}>
      <button className="lp-faq__q" onClick={() => setOpen(!open)}>
        {q}
        <span className="lp-faq__icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </span>
      </button>
      {open && <p className="lp-faq__a">{a}</p>}
    </div>
  )
}
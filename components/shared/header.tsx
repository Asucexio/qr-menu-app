'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-stone-100 transition hover:text-amber-400"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538.svg"
            alt="QR Menu Logo"
            width={40}
            height={40}
            className="h-9 w-9"
          />
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            QR Menu Builder
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                pathname === href
                  ? 'bg-stone-800 text-amber-400'
                  : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-100'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:text-stone-100"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="ml-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-stone-950 transition hover:bg-amber-400"
          >
            Create your free menu
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-800 hover:text-stone-100 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-stone-800/80 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  pathname === href
                    ? 'bg-stone-800 text-amber-400'
                    : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-100'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/signin"
              className="rounded-lg px-4 py-3 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-stone-100"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="mt-1 rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-medium text-stone-950 transition hover:bg-amber-400"
              onClick={() => setMobileOpen(false)}
            >
              Create your free menu
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

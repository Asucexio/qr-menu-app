"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  QrCode,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Menus",
    href: "/dashboard/menus",
    icon: UtensilsCrossed,
  },
  {
    label: "QR Codes",
    href: "/dashboard/qr",
    icon: QrCode,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);

  const { user, signOut } = useAuthStore();

  const email = user?.email || "";
  const initial = email.charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[232px] border-r border-gray-200 bg-white lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
          >
            <img
              src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png"
              alt="Hamenu"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg"
            />

            <span className="text-base font-bold text-gray-900">
              hamenu
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Desktop User */}
        <div className="border-t border-gray-100 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
              {initial}
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">
                Signed in as
              </p>

              <p className="truncate text-sm font-medium text-gray-900">
                {email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}
      <header className="relative flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4 lg:hidden">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
        >
          <img
            src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png"
            alt="Hamenu"
            width={30}
            height={30}
            className="h-7 w-7 rounded-lg"
          />

          <span className="text-sm font-bold text-gray-900">
            hamenu
          </span>
        </Link>

        {/* Mobile Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 transition hover:bg-green-200"
            aria-label="Open profile menu"
          >
            {initial}
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-11 z-50 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
              {/* User information */}
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {initial}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Signed in as
                  </p>

                  <p className="truncate text-sm font-medium text-gray-900">
                    {email}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ====================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white lg:hidden">
        <div className="grid grid-cols-5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
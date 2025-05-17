"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Button, Drawer, Space } from "antd";

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Phim", href: "/movies" },
    { name: "Sự kiện", href: "/events" },
    { name: "Tin tức", href: "/news" },
    { name: "Hỗ trợ", href: "/support" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              MTBA-VN
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Đăng ký
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Mở menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

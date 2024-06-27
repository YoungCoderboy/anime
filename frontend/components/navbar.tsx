"use client";

import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { PiUserCirclePlusThin } from "react-icons/pi";

import { ImFire } from "react-icons/im";
import { IoBagHandle } from "react-icons/io5";
import { NAV_LINKS } from "@/utils/constants";
import { useSiteContext } from "@/context/siteContext";
import { useCardContext } from "@/context/cardContext";
import Link from "next/link";
const NavBar = () => {
  const { handleMenuClick, showUserMenu, handleSidebarClick, showSidebar } =
    useSiteContext();
  const { cart } = useCardContext();
  const pathname = usePathname();
  const [cnt, setCnt] = useState(cart.length);
  const links = NAV_LINKS;

  useEffect(() => {
    setCnt(cart.length);
  }, [cart]);

  return (
    <nav className="bg-[#070F2B]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              onClick={() => handleSidebarClick()}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a href="/" title="home">
                <ImFire className="text-3xl text-red-500" />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                {links.map((link) => {
                  return (
                    <a
                      href={link.href}
                      key={link.name}
                      className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                        pathname === link.href
                          ? "text-decoration-line: underline decoration-blue-400 decoration-4 underline-offset-8 text-opacity-75"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      aria-current="page"
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3">
            <div className="p-1 relative">
              <Link
                href="/cart"
                className="relative rounded-full bg-gray-900 pr-0 text-gray-200 "
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View Cart</span>
                <IoBagHandle className="text-xl" />
              </Link>
              <p className="absolute top-0 right-0 text-xs align-top  size-0.5 pl-1 text-green-400">
                {cnt}
              </p>
            </div>
            <div className="p-1">
              <button
                type="button"
                className="relative rounded-full bg-gray-900 text-gray-200 hover:text-white hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <FaBell className="text-1xl" />
              </button>
            </div>
            {/* Profile dropdown */}

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  onClick={() => handleMenuClick()}
                  className="relative flex rounded-full bg-gray-900 text-white text-sm hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    src={"/images/users/default.png"}
                    width={35}
                    className="rounded-full border-2 border-black"
                    title="user profile"
                  />
                </button>
              </div>
              {/*
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    */}{" "}
              {showUserMenu && (
                <div
                  onMouseLeave={() => handleMenuClick()}
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#FFE5E5] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {/* Active: "bg-gray-100", Not Active: "" */}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {showSidebar && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            {links.map((link) => {
              return (
                <a
                  href={link.href}
                  key={link.name}
                  className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${
                    pathname === link.href
                      ? "text-decoration-line: underline decoration-blue-400 decoration-4 underline-offset-8 text-opacity-75"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current="page"
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

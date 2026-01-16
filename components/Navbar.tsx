"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [openMaster, setOpenMaster] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [user, setUser] = useState<any>(null);

  const userRef = useRef<HTMLDivElement>(null);

  const activeClass = "text-blue-600 font-semibold";
  const inactiveClass = "text-gray-600 hover:text-blue-600";

  // ================= LOAD USER =================
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // ================= CLICK OUTSIDE =================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setOpenUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b fixed top-0 left-0 right-0  z-50">
      <div className="max-w-9xl mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <img src="/img/lp3i.png" alt="LP3I" className="w-32" />

        {/* Menu */}
        <ul className="flex gap-10 text-sm font-medium text-gray-600">
          <li
            onClick={() => router.push("/dashboard")}
            className={`cursor-pointer ${
              pathname === "/dashboard" ? activeClass : inactiveClass
            }`}
          >
            Dashboard
          </li>

          {/* MASTER */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setOpenMaster(!openMaster)}
              className={`${
                ["/karyawan", "/divisi", "/headof", "/configuration"].includes(
                  pathname
                )
                  ? activeClass
                  : inactiveClass
              }`}
            >
              Master
            </button>

            {openMaster && (
              <ul className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50">
                <li
                  onClick={() => router.push("/karyawan")}
                  className={`px-4 py-2 cursor-pointer ${
                    pathname === "/karyawan"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Karyawan
                </li>
                <li
                  onClick={() => router.push("/divisi")}
                  className={`px-4 py-2 cursor-pointer ${
                    pathname === "/divisi"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Divisi
                </li>
                <li
                  onClick={() => router.push("/headof")}
                  className={`px-4 py-2 cursor-pointer ${
                    pathname === "/headof"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Head of Divisi
                </li>
                <li
                  onClick={() => router.push("/configuration")}
                  className={`px-4 py-2 cursor-pointer ${
                    pathname === "/configuration"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Konfigurasi
                </li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              type="button"
              onClick={() => setOpenTicket(!openTicket)}
              className={`${
                ["/assigned", "/created"].includes(pathname)
                  ? activeClass
                  : inactiveClass
              }`}
            >
              Ticket
            </button>

            {openTicket && (
              <ul className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50">
                <li
                  onClick={() => router.push("/assigned")}
                  className={`px-4 py-2 cursor-pointer ${
                    pathname === "/assigned"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Assigned
                </li>
                <li
                  onClick={() => router.push("/created")}
                  className={`px-4 py-2 cursor-pointer ${
                    pathname === "/created"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  Created
                </li>
              </ul>
            )}
          </li>
          <li
            onClick={() => router.push("/ringkasan")}
            className={`cursor-pointer ${
              pathname === "/ringkasan" ? activeClass : inactiveClass
            }`}
          >
            Ringkasan
          </li>
        </ul>

        {/* USER DROPDOWN */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setOpenUser(!openUser)}
            className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg"
          >
            <div className="text-right leading-tight">
              <div className="text-sm font-medium">
                {user?.name || "Administrator"}
              </div>
              <div className="text-xs text-gray-500">
                {user?.email || "admin@gmail.com"}
              </div>
            </div>
            <img src="/img/icon.png" className="w-10 h-10 rounded-full" />
          </button>

          {openUser && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
              <button
                onClick={() => router.push("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                👤 Profile
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

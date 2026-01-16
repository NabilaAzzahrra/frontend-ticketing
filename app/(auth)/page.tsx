"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email atau password salah");
      }

      // ================= TOKEN =================
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // ================= USER =================
      const user = {
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("status", user.status);

      // ================= REDIRECT =================
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="w-full">
        <div className="p-20">
          <div data-aos="fade-right">
            <img src="/img/lp3i.png" className="w-44" />
          </div>
          <div className="flex gap-20 mt-36">
            <Link href="/" className="font-extrabold text-[#00426D] text-lg">
              Log In
            </Link>

            <Link href="/register" className="text-lg text-[#A6A8A9]">
              Sign Up
            </Link>
          </div>
          <div className="w-96 mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />
              <input
                type="password"
                placeholder="Password Here ...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#00426D] text-sm text-white py-2 rounded-lg inline-block px-5"
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </form>
          </div>
          <div className="text-[#A6A8A9] mt-14">
            <div className="flex mb-2 gap-2" data-aos="fade-right">
              <div>
                <i className="fi fi-sr-note" />
              </div>
              <div>Tracking your task</div>
            </div>
            <div
              className="flex mb-2 gap-2"
              data-aos="fade-right"
              data-aos-delay="50"
            >
              <div>
                <i className="fi fi-sr-task-checklist" />
              </div>
              <div>Tracking your attendace</div>
            </div>
            <div
              className="flex mb-2 gap-2"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div>
                <i className="fi fi-sr-briefcase" />
              </div>
              <div>Make work simple</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00426D] w-full">
        <div className="relative">
          <img src="/img/1.png" className="ml-[558px]" />
          <div className="flex mt-[300px] items-center justify-between">
            <img src="/img/3.png" />
            <img src="/img/2.png" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            <div>
              <div
                className="text-[44px] w-20 -ml-44 font-extrabold"
                data-aos="fade-right"
              >
                Ticketing Management System
              </div>
              <div
                className="w-96 -ml-44 text-lg font-light"
                data-aos="fade-right"
              >
                Kelola dan pantau setiap tiket secara terpusat untuk memastikan
                setiap permintaan tertangani dengan cepat, tepat, dan
                terdokumentasi dengan baik.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

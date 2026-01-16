"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ================= VALIDASI =================
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
        },
        body: JSON.stringify({
          nik,
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      setSuccess("Registrasi berhasil, silakan login");

      // redirect ke login setelah 1.5 detik
      setTimeout(() => {
        router.push("/");
      }, 1500);
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
            <Link href="/" className="text-[#A6A8A9] text-lg">
              Log In
            </Link>

            <Link
              href="/register"
              className="text-lg font-extrabold text-[#00426D]"
            >
              Sign Up
            </Link>
          </div>
          <div className="w-96 mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="NIK"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />

              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2"
              />

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* SUCCESS */}
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}

              <button disabled={loading} className="bg-[#00426D] text-sm text-white py-2 rounded-lg inline-block px-5">
                {loading ? "Loading..." : "Sign Up"}
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

"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import TicketsByStatusChart from "../../../components/TicketsByStatusChart";
import TicketsDailyLineChart from "../../../components/TicketsDailyLineChart";
import { authFetch } from "@/lib/authFetch";

export default function DashboardPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("loading");
  const [user, setUser] = useState<any>(null);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [monthlyLabel, setMonthlyLabel] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch(
          `http://localhost:3001/api/wa/qr?t=${Date.now()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
            },
            cache: "no-store",
          }
        );

        const data = await res.json();
        console.log("QR RESPONSE:", data);

        setStatus(data.status);

        if (data.status === "qr") {
          setQr(data.qr);
        }

        if (data.status === "ready") {
          setQr(null);
        }
      } catch (err) {
        console.error("Gagal ambil QR", err);
      }
    };

    fetchQR();
    const interval = setInterval(fetchQR, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [ticketsData, setTicketsData] = useState([]);
  //const userData = localStorage.getItem("user");
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3001/api/dashboard/charts/tickets-by-status", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => setTicketsData(json.data))
      .catch(console.error);
  }, [token]);

  const [dailyTickets, setDailyTickets] = useState<
    { date: string; total: number }[]
  >([]);

  useEffect(() => {
    if (!token) return;

    const fetchDailyTickets = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/dashboard/charts/tickets-daily",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch daily tickets");

        const json = await res.json();
        setDailyTickets(json.data);
      } catch (error) {
        console.error("Fetch daily tickets error:", error);
      }
    };

    fetchDailyTickets();
  }, [token]);

  useEffect(() => {
    const fetchMonthlyTickets = async () => {
      try {
        const res = await authFetch(
          "http://localhost:3001/api/dashboard/tickets/count/monthly",
          {
            method: "GET",
            headers: {
              "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        console.log("MONTHLY STATUS:", res.status);

        if (!res.ok) {
          throw new Error("Gagal ambil total ticket bulanan");
        }

        const json = await res.json();
        setMonthlyTotal(json.total);
        setMonthlyLabel(json.month);
      } catch (err) {
        console.error("Monthly error:", err);
      }
    };

    fetchMonthlyTickets();
  }, []);

  return (
    <div className="p-6">
      <div className="font-bold text-lg">
        <span className="text-[#A6A8A9]">Hallo, </span>{" "}
        {user?.name || "Administrator"} 👋
      </div>

      <div className="flex gap-5 mt-12 items-start">
        <div className="w-1/4">
          <div className="bg-[#D9D9D9] px-4 py-1 font-bold">
            QR WhatsApp Administrator
          </div>
          <div>
            {status === "loading" && (
              <p className="text-gray-500">Menunggu QR dari WhatsApp...</p>
            )}

            {status === "qr" && qr && (
              <div className="bg-white p-4 inline-block rounded shadow">
                <QRCodeCanvas value={qr} size={220} />
              </div>
            )}

            {status === "ready" && (
              <div className="text-green-600 font-semibold w-[220px] h-[220px] text-center w-full flex items-center justify-center">
                ✅ WhatsApp sudah terhubung
              </div>
            )}
          </div>
          <div className="text-sm">
            <span className="text-red-500 font-bold">Note: </span>QR Code ini
            memiliki batas penggunaan satu kali scan demi keamanan dan validasi
            data
          </div>
        </div>
        <div className="w-full">
          <div className="bg-emerald-100 w-1/2 text-emerald-700 px-5 pt-2 pb-2 mb-4 rounded-xl">
            <div className="font-bold text-lg flex items-center gap-2">
              <i className="fi fi-sr-info mt-1" />
              Informasi Hari Ini
            </div>
            <hr className="border-emerald-700" />
            <div className="mt-2">
              <span className="font-bold">Hari ini</span> kamu sudah menyelesaikan{" "}
              <span className="font-bold">100</span> ticket dan membuat tiket
              sebanyak <span className="font-bold">10</span> sehingga kamu
              terpantau <span className="font-bold">Aman</span> 👍
            </div>
          </div>
          <div className="relative bg-[#196fa8] text-white w-[544px] h-[108px] rounded-2xl px-6 py-4 overflow-hidden">
            {/* Background icon */}
            <i className="fi fi-sr-cursor-finger absolute right-6  top-7 bottom-2 text-[64px] opacity-20 -rotate-45" />

            <div className="flex items-center justify-between h-full">
              {/* Left content */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <i className="fi fi-sr-ticket-alt text-lg mt-1" />
                  <span className="font-semibold text-base">
                    Tiket Karyawan Bulan Ini
                  </span>
                </div>

                <p className="text-sm max-w-[360px] leading-snug text-white/90">
                  Berikut ini merupakan total tiket tugas yang diterima oleh
                  karyawan selama bulan berjalan.
                </p>
              </div>

              {/* Right number */}
              <div className="text-5xl font-bold leading-none mr-10">
                {monthlyTotal}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex gap-5">
          <div className="w-1/2">
            <div className="text-[#3F925B] font-bold text-lg">
              <i className="fi fi-sr-chart-simple mr-3" />
              Bar Chart Tiket Berdasarkan Status
            </div>
            <div className="text-[#8A8A8A] text-sm mb-3">
              Berikut merupakan chart dari ticket task per status, onboarding,
              onprogress, dan done.
            </div>
            <TicketsByStatusChart data={ticketsData} />
            <div className="text-sm mt-2">
              <span className="font-bold text-[#FF0707]">Note: </span>
              Data bulan{" "}
              <span className="font-semibold">
                {new Date().toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-[#3F925B] font-bold text-lg">
              <i className="fi fi-sr-chart-simple mr-3" />
              Line Chart Tiket Per Hari (bulan ini)
            </div>
            <div className="text-[#8A8A8A] text-sm mb-3">
              Berikut merupakan chart dari ticket task per hari dari,
              onboarding, onprogress, dan done.
            </div>
            <div className="relative w-full">
              <TicketsDailyLineChart data={dailyTickets} />
            </div>
            <div className="text-sm mt-2">
              <span className="font-bold text-[#FF0707]">Note: </span>
              Data bulan{" "}
              <span className="font-semibold">
                {new Date().toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

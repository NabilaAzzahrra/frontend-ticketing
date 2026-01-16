"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState<any>(null);
  const [position, setPosition] = useState("");
  const [signature, setSignature] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  /* ==========================
     FETCH DIVISION
  ========================== */
  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/division");
        const json = await res.json();

        const mapped = json.data.map((item: any) => ({
          value: String(item.id),
          label: item.division,
        }));

        setOptions(mapped);
      } catch (error) {
        console.error("Failed to fetch division", error);
      }
    };

    fetchDivision();
  }, []);

  const Select = dynamic(() => import("react-select"), {
    ssr: false,
  });

  /* ==========================
     SUBMIT
  ========================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!division) {
      alert("Divisi wajib dipilih");
      setLoading(false);
      return;
    }

    try {
      /* ===== STATE DEBUG ===== */
      console.log("===== FORM STATE =====");
      console.log("nik:", nik);
      console.log("name:", name);
      console.log("email:", email);
      console.log("password:", password);
      console.log("phone:", phone);
      console.log("division:", division);
      console.log("division.value:", division?.value);
      console.log("position:", position);
      console.log("signature:", signature);
      console.log("======================");

      /* ==========================
         1. REGISTER AKUN
      ========================== */
      const registerRes = await fetch("http://localhost:3001/api/register", {
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
          password_confirmation: password,
          role: "employee",
          status: "Aktif",
        }),
      });

      const registerData = await registerRes.json();

      console.log("===== REGISTER RESPONSE =====");
      console.log("status:", registerRes.status);
      console.log("response:", registerData);
      console.log("=============================");

      if (!registerRes.ok) {
        throw new Error(registerData.message || "Gagal register akun");
      }

      /* ==========================
         2. CREATE EMPLOYEE
      ========================== */
      const formData = new FormData();
      formData.append("nik", nik);
      formData.append("phone", phone);
      formData.append("division_id", String(division?.value));
      formData.append("position", position);

      if (signature) {
        formData.append("signature", signature);
      }

      /* ===== FORMDATA DEBUG ===== */
      console.log("===== FORM DATA =====");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.log("=====================");

      const employeeRes = await fetch("http://localhost:3001/api/employee", {
        method: "POST",
        headers: {
          "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
        },
        body: formData,
      });

      const employeeData = await employeeRes.json();

      if (!employeeRes.ok) {
        throw new Error(employeeData.message || "Gagal tambah karyawan");
      }

      toast.success("Karyawan berhasil ditambahkan 🎉");

      // redirect setelah 1 detik (biar toast kebaca)
      setTimeout(() => {
        router.push("/karyawan");
      }, 1000);
      // RESET FORM
      setNik("");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDivision(null);
      setPosition("");
      setSignature(null);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
     UI
  ========================== */
  return (
    <div className="p-6 mx-96">
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            Master <i className="fi fi-rr-caret-right mt-2" /> Karyawan
          </div>
          <div className="font-bold text-2xl">Form Tambah Karyawan</div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        facilis sapiente beatae animi aliquam iusto temporibus odit obcaecati
        cumque similique?
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-b-lg shadow mt-4 py-6 px-8 flex flex-col gap-8">
          <div className="w-full">
            <div className="font-bold text-gray-400">Data Akun</div>
            <hr />
            <div className="mt-4">
              <div className="flex gap-5 mb-3">
                <div className="w-full">
                  <label htmlFor="">NIK</label>
                  <input
                    type="text"
                    placeholder="NIK"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 mb-3 text-sm"
                />
              </div>
              <div className="flex gap-5">
                <div className="w-full">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Konfirmasi Password"
                    className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold text-gray-400">Data Karyawan</div>
            <hr />
            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <label htmlFor="">No Handphone</label>
                <input
                  type="text"
                  placeholder="No Handphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Divisi</label>
                {
                  <Select
                    options={options}
                    value={division}
                    onChange={(selected) => setDivision(selected)}
                  />
                }
              </div>
            </div>
            <div className="flex gap-5 mt-3">
              <div className="w-full">
                <label htmlFor="">Posisi</label>
                <input
                  type="text"
                  placeholder="Posisi"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Tanda Tangan</label>
                <input
                  type="file"
                  onChange={(e) => setSignature(e.target.files?.[0] || null)}
                  placeholder="Tanda Tangan"
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center justify-end mt-9 ml-[932px]"
            >
              <i className="fi fi-sr-disk mr-2 mt-1" />
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

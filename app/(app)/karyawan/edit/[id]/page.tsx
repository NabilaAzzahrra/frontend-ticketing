"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
const Select = dynamic(() => import("react-select"), { ssr: false });
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { id } = useParams(); // NIK
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // ID DB asli
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  // FORM STATE
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [division, setDivision] = useState<any>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [oldNik, setOldNik] = useState("");

  // DIVISION OPTIONS
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  /* ==================== FETCH DIVISION ==================== */
  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/division");
        const json = await res.json();
        setOptions(
          json.data.map((item: any) => ({
            value: String(item.id),
            label: item.division,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch division", error);
      }
    };
    fetchDivision();
  }, []);

  /* ==================== FETCH EMPLOYEE ==================== */
  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/employee/${id}`, {
          headers: { "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY" },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        const emp = json.data;

        setEmployeeId(emp.id);
        setNik(emp.nik);
        setOldNik(emp.nik);
        setName(emp.users[0].name);
        setEmail(emp.users[0].email);
        setPhone(emp.phone);
        setPosition(emp.position);
        setDivision({
          value: String(emp.division_id),
          label: emp.division?.division,
        });
      } catch (error) {
        console.error(error);
        router.push("/karyawan");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, router]);

  /* ==================== HANDLE SUBMIT ==================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !oldNik) {
      alert("Data employee tidak lengkap");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ UPDATE EMPLOYEE (BY ID)
      const empRes = await fetch(
        `http://localhost:3001/api/employee/${employeeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
          body: JSON.stringify({
            nik,
            phone,
            division_id: division?.value,
            position,
          }),
        }
      );

      const empData = await empRes.json();
      if (!empRes.ok) throw new Error(empData.message);

      // 2️⃣ UPDATE USER (BY OLD NIK)
      const userRes = await fetch(`http://localhost:3001/api/employee/user/${oldNik}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
        },
        body: JSON.stringify({
          name,
          email,
          status: "active", // atau dari state
        }),
      });

      const userData = await userRes.json();
      if (!userRes.ok) throw new Error(userData.message);

      // 3️⃣ UPLOAD SIGNATURE
      if (signature) {
        const formData = new FormData();
        formData.append("signature", signature);

        const fileRes = await fetch(
          `http://localhost:3001/api/employee/${employeeId}/signature`,
          {
            method: "POST",
            headers: { "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY" },
            body: formData,
          }
        );

        const fileData = await fileRes.json();
        if (!fileRes.ok) throw new Error(fileData.message);
      }

      toast.success("Data karyawan & user berhasil diperbarui 🎉");
      setTimeout(() => router.push("/karyawan"), 1000);
    } catch (error: any) {
      alert(error.message || "Gagal update data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 mx-96">
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            Master <i className="fi fi-rr-caret-right mt-2" /> Karyawan
          </div>
          <div className="font-bold text-2xl">Form Edit Data Karyawan</div>
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
              <input type="hidden" value={id} />
              <div className="flex gap-5 mb-3">
                <div className="w-full">
                  <label htmlFor="">NIK</label>
                  <input
                    type="text"
                    placeholder="NIK"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm" disabled
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
                  <label htmlFor="">Password Baru</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="">Konfirmasi Password</label>
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
                <Select
                  options={options}
                  value={division}
                  onChange={setDivision}
                />
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
                  placeholder="Tanda Tangan"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSignature(e.target.files[0]);
                    }
                  }}
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
              </div>
            </div>
            <button className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center justify-end mt-9 ml-[932px]">
              <i className="fi fi-sr-disk mr-2 mt-1" />
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

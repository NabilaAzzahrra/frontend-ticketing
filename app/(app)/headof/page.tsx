"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import type { SingleValue } from "react-select";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  type OptionType = {
    value: string;
    label: string;
  };
  const [division, setDivision] = useState<OptionType | null>(null);
  const [employee, setEmployee] = useState<OptionType | null>(null);

  const [options, setOptions] = useState<OptionType[]>([]);
  const [optionsEmployee, setOptionsEmployee] = useState<OptionType[]>([]);

  const [nik_headof, setnik_headof] = useState("");
  const [division_id, setdivision_id] = useState("");

  const [loading, setLoading] = useState(false);

  /* ==========================
       FETCH DIVISION
    ========================== */
  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/division");
        const json = await res.json();

        const mapped: OptionType[] = json.data.map((item: any) => ({
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/employee");
        const json = await res.json();

        const mapped: OptionType[] = json.data
          .filter((item: any) => item.users && item.users.length > 0)
          .map((item: any) => ({
            value: String(item.nik),
            label: item.users[0].name,
          }));

        setOptionsEmployee(mapped);
      } catch (error) {
        console.error("Failed to fetch employee", error);
      }
    };

    fetchEmployee();
  }, []);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ FIX

      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/headof", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed fetch employee");

        const result = await res.json();
        setData(result?.data || []);
      } catch (err) {
        console.error("Fetch employee error:", err);
      }
    };

    fetchEmployee();
  }, []);

  // ================= DATATABLE =================
  useEffect(() => {
    if (!tableRef.current || data.length === 0) return;

    let table: any;

    (async () => {
      const $ = (await import("jquery")).default;
      await import("datatables.net-dt");

      if (!tableRef.current) return; // ✅ FIX TS

      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      table = $(tableRef.current).DataTable({
        pageLength: 5,
        lengthChange: true, // ✅ aktifkan
        lengthMenu: [5, 10, 25, 50], // ✅ pilihan
        ordering: true,
        dom:
          "<'dt-top flex justify-between items-center mb-3'lf>" +
          "<'dt-table'tr>" +
          "<'dt-bottom flex justify-between items-center mt-3'ip>",
      });
    })();

    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [data]);

  // ================= ACTIONS =================
  const toggleMenu = (id: number) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleUpdate = (id: number) => {
    setSelectedId(id);
    setShowUpdateModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3001/api/headof/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setData((prev) => prev.filter((item) => item.id !== selectedId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmUpdate = async () => {
    if (!selectedId || !division || !employee) {
      alert("Data belum lengkap");
      return;
    }

    const nik_headof = employee.value;
    const division_id = division.value;

    try {
      const res = await fetch(
        `http://localhost:3001/api/headof/${selectedId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            nik_headof,
            division_id,
          }),
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // 🔁 UPDATE STATE (BUKAN FILTER!)
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                division: {
                  ...item.division,
                  id: division.value,
                  division: division.label,
                },
                user: {
                  ...item.user,
                  nik: employee.value,
                  name: employee.label,
                },
              }
            : item,
        ),
      );

      setShowUpdateModal(false);
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      alert("Gagal update data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!division || !employee) {
      alert("Divisi dan Head of wajib dipilih");
      setLoading(false);
      return;
    }

    const nik_headof = employee.value;
    const division_id = division.value;

    try {
      console.log("======= FORM STATE ========");
      console.log("nik_headof:", nik_headof);
      console.log("division_id:", division_id);

      const res = await fetch("http://localhost:3001/api/headof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
        },
        body: JSON.stringify({
          nik_headof,
          division_id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal tambah head of");
      }

      toast.success("Head of berhasil ditambahkan 🎉");

      setTimeout(() => {
        router.push("/headof");
      }, 1000);

      // reset react-select
      setDivision(null);
      setEmployee(null);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= RENDER =================
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div>Master</div>
          <div className="font-bold text-2xl">Data Head of</div>
        </div>
      </div>

      <div className="flex gap-5 items-start">
        <div className="bg-white rounded-b-lg shadow px-4 py-6 mt-6 w-1/2">
          <div className="font-semibold text-lg text-gray-400">
            Form Tambah Head of
          </div>
          <hr className="border-gray-400" />
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <div className="w-full">
                <label htmlFor="">Divisi</label>
                <Select
                  options={options}
                  value={division}
                  onChange={(selected) =>
                    setDivision(selected as OptionType | null)
                  }
                  placeholder="Pilih divisi"
                  isClearable
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <div className="w-full">
                <label htmlFor="">Head of</label>
                <Select
                  options={optionsEmployee}
                  value={employee}
                  onChange={(selected) =>
                    setEmployee(selected as OptionType | null)
                  }
                  placeholder="Pilih karyawan"
                  isClearable
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center justify-end mt-4 ml-[600px]"
            >
              <i className="fi fi-sr-disk mr-2 mt-1" />
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>
        {/* TABLE */}
        <div className="bg-white rounded-b-lg shadow p-4 mt-6 w-full">
          <table ref={tableRef} className="display w-full text-sm">
            <thead>
              <tr>
                <th className="w-10">No</th>
                <th className="w-20">NIK</th>
                <th className="w-96">Nama Head of</th>
                <th className="w-96">Divisi</th>
                <th className="w-10">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nik_headof}</td>
                  <td>{item.user?.name}</td>
                  <td>{item.division?.division}</td>
                  <td className="relative">
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className=" hover:bg-sky-300 rounded bg-sky-200 ml-4 w-6 h-6 text-sky-500 font-bold"
                    >
                      ⋮
                    </button>

                    {openMenu === item.id && (
                      <div className="absolute left-0 -ml-32 w-44 bg-white rounded shadow border border-gray-200 z-50">
                        <button
                          onClick={() => {
                            setSelectedId(item.id);

                            // SET VALUE REACT-SELECT
                            setDivision({
                              value: String(item.division.id),
                              label: item.division.division,
                            });

                            setEmployee({
                              value: String(item.user.nik), // atau user.id SESUAI FK
                              label: item.user.name,
                            });

                            setShowUpdateModal(true);
                          }}
                          className="w-full px-4 py-2 text-left text-amber-500 hover:bg-amber-100"
                        >
                          <i className="fi fi-sr-user-pen mr-4"></i> Update
                        </button>

                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                          <i className="fi fi-sr-trash mr-4" /> Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold bg-red-100 text-red-600 px-4 py-2 text-center rounded-xl">
              Konfirmasi Hapus
            </h2>
            <p className="my-6 text-center">Yakin ingin menghapus data ini?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-4xl"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-4xl"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold bg-emerald-100 text-emerald-600 px-4 py-2 text-center rounded-xl">
              Konfirmasi Update
            </h2>
            <div className="mt-4">
              <div className="w-full mt-4">
                <div className="w-full">
                  <label htmlFor="">Divisi</label>
                  <Select
                    options={options}
                    value={division}
                    onChange={(selected) =>
                      setDivision(selected as OptionType | null)
                    }
                    placeholder="Pilih divisi"
                    isClearable
                  />
                </div>
              </div>
              <div className="w-full mt-4">
                <div className="w-full">
                  <label htmlFor="">Headof</label>
                  <Select
                    options={optionsEmployee}
                    value={employee}
                    onChange={(selected) =>
                      setEmployee(selected as OptionType | null)
                    }
                    placeholder="Pilih karyawan"
                    isClearable
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border rounded-4xl"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-2 bg-emerald-300 text-white rounded-4xl"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

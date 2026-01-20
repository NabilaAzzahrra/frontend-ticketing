"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type SelectComponent from "react-select";
const Select = dynamic(
  () => import("react-select"),
  { ssr: false },
) as unknown as typeof SelectComponent;

import toast from "react-hot-toast";
import type { SingleValue } from "react-select";

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
  const [campus_principle_nik, setcampus_principle_nik] =
    useState<OptionType | null>(null);
  const [hrd_nik, sethrd_nik] = useState<OptionType | null>(null);

  const [optionscampus_principle_nik, setOptionscampus_principle_nik] =
    useState<OptionType[]>([]);
  const [optionshrd_nik, setOptionshrd_nik] = useState<OptionType[]>([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ FIX

      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/configuration", {
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

  const handleConfirmUpdate = async () => {
    if (!selectedId || !campus_principle_nik || !hrd_nik) {
      alert("Data belum lengkap");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/configuration/${selectedId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
          body: JSON.stringify({
            campus_principle_nik: campus_principle_nik.value,
            hrd_nik: hrd_nik.value,
          }),
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // ✅ UPDATE STATE SESUAI STRUKTUR DATA
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                campusPrinciple: {
                  ...item.campusPrinciple,
                  nik: campus_principle_nik.value,
                  name: campus_principle_nik.label,
                },
                hrd: {
                  ...item.hrd,
                  nik: hrd_nik.value,
                  name: hrd_nik.label,
                },
              }
            : item,
        ),
      );

      setShowUpdateModal(false);
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan saat update");
      }
    }
  };

  useEffect(() => {
    const fetchCampusPrinciple = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/employee");
        const json = await res.json();

        const mapped: OptionType[] = json.data
          .filter((item: any) => item.users && item.users.length > 0)
          .map((item: any) => ({
            value: String(item.nik),
            label: item.users[0].name,
          }));

        setOptionscampus_principle_nik(mapped);
      } catch (error) {
        console.error("Failed to fetch employee", error);
      }
    };

    fetchCampusPrinciple();
  }, []);

  useEffect(() => {
    const fetchHrd = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/employee");
        const json = await res.json();

        const mapped: OptionType[] = json.data
          .filter((item: any) => item.users && item.users.length > 0)
          .map((item: any) => ({
            value: String(item.nik),
            label: item.users[0].name,
          }));

        setOptionshrd_nik(mapped);
      } catch (error) {
        console.error("Failed to fetch employee", error);
      }
    };

    fetchHrd();
  }, []);

  // ================= RENDER =================
  return (
    <div className="p-6 mx-56">
      {/* HEADER */}
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div>Master</div>
          <div className="font-bold text-2xl">Data Konfigurasi</div>
        </div>
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        voluptas placeat eveniet perspiciatis rerum doloribus blanditiis
        reiciendis. Ad, itaque delectus.
      </div>
      <div className="flex gap-5 items-start">
        {/* TABLE */}
        <div className="bg-white rounded-b-lg shadow p-4 mt-6 w-full">
          <table ref={tableRef} className="display w-full text-sm">
            <thead>
              <tr>
                <th className="w-10">No</th>
                <th className="w-20">NIK Kepala Kampus</th>
                <th className="w-96">Nama Kepala Kampus</th>
                <th className="w-20">NIK HRD</th>
                <th className="w-96">Nama HRD</th>
                <th className="w-96">Uang Makan</th>
                <th className="w-96">Uang Transport</th>
                <th className="w-10">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.campus_principle_nik}</td>
                  <td>{item.campusPrinciple?.name}</td>
                  <td>{item.hrd_nik}</td>
                  <td>{item.hrd?.name}</td>
                  <td>{item.meal_allowance}</td>
                  <td>{item.transportation}</td>
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
                            setcampus_principle_nik({
                              value: String(item.campusPrinciple.nik),
                              label: item.campusPrinciple.name,
                            });

                            sethrd_nik({
                              value: String(item.hrd.nik), // atau user.id SESUAI FK
                              label: item.hrd.name,
                            });

                            setShowUpdateModal(true);
                          }}
                          className="w-full px-4 py-2 text-left text-amber-500 hover:bg-amber-100"
                        >
                          <i className="fi fi-sr-user-pen mr-4"></i> Perbaruhi
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
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold bg-emerald-100 text-emerald-600 px-4 py-2 text-center rounded-xl">
              Konfirmasi Update
            </h2>
            <div className="mt-4">
              <div className="w-full mt-4">
                <div className="w-full">
                  <label htmlFor="">Kepala Kampus</label>
                  <Select
                    options={optionscampus_principle_nik}
                    value={campus_principle_nik}
                    onChange={(selected) => setcampus_principle_nik(selected)}
                    placeholder="Pilih karyawan"
                    isClearable
                  />
                </div>
              </div>
              <div className="w-full mt-4">
                <div className="w-full">
                  <label htmlFor="">HRD</label>
                  <Select
                    options={optionshrd_nik}
                    value={hrd_nik}
                    onChange={(selected) => sethrd_nik(selected)}
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

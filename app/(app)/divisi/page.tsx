"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ FIX

      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/division", {
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
      await fetch(`http://localhost:3001/api/employees/${selectedId}`, {
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
    try {
      await fetch(`http://localhost:3001/api/employees/${selectedId}`, {
        method: "PATCH",
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

  // ================= RENDER =================
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div>Master</div>
          <div className="font-bold text-2xl">Data Divisi</div>
        </div>
      </div>

      <div className="flex gap-5 items-start">
        <div className="bg-white rounded-lg shadow px-4 py-6 mt-6 w-1/2">
          <div className="font-semibold text-lg text-gray-400">Form Tambah Divisi</div>
          <hr className="border-gray-400" />
          <form action="">
            <div className="w-full mt-4">
              <label htmlFor="">Divisi</label>
              <input
                type="text"
                placeholder="Divisi"
                className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
              />
            </div>
            <button className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center justify-end mt-4 ml-[600px]">
              <i className="fi fi-sr-disk mr-2 mt-1" />
              Simpan
            </button>
          </form>
        </div>
        {/* TABLE */}
        <div className="bg-white rounded-lg shadow p-4 mt-6 w-full">
          <table ref={tableRef} className="display w-full text-sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Divisi</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.division}</td>
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
                          onClick={() => handleUpdate(item.id)}
                          className="w-full px-4 py-2 text-left text-amber-500 hover:bg-amber-100"
                        >
                          <i className="fi fi-sr-user-pen mr-4"></i> Update
                        </button>

                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
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
              <div className="w-full">
                <label htmlFor="">Divisi</label>
                <input
                  type="text"
                  placeholder="Divisi"
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
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

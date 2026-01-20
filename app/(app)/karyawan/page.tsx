"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const router = useRouter();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/division", {
          headers: {
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
        });

        if (!res.ok) throw new Error("Gagal fetch division");

        const result = await res.json();

        // ✅ mapping ke react-select format
        const mappedOptions = result.data.map((item: any) => ({
          value: String(item.id),
          label: item.division,
        }));

        setOptions(mappedOptions);
      } catch (error) {
        console.error("Fetch division error:", error);
      }
    };

    fetchDivision();
  }, []);

  const optionsStatus = [
    { value: "active", label: "Aktif" },
    { value: "non-active", label: "Non-Aktif" },
  ];
  const Select = dynamic(() => import("react-select"), {
    ssr: false,
  });

  const SIGNATURE_URL = "http://localhost:3001/public/signatures";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedNik, setSelectedNik] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [rawData, setRawData] = useState<any[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<any>(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ FIX

      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/employee", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed fetch employee");

        const result = await res.json();
        setRawData(result?.data || []);
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

  const handleStatusClick = (id: number) => {
    setSelectedId(id);
    setShowStatusModal(true);
  };

  const handleUpdate = (item: any) => {
    router.push(`/karyawan/edit/${item.nik}`);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/employee/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Gagal menghapus data");
      }

      // optimistic update (langsung ilang dari tabel)
      setData((prev) => prev.filter((item) => item.id !== selectedId));

      setShowDeleteModal(false);
      setSelectedId(null);

      // sync ulang (Next.js App Router)
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  const handleConfirmStatus = async () => {
    if (!selectedNik || !selectedStatus) {
      alert("NIK atau status belum dipilih");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/employee/user/${selectedNik}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
          },
          body: JSON.stringify({
            status: selectedStatus.value,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // ✅ UPDATE STATE LANGSUNG
      setData((prev) =>
        prev.map((item) =>
          item.nik === selectedNik
            ? {
                ...item,
                users: [
                  {
                    ...item.users[0],
                    status: selectedStatus.value,
                  },
                ],
              }
            : item
        )
      );

      toast.success("Status akun berhasil diperbarui 🎉");
      setShowStatusModal(false);
      setSelectedStatus(null);
      setSelectedNik(null);
    } catch (err: any) {
      alert(err.message || "Gagal update status");
    }
  };

  const handleFilter = () => {
    if (!selectedDivision) {
      // 🔥 kalau tidak pilih divisi → tampilkan semua
      setData(rawData);
      return;
    }

    const filtered = rawData.filter(
      (item) => String(item.division_id) === selectedDivision.value
    );

    setData(filtered);
  };

  useEffect(() => {
    if (!selectedDivision) {
      setData(rawData);
    } else {
      setData(
        rawData.filter(
          (item) => String(item.division_id) === selectedDivision.value
        )
      );
    }
  }, [selectedDivision, rawData]);

  // ================= RENDER =================
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div>Master</div>
          <div className="font-bold text-2xl">Data Karyawan</div>
        </div>
      </div>

      {/* FILTER */}
      <div className="py-3 flex items-center justify-between gap-3">
        {/* <div className="flex gap-2">
          <div className="w-72">
            <Select
              options={options}
              placeholder="Pilih Divisi"
              className="text-sm"
              value={selectedDivision}
              onChange={(val) => setSelectedDivision(val)}
              isClearable
            />
          </div>
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center"
          >
            <i className="fi fi-bs-search mr-2" />
            Filter
          </button>
        </div> */}
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                const response = await fetch(
                  "http://localhost:3001/api/employee/export/pdf",
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
                    },
                  }
                );

                if (!response.ok) {
                  throw new Error("Gagal export PDF");
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // buka di tab baru
                window.open(url, "_blank");

                // kalau mau auto download, pakai ini 👇
                // const a = document.createElement("a");
                // a.href = url;
                // a.download = "employee-list.pdf";
                // document.body.appendChild(a);
                // a.click();
                // a.remove();
              } catch (error) {
                console.error(error);
                alert("Export PDF gagal");
              }
            }}
            className="px-4 py-2 bg-red-100 text-red-500 rounded-xl hover:bg-red-200 text-sm flex items-center"
          >
            <i className="fi fi-sr-file-export mr-2" />
            Export to pdf
          </button>
          <button
            onClick={async () => {
              try {
                const res = await fetch(
                  "http://localhost:3001/api/employee/export/excel",
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
                    },
                  }
                );

                if (!res.ok) throw new Error("Export gagal");

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "data-karyawan.xlsx";
                document.body.appendChild(a);
                a.click();
                a.remove();
              } catch (err) {
                alert("Export Excel gagal");
              }
            }}
            className="px-4 py-2 bg-emerald-100 text-emerald-500 rounded-xl hover:bg-emerald-200 text-sm flex items-center"
          >
            <i className="fi fi-sr-file-excel mr-2" />
            Export to excel
          </button>
          <button
            onClick={() => router.push("/addkaryawan")}
            className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center"
          >
            <i className="fi fi-sr-user-add mr-2" />
            Tambah
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-b-lg shadow p-4 mt-6">
        <table ref={tableRef} className="display w-full text-sm">
          <thead>
            <tr>
              <th className="w-10">No</th>
              <th className="w-20">NIK</th>
              <th className="w-44">Nama Karyawan</th>
              <th className="w-20">Phone</th>
              <th className="w-20">Divisi</th>
              <th className="w-44">Posisi</th>
              <th className="w-20">Signature</th>
              <th className="w-20">Status</th>
              <th className="w-10">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nik}</td>
                <td>{item.users[0].name}</td>
                <td>{item.phone}</td>
                <td>{item.division?.division || "-"}</td>
                <td>{item.position || "-"}</td>
                <td>
                  {item.signature ? (
                    <img
                      src={`${SIGNATURE_URL}/${item.signature}`}
                      className="w-16"
                      alt="signature"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>{item.users[0].status}</td>
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
                        onClick={() => handleUpdate(item)}
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
                      <button
                        onClick={() => {
                          setSelectedNik(item.nik); // 🔥 simpan nik
                          setShowStatusModal(true); // buka modal
                        }}
                        className="w-full px-4 py-2 text-left text-emerald-600 hover:bg-emerald-50"
                      >
                        <i className="fi fi-sr-dice-d6 mr-4" /> Status Akun
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
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
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-lg font-semibold bg-emerald-100 text-emerald-600 px-4 py-2 text-center rounded-xl">
              Konfirmasi Status Akun
            </h2>
            <div className="my-8">
              <div className="w-full">
                <Select
                  options={optionsStatus}
                  placeholder="Pilih Status"
                  className="text-sm"
                  value={selectedStatus}
                  onChange={(val) => setSelectedStatus(val)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-1 border rounded-4xl"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmStatus}
                className="px-4 py-2 bg-emerald-500 text-white rounded-4xl"
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

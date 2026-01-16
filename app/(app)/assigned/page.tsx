"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

export default function DashboardPage() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const router = useRouter();
  const options = [
    { value: "1", label: "Onboarding" },
    { value: "2", label: "Onprogress" },
    { value: "3", label: "Done" },
    { value: "4", label: "Decline" },
  ];
  const Select = dynamic(() => import("react-select"), {
    ssr: false,
  });

  const SIGNATURE_URL = "http://localhost:3001/public/signatures";
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
      //setShowDeleteModal(false);
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
          <div>Ticket</div>
          <div className="font-bold text-2xl">Data Assigned Ticket</div>
        </div>
      </div>

      {/* FILTER */}
      <div className="py-3 flex items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <div className="w-full">
            <label htmlFor="">Status</label>
            <Select
              options={options}
              placeholder="Pilih Status"
              className="text-sm"
            />
          </div>
          <div className="w-full">
            <label htmlFor="">Dari</label>
            <input
              type="date"
              placeholder="Dari"
              className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="w-full">
            <label htmlFor="">Sampai</label>
            <input
              type="date"
              placeholder="Sampai"
              className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center mt-6.5">
            <i className="fi fi-bs-search mr-2" />
            Filter
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/addkaryawan")}
            className="px-4 py-2 bg-red-100 text-red-500 rounded-xl hover:bg-red-200 text-sm flex items-center mt-6.5"
          >
            <i className="fi fi-sr-file-export mr-2" />
            Export Resume to pdf
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-b-lg shadow p-4 mt-6">
        <table ref={tableRef} className="display w-full text-sm">
          <thead>
            <tr>
              <th className="w-44">Assign To</th>
              <th className="w-96">Complaint</th>
              <th className="w-44">Keterangan</th>
              <th className="w-20">Tanggal Ticket</th>
              <th className="w-20">Status</th>
              <th className="w-44">Created By</th>
              <th className="w-96">Hasil</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>Nabila Azzahra</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore velit quae ratione autem in natus, perspiciatis
                  placeat. Qui pariatur maxime, assumenda ad quam nam ipsa
                  laborum sint et a expedita laudantium reprehenderit, sequi ea
                  nisi nesciunt libero nostrum molestias ab alias distinctio
                  facere, rerum iusto aspernatur? Magnam esse officia sed!
                </td>
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
                <td>20 Juni 2026</td>
                <td>
                  <span
                    className="bg-sky-100 text-sky-600 font-semibold px-4 rounded-xl pt-1 pb-1 text-xs flex items-center justify-center cursor-pointer"
                    onClick={() => handleUpdate(item.id)}
                  >
                    <i className="fi fi-sr-microchip mr-2 mt-1" /> Onboardding
                  </span>
                </td>
                <td className="relative">Asep Manarul Hidayah</td>
                <td>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
                  mollitia inventore quo recusandae dignissimos necessitatibus
                  dolores illo numquam asperiores aut.
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-lg font-semibold bg-emerald-100 text-emerald-600 px-4 py-2 text-center rounded-xl">
              Konfirmasi Status
            </h2>
            <div className="my-8">
              <div className="w-full">
                <Select
                  options={options}
                  placeholder="Pilih Status"
                  className="text-sm"
                />
              </div>
              <div className="w-full">
                <textarea
                  placeholder="Hasil"
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm mt-4"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-1 border rounded-4xl"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
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

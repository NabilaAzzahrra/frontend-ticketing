"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

export default function DashboardPage() {
  const options = [
    { value: "1", label: "Nabila Azzahra" },
    { value: "2", label: "Assep Manarul Hidayah" },
    { value: "3", label: "Adi Apriyanto" },
  ];
  const Select = dynamic(() => import("react-select"), {
    ssr: false,
  });
  return (
    <div className="p-6 mx-96">
      <div className="mt-24 py-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            Ticket <i className="fi fi-rr-caret-right mt-2" /> Assigned
          </div>
          <div className="font-bold text-2xl">Form Create Ticket</div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        facilis sapiente beatae animi aliquam iusto temporibus odit obcaecati
        cumque similique?
      </div>
      <form action="#">
        <div className="bg-white rounded-b-lg shadow mt-4 py-6 px-8 flex flex-col gap-8">
          <div className="w-full">
            <div className="flex gap-5 mt-1">
              <div className="w-full">
                <label htmlFor="">Complaint</label>
                <textarea
                  placeholder="Complaint"
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <label htmlFor="">Keterangan Penunjang</label>
                <input
                  type="file"
                  placeholder="Tanda Tangan"
                  className="w-full border border-[#D0D0D0] rounded-lg px-4 py-2 text-sm"
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Assign to</label>
                <Select
                  options={options}
                  placeholder="Pilih Karyawan"
                  className="text-sm"
                />
              </div>
            </div>
            <button className="px-4 py-2 bg-sky-100 text-sky-500 rounded-xl hover:bg-sky-200 text-sm flex items-center justify-end mt-6 ml-[932px]">
              <i className="fi fi-sr-disk mr-2 mt-1" />
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
